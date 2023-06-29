import Point from "./Point";
class PointDeplacement extends Point{

    constructor(position, nom, scene) {
        super(position, nom);
        this._scene = scene;
        this._typeSprite = "deplacement"
    }


    get scene() {
        return this._scene;
    }

    set scene(value) {
        this._scene = value;
    }


}

export default PointDeplacement