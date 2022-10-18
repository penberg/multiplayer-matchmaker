import { SessionState } from "../lib/SessionState";
import { Session } from "../models/Session";

// Number of players required to stop matchmaking.
const DEFAULT_REQUIRED_PLAYERS = 2;

export default async function (req: Request) {
    const json = await req.json();
    const username = json.username;
    // First see if the player is already part of a session.
    const playerSessions = await Session.cursor().filter(session => {
        return session.players.includes(username);
    }).toArray();
    if (playerSessions.length > 0) {
        return playerSessions[0];
    }
    // Then attempt to find a session where player can join.
    const session = await Session.findOne({ state: SessionState.Matchmaking });
    if (session) {
        // Add player to the session unless they're already there.
        if (!session.players.includes(username)) {
            session.players.push(username);
        }
        // When we have enough players, stop matchmaking.
        if (session.players.length == session.requiredPlayers) {
            session.state = SessionState.Done;
        }
        await session.save();
        return session;
    }
    // Finally, start a new session in matchmaking state.
    const requiredPlayers = DEFAULT_REQUIRED_PLAYERS;
    const host = "10.0.1.1";
    const port = 1000;
    const serverAddr = `${host}:${port}`;
    return await Session.create({
        serverAddr,
        state: SessionState.Matchmaking,
        requiredPlayers,
        players: [username]
    });
}
