import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import {Vector3} from "three";
import Scene from './Model/Scene';
import Camera from './Model/Camera';
import Renderer from './Model/Renderer';
import Controls from './Model/Controls';
import PointDeplacement from "./Model/PointDeplacement";
import PointInteret from "./Model/PointInteret";

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
    let listScene = []
    useEffect(() => {

        // A changer par l'adresse de l'API distante
        let uri = "http://185.212.225.152:3002/photos360s-with-moves/649ad532052c480e99ccf18d";
        fetch(uri)
            .then(res => res.json())
            .then((photo360s) => {

                // Container
                const container = document.body
                containerRef.current = container

                // Scene et Points
                const scene = new THREE.Scene();

                photo360s.forEach(function(photo360){
                    let oScene = new Scene(photo360.URLPhoto360, scene)
                    listScene[photo360._id.toString()] = oScene
                })

                photo360s.forEach(function(photo360){
                    photo360.deplacements.forEach(function(deplacement){
                        let coordinates = deplacement.coordinates[0]
                        let position = new Vector3(coordinates.x, coordinates.y, coordinates.z);
                        let oPointDeplacement = new PointDeplacement(position, "Déplacement",listScene[deplacement.nextPhoto360]);
                        listScene[photo360._id].addPoint(oPointDeplacement);
                    })

                    photo360.interestsPoints.forEach(function(interestPoint){
                        let coordinates = interestPoint.coordinates[0]
                        let position = new Vector3(coordinates.x, coordinates.y, coordinates.z);
                        let oPointInteret = new PointInteret(position, interestPoint.name, interestPoint.description);
                        listScene[photo360._id].addPoint(oPointInteret);
                    })
                })

                console.log(listScene)





                let firstScene = Object.values(listScene)[0]
                firstScene.createScene()
                sceneRef.current = firstScene


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
            if (intersect.object.type === 'Sprite' && intersect.object.typeSprite === "tooltip") {
                let p = intersect.object.position.clone().project(cameraRef.current.camera)
                tooltip.style.top = (-1 * p.y + 1) * window.innerHeight / 2 - 50 + 'px'
                tooltip.style.left = (p.x + 1) * window.innerWidth / 2 + 'px'
                tooltip.classList.add('is-active')
                tooltip.innerHTML = intersect.object.description
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

        let intersectss = rayCaster.intersectObject(sceneRef.current.sphere)
        if (intersectss.length > 0) {
            console.log(intersects[0].point)
            // addTooltip(intersects[0].point)
        }
    }


    const onResize = () => {
        rendererRef.current.renderer.setSize(window.innerWidth, window.innerHeight)
        cameraRef.current.camera.aspect = window.innerWidth / window.innerHeight
    }

    return <canvas ref={canvasRef}/>;
}


export default Scene360;