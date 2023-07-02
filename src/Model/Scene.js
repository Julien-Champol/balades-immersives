import * as THREE from "three";
import imageDeplacement from "../Images/deplacement.svg";
import imageTooltip from "../Images/infobulle.svg";
import imageScene1 from "../Images/PXL_20230628_075033818.PHOTOSPHERE.jpg"
import Point from "./Point"
class Scene {
    constructor(image, scene) {
        this.image = image
        this.points = []
        this.sprites = []
        this.scene = scene
    }

    createScene() {
        const geometry = new THREE.SphereGeometry(50, 32, 16);
        const textureLoader = new THREE.TextureLoader()
        textureLoader.crossOrigin = "Anonymous"
        const texture = textureLoader.load(this.image)
        texture.wrapS = THREE.RepeatWrapping
        texture.repeat.x = -1
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
        });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere)
        this.points.forEach(function (point) {
            this.addTooltip(point)
        }.bind(this))


    }

    /**
     *
     * @param {Point} point
     */
    addPoint(point) {
        this.points.push(point)
    }

    /**
     *
     * @param {Point} point
     */
    addTooltip(point) {
        let image = "";
        switch (point.typeSprite) {
            case "deplacement":
                image = imageDeplacement
                break;
            case "tooltip":
                image = imageTooltip
                break;
        }
        let map = new THREE.TextureLoader().load(image);
        let materialSprite = new THREE.SpriteMaterial({map: map});
        let sprite = new THREE.Sprite(materialSprite);
        sprite.name = point.nom

        sprite.typeSprite = point.typeSprite
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))
        sprite.scale.multiplyScalar(3)
        this.scene.add(sprite);
        this.sprites.push(sprite)
        sprite.onClick = () => {
            if(point.scene != null){
                this.destroy();
                point.scene.createScene(this.scene);
            }
            
        }
    }

    destroy() {
        this.scene.remove(this.sphere)
        this.sprites.forEach((sprite) => {
            this.scene.remove(sprite)
        })
    }
}

export default Scene