import store from '@/store'
import { test, vi, describe,expect } from 'vitest'
import { mount } from '@vue/test-utils';
import axios from 'axios'
import App from '@/App.vue'
import { gamesList, platformList, runList, testGame, testPlatform } from './responses'

vi.mock('axios')

const mockGet = vi.spyOn(axios,'get');

function factory() {
    let res = mockGet.mockResolvedValueOnce(platformList);
    res = mockGet.mockResolvedValueOnce(gamesList);
    res = mockGet.mockResolvedValueOnce(runList);
    return mount(App, {
        global: {
            plugins: [ store ]
        }
    })
}

describe('App', () => {    
    test('Should mount App correctly', () => {
        const wrapper = factory();
        expect(wrapper).toBeDefined();
    })

    test('Should retrieve data from API', () => {   
        const wrapper = factory();
        expect(mockGet).toHaveBeenCalled();
    })

    test('Header should be set correctly', async () => {
        const wrapper = factory();
        let header = wrapper.find('header');
        expect(header).toBeTruthy();
    })
})