import * as THREE from 'three'
import {getRandomFloat, drawSphere} from './helpers';

export const getShell = (electronsAmount, index, shellsAmount) => {
    const tube = 0.005;
    const electrons = [];

    const shell = new THREE.Group();
    const radius = 4 * (1/shellsAmount) * (index+1);
    const overlayGeometry = new THREE.TorusGeometry( radius, 0.15, 3, 100 );
    const overlayMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff, opacity: 0, transparent: true } );
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
      sphere.position.setZ(0)

      const pivotPoint = new THREE.Object3D();
      pivotPoint.rotation.z = getRandomFloat(0, 360);
      electrons.push({ sphere: pivotPoint, speed: getRandomFloat(0.005, 0.009)});
      pivotPoint.add(sphere);
      pivotPoint.add(sphere)
      shell.add(pivotPoint);
    }

    let isHovered = false;

    const hoverShell = () => {
      if( !isHovered ) {
        torus.material.color.set(0xffff00);
        const atnotation = document.querySelector("#adnotation");
         atnotation.innerHTML = `Warstwa ${index+1}: ${electronsAmount} elektronów`
        shell.children.forEach(child => {
          if( child.type !== 'Mesh' ) {
            child.children[0].material.color.set(0xffff00);
          }
        })
        isHovered = true;
      }
    }

    const unhoverShell = () => {
      if(isHovered) {
        torus.material.color.set(0xdddddd);
        shell.children.forEach(child => {
          if( child.type !== 'Mesh' ) {
            child.children[0].material.color.set(0x00ff00);
          }
        })
        isHovered = false;
      }
    }

    return {
        shell,
        electrons,
        hoverShell,
        unhoverShell,
    };
}