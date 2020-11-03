import pika
import time
import json
import requests
import numpy as np
import win32com.client as wincl
from configs import speechConfig

windows_speak = wincl.Dispatch("SAPI.SpVoice")
windows_speak.Rate = speechConfig.getRate()


def consumirFila(e):

    def alerts(title, desc, sensor):
        try:
            # print(title, desc, sensor)
             payload = {"title": title,"description": desc,"sensor": sensor,"notification": {"title": title,"body": desc}}
             requests.post('https://fordva-aylrs.ondigitalocean.app/cars/123456/alerts', json=payload)
        except ValueError:
            print("Erro ao enviar alerta para API")

    def tratamento(nome, valor):
        if nome == "fuel":
            alerts("Alerta de Gasolina", "O tanque tem " + valor + "% de combustível.", nome)
            frase = 'ATENÇÃO, á ' + valor + ' porcento de combustível.'

        elif nome == "odometer":
            alerts("Alerta de Odômetro", "O carro já andou " + valor + " Km.", nome)
            frase = 'Atenção, o carro já andou ' + valor + ' quilometros.'
            
        elif nome == "oil":
            alerts("Alerta de Óleo", "A pressão do óleo está baixa.", nome)
            frase = 'ATENÇÃO, a pressão do óleo está baixa.'
            
        elif nome == "brake":
            alerts("Alerta de Freio", "As pastilhas de freio estão desgastadas.", nome)
            frase = 'ATENÇÃO, as pastilhas de freio estão muito desgastadas.'
            
        elif nome == "temperature":
            alerts("Alerta de Temperatura", "O motor está á " + valor + "°C.", nome)
            frase = 'ATENÇÃO, a temperatura do motor está á ' + valor + ' graus celsius.'

        elif nome == "rfTirePressure":
            alerts("Alerta de Pressão dos Pneus", "O pneu dianteiro direito está á" + valor + "PSI.", nome)
            frase = 'ATENÇÃO, a pressão do pneu dianteiro direito está á ' + valor + ' P S I.'
            
        elif nome == "lfTirePressure":
            alerts("Alerta de Pressão dos Pneus", "O pneu esquerdo direito está á" + valor + "PSI.", nome)
            frase = 'ATENÇÃO, a pressão do pneu dianteiro esquerdo está á ' + valor + ' P S I.'
            
        elif nome == "rrTirePressure":
            alerts("Alerta de Pressão dos Pneus", "O pneu traseiro direito está á" + valor + "PSI.", nome)
            frase = 'ATENÇÃO, a pressão do pneu traseiro direito está á ' + valor + ' P S I.'
            
        elif nome == "rlTirePressure":
            alerts("Alerta de Pressão dos Pneus", "O pneu traseiro esquerdo está á" + valor + "PSI.", nome)
            frase = 'ATENÇÃO, a pressão do pneu traseiro esquerdo está á ' + valor + ' P S I.'
            
        elif nome == "rfTireTemp":
            alerts("Alerta de Temperatura dos Pneus", "O pneu dianteiro direito está á" + valor + "°C.", nome)
            frase = 'ATENÇÃO, a temperatura do pneu dianteiro direito está á ' + valor + ' graus celsius.'
            
        elif nome == "lfTireTemp":
            alerts("Alerta de Temperatura dos Pneus", "O pneu dianteiro esquerdo está á" + valor + "°C.", nome)
            frase = 'ATENÇÃO, a temperatura do pneu dianteiro esquerdo está á ' + valor + ' graus celsius.'
            
        elif nome == "rrTireTemp":
            alerts("Alerta de Temperatura dos Pneus", "O pneu traseiro direito está á" + valor + "°C.", nome)
            frase = 'ATENÇÃO, a temperatura do pneu traseiro direito está á ' + valor + ' graus celsius.'
            
        elif nome == "rlTireTemp":
            alerts("Alerta de Temperatura dos Pneus", "O pneu traseiro esquerdo está á" + valor + "°C.", nome)
            frase = 'ATENÇÃO, a temperatura do pneu traseiro esquerdo está á ' + valor + ' graus celsius.'

        windows_speak.Speak(frase)
        return

    def speak_solutions(solutions):
        windows_speak.Speak('Possiveis soluções: ')
        for solution in solutions:
            windows_speak.Speak(solution)
            time.sleep(0.1)
        
        windows_speak.Speak('Para mais informações, entre em contato com o suporte Ford.')
        return

    def callback(ch, method, properties, body):
        data = json.loads(body)

        # Aparentemente a função recupera todos os valores como string.
        if format(data['error']) == 'True':
            e.clear() # Muda flag para False, impedindo a interação com a assistente
            tratamento(format(data['name']), format(data['value']))
            speak_solutions(np.array(data['solutions']))

        time.sleep(1) # Trata uma mensagem de cada vez no intervalo de 1 segundo
        ch.basic_ack(delivery_tag=method.delivery_tag) # Realiza o manual_ack da 1 mensagen recebida
        e.set() # Muda flag para True, permitindo interagir com a assistente


    connection = pika.BlockingConnection(pika.URLParameters('amqp://rabbitmq:rabbitmq@165.227.86.15:5672'))
    
    channel = connection.channel()
    channel.basic_qos(prefetch_count=1)  # Recupera 1 mensagem por vez
    channel.queue_declare(queue='messages', durable=True)
    channel.basic_consume(queue='messages', on_message_callback=callback, auto_ack=False)
    channel.start_consuming()
