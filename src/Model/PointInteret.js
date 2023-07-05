import Point from "./Point";
class PointInteret extends Point {

    constructor(position, nom, description, typePointInteret) {
        super(position, nom);
        this._description = description;
        this._typeSprite = "tooltip"
        this._typePointInteret = typePointInteret;
    }


    get typePointInteret() {
        return this._typePointInteret;
    }

    set typePointInteret(value) {
        this._typePointInteret = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

}

export default PointInteret