import * as THREE from 'three'
import {getRandomFloat, drawSphere} from './helpers';

export const getShell = (electronsAmount, radius) => {
    const tube = 0.005;
    const electrons = [];

    const shell = new THREE.Group();

    const overlayGeometry =new THREE.TorusGeometry( radius, 0.15, 3, 100 );
    const overlayMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, opacity: 0, transparent: true } );
    const torusOverlay = new THREE.Mesh( overlayGeometry, overlayMaterial );
    shell.add(torusOverlay)

    const shellGeometry = new THREE.TorusGeometry( radius, tube, 3, 100 );
    const material = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
    const torus = new THREE.Mesh( shellGeometry, material );
    torus.userData.color = 0xdddddd;
    shell.add(torus)

    for( let i = 0; i < electronsAmount; i++ ) {
      const sphere = drawSphere(0x00ff00);
      sphere.position.setX(radius)

      const pivotPoint = new THREE.Object3D();
      pivotPoint.rotation.z = getRandomFloat(0, 360);
      electrons.push({ sphere: pivotPoint, speed: getRandomFloat(0.005, 0.009)});
      pivotPoint.add(sphere);
      pivotPoint.add(sphere)
      shell.add(pivotPoint);
    }

    const hoverShell = () => {
      torus.material.color.set(0xffff00);
      shell.children.forEach(child => {
        if( child.type !== 'Mesh' ) {
          child.children[0].material.color.set(0xffff00);
        }
      })
    }

    const unhoverShell = () => {
      torus.material.color.set(0xdddddd);
      shell.children.forEach(child => {
        if( child.type !== 'Mesh' ) {
          child.children[0].material.color.set(0x00ff00);
        }
      })
    }

    return {
        shell,
        electrons,
        hoverShell,
        unhoverShell,
    };
}