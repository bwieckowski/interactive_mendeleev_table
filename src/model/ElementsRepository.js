import * as elementsModel from '../model/data.json';
import {getElementsName} from '../helpers/helper';
import Element from './Element';

class ElementsRepository {
    elements = [];

    constructor() {
        if( !!ElementsRepository.instance ) {
            return SingletonClass.instance;
        }
        
        ElementsRepository.instance = this;
        getElementsName(elementsModel).forEach(element => {
            const elementInst = new Element(elementsModel.default[element]);
            this.elements.push(elementInst)
        });

        return this;
    }

        getByName(name) {
            return this.elements.find(element => element.name === name)
    }

    showNames() {
        return this.elements.map(({name}) => name)
    }
}

export default ElementsRepository;