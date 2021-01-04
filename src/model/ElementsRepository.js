import * as elementsModel from '../model/data.json';
import {getElementsName} from '../helpers/helper';
import Element from './Element';

class ElementsRepository {
    elements = [];

    constructor() {
        if( !!ElementsRepository.instance ) {
            return ElementsRepository.instance;
        }
        
        ElementsRepository.instance = this;
        getElementsName(elementsModel).forEach(element => {
            const elementInst = new Element(elementsModel.default[element]);
            this.elements.push(elementInst)
        });

        return this;
    }

    getBySymbol( symbol ) {
        return this.elements.find(element => element.symbol === symbol)
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

    getElements(){
        return this.elements
    }
}

export default ElementsRepository;