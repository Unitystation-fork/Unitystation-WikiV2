import requests
import json

url = "https://api.unitystation.org/serverlist"

shiet = \
    """
<div class="card" style="width: 18rem;">
  <div class="card-header">
    {}
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">IP: {} Port: {}</li>
    <li class="list-group-item">Map: {}</li>
    <li class="list-group-item">Game mode: {}</li>
    <li class="list-group-item">Players: {}</li>
  </ul>
</div>
<br>
"""


def define_env(env):
    @env.macro
    def serverdata():
        # response = json.loads(requests.get(url).text)
        # # pprint(response)
        #
        # html = build_html(response)

        return "hola mundo"

    def build_html(api_response):
        html = ""

        for server in api_response["servers"]:
            name = server["ServerName"]
            ip = server["ServerIP"]
            port = server["ServerPort"]
            _map = server["CurrentMap"]
            gamemode = server["GameMode"]
            players = server["PlayerCount"]

            html += shiet.format(name, ip, port, _map, gamemode, players)

        return html
