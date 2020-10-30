import speech_recognition as sr
import pyttsx3
import requests
import threading
import pika
import time
import json

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