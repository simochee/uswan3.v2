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
	
	riot.tag2('menu-item', '<div class="menu-item"></div>', 'menu-item .menu-item,[data-is="menu-item"] .menu-item{ width: 10px; height: 400px; margin: 8px auto; background: #fff; }', '', function (opts) {});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgODk1ZWUwYmJmNjdjMmJkNjBiMTUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcHVibGljLmpzIiwid2VicGFjazovLy8uL34vcmlvdC9yaW90LmpzIiwid2VicGFjazovLy8uL34vcmlvdC1yb3V0ZS9kaXN0L2Nqcy5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3Jpb3Qtb2JzZXJ2YWJsZS9kaXN0L29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvY29tbW9uL25hdmJhci50YWciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcHVibGljL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9jb21tb24vc2lkZS1tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9kYWlseS1tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9tZW51LWl0ZW0udGFnIl0sIm5hbWVzIjpbInJpb3QiLCJtb3VudCIsInN0YXJ0IiwidGFnMiIsIm9wdHMiLCJfdGhpcyIsInUiLCJyZXF1aXJlIiwib2JzIiwib2JzZXJ2YWJsZSIsImlzT3BlbiIsInRvZ2dsZU1vcmVNZW51IiwiZSIsInByZXZlbnREZWZhdWx0IiwidHJpZ2dlciIsIm1vZHVsZSIsImV4cG9ydHMiLCJsb2NhdGlvbiIsImhhc2giLCJ1cGRhdGVGaXJzdFZpZXciLCJmaXJzdFZhbHVlIiwidGFyZ2V0Iiwic2VsZWN0ZWRPcHRpb25zIiwidGV4dCIsIm9uIiwidXBkYXRlIiwidG9kYXkiLCJicmVha2Zhc3QiLCJ3ZXMiLCJqYXAiLCJzaWRlIiwibHVuY2giLCJtYWluIiwiZGlubmVyIiwiYSIsImIiLCJpbml0IiwicGFkZGluZyIsIiRwYXJlbnQiLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCIkZWxlbSIsImhlaWdodCIsImNoaWxkTm9kZXMiLCJjbGllbnRIZWlnaHQiLCJzdHlsZSIsImNvbnNvbGUiLCJsb2ciLCJvcGVuIiwidGltZSIsIiRvbGRfcCIsImdldEVsZW1lbnRCeUlkIiwiJG9sZF9lIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUdBOzs7Ozs7QUFGQUEsTUFBS0MsS0FBTCxDQUFXLFFBQVg7O0FBR0Esa0JBQU9DLEtBQVAsRzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDO0FBQzNDLEVBQUMsNEJBQTRCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUF5RCxHQUFHLEdBQUc7QUFDL0Qsa0NBQWlDO0FBQ2pDO0FBQ0EsNENBQTJDOztBQUUzQztBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLElBQUk7QUFDZixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsSUFBSTtBQUNqQixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFVBQVU7QUFDdkIsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFD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UCxFQUFVUCxLQUFWLENBQWdCSCxNQUFoQjtBQUNBO0FBQ0EscUJBQU1KLFVBQVVDLFNBQVNZLGNBQVQsZ0JBQXFDRixJQUFyQyxDQUFoQjtBQUNBLHFCQUFNUixRQUFRSCxRQUFRRSxzQkFBUixDQUErQixXQUEvQixDQUFkO0FBQ0EscUJBQU1FLFNBQVNELE1BQU0sQ0FBTixFQUFTRSxVQUFULENBQW9CLENBQXBCLEVBQXVCQyxZQUF0QztBQUNBSCx1QkFBTSxDQUFOLEVBQVNJLEtBQVQsQ0FBZUgsTUFBZixHQUEyQkEsU0FBU0wsT0FBcEM7QUFDQWhDLHVCQUFNSyxNQUFOLEdBQWV1QyxJQUFmO0FBQ0g7QUFDSixVQWREO0FBZUgsTUFoQkQ7QUFpQkMsRUFuREQsRTs7Ozs7Ozs7O0FDQUFqRCxNQUFLRyxJQUFMLENBQVUsV0FBVixFQUF1QiwrQkFBdkIsRUFBd0QsMEhBQXhELEVBQW9MLEVBQXBMLEVBQXdMLFVBQVNDLElBQVQsRUFBZSxDQUN0TSxDQURELEUiLCJmaWxlIjoicHVibGljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgODk1ZWUwYmJmNjdjMmJkNjBiMTUiLCJpbXBvcnQgJy4vdGFncy9wdWJsaWMvY29tbW9uL25hdmJhcic7XHJcbmltcG9ydCAnLi90YWdzL3B1YmxpYy9jb21tb24vc2lkZS1tZW51JztcclxucmlvdC5tb3VudCgnbmF2YmFyJyk7XHJcblxyXG5pbXBvcnQgcm91dGVyIGZyb20gJy4vcHVibGljL3JvdXRlcic7XHJcbnJvdXRlci5zdGFydCgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3B1YmxpYy5qcyIsIi8qIFJpb3QgdjMuMC43LCBAbGljZW5zZSBNSVQgKi9cbihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IGZhY3RvcnkoZXhwb3J0cykgOlxuICB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgPyBkZWZpbmUoWydleHBvcnRzJ10sIGZhY3RvcnkpIDpcbiAgKGZhY3RvcnkoKGdsb2JhbC5yaW90ID0gZ2xvYmFsLnJpb3QgfHwge30pKSk7XG59KHRoaXMsIChmdW5jdGlvbiAoZXhwb3J0cykgeyAndXNlIHN0cmljdCc7XG5cbnZhciBfX1RBR1NfQ0FDSEUgPSBbXTtcbnZhciBfX1RBR19JTVBMID0ge307XG52YXIgR0xPQkFMX01JWElOID0gJ19fZ2xvYmFsX21peGluJztcbnZhciBBVFRSU19QUkVGSVggPSAncmlvdC0nO1xudmFyIFJFRl9ESVJFQ1RJVkVTID0gWydkYXRhLXJlZicsICdyZWYnXTtcbnZhciBJU19ESVJFQ1RJVkUgPSAnZGF0YS1pcyc7XG52YXIgQ09ORElUSU9OQUxfRElSRUNUSVZFID0gJ2lmJztcbnZhciBMT09QX0RJUkVDVElWRSA9ICdlYWNoJztcbnZhciBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFID0gJ25vLXJlb3JkZXInO1xudmFyIFNIT1dfRElSRUNUSVZFID0gJ3Nob3cnO1xudmFyIEhJREVfRElSRUNUSVZFID0gJ2hpZGUnO1xudmFyIFRfU1RSSU5HID0gJ3N0cmluZyc7XG52YXIgVF9PQkpFQ1QgPSAnb2JqZWN0JztcbnZhciBUX1VOREVGICA9ICd1bmRlZmluZWQnO1xudmFyIFRfRlVOQ1RJT04gPSAnZnVuY3Rpb24nO1xudmFyIFhMSU5LX05TID0gJ2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnO1xudmFyIFhMSU5LX1JFR0VYID0gL154bGluazooXFx3KykvO1xudmFyIFdJTiA9IHR5cGVvZiB3aW5kb3cgPT09IFRfVU5ERUYgPyB1bmRlZmluZWQgOiB3aW5kb3c7XG52YXIgUkVfU1BFQ0lBTF9UQUdTID0gL14oPzp0KD86Ym9keXxoZWFkfGZvb3R8W3JoZF0pfGNhcHRpb258Y29sKD86Z3JvdXApP3xvcHQoPzppb258Z3JvdXApKSQvO1xudmFyIFJFX1NQRUNJQUxfVEFHU19OT19PUFRJT04gPSAvXig/OnQoPzpib2R5fGhlYWR8Zm9vdHxbcmhkXSl8Y2FwdGlvbnxjb2woPzpncm91cCk/KSQvO1xudmFyIFJFX1JFU0VSVkVEX05BTUVTID0gL14oPzpfKD86aXRlbXxpZHxwYXJlbnQpfHVwZGF0ZXxyb290fCg/OnVuKT9tb3VudHxtaXhpbnxpcyg/Ok1vdW50ZWR8TG9vcCl8dGFnc3xyZWZzfHBhcmVudHxvcHRzfHRyaWdnZXJ8byg/Om58ZmZ8bmUpKSQvO1xudmFyIFJFX1NWR19UQUdTID0gL14oYWx0R2x5cGh8YW5pbWF0ZSg/OkNvbG9yKT98Y2lyY2xlfGNsaXBQYXRofGRlZnN8ZWxsaXBzZXxmZSg/OkJsZW5kfENvbG9yTWF0cml4fENvbXBvbmVudFRyYW5zZmVyfENvbXBvc2l0ZXxDb252b2x2ZU1hdHJpeHxEaWZmdXNlTGlnaHRpbmd8RGlzcGxhY2VtZW50TWFwfEZsb29kfEdhdXNzaWFuQmx1cnxJbWFnZXxNZXJnZXxNb3JwaG9sb2d5fE9mZnNldHxTcGVjdWxhckxpZ2h0aW5nfFRpbGV8VHVyYnVsZW5jZSl8ZmlsdGVyfGZvbnR8Zm9yZWlnbk9iamVjdHxnKD86bHlwaCk/KD86UmVmKT98aW1hZ2V8bGluZSg/OmFyR3JhZGllbnQpP3xtYSg/OnJrZXJ8c2spfG1pc3NpbmctZ2x5cGh8cGF0aHxwYXR0ZXJufHBvbHkoPzpnb258bGluZSl8cmFkaWFsR3JhZGllbnR8cmVjdHxzdG9wfHN2Z3xzd2l0Y2h8c3ltYm9sfHRleHQoPzpQYXRoKT98dHJlZnx0c3Bhbnx1c2UpJC87XG52YXIgUkVfSFRNTF9BVFRSUyA9IC8oWy1cXHddKykgPz0gPyg/OlwiKFteXCJdKil8JyhbXiddKil8KHtbXn1dKn0pKS9nO1xudmFyIENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVMgPSB7ICd2aWV3Ym94JzogJ3ZpZXdCb3gnIH07XG52YXIgUkVfQk9PTF9BVFRSUyA9IC9eKD86ZGlzYWJsZWR8Y2hlY2tlZHxyZWFkb25seXxyZXF1aXJlZHxhbGxvd2Z1bGxzY3JlZW58YXV0byg/OmZvY3VzfHBsYXkpfGNvbXBhY3R8Y29udHJvbHN8ZGVmYXVsdHxmb3Jtbm92YWxpZGF0ZXxoaWRkZW58aXNtYXB8aXRlbXNjb3BlfGxvb3B8bXVsdGlwbGV8bXV0ZWR8bm8oPzpyZXNpemV8c2hhZGV8dmFsaWRhdGV8d3JhcCk/fG9wZW58cmV2ZXJzZWR8c2VhbWxlc3N8c2VsZWN0ZWR8c29ydGFibGV8dHJ1ZXNwZWVkfHR5cGVtdXN0bWF0Y2gpJC87XG52YXIgSUVfVkVSU0lPTiA9IChXSU4gJiYgV0lOLmRvY3VtZW50IHx8IHt9KS5kb2N1bWVudE1vZGUgfCAwO1xuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYSBET00gbm9kZSBtdXN0IGJlIGNvbnNpZGVyZWQgYSBwYXJ0IG9mIGFuIHN2ZyBkb2N1bWVudFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNTVkdUYWcobmFtZSkge1xuICByZXR1cm4gUkVfU1ZHX1RBR1MudGVzdChuYW1lKVxufVxuXG4vKipcbiAqIENoZWNrIENoZWNrIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNCb29sQXR0cih2YWx1ZSkge1xuICByZXR1cm4gUkVfQk9PTF9BVFRSUy50ZXN0KHZhbHVlKVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIGZ1bmN0aW9uXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gVF9GVU5DVElPTlxufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhbiBvYmplY3QsIGV4Y2x1ZGUgbnVsbFxuICogTk9URTogdXNlIGlzT2JqZWN0KHgpICYmICFpc0FycmF5KHgpIHRvIGV4Y2x1ZGVzIGFycmF5cy5cbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gVF9PQkpFQ1QgLy8gdHlwZW9mIG51bGwgaXMgJ29iamVjdCdcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgdW5kZWZpbmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfVU5ERUZcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gVF9TVFJJTkdcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgZW1wdHkuIERpZmZlcmVudCBmcm9tIGZhbHN5LCBiZWNhdXNlIHdlIGRvbnQgY29uc2lkZXIgMCBvciBmYWxzZSB0byBiZSBibGFua1xuICogQHBhcmFtIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNCbGFuayh2YWx1ZSkge1xuICByZXR1cm4gaXNVbmRlZmluZWQodmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSAnJ1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHBhc3NlZCBhcmd1bWVudCBpcyBhIGtpbmQgb2YgYXJyYXlcbiAqIEBwYXJhbSAgIHsgKiB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSkgfHwgdmFsdWUgaW5zdGFuY2VvZiBBcnJheVxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgb2JqZWN0J3MgcHJvcGVydHkgY291bGQgYmUgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgb2JqIC0gc291cmNlIG9iamVjdFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAga2V5IC0gb2JqZWN0IHByb3BlcnR5XG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzV3JpdGFibGUob2JqLCBrZXkpIHtcbiAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwga2V5KTtcbiAgcmV0dXJuIGlzVW5kZWZpbmVkKG9ialtrZXldKSB8fCBkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3Iud3JpdGFibGVcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSByZXNlcnZlZCBuYW1lXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC1cbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gaXNSZXNlcnZlZE5hbWUodmFsdWUpIHtcbiAgcmV0dXJuIFJFX1JFU0VSVkVEX05BTUVTLnRlc3QodmFsdWUpXG59XG5cbnZhciBjaGVjayA9IE9iamVjdC5mcmVlemUoe1xuXHRpc1NWR1RhZzogaXNTVkdUYWcsXG5cdGlzQm9vbEF0dHI6IGlzQm9vbEF0dHIsXG5cdGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG5cdGlzT2JqZWN0OiBpc09iamVjdCxcblx0aXNVbmRlZmluZWQ6IGlzVW5kZWZpbmVkLFxuXHRpc1N0cmluZzogaXNTdHJpbmcsXG5cdGlzQmxhbms6IGlzQmxhbmssXG5cdGlzQXJyYXk6IGlzQXJyYXksXG5cdGlzV3JpdGFibGU6IGlzV3JpdGFibGUsXG5cdGlzUmVzZXJ2ZWROYW1lOiBpc1Jlc2VydmVkTmFtZVxufSk7XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IG11bHRpcGxlIG5vZGVzIGluIHRoZSBET01cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc2VsZWN0b3IgLSBET00gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldHMgb2Ygb3VyIHNlYXJjaCB3aWxsIGlzIGxvY2F0ZWRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9tIG5vZGVzIGZvdW5kXG4gKi9cbmZ1bmN0aW9uICQkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbi8qKlxuICogU2hvcnRlciBhbmQgZmFzdCB3YXkgdG8gc2VsZWN0IGEgc2luZ2xlIG5vZGUgaW4gdGhlIERPTVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzZWxlY3RvciAtIHVuaXF1ZSBkb20gc2VsZWN0b3JcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gRE9NIG5vZGUgd2hlcmUgdGhlIHRhcmdldCBvZiBvdXIgc2VhcmNoIHdpbGwgaXMgbG9jYXRlZFxuICogQHJldHVybnMgeyBPYmplY3QgfSBkb20gbm9kZSBmb3VuZFxuICovXG5mdW5jdGlvbiAkKHNlbGVjdG9yLCBjdHgpIHtcbiAgcmV0dXJuIChjdHggfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZG9jdW1lbnQgZnJhZ21lbnRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9jdW1lbnQgZnJhZ21lbnRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlRnJhZygpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRvY3VtZW50IHRleHQgbm9kZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjcmVhdGUgYSB0ZXh0IG5vZGUgdG8gdXNlIGFzIHBsYWNlaG9sZGVyXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZURPTVBsYWNlaG9sZGVyKCkge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZ2VuZXJpYyBET00gbm9kZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgRE9NIG5vZGUgd2Ugd2FudCB0byBjcmVhdGVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzU3ZnIC0gc2hvdWxkIHdlIHVzZSBhIFNWRyBhcyBwYXJlbnQgbm9kZT9cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gRE9NIG5vZGUganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIG1rRWwobmFtZSwgaXNTdmcpIHtcbiAgcmV0dXJuIGlzU3ZnID9cbiAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpIDpcbiAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG59XG5cbi8qKlxuICogR2V0IHRoZSBvdXRlciBodG1sIG9mIGFueSBET00gbm9kZSBTVkdzIGluY2x1ZGVkXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGVsIC0gRE9NIG5vZGUgdG8gcGFyc2VcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gZWwub3V0ZXJIVE1MXG4gKi9cbmZ1bmN0aW9uIGdldE91dGVySFRNTChlbCkge1xuICBpZiAoZWwub3V0ZXJIVE1MKVxuICAgIHsgcmV0dXJuIGVsLm91dGVySFRNTCB9XG4gIC8vIHNvbWUgYnJvd3NlcnMgZG8gbm90IHN1cHBvcnQgb3V0ZXJIVE1MIG9uIHRoZSBTVkdzIHRhZ3NcbiAgZWxzZSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IG1rRWwoJ2RpdicpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHJldHVybiBjb250YWluZXIuaW5uZXJIVE1MXG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIGlubmVyIGh0bWwgb2YgYW55IERPTSBub2RlIFNWR3MgaW5jbHVkZWRcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGNvbnRhaW5lciAtIERPTSBub2RlIHdoZXJlIHdlJ2xsIGluamVjdCBuZXcgaHRtbFxuICogQHBhcmFtIHsgU3RyaW5nIH0gaHRtbCAtIGh0bWwgdG8gaW5qZWN0XG4gKi9cbmZ1bmN0aW9uIHNldElubmVySFRNTChjb250YWluZXIsIGh0bWwpIHtcbiAgaWYgKCFpc1VuZGVmaW5lZChjb250YWluZXIuaW5uZXJIVE1MKSlcbiAgICB7IGNvbnRhaW5lci5pbm5lckhUTUwgPSBodG1sOyB9XG4gICAgLy8gc29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCBpbm5lckhUTUwgb24gdGhlIFNWR3MgdGFnc1xuICBlbHNlIHtcbiAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCAnYXBwbGljYXRpb24veG1sJyk7XG4gICAgdmFyIG5vZGUgPSBjb250YWluZXIub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRvYy5kb2N1bWVudEVsZW1lbnQsIHRydWUpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChub2RlKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZSBhbnkgRE9NIGF0dHJpYnV0ZSBmcm9tIGEgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHVwZGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byByZW1vdmVcbiAqL1xuZnVuY3Rpb24gcmVtQXR0cihkb20sIG5hbWUpIHtcbiAgZG9tLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHZhbHVlIG9mIGFueSBET00gYXR0cmlidXRlIG9uIGEgbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IG5hbWUgLSBuYW1lIG9mIHRoZSBhdHRyaWJ1dGUgd2Ugd2FudCB0byBnZXRcbiAqIEByZXR1cm5zIHsgU3RyaW5nIHwgdW5kZWZpbmVkIH0gbmFtZSBvZiB0aGUgbm9kZSBhdHRyaWJ1dGUgd2hldGhlciBpdCBleGlzdHNcbiAqL1xuZnVuY3Rpb24gZ2V0QXR0cihkb20sIG5hbWUpIHtcbiAgcmV0dXJuIGRvbS5nZXRBdHRyaWJ1dGUobmFtZSlcbn1cblxuLyoqXG4gKiBTZXQgYW55IERPTSBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gdXBkYXRlXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byBzZXRcbiAqIEBwYXJhbSB7IFN0cmluZyB9IHZhbCAtIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB3ZSB3YW50IHRvIHNldFxuICovXG5mdW5jdGlvbiBzZXRBdHRyKGRvbSwgbmFtZSwgdmFsKSB7XG4gIHZhciB4bGluayA9IFhMSU5LX1JFR0VYLmV4ZWMobmFtZSk7XG4gIGlmICh4bGluayAmJiB4bGlua1sxXSlcbiAgICB7IGRvbS5zZXRBdHRyaWJ1dGVOUyhYTElOS19OUywgeGxpbmtbMV0sIHZhbCk7IH1cbiAgZWxzZVxuICAgIHsgZG9tLnNldEF0dHJpYnV0ZShuYW1lLCB2YWwpOyB9XG59XG5cbi8qKlxuICogSW5zZXJ0IHNhZmVseSBhIHRhZyB0byBmaXggIzE5NjIgIzE2NDlcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gY2hpbGRyZW4gY29udGFpbmVyXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gY3VyciAtIG5vZGUgdG8gaW5zZXJ0XG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gbmV4dCAtIG5vZGUgdGhhdCBzaG91bGQgcHJlY2VlZCB0aGUgY3VycmVudCBub2RlIGluc2VydGVkXG4gKi9cbmZ1bmN0aW9uIHNhZmVJbnNlcnQocm9vdCwgY3VyciwgbmV4dCkge1xuICByb290Lmluc2VydEJlZm9yZShjdXJyLCBuZXh0LnBhcmVudE5vZGUgJiYgbmV4dCk7XG59XG5cbi8qKlxuICogTWluaW1pemUgcmlzazogb25seSB6ZXJvIG9yIG9uZSBfc3BhY2VfIGJldHdlZW4gYXR0ciAmIHZhbHVlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgaHRtbCAtIGh0bWwgc3RyaW5nIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uIHRvIGFwcGx5IG9uIGFueSBhdHRyaWJ1dGUgZm91bmRcbiAqL1xuZnVuY3Rpb24gd2Fsa0F0dHJzKGh0bWwsIGZuKSB7XG4gIGlmICghaHRtbClcbiAgICB7IHJldHVybiB9XG4gIHZhciBtO1xuICB3aGlsZSAobSA9IFJFX0hUTUxfQVRUUlMuZXhlYyhodG1sKSlcbiAgICB7IGZuKG1bMV0udG9Mb3dlckNhc2UoKSwgbVsyXSB8fCBtWzNdIHx8IG1bNF0pOyB9XG59XG5cbi8qKlxuICogV2FsayBkb3duIHJlY3Vyc2l2ZWx5IGFsbCB0aGUgY2hpbGRyZW4gdGFncyBzdGFydGluZyBkb20gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgIGRvbSAtIHN0YXJ0aW5nIG5vZGUgd2hlcmUgd2Ugd2lsbCBzdGFydCB0aGUgcmVjdXJzaW9uXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayB0byB0cmFuc2Zvcm0gdGhlIGNoaWxkIG5vZGUganVzdCBmb3VuZFxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgIGNvbnRleHQgLSBmbiBjYW4gb3B0aW9uYWxseSByZXR1cm4gYW4gb2JqZWN0LCB3aGljaCBpcyBwYXNzZWQgdG8gY2hpbGRyZW5cbiAqL1xuZnVuY3Rpb24gd2Fsa05vZGVzKGRvbSwgZm4sIGNvbnRleHQpIHtcbiAgaWYgKGRvbSkge1xuICAgIHZhciByZXMgPSBmbihkb20sIGNvbnRleHQpO1xuICAgIHZhciBuZXh0O1xuICAgIC8vIHN0b3AgdGhlIHJlY3Vyc2lvblxuICAgIGlmIChyZXMgPT09IGZhbHNlKSB7IHJldHVybiB9XG5cbiAgICBkb20gPSBkb20uZmlyc3RDaGlsZDtcblxuICAgIHdoaWxlIChkb20pIHtcbiAgICAgIG5leHQgPSBkb20ubmV4dFNpYmxpbmc7XG4gICAgICB3YWxrTm9kZXMoZG9tLCBmbiwgcmVzKTtcbiAgICAgIGRvbSA9IG5leHQ7XG4gICAgfVxuICB9XG59XG5cbnZhciBkb20gPSBPYmplY3QuZnJlZXplKHtcblx0JCQ6ICQkLFxuXHQkOiAkLFxuXHRjcmVhdGVGcmFnOiBjcmVhdGVGcmFnLFxuXHRjcmVhdGVET01QbGFjZWhvbGRlcjogY3JlYXRlRE9NUGxhY2Vob2xkZXIsXG5cdG1rRWw6IG1rRWwsXG5cdGdldE91dGVySFRNTDogZ2V0T3V0ZXJIVE1MLFxuXHRzZXRJbm5lckhUTUw6IHNldElubmVySFRNTCxcblx0cmVtQXR0cjogcmVtQXR0cixcblx0Z2V0QXR0cjogZ2V0QXR0cixcblx0c2V0QXR0cjogc2V0QXR0cixcblx0c2FmZUluc2VydDogc2FmZUluc2VydCxcblx0d2Fsa0F0dHJzOiB3YWxrQXR0cnMsXG5cdHdhbGtOb2Rlczogd2Fsa05vZGVzXG59KTtcblxudmFyIHN0eWxlTm9kZTtcbnZhciBjc3NUZXh0UHJvcDtcbnZhciBieU5hbWUgPSB7fTtcbnZhciByZW1haW5kZXIgPSBbXTtcbnZhciBuZWVkc0luamVjdCA9IGZhbHNlO1xuXG4vLyBza2lwIHRoZSBmb2xsb3dpbmcgY29kZSBvbiB0aGUgc2VydmVyXG5pZiAoV0lOKSB7XG4gIHN0eWxlTm9kZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gY3JlYXRlIGEgbmV3IHN0eWxlIGVsZW1lbnQgd2l0aCB0aGUgY29ycmVjdCB0eXBlXG4gICAgdmFyIG5ld05vZGUgPSBta0VsKCdzdHlsZScpO1xuICAgIHNldEF0dHIobmV3Tm9kZSwgJ3R5cGUnLCAndGV4dC9jc3MnKTtcblxuICAgIC8vIHJlcGxhY2UgYW55IHVzZXIgbm9kZSBvciBpbnNlcnQgdGhlIG5ldyBvbmUgaW50byB0aGUgaGVhZFxuICAgIHZhciB1c2VyTm9kZSA9ICQoJ3N0eWxlW3R5cGU9cmlvdF0nKTtcbiAgICBpZiAodXNlck5vZGUpIHtcbiAgICAgIGlmICh1c2VyTm9kZS5pZCkgeyBuZXdOb2RlLmlkID0gdXNlck5vZGUuaWQ7IH1cbiAgICAgIHVzZXJOb2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld05vZGUsIHVzZXJOb2RlKTtcbiAgICB9XG4gICAgZWxzZSB7IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQobmV3Tm9kZSk7IH1cblxuICAgIHJldHVybiBuZXdOb2RlXG4gIH0pKCk7XG4gIGNzc1RleHRQcm9wID0gc3R5bGVOb2RlLnN0eWxlU2hlZXQ7XG59XG5cbi8qKlxuICogT2JqZWN0IHRoYXQgd2lsbCBiZSB1c2VkIHRvIGluamVjdCBhbmQgbWFuYWdlIHRoZSBjc3Mgb2YgZXZlcnkgdGFnIGluc3RhbmNlXG4gKi9cbnZhciBzdHlsZU1hbmFnZXIgPSB7XG4gIHN0eWxlTm9kZTogc3R5bGVOb2RlLFxuICAvKipcbiAgICogU2F2ZSBhIHRhZyBzdHlsZSB0byBiZSBsYXRlciBpbmplY3RlZCBpbnRvIERPTVxuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBjc3MgLSBjc3Mgc3RyaW5nXG4gICAqIEBwYXJhbSB7IFN0cmluZyB9IG5hbWUgLSBpZiBpdCdzIHBhc3NlZCB3ZSB3aWxsIG1hcCB0aGUgY3NzIHRvIGEgdGFnbmFtZVxuICAgKi9cbiAgYWRkOiBmdW5jdGlvbiBhZGQoY3NzLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUpIHsgYnlOYW1lW25hbWVdID0gY3NzOyB9XG4gICAgZWxzZSB7IHJlbWFpbmRlci5wdXNoKGNzcyk7IH1cbiAgICBuZWVkc0luamVjdCA9IHRydWU7XG4gIH0sXG4gIC8qKlxuICAgKiBJbmplY3QgYWxsIHByZXZpb3VzbHkgc2F2ZWQgdGFnIHN0eWxlcyBpbnRvIERPTVxuICAgKiBpbm5lckhUTUwgc2VlbXMgc2xvdzogaHR0cDovL2pzcGVyZi5jb20vcmlvdC1pbnNlcnQtc3R5bGVcbiAgICovXG4gIGluamVjdDogZnVuY3Rpb24gaW5qZWN0KCkge1xuICAgIGlmICghV0lOIHx8ICFuZWVkc0luamVjdCkgeyByZXR1cm4gfVxuICAgIG5lZWRzSW5qZWN0ID0gZmFsc2U7XG4gICAgdmFyIHN0eWxlID0gT2JqZWN0LmtleXMoYnlOYW1lKVxuICAgICAgLm1hcChmdW5jdGlvbihrKSB7IHJldHVybiBieU5hbWVba10gfSlcbiAgICAgIC5jb25jYXQocmVtYWluZGVyKS5qb2luKCdcXG4nKTtcbiAgICBpZiAoY3NzVGV4dFByb3ApIHsgY3NzVGV4dFByb3AuY3NzVGV4dCA9IHN0eWxlOyB9XG4gICAgZWxzZSB7IHN0eWxlTm9kZS5pbm5lckhUTUwgPSBzdHlsZTsgfVxuICB9XG59O1xuXG4vKipcbiAqIFRoZSByaW90IHRlbXBsYXRlIGVuZ2luZVxuICogQHZlcnNpb24gdjMuMC4xXG4gKi9cbi8qKlxuICogcmlvdC51dGlsLmJyYWNrZXRzXG4gKlxuICogLSBgYnJhY2tldHMgICAgYCAtIFJldHVybnMgYSBzdHJpbmcgb3IgcmVnZXggYmFzZWQgb24gaXRzIHBhcmFtZXRlclxuICogLSBgYnJhY2tldHMuc2V0YCAtIENoYW5nZSB0aGUgY3VycmVudCByaW90IGJyYWNrZXRzXG4gKlxuICogQG1vZHVsZVxuICovXG5cbi8qIGdsb2JhbCByaW90ICovXG5cbnZhciBicmFja2V0cyA9IChmdW5jdGlvbiAoVU5ERUYpIHtcblxuICB2YXJcbiAgICBSRUdMT0IgPSAnZycsXG5cbiAgICBSX01MQ09NTVMgPSAvXFwvXFwqW14qXSpcXCorKD86W14qXFwvXVteKl0qXFwqKykqXFwvL2csXG5cbiAgICBSX1NUUklOR1MgPSAvXCJbXlwiXFxcXF0qKD86XFxcXFtcXFNcXHNdW15cIlxcXFxdKikqXCJ8J1teJ1xcXFxdKig/OlxcXFxbXFxTXFxzXVteJ1xcXFxdKikqJy9nLFxuXG4gICAgU19RQkxPQ0tTID0gUl9TVFJJTkdTLnNvdXJjZSArICd8JyArXG4gICAgICAvKD86XFxicmV0dXJuXFxzK3woPzpbJFxcd1xcKVxcXV18XFwrXFwrfC0tKVxccyooXFwvKSg/IVsqXFwvXSkpLy5zb3VyY2UgKyAnfCcgK1xuICAgICAgL1xcLyg/PVteKlxcL10pW15bXFwvXFxcXF0qKD86KD86XFxbKD86XFxcXC58W15cXF1cXFxcXSopKlxcXXxcXFxcLilbXltcXC9cXFxcXSopKj8oXFwvKVtnaW1dKi8uc291cmNlLFxuXG4gICAgVU5TVVBQT1JURUQgPSBSZWdFeHAoJ1tcXFxcJyArICd4MDAtXFxcXHgxRjw+YS16QS1aMC05XFwnXCIsO1xcXFxcXFxcXScpLFxuXG4gICAgTkVFRF9FU0NBUEUgPSAvKD89W1tcXF0oKSorPy5eJHxdKS9nLFxuXG4gICAgRklOREJSQUNFUyA9IHtcbiAgICAgICcoJzogUmVnRXhwKCcoWygpXSl8JyAgICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgICAgJ1snOiBSZWdFeHAoJyhbW1xcXFxdXSl8JyArIFNfUUJMT0NLUywgUkVHTE9CKSxcbiAgICAgICd7JzogUmVnRXhwKCcoW3t9XSl8JyAgICsgU19RQkxPQ0tTLCBSRUdMT0IpXG4gICAgfSxcblxuICAgIERFRkFVTFQgPSAneyB9JztcblxuICB2YXIgX3BhaXJzID0gW1xuICAgICd7JywgJ30nLFxuICAgICd7JywgJ30nLFxuICAgIC97W159XSp9LyxcbiAgICAvXFxcXChbe31dKS9nLFxuICAgIC9cXFxcKHspfHsvZyxcbiAgICBSZWdFeHAoJ1xcXFxcXFxcKH0pfChbWyh7XSl8KH0pfCcgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgREVGQVVMVCxcbiAgICAvXlxccyp7XFxeP1xccyooWyRcXHddKykoPzpcXHMqLFxccyooXFxTKykpP1xccytpblxccysoXFxTLiopXFxzKn0vLFxuICAgIC8oXnxbXlxcXFxdKXs9W1xcU1xcc10qP30vXG4gIF07XG5cbiAgdmFyXG4gICAgY2FjaGVkQnJhY2tldHMgPSBVTkRFRixcbiAgICBfcmVnZXgsXG4gICAgX2NhY2hlID0gW10sXG4gICAgX3NldHRpbmdzO1xuXG4gIGZ1bmN0aW9uIF9sb29wYmFjayAocmUpIHsgcmV0dXJuIHJlIH1cblxuICBmdW5jdGlvbiBfcmV3cml0ZSAocmUsIGJwKSB7XG4gICAgaWYgKCFicCkgeyBicCA9IF9jYWNoZTsgfVxuICAgIHJldHVybiBuZXcgUmVnRXhwKFxuICAgICAgcmUuc291cmNlLnJlcGxhY2UoL3svZywgYnBbMl0pLnJlcGxhY2UoL30vZywgYnBbM10pLCByZS5nbG9iYWwgPyBSRUdMT0IgOiAnJ1xuICAgIClcbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGUgKHBhaXIpIHtcbiAgICBpZiAocGFpciA9PT0gREVGQVVMVCkgeyByZXR1cm4gX3BhaXJzIH1cblxuICAgIHZhciBhcnIgPSBwYWlyLnNwbGl0KCcgJyk7XG5cbiAgICBpZiAoYXJyLmxlbmd0aCAhPT0gMiB8fCBVTlNVUFBPUlRFRC50ZXN0KHBhaXIpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGJyYWNrZXRzIFwiJyArIHBhaXIgKyAnXCInKVxuICAgIH1cbiAgICBhcnIgPSBhcnIuY29uY2F0KHBhaXIucmVwbGFjZShORUVEX0VTQ0FQRSwgJ1xcXFwnKS5zcGxpdCgnICcpKTtcblxuICAgIGFycls0XSA9IF9yZXdyaXRlKGFyclsxXS5sZW5ndGggPiAxID8gL3tbXFxTXFxzXSo/fS8gOiBfcGFpcnNbNF0sIGFycik7XG4gICAgYXJyWzVdID0gX3Jld3JpdGUocGFpci5sZW5ndGggPiAzID8gL1xcXFwoe3x9KS9nIDogX3BhaXJzWzVdLCBhcnIpO1xuICAgIGFycls2XSA9IF9yZXdyaXRlKF9wYWlyc1s2XSwgYXJyKTtcbiAgICBhcnJbN10gPSBSZWdFeHAoJ1xcXFxcXFxcKCcgKyBhcnJbM10gKyAnKXwoW1soe10pfCgnICsgYXJyWzNdICsgJyl8JyArIFNfUUJMT0NLUywgUkVHTE9CKTtcbiAgICBhcnJbOF0gPSBwYWlyO1xuICAgIHJldHVybiBhcnJcbiAgfVxuXG4gIGZ1bmN0aW9uIF9icmFja2V0cyAocmVPcklkeCkge1xuICAgIHJldHVybiByZU9ySWR4IGluc3RhbmNlb2YgUmVnRXhwID8gX3JlZ2V4KHJlT3JJZHgpIDogX2NhY2hlW3JlT3JJZHhdXG4gIH1cblxuICBfYnJhY2tldHMuc3BsaXQgPSBmdW5jdGlvbiBzcGxpdCAoc3RyLCB0bXBsLCBfYnApIHtcbiAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogX2JwIGlzIGZvciB0aGUgY29tcGlsZXJcbiAgICBpZiAoIV9icCkgeyBfYnAgPSBfY2FjaGU7IH1cblxuICAgIHZhclxuICAgICAgcGFydHMgPSBbXSxcbiAgICAgIG1hdGNoLFxuICAgICAgaXNleHByLFxuICAgICAgc3RhcnQsXG4gICAgICBwb3MsXG4gICAgICByZSA9IF9icFs2XTtcblxuICAgIGlzZXhwciA9IHN0YXJ0ID0gcmUubGFzdEluZGV4ID0gMDtcblxuICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKHN0cikpKSB7XG5cbiAgICAgIHBvcyA9IG1hdGNoLmluZGV4O1xuXG4gICAgICBpZiAoaXNleHByKSB7XG5cbiAgICAgICAgaWYgKG1hdGNoWzJdKSB7XG4gICAgICAgICAgcmUubGFzdEluZGV4ID0gc2tpcEJyYWNlcyhzdHIsIG1hdGNoWzJdLCByZS5sYXN0SW5kZXgpO1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRjaFszXSkge1xuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtYXRjaFsxXSkge1xuICAgICAgICB1bmVzY2FwZVN0cihzdHIuc2xpY2Uoc3RhcnQsIHBvcykpO1xuICAgICAgICBzdGFydCA9IHJlLmxhc3RJbmRleDtcbiAgICAgICAgcmUgPSBfYnBbNiArIChpc2V4cHIgXj0gMSldO1xuICAgICAgICByZS5sYXN0SW5kZXggPSBzdGFydDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3RyICYmIHN0YXJ0IDwgc3RyLmxlbmd0aCkge1xuICAgICAgdW5lc2NhcGVTdHIoc3RyLnNsaWNlKHN0YXJ0KSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnRzXG5cbiAgICBmdW5jdGlvbiB1bmVzY2FwZVN0ciAocykge1xuICAgICAgaWYgKHRtcGwgfHwgaXNleHByKSB7XG4gICAgICAgIHBhcnRzLnB1c2gocyAmJiBzLnJlcGxhY2UoX2JwWzVdLCAnJDEnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYXJ0cy5wdXNoKHMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNraXBCcmFjZXMgKHMsIGNoLCBpeCkge1xuICAgICAgdmFyXG4gICAgICAgIG1hdGNoLFxuICAgICAgICByZWNjaCA9IEZJTkRCUkFDRVNbY2hdO1xuXG4gICAgICByZWNjaC5sYXN0SW5kZXggPSBpeDtcbiAgICAgIGl4ID0gMTtcbiAgICAgIHdoaWxlICgobWF0Y2ggPSByZWNjaC5leGVjKHMpKSkge1xuICAgICAgICBpZiAobWF0Y2hbMV0gJiZcbiAgICAgICAgICAhKG1hdGNoWzFdID09PSBjaCA/ICsraXggOiAtLWl4KSkgeyBicmVhayB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaXggPyBzLmxlbmd0aCA6IHJlY2NoLmxhc3RJbmRleFxuICAgIH1cbiAgfTtcblxuICBfYnJhY2tldHMuaGFzRXhwciA9IGZ1bmN0aW9uIGhhc0V4cHIgKHN0cikge1xuICAgIHJldHVybiBfY2FjaGVbNF0udGVzdChzdHIpXG4gIH07XG5cbiAgX2JyYWNrZXRzLmxvb3BLZXlzID0gZnVuY3Rpb24gbG9vcEtleXMgKGV4cHIpIHtcbiAgICB2YXIgbSA9IGV4cHIubWF0Y2goX2NhY2hlWzldKTtcblxuICAgIHJldHVybiBtXG4gICAgICA/IHsga2V5OiBtWzFdLCBwb3M6IG1bMl0sIHZhbDogX2NhY2hlWzBdICsgbVszXS50cmltKCkgKyBfY2FjaGVbMV0gfVxuICAgICAgOiB7IHZhbDogZXhwci50cmltKCkgfVxuICB9O1xuXG4gIF9icmFja2V0cy5hcnJheSA9IGZ1bmN0aW9uIGFycmF5IChwYWlyKSB7XG4gICAgcmV0dXJuIHBhaXIgPyBfY3JlYXRlKHBhaXIpIDogX2NhY2hlXG4gIH07XG5cbiAgZnVuY3Rpb24gX3Jlc2V0IChwYWlyKSB7XG4gICAgaWYgKChwYWlyIHx8IChwYWlyID0gREVGQVVMVCkpICE9PSBfY2FjaGVbOF0pIHtcbiAgICAgIF9jYWNoZSA9IF9jcmVhdGUocGFpcik7XG4gICAgICBfcmVnZXggPSBwYWlyID09PSBERUZBVUxUID8gX2xvb3BiYWNrIDogX3Jld3JpdGU7XG4gICAgICBfY2FjaGVbOV0gPSBfcmVnZXgoX3BhaXJzWzldKTtcbiAgICB9XG4gICAgY2FjaGVkQnJhY2tldHMgPSBwYWlyO1xuICB9XG5cbiAgZnVuY3Rpb24gX3NldFNldHRpbmdzIChvKSB7XG4gICAgdmFyIGI7XG5cbiAgICBvID0gbyB8fCB7fTtcbiAgICBiID0gby5icmFja2V0cztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgJ2JyYWNrZXRzJywge1xuICAgICAgc2V0OiBfcmVzZXQsXG4gICAgICBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGNhY2hlZEJyYWNrZXRzIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgX3NldHRpbmdzID0gbztcbiAgICBfcmVzZXQoYik7XG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX2JyYWNrZXRzLCAnc2V0dGluZ3MnLCB7XG4gICAgc2V0OiBfc2V0U2V0dGluZ3MsXG4gICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBfc2V0dGluZ3MgfVxuICB9KTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogaW4gdGhlIGJyb3dzZXIgcmlvdCBpcyBhbHdheXMgaW4gdGhlIHNjb3BlICovXG4gIF9icmFja2V0cy5zZXR0aW5ncyA9IHR5cGVvZiByaW90ICE9PSAndW5kZWZpbmVkJyAmJiByaW90LnNldHRpbmdzIHx8IHt9O1xuICBfYnJhY2tldHMuc2V0ID0gX3Jlc2V0O1xuXG4gIF9icmFja2V0cy5SX1NUUklOR1MgPSBSX1NUUklOR1M7XG4gIF9icmFja2V0cy5SX01MQ09NTVMgPSBSX01MQ09NTVM7XG4gIF9icmFja2V0cy5TX1FCTE9DS1MgPSBTX1FCTE9DS1M7XG5cbiAgcmV0dXJuIF9icmFja2V0c1xuXG59KSgpO1xuXG4vKipcbiAqIEBtb2R1bGUgdG1wbFxuICpcbiAqIHRtcGwgICAgICAgICAgLSBSb290IGZ1bmN0aW9uLCByZXR1cm5zIHRoZSB0ZW1wbGF0ZSB2YWx1ZSwgcmVuZGVyIHdpdGggZGF0YVxuICogdG1wbC5oYXNFeHByICAtIFRlc3QgdGhlIGV4aXN0ZW5jZSBvZiBhIGV4cHJlc3Npb24gaW5zaWRlIGEgc3RyaW5nXG4gKiB0bXBsLmxvb3BLZXlzIC0gR2V0IHRoZSBrZXlzIGZvciBhbiAnZWFjaCcgbG9vcCAodXNlZCBieSBgX2VhY2hgKVxuICovXG5cbnZhciB0bXBsID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgX2NhY2hlID0ge307XG5cbiAgZnVuY3Rpb24gX3RtcGwgKHN0ciwgZGF0YSkge1xuICAgIGlmICghc3RyKSB7IHJldHVybiBzdHIgfVxuXG4gICAgcmV0dXJuIChfY2FjaGVbc3RyXSB8fCAoX2NhY2hlW3N0cl0gPSBfY3JlYXRlKHN0cikpKS5jYWxsKGRhdGEsIF9sb2dFcnIpXG4gIH1cblxuICBfdG1wbC5oYXNFeHByID0gYnJhY2tldHMuaGFzRXhwcjtcblxuICBfdG1wbC5sb29wS2V5cyA9IGJyYWNrZXRzLmxvb3BLZXlzO1xuXG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gIF90bXBsLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiAoKSB7IF9jYWNoZSA9IHt9OyB9O1xuXG4gIF90bXBsLmVycm9ySGFuZGxlciA9IG51bGw7XG5cbiAgZnVuY3Rpb24gX2xvZ0VyciAoZXJyLCBjdHgpIHtcblxuICAgIGVyci5yaW90RGF0YSA9IHtcbiAgICAgIHRhZ05hbWU6IGN0eCAmJiBjdHgucm9vdCAmJiBjdHgucm9vdC50YWdOYW1lLFxuICAgICAgX3Jpb3RfaWQ6IGN0eCAmJiBjdHguX3Jpb3RfaWQgIC8vZXNsaW50LWRpc2FibGUtbGluZSBjYW1lbGNhc2VcbiAgICB9O1xuXG4gICAgaWYgKF90bXBsLmVycm9ySGFuZGxlcikgeyBfdG1wbC5lcnJvckhhbmRsZXIoZXJyKTsgfVxuICAgIGVsc2UgaWYgKFxuICAgICAgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY29uc29sZS5lcnJvciA9PT0gJ2Z1bmN0aW9uJ1xuICAgICkge1xuICAgICAgaWYgKGVyci5yaW90RGF0YS50YWdOYW1lKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ1Jpb3QgdGVtcGxhdGUgZXJyb3IgdGhyb3duIGluIHRoZSA8JXM+IHRhZycsIGVyci5yaW90RGF0YS50YWdOYW1lLnRvTG93ZXJDYXNlKCkpO1xuICAgICAgfVxuICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIF9jcmVhdGUgKHN0cikge1xuICAgIHZhciBleHByID0gX2dldFRtcGwoc3RyKTtcblxuICAgIGlmIChleHByLnNsaWNlKDAsIDExKSAhPT0gJ3RyeXtyZXR1cm4gJykgeyBleHByID0gJ3JldHVybiAnICsgZXhwcjsgfVxuXG4gICAgcmV0dXJuIG5ldyBGdW5jdGlvbignRScsIGV4cHIgKyAnOycpICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3LWZ1bmNcbiAgfVxuXG4gIHZhclxuICAgIENIX0lERVhQUiA9IFN0cmluZy5mcm9tQ2hhckNvZGUoMHgyMDU3KSxcbiAgICBSRV9DU05BTUUgPSAvXig/OigtP1tfQS1aYS16XFx4QTAtXFx4RkZdWy1cXHdcXHhBMC1cXHhGRl0qKXxcXHUyMDU3KFxcZCspfik6LyxcbiAgICBSRV9RQkxPQ0sgPSBSZWdFeHAoYnJhY2tldHMuU19RQkxPQ0tTLCAnZycpLFxuICAgIFJFX0RRVU9URSA9IC9cXHUyMDU3L2csXG4gICAgUkVfUUJNQVJLID0gL1xcdTIwNTcoXFxkKyl+L2c7XG5cbiAgZnVuY3Rpb24gX2dldFRtcGwgKHN0cikge1xuICAgIHZhclxuICAgICAgcXN0ciA9IFtdLFxuICAgICAgZXhwcixcbiAgICAgIHBhcnRzID0gYnJhY2tldHMuc3BsaXQoc3RyLnJlcGxhY2UoUkVfRFFVT1RFLCAnXCInKSwgMSk7XG5cbiAgICBpZiAocGFydHMubGVuZ3RoID4gMiB8fCBwYXJ0c1swXSkge1xuICAgICAgdmFyIGksIGosIGxpc3QgPSBbXTtcblxuICAgICAgZm9yIChpID0gaiA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuXG4gICAgICAgIGV4cHIgPSBwYXJ0c1tpXTtcblxuICAgICAgICBpZiAoZXhwciAmJiAoZXhwciA9IGkgJiAxXG5cbiAgICAgICAgICAgID8gX3BhcnNlRXhwcihleHByLCAxLCBxc3RyKVxuXG4gICAgICAgICAgICA6ICdcIicgKyBleHByXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcXFwvZywgJ1xcXFxcXFxcJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFxyXFxuP3xcXG4vZywgJ1xcXFxuJylcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICtcbiAgICAgICAgICAgICAgJ1wiJ1xuXG4gICAgICAgICAgKSkgeyBsaXN0W2orK10gPSBleHByOyB9XG5cbiAgICAgIH1cblxuICAgICAgZXhwciA9IGogPCAyID8gbGlzdFswXVxuICAgICAgICAgICA6ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIlwiKSc7XG5cbiAgICB9IGVsc2Uge1xuXG4gICAgICBleHByID0gX3BhcnNlRXhwcihwYXJ0c1sxXSwgMCwgcXN0cik7XG4gICAgfVxuXG4gICAgaWYgKHFzdHJbMF0pIHtcbiAgICAgIGV4cHIgPSBleHByLnJlcGxhY2UoUkVfUUJNQVJLLCBmdW5jdGlvbiAoXywgcG9zKSB7XG4gICAgICAgIHJldHVybiBxc3RyW3Bvc11cbiAgICAgICAgICAucmVwbGFjZSgvXFxyL2csICdcXFxccicpXG4gICAgICAgICAgLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBleHByXG4gIH1cblxuICB2YXJcbiAgICBSRV9CUkVORCA9IHtcbiAgICAgICcoJzogL1soKV0vZyxcbiAgICAgICdbJzogL1tbXFxdXS9nLFxuICAgICAgJ3snOiAvW3t9XS9nXG4gICAgfTtcblxuICBmdW5jdGlvbiBfcGFyc2VFeHByIChleHByLCBhc1RleHQsIHFzdHIpIHtcblxuICAgIGV4cHIgPSBleHByXG4gICAgICAgICAgLnJlcGxhY2UoUkVfUUJMT0NLLCBmdW5jdGlvbiAocywgZGl2KSB7XG4gICAgICAgICAgICByZXR1cm4gcy5sZW5ndGggPiAyICYmICFkaXYgPyBDSF9JREVYUFIgKyAocXN0ci5wdXNoKHMpIC0gMSkgKyAnficgOiBzXG4gICAgICAgICAgfSlcbiAgICAgICAgICAucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXCA/KFtbXFwoe30sP1xcLjpdKVxcID8vZywgJyQxJyk7XG5cbiAgICBpZiAoZXhwcikge1xuICAgICAgdmFyXG4gICAgICAgIGxpc3QgPSBbXSxcbiAgICAgICAgY250ID0gMCxcbiAgICAgICAgbWF0Y2g7XG5cbiAgICAgIHdoaWxlIChleHByICYmXG4gICAgICAgICAgICAobWF0Y2ggPSBleHByLm1hdGNoKFJFX0NTTkFNRSkpICYmXG4gICAgICAgICAgICAhbWF0Y2guaW5kZXhcbiAgICAgICAgKSB7XG4gICAgICAgIHZhclxuICAgICAgICAgIGtleSxcbiAgICAgICAgICBqc2IsXG4gICAgICAgICAgcmUgPSAvLHwoW1t7KF0pfCQvZztcblxuICAgICAgICBleHByID0gUmVnRXhwLnJpZ2h0Q29udGV4dDtcbiAgICAgICAga2V5ICA9IG1hdGNoWzJdID8gcXN0clttYXRjaFsyXV0uc2xpY2UoMSwgLTEpLnRyaW0oKS5yZXBsYWNlKC9cXHMrL2csICcgJykgOiBtYXRjaFsxXTtcblxuICAgICAgICB3aGlsZSAoanNiID0gKG1hdGNoID0gcmUuZXhlYyhleHByKSlbMV0pIHsgc2tpcEJyYWNlcyhqc2IsIHJlKTsgfVxuXG4gICAgICAgIGpzYiAgPSBleHByLnNsaWNlKDAsIG1hdGNoLmluZGV4KTtcbiAgICAgICAgZXhwciA9IFJlZ0V4cC5yaWdodENvbnRleHQ7XG5cbiAgICAgICAgbGlzdFtjbnQrK10gPSBfd3JhcEV4cHIoanNiLCAxLCBrZXkpO1xuICAgICAgfVxuXG4gICAgICBleHByID0gIWNudCA/IF93cmFwRXhwcihleHByLCBhc1RleHQpXG4gICAgICAgICAgIDogY250ID4gMSA/ICdbJyArIGxpc3Quam9pbignLCcpICsgJ10uam9pbihcIiBcIikudHJpbSgpJyA6IGxpc3RbMF07XG4gICAgfVxuICAgIHJldHVybiBleHByXG5cbiAgICBmdW5jdGlvbiBza2lwQnJhY2VzIChjaCwgcmUpIHtcbiAgICAgIHZhclxuICAgICAgICBtbSxcbiAgICAgICAgbHYgPSAxLFxuICAgICAgICBpciA9IFJFX0JSRU5EW2NoXTtcblxuICAgICAgaXIubGFzdEluZGV4ID0gcmUubGFzdEluZGV4O1xuICAgICAgd2hpbGUgKG1tID0gaXIuZXhlYyhleHByKSkge1xuICAgICAgICBpZiAobW1bMF0gPT09IGNoKSB7ICsrbHY7IH1cbiAgICAgICAgZWxzZSBpZiAoIS0tbHYpIHsgYnJlYWsgfVxuICAgICAgfVxuICAgICAgcmUubGFzdEluZGV4ID0gbHYgPyBleHByLmxlbmd0aCA6IGlyLmxhc3RJbmRleDtcbiAgICB9XG4gIH1cblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dDogbm90IGJvdGhcbiAgdmFyIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgSlNfQ09OVEVYVCA9ICdcImluIHRoaXM/dGhpczonICsgKHR5cGVvZiB3aW5kb3cgIT09ICdvYmplY3QnID8gJ2dsb2JhbCcgOiAnd2luZG93JykgKyAnKS4nLFxuICAgIEpTX1ZBUk5BTUUgPSAvWyx7XVtcXCRcXHddKyg/PTopfCheICp8W14kXFx3XFwue10pKD8hKD86dHlwZW9mfHRydWV8ZmFsc2V8bnVsbHx1bmRlZmluZWR8aW58aW5zdGFuY2VvZnxpcyg/OkZpbml0ZXxOYU4pfHZvaWR8TmFOfG5ld3xEYXRlfFJlZ0V4cHxNYXRoKSg/IVskXFx3XSkpKFskX0EtWmEtel1bJFxcd10qKS9nLFxuICAgIEpTX05PUFJPUFMgPSAvXig/PShcXC5bJFxcd10rKSlcXDEoPzpbXi5bKF18JCkvO1xuXG4gIGZ1bmN0aW9uIF93cmFwRXhwciAoZXhwciwgYXNUZXh0LCBrZXkpIHtcbiAgICB2YXIgdGI7XG5cbiAgICBleHByID0gZXhwci5yZXBsYWNlKEpTX1ZBUk5BTUUsIGZ1bmN0aW9uIChtYXRjaCwgcCwgbXZhciwgcG9zLCBzKSB7XG4gICAgICBpZiAobXZhcikge1xuICAgICAgICBwb3MgPSB0YiA/IDAgOiBwb3MgKyBtYXRjaC5sZW5ndGg7XG5cbiAgICAgICAgaWYgKG12YXIgIT09ICd0aGlzJyAmJiBtdmFyICE9PSAnZ2xvYmFsJyAmJiBtdmFyICE9PSAnd2luZG93Jykge1xuICAgICAgICAgIG1hdGNoID0gcCArICcoXCInICsgbXZhciArIEpTX0NPTlRFWFQgKyBtdmFyO1xuICAgICAgICAgIGlmIChwb3MpIHsgdGIgPSAocyA9IHNbcG9zXSkgPT09ICcuJyB8fCBzID09PSAnKCcgfHwgcyA9PT0gJ1snOyB9XG4gICAgICAgIH0gZWxzZSBpZiAocG9zKSB7XG4gICAgICAgICAgdGIgPSAhSlNfTk9QUk9QUy50ZXN0KHMuc2xpY2UocG9zKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBtYXRjaFxuICAgIH0pO1xuXG4gICAgaWYgKHRiKSB7XG4gICAgICBleHByID0gJ3RyeXtyZXR1cm4gJyArIGV4cHIgKyAnfWNhdGNoKGUpe0UoZSx0aGlzKX0nO1xuICAgIH1cblxuICAgIGlmIChrZXkpIHtcblxuICAgICAgZXhwciA9ICh0YlxuICAgICAgICAgID8gJ2Z1bmN0aW9uKCl7JyArIGV4cHIgKyAnfS5jYWxsKHRoaXMpJyA6ICcoJyArIGV4cHIgKyAnKSdcbiAgICAgICAgKSArICc/XCInICsga2V5ICsgJ1wiOlwiXCInO1xuXG4gICAgfSBlbHNlIGlmIChhc1RleHQpIHtcblxuICAgICAgZXhwciA9ICdmdW5jdGlvbih2KXsnICsgKHRiXG4gICAgICAgICAgPyBleHByLnJlcGxhY2UoJ3JldHVybiAnLCAndj0nKSA6ICd2PSgnICsgZXhwciArICcpJ1xuICAgICAgICApICsgJztyZXR1cm4gdnx8dj09PTA/djpcIlwifS5jYWxsKHRoaXMpJztcbiAgICB9XG5cbiAgICByZXR1cm4gZXhwclxuICB9XG5cbiAgX3RtcGwudmVyc2lvbiA9IGJyYWNrZXRzLnZlcnNpb24gPSAndjMuMC4xJztcblxuICByZXR1cm4gX3RtcGxcblxufSkoKTtcblxudmFyIG9ic2VydmFibGUkMSA9IGZ1bmN0aW9uKGVsKSB7XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgb3JpZ2luYWwgb2JqZWN0IG9yIGNyZWF0ZSBhIG5ldyBlbXB0eSBvbmVcbiAgICogQHR5cGUgeyBPYmplY3QgfVxuICAgKi9cblxuICBlbCA9IGVsIHx8IHt9O1xuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlc1xuICAgKi9cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIC8qKlxuICAgKiBQdWJsaWMgQXBpXG4gICAqL1xuXG4gIC8vIGV4dGVuZCB0aGUgZWwgb2JqZWN0IGFkZGluZyB0aGUgb2JzZXJ2YWJsZSBtZXRob2RzXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGVsLCB7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZHNcbiAgICAgKiBleGVjdXRlIHRoZSBgY2FsbGJhY2tgIGVhY2ggdGltZSBhbiBldmVudCBpcyB0cmlnZ2VyZWQuXG4gICAgICogQHBhcmFtICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9uOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICB7IChjYWxsYmFja3NbZXZlbnRdID0gY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSkucHVzaChmbik7IH1cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGBldmVudGAgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb2ZmOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmIChldmVudCA9PSAnKicgJiYgIWZuKSB7IGNhbGxiYWNrcyA9IHt9OyB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChmbikge1xuICAgICAgICAgICAgdmFyIGFyciA9IGNhbGxiYWNrc1tldmVudF07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgY2I7IGNiID0gYXJyICYmIGFycltpXTsgKytpKSB7XG4gICAgICAgICAgICAgIGlmIChjYiA9PSBmbikgeyBhcnIuc3BsaWNlKGktLSwgMSk7IH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgeyBkZWxldGUgY2FsbGJhY2tzW2V2ZW50XTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGBldmVudGAgYW5kXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBhdCBtb3N0IG9uY2VcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbmU6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgICAgZWwub2ZmKGV2ZW50LCBvbik7XG4gICAgICAgICAgZm4uYXBwbHkoZWwsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsLm9uKGV2ZW50LCBvbilcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhbGwgY2FsbGJhY2sgZnVuY3Rpb25zIHRoYXQgbGlzdGVuIHRvXG4gICAgICogdGhlIGdpdmVuIGBldmVudGBcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgdHJpZ2dlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcblxuXG4gICAgICAgIC8vIGdldHRpbmcgdGhlIGFyZ3VtZW50c1xuICAgICAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgYXJncyA9IG5ldyBBcnJheShhcmdsZW4pLFxuICAgICAgICAgIGZucyxcbiAgICAgICAgICBmbixcbiAgICAgICAgICBpO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmdsZW47IGkrKykge1xuICAgICAgICAgIGFyZ3NbaV0gPSBhcmd1bWVudHMkMVtpICsgMV07IC8vIHNraXAgZmlyc3QgYXJndW1lbnRcbiAgICAgICAgfVxuXG4gICAgICAgIGZucyA9IHNsaWNlLmNhbGwoY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSwgMCk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgZm4gPSBmbnNbaV07ICsraSkge1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmdzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsYmFja3NbJyonXSAmJiBldmVudCAhPSAnKicpXG4gICAgICAgICAgeyBlbC50cmlnZ2VyLmFwcGx5KGVsLCBbJyonLCBldmVudF0uY29uY2F0KGFyZ3MpKTsgfVxuXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGVsXG5cbn07XG5cbi8qKlxuICogU3BlY2lhbGl6ZWQgZnVuY3Rpb24gZm9yIGxvb3BpbmcgYW4gYXJyYXktbGlrZSBjb2xsZWN0aW9uIHdpdGggYGVhY2g9e31gXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gbGlzdCAtIGNvbGxlY3Rpb24gb2YgaXRlbXNcbiAqIEBwYXJhbSAgIHtGdW5jdGlvbn0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICogQHJldHVybnMgeyBBcnJheSB9IHRoZSBhcnJheSBsb29wZWRcbiAqL1xuZnVuY3Rpb24gZWFjaChsaXN0LCBmbikge1xuICB2YXIgbGVuID0gbGlzdCA/IGxpc3QubGVuZ3RoIDogMDtcblxuICBmb3IgKHZhciBpID0gMCwgZWw7IGkgPCBsZW47ICsraSkge1xuICAgIGVsID0gbGlzdFtpXTtcbiAgICAvLyByZXR1cm4gZmFsc2UgLT4gY3VycmVudCBpdGVtIHdhcyByZW1vdmVkIGJ5IGZuIGR1cmluZyB0aGUgbG9vcFxuICAgIGlmIChmbihlbCwgaSkgPT09IGZhbHNlKVxuICAgICAgeyBpLS07IH1cbiAgfVxuICByZXR1cm4gbGlzdFxufVxuXG4vKipcbiAqIENoZWNrIHdoZXRoZXIgYW4gYXJyYXkgY29udGFpbnMgYW4gaXRlbVxuICogQHBhcmFtICAgeyBBcnJheSB9IGFycmF5IC0gdGFyZ2V0IGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSBpdGVtIC0gaXRlbSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGNvbnRhaW5zKGFycmF5LCBpdGVtKSB7XG4gIHJldHVybiB+YXJyYXkuaW5kZXhPZihpdGVtKVxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgY29udGFpbmluZyBkYXNoZXMgdG8gY2FtZWwgY2FzZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzdHIgLSBpbnB1dCBzdHJpbmdcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gbXktc3RyaW5nIC0+IG15U3RyaW5nXG4gKi9cbmZ1bmN0aW9uIHRvQ2FtZWwoc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvLShcXHcpL2csIGZ1bmN0aW9uIChfLCBjKSB7IHJldHVybiBjLnRvVXBwZXJDYXNlKCk7IH0pXG59XG5cbi8qKlxuICogRmFzdGVyIFN0cmluZyBzdGFydHNXaXRoIGFsdGVybmF0aXZlXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHN0ciAtIHNvdXJjZSBzdHJpbmdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdmFsdWUgLSB0ZXN0IHN0cmluZ1xuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBzdGFydHNXaXRoKHN0ciwgdmFsdWUpIHtcbiAgcmV0dXJuIHN0ci5zbGljZSgwLCB2YWx1ZS5sZW5ndGgpID09PSB2YWx1ZVxufVxuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBzZXQgYW4gaW1tdXRhYmxlIHByb3BlcnR5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGVsIC0gb2JqZWN0IHdoZXJlIHRoZSBuZXcgcHJvcGVydHkgd2lsbCBiZSBzZXRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0ga2V5IC0gb2JqZWN0IGtleSB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc3RvcmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtIHZhbHVlIG9mIHRoZSBuZXcgcHJvcGVydHlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0aW9ucyAtIHNldCB0aGUgcHJvcGVyeSBvdmVycmlkaW5nIHRoZSBkZWZhdWx0IG9wdGlvbnNcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gLSB0aGUgaW5pdGlhbCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoZWwsIGtleSwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsLCBrZXksIGV4dGVuZCh7XG4gICAgdmFsdWU6IHZhbHVlLFxuICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfSwgb3B0aW9ucykpO1xuICByZXR1cm4gZWxcbn1cblxuLyoqXG4gKiBFeHRlbmQgYW55IG9iamVjdCB3aXRoIG90aGVyIHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gc3JjIC0gc291cmNlIG9iamVjdFxuICogQHJldHVybnMgeyBPYmplY3QgfSB0aGUgcmVzdWx0aW5nIGV4dGVuZGVkIG9iamVjdFxuICpcbiAqIHZhciBvYmogPSB7IGZvbzogJ2JheicgfVxuICogZXh0ZW5kKG9iaiwge2JhcjogJ2JhcicsIGZvbzogJ2Jhcid9KVxuICogY29uc29sZS5sb2cob2JqKSA9PiB7YmFyOiAnYmFyJywgZm9vOiAnYmFyJ31cbiAqXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChzcmMpIHtcbiAgdmFyIG9iaiwgYXJncyA9IGFyZ3VtZW50cztcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKG9iaiA9IGFyZ3NbaV0pIHtcbiAgICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhpcyBwcm9wZXJ0eSBvZiB0aGUgc291cmNlIG9iamVjdCBjb3VsZCBiZSBvdmVycmlkZGVuXG4gICAgICAgIGlmIChpc1dyaXRhYmxlKHNyYywga2V5KSlcbiAgICAgICAgICB7IHNyY1trZXldID0gb2JqW2tleV07IH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHNyY1xufVxuXG52YXIgbWlzYyA9IE9iamVjdC5mcmVlemUoe1xuXHRlYWNoOiBlYWNoLFxuXHRjb250YWluczogY29udGFpbnMsXG5cdHRvQ2FtZWw6IHRvQ2FtZWwsXG5cdHN0YXJ0c1dpdGg6IHN0YXJ0c1dpdGgsXG5cdGRlZmluZVByb3BlcnR5OiBkZWZpbmVQcm9wZXJ0eSxcblx0ZXh0ZW5kOiBleHRlbmRcbn0pO1xuXG52YXIgRVZFTlRTX1BSRUZJWF9SRUdFWCA9IC9eb24vO1xuXG4vKipcbiAqIFRyaWdnZXIgRE9NIGV2ZW50c1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIGRvbSBlbGVtZW50IHRhcmdldCBvZiB0aGUgZXZlbnRcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gdXNlciBmdW5jdGlvblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlIC0gZXZlbnQgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZUV2ZW50KGRvbSwgaGFuZGxlciwgZSkge1xuICB2YXIgcHRhZyA9IHRoaXMuX3BhcmVudCxcbiAgICBpdGVtID0gdGhpcy5faXRlbTtcblxuICBpZiAoIWl0ZW0pXG4gICAgeyB3aGlsZSAocHRhZyAmJiAhaXRlbSkge1xuICAgICAgaXRlbSA9IHB0YWcuX2l0ZW07XG4gICAgICBwdGFnID0gcHRhZy5fcGFyZW50O1xuICAgIH0gfVxuXG4gIC8vIG92ZXJyaWRlIHRoZSBldmVudCBwcm9wZXJ0aWVzXG4gIGlmIChpc1dyaXRhYmxlKGUsICdjdXJyZW50VGFyZ2V0JykpIHsgZS5jdXJyZW50VGFyZ2V0ID0gZG9tOyB9XG4gIGlmIChpc1dyaXRhYmxlKGUsICd0YXJnZXQnKSkgeyBlLnRhcmdldCA9IGUuc3JjRWxlbWVudDsgfVxuICBpZiAoaXNXcml0YWJsZShlLCAnd2hpY2gnKSkgeyBlLndoaWNoID0gZS5jaGFyQ29kZSB8fCBlLmtleUNvZGU7IH1cblxuICBlLml0ZW0gPSBpdGVtO1xuXG4gIGhhbmRsZXIuY2FsbCh0aGlzLCBlKTtcblxuICBpZiAoIWUucHJldmVudFVwZGF0ZSkge1xuICAgIHZhciBwID0gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMpO1xuICAgIC8vIGZpeGVzICMyMDgzXG4gICAgaWYgKHAuaXNNb3VudGVkKSB7IHAudXBkYXRlKCk7IH1cbiAgfVxufVxuXG4vKipcbiAqIEF0dGFjaCBhbiBldmVudCB0byBhIERPTSBub2RlXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gZXZlbnQgbmFtZVxuICogQHBhcmFtIHsgRnVuY3Rpb24gfSBoYW5kbGVyIC0gZXZlbnQgY2FsbGJhY2tcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGRvbSAtIGRvbSBub2RlXG4gKiBAcGFyYW0geyBUYWcgfSB0YWcgLSB0YWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gc2V0RXZlbnRIYW5kbGVyKG5hbWUsIGhhbmRsZXIsIGRvbSwgdGFnKSB7XG4gIHZhciBldmVudE5hbWUsXG4gICAgY2IgPSBoYW5kbGVFdmVudC5iaW5kKHRhZywgZG9tLCBoYW5kbGVyKTtcblxuICBpZiAoIWRvbS5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgZG9tW25hbWVdID0gY2I7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBhdm9pZCB0byBiaW5kIHR3aWNlIHRoZSBzYW1lIGV2ZW50XG4gIGRvbVtuYW1lXSA9IG51bGw7XG5cbiAgLy8gbm9ybWFsaXplIGV2ZW50IG5hbWVcbiAgZXZlbnROYW1lID0gbmFtZS5yZXBsYWNlKEVWRU5UU19QUkVGSVhfUkVHRVgsICcnKTtcblxuICAvLyBjYWNoZSB0aGUgY2FsbGJhY2sgZGlyZWN0bHkgb24gdGhlIERPTSBub2RlXG4gIGlmICghZG9tLl9yaW90RXZlbnRzKSB7IGRvbS5fcmlvdEV2ZW50cyA9IHt9OyB9XG5cbiAgaWYgKGRvbS5fcmlvdEV2ZW50c1tuYW1lXSlcbiAgICB7IGRvbS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZG9tLl9yaW90RXZlbnRzW25hbWVdKTsgfVxuXG4gIGRvbS5fcmlvdEV2ZW50c1tuYW1lXSA9IGNiO1xuICBkb20uYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNiLCBmYWxzZSk7XG59XG5cbi8qKlxuICogVXBkYXRlIGR5bmFtaWNhbGx5IGNyZWF0ZWQgZGF0YS1pcyB0YWdzIHdpdGggY2hhbmdpbmcgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGV4cHIgLSBleHByZXNzaW9uIHRhZyBhbmQgZXhwcmVzc2lvbiBpbmZvXG4gKiBAcGFyYW0geyBUYWcgfSBwYXJlbnQgLSBwYXJlbnQgZm9yIHRhZyBjcmVhdGlvblxuICovXG5mdW5jdGlvbiB1cGRhdGVEYXRhSXMoZXhwciwgcGFyZW50KSB7XG4gIHZhciB0YWdOYW1lID0gdG1wbChleHByLnZhbHVlLCBwYXJlbnQpLFxuICAgIGNvbmY7XG5cbiAgaWYgKGV4cHIudGFnICYmIGV4cHIudGFnTmFtZSA9PT0gdGFnTmFtZSkge1xuICAgIGV4cHIudGFnLnVwZGF0ZSgpO1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gc3luYyBfcGFyZW50IHRvIGFjY29tbW9kYXRlIGNoYW5naW5nIHRhZ25hbWVzXG4gIGlmIChleHByLnRhZykge1xuICAgIGVhY2goZXhwci5hdHRycywgZnVuY3Rpb24gKGEpIHsgcmV0dXJuIHNldEF0dHIoZXhwci50YWcucm9vdCwgYS5uYW1lLCBhLnZhbHVlKTsgfSk7XG4gICAgZXhwci50YWcudW5tb3VudCh0cnVlKTtcbiAgfVxuXG4gIGV4cHIuaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV07XG4gIGNvbmYgPSB7cm9vdDogZXhwci5kb20sIHBhcmVudDogcGFyZW50LCBoYXNJbXBsOiB0cnVlLCB0YWdOYW1lOiB0YWdOYW1lfTtcbiAgZXhwci50YWcgPSBpbml0Q2hpbGRUYWcoZXhwci5pbXBsLCBjb25mLCBleHByLmRvbS5pbm5lckhUTUwsIHBhcmVudCk7XG4gIGV4cHIudGFnTmFtZSA9IHRhZ05hbWU7XG4gIGV4cHIudGFnLm1vdW50KCk7XG5cbiAgLy8gcGFyZW50IGlzIHRoZSBwbGFjZWhvbGRlciB0YWcsIG5vdCB0aGUgZHluYW1pYyB0YWcgc28gY2xlYW4gdXBcbiAgcGFyZW50Lm9uKCd1bm1vdW50JywgZnVuY3Rpb24gKCkge1xuICAgIHZhciBkZWxOYW1lID0gZXhwci50YWcub3B0cy5kYXRhSXMsXG4gICAgICB0YWdzID0gZXhwci50YWcucGFyZW50LnRhZ3MsXG4gICAgICBfdGFncyA9IGV4cHIudGFnLl9wYXJlbnQudGFncztcbiAgICBhcnJheWlzaFJlbW92ZSh0YWdzLCBkZWxOYW1lLCBleHByLnRhZyk7XG4gICAgYXJyYXlpc2hSZW1vdmUoX3RhZ3MsIGRlbE5hbWUsIGV4cHIudGFnKTtcbiAgICBleHByLnRhZy51bm1vdW50KCk7XG4gIH0pO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBvbiBzaW5nbGUgdGFnIGV4cHJlc3Npb25cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgT2JqZWN0IH0gZXhwciAtIGV4cHJlc3Npb24gbG9naWNcbiAqIEByZXR1cm5zIHsgdW5kZWZpbmVkIH1cbiAqL1xuZnVuY3Rpb24gdXBkYXRlRXhwcmVzc2lvbihleHByKSB7XG4gIHZhciBkb20gPSBleHByLmRvbSxcbiAgICBhdHRyTmFtZSA9IGV4cHIuYXR0cixcbiAgICBpc1RvZ2dsZSA9IGNvbnRhaW5zKFtTSE9XX0RJUkVDVElWRSwgSElERV9ESVJFQ1RJVkVdLCBhdHRyTmFtZSksXG4gICAgdmFsdWUgPSB0bXBsKGV4cHIuZXhwciwgdGhpcyksXG4gICAgaXNWYWx1ZUF0dHIgPSBhdHRyTmFtZSA9PT0gJ3Jpb3QtdmFsdWUnLFxuICAgIGlzVmlydHVhbCA9IGV4cHIucm9vdCAmJiBleHByLnJvb3QudGFnTmFtZSA9PT0gJ1ZJUlRVQUwnLFxuICAgIHBhcmVudCA9IGRvbSAmJiAoZXhwci5wYXJlbnQgfHwgZG9tLnBhcmVudE5vZGUpLFxuICAgIG9sZDtcblxuICBpZiAoZXhwci5ib29sKVxuICAgIHsgdmFsdWUgPSB2YWx1ZSA/IGF0dHJOYW1lIDogZmFsc2U7IH1cbiAgZWxzZSBpZiAoaXNVbmRlZmluZWQodmFsdWUpIHx8IHZhbHVlID09PSBudWxsKVxuICAgIHsgdmFsdWUgPSAnJzsgfVxuXG4gIGlmIChleHByLl9yaW90X2lkKSB7IC8vIGlmIGl0J3MgYSB0YWdcbiAgICBpZiAoZXhwci5pc01vdW50ZWQpIHtcbiAgICAgIGV4cHIudXBkYXRlKCk7XG5cbiAgICAvLyBpZiBpdCBoYXNuJ3QgYmVlbiBtb3VudGVkIHlldCwgZG8gdGhhdCBub3cuXG4gICAgfSBlbHNlIHtcbiAgICAgIGV4cHIubW91bnQoKTtcblxuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgbWFrZVZpcnR1YWwuY2FsbChleHByLCBmcmFnKTtcbiAgICAgICAgZXhwci5yb290LnBhcmVudEVsZW1lbnQucmVwbGFjZUNoaWxkKGZyYWcsIGV4cHIucm9vdCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgb2xkID0gZXhwci52YWx1ZTtcbiAgZXhwci52YWx1ZSA9IHZhbHVlO1xuXG4gIGlmIChleHByLnVwZGF0ZSkge1xuICAgIGV4cHIudXBkYXRlKCk7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoZXhwci5pc1J0YWcgJiYgdmFsdWUpIHsgcmV0dXJuIHVwZGF0ZURhdGFJcyhleHByLCB0aGlzKSB9XG4gIGlmIChvbGQgPT09IHZhbHVlKSB7IHJldHVybiB9XG4gIC8vIG5vIGNoYW5nZSwgc28gbm90aGluZyBtb3JlIHRvIGRvXG4gIGlmIChpc1ZhbHVlQXR0ciAmJiBkb20udmFsdWUgPT09IHZhbHVlKSB7IHJldHVybiB9XG5cbiAgLy8gdGV4dGFyZWEgYW5kIHRleHQgbm9kZXMgaGF2ZSBubyBhdHRyaWJ1dGUgbmFtZVxuICBpZiAoIWF0dHJOYW1lKSB7XG4gICAgLy8gYWJvdXQgIzgxNSB3L28gcmVwbGFjZTogdGhlIGJyb3dzZXIgY29udmVydHMgdGhlIHZhbHVlIHRvIGEgc3RyaW5nLFxuICAgIC8vIHRoZSBjb21wYXJpc29uIGJ5IFwiPT1cIiBkb2VzIHRvbywgYnV0IG5vdCBpbiB0aGUgc2VydmVyXG4gICAgdmFsdWUgKz0gJyc7XG4gICAgLy8gdGVzdCBmb3IgcGFyZW50IGF2b2lkcyBlcnJvciB3aXRoIGludmFsaWQgYXNzaWdubWVudCB0byBub2RlVmFsdWVcbiAgICBpZiAocGFyZW50KSB7XG4gICAgICAvLyBjYWNoZSB0aGUgcGFyZW50IG5vZGUgYmVjYXVzZSBzb21laG93IGl0IHdpbGwgYmVjb21lIG51bGwgb24gSUVcbiAgICAgIC8vIG9uIHRoZSBuZXh0IGl0ZXJhdGlvblxuICAgICAgZXhwci5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICBpZiAocGFyZW50LnRhZ05hbWUgPT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgcGFyZW50LnZhbHVlID0gdmFsdWU7ICAgICAgICAgICAgICAgICAgICAvLyAjMTExM1xuICAgICAgICBpZiAoIUlFX1ZFUlNJT04pIHsgZG9tLm5vZGVWYWx1ZSA9IHZhbHVlOyB9ICAvLyAjMTYyNSBJRSB0aHJvd3MgaGVyZSwgbm9kZVZhbHVlXG4gICAgICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIGJlIGF2YWlsYWJsZSBvbiAndXBkYXRlZCdcbiAgICAgIGVsc2UgeyBkb20ubm9kZVZhbHVlID0gdmFsdWU7IH1cbiAgICB9XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyByZW1vdmUgb3JpZ2luYWwgYXR0cmlidXRlXG4gIGlmICghZXhwci5pc0F0dHJSZW1vdmVkIHx8ICF2YWx1ZSkge1xuICAgIHJlbUF0dHIoZG9tLCBhdHRyTmFtZSk7XG4gICAgZXhwci5pc0F0dHJSZW1vdmVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIGV2ZW50IGhhbmRsZXJcbiAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7XG4gICAgc2V0RXZlbnRIYW5kbGVyKGF0dHJOYW1lLCB2YWx1ZSwgZG9tLCB0aGlzKTtcbiAgLy8gc2hvdyAvIGhpZGVcbiAgfSBlbHNlIGlmIChpc1RvZ2dsZSkge1xuICAgIGlmIChhdHRyTmFtZSA9PT0gSElERV9ESVJFQ1RJVkUpIHsgdmFsdWUgPSAhdmFsdWU7IH1cbiAgICBkb20uc3R5bGUuZGlzcGxheSA9IHZhbHVlID8gJycgOiAnbm9uZSc7XG4gIC8vIGZpZWxkIHZhbHVlXG4gIH0gZWxzZSBpZiAoaXNWYWx1ZUF0dHIpIHtcbiAgICBkb20udmFsdWUgPSB2YWx1ZTtcbiAgLy8gPGltZyBzcmM9XCJ7IGV4cHIgfVwiPlxuICB9IGVsc2UgaWYgKHN0YXJ0c1dpdGgoYXR0ck5hbWUsIEFUVFJTX1BSRUZJWCkgJiYgYXR0ck5hbWUgIT09IElTX0RJUkVDVElWRSkge1xuICAgIGF0dHJOYW1lID0gYXR0ck5hbWUuc2xpY2UoQVRUUlNfUFJFRklYLmxlbmd0aCk7XG4gICAgaWYgKENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVNbYXR0ck5hbWVdKVxuICAgICAgeyBhdHRyTmFtZSA9IENBU0VfU0VOU0lUSVZFX0FUVFJJQlVURVNbYXR0ck5hbWVdOyB9XG4gICAgaWYgKHZhbHVlICE9IG51bGwpXG4gICAgICB7IHNldEF0dHIoZG9tLCBhdHRyTmFtZSwgdmFsdWUpOyB9XG4gIH0gZWxzZSB7XG4gICAgLy8gPHNlbGVjdD4gPG9wdGlvbiBzZWxlY3RlZD17dHJ1ZX0+IDwvc2VsZWN0PlxuICAgIGlmIChhdHRyTmFtZSA9PT0gJ3NlbGVjdGVkJyAmJiBwYXJlbnQgJiYgL14oU0VMRUNUfE9QVEdST1VQKSQvLnRlc3QocGFyZW50LnRhZ05hbWUpICYmIHZhbHVlKSB7XG4gICAgICBwYXJlbnQudmFsdWUgPSBkb20udmFsdWU7XG4gICAgfSBpZiAoZXhwci5ib29sKSB7XG4gICAgICBkb21bYXR0ck5hbWVdID0gdmFsdWU7XG4gICAgICBpZiAoIXZhbHVlKSB7IHJldHVybiB9XG4gICAgfSBpZiAodmFsdWUgPT09IDAgfHwgdmFsdWUgJiYgdHlwZW9mIHZhbHVlICE9PSBUX09CSkVDVCkge1xuICAgICAgc2V0QXR0cihkb20sIGF0dHJOYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCB0aGUgZXhwcmVzc2lvbnMgaW4gYSBUYWcgaW5zdGFuY2VcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGV4cHJlc3Npb24gdGhhdCBtdXN0IGJlIHJlIGV2YWx1YXRlZFxuICovXG5mdW5jdGlvbiB1cGRhdGVBbGxFeHByZXNzaW9ucyhleHByZXNzaW9ucykge1xuICBlYWNoKGV4cHJlc3Npb25zLCB1cGRhdGVFeHByZXNzaW9uLmJpbmQodGhpcykpO1xufVxuXG52YXIgSWZFeHByID0ge1xuICBpbml0OiBmdW5jdGlvbiBpbml0KGRvbSwgdGFnLCBleHByKSB7XG4gICAgcmVtQXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSk7XG4gICAgdGhpcy50YWcgPSB0YWc7XG4gICAgdGhpcy5leHByID0gZXhwcjtcbiAgICB0aGlzLnN0dWIgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgdGhpcy5wcmlzdGluZSA9IGRvbTtcblxuICAgIHZhciBwID0gZG9tLnBhcmVudE5vZGU7XG4gICAgcC5pbnNlcnRCZWZvcmUodGhpcy5zdHViLCBkb20pO1xuICAgIHAucmVtb3ZlQ2hpbGQoZG9tKTtcblxuICAgIHJldHVybiB0aGlzXG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBuZXdWYWx1ZSA9IHRtcGwodGhpcy5leHByLCB0aGlzLnRhZyk7XG5cbiAgICBpZiAobmV3VmFsdWUgJiYgIXRoaXMuY3VycmVudCkgeyAvLyBpbnNlcnRcbiAgICAgIHRoaXMuY3VycmVudCA9IHRoaXMucHJpc3RpbmUuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgdGhpcy5zdHViLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuY3VycmVudCwgdGhpcy5zdHViKTtcblxuICAgICAgdGhpcy5leHByZXNzaW9ucyA9IFtdO1xuICAgICAgcGFyc2VFeHByZXNzaW9ucy5hcHBseSh0aGlzLnRhZywgW3RoaXMuY3VycmVudCwgdGhpcy5leHByZXNzaW9ucywgdHJ1ZV0pO1xuICAgIH0gZWxzZSBpZiAoIW5ld1ZhbHVlICYmIHRoaXMuY3VycmVudCkgeyAvLyByZW1vdmVcbiAgICAgIHVubW91bnRBbGwodGhpcy5leHByZXNzaW9ucyk7XG4gICAgICBpZiAodGhpcy5jdXJyZW50Ll90YWcpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Ll90YWcudW5tb3VudCgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnQucGFyZW50Tm9kZSlcbiAgICAgICAgeyB0aGlzLmN1cnJlbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmN1cnJlbnQpOyB9XG4gICAgICB0aGlzLmN1cnJlbnQgPSBudWxsO1xuICAgICAgdGhpcy5leHByZXNzaW9ucyA9IFtdO1xuICAgIH1cblxuICAgIGlmIChuZXdWYWx1ZSkgeyB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKHRoaXMudGFnLCB0aGlzLmV4cHJlc3Npb25zKTsgfVxuICB9LFxuICB1bm1vdW50OiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgIHVubW91bnRBbGwodGhpcy5leHByZXNzaW9ucyB8fCBbXSk7XG4gICAgZGVsZXRlIHRoaXMucHJpc3RpbmU7XG4gICAgZGVsZXRlIHRoaXMucGFyZW50Tm9kZTtcbiAgICBkZWxldGUgdGhpcy5zdHViO1xuICB9XG59O1xuXG52YXIgUmVmRXhwciA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdChkb20sIHBhcmVudCwgYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIHRoaXMuZG9tID0gZG9tO1xuICAgIHRoaXMuYXR0ciA9IGF0dHJOYW1lO1xuICAgIHRoaXMucmF3VmFsdWUgPSBhdHRyVmFsdWU7XG4gICAgdGhpcy5wYXJlbnQgPSBwYXJlbnQ7XG4gICAgdGhpcy5oYXNFeHAgPSB0bXBsLmhhc0V4cHIoYXR0clZhbHVlKTtcbiAgICB0aGlzLmZpcnN0UnVuID0gdHJ1ZTtcblxuICAgIHJldHVybiB0aGlzXG4gIH0sXG4gIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciB2YWx1ZSA9IHRoaXMucmF3VmFsdWU7XG4gICAgaWYgKHRoaXMuaGFzRXhwKVxuICAgICAgeyB2YWx1ZSA9IHRtcGwodGhpcy5yYXdWYWx1ZSwgdGhpcy5wYXJlbnQpOyB9XG5cbiAgICAvLyBpZiBub3RoaW5nIGNoYW5nZWQsIHdlJ3JlIGRvbmVcbiAgICBpZiAoIXRoaXMuZmlyc3RSdW4gJiYgdmFsdWUgPT09IHRoaXMudmFsdWUpIHsgcmV0dXJuIH1cblxuICAgIHZhciBjdXN0b21QYXJlbnQgPSB0aGlzLnBhcmVudCAmJiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcy5wYXJlbnQpO1xuXG4gICAgLy8gaWYgdGhlIHJlZmVyZW5jZWQgZWxlbWVudCBpcyBhIGN1c3RvbSB0YWcsIHRoZW4gd2Ugc2V0IHRoZSB0YWcgaXRzZWxmLCByYXRoZXIgdGhhbiBET01cbiAgICB2YXIgdGFnT3JEb20gPSB0aGlzLnRhZyB8fCB0aGlzLmRvbTtcblxuICAgIC8vIHRoZSBuYW1lIGNoYW5nZWQsIHNvIHdlIG5lZWQgdG8gcmVtb3ZlIGl0IGZyb20gdGhlIG9sZCBrZXkgKGlmIHByZXNlbnQpXG4gICAgaWYgKCFpc0JsYW5rKHRoaXMudmFsdWUpICYmIGN1c3RvbVBhcmVudClcbiAgICAgIHsgYXJyYXlpc2hSZW1vdmUoY3VzdG9tUGFyZW50LnJlZnMsIHRoaXMudmFsdWUsIHRhZ09yRG9tKTsgfVxuXG4gICAgaWYgKGlzQmxhbmsodmFsdWUpKSB7XG4gICAgICAvLyBpZiB0aGUgdmFsdWUgaXMgYmxhbmssIHdlIHJlbW92ZSBpdFxuICAgICAgcmVtQXR0cih0aGlzLmRvbSwgdGhpcy5hdHRyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWRkIGl0IHRvIHRoZSByZWZzIG9mIHBhcmVudCB0YWcgKHRoaXMgYmVoYXZpb3Igd2FzIGNoYW5nZWQgPj0zLjApXG4gICAgICBpZiAoY3VzdG9tUGFyZW50KSB7IGFycmF5aXNoQWRkKGN1c3RvbVBhcmVudC5yZWZzLCB2YWx1ZSwgdGFnT3JEb20pOyB9XG4gICAgICAvLyBzZXQgdGhlIGFjdHVhbCBET00gYXR0clxuICAgICAgc2V0QXR0cih0aGlzLmRvbSwgdGhpcy5hdHRyLCB2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLmZpcnN0UnVuID0gZmFsc2U7XG4gIH0sXG4gIHVubW91bnQ6IGZ1bmN0aW9uIHVubW91bnQoKSB7XG4gICAgdmFyIHRhZ09yRG9tID0gdGhpcy50YWcgfHwgdGhpcy5kb207XG4gICAgdmFyIGN1c3RvbVBhcmVudCA9IHRoaXMucGFyZW50ICYmIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzLnBhcmVudCk7XG4gICAgaWYgKCFpc0JsYW5rKHRoaXMudmFsdWUpICYmIGN1c3RvbVBhcmVudClcbiAgICAgIHsgYXJyYXlpc2hSZW1vdmUoY3VzdG9tUGFyZW50LnJlZnMsIHRoaXMudmFsdWUsIHRhZ09yRG9tKTsgfVxuICAgIGRlbGV0ZSB0aGlzLmRvbTtcbiAgICBkZWxldGUgdGhpcy5wYXJlbnQ7XG4gIH1cbn07XG5cbi8qKlxuICogQ29udmVydCB0aGUgaXRlbSBsb29wZWQgaW50byBhbiBvYmplY3QgdXNlZCB0byBleHRlbmQgdGhlIGNoaWxkIHRhZyBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGV4cHIgLSBvYmplY3QgY29udGFpbmluZyB0aGUga2V5cyB1c2VkIHRvIGV4dGVuZCB0aGUgY2hpbGRyZW4gdGFnc1xuICogQHBhcmFtICAgeyAqIH0ga2V5IC0gdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBuZXcgb2JqZWN0IHJldHVybmVkXG4gKiBAcGFyYW0gICB7ICogfSB2YWwgLSB2YWx1ZSBjb250YWluaW5nIHRoZSBwb3NpdGlvbiBvZiB0aGUgaXRlbSBpbiB0aGUgYXJyYXlcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gYmFzZSAtIHByb3RvdHlwZSBvYmplY3QgZm9yIHRoZSBuZXcgaXRlbVxuICogQHJldHVybnMgeyBPYmplY3QgfSAtIG5ldyBvYmplY3QgY29udGFpbmluZyB0aGUgdmFsdWVzIG9mIHRoZSBvcmlnaW5hbCBpdGVtXG4gKlxuICogVGhlIHZhcmlhYmxlcyAna2V5JyBhbmQgJ3ZhbCcgYXJlIGFyYml0cmFyeS5cbiAqIFRoZXkgZGVwZW5kIG9uIHRoZSBjb2xsZWN0aW9uIHR5cGUgbG9vcGVkIChBcnJheSwgT2JqZWN0KVxuICogYW5kIG9uIHRoZSBleHByZXNzaW9uIHVzZWQgb24gdGhlIGVhY2ggdGFnXG4gKlxuICovXG5mdW5jdGlvbiBta2l0ZW0oZXhwciwga2V5LCB2YWwsIGJhc2UpIHtcbiAgdmFyIGl0ZW0gPSBiYXNlID8gT2JqZWN0LmNyZWF0ZShiYXNlKSA6IHt9O1xuICBpdGVtW2V4cHIua2V5XSA9IGtleTtcbiAgaWYgKGV4cHIucG9zKSB7IGl0ZW1bZXhwci5wb3NdID0gdmFsOyB9XG4gIHJldHVybiBpdGVtXG59XG5cbi8qKlxuICogVW5tb3VudCB0aGUgcmVkdW5kYW50IHRhZ3NcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBpdGVtcyAtIGFycmF5IGNvbnRhaW5pbmcgdGhlIGN1cnJlbnQgaXRlbXMgdG8gbG9vcFxuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSBhcnJheSBjb250YWluaW5nIGFsbCB0aGUgY2hpbGRyZW4gdGFnc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0ga2V5IHVzZWQgdG8gaWRlbnRpZnkgdGhlIHR5cGUgb2YgdGFnXG4gKi9cbmZ1bmN0aW9uIHVubW91bnRSZWR1bmRhbnQoaXRlbXMsIHRhZ3MsIHRhZ05hbWUpIHtcbiAgdmFyIGkgPSB0YWdzLmxlbmd0aCxcbiAgICBqID0gaXRlbXMubGVuZ3RoLFxuICAgIHQ7XG5cbiAgd2hpbGUgKGkgPiBqKSB7XG4gICAgdCA9IHRhZ3NbLS1pXTtcbiAgICB0YWdzLnNwbGljZShpLCAxKTtcbiAgICB0LnVubW91bnQoKTtcbiAgICBhcnJheWlzaFJlbW92ZSh0LnBhcmVudCwgdGFnTmFtZSwgdCwgdHJ1ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBNb3ZlIHRoZSBuZXN0ZWQgY3VzdG9tIHRhZ3MgaW4gbm9uIGN1c3RvbSBsb29wIHRhZ3NcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBOdW1iZXIgfSBpIC0gY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgbG9vcCB0YWdcbiAqL1xuZnVuY3Rpb24gbW92ZU5lc3RlZFRhZ3MoaSkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBlYWNoKE9iamVjdC5rZXlzKHRoaXMudGFncyksIGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgdmFyIHRhZyA9IHRoaXMkMS50YWdzW3RhZ05hbWVdO1xuICAgIGlmIChpc0FycmF5KHRhZykpXG4gICAgICB7IGVhY2godGFnLCBmdW5jdGlvbiAodCkge1xuICAgICAgICBtb3ZlQ2hpbGRUYWcuYXBwbHkodCwgW3RhZ05hbWUsIGldKTtcbiAgICAgIH0pOyB9XG4gICAgZWxzZVxuICAgICAgeyBtb3ZlQ2hpbGRUYWcuYXBwbHkodGFnLCBbdGFnTmFtZSwgaV0pOyB9XG4gIH0pO1xufVxuXG4vKipcbiAqIE1vdmUgYSBjaGlsZCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSBkb20gbm9kZSBjb250YWluaW5nIGFsbCB0aGUgbG9vcCBjaGlsZHJlblxuICogQHBhcmFtICAgeyBUYWcgfSBuZXh0VGFnIC0gaW5zdGFuY2Ugb2YgdGhlIG5leHQgdGFnIHByZWNlZGluZyB0aGUgb25lIHdlIHdhbnQgdG8gbW92ZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gbW92ZShyb290LCBuZXh0VGFnLCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1vdmVWaXJ0dWFsLmFwcGx5KHRoaXMsIFtyb290LCBuZXh0VGFnXSk7IH1cbiAgZWxzZVxuICAgIHsgc2FmZUluc2VydChyb290LCB0aGlzLnJvb3QsIG5leHRUYWcucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBJbnNlcnQgYW5kIG1vdW50IGEgY2hpbGQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgVGFnIH0gbmV4dFRhZyAtIGluc3RhbmNlIG9mIHRoZSBuZXh0IHRhZyBwcmVjZWRpbmcgdGhlIG9uZSB3ZSB3YW50IHRvIGluc2VydFxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gaXNWaXJ0dWFsIC0gaXMgaXQgYSB2aXJ0dWFsIHRhZz9cbiAqL1xuZnVuY3Rpb24gaW5zZXJ0KHJvb3QsIG5leHRUYWcsIGlzVmlydHVhbCkge1xuICBpZiAoaXNWaXJ0dWFsKVxuICAgIHsgbWFrZVZpcnR1YWwuYXBwbHkodGhpcywgW3Jvb3QsIG5leHRUYWddKTsgfVxuICBlbHNlXG4gICAgeyBzYWZlSW5zZXJ0KHJvb3QsIHRoaXMucm9vdCwgbmV4dFRhZy5yb290KTsgfVxufVxuXG4vKipcbiAqIEFwcGVuZCBhIG5ldyB0YWcgaW50byB0aGUgRE9NXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzVmlydHVhbCAtIGlzIGl0IGEgdmlydHVhbCB0YWc/XG4gKi9cbmZ1bmN0aW9uIGFwcGVuZChyb290LCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1ha2VWaXJ0dWFsLmNhbGwodGhpcywgcm9vdCk7IH1cbiAgZWxzZVxuICAgIHsgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLnJvb3QpOyB9XG59XG5cbi8qKlxuICogTWFuYWdlIHRhZ3MgaGF2aW5nIHRoZSAnZWFjaCdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgVGFnIH0gcGFyZW50IC0gcGFyZW50IHRhZyBpbnN0YW5jZSB3aGVyZSB0aGUgZG9tIG5vZGUgaXMgY29udGFpbmVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGV4cHIgLSBzdHJpbmcgY29udGFpbmVkIGluIHRoZSAnZWFjaCcgYXR0cmlidXRlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGV4cHJlc3Npb24gb2JqZWN0IGZvciB0aGlzIGVhY2ggbG9vcFxuICovXG5mdW5jdGlvbiBfZWFjaChkb20sIHBhcmVudCwgZXhwcikge1xuXG4gIC8vIHJlbW92ZSB0aGUgZWFjaCBwcm9wZXJ0eSBmcm9tIHRoZSBvcmlnaW5hbCB0YWdcbiAgcmVtQXR0cihkb20sIExPT1BfRElSRUNUSVZFKTtcblxuICB2YXIgbXVzdFJlb3JkZXIgPSB0eXBlb2YgZ2V0QXR0cihkb20sIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUpICE9PSBUX1NUUklORyB8fCByZW1BdHRyKGRvbSwgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSksXG4gICAgdGFnTmFtZSA9IGdldFRhZ05hbWUoZG9tKSxcbiAgICBpbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXSB8fCB7IHRtcGw6IGdldE91dGVySFRNTChkb20pIH0sXG4gICAgdXNlUm9vdCA9IFJFX1NQRUNJQUxfVEFHUy50ZXN0KHRhZ05hbWUpLFxuICAgIHBhcmVudE5vZGUgPSBkb20ucGFyZW50Tm9kZSxcbiAgICByZWYgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIGNoaWxkID0gZ2V0VGFnKGRvbSksXG4gICAgaWZFeHByID0gZ2V0QXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSksXG4gICAgdGFncyA9IFtdLFxuICAgIG9sZEl0ZW1zID0gW10sXG4gICAgaGFzS2V5cyxcbiAgICBpc0xvb3AgPSB0cnVlLFxuICAgIGlzQW5vbnltb3VzID0gIV9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgaXNWaXJ0dWFsID0gZG9tLnRhZ05hbWUgPT09ICdWSVJUVUFMJztcblxuICAvLyBwYXJzZSB0aGUgZWFjaCBleHByZXNzaW9uXG4gIGV4cHIgPSB0bXBsLmxvb3BLZXlzKGV4cHIpO1xuICBleHByLmlzTG9vcCA9IHRydWU7XG5cbiAgaWYgKGlmRXhwcikgeyByZW1BdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKTsgfVxuXG4gIC8vIGluc2VydCBhIG1hcmtlZCB3aGVyZSB0aGUgbG9vcCB0YWdzIHdpbGwgYmUgaW5qZWN0ZWRcbiAgcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUocmVmLCBkb20pO1xuICBwYXJlbnROb2RlLnJlbW92ZUNoaWxkKGRvbSk7XG5cbiAgZXhwci51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGVFYWNoKCkge1xuXG4gICAgLy8gZ2V0IHRoZSBuZXcgaXRlbXMgY29sbGVjdGlvblxuICAgIHZhciBpdGVtcyA9IHRtcGwoZXhwci52YWwsIHBhcmVudCksXG4gICAgICBmcmFnID0gY3JlYXRlRnJhZygpLFxuICAgICAgaXNPYmplY3QkJDEgPSAhaXNBcnJheShpdGVtcyksXG4gICAgICByb290ID0gcmVmLnBhcmVudE5vZGU7XG5cbiAgICAvLyBvYmplY3QgbG9vcC4gYW55IGNoYW5nZXMgY2F1c2UgZnVsbCByZWRyYXdcbiAgICBpZiAoaXNPYmplY3QkJDEpIHtcbiAgICAgIGhhc0tleXMgPSBpdGVtcyB8fCBmYWxzZTtcbiAgICAgIGl0ZW1zID0gaGFzS2V5cyA/XG4gICAgICAgIE9iamVjdC5rZXlzKGl0ZW1zKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgIHJldHVybiBta2l0ZW0oZXhwciwgaXRlbXNba2V5XSwga2V5KVxuICAgICAgICB9KSA6IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICBoYXNLZXlzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKGlmRXhwcikge1xuICAgICAgaXRlbXMgPSBpdGVtcy5maWx0ZXIoZnVuY3Rpb24oaXRlbSwgaSkge1xuICAgICAgICBpZiAoZXhwci5rZXkgJiYgIWlzT2JqZWN0JCQxKVxuICAgICAgICAgIHsgcmV0dXJuICEhdG1wbChpZkV4cHIsIG1raXRlbShleHByLCBpdGVtLCBpLCBwYXJlbnQpKSB9XG5cbiAgICAgICAgcmV0dXJuICEhdG1wbChpZkV4cHIsIGV4dGVuZChPYmplY3QuY3JlYXRlKHBhcmVudCksIGl0ZW0pKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gbG9vcCBhbGwgdGhlIG5ldyBpdGVtc1xuICAgIGVhY2goaXRlbXMsIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIC8vIHJlb3JkZXIgb25seSBpZiB0aGUgaXRlbXMgYXJlIG9iamVjdHNcbiAgICAgIHZhclxuICAgICAgICBkb1Jlb3JkZXIgPSBtdXN0UmVvcmRlciAmJiB0eXBlb2YgaXRlbSA9PT0gVF9PQkpFQ1QgJiYgIWhhc0tleXMsXG4gICAgICAgIG9sZFBvcyA9IG9sZEl0ZW1zLmluZGV4T2YoaXRlbSksXG4gICAgICAgIGlzTmV3ID0gIX5vbGRQb3MsXG4gICAgICAgIG11c3RBcHBlbmQgPSBpIDw9IHRhZ3MubGVuZ3RoLFxuICAgICAgICBwb3MgPSAhaXNOZXcgJiYgZG9SZW9yZGVyID8gb2xkUG9zIDogaSxcbiAgICAgICAgLy8gZG9lcyBhIHRhZyBleGlzdCBpbiB0aGlzIHBvc2l0aW9uP1xuICAgICAgICB0YWcgPSB0YWdzW3Bvc107XG5cbiAgICAgIGl0ZW0gPSAhaGFzS2V5cyAmJiBleHByLmtleSA/IG1raXRlbShleHByLCBpdGVtLCBpKSA6IGl0ZW07XG5cbiAgICAgIC8vIG5ldyB0YWdcbiAgICAgIGlmIChcbiAgICAgICAgZG9SZW9yZGVyICYmIGlzTmV3IC8vIGJ5IGRlZmF1bHQgd2UgYWx3YXlzIHRyeSB0byByZW9yZGVyIHRoZSBET00gZWxlbWVudHNcbiAgICAgICAgfHxcbiAgICAgICAgIWRvUmVvcmRlciAmJiAhdGFnIC8vIHdpdGggbm8tcmVvcmRlciB3ZSBqdXN0IHVwZGF0ZSB0aGUgb2xkIHRhZ3NcbiAgICAgICkge1xuICAgICAgICB0YWcgPSBuZXcgVGFnJDEoaW1wbCwge1xuICAgICAgICAgIHBhcmVudDogcGFyZW50LFxuICAgICAgICAgIGlzTG9vcDogaXNMb29wLFxuICAgICAgICAgIGlzQW5vbnltb3VzOiBpc0Fub255bW91cyxcbiAgICAgICAgICByb290OiB1c2VSb290ID8gcm9vdCA6IGRvbS5jbG9uZU5vZGUoKSxcbiAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH0sIGRvbS5pbm5lckhUTUwpO1xuXG4gICAgICAgIC8vIG1vdW50IHRoZSB0YWdcbiAgICAgICAgdGFnLm1vdW50KCk7XG5cbiAgICAgICAgaWYgKG11c3RBcHBlbmQpXG4gICAgICAgICAgeyBhcHBlbmQuYXBwbHkodGFnLCBbZnJhZyB8fCByb290LCBpc1ZpcnR1YWxdKTsgfVxuICAgICAgICBlbHNlXG4gICAgICAgICAgeyBpbnNlcnQuYXBwbHkodGFnLCBbcm9vdCwgdGFnc1tpXSwgaXNWaXJ0dWFsXSk7IH1cblxuICAgICAgICBpZiAoIW11c3RBcHBlbmQpIHsgb2xkSXRlbXMuc3BsaWNlKGksIDAsIGl0ZW0pOyB9XG4gICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZyk7XG4gICAgICAgIGlmIChjaGlsZCkgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGFnLCB0cnVlKTsgfVxuICAgICAgICBwb3MgPSBpOyAvLyBoYW5kbGVkIGhlcmUgc28gbm8gbW92ZVxuICAgICAgfSBlbHNlIHsgdGFnLnVwZGF0ZShpdGVtKTsgfVxuXG4gICAgICAvLyByZW9yZGVyIHRoZSB0YWcgaWYgaXQncyBub3QgbG9jYXRlZCBpbiBpdHMgcHJldmlvdXMgcG9zaXRpb25cbiAgICAgIGlmIChwb3MgIT09IGkgJiYgZG9SZW9yZGVyKSB7XG4gICAgICAgIC8vICNjbG9zZXMgMjA0MFxuICAgICAgICBpZiAoY29udGFpbnMoaXRlbXMsIG9sZEl0ZW1zW2ldKSkge1xuICAgICAgICAgIG1vdmUuYXBwbHkodGFnLCBbcm9vdCwgdGFnc1tpXSwgaXNWaXJ0dWFsXSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBwb3NpdGlvbiBhdHRyaWJ1dGUgaWYgaXQgZXhpc3RzXG4gICAgICAgIGlmIChleHByLnBvcykgeyB0YWdbZXhwci5wb3NdID0gaTsgfVxuICAgICAgICAvLyBtb3ZlIHRoZSBvbGQgdGFnIGluc3RhbmNlXG4gICAgICAgIHRhZ3Muc3BsaWNlKGksIDAsIHRhZ3Muc3BsaWNlKHBvcywgMSlbMF0pO1xuICAgICAgICAvLyBtb3ZlIHRoZSBvbGQgaXRlbVxuICAgICAgICBvbGRJdGVtcy5zcGxpY2UoaSwgMCwgb2xkSXRlbXMuc3BsaWNlKHBvcywgMSlbMF0pO1xuICAgICAgICAvLyBpZiB0aGUgbG9vcCB0YWdzIGFyZSBub3QgY3VzdG9tXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gbW92ZSBhbGwgdGhlaXIgY3VzdG9tIHRhZ3MgaW50byB0aGUgcmlnaHQgcG9zaXRpb25cbiAgICAgICAgaWYgKCFjaGlsZCAmJiB0YWcudGFncykgeyBtb3ZlTmVzdGVkVGFncy5jYWxsKHRhZywgaSk7IH1cbiAgICAgIH1cblxuICAgICAgLy8gY2FjaGUgdGhlIG9yaWdpbmFsIGl0ZW0gdG8gdXNlIGl0IGluIHRoZSBldmVudHMgYm91bmQgdG8gdGhpcyBub2RlXG4gICAgICAvLyBhbmQgaXRzIGNoaWxkcmVuXG4gICAgICB0YWcuX2l0ZW0gPSBpdGVtO1xuICAgICAgLy8gY2FjaGUgdGhlIHJlYWwgcGFyZW50IHRhZyBpbnRlcm5hbGx5XG4gICAgICBkZWZpbmVQcm9wZXJ0eSh0YWcsICdfcGFyZW50JywgcGFyZW50KTtcbiAgICB9KTtcblxuICAgIC8vIHJlbW92ZSB0aGUgcmVkdW5kYW50IHRhZ3NcbiAgICB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzLCB0YWdOYW1lKTtcblxuICAgIC8vIGNsb25lIHRoZSBpdGVtcyBhcnJheVxuICAgIG9sZEl0ZW1zID0gaXRlbXMuc2xpY2UoKTtcblxuICAgIHJvb3QuaW5zZXJ0QmVmb3JlKGZyYWcsIHJlZik7XG4gIH07XG5cbiAgZXhwci51bm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgZWFjaCh0YWdzLCBmdW5jdGlvbih0KSB7IHQudW5tb3VudCgpOyB9KTtcbiAgfTtcblxuICByZXR1cm4gZXhwclxufVxuXG4vKipcbiAqIFdhbGsgdGhlIHRhZyBET00gdG8gZGV0ZWN0IHRoZSBleHByZXNzaW9ucyB0byBldmFsdWF0ZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIHJvb3QgdGFnIHdoZXJlIHdlIHdpbGwgc3RhcnQgZGlnZ2luZyB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIGVtcHR5IGFycmF5IHdoZXJlIHRoZSBleHByZXNzaW9ucyB3aWxsIGJlIGFkZGVkXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBtdXN0SW5jbHVkZVJvb3QgLSBmbGFnIHRvIGRlY2lkZSB3aGV0aGVyIHRoZSByb290IG11c3QgYmUgcGFyc2VkIGFzIHdlbGxcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHJvb3Qgbm9vZGUgYW5kIHRoZSBkb20gdHJlZVxuICovXG5mdW5jdGlvbiBwYXJzZUV4cHJlc3Npb25zKHJvb3QsIGV4cHJlc3Npb25zLCBtdXN0SW5jbHVkZVJvb3QpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIHRyZWUgPSB7cGFyZW50OiB7Y2hpbGRyZW46IGV4cHJlc3Npb25zfX07XG5cbiAgd2Fsa05vZGVzKHJvb3QsIGZ1bmN0aW9uIChkb20sIGN0eCkge1xuICAgIHZhciB0eXBlID0gZG9tLm5vZGVUeXBlLCBwYXJlbnQgPSBjdHgucGFyZW50LCBhdHRyLCBleHByLCB0YWdJbXBsO1xuICAgIGlmICghbXVzdEluY2x1ZGVSb290ICYmIGRvbSA9PT0gcm9vdCkgeyByZXR1cm4ge3BhcmVudDogcGFyZW50fSB9XG5cbiAgICAvLyB0ZXh0IG5vZGVcbiAgICBpZiAodHlwZSA9PT0gMyAmJiBkb20ucGFyZW50Tm9kZS50YWdOYW1lICE9PSAnU1RZTEUnICYmIHRtcGwuaGFzRXhwcihkb20ubm9kZVZhbHVlKSlcbiAgICAgIHsgcGFyZW50LmNoaWxkcmVuLnB1c2goe2RvbTogZG9tLCBleHByOiBkb20ubm9kZVZhbHVlfSk7IH1cblxuICAgIGlmICh0eXBlICE9PSAxKSB7IHJldHVybiBjdHggfSAvLyBub3QgYW4gZWxlbWVudFxuXG4gICAgLy8gbG9vcC4gZWFjaCBkb2VzIGl0J3Mgb3duIHRoaW5nIChmb3Igbm93KVxuICAgIGlmIChhdHRyID0gZ2V0QXR0cihkb20sIExPT1BfRElSRUNUSVZFKSkge1xuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goX2VhY2goZG9tLCB0aGlzJDEsIGF0dHIpKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGlmLWF0dHJzIGJlY29tZSB0aGUgbmV3IHBhcmVudC4gQW55IGZvbGxvd2luZyBleHByZXNzaW9ucyAoZWl0aGVyIG9uIHRoZSBjdXJyZW50XG4gICAgLy8gZWxlbWVudCwgb3IgYmVsb3cgaXQpIGJlY29tZSBjaGlsZHJlbiBvZiB0aGlzIGV4cHJlc3Npb24uXG4gICAgaWYgKGF0dHIgPSBnZXRBdHRyKGRvbSwgQ09ORElUSU9OQUxfRElSRUNUSVZFKSkge1xuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goT2JqZWN0LmNyZWF0ZShJZkV4cHIpLmluaXQoZG9tLCB0aGlzJDEsIGF0dHIpKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGlmIChleHByID0gZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkpIHtcbiAgICAgIGlmICh0bXBsLmhhc0V4cHIoZXhwcikpIHtcbiAgICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goe2lzUnRhZzogdHJ1ZSwgZXhwcjogZXhwciwgZG9tOiBkb20sIGF0dHJzOiBbXS5zbGljZS5jYWxsKGRvbS5hdHRyaWJ1dGVzKX0pO1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBpZiB0aGlzIGlzIGEgdGFnLCBzdG9wIHRyYXZlcnNpbmcgaGVyZS5cbiAgICAvLyB3ZSBpZ25vcmUgdGhlIHJvb3QsIHNpbmNlIHBhcnNlRXhwcmVzc2lvbnMgaXMgY2FsbGVkIHdoaWxlIHdlJ3JlIG1vdW50aW5nIHRoYXQgcm9vdFxuICAgIHRhZ0ltcGwgPSBnZXRUYWcoZG9tKTtcbiAgICBpZiAodGFnSW1wbCAmJiAoZG9tICE9PSByb290IHx8IG11c3RJbmNsdWRlUm9vdCkpIHtcbiAgICAgIHZhciBjb25mID0ge3Jvb3Q6IGRvbSwgcGFyZW50OiB0aGlzJDEsIGhhc0ltcGw6IHRydWV9O1xuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goaW5pdENoaWxkVGFnKHRhZ0ltcGwsIGNvbmYsIGRvbS5pbm5lckhUTUwsIHRoaXMkMSkpO1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuXG4gICAgLy8gYXR0cmlidXRlIGV4cHJlc3Npb25zXG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHRoaXMkMSwgW2RvbSwgZG9tLmF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmICghZXhwcikgeyByZXR1cm4gfVxuICAgICAgcGFyZW50LmNoaWxkcmVuLnB1c2goZXhwcik7XG4gICAgfV0pO1xuXG4gICAgLy8gd2hhdGV2ZXIgdGhlIHBhcmVudCBpcywgYWxsIGNoaWxkIGVsZW1lbnRzIGdldCB0aGUgc2FtZSBwYXJlbnQuXG4gICAgLy8gSWYgdGhpcyBlbGVtZW50IGhhZCBhbiBpZi1hdHRyLCB0aGF0J3MgdGhlIHBhcmVudCBmb3IgYWxsIGNoaWxkIGVsZW1lbnRzXG4gICAgcmV0dXJuIHtwYXJlbnQ6IHBhcmVudH1cbiAgfSwgdHJlZSk7XG5cbiAgcmV0dXJuIHsgdHJlZTogdHJlZSwgcm9vdDogcm9vdCB9XG59XG5cbi8qKlxuICogQ2FsbHMgYGZuYCBmb3IgZXZlcnkgYXR0cmlidXRlIG9uIGFuIGVsZW1lbnQuIElmIHRoYXQgYXR0ciBoYXMgYW4gZXhwcmVzc2lvbixcbiAqIGl0IGlzIGFsc28gcGFzc2VkIHRvIGZuLlxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gZG9tIC0gZG9tIG5vZGUgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBhdHRycyAtIGFycmF5IG9mIGF0dHJpYnV0ZXNcbiAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIHRvIGV4ZWMgb24gYW55IGl0ZXJhdGlvblxuICovXG5mdW5jdGlvbiBwYXJzZUF0dHJpYnV0ZXMoZG9tLCBhdHRycywgZm4pIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChhdHRycywgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICB2YXIgbmFtZSA9IGF0dHIubmFtZSwgYm9vbCA9IGlzQm9vbEF0dHIobmFtZSksIGV4cHI7XG5cbiAgICBpZiAoY29udGFpbnMoUkVGX0RJUkVDVElWRVMsIG5hbWUpKSB7XG4gICAgICBleHByID0gIE9iamVjdC5jcmVhdGUoUmVmRXhwcikuaW5pdChkb20sIHRoaXMkMSwgbmFtZSwgYXR0ci52YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh0bXBsLmhhc0V4cHIoYXR0ci52YWx1ZSkpIHtcbiAgICAgIGV4cHIgPSB7ZG9tOiBkb20sIGV4cHI6IGF0dHIudmFsdWUsIGF0dHI6IGF0dHIubmFtZSwgYm9vbDogYm9vbH07XG4gICAgfVxuXG4gICAgZm4oYXR0ciwgZXhwcik7XG4gIH0pO1xufVxuXG4vKlxuICBJbmNsdWRlcyBoYWNrcyBuZWVkZWQgZm9yIHRoZSBJbnRlcm5ldCBFeHBsb3JlciB2ZXJzaW9uIDkgYW5kIGJlbG93XG4gIFNlZTogaHR0cDovL2thbmdheC5naXRodWIuaW8vY29tcGF0LXRhYmxlL2VzNS8jaWU4XG4gICAgICAgaHR0cDovL2NvZGVwbGFuZXQuaW8vZHJvcHBpbmctaWU4L1xuKi9cblxudmFyIHJlSGFzWWllbGQgID0gLzx5aWVsZFxcYi9pO1xudmFyIHJlWWllbGRBbGwgID0gLzx5aWVsZFxccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPnw+KS9pZztcbnZhciByZVlpZWxkU3JjICA9IC88eWllbGRcXHMrdG89WydcIl0oW14nXCI+XSopWydcIl1cXHMqPihbXFxTXFxzXSo/KTxcXC95aWVsZFxccyo+L2lnO1xudmFyIHJlWWllbGREZXN0ID0gLzx5aWVsZFxccytmcm9tPVsnXCJdPyhbLVxcd10rKVsnXCJdP1xccyooPzpcXC8+fD4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPikvaWc7XG52YXIgcm9vdEVscyA9IHsgdHI6ICd0Ym9keScsIHRoOiAndHInLCB0ZDogJ3RyJywgY29sOiAnY29sZ3JvdXAnIH07XG52YXIgdGJsVGFncyA9IElFX1ZFUlNJT04gJiYgSUVfVkVSU0lPTiA8IDEwID8gUkVfU1BFQ0lBTF9UQUdTIDogUkVfU1BFQ0lBTF9UQUdTX05PX09QVElPTjtcbnZhciBHRU5FUklDID0gJ2Rpdic7XG5cblxuLypcbiAgQ3JlYXRlcyB0aGUgcm9vdCBlbGVtZW50IGZvciB0YWJsZSBvciBzZWxlY3QgY2hpbGQgZWxlbWVudHM6XG4gIHRyL3RoL3RkL3RoZWFkL3Rmb290L3Rib2R5L2NhcHRpb24vY29sL2NvbGdyb3VwL29wdGlvbi9vcHRncm91cFxuKi9cbmZ1bmN0aW9uIHNwZWNpYWxUYWdzKGVsLCB0bXBsLCB0YWdOYW1lKSB7XG5cbiAgdmFyXG4gICAgc2VsZWN0ID0gdGFnTmFtZVswXSA9PT0gJ28nLFxuICAgIHBhcmVudCA9IHNlbGVjdCA/ICdzZWxlY3Q+JyA6ICd0YWJsZT4nO1xuXG4gIC8vIHRyaW0oKSBpcyBpbXBvcnRhbnQgaGVyZSwgdGhpcyBlbnN1cmVzIHdlIGRvbid0IGhhdmUgYXJ0aWZhY3RzLFxuICAvLyBzbyB3ZSBjYW4gY2hlY2sgaWYgd2UgaGF2ZSBvbmx5IG9uZSBlbGVtZW50IGluc2lkZSB0aGUgcGFyZW50XG4gIGVsLmlubmVySFRNTCA9ICc8JyArIHBhcmVudCArIHRtcGwudHJpbSgpICsgJzwvJyArIHBhcmVudDtcbiAgcGFyZW50ID0gZWwuZmlyc3RDaGlsZDtcblxuICAvLyByZXR1cm5zIHRoZSBpbW1lZGlhdGUgcGFyZW50IGlmIHRyL3RoL3RkL2NvbCBpcyB0aGUgb25seSBlbGVtZW50LCBpZiBub3RcbiAgLy8gcmV0dXJucyB0aGUgd2hvbGUgdHJlZSwgYXMgdGhpcyBjYW4gaW5jbHVkZSBhZGRpdGlvbmFsIGVsZW1lbnRzXG4gIGlmIChzZWxlY3QpIHtcbiAgICBwYXJlbnQuc2VsZWN0ZWRJbmRleCA9IC0xOyAgLy8gZm9yIElFOSwgY29tcGF0aWJsZSB3L2N1cnJlbnQgcmlvdCBiZWhhdmlvclxuICB9IGVsc2Uge1xuICAgIC8vIGF2b2lkcyBpbnNlcnRpb24gb2YgY29pbnRhaW5lciBpbnNpZGUgY29udGFpbmVyIChleDogdGJvZHkgaW5zaWRlIHRib2R5KVxuICAgIHZhciB0bmFtZSA9IHJvb3RFbHNbdGFnTmFtZV07XG4gICAgaWYgKHRuYW1lICYmIHBhcmVudC5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMSkgeyBwYXJlbnQgPSAkKHRuYW1lLCBwYXJlbnQpOyB9XG4gIH1cbiAgcmV0dXJuIHBhcmVudFxufVxuXG4vKlxuICBSZXBsYWNlIHRoZSB5aWVsZCB0YWcgZnJvbSBhbnkgdGFnIHRlbXBsYXRlIHdpdGggdGhlIGlubmVySFRNTCBvZiB0aGVcbiAgb3JpZ2luYWwgdGFnIGluIHRoZSBwYWdlXG4qL1xuZnVuY3Rpb24gcmVwbGFjZVlpZWxkKHRtcGwsIGh0bWwpIHtcbiAgLy8gZG8gbm90aGluZyBpZiBubyB5aWVsZFxuICBpZiAoIXJlSGFzWWllbGQudGVzdCh0bXBsKSkgeyByZXR1cm4gdG1wbCB9XG5cbiAgLy8gYmUgY2FyZWZ1bCB3aXRoICMxMzQzIC0gc3RyaW5nIG9uIHRoZSBzb3VyY2UgaGF2aW5nIGAkMWBcbiAgdmFyIHNyYyA9IHt9O1xuXG4gIGh0bWwgPSBodG1sICYmIGh0bWwucmVwbGFjZShyZVlpZWxkU3JjLCBmdW5jdGlvbiAoXywgcmVmLCB0ZXh0KSB7XG4gICAgc3JjW3JlZl0gPSBzcmNbcmVmXSB8fCB0ZXh0OyAgIC8vIHByZXNlcnZlIGZpcnN0IGRlZmluaXRpb25cbiAgICByZXR1cm4gJydcbiAgfSkudHJpbSgpO1xuXG4gIHJldHVybiB0bXBsXG4gICAgLnJlcGxhY2UocmVZaWVsZERlc3QsIGZ1bmN0aW9uIChfLCByZWYsIGRlZikgeyAgLy8geWllbGQgd2l0aCBmcm9tIC0gdG8gYXR0cnNcbiAgICAgIHJldHVybiBzcmNbcmVmXSB8fCBkZWYgfHwgJydcbiAgICB9KVxuICAgIC5yZXBsYWNlKHJlWWllbGRBbGwsIGZ1bmN0aW9uIChfLCBkZWYpIHsgICAgICAgIC8vIHlpZWxkIHdpdGhvdXQgYW55IFwiZnJvbVwiXG4gICAgICByZXR1cm4gaHRtbCB8fCBkZWYgfHwgJydcbiAgICB9KVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBET00gZWxlbWVudCB0byB3cmFwIHRoZSBnaXZlbiBjb250ZW50LiBOb3JtYWxseSBhbiBgRElWYCwgYnV0IGNhbiBiZVxuICogYWxzbyBhIGBUQUJMRWAsIGBTRUxFQ1RgLCBgVEJPRFlgLCBgVFJgLCBvciBgQ09MR1JPVVBgIGVsZW1lbnQuXG4gKlxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0bXBsICAtIFRoZSB0ZW1wbGF0ZSBjb21pbmcgZnJvbSB0aGUgY3VzdG9tIHRhZyBkZWZpbml0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGh0bWwgLSBIVE1MIGNvbnRlbnQgdGhhdCBjb21lcyBmcm9tIHRoZSBET00gZWxlbWVudCB3aGVyZSB5b3VcbiAqICAgICAgICAgICB3aWxsIG1vdW50IHRoZSB0YWcsIG1vc3RseSB0aGUgb3JpZ2luYWwgdGFnIGluIHRoZSBwYWdlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBjaGVja1N2ZyAtIGZsYWcgbmVlZGVkIHRvIGtub3cgaWYgd2UgbmVlZCB0byBmb3JjZSB0aGUgc3ZnIHJlbmRlcmluZyBpbiBjYXNlIG9mIGxvb3Agbm9kZXNcbiAqIEByZXR1cm5zIHsgSFRNTEVsZW1lbnQgfSBET00gZWxlbWVudCB3aXRoIF90bXBsXyBtZXJnZWQgdGhyb3VnaCBgWUlFTERgIHdpdGggdGhlIF9odG1sXy5cbiAqL1xuZnVuY3Rpb24gbWtkb20odG1wbCwgaHRtbCwgY2hlY2tTdmcpIHtcbiAgdmFyIG1hdGNoICAgPSB0bXBsICYmIHRtcGwubWF0Y2goL15cXHMqPChbLVxcd10rKS8pLFxuICAgIHRhZ05hbWUgPSBtYXRjaCAmJiBtYXRjaFsxXS50b0xvd2VyQ2FzZSgpLFxuICAgIGVsID0gbWtFbChHRU5FUklDLCBjaGVja1N2ZyAmJiBpc1NWR1RhZyh0YWdOYW1lKSk7XG5cbiAgLy8gcmVwbGFjZSBhbGwgdGhlIHlpZWxkIHRhZ3Mgd2l0aCB0aGUgdGFnIGlubmVyIGh0bWxcbiAgdG1wbCA9IHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKTtcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGJsVGFncy50ZXN0KHRhZ05hbWUpKVxuICAgIHsgZWwgPSBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSk7IH1cbiAgZWxzZVxuICAgIHsgc2V0SW5uZXJIVE1MKGVsLCB0bXBsKTsgfVxuXG4gIGVsLnN0dWIgPSB0cnVlO1xuXG4gIHJldHVybiBlbFxufVxuXG4vKipcbiAqIEFub3RoZXIgd2F5IHRvIGNyZWF0ZSBhIHJpb3QgdGFnIGEgYml0IG1vcmUgZXM2IGZyaWVuZGx5XG4gKiBAcGFyYW0geyBIVE1MRWxlbWVudCB9IGVsIC0gdGFnIERPTSBzZWxlY3RvciBvciBET00gbm9kZS9zXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvcHRzIC0gdGFnIGxvZ2ljXG4gKiBAcmV0dXJucyB7IFRhZyB9IG5ldyByaW90IHRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBUYWckMihlbCwgb3B0cykge1xuICAvLyBnZXQgdGhlIHRhZyBwcm9wZXJ0aWVzIGZyb20gdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gIHZhciByZWYgPSB0aGlzO1xuICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xuICB2YXIgdG1wbCA9IHJlZi50bXBsO1xuICB2YXIgY3NzID0gcmVmLmNzcztcbiAgdmFyIGF0dHJzID0gcmVmLmF0dHJzO1xuICB2YXIgb25DcmVhdGUgPSByZWYub25DcmVhdGU7XG4gIC8vIHJlZ2lzdGVyIGEgbmV3IHRhZyBhbmQgY2FjaGUgdGhlIGNsYXNzIHByb3RvdHlwZVxuICBpZiAoIV9fVEFHX0lNUExbbmFtZV0pIHtcbiAgICB0YWckMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBvbkNyZWF0ZSk7XG4gICAgLy8gY2FjaGUgdGhlIGNsYXNzIGNvbnN0cnVjdG9yXG4gICAgX19UQUdfSU1QTFtuYW1lXS5jbGFzcyA9IHRoaXMuY29uc3RydWN0b3I7XG4gIH1cblxuICAvLyBtb3VudCB0aGUgdGFnIHVzaW5nIHRoZSBjbGFzcyBpbnN0YW5jZVxuICBtb3VudFRvKGVsLCBuYW1lLCBvcHRzLCB0aGlzKTtcbiAgLy8gaW5qZWN0IHRoZSBjb21wb25lbnQgY3NzXG4gIGlmIChjc3MpIHsgc3R5bGVNYW5hZ2VyLmluamVjdCgpOyB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgcmlvdCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgZm4pIHtcbiAgaWYgKGlzRnVuY3Rpb24oYXR0cnMpKSB7XG4gICAgZm4gPSBhdHRycztcblxuICAgIGlmICgvXltcXHdcXC1dK1xccz89Ly50ZXN0KGNzcykpIHtcbiAgICAgIGF0dHJzID0gY3NzO1xuICAgICAgY3NzID0gJyc7XG4gICAgfSBlbHNlXG4gICAgICB7IGF0dHJzID0gJyc7IH1cbiAgfVxuXG4gIGlmIChjc3MpIHtcbiAgICBpZiAoaXNGdW5jdGlvbihjc3MpKVxuICAgICAgeyBmbiA9IGNzczsgfVxuICAgIGVsc2VcbiAgICAgIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MpOyB9XG4gIH1cblxuICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICBfX1RBR19JTVBMW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiB0bXBsLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9O1xuXG4gIHJldHVybiBuYW1lXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uIChmb3IgdXNlIGJ5IHRoZSBjb21waWxlcilcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBuYW1lIC0gbmFtZS9pZCBvZiB0aGUgbmV3IHJpb3QgdGFnXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgdG1wbCAtIHRhZyB0ZW1wbGF0ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGNzcyAtIGN1c3RvbSB0YWcgY3NzXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgYXR0cnMgLSByb290IHRhZyBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSB1c2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUvaWQgb2YgdGhlIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gdGFnMiQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChjc3MpXG4gICAgeyBzdHlsZU1hbmFnZXIuYWRkKGNzcywgbmFtZSk7IH1cblxuICB2YXIgZXhpc3RzID0gISFfX1RBR19JTVBMW25hbWVdO1xuICBfX1RBR19JTVBMW25hbWVdID0geyBuYW1lOiBuYW1lLCB0bXBsOiB0bXBsLCBhdHRyczogYXR0cnMsIGZuOiBmbiB9O1xuXG4gIGlmIChleGlzdHMgJiYgdXRpbC5ob3RSZWxvYWRlcilcbiAgICB7IHV0aWwuaG90UmVsb2FkZXIobmFtZSk7IH1cblxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIE1vdW50IGEgdGFnIHVzaW5nIGEgc3BlY2lmaWMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7ICogfSBzZWxlY3RvciAtIHRhZyBET00gc2VsZWN0b3Igb3IgRE9NIG5vZGUvc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gdGFnIGltcGxlbWVudGF0aW9uIG5hbWVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBBcnJheSB9IG5ldyB0YWdzIGluc3RhbmNlc1xuICovXG5mdW5jdGlvbiBtb3VudCQxKHNlbGVjdG9yLCB0YWdOYW1lLCBvcHRzKSB7XG4gIHZhciB0YWdzID0gW107XG5cbiAgZnVuY3Rpb24gcHVzaFRhZ3NUbyhyb290KSB7XG4gICAgaWYgKHJvb3QudGFnTmFtZSkge1xuICAgICAgdmFyIHJpb3RUYWcgPSBnZXRBdHRyKHJvb3QsIElTX0RJUkVDVElWRSk7XG5cbiAgICAgIC8vIGhhdmUgdGFnTmFtZT8gZm9yY2UgcmlvdC10YWcgdG8gYmUgdGhlIHNhbWVcbiAgICAgIGlmICh0YWdOYW1lICYmIHJpb3RUYWcgIT09IHRhZ05hbWUpIHtcbiAgICAgICAgcmlvdFRhZyA9IHRhZ05hbWU7XG4gICAgICAgIHNldEF0dHIocm9vdCwgSVNfRElSRUNUSVZFLCB0YWdOYW1lKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhZyQkMSA9IG1vdW50VG8ocm9vdCwgcmlvdFRhZyB8fCByb290LnRhZ05hbWUudG9Mb3dlckNhc2UoKSwgb3B0cyk7XG5cbiAgICAgIGlmICh0YWckJDEpXG4gICAgICAgIHsgdGFncy5wdXNoKHRhZyQkMSk7IH1cbiAgICB9IGVsc2UgaWYgKHJvb3QubGVuZ3RoKVxuICAgICAgeyBlYWNoKHJvb3QsIHB1c2hUYWdzVG8pOyB9IC8vIGFzc3VtZSBub2RlTGlzdFxuICB9XG5cbiAgLy8gaW5qZWN0IHN0eWxlcyBpbnRvIERPTVxuICBzdHlsZU1hbmFnZXIuaW5qZWN0KCk7XG5cbiAgaWYgKGlzT2JqZWN0KHRhZ05hbWUpKSB7XG4gICAgb3B0cyA9IHRhZ05hbWU7XG4gICAgdGFnTmFtZSA9IDA7XG4gIH1cblxuICB2YXIgZWxlbTtcbiAgdmFyIGFsbFRhZ3M7XG5cbiAgLy8gY3Jhd2wgdGhlIERPTSB0byBmaW5kIHRoZSB0YWdcbiAgaWYgKGlzU3RyaW5nKHNlbGVjdG9yKSkge1xuICAgIHNlbGVjdG9yID0gc2VsZWN0b3IgPT09ICcqJyA/XG4gICAgICAvLyBzZWxlY3QgYWxsIHJlZ2lzdGVyZWQgdGFnc1xuICAgICAgLy8gJiB0YWdzIGZvdW5kIHdpdGggdGhlIHJpb3QtdGFnIGF0dHJpYnV0ZSBzZXRcbiAgICAgIGFsbFRhZ3MgPSBzZWxlY3RUYWdzKCkgOlxuICAgICAgLy8gb3IganVzdCB0aGUgb25lcyBuYW1lZCBsaWtlIHRoZSBzZWxlY3RvclxuICAgICAgc2VsZWN0b3IgKyBzZWxlY3RUYWdzKHNlbGVjdG9yLnNwbGl0KC8sICovKSk7XG5cbiAgICAvLyBtYWtlIHN1cmUgdG8gcGFzcyBhbHdheXMgYSBzZWxlY3RvclxuICAgIC8vIHRvIHRoZSBxdWVyeVNlbGVjdG9yQWxsIGZ1bmN0aW9uXG4gICAgZWxlbSA9IHNlbGVjdG9yID8gJCQoc2VsZWN0b3IpIDogW107XG4gIH1cbiAgZWxzZVxuICAgIC8vIHByb2JhYmx5IHlvdSBoYXZlIHBhc3NlZCBhbHJlYWR5IGEgdGFnIG9yIGEgTm9kZUxpc3RcbiAgICB7IGVsZW0gPSBzZWxlY3RvcjsgfVxuXG4gIC8vIHNlbGVjdCBhbGwgdGhlIHJlZ2lzdGVyZWQgYW5kIG1vdW50IHRoZW0gaW5zaWRlIHRoZWlyIHJvb3QgZWxlbWVudHNcbiAgaWYgKHRhZ05hbWUgPT09ICcqJykge1xuICAgIC8vIGdldCBhbGwgY3VzdG9tIHRhZ3NcbiAgICB0YWdOYW1lID0gYWxsVGFncyB8fCBzZWxlY3RUYWdzKCk7XG4gICAgLy8gaWYgdGhlIHJvb3QgZWxzIGl0J3MganVzdCBhIHNpbmdsZSB0YWdcbiAgICBpZiAoZWxlbS50YWdOYW1lKVxuICAgICAgeyBlbGVtID0gJCQodGFnTmFtZSwgZWxlbSk7IH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIHNlbGVjdCBhbGwgdGhlIGNoaWxkcmVuIGZvciBhbGwgdGhlIGRpZmZlcmVudCByb290IGVsZW1lbnRzXG4gICAgICB2YXIgbm9kZUxpc3QgPSBbXTtcblxuICAgICAgZWFjaChlbGVtLCBmdW5jdGlvbiAoX2VsKSB7IHJldHVybiBub2RlTGlzdC5wdXNoKCQkKHRhZ05hbWUsIF9lbCkpOyB9KTtcblxuICAgICAgZWxlbSA9IG5vZGVMaXN0O1xuICAgIH1cbiAgICAvLyBnZXQgcmlkIG9mIHRoZSB0YWdOYW1lXG4gICAgdGFnTmFtZSA9IDA7XG4gIH1cblxuICBwdXNoVGFnc1RvKGVsZW0pO1xuXG4gIHJldHVybiB0YWdzXG59XG5cbi8vIENyZWF0ZSBhIG1peGluIHRoYXQgY291bGQgYmUgZ2xvYmFsbHkgc2hhcmVkIGFjcm9zcyBhbGwgdGhlIHRhZ3NcbnZhciBtaXhpbnMgPSB7fTtcbnZhciBnbG9iYWxzID0gbWl4aW5zW0dMT0JBTF9NSVhJTl0gPSB7fTtcbnZhciBfaWQgPSAwO1xuXG4vKipcbiAqIENyZWF0ZS9SZXR1cm4gYSBtaXhpbiBieSBpdHMgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgbmFtZSAtIG1peGluIG5hbWUgKGdsb2JhbCBtaXhpbiBpZiBvYmplY3QpXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBtaXggLSBtaXhpbiBsb2dpY1xuICogQHBhcmFtICAgeyBCb29sZWFuIH0gZyAtIGlzIGdsb2JhbD9cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gIHRoZSBtaXhpbiBsb2dpY1xuICovXG5mdW5jdGlvbiBtaXhpbiQxKG5hbWUsIG1peCwgZykge1xuICAvLyBVbm5hbWVkIGdsb2JhbFxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBtaXhpbiQxKChcIl9fdW5uYW1lZF9cIiArIChfaWQrKykpLCBuYW1lLCB0cnVlKTtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdG9yZSA9IGcgPyBnbG9iYWxzIDogbWl4aW5zO1xuXG4gIC8vIEdldHRlclxuICBpZiAoIW1peCkge1xuICAgIGlmIChpc1VuZGVmaW5lZChzdG9yZVtuYW1lXSkpXG4gICAgICB7IHRocm93IG5ldyBFcnJvcignVW5yZWdpc3RlcmVkIG1peGluOiAnICsgbmFtZSkgfVxuXG4gICAgcmV0dXJuIHN0b3JlW25hbWVdXG4gIH1cblxuICAvLyBTZXR0ZXJcbiAgc3RvcmVbbmFtZV0gPSBpc0Z1bmN0aW9uKG1peCkgP1xuICAgIGV4dGVuZChtaXgucHJvdG90eXBlLCBzdG9yZVtuYW1lXSB8fCB7fSkgJiYgbWl4IDpcbiAgICBleHRlbmQoc3RvcmVbbmFtZV0gfHwge30sIG1peCk7XG59XG5cbi8qKlxuICogVXBkYXRlIGFsbCB0aGUgdGFncyBpbnN0YW5jZXMgY3JlYXRlZFxuICogQHJldHVybnMgeyBBcnJheSB9IGFsbCB0aGUgdGFncyBpbnN0YW5jZXNcbiAqL1xuZnVuY3Rpb24gdXBkYXRlJDEoKSB7XG4gIHJldHVybiBlYWNoKF9fVEFHU19DQUNIRSwgZnVuY3Rpb24gKHRhZyQkMSkgeyByZXR1cm4gdGFnJCQxLnVwZGF0ZSgpOyB9KVxufVxuXG5mdW5jdGlvbiB1bnJlZ2lzdGVyJDEobmFtZSkge1xuICBkZWxldGUgX19UQUdfSU1QTFtuYW1lXTtcbn1cblxuLy8gY291bnRlciB0byBnaXZlIGEgdW5pcXVlIGlkIHRvIGFsbCB0aGUgVGFnIGluc3RhbmNlc1xudmFyIF9fdWlkID0gMDtcblxuLyoqXG4gKiBXZSBuZWVkIHRvIHVwZGF0ZSBvcHRzIGZvciB0aGlzIHRhZy4gVGhhdCByZXF1aXJlcyB1cGRhdGluZyB0aGUgZXhwcmVzc2lvbnNcbiAqIGluIGFueSBhdHRyaWJ1dGVzIG9uIHRoZSB0YWcsIGFuZCB0aGVuIGNvcHlpbmcgdGhlIHJlc3VsdCBvbnRvIG9wdHMuXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHtCb29sZWFufSBpc0xvb3AgLSBpcyBpdCBhIGxvb3AgdGFnP1xuICogQHBhcmFtICAgeyBUYWcgfSAgcGFyZW50IC0gcGFyZW50IHRhZyBub2RlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSAgaXNBbm9ueW1vdXMgLSBpcyBpdCBhIHRhZyB3aXRob3V0IGFueSBpbXBsPyAoYSB0YWcgbm90IHJlZ2lzdGVyZWQpXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBvcHRzIC0gdGFnIG9wdGlvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSAgaW5zdEF0dHJzIC0gdGFnIGF0dHJpYnV0ZXMgYXJyYXlcbiAqL1xuZnVuY3Rpb24gdXBkYXRlT3B0cyhpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG9wdHMsIGluc3RBdHRycykge1xuICAvLyBpc0Fub255bW91cyBgZWFjaGAgdGFncyB0cmVhdCBgZG9tYCBhbmQgYHJvb3RgIGRpZmZlcmVudGx5LiBJbiB0aGlzIGNhc2VcbiAgLy8gKGFuZCBvbmx5IHRoaXMgY2FzZSkgd2UgZG9uJ3QgbmVlZCB0byBkbyB1cGRhdGVPcHRzLCBiZWNhdXNlIHRoZSByZWd1bGFyIHBhcnNlXG4gIC8vIHdpbGwgdXBkYXRlIHRob3NlIGF0dHJzLiBQbHVzLCBpc0Fub255bW91cyB0YWdzIGRvbid0IG5lZWQgb3B0cyBhbnl3YXlcbiAgaWYgKGlzTG9vcCAmJiBpc0Fub255bW91cykgeyByZXR1cm4gfVxuXG4gIHZhciBjdHggPSAhaXNBbm9ueW1vdXMgJiYgaXNMb29wID8gdGhpcyA6IHBhcmVudCB8fCB0aGlzO1xuICBlYWNoKGluc3RBdHRycywgZnVuY3Rpb24gKGF0dHIpIHtcbiAgICBpZiAoYXR0ci5leHByKSB7IHVwZGF0ZUFsbEV4cHJlc3Npb25zLmNhbGwoY3R4LCBbYXR0ci5leHByXSk7IH1cbiAgICBvcHRzW3RvQ2FtZWwoYXR0ci5uYW1lKV0gPSBhdHRyLmV4cHIgPyBhdHRyLmV4cHIudmFsdWUgOiBhdHRyLnZhbHVlO1xuICB9KTtcbn1cblxuXG4vKipcbiAqIFRhZyBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0geyBPYmplY3QgfSBpbXBsIC0gaXQgY29udGFpbnMgdGhlIHRhZyB0ZW1wbGF0ZSwgYW5kIGxvZ2ljXG4gKiBAcGFyYW0geyBPYmplY3QgfSBjb25mIC0gdGFnIG9wdGlvbnNcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGlubmVySFRNTCAtIGh0bWwgdGhhdCBldmVudHVhbGx5IHdlIG5lZWQgdG8gaW5qZWN0IGluIHRoZSB0YWdcbiAqL1xuZnVuY3Rpb24gVGFnJDEoaW1wbCwgY29uZiwgaW5uZXJIVE1MKSB7XG5cbiAgdmFyIG9wdHMgPSBleHRlbmQoe30sIGNvbmYub3B0cyksXG4gICAgcGFyZW50ID0gY29uZi5wYXJlbnQsXG4gICAgaXNMb29wID0gY29uZi5pc0xvb3AsXG4gICAgaXNBbm9ueW1vdXMgPSBjb25mLmlzQW5vbnltb3VzLFxuICAgIGl0ZW0gPSBjbGVhblVwRGF0YShjb25mLml0ZW0pLFxuICAgIGluc3RBdHRycyA9IFtdLCAvLyBBbGwgYXR0cmlidXRlcyBvbiB0aGUgVGFnIHdoZW4gaXQncyBmaXJzdCBwYXJzZWRcbiAgICBpbXBsQXR0cnMgPSBbXSwgLy8gZXhwcmVzc2lvbnMgb24gdGhpcyB0eXBlIG9mIFRhZ1xuICAgIGV4cHJlc3Npb25zID0gW10sXG4gICAgcm9vdCA9IGNvbmYucm9vdCxcbiAgICB0YWdOYW1lID0gY29uZi50YWdOYW1lIHx8IGdldFRhZ05hbWUocm9vdCksXG4gICAgaXNWaXJ0dWFsID0gdGFnTmFtZSA9PT0gJ3ZpcnR1YWwnLFxuICAgIHByb3BzSW5TeW5jV2l0aFBhcmVudCA9IFtdLFxuICAgIGRvbTtcblxuICAvLyBtYWtlIHRoaXMgdGFnIG9ic2VydmFibGVcbiAgb2JzZXJ2YWJsZSQxKHRoaXMpO1xuICAvLyBvbmx5IGNhbGwgdW5tb3VudCBpZiB3ZSBoYXZlIGEgdmFsaWQgX19UQUdfSU1QTCAoaGFzIG5hbWUgcHJvcGVydHkpXG4gIGlmIChpbXBsLm5hbWUgJiYgcm9vdC5fdGFnKSB7IHJvb3QuX3RhZy51bm1vdW50KHRydWUpOyB9XG5cbiAgLy8gbm90IHlldCBtb3VudGVkXG4gIHRoaXMuaXNNb3VudGVkID0gZmFsc2U7XG4gIHJvb3QuaXNMb29wID0gaXNMb29wO1xuXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdfaW50ZXJuYWwnLCB7XG4gICAgaXNBbm9ueW1vdXM6IGlzQW5vbnltb3VzLFxuICAgIGluc3RBdHRyczogaW5zdEF0dHJzLFxuICAgIGlubmVySFRNTDogaW5uZXJIVE1MLFxuICAgIC8vIHRoZXNlIHZhcnMgd2lsbCBiZSBuZWVkZWQgb25seSBmb3IgdGhlIHZpcnR1YWwgdGFnc1xuICAgIHZpcnRzOiBbXSxcbiAgICB0YWlsOiBudWxsLFxuICAgIGhlYWQ6IG51bGxcbiAgfSk7XG5cbiAgLy8gY3JlYXRlIGEgdW5pcXVlIGlkIHRvIHRoaXMgdGFnXG4gIC8vIGl0IGNvdWxkIGJlIGhhbmR5IHRvIHVzZSBpdCBhbHNvIHRvIGltcHJvdmUgdGhlIHZpcnR1YWwgZG9tIHJlbmRlcmluZyBzcGVlZFxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX3Jpb3RfaWQnLCArK19fdWlkKTsgLy8gYmFzZSAxIGFsbG93cyB0ZXN0ICF0Ll9yaW90X2lkXG5cbiAgZXh0ZW5kKHRoaXMsIHsgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9LCBpdGVtKTtcbiAgLy8gcHJvdGVjdCB0aGUgXCJ0YWdzXCIgYW5kIFwicmVmc1wiIHByb3BlcnR5IGZyb20gYmVpbmcgb3ZlcnJpZGRlblxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncGFyZW50JywgcGFyZW50IHx8IG51bGwpO1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAndGFncycsIHt9KTtcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3JlZnMnLCB7fSk7XG5cbiAgZG9tID0gbWtkb20oaW1wbC50bXBsLCBpbm5lckhUTUwsIGlzTG9vcCk7XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgdGFnIGV4cHJlc3Npb25zIGFuZCBvcHRpb25zXG4gICAqIEBwYXJhbSAgIHsgKiB9ICBkYXRhIC0gZGF0YSB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBwcm9wZXJ0aWVzXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAndXBkYXRlJywgZnVuY3Rpb24gdGFnVXBkYXRlKGRhdGEpIHtcbiAgICBpZiAoaXNGdW5jdGlvbih0aGlzLnNob3VsZFVwZGF0ZSkgJiYgIXRoaXMuc2hvdWxkVXBkYXRlKGRhdGEpKSB7IHJldHVybiB0aGlzIH1cblxuICAgIC8vIG1ha2Ugc3VyZSB0aGUgZGF0YSBwYXNzZWQgd2lsbCBub3Qgb3ZlcnJpZGVcbiAgICAvLyB0aGUgY29tcG9uZW50IGNvcmUgbWV0aG9kc1xuICAgIGRhdGEgPSBjbGVhblVwRGF0YShkYXRhKTtcblxuICAgIC8vIGluaGVyaXQgcHJvcGVydGllcyBmcm9tIHRoZSBwYXJlbnQsIGJ1dCBvbmx5IGZvciBpc0Fub255bW91cyB0YWdzXG4gICAgaWYgKGlzTG9vcCAmJiBpc0Fub255bW91cykgeyBpbmhlcml0RnJvbS5hcHBseSh0aGlzLCBbdGhpcy5wYXJlbnQsIHByb3BzSW5TeW5jV2l0aFBhcmVudF0pOyB9XG4gICAgZXh0ZW5kKHRoaXMsIGRhdGEpO1xuICAgIHVwZGF0ZU9wdHMuYXBwbHkodGhpcywgW2lzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzXSk7XG4gICAgaWYgKHRoaXMuaXNNb3VudGVkKSB7IHRoaXMudHJpZ2dlcigndXBkYXRlJywgZGF0YSk7IH1cbiAgICB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKHRoaXMsIGV4cHJlc3Npb25zKTtcbiAgICBpZiAodGhpcy5pc01vdW50ZWQpIHsgdGhpcy50cmlnZ2VyKCd1cGRhdGVkJyk7IH1cblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogQWRkIGEgbWl4aW4gdG8gdGhpcyB0YWdcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdtaXhpbicsIGZ1bmN0aW9uIHRhZ01peGluKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gICAgZWFjaChhcmd1bWVudHMsIGZ1bmN0aW9uIChtaXgpIHtcbiAgICAgIHZhciBpbnN0YW5jZSxcbiAgICAgICAgcHJvcHMgPSBbXSxcbiAgICAgICAgb2JqO1xuXG4gICAgICBtaXggPSBpc1N0cmluZyhtaXgpID8gbWl4aW4kMShtaXgpIDogbWl4O1xuXG4gICAgICAvLyBjaGVjayBpZiB0aGUgbWl4aW4gaXMgYSBmdW5jdGlvblxuICAgICAgaWYgKGlzRnVuY3Rpb24obWl4KSkge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIG5ldyBtaXhpbiBpbnN0YW5jZVxuICAgICAgICBpbnN0YW5jZSA9IG5ldyBtaXgoKTtcbiAgICAgIH0gZWxzZSB7IGluc3RhbmNlID0gbWl4OyB9XG5cbiAgICAgIHZhciBwcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihpbnN0YW5jZSk7XG5cbiAgICAgIC8vIGJ1aWxkIG11bHRpbGV2ZWwgcHJvdG90eXBlIGluaGVyaXRhbmNlIGNoYWluIHByb3BlcnR5IGxpc3RcbiAgICAgIGRvIHsgcHJvcHMgPSBwcm9wcy5jb25jYXQoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMob2JqIHx8IGluc3RhbmNlKSk7IH1cbiAgICAgIHdoaWxlIChvYmogPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqIHx8IGluc3RhbmNlKSlcblxuICAgICAgLy8gbG9vcCB0aGUga2V5cyBpbiB0aGUgZnVuY3Rpb24gcHJvdG90eXBlIG9yIHRoZSBhbGwgb2JqZWN0IGtleXNcbiAgICAgIGVhY2gocHJvcHMsIGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgLy8gYmluZCBtZXRob2RzIHRvIHRoaXNcbiAgICAgICAgLy8gYWxsb3cgbWl4aW5zIHRvIG92ZXJyaWRlIG90aGVyIHByb3BlcnRpZXMvcGFyZW50IG1peGluc1xuICAgICAgICBpZiAoa2V5ICE9PSAnaW5pdCcpIHtcbiAgICAgICAgICAvLyBjaGVjayBmb3IgZ2V0dGVycy9zZXR0ZXJzXG4gICAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGluc3RhbmNlLCBrZXkpIHx8IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocHJvdG8sIGtleSk7XG4gICAgICAgICAgdmFyIGhhc0dldHRlclNldHRlciA9IGRlc2NyaXB0b3IgJiYgKGRlc2NyaXB0b3IuZ2V0IHx8IGRlc2NyaXB0b3Iuc2V0KTtcblxuICAgICAgICAgIC8vIGFwcGx5IG1ldGhvZCBvbmx5IGlmIGl0IGRvZXMgbm90IGFscmVhZHkgZXhpc3Qgb24gdGhlIGluc3RhbmNlXG4gICAgICAgICAgaWYgKCF0aGlzJDEuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBoYXNHZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzJDEsIGtleSwgZGVzY3JpcHRvcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMkMVtrZXldID0gaXNGdW5jdGlvbihpbnN0YW5jZVtrZXldKSA/XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV0uYmluZCh0aGlzJDEpIDpcbiAgICAgICAgICAgICAgaW5zdGFuY2Vba2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBpbml0IG1ldGhvZCB3aWxsIGJlIGNhbGxlZCBhdXRvbWF0aWNhbGx5XG4gICAgICBpZiAoaW5zdGFuY2UuaW5pdClcbiAgICAgICAgeyBpbnN0YW5jZS5pbml0LmJpbmQodGhpcyQxKSgpOyB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXNcbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogTW91bnQgdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbW91bnQnLCBmdW5jdGlvbiB0YWdNb3VudCgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHJvb3QuX3RhZyA9IHRoaXM7IC8vIGtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHRhZyBqdXN0IGNyZWF0ZWRcblxuICAgIC8vIFJlYWQgYWxsIHRoZSBhdHRycyBvbiB0aGlzIGluc3RhbmNlLiBUaGlzIGdpdmUgdXMgdGhlIGluZm8gd2UgbmVlZCBmb3IgdXBkYXRlT3B0c1xuICAgIHBhcnNlQXR0cmlidXRlcy5hcHBseShwYXJlbnQsIFtyb290LCByb290LmF0dHJpYnV0ZXMsIGZ1bmN0aW9uIChhdHRyLCBleHByKSB7XG4gICAgICBpZiAoIWlzQW5vbnltb3VzICYmIFJlZkV4cHIuaXNQcm90b3R5cGVPZihleHByKSkgeyBleHByLnRhZyA9IHRoaXMkMTsgfVxuICAgICAgYXR0ci5leHByID0gZXhwcjtcbiAgICAgIGluc3RBdHRycy5wdXNoKGF0dHIpO1xuICAgIH1dKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgcm9vdCBhZGRpbmcgY3VzdG9tIGF0dHJpYnV0ZXMgY29taW5nIGZyb20gdGhlIGNvbXBpbGVyXG4gICAgaW1wbEF0dHJzID0gW107XG4gICAgd2Fsa0F0dHJzKGltcGwuYXR0cnMsIGZ1bmN0aW9uIChrLCB2KSB7IGltcGxBdHRycy5wdXNoKHtuYW1lOiBrLCB2YWx1ZTogdn0pOyB9KTtcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkodGhpcywgW3Jvb3QsIGltcGxBdHRycywgZnVuY3Rpb24gKGF0dHIsIGV4cHIpIHtcbiAgICAgIGlmIChleHByKSB7IGV4cHJlc3Npb25zLnB1c2goZXhwcik7IH1cbiAgICAgIGVsc2UgeyBzZXRBdHRyKHJvb3QsIGF0dHIubmFtZSwgYXR0ci52YWx1ZSk7IH1cbiAgICB9XSk7XG5cbiAgICAvLyBjaGlsZHJlbiBpbiBsb29wIHNob3VsZCBpbmhlcml0IGZyb20gdHJ1ZSBwYXJlbnRcbiAgICBpZiAodGhpcy5fcGFyZW50ICYmIGlzQW5vbnltb3VzKSB7IGluaGVyaXRGcm9tLmFwcGx5KHRoaXMsIFt0aGlzLl9wYXJlbnQsIHByb3BzSW5TeW5jV2l0aFBhcmVudF0pOyB9XG5cbiAgICAvLyBpbml0aWFsaWF0aW9uXG4gICAgdXBkYXRlT3B0cy5hcHBseSh0aGlzLCBbaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnNdKTtcblxuICAgIC8vIGFkZCBnbG9iYWwgbWl4aW5zXG4gICAgdmFyIGdsb2JhbE1peGluID0gbWl4aW4kMShHTE9CQUxfTUlYSU4pO1xuXG4gICAgaWYgKGdsb2JhbE1peGluKSB7XG4gICAgICBmb3IgKHZhciBpIGluIGdsb2JhbE1peGluKSB7XG4gICAgICAgIGlmIChnbG9iYWxNaXhpbi5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgIHRoaXMkMS5taXhpbihnbG9iYWxNaXhpbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoaW1wbC5mbikgeyBpbXBsLmZuLmNhbGwodGhpcywgb3B0cyk7IH1cblxuICAgIHRoaXMudHJpZ2dlcignYmVmb3JlLW1vdW50Jyk7XG5cbiAgICAvLyBwYXJzZSBsYXlvdXQgYWZ0ZXIgaW5pdC4gZm4gbWF5IGNhbGN1bGF0ZSBhcmdzIGZvciBuZXN0ZWQgY3VzdG9tIHRhZ3NcbiAgICBwYXJzZUV4cHJlc3Npb25zLmFwcGx5KHRoaXMsIFtkb20sIGV4cHJlc3Npb25zLCBmYWxzZV0pO1xuXG4gICAgdGhpcy51cGRhdGUoaXRlbSk7XG5cbiAgICBpZiAoaXNMb29wICYmIGlzQW5vbnltb3VzKSB7XG4gICAgICAvLyB1cGRhdGUgdGhlIHJvb3QgYXR0cmlidXRlIGZvciB0aGUgbG9vcGVkIGVsZW1lbnRzXG4gICAgICB0aGlzLnJvb3QgPSByb290ID0gZG9tLmZpcnN0Q2hpbGQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdoaWxlIChkb20uZmlyc3RDaGlsZCkgeyByb290LmFwcGVuZENoaWxkKGRvbS5maXJzdENoaWxkKTsgfVxuICAgICAgaWYgKHJvb3Quc3R1YikgeyByb290ID0gcGFyZW50LnJvb3Q7IH1cbiAgICB9XG5cbiAgICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAncm9vdCcsIHJvb3QpO1xuICAgIHRoaXMuaXNNb3VudGVkID0gdHJ1ZTtcblxuICAgIC8vIGlmIGl0J3Mgbm90IGEgY2hpbGQgdGFnIHdlIGNhbiB0cmlnZ2VyIGl0cyBtb3VudCBldmVudFxuICAgIGlmICghdGhpcy5wYXJlbnQgfHwgdGhpcy5wYXJlbnQuaXNNb3VudGVkKSB7XG4gICAgICB0aGlzLnRyaWdnZXIoJ21vdW50Jyk7XG4gICAgfVxuICAgIC8vIG90aGVyd2lzZSB3ZSBuZWVkIHRvIHdhaXQgdGhhdCB0aGUgcGFyZW50IGV2ZW50IGdldHMgdHJpZ2dlcmVkXG4gICAgZWxzZSB7IHRoaXMucGFyZW50Lm9uZSgnbW91bnQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzJDEudHJpZ2dlcignbW91bnQnKTtcbiAgICB9KTsgfVxuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xuXG4gIC8qKlxuICAgKiBVbm1vdW50IHRoZSB0YWcgaW5zdGFuY2VcbiAgICogQHBhcmFtIHsgQm9vbGVhbiB9IG11c3RLZWVwUm9vdCAtIGlmIGl0J3MgdHJ1ZSB0aGUgcm9vdCBub2RlIHdpbGwgbm90IGJlIHJlbW92ZWRcbiAgICogQHJldHVybnMgeyBUYWcgfSB0aGUgY3VycmVudCB0YWcgaW5zdGFuY2VcbiAgICovXG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICd1bm1vdW50JywgZnVuY3Rpb24gdGFnVW5tb3VudChtdXN0S2VlcFJvb3QpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIHZhciBlbCA9IHRoaXMucm9vdCxcbiAgICAgIHAgPSBlbC5wYXJlbnROb2RlLFxuICAgICAgcHRhZyxcbiAgICAgIHRhZ0luZGV4ID0gX19UQUdTX0NBQ0hFLmluZGV4T2YodGhpcyk7XG5cbiAgICB0aGlzLnRyaWdnZXIoJ2JlZm9yZS11bm1vdW50Jyk7XG5cbiAgICAvLyBjbGVhciBhbGwgYXR0cmlidXRlcyBjb21pbmcgZnJvbSB0aGUgbW91bnRlZCB0YWdcbiAgICB3YWxrQXR0cnMoaW1wbC5hdHRycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmIChzdGFydHNXaXRoKG5hbWUsIEFUVFJTX1BSRUZJWCkpXG4gICAgICAgIHsgbmFtZSA9IG5hbWUuc2xpY2UoQVRUUlNfUFJFRklYLmxlbmd0aCk7IH1cbiAgICAgIHJlbUF0dHIocm9vdCwgbmFtZSk7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgdGhpcyB0YWcgaW5zdGFuY2UgZnJvbSB0aGUgZ2xvYmFsIHZpcnR1YWxEb20gdmFyaWFibGVcbiAgICBpZiAofnRhZ0luZGV4KVxuICAgICAgeyBfX1RBR1NfQ0FDSEUuc3BsaWNlKHRhZ0luZGV4LCAxKTsgfVxuXG4gICAgaWYgKHApIHtcbiAgICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgcHRhZyA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwYXJlbnQpO1xuXG4gICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICBPYmplY3Qua2V5cyh0aGlzLnRhZ3MpLmZvckVhY2goZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHB0YWcudGFncywgdGFnTmFtZSwgdGhpcyQxLnRhZ3NbdGFnTmFtZV0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFycmF5aXNoUmVtb3ZlKHB0YWcudGFncywgdGFnTmFtZSwgdGhpcyk7XG4gICAgICAgICAgaWYocGFyZW50ICE9PSBwdGFnKSAvLyByZW1vdmUgZnJvbSBfcGFyZW50IHRvb1xuICAgICAgICAgICAgeyBhcnJheWlzaFJlbW92ZShwYXJlbnQudGFncywgdGFnTmFtZSwgdGhpcyk7IH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKGVsLmZpcnN0Q2hpbGQpIHsgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7IH1cbiAgICAgIH1cblxuICAgICAgaWYgKCFtdXN0S2VlcFJvb3QpIHtcbiAgICAgICAgcC5yZW1vdmVDaGlsZChlbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGUgcmlvdC10YWcgYW5kIHRoZSBkYXRhLWlzIGF0dHJpYnV0ZXMgYXJlbid0IG5lZWRlZCBhbnltb3JlLCByZW1vdmUgdGhlbVxuICAgICAgICByZW1BdHRyKHAsIElTX0RJUkVDVElWRSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2ludGVybmFsLnZpcnRzKSB7XG4gICAgICBlYWNoKHRoaXMuX2ludGVybmFsLnZpcnRzLCBmdW5jdGlvbiAodikge1xuICAgICAgICBpZiAodi5wYXJlbnROb2RlKSB7IHYucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh2KTsgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gYWxsb3cgZXhwcmVzc2lvbnMgdG8gdW5tb3VudCB0aGVtc2VsdmVzXG4gICAgdW5tb3VudEFsbChleHByZXNzaW9ucyk7XG4gICAgZWFjaChpbnN0QXR0cnMsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBhLmV4cHIgJiYgYS5leHByLnVubW91bnQgJiYgYS5leHByLnVubW91bnQoKTsgfSk7XG5cbiAgICB0aGlzLnRyaWdnZXIoJ3VubW91bnQnKTtcbiAgICB0aGlzLm9mZignKicpO1xuICAgIHRoaXMuaXNNb3VudGVkID0gZmFsc2U7XG5cbiAgICBkZWxldGUgdGhpcy5yb290Ll90YWc7XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbi8qKlxuICogRGV0ZWN0IHRoZSB0YWcgaW1wbGVtZW50YXRpb24gYnkgYSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSBuZWVkIHRvIHBhcnNlIHRvIGdldCBpdHMgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGl0IHJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGltcGxlbWVudGF0aW9uIG9mIGEgY3VzdG9tIHRhZyAodGVtcGxhdGUgYW5kIGJvb3QgZnVuY3Rpb24pXG4gKi9cbmZ1bmN0aW9uIGdldFRhZyhkb20pIHtcbiAgcmV0dXJuIGRvbS50YWdOYW1lICYmIF9fVEFHX0lNUExbZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkgfHxcbiAgICBnZXRBdHRyKGRvbSwgSVNfRElSRUNUSVZFKSB8fCBkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXVxufVxuXG4vKipcbiAqIEluaGVyaXQgcHJvcGVydGllcyBmcm9tIGEgdGFyZ2V0IHRhZyBpbnN0YW5jZVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IFRhZyB9IHRhcmdldCAtIHRhZyB3aGVyZSB3ZSB3aWxsIGluaGVyaXQgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBBcnJheSB9IHByb3BzSW5TeW5jV2l0aFBhcmVudCAtIGFycmF5IG9mIHByb3BlcnRpZXMgdG8gc3luYyB3aXRoIHRoZSB0YXJnZXRcbiAqL1xuZnVuY3Rpb24gaW5oZXJpdEZyb20odGFyZ2V0LCBwcm9wc0luU3luY1dpdGhQYXJlbnQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChPYmplY3Qua2V5cyh0YXJnZXQpLCBmdW5jdGlvbiAoaykge1xuICAgIC8vIHNvbWUgcHJvcGVydGllcyBtdXN0IGJlIGFsd2F5cyBpbiBzeW5jIHdpdGggdGhlIHBhcmVudCB0YWdcbiAgICB2YXIgbXVzdFN5bmMgPSAhaXNSZXNlcnZlZE5hbWUoaykgJiYgY29udGFpbnMocHJvcHNJblN5bmNXaXRoUGFyZW50LCBrKTtcblxuICAgIGlmIChpc1VuZGVmaW5lZCh0aGlzJDFba10pIHx8IG11c3RTeW5jKSB7XG4gICAgICAvLyB0cmFjayB0aGUgcHJvcGVydHkgdG8ga2VlcCBpbiBzeW5jXG4gICAgICAvLyBzbyB3ZSBjYW4ga2VlcCBpdCB1cGRhdGVkXG4gICAgICBpZiAoIW11c3RTeW5jKSB7IHByb3BzSW5TeW5jV2l0aFBhcmVudC5wdXNoKGspOyB9XG4gICAgICB0aGlzJDFba10gPSB0YXJnZXRba107XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBNb3ZlIHRoZSBwb3NpdGlvbiBvZiBhIGN1c3RvbSB0YWcgaW4gaXRzIHBhcmVudCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0ga2V5IHdoZXJlIHRoZSB0YWcgd2FzIHN0b3JlZFxuICogQHBhcmFtICAgeyBOdW1iZXIgfSBuZXdQb3MgLSBpbmRleCB3aGVyZSB0aGUgbmV3IHRhZyB3aWxsIGJlIHN0b3JlZFxuICovXG5mdW5jdGlvbiBtb3ZlQ2hpbGRUYWcodGFnTmFtZSwgbmV3UG9zKSB7XG4gIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudCxcbiAgICB0YWdzO1xuICAvLyBubyBwYXJlbnQgbm8gbW92ZVxuICBpZiAoIXBhcmVudCkgeyByZXR1cm4gfVxuXG4gIHRhZ3MgPSBwYXJlbnQudGFnc1t0YWdOYW1lXTtcblxuICBpZiAoaXNBcnJheSh0YWdzKSlcbiAgICB7IHRhZ3Muc3BsaWNlKG5ld1BvcywgMCwgdGFncy5zcGxpY2UodGFncy5pbmRleE9mKHRoaXMpLCAxKVswXSk7IH1cbiAgZWxzZSB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0aGlzKTsgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBjaGlsZCB0YWcgaW5jbHVkaW5nIGl0IGNvcnJlY3RseSBpbnRvIGl0cyBwYXJlbnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY2hpbGQgLSBjaGlsZCB0YWcgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIERPTSBub2RlIHdoZXJlIHRoZSB0YWcgd2lsbCBiZSBtb3VudGVkXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGlubmVySFRNTCAtIGlubmVyIGh0bWwgb2YgdGhlIGNoaWxkIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gcGFyZW50IC0gaW5zdGFuY2Ugb2YgdGhlIHBhcmVudCB0YWcgaW5jbHVkaW5nIHRoZSBjaGlsZCBjdXN0b20gdGFnXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGluc3RhbmNlIG9mIHRoZSBuZXcgY2hpbGQgdGFnIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiBpbml0Q2hpbGRUYWcoY2hpbGQsIG9wdHMsIGlubmVySFRNTCwgcGFyZW50KSB7XG4gIHZhciB0YWcgPSBuZXcgVGFnJDEoY2hpbGQsIG9wdHMsIGlubmVySFRNTCksXG4gICAgdGFnTmFtZSA9IG9wdHMudGFnTmFtZSB8fCBnZXRUYWdOYW1lKG9wdHMucm9vdCwgdHJ1ZSksXG4gICAgcHRhZyA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyhwYXJlbnQpO1xuICAvLyBmaXggZm9yIHRoZSBwYXJlbnQgYXR0cmlidXRlIGluIHRoZSBsb29wZWQgZWxlbWVudHNcbiAgZGVmaW5lUHJvcGVydHkodGFnLCAncGFyZW50JywgcHRhZyk7XG4gIC8vIHN0b3JlIHRoZSByZWFsIHBhcmVudCB0YWdcbiAgLy8gaW4gc29tZSBjYXNlcyB0aGlzIGNvdWxkIGJlIGRpZmZlcmVudCBmcm9tIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICAvLyBmb3IgZXhhbXBsZSBpbiBuZXN0ZWQgbG9vcHNcbiAgdGFnLl9wYXJlbnQgPSBwYXJlbnQ7XG5cbiAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSBjdXN0b20gcGFyZW50IHRhZ1xuICBhcnJheWlzaEFkZChwdGFnLnRhZ3MsIHRhZ05hbWUsIHRhZyk7XG5cbiAgLy8gYW5kIGFsc28gdG8gdGhlIHJlYWwgcGFyZW50IHRhZ1xuICBpZiAocHRhZyAhPT0gcGFyZW50KVxuICAgIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRhZyk7IH1cblxuICAvLyBlbXB0eSB0aGUgY2hpbGQgbm9kZSBvbmNlIHdlIGdvdCBpdHMgdGVtcGxhdGVcbiAgLy8gdG8gYXZvaWQgdGhhdCBpdHMgY2hpbGRyZW4gZ2V0IGNvbXBpbGVkIG11bHRpcGxlIHRpbWVzXG4gIG9wdHMucm9vdC5pbm5lckhUTUwgPSAnJztcblxuICByZXR1cm4gdGFnXG59XG5cbi8qKlxuICogTG9vcCBiYWNrd2FyZCBhbGwgdGhlIHBhcmVudHMgdHJlZSB0byBkZXRlY3QgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHRhZyAtIGEgVGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IHRoZSBpbnN0YW5jZSBvZiB0aGUgZmlyc3QgY3VzdG9tIHBhcmVudCB0YWcgZm91bmRcbiAqL1xuZnVuY3Rpb24gZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRhZykge1xuICB2YXIgcHRhZyA9IHRhZztcbiAgd2hpbGUgKHB0YWcuX2ludGVybmFsLmlzQW5vbnltb3VzKSB7XG4gICAgaWYgKCFwdGFnLnBhcmVudCkgeyBicmVhayB9XG4gICAgcHRhZyA9IHB0YWcucGFyZW50O1xuICB9XG4gIHJldHVybiBwdGFnXG59XG5cbi8qKlxuICogVHJpZ2dlciB0aGUgdW5tb3VudCBtZXRob2Qgb24gYWxsIHRoZSBleHByZXNzaW9uc1xuICogQHBhcmFtICAgeyBBcnJheSB9IGV4cHJlc3Npb25zIC0gRE9NIGV4cHJlc3Npb25zXG4gKi9cbmZ1bmN0aW9uIHVubW91bnRBbGwoZXhwcmVzc2lvbnMpIHtcbiAgZWFjaChleHByZXNzaW9ucywgZnVuY3Rpb24oZXhwcikge1xuICAgIGlmIChleHByIGluc3RhbmNlb2YgVGFnJDEpIHsgZXhwci51bm1vdW50KHRydWUpOyB9XG4gICAgZWxzZSBpZiAoZXhwci51bm1vdW50KSB7IGV4cHIudW5tb3VudCgpOyB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgdGFnIG5hbWUgb2YgYW55IERPTSBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRvbSAtIERPTSBub2RlIHdlIHdhbnQgdG8gcGFyc2VcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IHNraXBEYXRhSXMgLSBoYWNrIHRvIGlnbm9yZSB0aGUgZGF0YS1pcyBhdHRyaWJ1dGUgd2hlbiBhdHRhY2hpbmcgdG8gcGFyZW50XG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG5hbWUgdG8gaWRlbnRpZnkgdGhpcyBkb20gbm9kZSBpbiByaW90XG4gKi9cbmZ1bmN0aW9uIGdldFRhZ05hbWUoZG9tLCBza2lwRGF0YUlzKSB7XG4gIHZhciBjaGlsZCA9IGdldFRhZyhkb20pLFxuICAgIG5hbWVkVGFnID0gIXNraXBEYXRhSXMgJiYgZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSk7XG4gIHJldHVybiBuYW1lZFRhZyAmJiAhdG1wbC5oYXNFeHByKG5hbWVkVGFnKSA/XG4gICAgICAgICAgICAgICAgbmFtZWRUYWcgOlxuICAgICAgICAgICAgICBjaGlsZCA/IGNoaWxkLm5hbWUgOiBkb20udGFnTmFtZS50b0xvd2VyQ2FzZSgpXG59XG5cbi8qKlxuICogV2l0aCB0aGlzIGZ1bmN0aW9uIHdlIGF2b2lkIHRoYXQgdGhlIGludGVybmFsIFRhZyBtZXRob2RzIGdldCBvdmVycmlkZGVuXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGRhdGEgLSBvcHRpb25zIHdlIHdhbnQgdG8gdXNlIHRvIGV4dGVuZCB0aGUgdGFnIGluc3RhbmNlXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGNsZWFuIG9iamVjdCB3aXRob3V0IGNvbnRhaW5pbmcgdGhlIHJpb3QgaW50ZXJuYWwgcmVzZXJ2ZWQgd29yZHNcbiAqL1xuZnVuY3Rpb24gY2xlYW5VcERhdGEoZGF0YSkge1xuICBpZiAoIShkYXRhIGluc3RhbmNlb2YgVGFnJDEpICYmICEoZGF0YSAmJiBpc0Z1bmN0aW9uKGRhdGEudHJpZ2dlcikpKVxuICAgIHsgcmV0dXJuIGRhdGEgfVxuXG4gIHZhciBvID0ge307XG4gIGZvciAodmFyIGtleSBpbiBkYXRhKSB7XG4gICAgaWYgKCFSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KGtleSkpIHsgb1trZXldID0gZGF0YVtrZXldOyB9XG4gIH1cbiAgcmV0dXJuIG9cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHByb3BlcnR5IG9mIGFuIG9iamVjdCBmb3IgYSBnaXZlbiBrZXkuIElmIHNvbWV0aGluZyBhbHJlYWR5XG4gKiBleGlzdHMgdGhlcmUsIHRoZW4gaXQgYmVjb21lcyBhbiBhcnJheSBjb250YWluaW5nIGJvdGggdGhlIG9sZCBhbmQgbmV3IHZhbHVlLlxuICogQHBhcmFtIHsgT2JqZWN0IH0gb2JqIC0gb2JqZWN0IG9uIHdoaWNoIHRvIHNldCB0aGUgcHJvcGVydHlcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGtleSAtIHByb3BlcnR5IG5hbWVcbiAqIEBwYXJhbSB7IE9iamVjdCB9IHZhbHVlIC0gdGhlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSB0byBiZSBzZXRcbiAqIEBwYXJhbSB7IEJvb2xlYW4gfSBlbnN1cmVBcnJheSAtIGVuc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSByZW1haW5zIGFuIGFycmF5XG4gKi9cbmZ1bmN0aW9uIGFycmF5aXNoQWRkKG9iaiwga2V5LCB2YWx1ZSwgZW5zdXJlQXJyYXkpIHtcbiAgdmFyIGRlc3QgPSBvYmpba2V5XTtcbiAgdmFyIGlzQXJyID0gaXNBcnJheShkZXN0KTtcblxuICBpZiAoZGVzdCAmJiBkZXN0ID09PSB2YWx1ZSkgeyByZXR1cm4gfVxuXG4gIC8vIGlmIHRoZSBrZXkgd2FzIG5ldmVyIHNldCwgc2V0IGl0IG9uY2VcbiAgaWYgKCFkZXN0ICYmIGVuc3VyZUFycmF5KSB7IG9ialtrZXldID0gW3ZhbHVlXTsgfVxuICBlbHNlIGlmICghZGVzdCkgeyBvYmpba2V5XSA9IHZhbHVlOyB9XG4gIC8vIGlmIGl0IHdhcyBhbiBhcnJheSBhbmQgbm90IHlldCBzZXRcbiAgZWxzZSBpZiAoIWlzQXJyIHx8IGlzQXJyICYmICFjb250YWlucyhkZXN0LCB2YWx1ZSkpIHtcbiAgICBpZiAoaXNBcnIpIHsgZGVzdC5wdXNoKHZhbHVlKTsgfVxuICAgIGVsc2UgeyBvYmpba2V5XSA9IFtkZXN0LCB2YWx1ZV07IH1cbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYW4gaXRlbSBmcm9tIGFuIG9iamVjdCBhdCBhIGdpdmVuIGtleS4gSWYgdGhlIGtleSBwb2ludHMgdG8gYW4gYXJyYXksXG4gKiB0aGVuIHRoZSBpdGVtIGlzIGp1c3QgcmVtb3ZlZCBmcm9tIHRoZSBhcnJheS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAtIG9iamVjdCBvbiB3aGljaCB0byByZW1vdmUgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0geyBTdHJpbmcgfSBrZXkgLSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0geyBPYmplY3QgfSB2YWx1ZSAtIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgcmVtb3ZlZFxuICogQHBhcmFtIHsgQm9vbGVhbiB9IGVuc3VyZUFycmF5IC0gZW5zdXJlIHRoYXQgdGhlIHByb3BlcnR5IHJlbWFpbnMgYW4gYXJyYXlcbiovXG5mdW5jdGlvbiBhcnJheWlzaFJlbW92ZShvYmosIGtleSwgdmFsdWUsIGVuc3VyZUFycmF5KSB7XG4gIGlmIChpc0FycmF5KG9ialtrZXldKSkge1xuICAgIGVhY2gob2JqW2tleV0sIGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgIGlmIChpdGVtID09PSB2YWx1ZSkgeyBvYmpba2V5XS5zcGxpY2UoaSwgMSk7IH1cbiAgICB9KTtcbiAgICBpZiAoIW9ialtrZXldLmxlbmd0aCkgeyBkZWxldGUgb2JqW2tleV07IH1cbiAgICBlbHNlIGlmIChvYmpba2V5XS5sZW5ndGggPT09IDEgJiYgIWVuc3VyZUFycmF5KSB7IG9ialtrZXldID0gb2JqW2tleV1bMF07IH1cbiAgfSBlbHNlXG4gICAgeyBkZWxldGUgb2JqW2tleV07IH0gLy8gb3RoZXJ3aXNlIGp1c3QgZGVsZXRlIHRoZSBrZXlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgRE9NIG5vZGUgaXMgaW4gc3R1YiBtb2RlLCB1c2VmdWwgZm9yIHRoZSByaW90ICdpZicgZGlyZWN0aXZlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9ICBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzSW5TdHViKGRvbSkge1xuICB3aGlsZSAoZG9tKSB7XG4gICAgaWYgKGRvbS5pblN0dWIpXG4gICAgICB7IHJldHVybiB0cnVlIH1cbiAgICBkb20gPSBkb20ucGFyZW50Tm9kZTtcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBNb3VudCBhIHRhZyBjcmVhdGluZyBuZXcgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHJvb3QgLSBkb20gbm9kZSB3aGVyZSB0aGUgdGFnIHdpbGwgYmUgbW91bnRlZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB0YWdOYW1lIC0gbmFtZSBvZiB0aGUgcmlvdCB0YWcgd2Ugd2FudCB0byBtb3VudFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBvcHRzIC0gb3B0aW9ucyB0byBwYXNzIHRvIHRoZSBUYWcgaW5zdGFuY2VcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gY3R4IC0gb3B0aW9uYWwgY29udGV4dCB0aGF0IHdpbGwgYmUgdXNlZCB0byBleHRlbmQgYW4gZXhpc3RpbmcgY2xhc3MgKCB1c2VkIGluIHJpb3QuVGFnIClcbiAqIEByZXR1cm5zIHsgVGFnIH0gYSBuZXcgVGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIG1vdW50VG8ocm9vdCwgdGFnTmFtZSwgb3B0cywgY3R4KSB7XG4gIHZhciBpbXBsID0gX19UQUdfSU1QTFt0YWdOYW1lXSxcbiAgICBpbXBsQ2xhc3MgPSBfX1RBR19JTVBMW3RhZ05hbWVdLmNsYXNzLFxuICAgIHRhZyA9IGN0eCB8fCAoaW1wbENsYXNzID8gT2JqZWN0LmNyZWF0ZShpbXBsQ2xhc3MucHJvdG90eXBlKSA6IHt9KSxcbiAgICAvLyBjYWNoZSB0aGUgaW5uZXIgSFRNTCB0byBmaXggIzg1NVxuICAgIGlubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCA9IHJvb3QuX2lubmVySFRNTCB8fCByb290LmlubmVySFRNTDtcblxuICAvLyBjbGVhciB0aGUgaW5uZXIgaHRtbFxuICByb290LmlubmVySFRNTCA9ICcnO1xuXG4gIHZhciBjb25mID0geyByb290OiByb290LCBvcHRzOiBvcHRzIH07XG4gIGlmIChvcHRzICYmIG9wdHMucGFyZW50KSB7IGNvbmYucGFyZW50ID0gb3B0cy5wYXJlbnQ7IH1cblxuICBpZiAoaW1wbCAmJiByb290KSB7IFRhZyQxLmFwcGx5KHRhZywgW2ltcGwsIGNvbmYsIGlubmVySFRNTF0pOyB9XG5cbiAgaWYgKHRhZyAmJiB0YWcubW91bnQpIHtcbiAgICB0YWcubW91bnQodHJ1ZSk7XG4gICAgLy8gYWRkIHRoaXMgdGFnIHRvIHRoZSB2aXJ0dWFsRG9tIHZhcmlhYmxlXG4gICAgaWYgKCFjb250YWlucyhfX1RBR1NfQ0FDSEUsIHRhZykpIHsgX19UQUdTX0NBQ0hFLnB1c2godGFnKTsgfVxuICB9XG5cbiAgcmV0dXJuIHRhZ1xufVxuXG5cbi8qKlxuICogQWRkcyB0aGUgZWxlbWVudHMgZm9yIGEgdmlydHVhbCB0YWdcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgTm9kZSB9IHNyYyAtIHRoZSBub2RlIHRoYXQgd2lsbCBkbyB0aGUgaW5zZXJ0aW5nIG9yIGFwcGVuZGluZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFyZ2V0IC0gb25seSBpZiBpbnNlcnRpbmcsIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICovXG5mdW5jdGlvbiBtYWtlVmlydHVhbChzcmMsIHRhcmdldCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgaGVhZCA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgdGFpbCA9IGNyZWF0ZURPTVBsYWNlaG9sZGVyKCksXG4gICAgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICBzaWIsIGVsO1xuXG4gIHRoaXMuX2ludGVybmFsLmhlYWQgPSB0aGlzLnJvb3QuaW5zZXJ0QmVmb3JlKGhlYWQsIHRoaXMucm9vdC5maXJzdENoaWxkKTtcbiAgdGhpcy5faW50ZXJuYWwudGFpbCA9IHRoaXMucm9vdC5hcHBlbmRDaGlsZCh0YWlsKTtcblxuICBlbCA9IHRoaXMuX2ludGVybmFsLmhlYWQ7XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgc2liID0gZWwubmV4dFNpYmxpbmc7XG4gICAgZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gICAgdGhpcyQxLl9pbnRlcm5hbC52aXJ0cy5wdXNoKGVsKTsgLy8gaG9sZCBmb3IgdW5tb3VudGluZ1xuICAgIGVsID0gc2liO1xuICB9XG5cbiAgaWYgKHRhcmdldClcbiAgICB7IHNyYy5pbnNlcnRCZWZvcmUoZnJhZywgdGFyZ2V0Ll9pbnRlcm5hbC5oZWFkKTsgfVxuICBlbHNlXG4gICAgeyBzcmMuYXBwZW5kQ2hpbGQoZnJhZyk7IH1cbn1cblxuLyoqXG4gKiBNb3ZlIHZpcnR1YWwgdGFnIGFuZCBhbGwgY2hpbGQgbm9kZXNcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtIHsgTm9kZSB9IHNyYyAgLSB0aGUgbm9kZSB0aGF0IHdpbGwgZG8gdGhlIGluc2VydGluZ1xuICogQHBhcmFtIHsgVGFnIH0gdGFyZ2V0IC0gaW5zZXJ0IGJlZm9yZSB0aGlzIHRhZydzIGZpcnN0IGNoaWxkXG4gKi9cbmZ1bmN0aW9uIG1vdmVWaXJ0dWFsKHNyYywgdGFyZ2V0KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciBlbCA9IHRoaXMuX2ludGVybmFsLmhlYWQsXG4gICAgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICBzaWI7XG5cbiAgd2hpbGUgKGVsKSB7XG4gICAgc2liID0gZWwubmV4dFNpYmxpbmc7XG4gICAgZnJhZy5hcHBlbmRDaGlsZChlbCk7XG4gICAgZWwgPSBzaWI7XG4gICAgaWYgKGVsID09PSB0aGlzJDEuX2ludGVybmFsLnRhaWwpIHtcbiAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgc3JjLmluc2VydEJlZm9yZShmcmFnLCB0YXJnZXQuX2ludGVybmFsLmhlYWQpO1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHZXQgc2VsZWN0b3JzIGZvciB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gdGFncyAtIHRhZyBuYW1lcyB0byBzZWxlY3RcbiAqIEByZXR1cm5zIHsgU3RyaW5nIH0gc2VsZWN0b3JcbiAqL1xuZnVuY3Rpb24gc2VsZWN0VGFncyh0YWdzKSB7XG4gIC8vIHNlbGVjdCBhbGwgdGFnc1xuICBpZiAoIXRhZ3MpIHtcbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKF9fVEFHX0lNUEwpO1xuICAgIHJldHVybiBrZXlzICsgc2VsZWN0VGFncyhrZXlzKVxuICB9XG5cbiAgcmV0dXJuIHRhZ3NcbiAgICAuZmlsdGVyKGZ1bmN0aW9uICh0KSB7IHJldHVybiAhL1teLVxcd10vLnRlc3QodCk7IH0pXG4gICAgLnJlZHVjZShmdW5jdGlvbiAobGlzdCwgdCkge1xuICAgICAgdmFyIG5hbWUgPSB0LnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgcmV0dXJuIGxpc3QgKyBcIixbXCIgKyBJU19ESVJFQ1RJVkUgKyBcIj1cXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiXG4gICAgfSwgJycpXG59XG5cblxudmFyIHRhZ3MgPSBPYmplY3QuZnJlZXplKHtcblx0Z2V0VGFnOiBnZXRUYWcsXG5cdGluaGVyaXRGcm9tOiBpbmhlcml0RnJvbSxcblx0bW92ZUNoaWxkVGFnOiBtb3ZlQ2hpbGRUYWcsXG5cdGluaXRDaGlsZFRhZzogaW5pdENoaWxkVGFnLFxuXHRnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWc6IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyxcblx0dW5tb3VudEFsbDogdW5tb3VudEFsbCxcblx0Z2V0VGFnTmFtZTogZ2V0VGFnTmFtZSxcblx0Y2xlYW5VcERhdGE6IGNsZWFuVXBEYXRhLFxuXHRhcnJheWlzaEFkZDogYXJyYXlpc2hBZGQsXG5cdGFycmF5aXNoUmVtb3ZlOiBhcnJheWlzaFJlbW92ZSxcblx0aXNJblN0dWI6IGlzSW5TdHViLFxuXHRtb3VudFRvOiBtb3VudFRvLFxuXHRtYWtlVmlydHVhbDogbWFrZVZpcnR1YWwsXG5cdG1vdmVWaXJ0dWFsOiBtb3ZlVmlydHVhbCxcblx0c2VsZWN0VGFnczogc2VsZWN0VGFnc1xufSk7XG5cbi8qKlxuICogUmlvdCBwdWJsaWMgYXBpXG4gKi9cbnZhciBzZXR0aW5ncyA9IE9iamVjdC5jcmVhdGUoYnJhY2tldHMuc2V0dGluZ3MpO1xuXG52YXIgdXRpbCA9IHtcbiAgdG1wbDogdG1wbCxcbiAgYnJhY2tldHM6IGJyYWNrZXRzLFxuICBzdHlsZU1hbmFnZXI6IHN0eWxlTWFuYWdlcixcbiAgdmRvbTogX19UQUdTX0NBQ0hFLFxuICBzdHlsZU5vZGU6IHN0eWxlTWFuYWdlci5zdHlsZU5vZGUsXG4gIC8vIGV4cG9ydCB0aGUgcmlvdCBpbnRlcm5hbCB1dGlscyBhcyB3ZWxsXG4gIGRvbTogZG9tLFxuICBjaGVjazogY2hlY2ssXG4gIG1pc2M6IG1pc2MsXG4gIHRhZ3M6IHRhZ3Ncbn07XG5cbi8vIGV4cG9ydCB0aGUgY29yZSBwcm9wcy9tZXRob2RzXG52YXIgVGFnJCQxID0gVGFnJDI7XG52YXIgdGFnJCQxID0gdGFnJDE7XG52YXIgdGFnMiQkMSA9IHRhZzIkMTtcbnZhciBtb3VudCQkMSA9IG1vdW50JDE7XG52YXIgbWl4aW4kJDEgPSBtaXhpbiQxO1xudmFyIHVwZGF0ZSQkMSA9IHVwZGF0ZSQxO1xudmFyIHVucmVnaXN0ZXIkJDEgPSB1bnJlZ2lzdGVyJDE7XG52YXIgb2JzZXJ2YWJsZSA9IG9ic2VydmFibGUkMTtcblxudmFyIHJpb3QkMSA9IHtcbiAgc2V0dGluZ3M6IHNldHRpbmdzLFxuICB1dGlsOiB1dGlsLFxuICAvLyBjb3JlXG4gIFRhZzogVGFnJCQxLFxuICB0YWc6IHRhZyQkMSxcbiAgdGFnMjogdGFnMiQkMSxcbiAgbW91bnQ6IG1vdW50JCQxLFxuICBtaXhpbjogbWl4aW4kJDEsXG4gIHVwZGF0ZTogdXBkYXRlJCQxLFxuICB1bnJlZ2lzdGVyOiB1bnJlZ2lzdGVyJCQxLFxuICBvYnNlcnZhYmxlOiBvYnNlcnZhYmxlXG59O1xuXG5leHBvcnRzLnNldHRpbmdzID0gc2V0dGluZ3M7XG5leHBvcnRzLnV0aWwgPSB1dGlsO1xuZXhwb3J0cy5UYWcgPSBUYWckJDE7XG5leHBvcnRzLnRhZyA9IHRhZyQkMTtcbmV4cG9ydHMudGFnMiA9IHRhZzIkJDE7XG5leHBvcnRzLm1vdW50ID0gbW91bnQkJDE7XG5leHBvcnRzLm1peGluID0gbWl4aW4kJDE7XG5leHBvcnRzLnVwZGF0ZSA9IHVwZGF0ZSQkMTtcbmV4cG9ydHMudW5yZWdpc3RlciA9IHVucmVnaXN0ZXIkJDE7XG5leHBvcnRzLm9ic2VydmFibGUgPSBvYnNlcnZhYmxlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcmlvdCQxO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuXG59KSkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Jpb3QvcmlvdC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBvYnNlcnZhYmxlID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3Jpb3Qtb2JzZXJ2YWJsZScpKTtcblxuLyoqXG4gKiBTaW1wbGUgY2xpZW50LXNpZGUgcm91dGVyXG4gKiBAbW9kdWxlIHJpb3Qtcm91dGVcbiAqL1xuXG52YXIgUkVfT1JJR0lOID0gL14uKz9cXC9cXC8rW15cXC9dKy87XG52YXIgRVZFTlRfTElTVEVORVIgPSAnRXZlbnRMaXN0ZW5lcic7XG52YXIgUkVNT1ZFX0VWRU5UX0xJU1RFTkVSID0gJ3JlbW92ZScgKyBFVkVOVF9MSVNURU5FUjtcbnZhciBBRERfRVZFTlRfTElTVEVORVIgPSAnYWRkJyArIEVWRU5UX0xJU1RFTkVSO1xudmFyIEhBU19BVFRSSUJVVEUgPSAnaGFzQXR0cmlidXRlJztcbnZhciBQT1BTVEFURSA9ICdwb3BzdGF0ZSc7XG52YXIgSEFTSENIQU5HRSA9ICdoYXNoY2hhbmdlJztcbnZhciBUUklHR0VSID0gJ3RyaWdnZXInO1xudmFyIE1BWF9FTUlUX1NUQUNLX0xFVkVMID0gMztcbnZhciB3aW4gPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdztcbnZhciBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgIT0gJ3VuZGVmaW5lZCcgJiYgZG9jdW1lbnQ7XG52YXIgaGlzdCA9IHdpbiAmJiBoaXN0b3J5O1xudmFyIGxvYyA9IHdpbiAmJiAoaGlzdC5sb2NhdGlvbiB8fCB3aW4ubG9jYXRpb24pO1xudmFyIHByb3QgPSBSb3V0ZXIucHJvdG90eXBlO1xudmFyIGNsaWNrRXZlbnQgPSBkb2MgJiYgZG9jLm9udG91Y2hzdGFydCA/ICd0b3VjaHN0YXJ0JyA6ICdjbGljayc7XG52YXIgY2VudHJhbCA9IG9ic2VydmFibGUoKTtcblxudmFyIHN0YXJ0ZWQgPSBmYWxzZTtcbnZhciByb3V0ZUZvdW5kID0gZmFsc2U7XG52YXIgZGVib3VuY2VkRW1pdDtcbnZhciBiYXNlO1xudmFyIGN1cnJlbnQ7XG52YXIgcGFyc2VyO1xudmFyIHNlY29uZFBhcnNlcjtcbnZhciBlbWl0U3RhY2sgPSBbXTtcbnZhciBlbWl0U3RhY2tMZXZlbCA9IDA7XG5cbi8qKlxuICogRGVmYXVsdCBwYXJzZXIuIFlvdSBjYW4gcmVwbGFjZSBpdCB2aWEgcm91dGVyLnBhcnNlciBtZXRob2QuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCAtIGN1cnJlbnQgcGF0aCAobm9ybWFsaXplZClcbiAqIEByZXR1cm5zIHthcnJheX0gYXJyYXlcbiAqL1xuZnVuY3Rpb24gREVGQVVMVF9QQVJTRVIocGF0aCkge1xuICByZXR1cm4gcGF0aC5zcGxpdCgvWy8/I10vKVxufVxuXG4vKipcbiAqIERlZmF1bHQgcGFyc2VyIChzZWNvbmQpLiBZb3UgY2FuIHJlcGxhY2UgaXQgdmlhIHJvdXRlci5wYXJzZXIgbWV0aG9kLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBjdXJyZW50IHBhdGggKG5vcm1hbGl6ZWQpXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsdGVyIC0gZmlsdGVyIHN0cmluZyAobm9ybWFsaXplZClcbiAqIEByZXR1cm5zIHthcnJheX0gYXJyYXlcbiAqL1xuZnVuY3Rpb24gREVGQVVMVF9TRUNPTkRfUEFSU0VSKHBhdGgsIGZpbHRlcikge1xuICB2YXIgZiA9IGZpbHRlclxuICAgIC5yZXBsYWNlKC9cXD8vZywgJ1xcXFw/JylcbiAgICAucmVwbGFjZSgvXFwqL2csICcoW14vPyNdKz8pJylcbiAgICAucmVwbGFjZSgvXFwuXFwuLywgJy4qJyk7XG4gIHZhciByZSA9IG5ldyBSZWdFeHAoKFwiXlwiICsgZiArIFwiJFwiKSk7XG4gIHZhciBhcmdzID0gcGF0aC5tYXRjaChyZSk7XG5cbiAgaWYgKGFyZ3MpIHsgcmV0dXJuIGFyZ3Muc2xpY2UoMSkgfVxufVxuXG4vKipcbiAqIFNpbXBsZS9jaGVhcCBkZWJvdW5jZSBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAge2Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrXG4gKiBAcGFyYW0gICB7bnVtYmVyfSBkZWxheSAtIGRlbGF5IGluIHNlY29uZHNcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gZGVib3VuY2VkIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZuLCBkZWxheSkge1xuICB2YXIgdDtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodCk7XG4gICAgdCA9IHNldFRpbWVvdXQoZm4sIGRlbGF5KTtcbiAgfVxufVxuXG4vKipcbiAqIFNldCB0aGUgd2luZG93IGxpc3RlbmVycyB0byB0cmlnZ2VyIHRoZSByb3V0ZXNcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXV0b0V4ZWMgLSBzZWUgcm91dGUuc3RhcnRcbiAqL1xuZnVuY3Rpb24gc3RhcnQoYXV0b0V4ZWMpIHtcbiAgZGVib3VuY2VkRW1pdCA9IGRlYm91bmNlKGVtaXQsIDEpO1xuICB3aW5bQUREX0VWRU5UX0xJU1RFTkVSXShQT1BTVEFURSwgZGVib3VuY2VkRW1pdCk7XG4gIHdpbltBRERfRVZFTlRfTElTVEVORVJdKEhBU0hDSEFOR0UsIGRlYm91bmNlZEVtaXQpO1xuICBkb2NbQUREX0VWRU5UX0xJU1RFTkVSXShjbGlja0V2ZW50LCBjbGljayk7XG4gIGlmIChhdXRvRXhlYykgeyBlbWl0KHRydWUpOyB9XG59XG5cbi8qKlxuICogUm91dGVyIGNsYXNzXG4gKi9cbmZ1bmN0aW9uIFJvdXRlcigpIHtcbiAgdGhpcy4kID0gW107XG4gIG9ic2VydmFibGUodGhpcyk7IC8vIG1ha2UgaXQgb2JzZXJ2YWJsZVxuICBjZW50cmFsLm9uKCdzdG9wJywgdGhpcy5zLmJpbmQodGhpcykpO1xuICBjZW50cmFsLm9uKCdlbWl0JywgdGhpcy5lLmJpbmQodGhpcykpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUocGF0aCkge1xuICByZXR1cm4gcGF0aC5yZXBsYWNlKC9eXFwvfFxcLyQvLCAnJylcbn1cblxuZnVuY3Rpb24gaXNTdHJpbmcoc3RyKSB7XG4gIHJldHVybiB0eXBlb2Ygc3RyID09ICdzdHJpbmcnXG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXJ0IGFmdGVyIGRvbWFpbiBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gaHJlZiAtIGZ1bGxwYXRoXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBwYXRoIGZyb20gcm9vdFxuICovXG5mdW5jdGlvbiBnZXRQYXRoRnJvbVJvb3QoaHJlZikge1xuICByZXR1cm4gKGhyZWYgfHwgbG9jLmhyZWYpLnJlcGxhY2UoUkVfT1JJR0lOLCAnJylcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHBhcnQgYWZ0ZXIgYmFzZVxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWYgLSBmdWxscGF0aFxuICogQHJldHVybnMge3N0cmluZ30gcGF0aCBmcm9tIGJhc2VcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEZyb21CYXNlKGhyZWYpIHtcbiAgcmV0dXJuIGJhc2VbMF0gPT09ICcjJ1xuICAgID8gKGhyZWYgfHwgbG9jLmhyZWYgfHwgJycpLnNwbGl0KGJhc2UpWzFdIHx8ICcnXG4gICAgOiAobG9jID8gZ2V0UGF0aEZyb21Sb290KGhyZWYpIDogaHJlZiB8fCAnJykucmVwbGFjZShiYXNlLCAnJylcbn1cblxuZnVuY3Rpb24gZW1pdChmb3JjZSkge1xuICAvLyB0aGUgc3RhY2sgaXMgbmVlZGVkIGZvciByZWRpcmVjdGlvbnNcbiAgdmFyIGlzUm9vdCA9IGVtaXRTdGFja0xldmVsID09PSAwO1xuICBpZiAoTUFYX0VNSVRfU1RBQ0tfTEVWRUwgPD0gZW1pdFN0YWNrTGV2ZWwpIHsgcmV0dXJuIH1cblxuICBlbWl0U3RhY2tMZXZlbCsrO1xuICBlbWl0U3RhY2sucHVzaChmdW5jdGlvbigpIHtcbiAgICB2YXIgcGF0aCA9IGdldFBhdGhGcm9tQmFzZSgpO1xuICAgIGlmIChmb3JjZSB8fCBwYXRoICE9PSBjdXJyZW50KSB7XG4gICAgICBjZW50cmFsW1RSSUdHRVJdKCdlbWl0JywgcGF0aCk7XG4gICAgICBjdXJyZW50ID0gcGF0aDtcbiAgICB9XG4gIH0pO1xuICBpZiAoaXNSb290KSB7XG4gICAgdmFyIGZpcnN0O1xuICAgIHdoaWxlIChmaXJzdCA9IGVtaXRTdGFjay5zaGlmdCgpKSB7IGZpcnN0KCk7IH0gLy8gc3RhY2sgaW5jcmVzZXMgd2l0aGluIHRoaXMgY2FsbFxuICAgIGVtaXRTdGFja0xldmVsID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBjbGljayhlKSB7XG4gIGlmIChcbiAgICBlLndoaWNoICE9PSAxIC8vIG5vdCBsZWZ0IGNsaWNrXG4gICAgfHwgZS5tZXRhS2V5IHx8IGUuY3RybEtleSB8fCBlLnNoaWZ0S2V5IC8vIG9yIG1ldGEga2V5c1xuICAgIHx8IGUuZGVmYXVsdFByZXZlbnRlZCAvLyBvciBkZWZhdWx0IHByZXZlbnRlZFxuICApIHsgcmV0dXJuIH1cblxuICB2YXIgZWwgPSBlLnRhcmdldDtcbiAgd2hpbGUgKGVsICYmIGVsLm5vZGVOYW1lICE9PSAnQScpIHsgZWwgPSBlbC5wYXJlbnROb2RlOyB9XG5cbiAgaWYgKFxuICAgICFlbCB8fCBlbC5ub2RlTmFtZSAhPT0gJ0EnIC8vIG5vdCBBIHRhZ1xuICAgIHx8IGVsW0hBU19BVFRSSUJVVEVdKCdkb3dubG9hZCcpIC8vIGhhcyBkb3dubG9hZCBhdHRyXG4gICAgfHwgIWVsW0hBU19BVFRSSUJVVEVdKCdocmVmJykgLy8gaGFzIG5vIGhyZWYgYXR0clxuICAgIHx8IGVsLnRhcmdldCAmJiBlbC50YXJnZXQgIT09ICdfc2VsZicgLy8gYW5vdGhlciB3aW5kb3cgb3IgZnJhbWVcbiAgICB8fCBlbC5ocmVmLmluZGV4T2YobG9jLmhyZWYubWF0Y2goUkVfT1JJR0lOKVswXSkgPT09IC0xIC8vIGNyb3NzIG9yaWdpblxuICApIHsgcmV0dXJuIH1cblxuICBpZiAoZWwuaHJlZiAhPT0gbG9jLmhyZWZcbiAgICAmJiAoXG4gICAgICBlbC5ocmVmLnNwbGl0KCcjJylbMF0gPT09IGxvYy5ocmVmLnNwbGl0KCcjJylbMF0gLy8gaW50ZXJuYWwganVtcFxuICAgICAgfHwgYmFzZVswXSAhPT0gJyMnICYmIGdldFBhdGhGcm9tUm9vdChlbC5ocmVmKS5pbmRleE9mKGJhc2UpICE9PSAwIC8vIG91dHNpZGUgb2YgYmFzZVxuICAgICAgfHwgYmFzZVswXSA9PT0gJyMnICYmIGVsLmhyZWYuc3BsaXQoYmFzZSlbMF0gIT09IGxvYy5ocmVmLnNwbGl0KGJhc2UpWzBdIC8vIG91dHNpZGUgb2YgI2Jhc2VcbiAgICAgIHx8ICFnbyhnZXRQYXRoRnJvbUJhc2UoZWwuaHJlZiksIGVsLnRpdGxlIHx8IGRvYy50aXRsZSkgLy8gcm91dGUgbm90IGZvdW5kXG4gICAgKSkgeyByZXR1cm4gfVxuXG4gIGUucHJldmVudERlZmF1bHQoKTtcbn1cblxuLyoqXG4gKiBHbyB0byB0aGUgcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBkZXN0aW5hdGlvbiBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gdGl0bGUgLSBwYWdlIHRpdGxlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IHNob3VsZFJlcGxhY2UgLSB1c2UgcmVwbGFjZVN0YXRlIG9yIHB1c2hTdGF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IC0gcm91dGUgbm90IGZvdW5kIGZsYWdcbiAqL1xuZnVuY3Rpb24gZ28ocGF0aCwgdGl0bGUsIHNob3VsZFJlcGxhY2UpIHtcbiAgLy8gU2VydmVyLXNpZGUgdXNhZ2U6IGRpcmVjdGx5IGV4ZWN1dGUgaGFuZGxlcnMgZm9yIHRoZSBwYXRoXG4gIGlmICghaGlzdCkgeyByZXR1cm4gY2VudHJhbFtUUklHR0VSXSgnZW1pdCcsIGdldFBhdGhGcm9tQmFzZShwYXRoKSkgfVxuXG4gIHBhdGggPSBiYXNlICsgbm9ybWFsaXplKHBhdGgpO1xuICB0aXRsZSA9IHRpdGxlIHx8IGRvYy50aXRsZTtcbiAgLy8gYnJvd3NlcnMgaWdub3JlcyB0aGUgc2Vjb25kIHBhcmFtZXRlciBgdGl0bGVgXG4gIHNob3VsZFJlcGxhY2VcbiAgICA/IGhpc3QucmVwbGFjZVN0YXRlKG51bGwsIHRpdGxlLCBwYXRoKVxuICAgIDogaGlzdC5wdXNoU3RhdGUobnVsbCwgdGl0bGUsIHBhdGgpO1xuICAvLyBzbyB3ZSBuZWVkIHRvIHNldCBpdCBtYW51YWxseVxuICBkb2MudGl0bGUgPSB0aXRsZTtcbiAgcm91dGVGb3VuZCA9IGZhbHNlO1xuICBlbWl0KCk7XG4gIHJldHVybiByb3V0ZUZvdW5kXG59XG5cbi8qKlxuICogR28gdG8gcGF0aCBvciBzZXQgYWN0aW9uXG4gKiBhIHNpbmdsZSBzdHJpbmc6ICAgICAgICAgICAgICAgIGdvIHRoZXJlXG4gKiB0d28gc3RyaW5nczogICAgICAgICAgICAgICAgICAgIGdvIHRoZXJlIHdpdGggc2V0dGluZyBhIHRpdGxlXG4gKiB0d28gc3RyaW5ncyBhbmQgYm9vbGVhbjogICAgICAgIHJlcGxhY2UgaGlzdG9yeSB3aXRoIHNldHRpbmcgYSB0aXRsZVxuICogYSBzaW5nbGUgZnVuY3Rpb246ICAgICAgICAgICAgICBzZXQgYW4gYWN0aW9uIG9uIHRoZSBkZWZhdWx0IHJvdXRlXG4gKiBhIHN0cmluZy9SZWdFeHAgYW5kIGEgZnVuY3Rpb246IHNldCBhbiBhY3Rpb24gb24gdGhlIHJvdXRlXG4gKiBAcGFyYW0geyhzdHJpbmd8ZnVuY3Rpb24pfSBmaXJzdCAtIHBhdGggLyBhY3Rpb24gLyBmaWx0ZXJcbiAqIEBwYXJhbSB7KHN0cmluZ3xSZWdFeHB8ZnVuY3Rpb24pfSBzZWNvbmQgLSB0aXRsZSAvIGFjdGlvblxuICogQHBhcmFtIHtib29sZWFufSB0aGlyZCAtIHJlcGxhY2UgZmxhZ1xuICovXG5wcm90Lm0gPSBmdW5jdGlvbihmaXJzdCwgc2Vjb25kLCB0aGlyZCkge1xuICBpZiAoaXNTdHJpbmcoZmlyc3QpICYmICghc2Vjb25kIHx8IGlzU3RyaW5nKHNlY29uZCkpKSB7IGdvKGZpcnN0LCBzZWNvbmQsIHRoaXJkIHx8IGZhbHNlKTsgfVxuICBlbHNlIGlmIChzZWNvbmQpIHsgdGhpcy5yKGZpcnN0LCBzZWNvbmQpOyB9XG4gIGVsc2UgeyB0aGlzLnIoJ0AnLCBmaXJzdCk7IH1cbn07XG5cbi8qKlxuICogU3RvcCByb3V0aW5nXG4gKi9cbnByb3QucyA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLm9mZignKicpO1xuICB0aGlzLiQgPSBbXTtcbn07XG5cbi8qKlxuICogRW1pdFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBwYXRoXG4gKi9cbnByb3QuZSA9IGZ1bmN0aW9uKHBhdGgpIHtcbiAgdGhpcy4kLmNvbmNhdCgnQCcpLnNvbWUoZnVuY3Rpb24oZmlsdGVyKSB7XG4gICAgdmFyIGFyZ3MgPSAoZmlsdGVyID09PSAnQCcgPyBwYXJzZXIgOiBzZWNvbmRQYXJzZXIpKG5vcm1hbGl6ZShwYXRoKSwgbm9ybWFsaXplKGZpbHRlcikpO1xuICAgIGlmICh0eXBlb2YgYXJncyAhPSAndW5kZWZpbmVkJykge1xuICAgICAgdGhpc1tUUklHR0VSXS5hcHBseShudWxsLCBbZmlsdGVyXS5jb25jYXQoYXJncykpO1xuICAgICAgcmV0dXJuIHJvdXRlRm91bmQgPSB0cnVlIC8vIGV4aXQgZnJvbSBsb29wXG4gICAgfVxuICB9LCB0aGlzKTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgcm91dGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBmaWx0ZXIgLSBmaWx0ZXIgZm9yIG1hdGNoaW5nIHRvIHVybFxuICogQHBhcmFtIHtmdW5jdGlvbn0gYWN0aW9uIC0gYWN0aW9uIHRvIHJlZ2lzdGVyXG4gKi9cbnByb3QuciA9IGZ1bmN0aW9uKGZpbHRlciwgYWN0aW9uKSB7XG4gIGlmIChmaWx0ZXIgIT09ICdAJykge1xuICAgIGZpbHRlciA9ICcvJyArIG5vcm1hbGl6ZShmaWx0ZXIpO1xuICAgIHRoaXMuJC5wdXNoKGZpbHRlcik7XG4gIH1cbiAgdGhpcy5vbihmaWx0ZXIsIGFjdGlvbik7XG59O1xuXG52YXIgbWFpblJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbnZhciByb3V0ZSA9IG1haW5Sb3V0ZXIubS5iaW5kKG1haW5Sb3V0ZXIpO1xuXG4vKipcbiAqIENyZWF0ZSBhIHN1YiByb3V0ZXJcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gdGhlIG1ldGhvZCBvZiBhIG5ldyBSb3V0ZXIgb2JqZWN0XG4gKi9cbnJvdXRlLmNyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgbmV3U3ViUm91dGVyID0gbmV3IFJvdXRlcigpO1xuICAvLyBhc3NpZ24gc3ViLXJvdXRlcidzIG1haW4gbWV0aG9kXG4gIHZhciByb3V0ZXIgPSBuZXdTdWJSb3V0ZXIubS5iaW5kKG5ld1N1YlJvdXRlcik7XG4gIC8vIHN0b3Agb25seSB0aGlzIHN1Yi1yb3V0ZXJcbiAgcm91dGVyLnN0b3AgPSBuZXdTdWJSb3V0ZXIucy5iaW5kKG5ld1N1YlJvdXRlcik7XG4gIHJldHVybiByb3V0ZXJcbn07XG5cbi8qKlxuICogU2V0IHRoZSBiYXNlIG9mIHVybFxuICogQHBhcmFtIHsoc3RyfFJlZ0V4cCl9IGFyZyAtIGEgbmV3IGJhc2Ugb3IgJyMnIG9yICcjISdcbiAqL1xucm91dGUuYmFzZSA9IGZ1bmN0aW9uKGFyZykge1xuICBiYXNlID0gYXJnIHx8ICcjJztcbiAgY3VycmVudCA9IGdldFBhdGhGcm9tQmFzZSgpOyAvLyByZWNhbGN1bGF0ZSBjdXJyZW50IHBhdGhcbn07XG5cbi8qKiBFeGVjIHJvdXRpbmcgcmlnaHQgbm93ICoqL1xucm91dGUuZXhlYyA9IGZ1bmN0aW9uKCkge1xuICBlbWl0KHRydWUpO1xufTtcblxuLyoqXG4gKiBSZXBsYWNlIHRoZSBkZWZhdWx0IHJvdXRlciB0byB5b3Vyc1xuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4gLSB5b3VyIHBhcnNlciBmdW5jdGlvblxuICogQHBhcmFtIHtmdW5jdGlvbn0gZm4yIC0geW91ciBzZWNvbmRQYXJzZXIgZnVuY3Rpb25cbiAqL1xucm91dGUucGFyc2VyID0gZnVuY3Rpb24oZm4sIGZuMikge1xuICBpZiAoIWZuICYmICFmbjIpIHtcbiAgICAvLyByZXNldCBwYXJzZXIgZm9yIHRlc3RpbmcuLi5cbiAgICBwYXJzZXIgPSBERUZBVUxUX1BBUlNFUjtcbiAgICBzZWNvbmRQYXJzZXIgPSBERUZBVUxUX1NFQ09ORF9QQVJTRVI7XG4gIH1cbiAgaWYgKGZuKSB7IHBhcnNlciA9IGZuOyB9XG4gIGlmIChmbjIpIHsgc2Vjb25kUGFyc2VyID0gZm4yOyB9XG59O1xuXG4vKipcbiAqIEhlbHBlciBmdW5jdGlvbiB0byBnZXQgdXJsIHF1ZXJ5IGFzIGFuIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gcGFyc2VkIHF1ZXJ5XG4gKi9cbnJvdXRlLnF1ZXJ5ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBxID0ge307XG4gIHZhciBocmVmID0gbG9jLmhyZWYgfHwgY3VycmVudDtcbiAgaHJlZi5yZXBsYWNlKC9bPyZdKC4rPyk9KFteJl0qKS9nLCBmdW5jdGlvbihfLCBrLCB2KSB7IHFba10gPSB2OyB9KTtcbiAgcmV0dXJuIHFcbn07XG5cbi8qKiBTdG9wIHJvdXRpbmcgKiovXG5yb3V0ZS5zdG9wID0gZnVuY3Rpb24gKCkge1xuICBpZiAoc3RhcnRlZCkge1xuICAgIGlmICh3aW4pIHtcbiAgICAgIHdpbltSRU1PVkVfRVZFTlRfTElTVEVORVJdKFBPUFNUQVRFLCBkZWJvdW5jZWRFbWl0KTtcbiAgICAgIHdpbltSRU1PVkVfRVZFTlRfTElTVEVORVJdKEhBU0hDSEFOR0UsIGRlYm91bmNlZEVtaXQpO1xuICAgICAgZG9jW1JFTU9WRV9FVkVOVF9MSVNURU5FUl0oY2xpY2tFdmVudCwgY2xpY2spO1xuICAgIH1cbiAgICBjZW50cmFsW1RSSUdHRVJdKCdzdG9wJyk7XG4gICAgc3RhcnRlZCA9IGZhbHNlO1xuICB9XG59O1xuXG4vKipcbiAqIFN0YXJ0IHJvdXRpbmdcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gYXV0b0V4ZWMgLSBhdXRvbWF0aWNhbGx5IGV4ZWMgYWZ0ZXIgc3RhcnRpbmcgaWYgdHJ1ZVxuICovXG5yb3V0ZS5zdGFydCA9IGZ1bmN0aW9uIChhdXRvRXhlYykge1xuICBpZiAoIXN0YXJ0ZWQpIHtcbiAgICBpZiAod2luKSB7XG4gICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykgeyBzdGFydChhdXRvRXhlYyk7IH1cbiAgICAgIC8vIHRoZSB0aW1lb3V0IGlzIG5lZWRlZCB0byBzb2x2ZVxuICAgICAgLy8gYSB3ZWlyZCBzYWZhcmkgYnVnIGh0dHBzOi8vZ2l0aHViLmNvbS9yaW90L3JvdXRlL2lzc3Vlcy8zM1xuICAgICAgZWxzZSB7IHdpbltBRERfRVZFTlRfTElTVEVORVJdKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHN0YXJ0KGF1dG9FeGVjKTsgfSwgMSk7XG4gICAgICB9KTsgfVxuICAgIH1cbiAgICBzdGFydGVkID0gdHJ1ZTtcbiAgfVxufTtcblxuLyoqIFByZXBhcmUgdGhlIHJvdXRlciAqKi9cbnJvdXRlLmJhc2UoKTtcbnJvdXRlLnBhcnNlcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvdXRlO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Jpb3Qtcm91dGUvZGlzdC9janMucm91dGUuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCI7KGZ1bmN0aW9uKHdpbmRvdywgdW5kZWZpbmVkKSB7dmFyIG9ic2VydmFibGUgPSBmdW5jdGlvbihlbCkge1xuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIG9yaWdpbmFsIG9iamVjdCBvciBjcmVhdGUgYSBuZXcgZW1wdHkgb25lXG4gICAqIEB0eXBlIHsgT2JqZWN0IH1cbiAgICovXG5cbiAgZWwgPSBlbCB8fCB7fVxuXG4gIC8qKlxuICAgKiBQcml2YXRlIHZhcmlhYmxlc1xuICAgKi9cbiAgdmFyIGNhbGxiYWNrcyA9IHt9LFxuICAgIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlXG5cbiAgLyoqXG4gICAqIFB1YmxpYyBBcGlcbiAgICovXG5cbiAgLy8gZXh0ZW5kIHRoZSBlbCBvYmplY3QgYWRkaW5nIHRoZSBvYnNlcnZhYmxlIG1ldGhvZHNcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoZWwsIHtcbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGBldmVudGAgYW5kc1xuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgZWFjaCB0aW1lIGFuIGV2ZW50IGlzIHRyaWdnZXJlZC5cbiAgICAgKiBAcGFyYW0gIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb246IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBmbiA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgIChjYWxsYmFja3NbZXZlbnRdID0gY2FsbGJhY2tzW2V2ZW50XSB8fCBbXSkucHVzaChmbilcbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGdpdmVuIGBldmVudGAgbGlzdGVuZXJzXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb2ZmOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmIChldmVudCA9PSAnKicgJiYgIWZuKSBjYWxsYmFja3MgPSB7fVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBjYWxsYmFja3NbZXZlbnRdXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgY2I7IGNiID0gYXJyICYmIGFycltpXTsgKytpKSB7XG4gICAgICAgICAgICAgIGlmIChjYiA9PSBmbikgYXJyLnNwbGljZShpLS0sIDEpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGRlbGV0ZSBjYWxsYmFja3NbZXZlbnRdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRcbiAgICAgKiBleGVjdXRlIHRoZSBgY2FsbGJhY2tgIGF0IG1vc3Qgb25jZVxuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9uZToge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBmdW5jdGlvbiBvbigpIHtcbiAgICAgICAgICBlbC5vZmYoZXZlbnQsIG9uKVxuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsLm9uKGV2ZW50LCBvbilcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogRXhlY3V0ZSBhbGwgY2FsbGJhY2sgZnVuY3Rpb25zIHRoYXQgbGlzdGVuIHRvXG4gICAgICogdGhlIGdpdmVuIGBldmVudGBcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgdHJpZ2dlcjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gZ2V0dGluZyB0aGUgYXJndW1lbnRzXG4gICAgICAgIHZhciBhcmdsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMSxcbiAgICAgICAgICBhcmdzID0gbmV3IEFycmF5KGFyZ2xlbiksXG4gICAgICAgICAgZm5zLFxuICAgICAgICAgIGZuLFxuICAgICAgICAgIGlcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnbGVuOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXSAvLyBza2lwIGZpcnN0IGFyZ3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICBmbnMgPSBzbGljZS5jYWxsKGNhbGxiYWNrc1tldmVudF0gfHwgW10sIDApXG5cbiAgICAgICAgZm9yIChpID0gMDsgZm4gPSBmbnNbaV07ICsraSkge1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmdzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNhbGxiYWNrc1snKiddICYmIGV2ZW50ICE9ICcqJylcbiAgICAgICAgICBlbC50cmlnZ2VyLmFwcGx5KGVsLCBbJyonLCBldmVudF0uY29uY2F0KGFyZ3MpKVxuXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gZWxcblxufVxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAvLyBzdXBwb3J0IENvbW1vbkpTLCBBTUQgJiBicm93c2VyXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBvYnNlcnZhYmxlXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7IHJldHVybiBvYnNlcnZhYmxlIH0pXG4gIGVsc2VcbiAgICB3aW5kb3cub2JzZXJ2YWJsZSA9IG9ic2VydmFibGVcblxufSkodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHVuZGVmaW5lZCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L3Jpb3Qtb2JzZXJ2YWJsZS9kaXN0L29ic2VydmFibGUuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcbnJpb3QudGFnMignbmF2YmFyJywgJzxuYXYgY2xhc3M9XCJuYXZiYXJcIj4gPHVsIGNsYXNzPVwibmF2YmFyLW5hdiB7b3BlbjogaXNPcGVufVwiPiA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPjxhIGNsYXNzPVwibmF2LWFuY2hvclwiIGhyZWY9XCIjL3NlYXJjaFwiPiA8ZGl2IGNsYXNzPVwiaWNvbiBpb24tYW5kcm9pZC1zZWFyY2hcIj48L2Rpdj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+5qSc57SiPC9kaXY+PC9hPjwvbGk+IDxsaSBjbGFzcz1cIm5hdi1pdGVtXCI+PGEgY2xhc3M9XCJuYXYtYW5jaG9yXCIgaHJlZj1cIiMvc2NoZWR1bGVcIj4gPGRpdiBjbGFzcz1cImljb24gaW9uLWlvcy1jYWxlbmRhci1vdXRsaW5lXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPuaZgumWk+WJsjwvZGl2PjwvYT48L2xpPiA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPjxhIGNsYXNzPVwibmF2LWFuY2hvclwiIGhyZWY9XCIjL2luZm9cIj4gPGRpdiBjbGFzcz1cImljb24gaW9uLWlvcy1pbmZvcm1hdGlvbi1vdXRsaW5lXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPuOBiuOBl+OCieOBmzwvZGl2PjwvYT48L2xpPiA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPjxzcGFuIGNsYXNzPVwibmF2LWFuY2hvclwiPiA8ZGl2IGNsYXNzPVwiaWNvbiBpb24taW9zLWdyaWQtdmlldy1vdXRsaW5lXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPua6luWCmeS4rTwvZGl2Pjwvc3Bhbj48L2xpPiA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPjxhIGNsYXNzPVwibmF2LWFuY2hvclwiIGhyZWY9XCIvL3d3dy51YmUtay5hYy5qcC9oYWt1Y2hvLWRvbWl0b3J5L1wiIHRhcmdldD1cIl9ibGFua1wiPiA8ZGl2IGNsYXNzPVwiaWNvbiBpb24taW9zLWhvbWUtb3V0bGluZVwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7nmb3ps6Xlr648L2Rpdj48L2E+PC9saT4gPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1hbmNob3JcIiBocmVmPVwiLy90d2l0dGVyLmNvbS91c3dhbjJfXCIgdGFyZ2V0PVwiX2JsYW5rXCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1zb2NpYWwtdHdpdHRlci1vdXRsaW5lXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPlR3aXR0ZXI8L2Rpdj48L2E+PC9saT4gPC91bD4gPGRpdiBjbGFzcz1cIm5hdi1sYXJnZVwiPjxhIGNsYXNzPVwibmF2LWxhcmdlLXdyYXBwZXJcIiBocmVmPVwiIy9tZW51XCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1jb2ZmZWVcIj48L2Rpdj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+54yu56uL6KGoPC9kaXY+PC9hPjwvZGl2PiA8ZGl2IGNsYXNzPVwibmF2LW1vcmVcIj48YSBjbGFzcz1cIm5hdi1hbmNob3Ige29wZW46IGlzT3Blbn1cIiBocmVmPVwiI1wiIG9uY2xpY2s9XCJ7dG9nZ2xlTW9yZU1lbnV9XCI+IDxkaXYgY2xhc3M9XCJuYXZpY29uIGlvbi1uYXZpY29uXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJjbG9zZXIgaW9uLWFuZHJvaWQtY2xvc2VcIj48L2Rpdj48L2E+PC9kaXY+IDwvbmF2PiA8c2lkZS1tZW51Pjwvc2lkZS1tZW51PicsICduYXZiYXIgLm5hdmJhcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyeyBwb3NpdGlvbjogZml4ZWQ7IGJvdHRvbTogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMDsgcGFkZGluZzogMCA2MHB4IDAgMTEwcHg7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IHotaW5kZXg6IDEwMDsgfSBuYXZiYXIgLm5hdmJhciAubmF2YmFyLW5hdixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXZiYXItbmF2eyBoZWlnaHQ6IDExMHB4OyBtYXJnaW46IDAgLTYwcHggMCAtNTVweDsgcGFkZGluZzogMCA2MHB4IDAgNTVweDsgYmFja2dyb3VuZDogI2ZmZjsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01NXB4KTsgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTsgfSBuYXZiYXIgLm5hdmJhciAubmF2YmFyLW5hdi5vcGVuLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYub3BlbnsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMTBweCk7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVteyBmbG9hdDogbGVmdDsgd2lkdGg6IDMzLjMzMyU7IGhlaWdodDogNTVweDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IG5hdmJhciAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvcnsgZGlzcGxheTogYmxvY2s7IHBhZGRpbmc6IDVweCAwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGNvbG9yOiAjMjIyOyB9IG5hdmJhciAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvciAuaWNvbixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvciAuaWNvbnsgbGluZS1oZWlnaHQ6IDMwcHg7IGZvbnQtc2l6ZTogMjVweDsgfSBuYXZiYXIgLm5hdmJhciAubmF2YmFyLW5hdiAubmF2LWl0ZW0gLm5hdi1hbmNob3IgLmxhYmVsLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yIC5sYWJlbHsgbGluZS1oZWlnaHQ6IDE1cHg7IGZvbnQtc2l6ZTogMTBweDsgfSBuYXZiYXIgLm5hdmJhciAubmF2LWxhcmdlLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1sYXJnZXsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMTBweDsgaGVpZ2h0OiAxMTBweDsgYmFja2dyb3VuZDogI2ZmZjsgYm9yZGVyLXJhZGl1czogMTAwJTsgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDsgfSBuYXZiYXIgLm5hdmJhciAubmF2LWxhcmdlIC5uYXYtbGFyZ2Utd3JhcHBlcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyeyBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogOTZweDsgaGVpZ2h0OiA5NnB4OyBtYXJnaW46IDVweDsgYm9yZGVyLXJhZGl1czogMTAwJTsgYm9yZGVyOiAycHggc29saWQgIzIyMjsgY29sb3I6ICMyMjI7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1sYXJnZSAubmF2LWxhcmdlLXdyYXBwZXIgLmljb24sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LWxhcmdlIC5uYXYtbGFyZ2Utd3JhcHBlciAuaWNvbnsgZm9udC1zaXplOiA0MHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiA4MHB4OyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyIC5sYWJlbCxbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyIC5sYWJlbHsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDVweDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzVweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDEycHg7IGxpbmUtaGVpZ2h0OiAzNXB4OyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbW9yZSxbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbW9yZXsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDA7IHJpZ2h0OiAwOyBvdmVyZmxvdzogaGlkZGVuOyB3aWR0aDogNjBweDsgaGVpZ2h0OiA1NXB4OyBmb250LXNpemU6IDM2cHg7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yeyBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGJsb2NrOyBjb2xvcjogIzIyMjsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgPiBkaXYsW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgPiBkaXZ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDYwcHg7IGhlaWdodDogNTVweDsgdGV4dC1hbGlnbjogY2VudGVyOyBsaW5lLWhlaWdodDogNTVweDsgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgLm5hdmljb24sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgLm5hdmljb257IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgLmNsb3NlcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvciAuY2xvc2VyeyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTJweCk7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yLm9wZW4gLm5hdmljb24sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3Iub3BlbiAubmF2aWNvbnsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMnB4KTsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3Iub3BlbiAuY2xvc2VyLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yLm9wZW4gLmNsb3Nlcnsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9JywgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbnZhciBfdGhpcyA9IHRoaXM7XG5cbmNvbnN0IHUgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscycpO1xuY29uc3Qgb2JzID0gdS5vYnNlcnZhYmxlKCk7XG5cbnRoaXMuaXNPcGVuID0gZmFsc2U7XG50aGlzLnRvZ2dsZU1vcmVNZW51ID0gZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIF90aGlzLmlzT3BlbiA9ICFfdGhpcy5pc09wZW47XG4gICAgb2JzLnRyaWdnZXIoJ3NpZGUtbWVudTp0b2dnbGUnKTtcbn07XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9jb21tb24vbmF2YmFyLnRhZyIsImltcG9ydCBvYnNlcnZhYmxlIGZyb20gJ3Jpb3Qtb2JzZXJ2YWJsZSc7XHJcblxyXG5jb25zdCBvYnMgPSBvYnNlcnZhYmxlKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG9ic2VydmFibGU6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gb2JzO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJpbXBvcnQgcm91dGUgZnJvbSAncmlvdC1yb3V0ZSc7XHJcblxyXG5yb3V0ZSgnLycsICgpID0+IHtcclxuICAgIGxvY2F0aW9uLmhhc2ggPSAnIy9tZW51JztcclxufSk7XHJcblxyXG5yb3V0ZSgnL21lbnUnLCAoKSA9PiB7XHJcbiAgICByZXF1aXJlKCcuLi90YWdzL3B1YmxpYy9tZW51Jyk7XHJcbiAgICByZXF1aXJlKCcuLi90YWdzL3B1YmxpYy9kYWlseS1tZW51Jyk7XHJcbiAgICByZXF1aXJlKCcuLi90YWdzL3B1YmxpYy9tZW51LWl0ZW0nKTtcclxuICAgIHJpb3QubW91bnQoJ3JvdXRlcicsICdtZW51Jyk7XHJcbn0pO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICBzdGFydDogKCkgPT4ge1xyXG4gICAgICAgIHJvdXRlLnN0YXJ0KHRydWUpO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvcHVibGljL3JvdXRlci5qcyIsIlxucmlvdC50YWcyKCdtZW51JywgJzxkYWlseS1tZW51PjwvZGFpbHktbWVudT4gPGgyPjxzcGFuIGNsYXNzPVwiamFcIj7vvJLmnIg8L3NwYW4+PHNwYW4gY2xhc3M9XCJlblwiPkZlYnJ1YXJ5PC9zcGFuPjwvaDI+IDxtZW51LWl0ZW0+PC9tZW51LWl0ZW0+IDxtZW51LWl0ZW0+PC9tZW51LWl0ZW0+IDxtZW51LWl0ZW0+PC9tZW51LWl0ZW0+IDxtZW51LWl0ZW0+PC9tZW51LWl0ZW0+IDxtZW51LWl0ZW0+PC9tZW51LWl0ZW0+IDxtZW51LWl0ZW0+PC9tZW51LWl0ZW0+JywgJ21lbnUgaDIsW2RhdGEtaXM9XCJtZW51XCJdIGgyeyBtYXJnaW46IDEycHggMTBweDsgfSBtZW51IGgyIC5qYSxbZGF0YS1pcz1cIm1lbnVcIl0gaDIgLmpheyBmb250LXNpemU6IDI0cHg7IH0gbWVudSBoMiAuZW4sW2RhdGEtaXM9XCJtZW51XCJdIGgyIC5lbnsgZm9udC1zaXplOiAxNHB4OyB9JywgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3RhZ3MvcHVibGljL21lbnUudGFnIiwiXG5yaW90LnRhZzIoJ3NpZGUtbWVudScsICc8ZGl2IGNsYXNzPVwic2lkZS1tZW51IHtvcGVuOiBpc09wZW59XCI+IDxoZWFkZXI+IDxkaXYgY2xhc3M9XCJicmFuZFwiPuODh+OCuOOCv+ODq+eJiCDnmb3ps6Xlr67njK7nq4vooag8L2Rpdj4gPC9oZWFkZXI+IDxtYWluPiA8ZGl2IGNsYXNzPVwicHJlZmVyZW5jZXNcIj4gPGgzPuODleOCo+ODvOODieODkOODg+OCrzwvaDM+IDxwPuOBlOaMh+aRmOODu+OBlOaEj+imi+OBquOBqeOBiuawl+i7veOBq+OBiumAgeOCiuOBj+OBoOOBleOBhO+8gTwvcD4gPGZvcm0gY2xhc3M9XCJmZWVkYmFjay1mb3JtXCIgb25zdWJtaXQ9XCJyZXR1cm4gZmFsc2VcIj4gPHRleHRhcmVhIHBsYWNlaG9sZGVyPVwi5YaF5a6544Gv5YWs6ZaL44GV44KM44G+44GZ44CC5YCL5Lq65oOF5aCx44Gu6KiY6LyJ44Gv44GU6YGg5oWu5LiL44GV44GE44CCXCI+PC90ZXh0YXJlYT4gPC9mb3JtPiA8aDM+6Kit5a6aPC9oMz4gPGRsPiA8ZHQ+5pyA5Yid44Gr6KGo56S644GZ44KL44Oa44O844K4PC9kdD4gPGRkPiA8ZGl2IGNsYXNzPVwic2VsZWN0LWZ1bGxcIj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+e2ZpcnN0VmFsdWUgfHwgXFwn5LuK5pyI44Gu54yu56uLXFwnfTwvZGl2PiA8c2VsZWN0IGNsYXNzPVwiaW5wdXRcIiBvbmNoYW5nZT1cInt1cGRhdGVGaXJzdFZpZXd9XCI+IDxvcHRpb24gdmFsdWU9XCIjL21lbnVcIj7ku4rml6XjgYvjgonjga7njK7nq4s8L29wdGlvbj4gPG9wdGlvbiB2YWx1ZT1cIlwiPuaZgumWk+WJsjwvb3B0aW9uPiA8b3B0aW9uIHZhbHVlPVwiXCI+44GK44GX44KJ44GbPC9vcHRpb24+IDwvc2VsZWN0PiA8L2Rpdj4gPC9kZD4gPGR0PuODh+ODleOCqeODq+ODiOOBruOCr+ODqeOCuSA8ZGl2IGNsYXNzPVwic2VsZWN0XCI+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPjwvZGl2PiA8L2Rpdj4gPC9kdD4gPC9kbD4gPC9kaXY+IDwvbWFpbj4gPC9kaXY+JywgJ3NpZGUtbWVudSAuc2lkZS1tZW51LFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnV7IHBvc2l0aW9uOiBmaXhlZDsgdG9wOiAwOyByaWdodDogLTI0MHB4OyBib3R0b206IDU1cHg7IG92ZXJmbG93LXk6IGF1dG87IHdpZHRoOiAyNDBweDsgcGFkZGluZy1ib3R0b206IDU1cHg7IGJhY2tncm91bmQ6ICNmZmY7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IHRyYW5zaXRpb246IHJpZ2h0IDAuM3MgZWFzZTsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudS5vcGVuLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUub3BlbnsgcmlnaHQ6IDA7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgaGVhZGVyLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgaGVhZGVyeyBwb3NpdGlvbjogcmVsYXRpdmU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEyMHB4OyBiYWNrZ3JvdW5kOiAjYWQxNTE0OyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IGhlYWRlciAuYnJhbmQsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBoZWFkZXIgLmJyYW5keyBoZWlnaHQ6IDEyMHB4OyBjb2xvcjogI2ZmZjsgdGV4dC1hbGlnbjogY2VudGVyOyBsaW5lLWhlaWdodDogMTIwcHg7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgaGVhZGVyIC52ZXJzaW9uLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgaGVhZGVyIC52ZXJzaW9ueyBwb3NpdGlvbjogYWJzb2x1dGU7IHRvcDogMDsgcmlnaHQ6IDA7IG1hcmdpbjogNXB4IDhweDsgY29sb3I6IHJnYmEoMjU1LDI1NSwyNTUsMC40KTsgZm9udC1zaXplOiAxMHB4OyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4sW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWlueyBiYWNrZ3JvdW5kOiAjZmZmOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLm1lbnUtbmF2LFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAubWVudS1uYXZ7IHBhZGRpbmc6IDI1cHggMDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5tZW51LW5hdiAubmF2LWl0ZW0gLm5hdi1hbmNob3IsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5tZW51LW5hdiAubmF2LWl0ZW0gLm5hdi1hbmNob3J7IGRpc3BsYXk6IGJsb2NrOyBoZWlnaHQ6IDUwcHg7IHBhZGRpbmc6IDAgMjBweDsgZm9udC1zaXplOiAxNXB4OyBsaW5lLWhlaWdodDogNTBweDsgY29sb3I6ICM0NDRhNWE7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzeyBtYXJnaW46IDAgMTVweCAwOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGgzLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgaDN7IGNvbG9yOiAjNDQ0OyBmb250LXNpemU6IDE2cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGR0LFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZHR7IGZvbnQtc2l6ZTogMTRweDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkZCAuc2VsZWN0LWZ1bGwsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkZCAuc2VsZWN0LWZ1bGx7IHBvc2l0aW9uOiByZWxhdGl2ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzVweDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkZCAuc2VsZWN0LWZ1bGwgLmxhYmVsLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZGQgLnNlbGVjdC1mdWxsIC5sYWJlbHsgcG9zaXRpb246IGFic29sdXRlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAzNXB4OyBiYWNrZ3JvdW5kOiAjZmZmOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyBib3JkZXI6IDFweCBzb2xpZCAjY2NjOyBib3JkZXItcmFkaXVzOiA1cHg7IGxpbmUtaGVpZ2h0OiAzNXB4OyBmb250LXNpemU6IDEycHg7IHRleHQtYWxpZ246IGNlbnRlcjsgei1pbmRleDogMTsgcG9pbnRlci1ldmVudHM6IG5vbmU7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZGQgLnNlbGVjdC1mdWxsIC5pbnB1dCxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGRkIC5zZWxlY3QtZnVsbCAuaW5wdXR7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDM1cHg7IH0nLCAnJywgZnVuY3Rpb24ob3B0cykge1xudmFyIF90aGlzID0gdGhpcztcblxuY29uc3QgdSA9IHJlcXVpcmUoJy4uLy4uLy4uL3V0aWxzJyk7XG5cbmNvbnN0IG9icyA9IHUub2JzZXJ2YWJsZSgpO1xuXG50aGlzLnVwZGF0ZUZpcnN0VmlldyA9IGUgPT4ge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBfdGhpcy5maXJzdFZhbHVlID0gZS50YXJnZXQuc2VsZWN0ZWRPcHRpb25zWzBdLnRleHQ7XG59O1xuXG50aGlzLmlzT3BlbiA9IGZhbHNlO1xuXG5vYnMub24oJ3NpZGUtbWVudTp0b2dnbGUnLCAoKSA9PiB7XG4gICAgX3RoaXMuaXNPcGVuID0gIV90aGlzLmlzT3BlbjtcbiAgICBfdGhpcy51cGRhdGUoKTtcbn0pO1xuXG5vYnMub24oJ3NpZGUtbWVudTpvcGVuJywgKCkgPT4ge1xuICAgIF90aGlzLmlzT3BlbiA9IHRydWU7XG4gICAgX3RoaXMudXBkYXRlKCk7XG59KTtcblxub2JzLm9uKCdzaWRlLW1lbnU6Y2xvc2UnLCAoKSA9PiB7XG4gICAgX3RoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgX3RoaXMudXBkYXRlKCk7XG59KTtcbn0pO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3RhZ3MvcHVibGljL2NvbW1vbi9zaWRlLW1lbnUudGFnIiwiXG5yaW90LnRhZzIoJ2RhaWx5LW1lbnUnLCAnPGRpdiBjbGFzcz1cImRhaWx5LW1lbnVcIj4gPGRpdiBjbGFzcz1cImhlYWRlclwiPuS7iuaXpeOBrueMruerizwvZGl2PiA8ZGl2IGNsYXNzPVwibWFpblwiPiA8ZGl2IGNsYXNzPVwibWVudS1pdGVtIHtvcGVuOiBpc09wZW4gPT0gXFwnYnJlYWtmYXN0XFwnLCBkYWlseU1lbnVJbml0OiBpbml0ID09IFxcJ2JyZWFrZmFzdFxcJ31cIiBpZD1cImRhaWx5TWVudS1icmVha2Zhc3RcIiBvbmNsaWNrPVwie29wZW4oXFwnYnJlYWtmYXN0XFwnKX1cIj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+5pydPC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LWJvZHlcIj4gPGRpdiBjbGFzcz1cIm1lbnUtbWFpblwiPiA8ZGl2IGNsYXNzPVwibWFpbi1icmVha2Zhc3RcIj48c3BhbiBjbGFzcz1cIm1haW4taXRlbVwiIGlmPVwie3RvZGF5LmJyZWFrZmFzdC5qYXB9XCI+e3RvZGF5LmJyZWFrZmFzdC5qYXB9PC9zcGFuPjxzcGFuIGNsYXNzPVwibWFpbi1pdGVtXCIgaWY9XCJ7dG9kYXkuYnJlYWtmYXN0Lndlc31cIj57dG9kYXkuYnJlYWtmYXN0Lndlc308L3NwYW4+PC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudS1zaWRlXCI+IDx1bD4gPGxpIGVhY2g9XCJ7aXRlbSBpbiB0b2RheS5icmVha2Zhc3Quc2lkZX1cIj57aXRlbX08L2xpPiA8L3VsPiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudS1pdGVtIHtvcGVuOiBpc09wZW4gPT0gXFwnbHVuY2hcXCcsIGRhaWx5TWVudUluaXQ6IGluaXQgPT0gXFwnbHVuY2hcXCd9XCIgaWQ9XCJkYWlseU1lbnUtbHVuY2hcIiBvbmNsaWNrPVwie29wZW4oXFwnbHVuY2hcXCcpfVwiPiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7mmLw8L2Rpdj4gPGRpdiBjbGFzcz1cIm1lbnUtYm9keVwiPiA8ZGl2IGNsYXNzPVwibWVudS1tYWluXCI+e3RvZGF5Lmx1bmNoLm1haW59PC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LXNpZGVcIj4gPHVsPiA8bGkgZWFjaD1cIntpdGVtIGluIHRvZGF5Lmx1bmNoLnNpZGV9XCI+e2l0ZW19PC9saT4gPC91bD4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cIm1lbnUtaXRlbSB7b3BlbjogaXNPcGVuID09IFxcJ2Rpbm5lclxcJywgZGFpbHlNZW51SW5pdDogaW5pdCA9PSBcXCdkaW5uZXJcXCd9XCIgaWQ9XCJkYWlseU1lbnUtZGlubmVyXCIgb25jbGljaz1cIntvcGVuKFxcJ2Rpbm5lclxcJyl9XCI+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPuWknDwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudS1ib2R5XCI+IDxkaXYgY2xhc3M9XCJtZW51LW1haW5cIj4gPGRpdiBjbGFzcz1cIm1haW4tZGlubmVyXCI+PHNwYW4gY2xhc3M9XCJtYWluLWFcIj57dG9kYXkuZGlubmVyLmF9PC9zcGFuPjxzcGFuIGNsYXNzPVwibWFpbi1iXCI+e3RvZGF5LmRpbm5lci5ifTwvc3Bhbj48L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LXNpZGVcIj4gPHVsPiA8bGkgZWFjaD1cIntpdGVtIGluIHRvZGF5LmRpbm5lci5zaWRlfVwiPntpdGVtfTwvbGk+IDwvdWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4nLCAnZGFpbHktbWVudSAuZGFpbHktbWVudSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnV7IG1hcmdpbjogMTBweCA1JTsgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjM1KTsgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjE0KSwgMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwwLjIpLCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLDAuMTIpOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLmhlYWRlcixbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLmhlYWRlcnsgd2lkdGg6IDEwMCU7IGhlaWdodDogNDBweDsgY29sb3I6IHJnYmEoNTEsNTEsNTEsMC44KTsgZm9udC1zaXplOiAxNHB4OyBsaW5lLWhlaWdodDogNDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbXsgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgcGFkZGluZzogOHB4IDU1cHggOHB4IDIwcHg7IHRyYW5zaXRpb246IGJhY2tncm91bmQgMC42cyBlYXNlOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubGFiZWwsW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLmxhYmVseyB3aWR0aDogMjBweDsgaGVpZ2h0OiAyMHB4OyBtYXJnaW4tcmlnaHQ6IDE1cHg7IGJvcmRlcjogMXB4IHNvbGlkICMzMzM7IGJvcmRlci1yYWRpdXM6IDEwMCU7IGZvbnQtc2l6ZTogMTFweDsgdGV4dC1hbGlnbjogY2VudGVyOyBsaW5lLWhlaWdodDogMjBweDsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5eyBmbGV4OiAxOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4sW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWlueyBtYXJnaW46IDhweCAwOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGZvbnQtc2l6ZTogMThweDsgbGluZS1oZWlnaHQ6IDI4cHg7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1icmVha2Zhc3Qgc3BhbjpudGgtY2hpbGQoMik6OmJlZm9yZSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tYnJlYWtmYXN0IHNwYW46bnRoLWNoaWxkKDIpOjpiZWZvcmV7IGNvbnRlbnQ6IFxcJy9cXCc7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3BhbixbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tZGlubmVyIHNwYW57IGRpc3BsYXk6IGJsb2NrOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tZGlubmVyIHNwYW46bm90KDpmaXJzdC1jaGlsZCksW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuOm5vdCg6Zmlyc3QtY2hpbGQpeyBtYXJnaW4tdG9wOiA4cHg7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3Bhbi5tYWluLWE6OmJlZm9yZSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tZGlubmVyIHNwYW4ubWFpbi1hOjpiZWZvcmUsZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3Bhbi5tYWluLWI6OmJlZm9yZSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LW1haW4gLm1haW4tZGlubmVyIHNwYW4ubWFpbi1iOjpiZWZvcmV7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgd2lkdGg6IDE4cHg7IGhlaWdodDogMThweDsgbWFyZ2luLXJpZ2h0OiAwLjRlbTsgbGluZS1oZWlnaHQ6IDE2cHg7IGZvbnQtc2l6ZTogMTZweDsgYmFja2dyb3VuZDogIzMzMzsgY29sb3I6ICNlZWU7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMXB4KTsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuLm1haW4tYTo6YmVmb3JlLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3Bhbi5tYWluLWE6OmJlZm9yZXsgY29udGVudDogXFwnQVxcJzsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1tYWluIC5tYWluLWRpbm5lciBzcGFuLm1haW4tYjo6YmVmb3JlLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtbWFpbiAubWFpbi1kaW5uZXIgc3Bhbi5tYWluLWI6OmJlZm9yZXsgY29udGVudDogXFwnQlxcJzsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRlLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtc2lkZXsgcG9zaXRpb246IHJlbGF0aXZlOyBvdmVyZmxvdzogaGlkZGVuOyBoZWlnaHQ6IDA7IHRyYW5zaXRpb246IGhlaWdodCAwLjRzIDAuM3MgZWFzZTsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRlOjpiZWZvcmUsW2RhdGEtaXM9XCJkYWlseS1tZW51XCJdIC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRlOjpiZWZvcmV7IGNvbnRlbnQ6IFxcJ1xcJzsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDEwcHg7IGxlZnQ6IDUwJTsgd2lkdGg6IDMwcHg7IG1hcmdpbi1sZWZ0OiAtMTVweDsgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCAjNDQ0OyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LXNpZGU6OmFmdGVyLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtc2lkZTo6YWZ0ZXJ7IGNvbnRlbnQ6IFxcJ1xcJzsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDEwcHg7IGxlZnQ6IDUwJTsgd2lkdGg6IDNweDsgaGVpZ2h0OiAzcHg7IG1hcmdpbjogLTIuNXB4OyBib3JkZXI6IDFweCBzb2xpZCAjNDQ0OyBiYWNrZ3JvdW5kOiAjZmZmOyB0cmFuc2Zvcm06IHJvdGF0ZSg0NWRlZyk7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtc2lkZSBsaSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LXNpZGUgbGl7IG1hcmdpbi1ib3R0b206IDEwcHg7IGZvbnQtc2l6ZTogMTRweDsgbGluZS1oZWlnaHQ6IDIwcHg7IHRleHQtYWxpZ246IGNlbnRlcjsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLm1lbnUtYm9keSAubWVudS1zaWRlIGxpOmZpcnN0LWNoaWxkLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtc2lkZSBsaTpmaXJzdC1jaGlsZHsgbWFyZ2luLXRvcDogMzBweDsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0ub3BlbixbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbS5vcGVueyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuOCk7IH0nLCAnJywgZnVuY3Rpb24ob3B0cykge1xudmFyIF90aGlzID0gdGhpcztcblxudGhpcy50b2RheSA9IHtcbiAgICBicmVha2Zhc3Q6IHtcbiAgICAgICAgd2VzOiAn44Ot44O844Or44OR44OzJyxcbiAgICAgICAgamFwOiBudWxsLFxuICAgICAgICBzaWRlOiBbJ+OCveODvOOCu+ODvOOCuOOBqOOCreODo+ODmeODhOOBruODleODrOODs+ODgeOCteODqeODgCcsICfjgq3jg6Pjg5njg4TjgrXjg6njg4AnLCAn44K544O844OXJywgJ+eJm+S5syddXG4gICAgfSxcbiAgICBsdW5jaDoge1xuICAgICAgICBtYWluOiAn5Y+J54S854KS6aOvJyxcbiAgICAgICAgc2lkZTogWyfjgYvjgbzjgaHjgoPjga7jgrPjg63jg4PjgrEnLCAn5ZGz5ZmM5rGBJ11cbiAgICB9LFxuICAgIGRpbm5lcjoge1xuICAgICAgICBhOiAn5ZKM6aKo44GU44G+44OP44Oz44OQ44O844KwJyxcbiAgICAgICAgYjogJ+ODj+ODs+ODkOODvOOCsOODh+ODn+OCsOODqeOCueOCveODvOOCueOBqOa1t+iAgeODleODqeOCpCcsXG4gICAgICAgIHNpZGU6IFsn5bCP5p2+6I+c44Go44GI44Gu44GN44Gu5qKF5ZKM44GIJywgJ+ODqeOCpOOCuScsICflkbPlmYzmsYEnXVxuICAgIH1cbn07XG5cbnRoaXMuaW5pdCA9ICdicmVha2Zhc3QnO1xudGhpcy5pc09wZW4gPSB0aGlzLmluaXQ7XG5cbmNvbnN0IHBhZGRpbmcgPSAzMDtcblxudGhpcy5vbignbW91bnQnLCAoKSA9PiB7XG4gICAgLy8g6auY44GV44KS5LuY5LiOXG4gICAgY29uc3QgJHBhcmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYGRhaWx5TWVudUluaXRgKVswXTtcbiAgICBjb25zdCAkZWxlbSA9ICRwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1zaWRlJyk7XG4gICAgY29uc3QgaGVpZ2h0ID0gJGVsZW1bMF0uY2hpbGROb2Rlc1sxXS5jbGllbnRIZWlnaHQ7XG4gICAgJGVsZW1bMF0uc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0ICsgcGFkZGluZ31weGA7XG4gICAgY29uc29sZS5sb2coJ2hhcHBlbicpO1xufSk7XG5cbnRoaXMub3BlbiA9IHRpbWUgPT4ge1xuICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoX3RoaXMuaXNPcGVuICE9PSB0aW1lKSB7XG4gICAgICAgICAgICAvLyDjgrXjgqTjg4njg6Hjg4vjg6Xjg7xIaWRlXG4gICAgICAgICAgICBjb25zdCAkb2xkX3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGFpbHlNZW51LSR7X3RoaXMuaXNPcGVufWApO1xuICAgICAgICAgICAgY29uc3QgJG9sZF9lID0gJG9sZF9wLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtc2lkZScpO1xuICAgICAgICAgICAgJG9sZF9lWzBdLnN0eWxlLmhlaWdodCA9IGAwcHhgO1xuICAgICAgICAgICAgLy8g6auY44GV44KS5LuY5LiOXG4gICAgICAgICAgICBjb25zdCAkcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRhaWx5TWVudS0ke3RpbWV9YCk7XG4gICAgICAgICAgICBjb25zdCAkZWxlbSA9ICRwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1zaWRlJyk7XG4gICAgICAgICAgICBjb25zdCBoZWlnaHQgPSAkZWxlbVswXS5jaGlsZE5vZGVzWzFdLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgICRlbGVtWzBdLnN0eWxlLmhlaWdodCA9IGAke2hlaWdodCArIHBhZGRpbmd9cHhgO1xuICAgICAgICAgICAgX3RoaXMuaXNPcGVuID0gdGltZTtcbiAgICAgICAgfVxuICAgIH07XG59O1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvZGFpbHktbWVudS50YWciLCJcbnJpb3QudGFnMignbWVudS1pdGVtJywgJzxkaXYgY2xhc3M9XCJtZW51LWl0ZW1cIj48L2Rpdj4nLCAnbWVudS1pdGVtIC5tZW51LWl0ZW0sW2RhdGEtaXM9XCJtZW51LWl0ZW1cIl0gLm1lbnUtaXRlbXsgd2lkdGg6IDEwcHg7IGhlaWdodDogNDAwcHg7IG1hcmdpbjogOHB4IGF1dG87IGJhY2tncm91bmQ6ICNmZmY7IH0nLCAnJywgZnVuY3Rpb24ob3B0cykge1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvbWVudS1pdGVtLnRhZyJdLCJzb3VyY2VSb290IjoiIn0=