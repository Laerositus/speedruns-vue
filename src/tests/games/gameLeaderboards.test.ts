import { mount } from '@vue/test-utils'
import GameLeaderboard from '@/components/GameComponents/GameLeaderboard.vue'
import { GAMES, RUNS} from '@/mock-data'
import store from '@/store'
import { describe, test, expect } from 'vitest'

function factory() {
    return mount(GameLeaderboard, {
        global: {
            plugins: [ store ]
        },
        props: {
            game: GAMES[0],
            runs: RUNS
        }
    })
}

describe('GameLeaderboard', () => {
    test('Should mount game leaderboard', () => {
        const wrapper = factory();
        expect(wrapper).toBeTruthy();
    })

    test('Should render leaderboard', () => {
        const wrapper = factory();
        const placement = wrapper.find('[data-test="placement]"')
        expect(placement).toBeTruthy();
    })
})