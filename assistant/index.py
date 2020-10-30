import threading

from assistant import interacao
from consumirFila import consumirFila

threadConsumirFila = threading.Thread(target=consumirFila)
threadConsumirFila.daemon = False
threadConsumirFila.start()

interacao()