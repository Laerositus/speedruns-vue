import { mount } from '@vue/test-utils'
import GameInfoBarVue from '@/components/GameComponents/GameInfoBar.vue'
import { GAMES} from '@/mock-data'
import store from '@/store'
import { describe, test, expect } from 'vitest'

function factory() {
    return mount(GameInfoBarVue, {
        global: {
            plugins: [ store]
        },
        props: {
            game: GAMES[0]
        }
    })
}

describe('GameInfoBar', () => {
    test('Should mount correctly', () => {
        const wrapper = factory();
        expect(wrapper).not.toBeUndefined();
    })

    test('Should display game title', () => {
        const wrapper = factory();
        expect(wrapper.html()).toContain(GAMES[0].name);
    })

    test('Should display game title', () => {
        const wrapper = factory();
        expect(wrapper.find('h1').text()).toContain(GAMES[0].name);
    })
})