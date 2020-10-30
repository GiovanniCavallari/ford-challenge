import speech_recognition as sr
import pyttsx3
import requests


#Configurações
r = sr.Recognizer() #Cria uma nova instância de Recognizer, que representa uma coleção de configurações e funcionalidades de reconhecimento de fala
engine = pyttsx3.init() #inicia a engine da lib
br_voz_id = 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_PT-BR_MARIA_11.0' #caminho da voz para uma variavel
engine.setProperty('voice', br_voz_id) #muda a configura da voz para a da variavel acima
r.energy_threshold = 4000 #Representa o limite do nível de energia para sons. Valores abaixo desse limite são considerados silêncio e valores acima desse limite são considerados fala
speech_rate = engine.getProperty('rate') #pegando a propriedade 'rate'
engine.setProperty('rate', speech_rate+63) #aumenta em +65
#Taxa de fala em palavras por minuto. O padrão é 200 palavras por minuto.

def combustivel(fala):
    # - Checar na API nivel do combustivel
    engine.say('Há ' + str(sensors('fuel')) + ' porcento do tanque de combustível. Deseja verificar mais alguma coisa?')
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
    if sensors('oil') is True:
        engine.say('A pressão do óleo está baixa, favor verificar! Algo mais?')
    else:
        engine.say('A pressão do óleo está ok! Algo mais?')
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
    if sensors('brake') is True:
        engine.say('A pastilha de freio está desgastada, favor verificar! Algo mais')
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

    engine.say('O motor esta à ' + str(sensors('temperature')) + ' graus celsius. Deseja verificar mais alguma coisa?')
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
        engine.say(oi)
        engine.runAndWait()  
        r.adjust_for_ambient_noise(s, duration = 0.5)
        while True:
            # try:      
                # engine.say(oi)
                # engine.runAndWait()  
                audio = r.listen(s)
                speech = r.recognize_google(audio, language='pt')
                print(speech)
                #continuar = 1
                #loop para continuar após a primeira interação
                #while continuar == 1:
                if 'combustível' in speech:
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
                     #print('Não entendi. Pode repetir?')
                    engine.say('Não entendi. Pode repetir?')
                    engine.runAndWait()
            # except:
            #     engine.say('Tá bom, qualquer coisa, é só perguntar!')
            #     engine.runAndWait() 
