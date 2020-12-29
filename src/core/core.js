
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Raycaster } from '../helpers/raycaster';

export const initEnviroment = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  const renderer = new THREE.WebGLRenderer();

  const onWindowResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
  }

  window.addEventListener( 'resize', onWindowResize, false);

  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.domElement.style.padding = '0';
  renderer.domElement.style.margin = '0';
  document.body.appendChild( renderer.domElement );
  renderer.setClearColor( 0x111111, 1 );

  const controls = new OrbitControls( camera, renderer.domElement );

  //LIGHT
  let light = new THREE.PointLight( 0xaaaaaa, 1, 100 );
  light.position.set( -1, -1, 1 );
  scene.add( light );

  light = new THREE.PointLight( 0xaaaaaa, 1, 100 );
  light.position.set( -1, 1, 1 );
  scene.add( light );

  light = new THREE.PointLight( 0xaaaaaa, 1, 100 );
  light.position.set( 1, -1, 1 );
  scene.add( light );

  controls.enablePan = false;

  controls.maxPolarAngle = 2 * Math.PI / 3;
  controls.minPolarAngle = 2 * Math.PI / 6;

  controls.maxAzimuthAngle =  2 * Math.PI / 6;
  controls.minAzimuthAngle = -2 * Math.PI / 6;

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