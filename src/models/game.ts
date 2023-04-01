import type { Category } from './category'
import type { Platform } from './platform'
import type { Run } from './run'
export class Game{
    constructor(
        public _id : string,
        public name: string,
        public platforms: Array<Platform>,
        public releaseDate: Date,
        public totalRuns: number,
        public playerCount: number,
        public runs: Array<Run>,
        public categories: Array<Category>,
        public gameRule: string,
        public image: string,
    ){}
}
