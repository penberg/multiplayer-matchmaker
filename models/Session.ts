import { ChiselEntity } from "@chiselstrike/api";

export class Session extends ChiselEntity {
    /// The address of the game server.
    serverAddr: string;
    /// The state of this session.
    state: string;
    /// Number of require players to stop matchmaking.
    requiredPlayers: number;
    /// The players participating in this session.
    players: string[];
}