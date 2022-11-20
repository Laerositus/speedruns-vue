import { Model, Collection } from 'vue-mc';

import { Game } from './game';
import { Platform } from './platform';
import { User } from './user';
import { Category } from './category';
import { Stream } from './stream';
import { withModifiers } from 'vue';

export class Run extends Model{
    defaults() {
        return {
            _id: '',
            game: null,
            category: null,
            time: '',
            platform: null,
            user: null,
            placement: 0,
            videoLink: null,
        }
    }
    modifiers() {
        return {
            _id: String,
            game: Game,
            category: Category,
            time: String,
            platform: Platform,
            user: User,
            placement: Number,
            videoLink: Stream,
        }
    }
}
