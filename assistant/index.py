import threading

from assistant import interacao
from consumirFila import consumirFila

e = threading.Event()

threadConsumirFila = threading.Thread(name='fordav_interaction', target=interacao, args=(e,))
threadConsumirFila.daemon = True
threadConsumirFila.start()
e.set()

consumirFila(e)

print('Running ford virtual assistant')