import * as THREE from 'three';
import './main.css';
import ElementsRepository from './model/ElementsRepository';
import Atom from './module/Atom';

import { initEnviroment } from './core/core.js';

const {
	animate,
	addUpdate,
	scene,
  } = initEnviroment()

const repo = new ElementsRepository();
const element = repo.getByName(repo.showNames()[3])


const atom = new Atom(repo.getByIndex(115));
scene.add(atom)

addUpdate(atom.update);

animate();


