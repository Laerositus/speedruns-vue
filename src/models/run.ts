import type { Game } from'./game'
import type { Category } from './category'
import type { Platform } from './platform'
import type { User } from './user'

export class Run {
    constructor(
        public _id: string,
        public game: Game,
        public category: Category,
        public time: Date,
        public platform: Platform,
        public user: User,
        public placement: number,
        public videoLink: string
    ){}
}