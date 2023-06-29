import * as THREE from "three";
class Camera {
    constructor(x,y,z) {
        this.x = x
        this.y = y
        this.z = z
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
        this.camera.position.set(this.x, this.y, this.z);  
    }

    
}

export default Camera