import { Model, Collection } from 'vue-mc';

export class Category extends Model{
    defaults() {
        return { 
            _id: "",
            name: "",
            categoryRule: ""
        }
    }
    mutations() {
        return { 
            _id: String,
            name: String,
            categoryRule: String
        }
    }   
}

export class CategoryCollection extends Collection {
    options() {
        return {
            model: Collection
        }
    }
}
