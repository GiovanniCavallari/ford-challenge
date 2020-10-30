import speech_recognition as sr
import pyttsx3
import requests
import threading
import pika
import time
import json

# Configurações
r = sr.Recognizer()  # Cria uma nova instância de Recognizer, que representa uma coleção de configurações e funcionalidades de reconhecimento de fala
engine = pyttsx3.init()  # inicia a engine da lib
# caminho da voz para uma variavel
br_voz_id = 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_PT-BR_MARIA_11.0'
# muda a configura da voz para a da variavel acima
engine.setProperty('voice', br_voz_id)
r.energy_threshold = 4000  # Representa o limite do nível de energia para sons. Valores abaixo desse limite são considerados silêncio e valores acima desse limite são considerados fala
speech_rate = engine.getProperty('rate')  # pegando a propriedade 'rate'
engine.setProperty('rate', speech_rate+63)  # aumenta em +65
# Taxa de fala em palavras por minuto. O padrão é 200 palavras por minuto.

def consumirFila():

    def alerts(title, desc, sensor):
        try:
            payload = {"title": title,"description": desc,"sensor": sensor,"notification": {"title": title,"body": desc}}
            requests.post('https://fordva-aylrs.ondigitalocean.app/cars/123456/alerts', json=payload)
        except ValueError:
            print("Erro ao enviar alerta para API")


    def tratamento(name, value):
        if name == "fuel":
            engine.say('ATENÇÃO, á' + value + 'porcento de combustível. Abasteça no posto mais próximo.')
            engine.runAndWait()
            alerts("Alerta de Gasolina", "O tanque tem " + value + "% de combustível.", name)

        elif name == "odometer":
            engine.say('ATENÇÃO, o carro já andou' + value + ' quilometros.')
            engine.runAndWait()
            alerts("Alerta de Odômetro", "O carro já andou " + value + " Km.", name)

        elif name == "oil":
            engine.say('ATENÇÃO, a pressão do óleo está baixa.')
            engine.runAndWait()
            alerts("Alerta de Óleo", "A pressão do óleo está baixa.", name)

        elif name == "brake":
            engine.say('ATENÇÃO, a pastilha de freio está muito desgastada.')
            engine.runAndWait()
            alerts("Alerta de Freio", "A pastilha de freio está desgastada.", name)

        elif name == "temperature":
            engine.say('ATENÇÃO, a temperatura do motor está á' + value + ' graus celcios.')
            engine.runAndWait()
            alerts("Alerta de Temperatura", "O motor está á " + value + "°C.", name)

        elif name == "rfTirePressure":
            engine.say('ATENÇÃO, a pressão do pneu dianteiro direito está á' + value + ' P S I.')
            engine.runAndWait()
            alerts("Alerta de Pressão dos Pneus", "O pneu dianteiro direito está á" + value + "PSI.", name)

        elif name == "lfTirePressure":
            engine.say('ATENÇÃO, a pressão do pneu dianteiro esquerdo está á' + value + ' P S I.')
            engine.runAndWait()
            alerts("Alerta de Pressão dos Pneus", "O pneu esquerdo direito está á" + value + "PSI.", name)

        elif name == "rrTirePressure":
            engine.say('ATENÇÃO, a pressão do pneu traseiro direito está á' + value + ' P S I.')
            engine.runAndWait()
            alerts("Alerta de Pressão dos Pneus", "O pneu traseiro direito está á" + value + "PSI.", name)

        elif name == "rlTirePressure":
            engine.say('ATENÇÃO, a pressão do pneu traseiro esquerdo está á' + value + ' P S I.')
            engine.runAndWait()
            alerts("Alerta de Pressão dos Pneus", "O pneu traseiro esquerdo está á" + value + "PSI.", name)

        elif name == "rfTireTemp":
            engine.say('ATENÇÃO, a temperatura do pneu dianteiro direito está á' + value + ' graus celcios.')
            engine.runAndWait()
            alerts("Alerta de Temperatura dos Pneus", "O pneu dianteiro direito está á" + value + "°C.", name)

        elif name == "lfTireTemp":
            engine.say('ATENÇÃO, a temperatura do pneu dianteiro esquerdo está á' + value + ' graus celcios.')
            engine.runAndWait()
            alerts("Alerta de Temperatura dos Pneus", "O pneu dianteiro esquerdo está á" + value + "°C.", name)

        elif name == "rrTireTemp":
            engine.say('ATENÇÃO, a temperatura do pneu traseiro direito está á' + value + ' graus celcios.')
            engine.runAndWait()
            alerts("Alerta de Temperatura dos Pneus", "O pneu traseiro direito está á" + value + "°C.", name)

        elif name == "rlTireTemp":
            engine.say('ATENÇÃO, a temperatura do pneu traseiro esquerdo está á' + value + ' graus celcios.')
            engine.runAndWait()
            alerts("Alerta de Temperatura dos Pneus", "O pneu traseiro esquerdo está á" + value + "°C.", name)

    def callback(ch, method, properties, body):
        data = json.loads(body)
        # Aparentemente a função recupera todos os valores como string.
        if format(data['error']) == 'True':
            tratamento(format(data['name']), format(data['value']))
            #{"name": "fuel", "value": 80, "translation": "Combustível", "error": false, "carChassis": 123456, "solutions": [], "configurations": {"unit": "%", "value": "5", "active": true, "direction": "decreasing"}}
        time.sleep(1)# Trata uma mensagem de cada vez no intervalo de 1 segundo
        ch.basic_ack(delivery_tag=method.delivery_tag)# Realiza o manual_ack da 1 mensagen recebida
    connection = pika.BlockingConnection(pika.URLParameters('amqp://rabbitmq:rabbitmq@165.227.86.15:5672'))
    channel = connection.channel()
    channel.basic_qos(prefetch_count=1)  # Recupera 1 mensagens de cada vez
    channel.queue_declare(queue='messages', durable=True)
    channel.basic_consume(queue='messages', on_message_callback=callback, auto_ack=False)
    channel.start_consuming()


def interacao():

    def combustivel(fala):
        engine.say('Há ' + str(sensors('fuel')) + ' porcento do tanque de combustível. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            speech = 0
            escutar = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def oleoMotor(fala):
        if sensors('oil'):
            engine.say('A pressão do óleo está baixa, favor verificar! Algo mais?')
            engine.runAndWait()
        else:
            engine.say('A pressão do óleo ok! Algo mais?')
            engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            speech = 0
            escutar = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar')
            engine.runAndWait()
            return speech

    def freio(fala):
        if sensors('brake'):
            engine.say('A pastilha de freio está desgastada, favor verificar! Algo mais')
            engine.runAndWait()
        else:
            engine.say('A pastilha de freio está ok! Algo mais?')
            engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            speech = 0
            escutar = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar')
            engine.runAndWait()
            return speech

    def temperatura(fala):
        engine.say('O motor esta à ' + str(sensors('temperature')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            speech = 0
            escutar = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def odometro(fala):
        engine.say('O carro já rodou ' + str(sensors('odometer')) + ' quilometros. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def TempPneuDD(fala):#Dianteiro direito

        engine.say('O pneu dianteiro direito está á ' + str(sensors('rfTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def TempPneuED(fala):#Dianteiro esquerdo

        engine.say('O pneu dianteiro esquerdo está á ' + str(sensors('lfTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def TempPneuDT(fala):#Traseiro direito

        engine.say('O pneu traseiro direito está á ' + str(sensors('rrTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def TempPneuET(fala):#Traseiro esquerdo

        engine.say('O pneu traseiro esquerdo está á ' + str(sensors('rlTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def PressPneuDD(fala):#Dianteiro direito

        engine.say('O pneu dianteiro direito tem ' + str(sensors('rfTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def PressPneuED(fala):#Dianteiro esquerdo

        engine.say('O pneu dianteiro esquerdo tem ' + str(sensors('lfTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def PressPneuDT(fala):#Traseiro direito

        engine.say('O pneu traseiro direito tem ' + str(sensors('rrTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech

    def PressPneuET(fala):#Traseiro esquerdo

        engine.say('O pneu traseiro esquerdo tem ' + str(sensors('rlTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        engine.runAndWait()
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            # continuar = 0
            speech = 0
            engine.say('Ta bom, pode contar comigo sempre que precisar!')
            engine.runAndWait()
            return speech


    def sensors(req):
        sensor = requests.get(base+req).json()
        return sensor['value']

    base = 'https://fordva-aylrs.ondigitalocean.app/cars/123456/sensors/'
    oi = 'Oi, sou a Fordina! Como posso ajudar?'

    with sr.Microphone() as s:
        r.adjust_for_ambient_noise(s, duration=0.5)
        while True:
            try:
                audio = r.listen(s)
                speech = r.recognize_google(audio, language='pt')
                print(speech)

                if 'Ford' in speech:
                    escutar = 1
                    engine.say(oi)
                    engine.runAndWait()

                elif escutar == 1:
                    if 'combustível' in speech or 'gasolina' in speech:
                        combustivel(speech)

                    elif 'óleo' in speech:
                        oleoMotor(speech)

                    elif 'freio' in speech:
                        freio(speech)

                    elif 'temperatura' in speech and 'motor' in speech:
                        temperatura(speech)

                    elif 'odometro' in speech:
                        odometro(speech)

                    elif 'temperatura' in speech and 'pneu' in speech and 'direito' in speech and 'dianteiro' in speech:
                        TempPneuDD(speech)

                    elif 'temperatura' in speech and 'pneu' in speech and 'direito' in speech and 'traseiro' in speech:
                        TempPneuDT(speech)

                    elif 'temperatura' in speech and 'pneu' in speech and 'esquerdo' in speech and 'dianteiro' in speech:
                        TempPneuED(speech)

                    elif 'temperatura' in speech and 'pneu' in speech and 'esquerdo' in speech and 'traseiro' in speech:
                        TempPneuET(speech)

                    elif 'pressão' in speech and 'pneu' in speech and 'direito' in speech and 'dianteiro' in speech:
                        PressPneuDD(speech)

                    elif 'pressão' in speech and 'pneu' in speech and 'direito' in speech and 'traseiro' in speech:
                        PressPneuDT(speech)

                    elif 'pressão' in speech and 'pneu' in speech and 'esquerdo' in speech and 'dianteiro' in speech:
                        PressPneuED(speech)

                    elif 'pressão' in speech and 'pneu' in speech and 'esquerdo' in speech and 'traseiro' in speech:
                        PressPneuET(speech)

                else:
                    escutar = 0

            except Exception:
                pass

threadConsumirFila = threading.Thread(target=consumirFila)
threadConsumirFila.daemon = True
threadConsumirFila.start()

interacao()