import * as THREE from 'three';

const mouse = new THREE.Vector2();

export const raycaster = new THREE.Raycaster();

export const Raycaster = {
  raycastActions: [],
  addRaycasterAction: (action) => {
    raycasteActions.push(action);
  },
  setupRaycaster: (camera, scene) => {
    raycaster.setFromCamera(mouse, camera);

    const onMouseMove = (event) => {

      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;


      // calculate objects intersecting the picking ray
      // const intersects = raycaster.intersectObjects( scene.children, true );
      // if(intersects?.length) {
      //   for ( let i = 0; i < intersects.length; i ++ ) {
      //     if(intersects[i].object.type === 'Mesh') {
      //       intersects[i].object.material.color.set( 0xffff00 );
      //     }
      //   }
      // }
      if(this.raycastActions?.length) {
        raycastActions.forEach(raycastAction => {
          raycastAction(raycaster);
        })
      }
    }
    window.addEventListener('mousemove', onMouseMove, false);
  },


}






