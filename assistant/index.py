import threading

from assistant import interacao
from consumirFila import consumirFila

threadConsumirFila = threading.Thread(target=consumirFila)
threadConsumirFila.daemon = True
threadConsumirFila.start()

interacao()