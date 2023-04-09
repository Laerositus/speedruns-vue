import { mount } from '@vue/test-utils'
import GameDetail from '@/views/Game/GameDetail.vue'
import store from '@/store'
import { describe, test, expect } from 'vitest'

function factory() {
    return mount(GameDetail, {
        global: {
            plugins: [ store ],
            mocks: {
                $route: {
                    params: {
                        id: '0'
                    }
                }
            }
        },
    })
}

describe('GameDetail', () => {

    test('Should mount correctly', () => {
        const wrapper = factory();
        expect(wrapper).not.toBeUndefined();
    })

})