

  
import * as THREE from 'three';

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

export const drawSphere = (color) => {
  const geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color} );
    const sphere = new THREE.Mesh( geometry, material );
    return sphere;
}
