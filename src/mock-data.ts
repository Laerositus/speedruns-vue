import type { Game } from './models/game'
import type { Platform } from './models/platform'
import type { Category } from './models/category'
import type { Run } from './models/run'
import { Player } from './models/player'

export const PLATFORMS: Platform[] = [
    {
        _id: "PSX",
        name: "Playstation",
        releaseDate: new Date("1995-09-29"),
    },
    {
        _id: "PS2",
        name: "Playstation 2",
        releaseDate: new Date("2000-11-04"),
    },
    {
        _id: "PS3",
        name: "Playstation 3",
        releaseDate: new Date("2007-03-23"),
    },
    {
        _id: "PS4",
        name: "Playstation 4",
        releaseDate: new Date("2013-11-29"),
    }
]

export const GAMES: Game[] = [
    {
        _id: "0",
        name: "Empty game",
        platforms: [PLATFORMS[0]._id, PLATFORMS[1]._id],
        releaseDate: new Date("0000-00-00"),
        totalRuns: 0,
        playerCount: 0,
        categories: [
            {
                _id: "0",
                name: "",
                categoryRule: ""
            }
        ],
        gameRule: "",
        image: "",
    },
    {
        _id: "1",
        name: "Crash Bandicoot",
        platforms: [PLATFORMS[0]._id, PLATFORMS[1]._id],
        releaseDate: new Date("1996-09-09"),
        totalRuns: 0,
        playerCount: 0,
        categories: [
            {
                _id: "1",
                name: "Any%",
                categoryRule: "Finish the game as fast as possible."
            }
        ],
        gameRule: "Run starts at select of Start game and ends at final boss fight",
        image: '',
    },
    {
        _id: "2",
        name: "Sly Cooper 2: Band of Thieves",
        platforms: [PLATFORMS[2]._id, PLATFORMS[3]._id],
        releaseDate: new Date("2004-09-14"),
        totalRuns: 4,
        playerCount: 3,
        categories: [
            {
                _id: "1",
                name: "Any%",
                categoryRule: "Finish the game as fast as possible."
            },
            {
                _id: "2",
                name: "Glitchless%",
                categoryRule: "Finish the game as fast as possible without using glitches/exploits."
            }
        ],
        gameRule: "Run starts at select of start game and ends at final boss fight",
        image: "https://upload.wikimedia.org/wikipedia/en/b/b8/Sly_2_-_Band_of_Thieves_Coverart.png"
    }
]

export const PLAYERS: Player[] = [new Player("Laerositus"), new Player("OmgItsShrek")]

export const RUNS: Run[] = [
    {
        _id: "1",
        game: GAMES[1]._id,
        category: GAMES[1].categories[0]._id,
        time: {hours: 1, minutes: 1, seconds: 1},
        platform: GAMES[1].platforms[0],
        player: PLAYERS[0].playername,
        placement: 1,
        videoLink: "https://www.youtube.com"
    },
    {
        _id: "2",
        game: GAMES[2]._id,
        category: GAMES[1].categories[0]._id,
        time: {hours: 3, minutes:5, seconds: 23},
        platform: GAMES[2].platforms[0],
        player: PLAYERS[0].playername,
        placement: 1,
        videoLink: "https://www.youtube.com"
    }
]

export const STATE = {
    games: new Array<Game>(),
    platforms: new Array<Platform>(),
    runs: new Array<Run>(),
    loggedIn: true,
    loggedInPlayer: PLAYERS[0]
}