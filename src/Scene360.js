import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {Vector3} from "three";
import Scene from './Model/Scene';
import Camera from './Model/Camera';
import Renderer from './Model/Renderer';
import Controls from './Model/Controls';
import PointDeplacement from "./Model/PointDeplacement";

function Scene360() {
    // Définition des variables globales et constantes
    const sceneRef = useRef();
    const sceneRef_2 = useRef();
    const cameraRef = useRef();
    const rendererRef = useRef();
    const containerRef = useRef();
    const canvasRef = useRef();
    const controlerRef = useRef();
    const rayCaster = new THREE.Raycaster();
    const tooltip = document.querySelector('.tooltip')
    let tooltipActive = false;

    useEffect(() => {

        let uri = "http://localhost:3002/photos360s-with-moves/649ad532052c480e99ccf18d";
        fetch(uri)
            .then(res => res.json())
            .then((photo360s) => {
                console.log(photo360s)

                // Container
                const container = document.body
                containerRef.current = container

                // Scene et Points
                const scene = new THREE.Scene();
                let oScene1 = new Scene(photo360s[0].URLPhoto360, scene)
                let oScene2 = new Scene(photo360s[1].URLPhoto360, scene)
                let oPointDeplacement1 = new PointDeplacement(new Vector3(-17.60, -19.48, 42.50), "Déplacement", oScene2);
                let oPointDeplacement2 = new PointDeplacement(new Vector3(42.54621820468249, -25.619583468013133, 1.8401114612655096), "Déplacement", oScene1)
                oScene1.addPoint(oPointDeplacement1)
                oScene2.addPoint(oPointDeplacement2)
                oScene1.createScene()
                console.log(oScene1)
                sceneRef_2.current = oScene2;
                sceneRef.current = oScene1;

                // Caméra, control et renderer
                let oCamera = new Camera(-1, 0, 0);
                let oRenderer = new Renderer();
                oCamera.createCamera();
                oRenderer.createRenderer(canvasRef.current);
                let oControl = new Controls(oCamera.camera, oRenderer.renderer);
                oControl.createControls();
                oControl.controls.update();

                // Render
                container.appendChild(oRenderer.renderer.domElement);

                // Définition des ref

                cameraRef.current = oCamera;
                rendererRef.current = oRenderer;
                controlerRef.current = oControl;

                animate();

                container.addEventListener('resize', onResize())
                container.addEventListener('click', onClick)
                container.addEventListener('mousemove', onMouseMove)
                return () => {
                    rendererRef.current.renderer.dispose();
                };
            })


    }, []);


    const animate = () => {
        requestAnimationFrame(animate);
        rendererRef.current.renderer.render(sceneRef.current.scene, cameraRef.current.camera);
    };

    function onMouseMove(e) {
        let mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)
        rayCaster.setFromCamera(mouse, cameraRef.current.camera)
        let foundSprite = false;
        let intersects = rayCaster.intersectObjects(sceneRef.current.scene.children);
        intersects.forEach(function (intersect) {
            if (intersect.object.type === 'Sprite') {
                let p = intersect.object.position.clone().project(cameraRef.current.camera)
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
        let mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1)

        // let rayCaster = new THREE.Raycaster()
        rayCaster.setFromCamera(mouse, cameraRef.current.camera)

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
        rendererRef.current.renderer.setSize(window.innerWidth, window.innerHeight)
        cameraRef.current.camera.aspect = window.innerWidth / window.innerHeight
    }

    return <canvas ref={canvasRef}/>;
}


export default Scene360;