class Point {


    constructor(position, nom) {
        this._position = position;
        this._nom = nom;
        this._typeSprite = ""
    }

    get position() {
        return this._position;
    }

    set position(value) {
        this._position = value;
    }

    get nom() {
        return this._nom;
    }

    set nom(value) {
        this._nom = value;
    }

    get typeSprite() {
        return this._typeSprite;
    }

}
export default Point