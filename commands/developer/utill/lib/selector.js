"use strict";

var domHelpers = require('./domHelpers');
var helpers = require('./helpers');

var each = helpers.each;



/**
 * "Class" that represents a collection of DOM elements
 */
function Selection(elements) {
  if (elements) {
    this._elements = elements;
  }
}

/**
 * Help function for findAll
 */
var selectAll = function selectAll(query) {
  if (query instanceof Selection) {
    return query._elements;
  }

  if (query instanceof Element) {
    return [query];
  }

  if (helpers.isString(query)) {
    return domHelpers.nodeListToArray(document.querySelectorAll(query));
  }

  return query;
};

/**
 * Help function for find
 */
var selectSingle = function selectSingle(query) {
  if (query instanceof Selection) {
    return [query._elements[0]];
  }

  if (query instanceof Element) {
    return [query];
  }

  if (helpers.isString(query)) {
    return [document.querySelector(query)];
  }

  return query;
};



/**
 * Converts the given parameter to a DOM element
 * if parameter is a string of html it gets converted to a documentFragment
 * if parameter is a Selection a documentFragment with all elements from the selection is returned
 * else the parameter is returned
 */
var toDOMElement = function toDOMElement(parameter) {
  if (helpers.isString(parameter)) {
    var div = document.createElement('div');
    div.innerHTML = parameter;
    return domHelpers.elementToFragment(div);
  }

  if (parameter instanceof Selection) {
    return domHelpers.arrayToFragment(parameter._elements);
  }

  return parameter;
};


Selection.prototype = {
  /**
   * Iterates all elements in the Selection
   */
  each: function (func) {
    each(this._elements, func);
    return this;
  },

  /**
   * Gets the value for a css propertie and returns a array with all the values.
   */
  getCssProperty: function (prop) {
    var returnArray = [];
    this.each(function (elem) {
      returnArray.push(elem.style[prop]);
    });
    return returnArray;
  },

  /**
   * Sets a css property for all elements in the Selection
   */
  setCssProperty: function (prop, value) {
    this.each(function (elem) {
      elem.style[prop] = value;
    });
    return this;
  },

  /**
   * get or set a css property.
   * If the seccond argument is given the funtion works as a setter.
   * if the seccond argument is omitted the function works as a getter.
   */
  css: function (prop, val) {
    if (val) {
      return this.setCssProperty(prop, val);
    } else {
      return this.getCssProperty(prop);
    }
  },

  /**
   * Adds a class to the classList of all elements in the Selection
   */
  addClass: function (classname) {
    this.each(function () {
      this.classList.add(classname);
    });
    return this;
  },

  /**
   * Removes a class from the classList of all elements in the Selection
   */
  removeClass: function (classname) {
    this.each(function () {
      this.classList.remove(classname);
    });
    return this;
  },

  /**
   * Clears the innerHTML for all elements in the Selection
   */
  empty: function () {
    this.each(function () {
      this.innerHTML = '';
    });
    return this;
  },

  /**
   * Sets the content for the Elements.
   * Works like append, but first emptys the element using the empty method.
   */
  html: function (node) {
    this.empty();
    this.append(node);
    return this;
  },

  /**
   * Appends to all elements in the Selection
   * the parameter can be a DOM element a string of html or a Selection
   */
  append: function (arg) {
    var node = toDOMElement(arg);
    this.each(function () {
      this.appendChild(node);
    });
    return this;
  },

  /**
   * Adds the given argument after every element of the Selection
   * the parameter can be a DOM element a string of html or a Selection
   */
  after: function (arg) {
    var node = toDOMElement(arg);
    this.each(function () {
      this.parentNode.insertBefore(node, this.nextSibling);
    });
  },

  /**
   * Adds the given argument before every element of the Selection
   * the parameter can be a DOM element a string of html or a Selection
   */
  before: function (arg) {
    var node = toDOMElement(arg);

    this.each(function () {
      this.parentNode.insertBefore(node, this);
    });
  },

  /**
   * Clones the Selection.
   */
  clone: function () {
    var returnSelection = new Selection();
    returnSelection._elements = this._elements;
    for (var i = 0; i < returnSelection._elements.length; i++) {
      returnSelection._elements[i] = returnSelection._elements[i].cloneNode(true);
    }

    return returnSelection;
  },

  /**
   * Adds a Selection to this Selection. The parameter must be a Selection.
   */
  add: function (selection) {
    this._elements = this._elements.concat(selection._elements);
    return this;
  },

  /**
   * If the Selection contains the given DOM element the element is returned.
   * If the DOM element is not found false is returned
   */
  contains: function (elem) {
    for (var i = 0; i < this._elements.length; i++) {
      if (this._elements[i].isEqualNode(elem)) {
        return this._elements[i];
      }
    }
    return false;
  },

  /**
   * Adds an event listener to every element of the Selection
   */
  on: function (type, fn) {
    this.each(function (el) {
      el.addEventListener(type, fn);
    });
  },

  /**
   * Removes an event listener to every element of the Selection
   */
  off: function (type, fn) {
    this.each(function (el) {
      el.removeEventListener(type, fn);
    });
  },

  /**
   * returns the number of matched elements
   */
  size: function () {
    return this._elements.length;
  }
};




module.exports = {
  findAll: function (query) {
    return new Selection(selectAll(query));
  },
  find: function (query) {
    return new Selection(selectSingle(query));
  }
};