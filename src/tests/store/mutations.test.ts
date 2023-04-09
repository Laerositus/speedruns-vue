import { describe, test, expect, assert, it } from 'vitest'
import { mutations } from '@/store'
import { GAMES, PLAYERS, STATE, PLATFORMS, RUNS } from '@/mock-data'
import { Game } from '@/models/game';
import { Platform } from '@/models/platform';
import { Run } from '@/models/run';


const { setGames } = mutations;
const { addGame } = mutations;
const { updateGame } = mutations;
const { removeGame } = mutations;

describe('GameMutations', () => {
    it('Should set games', () =>{
        setGames(STATE, [GAMES[0], GAMES[1]]);
        expect(STATE.games.length).toBeGreaterThan(0);
    })

    it('Should have correct game information', () => {
        expect(STATE.games[0]._id).toBe(GAMES[0]._id);
    })

    it('Should add game correctly', () => {
        const currentGamesLength = STATE.games.length;
        addGame(STATE, GAMES[2]);
        expect(STATE.games.length).toBeGreaterThan(currentGamesLength);
    })

    it('Should update game', () => {
        const firstGame = STATE.games[0];
        let updatedGame = new Game(
            firstGame._id, 
            "New Game Name", 
            firstGame.platforms, 
            firstGame.releaseDate, 
            firstGame.totalRuns, 
            firstGame.playerCount, 
            firstGame.categories, 
            firstGame.gameRule, 
            firstGame.image
            );
        
        updateGame(STATE, updatedGame);
        
        const newGame = STATE.games.find(g => g._id == firstGame._id);
        expect(newGame?.name).toBe("New Game Name");
    })

    it('Should remove game from state', () => {
        const remGame = STATE.games[0];
        removeGame(STATE, remGame._id);

        expect(STATE.games.includes(remGame)).toBe(false);
    })
})

const { setPlatforms } = mutations;
const { addPlatform } = mutations;
const { updatePlatform } = mutations;
const { removePlatform } = mutations;
describe('PlatformMutations', () => {
    it("Should set platforms to state", () => {
        setPlatforms(STATE, [ PLATFORMS[0], PLATFORMS[1] ]);
        expect(STATE.platforms.length).toEqual(2);
        expect(STATE.platforms[0]._id).toEqual(PLATFORMS[0]._id);
    })

    it('Should add platform to state', () => {
        addPlatform(STATE, PLATFORMS[2]);
        expect(STATE.platforms.length).toEqual(3);
    })

    it('Should update platform', () => {
        const firstPlatform = STATE.platforms[0];
        let updatedPlatform = new Platform(firstPlatform._id, "New Platform name", firstPlatform.releaseDate);
        updatePlatform(STATE, updatedPlatform);

        const newPlatform = STATE.platforms.find(p => p._id == firstPlatform._id);
        expect(newPlatform?.name).toBe("New Platform name");
    })

    it('should remove platform from state', () => {
        const currentStatePlatforms = STATE.platforms;
        removePlatform(STATE, PLATFORMS[0]._id);
        expect(STATE.platforms.length).toBeLessThan(currentStatePlatforms.length);
        expect(STATE.platforms.find(p => p._id == PLATFORMS[0]._id)).toBeUndefined();
    })

})

const { setRuns } = mutations;
const { addRun } = mutations;
const { removeRun } = mutations;
const { updateRun } = mutations;
describe('RunMutations', () => {
    it('Should set runs', () => {
        setRuns(STATE, [RUNS[0]]);
        expect(STATE.runs.length).toBe(1);
    })

    it('Should add runs', () => {
        addRun(STATE, RUNS[1]);
        expect(STATE.runs.length).toBe(2);
    })

    it('Should update runs', () => {
        const firstRun = STATE.runs[0];
        const newRun = new Run(
            firstRun._id,
            firstRun.game,
            firstRun.category,
            {hours: 5, minutes: 5, seconds: 5},
            firstRun.platform,
            firstRun.player,
            firstRun.placement,
            firstRun.videoLink
        )

        updateRun(STATE, newRun);
        const validateRun = STATE.runs.find(r => r._id == firstRun._id);
        expect(validateRun).not.toBe(firstRun)
    })
})