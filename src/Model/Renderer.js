import * as THREE from "three";
class Renderer {

    createRenderer(canvasRef) {
        this.renderer = new THREE.WebGLRenderer({ canvas: canvasRef });
        this.renderer.setSize(window.innerWidth, window.innerHeight);  
    }

    
}

export default Renderer