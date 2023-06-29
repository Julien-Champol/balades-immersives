import {OrbitControls} from "three/addons/controls/OrbitControls";

class Controls {
    constructor(camera,renderer) {
        this.camera = camera
        this.renderer = renderer

       
    }

    createControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = -0.5
        this.controls.enableZoom = false;
    }

    
}

export default Controls