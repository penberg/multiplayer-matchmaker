# Multiplayer Matchmaker

This project implements a multiplayer matchmaker with ChiselStrike.

## Getting Started

To get going, run:

```console
npm run dev
```

Which starts a local development server of the multiplayer matchmaker.

To start a matchmaking process, run:

```console
curl -d '{"username": "alice"}' localhost:8080/dev/match 
```

The query returns the session the player is queued for:

```json
{
  "id": "a2f27ea0-295d-4c4c-be86-af27081d50fb",
  "serverAddr": "10.0.1.1:1000",
  "state": "MATCHMAKING",
  "requiredPlayers": 2,
  "players": [
    "alice"
  ]
}
```

To complete the matchmaking, run:

```console
curl -d '{"username": "alice"}' localhost:8080/dev/match 
```

The query returns the completed session:

```json
{
  "id": "a2f27ea0-295d-4c4c-be86-af27081d50fb",
  "serverAddr": "10.0.1.1:1000",
  "state": "DONE",
  "requiredPlayers": 2,
  "players": [
    "alice",
    "bob"
  ]
}
```

To see all complete sessions, run:

```console
curl "localhost:8080/dev/sessions?.state=DONE"
```

To delete completed sessions, run:

```console
curl -X DELETE "localhost:8080/dev/sessions?.state=DONE"
```

## Deploying

You can build a Docker image of the multiplayer matchmaker with:

```console
docker build . --tag multiplayer-matchmaker
```