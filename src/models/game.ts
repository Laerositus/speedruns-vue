import type { Category } from './category'
import type { Platform } from './platform'
export class Game{
    constructor(
        public _id : string,
        public name: string,
        public platforms: Array<String>,
        public releaseDate: Date,
        public totalRuns: number,
        public playerCount: number,
        public categories: Array<Category>,
        public gameRule: string,
        public image: string,
    ){}
}
