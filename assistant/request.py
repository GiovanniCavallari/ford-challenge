import requests

def filmesPerso():
    r = requests.get('https://swapi.dev/api/films/')
    filme = r.json()
    for filme in filme['results']:
        r2 = requests.get(filme['characters'][cod_perso])
        personagem = r2.json()
        print(filme['title'], filme['episode_id'], personagem['name'])


def filmes(cod_filme):
    filme = requests.get('https://swapi.dev/api/films/'+cod_filme+'/').json()
    print(filme['title'], filme['episode_id'])


#filmesPerso(int(input()))
filmesPerso()