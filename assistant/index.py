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


def alerts(title, desc, sensor):
    try:
        payload = {"title": title, "description": desc, "sensor": sensor,
                   "notification": {"title": title, "body": desc}}
        requests.post(
            'https://fordva-aylrs.ondigitalocean.app/cars/123456/alerts', json=payload)
    except ValueError:
        print("Erro ao enviar alerta para API")


def consumirFila():
    def callback(ch, method, properties, body):
        data = json.loads(body)
        # Aparentemente a função recupera todos os valores como string.
        if format(data['error']) == 'True':
            reconhecimento(format(data['name']), format(
                data['value']), format(data['translation']))
            # Quando tem erro pode retornar qualquer dado baseado na estrutura de exemplo abaixo
            #{"name": "fuel", "value": 80, "translation": "Combustível", "error": false, "carChassis": 123456, "solutions": [], "configurations": {"unit": "%", "value": "5", "active": true, "direction": "decreasing"}}
        # Trata uma mensagem de cada vez no intervalo de 1 segundo
        time.sleep(1)
        # Realiza o manual_ack da 1 mensagen recebida
        ch.basic_ack(delivery_tag=method.delivery_tag)

    connection = pika.BlockingConnection(pika.URLParameters(
        'amqp://rabbitmq:rabbitmq@165.227.86.15:5672'))

    channel = connection.channel()
    channel.basic_qos(prefetch_count=1)  # Recupera 1 mensagens de cada vez
    channel.queue_declare(queue='messages', durable=True)

    channel.basic_consume(
        queue='messages', on_message_callback=callback, auto_ack=False)

    channel.start_consuming()


def reconhecimento(name, value, translation):
    if (name == "fuel"):
        engine.say('ATENÇÃO, há'+value +
                   'porcento de combustível. Abasteça no posto mais próximo.' + translation)
        engine.runAndWait()


threadConsumirFila = threading.Thread(target=consumirFila)
threadConsumirFila.daemon = True
threadConsumirFila.start()
threadReconhecimento = threading.Thread(target=reconhecimento)
threadReconhecimento.daemon = True
threadReconhecimento.start()


def combustivel(fala):
    engine.say('Há ' + str(sensors('fuel')) +
               ' porcento do tanque de combustível. Deseja verificar mais alguma coisa?')
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


def oleoMotor(fala):
    if sensors('oil'):
        engine.say('A pressão do óleo está baixa, favor verificar! Algo mais?')
    else:
        engine.say('A pressão do óleo ok! Algo mais?')
    engine.runAndWait()
    speech = 0
    audio = r.listen(s, 3, 7)
    speech = r.recognize_google(audio, language='pt')
    if 'não' in speech:
        speech = 0
        engine.say('Ta bom, pode contar comigo sempre que precisar')
        engine.runAndWait()
        return speech


def freio(fala):
    if sensors('brake'):
        engine.say(
            'A pastilha de freio está desgastada, favor verificar! Algo mais')
    else:
        engine.say('A pastilha de freio está ok! Algo mais?')
    engine.runAndWait()
    speech = 0
    audio = r.listen(s, 3, 7)
    speech = r.recognize_google(audio, language='pt')
    if 'não' in speech:
        speech = 0
        engine.say('Ta bom, pode contar comigo sempre que precisar')
        engine.runAndWait()
        return speech


def temperatura(fala):

    engine.say('O motor esta à ' + str(sensors('temperature')) +
               ' graus celsius. Deseja verificar mais alguma coisa?')
    engine.runAndWait()
    speech = 0
    audio = r.listen(s, 3, 7)
    speech = r.recognize_google(audio, language='pt')
    if 'não' in speech:
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
    engine.say(oi)
    engine.runAndWait()
    r.adjust_for_ambient_noise(s, duration=0.5)
    while True:

        audio = r.listen(s)
        speech = r.recognize_google(audio, language='pt')
        print(speech)

        if 'combustível' in speech or 'gasolina' in speech:
            combustivel(speech)

        elif 'óleo' in speech:
            oleoMotor(speech)

        elif 'freio' in speech:
            freio(speech)

        elif 'temperatura' in speech:
            temperatura(speech)

        # elif 'nada' in speech:
        #     engine.say('Tá bom.')
        #     engine.runAndWait()

        else:
            engine.say('Não entendi. Pode repetir?')
            engine.runAndWait()
