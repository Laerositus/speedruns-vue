import { mount } from '@vue/test-utils'
import GameDetail from "../views/Game/GameDetail.vue"
import {GAMES, PLATFORMS, CATEGORIES } from '../mock-data'

const game = {
    name: "TestGame123",
    releaseDate: "0000-00-00"
}

test("mount component", async () => {
    expect(GameDetail).toBeTruthy();

    const wrapper = mount(GameDetail);
    console.log(wrapper.game.name);
    expect(wrapper.game.name).toBe("Empty");
});