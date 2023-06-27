import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
const geometry = new THREE.SphereGeometry(50, 32, 16);
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('20230626_171948.jpg');
texture.mapping = THREE.EquirectangularReflectionMapping;


const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide

});

// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.y = -1;
const sphere = new THREE.Mesh(geometry, material);


scene.add(sphere);

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.set(0.1, 0, 0);
controls.update();
function animate() {

    requestAnimationFrame(animate);

    // // required if controls.enableDamping or controls.autoRotate are set to true
    // controls.update();

    renderer.render(scene, camera);

}

animate()

function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}

window.addEventListener('resize', onResize)