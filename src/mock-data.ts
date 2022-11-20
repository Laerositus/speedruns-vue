import type { Game } from './models/game'
import type { Platform, PlatformCollection } from './models/platform'
import type { Category, CategoryCollection } from './models/category'
import type { User } from './models/user'
import type { Run } from './models/run'

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
        _id: "-1",
        name: "Empty game",
        platforms: [  ],
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
        gameRule: ""
    },
    {
        _id: "1",
        name: "Crash Bandicoot",
        platforms: [  ],
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
        gameRule: "Run starts at select of Start game and ends at final boss fight"
    },
    {
        _id: "2",
        name: "Sly Cooper 2: Band of Thieves",
        platforms: ["PS2"],
        releaseDate: new Date("2004-09-14"),
        totalRuns: 4,
        playerCount: 1,
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

export const USERS: User[] = [
    {
        _id: "1",
        username: "Laerositus",
        totalRuns: 4,
        creationDate: new Date()
    },
    {
        _id: "2",
        username: "OmgItsShrek",
        totalRuns: 0,
        creationDate: new Date("2000-01-01")
    }
]

export const RUNS: Run[] = [
    {
        _id: "1",
        game: "2",
        category: "1",
        time: "25:51",
        platform: "PS2",
        user: "1",
        placement: 1,
        videoLink: "https://www.youtube.com"
    }
]