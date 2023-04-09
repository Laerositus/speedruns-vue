import store from '@/store'
import { test, vi, describe,expect } from 'vitest'
import { mount } from '@vue/test-utils';
import axios from 'axios'
import Entry from '@/components/Entry.vue'
import {registerResponse, loginResponseSuccess, loginResponseFailure } from './responses'

const mockGet = vi.spyOn(axios, 'get')
const mockPost = vi.spyOn(axios, 'post')
vi.mock('axios');

function factory(){
    return mount(Entry, {
        global: {
            plugins: [ store ]
        }
    })
}

describe('Entry', () => {   
    test('Should mount component properly', () => {
        const wrapper = factory();
        expect(wrapper).toBeTruthy();
    })

    test('Should fail registration with no input', async() => {
        const wrapper = factory();

        await wrapper.find('[data-test="register"]').trigger('click');
        expect(wrapper.isVisible).toBeTruthy();
    })

    test('Should register user with valid input', async () => {
        // let regSpy = vi.spyOn(Entry?.methods, 'register');
        const wrapper = factory();
        wrapper.find('[data-test="username"]').setValue('Laerositus');
        wrapper.find('[data-test="password"]').setValue('Laerositus');
        await wrapper.find('[data-test="register]"').trigger('click');
        // expect(regSpy).toHaveBeenCalled();
        expect(wrapper.isVisible()).toBeTruthy();
    })

    // test('Should login user with valid credentials', async() => {
        
    // })

    // test('Should fail login with invalid credentials', async() => {

    // })
})