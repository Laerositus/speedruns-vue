import { shallowMount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { routeNames } from '@/router'
import Home from '@/views/Home.vue'

describe('Home', () => {
    test( `Navigate to ${routeNames.PLAYER} with id`), async () => {
        const wrapper = shallowMount(Home);

        await wrapper.find("el-button").trigger('click');
        expect(something_to_happen);
    }
})

