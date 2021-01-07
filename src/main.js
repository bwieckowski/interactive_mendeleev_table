import * as THREE from 'three';
import * as TWEEN from 'tween';
import { CSS3DRenderer } from 'three-css3drenderer';
import { CSS3DObject } from 'three-css3drenderer';
import { parserPeriodictTable } from './array/helper';
import ElementsRepository from './model/ElementsRepository';

const repository = new ElementsRepository();
var table = parserPeriodictTable (repository.getElements());

let camera, scene, renderer;
let targets = {simple: [], table: []};

init();
animate();

function init() {

    initCamera();
    initScene();
    initObjects();
    initRenderer();
    transform(targets.table, 2000);
    window.addEventListener('resize', onWindowResize, false);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2500;
}

function initScene() {
    scene = new THREE.Scene();
}

function initRenderer() {
    renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('periodic_container').appendChild(renderer.domElement);
}

function initObjects() {
    simpleObjectsLayout();
}

function simpleObjectsLayout() {

    for (let i = 0; i < table.length; i += 5) {

        let object = new CSS3DObject(htmlElement(table, i));
        object.position.x = (table[i + 3] * 140) - 1330;
        object.position.y = -(table[i + 4] * 180) + 990;
        scene.add(object);
        targets.simple.push(object);
        tableLayout(table, i);

    }

}

function htmlElement(table, i) {
    let element = document.createElement('div');
    element.className = 'element';
    element.style.backgroundColor = 'rgba(255,255,255,0.5)';

    let number = document.createElement('div');
    number.className = 'number';
    number.textContent = (i / 5) + 1;
    element.appendChild(number);

    let symbol = document.createElement('div');
    symbol.className = 'symbol';
    symbol.textContent = table[i];
    element.appendChild(symbol);

    let details = document.createElement('div');
    details.className = 'details';
    details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
    element.appendChild(details);

    element.addEventListener('click', ()=>elementClickHandler(i, table[i]), false);


    return element;
}

function elementClickHandler(i, symbol){

    transform(targets.table,1000);

    new TWEEN.Tween(targets.simple[i / 5].position)
        .to({
            x: 0,
            y: 350,
            z: 1200,
        })
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

    new TWEEN.Tween(this)
        .to({}, 500 * 2)
        .onUpdate(render)
        .start();
  
    const event = new Event('changeAtom');
    event.symbol = symbol;
    document.dispatchEvent(event);

    document.getElementById('canvas').style.opacity = '0.7';    
    document.getElementById('canvas').style.zIndex = '998'; 
    document.querySelector('#adnotation').style.zIndex = '999'; 
    document.querySelector('#adnotation_kernel').style.zIndex = '999'; 
    document.querySelector('.btn').style.zIndex = '999'; 
    
    document.getElementById('info_name').innerHTML = repository.getBySymbol(symbol).name;
    document.getElementById('info_symbol').innerHTML = repository.getBySymbol(symbol).symbol;
    document.getElementById('info_shells').innerHTML = repository.getBySymbol(symbol).shells;
    document.getElementById('info_shells_amount').innerHTML = repository.getBySymbol(symbol).shells.length;
    document.getElementById('info_neutrons').innerHTML = repository.getBySymbol(symbol).neutrons;
    document.getElementById('info_number').innerHTML = repository.getBySymbol(symbol).number;
    document.getElementById('info_shells').innerHTML = repository.getBySymbol(symbol).shells;
    document.getElementById('info_shells_amount').innerHTML = repository.getBySymbol(symbol).shells.length;
    document.getElementById('info_atomic_mass').innerHTML = repository.getBySymbol(symbol).atomicMass;
    document.getElementById('info_apperance').innerHTML = repository.getBySymbol(symbol).appearance;
    document.getElementById('info_boil').innerHTML = repository.getBySymbol(symbol).boil;
    document.getElementById('info_category').innerHTML = repository.getBySymbol(symbol).category;
    document.getElementById('info_discoveredBy').innerHTML = repository.getBySymbol(symbol).discoveredBy;
    document.getElementById('info_namedBy').innerHTML = repository.getBySymbol(symbol).namedBy;
    document.getElementById('info_melt').innerHTML = repository.getBySymbol(symbol).melt;
    document.getElementById('info_molarHeat').innerHTML = repository.getBySymbol(symbol).molarHeat;
    document.getElementById('info_period').innerHTML = repository.getBySymbol(symbol).period;
    document.getElementById('info_phase').innerHTML = repository.getBySymbol(symbol).phase;
    document.getElementById('info_source').innerHTML = repository.getBySymbol(symbol).source;

}
function tableLayout(table, index) {

    let object = new THREE.Object3D();

    object.position.x = (table[index + 3] * 140) - 1330;
    object.position.y = -(table[index + 4] * 180) + 990;
    targets.table.push(object);
}

function transform(target, duration) {

    TWEEN.removeAll();

    for (let i = 0; i < targets.simple.length; i++) {
        let object = targets.simple[i];
        let targetObject = target[i];
        transformObjectPosition(object, targetObject, duration);
    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
}

function transformObjectPosition(object, targetObject) {

    new TWEEN.Tween(object.position)
        .to({
            x: targetObject.position.x,
            y: targetObject.position.y,
            z: targetObject.position.z
        })
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    render();
}

function render() {
    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
}