"use strict";

var helpers = require('./helpers');


var arrayToFragment = function arrayToFragment(array) {
  var fragment = document.createDocumentFragment();
  helpers.each(array, function () {
    fragment.appendChild(this);
  });
  return fragment;
};

var nodeListToArray = function nodeListToArray(list) {
  return Array.prototype.slice.call(list, 0);
};

var nodeListToFragment = function nodeListToFragment(list) {
  return arrayToFragment(nodeListToArray(list));
};

var elementToFragment = function elementToFragment(element) {
  return nodeListToFragment(element.childNodes);
};





module.exports = {
  arrayToFragment: arrayToFragment,
  nodeListToArray: nodeListToArray,
  elementToFragment: elementToFragment,
  nodeListToFragment: nodeListToFragment
};