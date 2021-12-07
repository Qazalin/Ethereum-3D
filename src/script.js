import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const moonPurpuleTexture = textureLoader.load("/textures/MoonPurple.jpg");

/**
 * Object
 */
// Geometries
const topObject = new THREE.ConeGeometry(1, 2, 4);
const bottomObject = new THREE.ConeGeometry(1, 1, 4);

// Material
const material = new THREE.MeshLambertMaterial({ map: moonPurpuleTexture });

// Meshes
const topMesh = new THREE.Mesh(topObject, material);
const bottomMesh = new THREE.Mesh(bottomObject, material);
bottomMesh.rotation.z = Math.PI;
bottomMesh.position.y = -1.8;

// Group 
const group = new THREE.Group();
group.add(topMesh, bottomMesh);
group.position.y = 0.5;
scene.add(group);

/*
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(0, 3, 4);
scene.add(directionalLight);

/* 
* Light Helper
*/

const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.2);
// Use only in dev mode
//scene.add(directionalLightHelper);


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 5;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Update base
 */

const tick = () => {

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();