

  
import * as THREE from 'three';

export const getRandomFloat = (min, max) => Math.random() * (max - min) + min;

export const drawSphere = (color) => {
  const geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
    const material = new THREE.MeshBasicMaterial( {color} );
    const sphere = new THREE.Mesh( geometry, material );
    return sphere;
}

export const rotateAboutPoint = (obj, point, axis, theta, pointIsWorld) => {
    pointIsWorld = (pointIsWorld === undefined)? false : pointIsWorld;

    if(pointIsWorld){
        obj.parent.localToWorld(obj.position); // compensate for world coordinate
    }

    obj.position.sub(point); // remove the offset
    obj.position.applyAxisAngle(axis, theta); // rotate the POSITION
    obj.position.add(point); // re-add the offset

    if(pointIsWorld){
        obj.parent.worldToLocal(obj.position); // undo world coordinates compensation
    }

    obj.rotateOnAxis(axis, theta); // rotate the OBJECT
}