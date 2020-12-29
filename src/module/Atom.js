import * as THREE from 'three';
import {getRandomFloat, drawSphere} from './helpers';
import { getShell } from './Shell';
import {Raycaster} from '../helpers/raycaster';
import { drawLabel } from '../module/helpers';

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
      const { element: { shells }} = this;
      const INTERSECTED = [];
      shells.forEach((electronsAmount, i) => {
        const { shell, electrons, hoverShell, unhoverShell } = getShell(electronsAmount, i, shells.length)
        this.electrons.push(...electrons);

        const raycastAction = ( raycaster, mouse ) => {
          raycaster.near = 1; 
          const intersects = raycaster.intersectObjects(shell.children, false);
          const atnotation = document.querySelector("#adnotation");

          atnotation.style.transition = 'opacity 0.2s';
           if( intersects?.length ) {
              hoverShell()
              if(INTERSECTED.indexOf(i) === -1 ) {
                INTERSECTED.push(i)
              }
          
              atnotation.style.transform = `translate(${mouse.clientX}px, ${mouse.clientY-600}px)`;
              atnotation.style.opacity = '1';
           } else {
              unhoverShell();
              const indexOfunHovered = INTERSECTED.indexOf(i)
              indexOfunHovered !== -1 && INTERSECTED.splice(indexOfunHovered, 1)
              if(!INTERSECTED.length) {
                atnotation.style.opacity = '0';
              }
              
           }
        }

        Raycaster.addRaycasterAction(raycastAction)
        this.add(shell);
      });
    }

  drawKernel = () => {

    const kernel = new THREE.Group();
    //neutrons
    for( let i = 0; i < this.element.neutrons; i++ ) {
      const sphere = drawSphere(0x0000bb, 0x0000ff);
      kernel.add(sphere)
    }
    
    // protons
    for( let i = 0; i < this.element.atomicMass; i++ ) {
      const sphere = drawSphere(0xbb0000, 0xff0000);
      kernel.add(sphere)
    }

      const raycastAction = ( raycaster, mouse ) => {
          raycaster.near = 1
          const intersects = raycaster.intersectObjects(kernel.children, false);
          const atnotation = document.querySelector("#adnotation_kernel");
           atnotation.style.transition = 'opacity 0.2s';

           if( intersects?.length ) {

              atnotation.style.transform = `translate(${mouse.clientX}px, ${mouse.clientY-600}px)`;
              atnotation.style.opacity = '1';
              atnotation.innerHTML = `Protony: ${this.element.atomicMass} \n Neutrony: ${this.element.neutrons}`

              kernel.children.forEach(item => {
                item.material.color.set(item.userData.hoverColor);
              })
           } else {
              atnotation.style.opacity = '0';
               kernel.children.forEach(item => {
                item.material.color.set(item.userData.color);
              })
           }
        }

    Raycaster.addRaycasterAction(raycastAction)
    this.add( kernel );
  }

  update = () => {
    this.electrons.forEach(({sphere, speed}) => {
      sphere.rotation.z += speed;
    })
  }

}

export default Atom;