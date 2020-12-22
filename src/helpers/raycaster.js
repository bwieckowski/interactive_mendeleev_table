import * as THREE from 'three';

export const setupRaycaster = (camera, scene) => {

  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  const onMouseMove = ( event ) => {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children, true );
    for ( let i = 0; i < intersects.length; i ++ ) {
      if(intersects[i].object.type === 'Mesh') {
        intersects[i].object.material.color.set( 0xffff00 );
      }
    }

  }

  window.addEventListener( 'mousemove', onMouseMove, false );
}







