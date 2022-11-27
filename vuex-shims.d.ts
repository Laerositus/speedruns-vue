import { Store } from 'vuex';// path to store file
import { Game } from './src/models/game'
import { Platform } from './src/models/platform'

declare module '@vue/runtime-core' {
  interface State {
    games: Array<Game>;
    platforms: Array<Platform>;
  }
  
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}