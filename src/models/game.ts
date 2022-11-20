import { Model, Collection } from 'vue-mc'
import { string, required, integer, date, array} from 'vue-mc/validation'

import { PlatformCollection } from './platform';
import { Category, CategoryCollection} from './category';

export class Game extends Model {
    defaults() {
        return {
            _id: '',
            name: '',
            platforms: [],
            releaseDate: Date.now(),
            totalRuns: 0,
            playerCount: 0,
            categories: [],
            gameRule: '',
            image: ''
        }
    }
    mutations() {
        return {
            _id: String,
            name: String,
            platforms: Array,
            releaseDate: Date,
            totalRuns: Number,
            playerCount: Number,
            categories: Array,
            gameRule: String,
            image: String
        }
    }
    validation(){
        return {
            _id: string.and(required),
            name: string.and(required),
            platform: array,
            releaseDate: date,
            totalRuns: integer.and(required),
            playerCount: integer.and(required),
            categories: array,
            gameRule: string,
            image: string
        }
        
    }
    
}
