import * as THREE from 'three'
import {getRandomFloat, drawSphere} from './helpers';

export const getShell = (electronsAmount, radius) => { 
    const tube = 0.005;
    const electrons = [];
    const geometry = new THREE.TorusGeometry( radius, tube, 3, 100 );
    const material = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
    const torus = new THREE.Mesh( geometry, material );
    const shell = new THREE.Group();
    shell.add(torus)

    for( let i = 0; i < electronsAmount; i++ ) {
      const sphere = drawSphere(0x00ff00);
      sphere.position.setX(radius)

      const pivotPoint = new THREE.Object3D();
      pivotPoint.rotation.z = getRandomFloat(0, 360);
      electrons.push({ sphere: pivotPoint, speed: getRandomFloat(0.005, 0.009)});
      pivotPoint.add(sphere);
      shell.add(pivotPoint);
    }

    return {
        shell,
        electrons
    }; 
}