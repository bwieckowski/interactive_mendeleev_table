import * as THREE from 'three';
import './main.js';
import './main.css';
import ElementsRepository from './model/ElementsRepository';
import Atom from './module/Atom';
import { initEnviroment } from './core/core.js';

const {
	animate,
	addUpdate,
    scene,
    clearUpdates
  } = initEnviroment()

const repo = new ElementsRepository();

document.querySelector('.btn').addEventListener('click', () => {
    document.getElementById('canvas').style.opacity = '0';    
    document.getElementById('canvas').style.zIndex = '-1'; 
    document.querySelector('#adnotation').style.zIndex = '-1'; 
    document.querySelector('#adnotation_kernel').style.zIndex = '-1'; 
    document.querySelector('.btn').style.zIndex = '-1'; 
})

document.addEventListener('changeAtom', (event) => {
    const objectToRemove = scene.getObjectByName('atom');
    scene.remove(objectToRemove);

    console.log(event.symbol)
    const atom = new Atom(repo.getBySymbol(event.symbol));
    atom.name = 'atom'
    clearUpdates()
    scene.add(atom)
    addUpdate(atom.update);

})

animate();


