
import type { Game } from './game'
export class Platform {
    constructor(
        public _id: string,
        public name: string,
        public releaseDate: Date,
        // public games: Array<String>
    ){}    
}
