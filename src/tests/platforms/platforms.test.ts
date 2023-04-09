import { shallowMount, mount } from '@vue/test-utils'
import Platforms from '@/views/Platform/Platforms.vue'
import { GAMES, PLATFORMS, RUNS, STATE} from '@/mock-data'
import { getters, mutations } from '@/store'
import store from '@/store'
import { describe, test, expect, beforeAll } from 'vitest'
import App from '@/App.vue'

function factory() {
    return mount(Platforms, {
        global: {
            plugins: [ store ]
        },
    })
}

describe('Platforms', () => {
    test('Should mount platforms correctly', () => {
        const wrapper = factory();
        expect(wrapper).toBeTruthy();
    })

    test('Should render platforms', () => {
        const wrapper = factory();
        expect(wrapper.vm.platforms.length).toBeGreaterThanOrEqual(1)
    })
})