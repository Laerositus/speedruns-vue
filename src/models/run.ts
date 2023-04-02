import type { Game } from'./game'
import type { Category } from './category'
import type { Platform } from './platform'
import type { Player } from './player'
export class Run {
  constructor(
        public _id: string,
        public game: Game,
        public category: Category,
        public time: { hours: number, minutes: number, seconds: number},
        public platform: Platform,
        public player: Player,
        public placement: number,
        public videoLink: string
    ){ }
}