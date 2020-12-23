

  
import * as THREE from 'three';

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

export const drawSphere = (color) => {
  const geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color} );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.userData.color = color;
    return sphere;
}

export const drawLabel = ({x, y}, shellId, electronsAmount) => {
    const text = `Warstwa ${shellId + 1}: ${electronsAmount} elektronów`;

    return  new THREE.TextGeometry(text).translate(x,y, 0);
}