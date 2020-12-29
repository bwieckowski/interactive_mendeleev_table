import * as THREE from 'three';

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

export const drawSphere = (color, hoverColor) => {
  const geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
    const material = new THREE.MeshPhongMaterial( {color} );
    const sphere = new THREE.Mesh( geometry, material );
    sphere.position.set(
      getRandomFloat(-0.1, 0.1),
      getRandomFloat(-0.1, 0.1),
      getRandomFloat(-0.1, 0.1)
    );
    sphere.userData.color = color;
    sphere.userData.hoverColor = hoverColor;
    return sphere;
}