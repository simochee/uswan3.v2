/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	__webpack_require__(9);
	
	__webpack_require__(15);
	
	var _router = __webpack_require__(12);
	
	var _router2 = _interopRequireDefault(_router);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	riot.mount('navbar');
	
	_router2.default.start();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {/* Riot v3.0.7, @license MIT */
	(function (global, factory) {
	   true ? factory(exports) :
	  typeof define === 'function' && define.amd ? define(['exports'], factory) :
	  (factory((global.riot = global.riot || {})));
	}(this, (function (exports) { 'use strict';
	
	var __TAGS_CACHE = [];
	var __TAG_IMPL = {};
	var GLOBAL_MIXIN = '__global_mixin';
	var ATTRS_PREFIX = 'riot-';
	var REF_DIRECTIVES = ['data-ref', 'ref'];
	var IS_DIRECTIVE = 'data-is';
	var CONDITIONAL_DIRECTIVE = 'if';
	var LOOP_DIRECTIVE = 'each';
	var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
	var SHOW_DIRECTIVE = 'show';
	var HIDE_DIRECTIVE = 'hide';
	var T_STRING = 'string';
	var T_OBJECT = 'object';
	var T_UNDEF  = 'undefined';
	var T_FUNCTION = 'function';
	var XLINK_NS = 'http://www.w3.org/1999/xlink';
	var XLINK_REGEX = /^xlink:(\w+)/;
	var WIN = typeof window === T_UNDEF ? undefined : window;
	var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
	var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
	var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
	var RE_SVG_TAGS = /^(altGlyph|animate(?:Color)?|circle|clipPath|defs|ellipse|fe(?:Blend|ColorMatrix|ComponentTransfer|Composite|ConvolveMatrix|DiffuseLighting|DisplacementMap|Flood|GaussianBlur|Image|Merge|Morphology|Offset|SpecularLighting|Tile|Turbulence)|filter|font|foreignObject|g(?:lyph)?(?:Ref)?|image|line(?:arGradient)?|ma(?:rker|sk)|missing-glyph|path|pattern|poly(?:gon|line)|radialGradient|rect|stop|svg|switch|symbol|text(?:Path)?|tref|tspan|use)$/;
	var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
	var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
	var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
	var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;
	
	/**
	 * Check whether a DOM node must be considered a part of an svg document
	 * @param   { String } name -
	 * @returns { Boolean } -
	 */
	function isSVGTag(name) {
	  return RE_SVG_TAGS.test(name)
	}
	
	/**
	 * Check Check if the passed argument is undefined
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isBoolAttr(value) {
	  return RE_BOOL_ATTRS.test(value)
	}
	
	/**
	 * Check if passed argument is a function
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isFunction(value) {
	  return typeof value === T_FUNCTION
	}
	
	/**
	 * Check if passed argument is an object, exclude null
	 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isObject(value) {
	  return value && typeof value === T_OBJECT // typeof null is 'object'
	}
	
	/**
	 * Check if passed argument is undefined
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isUndefined(value) {
	  return typeof value === T_UNDEF
	}
	
	/**
	 * Check if passed argument is a string
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isString(value) {
	  return typeof value === T_STRING
	}
	
	/**
	 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
	 * @param { * } value -
	 * @returns { Boolean } -
	 */
	function isBlank(value) {
	  return isUndefined(value) || value === null || value === ''
	}
	
	/**
	 * Check if passed argument is a kind of array
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isArray(value) {
	  return Array.isArray(value) || value instanceof Array
	}
	
	/**
	 * Check whether object's property could be overridden
	 * @param   { Object }  obj - source object
	 * @param   { String }  key - object property
	 * @returns { Boolean } -
	 */
	function isWritable(obj, key) {
	  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
	  return isUndefined(obj[key]) || descriptor && descriptor.writable
	}
	
	/**
	 * Check if passed argument is a reserved name
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isReservedName(value) {
	  return RE_RESERVED_NAMES.test(value)
	}
	
	var check = Object.freeze({
		isSVGTag: isSVGTag,
		isBoolAttr: isBoolAttr,
		isFunction: isFunction,
		isObject: isObject,
		isUndefined: isUndefined,
		isString: isString,
		isBlank: isBlank,
		isArray: isArray,
		isWritable: isWritable,
		isReservedName: isReservedName
	});
	
	/**
	 * Shorter and fast way to select multiple nodes in the DOM
	 * @param   { String } selector - DOM selector
	 * @param   { Object } ctx - DOM node where the targets of our search will is located
	 * @returns { Object } dom nodes found
	 */
	function $$(selector, ctx) {
	  return (ctx || document).querySelectorAll(selector)
	}
	
	/**
	 * Shorter and fast way to select a single node in the DOM
	 * @param   { String } selector - unique dom selector
	 * @param   { Object } ctx - DOM node where the target of our search will is located
	 * @returns { Object } dom node found
	 */
	function $(selector, ctx) {
	  return (ctx || document).querySelector(selector)
	}
	
	/**
	 * Create a document fragment
	 * @returns { Object } document fragment
	 */
	function createFrag() {
	  return document.createDocumentFragment()
	}
	
	/**
	 * Create a document text node
	 * @returns { Object } create a text node to use as placeholder
	 */
	function createDOMPlaceholder() {
	  return document.createTextNode('')
	}
	
	/**
	 * Create a generic DOM node
	 * @param   { String } name - name of the DOM node we want to create
	 * @param   { Boolean } isSvg - should we use a SVG as parent node?
	 * @returns { Object } DOM node just created
	 */
	function mkEl(name, isSvg) {
	  return isSvg ?
	    document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
	    document.createElement(name)
	}
	
	/**
	 * Get the outer html of any DOM node SVGs included
	 * @param   { Object } el - DOM node to parse
	 * @returns { String } el.outerHTML
	 */
	function getOuterHTML(el) {
	  if (el.outerHTML)
	    { return el.outerHTML }
	  // some browsers do not support outerHTML on the SVGs tags
	  else {
	    var container = mkEl('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}
	
	/**
	 * Set the inner html of any DOM node SVGs included
	 * @param { Object } container - DOM node where we'll inject new html
	 * @param { String } html - html to inject
	 */
	function setInnerHTML(container, html) {
	  if (!isUndefined(container.innerHTML))
	    { container.innerHTML = html; }
	    // some browsers do not support innerHTML on the SVGs tags
	  else {
	    var doc = new DOMParser().parseFromString(html, 'application/xml');
	    var node = container.ownerDocument.importNode(doc.documentElement, true);
	    container.appendChild(node);
	  }
	}
	
	/**
	 * Remove any DOM attribute from a node
	 * @param   { Object } dom - DOM node we want to update
	 * @param   { String } name - name of the property we want to remove
	 */
	function remAttr(dom, name) {
	  dom.removeAttribute(name);
	}
	
	/**
	 * Get the value of any DOM attribute on a node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { String } name - name of the attribute we want to get
	 * @returns { String | undefined } name of the node attribute whether it exists
	 */
	function getAttr(dom, name) {
	  return dom.getAttribute(name)
	}
	
	/**
	 * Set any DOM attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  var xlink = XLINK_REGEX.exec(name);
	  if (xlink && xlink[1])
	    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
	  else
	    { dom.setAttribute(name, val); }
	}
	
	/**
	 * Insert safely a tag to fix #1962 #1649
	 * @param   { HTMLElement } root - children container
	 * @param   { HTMLElement } curr - node to insert
	 * @param   { HTMLElement } next - node that should preceed the current node inserted
	 */
	function safeInsert(root, curr, next) {
	  root.insertBefore(curr, next.parentNode && next);
	}
	
	/**
	 * Minimize risk: only zero or one _space_ between attr & value
	 * @param   { String }   html - html string we want to parse
	 * @param   { Function } fn - callback function to apply on any attribute found
	 */
	function walkAttrs(html, fn) {
	  if (!html)
	    { return }
	  var m;
	  while (m = RE_HTML_ATTRS.exec(html))
	    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
	}
	
	/**
	 * Walk down recursively all the children tags starting dom node
	 * @param   { Object }   dom - starting node where we will start the recursion
	 * @param   { Function } fn - callback to transform the child node just found
	 * @param   { Object }   context - fn can optionally return an object, which is passed to children
	 */
	function walkNodes(dom, fn, context) {
	  if (dom) {
	    var res = fn(dom, context);
	    var next;
	    // stop the recursion
	    if (res === false) { return }
	
	    dom = dom.firstChild;
	
	    while (dom) {
	      next = dom.nextSibling;
	      walkNodes(dom, fn, res);
	      dom = next;
	    }
	  }
	}
	
	var dom = Object.freeze({
		$$: $$,
		$: $,
		createFrag: createFrag,
		createDOMPlaceholder: createDOMPlaceholder,
		mkEl: mkEl,
		getOuterHTML: getOuterHTML,
		setInnerHTML: setInnerHTML,
		remAttr: remAttr,
		getAttr: getAttr,
		setAttr: setAttr,
		safeInsert: safeInsert,
		walkAttrs: walkAttrs,
		walkNodes: walkNodes
	});
	
	var styleNode;
	var cssTextProp;
	var byName = {};
	var remainder = [];
	var needsInject = false;
	
	// skip the following code on the server
	if (WIN) {
	  styleNode = (function () {
	    // create a new style element with the correct type
	    var newNode = mkEl('style');
	    setAttr(newNode, 'type', 'text/css');
	
	    // replace any user node or insert the new one into the head
	    var userNode = $('style[type=riot]');
	    if (userNode) {
	      if (userNode.id) { newNode.id = userNode.id; }
	      userNode.parentNode.replaceChild(newNode, userNode);
	    }
	    else { document.getElementsByTagName('head')[0].appendChild(newNode); }
	
	    return newNode
	  })();
	  cssTextProp = styleNode.styleSheet;
	}
	
	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */
	var styleManager = {
	  styleNode: styleNode,
	  /**
	   * Save a tag style to be later injected into DOM
	   * @param { String } css - css string
	   * @param { String } name - if it's passed we will map the css to a tagname
	   */
	  add: function add(css, name) {
	    if (name) { byName[name] = css; }
	    else { remainder.push(css); }
	    needsInject = true;
	  },
	  /**
	   * Inject all previously saved tag styles into DOM
	   * innerHTML seems slow: http://jsperf.com/riot-insert-style
	   */
	  inject: function inject() {
	    if (!WIN || !needsInject) { return }
	    needsInject = false;
	    var style = Object.keys(byName)
	      .map(function(k) { return byName[k] })
	      .concat(remainder).join('\n');
	    if (cssTextProp) { cssTextProp.cssText = style; }
	    else { styleNode.innerHTML = style; }
	  }
	};
	
	/**
	 * The riot template engine
	 * @version v3.0.1
	 */
	/**
	 * riot.util.brackets
	 *
	 * - `brackets    ` - Returns a string or regex based on its parameter
	 * - `brackets.set` - Change the current riot brackets
	 *
	 * @module
	 */
	
	/* global riot */
	
	var brackets = (function (UNDEF) {
	
	  var
	    REGLOB = 'g',
	
	    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,
	
	    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,
	
	    S_QBLOCKS = R_STRINGS.source + '|' +
	      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
	      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,
	
	    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),
	
	    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,
	
	    FINDBRACES = {
	      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
	    },
	
	    DEFAULT = '{ }';
	
	  var _pairs = [
	    '{', '}',
	    '{', '}',
	    /{[^}]*}/,
	    /\\([{}])/g,
	    /\\({)|{/g,
	    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
	    DEFAULT,
	    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
	    /(^|[^\\]){=[\S\s]*?}/
	  ];
	
	  var
	    cachedBrackets = UNDEF,
	    _regex,
	    _cache = [],
	    _settings;
	
	  function _loopback (re) { return re }
	
	  function _rewrite (re, bp) {
	    if (!bp) { bp = _cache; }
	    return new RegExp(
	      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
	    )
	  }
	
	  function _create (pair) {
	    if (pair === DEFAULT) { return _pairs }
	
	    var arr = pair.split(' ');
	
	    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));
	
	    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	    arr[6] = _rewrite(_pairs[6], arr);
	    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	    arr[8] = pair;
	    return arr
	  }
	
	  function _brackets (reOrIdx) {
	    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
	  }
	
	  _brackets.split = function split (str, tmpl, _bp) {
	    // istanbul ignore next: _bp is for the compiler
	    if (!_bp) { _bp = _cache; }
	
	    var
	      parts = [],
	      match,
	      isexpr,
	      start,
	      pos,
	      re = _bp[6];
	
	    isexpr = start = re.lastIndex = 0;
	
	    while ((match = re.exec(str))) {
	
	      pos = match.index;
	
	      if (isexpr) {
	
	        if (match[2]) {
	          re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	          continue
	        }
	        if (!match[3]) {
	          continue
	        }
	      }
	
	      if (!match[1]) {
	        unescapeStr(str.slice(start, pos));
	        start = re.lastIndex;
	        re = _bp[6 + (isexpr ^= 1)];
	        re.lastIndex = start;
	      }
	    }
	
	    if (str && start < str.length) {
	      unescapeStr(str.slice(start));
	    }
	
	    return parts
	
	    function unescapeStr (s) {
	      if (tmpl || isexpr) {
	        parts.push(s && s.replace(_bp[5], '$1'));
	      } else {
	        parts.push(s);
	      }
	    }
	
	    function skipBraces (s, ch, ix) {
	      var
	        match,
	        recch = FINDBRACES[ch];
	
	      recch.lastIndex = ix;
	      ix = 1;
	      while ((match = recch.exec(s))) {
	        if (match[1] &&
	          !(match[1] === ch ? ++ix : --ix)) { break }
	      }
	      return ix ? s.length : recch.lastIndex
	    }
	  };
	
	  _brackets.hasExpr = function hasExpr (str) {
	    return _cache[4].test(str)
	  };
	
	  _brackets.loopKeys = function loopKeys (expr) {
	    var m = expr.match(_cache[9]);
	
	    return m
	      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
	      : { val: expr.trim() }
	  };
	
	  _brackets.array = function array (pair) {
	    return pair ? _create(pair) : _cache
	  };
	
	  function _reset (pair) {
	    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	      _cache = _create(pair);
	      _regex = pair === DEFAULT ? _loopback : _rewrite;
	      _cache[9] = _regex(_pairs[9]);
	    }
	    cachedBrackets = pair;
	  }
	
	  function _setSettings (o) {
	    var b;
	
	    o = o || {};
	    b = o.brackets;
	    Object.defineProperty(o, 'brackets', {
	      set: _reset,
	      get: function () { return cachedBrackets },
	      enumerable: true
	    });
	    _settings = o;
	    _reset(b);
	  }
	
	  Object.defineProperty(_brackets, 'settings', {
	    set: _setSettings,
	    get: function () { return _settings }
	  });
	
	  /* istanbul ignore next: in the browser riot is always in the scope */
	  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	  _brackets.set = _reset;
	
	  _brackets.R_STRINGS = R_STRINGS;
	  _brackets.R_MLCOMMS = R_MLCOMMS;
	  _brackets.S_QBLOCKS = S_QBLOCKS;
	
	  return _brackets
	
	})();
	
	/**
	 * @module tmpl
	 *
	 * tmpl          - Root function, returns the template value, render with data
	 * tmpl.hasExpr  - Test the existence of a expression inside a string
	 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	 */
	
	var tmpl = (function () {
	
	  var _cache = {};
	
	  function _tmpl (str, data) {
	    if (!str) { return str }
	
	    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
	  }
	
	  _tmpl.hasExpr = brackets.hasExpr;
	
	  _tmpl.loopKeys = brackets.loopKeys;
	
	  // istanbul ignore next
	  _tmpl.clearCache = function () { _cache = {}; };
	
	  _tmpl.errorHandler = null;
	
	  function _logErr (err, ctx) {
	
	    err.riotData = {
	      tagName: ctx && ctx.root && ctx.root.tagName,
	      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
	    };
	
	    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
	    else if (
	      typeof console !== 'undefined' &&
	      typeof console.error === 'function'
	    ) {
	      if (err.riotData.tagName) {
	        console.error('Riot template error thrown in the <%s> tag', err.riotData.tagName.toLowerCase());
	      }
	      console.error(err);
	    }
	  }
	
	  function _create (str) {
	    var expr = _getTmpl(str);
	
	    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }
	
	    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
	  }
	
	  var
	    CH_IDEXPR = String.fromCharCode(0x2057),
	    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	    RE_DQUOTE = /\u2057/g,
	    RE_QBMARK = /\u2057(\d+)~/g;
	
	  function _getTmpl (str) {
	    var
	      qstr = [],
	      expr,
	      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);
	
	    if (parts.length > 2 || parts[0]) {
	      var i, j, list = [];
	
	      for (i = j = 0; i < parts.length; ++i) {
	
	        expr = parts[i];
	
	        if (expr && (expr = i & 1
	
	            ? _parseExpr(expr, 1, qstr)
	
	            : '"' + expr
	                .replace(/\\/g, '\\\\')
	                .replace(/\r\n?|\n/g, '\\n')
	                .replace(/"/g, '\\"') +
	              '"'
	
	          )) { list[j++] = expr; }
	
	      }
	
	      expr = j < 2 ? list[0]
	           : '[' + list.join(',') + '].join("")';
	
	    } else {
	
	      expr = _parseExpr(parts[1], 0, qstr);
	    }
	
	    if (qstr[0]) {
	      expr = expr.replace(RE_QBMARK, function (_, pos) {
	        return qstr[pos]
	          .replace(/\r/g, '\\r')
	          .replace(/\n/g, '\\n')
	      });
	    }
	    return expr
	  }
	
	  var
	    RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };
	
	  function _parseExpr (expr, asText, qstr) {
	
	    expr = expr
	          .replace(RE_QBLOCK, function (s, div) {
	            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
	          })
	          .replace(/\s+/g, ' ').trim()
	          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');
	
	    if (expr) {
	      var
	        list = [],
	        cnt = 0,
	        match;
	
	      while (expr &&
	            (match = expr.match(RE_CSNAME)) &&
	            !match.index
	        ) {
	        var
	          key,
	          jsb,
	          re = /,|([[{(])|$/g;
	
	        expr = RegExp.rightContext;
	        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];
	
	        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }
	
	        jsb  = expr.slice(0, match.index);
	        expr = RegExp.rightContext;
	
	        list[cnt++] = _wrapExpr(jsb, 1, key);
	      }
	
	      expr = !cnt ? _wrapExpr(expr, asText)
	           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	    }
	    return expr
	
	    function skipBraces (ch, re) {
	      var
	        mm,
	        lv = 1,
	        ir = RE_BREND[ch];
	
	      ir.lastIndex = re.lastIndex;
	      while (mm = ir.exec(expr)) {
	        if (mm[0] === ch) { ++lv; }
	        else if (!--lv) { break }
	      }
	      re.lastIndex = lv ? expr.length : ir.lastIndex;
	    }
	  }
	
	  // istanbul ignore next: not both
	  var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
	    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;
	
	  function _wrapExpr (expr, asText, key) {
	    var tb;
	
	    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	      if (mvar) {
	        pos = tb ? 0 : pos + match.length;
	
	        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	          match = p + '("' + mvar + JS_CONTEXT + mvar;
	          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
	        } else if (pos) {
	          tb = !JS_NOPROPS.test(s.slice(pos));
	        }
	      }
	      return match
	    });
	
	    if (tb) {
	      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	    }
	
	    if (key) {
	
	      expr = (tb
	          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
	        ) + '?"' + key + '":""';
	
	    } else if (asText) {
	
	      expr = 'function(v){' + (tb
	          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
	        ) + ';return v||v===0?v:""}.call(this)';
	    }
	
	    return expr
	  }
	
	  _tmpl.version = brackets.version = 'v3.0.1';
	
	  return _tmpl
	
	})();
	
	var observable$1 = function(el) {
	
	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */
	
	  el = el || {};
	
	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice;
	
	  /**
	   * Public Api
	   */
	
	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given `event` ands
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } event - event id
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(event, fn) {
	        if (typeof fn == 'function')
	          { (callbacks[event] = callbacks[event] || []).push(fn); }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Removes the given `event` listeners
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(event, fn) {
	        if (event == '*' && !fn) { callbacks = {}; }
	        else {
	          if (fn) {
	            var arr = callbacks[event];
	            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	              if (cb == fn) { arr.splice(i--, 1); }
	            }
	          } else { delete callbacks[event]; }
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Listen to the given `event` and
	     * execute the `callback` at most once
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(event, fn) {
	        function on() {
	          el.off(event, on);
	          fn.apply(el, arguments);
	        }
	        return el.on(event, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Execute all callback functions that listen to
	     * the given `event`
	     * @param   { String } event - event id
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(event) {
	        var arguments$1 = arguments;
	
	
	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns,
	          fn,
	          i;
	
	        for (i = 0; i < arglen; i++) {
	          args[i] = arguments$1[i + 1]; // skip first argument
	        }
	
	        fns = slice.call(callbacks[event] || [], 0);
	
	        for (i = 0; fn = fns[i]; ++i) {
	          fn.apply(el, args);
	        }
	
	        if (callbacks['*'] && event != '*')
	          { el.trigger.apply(el, ['*', event].concat(args)); }
	
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  });
	
	  return el
	
	};
	
	/**
	 * Specialized function for looping an array-like collection with `each={}`
	 * @param   { Array } list - collection of items
	 * @param   {Function} fn - callback function
	 * @returns { Array } the array looped
	 */
	function each(list, fn) {
	  var len = list ? list.length : 0;
	
	  for (var i = 0, el; i < len; ++i) {
	    el = list[i];
	    // return false -> current item was removed by fn during the loop
	    if (fn(el, i) === false)
	      { i--; }
	  }
	  return list
	}
	
	/**
	 * Check whether an array contains an item
	 * @param   { Array } array - target array
	 * @param   { * } item - item to test
	 * @returns { Boolean } -
	 */
	function contains(array, item) {
	  return ~array.indexOf(item)
	}
	
	/**
	 * Convert a string containing dashes to camel case
	 * @param   { String } str - input string
	 * @returns { String } my-string -> myString
	 */
	function toCamel(str) {
	  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
	}
	
	/**
	 * Faster String startsWith alternative
	 * @param   { String } str - source string
	 * @param   { String } value - test string
	 * @returns { Boolean } -
	 */
	function startsWith(str, value) {
	  return str.slice(0, value.length) === value
	}
	
	/**
	 * Helper function to set an immutable property
	 * @param   { Object } el - object where the new property will be set
	 * @param   { String } key - object key where the new property will be stored
	 * @param   { * } value - value of the new property
	 * @param   { Object } options - set the propery overriding the default options
	 * @returns { Object } - the initial object
	 */
	function defineProperty(el, key, value, options) {
	  Object.defineProperty(el, key, extend({
	    value: value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options));
	  return el
	}
	
	/**
	 * Extend any object with other properties
	 * @param   { Object } src - source object
	 * @returns { Object } the resulting extended object
	 *
	 * var obj = { foo: 'baz' }
	 * extend(obj, {bar: 'bar', foo: 'bar'})
	 * console.log(obj) => {bar: 'bar', foo: 'bar'}
	 *
	 */
	function extend(src) {
	  var obj, args = arguments;
	  for (var i = 1; i < args.length; ++i) {
	    if (obj = args[i]) {
	      for (var key in obj) {
	        // check if this property of the source object could be overridden
	        if (isWritable(src, key))
	          { src[key] = obj[key]; }
	      }
	    }
	  }
	  return src
	}
	
	var misc = Object.freeze({
		each: each,
		contains: contains,
		toCamel: toCamel,
		startsWith: startsWith,
		defineProperty: defineProperty,
		extend: extend
	});
	
	var EVENTS_PREFIX_REGEX = /^on/;
	
	/**
	 * Trigger DOM events
	 * @param   { HTMLElement } dom - dom element target of the event
	 * @param   { Function } handler - user function
	 * @param   { Object } e - event object
	 */
	function handleEvent(dom, handler, e) {
	  var ptag = this._parent,
	    item = this._item;
	
	  if (!item)
	    { while (ptag && !item) {
	      item = ptag._item;
	      ptag = ptag._parent;
	    } }
	
	  // override the event properties
	  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
	  if (isWritable(e, 'target')) { e.target = e.srcElement; }
	  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }
	
	  e.item = item;
	
	  handler.call(this, e);
	
	  if (!e.preventUpdate) {
	    var p = getImmediateCustomParentTag(this);
	    // fixes #2083
	    if (p.isMounted) { p.update(); }
	  }
	}
	
	/**
	 * Attach an event to a DOM node
	 * @param { String } name - event name
	 * @param { Function } handler - event callback
	 * @param { Object } dom - dom node
	 * @param { Tag } tag - tag instance
	 */
	function setEventHandler(name, handler, dom, tag) {
	  var eventName,
	    cb = handleEvent.bind(tag, dom, handler);
	
	  if (!dom.addEventListener) {
	    dom[name] = cb;
	    return
	  }
	
	  // avoid to bind twice the same event
	  dom[name] = null;
	
	  // normalize event name
	  eventName = name.replace(EVENTS_PREFIX_REGEX, '');
	
	  // cache the callback directly on the DOM node
	  if (!dom._riotEvents) { dom._riotEvents = {}; }
	
	  if (dom._riotEvents[name])
	    { dom.removeEventListener(eventName, dom._riotEvents[name]); }
	
	  dom._riotEvents[name] = cb;
	  dom.addEventListener(eventName, cb, false);
	}
	
	/**
	 * Update dynamically created data-is tags with changing expressions
	 * @param { Object } expr - expression tag and expression info
	 * @param { Tag } parent - parent for tag creation
	 */
	function updateDataIs(expr, parent) {
	  var tagName = tmpl(expr.value, parent),
	    conf;
	
	  if (expr.tag && expr.tagName === tagName) {
	    expr.tag.update();
	    return
	  }
	
	  // sync _parent to accommodate changing tagnames
	  if (expr.tag) {
	    each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
	    expr.tag.unmount(true);
	  }
	
	  expr.impl = __TAG_IMPL[tagName];
	  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
	  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
	  expr.tagName = tagName;
	  expr.tag.mount();
	
	  // parent is the placeholder tag, not the dynamic tag so clean up
	  parent.on('unmount', function () {
	    var delName = expr.tag.opts.dataIs,
	      tags = expr.tag.parent.tags,
	      _tags = expr.tag._parent.tags;
	    arrayishRemove(tags, delName, expr.tag);
	    arrayishRemove(_tags, delName, expr.tag);
	    expr.tag.unmount();
	  });
	}
	
	/**
	 * Update on single tag expression
	 * @this Tag
	 * @param { Object } expr - expression logic
	 * @returns { undefined }
	 */
	function updateExpression(expr) {
	  var dom = expr.dom,
	    attrName = expr.attr,
	    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
	    value = tmpl(expr.expr, this),
	    isValueAttr = attrName === 'riot-value',
	    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
	    parent = dom && (expr.parent || dom.parentNode),
	    old;
	
	  if (expr.bool)
	    { value = value ? attrName : false; }
	  else if (isUndefined(value) || value === null)
	    { value = ''; }
	
	  if (expr._riot_id) { // if it's a tag
	    if (expr.isMounted) {
	      expr.update();
	
	    // if it hasn't been mounted yet, do that now.
	    } else {
	      expr.mount();
	
	      if (isVirtual) {
	        var frag = document.createDocumentFragment();
	        makeVirtual.call(expr, frag);
	        expr.root.parentElement.replaceChild(frag, expr.root);
	      }
	    }
	    return
	  }
	
	  old = expr.value;
	  expr.value = value;
	
	  if (expr.update) {
	    expr.update();
	    return
	  }
	
	  if (expr.isRtag && value) { return updateDataIs(expr, this) }
	  if (old === value) { return }
	  // no change, so nothing more to do
	  if (isValueAttr && dom.value === value) { return }
	
	  // textarea and text nodes have no attribute name
	  if (!attrName) {
	    // about #815 w/o replace: the browser converts the value to a string,
	    // the comparison by "==" does too, but not in the server
	    value += '';
	    // test for parent avoids error with invalid assignment to nodeValue
	    if (parent) {
	      // cache the parent node because somehow it will become null on IE
	      // on the next iteration
	      expr.parent = parent;
	      if (parent.tagName === 'TEXTAREA') {
	        parent.value = value;                    // #1113
	        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
	      }                                         // will be available on 'updated'
	      else { dom.nodeValue = value; }
	    }
	    return
	  }
	
	  // remove original attribute
	  if (!expr.isAttrRemoved || !value) {
	    remAttr(dom, attrName);
	    expr.isAttrRemoved = true;
	  }
	
	  // event handler
	  if (isFunction(value)) {
	    setEventHandler(attrName, value, dom, this);
	  // show / hide
	  } else if (isToggle) {
	    if (attrName === HIDE_DIRECTIVE) { value = !value; }
	    dom.style.display = value ? '' : 'none';
	  // field value
	  } else if (isValueAttr) {
	    dom.value = value;
	  // <img src="{ expr }">
	  } else if (startsWith(attrName, ATTRS_PREFIX) && attrName !== IS_DIRECTIVE) {
	    attrName = attrName.slice(ATTRS_PREFIX.length);
	    if (CASE_SENSITIVE_ATTRIBUTES[attrName])
	      { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
	    if (value != null)
	      { setAttr(dom, attrName, value); }
	  } else {
	    // <select> <option selected={true}> </select>
	    if (attrName === 'selected' && parent && /^(SELECT|OPTGROUP)$/.test(parent.tagName) && value) {
	      parent.value = dom.value;
	    } if (expr.bool) {
	      dom[attrName] = value;
	      if (!value) { return }
	    } if (value === 0 || value && typeof value !== T_OBJECT) {
	      setAttr(dom, attrName, value);
	    }
	  }
	}
	
	/**
	 * Update all the expressions in a Tag instance
	 * @this Tag
	 * @param { Array } expressions - expression that must be re evaluated
	 */
	function updateAllExpressions(expressions) {
	  each(expressions, updateExpression.bind(this));
	}
	
	var IfExpr = {
	  init: function init(dom, tag, expr) {
	    remAttr(dom, CONDITIONAL_DIRECTIVE);
	    this.tag = tag;
	    this.expr = expr;
	    this.stub = document.createTextNode('');
	    this.pristine = dom;
	
	    var p = dom.parentNode;
	    p.insertBefore(this.stub, dom);
	    p.removeChild(dom);
	
	    return this
	  },
	  update: function update() {
	    var newValue = tmpl(this.expr, this.tag);
	
	    if (newValue && !this.current) { // insert
	      this.current = this.pristine.cloneNode(true);
	      this.stub.parentNode.insertBefore(this.current, this.stub);
	
	      this.expressions = [];
	      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
	    } else if (!newValue && this.current) { // remove
	      unmountAll(this.expressions);
	      if (this.current._tag) {
	        this.current._tag.unmount();
	      } else if (this.current.parentNode)
	        { this.current.parentNode.removeChild(this.current); }
	      this.current = null;
	      this.expressions = [];
	    }
	
	    if (newValue) { updateAllExpressions.call(this.tag, this.expressions); }
	  },
	  unmount: function unmount() {
	    unmountAll(this.expressions || []);
	    delete this.pristine;
	    delete this.parentNode;
	    delete this.stub;
	  }
	};
	
	var RefExpr = {
	  init: function init(dom, parent, attrName, attrValue) {
	    this.dom = dom;
	    this.attr = attrName;
	    this.rawValue = attrValue;
	    this.parent = parent;
	    this.hasExp = tmpl.hasExpr(attrValue);
	    this.firstRun = true;
	
	    return this
	  },
	  update: function update() {
	    var value = this.rawValue;
	    if (this.hasExp)
	      { value = tmpl(this.rawValue, this.parent); }
	
	    // if nothing changed, we're done
	    if (!this.firstRun && value === this.value) { return }
	
	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	
	    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
	    var tagOrDom = this.tag || this.dom;
	
	    // the name changed, so we need to remove it from the old key (if present)
	    if (!isBlank(this.value) && customParent)
	      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
	
	    if (isBlank(value)) {
	      // if the value is blank, we remove it
	      remAttr(this.dom, this.attr);
	    } else {
	      // add it to the refs of parent tag (this behavior was changed >=3.0)
	      if (customParent) { arrayishAdd(customParent.refs, value, tagOrDom); }
	      // set the actual DOM attr
	      setAttr(this.dom, this.attr, value);
	    }
	    this.value = value;
	    this.firstRun = false;
	  },
	  unmount: function unmount() {
	    var tagOrDom = this.tag || this.dom;
	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	    if (!isBlank(this.value) && customParent)
	      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
	    delete this.dom;
	    delete this.parent;
	  }
	};
	
	/**
	 * Convert the item looped into an object used to extend the child tag properties
	 * @param   { Object } expr - object containing the keys used to extend the children tags
	 * @param   { * } key - value to assign to the new object returned
	 * @param   { * } val - value containing the position of the item in the array
	 * @param   { Object } base - prototype object for the new item
	 * @returns { Object } - new object containing the values of the original item
	 *
	 * The variables 'key' and 'val' are arbitrary.
	 * They depend on the collection type looped (Array, Object)
	 * and on the expression used on the each tag
	 *
	 */
	function mkitem(expr, key, val, base) {
	  var item = base ? Object.create(base) : {};
	  item[expr.key] = key;
	  if (expr.pos) { item[expr.pos] = val; }
	  return item
	}
	
	/**
	 * Unmount the redundant tags
	 * @param   { Array } items - array containing the current items to loop
	 * @param   { Array } tags - array containing all the children tags
	 * @param   { String } tagName - key used to identify the type of tag
	 */
	function unmountRedundant(items, tags, tagName) {
	  var i = tags.length,
	    j = items.length,
	    t;
	
	  while (i > j) {
	    t = tags[--i];
	    tags.splice(i, 1);
	    t.unmount();
	    arrayishRemove(t.parent, tagName, t, true);
	  }
	}
	
	/**
	 * Move the nested custom tags in non custom loop tags
	 * @this Tag
	 * @param   { Number } i - current position of the loop tag
	 */
	function moveNestedTags(i) {
	  var this$1 = this;
	
	  each(Object.keys(this.tags), function (tagName) {
	    var tag = this$1.tags[tagName];
	    if (isArray(tag))
	      { each(tag, function (t) {
	        moveChildTag.apply(t, [tagName, i]);
	      }); }
	    else
	      { moveChildTag.apply(tag, [tagName, i]); }
	  });
	}
	
	/**
	 * Move a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function move(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { moveVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}
	
	/**
	 * Insert and mount a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function insert(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}
	
	/**
	 * Append a new tag into the DOM
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function append(root, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.call(this, root); }
	  else
	    { root.appendChild(this.root); }
	}
	
	/**
	 * Manage tags having the 'each'
	 * @param   { HTMLElement } dom - DOM node we need to loop
	 * @param   { Tag } parent - parent tag instance where the dom node is contained
	 * @param   { String } expr - string contained in the 'each' attribute
	 * @returns { Object } expression object for this each loop
	 */
	function _each(dom, parent, expr) {
	
	  // remove the each property from the original tag
	  remAttr(dom, LOOP_DIRECTIVE);
	
	  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
	    tagName = getTagName(dom),
	    impl = __TAG_IMPL[tagName] || { tmpl: getOuterHTML(dom) },
	    useRoot = RE_SPECIAL_TAGS.test(tagName),
	    parentNode = dom.parentNode,
	    ref = createDOMPlaceholder(),
	    child = getTag(dom),
	    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
	    tags = [],
	    oldItems = [],
	    hasKeys,
	    isLoop = true,
	    isAnonymous = !__TAG_IMPL[tagName],
	    isVirtual = dom.tagName === 'VIRTUAL';
	
	  // parse the each expression
	  expr = tmpl.loopKeys(expr);
	  expr.isLoop = true;
	
	  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }
	
	  // insert a marked where the loop tags will be injected
	  parentNode.insertBefore(ref, dom);
	  parentNode.removeChild(dom);
	
	  expr.update = function updateEach() {
	
	    // get the new items collection
	    var items = tmpl(expr.val, parent),
	      frag = createFrag(),
	      isObject$$1 = !isArray(items),
	      root = ref.parentNode;
	
	    // object loop. any changes cause full redraw
	    if (isObject$$1) {
	      hasKeys = items || false;
	      items = hasKeys ?
	        Object.keys(items).map(function (key) {
	          return mkitem(expr, items[key], key)
	        }) : [];
	    } else {
	      hasKeys = false;
	    }
	
	    if (ifExpr) {
	      items = items.filter(function(item, i) {
	        if (expr.key && !isObject$$1)
	          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }
	
	        return !!tmpl(ifExpr, extend(Object.create(parent), item))
	      });
	    }
	
	    // loop all the new items
	    each(items, function(item, i) {
	      // reorder only if the items are objects
	      var
	        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
	        oldPos = oldItems.indexOf(item),
	        isNew = !~oldPos,
	        mustAppend = i <= tags.length,
	        pos = !isNew && doReorder ? oldPos : i,
	        // does a tag exist in this position?
	        tag = tags[pos];
	
	      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;
	
	      // new tag
	      if (
	        doReorder && isNew // by default we always try to reorder the DOM elements
	        ||
	        !doReorder && !tag // with no-reorder we just update the old tags
	      ) {
	        tag = new Tag$1(impl, {
	          parent: parent,
	          isLoop: isLoop,
	          isAnonymous: isAnonymous,
	          root: useRoot ? root : dom.cloneNode(),
	          item: item
	        }, dom.innerHTML);
	
	        // mount the tag
	        tag.mount();
	
	        if (mustAppend)
	          { append.apply(tag, [frag || root, isVirtual]); }
	        else
	          { insert.apply(tag, [root, tags[i], isVirtual]); }
	
	        if (!mustAppend) { oldItems.splice(i, 0, item); }
	        tags.splice(i, 0, tag);
	        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
	        pos = i; // handled here so no move
	      } else { tag.update(item); }
	
	      // reorder the tag if it's not located in its previous position
	      if (pos !== i && doReorder) {
	        // #closes 2040
	        if (contains(items, oldItems[i])) {
	          move.apply(tag, [root, tags[i], isVirtual]);
	        }
	        // update the position attribute if it exists
	        if (expr.pos) { tag[expr.pos] = i; }
	        // move the old tag instance
	        tags.splice(i, 0, tags.splice(pos, 1)[0]);
	        // move the old item
	        oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	        // if the loop tags are not custom
	        // we need to move all their custom tags into the right position
	        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
	      }
	
	      // cache the original item to use it in the events bound to this node
	      // and its children
	      tag._item = item;
	      // cache the real parent tag internally
	      defineProperty(tag, '_parent', parent);
	    });
	
	    // remove the redundant tags
	    unmountRedundant(items, tags, tagName);
	
	    // clone the items array
	    oldItems = items.slice();
	
	    root.insertBefore(frag, ref);
	  };
	
	  expr.unmount = function() {
	    each(tags, function(t) { t.unmount(); });
	  };
	
	  return expr
	}
	
	/**
	 * Walk the tag DOM to detect the expressions to evaluate
	 * @this Tag
	 * @param   { HTMLElement } root - root tag where we will start digging the expressions
	 * @param   { Array } expressions - empty array where the expressions will be added
	 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
	 * @returns { Object } an object containing the root noode and the dom tree
	 */
	function parseExpressions(root, expressions, mustIncludeRoot) {
	  var this$1 = this;
	
	  var tree = {parent: {children: expressions}};
	
	  walkNodes(root, function (dom, ctx) {
	    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
	    if (!mustIncludeRoot && dom === root) { return {parent: parent} }
	
	    // text node
	    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
	      { parent.children.push({dom: dom, expr: dom.nodeValue}); }
	
	    if (type !== 1) { return ctx } // not an element
	
	    // loop. each does it's own thing (for now)
	    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
	      parent.children.push(_each(dom, this$1, attr));
	      return false
	    }
	
	    // if-attrs become the new parent. Any following expressions (either on the current
	    // element, or below it) become children of this expression.
	    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
	      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
	      return false
	    }
	
	    if (expr = getAttr(dom, IS_DIRECTIVE)) {
	      if (tmpl.hasExpr(expr)) {
	        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
	        return false
	      }
	    }
	
	    // if this is a tag, stop traversing here.
	    // we ignore the root, since parseExpressions is called while we're mounting that root
	    tagImpl = getTag(dom);
	    if (tagImpl && (dom !== root || mustIncludeRoot)) {
	      var conf = {root: dom, parent: this$1, hasImpl: true};
	      parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
	      return false
	    }
	
	    // attribute expressions
	    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
	      if (!expr) { return }
	      parent.children.push(expr);
	    }]);
	
	    // whatever the parent is, all child elements get the same parent.
	    // If this element had an if-attr, that's the parent for all child elements
	    return {parent: parent}
	  }, tree);
	
	  return { tree: tree, root: root }
	}
	
	/**
	 * Calls `fn` for every attribute on an element. If that attr has an expression,
	 * it is also passed to fn.
	 * @this Tag
	 * @param   { HTMLElement } dom - dom node to parse
	 * @param   { Array } attrs - array of attributes
	 * @param   { Function } fn - callback to exec on any iteration
	 */
	function parseAttributes(dom, attrs, fn) {
	  var this$1 = this;
	
	  each(attrs, function (attr) {
	    var name = attr.name, bool = isBoolAttr(name), expr;
	
	    if (contains(REF_DIRECTIVES, name)) {
	      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
	    } else if (tmpl.hasExpr(attr.value)) {
	      expr = {dom: dom, expr: attr.value, attr: attr.name, bool: bool};
	    }
	
	    fn(attr, expr);
	  });
	}
	
	/*
	  Includes hacks needed for the Internet Explorer version 9 and below
	  See: http://kangax.github.io/compat-table/es5/#ie8
	       http://codeplanet.io/dropping-ie8/
	*/
	
	var reHasYield  = /<yield\b/i;
	var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
	var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
	var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
	var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
	var GENERIC = 'div';
	
	
	/*
	  Creates the root element for table or select child elements:
	  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	*/
	function specialTags(el, tmpl, tagName) {
	
	  var
	    select = tagName[0] === 'o',
	    parent = select ? 'select>' : 'table>';
	
	  // trim() is important here, this ensures we don't have artifacts,
	  // so we can check if we have only one element inside the parent
	  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
	  parent = el.firstChild;
	
	  // returns the immediate parent if tr/th/td/col is the only element, if not
	  // returns the whole tree, as this can include additional elements
	  if (select) {
	    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
	  } else {
	    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	    var tname = rootEls[tagName];
	    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
	  }
	  return parent
	}
	
	/*
	  Replace the yield tag from any tag template with the innerHTML of the
	  original tag in the page
	*/
	function replaceYield(tmpl, html) {
	  // do nothing if no yield
	  if (!reHasYield.test(tmpl)) { return tmpl }
	
	  // be careful with #1343 - string on the source having `$1`
	  var src = {};
	
	  html = html && html.replace(reYieldSrc, function (_, ref, text) {
	    src[ref] = src[ref] || text;   // preserve first definition
	    return ''
	  }).trim();
	
	  return tmpl
	    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
	      return src[ref] || def || ''
	    })
	    .replace(reYieldAll, function (_, def) {        // yield without any "from"
	      return html || def || ''
	    })
	}
	
	/**
	 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	 *
	 * @param   { String } tmpl  - The template coming from the custom tag definition
	 * @param   { String } html - HTML content that comes from the DOM element where you
	 *           will mount the tag, mostly the original tag in the page
	 * @param   { Boolean } checkSvg - flag needed to know if we need to force the svg rendering in case of loop nodes
	 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
	 */
	function mkdom(tmpl, html, checkSvg) {
	  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
	    tagName = match && match[1].toLowerCase(),
	    el = mkEl(GENERIC, checkSvg && isSVGTag(tagName));
	
	  // replace all the yield tags with the tag inner html
	  tmpl = replaceYield(tmpl, html);
	
	  /* istanbul ignore next */
	  if (tblTags.test(tagName))
	    { el = specialTags(el, tmpl, tagName); }
	  else
	    { setInnerHTML(el, tmpl); }
	
	  el.stub = true;
	
	  return el
	}
	
	/**
	 * Another way to create a riot tag a bit more es6 friendly
	 * @param { HTMLElement } el - tag DOM selector or DOM node/s
	 * @param { Object } opts - tag logic
	 * @returns { Tag } new riot tag instance
	 */
	function Tag$2(el, opts) {
	  // get the tag properties from the class constructor
	  var ref = this;
	  var name = ref.name;
	  var tmpl = ref.tmpl;
	  var css = ref.css;
	  var attrs = ref.attrs;
	  var onCreate = ref.onCreate;
	  // register a new tag and cache the class prototype
	  if (!__TAG_IMPL[name]) {
	    tag$1(name, tmpl, css, attrs, onCreate);
	    // cache the class constructor
	    __TAG_IMPL[name].class = this.constructor;
	  }
	
	  // mount the tag using the class instance
	  mountTo(el, name, opts, this);
	  // inject the component css
	  if (css) { styleManager.inject(); }
	
	  return this
	}
	
	/**
	 * Create a new riot tag implementation
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag$1(name, tmpl, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs;
	
	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css;
	      css = '';
	    } else
	      { attrs = ''; }
	  }
	
	  if (css) {
	    if (isFunction(css))
	      { fn = css; }
	    else
	      { styleManager.add(css); }
	  }
	
	  name = name.toLowerCase();
	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };
	
	  return name
	}
	
	/**
	 * Create a new riot tag implementation (for use by the compiler)
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag2$1(name, tmpl, css, attrs, fn) {
	  if (css)
	    { styleManager.add(css, name); }
	
	  var exists = !!__TAG_IMPL[name];
	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };
	
	  if (exists && util.hotReloader)
	    { util.hotReloader(name); }
	
	  return name
	}
	
	/**
	 * Mount a tag using a specific tag implementation
	 * @param   { * } selector - tag DOM selector or DOM node/s
	 * @param   { String } tagName - tag implementation name
	 * @param   { Object } opts - tag logic
	 * @returns { Array } new tags instances
	 */
	function mount$1(selector, tagName, opts) {
	  var tags = [];
	
	  function pushTagsTo(root) {
	    if (root.tagName) {
	      var riotTag = getAttr(root, IS_DIRECTIVE);
	
	      // have tagName? force riot-tag to be the same
	      if (tagName && riotTag !== tagName) {
	        riotTag = tagName;
	        setAttr(root, IS_DIRECTIVE, tagName);
	      }
	
	      var tag$$1 = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);
	
	      if (tag$$1)
	        { tags.push(tag$$1); }
	    } else if (root.length)
	      { each(root, pushTagsTo); } // assume nodeList
	  }
	
	  // inject styles into DOM
	  styleManager.inject();
	
	  if (isObject(tagName)) {
	    opts = tagName;
	    tagName = 0;
	  }
	
	  var elem;
	  var allTags;
	
	  // crawl the DOM to find the tag
	  if (isString(selector)) {
	    selector = selector === '*' ?
	      // select all registered tags
	      // & tags found with the riot-tag attribute set
	      allTags = selectTags() :
	      // or just the ones named like the selector
	      selector + selectTags(selector.split(/, */));
	
	    // make sure to pass always a selector
	    // to the querySelectorAll function
	    elem = selector ? $$(selector) : [];
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    { elem = selector; }
	
	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectTags();
	    // if the root els it's just a single tag
	    if (elem.tagName)
	      { elem = $$(tagName, elem); }
	    else {
	      // select all the children for all the different root elements
	      var nodeList = [];
	
	      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });
	
	      elem = nodeList;
	    }
	    // get rid of the tagName
	    tagName = 0;
	  }
	
	  pushTagsTo(elem);
	
	  return tags
	}
	
	// Create a mixin that could be globally shared across all the tags
	var mixins = {};
	var globals = mixins[GLOBAL_MIXIN] = {};
	var _id = 0;
	
	/**
	 * Create/Return a mixin by its name
	 * @param   { String }  name - mixin name (global mixin if object)
	 * @param   { Object }  mix - mixin logic
	 * @param   { Boolean } g - is global?
	 * @returns { Object }  the mixin logic
	 */
	function mixin$1(name, mix, g) {
	  // Unnamed global
	  if (isObject(name)) {
	    mixin$1(("__unnamed_" + (_id++)), name, true);
	    return
	  }
	
	  var store = g ? globals : mixins;
	
	  // Getter
	  if (!mix) {
	    if (isUndefined(store[name]))
	      { throw new Error('Unregistered mixin: ' + name) }
	
	    return store[name]
	  }
	
	  // Setter
	  store[name] = isFunction(mix) ?
	    extend(mix.prototype, store[name] || {}) && mix :
	    extend(store[name] || {}, mix);
	}
	
	/**
	 * Update all the tags instances created
	 * @returns { Array } all the tags instances
	 */
	function update$1() {
	  return each(__TAGS_CACHE, function (tag$$1) { return tag$$1.update(); })
	}
	
	function unregister$1(name) {
	  delete __TAG_IMPL[name];
	}
	
	// counter to give a unique id to all the Tag instances
	var __uid = 0;
	
	/**
	 * We need to update opts for this tag. That requires updating the expressions
	 * in any attributes on the tag, and then copying the result onto opts.
	 * @this Tag
	 * @param   {Boolean} isLoop - is it a loop tag?
	 * @param   { Tag }  parent - parent tag node
	 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
	 * @param   { Object }  opts - tag options
	 * @param   { Array }  instAttrs - tag attributes array
	 */
	function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
	  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
	  // (and only this case) we don't need to do updateOpts, because the regular parse
	  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
	  if (isLoop && isAnonymous) { return }
	
	  var ctx = !isAnonymous && isLoop ? this : parent || this;
	  each(instAttrs, function (attr) {
	    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
	    opts[toCamel(attr.name)] = attr.expr ? attr.expr.value : attr.value;
	  });
	}
	
	
	/**
	 * Tag class
	 * @constructor
	 * @param { Object } impl - it contains the tag template, and logic
	 * @param { Object } conf - tag options
	 * @param { String } innerHTML - html that eventually we need to inject in the tag
	 */
	function Tag$1(impl, conf, innerHTML) {
	
	  var opts = extend({}, conf.opts),
	    parent = conf.parent,
	    isLoop = conf.isLoop,
	    isAnonymous = conf.isAnonymous,
	    item = cleanUpData(conf.item),
	    instAttrs = [], // All attributes on the Tag when it's first parsed
	    implAttrs = [], // expressions on this type of Tag
	    expressions = [],
	    root = conf.root,
	    tagName = conf.tagName || getTagName(root),
	    isVirtual = tagName === 'virtual',
	    propsInSyncWithParent = [],
	    dom;
	
	  // make this tag observable
	  observable$1(this);
	  // only call unmount if we have a valid __TAG_IMPL (has name property)
	  if (impl.name && root._tag) { root._tag.unmount(true); }
	
	  // not yet mounted
	  this.isMounted = false;
	  root.isLoop = isLoop;
	
	  defineProperty(this, '_internal', {
	    isAnonymous: isAnonymous,
	    instAttrs: instAttrs,
	    innerHTML: innerHTML,
	    // these vars will be needed only for the virtual tags
	    virts: [],
	    tail: null,
	    head: null
	  });
	
	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
	
	  extend(this, { root: root, opts: opts }, item);
	  // protect the "tags" and "refs" property from being overridden
	  defineProperty(this, 'parent', parent || null);
	  defineProperty(this, 'tags', {});
	  defineProperty(this, 'refs', {});
	
	  dom = mkdom(impl.tmpl, innerHTML, isLoop);
	
	  /**
	   * Update the tag expressions and options
	   * @param   { * }  data - data we want to use to extend the tag properties
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'update', function tagUpdate(data) {
	    if (isFunction(this.shouldUpdate) && !this.shouldUpdate(data)) { return this }
	
	    // make sure the data passed will not override
	    // the component core methods
	    data = cleanUpData(data);
	
	    // inherit properties from the parent, but only for isAnonymous tags
	    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
	    extend(this, data);
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);
	    if (this.isMounted) { this.trigger('update', data); }
	    updateAllExpressions.call(this, expressions);
	    if (this.isMounted) { this.trigger('updated'); }
	
	    return this
	
	  }.bind(this));
	
	  /**
	   * Add a mixin to this tag
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mixin', function tagMixin() {
	    var this$1 = this;
	
	    each(arguments, function (mix) {
	      var instance,
	        props = [],
	        obj;
	
	      mix = isString(mix) ? mixin$1(mix) : mix;
	
	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix();
	      } else { instance = mix; }
	
	      var proto = Object.getPrototypeOf(instance);
	
	      // build multilevel prototype inheritance chain property list
	      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
	      while (obj = Object.getPrototypeOf(obj || instance))
	
	      // loop the keys in the function prototype or the all object keys
	      each(props, function (key) {
	        // bind methods to this
	        // allow mixins to override other properties/parent mixins
	        if (key !== 'init') {
	          // check for getters/setters
	          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
	          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);
	
	          // apply method only if it does not already exist on the instance
	          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
	            Object.defineProperty(this$1, key, descriptor);
	          } else {
	            this$1[key] = isFunction(instance[key]) ?
	              instance[key].bind(this$1) :
	              instance[key];
	          }
	        }
	      });
	
	      // init method will be called automatically
	      if (instance.init)
	        { instance.init.bind(this$1)(); }
	    });
	    return this
	  }.bind(this));
	
	  /**
	   * Mount the current tag instance
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mount', function tagMount() {
	    var this$1 = this;
	
	    root._tag = this; // keep a reference to the tag just created
	
	    // Read all the attrs on this instance. This give us the info we need for updateOpts
	    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
	      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
	      attr.expr = expr;
	      instAttrs.push(attr);
	    }]);
	
	    // update the root adding custom attributes coming from the compiler
	    implAttrs = [];
	    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
	    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
	      if (expr) { expressions.push(expr); }
	      else { setAttr(root, attr.name, attr.value); }
	    }]);
	
	    // children in loop should inherit from true parent
	    if (this._parent && isAnonymous) { inheritFrom.apply(this, [this._parent, propsInSyncWithParent]); }
	
	    // initialiation
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);
	
	    // add global mixins
	    var globalMixin = mixin$1(GLOBAL_MIXIN);
	
	    if (globalMixin) {
	      for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) {
	          this$1.mixin(globalMixin[i]);
	        }
	      }
	    }
	
	    if (impl.fn) { impl.fn.call(this, opts); }
	
	    this.trigger('before-mount');
	
	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions.apply(this, [dom, expressions, false]);
	
	    this.update(item);
	
	    if (isLoop && isAnonymous) {
	      // update the root attribute for the looped elements
	      this.root = root = dom.firstChild;
	    } else {
	      while (dom.firstChild) { root.appendChild(dom.firstChild); }
	      if (root.stub) { root = parent.root; }
	    }
	
	    defineProperty(this, 'root', root);
	    this.isMounted = true;
	
	    // if it's not a child tag we can trigger its mount event
	    if (!this.parent || this.parent.isMounted) {
	      this.trigger('mount');
	    }
	    // otherwise we need to wait that the parent event gets triggered
	    else { this.parent.one('mount', function () {
	      this$1.trigger('mount');
	    }); }
	
	    return this
	
	  }.bind(this));
	
	  /**
	   * Unmount the tag instance
	   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
	    var this$1 = this;
	
	    var el = this.root,
	      p = el.parentNode,
	      ptag,
	      tagIndex = __TAGS_CACHE.indexOf(this);
	
	    this.trigger('before-unmount');
	
	    // clear all attributes coming from the mounted tag
	    walkAttrs(impl.attrs, function (name) {
	      if (startsWith(name, ATTRS_PREFIX))
	        { name = name.slice(ATTRS_PREFIX.length); }
	      remAttr(root, name);
	    });
	
	    // remove this tag instance from the global virtualDom variable
	    if (~tagIndex)
	      { __TAGS_CACHE.splice(tagIndex, 1); }
	
	    if (p) {
	      if (parent) {
	        ptag = getImmediateCustomParentTag(parent);
	
	        if (isVirtual) {
	          Object.keys(this.tags).forEach(function (tagName) {
	            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
	          });
	        } else {
	          arrayishRemove(ptag.tags, tagName, this);
	          if(parent !== ptag) // remove from _parent too
	            { arrayishRemove(parent.tags, tagName, this); }
	        }
	      } else {
	        while (el.firstChild) { el.removeChild(el.firstChild); }
	      }
	
	      if (!mustKeepRoot) {
	        p.removeChild(el);
	      } else {
	        // the riot-tag and the data-is attributes aren't needed anymore, remove them
	        remAttr(p, IS_DIRECTIVE);
	      }
	    }
	
	    if (this._internal.virts) {
	      each(this._internal.virts, function (v) {
	        if (v.parentNode) { v.parentNode.removeChild(v); }
	      });
	    }
	
	    // allow expressions to unmount themselves
	    unmountAll(expressions);
	    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });
	
	    this.trigger('unmount');
	    this.off('*');
	    this.isMounted = false;
	
	    delete this.root._tag;
	
	    return this
	
	  }.bind(this));
	}
	
	/**
	 * Detect the tag implementation by a DOM node
	 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	 */
	function getTag(dom) {
	  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
	    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
	}
	
	/**
	 * Inherit properties from a target tag instance
	 * @this Tag
	 * @param   { Tag } target - tag where we will inherit properties
	 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
	 */
	function inheritFrom(target, propsInSyncWithParent) {
	  var this$1 = this;
	
	  each(Object.keys(target), function (k) {
	    // some properties must be always in sync with the parent tag
	    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);
	
	    if (isUndefined(this$1[k]) || mustSync) {
	      // track the property to keep in sync
	      // so we can keep it updated
	      if (!mustSync) { propsInSyncWithParent.push(k); }
	      this$1[k] = target[k];
	    }
	  });
	}
	
	/**
	 * Move the position of a custom tag in its parent tag
	 * @this Tag
	 * @param   { String } tagName - key where the tag was stored
	 * @param   { Number } newPos - index where the new tag will be stored
	 */
	function moveChildTag(tagName, newPos) {
	  var parent = this.parent,
	    tags;
	  // no parent no move
	  if (!parent) { return }
	
	  tags = parent.tags[tagName];
	
	  if (isArray(tags))
	    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
	  else { arrayishAdd(parent.tags, tagName, this); }
	}
	
	/**
	 * Create a new child tag including it correctly into its parent
	 * @param   { Object } child - child tag implementation
	 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	 * @param   { String } innerHTML - inner html of the child node
	 * @param   { Object } parent - instance of the parent tag including the child custom tag
	 * @returns { Object } instance of the new child tag just created
	 */
	function initChildTag(child, opts, innerHTML, parent) {
	  var tag = new Tag$1(child, opts, innerHTML),
	    tagName = opts.tagName || getTagName(opts.root, true),
	    ptag = getImmediateCustomParentTag(parent);
	  // fix for the parent attribute in the looped elements
	  defineProperty(tag, 'parent', ptag);
	  // store the real parent tag
	  // in some cases this could be different from the custom parent tag
	  // for example in nested loops
	  tag._parent = parent;
	
	  // add this tag to the custom parent tag
	  arrayishAdd(ptag.tags, tagName, tag);
	
	  // and also to the real parent tag
	  if (ptag !== parent)
	    { arrayishAdd(parent.tags, tagName, tag); }
	
	  // empty the child node once we got its template
	  // to avoid that its children get compiled multiple times
	  opts.root.innerHTML = '';
	
	  return tag
	}
	
	/**
	 * Loop backward all the parents tree to detect the first custom parent tag
	 * @param   { Object } tag - a Tag instance
	 * @returns { Object } the instance of the first custom parent tag found
	 */
	function getImmediateCustomParentTag(tag) {
	  var ptag = tag;
	  while (ptag._internal.isAnonymous) {
	    if (!ptag.parent) { break }
	    ptag = ptag.parent;
	  }
	  return ptag
	}
	
	/**
	 * Trigger the unmount method on all the expressions
	 * @param   { Array } expressions - DOM expressions
	 */
	function unmountAll(expressions) {
	  each(expressions, function(expr) {
	    if (expr instanceof Tag$1) { expr.unmount(true); }
	    else if (expr.unmount) { expr.unmount(); }
	  });
	}
	
	/**
	 * Get the tag name of any DOM node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
	 * @returns { String } name to identify this dom node in riot
	 */
	function getTagName(dom, skipDataIs) {
	  var child = getTag(dom),
	    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
	  return namedTag && !tmpl.hasExpr(namedTag) ?
	                namedTag :
	              child ? child.name : dom.tagName.toLowerCase()
	}
	
	/**
	 * With this function we avoid that the internal Tag methods get overridden
	 * @param   { Object } data - options we want to use to extend the tag instance
	 * @returns { Object } clean object without containing the riot internal reserved words
	 */
	function cleanUpData(data) {
	  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
	    { return data }
	
	  var o = {};
	  for (var key in data) {
	    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
	  }
	  return o
	}
	
	/**
	 * Set the property of an object for a given key. If something already
	 * exists there, then it becomes an array containing both the old and new value.
	 * @param { Object } obj - object on which to set the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be set
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	 */
	function arrayishAdd(obj, key, value, ensureArray) {
	  var dest = obj[key];
	  var isArr = isArray(dest);
	
	  if (dest && dest === value) { return }
	
	  // if the key was never set, set it once
	  if (!dest && ensureArray) { obj[key] = [value]; }
	  else if (!dest) { obj[key] = value; }
	  // if it was an array and not yet set
	  else if (!isArr || isArr && !contains(dest, value)) {
	    if (isArr) { dest.push(value); }
	    else { obj[key] = [dest, value]; }
	  }
	}
	
	/**
	 * Removes an item from an object at a given key. If the key points to an array,
	 * then the item is just removed from the array.
	 * @param { Object } obj - object on which to remove the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be removed
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	*/
	function arrayishRemove(obj, key, value, ensureArray) {
	  if (isArray(obj[key])) {
	    each(obj[key], function(item, i) {
	      if (item === value) { obj[key].splice(i, 1); }
	    });
	    if (!obj[key].length) { delete obj[key]; }
	    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
	  } else
	    { delete obj[key]; } // otherwise just delete the key
	}
	
	/**
	 * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	 * @param   { Object }  dom - DOM node we want to parse
	 * @returns { Boolean } -
	 */
	function isInStub(dom) {
	  while (dom) {
	    if (dom.inStub)
	      { return true }
	    dom = dom.parentNode;
	  }
	  return false
	}
	
	/**
	 * Mount a tag creating new Tag instance
	 * @param   { Object } root - dom node where the tag will be mounted
	 * @param   { String } tagName - name of the riot tag we want to mount
	 * @param   { Object } opts - options to pass to the Tag instance
	 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
	 * @returns { Tag } a new Tag instance
	 */
	function mountTo(root, tagName, opts, ctx) {
	  var impl = __TAG_IMPL[tagName],
	    implClass = __TAG_IMPL[tagName].class,
	    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;
	
	  // clear the inner html
	  root.innerHTML = '';
	
	  var conf = { root: root, opts: opts };
	  if (opts && opts.parent) { conf.parent = opts.parent; }
	
	  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }
	
	  if (tag && tag.mount) {
	    tag.mount(true);
	    // add this tag to the virtualDom variable
	    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
	  }
	
	  return tag
	}
	
	
	/**
	 * Adds the elements for a virtual tag
	 * @this Tag
	 * @param { Node } src - the node that will do the inserting or appending
	 * @param { Tag } target - only if inserting, insert before this tag's first child
	 */
	function makeVirtual(src, target) {
	  var this$1 = this;
	
	  var head = createDOMPlaceholder(),
	    tail = createDOMPlaceholder(),
	    frag = createFrag(),
	    sib, el;
	
	  this._internal.head = this.root.insertBefore(head, this.root.firstChild);
	  this._internal.tail = this.root.appendChild(tail);
	
	  el = this._internal.head;
	
	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    this$1._internal.virts.push(el); // hold for unmounting
	    el = sib;
	  }
	
	  if (target)
	    { src.insertBefore(frag, target._internal.head); }
	  else
	    { src.appendChild(frag); }
	}
	
	/**
	 * Move virtual tag and all child nodes
	 * @this Tag
	 * @param { Node } src  - the node that will do the inserting
	 * @param { Tag } target - insert before this tag's first child
	 */
	function moveVirtual(src, target) {
	  var this$1 = this;
	
	  var el = this._internal.head,
	    frag = createFrag(),
	    sib;
	
	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    el = sib;
	    if (el === this$1._internal.tail) {
	      frag.appendChild(el);
	      src.insertBefore(frag, target._internal.head);
	      break
	    }
	  }
	}
	
	/**
	 * Get selectors for tags
	 * @param   { Array } tags - tag names to select
	 * @returns { String } selector
	 */
	function selectTags(tags) {
	  // select all tags
	  if (!tags) {
	    var keys = Object.keys(__TAG_IMPL);
	    return keys + selectTags(keys)
	  }
	
	  return tags
	    .filter(function (t) { return !/[^-\w]/.test(t); })
	    .reduce(function (list, t) {
	      var name = t.trim().toLowerCase();
	      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
	    }, '')
	}
	
	
	var tags = Object.freeze({
		getTag: getTag,
		inheritFrom: inheritFrom,
		moveChildTag: moveChildTag,
		initChildTag: initChildTag,
		getImmediateCustomParentTag: getImmediateCustomParentTag,
		unmountAll: unmountAll,
		getTagName: getTagName,
		cleanUpData: cleanUpData,
		arrayishAdd: arrayishAdd,
		arrayishRemove: arrayishRemove,
		isInStub: isInStub,
		mountTo: mountTo,
		makeVirtual: makeVirtual,
		moveVirtual: moveVirtual,
		selectTags: selectTags
	});
	
	/**
	 * Riot public api
	 */
	var settings = Object.create(brackets.settings);
	
	var util = {
	  tmpl: tmpl,
	  brackets: brackets,
	  styleManager: styleManager,
	  vdom: __TAGS_CACHE,
	  styleNode: styleManager.styleNode,
	  // export the riot internal utils as well
	  dom: dom,
	  check: check,
	  misc: misc,
	  tags: tags
	};
	
	// export the core props/methods
	var Tag$$1 = Tag$2;
	var tag$$1 = tag$1;
	var tag2$$1 = tag2$1;
	var mount$$1 = mount$1;
	var mixin$$1 = mixin$1;
	var update$$1 = update$1;
	var unregister$$1 = unregister$1;
	var observable = observable$1;
	
	var riot$1 = {
	  settings: settings,
	  util: util,
	  // core
	  Tag: Tag$$1,
	  tag: tag$$1,
	  tag2: tag2$$1,
	  mount: mount$$1,
	  mixin: mixin$$1,
	  update: update$$1,
	  unregister: unregister$$1,
	  observable: observable
	};
	
	exports.settings = settings;
	exports.util = util;
	exports.Tag = Tag$$1;
	exports.tag = tag$$1;
	exports.tag2 = tag2$$1;
	exports.mount = mount$$1;
	exports.mixin = mixin$$1;
	exports.update = update$$1;
	exports.unregister = unregister$$1;
	exports.observable = observable;
	exports['default'] = riot$1;
	
	Object.defineProperty(exports, '__esModule', { value: true });
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
	
	var observable = _interopDefault(__webpack_require__(5));
	
	/**
	 * Simple client-side router
	 * @module riot-route
	 */
	
	var RE_ORIGIN = /^.+?\/\/+[^\/]+/;
	var EVENT_LISTENER = 'EventListener';
	var REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER;
	var ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER;
	var HAS_ATTRIBUTE = 'hasAttribute';
	var POPSTATE = 'popstate';
	var HASHCHANGE = 'hashchange';
	var TRIGGER = 'trigger';
	var MAX_EMIT_STACK_LEVEL = 3;
	var win = typeof window != 'undefined' && window;
	var doc = typeof document != 'undefined' && document;
	var hist = win && history;
	var loc = win && (hist.location || win.location);
	var prot = Router.prototype;
	var clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click';
	var central = observable();
	
	var started = false;
	var routeFound = false;
	var debouncedEmit;
	var base;
	var current;
	var parser;
	var secondParser;
	var emitStack = [];
	var emitStackLevel = 0;
	
	/**
	 * Default parser. You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_PARSER(path) {
	  return path.split(/[/?#]/)
	}
	
	/**
	 * Default parser (second). You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @param {string} filter - filter string (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_SECOND_PARSER(path, filter) {
	  var f = filter
	    .replace(/\?/g, '\\?')
	    .replace(/\*/g, '([^/?#]+?)')
	    .replace(/\.\./, '.*');
	  var re = new RegExp(("^" + f + "$"));
	  var args = path.match(re);
	
	  if (args) { return args.slice(1) }
	}
	
	/**
	 * Simple/cheap debounce implementation
	 * @param   {function} fn - callback
	 * @param   {number} delay - delay in seconds
	 * @returns {function} debounced function
	 */
	function debounce(fn, delay) {
	  var t;
	  return function () {
	    clearTimeout(t);
	    t = setTimeout(fn, delay);
	  }
	}
	
	/**
	 * Set the window listeners to trigger the routes
	 * @param {boolean} autoExec - see route.start
	 */
	function start(autoExec) {
	  debouncedEmit = debounce(emit, 1);
	  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit);
	  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	  doc[ADD_EVENT_LISTENER](clickEvent, click);
	  if (autoExec) { emit(true); }
	}
	
	/**
	 * Router class
	 */
	function Router() {
	  this.$ = [];
	  observable(this); // make it observable
	  central.on('stop', this.s.bind(this));
	  central.on('emit', this.e.bind(this));
	}
	
	function normalize(path) {
	  return path.replace(/^\/|\/$/, '')
	}
	
	function isString(str) {
	  return typeof str == 'string'
	}
	
	/**
	 * Get the part after domain name
	 * @param {string} href - fullpath
	 * @returns {string} path from root
	 */
	function getPathFromRoot(href) {
	  return (href || loc.href).replace(RE_ORIGIN, '')
	}
	
	/**
	 * Get the part after base
	 * @param {string} href - fullpath
	 * @returns {string} path from base
	 */
	function getPathFromBase(href) {
	  return base[0] === '#'
	    ? (href || loc.href || '').split(base)[1] || ''
	    : (loc ? getPathFromRoot(href) : href || '').replace(base, '')
	}
	
	function emit(force) {
	  // the stack is needed for redirections
	  var isRoot = emitStackLevel === 0;
	  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) { return }
	
	  emitStackLevel++;
	  emitStack.push(function() {
	    var path = getPathFromBase();
	    if (force || path !== current) {
	      central[TRIGGER]('emit', path);
	      current = path;
	    }
	  });
	  if (isRoot) {
	    var first;
	    while (first = emitStack.shift()) { first(); } // stack increses within this call
	    emitStackLevel = 0;
	  }
	}
	
	function click(e) {
	  if (
	    e.which !== 1 // not left click
	    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	    || e.defaultPrevented // or default prevented
	  ) { return }
	
	  var el = e.target;
	  while (el && el.nodeName !== 'A') { el = el.parentNode; }
	
	  if (
	    !el || el.nodeName !== 'A' // not A tag
	    || el[HAS_ATTRIBUTE]('download') // has download attr
	    || !el[HAS_ATTRIBUTE]('href') // has no href attr
	    || el.target && el.target !== '_self' // another window or frame
	    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) === -1 // cross origin
	  ) { return }
	
	  if (el.href !== loc.href
	    && (
	      el.href.split('#')[0] === loc.href.split('#')[0] // internal jump
	      || base[0] !== '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || base[0] === '#' && el.href.split(base)[0] !== loc.href.split(base)[0] // outside of #base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	    )) { return }
	
	  e.preventDefault();
	}
	
	/**
	 * Go to the path
	 * @param {string} path - destination path
	 * @param {string} title - page title
	 * @param {boolean} shouldReplace - use replaceState or pushState
	 * @returns {boolean} - route not found flag
	 */
	function go(path, title, shouldReplace) {
	  // Server-side usage: directly execute handlers for the path
	  if (!hist) { return central[TRIGGER]('emit', getPathFromBase(path)) }
	
	  path = base + normalize(path);
	  title = title || doc.title;
	  // browsers ignores the second parameter `title`
	  shouldReplace
	    ? hist.replaceState(null, title, path)
	    : hist.pushState(null, title, path);
	  // so we need to set it manually
	  doc.title = title;
	  routeFound = false;
	  emit();
	  return routeFound
	}
	
	/**
	 * Go to path or set action
	 * a single string:                go there
	 * two strings:                    go there with setting a title
	 * two strings and boolean:        replace history with setting a title
	 * a single function:              set an action on the default route
	 * a string/RegExp and a function: set an action on the route
	 * @param {(string|function)} first - path / action / filter
	 * @param {(string|RegExp|function)} second - title / action
	 * @param {boolean} third - replace flag
	 */
	prot.m = function(first, second, third) {
	  if (isString(first) && (!second || isString(second))) { go(first, second, third || false); }
	  else if (second) { this.r(first, second); }
	  else { this.r('@', first); }
	};
	
	/**
	 * Stop routing
	 */
	prot.s = function() {
	  this.off('*');
	  this.$ = [];
	};
	
	/**
	 * Emit
	 * @param {string} path - path
	 */
	prot.e = function(path) {
	  this.$.concat('@').some(function(filter) {
	    var args = (filter === '@' ? parser : secondParser)(normalize(path), normalize(filter));
	    if (typeof args != 'undefined') {
	      this[TRIGGER].apply(null, [filter].concat(args));
	      return routeFound = true // exit from loop
	    }
	  }, this);
	};
	
	/**
	 * Register route
	 * @param {string} filter - filter for matching to url
	 * @param {function} action - action to register
	 */
	prot.r = function(filter, action) {
	  if (filter !== '@') {
	    filter = '/' + normalize(filter);
	    this.$.push(filter);
	  }
	  this.on(filter, action);
	};
	
	var mainRouter = new Router();
	var route = mainRouter.m.bind(mainRouter);
	
	/**
	 * Create a sub router
	 * @returns {function} the method of a new Router object
	 */
	route.create = function() {
	  var newSubRouter = new Router();
	  // assign sub-router's main method
	  var router = newSubRouter.m.bind(newSubRouter);
	  // stop only this sub-router
	  router.stop = newSubRouter.s.bind(newSubRouter);
	  return router
	};
	
	/**
	 * Set the base of url
	 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	 */
	route.base = function(arg) {
	  base = arg || '#';
	  current = getPathFromBase(); // recalculate current path
	};
	
	/** Exec routing right now **/
	route.exec = function() {
	  emit(true);
	};
	
	/**
	 * Replace the default router to yours
	 * @param {function} fn - your parser function
	 * @param {function} fn2 - your secondParser function
	 */
	route.parser = function(fn, fn2) {
	  if (!fn && !fn2) {
	    // reset parser for testing...
	    parser = DEFAULT_PARSER;
	    secondParser = DEFAULT_SECOND_PARSER;
	  }
	  if (fn) { parser = fn; }
	  if (fn2) { secondParser = fn2; }
	};
	
	/**
	 * Helper function to get url query as an object
	 * @returns {object} parsed query
	 */
	route.query = function() {
	  var q = {};
	  var href = loc.href || current;
	  href.replace(/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v; });
	  return q
	};
	
	/** Stop routing **/
	route.stop = function () {
	  if (started) {
	    if (win) {
	      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit);
	      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit);
	      doc[REMOVE_EVENT_LISTENER](clickEvent, click);
	    }
	    central[TRIGGER]('stop');
	    started = false;
	  }
	};
	
	/**
	 * Start routing
	 * @param {boolean} autoExec - automatically exec after starting if true
	 */
	route.start = function (autoExec) {
	  if (!started) {
	    if (win) {
	      if (document.readyState === 'complete') { start(autoExec); }
	      // the timeout is needed to solve
	      // a weird safari bug https://github.com/riot/route/issues/33
	      else { win[ADD_EVENT_LISTENER]('load', function() {
	        setTimeout(function() { start(autoExec); }, 1);
	      }); }
	    }
	    started = true;
	  }
	};
	
	/** Prepare the router **/
	route.base();
	route.parser();
	
	module.exports = route;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	;(function(window, undefined) {var observable = function(el) {
	
	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */
	
	  el = el || {}
	
	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice
	
	  /**
	   * Public Api
	   */
	
	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given `event` ands
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } event - event id
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(event, fn) {
	        if (typeof fn == 'function')
	          (callbacks[event] = callbacks[event] || []).push(fn)
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Removes the given `event` listeners
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(event, fn) {
	        if (event == '*' && !fn) callbacks = {}
	        else {
	          if (fn) {
	            var arr = callbacks[event]
	            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	              if (cb == fn) arr.splice(i--, 1)
	            }
	          } else delete callbacks[event]
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Listen to the given `event` and
	     * execute the `callback` at most once
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(event, fn) {
	        function on() {
	          el.off(event, on)
	          fn.apply(el, arguments)
	        }
	        return el.on(event, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },
	
	    /**
	     * Execute all callback functions that listen to
	     * the given `event`
	     * @param   { String } event - event id
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(event) {
	
	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns,
	          fn,
	          i
	
	        for (i = 0; i < arglen; i++) {
	          args[i] = arguments[i + 1] // skip first argument
	        }
	
	        fns = slice.call(callbacks[event] || [], 0)
	
	        for (i = 0; fn = fns[i]; ++i) {
	          fn.apply(el, args)
	        }
	
	        if (callbacks['*'] && event != '*')
	          el.trigger.apply(el, ['*', event].concat(args))
	
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  })
	
	  return el
	
	}
	  /* istanbul ignore next */
	  // support CommonJS, AMD & browser
	  if (true)
	    module.exports = observable
	  else if (typeof define === 'function' && define.amd)
	    define(function() { return observable })
	  else
	    window.observable = observable
	
	})(typeof window != 'undefined' ? window : undefined);

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('navbar', '<nav class="navbar"> <ul class="navbar-nav {open: isOpen}"> <li class="nav-item"><a class="nav-anchor" href="#/search"> <div class="icon ion-android-search"></div> <div class="label">検索</div></a></li> <li class="nav-item"><a class="nav-anchor" href="#/schedule"> <div class="icon ion-ios-calendar-outline"></div> <div class="label">時間割</div></a></li> <li class="nav-item"><a class="nav-anchor" href="#/info"> <div class="icon ion-ios-information-outline"></div> <div class="label">おしらせ</div></a></li> <li class="nav-item"><span class="nav-anchor"> <div class="icon ion-ios-grid-view-outline"></div> <div class="label">準備中</div></span></li> <li class="nav-item"><a class="nav-anchor" href="//www.ube-k.ac.jp/hakucho-domitory/" target="_blank"> <div class="icon ion-ios-home-outline"></div> <div class="label">白鳥寮</div></a></li> <li class="nav-item"><a class="nav-anchor" href="//twitter.com/uswan2_" target="_blank"> <div class="icon ion-social-twitter-outline"></div> <div class="label">Twitter</div></a></li> </ul> <div class="nav-large"><a class="nav-large-wrapper" href="#/menu"> <div class="icon ion-coffee"></div> <div class="label">献立表</div></a></div> <div class="nav-more"><a class="nav-anchor {open: isOpen}" href="#" onclick="{toggleMoreMenu}"> <div class="navicon ion-navicon"></div> <div class="closer ion-android-close"></div></a></div> </nav> <side-menu></side-menu>', 'navbar .navbar,[data-is="navbar"] .navbar{ position: fixed; bottom: 0; left: 0; width: 100%; height: 0; padding: 0 60px 0 110px; box-sizing: border-box; z-index: 100; } navbar .navbar .navbar-nav,[data-is="navbar"] .navbar .navbar-nav{ height: 110px; margin: 0 -60px 0 -55px; padding: 0 60px 0 55px; background: #fff; transform: translateY(-55px); transition: transform 0.3s ease; } navbar .navbar .navbar-nav.open,[data-is="navbar"] .navbar .navbar-nav.open{ transform: translateY(-110px); } navbar .navbar .navbar-nav .nav-item,[data-is="navbar"] .navbar .navbar-nav .nav-item{ float: left; width: 33.333%; height: 55px; text-align: center; } navbar .navbar .navbar-nav .nav-item .nav-anchor,[data-is="navbar"] .navbar .navbar-nav .nav-item .nav-anchor{ display: block; padding: 5px 0; text-decoration: none; color: #222; } navbar .navbar .navbar-nav .nav-item .nav-anchor .icon,[data-is="navbar"] .navbar .navbar-nav .nav-item .nav-anchor .icon{ line-height: 30px; font-size: 25px; } navbar .navbar .navbar-nav .nav-item .nav-anchor .label,[data-is="navbar"] .navbar .navbar-nav .nav-item .nav-anchor .label{ line-height: 15px; font-size: 10px; } navbar .navbar .nav-large,[data-is="navbar"] .navbar .nav-large{ position: absolute; bottom: 0; left: 0; width: 110px; height: 110px; background: #fff; border-radius: 100%; border-bottom-left-radius: 0; } navbar .navbar .nav-large .nav-large-wrapper,[data-is="navbar"] .navbar .nav-large .nav-large-wrapper{ position: relative; display: block; width: 96px; height: 96px; margin: 5px; border-radius: 100%; border: 2px solid #222; color: #222; } navbar .navbar .nav-large .nav-large-wrapper .icon,[data-is="navbar"] .navbar .nav-large .nav-large-wrapper .icon{ font-size: 40px; text-align: center; line-height: 80px; } navbar .navbar .nav-large .nav-large-wrapper .label,[data-is="navbar"] .navbar .nav-large .nav-large-wrapper .label{ position: absolute; bottom: 5px; left: 0; width: 100%; height: 35px; text-align: center; font-size: 12px; line-height: 35px; } navbar .navbar .nav-more,[data-is="navbar"] .navbar .nav-more{ position: absolute; bottom: 0; right: 0; overflow: hidden; width: 60px; height: 55px; font-size: 36px; } navbar .navbar .nav-more .nav-anchor,[data-is="navbar"] .navbar .nav-more .nav-anchor{ position: relative; display: block; color: #222; } navbar .navbar .nav-more .nav-anchor > div,[data-is="navbar"] .navbar .nav-more .nav-anchor > div{ position: absolute; width: 60px; height: 55px; text-align: center; line-height: 55px; transition: all 0.3s ease; } navbar .navbar .nav-more .nav-anchor .navicon,[data-is="navbar"] .navbar .nav-more .nav-anchor .navicon{ opacity: 1; transform: translateY(0); } navbar .navbar .nav-more .nav-anchor .closer,[data-is="navbar"] .navbar .nav-more .nav-anchor .closer{ opacity: 0; transform: translateY(12px); } navbar .navbar .nav-more .nav-anchor.open .navicon,[data-is="navbar"] .navbar .nav-more .nav-anchor.open .navicon{ opacity: 0; transform: translateY(-12px); } navbar .navbar .nav-more .nav-anchor.open .closer,[data-is="navbar"] .navbar .nav-more .nav-anchor.open .closer{ opacity: 1; transform: translateY(0); }', '', function (opts) {
	    var _this = this;
	
	    var u = __webpack_require__(10);
	    var obs = u.observable();
	
	    this.isOpen = false;
	    this.toggleMoreMenu = function (e) {
	        e.preventDefault();
	        _this.isOpen = !_this.isOpen;
	        obs.trigger('side-menu:toggle');
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _riotObservable = __webpack_require__(5);
	
	var _riotObservable2 = _interopRequireDefault(_riotObservable);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var obs = (0, _riotObservable2.default)();
	
	module.exports = {
	    observable: function observable() {
	        return obs;
	    }
	};

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	var _riotRoute = __webpack_require__(4);
	
	var _riotRoute2 = _interopRequireDefault(_riotRoute);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	(0, _riotRoute2.default)('/', function () {
	    location.hash = '#/menu';
	});
	
	(0, _riotRoute2.default)('/menu', function () {
	    __webpack_require__(14);
	    __webpack_require__(16);
	    __webpack_require__(17);
	    riot.mount('router', 'menu');
	});
	
	module.exports = {
	    start: function start() {
	        _riotRoute2.default.start(true);
	    }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('menu', '<daily-menu></daily-menu> <h2><span class="ja">２月</span><span class="en">February</span></h2> <menu-item></menu-item> <menu-item></menu-item> <menu-item></menu-item> <menu-item></menu-item> <menu-item></menu-item> <menu-item></menu-item>', 'menu h2,[data-is="menu"] h2{ margin: 12px 10px; } menu h2 .ja,[data-is="menu"] h2 .ja{ font-size: 24px; } menu h2 .en,[data-is="menu"] h2 .en{ font-size: 14px; }', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('side-menu', '<div class="side-menu {open: isOpen}"> <header> <div class="brand">デジタル版 白鳥寮献立表</div> </header> <main> <div class="preferences"> <h3>フィードバック</h3> <p>ご指摘・ご意見などお気軽にお送りください！</p> <form class="feedback-form" onsubmit="return false"> <textarea placeholder="内容は公開されます。個人情報の記載はご遠慮下さい。"></textarea> </form> <h3>設定</h3> <dl> <dt>最初に表示するページ</dt> <dd> <div class="select-full"> <div class="label">{firstValue || \'今月の献立\'}</div> <select class="input" onchange="{updateFirstView}"> <option value="#/menu">今日からの献立</option> <option value="">時間割</option> <option value="">おしらせ</option> </select> </div> </dd> <dt>デフォルトのクラス <div class="select"> <div class="label"></div> </div> </dt> </dl> </div> </main> </div>', 'side-menu .side-menu,[data-is="side-menu"] .side-menu{ position: fixed; top: 0; right: -240px; bottom: 55px; overflow-y: auto; width: 240px; padding-bottom: 55px; background: #fff; box-sizing: border-box; transition: right 0.3s ease; } side-menu .side-menu.open,[data-is="side-menu"] .side-menu.open{ right: 0; } side-menu .side-menu header,[data-is="side-menu"] .side-menu header{ position: relative; width: 100%; height: 120px; background: #ad1514; } side-menu .side-menu header .brand,[data-is="side-menu"] .side-menu header .brand{ height: 120px; color: #fff; text-align: center; line-height: 120px; } side-menu .side-menu header .version,[data-is="side-menu"] .side-menu header .version{ position: absolute; top: 0; right: 0; margin: 5px 8px; color: rgba(255,255,255,0.4); font-size: 10px; } side-menu .side-menu main,[data-is="side-menu"] .side-menu main{ background: #fff; } side-menu .side-menu main .menu-nav,[data-is="side-menu"] .side-menu main .menu-nav{ padding: 25px 0; } side-menu .side-menu main .menu-nav .nav-item .nav-anchor,[data-is="side-menu"] .side-menu main .menu-nav .nav-item .nav-anchor{ display: block; height: 50px; padding: 0 20px; font-size: 15px; line-height: 50px; color: #444a5a; text-decoration: none; } side-menu .side-menu main .preferences,[data-is="side-menu"] .side-menu main .preferences{ margin: 0 15px 0; } side-menu .side-menu main .preferences h3,[data-is="side-menu"] .side-menu main .preferences h3{ color: #444; font-size: 16px; font-weight: bold; } side-menu .side-menu main .preferences dl dt,[data-is="side-menu"] .side-menu main .preferences dl dt{ font-size: 14px; } side-menu .side-menu main .preferences dl dd .select-full,[data-is="side-menu"] .side-menu main .preferences dl dd .select-full{ position: relative; width: 100%; height: 35px; } side-menu .side-menu main .preferences dl dd .select-full .label,[data-is="side-menu"] .side-menu main .preferences dl dd .select-full .label{ position: absolute; width: 100%; height: 35px; background: #fff; box-sizing: border-box; border: 1px solid #ccc; border-radius: 5px; line-height: 35px; font-size: 12px; text-align: center; z-index: 1; pointer-events: none; } side-menu .side-menu main .preferences dl dd .select-full .input,[data-is="side-menu"] .side-menu main .preferences dl dd .select-full .input{ position: absolute; display: block; width: 100%; height: 35px; }', '', function (opts) {
	    var _this = this;
	
	    var u = __webpack_require__(10);
	
	    var obs = u.observable();
	
	    this.updateFirstView = function (e) {
	        e.preventDefault();
	        _this.firstValue = e.target.selectedOptions[0].text;
	    };
	
	    this.isOpen = false;
	
	    obs.on('side-menu:toggle', function () {
	        _this.isOpen = !_this.isOpen;
	        _this.update();
	    });
	
	    obs.on('side-menu:open', function () {
	        _this.isOpen = true;
	        _this.update();
	    });
	
	    obs.on('side-menu:close', function () {
	        _this.isOpen = false;
	        _this.update();
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('daily-menu', '<div class="daily-menu"> <div class="header">今日の献立</div> <div class="main"> <div class="menu-item {open: isOpen == \'breakfast\', dailyMenuInit: init == \'breakfast\'}" id="dailyMenu-breakfast" onclick="{open(\'breakfast\')}"> <div class="label">朝</div> <div class="menu-body"> <div class="menu-main"> <div class="main-breakfast"><span class="main-item" if="{today.breakfast.jap}">{today.breakfast.jap}</span><span class="main-item" if="{today.breakfast.wes}">{today.breakfast.wes}</span></div> </div> <div class="menu-side"> <ul> <li each="{item in today.breakfast.side}">{item}</li> </ul> </div> </div> </div> <div class="menu-item {open: isOpen == \'lunch\', dailyMenuInit: init == \'lunch\'}" id="dailyMenu-lunch" onclick="{open(\'lunch\')}"> <div class="label">昼</div> <div class="menu-body"> <div class="menu-main">{today.lunch.main}</div> <div class="menu-side"> <ul> <li each="{item in today.lunch.side}">{item}</li> </ul> </div> </div> </div> <div class="menu-item {open: isOpen == \'dinner\', dailyMenuInit: init == \'dinner\'}" id="dailyMenu-dinner" onclick="{open(\'dinner\')}"> <div class="label">夜</div> <div class="menu-body"> <div class="menu-main"> <div class="main-dinner"><span class="main-a">{today.dinner.a}</span><span class="main-b">{today.dinner.b}</span></div> </div> <div class="menu-side"> <ul> <li each="{item in today.dinner.side}">{item}</li> </ul> </div> </div> </div> </div> </div>', 'daily-menu .daily-menu,[data-is="daily-menu"] .daily-menu{ margin: 10px 5%; background: rgba(255,255,255,0.35); box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12); } daily-menu .daily-menu .header,[data-is="daily-menu"] .daily-menu .header{ width: 100%; height: 40px; color: rgba(51,51,51,0.8); font-size: 14px; line-height: 40px; text-align: center; } daily-menu .daily-menu .main .menu-item,[data-is="daily-menu"] .daily-menu .main .menu-item{ display: flex; align-items: center; padding: 8px 55px 8px 20px; transition: background 0.6s ease; } daily-menu .daily-menu .main .menu-item .label,[data-is="daily-menu"] .daily-menu .main .menu-item .label{ width: 20px; height: 20px; margin-right: 15px; border: 1px solid #333; border-radius: 100%; font-size: 11px; text-align: center; line-height: 20px; } daily-menu .daily-menu .main .menu-item .menu-body,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body{ flex: 1; } daily-menu .daily-menu .main .menu-item .menu-body .menu-main,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main{ margin: 8px 0; text-align: center; font-size: 18px; line-height: 28px; } daily-menu .daily-menu .main .menu-item .menu-body .menu-main .main-breakfast span:nth-child(2)::before,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main .main-breakfast span:nth-child(2)::before{ content: \'/\'; } daily-menu .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span{ display: block; } daily-menu .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span:not(:first-child),[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span:not(:first-child){ margin-top: 8px; } daily-menu .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-a::before,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-a::before,daily-menu .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-b::before,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-b::before{ display: inline-block; width: 18px; height: 18px; margin-right: 0.4em; line-height: 16px; font-size: 16px; background: #333; color: #eee; transform: translateY(-1px); } daily-menu .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-a::before,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-a::before{ content: \'A\'; } daily-menu .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-b::before,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-main .main-dinner span.main-b::before{ content: \'B\'; } daily-menu .daily-menu .main .menu-item .menu-body .menu-side,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-side{ position: relative; overflow: hidden; height: 0; transition: height 0.4s 0.3s ease; } daily-menu .daily-menu .main .menu-item .menu-body .menu-side::before,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-side::before{ content: \'\'; position: absolute; top: 10px; left: 50%; width: 30px; margin-left: -15px; border-bottom: 1px dashed #444; } daily-menu .daily-menu .main .menu-item .menu-body .menu-side::after,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-side::after{ content: \'\'; position: absolute; top: 10px; left: 50%; width: 3px; height: 3px; margin: -2.5px; border: 1px solid #444; background: #fff; transform: rotate(45deg); } daily-menu .daily-menu .main .menu-item .menu-body .menu-side li,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-side li{ margin-bottom: 10px; font-size: 14px; line-height: 20px; text-align: center; } daily-menu .daily-menu .main .menu-item .menu-body .menu-side li:first-child,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-side li:first-child{ margin-top: 30px; } daily-menu .daily-menu .main .menu-item.open,[data-is="daily-menu"] .daily-menu .main .menu-item.open{ background: rgba(255,255,255,0.8); }', '', function (opts) {
	    var _this = this;
	
	    this.today = {
	        breakfast: {
	            wes: 'ロールパン',
	            jap: null,
	            side: ['ソーセージとキャベツのフレンチサラダ', 'キャベツサラダ', 'スープ', '牛乳']
	        },
	        lunch: {
	            main: '叉焼炒飯',
	            side: ['かぼちゃのコロッケ', '味噌汁']
	        },
	        dinner: {
	            a: '和風ごまハンバーグ',
	            b: 'ハンバーグデミグラスソースと海老フライ',
	            side: ['小松菜とえのきの梅和え', 'ライス', '味噌汁']
	        }
	    };
	
	    this.init = 'breakfast';
	    this.isOpen = this.init;
	
	    var padding = 30;
	
	    this.on('mount', function () {
	        // 高さを付与
	        var $parent = document.getElementsByClassName('dailyMenuInit')[0];
	        var $elem = $parent.getElementsByClassName('menu-side');
	        var height = $elem[0].childNodes[1].clientHeight;
	        $elem[0].style.height = height + padding + 'px';
	        console.log('happen');
	    });
	
	    this.open = function (time) {
	        return function (e) {
	            e.preventDefault();
	            if (_this.isOpen !== time) {
	                // サイドメニューHide
	                var $old_p = document.getElementById('dailyMenu-' + _this.isOpen);
	                var $old_e = $old_p.getElementsByClassName('menu-side');
	                $old_e[0].style.height = '0px';
	                // 高さを付与
	                var $parent = document.getElementById('dailyMenu-' + time);
	                var $elem = $parent.getElementsByClassName('menu-side');
	                var height = $elem[0].childNodes[1].clientHeight;
	                $elem[0].style.height = height + padding + 'px';
	                _this.isOpen = time;
	            }
	        };
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';
	
	riot.tag2('menu-item', '<div class="menu-item"> <div class="date"> <div class="wrapper"> <div class="day">14</div> <div class="week">Sun</div> </div> </div> <div class="menu"></div> </div>', 'menu-item .menu-item,[data-is="menu-item"] .menu-item{ display: flex; height: 200px; margin: 0 10px 30px; box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12); background: rgba(255,255,255,0.1); } menu-item .menu-item .date,[data-is="menu-item"] .menu-item .date{ position: relative; width: 40px; margin: 8px 0; border-right: 1px solid rgba(170,170,170,0.3); } menu-item .menu-item .date .wrapper,[data-is="menu-item"] .menu-item .date .wrapper{ position: absolute; top: 50%; left: 50%; width: 40px; height: 40px; margin: -20px; color: rgba(0,0,0,0.75); text-align: center; } menu-item .menu-item .date .wrapper .day,[data-is="menu-item"] .menu-item .date .wrapper .day{ line-height: 28px; font-size: 15px; } menu-item .menu-item .date .wrapper .week,[data-is="menu-item"] .menu-item .date .wrapper .week{ line-height: 12px; font-size: 10px; }', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjQ3NmIxOWMxODJmNmU0OTRkZTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcHVibGljLmpzIiwid2VicGFjazovLy8uL34vcmlvdC9yaW90LmpzIiwid2VicGFjazovLy8uL34vcmlvdC1yb3V0ZS9kaXN0L2Nqcy5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3Jpb3Qtb2JzZXJ2YWJsZS9kaXN0L29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvY29tbW9uL25hdmJhci50YWciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcHVibGljL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9jb21tb24vc2lkZS1tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9kYWlseS1tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9tZW51LWl0ZW0udGFnIl0sIm5hbWVzIjpbInJpb3QiLCJtb3VudCIsInN0YXJ0IiwidGFnMiIsIm9wdHMiLCJfdGhpcyIsInUiLCJyZXF1aXJlIiwib2JzIiwib2JzZXJ2YWJsZSIsImlzT3BlbiIsInRvZ2dsZU1vcmVNZW51IiwiZSIsInByZXZlbnREZWZhdWx0IiwidHJpZ2dlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJsb2NhdGlvbiIsImhhc2giLCJ1cGRhdGVGaXJzdFZpZXciLCJmaXJzdFZhbHVlIiwidGFyZ2V0Iiwic2VsZWN0ZWRPcHRpb25zIiwidGV4dCIsIm9uIiwidXBkYXRlIiwidG9kYXkiLCJicmVha2Zhc3QiLCJ3ZXMiLCJqYXAiLCJzaWRlIiwibHVuY2giLCJtYWluIiwiZGlubmVyIiwiYSIsImIiLCJpbml0IiwicGFkZGluZyIsIiRwYXJlbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCIkZWxlbSIsImhlaWdodCIsImNoaWxkTm9kZXMiLCJjbGllbnRIZWlnaHQiLCJzdHlsZSIsImNvbnNvbGUiLCJsb2ciLCJvcGVuIiwidGltZSIsIiRvbGRfcCIsImdldEVsZW1lbnRCeUlkIiwiJG9sZF9lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUdBOzs7Ozs7QUFGQUEsTUFBS0MsS0FBTCxDQUFXLFFBQVg7O0FBR0Esa0JBQU9DLEtBQVAsRzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDO0FBQzNDLEVBQUMsNEJBQTRCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUF5RCxHQUFHLEdBQUc7QUFDL0Qsa0NBQWlDO0FBQ2pDO0FBQ0EsNENBQTJDOztBQUUzQztBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLElBQUk7QUFDZixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsSUFBSTtBQUNqQixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFVBQVU7QUFDdkIsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFD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UCxFQUFVUCxLQUFWLENBQWdCSCxNQUFoQjtBQUNBO0FBQ0EscUJBQU1KLFVBQVVDLFNBQVNZLGNBQVQsZ0JBQXFDRixJQUFyQyxDQUFoQjtBQUNBLHFCQUFNUixRQUFRSCxRQUFRRSxzQkFBUixDQUErQixXQUEvQixDQUFkO0FBQ0EscUJBQU1FLFNBQVNELE1BQU0sQ0FBTixFQUFTRSxVQUFULENBQW9CLENBQXBCLEVBQXVCQyxZQUF0QztBQUNBSCx1QkFBTSxDQUFOLEVBQVNJLEtBQVQsQ0FBZUgsTUFBZixHQUEyQkEsU0FBU0wsT0FBcEM7QUFDQWhDLHVCQUFNSyxNQUFOLEdBQWV1QyxJQUFmO0FBQ0g7QUFDSixVQWREO0FBZUgsTUFoQkQ7QUFpQkMsRUFuREQsRTs7Ozs7Ozs7O0FDQUFqRCxNQUFLRyxJQUFMLENBQVUsV0FBVixFQUF1QixzS0FBdkIsRUFBK0wsKzNCQUEvTCxFQUFna0MsRUFBaGtDLEVBQW9rQyxVQUFTQyxJQUFULEVBQWUsQ0FDbGxDLENBREQsRSIsImZpbGUiOiJwdWJsaWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBiNDc2YjE5YzE4MmY2ZTQ5NGRlMiIsImltcG9ydCAnLi90YWdzL3B1YmxpYy9jb21tb24vbmF2YmFyJztcclxuaW1wb3J0ICcuL3RhZ3MvcHVibGljL2NvbW1vbi9zaWRlLW1lbnUnO1xyXG5yaW90Lm1vdW50KCduYXZiYXInKTtcclxuXHJcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi9wdWJsaWMvcm91dGVyJztcclxucm91dGVyLnN0YXJ0KCk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvcHVibGljLmpzIiwiLyogUmlvdCB2My4wLjcsIEBsaWNlbnNlIE1JVCAqL1xuKGZ1bmN0aW9uIChnbG9iYWwsIGZhY3RvcnkpIHtcbiAgdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnID8gZmFjdG9yeShleHBvcnRzKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShbJ2V4cG9ydHMnXSwgZmFjdG9yeSkgOlxuICAoZmFjdG9yeSgoZ2xvYmFsLnJpb3QgPSBnbG9iYWwucmlvdCB8fCB7fSkpKTtcbn0odGhpcywgKGZ1bmN0aW9uIChleHBvcnRzKSB7ICd1c2Ugc3RyaWN0JztcblxudmFyIF9fVEFHU19DQUNIRSA9IFtdO1xudmFyIF9fVEFHX0lNUEwgPSB7fTtcbnZhciBHTE9CQUxfTUlYSU4gPSAnX19nbG9iYWxfbWl4aW4nO1xudmFyIEFUVFJTX1BSRUZJWCA9ICdyaW90LSc7XG52YXIgUkVGX0RJUkVDVElWRVMgPSBbJ2RhdGEtcmVmJywgJ3JlZiddO1xudmFyIElTX0RJUkVDVElWRSA9ICdkYXRhLWlzJztcbnZhciBDT05ESVRJT05BTF9ESVJFQ1RJVkUgPSAnaWYnO1xudmFyIExPT1BfRElSRUNUSVZFID0gJ2VhY2gnO1xudmFyIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUgPSAnbm8tcmVvcmRlcic7XG52YXIgU0hPV19ESVJFQ1RJVkUgPSAnc2hvdyc7XG52YXIgSElERV9ESVJFQ1RJVkUgPSAnaGlkZSc7XG52YXIgVF9TVFJJTkcgPSAnc3RyaW5nJztcbnZhciBUX09CSkVDVCA9ICdvYmplY3QnO1xudmFyIFRfVU5ERUYgID0gJ3VuZGVmaW5lZCc7XG52YXIgVF9GVU5DVElPTiA9ICdmdW5jdGlvbic7XG52YXIgWExJTktfTlMgPSAnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayc7XG52YXIgWExJTktfUkVHRVggPSAvXnhsaW5rOihcXHcrKS87XG52YXIgV0lOID0gdHlwZW9mIHdpbmRvdyA9PT0gVF9VTkRFRiA/IHVuZGVmaW5lZCA6IHdpbmRvdztcbnZhciBSRV9TUEVDSUFMX1RBR1MgPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/fG9wdCg/Omlvbnxncm91cCkpJC87XG52YXIgUkVfU1BFQ0lBTF9UQUdTX05PX09QVElPTiA9IC9eKD86dCg/OmJvZHl8aGVhZHxmb290fFtyaGRdKXxjYXB0aW9ufGNvbCg/Omdyb3VwKT8pJC87XG52YXIgUkVfUkVTRVJWRURfTkFNRVMgPSAvXig/Ol8oPzppdGVtfGlkfHBhcmVudCl8dXBkYXRlfHJvb3R8KD86dW4pP21vdW50fG1peGlufGlzKD86TW91bnRlZHxMb29wKXx0YWdzfHJlZnN8cGFyZW50fG9wdHN8dHJpZ2dlcnxvKD86bnxmZnxuZSkpJC87XG52YXIgUkVfU1ZHX1RBR1MgPSAvXihhbHRHbHlwaHxhbmltYXRlKD86Q29sb3IpP3xjaXJjbGV8Y2xpcFBhdGh8ZGVmc3xlbGxpcHNlfGZlKD86QmxlbmR8Q29sb3JNYXRyaXh8Q29tcG9uZW50VHJhbnNmZXJ8Q29tcG9zaXRlfENvbnZvbHZlTWF0cml4fERpZmZ1c2VMaWdodGluZ3xEaXNwbGFjZW1lbnRNYXB8Rmxvb2R8R2F1c3NpYW5CbHVyfEltYWdlfE1lcmdlfE1vcnBob2xvZ3l8T2Zmc2V0fFNwZWN1bGFyTGlnaHRpbmd8VGlsZXxUdXJidWxlbmNlKXxmaWx0ZXJ8Zm9udHxmb3JlaWduT2JqZWN0fGcoPzpseXBoKT8oPzpSZWYpP3xpbWFnZXxsaW5lKD86YXJHcmFkaWVudCk/fG1hKD86cmtlcnxzayl8bWlzc2luZy1nbHlwaHxwYXRofHBhdHRlcm58cG9seSg/OmdvbnxsaW5lKXxyYWRpYWxHcmFkaWVudHxyZWN0fHN0b3B8c3ZnfHN3aXRjaHxzeW1ib2x8dGV4dCg/OlBhdGgpP3x0cmVmfHRzcGFufHVzZSkkLztcbnZhciBSRV9IVE1MX0FUVFJTID0gLyhbLVxcd10rKSA/PSA/KD86XCIoW15cIl0qKXwnKFteJ10qKXwoe1tefV0qfSkpL2c7XG52YXIgQ0FTRV9TRU5TSVRJVkVfQVRUUklCVVRFUyA9IHsgJ3ZpZXdib3gnOiAndmlld0JveCcgfTtcbnZhciBSRV9CT09MX0FUVFJTID0gL14oPzpkaXNhYmxlZHxjaGVja2VkfHJlYWRvbmx5fHJlcXVpcmVkfGFsbG93ZnVsbHNjcmVlbnxhdXRvKD86Zm9jdXN8cGxheSl8Y29tcGFjdHxjb250cm9sc3xkZWZhdWx0fGZvcm1ub3ZhbGlkYXRlfGhpZGRlbnxpc21hcHxpdGVtc2NvcGV8bG9vcHxtdWx0aXBsZXxtdXRlZHxubyg/OnJlc2l6ZXxzaGFkZXx2YWxpZGF0ZXx3cmFwKT98b3BlbnxyZXZlcnNlZHxzZWFtbGVzc3xzZWxlY3RlZHxzb3J0YWJsZXx0cnVlc3BlZWR8dHlwZW11c3RtYXRjaCkkLztcbnZhciBJRV9WRVJTSU9OID0gKFdJTiAmJiBXSU4uZG9jdW1lbnQgfHwge30pLmRvY3VtZW50TW9kZSB8IDA7XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhIERPTSBub2RlIG11c3QgYmUgY29uc2lkZXJlZCBhIHBhcnQgb2YgYW4gc3ZnIGRvY3VtZW50XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1NWR1RhZyhuYW1lKSB7XG4gIHJldHVybiBSRV9TVkdfVEFHUy50ZXN0KG5hbWUpXG59XG5cbi8qKlxuICogQ2hlY2sgQ2hlY2sgaWYgdGhlIHBhc3NlZCBhcmd1bWVudCBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Jvb2xBdHRyKHZhbHVlKSB7XG4gIHJldHVybiBSRV9CT09MX0FUVFJTLnRlc3QodmFsdWUpXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX0ZVTkNUSU9OXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGFuIG9iamVjdCwgZXhjbHVkZSBudWxsXG4gKiBOT1RFOiB1c2UgaXNPYmplY3QoeCkgJiYgIWlzQXJyYXkoeCkgdG8gZXhjbHVkZXMgYXJyYXlzLlxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSBUX09CSkVDVCAvLyB0eXBlb2YgbnVsbCBpcyAnb2JqZWN0J1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyB1bmRlZmluZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNVbmRlZmluZWQodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gVF9VTkRFRlxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIHN0cmluZ1xuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX1NUUklOR1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBlbXB0eS4gRGlmZmVyZW50IGZyb20gZmFsc3ksIGJlY2F1c2Ugd2UgZG9udCBjb25zaWRlciAwIG9yIGZhbHNlIHRvIGJlIGJsYW5rXG4gKiBAcGFyYW0geyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0JsYW5rKHZhbHVlKSB7XG4gIHJldHVybiBpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09ICcnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEga2luZCBvZiBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbHVlKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBvYmplY3QncyBwcm9wZXJ0eSBjb3VsZCBiZSBvdmVycmlkZGVuXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBvYmogLSBzb3VyY2Ugb2JqZWN0XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICBrZXkgLSBvYmplY3QgcHJvcGVydHlcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNXcml0YWJsZShvYmosIGtleSkge1xuICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqLCBrZXkpO1xuICByZXR1cm4gaXNVbmRlZmluZWQob2JqW2tleV0pIHx8IGRlc2NyaXB0b3IgJiYgZGVzY3JpcHRvci53cml0YWJsZVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIHJlc2VydmVkIG5hbWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1Jlc2VydmVkTmFtZSh2YWx1ZSkge1xuICByZXR1cm4gUkVfUkVTRVJWRURfTkFNRVMudGVzdCh2YWx1ZSlcbn1cblxudmFyIGNoZWNrID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGlzU1ZHVGFnOiBpc1NWR1RhZyxcblx0aXNCb29sQXR0cjogaXNCb29sQXR0cixcblx0aXNGdW5jdGlvbjogaXNGdW5jdGlvbixcblx0aXNPYmplY3Q6IGlzT2JqZWN0LFxuXHRpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG5cdGlzU3RyaW5nOiBpc1N0cmluZyxcblx0aXNCbGFuazogaXNCbGFuayxcblx0aXNBcnJheTogaXNBcnJheSxcblx0aXNXcml0YWJsZTogaXNXcml0YWJsZSxcblx0aXNSZXNlcnZlZE5hbWU6IGlzUmVzZXJ2ZWROYW1lXG59KTtcblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgbXVsdGlwbGUgbm9kZXMgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIERPTSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0cyBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZXMgZm91bmRcbiAqL1xuZnVuY3Rpb24gJCQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcbn1cblxuLyoqXG4gKiBTaG9ydGVyIGFuZCBmYXN0IHdheSB0byBzZWxlY3QgYSBzaW5nbGUgbm9kZSBpbiB0aGUgRE9NXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNlbGVjdG9yIC0gdW5pcXVlIGRvbSBzZWxlY3RvclxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBET00gbm9kZSB3aGVyZSB0aGUgdGFyZ2V0IG9mIG91ciBzZWFyY2ggd2lsbCBpcyBsb2NhdGVkXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvbSBub2RlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uICQoc2VsZWN0b3IsIGN0eCkge1xuICByZXR1cm4gKGN0eCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkb2N1bWVudCBmcmFnbWVudFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb2N1bWVudCBmcmFnbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVGcmFnKCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZG9jdW1lbnQgdGV4dCBub2RlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGNyZWF0ZSBhIHRleHQgbm9kZSB0byB1c2UgYXMgcGxhY2Vob2xkZXJcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJylcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBnZW5lcmljIERPTSBub2RlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBET00gbm9kZSB3ZSB3YW50IHRvIGNyZWF0ZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNTdmcgLSBzaG91bGQgd2UgdXNlIGEgU1ZHIGFzIHBhcmVudCBub2RlP1xuICogQHJldHVybnMgeyBPYmplY3QgfSBET00gbm9kZSBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gbWtFbChuYW1lLCBpc1N2Zykge1xuICByZXR1cm4gaXNTdmcgP1xuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJykgOlxuICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSlcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG91dGVyIGh0bWwgb2YgYW55IERPTSBub2RlIFNWR3MgaW5jbHVkZWRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZWwgLSBET00gbm9kZSB0byBwYXJzZVxuICogQHJldHVybnMgeyBTdHJpbmcgfSBlbC5vdXRlckhUTUxcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0ZXJIVE1MKGVsKSB7XG4gIGlmIChlbC5vdXRlckhUTUwpXG4gICAgeyByZXR1cm4gZWwub3V0ZXJIVE1MIH1cbiAgLy8gc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBvdXRlckhUTUwgb24gdGhlIFNWR3MgdGFnc1xuICBlbHNlIHtcbiAgICB2YXIgY29udGFpbmVyID0gbWtFbCgnZGl2Jyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGVsLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgcmV0dXJuIGNvbnRhaW5lci5pbm5lckhUTUxcbiAgfVxufVxuXG4vKipcbiAqIFNldCB0aGUgaW5uZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtIHsgT2JqZWN0IH0gY29udGFpbmVyIC0gRE9NIG5vZGUgd2hlcmUgd2UnbGwgaW5qZWN0IG5ldyBodG1sXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBodG1sIC0gaHRtbCB0byBpbmplY3RcbiAqL1xuZnVuY3Rpb24gc2V0SW5uZXJIVE1MKGNvbnRhaW5lciwgaHRtbCkge1xuICBpZiAoIWlzVW5kZWZpbmVkKGNvbnRhaW5lci5pbm5lckhUTUwpKVxuICAgIHsgY29udGFpbmVyLmlubmVySFRNTCA9IGh0bWw7IH1cbiAgICAvLyBzb21lIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0IGlubmVySFRNTCBvbiB0aGUgU1ZHcyB0YWdzXG4gIGVsc2Uge1xuICAgIHZhciBkb2MgPSBuZXcgRE9NUGFyc2VyKCkucGFyc2VGcm9tU3RyaW5nKGh0bWwsICdhcHBsaWNhdGlvbi94bWwnKTtcbiAgICB2YXIgbm9kZSA9IGNvbnRhaW5lci5vd25lckRvY3VtZW50LmltcG9ydE5vZGUoZG9jLmRvY3VtZW50RWxlbWVudCwgdHJ1ZSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKG5vZGUpO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGFueSBET00gYXR0cmlidXRlIGZyb20gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHJlbW92ZVxuICovXG5mdW5jdGlvbiByZW1BdHRyKGRvbSwgbmFtZSkge1xuICBkb20ucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdmFsdWUgb2YgYW55IERPTSBhdHRyaWJ1dGUgb24gYSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3ZSB3YW50IHRvIGdldFxuICogQHJldHVybnMgeyBTdHJpbmcgfCB1bmRlZmluZWQgfSBuYW1lIG9mIHRoZSBub2RlIGF0dHJpYnV0ZSB3aGV0aGVyIGl0IGV4aXN0c1xuICovXG5mdW5jdGlvbiBnZXRBdHRyKGRvbSwgbmFtZSkge1xuICByZXR1cm4gZG9tLmdldEF0dHJpYnV0ZShuYW1lKVxufVxuXG4vKipcbiAqIFNldCBhbnkgRE9NIGF0dHJpYnV0ZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHNldFxuICogQHBhcmFtIHsgU3RyaW5nIH0gdmFsIC0gdmFsdWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKi9cbmZ1bmN0aW9uIHNldEF0dHIoZG9tLCBuYW1lLCB2YWwpIHtcbiAgdmFyIHhsaW5rID0gWExJTktfUkVHRVguZXhlYyhuYW1lKTtcbiAgaWYgKHhsaW5rICYmIHhsaW5rWzFdKVxuICAgIHsgZG9tLnNldEF0dHJpYnV0ZU5TKFhMSU5LX05TLCB4bGlua1sxXSwgdmFsKTsgfVxuICBlbHNlXG4gICAgeyBkb20uc2V0QXR0cmlidXRlKG5hbWUsIHZhbCk7IH1cbn1cblxuLyoqXG4gKiBJbnNlcnQgc2FmZWx5IGEgdGFnIHRvIGZpeCAjMTk2MiAjMTY0OVxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBjaGlsZHJlbiBjb250YWluZXJcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBjdXJyIC0gbm9kZSB0byBpbnNlcnRcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBuZXh0IC0gbm9kZSB0aGF0IHNob3VsZCBwcmVjZWVkIHRoZSBjdXJyZW50IG5vZGUgaW5zZXJ0ZWRcbiAqL1xuZnVuY3Rpb24gc2FmZUluc2VydChyb290LCBjdXJyLCBuZXh0KSB7XG4gIHJvb3QuaW5zZXJ0QmVmb3JlKGN1cnIsIG5leHQucGFyZW50Tm9kZSAmJiBuZXh0KTtcbn1cblxuLyoqXG4gKiBNaW5pbWl6ZSByaXNrOiBvbmx5IHplcm8gb3Igb25lIF9zcGFjZV8gYmV0d2VlbiBhdHRyICYgdmFsdWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBodG1sIC0gaHRtbCBzdHJpbmcgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24gdG8gYXBwbHkgb24gYW55IGF0dHJpYnV0ZSBmb3VuZFxuICovXG5mdW5jdGlvbiB3YWxrQXR0cnMoaHRtbCwgZm4pIHtcbiAgaWYgKCFodG1sKVxuICAgIHsgcmV0dXJuIH1cbiAgdmFyIG07XG4gIHdoaWxlIChtID0gUkVfSFRNTF9BVFRSUy5leGVjKGh0bWwpKVxuICAgIHsgZm4obVsxXS50b0xvd2VyQ2FzZSgpLCBtWzJdIHx8IG1bM10gfHwgbVs0XSk7IH1cbn1cblxuLyoqXG4gKiBXYWxrIGRvd24gcmVjdXJzaXZlbHkgYWxsIHRoZSBjaGlsZHJlbiB0YWdzIHN0YXJ0aW5nIGRvbSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgZG9tIC0gc3RhcnRpbmcgbm9kZSB3aGVyZSB3ZSB3aWxsIHN0YXJ0IHRoZSByZWN1cnNpb25cbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIHRvIHRyYW5zZm9ybSB0aGUgY2hpbGQgbm9kZSBqdXN0IGZvdW5kXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICAgY29udGV4dCAtIGZuIGNhbiBvcHRpb25hbGx5IHJldHVybiBhbiBvYmplY3QsIHdoaWNoIGlzIHBhc3NlZCB0byBjaGlsZHJlblxuICovXG5mdW5jdGlvbiB3YWxrTm9kZXMoZG9tLCBmbiwgY29udGV4dCkge1xuICBpZiAoZG9tKSB7XG4gICAgdmFyIHJlcyA9IGZuKGRvbSwgY29udGV4dCk7XG4gICAgdmFyIG5leHQ7XG4gICAgLy8gc3RvcCB0aGUgcmVjdXJzaW9uXG4gICAgaWYgKHJlcyA9PT0gZmFsc2UpIHsgcmV0dXJuIH1cblxuICAgIGRvbSA9IGRvbS5maXJzdENoaWxkO1xuXG4gICAgd2hpbGUgKGRvbSkge1xuICAgICAgbmV4dCA9IGRvbS5uZXh0U2libGluZztcbiAgICAgIHdhbGtOb2Rlcyhkb20sIGZuLCByZXMpO1xuICAgICAgZG9tID0gbmV4dDtcbiAgICB9XG4gIH1cbn1cblxudmFyIGRvbSA9IE9iamVjdC5mcmVlemUoe1xuXHQkJDogJCQsXG5cdCQ6ICQsXG5cdGNyZWF0ZUZyYWc6IGNyZWF0ZUZyYWcsXG5cdGNyZWF0ZURPTVBsYWNlaG9sZGVyOiBjcmVhdGVET01QbGFjZWhvbGRlcixcblx0bWtFbDogbWtFbCxcblx0Z2V0T3V0ZXJIVE1MOiBnZXRPdXRlckhUTUwsXG5cdHNldElubmVySFRNTDogc2V0SW5uZXJIVE1MLFxuXHRyZW1BdHRyOiByZW1BdHRyLFxuXHRnZXRBdHRyOiBnZXRBdHRyLFxuXHRzZXRBdHRyOiBzZXRBdHRyLFxuXHRzYWZlSW5zZXJ0OiBzYWZlSW5zZXJ0LFxuXHR3YWxrQXR0cnM6IHdhbGtBdHRycyxcblx0d2Fsa05vZGVzOiB3YWxrTm9kZXNcbn0pO1xuXG52YXIgc3R5bGVOb2RlO1xudmFyIGNzc1RleHRQcm9wO1xudmFyIGJ5TmFtZSA9IHt9O1xudmFyIHJlbWFpbmRlciA9IFtdO1xudmFyIG5lZWRzSW5qZWN0ID0gZmFsc2U7XG5cbi8vIHNraXAgdGhlIGZvbGxvd2luZyBjb2RlIG9uIHRoZSBzZXJ2ZXJcbmlmIChXSU4pIHtcbiAgc3R5bGVOb2RlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjcmVhdGUgYSBuZXcgc3R5bGUgZWxlbWVudCB3aXRoIHRoZSBjb3JyZWN0IHR5cGVcbiAgICB2YXIgbmV3Tm9kZSA9IG1rRWwoJ3N0eWxlJyk7XG4gICAgc2V0QXR0cihuZXdOb2RlLCAndHlwZScsICd0ZXh0L2NzcycpO1xuXG4gICAgLy8gcmVwbGFjZSBhbnkgdXNlciBub2RlIG9yIGluc2VydCB0aGUgbmV3IG9uZSBpbnRvIHRoZSBoZWFkXG4gICAgdmFyIHVzZXJOb2RlID0gJCgnc3R5bGVbdHlwZT1yaW90XScpO1xuICAgIGlmICh1c2VyTm9kZSkge1xuICAgICAgaWYgKHVzZXJOb2RlLmlkKSB7IG5ld05vZGUuaWQgPSB1c2VyTm9kZS5pZDsgfVxuICAgICAgdXNlck5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Tm9kZSwgdXNlck5vZGUpO1xuICAgIH1cbiAgICBlbHNlIHsgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChuZXdOb2RlKTsgfVxuXG4gICAgcmV0dXJuIG5ld05vZGVcbiAgfSkoKTtcbiAgY3NzVGV4dFByb3AgPSBzdHlsZU5vZGUuc3R5bGVTaGVldDtcbn1cblxuLyoqXG4gKiBPYmplY3QgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaW5qZWN0IGFuZCBtYW5hZ2UgdGhlIGNzcyBvZiBldmVyeSB0YWcgaW5zdGFuY2VcbiAqL1xudmFyIHN0eWxlTWFuYWdlciA9IHtcbiAgc3R5bGVOb2RlOiBzdHlsZU5vZGUsXG4gIC8qKlxuICAgKiBTYXZlIGEgdGFnIHN0eWxlIHRvIGJlIGxhdGVyIGluamVjdGVkIGludG8gRE9NXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IGNzcyAtIGNzcyBzdHJpbmdcbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIGlmIGl0J3MgcGFzc2VkIHdlIHdpbGwgbWFwIHRoZSBjc3MgdG8gYSB0YWduYW1lXG4gICAqL1xuICBhZGQ6IGZ1bmN0aW9uIGFkZChjc3MsIG5hbWUpIHtcbiAgICBpZiAobmFtZSkgeyBieU5hbWVbbmFtZV0gPSBjc3M7IH1cbiAgICBlbHNlIHsgcmVtYWluZGVyLnB1c2goY3NzKTsgfVxuICAgIG5lZWRzSW5qZWN0ID0gdHJ1ZTtcbiAgfSxcbiAgLyoqXG4gICAqIEluamVjdCBhbGwgcHJldmlvdXNseSBzYXZlZCB0YWcgc3R5bGVzIGludG8gRE9NXG4gICAqIGlubmVySFRNTCBzZWVtcyBzbG93OiBodHRwOi8vanNwZXJmLmNvbS9yaW90LWluc2VydC1zdHlsZVxuICAgKi9cbiAgaW5qZWN0OiBmdW5jdGlvbiBpbmplY3QoKSB7XG4gICAgaWYgKCFXSU4gfHwgIW5lZWRzSW5qZWN0KSB7IHJldHVybiB9XG4gICAgbmVlZHNJbmplY3QgPSBmYWxzZTtcbiAgICB2YXIgc3R5bGUgPSBPYmplY3Qua2V5cyhieU5hbWUpXG4gICAgICAubWFwKGZ1bmN0aW9uKGspIHsgcmV0dXJuIGJ5TmFtZVtrXSB9KVxuICAgICAgLmNvbmNhdChyZW1haW5kZXIpLmpvaW4oJ1xcbicpO1xuICAgIGlmIChjc3NUZXh0UHJvcCkgeyBjc3NUZXh0UHJvcC5jc3NUZXh0ID0gc3R5bGU7IH1cbiAgICBlbHNlIHsgc3R5bGVOb2RlLmlubmVySFRNTCA9IHN0eWxlOyB9XG4gIH1cbn07XG5cbi8qKlxuICogVGhlIHJpb3QgdGVtcGxhdGUgZW5naW5lXG4gKiBAdmVyc2lvbiB2My4wLjFcbiAqL1xuLyoqXG4gKiByaW90LnV0aWwuYnJhY2tldHNcbiAqXG4gKiAtIGBicmFja2V0cyAgICBgIC0gUmV0dXJucyBhIHN0cmluZyBvciByZWdleCBiYXNlZCBvbiBpdHMgcGFyYW1ldGVyXG4gKiAtIGBicmFja2V0cy5zZXRgIC0gQ2hhbmdlIHRoZSBjdXJyZW50IHJpb3QgYnJhY2tldHNcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuLyogZ2xvYmFsIHJpb3QgKi9cblxudmFyIGJyYWNrZXRzID0gKGZ1bmN0aW9uIChVTkRFRikge1xuXG4gIHZhclxuICAgIFJFR0xPQiA9ICdnJyxcblxuICAgIFJfTUxDT01NUyA9IC9cXC9cXCpbXipdKlxcKisoPzpbXipcXC9dW14qXSpcXCorKSpcXC8vZyxcblxuICAgIFJfU1RSSU5HUyA9IC9cIlteXCJcXFxcXSooPzpcXFxcW1xcU1xcc11bXlwiXFxcXF0qKSpcInwnW14nXFxcXF0qKD86XFxcXFtcXFNcXHNdW14nXFxcXF0qKSonL2csXG5cbiAgICBTX1FCTE9DS1MgPSBSX1NUUklOR1Muc291cmNlICsgJ3wnICtcbiAgICAgIC8oPzpcXGJyZXR1cm5cXHMrfCg/OlskXFx3XFwpXFxdXXxcXCtcXCt8LS0pXFxzKihcXC8pKD8hWypcXC9dKSkvLnNvdXJjZSArICd8JyArXG4gICAgICAvXFwvKD89W14qXFwvXSlbXltcXC9cXFxcXSooPzooPzpcXFsoPzpcXFxcLnxbXlxcXVxcXFxdKikqXFxdfFxcXFwuKVteW1xcL1xcXFxdKikqPyhcXC8pW2dpbV0qLy5zb3VyY2UsXG5cbiAgICBVTlNVUFBPUlRFRCA9IFJlZ0V4cCgnW1xcXFwnICsgJ3gwMC1cXFxceDFGPD5hLXpBLVowLTlcXCdcIiw7XFxcXFxcXFxdJyksXG5cbiAgICBORUVEX0VTQ0FQRSA9IC8oPz1bW1xcXSgpKis/Ll4kfF0pL2csXG5cbiAgICBGSU5EQlJBQ0VTID0ge1xuICAgICAgJygnOiBSZWdFeHAoJyhbKCldKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgICAnWyc6IFJlZ0V4cCgnKFtbXFxcXF1dKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgICAgJ3snOiBSZWdFeHAoJyhbe31dKXwnICAgKyBTX1FCTE9DS1MsIFJFR0xPQilcbiAgICB9LFxuXG4gICAgREVGQVVMVCA9ICd7IH0nO1xuXG4gIHZhciBfcGFpcnMgPSBbXG4gICAgJ3snLCAnfScsXG4gICAgJ3snLCAnfScsXG4gICAgL3tbXn1dKn0vLFxuICAgIC9cXFxcKFt7fV0pL2csXG4gICAgL1xcXFwoeyl8ey9nLFxuICAgIFJlZ0V4cCgnXFxcXFxcXFwofSl8KFtbKHtdKXwofSl8JyArIFNfUUJMT0NLUywgUkVHTE9CKSxcbiAgICBERUZBVUxULFxuICAgIC9eXFxzKntcXF4/XFxzKihbJFxcd10rKSg/OlxccyosXFxzKihcXFMrKSk/XFxzK2luXFxzKyhcXFMuKilcXHMqfS8sXG4gICAgLyhefFteXFxcXF0pez1bXFxTXFxzXSo/fS9cbiAgXTtcblxuICB2YXJcbiAgICBjYWNoZWRCcmFja2V0cyA9IFVOREVGLFxuICAgIF9yZWdleCxcbiAgICBfY2FjaGUgPSBbXSxcbiAgICBfc2V0dGluZ3M7XG5cbiAgZnVuY3Rpb24gX2xvb3BiYWNrIChyZSkgeyByZXR1cm4gcmUgfVxuXG4gIGZ1bmN0aW9uIF9yZXdyaXRlIChyZSwgYnApIHtcbiAgICBpZiAoIWJwKSB7IGJwID0gX2NhY2hlOyB9XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgICByZS5zb3VyY2UucmVwbGFjZSgvey9nLCBicFsyXSkucmVwbGFjZSgvfS9nLCBicFszXSksIHJlLmdsb2JhbCA/IFJFR0xPQiA6ICcnXG4gICAgKVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAocGFpcikge1xuICAgIGlmIChwYWlyID09PSBERUZBVUxUKSB7IHJldHVybiBfcGFpcnMgfVxuXG4gICAgdmFyIGFyciA9IHBhaXIuc3BsaXQoJyAnKTtcblxuICAgIGlmIChhcnIubGVuZ3RoICE9PSAyIHx8IFVOU1VQUE9SVEVELnRlc3QocGFpcikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVW5zdXBwb3J0ZWQgYnJhY2tldHMgXCInICsgcGFpciArICdcIicpXG4gICAgfVxuICAgIGFyciA9IGFyci5jb25jYXQocGFpci5yZXBsYWNlKE5FRURfRVNDQVBFLCAnXFxcXCcpLnNwbGl0KCcgJykpO1xuXG4gICAgYXJyWzRdID0gX3Jld3JpdGUoYXJyWzFdLmxlbmd0aCA+IDEgPyAve1tcXFNcXHNdKj99LyA6IF9wYWlyc1s0XSwgYXJyKTtcbiAgICBhcnJbNV0gPSBfcmV3cml0ZShwYWlyLmxlbmd0aCA+IDMgPyAvXFxcXCh7fH0pL2cgOiBfcGFpcnNbNV0sIGFycik7XG4gICAgYXJyWzZdID0gX3Jld3JpdGUoX3BhaXJzWzZdLCBhcnIpO1xuICAgIGFycls3XSA9IFJlZ0V4cCgnXFxcXFxcXFwoJyArIGFyclszXSArICcpfChbWyh7XSl8KCcgKyBhcnJbM10gKyAnKXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpO1xuICAgIGFycls4XSA9IHBhaXI7XG4gICAgcmV0dXJuIGFyclxuICB9XG5cbiAgZnVuY3Rpb24gX2JyYWNrZXRzIChyZU9ySWR4KSB7XG4gICAgcmV0dXJuIHJlT3JJZHggaW5zdGFuY2VvZiBSZWdFeHAgPyBfcmVnZXgocmVPcklkeCkgOiBfY2FjaGVbcmVPcklkeF1cbiAgfVxuXG4gIF9icmFja2V0cy5zcGxpdCA9IGZ1bmN0aW9uIHNwbGl0IChzdHIsIHRtcGwsIF9icCkge1xuICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBfYnAgaXMgZm9yIHRoZSBjb21waWxlclxuICAgIGlmICghX2JwKSB7IF9icCA9IF9jYWNoZTsgfVxuXG4gICAgdmFyXG4gICAgICBwYXJ0cyA9IFtdLFxuICAgICAgbWF0Y2gsXG4gICAgICBpc2V4cHIsXG4gICAgICBzdGFydCxcbiAgICAgIHBvcyxcbiAgICAgIHJlID0gX2JwWzZdO1xuXG4gICAgaXNleHByID0gc3RhcnQgPSByZS5sYXN0SW5kZXggPSAwO1xuXG4gICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMoc3RyKSkpIHtcblxuICAgICAgcG9zID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgIGlmIChpc2V4cHIpIHtcblxuICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICByZS5sYXN0SW5kZXggPSBza2lwQnJhY2VzKHN0ciwgbWF0Y2hbMl0sIHJlLmxhc3RJbmRleCk7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoWzNdKSB7XG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIW1hdGNoWzFdKSB7XG4gICAgICAgIHVuZXNjYXBlU3RyKHN0ci5zbGljZShzdGFydCwgcG9zKSk7XG4gICAgICAgIHN0YXJ0ID0gcmUubGFzdEluZGV4O1xuICAgICAgICByZSA9IF9icFs2ICsgKGlzZXhwciBePSAxKV07XG4gICAgICAgIHJlLmxhc3RJbmRleCA9IHN0YXJ0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdHIgJiYgc3RhcnQgPCBzdHIubGVuZ3RoKSB7XG4gICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFydHNcblxuICAgIGZ1bmN0aW9uIHVuZXNjYXBlU3RyIChzKSB7XG4gICAgICBpZiAodG1wbCB8fCBpc2V4cHIpIHtcbiAgICAgICAgcGFydHMucHVzaChzICYmIHMucmVwbGFjZShfYnBbNV0sICckMScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnRzLnB1c2gocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2tpcEJyYWNlcyAocywgY2gsIGl4KSB7XG4gICAgICB2YXJcbiAgICAgICAgbWF0Y2gsXG4gICAgICAgIHJlY2NoID0gRklOREJSQUNFU1tjaF07XG5cbiAgICAgIHJlY2NoLmxhc3RJbmRleCA9IGl4O1xuICAgICAgaXggPSAxO1xuICAgICAgd2hpbGUgKChtYXRjaCA9IHJlY2NoLmV4ZWMocykpKSB7XG4gICAgICAgIGlmIChtYXRjaFsxXSAmJlxuICAgICAgICAgICEobWF0Y2hbMV0gPT09IGNoID8gKytpeCA6IC0taXgpKSB7IGJyZWFrIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpeCA/IHMubGVuZ3RoIDogcmVjY2gubGFzdEluZGV4XG4gICAgfVxuICB9O1xuXG4gIF9icmFja2V0cy5oYXNFeHByID0gZnVuY3Rpb24gaGFzRXhwciAoc3RyKSB7XG4gICAgcmV0dXJuIF9jYWNoZVs0XS50ZXN0KHN0cilcbiAgfTtcblxuICBfYnJhY2tldHMubG9vcEtleXMgPSBmdW5jdGlvbiBsb29wS2V5cyAoZXhwcikge1xuICAgIHZhciBtID0gZXhwci5tYXRjaChfY2FjaGVbOV0pO1xuXG4gICAgcmV0dXJuIG1cbiAgICAgID8geyBrZXk6IG1bMV0sIHBvczogbVsyXSwgdmFsOiBfY2FjaGVbMF0gKyBtWzNdLnRyaW0oKSArIF9jYWNoZVsxXSB9XG4gICAgICA6IHsgdmFsOiBleHByLnRyaW0oKSB9XG4gIH07XG5cbiAgX2JyYWNrZXRzLmFycmF5ID0gZnVuY3Rpb24gYXJyYXkgKHBhaXIpIHtcbiAgICByZXR1cm4gcGFpciA/IF9jcmVhdGUocGFpcikgOiBfY2FjaGVcbiAgfTtcblxuICBmdW5jdGlvbiBfcmVzZXQgKHBhaXIpIHtcbiAgICBpZiAoKHBhaXIgfHwgKHBhaXIgPSBERUZBVUxUKSkgIT09IF9jYWNoZVs4XSkge1xuICAgICAgX2NhY2hlID0gX2NyZWF0ZShwYWlyKTtcbiAgICAgIF9yZWdleCA9IHBhaXIgPT09IERFRkFVTFQgPyBfbG9vcGJhY2sgOiBfcmV3cml0ZTtcbiAgICAgIF9jYWNoZVs5XSA9IF9yZWdleChfcGFpcnNbOV0pO1xuICAgIH1cbiAgICBjYWNoZWRCcmFja2V0cyA9IHBhaXI7XG4gIH1cblxuICBmdW5jdGlvbiBfc2V0U2V0dGluZ3MgKG8pIHtcbiAgICB2YXIgYjtcblxuICAgIG8gPSBvIHx8IHt9O1xuICAgIGIgPSBvLmJyYWNrZXRzO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCAnYnJhY2tldHMnLCB7XG4gICAgICBzZXQ6IF9yZXNldCxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY2FjaGVkQnJhY2tldHMgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBfc2V0dGluZ3MgPSBvO1xuICAgIF9yZXNldChiKTtcbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfYnJhY2tldHMsICdzZXR0aW5ncycsIHtcbiAgICBzZXQ6IF9zZXRTZXR0aW5ncyxcbiAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF9zZXR0aW5ncyB9XG4gIH0pO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBpbiB0aGUgYnJvd3NlciByaW90IGlzIGFsd2F5cyBpbiB0aGUgc2NvcGUgKi9cbiAgX2JyYWNrZXRzLnNldHRpbmdzID0gdHlwZW9mIHJpb3QgIT09ICd1bmRlZmluZWQnICYmIHJpb3Quc2V0dGluZ3MgfHwge307XG4gIF9icmFja2V0cy5zZXQgPSBfcmVzZXQ7XG5cbiAgX2JyYWNrZXRzLlJfU1RSSU5HUyA9IFJfU1RSSU5HUztcbiAgX2JyYWNrZXRzLlJfTUxDT01NUyA9IFJfTUxDT01NUztcbiAgX2JyYWNrZXRzLlNfUUJMT0NLUyA9IFNfUUJMT0NLUztcblxuICByZXR1cm4gX2JyYWNrZXRzXG5cbn0pKCk7XG5cbi8qKlxuICogQG1vZHVsZSB0bXBsXG4gKlxuICogdG1wbCAgICAgICAgICAtIFJvb3QgZnVuY3Rpb24sIHJldHVybnMgdGhlIHRlbXBsYXRlIHZhbHVlLCByZW5kZXIgd2l0aCBkYXRhXG4gKiB0bXBsLmhhc0V4cHIgIC0gVGVzdCB0aGUgZXhpc3RlbmNlIG9mIGEgZXhwcmVzc2lvbiBpbnNpZGUgYSBzdHJpbmdcbiAqIHRtcGwubG9vcEtleXMgLSBHZXQgdGhlIGtleXMgZm9yIGFuICdlYWNoJyBsb29wICh1c2VkIGJ5IGBfZWFjaGApXG4gKi9cblxudmFyIHRtcGwgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBfY2FjaGUgPSB7fTtcblxuICBmdW5jdGlvbiBfdG1wbCAoc3RyLCBkYXRhKSB7XG4gICAgaWYgKCFzdHIpIHsgcmV0dXJuIHN0ciB9XG5cbiAgICByZXR1cm4gKF9jYWNoZVtzdHJdIHx8IChfY2FjaGVbc3RyXSA9IF9jcmVhdGUoc3RyKSkpLmNhbGwoZGF0YSwgX2xvZ0VycilcbiAgfVxuXG4gIF90bXBsLmhhc0V4cHIgPSBicmFja2V0cy5oYXNFeHByO1xuXG4gIF90bXBsLmxvb3BLZXlzID0gYnJhY2tldHMubG9vcEtleXM7XG5cbiAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgX3RtcGwuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uICgpIHsgX2NhY2hlID0ge307IH07XG5cbiAgX3RtcGwuZXJyb3JIYW5kbGVyID0gbnVsbDtcblxuICBmdW5jdGlvbiBfbG9nRXJyIChlcnIsIGN0eCkge1xuXG4gICAgZXJyLnJpb3REYXRhID0ge1xuICAgICAgdGFnTmFtZTogY3R4ICYmIGN0eC5yb290ICYmIGN0eC5yb290LnRhZ05hbWUsXG4gICAgICBfcmlvdF9pZDogY3R4ICYmIGN0eC5fcmlvdF9pZCAgLy9lc2xpbnQtZGlzYWJsZS1saW5lIGNhbWVsY2FzZVxuICAgIH07XG5cbiAgICBpZiAoX3RtcGwuZXJyb3JIYW5kbGVyKSB7IF90bXBsLmVycm9ySGFuZGxlcihlcnIpOyB9XG4gICAgZWxzZSBpZiAoXG4gICAgICB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nXG4gICAgKSB7XG4gICAgICBpZiAoZXJyLnJpb3REYXRhLnRhZ05hbWUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignUmlvdCB0ZW1wbGF0ZSBlcnJvciB0aHJvd24gaW4gdGhlIDwlcz4gdGFnJywgZXJyLnJpb3REYXRhLnRhZ05hbWUudG9Mb3dlckNhc2UoKSk7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gX2NyZWF0ZSAoc3RyKSB7XG4gICAgdmFyIGV4cHIgPSBfZ2V0VG1wbChzdHIpO1xuXG4gICAgaWYgKGV4cHIuc2xpY2UoMCwgMTEpICE9PSAndHJ5e3JldHVybiAnKSB7IGV4cHIgPSAncmV0dXJuICcgKyBleHByOyB9XG5cbiAgICByZXR1cm4gbmV3IEZ1bmN0aW9uKCdFJywgZXhwciArICc7JykgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXctZnVuY1xuICB9XG5cbiAgdmFyXG4gICAgQ0hfSURFWFBSID0gU3RyaW5nLmZyb21DaGFyQ29kZSgweDIwNTcpLFxuICAgIFJFX0NTTkFNRSA9IC9eKD86KC0/W19BLVphLXpcXHhBMC1cXHhGRl1bLVxcd1xceEEwLVxceEZGXSopfFxcdTIwNTcoXFxkKyl+KTovLFxuICAgIFJFX1FCTE9DSyA9IFJlZ0V4cChicmFja2V0cy5TX1FCTE9DS1MsICdnJyksXG4gICAgUkVfRFFVT1RFID0gL1xcdTIwNTcvZyxcbiAgICBSRV9RQk1BUksgPSAvXFx1MjA1NyhcXGQrKX4vZztcblxuICBmdW5jdGlvbiBfZ2V0VG1wbCAoc3RyKSB7XG4gICAgdmFyXG4gICAgICBxc3RyID0gW10sXG4gICAgICBleHByLFxuICAgICAgcGFydHMgPSBicmFja2V0cy5zcGxpdChzdHIucmVwbGFjZShSRV9EUVVPVEUsICdcIicpLCAxKTtcblxuICAgIGlmIChwYXJ0cy5sZW5ndGggPiAyIHx8IHBhcnRzWzBdKSB7XG4gICAgICB2YXIgaSwgaiwgbGlzdCA9IFtdO1xuXG4gICAgICBmb3IgKGkgPSBqID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG5cbiAgICAgICAgZXhwciA9IHBhcnRzW2ldO1xuXG4gICAgICAgIGlmIChleHByICYmIChleHByID0gaSAmIDFcblxuICAgICAgICAgICAgPyBfcGFyc2VFeHByKGV4cHIsIDEsIHFzdHIpXG5cbiAgICAgICAgICAgIDogJ1wiJyArIGV4cHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxcXC9nLCAnXFxcXFxcXFwnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHJcXG4/fFxcbi9nLCAnXFxcXG4nKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykgK1xuICAgICAgICAgICAgICAnXCInXG5cbiAgICAgICAgICApKSB7IGxpc3RbaisrXSA9IGV4cHI7IH1cblxuICAgICAgfVxuXG4gICAgICBleHByID0gaiA8IDIgPyBsaXN0WzBdXG4gICAgICAgICAgIDogJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiXCIpJztcblxuICAgIH0gZWxzZSB7XG5cbiAgICAgIGV4cHIgPSBfcGFyc2VFeHByKHBhcnRzWzFdLCAwLCBxc3RyKTtcbiAgICB9XG5cbiAgICBpZiAocXN0clswXSkge1xuICAgICAgZXhwciA9IGV4cHIucmVwbGFjZShSRV9RQk1BUkssIGZ1bmN0aW9uIChfLCBwb3MpIHtcbiAgICAgICAgcmV0dXJuIHFzdHJbcG9zXVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHIvZywgJ1xcXFxyJylcbiAgICAgICAgICAucmVwbGFjZSgvXFxuL2csICdcXFxcbicpXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIHZhclxuICAgIFJFX0JSRU5EID0ge1xuICAgICAgJygnOiAvWygpXS9nLFxuICAgICAgJ1snOiAvW1tcXF1dL2csXG4gICAgICAneyc6IC9be31dL2dcbiAgICB9O1xuXG4gIGZ1bmN0aW9uIF9wYXJzZUV4cHIgKGV4cHIsIGFzVGV4dCwgcXN0cikge1xuXG4gICAgZXhwciA9IGV4cHJcbiAgICAgICAgICAucmVwbGFjZShSRV9RQkxPQ0ssIGZ1bmN0aW9uIChzLCBkaXYpIHtcbiAgICAgICAgICAgIHJldHVybiBzLmxlbmd0aCA+IDIgJiYgIWRpdiA/IENIX0lERVhQUiArIChxc3RyLnB1c2gocykgLSAxKSArICd+JyA6IHNcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcID8oW1tcXCh7fSw/XFwuOl0pXFwgPy9nLCAnJDEnKTtcblxuICAgIGlmIChleHByKSB7XG4gICAgICB2YXJcbiAgICAgICAgbGlzdCA9IFtdLFxuICAgICAgICBjbnQgPSAwLFxuICAgICAgICBtYXRjaDtcblxuICAgICAgd2hpbGUgKGV4cHIgJiZcbiAgICAgICAgICAgIChtYXRjaCA9IGV4cHIubWF0Y2goUkVfQ1NOQU1FKSkgJiZcbiAgICAgICAgICAgICFtYXRjaC5pbmRleFxuICAgICAgICApIHtcbiAgICAgICAgdmFyXG4gICAgICAgICAga2V5LFxuICAgICAgICAgIGpzYixcbiAgICAgICAgICByZSA9IC8sfChbW3soXSl8JC9nO1xuXG4gICAgICAgIGV4cHIgPSBSZWdFeHAucmlnaHRDb250ZXh0O1xuICAgICAgICBrZXkgID0gbWF0Y2hbMl0gPyBxc3RyW21hdGNoWzJdXS5zbGljZSgxLCAtMSkudHJpbSgpLnJlcGxhY2UoL1xccysvZywgJyAnKSA6IG1hdGNoWzFdO1xuXG4gICAgICAgIHdoaWxlIChqc2IgPSAobWF0Y2ggPSByZS5leGVjKGV4cHIpKVsxXSkgeyBza2lwQnJhY2VzKGpzYiwgcmUpOyB9XG5cbiAgICAgICAganNiICA9IGV4cHIuc2xpY2UoMCwgbWF0Y2guaW5kZXgpO1xuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dDtcblxuICAgICAgICBsaXN0W2NudCsrXSA9IF93cmFwRXhwcihqc2IsIDEsIGtleSk7XG4gICAgICB9XG5cbiAgICAgIGV4cHIgPSAhY250ID8gX3dyYXBFeHByKGV4cHIsIGFzVGV4dClcbiAgICAgICAgICAgOiBjbnQgPiAxID8gJ1snICsgbGlzdC5qb2luKCcsJykgKyAnXS5qb2luKFwiIFwiKS50cmltKCknIDogbGlzdFswXTtcbiAgICB9XG4gICAgcmV0dXJuIGV4cHJcblxuICAgIGZ1bmN0aW9uIHNraXBCcmFjZXMgKGNoLCByZSkge1xuICAgICAgdmFyXG4gICAgICAgIG1tLFxuICAgICAgICBsdiA9IDEsXG4gICAgICAgIGlyID0gUkVfQlJFTkRbY2hdO1xuXG4gICAgICBpci5sYXN0SW5kZXggPSByZS5sYXN0SW5kZXg7XG4gICAgICB3aGlsZSAobW0gPSBpci5leGVjKGV4cHIpKSB7XG4gICAgICAgIGlmIChtbVswXSA9PT0gY2gpIHsgKytsdjsgfVxuICAgICAgICBlbHNlIGlmICghLS1sdikgeyBicmVhayB9XG4gICAgICB9XG4gICAgICByZS5sYXN0SW5kZXggPSBsdiA/IGV4cHIubGVuZ3RoIDogaXIubGFzdEluZGV4O1xuICAgIH1cbiAgfVxuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0OiBub3QgYm90aFxuICB2YXIgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICBKU19DT05URVhUID0gJ1wiaW4gdGhpcz90aGlzOicgKyAodHlwZW9mIHdpbmRvdyAhPT0gJ29iamVjdCcgPyAnZ2xvYmFsJyA6ICd3aW5kb3cnKSArICcpLicsXG4gICAgSlNfVkFSTkFNRSA9IC9bLHtdW1xcJFxcd10rKD89Oil8KF4gKnxbXiRcXHdcXC57XSkoPyEoPzp0eXBlb2Z8dHJ1ZXxmYWxzZXxudWxsfHVuZGVmaW5lZHxpbnxpbnN0YW5jZW9mfGlzKD86RmluaXRlfE5hTil8dm9pZHxOYU58bmV3fERhdGV8UmVnRXhwfE1hdGgpKD8hWyRcXHddKSkoWyRfQS1aYS16XVskXFx3XSopL2csXG4gICAgSlNfTk9QUk9QUyA9IC9eKD89KFxcLlskXFx3XSspKVxcMSg/OlteLlsoXXwkKS87XG5cbiAgZnVuY3Rpb24gX3dyYXBFeHByIChleHByLCBhc1RleHQsIGtleSkge1xuICAgIHZhciB0YjtcblxuICAgIGV4cHIgPSBleHByLnJlcGxhY2UoSlNfVkFSTkFNRSwgZnVuY3Rpb24gKG1hdGNoLCBwLCBtdmFyLCBwb3MsIHMpIHtcbiAgICAgIGlmIChtdmFyKSB7XG4gICAgICAgIHBvcyA9IHRiID8gMCA6IHBvcyArIG1hdGNoLmxlbmd0aDtcblxuICAgICAgICBpZiAobXZhciAhPT0gJ3RoaXMnICYmIG12YXIgIT09ICdnbG9iYWwnICYmIG12YXIgIT09ICd3aW5kb3cnKSB7XG4gICAgICAgICAgbWF0Y2ggPSBwICsgJyhcIicgKyBtdmFyICsgSlNfQ09OVEVYVCArIG12YXI7XG4gICAgICAgICAgaWYgKHBvcykgeyB0YiA9IChzID0gc1twb3NdKSA9PT0gJy4nIHx8IHMgPT09ICcoJyB8fCBzID09PSAnWyc7IH1cbiAgICAgICAgfSBlbHNlIGlmIChwb3MpIHtcbiAgICAgICAgICB0YiA9ICFKU19OT1BST1BTLnRlc3Qocy5zbGljZShwb3MpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG1hdGNoXG4gICAgfSk7XG5cbiAgICBpZiAodGIpIHtcbiAgICAgIGV4cHIgPSAndHJ5e3JldHVybiAnICsgZXhwciArICd9Y2F0Y2goZSl7RShlLHRoaXMpfSc7XG4gICAgfVxuXG4gICAgaWYgKGtleSkge1xuXG4gICAgICBleHByID0gKHRiXG4gICAgICAgICAgPyAnZnVuY3Rpb24oKXsnICsgZXhwciArICd9LmNhbGwodGhpcyknIDogJygnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJz9cIicgKyBrZXkgKyAnXCI6XCJcIic7XG5cbiAgICB9IGVsc2UgaWYgKGFzVGV4dCkge1xuXG4gICAgICBleHByID0gJ2Z1bmN0aW9uKHYpeycgKyAodGJcbiAgICAgICAgICA/IGV4cHIucmVwbGFjZSgncmV0dXJuICcsICd2PScpIDogJ3Y9KCcgKyBleHByICsgJyknXG4gICAgICAgICkgKyAnO3JldHVybiB2fHx2PT09MD92OlwiXCJ9LmNhbGwodGhpcyknO1xuICAgIH1cblxuICAgIHJldHVybiBleHByXG4gIH1cblxuICBfdG1wbC52ZXJzaW9uID0gYnJhY2tldHMudmVyc2lvbiA9ICd2My4wLjEnO1xuXG4gIHJldHVybiBfdG1wbFxuXG59KSgpO1xuXG52YXIgb2JzZXJ2YWJsZSQxID0gZnVuY3Rpb24oZWwpIHtcblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBvcmlnaW5hbCBvYmplY3Qgb3IgY3JlYXRlIGEgbmV3IGVtcHR5IG9uZVxuICAgKiBAdHlwZSB7IE9iamVjdCB9XG4gICAqL1xuXG4gIGVsID0gZWwgfHwge307XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGVzXG4gICAqL1xuICB2YXIgY2FsbGJhY2tzID0ge30sXG4gICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgLyoqXG4gICAqIFB1YmxpYyBBcGlcbiAgICovXG5cbiAgLy8gZXh0ZW5kIHRoZSBlbCBvYmplY3QgYWRkaW5nIHRoZSBvYnNlcnZhYmxlIG1ldGhvZHNcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZWwsIHtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGBldmVudGAgYW5kc1xuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgZWFjaCB0aW1lIGFuIGV2ZW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKiBAcGFyYW0gIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb246IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIHsgKGNhbGxiYWNrc1tldmVudF0gPSBjYWxsYmFja3NbZXZlbnRdIHx8IFtdKS5wdXNoKGZuKTsgfVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gYGV2ZW50YCBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvZmY6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKGV2ZW50ID09ICcqJyAmJiAhZm4pIHsgY2FsbGJhY2tzID0ge307IH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gY2FsbGJhY2tzW2V2ZW50XTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjYjsgY2IgPSBhcnIgJiYgYXJyW2ldOyArK2kpIHtcbiAgICAgICAgICAgICAgaWYgKGNiID09IGZuKSB7IGFyci5zcGxpY2UoaS0tLCAxKTsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7IGRlbGV0ZSBjYWxsYmFja3NbZXZlbnRdOyB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRcbiAgICAgKiBleGVjdXRlIHRoZSBgY2FsbGJhY2tgIGF0IG1vc3Qgb25jZVxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9uZToge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBmdW5jdGlvbiBvbigpIHtcbiAgICAgICAgICBlbC5vZmYoZXZlbnQsIG9uKTtcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWwub24oZXZlbnQsIG9uKVxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGFsbCBjYWxsYmFjayBmdW5jdGlvbnMgdGhhdCBsaXN0ZW4gdG9cbiAgICAgKiB0aGUgZ2l2ZW4gYGV2ZW50YFxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICB0cmlnZ2VyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG5cbiAgICAgICAgLy8gZ2V0dGluZyB0aGUgYXJndW1lbnRzXG4gICAgICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMSxcbiAgICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFyZ2xlbiksXG4gICAgICAgICAgZm5zLFxuICAgICAgICAgIGZuLFxuICAgICAgICAgIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ2xlbjsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50cyQxW2kgKyAxXTsgLy8gc2tpcCBmaXJzdCBhcmd1bWVudFxuICAgICAgICB9XG5cbiAgICAgICAgZm5zID0gc2xpY2UuY2FsbChjYWxsYmFja3NbZXZlbnRdIHx8IFtdLCAwKTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBmbiA9IGZuc1tpXTsgKytpKSB7XG4gICAgICAgICAgZm4uYXBwbHkoZWwsIGFyZ3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrc1snKiddICYmIGV2ZW50ICE9ICcqJylcbiAgICAgICAgICB7IGVsLnRyaWdnZXIuYXBwbHkoZWwsIFsnKicsIGV2ZW50XS5jb25jYXQoYXJncykpOyB9XG5cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZWxcblxufTtcblxuLyoqXG4gKiBTcGVjaWFsaXplZCBmdW5jdGlvbiBmb3IgbG9vcGluZyBhbiBhcnJheS1saWtlIGNvbGxlY3Rpb24gd2l0aCBgZWFjaD17fWBcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBsaXN0IC0gY29sbGVjdGlvbiBvZiBpdGVtc1xuICogQHBhcmFtICAge0Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gdGhlIGFycmF5IGxvb3BlZFxuICovXG5mdW5jdGlvbiBlYWNoKGxpc3QsIGZuKSB7XG4gIHZhciBsZW4gPSBsaXN0ID8gbGlzdC5sZW5ndGggOiAwO1xuXG4gIGZvciAodmFyIGkgPSAwLCBlbDsgaSA8IGxlbjsgKytpKSB7XG4gICAgZWwgPSBsaXN0W2ldO1xuICAgIC8vIHJldHVybiBmYWxzZSAtPiBjdXJyZW50IGl0ZW0gd2FzIHJlbW92ZWQgYnkgZm4gZHVyaW5nIHRoZSBsb29wXG4gICAgaWYgKGZuKGVsLCBpKSA9PT0gZmFsc2UpXG4gICAgICB7IGktLTsgfVxuICB9XG4gIHJldHVybiBsaXN0XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhbiBhcnJheSBjb250YWlucyBhbiBpdGVtXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gYXJyYXkgLSB0YXJnZXQgYXJyYXlcbiAqIEBwYXJhbSAgIHsgKiB9IGl0ZW0gLSBpdGVtIHRvIHRlc3RcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gY29udGFpbnMoYXJyYXksIGl0ZW0pIHtcbiAgcmV0dXJuIH5hcnJheS5pbmRleE9mKGl0ZW0pXG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyBjb250YWluaW5nIGRhc2hlcyB0byBjYW1lbCBjYXNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHN0ciAtIGlucHV0IHN0cmluZ1xuICogQHJldHVybnMgeyBTdHJpbmcgfSBteS1zdHJpbmcgLT4gbXlTdHJpbmdcbiAqL1xuZnVuY3Rpb24gdG9DYW1lbChzdHIpIHtcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC8tKFxcdykvZywgZnVuY3Rpb24gKF8sIGMpIHsgcmV0dXJuIGMudG9VcHBlckNhc2UoKTsgfSlcbn1cblxuLyoqXG4gKiBGYXN0ZXIgU3RyaW5nIHN0YXJ0c1dpdGggYWx0ZXJuYXRpdmVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gc291cmNlIHN0cmluZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtIHRlc3Qgc3RyaW5nXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIHN0YXJ0c1dpdGgoc3RyLCB2YWx1ZSkge1xuICByZXR1cm4gc3RyLnNsaWNlKDAsIHZhbHVlLmxlbmd0aCkgPT09IHZhbHVlXG59XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIHNldCBhbiBpbW11dGFibGUgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZWwgLSBvYmplY3Qgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHNldFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBrZXkgLSBvYmplY3Qga2V5IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC0gdmFsdWUgb2YgdGhlIG5ldyBwcm9wZXJ0eVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRpb25zIC0gc2V0IHRoZSBwcm9wZXJ5IG92ZXJyaWRpbmcgdGhlIGRlZmF1bHQgb3B0aW9uc1xuICogQHJldHVybnMgeyBPYmplY3QgfSAtIHRoZSBpbml0aWFsIG9iamVjdFxuICovXG5mdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShlbCwga2V5LCB2YWx1ZSwgb3B0aW9ucykge1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWwsIGtleSwgZXh0ZW5kKHtcbiAgICB2YWx1ZTogdmFsdWUsXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgd3JpdGFibGU6IGZhbHNlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9LCBvcHRpb25zKSk7XG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEV4dGVuZCBhbnkgb2JqZWN0IHdpdGggb3RoZXIgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBzcmMgLSBzb3VyY2Ugb2JqZWN0XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSByZXN1bHRpbmcgZXh0ZW5kZWQgb2JqZWN0XG4gKlxuICogdmFyIG9iaiA9IHsgZm9vOiAnYmF6JyB9XG4gKiBleHRlbmQob2JqLCB7YmFyOiAnYmFyJywgZm9vOiAnYmFyJ30pXG4gKiBjb25zb2xlLmxvZyhvYmopID0+IHtiYXI6ICdiYXInLCBmb286ICdiYXInfVxuICpcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kKHNyYykge1xuICB2YXIgb2JqLCBhcmdzID0gYXJndW1lbnRzO1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAob2JqID0gYXJnc1tpXSkge1xuICAgICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGlzIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAgICAgICAgaWYgKGlzV3JpdGFibGUoc3JjLCBrZXkpKVxuICAgICAgICAgIHsgc3JjW2tleV0gPSBvYmpba2V5XTsgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gc3JjXG59XG5cbnZhciBtaXNjID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGVhY2g6IGVhY2gsXG5cdGNvbnRhaW5zOiBjb250YWlucyxcblx0dG9DYW1lbDogdG9DYW1lbCxcblx0c3RhcnRzV2l0aDogc3RhcnRzV2l0aCxcblx0ZGVmaW5lUHJvcGVydHk6IGRlZmluZVByb3BlcnR5LFxuXHRleHRlbmQ6IGV4dGVuZFxufSk7XG5cbnZhciBFVkVOVFNfUFJFRklYX1JFR0VYID0gL15vbi87XG5cbi8qKlxuICogVHJpZ2dlciBET00gZXZlbnRzXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gZG9tIC0gZG9tIGVsZW1lbnQgdGFyZ2V0IG9mIHRoZSBldmVudFxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGhhbmRsZXIgLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGUgLSBldmVudCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRXZlbnQoZG9tLCBoYW5kbGVyLCBlKSB7XG4gIHZhciBwdGFnID0gdGhpcy5fcGFyZW50LFxuICAgIGl0ZW0gPSB0aGlzLl9pdGVtO1xuXG4gIGlmICghaXRlbSlcbiAgICB7IHdoaWxlIChwdGFnICYmICFpdGVtKSB7XG4gICAgICBpdGVtID0gcHRhZy5faXRlbTtcbiAgICAgIHB0YWcgPSBwdGFnLl9wYXJlbnQ7XG4gICAgfSB9XG5cbiAgLy8gb3ZlcnJpZGUgdGhlIGV2ZW50IHByb3BlcnRpZXNcbiAgaWYgKGlzV3JpdGFibGUoZSwgJ2N1cnJlbnRUYXJnZXQnKSkgeyBlLmN1cnJlbnRUYXJnZXQgPSBkb207IH1cbiAgaWYgKGlzV3JpdGFibGUoZSwgJ3RhcmdldCcpKSB7IGUudGFyZ2V0ID0gZS5zcmNFbGVtZW50OyB9XG4gIGlmIChpc1dyaXRhYmxlKGUsICd3aGljaCcpKSB7IGUud2hpY2ggPSBlLmNoYXJDb2RlIHx8IGUua2V5Q29kZTsgfVxuXG4gIGUuaXRlbSA9IGl0ZW07XG5cbiAgaGFuZGxlci5jYWxsKHRoaXMsIGUpO1xuXG4gIGlmICghZS5wcmV2ZW50VXBkYXRlKSB7XG4gICAgdmFyIHAgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcyk7XG4gICAgLy8gZml4ZXMgIzIwODNcbiAgICBpZiAocC5pc01vdW50ZWQpIHsgcC51cGRhdGUoKTsgfVxuICB9XG59XG5cbi8qKlxuICogQXR0YWNoIGFuIGV2ZW50IHRvIGEgRE9NIG5vZGVcbiAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBldmVudCBuYW1lXG4gKiBAcGFyYW0geyBGdW5jdGlvbiB9IGhhbmRsZXIgLSBldmVudCBjYWxsYmFja1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZG9tIC0gZG9tIG5vZGVcbiAqIEBwYXJhbSB7IFRhZyB9IHRhZyAtIHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBzZXRFdmVudEhhbmRsZXIobmFtZSwgaGFuZGxlciwgZG9tLCB0YWcpIHtcbiAgdmFyIGV2ZW50TmFtZSxcbiAgICBjYiA9IGhhbmRsZUV2ZW50LmJpbmQodGFnLCBkb20sIGhhbmRsZXIpO1xuXG4gIGlmICghZG9tLmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICBkb21bbmFtZV0gPSBjYjtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIGF2b2lkIHRvIGJpbmQgdHdpY2UgdGhlIHNhbWUgZXZlbnRcbiAgZG9tW25hbWVdID0gbnVsbDtcblxuICAvLyBub3JtYWxpemUgZXZlbnQgbmFtZVxuICBldmVudE5hbWUgPSBuYW1lLnJlcGxhY2UoRVZFTlRTX1BSRUZJWF9SRUdFWCwgJycpO1xuXG4gIC8vIGNhY2hlIHRoZSBjYWxsYmFjayBkaXJlY3RseSBvbiB0aGUgRE9NIG5vZGVcbiAgaWYgKCFkb20uX3Jpb3RFdmVudHMpIHsgZG9tLl9yaW90RXZlbnRzID0ge307IH1cblxuICBpZiAoZG9tLl9yaW90RXZlbnRzW25hbWVdKVxuICAgIHsgZG9tLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBkb20uX3Jpb3RFdmVudHNbbmFtZV0pOyB9XG5cbiAgZG9tLl9yaW90RXZlbnRzW25hbWVdID0gY2I7XG4gIGRvbS5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2IsIGZhbHNlKTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgZHluYW1pY2FsbHkgY3JlYXRlZCBkYXRhLWlzIHRhZ3Mgd2l0aCBjaGFuZ2luZyBleHByZXNzaW9uc1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZXhwciAtIGV4cHJlc3Npb24gdGFnIGFuZCBleHByZXNzaW9uIGluZm9cbiAqIEBwYXJhbSB7IFRhZyB9IHBhcmVudCAtIHBhcmVudCBmb3IgdGFnIGNyZWF0aW9uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZURhdGFJcyhleHByLCBwYXJlbnQpIHtcbiAgdmFyIHRhZ05hbWUgPSB0bXBsKGV4cHIudmFsdWUsIHBhcmVudCksXG4gICAgY29uZjtcblxuICBpZiAoZXhwci50YWcgJiYgZXhwci50YWdOYW1lID09PSB0YWdOYW1lKSB7XG4gICAgZXhwci50YWcudXBkYXRlKCk7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBzeW5jIF9wYXJlbnQgdG8gYWNjb21tb2RhdGUgY2hhbmdpbmcgdGFnbmFtZXNcbiAgaWYgKGV4cHIudGFnKSB7XG4gICAgZWFjaChleHByLmF0dHJzLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gc2V0QXR0cihleHByLnRhZy5yb290LCBhLm5hbWUsIGEudmFsdWUpOyB9KTtcbiAgICBleHByLnRhZy51bm1vdW50KHRydWUpO1xuICB9XG5cbiAgZXhwci5pbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXTtcbiAgY29uZiA9IHtyb290OiBleHByLmRvbSwgcGFyZW50OiBwYXJlbnQsIGhhc0ltcGw6IHRydWUsIHRhZ05hbWU6IHRhZ05hbWV9O1xuICBleHByLnRhZyA9IGluaXRDaGlsZFRhZyhleHByLmltcGwsIGNvbmYsIGV4cHIuZG9tLmlubmVySFRNTCwgcGFyZW50KTtcbiAgZXhwci50YWdOYW1lID0gdGFnTmFtZTtcbiAgZXhwci50YWcubW91bnQoKTtcblxuICAvLyBwYXJlbnQgaXMgdGhlIHBsYWNlaG9sZGVyIHRhZywgbm90IHRoZSBkeW5hbWljIHRhZyBzbyBjbGVhbiB1cFxuICBwYXJlbnQub24oJ3VubW91bnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGRlbE5hbWUgPSBleHByLnRhZy5vcHRzLmRhdGFJcyxcbiAgICAgIHRhZ3MgPSBleHByLnRhZy5wYXJlbnQudGFncyxcbiAgICAgIF90YWdzID0gZXhwci50YWcuX3BhcmVudC50YWdzO1xuICAgIGFycmF5aXNoUmVtb3ZlKHRhZ3MsIGRlbE5hbWUsIGV4cHIudGFnKTtcbiAgICBhcnJheWlzaFJlbW92ZShfdGFncywgZGVsTmFtZSwgZXhwci50YWcpO1xuICAgIGV4cHIudGFnLnVubW91bnQoKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVXBkYXRlIG9uIHNpbmdsZSB0YWcgZXhwcmVzc2lvblxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBPYmplY3QgfSBleHByIC0gZXhwcmVzc2lvbiBsb2dpY1xuICogQHJldHVybnMgeyB1bmRlZmluZWQgfVxuICovXG5mdW5jdGlvbiB1cGRhdGVFeHByZXNzaW9uKGV4cHIpIHtcbiAgdmFyIGRvbSA9IGV4cHIuZG9tLFxuICAgIGF0dHJOYW1lID0gZXhwci5hdHRyLFxuICAgIGlzVG9nZ2xlID0gY29udGFpbnMoW1NIT1dfRElSRUNUSVZFLCBISURFX0RJUkVDVElWRV0sIGF0dHJOYW1lKSxcbiAgICB2YWx1ZSA9IHRtcGwoZXhwci5leHByLCB0aGlzKSxcbiAgICBpc1ZhbHVlQXR0ciA9IGF0dHJOYW1lID09PSAncmlvdC12YWx1ZScsXG4gICAgaXNWaXJ0dWFsID0gZXhwci5yb290ICYmIGV4cHIucm9vdC50YWdOYW1lID09PSAnVklSVFVBTCcsXG4gICAgcGFyZW50ID0gZG9tICYmIChleHByLnBhcmVudCB8fCBkb20ucGFyZW50Tm9kZSksXG4gICAgb2xkO1xuXG4gIGlmIChleHByLmJvb2wpXG4gICAgeyB2YWx1ZSA9IHZhbHVlID8gYXR0ck5hbWUgOiBmYWxzZTsgfVxuICBlbHNlIGlmIChpc1VuZGVmaW5lZCh2YWx1ZSkgfHwgdmFsdWUgPT09IG51bGwpXG4gICAgeyB2YWx1ZSA9ICcnOyB9XG5cbiAgaWYgKGV4cHIuX3Jpb3RfaWQpIHsgLy8gaWYgaXQncyBhIHRhZ1xuICAgIGlmIChleHByLmlzTW91bnRlZCkge1xuICAgICAgZXhwci51cGRhdGUoKTtcblxuICAgIC8vIGlmIGl0IGhhc24ndCBiZWVuIG1vdW50ZWQgeWV0LCBkbyB0aGF0IG5vdy5cbiAgICB9IGVsc2Uge1xuICAgICAgZXhwci5tb3VudCgpO1xuXG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBtYWtlVmlydHVhbC5jYWxsKGV4cHIsIGZyYWcpO1xuICAgICAgICBleHByLnJvb3QucGFyZW50RWxlbWVudC5yZXBsYWNlQ2hpbGQoZnJhZywgZXhwci5yb290KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICBvbGQgPSBleHByLnZhbHVlO1xuICBleHByLnZhbHVlID0gdmFsdWU7XG5cbiAgaWYgKGV4cHIudXBkYXRlKSB7XG4gICAgZXhwci51cGRhdGUoKTtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChleHByLmlzUnRhZyAmJiB2YWx1ZSkgeyByZXR1cm4gdXBkYXRlRGF0YUlzKGV4cHIsIHRoaXMpIH1cbiAgaWYgKG9sZCA9PT0gdmFsdWUpIHsgcmV0dXJuIH1cbiAgLy8gbm8gY2hhbmdlLCBzbyBub3RoaW5nIG1vcmUgdG8gZG9cbiAgaWYgKGlzVmFsdWVBdHRyICYmIGRvbS52YWx1ZSA9PT0gdmFsdWUpIHsgcmV0dXJuIH1cblxuICAvLyB0ZXh0YXJlYSBhbmQgdGV4dCBub2RlcyBoYXZlIG5vIGF0dHJpYnV0ZSBuYW1lXG4gIGlmICghYXR0ck5hbWUpIHtcbiAgICAvLyBhYm91dCAjODE1IHcvbyByZXBsYWNlOiB0aGUgYnJvd3NlciBjb252ZXJ0cyB0aGUgdmFsdWUgdG8gYSBzdHJpbmcsXG4gICAgLy8gdGhlIGNvbXBhcmlzb24gYnkgXCI9PVwiIGRvZXMgdG9vLCBidXQgbm90IGluIHRoZSBzZXJ2ZXJcbiAgICB2YWx1ZSArPSAnJztcbiAgICAvLyB0ZXN0IGZvciBwYXJlbnQgYXZvaWRzIGVycm9yIHdpdGggaW52YWxpZCBhc3NpZ25tZW50IHRvIG5vZGVWYWx1ZVxuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgIC8vIGNhY2hlIHRoZSBwYXJlbnQgbm9kZSBiZWNhdXNlIHNvbWVob3cgaXQgd2lsbCBiZWNvbWUgbnVsbCBvbiBJRVxuICAgICAgLy8gb24gdGhlIG5leHQgaXRlcmF0aW9uXG4gICAgICBleHByLnBhcmVudCA9IHBhcmVudDtcbiAgICAgIGlmIChwYXJlbnQudGFnTmFtZSA9PT0gJ1RFWFRBUkVBJykge1xuICAgICAgICBwYXJlbnQudmFsdWUgPSB2YWx1ZTsgICAgICAgICAgICAgICAgICAgIC8vICMxMTEzXG4gICAgICAgIGlmICghSUVfVkVSU0lPTikgeyBkb20ubm9kZVZhbHVlID0gdmFsdWU7IH0gIC8vICMxNjI1IElFIHRocm93cyBoZXJlLCBub2RlVmFsdWVcbiAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdpbGwgYmUgYXZhaWxhYmxlIG9uICd1cGRhdGVkJ1xuICAgICAgZWxzZSB7IGRvbS5ub2RlVmFsdWUgPSB2YWx1ZTsgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIHJlbW92ZSBvcmlnaW5hbCBhdHRyaWJ1dGVcbiAgaWYgKCFleHByLmlzQXR0clJlbW92ZWQgfHwgIXZhbHVlKSB7XG4gICAgcmVtQXR0cihkb20sIGF0dHJOYW1lKTtcbiAgICBleHByLmlzQXR0clJlbW92ZWQgPSB0cnVlO1xuICB9XG5cbiAgLy8gZXZlbnQgaGFuZGxlclxuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICBzZXRFdmVudEhhbmRsZXIoYXR0ck5hbWUsIHZhbHVlLCBkb20sIHRoaXMpO1xuICAvLyBzaG93IC8gaGlkZVxuICB9IGVsc2UgaWYgKGlzVG9nZ2xlKSB7XG4gICAgaWYgKGF0dHJOYW1lID09PSBISURFX0RJUkVDVElWRSkgeyB2YWx1ZSA9ICF2YWx1ZTsgfVxuICAgIGRvbS5zdHlsZS5kaXNwbGF5ID0gdmFsdWUgPyAnJyA6ICdub25lJztcbiAgLy8gZmllbGQgdmFsdWVcbiAgfSBlbHNlIGlmIChpc1ZhbHVlQXR0cikge1xuICAgIGRvbS52YWx1ZSA9IHZhbHVlO1xuICAvLyA8aW1nIHNyYz1cInsgZXhwciB9XCI+XG4gIH0gZWxzZSBpZiAoc3RhcnRzV2l0aChhdHRyTmFtZSwgQVRUUlNfUFJFRklYKSAmJiBhdHRyTmFtZSAhPT0gSVNfRElSRUNUSVZFKSB7XG4gICAgYXR0ck5hbWUgPSBhdHRyTmFtZS5zbGljZShBVFRSU19QUkVGSVgubGVuZ3RoKTtcbiAgICBpZiAoQ0FTRV9TRU5TSVRJVkVfQVRUUklCVVRFU1thdHRyTmFtZV0pXG4gICAgICB7IGF0dHJOYW1lID0gQ0FTRV9TRU5TSVRJVkVfQVRUUklCVVRFU1thdHRyTmFtZV07IH1cbiAgICBpZiAodmFsdWUgIT0gbnVsbClcbiAgICAgIHsgc2V0QXR0cihkb20sIGF0dHJOYW1lLCB2YWx1ZSk7IH1cbiAgfSBlbHNlIHtcbiAgICAvLyA8c2VsZWN0PiA8b3B0aW9uIHNlbGVjdGVkPXt0cnVlfT4gPC9zZWxlY3Q+XG4gICAgaWYgKGF0dHJOYW1lID09PSAnc2VsZWN0ZWQnICYmIHBhcmVudCAmJiAvXihTRUxFQ1R8T1BUR1JPVVApJC8udGVzdChwYXJlbnQudGFnTmFtZSkgJiYgdmFsdWUpIHtcbiAgICAgIHBhcmVudC52YWx1ZSA9IGRvbS52YWx1ZTtcbiAgICB9IGlmIChleHByLmJvb2wpIHtcbiAgICAgIGRvbVthdHRyTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGlmICghdmFsdWUpIHsgcmV0dXJuIH1cbiAgICB9IGlmICh2YWx1ZSA9PT0gMCB8fCB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgIT09IFRfT0JKRUNUKSB7XG4gICAgICBzZXRBdHRyKGRvbSwgYXR0ck5hbWUsIHZhbHVlKTtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBVcGRhdGUgYWxsIHRoZSBleHByZXNzaW9ucyBpbiBhIFRhZyBpbnN0YW5jZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBBcnJheSB9IGV4cHJlc3Npb25zIC0gZXhwcmVzc2lvbiB0aGF0IG11c3QgYmUgcmUgZXZhbHVhdGVkXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUFsbEV4cHJlc3Npb25zKGV4cHJlc3Npb25zKSB7XG4gIGVhY2goZXhwcmVzc2lvbnMsIHVwZGF0ZUV4cHJlc3Npb24uYmluZCh0aGlzKSk7XG59XG5cbnZhciBJZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCB0YWcsIGV4cHIpIHtcbiAgICByZW1BdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKTtcbiAgICB0aGlzLnRhZyA9IHRhZztcbiAgICB0aGlzLmV4cHIgPSBleHByO1xuICAgIHRoaXMuc3R1YiA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKTtcbiAgICB0aGlzLnByaXN0aW5lID0gZG9tO1xuXG4gICAgdmFyIHAgPSBkb20ucGFyZW50Tm9kZTtcbiAgICBwLmluc2VydEJlZm9yZSh0aGlzLnN0dWIsIGRvbSk7XG4gICAgcC5yZW1vdmVDaGlsZChkb20pO1xuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIG5ld1ZhbHVlID0gdG1wbCh0aGlzLmV4cHIsIHRoaXMudGFnKTtcblxuICAgIGlmIChuZXdWYWx1ZSAmJiAhdGhpcy5jdXJyZW50KSB7IC8vIGluc2VydFxuICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5wcmlzdGluZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICB0aGlzLnN0dWIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5jdXJyZW50LCB0aGlzLnN0dWIpO1xuXG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgICBwYXJzZUV4cHJlc3Npb25zLmFwcGx5KHRoaXMudGFnLCBbdGhpcy5jdXJyZW50LCB0aGlzLmV4cHJlc3Npb25zLCB0cnVlXSk7XG4gICAgfSBlbHNlIGlmICghbmV3VmFsdWUgJiYgdGhpcy5jdXJyZW50KSB7IC8vIHJlbW92ZVxuICAgICAgdW5tb3VudEFsbCh0aGlzLmV4cHJlc3Npb25zKTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQuX3RhZykge1xuICAgICAgICB0aGlzLmN1cnJlbnQuX3RhZy51bm1vdW50KCk7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudC5wYXJlbnROb2RlKVxuICAgICAgICB7IHRoaXMuY3VycmVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuY3VycmVudCk7IH1cbiAgICAgIHRoaXMuY3VycmVudCA9IG51bGw7XG4gICAgICB0aGlzLmV4cHJlc3Npb25zID0gW107XG4gICAgfVxuXG4gICAgaWYgKG5ld1ZhbHVlKSB7IHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwodGhpcy50YWcsIHRoaXMuZXhwcmVzc2lvbnMpOyB9XG4gIH0sXG4gIHVubW91bnQ6IGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgdW5tb3VudEFsbCh0aGlzLmV4cHJlc3Npb25zIHx8IFtdKTtcbiAgICBkZWxldGUgdGhpcy5wcmlzdGluZTtcbiAgICBkZWxldGUgdGhpcy5wYXJlbnROb2RlO1xuICAgIGRlbGV0ZSB0aGlzLnN0dWI7XG4gIH1cbn07XG5cbnZhciBSZWZFeHByID0ge1xuICBpbml0OiBmdW5jdGlvbiBpbml0KGRvbSwgcGFyZW50LCBhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgdGhpcy5kb20gPSBkb207XG4gICAgdGhpcy5hdHRyID0gYXR0ck5hbWU7XG4gICAgdGhpcy5yYXdWYWx1ZSA9IGF0dHJWYWx1ZTtcbiAgICB0aGlzLnBhcmVudCA9IHBhcmVudDtcbiAgICB0aGlzLmhhc0V4cCA9IHRtcGwuaGFzRXhwcihhdHRyVmFsdWUpO1xuICAgIHRoaXMuZmlyc3RSdW4gPSB0cnVlO1xuXG4gICAgcmV0dXJuIHRoaXNcbiAgfSxcbiAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5yYXdWYWx1ZTtcbiAgICBpZiAodGhpcy5oYXNFeHApXG4gICAgICB7IHZhbHVlID0gdG1wbCh0aGlzLnJhd1ZhbHVlLCB0aGlzLnBhcmVudCk7IH1cblxuICAgIC8vIGlmIG5vdGhpbmcgY2hhbmdlZCwgd2UncmUgZG9uZVxuICAgIGlmICghdGhpcy5maXJzdFJ1biAmJiB2YWx1ZSA9PT0gdGhpcy52YWx1ZSkgeyByZXR1cm4gfVxuXG4gICAgdmFyIGN1c3RvbVBhcmVudCA9IHRoaXMucGFyZW50ICYmIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG5cbiAgICAvLyBpZiB0aGUgcmVmZXJlbmNlZCBlbGVtZW50IGlzIGEgY3VzdG9tIHRhZywgdGhlbiB3ZSBzZXQgdGhlIHRhZyBpdHNlbGYsIHJhdGhlciB0aGFuIERPTVxuICAgIHZhciB0YWdPckRvbSA9IHRoaXMudGFnIHx8IHRoaXMuZG9tO1xuXG4gICAgLy8gdGhlIG5hbWUgY2hhbmdlZCwgc28gd2UgbmVlZCB0byByZW1vdmUgaXQgZnJvbSB0aGUgb2xkIGtleSAoaWYgcHJlc2VudClcbiAgICBpZiAoIWlzQmxhbmsodGhpcy52YWx1ZSkgJiYgY3VzdG9tUGFyZW50KVxuICAgICAgeyBhcnJheWlzaFJlbW92ZShjdXN0b21QYXJlbnQucmVmcywgdGhpcy52YWx1ZSwgdGFnT3JEb20pOyB9XG5cbiAgICBpZiAoaXNCbGFuayh2YWx1ZSkpIHtcbiAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBibGFuaywgd2UgcmVtb3ZlIGl0XG4gICAgICByZW1BdHRyKHRoaXMuZG9tLCB0aGlzLmF0dHIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBhZGQgaXQgdG8gdGhlIHJlZnMgb2YgcGFyZW50IHRhZyAodGhpcyBiZWhhdmlvciB3YXMgY2hhbmdlZCA+PTMuMClcbiAgICAgIGlmIChjdXN0b21QYXJlbnQpIHsgYXJyYXlpc2hBZGQoY3VzdG9tUGFyZW50LnJlZnMsIHZhbHVlLCB0YWdPckRvbSk7IH1cbiAgICAgIC8vIHNldCB0aGUgYWN0dWFsIERPTSBhdHRyXG4gICAgICBzZXRBdHRyKHRoaXMuZG9tLCB0aGlzLmF0dHIsIHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuZmlyc3RSdW4gPSBmYWxzZTtcbiAgfSxcbiAgdW5tb3VudDogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB2YXIgdGFnT3JEb20gPSB0aGlzLnRhZyB8fCB0aGlzLmRvbTtcbiAgICB2YXIgY3VzdG9tUGFyZW50ID0gdGhpcy5wYXJlbnQgJiYgZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcbiAgICBpZiAoIWlzQmxhbmsodGhpcy52YWx1ZSkgJiYgY3VzdG9tUGFyZW50KVxuICAgICAgeyBhcnJheWlzaFJlbW92ZShjdXN0b21QYXJlbnQucmVmcywgdGhpcy52YWx1ZSwgdGFnT3JEb20pOyB9XG4gICAgZGVsZXRlIHRoaXMuZG9tO1xuICAgIGRlbGV0ZSB0aGlzLnBhcmVudDtcbiAgfVxufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRoZSBpdGVtIGxvb3BlZCBpbnRvIGFuIG9iamVjdCB1c2VkIHRvIGV4dGVuZCB0aGUgY2hpbGQgdGFnIHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZXhwciAtIG9iamVjdCBjb250YWluaW5nIHRoZSBrZXlzIHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZHJlbiB0YWdzXG4gKiBAcGFyYW0gICB7ICogfSBrZXkgLSB2YWx1ZSB0byBhc3NpZ24gdG8gdGhlIG5ldyBvYmplY3QgcmV0dXJuZWRcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbCAtIHZhbHVlIGNvbnRhaW5pbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBpdGVtIGluIHRoZSBhcnJheVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBiYXNlIC0gcHJvdG90eXBlIG9iamVjdCBmb3IgdGhlIG5ldyBpdGVtXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gbmV3IG9iamVjdCBjb250YWluaW5nIHRoZSB2YWx1ZXMgb2YgdGhlIG9yaWdpbmFsIGl0ZW1cbiAqXG4gKiBUaGUgdmFyaWFibGVzICdrZXknIGFuZCAndmFsJyBhcmUgYXJiaXRyYXJ5LlxuICogVGhleSBkZXBlbmQgb24gdGhlIGNvbGxlY3Rpb24gdHlwZSBsb29wZWQgKEFycmF5LCBPYmplY3QpXG4gKiBhbmQgb24gdGhlIGV4cHJlc3Npb24gdXNlZCBvbiB0aGUgZWFjaCB0YWdcbiAqXG4gKi9cbmZ1bmN0aW9uIG1raXRlbShleHByLCBrZXksIHZhbCwgYmFzZSkge1xuICB2YXIgaXRlbSA9IGJhc2UgPyBPYmplY3QuY3JlYXRlKGJhc2UpIDoge307XG4gIGl0ZW1bZXhwci5rZXldID0ga2V5O1xuICBpZiAoZXhwci5wb3MpIHsgaXRlbVtleHByLnBvc10gPSB2YWw7IH1cbiAgcmV0dXJuIGl0ZW1cbn1cblxuLyoqXG4gKiBVbm1vdW50IHRoZSByZWR1bmRhbnQgdGFnc1xuICogQHBhcmFtICAgeyBBcnJheSB9IGl0ZW1zIC0gYXJyYXkgY29udGFpbmluZyB0aGUgY3VycmVudCBpdGVtcyB0byBsb29wXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gdGFncyAtIGFycmF5IGNvbnRhaW5pbmcgYWxsIHRoZSBjaGlsZHJlbiB0YWdzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSBrZXkgdXNlZCB0byBpZGVudGlmeSB0aGUgdHlwZSBvZiB0YWdcbiAqL1xuZnVuY3Rpb24gdW5tb3VudFJlZHVuZGFudChpdGVtcywgdGFncywgdGFnTmFtZSkge1xuICB2YXIgaSA9IHRhZ3MubGVuZ3RoLFxuICAgIGogPSBpdGVtcy5sZW5ndGgsXG4gICAgdDtcblxuICB3aGlsZSAoaSA+IGopIHtcbiAgICB0ID0gdGFnc1stLWldO1xuICAgIHRhZ3Muc3BsaWNlKGksIDEpO1xuICAgIHQudW5tb3VudCgpO1xuICAgIGFycmF5aXNoUmVtb3ZlKHQucGFyZW50LCB0YWdOYW1lLCB0LCB0cnVlKTtcbiAgfVxufVxuXG4vKipcbiAqIE1vdmUgdGhlIG5lc3RlZCBjdXN0b20gdGFncyBpbiBub24gY3VzdG9tIGxvb3AgdGFnc1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IGkgLSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBsb29wIHRhZ1xuICovXG5mdW5jdGlvbiBtb3ZlTmVzdGVkVGFncyhpKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGhpcy50YWdzKSwgZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICB2YXIgdGFnID0gdGhpcyQxLnRhZ3NbdGFnTmFtZV07XG4gICAgaWYgKGlzQXJyYXkodGFnKSlcbiAgICAgIHsgZWFjaCh0YWcsIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgIG1vdmVDaGlsZFRhZy5hcHBseSh0LCBbdGFnTmFtZSwgaV0pO1xuICAgICAgfSk7IH1cbiAgICBlbHNlXG4gICAgICB7IG1vdmVDaGlsZFRhZy5hcHBseSh0YWcsIFt0YWdOYW1lLCBpXSk7IH1cbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSBhIGNoaWxkIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IFRhZyB9IG5leHRUYWcgLSBpbnN0YW5jZSBvZiB0aGUgbmV4dCB0YWcgcHJlY2VkaW5nIHRoZSBvbmUgd2Ugd2FudCB0byBtb3ZlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBtb3ZlKHJvb3QsIG5leHRUYWcsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbW92ZVZpcnR1YWwuYXBwbHkodGhpcywgW3Jvb3QsIG5leHRUYWddKTsgfVxuICBlbHNlXG4gICAgeyBzYWZlSW5zZXJ0KHJvb3QsIHRoaXMucm9vdCwgbmV4dFRhZy5yb290KTsgfVxufVxuXG4vKipcbiAqIEluc2VydCBhbmQgbW91bnQgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBUYWcgfSBuZXh0VGFnIC0gaW5zdGFuY2Ugb2YgdGhlIG5leHQgdGFnIHByZWNlZGluZyB0aGUgb25lIHdlIHdhbnQgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBpbnNlcnQocm9vdCwgbmV4dFRhZywgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlVmlydHVhbC5hcHBseSh0aGlzLCBbcm9vdCwgbmV4dFRhZ10pOyB9XG4gIGVsc2VcbiAgICB7IHNhZmVJbnNlcnQocm9vdCwgdGhpcy5yb290LCBuZXh0VGFnLnJvb3QpOyB9XG59XG5cbi8qKlxuICogQXBwZW5kIGEgbmV3IHRhZyBpbnRvIHRoZSBET01cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gYXBwZW5kKHJvb3QsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVZpcnR1YWwuY2FsbCh0aGlzLCByb290KTsgfVxuICBlbHNlXG4gICAgeyByb290LmFwcGVuZENoaWxkKHRoaXMucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBNYW5hZ2UgdGFncyBoYXZpbmcgdGhlICdlYWNoJ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gbG9vcFxuICogQHBhcmFtICAgeyBUYWcgfSBwYXJlbnQgLSBwYXJlbnQgdGFnIGluc3RhbmNlIHdoZXJlIHRoZSBkb20gbm9kZSBpcyBjb250YWluZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXhwciAtIHN0cmluZyBjb250YWluZWQgaW4gdGhlICdlYWNoJyBhdHRyaWJ1dGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZXhwcmVzc2lvbiBvYmplY3QgZm9yIHRoaXMgZWFjaCBsb29wXG4gKi9cbmZ1bmN0aW9uIF9lYWNoKGRvbSwgcGFyZW50LCBleHByKSB7XG5cbiAgLy8gcmVtb3ZlIHRoZSBlYWNoIHByb3BlcnR5IGZyb20gdGhlIG9yaWdpbmFsIHRhZ1xuICByZW1BdHRyKGRvbSwgTE9PUF9ESVJFQ1RJVkUpO1xuXG4gIHZhciBtdXN0UmVvcmRlciA9IHR5cGVvZiBnZXRBdHRyKGRvbSwgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSkgIT09IFRfU1RSSU5HIHx8IHJlbUF0dHIoZG9tLCBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFKSxcbiAgICB0YWdOYW1lID0gZ2V0VGFnTmFtZShkb20pLFxuICAgIGltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdIHx8IHsgdG1wbDogZ2V0T3V0ZXJIVE1MKGRvbSkgfSxcbiAgICB1c2VSb290ID0gUkVfU1BFQ0lBTF9UQUdTLnRlc3QodGFnTmFtZSksXG4gICAgcGFyZW50Tm9kZSA9IGRvbS5wYXJlbnROb2RlLFxuICAgIHJlZiA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBpZkV4cHIgPSBnZXRBdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKSxcbiAgICB0YWdzID0gW10sXG4gICAgb2xkSXRlbXMgPSBbXSxcbiAgICBoYXNLZXlzLFxuICAgIGlzTG9vcCA9IHRydWUsXG4gICAgaXNBbm9ueW1vdXMgPSAhX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBpc1ZpcnR1YWwgPSBkb20udGFnTmFtZSA9PT0gJ1ZJUlRVQUwnO1xuXG4gIC8vIHBhcnNlIHRoZSBlYWNoIGV4cHJlc3Npb25cbiAgZXhwciA9IHRtcGwubG9vcEtleXMoZXhwcik7XG4gIGV4cHIuaXNMb29wID0gdHJ1ZTtcblxuICBpZiAoaWZFeHByKSB7IHJlbUF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpOyB9XG5cbiAgLy8gaW5zZXJ0IGEgbWFya2VkIHdoZXJlIHRoZSBsb29wIHRhZ3Mgd2lsbCBiZSBpbmplY3RlZFxuICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShyZWYsIGRvbSk7XG4gIHBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZG9tKTtcblxuICBleHByLnVwZGF0ZSA9IGZ1bmN0aW9uIHVwZGF0ZUVhY2goKSB7XG5cbiAgICAvLyBnZXQgdGhlIG5ldyBpdGVtcyBjb2xsZWN0aW9uXG4gICAgdmFyIGl0ZW1zID0gdG1wbChleHByLnZhbCwgcGFyZW50KSxcbiAgICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgICBpc09iamVjdCQkMSA9ICFpc0FycmF5KGl0ZW1zKSxcbiAgICAgIHJvb3QgPSByZWYucGFyZW50Tm9kZTtcblxuICAgIC8vIG9iamVjdCBsb29wLiBhbnkgY2hhbmdlcyBjYXVzZSBmdWxsIHJlZHJhd1xuICAgIGlmIChpc09iamVjdCQkMSkge1xuICAgICAgaGFzS2V5cyA9IGl0ZW1zIHx8IGZhbHNlO1xuICAgICAgaXRlbXMgPSBoYXNLZXlzID9cbiAgICAgICAgT2JqZWN0LmtleXMoaXRlbXMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIG1raXRlbShleHByLCBpdGVtc1trZXldLCBrZXkpXG4gICAgICAgIH0pIDogW107XG4gICAgfSBlbHNlIHtcbiAgICAgIGhhc0tleXMgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaWZFeHByKSB7XG4gICAgICBpdGVtcyA9IGl0ZW1zLmZpbHRlcihmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAgIGlmIChleHByLmtleSAmJiAhaXNPYmplY3QkJDEpXG4gICAgICAgICAgeyByZXR1cm4gISF0bXBsKGlmRXhwciwgbWtpdGVtKGV4cHIsIGl0ZW0sIGksIHBhcmVudCkpIH1cblxuICAgICAgICByZXR1cm4gISF0bXBsKGlmRXhwciwgZXh0ZW5kKE9iamVjdC5jcmVhdGUocGFyZW50KSwgaXRlbSkpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsb29wIGFsbCB0aGUgbmV3IGl0ZW1zXG4gICAgZWFjaChpdGVtcywgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgLy8gcmVvcmRlciBvbmx5IGlmIHRoZSBpdGVtcyBhcmUgb2JqZWN0c1xuICAgICAgdmFyXG4gICAgICAgIGRvUmVvcmRlciA9IG11c3RSZW9yZGVyICYmIHR5cGVvZiBpdGVtID09PSBUX09CSkVDVCAmJiAhaGFzS2V5cyxcbiAgICAgICAgb2xkUG9zID0gb2xkSXRlbXMuaW5kZXhPZihpdGVtKSxcbiAgICAgICAgaXNOZXcgPSAhfm9sZFBvcyxcbiAgICAgICAgbXVzdEFwcGVuZCA9IGkgPD0gdGFncy5sZW5ndGgsXG4gICAgICAgIHBvcyA9ICFpc05ldyAmJiBkb1Jlb3JkZXIgPyBvbGRQb3MgOiBpLFxuICAgICAgICAvLyBkb2VzIGEgdGFnIGV4aXN0IGluIHRoaXMgcG9zaXRpb24/XG4gICAgICAgIHRhZyA9IHRhZ3NbcG9zXTtcblxuICAgICAgaXRlbSA9ICFoYXNLZXlzICYmIGV4cHIua2V5ID8gbWtpdGVtKGV4cHIsIGl0ZW0sIGkpIDogaXRlbTtcblxuICAgICAgLy8gbmV3IHRhZ1xuICAgICAgaWYgKFxuICAgICAgICBkb1Jlb3JkZXIgJiYgaXNOZXcgLy8gYnkgZGVmYXVsdCB3ZSBhbHdheXMgdHJ5IHRvIHJlb3JkZXIgdGhlIERPTSBlbGVtZW50c1xuICAgICAgICB8fFxuICAgICAgICAhZG9SZW9yZGVyICYmICF0YWcgLy8gd2l0aCBuby1yZW9yZGVyIHdlIGp1c3QgdXBkYXRlIHRoZSBvbGQgdGFnc1xuICAgICAgKSB7XG4gICAgICAgIHRhZyA9IG5ldyBUYWckMShpbXBsLCB7XG4gICAgICAgICAgcGFyZW50OiBwYXJlbnQsXG4gICAgICAgICAgaXNMb29wOiBpc0xvb3AsXG4gICAgICAgICAgaXNBbm9ueW1vdXM6IGlzQW5vbnltb3VzLFxuICAgICAgICAgIHJvb3Q6IHVzZVJvb3QgPyByb290IDogZG9tLmNsb25lTm9kZSgpLFxuICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSwgZG9tLmlubmVySFRNTCk7XG5cbiAgICAgICAgLy8gbW91bnQgdGhlIHRhZ1xuICAgICAgICB0YWcubW91bnQoKTtcblxuICAgICAgICBpZiAobXVzdEFwcGVuZClcbiAgICAgICAgICB7IGFwcGVuZC5hcHBseSh0YWcsIFtmcmFnIHx8IHJvb3QsIGlzVmlydHVhbF0pOyB9XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB7IGluc2VydC5hcHBseSh0YWcsIFtyb290LCB0YWdzW2ldLCBpc1ZpcnR1YWxdKTsgfVxuXG4gICAgICAgIGlmICghbXVzdEFwcGVuZCkgeyBvbGRJdGVtcy5zcGxpY2UoaSwgMCwgaXRlbSk7IH1cbiAgICAgICAgdGFncy5zcGxpY2UoaSwgMCwgdGFnKTtcbiAgICAgICAgaWYgKGNoaWxkKSB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0YWcsIHRydWUpOyB9XG4gICAgICAgIHBvcyA9IGk7IC8vIGhhbmRsZWQgaGVyZSBzbyBubyBtb3ZlXG4gICAgICB9IGVsc2UgeyB0YWcudXBkYXRlKGl0ZW0pOyB9XG5cbiAgICAgIC8vIHJlb3JkZXIgdGhlIHRhZyBpZiBpdCdzIG5vdCBsb2NhdGVkIGluIGl0cyBwcmV2aW91cyBwb3NpdGlvblxuICAgICAgaWYgKHBvcyAhPT0gaSAmJiBkb1Jlb3JkZXIpIHtcbiAgICAgICAgLy8gI2Nsb3NlcyAyMDQwXG4gICAgICAgIGlmIChjb250YWlucyhpdGVtcywgb2xkSXRlbXNbaV0pKSB7XG4gICAgICAgICAgbW92ZS5hcHBseSh0YWcsIFtyb290LCB0YWdzW2ldLCBpc1ZpcnR1YWxdKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB1cGRhdGUgdGhlIHBvc2l0aW9uIGF0dHJpYnV0ZSBpZiBpdCBleGlzdHNcbiAgICAgICAgaWYgKGV4cHIucG9zKSB7IHRhZ1tleHByLnBvc10gPSBpOyB9XG4gICAgICAgIC8vIG1vdmUgdGhlIG9sZCB0YWcgaW5zdGFuY2VcbiAgICAgICAgdGFncy5zcGxpY2UoaSwgMCwgdGFncy5zcGxpY2UocG9zLCAxKVswXSk7XG4gICAgICAgIC8vIG1vdmUgdGhlIG9sZCBpdGVtXG4gICAgICAgIG9sZEl0ZW1zLnNwbGljZShpLCAwLCBvbGRJdGVtcy5zcGxpY2UocG9zLCAxKVswXSk7XG4gICAgICAgIC8vIGlmIHRoZSBsb29wIHRhZ3MgYXJlIG5vdCBjdXN0b21cbiAgICAgICAgLy8gd2UgbmVlZCB0byBtb3ZlIGFsbCB0aGVpciBjdXN0b20gdGFncyBpbnRvIHRoZSByaWdodCBwb3NpdGlvblxuICAgICAgICBpZiAoIWNoaWxkICYmIHRhZy50YWdzKSB7IG1vdmVOZXN0ZWRUYWdzLmNhbGwodGFnLCBpKTsgfVxuICAgICAgfVxuXG4gICAgICAvLyBjYWNoZSB0aGUgb3JpZ2luYWwgaXRlbSB0byB1c2UgaXQgaW4gdGhlIGV2ZW50cyBib3VuZCB0byB0aGlzIG5vZGVcbiAgICAgIC8vIGFuZCBpdHMgY2hpbGRyZW5cbiAgICAgIHRhZy5faXRlbSA9IGl0ZW07XG4gICAgICAvLyBjYWNoZSB0aGUgcmVhbCBwYXJlbnQgdGFnIGludGVybmFsbHlcbiAgICAgIGRlZmluZVByb3BlcnR5KHRhZywgJ19wYXJlbnQnLCBwYXJlbnQpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIHRoZSByZWR1bmRhbnQgdGFnc1xuICAgIHVubW91bnRSZWR1bmRhbnQoaXRlbXMsIHRhZ3MsIHRhZ05hbWUpO1xuXG4gICAgLy8gY2xvbmUgdGhlIGl0ZW1zIGFycmF5XG4gICAgb2xkSXRlbXMgPSBpdGVtcy5zbGljZSgpO1xuXG4gICAgcm9vdC5pbnNlcnRCZWZvcmUoZnJhZywgcmVmKTtcbiAgfTtcblxuICBleHByLnVubW91bnQgPSBmdW5jdGlvbigpIHtcbiAgICBlYWNoKHRhZ3MsIGZ1bmN0aW9uKHQpIHsgdC51bm1vdW50KCk7IH0pO1xuICB9O1xuXG4gIHJldHVybiBleHByXG59XG5cbi8qKlxuICogV2FsayB0aGUgdGFnIERPTSB0byBkZXRlY3QgdGhlIGV4cHJlc3Npb25zIHRvIGV2YWx1YXRlXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gcm9vdCB0YWcgd2hlcmUgd2Ugd2lsbCBzdGFydCBkaWdnaW5nIHRoZSBleHByZXNzaW9uc1xuICogQHBhcmFtICAgeyBBcnJheSB9IGV4cHJlc3Npb25zIC0gZW1wdHkgYXJyYXkgd2hlcmUgdGhlIGV4cHJlc3Npb25zIHdpbGwgYmUgYWRkZWRcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IG11c3RJbmNsdWRlUm9vdCAtIGZsYWcgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIHJvb3QgbXVzdCBiZSBwYXJzZWQgYXMgd2VsbFxuICogQHJldHVybnMgeyBPYmplY3QgfSBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgcm9vdCBub29kZSBhbmQgdGhlIGRvbSB0cmVlXG4gKi9cbmZ1bmN0aW9uIHBhcnNlRXhwcmVzc2lvbnMocm9vdCwgZXhwcmVzc2lvbnMsIG11c3RJbmNsdWRlUm9vdCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgdHJlZSA9IHtwYXJlbnQ6IHtjaGlsZHJlbjogZXhwcmVzc2lvbnN9fTtcblxuICB3YWxrTm9kZXMocm9vdCwgZnVuY3Rpb24gKGRvbSwgY3R4KSB7XG4gICAgdmFyIHR5cGUgPSBkb20ubm9kZVR5cGUsIHBhcmVudCA9IGN0eC5wYXJlbnQsIGF0dHIsIGV4cHIsIHRhZ0ltcGw7XG4gICAgaWYgKCFtdXN0SW5jbHVkZVJvb3QgJiYgZG9tID09PSByb290KSB7IHJldHVybiB7cGFyZW50OiBwYXJlbnR9IH1cblxuICAgIC8vIHRleHQgbm9kZVxuICAgIGlmICh0eXBlID09PSAzICYmIGRvbS5wYXJlbnROb2RlLnRhZ05hbWUgIT09ICdTVFlMRScgJiYgdG1wbC5oYXNFeHByKGRvbS5ub2RlVmFsdWUpKVxuICAgICAgeyBwYXJlbnQuY2hpbGRyZW4ucHVzaCh7ZG9tOiBkb20sIGV4cHI6IGRvbS5ub2RlVmFsdWV9KTsgfVxuXG4gICAgaWYgKHR5cGUgIT09IDEpIHsgcmV0dXJuIGN0eCB9IC8vIG5vdCBhbiBlbGVtZW50XG5cbiAgICAvLyBsb29wLiBlYWNoIGRvZXMgaXQncyBvd24gdGhpbmcgKGZvciBub3cpXG4gICAgaWYgKGF0dHIgPSBnZXRBdHRyKGRvbSwgTE9PUF9ESVJFQ1RJVkUpKSB7XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChfZWFjaChkb20sIHRoaXMkMSwgYXR0cikpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gaWYtYXR0cnMgYmVjb21lIHRoZSBuZXcgcGFyZW50LiBBbnkgZm9sbG93aW5nIGV4cHJlc3Npb25zIChlaXRoZXIgb24gdGhlIGN1cnJlbnRcbiAgICAvLyBlbGVtZW50LCBvciBiZWxvdyBpdCkgYmVjb21lIGNoaWxkcmVuIG9mIHRoaXMgZXhwcmVzc2lvbi5cbiAgICBpZiAoYXR0ciA9IGdldEF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpKSB7XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChPYmplY3QuY3JlYXRlKElmRXhwcikuaW5pdChkb20sIHRoaXMkMSwgYXR0cikpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgaWYgKGV4cHIgPSBnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSkge1xuICAgICAgaWYgKHRtcGwuaGFzRXhwcihleHByKSkge1xuICAgICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaCh7aXNSdGFnOiB0cnVlLCBleHByOiBleHByLCBkb206IGRvbSwgYXR0cnM6IFtdLnNsaWNlLmNhbGwoZG9tLmF0dHJpYnV0ZXMpfSk7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGlmIHRoaXMgaXMgYSB0YWcsIHN0b3AgdHJhdmVyc2luZyBoZXJlLlxuICAgIC8vIHdlIGlnbm9yZSB0aGUgcm9vdCwgc2luY2UgcGFyc2VFeHByZXNzaW9ucyBpcyBjYWxsZWQgd2hpbGUgd2UncmUgbW91bnRpbmcgdGhhdCByb290XG4gICAgdGFnSW1wbCA9IGdldFRhZyhkb20pO1xuICAgIGlmICh0YWdJbXBsICYmIChkb20gIT09IHJvb3QgfHwgbXVzdEluY2x1ZGVSb290KSkge1xuICAgICAgdmFyIGNvbmYgPSB7cm9vdDogZG9tLCBwYXJlbnQ6IHRoaXMkMSwgaGFzSW1wbDogdHJ1ZX07XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChpbml0Q2hpbGRUYWcodGFnSW1wbCwgY29uZiwgZG9tLmlubmVySFRNTCwgdGhpcyQxKSk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBhdHRyaWJ1dGUgZXhwcmVzc2lvbnNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkodGhpcyQxLCBbZG9tLCBkb20uYXR0cmlidXRlcywgZnVuY3Rpb24oYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFleHByKSB7IHJldHVybiB9XG4gICAgICBwYXJlbnQuY2hpbGRyZW4ucHVzaChleHByKTtcbiAgICB9XSk7XG5cbiAgICAvLyB3aGF0ZXZlciB0aGUgcGFyZW50IGlzLCBhbGwgY2hpbGQgZWxlbWVudHMgZ2V0IHRoZSBzYW1lIHBhcmVudC5cbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFkIGFuIGlmLWF0dHIsIHRoYXQncyB0aGUgcGFyZW50IGZvciBhbGwgY2hpbGQgZWxlbWVudHNcbiAgICByZXR1cm4ge3BhcmVudDogcGFyZW50fVxuICB9LCB0cmVlKTtcblxuICByZXR1cm4geyB0cmVlOiB0cmVlLCByb290OiByb290IH1cbn1cblxuLyoqXG4gKiBDYWxscyBgZm5gIGZvciBldmVyeSBhdHRyaWJ1dGUgb24gYW4gZWxlbWVudC4gSWYgdGhhdCBhdHRyIGhhcyBhbiBleHByZXNzaW9uLFxuICogaXQgaXMgYWxzbyBwYXNzZWQgdG8gZm4uXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBkb20gbm9kZSB0byBwYXJzZVxuICogQHBhcmFtICAgeyBBcnJheSB9IGF0dHJzIC0gYXJyYXkgb2YgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gZXhlYyBvbiBhbnkgaXRlcmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQXR0cmlidXRlcyhkb20sIGF0dHJzLCBmbikge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKGF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgIHZhciBuYW1lID0gYXR0ci5uYW1lLCBib29sID0gaXNCb29sQXR0cihuYW1lKSwgZXhwcjtcblxuICAgIGlmIChjb250YWlucyhSRUZfRElSRUNUSVZFUywgbmFtZSkpIHtcbiAgICAgIGV4cHIgPSAgT2JqZWN0LmNyZWF0ZShSZWZFeHByKS5pbml0KGRvbSwgdGhpcyQxLCBuYW1lLCBhdHRyLnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHRtcGwuaGFzRXhwcihhdHRyLnZhbHVlKSkge1xuICAgICAgZXhwciA9IHtkb206IGRvbSwgZXhwcjogYXR0ci52YWx1ZSwgYXR0cjogYXR0ci5uYW1lLCBib29sOiBib29sfTtcbiAgICB9XG5cbiAgICBmbihhdHRyLCBleHByKTtcbiAgfSk7XG59XG5cbi8qXG4gIEluY2x1ZGVzIGhhY2tzIG5lZWRlZCBmb3IgdGhlIEludGVybmV0IEV4cGxvcmVyIHZlcnNpb24gOSBhbmQgYmVsb3dcbiAgU2VlOiBodHRwOi8va2FuZ2F4LmdpdGh1Yi5pby9jb21wYXQtdGFibGUvZXM1LyNpZThcbiAgICAgICBodHRwOi8vY29kZXBsYW5ldC5pby9kcm9wcGluZy1pZTgvXG4qL1xuXG52YXIgcmVIYXNZaWVsZCAgPSAvPHlpZWxkXFxiL2k7XG52YXIgcmVZaWVsZEFsbCAgPSAvPHlpZWxkXFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+fD4pL2lnO1xudmFyIHJlWWllbGRTcmMgID0gLzx5aWVsZFxccyt0bz1bJ1wiXShbXidcIj5dKilbJ1wiXVxccyo+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj4vaWc7XG52YXIgcmVZaWVsZERlc3QgPSAvPHlpZWxkXFxzK2Zyb209WydcIl0/KFstXFx3XSspWydcIl0/XFxzKig/OlxcLz58PihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+KS9pZztcbnZhciByb290RWxzID0geyB0cjogJ3Rib2R5JywgdGg6ICd0cicsIHRkOiAndHInLCBjb2w6ICdjb2xncm91cCcgfTtcbnZhciB0YmxUYWdzID0gSUVfVkVSU0lPTiAmJiBJRV9WRVJTSU9OIDwgMTAgPyBSRV9TUEVDSUFMX1RBR1MgOiBSRV9TUEVDSUFMX1RBR1NfTk9fT1BUSU9OO1xudmFyIEdFTkVSSUMgPSAnZGl2JztcblxuXG4vKlxuICBDcmVhdGVzIHRoZSByb290IGVsZW1lbnQgZm9yIHRhYmxlIG9yIHNlbGVjdCBjaGlsZCBlbGVtZW50czpcbiAgdHIvdGgvdGQvdGhlYWQvdGZvb3QvdGJvZHkvY2FwdGlvbi9jb2wvY29sZ3JvdXAvb3B0aW9uL29wdGdyb3VwXG4qL1xuZnVuY3Rpb24gc3BlY2lhbFRhZ3MoZWwsIHRtcGwsIHRhZ05hbWUpIHtcblxuICB2YXJcbiAgICBzZWxlY3QgPSB0YWdOYW1lWzBdID09PSAnbycsXG4gICAgcGFyZW50ID0gc2VsZWN0ID8gJ3NlbGVjdD4nIDogJ3RhYmxlPic7XG5cbiAgLy8gdHJpbSgpIGlzIGltcG9ydGFudCBoZXJlLCB0aGlzIGVuc3VyZXMgd2UgZG9uJ3QgaGF2ZSBhcnRpZmFjdHMsXG4gIC8vIHNvIHdlIGNhbiBjaGVjayBpZiB3ZSBoYXZlIG9ubHkgb25lIGVsZW1lbnQgaW5zaWRlIHRoZSBwYXJlbnRcbiAgZWwuaW5uZXJIVE1MID0gJzwnICsgcGFyZW50ICsgdG1wbC50cmltKCkgKyAnPC8nICsgcGFyZW50O1xuICBwYXJlbnQgPSBlbC5maXJzdENoaWxkO1xuXG4gIC8vIHJldHVybnMgdGhlIGltbWVkaWF0ZSBwYXJlbnQgaWYgdHIvdGgvdGQvY29sIGlzIHRoZSBvbmx5IGVsZW1lbnQsIGlmIG5vdFxuICAvLyByZXR1cm5zIHRoZSB3aG9sZSB0cmVlLCBhcyB0aGlzIGNhbiBpbmNsdWRlIGFkZGl0aW9uYWwgZWxlbWVudHNcbiAgaWYgKHNlbGVjdCkge1xuICAgIHBhcmVudC5zZWxlY3RlZEluZGV4ID0gLTE7ICAvLyBmb3IgSUU5LCBjb21wYXRpYmxlIHcvY3VycmVudCByaW90IGJlaGF2aW9yXG4gIH0gZWxzZSB7XG4gICAgLy8gYXZvaWRzIGluc2VydGlvbiBvZiBjb2ludGFpbmVyIGluc2lkZSBjb250YWluZXIgKGV4OiB0Ym9keSBpbnNpZGUgdGJvZHkpXG4gICAgdmFyIHRuYW1lID0gcm9vdEVsc1t0YWdOYW1lXTtcbiAgICBpZiAodG5hbWUgJiYgcGFyZW50LmNoaWxkRWxlbWVudENvdW50ID09PSAxKSB7IHBhcmVudCA9ICQodG5hbWUsIHBhcmVudCk7IH1cbiAgfVxuICByZXR1cm4gcGFyZW50XG59XG5cbi8qXG4gIFJlcGxhY2UgdGhlIHlpZWxkIHRhZyBmcm9tIGFueSB0YWcgdGVtcGxhdGUgd2l0aCB0aGUgaW5uZXJIVE1MIG9mIHRoZVxuICBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiovXG5mdW5jdGlvbiByZXBsYWNlWWllbGQodG1wbCwgaHRtbCkge1xuICAvLyBkbyBub3RoaW5nIGlmIG5vIHlpZWxkXG4gIGlmICghcmVIYXNZaWVsZC50ZXN0KHRtcGwpKSB7IHJldHVybiB0bXBsIH1cblxuICAvLyBiZSBjYXJlZnVsIHdpdGggIzEzNDMgLSBzdHJpbmcgb24gdGhlIHNvdXJjZSBoYXZpbmcgYCQxYFxuICB2YXIgc3JjID0ge307XG5cbiAgaHRtbCA9IGh0bWwgJiYgaHRtbC5yZXBsYWNlKHJlWWllbGRTcmMsIGZ1bmN0aW9uIChfLCByZWYsIHRleHQpIHtcbiAgICBzcmNbcmVmXSA9IHNyY1tyZWZdIHx8IHRleHQ7ICAgLy8gcHJlc2VydmUgZmlyc3QgZGVmaW5pdGlvblxuICAgIHJldHVybiAnJ1xuICB9KS50cmltKCk7XG5cbiAgcmV0dXJuIHRtcGxcbiAgICAucmVwbGFjZShyZVlpZWxkRGVzdCwgZnVuY3Rpb24gKF8sIHJlZiwgZGVmKSB7ICAvLyB5aWVsZCB3aXRoIGZyb20gLSB0byBhdHRyc1xuICAgICAgcmV0dXJuIHNyY1tyZWZdIHx8IGRlZiB8fCAnJ1xuICAgIH0pXG4gICAgLnJlcGxhY2UocmVZaWVsZEFsbCwgZnVuY3Rpb24gKF8sIGRlZikgeyAgICAgICAgLy8geWllbGQgd2l0aG91dCBhbnkgXCJmcm9tXCJcbiAgICAgIHJldHVybiBodG1sIHx8IGRlZiB8fCAnJ1xuICAgIH0pXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIERPTSBlbGVtZW50IHRvIHdyYXAgdGhlIGdpdmVuIGNvbnRlbnQuIE5vcm1hbGx5IGFuIGBESVZgLCBidXQgY2FuIGJlXG4gKiBhbHNvIGEgYFRBQkxFYCwgYFNFTEVDVGAsIGBUQk9EWWAsIGBUUmAsIG9yIGBDT0xHUk9VUGAgZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRtcGwgIC0gVGhlIHRlbXBsYXRlIGNvbWluZyBmcm9tIHRoZSBjdXN0b20gdGFnIGRlZmluaXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gaHRtbCAtIEhUTUwgY29udGVudCB0aGF0IGNvbWVzIGZyb20gdGhlIERPTSBlbGVtZW50IHdoZXJlIHlvdVxuICogICAgICAgICAgIHdpbGwgbW91bnQgdGhlIHRhZywgbW9zdGx5IHRoZSBvcmlnaW5hbCB0YWcgaW4gdGhlIHBhZ2VcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGNoZWNrU3ZnIC0gZmxhZyBuZWVkZWQgdG8ga25vdyBpZiB3ZSBuZWVkIHRvIGZvcmNlIHRoZSBzdmcgcmVuZGVyaW5nIGluIGNhc2Ugb2YgbG9vcCBub2Rlc1xuICogQHJldHVybnMgeyBIVE1MRWxlbWVudCB9IERPTSBlbGVtZW50IHdpdGggX3RtcGxfIG1lcmdlZCB0aHJvdWdoIGBZSUVMRGAgd2l0aCB0aGUgX2h0bWxfLlxuICovXG5mdW5jdGlvbiBta2RvbSh0bXBsLCBodG1sLCBjaGVja1N2Zykge1xuICB2YXIgbWF0Y2ggICA9IHRtcGwgJiYgdG1wbC5tYXRjaCgvXlxccyo8KFstXFx3XSspLyksXG4gICAgdGFnTmFtZSA9IG1hdGNoICYmIG1hdGNoWzFdLnRvTG93ZXJDYXNlKCksXG4gICAgZWwgPSBta0VsKEdFTkVSSUMsIGNoZWNrU3ZnICYmIGlzU1ZHVGFnKHRhZ05hbWUpKTtcblxuICAvLyByZXBsYWNlIGFsbCB0aGUgeWllbGQgdGFncyB3aXRoIHRoZSB0YWcgaW5uZXIgaHRtbFxuICB0bXBsID0gcmVwbGFjZVlpZWxkKHRtcGwsIGh0bWwpO1xuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIGlmICh0YmxUYWdzLnRlc3QodGFnTmFtZSkpXG4gICAgeyBlbCA9IHNwZWNpYWxUYWdzKGVsLCB0bXBsLCB0YWdOYW1lKTsgfVxuICBlbHNlXG4gICAgeyBzZXRJbm5lckhUTUwoZWwsIHRtcGwpOyB9XG5cbiAgZWwuc3R1YiA9IHRydWU7XG5cbiAgcmV0dXJuIGVsXG59XG5cbi8qKlxuICogQW5vdGhlciB3YXkgdG8gY3JlYXRlIGEgcmlvdCB0YWcgYSBiaXQgbW9yZSBlczYgZnJpZW5kbHlcbiAqIEBwYXJhbSB7IEhUTUxFbGVtZW50IH0gZWwgLSB0YWcgRE9NIHNlbGVjdG9yIG9yIERPTSBub2RlL3NcbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9wdHMgLSB0YWcgbG9naWNcbiAqIEByZXR1cm5zIHsgVGFnIH0gbmV3IHJpb3QgdGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIFRhZyQyKGVsLCBvcHRzKSB7XG4gIC8vIGdldCB0aGUgdGFnIHByb3BlcnRpZXMgZnJvbSB0aGUgY2xhc3MgY29uc3RydWN0b3JcbiAgdmFyIHJlZiA9IHRoaXM7XG4gIHZhciBuYW1lID0gcmVmLm5hbWU7XG4gIHZhciB0bXBsID0gcmVmLnRtcGw7XG4gIHZhciBjc3MgPSByZWYuY3NzO1xuICB2YXIgYXR0cnMgPSByZWYuYXR0cnM7XG4gIHZhciBvbkNyZWF0ZSA9IHJlZi5vbkNyZWF0ZTtcbiAgLy8gcmVnaXN0ZXIgYSBuZXcgdGFnIGFuZCBjYWNoZSB0aGUgY2xhc3MgcHJvdG90eXBlXG4gIGlmICghX19UQUdfSU1QTFtuYW1lXSkge1xuICAgIHRhZyQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIG9uQ3JlYXRlKTtcbiAgICAvLyBjYWNoZSB0aGUgY2xhc3MgY29uc3RydWN0b3JcbiAgICBfX1RBR19JTVBMW25hbWVdLmNsYXNzID0gdGhpcy5jb25zdHJ1Y3RvcjtcbiAgfVxuXG4gIC8vIG1vdW50IHRoZSB0YWcgdXNpbmcgdGhlIGNsYXNzIGluc3RhbmNlXG4gIG1vdW50VG8oZWwsIG5hbWUsIG9wdHMsIHRoaXMpO1xuICAvLyBpbmplY3QgdGhlIGNvbXBvbmVudCBjc3NcbiAgaWYgKGNzcykgeyBzdHlsZU1hbmFnZXIuaW5qZWN0KCk7IH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyByaW90IHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIG5hbWUgLSBuYW1lL2lkIG9mIHRoZSBuZXcgcmlvdCB0YWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICB0bXBsIC0gdGFnIHRlbXBsYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgY3NzIC0gY3VzdG9tIHRhZyBjc3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBhdHRycyAtIHJvb3QgdGFnIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIHVzZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZS9pZCBvZiB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiB0YWckMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBmbikge1xuICBpZiAoaXNGdW5jdGlvbihhdHRycykpIHtcbiAgICBmbiA9IGF0dHJzO1xuXG4gICAgaWYgKC9eW1xcd1xcLV0rXFxzPz0vLnRlc3QoY3NzKSkge1xuICAgICAgYXR0cnMgPSBjc3M7XG4gICAgICBjc3MgPSAnJztcbiAgICB9IGVsc2VcbiAgICAgIHsgYXR0cnMgPSAnJzsgfVxuICB9XG5cbiAgaWYgKGNzcykge1xuICAgIGlmIChpc0Z1bmN0aW9uKGNzcykpXG4gICAgICB7IGZuID0gY3NzOyB9XG4gICAgZWxzZVxuICAgICAgeyBzdHlsZU1hbmFnZXIuYWRkKGNzcyk7IH1cbiAgfVxuXG4gIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gIF9fVEFHX0lNUExbbmFtZV0gPSB7IG5hbWU6IG5hbWUsIHRtcGw6IHRtcGwsIGF0dHJzOiBhdHRycywgZm46IGZuIH07XG5cbiAgcmV0dXJuIG5hbWVcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb24gKGZvciB1c2UgYnkgdGhlIGNvbXBpbGVyKVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIG5hbWUgLSBuYW1lL2lkIG9mIHRoZSBuZXcgcmlvdCB0YWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICB0bXBsIC0gdGFnIHRlbXBsYXRlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgY3NzIC0gY3VzdG9tIHRhZyBjc3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBhdHRycyAtIHJvb3QgdGFnIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIHVzZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZS9pZCBvZiB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiB0YWcyJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGNzcylcbiAgICB7IHN0eWxlTWFuYWdlci5hZGQoY3NzLCBuYW1lKTsgfVxuXG4gIHZhciBleGlzdHMgPSAhIV9fVEFHX0lNUExbbmFtZV07XG4gIF9fVEFHX0lNUExbbmFtZV0gPSB7IG5hbWU6IG5hbWUsIHRtcGw6IHRtcGwsIGF0dHJzOiBhdHRycywgZm46IGZuIH07XG5cbiAgaWYgKGV4aXN0cyAmJiB1dGlsLmhvdFJlbG9hZGVyKVxuICAgIHsgdXRpbC5ob3RSZWxvYWRlcihuYW1lKTsgfVxuXG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogTW91bnQgYSB0YWcgdXNpbmcgYSBzcGVjaWZpYyB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgKiB9IHNlbGVjdG9yIC0gdGFnIERPTSBzZWxlY3RvciBvciBET00gbm9kZS9zXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSB0YWcgaW1wbGVtZW50YXRpb24gbmFtZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gbmV3IHRhZ3MgaW5zdGFuY2VzXG4gKi9cbmZ1bmN0aW9uIG1vdW50JDEoc2VsZWN0b3IsIHRhZ05hbWUsIG9wdHMpIHtcbiAgdmFyIHRhZ3MgPSBbXTtcblxuICBmdW5jdGlvbiBwdXNoVGFnc1RvKHJvb3QpIHtcbiAgICBpZiAocm9vdC50YWdOYW1lKSB7XG4gICAgICB2YXIgcmlvdFRhZyA9IGdldEF0dHIocm9vdCwgSVNfRElSRUNUSVZFKTtcblxuICAgICAgLy8gaGF2ZSB0YWdOYW1lPyBmb3JjZSByaW90LXRhZyB0byBiZSB0aGUgc2FtZVxuICAgICAgaWYgKHRhZ05hbWUgJiYgcmlvdFRhZyAhPT0gdGFnTmFtZSkge1xuICAgICAgICByaW90VGFnID0gdGFnTmFtZTtcbiAgICAgICAgc2V0QXR0cihyb290LCBJU19ESVJFQ1RJVkUsIHRhZ05hbWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFnJCQxID0gbW91bnRUbyhyb290LCByaW90VGFnIHx8IHJvb3QudGFnTmFtZS50b0xvd2VyQ2FzZSgpLCBvcHRzKTtcblxuICAgICAgaWYgKHRhZyQkMSlcbiAgICAgICAgeyB0YWdzLnB1c2godGFnJCQxKTsgfVxuICAgIH0gZWxzZSBpZiAocm9vdC5sZW5ndGgpXG4gICAgICB7IGVhY2gocm9vdCwgcHVzaFRhZ3NUbyk7IH0gLy8gYXNzdW1lIG5vZGVMaXN0XG4gIH1cblxuICAvLyBpbmplY3Qgc3R5bGVzIGludG8gRE9NXG4gIHN0eWxlTWFuYWdlci5pbmplY3QoKTtcblxuICBpZiAoaXNPYmplY3QodGFnTmFtZSkpIHtcbiAgICBvcHRzID0gdGFnTmFtZTtcbiAgICB0YWdOYW1lID0gMDtcbiAgfVxuXG4gIHZhciBlbGVtO1xuICB2YXIgYWxsVGFncztcblxuICAvLyBjcmF3bCB0aGUgRE9NIHRvIGZpbmQgdGhlIHRhZ1xuICBpZiAoaXNTdHJpbmcoc2VsZWN0b3IpKSB7XG4gICAgc2VsZWN0b3IgPSBzZWxlY3RvciA9PT0gJyonID9cbiAgICAgIC8vIHNlbGVjdCBhbGwgcmVnaXN0ZXJlZCB0YWdzXG4gICAgICAvLyAmIHRhZ3MgZm91bmQgd2l0aCB0aGUgcmlvdC10YWcgYXR0cmlidXRlIHNldFxuICAgICAgYWxsVGFncyA9IHNlbGVjdFRhZ3MoKSA6XG4gICAgICAvLyBvciBqdXN0IHRoZSBvbmVzIG5hbWVkIGxpa2UgdGhlIHNlbGVjdG9yXG4gICAgICBzZWxlY3RvciArIHNlbGVjdFRhZ3Moc2VsZWN0b3Iuc3BsaXQoLywgKi8pKTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0byBwYXNzIGFsd2F5cyBhIHNlbGVjdG9yXG4gICAgLy8gdG8gdGhlIHF1ZXJ5U2VsZWN0b3JBbGwgZnVuY3Rpb25cbiAgICBlbGVtID0gc2VsZWN0b3IgPyAkJChzZWxlY3RvcikgOiBbXTtcbiAgfVxuICBlbHNlXG4gICAgLy8gcHJvYmFibHkgeW91IGhhdmUgcGFzc2VkIGFscmVhZHkgYSB0YWcgb3IgYSBOb2RlTGlzdFxuICAgIHsgZWxlbSA9IHNlbGVjdG9yOyB9XG5cbiAgLy8gc2VsZWN0IGFsbCB0aGUgcmVnaXN0ZXJlZCBhbmQgbW91bnQgdGhlbSBpbnNpZGUgdGhlaXIgcm9vdCBlbGVtZW50c1xuICBpZiAodGFnTmFtZSA9PT0gJyonKSB7XG4gICAgLy8gZ2V0IGFsbCBjdXN0b20gdGFnc1xuICAgIHRhZ05hbWUgPSBhbGxUYWdzIHx8IHNlbGVjdFRhZ3MoKTtcbiAgICAvLyBpZiB0aGUgcm9vdCBlbHMgaXQncyBqdXN0IGEgc2luZ2xlIHRhZ1xuICAgIGlmIChlbGVtLnRhZ05hbWUpXG4gICAgICB7IGVsZW0gPSAkJCh0YWdOYW1lLCBlbGVtKTsgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gc2VsZWN0IGFsbCB0aGUgY2hpbGRyZW4gZm9yIGFsbCB0aGUgZGlmZmVyZW50IHJvb3QgZWxlbWVudHNcbiAgICAgIHZhciBub2RlTGlzdCA9IFtdO1xuXG4gICAgICBlYWNoKGVsZW0sIGZ1bmN0aW9uIChfZWwpIHsgcmV0dXJuIG5vZGVMaXN0LnB1c2goJCQodGFnTmFtZSwgX2VsKSk7IH0pO1xuXG4gICAgICBlbGVtID0gbm9kZUxpc3Q7XG4gICAgfVxuICAgIC8vIGdldCByaWQgb2YgdGhlIHRhZ05hbWVcbiAgICB0YWdOYW1lID0gMDtcbiAgfVxuXG4gIHB1c2hUYWdzVG8oZWxlbSk7XG5cbiAgcmV0dXJuIHRhZ3Ncbn1cblxuLy8gQ3JlYXRlIGEgbWl4aW4gdGhhdCBjb3VsZCBiZSBnbG9iYWxseSBzaGFyZWQgYWNyb3NzIGFsbCB0aGUgdGFnc1xudmFyIG1peGlucyA9IHt9O1xudmFyIGdsb2JhbHMgPSBtaXhpbnNbR0xPQkFMX01JWElOXSA9IHt9O1xudmFyIF9pZCA9IDA7XG5cbi8qKlxuICogQ3JlYXRlL1JldHVybiBhIG1peGluIGJ5IGl0cyBuYW1lXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICBuYW1lIC0gbWl4aW4gbmFtZSAoZ2xvYmFsIG1peGluIGlmIG9iamVjdClcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG1peCAtIG1peGluIGxvZ2ljXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBnIC0gaXMgZ2xvYmFsP1xuICogQHJldHVybnMgeyBPYmplY3QgfSAgdGhlIG1peGluIGxvZ2ljXG4gKi9cbmZ1bmN0aW9uIG1peGluJDEobmFtZSwgbWl4LCBnKSB7XG4gIC8vIFVubmFtZWQgZ2xvYmFsXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIG1peGluJDEoKFwiX191bm5hbWVkX1wiICsgKF9pZCsrKSksIG5hbWUsIHRydWUpO1xuICAgIHJldHVyblxuICB9XG5cbiAgdmFyIHN0b3JlID0gZyA/IGdsb2JhbHMgOiBtaXhpbnM7XG5cbiAgLy8gR2V0dGVyXG4gIGlmICghbWl4KSB7XG4gICAgaWYgKGlzVW5kZWZpbmVkKHN0b3JlW25hbWVdKSlcbiAgICAgIHsgdGhyb3cgbmV3IEVycm9yKCdVbnJlZ2lzdGVyZWQgbWl4aW46ICcgKyBuYW1lKSB9XG5cbiAgICByZXR1cm4gc3RvcmVbbmFtZV1cbiAgfVxuXG4gIC8vIFNldHRlclxuICBzdG9yZVtuYW1lXSA9IGlzRnVuY3Rpb24obWl4KSA/XG4gICAgZXh0ZW5kKG1peC5wcm90b3R5cGUsIHN0b3JlW25hbWVdIHx8IHt9KSAmJiBtaXggOlxuICAgIGV4dGVuZChzdG9yZVtuYW1lXSB8fCB7fSwgbWl4KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYWxsIHRoZSB0YWdzIGluc3RhbmNlcyBjcmVhdGVkXG4gKiBAcmV0dXJucyB7IEFycmF5IH0gYWxsIHRoZSB0YWdzIGluc3RhbmNlc1xuICovXG5mdW5jdGlvbiB1cGRhdGUkMSgpIHtcbiAgcmV0dXJuIGVhY2goX19UQUdTX0NBQ0hFLCBmdW5jdGlvbiAodGFnJCQxKSB7IHJldHVybiB0YWckJDEudXBkYXRlKCk7IH0pXG59XG5cbmZ1bmN0aW9uIHVucmVnaXN0ZXIkMShuYW1lKSB7XG4gIGRlbGV0ZSBfX1RBR19JTVBMW25hbWVdO1xufVxuXG4vLyBjb3VudGVyIHRvIGdpdmUgYSB1bmlxdWUgaWQgdG8gYWxsIHRoZSBUYWcgaW5zdGFuY2VzXG52YXIgX191aWQgPSAwO1xuXG4vKipcbiAqIFdlIG5lZWQgdG8gdXBkYXRlIG9wdHMgZm9yIHRoaXMgdGFnLiBUaGF0IHJlcXVpcmVzIHVwZGF0aW5nIHRoZSBleHByZXNzaW9uc1xuICogaW4gYW55IGF0dHJpYnV0ZXMgb24gdGhlIHRhZywgYW5kIHRoZW4gY29weWluZyB0aGUgcmVzdWx0IG9udG8gb3B0cy5cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAge0Jvb2xlYW59IGlzTG9vcCAtIGlzIGl0IGEgbG9vcCB0YWc/XG4gKiBAcGFyYW0gICB7IFRhZyB9ICBwYXJlbnQgLSBwYXJlbnQgdGFnIG5vZGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9ICBpc0Fub255bW91cyAtIGlzIGl0IGEgdGFnIHdpdGhvdXQgYW55IGltcGw/IChhIHRhZyBub3QgcmVnaXN0ZXJlZClcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9wdHMgLSB0YWcgb3B0aW9uc1xuICogQHBhcmFtICAgeyBBcnJheSB9ICBpbnN0QXR0cnMgLSB0YWcgYXR0cmlidXRlcyBhcnJheVxuICovXG5mdW5jdGlvbiB1cGRhdGVPcHRzKGlzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzKSB7XG4gIC8vIGlzQW5vbnltb3VzIGBlYWNoYCB0YWdzIHRyZWF0IGBkb21gIGFuZCBgcm9vdGAgZGlmZmVyZW50bHkuIEluIHRoaXMgY2FzZVxuICAvLyAoYW5kIG9ubHkgdGhpcyBjYXNlKSB3ZSBkb24ndCBuZWVkIHRvIGRvIHVwZGF0ZU9wdHMsIGJlY2F1c2UgdGhlIHJlZ3VsYXIgcGFyc2VcbiAgLy8gd2lsbCB1cGRhdGUgdGhvc2UgYXR0cnMuIFBsdXMsIGlzQW5vbnltb3VzIHRhZ3MgZG9uJ3QgbmVlZCBvcHRzIGFueXdheVxuICBpZiAoaXNMb29wICYmIGlzQW5vbnltb3VzKSB7IHJldHVybiB9XG5cbiAgdmFyIGN0eCA9ICFpc0Fub255bW91cyAmJiBpc0xvb3AgPyB0aGlzIDogcGFyZW50IHx8IHRoaXM7XG4gIGVhY2goaW5zdEF0dHJzLCBmdW5jdGlvbiAoYXR0cikge1xuICAgIGlmIChhdHRyLmV4cHIpIHsgdXBkYXRlQWxsRXhwcmVzc2lvbnMuY2FsbChjdHgsIFthdHRyLmV4cHJdKTsgfVxuICAgIG9wdHNbdG9DYW1lbChhdHRyLm5hbWUpXSA9IGF0dHIuZXhwciA/IGF0dHIuZXhwci52YWx1ZSA6IGF0dHIudmFsdWU7XG4gIH0pO1xufVxuXG5cbi8qKlxuICogVGFnIGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGltcGwgLSBpdCBjb250YWlucyB0aGUgdGFnIHRlbXBsYXRlLCBhbmQgbG9naWNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGNvbmYgLSB0YWcgb3B0aW9uc1xuICogQHBhcmFtIHsgU3RyaW5nIH0gaW5uZXJIVE1MIC0gaHRtbCB0aGF0IGV2ZW50dWFsbHkgd2UgbmVlZCB0byBpbmplY3QgaW4gdGhlIHRhZ1xuICovXG5mdW5jdGlvbiBUYWckMShpbXBsLCBjb25mLCBpbm5lckhUTUwpIHtcblxuICB2YXIgb3B0cyA9IGV4dGVuZCh7fSwgY29uZi5vcHRzKSxcbiAgICBwYXJlbnQgPSBjb25mLnBhcmVudCxcbiAgICBpc0xvb3AgPSBjb25mLmlzTG9vcCxcbiAgICBpc0Fub255bW91cyA9IGNvbmYuaXNBbm9ueW1vdXMsXG4gICAgaXRlbSA9IGNsZWFuVXBEYXRhKGNvbmYuaXRlbSksXG4gICAgaW5zdEF0dHJzID0gW10sIC8vIEFsbCBhdHRyaWJ1dGVzIG9uIHRoZSBUYWcgd2hlbiBpdCdzIGZpcnN0IHBhcnNlZFxuICAgIGltcGxBdHRycyA9IFtdLCAvLyBleHByZXNzaW9ucyBvbiB0aGlzIHR5cGUgb2YgVGFnXG4gICAgZXhwcmVzc2lvbnMgPSBbXSxcbiAgICByb290ID0gY29uZi5yb290LFxuICAgIHRhZ05hbWUgPSBjb25mLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShyb290KSxcbiAgICBpc1ZpcnR1YWwgPSB0YWdOYW1lID09PSAndmlydHVhbCcsXG4gICAgcHJvcHNJblN5bmNXaXRoUGFyZW50ID0gW10sXG4gICAgZG9tO1xuXG4gIC8vIG1ha2UgdGhpcyB0YWcgb2JzZXJ2YWJsZVxuICBvYnNlcnZhYmxlJDEodGhpcyk7XG4gIC8vIG9ubHkgY2FsbCB1bm1vdW50IGlmIHdlIGhhdmUgYSB2YWxpZCBfX1RBR19JTVBMIChoYXMgbmFtZSBwcm9wZXJ0eSlcbiAgaWYgKGltcGwubmFtZSAmJiByb290Ll90YWcpIHsgcm9vdC5fdGFnLnVubW91bnQodHJ1ZSk7IH1cblxuICAvLyBub3QgeWV0IG1vdW50ZWRcbiAgdGhpcy5pc01vdW50ZWQgPSBmYWxzZTtcbiAgcm9vdC5pc0xvb3AgPSBpc0xvb3A7XG5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ19pbnRlcm5hbCcsIHtcbiAgICBpc0Fub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgaW5zdEF0dHJzOiBpbnN0QXR0cnMsXG4gICAgaW5uZXJIVE1MOiBpbm5lckhUTUwsXG4gICAgLy8gdGhlc2UgdmFycyB3aWxsIGJlIG5lZWRlZCBvbmx5IGZvciB0aGUgdmlydHVhbCB0YWdzXG4gICAgdmlydHM6IFtdLFxuICAgIHRhaWw6IG51bGwsXG4gICAgaGVhZDogbnVsbFxuICB9KTtcblxuICAvLyBjcmVhdGUgYSB1bmlxdWUgaWQgdG8gdGhpcyB0YWdcbiAgLy8gaXQgY291bGQgYmUgaGFuZHkgdG8gdXNlIGl0IGFsc28gdG8gaW1wcm92ZSB0aGUgdmlydHVhbCBkb20gcmVuZGVyaW5nIHNwZWVkXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfcmlvdF9pZCcsICsrX191aWQpOyAvLyBiYXNlIDEgYWxsb3dzIHRlc3QgIXQuX3Jpb3RfaWRcblxuICBleHRlbmQodGhpcywgeyByb290OiByb290LCBvcHRzOiBvcHRzIH0sIGl0ZW0pO1xuICAvLyBwcm90ZWN0IHRoZSBcInRhZ3NcIiBhbmQgXCJyZWZzXCIgcHJvcGVydHkgZnJvbSBiZWluZyBvdmVycmlkZGVuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdwYXJlbnQnLCBwYXJlbnQgfHwgbnVsbCk7XG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd0YWdzJywge30pO1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmVmcycsIHt9KTtcblxuICBkb20gPSBta2RvbShpbXBsLnRtcGwsIGlubmVySFRNTCwgaXNMb29wKTtcblxuICAvKipcbiAgICogVXBkYXRlIHRoZSB0YWcgZXhwcmVzc2lvbnMgYW5kIG9wdGlvbnNcbiAgICogQHBhcmFtICAgeyAqIH0gIGRhdGEgLSBkYXRhIHdlIHdhbnQgdG8gdXNlIHRvIGV4dGVuZCB0aGUgdGFnIHByb3BlcnRpZXNcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd1cGRhdGUnLCBmdW5jdGlvbiB0YWdVcGRhdGUoZGF0YSkge1xuICAgIGlmIChpc0Z1bmN0aW9uKHRoaXMuc2hvdWxkVXBkYXRlKSAmJiAhdGhpcy5zaG91bGRVcGRhdGUoZGF0YSkpIHsgcmV0dXJuIHRoaXMgfVxuXG4gICAgLy8gbWFrZSBzdXJlIHRoZSBkYXRhIHBhc3NlZCB3aWxsIG5vdCBvdmVycmlkZVxuICAgIC8vIHRoZSBjb21wb25lbnQgY29yZSBtZXRob2RzXG4gICAgZGF0YSA9IGNsZWFuVXBEYXRhKGRhdGEpO1xuXG4gICAgLy8gaW5oZXJpdCBwcm9wZXJ0aWVzIGZyb20gdGhlIHBhcmVudCwgYnV0IG9ubHkgZm9yIGlzQW5vbnltb3VzIHRhZ3NcbiAgICBpZiAoaXNMb29wICYmIGlzQW5vbnltb3VzKSB7IGluaGVyaXRGcm9tLmFwcGx5KHRoaXMsIFt0aGlzLnBhcmVudCwgcHJvcHNJblN5bmNXaXRoUGFyZW50XSk7IH1cbiAgICBleHRlbmQodGhpcywgZGF0YSk7XG4gICAgdXBkYXRlT3B0cy5hcHBseSh0aGlzLCBbaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnNdKTtcbiAgICBpZiAodGhpcy5pc01vdW50ZWQpIHsgdGhpcy50cmlnZ2VyKCd1cGRhdGUnLCBkYXRhKTsgfVxuICAgIHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwodGhpcywgZXhwcmVzc2lvbnMpO1xuICAgIGlmICh0aGlzLmlzTW91bnRlZCkgeyB0aGlzLnRyaWdnZXIoJ3VwZGF0ZWQnKTsgfVxuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBBZGQgYSBtaXhpbiB0byB0aGlzIHRhZ1xuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21peGluJywgZnVuY3Rpb24gdGFnTWl4aW4oKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICBlYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24gKG1peCkge1xuICAgICAgdmFyIGluc3RhbmNlLFxuICAgICAgICBwcm9wcyA9IFtdLFxuICAgICAgICBvYmo7XG5cbiAgICAgIG1peCA9IGlzU3RyaW5nKG1peCkgPyBtaXhpbiQxKG1peCkgOiBtaXg7XG5cbiAgICAgIC8vIGNoZWNrIGlmIHRoZSBtaXhpbiBpcyBhIGZ1bmN0aW9uXG4gICAgICBpZiAoaXNGdW5jdGlvbihtaXgpKSB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgbmV3IG1peGluIGluc3RhbmNlXG4gICAgICAgIGluc3RhbmNlID0gbmV3IG1peCgpO1xuICAgICAgfSBlbHNlIHsgaW5zdGFuY2UgPSBtaXg7IH1cblxuICAgICAgdmFyIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGluc3RhbmNlKTtcblxuICAgICAgLy8gYnVpbGQgbXVsdGlsZXZlbCBwcm90b3R5cGUgaW5oZXJpdGFuY2UgY2hhaW4gcHJvcGVydHkgbGlzdFxuICAgICAgZG8geyBwcm9wcyA9IHByb3BzLmNvbmNhdChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmogfHwgaW5zdGFuY2UpKTsgfVxuICAgICAgd2hpbGUgKG9iaiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmogfHwgaW5zdGFuY2UpKVxuXG4gICAgICAvLyBsb29wIHRoZSBrZXlzIGluIHRoZSBmdW5jdGlvbiBwcm90b3R5cGUgb3IgdGhlIGFsbCBvYmplY3Qga2V5c1xuICAgICAgZWFjaChwcm9wcywgZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAvLyBiaW5kIG1ldGhvZHMgdG8gdGhpc1xuICAgICAgICAvLyBhbGxvdyBtaXhpbnMgdG8gb3ZlcnJpZGUgb3RoZXIgcHJvcGVydGllcy9wYXJlbnQgbWl4aW5zXG4gICAgICAgIGlmIChrZXkgIT09ICdpbml0Jykge1xuICAgICAgICAgIC8vIGNoZWNrIGZvciBnZXR0ZXJzL3NldHRlcnNcbiAgICAgICAgICB2YXIgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaW5zdGFuY2UsIGtleSkgfHwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywga2V5KTtcbiAgICAgICAgICB2YXIgaGFzR2V0dGVyU2V0dGVyID0gZGVzY3JpcHRvciAmJiAoZGVzY3JpcHRvci5nZXQgfHwgZGVzY3JpcHRvci5zZXQpO1xuXG4gICAgICAgICAgLy8gYXBwbHkgbWV0aG9kIG9ubHkgaWYgaXQgZG9lcyBub3QgYWxyZWFkeSBleGlzdCBvbiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICBpZiAoIXRoaXMkMS5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGhhc0dldHRlclNldHRlcikge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMkMSwga2V5LCBkZXNjcmlwdG9yKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcyQxW2tleV0gPSBpc0Z1bmN0aW9uKGluc3RhbmNlW2tleV0pID9cbiAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5XS5iaW5kKHRoaXMkMSkgOlxuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIGluaXQgbWV0aG9kIHdpbGwgYmUgY2FsbGVkIGF1dG9tYXRpY2FsbHlcbiAgICAgIGlmIChpbnN0YW5jZS5pbml0KVxuICAgICAgICB7IGluc3RhbmNlLmluaXQuYmluZCh0aGlzJDEpKCk7IH1cbiAgICB9KTtcbiAgICByZXR1cm4gdGhpc1xuICB9LmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBNb3VudCB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdtb3VudCcsIGZ1bmN0aW9uIHRhZ01vdW50KCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgcm9vdC5fdGFnID0gdGhpczsgLy8ga2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgdGFnIGp1c3QgY3JlYXRlZFxuXG4gICAgLy8gUmVhZCBhbGwgdGhlIGF0dHJzIG9uIHRoaXMgaW5zdGFuY2UuIFRoaXMgZ2l2ZSB1cyB0aGUgaW5mbyB3ZSBuZWVkIGZvciB1cGRhdGVPcHRzXG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHBhcmVudCwgW3Jvb3QsIHJvb3QuYXR0cmlidXRlcywgZnVuY3Rpb24gKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmICghaXNBbm9ueW1vdXMgJiYgUmVmRXhwci5pc1Byb3RvdHlwZU9mKGV4cHIpKSB7IGV4cHIudGFnID0gdGhpcyQxOyB9XG4gICAgICBhdHRyLmV4cHIgPSBleHByO1xuICAgICAgaW5zdEF0dHJzLnB1c2goYXR0cik7XG4gICAgfV0pO1xuXG4gICAgLy8gdXBkYXRlIHRoZSByb290IGFkZGluZyBjdXN0b20gYXR0cmlidXRlcyBjb21pbmcgZnJvbSB0aGUgY29tcGlsZXJcbiAgICBpbXBsQXR0cnMgPSBbXTtcbiAgICB3YWxrQXR0cnMoaW1wbC5hdHRycywgZnVuY3Rpb24gKGssIHYpIHsgaW1wbEF0dHJzLnB1c2goe25hbWU6IGssIHZhbHVlOiB2fSk7IH0pO1xuICAgIHBhcnNlQXR0cmlidXRlcy5hcHBseSh0aGlzLCBbcm9vdCwgaW1wbEF0dHJzLCBmdW5jdGlvbiAoYXR0ciwgZXhwcikge1xuICAgICAgaWYgKGV4cHIpIHsgZXhwcmVzc2lvbnMucHVzaChleHByKTsgfVxuICAgICAgZWxzZSB7IHNldEF0dHIocm9vdCwgYXR0ci5uYW1lLCBhdHRyLnZhbHVlKTsgfVxuICAgIH1dKTtcblxuICAgIC8vIGNoaWxkcmVuIGluIGxvb3Agc2hvdWxkIGluaGVyaXQgZnJvbSB0cnVlIHBhcmVudFxuICAgIGlmICh0aGlzLl9wYXJlbnQgJiYgaXNBbm9ueW1vdXMpIHsgaW5oZXJpdEZyb20uYXBwbHkodGhpcywgW3RoaXMuX3BhcmVudCwgcHJvcHNJblN5bmNXaXRoUGFyZW50XSk7IH1cblxuICAgIC8vIGluaXRpYWxpYXRpb25cbiAgICB1cGRhdGVPcHRzLmFwcGx5KHRoaXMsIFtpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG9wdHMsIGluc3RBdHRyc10pO1xuXG4gICAgLy8gYWRkIGdsb2JhbCBtaXhpbnNcbiAgICB2YXIgZ2xvYmFsTWl4aW4gPSBtaXhpbiQxKEdMT0JBTF9NSVhJTik7XG5cbiAgICBpZiAoZ2xvYmFsTWl4aW4pIHtcbiAgICAgIGZvciAodmFyIGkgaW4gZ2xvYmFsTWl4aW4pIHtcbiAgICAgICAgaWYgKGdsb2JhbE1peGluLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgdGhpcyQxLm1peGluKGdsb2JhbE1peGluW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbXBsLmZuKSB7IGltcGwuZm4uY2FsbCh0aGlzLCBvcHRzKTsgfVxuXG4gICAgdGhpcy50cmlnZ2VyKCdiZWZvcmUtbW91bnQnKTtcblxuICAgIC8vIHBhcnNlIGxheW91dCBhZnRlciBpbml0LiBmbiBtYXkgY2FsY3VsYXRlIGFyZ3MgZm9yIG5lc3RlZCBjdXN0b20gdGFnc1xuICAgIHBhcnNlRXhwcmVzc2lvbnMuYXBwbHkodGhpcywgW2RvbSwgZXhwcmVzc2lvbnMsIGZhbHNlXSk7XG5cbiAgICB0aGlzLnVwZGF0ZShpdGVtKTtcblxuICAgIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHtcbiAgICAgIC8vIHVwZGF0ZSB0aGUgcm9vdCBhdHRyaWJ1dGUgZm9yIHRoZSBsb29wZWQgZWxlbWVudHNcbiAgICAgIHRoaXMucm9vdCA9IHJvb3QgPSBkb20uZmlyc3RDaGlsZDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2hpbGUgKGRvbS5maXJzdENoaWxkKSB7IHJvb3QuYXBwZW5kQ2hpbGQoZG9tLmZpcnN0Q2hpbGQpOyB9XG4gICAgICBpZiAocm9vdC5zdHViKSB7IHJvb3QgPSBwYXJlbnQucm9vdDsgfVxuICAgIH1cblxuICAgIGRlZmluZVByb3BlcnR5KHRoaXMsICdyb290Jywgcm9vdCk7XG4gICAgdGhpcy5pc01vdW50ZWQgPSB0cnVlO1xuXG4gICAgLy8gaWYgaXQncyBub3QgYSBjaGlsZCB0YWcgd2UgY2FuIHRyaWdnZXIgaXRzIG1vdW50IGV2ZW50XG4gICAgaWYgKCF0aGlzLnBhcmVudCB8fCB0aGlzLnBhcmVudC5pc01vdW50ZWQpIHtcbiAgICAgIHRoaXMudHJpZ2dlcignbW91bnQnKTtcbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHdlIG5lZWQgdG8gd2FpdCB0aGF0IHRoZSBwYXJlbnQgZXZlbnQgZ2V0cyB0cmlnZ2VyZWRcbiAgICBlbHNlIHsgdGhpcy5wYXJlbnQub25lKCdtb3VudCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMkMS50cmlnZ2VyKCdtb3VudCcpO1xuICAgIH0pOyB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIFVubW91bnQgdGhlIHRhZyBpbnN0YW5jZVxuICAgKiBAcGFyYW0geyBCb29sZWFuIH0gbXVzdEtlZXBSb290IC0gaWYgaXQncyB0cnVlIHRoZSByb290IG5vZGUgd2lsbCBub3QgYmUgcmVtb3ZlZFxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VubW91bnQnLCBmdW5jdGlvbiB0YWdVbm1vdW50KG11c3RLZWVwUm9vdCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgdmFyIGVsID0gdGhpcy5yb290LFxuICAgICAgcCA9IGVsLnBhcmVudE5vZGUsXG4gICAgICBwdGFnLFxuICAgICAgdGFnSW5kZXggPSBfX1RBR1NfQ0FDSEUuaW5kZXhPZih0aGlzKTtcblxuICAgIHRoaXMudHJpZ2dlcignYmVmb3JlLXVubW91bnQnKTtcblxuICAgIC8vIGNsZWFyIGFsbCBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBtb3VudGVkIHRhZ1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgaWYgKHN0YXJ0c1dpdGgobmFtZSwgQVRUUlNfUFJFRklYKSlcbiAgICAgICAgeyBuYW1lID0gbmFtZS5zbGljZShBVFRSU19QUkVGSVgubGVuZ3RoKTsgfVxuICAgICAgcmVtQXR0cihyb290LCBuYW1lKTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSB0aGlzIHRhZyBpbnN0YW5jZSBmcm9tIHRoZSBnbG9iYWwgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICh+dGFnSW5kZXgpXG4gICAgICB7IF9fVEFHU19DQUNIRS5zcGxpY2UodGFnSW5kZXgsIDEpOyB9XG5cbiAgICBpZiAocCkge1xuICAgICAgaWYgKHBhcmVudCkge1xuICAgICAgICBwdGFnID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHBhcmVudCk7XG5cbiAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgIE9iamVjdC5rZXlzKHRoaXMudGFncykuZm9yRWFjaChmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgICAgICAgICAgYXJyYXlpc2hSZW1vdmUocHRhZy50YWdzLCB0YWdOYW1lLCB0aGlzJDEudGFnc1t0YWdOYW1lXSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXJyYXlpc2hSZW1vdmUocHRhZy50YWdzLCB0YWdOYW1lLCB0aGlzKTtcbiAgICAgICAgICBpZihwYXJlbnQgIT09IHB0YWcpIC8vIHJlbW92ZSBmcm9tIF9wYXJlbnQgdG9vXG4gICAgICAgICAgICB7IGFycmF5aXNoUmVtb3ZlKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0aGlzKTsgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAoZWwuZmlyc3RDaGlsZCkgeyBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTsgfVxuICAgICAgfVxuXG4gICAgICBpZiAoIW11c3RLZWVwUm9vdCkge1xuICAgICAgICBwLnJlbW92ZUNoaWxkKGVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHRoZSByaW90LXRhZyBhbmQgdGhlIGRhdGEtaXMgYXR0cmlidXRlcyBhcmVuJ3QgbmVlZGVkIGFueW1vcmUsIHJlbW92ZSB0aGVtXG4gICAgICAgIHJlbUF0dHIocCwgSVNfRElSRUNUSVZFKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5faW50ZXJuYWwudmlydHMpIHtcbiAgICAgIGVhY2godGhpcy5faW50ZXJuYWwudmlydHMsIGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGlmICh2LnBhcmVudE5vZGUpIHsgdi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHYpOyB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBhbGxvdyBleHByZXNzaW9ucyB0byB1bm1vdW50IHRoZW1zZWx2ZXNcbiAgICB1bm1vdW50QWxsKGV4cHJlc3Npb25zKTtcbiAgICBlYWNoKGluc3RBdHRycywgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIGEuZXhwciAmJiBhLmV4cHIudW5tb3VudCAmJiBhLmV4cHIudW5tb3VudCgpOyB9KTtcblxuICAgIHRoaXMudHJpZ2dlcigndW5tb3VudCcpO1xuICAgIHRoaXMub2ZmKCcqJyk7XG4gICAgdGhpcy5pc01vdW50ZWQgPSBmYWxzZTtcblxuICAgIGRlbGV0ZSB0aGlzLnJvb3QuX3RhZztcblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcbn1cblxuLyoqXG4gKiBEZXRlY3QgdGhlIHRhZyBpbXBsZW1lbnRhdGlvbiBieSBhIERPTSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIG5lZWQgdG8gcGFyc2UgdG8gZ2V0IGl0cyB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gaXQgcmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyB0aGUgaW1wbGVtZW50YXRpb24gb2YgYSBjdXN0b20gdGFnICh0ZW1wbGF0ZSBhbmQgYm9vdCBmdW5jdGlvbilcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnKGRvbSkge1xuICByZXR1cm4gZG9tLnRhZ05hbWUgJiYgX19UQUdfSU1QTFtnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSB8fFxuICAgIGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpIHx8IGRvbS50YWdOYW1lLnRvTG93ZXJDYXNlKCldXG59XG5cbi8qKlxuICogSW5oZXJpdCBwcm9wZXJ0aWVzIGZyb20gYSB0YXJnZXQgdGFnIGluc3RhbmNlXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgVGFnIH0gdGFyZ2V0IC0gdGFnIHdoZXJlIHdlIHdpbGwgaW5oZXJpdCBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gcHJvcHNJblN5bmNXaXRoUGFyZW50IC0gYXJyYXkgb2YgcHJvcGVydGllcyB0byBzeW5jIHdpdGggdGhlIHRhcmdldFxuICovXG5mdW5jdGlvbiBpbmhlcml0RnJvbSh0YXJnZXQsIHByb3BzSW5TeW5jV2l0aFBhcmVudCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKE9iamVjdC5rZXlzKHRhcmdldCksIGZ1bmN0aW9uIChrKSB7XG4gICAgLy8gc29tZSBwcm9wZXJ0aWVzIG11c3QgYmUgYWx3YXlzIGluIHN5bmMgd2l0aCB0aGUgcGFyZW50IHRhZ1xuICAgIHZhciBtdXN0U3luYyA9ICFpc1Jlc2VydmVkTmFtZShrKSAmJiBjb250YWlucyhwcm9wc0luU3luY1dpdGhQYXJlbnQsIGspO1xuXG4gICAgaWYgKGlzVW5kZWZpbmVkKHRoaXMkMVtrXSkgfHwgbXVzdFN5bmMpIHtcbiAgICAgIC8vIHRyYWNrIHRoZSBwcm9wZXJ0eSB0byBrZWVwIGluIHN5bmNcbiAgICAgIC8vIHNvIHdlIGNhbiBrZWVwIGl0IHVwZGF0ZWRcbiAgICAgIGlmICghbXVzdFN5bmMpIHsgcHJvcHNJblN5bmNXaXRoUGFyZW50LnB1c2goayk7IH1cbiAgICAgIHRoaXMkMVtrXSA9IHRhcmdldFtrXTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1vdmUgdGhlIHBvc2l0aW9uIG9mIGEgY3VzdG9tIHRhZyBpbiBpdHMgcGFyZW50IHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSBrZXkgd2hlcmUgdGhlIHRhZyB3YXMgc3RvcmVkXG4gKiBAcGFyYW0gICB7IE51bWJlciB9IG5ld1BvcyAtIGluZGV4IHdoZXJlIHRoZSBuZXcgdGFnIHdpbGwgYmUgc3RvcmVkXG4gKi9cbmZ1bmN0aW9uIG1vdmVDaGlsZFRhZyh0YWdOYW1lLCBuZXdQb3MpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50LFxuICAgIHRhZ3M7XG4gIC8vIG5vIHBhcmVudCBubyBtb3ZlXG4gIGlmICghcGFyZW50KSB7IHJldHVybiB9XG5cbiAgdGFncyA9IHBhcmVudC50YWdzW3RhZ05hbWVdO1xuXG4gIGlmIChpc0FycmF5KHRhZ3MpKVxuICAgIHsgdGFncy5zcGxpY2UobmV3UG9zLCAwLCB0YWdzLnNwbGljZSh0YWdzLmluZGV4T2YodGhpcyksIDEpWzBdKTsgfVxuICBlbHNlIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRoaXMpOyB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGNoaWxkIHRhZyBpbmNsdWRpbmcgaXQgY29ycmVjdGx5IGludG8gaXRzIHBhcmVudFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjaGlsZCAtIGNoaWxkIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gdGFnIG9wdGlvbnMgY29udGFpbmluZyB0aGUgRE9NIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gaW5uZXJIVE1MIC0gaW5uZXIgaHRtbCBvZiB0aGUgY2hpbGQgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBwYXJlbnQgLSBpbnN0YW5jZSBvZiB0aGUgcGFyZW50IHRhZyBpbmNsdWRpbmcgdGhlIGNoaWxkIGN1c3RvbSB0YWdcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gaW5zdGFuY2Ugb2YgdGhlIG5ldyBjaGlsZCB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIGluaXRDaGlsZFRhZyhjaGlsZCwgb3B0cywgaW5uZXJIVE1MLCBwYXJlbnQpIHtcbiAgdmFyIHRhZyA9IG5ldyBUYWckMShjaGlsZCwgb3B0cywgaW5uZXJIVE1MKSxcbiAgICB0YWdOYW1lID0gb3B0cy50YWdOYW1lIHx8IGdldFRhZ05hbWUob3B0cy5yb290LCB0cnVlKSxcbiAgICBwdGFnID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHBhcmVudCk7XG4gIC8vIGZpeCBmb3IgdGhlIHBhcmVudCBhdHRyaWJ1dGUgaW4gdGhlIGxvb3BlZCBlbGVtZW50c1xuICBkZWZpbmVQcm9wZXJ0eSh0YWcsICdwYXJlbnQnLCBwdGFnKTtcbiAgLy8gc3RvcmUgdGhlIHJlYWwgcGFyZW50IHRhZ1xuICAvLyBpbiBzb21lIGNhc2VzIHRoaXMgY291bGQgYmUgZGlmZmVyZW50IGZyb20gdGhlIGN1c3RvbSBwYXJlbnQgdGFnXG4gIC8vIGZvciBleGFtcGxlIGluIG5lc3RlZCBsb29wc1xuICB0YWcuX3BhcmVudCA9IHBhcmVudDtcblxuICAvLyBhZGQgdGhpcyB0YWcgdG8gdGhlIGN1c3RvbSBwYXJlbnQgdGFnXG4gIGFycmF5aXNoQWRkKHB0YWcudGFncywgdGFnTmFtZSwgdGFnKTtcblxuICAvLyBhbmQgYWxzbyB0byB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIGlmIChwdGFnICE9PSBwYXJlbnQpXG4gICAgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGFnKTsgfVxuXG4gIC8vIGVtcHR5IHRoZSBjaGlsZCBub2RlIG9uY2Ugd2UgZ290IGl0cyB0ZW1wbGF0ZVxuICAvLyB0byBhdm9pZCB0aGF0IGl0cyBjaGlsZHJlbiBnZXQgY29tcGlsZWQgbXVsdGlwbGUgdGltZXNcbiAgb3B0cy5yb290LmlubmVySFRNTCA9ICcnO1xuXG4gIHJldHVybiB0YWdcbn1cblxuLyoqXG4gKiBMb29wIGJhY2t3YXJkIGFsbCB0aGUgcGFyZW50cyB0cmVlIHRvIGRldGVjdCB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWdcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gdGFnIC0gYSBUYWcgaW5zdGFuY2VcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gdGhlIGluc3RhbmNlIG9mIHRoZSBmaXJzdCBjdXN0b20gcGFyZW50IHRhZyBmb3VuZFxuICovXG5mdW5jdGlvbiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGFnKSB7XG4gIHZhciBwdGFnID0gdGFnO1xuICB3aGlsZSAocHRhZy5faW50ZXJuYWwuaXNBbm9ueW1vdXMpIHtcbiAgICBpZiAoIXB0YWcucGFyZW50KSB7IGJyZWFrIH1cbiAgICBwdGFnID0gcHRhZy5wYXJlbnQ7XG4gIH1cbiAgcmV0dXJuIHB0YWdcbn1cblxuLyoqXG4gKiBUcmlnZ2VyIHRoZSB1bm1vdW50IG1ldGhvZCBvbiBhbGwgdGhlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBET00gZXhwcmVzc2lvbnNcbiAqL1xuZnVuY3Rpb24gdW5tb3VudEFsbChleHByZXNzaW9ucykge1xuICBlYWNoKGV4cHJlc3Npb25zLCBmdW5jdGlvbihleHByKSB7XG4gICAgaWYgKGV4cHIgaW5zdGFuY2VvZiBUYWckMSkgeyBleHByLnVubW91bnQodHJ1ZSk7IH1cbiAgICBlbHNlIGlmIChleHByLnVubW91bnQpIHsgZXhwci51bm1vdW50KCk7IH1cbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSB0YWcgbmFtZSBvZiBhbnkgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gc2tpcERhdGFJcyAtIGhhY2sgdG8gaWdub3JlIHRoZSBkYXRhLWlzIGF0dHJpYnV0ZSB3aGVuIGF0dGFjaGluZyB0byBwYXJlbnRcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbmFtZSB0byBpZGVudGlmeSB0aGlzIGRvbSBub2RlIGluIHJpb3RcbiAqL1xuZnVuY3Rpb24gZ2V0VGFnTmFtZShkb20sIHNraXBEYXRhSXMpIHtcbiAgdmFyIGNoaWxkID0gZ2V0VGFnKGRvbSksXG4gICAgbmFtZWRUYWcgPSAhc2tpcERhdGFJcyAmJiBnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKTtcbiAgcmV0dXJuIG5hbWVkVGFnICYmICF0bXBsLmhhc0V4cHIobmFtZWRUYWcpID9cbiAgICAgICAgICAgICAgICBuYW1lZFRhZyA6XG4gICAgICAgICAgICAgIGNoaWxkID8gY2hpbGQubmFtZSA6IGRvbS50YWdOYW1lLnRvTG93ZXJDYXNlKClcbn1cblxuLyoqXG4gKiBXaXRoIHRoaXMgZnVuY3Rpb24gd2UgYXZvaWQgdGhhdCB0aGUgaW50ZXJuYWwgVGFnIG1ldGhvZHMgZ2V0IG92ZXJyaWRkZW5cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZGF0YSAtIG9wdGlvbnMgd2Ugd2FudCB0byB1c2UgdG8gZXh0ZW5kIHRoZSB0YWcgaW5zdGFuY2VcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gY2xlYW4gb2JqZWN0IHdpdGhvdXQgY29udGFpbmluZyB0aGUgcmlvdCBpbnRlcm5hbCByZXNlcnZlZCB3b3Jkc1xuICovXG5mdW5jdGlvbiBjbGVhblVwRGF0YShkYXRhKSB7XG4gIGlmICghKGRhdGEgaW5zdGFuY2VvZiBUYWckMSkgJiYgIShkYXRhICYmIGlzRnVuY3Rpb24oZGF0YS50cmlnZ2VyKSkpXG4gICAgeyByZXR1cm4gZGF0YSB9XG5cbiAgdmFyIG8gPSB7fTtcbiAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcbiAgICBpZiAoIVJFX1JFU0VSVkVEX05BTUVTLnRlc3Qoa2V5KSkgeyBvW2tleV0gPSBkYXRhW2tleV07IH1cbiAgfVxuICByZXR1cm4gb1xufVxuXG4vKipcbiAqIFNldCB0aGUgcHJvcGVydHkgb2YgYW4gb2JqZWN0IGZvciBhIGdpdmVuIGtleS4gSWYgc29tZXRoaW5nIGFscmVhZHlcbiAqIGV4aXN0cyB0aGVyZSwgdGhlbiBpdCBiZWNvbWVzIGFuIGFycmF5IGNvbnRhaW5pbmcgYm90aCB0aGUgb2xkIGFuZCBuZXcgdmFsdWUuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvYmogLSBvYmplY3Qgb24gd2hpY2ggdG8gc2V0IHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIHsgU3RyaW5nIH0ga2V5IC0gcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gdmFsdWUgLSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIHNldFxuICogQHBhcmFtIHsgQm9vbGVhbiB9IGVuc3VyZUFycmF5IC0gZW5zdXJlIHRoYXQgdGhlIHByb3BlcnR5IHJlbWFpbnMgYW4gYXJyYXlcbiAqL1xuZnVuY3Rpb24gYXJyYXlpc2hBZGQob2JqLCBrZXksIHZhbHVlLCBlbnN1cmVBcnJheSkge1xuICB2YXIgZGVzdCA9IG9ialtrZXldO1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KGRlc3QpO1xuXG4gIGlmIChkZXN0ICYmIGRlc3QgPT09IHZhbHVlKSB7IHJldHVybiB9XG5cbiAgLy8gaWYgdGhlIGtleSB3YXMgbmV2ZXIgc2V0LCBzZXQgaXQgb25jZVxuICBpZiAoIWRlc3QgJiYgZW5zdXJlQXJyYXkpIHsgb2JqW2tleV0gPSBbdmFsdWVdOyB9XG4gIGVsc2UgaWYgKCFkZXN0KSB7IG9ialtrZXldID0gdmFsdWU7IH1cbiAgLy8gaWYgaXQgd2FzIGFuIGFycmF5IGFuZCBub3QgeWV0IHNldFxuICBlbHNlIGlmICghaXNBcnIgfHwgaXNBcnIgJiYgIWNvbnRhaW5zKGRlc3QsIHZhbHVlKSkge1xuICAgIGlmIChpc0FycikgeyBkZXN0LnB1c2godmFsdWUpOyB9XG4gICAgZWxzZSB7IG9ialtrZXldID0gW2Rlc3QsIHZhbHVlXTsgfVxuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbiBpdGVtIGZyb20gYW4gb2JqZWN0IGF0IGEgZ2l2ZW4ga2V5LiBJZiB0aGUga2V5IHBvaW50cyB0byBhbiBhcnJheSxcbiAqIHRoZW4gdGhlIGl0ZW0gaXMganVzdCByZW1vdmVkIGZyb20gdGhlIGFycmF5LlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqIC0gb2JqZWN0IG9uIHdoaWNoIHRvIHJlbW92ZSB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGtleSAtIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHZhbHVlIC0gdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSByZW1vdmVkXG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuKi9cbmZ1bmN0aW9uIGFycmF5aXNoUmVtb3ZlKG9iaiwga2V5LCB2YWx1ZSwgZW5zdXJlQXJyYXkpIHtcbiAgaWYgKGlzQXJyYXkob2JqW2tleV0pKSB7XG4gICAgZWFjaChvYmpba2V5XSwgZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgaWYgKGl0ZW0gPT09IHZhbHVlKSB7IG9ialtrZXldLnNwbGljZShpLCAxKTsgfVxuICAgIH0pO1xuICAgIGlmICghb2JqW2tleV0ubGVuZ3RoKSB7IGRlbGV0ZSBvYmpba2V5XTsgfVxuICAgIGVsc2UgaWYgKG9ialtrZXldLmxlbmd0aCA9PT0gMSAmJiAhZW5zdXJlQXJyYXkpIHsgb2JqW2tleV0gPSBvYmpba2V5XVswXTsgfVxuICB9IGVsc2VcbiAgICB7IGRlbGV0ZSBvYmpba2V5XTsgfSAvLyBvdGhlcndpc2UganVzdCBkZWxldGUgdGhlIGtleVxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYSBET00gbm9kZSBpcyBpbiBzdHViIG1vZGUsIHVzZWZ1bCBmb3IgdGhlIHJpb3QgJ2lmJyBkaXJlY3RpdmVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNJblN0dWIoZG9tKSB7XG4gIHdoaWxlIChkb20pIHtcbiAgICBpZiAoZG9tLmluU3R1YilcbiAgICAgIHsgcmV0dXJuIHRydWUgfVxuICAgIGRvbSA9IGRvbS5wYXJlbnROb2RlO1xuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIGNyZWF0aW5nIG5ldyBUYWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcm9vdCAtIGRvbSBub2RlIHdoZXJlIHRoZSB0YWcgd2lsbCBiZSBtb3VudGVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHRhZ05hbWUgLSBuYW1lIG9mIHRoZSByaW90IHRhZyB3ZSB3YW50IHRvIG1vdW50XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSBvcHRpb25zIHRvIHBhc3MgdG8gdGhlIFRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBjdHggLSBvcHRpb25hbCBjb250ZXh0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGV4dGVuZCBhbiBleGlzdGluZyBjbGFzcyAoIHVzZWQgaW4gcmlvdC5UYWcgKVxuICogQHJldHVybnMgeyBUYWcgfSBhIG5ldyBUYWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gbW91bnRUbyhyb290LCB0YWdOYW1lLCBvcHRzLCBjdHgpIHtcbiAgdmFyIGltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdLFxuICAgIGltcGxDbGFzcyA9IF9fVEFHX0lNUExbdGFnTmFtZV0uY2xhc3MsXG4gICAgdGFnID0gY3R4IHx8IChpbXBsQ2xhc3MgPyBPYmplY3QuY3JlYXRlKGltcGxDbGFzcy5wcm90b3R5cGUpIDoge30pLFxuICAgIC8vIGNhY2hlIHRoZSBpbm5lciBIVE1MIHRvIGZpeCAjODU1XG4gICAgaW5uZXJIVE1MID0gcm9vdC5faW5uZXJIVE1MID0gcm9vdC5faW5uZXJIVE1MIHx8IHJvb3QuaW5uZXJIVE1MO1xuXG4gIC8vIGNsZWFyIHRoZSBpbm5lciBodG1sXG4gIHJvb3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgdmFyIGNvbmYgPSB7IHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfTtcbiAgaWYgKG9wdHMgJiYgb3B0cy5wYXJlbnQpIHsgY29uZi5wYXJlbnQgPSBvcHRzLnBhcmVudDsgfVxuXG4gIGlmIChpbXBsICYmIHJvb3QpIHsgVGFnJDEuYXBwbHkodGFnLCBbaW1wbCwgY29uZiwgaW5uZXJIVE1MXSk7IH1cblxuICBpZiAodGFnICYmIHRhZy5tb3VudCkge1xuICAgIHRhZy5tb3VudCh0cnVlKTtcbiAgICAvLyBhZGQgdGhpcyB0YWcgdG8gdGhlIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAoIWNvbnRhaW5zKF9fVEFHU19DQUNIRSwgdGFnKSkgeyBfX1RBR1NfQ0FDSEUucHVzaCh0YWcpOyB9XG4gIH1cblxuICByZXR1cm4gdGFnXG59XG5cblxuLyoqXG4gKiBBZGRzIHRoZSBlbGVtZW50cyBmb3IgYSB2aXJ0dWFsIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBOb2RlIH0gc3JjIC0gdGhlIG5vZGUgdGhhdCB3aWxsIGRvIHRoZSBpbnNlcnRpbmcgb3IgYXBwZW5kaW5nXG4gKiBAcGFyYW0geyBUYWcgfSB0YXJnZXQgLSBvbmx5IGlmIGluc2VydGluZywgaW5zZXJ0IGJlZm9yZSB0aGlzIHRhZydzIGZpcnN0IGNoaWxkXG4gKi9cbmZ1bmN0aW9uIG1ha2VWaXJ0dWFsKHNyYywgdGFyZ2V0KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBoZWFkID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSxcbiAgICB0YWlsID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSxcbiAgICBmcmFnID0gY3JlYXRlRnJhZygpLFxuICAgIHNpYiwgZWw7XG5cbiAgdGhpcy5faW50ZXJuYWwuaGVhZCA9IHRoaXMucm9vdC5pbnNlcnRCZWZvcmUoaGVhZCwgdGhpcy5yb290LmZpcnN0Q2hpbGQpO1xuICB0aGlzLl9pbnRlcm5hbC50YWlsID0gdGhpcy5yb290LmFwcGVuZENoaWxkKHRhaWwpO1xuXG4gIGVsID0gdGhpcy5faW50ZXJuYWwuaGVhZDtcblxuICB3aGlsZSAoZWwpIHtcbiAgICBzaWIgPSBlbC5uZXh0U2libGluZztcbiAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICB0aGlzJDEuX2ludGVybmFsLnZpcnRzLnB1c2goZWwpOyAvLyBob2xkIGZvciB1bm1vdW50aW5nXG4gICAgZWwgPSBzaWI7XG4gIH1cblxuICBpZiAodGFyZ2V0KVxuICAgIHsgc3JjLmluc2VydEJlZm9yZShmcmFnLCB0YXJnZXQuX2ludGVybmFsLmhlYWQpOyB9XG4gIGVsc2VcbiAgICB7IHNyYy5hcHBlbmRDaGlsZChmcmFnKTsgfVxufVxuXG4vKipcbiAqIE1vdmUgdmlydHVhbCB0YWcgYW5kIGFsbCBjaGlsZCBub2Rlc1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0geyBOb2RlIH0gc3JjICAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nXG4gKiBAcGFyYW0geyBUYWcgfSB0YXJnZXQgLSBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqL1xuZnVuY3Rpb24gbW92ZVZpcnR1YWwoc3JjLCB0YXJnZXQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGVsID0gdGhpcy5faW50ZXJuYWwuaGVhZCxcbiAgICBmcmFnID0gY3JlYXRlRnJhZygpLFxuICAgIHNpYjtcblxuICB3aGlsZSAoZWwpIHtcbiAgICBzaWIgPSBlbC5uZXh0U2libGluZztcbiAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICBlbCA9IHNpYjtcbiAgICBpZiAoZWwgPT09IHRoaXMkMS5faW50ZXJuYWwudGFpbCkge1xuICAgICAgZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gICAgICBzcmMuaW5zZXJ0QmVmb3JlKGZyYWcsIHRhcmdldC5faW50ZXJuYWwuaGVhZCk7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdldCBzZWxlY3RvcnMgZm9yIHRhZ3NcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gdGFnIG5hbWVzIHRvIHNlbGVjdFxuICogQHJldHVybnMgeyBTdHJpbmcgfSBzZWxlY3RvclxuICovXG5mdW5jdGlvbiBzZWxlY3RUYWdzKHRhZ3MpIHtcbiAgLy8gc2VsZWN0IGFsbCB0YWdzXG4gIGlmICghdGFncykge1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoX19UQUdfSU1QTCk7XG4gICAgcmV0dXJuIGtleXMgKyBzZWxlY3RUYWdzKGtleXMpXG4gIH1cblxuICByZXR1cm4gdGFnc1xuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHQpIHsgcmV0dXJuICEvW14tXFx3XS8udGVzdCh0KTsgfSlcbiAgICAucmVkdWNlKGZ1bmN0aW9uIChsaXN0LCB0KSB7XG4gICAgICB2YXIgbmFtZSA9IHQudHJpbSgpLnRvTG93ZXJDYXNlKCk7XG4gICAgICByZXR1cm4gbGlzdCArIFwiLFtcIiArIElTX0RJUkVDVElWRSArIFwiPVxcXCJcIiArIG5hbWUgKyBcIlxcXCJdXCJcbiAgICB9LCAnJylcbn1cblxuXG52YXIgdGFncyA9IE9iamVjdC5mcmVlemUoe1xuXHRnZXRUYWc6IGdldFRhZyxcblx0aW5oZXJpdEZyb206IGluaGVyaXRGcm9tLFxuXHRtb3ZlQ2hpbGRUYWc6IG1vdmVDaGlsZFRhZyxcblx0aW5pdENoaWxkVGFnOiBpbml0Q2hpbGRUYWcsXG5cdGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZzogZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnLFxuXHR1bm1vdW50QWxsOiB1bm1vdW50QWxsLFxuXHRnZXRUYWdOYW1lOiBnZXRUYWdOYW1lLFxuXHRjbGVhblVwRGF0YTogY2xlYW5VcERhdGEsXG5cdGFycmF5aXNoQWRkOiBhcnJheWlzaEFkZCxcblx0YXJyYXlpc2hSZW1vdmU6IGFycmF5aXNoUmVtb3ZlLFxuXHRpc0luU3R1YjogaXNJblN0dWIsXG5cdG1vdW50VG86IG1vdW50VG8sXG5cdG1ha2VWaXJ0dWFsOiBtYWtlVmlydHVhbCxcblx0bW92ZVZpcnR1YWw6IG1vdmVWaXJ0dWFsLFxuXHRzZWxlY3RUYWdzOiBzZWxlY3RUYWdzXG59KTtcblxuLyoqXG4gKiBSaW90IHB1YmxpYyBhcGlcbiAqL1xudmFyIHNldHRpbmdzID0gT2JqZWN0LmNyZWF0ZShicmFja2V0cy5zZXR0aW5ncyk7XG5cbnZhciB1dGlsID0ge1xuICB0bXBsOiB0bXBsLFxuICBicmFja2V0czogYnJhY2tldHMsXG4gIHN0eWxlTWFuYWdlcjogc3R5bGVNYW5hZ2VyLFxuICB2ZG9tOiBfX1RBR1NfQ0FDSEUsXG4gIHN0eWxlTm9kZTogc3R5bGVNYW5hZ2VyLnN0eWxlTm9kZSxcbiAgLy8gZXhwb3J0IHRoZSByaW90IGludGVybmFsIHV0aWxzIGFzIHdlbGxcbiAgZG9tOiBkb20sXG4gIGNoZWNrOiBjaGVjayxcbiAgbWlzYzogbWlzYyxcbiAgdGFnczogdGFnc1xufTtcblxuLy8gZXhwb3J0IHRoZSBjb3JlIHByb3BzL21ldGhvZHNcbnZhciBUYWckJDEgPSBUYWckMjtcbnZhciB0YWckJDEgPSB0YWckMTtcbnZhciB0YWcyJCQxID0gdGFnMiQxO1xudmFyIG1vdW50JCQxID0gbW91bnQkMTtcbnZhciBtaXhpbiQkMSA9IG1peGluJDE7XG52YXIgdXBkYXRlJCQxID0gdXBkYXRlJDE7XG52YXIgdW5yZWdpc3RlciQkMSA9IHVucmVnaXN0ZXIkMTtcbnZhciBvYnNlcnZhYmxlID0gb2JzZXJ2YWJsZSQxO1xuXG52YXIgcmlvdCQxID0ge1xuICBzZXR0aW5nczogc2V0dGluZ3MsXG4gIHV0aWw6IHV0aWwsXG4gIC8vIGNvcmVcbiAgVGFnOiBUYWckJDEsXG4gIHRhZzogdGFnJCQxLFxuICB0YWcyOiB0YWcyJCQxLFxuICBtb3VudDogbW91bnQkJDEsXG4gIG1peGluOiBtaXhpbiQkMSxcbiAgdXBkYXRlOiB1cGRhdGUkJDEsXG4gIHVucmVnaXN0ZXI6IHVucmVnaXN0ZXIkJDEsXG4gIG9ic2VydmFibGU6IG9ic2VydmFibGVcbn07XG5cbmV4cG9ydHMuc2V0dGluZ3MgPSBzZXR0aW5ncztcbmV4cG9ydHMudXRpbCA9IHV0aWw7XG5leHBvcnRzLlRhZyA9IFRhZyQkMTtcbmV4cG9ydHMudGFnID0gdGFnJCQxO1xuZXhwb3J0cy50YWcyID0gdGFnMiQkMTtcbmV4cG9ydHMubW91bnQgPSBtb3VudCQkMTtcbmV4cG9ydHMubWl4aW4gPSBtaXhpbiQkMTtcbmV4cG9ydHMudXBkYXRlID0gdXBkYXRlJCQxO1xuZXhwb3J0cy51bnJlZ2lzdGVyID0gdW5yZWdpc3RlciQkMTtcbmV4cG9ydHMub2JzZXJ2YWJsZSA9IG9ic2VydmFibGU7XG5leHBvcnRzWydkZWZhdWx0J10gPSByaW90JDE7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG5cbn0pKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmlvdC9yaW90LmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cblxudmFyIG9ic2VydmFibGUgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgncmlvdC1vYnNlcnZhYmxlJykpO1xuXG4vKipcbiAqIFNpbXBsZSBjbGllbnQtc2lkZSByb3V0ZXJcbiAqIEBtb2R1bGUgcmlvdC1yb3V0ZVxuICovXG5cbnZhciBSRV9PUklHSU4gPSAvXi4rP1xcL1xcLytbXlxcL10rLztcbnZhciBFVkVOVF9MSVNURU5FUiA9ICdFdmVudExpc3RlbmVyJztcbnZhciBSRU1PVkVfRVZFTlRfTElTVEVORVIgPSAncmVtb3ZlJyArIEVWRU5UX0xJU1RFTkVSO1xudmFyIEFERF9FVkVOVF9MSVNURU5FUiA9ICdhZGQnICsgRVZFTlRfTElTVEVORVI7XG52YXIgSEFTX0FUVFJJQlVURSA9ICdoYXNBdHRyaWJ1dGUnO1xudmFyIFBPUFNUQVRFID0gJ3BvcHN0YXRlJztcbnZhciBIQVNIQ0hBTkdFID0gJ2hhc2hjaGFuZ2UnO1xudmFyIFRSSUdHRVIgPSAndHJpZ2dlcic7XG52YXIgTUFYX0VNSVRfU1RBQ0tfTEVWRUwgPSAzO1xudmFyIHdpbiA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93O1xudmFyIGRvYyA9IHR5cGVvZiBkb2N1bWVudCAhPSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudDtcbnZhciBoaXN0ID0gd2luICYmIGhpc3Rvcnk7XG52YXIgbG9jID0gd2luICYmIChoaXN0LmxvY2F0aW9uIHx8IHdpbi5sb2NhdGlvbik7XG52YXIgcHJvdCA9IFJvdXRlci5wcm90b3R5cGU7XG52YXIgY2xpY2tFdmVudCA9IGRvYyAmJiBkb2Mub250b3VjaHN0YXJ0ID8gJ3RvdWNoc3RhcnQnIDogJ2NsaWNrJztcbnZhciBjZW50cmFsID0gb2JzZXJ2YWJsZSgpO1xuXG52YXIgc3RhcnRlZCA9IGZhbHNlO1xudmFyIHJvdXRlRm91bmQgPSBmYWxzZTtcbnZhciBkZWJvdW5jZWRFbWl0O1xudmFyIGJhc2U7XG52YXIgY3VycmVudDtcbnZhciBwYXJzZXI7XG52YXIgc2Vjb25kUGFyc2VyO1xudmFyIGVtaXRTdGFjayA9IFtdO1xudmFyIGVtaXRTdGFja0xldmVsID0gMDtcblxuLyoqXG4gKiBEZWZhdWx0IHBhcnNlci4gWW91IGNhbiByZXBsYWNlIGl0IHZpYSByb3V0ZXIucGFyc2VyIG1ldGhvZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gY3VycmVudCBwYXRoIChub3JtYWxpemVkKVxuICogQHJldHVybnMge2FycmF5fSBhcnJheVxuICovXG5mdW5jdGlvbiBERUZBVUxUX1BBUlNFUihwYXRoKSB7XG4gIHJldHVybiBwYXRoLnNwbGl0KC9bLz8jXS8pXG59XG5cbi8qKlxuICogRGVmYXVsdCBwYXJzZXIgKHNlY29uZCkuIFlvdSBjYW4gcmVwbGFjZSBpdCB2aWEgcm91dGVyLnBhcnNlciBtZXRob2QuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGN1cnJlbnQgcGF0aCAobm9ybWFsaXplZClcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBmaWx0ZXIgc3RyaW5nIChub3JtYWxpemVkKVxuICogQHJldHVybnMge2FycmF5fSBhcnJheVxuICovXG5mdW5jdGlvbiBERUZBVUxUX1NFQ09ORF9QQVJTRVIocGF0aCwgZmlsdGVyKSB7XG4gIHZhciBmID0gZmlsdGVyXG4gICAgLnJlcGxhY2UoL1xcPy9nLCAnXFxcXD8nKVxuICAgIC5yZXBsYWNlKC9cXCovZywgJyhbXi8/I10rPyknKVxuICAgIC5yZXBsYWNlKC9cXC5cXC4vLCAnLionKTtcbiAgdmFyIHJlID0gbmV3IFJlZ0V4cCgoXCJeXCIgKyBmICsgXCIkXCIpKTtcbiAgdmFyIGFyZ3MgPSBwYXRoLm1hdGNoKHJlKTtcblxuICBpZiAoYXJncykgeyByZXR1cm4gYXJncy5zbGljZSgxKSB9XG59XG5cbi8qKlxuICogU2ltcGxlL2NoZWFwIGRlYm91bmNlIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7ZnVuY3Rpb259IGZuIC0gY2FsbGJhY2tcbiAqIEBwYXJhbSAgIHtudW1iZXJ9IGRlbGF5IC0gZGVsYXkgaW4gc2Vjb25kc1xuICogQHJldHVybnMge2Z1bmN0aW9ufSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZm4sIGRlbGF5KSB7XG4gIHZhciB0O1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0KTtcbiAgICB0ID0gc2V0VGltZW91dChmbiwgZGVsYXkpO1xuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSB3aW5kb3cgbGlzdGVuZXJzIHRvIHRyaWdnZXIgdGhlIHJvdXRlc1xuICogQHBhcmFtIHtib29sZWFufSBhdXRvRXhlYyAtIHNlZSByb3V0ZS5zdGFydFxuICovXG5mdW5jdGlvbiBzdGFydChhdXRvRXhlYykge1xuICBkZWJvdW5jZWRFbWl0ID0gZGVib3VuY2UoZW1pdCwgMSk7XG4gIHdpbltBRERfRVZFTlRfTElTVEVORVJdKFBPUFNUQVRFLCBkZWJvdW5jZWRFbWl0KTtcbiAgd2luW0FERF9FVkVOVF9MSVNURU5FUl0oSEFTSENIQU5HRSwgZGVib3VuY2VkRW1pdCk7XG4gIGRvY1tBRERfRVZFTlRfTElTVEVORVJdKGNsaWNrRXZlbnQsIGNsaWNrKTtcbiAgaWYgKGF1dG9FeGVjKSB7IGVtaXQodHJ1ZSk7IH1cbn1cblxuLyoqXG4gKiBSb3V0ZXIgY2xhc3NcbiAqL1xuZnVuY3Rpb24gUm91dGVyKCkge1xuICB0aGlzLiQgPSBbXTtcbiAgb2JzZXJ2YWJsZSh0aGlzKTsgLy8gbWFrZSBpdCBvYnNlcnZhYmxlXG4gIGNlbnRyYWwub24oJ3N0b3AnLCB0aGlzLnMuYmluZCh0aGlzKSk7XG4gIGNlbnRyYWwub24oJ2VtaXQnLCB0aGlzLmUuYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShwYXRoKSB7XG4gIHJldHVybiBwYXRoLnJlcGxhY2UoL15cXC98XFwvJC8sICcnKVxufVxuXG5mdW5jdGlvbiBpc1N0cmluZyhzdHIpIHtcbiAgcmV0dXJuIHR5cGVvZiBzdHIgPT0gJ3N0cmluZydcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhcnQgYWZ0ZXIgZG9tYWluIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIC0gZnVsbHBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBhdGggZnJvbSByb290XG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhGcm9tUm9vdChocmVmKSB7XG4gIHJldHVybiAoaHJlZiB8fCBsb2MuaHJlZikucmVwbGFjZShSRV9PUklHSU4sICcnKVxufVxuXG4vKipcbiAqIEdldCB0aGUgcGFydCBhZnRlciBiYXNlXG4gKiBAcGFyYW0ge3N0cmluZ30gaHJlZiAtIGZ1bGxwYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBwYXRoIGZyb20gYmFzZVxuICovXG5mdW5jdGlvbiBnZXRQYXRoRnJvbUJhc2UoaHJlZikge1xuICByZXR1cm4gYmFzZVswXSA9PT0gJyMnXG4gICAgPyAoaHJlZiB8fCBsb2MuaHJlZiB8fCAnJykuc3BsaXQoYmFzZSlbMV0gfHwgJydcbiAgICA6IChsb2MgPyBnZXRQYXRoRnJvbVJvb3QoaHJlZikgOiBocmVmIHx8ICcnKS5yZXBsYWNlKGJhc2UsICcnKVxufVxuXG5mdW5jdGlvbiBlbWl0KGZvcmNlKSB7XG4gIC8vIHRoZSBzdGFjayBpcyBuZWVkZWQgZm9yIHJlZGlyZWN0aW9uc1xuICB2YXIgaXNSb290ID0gZW1pdFN0YWNrTGV2ZWwgPT09IDA7XG4gIGlmIChNQVhfRU1JVF9TVEFDS19MRVZFTCA8PSBlbWl0U3RhY2tMZXZlbCkgeyByZXR1cm4gfVxuXG4gIGVtaXRTdGFja0xldmVsKys7XG4gIGVtaXRTdGFjay5wdXNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXRoID0gZ2V0UGF0aEZyb21CYXNlKCk7XG4gICAgaWYgKGZvcmNlIHx8IHBhdGggIT09IGN1cnJlbnQpIHtcbiAgICAgIGNlbnRyYWxbVFJJR0dFUl0oJ2VtaXQnLCBwYXRoKTtcbiAgICAgIGN1cnJlbnQgPSBwYXRoO1xuICAgIH1cbiAgfSk7XG4gIGlmIChpc1Jvb3QpIHtcbiAgICB2YXIgZmlyc3Q7XG4gICAgd2hpbGUgKGZpcnN0ID0gZW1pdFN0YWNrLnNoaWZ0KCkpIHsgZmlyc3QoKTsgfSAvLyBzdGFjayBpbmNyZXNlcyB3aXRoaW4gdGhpcyBjYWxsXG4gICAgZW1pdFN0YWNrTGV2ZWwgPSAwO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNsaWNrKGUpIHtcbiAgaWYgKFxuICAgIGUud2hpY2ggIT09IDEgLy8gbm90IGxlZnQgY2xpY2tcbiAgICB8fCBlLm1ldGFLZXkgfHwgZS5jdHJsS2V5IHx8IGUuc2hpZnRLZXkgLy8gb3IgbWV0YSBrZXlzXG4gICAgfHwgZS5kZWZhdWx0UHJldmVudGVkIC8vIG9yIGRlZmF1bHQgcHJldmVudGVkXG4gICkgeyByZXR1cm4gfVxuXG4gIHZhciBlbCA9IGUudGFyZ2V0O1xuICB3aGlsZSAoZWwgJiYgZWwubm9kZU5hbWUgIT09ICdBJykgeyBlbCA9IGVsLnBhcmVudE5vZGU7IH1cblxuICBpZiAoXG4gICAgIWVsIHx8IGVsLm5vZGVOYW1lICE9PSAnQScgLy8gbm90IEEgdGFnXG4gICAgfHwgZWxbSEFTX0FUVFJJQlVURV0oJ2Rvd25sb2FkJykgLy8gaGFzIGRvd25sb2FkIGF0dHJcbiAgICB8fCAhZWxbSEFTX0FUVFJJQlVURV0oJ2hyZWYnKSAvLyBoYXMgbm8gaHJlZiBhdHRyXG4gICAgfHwgZWwudGFyZ2V0ICYmIGVsLnRhcmdldCAhPT0gJ19zZWxmJyAvLyBhbm90aGVyIHdpbmRvdyBvciBmcmFtZVxuICAgIHx8IGVsLmhyZWYuaW5kZXhPZihsb2MuaHJlZi5tYXRjaChSRV9PUklHSU4pWzBdKSA9PT0gLTEgLy8gY3Jvc3Mgb3JpZ2luXG4gICkgeyByZXR1cm4gfVxuXG4gIGlmIChlbC5ocmVmICE9PSBsb2MuaHJlZlxuICAgICYmIChcbiAgICAgIGVsLmhyZWYuc3BsaXQoJyMnKVswXSA9PT0gbG9jLmhyZWYuc3BsaXQoJyMnKVswXSAvLyBpbnRlcm5hbCBqdW1wXG4gICAgICB8fCBiYXNlWzBdICE9PSAnIycgJiYgZ2V0UGF0aEZyb21Sb290KGVsLmhyZWYpLmluZGV4T2YoYmFzZSkgIT09IDAgLy8gb3V0c2lkZSBvZiBiYXNlXG4gICAgICB8fCBiYXNlWzBdID09PSAnIycgJiYgZWwuaHJlZi5zcGxpdChiYXNlKVswXSAhPT0gbG9jLmhyZWYuc3BsaXQoYmFzZSlbMF0gLy8gb3V0c2lkZSBvZiAjYmFzZVxuICAgICAgfHwgIWdvKGdldFBhdGhGcm9tQmFzZShlbC5ocmVmKSwgZWwudGl0bGUgfHwgZG9jLnRpdGxlKSAvLyByb3V0ZSBub3QgZm91bmRcbiAgICApKSB7IHJldHVybiB9XG5cbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufVxuXG4vKipcbiAqIEdvIHRvIHRoZSBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGRlc3RpbmF0aW9uIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZSAtIHBhZ2UgdGl0bGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc2hvdWxkUmVwbGFjZSAtIHVzZSByZXBsYWNlU3RhdGUgb3IgcHVzaFN0YXRlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gLSByb3V0ZSBub3QgZm91bmQgZmxhZ1xuICovXG5mdW5jdGlvbiBnbyhwYXRoLCB0aXRsZSwgc2hvdWxkUmVwbGFjZSkge1xuICAvLyBTZXJ2ZXItc2lkZSB1c2FnZTogZGlyZWN0bHkgZXhlY3V0ZSBoYW5kbGVycyBmb3IgdGhlIHBhdGhcbiAgaWYgKCFoaXN0KSB7IHJldHVybiBjZW50cmFsW1RSSUdHRVJdKCdlbWl0JywgZ2V0UGF0aEZyb21CYXNlKHBhdGgpKSB9XG5cbiAgcGF0aCA9IGJhc2UgKyBub3JtYWxpemUocGF0aCk7XG4gIHRpdGxlID0gdGl0bGUgfHwgZG9jLnRpdGxlO1xuICAvLyBicm93c2VycyBpZ25vcmVzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIGB0aXRsZWBcbiAgc2hvdWxkUmVwbGFjZVxuICAgID8gaGlzdC5yZXBsYWNlU3RhdGUobnVsbCwgdGl0bGUsIHBhdGgpXG4gICAgOiBoaXN0LnB1c2hTdGF0ZShudWxsLCB0aXRsZSwgcGF0aCk7XG4gIC8vIHNvIHdlIG5lZWQgdG8gc2V0IGl0IG1hbnVhbGx5XG4gIGRvYy50aXRsZSA9IHRpdGxlO1xuICByb3V0ZUZvdW5kID0gZmFsc2U7XG4gIGVtaXQoKTtcbiAgcmV0dXJuIHJvdXRlRm91bmRcbn1cblxuLyoqXG4gKiBHbyB0byBwYXRoIG9yIHNldCBhY3Rpb25cbiAqIGEgc2luZ2xlIHN0cmluZzogICAgICAgICAgICAgICAgZ28gdGhlcmVcbiAqIHR3byBzdHJpbmdzOiAgICAgICAgICAgICAgICAgICAgZ28gdGhlcmUgd2l0aCBzZXR0aW5nIGEgdGl0bGVcbiAqIHR3byBzdHJpbmdzIGFuZCBib29sZWFuOiAgICAgICAgcmVwbGFjZSBoaXN0b3J5IHdpdGggc2V0dGluZyBhIHRpdGxlXG4gKiBhIHNpbmdsZSBmdW5jdGlvbjogICAgICAgICAgICAgIHNldCBhbiBhY3Rpb24gb24gdGhlIGRlZmF1bHQgcm91dGVcbiAqIGEgc3RyaW5nL1JlZ0V4cCBhbmQgYSBmdW5jdGlvbjogc2V0IGFuIGFjdGlvbiBvbiB0aGUgcm91dGVcbiAqIEBwYXJhbSB7KHN0cmluZ3xmdW5jdGlvbil9IGZpcnN0IC0gcGF0aCAvIGFjdGlvbiAvIGZpbHRlclxuICogQHBhcmFtIHsoc3RyaW5nfFJlZ0V4cHxmdW5jdGlvbil9IHNlY29uZCAtIHRpdGxlIC8gYWN0aW9uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHRoaXJkIC0gcmVwbGFjZSBmbGFnXG4gKi9cbnByb3QubSA9IGZ1bmN0aW9uKGZpcnN0LCBzZWNvbmQsIHRoaXJkKSB7XG4gIGlmIChpc1N0cmluZyhmaXJzdCkgJiYgKCFzZWNvbmQgfHwgaXNTdHJpbmcoc2Vjb25kKSkpIHsgZ28oZmlyc3QsIHNlY29uZCwgdGhpcmQgfHwgZmFsc2UpOyB9XG4gIGVsc2UgaWYgKHNlY29uZCkgeyB0aGlzLnIoZmlyc3QsIHNlY29uZCk7IH1cbiAgZWxzZSB7IHRoaXMucignQCcsIGZpcnN0KTsgfVxufTtcblxuLyoqXG4gKiBTdG9wIHJvdXRpbmdcbiAqL1xucHJvdC5zID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMub2ZmKCcqJyk7XG4gIHRoaXMuJCA9IFtdO1xufTtcblxuLyoqXG4gKiBFbWl0XG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIHBhdGhcbiAqL1xucHJvdC5lID0gZnVuY3Rpb24ocGF0aCkge1xuICB0aGlzLiQuY29uY2F0KCdAJykuc29tZShmdW5jdGlvbihmaWx0ZXIpIHtcbiAgICB2YXIgYXJncyA9IChmaWx0ZXIgPT09ICdAJyA/IHBhcnNlciA6IHNlY29uZFBhcnNlcikobm9ybWFsaXplKHBhdGgpLCBub3JtYWxpemUoZmlsdGVyKSk7XG4gICAgaWYgKHR5cGVvZiBhcmdzICE9ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzW1RSSUdHRVJdLmFwcGx5KG51bGwsIFtmaWx0ZXJdLmNvbmNhdChhcmdzKSk7XG4gICAgICByZXR1cm4gcm91dGVGb3VuZCA9IHRydWUgLy8gZXhpdCBmcm9tIGxvb3BcbiAgICB9XG4gIH0sIHRoaXMpO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciByb3V0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbHRlciAtIGZpbHRlciBmb3IgbWF0Y2hpbmcgdG8gdXJsXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBhY3Rpb24gLSBhY3Rpb24gdG8gcmVnaXN0ZXJcbiAqL1xucHJvdC5yID0gZnVuY3Rpb24oZmlsdGVyLCBhY3Rpb24pIHtcbiAgaWYgKGZpbHRlciAhPT0gJ0AnKSB7XG4gICAgZmlsdGVyID0gJy8nICsgbm9ybWFsaXplKGZpbHRlcik7XG4gICAgdGhpcy4kLnB1c2goZmlsdGVyKTtcbiAgfVxuICB0aGlzLm9uKGZpbHRlciwgYWN0aW9uKTtcbn07XG5cbnZhciBtYWluUm91dGVyID0gbmV3IFJvdXRlcigpO1xudmFyIHJvdXRlID0gbWFpblJvdXRlci5tLmJpbmQobWFpblJvdXRlcik7XG5cbi8qKlxuICogQ3JlYXRlIGEgc3ViIHJvdXRlclxuICogQHJldHVybnMge2Z1bmN0aW9ufSB0aGUgbWV0aG9kIG9mIGEgbmV3IFJvdXRlciBvYmplY3RcbiAqL1xucm91dGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIHZhciBuZXdTdWJSb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG4gIC8vIGFzc2lnbiBzdWItcm91dGVyJ3MgbWFpbiBtZXRob2RcbiAgdmFyIHJvdXRlciA9IG5ld1N1YlJvdXRlci5tLmJpbmQobmV3U3ViUm91dGVyKTtcbiAgLy8gc3RvcCBvbmx5IHRoaXMgc3ViLXJvdXRlclxuICByb3V0ZXIuc3RvcCA9IG5ld1N1YlJvdXRlci5zLmJpbmQobmV3U3ViUm91dGVyKTtcbiAgcmV0dXJuIHJvdXRlclxufTtcblxuLyoqXG4gKiBTZXQgdGhlIGJhc2Ugb2YgdXJsXG4gKiBAcGFyYW0geyhzdHJ8UmVnRXhwKX0gYXJnIC0gYSBuZXcgYmFzZSBvciAnIycgb3IgJyMhJ1xuICovXG5yb3V0ZS5iYXNlID0gZnVuY3Rpb24oYXJnKSB7XG4gIGJhc2UgPSBhcmcgfHwgJyMnO1xuICBjdXJyZW50ID0gZ2V0UGF0aEZyb21CYXNlKCk7IC8vIHJlY2FsY3VsYXRlIGN1cnJlbnQgcGF0aFxufTtcblxuLyoqIEV4ZWMgcm91dGluZyByaWdodCBub3cgKiovXG5yb3V0ZS5leGVjID0gZnVuY3Rpb24oKSB7XG4gIGVtaXQodHJ1ZSk7XG59O1xuXG4vKipcbiAqIFJlcGxhY2UgdGhlIGRlZmF1bHQgcm91dGVyIHRvIHlvdXJzXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbiAtIHlvdXIgcGFyc2VyIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmbjIgLSB5b3VyIHNlY29uZFBhcnNlciBmdW5jdGlvblxuICovXG5yb3V0ZS5wYXJzZXIgPSBmdW5jdGlvbihmbiwgZm4yKSB7XG4gIGlmICghZm4gJiYgIWZuMikge1xuICAgIC8vIHJlc2V0IHBhcnNlciBmb3IgdGVzdGluZy4uLlxuICAgIHBhcnNlciA9IERFRkFVTFRfUEFSU0VSO1xuICAgIHNlY29uZFBhcnNlciA9IERFRkFVTFRfU0VDT05EX1BBUlNFUjtcbiAgfVxuICBpZiAoZm4pIHsgcGFyc2VyID0gZm47IH1cbiAgaWYgKGZuMikgeyBzZWNvbmRQYXJzZXIgPSBmbjI7IH1cbn07XG5cbi8qKlxuICogSGVscGVyIGZ1bmN0aW9uIHRvIGdldCB1cmwgcXVlcnkgYXMgYW4gb2JqZWN0XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBwYXJzZWQgcXVlcnlcbiAqL1xucm91dGUucXVlcnkgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHEgPSB7fTtcbiAgdmFyIGhyZWYgPSBsb2MuaHJlZiB8fCBjdXJyZW50O1xuICBocmVmLnJlcGxhY2UoL1s/Jl0oLis/KT0oW14mXSopL2csIGZ1bmN0aW9uKF8sIGssIHYpIHsgcVtrXSA9IHY7IH0pO1xuICByZXR1cm4gcVxufTtcblxuLyoqIFN0b3Agcm91dGluZyAqKi9cbnJvdXRlLnN0b3AgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChzdGFydGVkKSB7XG4gICAgaWYgKHdpbikge1xuICAgICAgd2luW1JFTU9WRV9FVkVOVF9MSVNURU5FUl0oUE9QU1RBVEUsIGRlYm91bmNlZEVtaXQpO1xuICAgICAgd2luW1JFTU9WRV9FVkVOVF9MSVNURU5FUl0oSEFTSENIQU5HRSwgZGVib3VuY2VkRW1pdCk7XG4gICAgICBkb2NbUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXShjbGlja0V2ZW50LCBjbGljayk7XG4gICAgfVxuICAgIGNlbnRyYWxbVFJJR0dFUl0oJ3N0b3AnKTtcbiAgICBzdGFydGVkID0gZmFsc2U7XG4gIH1cbn07XG5cbi8qKlxuICogU3RhcnQgcm91dGluZ1xuICogQHBhcmFtIHtib29sZWFufSBhdXRvRXhlYyAtIGF1dG9tYXRpY2FsbHkgZXhlYyBhZnRlciBzdGFydGluZyBpZiB0cnVlXG4gKi9cbnJvdXRlLnN0YXJ0ID0gZnVuY3Rpb24gKGF1dG9FeGVjKSB7XG4gIGlmICghc3RhcnRlZCkge1xuICAgIGlmICh3aW4pIHtcbiAgICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7IHN0YXJ0KGF1dG9FeGVjKTsgfVxuICAgICAgLy8gdGhlIHRpbWVvdXQgaXMgbmVlZGVkIHRvIHNvbHZlXG4gICAgICAvLyBhIHdlaXJkIHNhZmFyaSBidWcgaHR0cHM6Ly9naXRodWIuY29tL3Jpb3Qvcm91dGUvaXNzdWVzLzMzXG4gICAgICBlbHNlIHsgd2luW0FERF9FVkVOVF9MSVNURU5FUl0oJ2xvYWQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgc3RhcnQoYXV0b0V4ZWMpOyB9LCAxKTtcbiAgICAgIH0pOyB9XG4gICAgfVxuICAgIHN0YXJ0ZWQgPSB0cnVlO1xuICB9XG59O1xuXG4vKiogUHJlcGFyZSB0aGUgcm91dGVyICoqL1xucm91dGUuYmFzZSgpO1xucm91dGUucGFyc2VyKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm91dGU7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmlvdC1yb3V0ZS9kaXN0L2Nqcy5yb3V0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIjsoZnVuY3Rpb24od2luZG93LCB1bmRlZmluZWQpIHt2YXIgb2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKGVsKSB7XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgb3JpZ2luYWwgb2JqZWN0IG9yIGNyZWF0ZSBhIG5ldyBlbXB0eSBvbmVcbiAgICogQHR5cGUgeyBPYmplY3QgfVxuICAgKi9cblxuICBlbCA9IGVsIHx8IHt9XG5cbiAgLyoqXG4gICAqIFByaXZhdGUgdmFyaWFibGVzXG4gICAqL1xuICB2YXIgY2FsbGJhY2tzID0ge30sXG4gICAgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2VcblxuICAvKipcbiAgICogUHVibGljIEFwaVxuICAgKi9cblxuICAvLyBleHRlbmQgdGhlIGVsIG9iamVjdCBhZGRpbmcgdGhlIG9ic2VydmFibGUgbWV0aG9kc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlbCwge1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRzXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBlYWNoIHRpbWUgYW4gZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICAgICAqIEBwYXJhbSAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgKGNhbGxiYWNrc1tldmVudF0gPSBjYWxsYmFja3NbZXZlbnRdIHx8IFtdKS5wdXNoKGZuKVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgZ2l2ZW4gYGV2ZW50YCBsaXN0ZW5lcnNcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvZmY6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKGV2ZW50ID09ICcqJyAmJiAhZm4pIGNhbGxiYWNrcyA9IHt9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgdmFyIGFyciA9IGNhbGxiYWNrc1tldmVudF1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBjYjsgY2IgPSBhcnIgJiYgYXJyW2ldOyArK2kpIHtcbiAgICAgICAgICAgICAgaWYgKGNiID09IGZuKSBhcnIuc3BsaWNlKGktLSwgMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgZGVsZXRlIGNhbGxiYWNrc1tldmVudF1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZFxuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgYXQgbW9zdCBvbmNlXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb25lOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgIGVsLm9mZihldmVudCwgb24pXG4gICAgICAgICAgZm4uYXBwbHkoZWwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWwub24oZXZlbnQsIG9uKVxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBFeGVjdXRlIGFsbCBjYWxsYmFjayBmdW5jdGlvbnMgdGhhdCBsaXN0ZW4gdG9cbiAgICAgKiB0aGUgZ2l2ZW4gYGV2ZW50YFxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICB0cmlnZ2VyOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBnZXR0aW5nIHRoZSBhcmd1bWVudHNcbiAgICAgICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxLFxuICAgICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYXJnbGVuKSxcbiAgICAgICAgICBmbnMsXG4gICAgICAgICAgZm4sXG4gICAgICAgICAgaVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmdsZW47IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHNbaSArIDFdIC8vIHNraXAgZmlyc3QgYXJndW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGZucyA9IHNsaWNlLmNhbGwoY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSwgMClcblxuICAgICAgICBmb3IgKGkgPSAwOyBmbiA9IGZuc1tpXTsgKytpKSB7XG4gICAgICAgICAgZm4uYXBwbHkoZWwsIGFyZ3MpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2tzWycqJ10gJiYgZXZlbnQgIT0gJyonKVxuICAgICAgICAgIGVsLnRyaWdnZXIuYXBwbHkoZWwsIFsnKicsIGV2ZW50XS5jb25jYXQoYXJncykpXG5cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBlbFxuXG59XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIC8vIHN1cHBvcnQgQ29tbW9uSlMsIEFNRCAmIGJyb3dzZXJcbiAgaWYgKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JylcbiAgICBtb2R1bGUuZXhwb3J0cyA9IG9ic2VydmFibGVcbiAgZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuICAgIGRlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIG9ic2VydmFibGUgfSlcbiAgZWxzZVxuICAgIHdpbmRvdy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZVxuXG59KSh0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnID8gd2luZG93IDogdW5kZWZpbmVkKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vcmlvdC1vYnNlcnZhYmxlL2Rpc3Qvb2JzZXJ2YWJsZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlxucmlvdC50YWcyKCduYXZiYXInLCAnPG5hdiBjbGFzcz1cIm5hdmJhclwiPiA8dWwgY2xhc3M9XCJuYXZiYXItbmF2IHtvcGVuOiBpc09wZW59XCI+IDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtYW5jaG9yXCIgaHJlZj1cIiMvc2VhcmNoXCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1hbmRyb2lkLXNlYXJjaFwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7mpJzntKI8L2Rpdj48L2E+PC9saT4gPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1hbmNob3JcIiBocmVmPVwiIy9zY2hlZHVsZVwiPiA8ZGl2IGNsYXNzPVwiaWNvbiBpb24taW9zLWNhbGVuZGFyLW91dGxpbmVcIj48L2Rpdj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+5pmC6ZaT5YmyPC9kaXY+PC9hPjwvbGk+IDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtYW5jaG9yXCIgaHJlZj1cIiMvaW5mb1wiPiA8ZGl2IGNsYXNzPVwiaWNvbiBpb24taW9zLWluZm9ybWF0aW9uLW91dGxpbmVcIj48L2Rpdj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+44GK44GX44KJ44GbPC9kaXY+PC9hPjwvbGk+IDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PHNwYW4gY2xhc3M9XCJuYXYtYW5jaG9yXCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1pb3MtZ3JpZC12aWV3LW91dGxpbmVcIj48L2Rpdj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+5rqW5YKZ5LitPC9kaXY+PC9zcGFuPjwvbGk+IDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtYW5jaG9yXCIgaHJlZj1cIi8vd3d3LnViZS1rLmFjLmpwL2hha3VjaG8tZG9taXRvcnkvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1pb3MtaG9tZS1vdXRsaW5lXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPueZvemzpeWvrjwvZGl2PjwvYT48L2xpPiA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPjxhIGNsYXNzPVwibmF2LWFuY2hvclwiIGhyZWY9XCIvL3R3aXR0ZXIuY29tL3Vzd2FuMl9cIiB0YXJnZXQ9XCJfYmxhbmtcIj4gPGRpdiBjbGFzcz1cImljb24gaW9uLXNvY2lhbC10d2l0dGVyLW91dGxpbmVcIj48L2Rpdj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+VHdpdHRlcjwvZGl2PjwvYT48L2xpPiA8L3VsPiA8ZGl2IGNsYXNzPVwibmF2LWxhcmdlXCI+PGEgY2xhc3M9XCJuYXYtbGFyZ2Utd3JhcHBlclwiIGhyZWY9XCIjL21lbnVcIj4gPGRpdiBjbGFzcz1cImljb24gaW9uLWNvZmZlZVwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7njK7nq4vooag8L2Rpdj48L2E+PC9kaXY+IDxkaXYgY2xhc3M9XCJuYXYtbW9yZVwiPjxhIGNsYXNzPVwibmF2LWFuY2hvciB7b3BlbjogaXNPcGVufVwiIGhyZWY9XCIjXCIgb25jbGljaz1cInt0b2dnbGVNb3JlTWVudX1cIj4gPGRpdiBjbGFzcz1cIm5hdmljb24gaW9uLW5hdmljb25cIj48L2Rpdj4gPGRpdiBjbGFzcz1cImNsb3NlciBpb24tYW5kcm9pZC1jbG9zZVwiPjwvZGl2PjwvYT48L2Rpdj4gPC9uYXY+IDxzaWRlLW1lbnU+PC9zaWRlLW1lbnU+JywgJ25hdmJhciAubmF2YmFyLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXJ7IHBvc2l0aW9uOiBmaXhlZDsgYm90dG9tOiAwOyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAwOyBwYWRkaW5nOiAwIDYwcHggMCAxMTBweDsgYm94LXNpemluZzogYm9yZGVyLWJveDsgei1pbmRleDogMTAwOyB9IG5hdmJhciAubmF2YmFyIC5uYXZiYXItbmF2LFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXZ7IGhlaWdodDogMTEwcHg7IG1hcmdpbjogMCAtNjBweCAwIC01NXB4OyBwYWRkaW5nOiAwIDYwcHggMCA1NXB4OyBiYWNrZ3JvdW5kOiAjZmZmOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTU1cHgpOyB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4zcyBlYXNlOyB9IG5hdmJhciAubmF2YmFyIC5uYXZiYXItbmF2Lm9wZW4sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2YmFyLW5hdi5vcGVueyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTExMHB4KTsgfSBuYXZiYXIgLm5hdmJhciAubmF2YmFyLW5hdiAubmF2LWl0ZW0sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2YmFyLW5hdiAubmF2LWl0ZW17IGZsb2F0OiBsZWZ0OyB3aWR0aDogMzMuMzMzJTsgaGVpZ2h0OiA1NXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yeyBkaXNwbGF5OiBibG9jazsgcGFkZGluZzogNXB4IDA7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgY29sb3I6ICMyMjI7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yIC5pY29uLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yIC5pY29ueyBsaW5lLWhlaWdodDogMzBweDsgZm9udC1zaXplOiAyNXB4OyB9IG5hdmJhciAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvciAubGFiZWwsW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2YmFyLW5hdiAubmF2LWl0ZW0gLm5hdi1hbmNob3IgLmxhYmVseyBsaW5lLWhlaWdodDogMTVweDsgZm9udC1zaXplOiAxMHB4OyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbGFyZ2UsW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LWxhcmdleyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMDsgbGVmdDogMDsgd2lkdGg6IDExMHB4OyBoZWlnaHQ6IDExMHB4OyBiYWNrZ3JvdW5kOiAjZmZmOyBib3JkZXItcmFkaXVzOiAxMDAlOyBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAwOyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1sYXJnZSAubmF2LWxhcmdlLXdyYXBwZXJ7IHBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiA5NnB4OyBoZWlnaHQ6IDk2cHg7IG1hcmdpbjogNXB4OyBib3JkZXItcmFkaXVzOiAxMDAlOyBib3JkZXI6IDJweCBzb2xpZCAjMjIyOyBjb2xvcjogIzIyMjsgfSBuYXZiYXIgLm5hdmJhciAubmF2LWxhcmdlIC5uYXYtbGFyZ2Utd3JhcHBlciAuaWNvbixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyIC5pY29ueyBmb250LXNpemU6IDQwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsgbGluZS1oZWlnaHQ6IDgwcHg7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1sYXJnZSAubmF2LWxhcmdlLXdyYXBwZXIgLmxhYmVsLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1sYXJnZSAubmF2LWxhcmdlLXdyYXBwZXIgLmxhYmVseyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogNXB4OyBsZWZ0OiAwOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAzNXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQtc2l6ZTogMTJweDsgbGluZS1oZWlnaHQ6IDM1cHg7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1tb3JlLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1tb3JleyBwb3NpdGlvbjogYWJzb2x1dGU7IGJvdHRvbTogMDsgcmlnaHQ6IDA7IG92ZXJmbG93OiBoaWRkZW47IHdpZHRoOiA2MHB4OyBoZWlnaHQ6IDU1cHg7IGZvbnQtc2l6ZTogMzZweDsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IsW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3J7IHBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogYmxvY2s7IGNvbG9yOiAjMjIyOyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvciA+IGRpdixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvciA+IGRpdnsgcG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogNjBweDsgaGVpZ2h0OiA1NXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiA1NXB4OyB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlOyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvciAubmF2aWNvbixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvciAubmF2aWNvbnsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvciAuY2xvc2VyLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yIC5jbG9zZXJ7IG9wYWNpdHk6IDA7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxMnB4KTsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3Iub3BlbiAubmF2aWNvbixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvci5vcGVuIC5uYXZpY29ueyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEycHgpOyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvci5vcGVuIC5jbG9zZXIsW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3Iub3BlbiAuY2xvc2VyeyBvcGFjaXR5OiAxOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7IH0nLCAnJywgZnVuY3Rpb24ob3B0cykge1xudmFyIF90aGlzID0gdGhpcztcblxuY29uc3QgdSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzJyk7XG5jb25zdCBvYnMgPSB1Lm9ic2VydmFibGUoKTtcblxudGhpcy5pc09wZW4gPSBmYWxzZTtcbnRoaXMudG9nZ2xlTW9yZU1lbnUgPSBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgX3RoaXMuaXNPcGVuID0gIV90aGlzLmlzT3BlbjtcbiAgICBvYnMudHJpZ2dlcignc2lkZS1tZW51OnRvZ2dsZScpO1xufTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3RhZ3MvcHVibGljL2NvbW1vbi9uYXZiYXIudGFnIiwiaW1wb3J0IG9ic2VydmFibGUgZnJvbSAncmlvdC1vYnNlcnZhYmxlJztcclxuXHJcbmNvbnN0IG9icyA9IG9ic2VydmFibGUoKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgb2JzZXJ2YWJsZTogKCkgPT4ge1xyXG4gICAgICAgIHJldHVybiBvYnM7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy91dGlscy5qcyIsImltcG9ydCByb3V0ZSBmcm9tICdyaW90LXJvdXRlJztcclxuXHJcbnJvdXRlKCcvJywgKCkgPT4ge1xyXG4gICAgbG9jYXRpb24uaGFzaCA9ICcjL21lbnUnO1xyXG59KTtcclxuXHJcbnJvdXRlKCcvbWVudScsICgpID0+IHtcclxuICAgIHJlcXVpcmUoJy4uL3RhZ3MvcHVibGljL21lbnUnKTtcclxuICAgIHJlcXVpcmUoJy4uL3RhZ3MvcHVibGljL2RhaWx5LW1lbnUnKTtcclxuICAgIHJlcXVpcmUoJy4uL3RhZ3MvcHVibGljL21lbnUtaXRlbScpO1xyXG4gICAgcmlvdC5tb3VudCgncm91dGVyJywgJ21lbnUnKTtcclxufSk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIHN0YXJ0OiAoKSA9PiB7XHJcbiAgICAgICAgcm91dGUuc3RhcnQodHJ1ZSk7XHJcbiAgICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9wdWJsaWMvcm91dGVyLmpzIiwiXG5yaW90LnRhZzIoJ21lbnUnLCAnPGRhaWx5LW1lbnU+PC9kYWlseS1tZW51PiA8aDI+PHNwYW4gY2xhc3M9XCJqYVwiPu+8kuaciDwvc3Bhbj48c3BhbiBjbGFzcz1cImVuXCI+RmVicnVhcnk8L3NwYW4+PC9oMj4gPG1lbnUtaXRlbT48L21lbnUtaXRlbT4gPG1lbnUtaXRlbT48L21lbnUtaXRlbT4gPG1lbnUtaXRlbT48L21lbnUtaXRlbT4gPG1lbnUtaXRlbT48L21lbnUtaXRlbT4gPG1lbnUtaXRlbT48L21lbnUtaXRlbT4gPG1lbnUtaXRlbT48L21lbnUtaXRlbT4nLCAnbWVudSBoMixbZGF0YS1pcz1cIm1lbnVcIl0gaDJ7IG1hcmdpbjogMTJweCAxMHB4OyB9IG1lbnUgaDIgLmphLFtkYXRhLWlzPVwibWVudVwiXSBoMiAuamF7IGZvbnQtc2l6ZTogMjRweDsgfSBtZW51IGgyIC5lbixbZGF0YS1pcz1cIm1lbnVcIl0gaDIgLmVueyBmb250LXNpemU6IDE0cHg7IH0nLCAnJywgZnVuY3Rpb24ob3B0cykge1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvbWVudS50YWciLCJcbnJpb3QudGFnMignc2lkZS1tZW51JywgJzxkaXYgY2xhc3M9XCJzaWRlLW1lbnUge29wZW46IGlzT3Blbn1cIj4gPGhlYWRlcj4gPGRpdiBjbGFzcz1cImJyYW5kXCI+44OH44K444K/44Or54mIIOeZvemzpeWvrueMrueri+ihqDwvZGl2PiA8L2hlYWRlcj4gPG1haW4+IDxkaXYgY2xhc3M9XCJwcmVmZXJlbmNlc1wiPiA8aDM+44OV44Kj44O844OJ44OQ44OD44KvPC9oMz4gPHA+44GU5oyH5pGY44O744GU5oSP6KaL44Gq44Gp44GK5rCX6Lu944Gr44GK6YCB44KK44GP44Gg44GV44GE77yBPC9wPiA8Zm9ybSBjbGFzcz1cImZlZWRiYWNrLWZvcm1cIiBvbnN1Ym1pdD1cInJldHVybiBmYWxzZVwiPiA8dGV4dGFyZWEgcGxhY2Vob2xkZXI9XCLlhoXlrrnjga/lhazplovjgZXjgozjgb7jgZnjgILlgIvkurrmg4XloLHjga7oqJjovInjga/jgZTpgaDmha7kuIvjgZXjgYTjgIJcIj48L3RleHRhcmVhPiA8L2Zvcm0+IDxoMz7oqK3lrpo8L2gzPiA8ZGw+IDxkdD7mnIDliJ3jgavooajnpLrjgZnjgovjg5rjg7zjgrg8L2R0PiA8ZGQ+IDxkaXYgY2xhc3M9XCJzZWxlY3QtZnVsbFwiPiA8ZGl2IGNsYXNzPVwibGFiZWxcIj57Zmlyc3RWYWx1ZSB8fCBcXCfku4rmnIjjga7njK7nq4tcXCd9PC9kaXY+IDxzZWxlY3QgY2xhc3M9XCJpbnB1dFwiIG9uY2hhbmdlPVwie3VwZGF0ZUZpcnN0Vmlld31cIj4gPG9wdGlvbiB2YWx1ZT1cIiMvbWVudVwiPuS7iuaXpeOBi+OCieOBrueMruerizwvb3B0aW9uPiA8b3B0aW9uIHZhbHVlPVwiXCI+5pmC6ZaT5YmyPC9vcHRpb24+IDxvcHRpb24gdmFsdWU9XCJcIj7jgYrjgZfjgonjgZs8L29wdGlvbj4gPC9zZWxlY3Q+IDwvZGl2PiA8L2RkPiA8ZHQ+44OH44OV44Kp44Or44OI44Gu44Kv44Op44K5IDxkaXYgY2xhc3M9XCJzZWxlY3RcIj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+PC9kaXY+IDwvZGl2PiA8L2R0PiA8L2RsPiA8L2Rpdj4gPC9tYWluPiA8L2Rpdj4nLCAnc2lkZS1tZW51IC5zaWRlLW1lbnUsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudXsgcG9zaXRpb246IGZpeGVkOyB0b3A6IDA7IHJpZ2h0OiAtMjQwcHg7IGJvdHRvbTogNTVweDsgb3ZlcmZsb3cteTogYXV0bzsgd2lkdGg6IDI0MHB4OyBwYWRkaW5nLWJvdHRvbTogNTVweDsgYmFja2dyb3VuZDogI2ZmZjsgYm94LXNpemluZzogYm9yZGVyLWJveDsgdHJhbnNpdGlvbjogcmlnaHQgMC4zcyBlYXNlOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51Lm9wZW4sW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudS5vcGVueyByaWdodDogMDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBoZWFkZXIsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBoZWFkZXJ7IHBvc2l0aW9uOiByZWxhdGl2ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTIwcHg7IGJhY2tncm91bmQ6ICNhZDE1MTQ7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgaGVhZGVyIC5icmFuZCxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IGhlYWRlciAuYnJhbmR7IGhlaWdodDogMTIwcHg7IGNvbG9yOiAjZmZmOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiAxMjBweDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBoZWFkZXIgLnZlcnNpb24sW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBoZWFkZXIgLnZlcnNpb257IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyByaWdodDogMDsgbWFyZ2luOiA1cHggOHB4OyBjb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwwLjQpOyBmb250LXNpemU6IDEwcHg7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbixbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW57IGJhY2tncm91bmQ6ICNmZmY7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAubWVudS1uYXYsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5tZW51LW5hdnsgcGFkZGluZzogMjVweCAwOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLm1lbnUtbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvcixbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLm1lbnUtbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvcnsgZGlzcGxheTogYmxvY2s7IGhlaWdodDogNTBweDsgcGFkZGluZzogMCAyMHB4OyBmb250LXNpemU6IDE1cHg7IGxpbmUtaGVpZ2h0OiA1MHB4OyBjb2xvcjogIzQ0NGE1YTsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXN7IG1hcmdpbjogMCAxNXB4IDA7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgaDMsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBoM3sgY29sb3I6ICM0NDQ7IGZvbnQtc2l6ZTogMTZweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZHQsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkdHsgZm9udC1zaXplOiAxNHB4OyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGRkIC5zZWxlY3QtZnVsbCxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGRkIC5zZWxlY3QtZnVsbHsgcG9zaXRpb246IHJlbGF0aXZlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAzNXB4OyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGRkIC5zZWxlY3QtZnVsbCAubGFiZWwsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkZCAuc2VsZWN0LWZ1bGwgLmxhYmVseyBwb3NpdGlvbjogYWJzb2x1dGU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDM1cHg7IGJhY2tncm91bmQ6ICNmZmY7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IGJvcmRlcjogMXB4IHNvbGlkICNjY2M7IGJvcmRlci1yYWRpdXM6IDVweDsgbGluZS1oZWlnaHQ6IDM1cHg7IGZvbnQtc2l6ZTogMTJweDsgdGV4dC1hbGlnbjogY2VudGVyOyB6LWluZGV4OiAxOyBwb2ludGVyLWV2ZW50czogbm9uZTsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkZCAuc2VsZWN0LWZ1bGwgLmlucHV0LFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZGQgLnNlbGVjdC1mdWxsIC5pbnB1dHsgcG9zaXRpb246IGFic29sdXRlOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzVweDsgfScsICcnLCBmdW5jdGlvbihvcHRzKSB7XG52YXIgX3RoaXMgPSB0aGlzO1xuXG5jb25zdCB1ID0gcmVxdWlyZSgnLi4vLi4vLi4vdXRpbHMnKTtcblxuY29uc3Qgb2JzID0gdS5vYnNlcnZhYmxlKCk7XG5cbnRoaXMudXBkYXRlRmlyc3RWaWV3ID0gZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIF90aGlzLmZpcnN0VmFsdWUgPSBlLnRhcmdldC5zZWxlY3RlZE9wdGlvbnNbMF0udGV4dDtcbn07XG5cbnRoaXMuaXNPcGVuID0gZmFsc2U7XG5cbm9icy5vbignc2lkZS1tZW51OnRvZ2dsZScsICgpID0+IHtcbiAgICBfdGhpcy5pc09wZW4gPSAhX3RoaXMuaXNPcGVuO1xuICAgIF90aGlzLnVwZGF0ZSgpO1xufSk7XG5cbm9icy5vbignc2lkZS1tZW51Om9wZW4nLCAoKSA9PiB7XG4gICAgX3RoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICBfdGhpcy51cGRhdGUoKTtcbn0pO1xuXG5vYnMub24oJ3NpZGUtbWVudTpjbG9zZScsICgpID0+IHtcbiAgICBfdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICBfdGhpcy51cGRhdGUoKTtcbn0pO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvY29tbW9uL3NpZGUtbWVudS50YWciLCJcbnJpb3QudGFnMignZGFpbHktbWVudScsICc8ZGl2IGNsYXNzPVwiZGFpbHktbWVudVwiPiA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+5LuK5pel44Gu54yu56uLPC9kaXY+IDxkaXYgY2xhc3M9XCJtYWluXCI+IDxkaXYgY2xhc3M9XCJtZW51LWl0ZW0ge29wZW46IGlzT3BlbiA9PSBcXCdicmVha2Zhc3RcXCcsIGRhaWx5TWVudUluaXQ6IGluaXQgPT0gXFwnYnJlYWtmYXN0XFwnfVwiIGlkPVwiZGFpbHlNZW51LWJyZWFrZmFzdFwiIG9uY2xpY2s9XCJ7b3BlbihcXCdicmVha2Zhc3RcXCcpfVwiPiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7mnJ08L2Rpdj4gPGRpdiBjbGFzcz1cIm1lbnUtYm9keVwiPiA8ZGl2IGNsYXNzPVwibWVudS1tYWluXCI+IDxkaXYgY2xhc3M9XCJtYWluLWJyZWFrZmFzdFwiPjxzcGFuIGNsYXNzPVwibWFpbi1pdGVtXCIgaWY9XCJ7dG9kYXkuYnJlYWtmYXN0LmphcH1cIj57dG9kYXkuYnJlYWtmYXN0LmphcH08L3NwYW4+PHNwYW4gY2xhc3M9XCJtYWluLWl0ZW1cIiBpZj1cInt0b2RheS5icmVha2Zhc3Qud2VzfVwiPnt0b2RheS5icmVha2Zhc3Qud2VzfTwvc3Bhbj48L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LXNpZGVcIj4gPHVsPiA8bGkgZWFjaD1cIntpdGVtIGluIHRvZGF5LmJyZWFrZmFzdC5zaWRlfVwiPntpdGVtfTwvbGk+IDwvdWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LWl0ZW0ge29wZW46IGlzT3BlbiA9PSBcXCdsdW5jaFxcJywgZGFpbHlNZW51SW5pdDogaW5pdCA9PSBcXCdsdW5jaFxcJ31cIiBpZD1cImRhaWx5TWVudS1sdW5jaFwiIG9uY2xpY2s9XCJ7b3BlbihcXCdsdW5jaFxcJyl9XCI+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPuaYvDwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudS1ib2R5XCI+IDxkaXYgY2xhc3M9XCJtZW51LW1haW5cIj57dG9kYXkubHVuY2gubWFpbn08L2Rpdj4gPGRpdiBjbGFzcz1cIm1lbnUtc2lkZVwiPiA8dWw+IDxsaSBlYWNoPVwie2l0ZW0gaW4gdG9kYXkubHVuY2guc2lkZX1cIj57aXRlbX08L2xpPiA8L3VsPiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudS1pdGVtIHtvcGVuOiBpc09wZW4gPT0gXFwnZGlubmVyXFwnLCBkYWlseU1lbnVJbml0OiBpbml0ID09IFxcJ2Rpbm5lclxcJ31cIiBpZD1cImRhaWx5TWVudS1kaW5uZXJcIiBvbmNsaWNrPVwie29wZW4oXFwnZGlubmVyXFwnKX1cIj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+5aScPC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LWJvZHlcIj4gPGRpdiBjbGFzcz1cIm1lbnUtbWFpblwiPiA8ZGl2IGNsYXNzPVwibWFpbi1kaW5uZXJcIj48c3BhbiBjbGFzcz1cIm1haW4tYVwiPnt0b2RheS5kaW5uZXIuYX08L3NwYW4+PHNwYW4gY2xhc3M9XCJtYWluLWJcIj57dG9kYXkuZGlubmVyLmJ9PC9zcGFuPjwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cIm1lbnUtc2lkZVwiPiA8dWw+IDxsaSBlYWNoPVwie2l0ZW0gaW4gdG9kYXkuZGlubmVyLnNpZGV9XCI+e2l0ZW19PC9saT4gPC91bD4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PicsICdkYWlseS1tZW51IC5kYWlseS1tZW51LFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudXsgbWFyZ2luOiAxMHB4IDUlOyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMzUpOyBib3gtc2hhZG93OiAwIDJweCAycHggMCByZ2JhKDAsMCwwLDAuMTQpLCAwIDNweCAxcHggLTJweCByZ2JhKDAsMCwwLDAuMiksIDAgMXB4IDVweCAwIHJnYmEoMCwwLDAsMC4xMik7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAuaGVhZGVyLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAuaGVhZGVyeyB3aWR0aDogMTAwJTsgaGVpZ2h0OiA0MHB4OyBjb2xvcjogcmdiYSg1MSw1MSw1MSwwLjgpOyBmb250LXNpemU6IDE0cHg7IGxpbmUtaGVpZ2h0OiA0MHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVteyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBwYWRkaW5nOiA4cHggNTVweCA4cHggMjBweDsgdHJhbnNpdGlvbjogYmFja2dyb3VuZCAwLjZzIGVhc2U7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5sYWJlbCxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubGFiZWx7IHdpZHRoOiAyMHB4OyBoZWlnaHQ6IDIwcHg7IG1hcmdpbi1yaWdodDogMTVweDsgYm9yZGVyOiAxcHggc29saWQgIzMzMzsgYm9yZGVyLXJhZGl1czogMTAwJTsgZm9udC1zaXplOiAxMXB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiAyMHB4OyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5LFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHl7IGZsZXg6IDE7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbixbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW57IG1hcmdpbjogOHB4IDA7IHRleHQtYWxpZ246IGNlbnRlcjsgZm9udC1zaXplOiAxOHB4OyBsaW5lLWhlaWdodDogMjhweDsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWJyZWFrZmFzdCBzcGFuOm50aC1jaGlsZCgyKTo6YmVmb3JlLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1icmVha2Zhc3Qgc3BhbjpudGgtY2hpbGQoMik6OmJlZm9yZXsgY29udGVudDogXFwnL1xcJzsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3BhbnsgZGlzcGxheTogYmxvY2s7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3Bhbjpub3QoOmZpcnN0LWNoaWxkKSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tZGlubmVyIHNwYW46bm90KDpmaXJzdC1jaGlsZCl7IG1hcmdpbi10b3A6IDhweDsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuLm1haW4tYTo6YmVmb3JlLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3Bhbi5tYWluLWE6OmJlZm9yZSxkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuLm1haW4tYjo6YmVmb3JlLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3Bhbi5tYWluLWI6OmJlZm9yZXsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB3aWR0aDogMThweDsgaGVpZ2h0OiAxOHB4OyBtYXJnaW4tcmlnaHQ6IDAuNGVtOyBsaW5lLWhlaWdodDogMTZweDsgZm9udC1zaXplOiAxNnB4OyBiYWNrZ3JvdW5kOiAjMzMzOyBjb2xvcjogI2VlZTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xcHgpOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tZGlubmVyIHNwYW4ubWFpbi1hOjpiZWZvcmUsW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuLm1haW4tYTo6YmVmb3JleyBjb250ZW50OiBcXCdBXFwnOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tZGlubmVyIHNwYW4ubWFpbi1iOjpiZWZvcmUsW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuLm1haW4tYjo6YmVmb3JleyBjb250ZW50OiBcXCdCXFwnOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LXNpZGUsW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRleyBwb3NpdGlvbjogcmVsYXRpdmU7IG92ZXJmbG93OiBoaWRkZW47IGhlaWdodDogMDsgdHJhbnNpdGlvbjogaGVpZ2h0IDAuNHMgMC4zcyBlYXNlOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LXNpZGU6OmJlZm9yZSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LXNpZGU6OmJlZm9yZXsgY29udGVudDogXFwnXFwnOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMTBweDsgbGVmdDogNTAlOyB3aWR0aDogMzBweDsgbWFyZ2luLWxlZnQ6IC0xNXB4OyBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICM0NDQ7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtc2lkZTo6YWZ0ZXIsW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRlOjphZnRlcnsgY29udGVudDogXFwnXFwnOyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMTBweDsgbGVmdDogNTAlOyB3aWR0aDogM3B4OyBoZWlnaHQ6IDNweDsgbWFyZ2luOiAtMi41cHg7IGJvcmRlcjogMXB4IHNvbGlkICM0NDQ7IGJhY2tncm91bmQ6ICNmZmY7IHRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRlIGxpLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtc2lkZSBsaXsgbWFyZ2luLWJvdHRvbTogMTBweDsgZm9udC1zaXplOiAxNHB4OyBsaW5lLWhlaWdodDogMjBweDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LXNpZGUgbGk6Zmlyc3QtY2hpbGQsW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRlIGxpOmZpcnN0LWNoaWxkeyBtYXJnaW4tdG9wOiAzMHB4OyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbS5vcGVuLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtLm9wZW57IGJhY2tncm91bmQ6IHJnYmEoMjU1LDI1NSwyNTUsMC44KTsgfScsICcnLCBmdW5jdGlvbihvcHRzKSB7XG52YXIgX3RoaXMgPSB0aGlzO1xuXG50aGlzLnRvZGF5ID0ge1xuICAgIGJyZWFrZmFzdDoge1xuICAgICAgICB3ZXM6ICfjg63jg7zjg6vjg5Hjg7MnLFxuICAgICAgICBqYXA6IG51bGwsXG4gICAgICAgIHNpZGU6IFsn44K944O844K744O844K444Go44Kt44Oj44OZ44OE44Gu44OV44Os44Oz44OB44K144Op44OAJywgJ+OCreODo+ODmeODhOOCteODqeODgCcsICfjgrnjg7zjg5cnLCAn54mb5LmzJ11cbiAgICB9LFxuICAgIGx1bmNoOiB7XG4gICAgICAgIG1haW46ICflj4nnhLzngpLpo68nLFxuICAgICAgICBzaWRlOiBbJ+OBi+OBvOOBoeOCg+OBruOCs+ODreODg+OCsScsICflkbPlmYzmsYEnXVxuICAgIH0sXG4gICAgZGlubmVyOiB7XG4gICAgICAgIGE6ICflkozpoqjjgZTjgb7jg4/jg7Pjg5Djg7zjgrAnLFxuICAgICAgICBiOiAn44OP44Oz44OQ44O844Kw44OH44Of44Kw44Op44K544K944O844K544Go5rW36ICB44OV44Op44KkJyxcbiAgICAgICAgc2lkZTogWyflsI/mnb7oj5zjgajjgYjjga7jgY3jga7mooXlkozjgYgnLCAn44Op44Kk44K5JywgJ+WRs+WZjOaxgSddXG4gICAgfVxufTtcblxudGhpcy5pbml0ID0gJ2JyZWFrZmFzdCc7XG50aGlzLmlzT3BlbiA9IHRoaXMuaW5pdDtcblxuY29uc3QgcGFkZGluZyA9IDMwO1xuXG50aGlzLm9uKCdtb3VudCcsICgpID0+IHtcbiAgICAvLyDpq5jjgZXjgpLku5jkuI5cbiAgICBjb25zdCAkcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgZGFpbHlNZW51SW5pdGApWzBdO1xuICAgIGNvbnN0ICRlbGVtID0gJHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51LXNpZGUnKTtcbiAgICBjb25zdCBoZWlnaHQgPSAkZWxlbVswXS5jaGlsZE5vZGVzWzFdLmNsaWVudEhlaWdodDtcbiAgICAkZWxlbVswXS5zdHlsZS5oZWlnaHQgPSBgJHtoZWlnaHQgKyBwYWRkaW5nfXB4YDtcbiAgICBjb25zb2xlLmxvZygnaGFwcGVuJyk7XG59KTtcblxudGhpcy5vcGVuID0gdGltZSA9PiB7XG4gICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmIChfdGhpcy5pc09wZW4gIT09IHRpbWUpIHtcbiAgICAgICAgICAgIC8vIOOCteOCpOODieODoeODi+ODpeODvEhpZGVcbiAgICAgICAgICAgIGNvbnN0ICRvbGRfcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBkYWlseU1lbnUtJHtfdGhpcy5pc09wZW59YCk7XG4gICAgICAgICAgICBjb25zdCAkb2xkX2UgPSAkb2xkX3AuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1zaWRlJyk7XG4gICAgICAgICAgICAkb2xkX2VbMF0uc3R5bGUuaGVpZ2h0ID0gYDBweGA7XG4gICAgICAgICAgICAvLyDpq5jjgZXjgpLku5jkuI5cbiAgICAgICAgICAgIGNvbnN0ICRwYXJlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGFpbHlNZW51LSR7dGltZX1gKTtcbiAgICAgICAgICAgIGNvbnN0ICRlbGVtID0gJHBhcmVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51LXNpZGUnKTtcbiAgICAgICAgICAgIGNvbnN0IGhlaWdodCA9ICRlbGVtWzBdLmNoaWxkTm9kZXNbMV0uY2xpZW50SGVpZ2h0O1xuICAgICAgICAgICAgJGVsZW1bMF0uc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0ICsgcGFkZGluZ31weGA7XG4gICAgICAgICAgICBfdGhpcy5pc09wZW4gPSB0aW1lO1xuICAgICAgICB9XG4gICAgfTtcbn07XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9kYWlseS1tZW51LnRhZyIsIlxucmlvdC50YWcyKCdtZW51LWl0ZW0nLCAnPGRpdiBjbGFzcz1cIm1lbnUtaXRlbVwiPiA8ZGl2IGNsYXNzPVwiZGF0ZVwiPiA8ZGl2IGNsYXNzPVwid3JhcHBlclwiPiA8ZGl2IGNsYXNzPVwiZGF5XCI+MTQ8L2Rpdj4gPGRpdiBjbGFzcz1cIndlZWtcIj5TdW48L2Rpdj4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudVwiPjwvZGl2PiA8L2Rpdj4nLCAnbWVudS1pdGVtIC5tZW51LWl0ZW0sW2RhdGEtaXM9XCJtZW51LWl0ZW1cIl0gLm1lbnUtaXRlbXsgZGlzcGxheTogZmxleDsgaGVpZ2h0OiAyMDBweDsgbWFyZ2luOiAwIDEwcHggMzBweDsgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjE0KSwgMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwwLjIpLCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLDAuMTIpOyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuMSk7IH0gbWVudS1pdGVtIC5tZW51LWl0ZW0gLmRhdGUsW2RhdGEtaXM9XCJtZW51LWl0ZW1cIl0gLm1lbnUtaXRlbSAuZGF0ZXsgcG9zaXRpb246IHJlbGF0aXZlOyB3aWR0aDogNDBweDsgbWFyZ2luOiA4cHggMDsgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgcmdiYSgxNzAsMTcwLDE3MCwwLjMpOyB9IG1lbnUtaXRlbSAubWVudS1pdGVtIC5kYXRlIC53cmFwcGVyLFtkYXRhLWlzPVwibWVudS1pdGVtXCJdIC5tZW51LWl0ZW0gLmRhdGUgLndyYXBwZXJ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiA1MCU7IGxlZnQ6IDUwJTsgd2lkdGg6IDQwcHg7IGhlaWdodDogNDBweDsgbWFyZ2luOiAtMjBweDsgY29sb3I6IHJnYmEoMCwwLDAsMC43NSk7IHRleHQtYWxpZ246IGNlbnRlcjsgfSBtZW51LWl0ZW0gLm1lbnUtaXRlbSAuZGF0ZSAud3JhcHBlciAuZGF5LFtkYXRhLWlzPVwibWVudS1pdGVtXCJdIC5tZW51LWl0ZW0gLmRhdGUgLndyYXBwZXIgLmRheXsgbGluZS1oZWlnaHQ6IDI4cHg7IGZvbnQtc2l6ZTogMTVweDsgfSBtZW51LWl0ZW0gLm1lbnUtaXRlbSAuZGF0ZSAud3JhcHBlciAud2VlayxbZGF0YS1pcz1cIm1lbnUtaXRlbVwiXSAubWVudS1pdGVtIC5kYXRlIC53cmFwcGVyIC53ZWVreyBsaW5lLWhlaWdodDogMTJweDsgZm9udC1zaXplOiAxMHB4OyB9JywgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3RhZ3MvcHVibGljL21lbnUtaXRlbS50YWciXSwic291cmNlUm9vdCI6IiJ9