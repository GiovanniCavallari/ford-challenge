import speech_recognition as sr
import pyttsx3

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
    engine.say('Há ' +porcento_combustivel+' porcento do tanque de combustível. Deseja verificar mais alguma coisa?')
    engine.runAndWait()
    speech = 0
    audio = r.listen(s, 3, 7)     
    speech = r.recognize_google(audio, language= 'pt')
    if 'não' in speech:
        # continuar = 0
        speech = 0
        engine.say('Ta bom, pode contar comigo sempre que precisar!')
        engine.runAndWait()
        return speech


def oleoMotor(fala):
    # - Checar na API nivel do óleo
    engine.say('O nível do óleo está ok! Algo mais?')
    engine.runAndWait()
    speech = 0
    audio = r.listen(s, 3, 7)     
    speech = r.recognize_google(audio, language= 'pt')
    if 'não' in speech:
        speech = 0
        engine.say('Ta bom, pode contar comigo sempre que precisar')
        engine.runAndWait()
        return speech


def freio(fala):
    # - Checar na API nivel do óleo
    engine.say('Cuidado! Você precisa trocar a pastilha do freio! Agende a troca assim que possível.')
    engine.say(' Posso ajudar em algo mais?')
    engine.runAndWait()
    speech = 0
    audio = r.listen(s, 3, 7)     
    speech = r.recognize_google(audio, language= 'pt')
    if 'não' in speech:
        speech = 0
        engine.say('Ta bom, pode contar comigo sempre que precisar')
        engine.runAndWait()
        return speech


oi = 'Oi, sou a Fordina! Como posso ajudar?'
porcento_combustivel = '80'
nivelOleo = 'OK'

with sr.Microphone() as s:
        engine.say(oi)
        engine.runAndWait()  
        r.adjust_for_ambient_noise(s, duration = 0.5)
        while True:
            # try:      
                # engine.say(oi)
                # engine.runAndWait()  
                audio = r.listen(s)     
                speech = r.recognize_google(audio, language= 'pt')
                print(speech)
                #continuar = 1
                #loop para continuar após a primeira interação
                #while continuar == 1:
                if 'combustível' in speech:
                    combustivel(speech)
                        
                elif 'óleo' in speech:
                    oleoMotor(speech)

                #elif 
                elif 'freio' in speech:
                    freio(speech)

                else:
                     #print('Não entendi. Pode repetir?')
                        engine.say('Não entendi. Pode repetir?')
                        engine.runAndWait()
            # except:
            #     engine.say('Tá bom, qualquer coisa, é só perguntar!')
            #     engine.runAndWait() 
