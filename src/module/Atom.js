import * as THREE from 'three';
import {getRandomFloat, drawSphere} from './helpers';
import { getShell } from './Shell';
import {raycaster, connectRaycaster} from '../helpers/raycaster';
class Atom extends THREE.Group {
    constructor(element){
      super()
      this.element = element;
      this.electrons = [];
      
      this.drawAtom();
    }
  
    drawAtom = () => {
        this.drawShells();
        this.drawKernel();
    }

    drawShells = () => {
      const { element: {shells}} = this;
      shells.forEach((electronsAmount, i) => {
        const radius = 4*(1/shells.length)*(i+1);
        const { shell, electrons } = getShell(electronsAmount, radius)
        this.electrons.push(...electrons);
        const intersect = raycaster.intersectObject(shell);
        connectRaycaster(intersect);
        this.add(shell);
      });
    }

  drawKernel = () => {
    //neutrons
    for( let i = 0; i < this.element.neutrons; i++ ) {
      const sphere = drawSphere(0x0000ff);
      sphere.position.set(
        getRandomFloat(-0.1, 0.1),
        getRandomFloat(-0.1, 0.1),
        getRandomFloat(-0.1, 0.1))
      this.add( sphere );
    }
    
    // protons
    for( let i = 0; i < this.element.atomicMass; i++ ) {
      const sphere = drawSphere(0xff0000);
      sphere.position.set(
        getRandomFloat(-0.1, 0.1),
        getRandomFloat(-0.1, 0.1),
        getRandomFloat(-0.1, 0.1)
      );
      this.add( sphere );
    }
  }

  update = () => {
    this.electrons.forEach(({sphere, speed}) => {
      sphere.rotation.z += speed;
    })
  }

}

export default Atom;