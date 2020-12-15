import * as THREE from 'three';
import './main.css';
import ElementsRepository from './model/ElementsRepository';
import Atom from './module/Atom';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.domElement.style.padding = "0";
renderer.domElement.style.margin = "0";
document.body.appendChild( renderer.domElement );
const controls = new OrbitControls( camera, renderer.domElement );

camera.position.z = 5;
controls.update();
const repo = new ElementsRepository();
const element = repo.getByName(repo.showNames()[3])
console.log(element.shells);
console.log(element.name)

console.log(repo.elements.length)
const atom = new Atom(repo.getByIndex(3));
scene.add(atom)

function animate() {
	controls.update();
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	atom.update();
}
animate();
