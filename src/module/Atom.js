
import * as THREE from 'three';

class Atom extends THREE.Group {
    constructor(element){
      super()
      this.element = element;

      const atom = this.drawAtom();
      this.add(atom);
    }
  
    drawAtom = () => {
        this.drawShells();
        this.drawKernel();
        this.animateElectrons();
    }

    drawShells = () => {
      const { element: {shells}} = this;
      console.log(shells.length)
      shells.forEach((element, i)  => {
          const radius = 4*(1/shells.length)*(i+1);
          const tube = 0.005;

          const geometry = new THREE.TorusGeometry( radius, tube, 3, 100 );
          const material = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
          const torus = new THREE.Mesh( geometry, material );
          animateElectrons();
          this.add(torus)
      });
    }

  getRandomFloat = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  drawBall = (color) => {
    const geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
      const material = new THREE.MeshBasicMaterial( {color} );
      const sphere = new THREE.Mesh( geometry, material );
      console.log(this.getRandomFloat(-0.5, 0.5))
      return sphere;
  }

  drawKernel = () => {
    //neutrons
    for( let i = 0; i < this.element.neutrons; i++ ) {
      const sphere = this.drawBall(0x0000ff);
      sphere.position.set(
        this.getRandomFloat(-0.1, 0.1),
        this.getRandomFloat(-0.1, 0.1),
        this.getRandomFloat(-0.1, 0.1))
      this.add( sphere );
    }
    
    // protons
    for( let i = 0; i < this.element.atomicMass; i++ ) {
      const sphere = this.drawBall(0xff0000);
      sphere.position.set(
        this.getRandomFloat(-0.1, 0.1),
        this.getRandomFloat(-0.1, 0.1), 
        this.getRandomFloat(-0.1, 0.1)
      );
      this.add( sphere );
    }
  }

}

export default Atom;