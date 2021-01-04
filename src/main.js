import * as THREE from 'three';
import * as TWEEN from 'tween';
import { CSS3DRenderer } from 'three-css3drenderer';
import { CSS3DObject } from 'three-css3drenderer';
import { parserPeriodictTable } from './array/helper';
import ElementsRepository from './model/ElementsRepository';

var table = parserPeriodictTable (new ElementsRepository().getElements());

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
    document.getElementById('container').appendChild(renderer.domElement);
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

    element.addEventListener('click', ()=>elementClickHandler(i), false);

    return element;
}

function elementClickHandler(i){

    transform(targets.table,1000);

    new TWEEN.Tween(targets.simple[i / 5].position)
        .to({
            x: 0,
            y: 0,
            z: 100
        })
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

    new TWEEN.Tween(this)
        .to({}, 2000 * 2)
        .onUpdate(render)
        .start();
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

function transformObjectPosition(object, targetObject, duration) {

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