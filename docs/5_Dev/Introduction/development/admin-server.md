This page assumes your are running a dedicated server running on a Docker container. If that isn't the case and don't know what you are doing, please refer to [[Host a Server|Host a Server page.]]

== Updating The Server Version ==
Since you are running a Docker container, assuming you are using '''"develop"''' as the tag, all you have to do to update to latest version of "develop" is just recreating the container.

If you are doing it manually, just use the command
```bash
docker compose up
```
Docker compose always pulls the latest version of the container image before running the application.

If you prefer a visual way and managed to install Portainer, as explained in our [[Host a Server|Host a Server guide]], you can simply click on the container and press the '''"Recreate"''' button

.
[[File:Recreate button.png|frameless|749x749px]]

Then toggle '''"Re-pull image"'''

[[File:Repull.png|frameless|429x429px]]


It is possible to automate server updates by using a container like [https://containrrr.dev/watchtower/ Watchtower]. Please refer to their documentation for installation steps, just remember to change the poll interval, since by default Watchtower checks for new version every 24 hours.

== Environmental Variables ==
There are some configurations you can add directly to your docer-compose.yml file by simply adding them to the list under the '''environment''' key. You probably already set one of those, the '''SERVER_NAME''' variable that will display whatever name you chose for your server.

Here is a list of others you might find interesting, including Discord webhooks so you can route some chat and logs to your Discord server!
{| class="wikitable"
|+
!Variable
!Description
|-
|RCON_PASSWORD
|Password to log into your remote console. See [[RCON guide]] for more information.
|-
|HUB_USERNAME
|Name you provided on your whitelisting interview to identify your server on the hub.
|-
|HUB_PASSWORD
|Token that was provided to you on your whitelisting interview to identify your server on the hub.
|-
|SERVER_NAME
|The name of your server. It will appear in the server list and also Server Info floating window.
|-
|ERROR_WEBHOOK
|Add a discord webhook here to receive all errors on that channel.
|-
|OOC_WEBHOOK
|Add a discord webhook here to receive all OOC chat on that channel.
|-
|ANNOUN_WEBHOOK
|Add a discord webhook here to receive all game announcements, such as round started or round ended, on that channel.
|-
|ADMIN_WEBHOOK
|Add a discord webhook here to receive all ahelp chat on that channel.
|-
|ADMINLOG_WEBHOOK
|Add a discord webhook here to receive the admin log on that channel.
|-
|DISCORDLINKID
|Your Discord's server URL. This will show in your Server Info floating window, so people can join your DIscord server.
|}

== Mounting Config Files ==
Think of running an application in a Docker container like having a small computer within your actual computer. This little computer is programmed to run the game application and it has a 'memory freeze' function. This means that when you switch it off and then on again, it goes back to the way it was when you first set it up, like nothing ever changed. So, if you want to make sure that certain files keep their changes even after you've switched off this mini-computer, you need to perform an action called 'mounting'.

'Mounting' is like creating a special link between a file or a folder on your actual computer and the same file or folder inside the mini-computer. This link ensures that every time the mini-computer needs to use that file or folder, it uses the one on your actual computer instead. This way, any changes you make to that file or folder are kept safe, even when you turn off the mini-computer.

If you followed the [[Host a Server|Host a Server guide]] step by step, by this point you already did your first mount! Let's take a look again at the docker-compose file:
```yaml
version: "3.7"

services:
  unitystation:
    image: unitystation/unitystation:stable
    ports:
      - 7777:7777/udp
      - 7777:7777/tcp
      - 7778:7778/tcp
    environment:
      SERVER_NAME: Unitystation - EU02 Staging
      HUB_USERNAME: YOUR_USERNAME
      HUB_PASSWORD: YOUR_PASSWORD
    labels:
      - io.portainer.accesscontrol.public
    volumes:
      - /root/staging/admin:/server/Unitystation_Data/StreamingAssets/Config/Admin
```
under the '''volumes''' key, at line 17, you can see how we are mounting the admin folder.

Here's how it works: write the path on your actual computer, add a colon (:), and then write the path inside the mini-computer. Make sure to follow this format each time you want to mount a file or folder. And, don't forget to check that the file or folder you want to mount exists on your real computer before you start the server!

So if you want to mount more files or folder, simply add them to the list following the same pattern.

In the next sections, we'll introduce you to a few files that could be useful to mount. It's all up to you! You can choose to mount some of them, all of them, or none at all. Enjoy customizing your server to suit your needs!

== The "admin" Folder ==
'''Type:''' folder

'''Path in container:''' /server/Unitystation_Data/StreamingAssets/Config/Admin


This folder contains a lot of files related to moderation of the game. All files inside the folder are generated every time you run the game and they aren't found, so it is safe to mount an empty folder.
{| class="wikitable"
|+These are the files you can find inside the folder:
!Filename
!Description
|-
|admin.txt
|Here you write the UUID of the players you want to have admin power (see Adding Admins section)
|-
|automodconfig.json
|Here you can enable or disable some auto mod features, such as spam prevention.
|-
|jobBanlist.json
|This file isn't meant to be edited manually, although you can do it if you assume the risks. This file will persist job bans applied by admins during the game.
|-
|mentors.txt
|Similar to admins.txt, you add UUIDs here to make those players mentors. Mentors have their own mentor chat and can help players with their gameplay questions.
|-
|permissions.toml
|This file currently doesn't work. It is a WIP integration of a new more flexible permissions system that will replace admins.txt and mentors.txt
|-
|whitelist.txt
|This file works the same as admins.txt and mentors.txt, but only the player's UUID you add here are going to be able to join your server.
|}

== Maps Rotation File ==
'''Type:''' file

'''Path in container:''' /server/Unitystation_Data/StreamingAssets/Config/maps.json


This file lets you choose which maps you want to rotate through during gameplay and how many players need to be playing for them to become available. Here's a sample of what the file's contents might look like, so you can customize your own:
```json
{
    "lowPopMaps":["MiniStation", "FallStation", "SquareStation"],
    "medPopMaps":["MiniStation", "FallStation", "SquareStation", "OutpostStation"],
    "highPopMaps": ["OutpostStation", "BoxStationV1"],
    "medPopMinLimit":25,
    "highPopMinLimit": 40
}
```
The map names here correspond to the scene options available in the game build you're using. If you've customized the build and added your own map, you can include it in this rotation. Just remember to use the file name of your map, minus the .unity extension.

== Auto Mod Word Filter File ==
'''Type:''' file

'''Path in container:''' /server/Unitystation_Data/StreamingAssets/Config/Admin/wordfilter.txt

If there are certain words you'd prefer to keep out of your game's chat, just add them to this file, one word per line. Once you enable the AutoMod feature and word filter in the '[[Manage Your Server#Auto Mod Word Filter File|automodconfig.json]]' file, these words will be automatically censored.

== Game Configuration File ==
'''Type:''' file

'''Path in container:''' /server/Unitystation_Data/StreamingAssets/Config/gameConfig.json


This file let's you personalize the gameplay by enabling and disabling some features or tweaking numbers. Here is an example of the file content so you can make your own:
```json
{
	"RandomEventsAllowed": true,

	"SpawnLavaLand": true,

	"MinPlayersForCountdown": 1,

	"MinReadyPlayersForCountdown": 1,

	"PreRoundTime": 120,

	"RoundEndTime": 60,

	"RoundsPerMap": 10,

	"InitialGameMode": "Random",

	"RespawnAllowed": false,

	"ShuttleDepartTime": 180,

	"GibbingAllowed": false,

	"ShuttleGibbingAllowed": true,

	"AdminOnlyHtml": true,

	"CharacterNameLimit": 32,

	"MalfAIRecieveTheirIntendedObjectiveChance": 35,

	"ServerShutsDownOnRoundEnd" : true,

	"PlayerLimit" : 100,

	"LowPopLimit" : 20,

	"LowPopCheckTimeAfterRoundStart" : 300,

	"RebootOnAverageFPSOrLower" : 20
}
```
{| class="wikitable"
|+
!Key
!Description
|-
|RandomEventsAllowed
|It will enable or disable random events from happening.
|-
|SpawnLavaLand
|Wether this round should spawn Lavaland or not.
|-
|MinPlayerForCountdown
|Number determines how many players are needed to start the countdown in lobby.
|-
|MinReadyPlayersForCountdown
|How many players are needed to be ready to start the countdown.
|-
|PreRoundTime
|How much time in seconds should we wait on lobby before starting a round.
|-
|RoundEndTime
|How much time in seconds we wait before ending a round when the escape shuttle arrived at Centcom.
|-
|RoundsPerMap
|?
|-
|InitialGameMode
|Set what game mode will the first round play.
|-
|RespawnAllowed
|If true, players are allowed to respawn themselves by pressing the respawn button in ghost menu.
|-
|ShuttleDepartTime
|Time in seconds the shuttle waits at departures before leaving.
|-
|GibbingAllowed
|Wether gibbing players by performing enough damage to them is allowed or not.
|-
|ShuttleGibbingAllowed
|Wether shuttles can gib players by crushing them.
|-
|AdminOnlyHtml
|If false, anyone is able to send links on chat.
|-
|CharacterNameLimit
|Limit the amounts of characters a player controlled character's name can have.
|-
|MalfAiReceiveTheirIntendedObjectiveChance
|?
|-
|ServerShutsDownOnRoundEnd
|If true, the server will completely shut down after a round ends. Depending on you configuration, you might need to manually launch your container again.
|-
|PlayerLimit
|Limit the amount of players that can join the server. Admins bypass this limitation.
|-
|LowPopLimit
|How many players to consider a round a lowpop round.
|-
|LowPopCheckTimeAfterRoundStart
|Time we wait to count players again and tag the round as normal amount of players or keep lowpop.
|-
|RebootOnAverageFPSOrLower
|If the avergage FPS of the server are this amount or lower, the server will auto restart when the round ends.
|}

== Adding A Server Description ==
'''Type:''' file

'''Path in container:''' /server/Unitystation_Data/StreamingAssets/Config/serverDesc.txt

[[File:Server info motd.png|left|frameless|457x457px]]


Whatever you write in this file will appear in the Server Information floating window, specifically the MOTD tab.

You can add some formatting to the text by using [http://digitalnativestudios.com/textmeshpro/docs/rich-text/ TextMeshPro tags]











== Adding Rules ==
'''Type:''' file

'''Path in container:''' /server/Unitystation_Data/StreamingAssets/Config/serverRules.txt

This file works exactly the same as the server description file, but for the rules tab. You can also use [http://digitalnativestudios.com/textmeshpro/docs/rich-text/ TextMeshPro tags] here.
[[Category:Technical Guides]]
