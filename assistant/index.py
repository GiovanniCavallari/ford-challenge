import speech_recognition as sr
import pyttsx3

r = sr.Recognizer() #Cria uma nova instância de Recognizer, que representa uma coleção de configurações e funcionalidades de reconhecimento de fala
engine = pyttsx3.init() #inicia a engine da lib
br_voz_id = 'HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Speech\Voices\Tokens\TTS_MS_PT-BR_MARIA_11.0' #caminho da voz para uma variavel
engine.setProperty('voice', br_voz_id) #muda a configura da voz para a da variavel acima

#Representa o limite do nível de energia para sons. Valores abaixo desse limite são considerados silêncio e valores acima desse limite são considerados fala
r.energy_threshold = 4000 #
#Taxa de fala em palavras por minuto. O padrão é 200 palavras por minuto.
speech_rate = engine.getProperty('rate') #pegando a propriedade 'rate'
engine.setProperty('rate', speech_rate+60) #aumenta em +60

oi = 'Oi. Como posso ajudar?'
porcento_combustivel = '80'
oleo = 'OK'

with sr.Microphone() as s:
        try:
                engine.say(oi)
                engine.runAndWait()  
                #ajusta o som do ambiente e aguarda 0.5 segundo para começar a captar a voz, padrão é 1 segundo
                r.adjust_for_ambient_noise(s, duration = 0.5)
                #armazena o que foi dito para a variavel audio, aguarda até 3 segundos de silencio antes de encerrar e ouve por ate 7 segundos
                audio = r.listen(s, 3, 7)
                #reconhece o que foi dito
                speech = r.recognize_google(audio, language= 'pt')
                print('Você disse: ', speech)
                continuar = 1
                #loop para continuar após a primeira interação
                while continuar == 1:
                        if "combustível" in speech:
                                engine.say('Há ' +porcento_combustivel+' porcento do tanque de combustível. Quer verificar mais alguma coisa?')
                                engine.runAndWait()
                                audio = r.listen(s, 3, 7)
                                speech = r.recognize_google(audio, language= 'pt')
                                print('Você disse: ', speech)
                                if "não" in speech:
                                        continuar = 0
                                        engine.say('Ta bom, pode contar comigo sempre que precisar')
                                        engine.runAndWait()
                        elif "óleo" in speech:
                                engine.say('O nível do óleo está ok! Algo mais?')
                                engine.runAndWait()
                                audio = r.listen(s, 3, 7)
                                speech = r.recognize_google(audio, language= 'pt')
                                print('Você disse: ', speech)
                                if "não" in speech:
                                        continuar = 0
                                        print('Você disse: ', speech)
                                        engine.say('Ta bom, pode contar comigo sempre que precisar')
                                        engine.runAndWait()
                        elif "freio" in speech:
                                print('Assistente: Cuidado! Você precisa trocar a pastilha do freio! Agende a troca assim que possível. Posso ajudar em algo mais?')
                                engine.say('Cuidado! Você precisa trocar a pastilha do freio! Agende a troca assim que possível. POsso ajudar em algo mais?')
                                engine.runAndWait()
                                audio = r.listen(s, 3, 7)
                                speech = r.recognize_google(audio, language= 'pt')
                                print('Você disse: ', speech)
                                if "não" in speech:
                                        continuar = 0
                                        print('Você disse: ', speech)
                                        engine.say('Ta bom, pode contar comigo sempre que precisar')
                                        engine.runAndWait()
                        else:
                                print('Não entendi. Pode repetir?')
                                engine.say('Não entendi. Pode repetir?')
                                engine.runAndWait()
                                audio = r.listen(s, 3, 7)
                                speech = r.recognize_google(audio, language= 'pt')
                                print('Você disse: ', speech)
                                if "não" in speech:
                                        continuar = 0
                                        print('Você disse: ', speech)
                                        engine.say('Ta bom, pode contar comigo sempre que precisar')
                                        engine.runAndWait()
        except:
                print("Não foi possível iniciar. Tente novamente")
