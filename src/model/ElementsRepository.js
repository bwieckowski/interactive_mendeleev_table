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

    getByName( name ) {
        return this.elements.find(element => element.name === name)
    }

    getByIndex( index ) {
        return this.elements[index];
    }

    getByPosytion( xpos, ypos ) {
        return this.elements.find(element => element.xpos === xpos && element.ypos === ypos);
    }

    showNames() {
        return this.elements.map(({name}) => name)
    }

}

export default ElementsRepository;