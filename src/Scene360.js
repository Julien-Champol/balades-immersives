import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import image360 from './Images/PXL_20230628_075033818.PHOTOSPHERE.jpg'
import image360_2 from './Images/PXL_20230628_133755950.PHOTOSPHERE~2.jpg';
import {Vector3} from "three";
import Scene from './Model/Scene'
import PointDeplacement from "./Model/PointDeplacement";
import PointInteret from "./Model/PointInteret";
function Scene360() {
    const sceneRef = useRef();
    const sceneRef_2 = useRef()
    const cameraRef = useRef();
    const rendererRef = useRef();
    const containerRef = useRef()
    const canvasRef = useRef();

    let rayCaster = new THREE.Raycaster()
    const tooltip = document.querySelector('.tooltip')
    let tooltipActive = false;
    useEffect(() => {
        const container = document.body
        containerRef.current = container

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current});
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.rotateSpeed = -0.5
        controls.enableZoom = false;
        camera.position.set(-1, 0, 0);
        controls.update();

        console.log(controls)

        // Scene et Controle
        const scene = new THREE.Scene();

        let oScene1 = new Scene(image360, scene)

        let oScene2 = new Scene(image360_2, scene)

        let oPointDeplacement1 = new PointDeplacement(new Vector3(-17.60, -19.48, 42.50), "Déplacement", oScene2);
        let oPointDeplacement2 = new PointDeplacement(new Vector3(42.54621820468249,-25.619583468013133,1.8401114612655096), "Déplacement", oScene1)

        oScene1.addPoint(oPointDeplacement1)


        oScene2.addPoint(oPointDeplacement2)
        oScene1.createScene()

        sceneRef_2.current = oScene2
        sceneRef.current = oScene1


        // Render
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Tooltip
        // oScene1.addTooltip(new Vector3(30, 0, 0), 'Tableau', "tooltip")
        // oScene1.addTooltip(new Vector3(-17.60, -19.48, 42.50), 'Déplacement', "deplacement")


        animate();

        container.addEventListener('resize', onResize())
        container.addEventListener('click', onClick)
        container.addEventListener('mousemove', onMouseMove)
        return () => {
            renderer.dispose();
        };

    }, []);


    const animate = () => {
        requestAnimationFrame(animate);

        rendererRef.current.render(sceneRef.current.scene, cameraRef.current);
    };

    function onMouseMove(e) {
        let mouse = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        )
        rayCaster.setFromCamera(mouse, cameraRef.current)
        let foundSprite = false;
        let intersects = rayCaster.intersectObjects(sceneRef.current.scene.children);
        intersects.forEach(function (intersect) {
            if (intersect.object.type === 'Sprite') {
                let p = intersect.object.position.clone().project(cameraRef.current)
                tooltip.style.top = (-1 * p.y + 1) * window.innerHeight / 2 - 50 + 'px'
                tooltip.style.left = (p.x + 1) * window.innerWidth / 2 + 'px'
                tooltip.classList.add('is-active')
                tooltip.innerHTML = intersect.object.name
                tooltipActive = true
                foundSprite = true
            }
        })

        if (foundSprite === false && tooltipActive) {
            tooltip.classList.remove("is-active")
        }
    }

    function onClick(e) {
        let mouse = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        )

        // let rayCaster = new THREE.Raycaster()
        rayCaster.setFromCamera(mouse, cameraRef.current)

        let intersects = rayCaster.intersectObjects(sceneRef.current.scene.children);
        //
        // console.log(intersects)
        //
        intersects.forEach(function (intersect) {
            if (intersect.object.type === 'Sprite') {
                console.log(intersect.object.name)
                intersect.object.onClick()
            }
        })

        // let intersects = rayCaster.intersectObject(sceneRef.current.sphere)
        // if (intersects.length > 0) {
        //     console.log(intersects[0].point)
        //     // addTooltip(intersects[0].point)
        // }
    }


    const onResize = () => {
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
        cameraRef.current.aspect = window.innerWidth / window.innerHeight
    }

    return <canvas ref={canvasRef}/>;
}


export default Scene360;