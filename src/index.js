import * as THREE from 'three';
import { getElementInfoByName} from './helpers/helper';
import './main.css';
import ElementsRepository from './model/ElementsRepository';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.padding = "0";
renderer.domElement.style.margin = "0";
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

const repo = new ElementsRepository();
const element = repo.getByName(repo.showNames()[10])
console.log(element.shells);
console.log(element.name)

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
