import React, {useEffect, useRef} from 'react';
import * as THREE from 'three';
import image360 from './Images/PXL_20230628_075033818.PHOTOSPHERE.jpg'
import image360_2 from './Images/PXL_20230628_133755950.PHOTOSPHERE~2.jpg';
import {Vector3} from "three";
import Scene from './Model/Scene';
import Camera from './Model/Camera';
import Renderer from './Model/Renderer';
import Controls from './Model/Controls';
function App() {
    const sceneRef = useRef();
    const sceneRef_2 = useRef()
    const cameraRef = useRef();
    const rendererRef = useRef();
    const containerRef = useRef();
    const controlerRef = useRef();
    let rayCaster = new THREE.Raycaster();
    const tooltip = document.querySelector('.tooltip');
    let tooltipActive = false;
    useEffect(() => {
        const container = document.body
        containerRef.current = container

        // Scene et Controle
        const scene = new THREE.Scene();

        let oScene1 = new Scene(image360, scene,[]);

        let oScene2 = new Scene(image360_2, scene,[]);

        let oCamera = new Camera(-1,0,0);

        let oRenderer = new Renderer();

        oCamera.createCamera();
        oRenderer.createRenderer();
       
        
        

        oScene1.addPoint({
            position : new Vector3(-17.60, -19.48, 42.50),
            nom : 'Déplacement',
            typeSprite : "deplacement",
            scene : oScene2

        })
        oScene1.addPoint({
          position : new Vector3(0, 0, 42.50),
          nom : 'je suis laaaaaaaaaaaaaaa',
          typeSprite : "tooltip",
          scene : null

      })



        oScene2.addPoint({
            position : new Vector3(
                42.54621820468249,
                -25.619583468013133,
                1.8401114612655096),
            nom : 'Déplacement',
            typeSprite : "deplacement",
            scene : oScene1

        })
        oScene1.createScene()

        sceneRef_2.current = oScene2;
        sceneRef.current = oScene1;        
        cameraRef.current = oCamera;
        rendererRef.current = oRenderer;

        let oControl = new Controls(cameraRef.current.camera,rendererRef.current.renderer);

        oControl.createControls();
        controlerRef.current = oControl;

        
        controlerRef.current.controls.update();



        // Render
        
        container.appendChild(rendererRef.current.renderer.domElement);

        // Tooltip
        // oScene1.addTooltip(new Vector3(30, 0, 0), 'Tableau', "tooltip")
        // oScene1.addTooltip(new Vector3(-17.60, -19.48, 42.50), 'Déplacement', "deplacement")


        animate();

        container.addEventListener('resize', onResize)
        container.addEventListener('click', onClick)
        container.addEventListener('mousemove', onMouseMove)
        return () => {
            // renderer.dispose();
        };

    }, []);


    const animate = () => {
        requestAnimationFrame(animate);

        rendererRef.current.renderer.render(sceneRef.current.scene, cameraRef.current.camera);
    };

    function onMouseMove(e) {
        let mouse = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        )
        rayCaster.setFromCamera(mouse, cameraRef.current.camera)
        let foundSprite = false;
        let intersects = rayCaster.intersectObjects(sceneRef.current.scene.children);
        intersects.forEach(function (intersect) {
            if (intersect.object.type === 'Sprite') {
                let p = intersect.object.position.clone().project(cameraRef.current.camera)
                tooltip.style.top = (-1 * p.y + 1) * window.innerHeight / 2 - 50 + 'px'
                tooltip.style.left = (p.x + 1) * window.innerWidth / 2 +'px'
                tooltip.classList.add('is-active')
                tooltip.innerHTML = intersect.object.name
                tooltipActive = true
                foundSprite = true
            }
        })

        if(foundSprite === false && tooltipActive){
            tooltip.classList.remove("is-active")
        }
    }

    function onClick(e) {
        let mouse = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
        )

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
    setTimeout(function() {
        if(document.getElementsByTagName('canvas')[0]!== undefined) {
            document.getElementsByTagName('canvas')[0].style.display = 'none'
        }
    }, 1000)

    // document.getElementsByTagName('canvas').style.display = 'none'
    return null;
}


export default App;