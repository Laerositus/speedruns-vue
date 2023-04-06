import { createStore } from 'vuex'
import { PLAYERS } from './mock-data'
import type { Game } from '@/models/game'
import type { Platform } from '@/models/platform'
import type { Run } from '@/models/run'
import { Category } from '@/models/category'
import utils from '@/utils'

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
        const newRuns = utils.sortAndPlaceRuns(state.games, runs);
        state.runs = newRuns;
        
        // Update games to match runs
        if (state.games == undefined || newRuns == undefined) return;
        state.games.forEach((game: Game) => {
            const runList = newRuns.filter((run: {game: string}) => run.game == game._id);
            game.totalRuns = runList.length;
            
            var playersInRuns = new Array<string>();
            newRuns.forEach((run: Run) => {
                if (!playersInRuns.includes(run.player)){
                    playersInRuns.push(run.player);
                }
            });
            game.playerCount = playersInRuns.length;
        });
    },
    updateGame(state: any, updatedGame: Game){
        // console.log("Mutation updateGame called");
        const objIndex = state.games.findIndex((game: { _id: any }) => game._id == updatedGame._id);
        state.games[objIndex] = updatedGame;
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
        state.platforms = state.platforms.filter((platform: any) => platform._id !== removedPlatformId);
    },
    addRun(state: any, run: Run) {
        if(state.runs == undefined) { state.runs = new Array<Run>(); }
        let runs = state.runs;
        runs.push(run);

        // Sort runs
        const newRuns = utils.sortAndPlaceRuns(state.games, runs);

        // Update games to match run/player count
        if (state.games == undefined || newRuns == undefined) return;
        state.games.forEach((game: Game) => {
            const runList = newRuns.filter((run: {game: string}) => run.game == game._id);
            game.totalRuns = runList.length;
            
            var playersInRuns = new Array<string>();
            newRuns.forEach((run: Run) => {
                if (!playersInRuns.includes(run.player)){
                    playersInRuns.push(run.player);
                }
            });
            game.playerCount = playersInRuns.length;
        });

    },
    updateRun(state:any, updatedRun: Run) {
        let runs = state.runs;
        const rIndex = runs.findIndex((run: { _id: string }) => run._id == updatedRun._id);
        runs[rIndex] = updatedRun;

        const newRuns = utils.sortAndPlaceRuns(state.games, runs);
        
        if (state.games == undefined || newRuns == undefined) return;
        state.games.forEach((game: Game) => {
            const runList = newRuns.filter((run: {game: string}) => run.game == game._id);
            game.totalRuns = runList.length;
            
            var playersInRuns = new Array<string>();
            newRuns.forEach((run: Run) => {
                if (!playersInRuns.includes(run.player)){
                    playersInRuns.push(run.player);
                }
            });
            game.playerCount = playersInRuns.length;
        });
    },
    removeRun(state: any, removedRunId: string) {
        const runs = state.runs;
        const filteredRuns = runs.filter((run: any) => run._id !== removedRunId);
        const newRuns = utils.sortAndPlaceRuns(state.games, filteredRuns);
        state.runs = newRuns;
        
        if (state.games == undefined || newRuns == undefined) return;
        state.games.forEach((game: Game) => {
            const runList = newRuns.filter((run: {game: string}) => run.game == game._id);
            game.totalRuns = runList.length;
            
            var playersInRuns = new Array<string>();
            newRuns.forEach((run: Run) => {
                if (!playersInRuns.includes(run.player)){
                    playersInRuns.push(run.player);
                }
            });
            game.playerCount = playersInRuns.length;
        });

    },
    logIn(state: any, player: any){
        // console.log("Mutation logIn called");
        state.loggedIn = true;
        
        state.loggedInPlayer = player;
    },
    logOut(state: any){
        state.loggedIn = false;
        state.loggedInPlayer = null;
    }
}

const actions = { }

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