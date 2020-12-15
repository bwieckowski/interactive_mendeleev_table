import * as THREE from 'three';
import {getRandomFloat, drawSphere, rotateAboutPoint} from './helpers';
class Atom extends THREE.Group {
    constructor(element){
      super()
      this.element = element;
      this.electrons = [];
      
      const atom = this.drawAtom();
      this.add(atom);
    }
  
    drawAtom = () => {
        this.drawShells();
        this.drawKernel();
    }

    drawShells = () => {
      const { element: {shells}} = this;
      shells.forEach((electronsAmount, i) => {
          const radius = 4*(1/shells.length)*(i+1);
          const tube = 0.005;

          const geometry = new THREE.TorusGeometry( radius, tube, 3, 100 );
          const material = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
          const torus = new THREE.Mesh( geometry, material );

          for( let i = 0; i < electronsAmount; i++ ) {
            const sphere = drawSphere(0x00ff00);
            sphere.position.setX(radius)

            const pivotPoint = new THREE.Object3D();
            pivotPoint.add(sphere);
            pivotPoint.rotation.z = getRandomFloat(0, 360);
            this.add(pivotPoint);
            this.electrons.push({ sphere: pivotPoint, speed: getRandomFloat(0.005, 0.009)});
          }
          this.add(torus)
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

  update() {
    this.electrons.forEach(({sphere, speed}) => {
      sphere.rotation.z += speed;
    })
  }

}

export default Atom;