import { mount } from '@vue/test-utils'
import GameAdd from '@/views/Game/GameAdd.vue'
import store from '@/store'
import { describe, test, expect } from 'vitest'

function factory() {
    return mount(GameAdd, {
        global: {
            plugins: [ store]
        }
    })
}

describe('GameAdd', () => {
    test('Should mount component correctly', () => {
        const wrapper = factory();
        expect(wrapper).toBeTruthy();
    })

    test('Should display valid form', () => {
        const wrapper = factory();
        expect(wrapper.find('el-form')).toBeTruthy();
    })

    
})