# HorrorWorkingTitle-Server

Server-side endpoint for `HorrorWorkingTitle` games

### Architecture

The WebSocket protocol is used to facilitate the signaling process for setting up the WebRTC connection
between client and server.

Once a conenction is established, WebRTC data channels are used to communicate in-game data.
* A reliable channel is used for administrative tasks (e.g., setting up a lobby, starting the game, etc.)
* An unreliable channel is used for real-time updates (e.g., game state)

`Server` manages setting up the RTC connections and can host a number of different `Game` instances
A `Game` runs the main simulation code and handles receiving input and broadcasting game state to users