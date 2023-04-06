import type { Category } from './category'
export class Game{
    constructor(
        public _id : string,
        public name: string,
        public platforms: Array<string>,
        public releaseDate: Date,
        public totalRuns: number,
        public playerCount: number,
        public categories: Array<Category>,
        public gameRule: string,
        public image: string,
    ){}
}
