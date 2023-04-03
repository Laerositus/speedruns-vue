import { createStore } from 'vuex'
import { PLAYERS } from './mock-data'
import type { Game } from './models/game'
import type { Platform } from './models/platform'
import type { Run } from './models/run'

const state = {
    games: [],
    platforms: [],
    runs: [],
    loggedIn: false,
    loggedInPlayer: PLAYERS[0]
}

const mutations = {
    setGames(state: any, games: Game[]) {
        // console.log("Mutation setGames called");
        state.games = games;
        // console.log(state.games);
    },
    setPlatforms(state: any, platforms: Platform[]) {
        // console.log("Mutation setPlatforms called");
        state.platforms = platforms;
    },
    setRuns(state: any, runs: Run[]) {
        state.runs = runs;
    },
    updateGame(state: any, updatedGame: any){
        // console.log("Mutation updateGame called");
        state.games.forEach((game: any) => {
            if (game._id == updatedGame._id) {
                game = updatedGame;
            }
        })
    },
    addGame(state: any, game: any){
        // console.log("Mutation addGame called");
        state.games.push(game);
    },
    removeGame(state: any, removedGameId: any){
        // console.log("Mutation removeGame called");
        state.games = state.games.filter((game: any) => game._id !== removedGameId);
    },
    addPlatform(state: any, platform: Platform): void {

    },
    removePlatform(state: any, removedPlatformId: any){
        // console.log("Mutation removeGame called");
        state.platforms = state.platforms.filter((platform: any) => platform._id !== removedPlatformId);
    },
    addRun(state: any, run: Run) {
        state.runs.push(run);
    },
    removeRun(state: any, removedRunId: string) {
        state.runs = state.runs.filter((run: any) => run._id !== removedRunId);
    },
    logIn(state: any, player: any){
        // console.log("Mutation logIn called");
        state.loggedIn = true;
        
        state.loggedInPlayer = player;
        console.log("Logged in player:");
        console.log(state.loggedInPlayer);
    },
    logOut(state: any){
        state.loggedIn = false;
    }
}

const actions = {}

const getters = {
    // runCount (state:any, game: Game) {
    //     // return state.game.runs.length;
    // },
    runsSorted (state:any, runs: Run[]): Run[] {
        const timeInSeconds = (time : {hours: number, minutes: number, seconds: number}) => time.hours * 60 * 60 + time.minutes * 60 + time.seconds;
        const sortedRuns = runs.sort((a,b) => timeInSeconds(a.time)-timeInSeconds(b.time));
        return sortedRuns;
    },
    filteredPlatforms: (state: any) => (platforms: string | string[]) => {
        const ps = state.platforms.filter((p : {name: string}) => platforms.includes(p.name));        
        return ps;
    },
    gameListByPlatform: (state:any) => (platform: Platform) => {
        const gameList = state.games.filter((game: { platforms: string | string[] }) => game.platforms.includes(platform.name));
        return gameList;
    },
    runListByGame: (state:any) => (game: Game) => {
        const runList = state.runs.filter((run: {game: string}) => run.game == game._id);
        return runList;
    },
    findPlacementByGame: (state:any) => (game: Game, time: {hours: number, minutes: number, seconds: number}, category: string) => {
        const allRuns = state.getters.runListByGame(game);
        const filteredRuns = allRuns.filter((run: { category: string }) => run.category == category);
        const sortedRuns = state.getters.runsSortedByCategory(filteredRuns);
    }

}

const modules = {}

export default createStore({
    state,
    mutations,
    actions,
    getters,
    modules
})