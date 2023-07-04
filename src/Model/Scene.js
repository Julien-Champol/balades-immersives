import * as THREE from "three";
import imageDeplacement from "../Images/deplacement.png";
import imageTooltip from "../Images/logotype-information-dans-cercle_318-9441.avif";

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
            transparent: true,
            opacity: 100
        });
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere)
        this.points.forEach(function (point) {
            this.addTooltip(point)
        }.bind(this))
        let opacity = 0;
           

        // Animation pour augmenter progressivement l'opacité jusqu'à 1
        const fadeAnimation = setInterval(() => {
          
          opacity += 0.01;
          if (opacity >= 1) {
            clearInterval(fadeAnimation);
          }
  
          // Parcours des objets de la scène et mise à jour de l'opacité du matériau
          this.scene.traverse((object) => {
            if (object.isMesh || object.isSprite) {
              object.material.opacity = opacity;
            }
          });
        }, 4);
      }

    /**
     *
     * @param {Point} point
     */
    addPoint(point) {
        this.points.push(point)
    }

    /**
     @param {Point} point
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
            default:
                break;
        }

        // Création du sprite
        let map = new THREE.TextureLoader().load(image);
        let materialSprite = new THREE.SpriteMaterial({map: map});
        let sprite = new THREE.Sprite(materialSprite);
        sprite.name = point.nom
        sprite.typeSprite = point.typeSprite
        sprite.description = point.description
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30))

        sprite.scale.multiplyScalar(3)
        this.scene.add(sprite);
        this.sprites.push(sprite)
        sprite.onClick = () => {
            if (point.typeSprite === "deplacement") {
              this.fadeOut()
              .then(()=>{
               return this.destroy();
              
              }).then(() => {
                 return  point.scene.createScene(this.scene);
              });
            }

        }

        sprite.onmousemove = () => {
            console.log("test")
        }
    }

    destroy() {
        this.scene.remove(this.sphere)
        this.sprites.forEach((sprite) => {
            this.scene.remove(sprite)
        })
    }
     fadeOut() {
      return new Promise((resolve) => {
        let opacity = 1;
    
        // Animation pour augmenter progressivement l'opacité jusqu'à 1
        const fadeAnimation = setInterval(() => {
          opacity -= 0.01;
          if (opacity <= 0) {
            clearInterval(fadeAnimation);
            resolve();
          }
      
          // Parcours des objets de la scène et mise à jour de l'opacité du matériau
          this.scene.traverse((object) => {
            if (object.isMesh || object.isSprite) {
              object.material.opacity = opacity;
              this.sprites.forEach((sprite) => {
                sprite.onClick=()=>{};
            })            
          }
          });
        }, 4);

      })
     
    }
   
     
    
}

export default Scene