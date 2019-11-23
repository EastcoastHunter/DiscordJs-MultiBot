"use strict";

/**
 * Checks if the given argument is a string
 */
var isString = function isString(param) {
  return typeof param === 'string' || param instanceof String;
};

/**
 * Calls the given callback on every Element of an Array like Object
 */
var each = function each(iterable, callback) {
  for (var i = 0; i < iterable.length; i++) {
    callback.call(iterable[i], iterable[i]);
  }
};

/**
 * Calls the given callback on every Element of an Object. Uses hasOwnProperty.
 */
var loopObject = function loopObject(object, callback) {
  for (var property in object) {
    if (object.hasOwnProperty(property)) {
      callback(property, object[property]);
    }
  }
};

/**
 * mixes the given objects. The parameters are not modified.
 * The second parameter overrides the first.
 * prototypes will not be mixed.
 */
var mixObjects = function mixObjects(target, source) {
  var returnVal = {};

  loopObject(target, function (key, value) {
    returnVal[key] = value;
  });

  loopObject(source, function (key, value) {
    returnVal[key] = value;
  });


  return returnVal;
};






module.exports = {
  isString: isString,
  each: each,
  mixObjects: mixObjects,
  loopObject: loopObject
};