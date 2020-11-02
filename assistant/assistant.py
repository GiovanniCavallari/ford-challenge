import requests
import speech_recognition as sr
import win32com.client as wincl
from playsound import playsound
from configs import speechConfig

windows_speak = wincl.Dispatch("SAPI.SpVoice")
windows_speak.Rate = speechConfig.getRate()

sensores = ["combustível", "gasolina", "óleo", "freio", "freios", "temperatura", "odometro","andei", "rodei",
            "motor", "pressão", "pneu", "dianteiro", "traseiro", "esquerdo", "direito"]


def interacao(e):

    def sensors(req):
        sensor = requests.get('https://fordva-aylrs.ondigitalocean.app/cars/123456/sensors/' + req).json()
        return sensor['value']

    def get_audio():
        r = sr.Recognizer()
        r.energy_threshold = 400
        r.dynamic_energy_threshold = True
        
        with sr.Microphone() as source:
            r.adjust_for_ambient_noise(source, duration=0.5)
            audio = r.listen(source, phrase_time_limit=5)
            try:
                said = r.recognize_google(audio, language='pt')
                print(said)
                return said
            except:
                pass

    def verifica_n(fala):
        if set(fala.split()).intersection(sensores):
            if 'combustível' in fala or 'gasolina' in fala:
                windows_speak.Speak('Há ' + str(sensors('fuel')) + ' porcento do tanque de combustível.')

            if 'óleo' in fala:
                if sensors('oil'):
                    windows_speak.Speak('A pressão do óleo ok!')
                else:
                    windows_speak.Speak('A pressão do óleo está baixa, favor verificar!')

            if 'freio' in fala or 'freios' in fala:
                if sensors('brake'):
                    windows_speak.Speak('A pastilha de freio está ok!')
                else:
                    windows_speak.Speak('A pastilha de freio está muito desgastada, favor verificar!')

            if ('temperatura' in fala and 'motor' in fala) or ('temperatura' in fala and 'líquido' in fala):
                windows_speak.Speak('O líquido de arrefecimento esta à ' + str(sensors('temperature')) + ' graus celsius.')

            if 'odometro' in fala or 'andei' in fala or 'rodei' in fala:
                windows_speak.Speak('O carro já rodou ' + str(sensors('odometer')) + ' quilometros.')

            if 'temperatura' in fala and 'pneu' in fala and 'direito' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro direito está á ' + str(sensors('rfTireTemp')) + ' graus celsius.')

            if 'temperatura' in fala and 'pneu' in fala and 'direito' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro direito está á ' + str(sensors('rrTireTemp')) + ' graus celsius.')

            if 'temperatura' in fala and 'pneu' in fala and 'esquerdo' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro esquerdo está á ' + str(sensors('lfTireTemp')) + ' graus celsius.')

            if 'temperatura' in fala and 'pneu' in fala and 'esquerdo' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro esquerdo está á ' + str(sensors('rlTireTemp')) + ' graus celsius.')

            if 'pressão' in fala and 'pneu' in fala and 'direito' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro direito tem ' + str(sensors('rfTirePressure')) + ' P S I.')

            if 'pressão' in fala and 'pneu' in fala and 'direito' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro direito tem ' + str(sensors('rrTirePressure')) + ' P S I.')

            if 'pressão' in fala and 'pneu' in fala and 'esquerdo' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro esquerdo tem ' + str(sensors('lfTirePressure')) + ' P S I.')

            if 'pressão' in fala and 'pneu' in fala and 'esquerdo' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro esquerdo tem ' + str(sensors('rlTirePressure')) + ' P S I.')
        else:
            windows_speak.Speak('Não consegui entender! Repita por favor.')
            playsound('./assets/abertura_mix.mp3')
            return verifica(get_audio())

        return

    def verifica(fala):
        try:
            if ' e ' in fala:
                verifica_n(fala)

            elif 'combustível' in fala or 'gasolina' in fala:
                windows_speak.Speak('Há ' + str(sensors('fuel')) + ' porcento do tanque de combustível.')

            elif 'óleo' in fala:
                if sensors('oil'):
                    windows_speak.Speak('A pressão do óleo ok!')
                else:
                    windows_speak.Speak('A pressão do óleo está baixa, favor verificar!')

            elif 'freio' in fala or 'freios' in fala:
                if sensors('brake'):
                    windows_speak.Speak('A pastilha de freio está ok!')
                else:
                    windows_speak.Speak('A pastilha de freio está muito desgastada, favor verificar!')

            elif ('temperatura' in fala and 'motor' in fala) or ('temperatura' in fala and 'líquido' in fala):
                windows_speak.Speak('O líquido de arrefecimento esta à ' + str(sensors('temperature')) + ' graus celsius.')

            elif 'odometro' in fala or 'andei' in fala or 'rodei' in fala:
                windows_speak.Speak('O carro já rodou ' + str(sensors('odometer')) + ' quilometros.')

            elif 'temperatura' in fala and 'pneu' in fala and 'direito' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro direito está á ' + str(sensors('rfTireTemp')) + ' graus celsius.')

            elif 'temperatura' in fala and 'pneu' in fala and 'direito' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro direito está á ' + str(sensors('rrTireTemp')) + ' graus celsius.')

            elif 'temperatura' in fala and 'pneu' in fala and 'esquerdo' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro esquerdo está á ' + str(sensors('lfTireTemp')) + ' graus celsius.')

            elif 'temperatura' in fala and 'pneu' in fala and 'esquerdo' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro esquerdo está á ' + str(sensors('rlTireTemp')) + ' graus celsius.')

            elif 'pressão' in fala and 'pneu' in fala and 'direito' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro direito tem ' + str(sensors('rfTirePressure')) + ' P S I.')

            elif 'pressão' in fala and 'pneu' in fala and 'direito' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro direito tem ' + str(sensors('rrTirePressure')) + ' P S I.')

            elif 'pressão' in fala and 'pneu' in fala and 'esquerdo' in fala and 'dianteiro' in fala:
                windows_speak.Speak('O pneu dianteiro esquerdo tem ' + str(sensors('lfTirePressure')) + ' P S I.')

            elif 'pressão' in fala and 'pneu' in fala and 'esquerdo' in fala and 'traseiro' in fala:
                windows_speak.Speak('O pneu traseiro esquerdo tem ' + str(sensors('rlTirePressure')) + ' P S I.')

            elif 'dia' in fala or 'tarde' in fala or 'noite' in fala or 'tchau' in fala or 'não' in fala or 'nada' in fala:
                windows_speak.Speak('Ok, precisando é só chamar! Até mais.')

            elif 'você' in fala or 'quem' in fala:
                windows_speak.Speak('Olá, eu sou sua assistente virtual. Meu objetivo é estar sempre pronta para responder á suas duvidas e te avisar sobre o estao do carro.')

            else:
                windows_speak.Speak('Não consegui entender! Repita por favor.')
                playsound('./assets/abertura_mix.mp3')
                return verifica(get_audio())

            return
        except:
            return

    while True:
        e.wait() # Espera a flag ser True para executar as próximas linhas
        texto = get_audio()
        if 'Ford' in str(texto) or 'assistente' in str(texto):
            playsound('./assets/abertura_mix.mp3')
            texto = get_audio()
            verifica(texto)
