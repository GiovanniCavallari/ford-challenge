import speech_recognition as sr
import win32com.client as wincl
import requests

# Configurações
r = sr.Recognizer()  # Cria uma nova instância de Recognizer, que representa uma coleção de configurações e funcionalidades de reconhecimento de fala
r.energy_threshold = 4000  # Representa o limite do nível de energia para sons. Valores abaixo desse limite são considerados silêncio e valores acima desse limite são considerados fala
windows_speak = wincl.Dispatch("SAPI.SpVoice")
windows_speak.Rate = 3

def interacao():

    def nao():
        speech = 0
        escutar = 0
        windows_speak.Speak('Ta bom, pode contar comigo sempre que precisar!')
        return speech

    def combustivel(fala):
        windows_speak.Speak('Há ' + str(sensors('fuel')) + ' porcento do tanque de combustível. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def oleoMotor(fala):
        if sensors('oil'):
            windows_speak.Speak('A pressão do óleo está baixa, favor verificar! Algo mais?')
           
        else:
            windows_speak.Speak('A pressão do óleo ok! Algo mais?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def freio(fala):
        if sensors('brake'):
            windows_speak.Speak('A pastilha de freio está desgastada, favor verificar! Algo mais?')    
            
        else:
            windows_speak.Speak('A pastilha de freio está ok! Algo mais?')
            
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
           nao()

    def temperatura(fala):
        windows_speak.Speak('O motor esta à ' + str(sensors('temperature')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def odometro(fala):
        windows_speak.Speak('O carro já rodou ' + str(sensors('odometer')) + ' quilometros. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def TempPneuDD(fala):#Dianteiro direito

        windows_speak.Speak('O pneu dianteiro direito está á ' + str(sensors('rfTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def TempPneuED(fala):#Dianteiro esquerdo

        windows_speak.Speak('O pneu dianteiro esquerdo está á ' + str(sensors('lfTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def TempPneuDT(fala):#Traseiro direito

        windows_speak.Speak('O pneu traseiro direito está á ' + str(sensors('rrTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def TempPneuET(fala):#Traseiro esquerdo

        windows_speak.Speak('O pneu traseiro esquerdo está á ' + str(sensors('rlTireTemp')) + ' graus celsius. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def PressPneuDD(fala):#Dianteiro direito

        windows_speak.Speak('O pneu dianteiro direito tem ' + str(sensors('rfTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def PressPneuED(fala):#Dianteiro esquerdo

        windows_speak.Speak('O pneu dianteiro esquerdo tem ' + str(sensors('lfTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def PressPneuDT(fala):#Traseiro direito

        windows_speak.Speak('O pneu traseiro direito tem ' + str(sensors('rrTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()

    def PressPneuET(fala):#Traseiro esquerdo

        windows_speak.Speak('O pneu traseiro esquerdo tem ' + str(sensors('rlTirePressure')) + ' P S I. Deseja verificar mais alguma coisa?')
        speech = 0
        audio = r.listen(s, 3, 7)
        speech = r.recognize_google(audio, language='pt')
        if 'não' in speech:
            nao()


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
                    windows_speak.Speak(oi)
                    
                if escutar == 1:
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

                    elif 'não' in speech or 'nada' in speech:
                        escutar = 0
                        windows_speak.Speak('Ok, precisando é só chamar!')
                    
                    elif speech == '': 
                        escutar = 0
                        windows_speak.Speak('Se precisar, é só chamar')

                    else:
                        escutar = 0

            except Exception:
                pass
