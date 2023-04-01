import { createStore } from 'vuex'
import { PLAYERS } from './mock-data'
import type { Game } from './models/game'
import type { Run } from './models/run'

const state = {
    games: [],
    platforms: [],
    loggedIn: false,
    loggedInPlayer: PLAYERS[0]
}

const mutations = {
    setGames(state: any, games: any) {
        // console.log("Mutation setGames called");
        state.games = games;
        // console.log(state.games);
    },
    setPlatforms(state: any, platforms: any) {
        // console.log("Mutation setPlatforms called");
        state.platforms = platforms;
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
    runCount (state:any, game: Game) {
        // return state.game.runs.length;
    },
    runsSorted (state:any, game: Game): Run[] {
        let runs = new Array<Run>();
        runs = game.runs.sort((a,b) => a.time.getTime()-b.time.getTime());
        return runs;
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