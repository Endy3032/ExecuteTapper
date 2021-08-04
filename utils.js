/**
 * Credit: @itsmingjie
 * From: New Tab - Tech Roulette
 */

class Utils {

  static saveObject = (key, object) => {
    if (this._isEmpty(key)) {throw new Error("Key cannot be empty")}
    else if (this._isFunction(object)) {throw new Error("Cannot save functions")}
    else if (object instanceof Node) {throw new Error("Cannot save DOM elements")}

    localStorage.setItem(key, JSON.stringify(object))
  }

  static readObject = (key) => {
    if (this._isEmpty(key)) {throw new Error("Key cannot be empty")}
    return JSON.parse(localStorage.getItem(key))
  }

  static removeObject = (key) => {
    let object = this.readObject(key)
    if (object != null) {localStorage.removeItem(key)}
    return object
  }

  static _isEmpty = (string) => {
    return (!string || 0 === string.length)
  }

  static _isFunction = (o) => {
    return o && {}.toString.call(o) === '[object Function]';
  }

}