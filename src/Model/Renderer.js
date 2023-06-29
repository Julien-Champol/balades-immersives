import * as THREE from "three";
class Renderer {

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);  
    }

    
}

export default Renderer