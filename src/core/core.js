
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Raycaster } from '../helpers/raycaster';

export const initEnviroment = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

  window.addEventListener( 'resize', onWindowResize, false );

  const  onWindowResize = () => {

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize( window.innerWidth, window.innerHeight );

  }

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.padding = "0";
  renderer.domElement.style.margin = "0";
  document.body.appendChild( renderer.domElement );
  const controls = new OrbitControls( camera, renderer.domElement );
  controls.enablePan = false;

  camera.position.z = 5;

  const updates = [];

  const addUpdate = ( update ) => {
    updates.push(update);
  }
  
  const animate = () => {
    controls.update();
    updates?.forEach(update => {
      update();
    })
    renderer.render( scene, camera );
    requestAnimationFrame( animate );
  }
  
  Raycaster.setupRaycaster(camera, renderer);

  return {
    animate,
    scene,
    addUpdate
  }

}