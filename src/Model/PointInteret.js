import Point from "./Point";
class PointInteret extends Point {

    constructor(position, nom, description) {
        super(position, nom);
        this._description = description;
        this._typeSprite = "tooltip"
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

}

export default PointInteret