import * as THREE from 'three';

const mouse = new THREE.Vector2();

export const raycaster = new THREE.Raycaster();

export const Raycaster = {
  raycastActions: [],
  addRaycasterAction: (action) => {
    Raycaster.raycastActions.push(action);
  },
  setupRaycaster: (camera, renderer) => {
    
    const onMouseMove = (event) => {
    const {domElement: {offsetLeft, offsetTop, width, height}} = renderer;
      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components
      mouse.x = ( (event.clientX - offsetLeft) / width ) * 2 - 1;
      mouse.y = -( (event.clientY - offsetTop) / height ) * 2 + 1;

      mouse.clientX = event.clientX;
      mouse.clientY = event.clientY;

        if(Raycaster.raycastActions?.length) {
          Raycaster.raycastActions.forEach((raycastAction) => {
          raycaster.setFromCamera(mouse, camera);
          raycastAction(raycaster, mouse);
        })
      }
    }
    window.addEventListener('mousemove', onMouseMove, false);
  },


}






