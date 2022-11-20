import { Model, Collection } from 'vue-mc'
import { date, boolean, equal, string, integer, min, required} from 'vue-mc/validation'

export class Platform extends Model {
    defaults() {
        return {
            _id: null,
            name: '',
            release: Date.now(),
            image: ''
        }
    }
    modifiers() {
        return {
            _id: (id) => Number(id) || null,
            name: String,
            releaseDate: Date,
            image: String
        }
    }
    validation() {
        return {
            _id: integer.and(min(1)).or(equal(null)),
            name: string.and(required),
            releaseDate: date,
            image: string
        }
    }
    options() {
        return {
            validateOnChange: false,
            validateOnSave: true,
            validateRecursively: true
        }
    }
}

export class PlatformCollection extends Collection {
    options() {
        return {
            model: Platform,
        }
    }
}