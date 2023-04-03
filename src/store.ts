import { createStore } from 'vuex'
import { PLAYERS } from './mock-data'
import type { Game } from '@/models/game'
import type { Platform } from '@/models/platform'
import type { Run } from '@/models/run'
import { Category } from '@/models/category'

const state = {
    games: new Array<Game>(),
    platforms: new Array<Platform>(),
    runs: new Array<Run>(),
    loggedIn: true,
    loggedInPlayer: PLAYERS[0]
}

const mutations = {
    setGames(state: any, games: Game[]) {
        // console.log("Mutation setGames called");
        if(games == undefined) return;
        state.games = games;
        
        state.games.forEach((game: { totalRuns: number | undefined; playerCount: number | undefined }) => {
            if(game.totalRuns == undefined) { game.totalRuns =  0; }
            if(game.playerCount == undefined) { game.playerCount = 0; }
        })
        // console.log(state.games);
    },
    setPlatforms(state: any, platforms: Platform[]) {
        // console.log("Mutation setPlatforms called");
        state.platforms = platforms;
    },
    setRuns(state: any, runs: any) {
        const sortRuns = (runsToSort: any) => {
            const timeInSeconds = (time : {hours: number, minutes: number, seconds: number}) => time.hours * 60 * 60 + time.minutes * 60 + time.seconds;
            const sortedRuns = runsToSort.sort((
                a: { time: { hours: number; minutes: number; seconds: number } },
                b: { time: { hours: number; minutes: number; seconds: number } }
                ) => timeInSeconds(a.time)-timeInSeconds(b.time));
            return sortedRuns;
        };

        if (state.games == undefined || runs == undefined) return;
        state.games.forEach((game: Game) => {
            const runList = runs.filter((run: {game: string}) => run.game == game._id);
            game.totalRuns = runList.length;            
            const sortedRuns = sortRuns(runList);
            
            var playersInRuns = new Array<string>();
            var i = 1;
            sortedRuns.forEach((run: Run) => {
                if(!playersInRuns.includes(run.player)){
                    playersInRuns.push(run.player);
                }
                run.placement = i;
                i++;
                state.runs.push(run);
            })
            game.playerCount = playersInRuns.length;
        });
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
        game.totalRuns = 0;
        game.playerCount = 0;
        if(state.games == undefined) {
            state.games = new Array<Game>();
        }

        state.games.push(game);
    },
    removeGame(state: any, removedGameId: any){
        // console.log("Mutation removeGame called");
        state.games = state.games.filter((game: any) => game._id !== removedGameId);
    },
    addPlatform(state: any, platform: Platform) {
        if (state.platforms == undefined) { state.platforms = new Array<Platform>(); }
        state.platforms.push(platform);
    },
    removePlatform(state: any, removedPlatformId: any){
        // console.log("Mutation removeGame called");
        state.platforms = state.platforms.filter((platform: any) => platform._id !== removedPlatformId);
    },
    addRun(state: any, run: Run) {
        if(state.runs == undefined) { state.runs = new Array<Run>(); }
        let runs = state.runs;
        runs.push(run);
        this.commit('setRuns', runs);
    },
    removeRun(state: any, removedRunId: string) {
        const runs = state.runs;
        const filteredRuns = runs.filter((run: any) => run._id !== removedRunId);
        state.commit('setRuns', filteredRuns);
    },
    logIn(state: any, player: any){
        // console.log("Mutation logIn called");
        state.loggedIn = true;
        
        state.loggedInPlayer = player;
        // console.log("Logged in player:");
        // console.log(state.loggedInPlayer);
    },
    logOut(state: any){
        state.loggedIn = false;
        state.loggedInPlayer = null;
    }
}

const actions = {
    
}

const getters = {
    runsSorted (state:any, runs: Run[]): Run[] {
        const timeInSeconds = (time : {hours: number, minutes: number, seconds: number}) => time.hours * 60 * 60 + time.minutes * 60 + time.seconds;
        const sortedRuns = runs.sort((a,b) => timeInSeconds(a.time)-timeInSeconds(b.time));
        return sortedRuns;
    },
    filteredPlatformIDs: (state: any) => (platforms: string[]) =>{
        const filteredPlatforms = state.platforms.filter((platform: {name: string}) => platforms.includes(platform.name));
        const fpIDs = new Array<string>();
        filteredPlatforms.forEach((p: { _id: string }) => fpIDs.push(p._id));
        return fpIDs;
    },    
    filteredPlatformNames: (state: any) => (platforms: string[]) =>{
        if(platforms == undefined) return;
        const filteredPlatforms = state.platforms.filter((platform: { _id: string }) => platforms.includes(platform._id))
        const fpNames = new Array<string>();
        filteredPlatforms.forEach((p: { name: string }) => fpNames.push(p.name));
        return fpNames;
    },
    filteredPlatforms: (state:any) => (platforms: string[]) => {
        const filteredPlatforms = state.platforms.filter((platform: { _id: string }) => platforms.includes(platform._id));
        return filteredPlatforms;
    },
    gameListByPlatform: (state:any) => (platform: Platform) => {
        const gameList = state.games.filter((game: { platforms: string | string[] }) => game.platforms.includes(platform._id));
        return gameList;
    },
    runListByGame: (state:any) => (game: Game) => {
        const runList = state.runs.filter((run: {game: string}) => run.game == game._id);
        return runList;
    },
}

const modules = {}

export default createStore({
    state,
    mutations,
    actions,
    getters,
    modules
})