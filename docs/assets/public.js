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
	
	riot.tag2('navbar', '<nav class="navbar"> <ul class="navbar-nav {open: isOpen}"> <li class="nav-item"><a class="nav-anchor" href="#/search"> <div class="icon ion-android-search"></div> <div class="label">検索</div></a></li> <li class="nav-item"><a class="nav-anchor" href="#/schedule"> <div class="icon ion-ios-calendar-outline"></div> <div class="label">時間割</div></a></li> <li class="nav-item"><a class="nav-anchor" href="#/info"> <div class="icon ion-ios-information-outline"></div> <div class="label">おしらせ</div></a></li> <li class="nav-item"><span class="nav-anchor"> <div class="icon ion-ios-grid-view-outline"></div> <div class="label">準備中</div></span></li> <li class="nav-item"><span class="nav-anchor"> <div class="icon ion-ios-grid-view-outline"></div> <div class="label">準備中</div></span></li> <li class="nav-item"><a class="nav-anchor" href="//twitter.com/uswan2_" target="_blank"> <div class="icon ion-social-twitter-outline"></div> <div class="label">Twitter</div></a></li> </ul> <div class="nav-large"><a class="nav-large-wrapper" href="#/menu"> <div class="icon ion-coffee"></div> <div class="label">献立表</div></a></div> <div class="nav-more"><a class="nav-anchor {open: isOpen}" href="#" onclick="{toggleMoreMenu}"> <div class="navicon ion-navicon"></div> <div class="closer ion-android-close"></div></a></div> </nav> <side-menu></side-menu>', 'navbar .navbar,[data-is="navbar"] .navbar{ position: fixed; bottom: 0; left: 0; width: 100%; height: 0; padding: 0 60px 0 110px; box-sizing: border-box; z-index: 100; } navbar .navbar .navbar-nav,[data-is="navbar"] .navbar .navbar-nav{ height: 110px; margin: 0 -60px 0 -55px; padding: 0 60px 0 55px; background: #fff; transform: translateY(-55px); transition: transform 0.3s ease; } navbar .navbar .navbar-nav.open,[data-is="navbar"] .navbar .navbar-nav.open{ transform: translateY(-110px); } navbar .navbar .navbar-nav .nav-item,[data-is="navbar"] .navbar .navbar-nav .nav-item{ float: left; width: 33.333%; height: 55px; text-align: center; } navbar .navbar .navbar-nav .nav-item .nav-anchor,[data-is="navbar"] .navbar .navbar-nav .nav-item .nav-anchor{ display: block; padding: 5px 0; text-decoration: none; color: #222; } navbar .navbar .navbar-nav .nav-item .nav-anchor .icon,[data-is="navbar"] .navbar .navbar-nav .nav-item .nav-anchor .icon{ line-height: 30px; font-size: 25px; } navbar .navbar .navbar-nav .nav-item .nav-anchor .label,[data-is="navbar"] .navbar .navbar-nav .nav-item .nav-anchor .label{ line-height: 15px; font-size: 10px; } navbar .navbar .nav-large,[data-is="navbar"] .navbar .nav-large{ position: absolute; bottom: 0; left: 0; width: 110px; height: 110px; background: #fff; border-radius: 100%; border-bottom-left-radius: 0; } navbar .navbar .nav-large .nav-large-wrapper,[data-is="navbar"] .navbar .nav-large .nav-large-wrapper{ position: relative; display: block; width: 96px; height: 96px; margin: 4px; border-radius: 100%; border: 3px solid #222; color: #222; } navbar .navbar .nav-large .nav-large-wrapper .icon,[data-is="navbar"] .navbar .nav-large .nav-large-wrapper .icon{ font-size: 40px; text-align: center; line-height: 80px; } navbar .navbar .nav-large .nav-large-wrapper .label,[data-is="navbar"] .navbar .nav-large .nav-large-wrapper .label{ position: absolute; bottom: 5px; left: 0; width: 100%; height: 35px; text-align: center; font-size: 12px; line-height: 35px; } navbar .navbar .nav-more,[data-is="navbar"] .navbar .nav-more{ position: absolute; bottom: 0; right: 0; overflow: hidden; width: 60px; height: 55px; font-size: 36px; } navbar .navbar .nav-more .nav-anchor,[data-is="navbar"] .navbar .nav-more .nav-anchor{ position: relative; display: block; color: #222; } navbar .navbar .nav-more .nav-anchor > div,[data-is="navbar"] .navbar .nav-more .nav-anchor > div{ position: absolute; width: 60px; height: 55px; text-align: center; line-height: 55px; transition: all 0.3s ease; } navbar .navbar .nav-more .nav-anchor .navicon,[data-is="navbar"] .navbar .nav-more .nav-anchor .navicon{ opacity: 1; transform: translateY(0); } navbar .navbar .nav-more .nav-anchor .closer,[data-is="navbar"] .navbar .nav-more .nav-anchor .closer{ opacity: 0; transform: translateY(12px); } navbar .navbar .nav-more .nav-anchor.open .navicon,[data-is="navbar"] .navbar .nav-more .nav-anchor.open .navicon{ opacity: 0; transform: translateY(-12px); } navbar .navbar .nav-more .nav-anchor.open .closer,[data-is="navbar"] .navbar .nav-more .nav-anchor.open .closer{ opacity: 1; transform: translateY(0); }', '', function (opts) {
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
	
	riot.tag2('menu', '<daily-menu></daily-menu>', '', '', function (opts) {});
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
	
	riot.tag2('daily-menu', '<div class="daily-menu"> <div class="header">今日の献立</div> <div class="main"> <div class="menu-item {open: isOpen == \'breakfast\'}" id="dailyMenu-breakfast" onclick="{open(\'breakfast\')}"> <div class="label">朝</div> <div class="menu-body"> <div class="menu-main">{today.breakfast.main}</div> <div class="menu-side"> <ul> <li each="{item in today.breakfast.side}">{item}</li> </ul> </div> </div> </div> <div class="menu-item {open: isOpen == \'lunch\'}" id="dailyMenu-lunch" onclick="{open(\'lunch\')}"> <div class="label">昼</div> <div class="menu-body"> <div class="menu-main">{today.lunch.main}</div> <div class="menu-side"> <ul> <li each="{item in today.lunch.side}">{item}</li> </ul> </div> </div> </div> <div class="menu-item {open: isOpen == \'dinner\'}" id="dailyMenu-dinner" onclick="{open(\'dinner\')}"> <div class="label">夜</div> <div class="menu-body"> <div class="menu-main">{today.dinner.main}</div> <div class="menu-side"> <ul> <li each="{item in today.dinner.side}">{item}</li> </ul> </div> </div> </div> </div> </div>', 'daily-menu .daily-menu,[data-is="daily-menu"] .daily-menu{ margin: 10px 5%; background: rgba(255,255,255,0.35); box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.2), 0 1px 5px 0 rgba(0,0,0,0.12); } daily-menu .daily-menu .header,[data-is="daily-menu"] .daily-menu .header{ width: 100%; height: 40px; color: rgba(51,51,51,0.8); font-size: 14px; line-height: 40px; text-align: center; } daily-menu .daily-menu .main .menu-item,[data-is="daily-menu"] .daily-menu .main .menu-item{ display: flex; align-content: center; padding: 8px 20px; transition: all 0.6s ease; } daily-menu .daily-menu .main .menu-item .label,[data-is="daily-menu"] .daily-menu .main .menu-item .label{ width: 20px; height: 20px; font-size: 11px; border: 1px solid #333; border-radius: 100%; text-align: center; line-height: 20px; } daily-menu .daily-menu .main .menu-item .menu-body,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body{ flex: 1; } daily-menu .daily-menu .main .menu-item .menu-body .menu-side,[data-is="daily-menu"] .daily-menu .main .menu-item .menu-body .menu-side{ overflow: hidden; height: 0; transition: height 0.3s ease; } daily-menu .daily-menu .main .menu-item.open,[data-is="daily-menu"] .daily-menu .main .menu-item.open{ background: rgba(255,255,255,0.8); } daily-menu .daily-menu .main .menu-item.open .menu-body .menu-side,[data-is="daily-menu"] .daily-menu .main .menu-item.open .menu-body .menu-side{ transition: height 0.4s 0.3s ease; }', '', function (opts) {
	    var _this = this;
	
	    this.today = {
	        breakfast: {
	            main: 'ごはん',
	            side: ['納豆', '味噌汁', '牛乳']
	        },
	        lunch: {
	            main: 'カレーうどん',
	            side: ['サラダ']
	        },
	        dinner: {
	            main: '焼き魚のフィレット',
	            side: ['なんか', 'いろいろある', 'おひたし', 'サラダ', '味噌汁']
	        }
	    };
	
	    this.init = 'breakfast';
	    this.isOpen = this.init;
	
	    var lineHeight = 30;
	
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
	                var len = _this.today[time].side.length;
	                $elem[0].style.height = len * lineHeight + 'px';
	                _this.isOpen = time;
	            }
	        };
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOWU4YWQwYTY5MjRhOTE3MmRjYTgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcHVibGljLmpzIiwid2VicGFjazovLy8uL34vcmlvdC9yaW90LmpzIiwid2VicGFjazovLy8uL34vcmlvdC1yb3V0ZS9kaXN0L2Nqcy5yb3V0ZS5qcyIsIndlYnBhY2s6Ly8vLi9+L3Jpb3Qtb2JzZXJ2YWJsZS9kaXN0L29ic2VydmFibGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvY29tbW9uL25hdmJhci50YWciLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3NjcmlwdHMvcHVibGljL3JvdXRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9jb21tb24vc2lkZS1tZW51LnRhZyIsIndlYnBhY2s6Ly8vLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9kYWlseS1tZW51LnRhZyJdLCJuYW1lcyI6WyJyaW90IiwibW91bnQiLCJzdGFydCIsInRhZzIiLCJvcHRzIiwiX3RoaXMiLCJ1IiwicmVxdWlyZSIsIm9icyIsIm9ic2VydmFibGUiLCJpc09wZW4iLCJ0b2dnbGVNb3JlTWVudSIsImUiLCJwcmV2ZW50RGVmYXVsdCIsInRyaWdnZXIiLCJtb2R1bGUiLCJleHBvcnRzIiwibG9jYXRpb24iLCJoYXNoIiwidXBkYXRlRmlyc3RWaWV3IiwiZmlyc3RWYWx1ZSIsInRhcmdldCIsInNlbGVjdGVkT3B0aW9ucyIsInRleHQiLCJvbiIsInVwZGF0ZSIsInRvZGF5IiwiYnJlYWtmYXN0IiwibWFpbiIsInNpZGUiLCJsdW5jaCIsImRpbm5lciIsImluaXQiLCJsaW5lSGVpZ2h0Iiwib3BlbiIsInRpbWUiLCIkb2xkX3AiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiJG9sZF9lIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsInN0eWxlIiwiaGVpZ2h0IiwiJHBhcmVudCIsIiRlbGVtIiwibGVuIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBOztBQUNBOztBQUdBOzs7Ozs7QUFGQUEsTUFBS0MsS0FBTCxDQUFXLFFBQVg7O0FBR0Esa0JBQU9DLEtBQVAsRzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDO0FBQzNDLEVBQUMsNEJBQTRCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUF5RCxHQUFHLEdBQUc7QUFDL0Qsa0NBQWlDO0FBQ2pDO0FBQ0EsNENBQTJDOztBQUUzQztBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxJQUFJO0FBQ2pCLGNBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLElBQUk7QUFDakIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLElBQUk7QUFDZixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsSUFBSTtBQUNqQixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEIsY0FBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFVBQVU7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEIsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWEsU0FBUztBQUN0QixjQUFhLFVBQVU7QUFDdkIsY0FBYSxTQUFTO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYSxTQUFTO0FBQ3RCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsU0FBUztBQUNwQixZQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNB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RkgsVUFMRTtBQVNURSxpQkFBUTtBQUNKSCxtQkFBTSxXQURGO0FBRUpDLG1CQUFNLENBQUMsS0FBRCxFQUFRLFFBQVIsRUFBa0IsTUFBbEIsRUFBMEIsS0FBMUIsRUFBaUMsS0FBakM7QUFGRjtBQVRDLE1BQWI7O0FBZUEsVUFBS0csSUFBTCxHQUFZLFdBQVo7QUFDQSxVQUFLdEIsTUFBTCxHQUFjLEtBQUtzQixJQUFuQjs7QUFFQSxTQUFNQyxhQUFhLEVBQW5COztBQUVBLFVBQUtDLElBQUwsR0FBWSxnQkFBUTtBQUNoQixnQkFBTyxhQUFLO0FBQ1J0QixlQUFFQyxjQUFGO0FBQ0EsaUJBQUlSLE1BQU1LLE1BQU4sS0FBaUJ5QixJQUFyQixFQUEyQjtBQUN2QjtBQUNBLHFCQUFNQyxTQUFTQyxTQUFTQyxjQUFULGdCQUFxQ2pDLE1BQU1LLE1BQTNDLENBQWY7QUFDQSxxQkFBTTZCLFNBQVNILE9BQU9JLHNCQUFQLENBQThCLFdBQTlCLENBQWY7QUFDQUQsd0JBQU8sQ0FBUCxFQUFVRSxLQUFWLENBQWdCQyxNQUFoQjtBQUNBO0FBQ0EscUJBQU1DLFVBQVVOLFNBQVNDLGNBQVQsZ0JBQXFDSCxJQUFyQyxDQUFoQjtBQUNBLHFCQUFNUyxRQUFRRCxRQUFRSCxzQkFBUixDQUErQixXQUEvQixDQUFkO0FBQ0EscUJBQU1LLE1BQU14QyxNQUFNcUIsS0FBTixDQUFZUyxJQUFaLEVBQWtCTixJQUFsQixDQUF1QmlCLE1BQW5DO0FBQ0FGLHVCQUFNLENBQU4sRUFBU0gsS0FBVCxDQUFlQyxNQUFmLEdBQTJCRyxNQUFNWixVQUFqQztBQUNBNUIsdUJBQU1LLE1BQU4sR0FBZXlCLElBQWY7QUFDSDtBQUNKLFVBZEQ7QUFlSCxNQWhCRDtBQWlCQyxFQXhDRCxFIiwiZmlsZSI6InB1YmxpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDllOGFkMGE2OTI0YTkxNzJkY2E4IiwiaW1wb3J0ICcuL3RhZ3MvcHVibGljL2NvbW1vbi9uYXZiYXInO1xyXG5pbXBvcnQgJy4vdGFncy9wdWJsaWMvY29tbW9uL3NpZGUtbWVudSc7XHJcbnJpb3QubW91bnQoJ25hdmJhcicpO1xyXG5cclxuaW1wb3J0IHJvdXRlciBmcm9tICcuL3B1YmxpYy9yb3V0ZXInO1xyXG5yb3V0ZXIuc3RhcnQoKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy9wdWJsaWMuanMiLCIvKiBSaW90IHYzLjAuNywgQGxpY2Vuc2UgTUlUICovXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBmYWN0b3J5KGV4cG9ydHMpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKFsnZXhwb3J0cyddLCBmYWN0b3J5KSA6XG4gIChmYWN0b3J5KChnbG9iYWwucmlvdCA9IGdsb2JhbC5yaW90IHx8IHt9KSkpO1xufSh0aGlzLCAoZnVuY3Rpb24gKGV4cG9ydHMpIHsgJ3VzZSBzdHJpY3QnO1xuXG52YXIgX19UQUdTX0NBQ0hFID0gW107XG52YXIgX19UQUdfSU1QTCA9IHt9O1xudmFyIEdMT0JBTF9NSVhJTiA9ICdfX2dsb2JhbF9taXhpbic7XG52YXIgQVRUUlNfUFJFRklYID0gJ3Jpb3QtJztcbnZhciBSRUZfRElSRUNUSVZFUyA9IFsnZGF0YS1yZWYnLCAncmVmJ107XG52YXIgSVNfRElSRUNUSVZFID0gJ2RhdGEtaXMnO1xudmFyIENPTkRJVElPTkFMX0RJUkVDVElWRSA9ICdpZic7XG52YXIgTE9PUF9ESVJFQ1RJVkUgPSAnZWFjaCc7XG52YXIgTE9PUF9OT19SRU9SREVSX0RJUkVDVElWRSA9ICduby1yZW9yZGVyJztcbnZhciBTSE9XX0RJUkVDVElWRSA9ICdzaG93JztcbnZhciBISURFX0RJUkVDVElWRSA9ICdoaWRlJztcbnZhciBUX1NUUklORyA9ICdzdHJpbmcnO1xudmFyIFRfT0JKRUNUID0gJ29iamVjdCc7XG52YXIgVF9VTkRFRiAgPSAndW5kZWZpbmVkJztcbnZhciBUX0ZVTkNUSU9OID0gJ2Z1bmN0aW9uJztcbnZhciBYTElOS19OUyA9ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJztcbnZhciBYTElOS19SRUdFWCA9IC9eeGxpbms6KFxcdyspLztcbnZhciBXSU4gPSB0eXBlb2Ygd2luZG93ID09PSBUX1VOREVGID8gdW5kZWZpbmVkIDogd2luZG93O1xudmFyIFJFX1NQRUNJQUxfVEFHUyA9IC9eKD86dCg/OmJvZHl8aGVhZHxmb290fFtyaGRdKXxjYXB0aW9ufGNvbCg/Omdyb3VwKT98b3B0KD86aW9ufGdyb3VwKSkkLztcbnZhciBSRV9TUEVDSUFMX1RBR1NfTk9fT1BUSU9OID0gL14oPzp0KD86Ym9keXxoZWFkfGZvb3R8W3JoZF0pfGNhcHRpb258Y29sKD86Z3JvdXApPykkLztcbnZhciBSRV9SRVNFUlZFRF9OQU1FUyA9IC9eKD86Xyg/Oml0ZW18aWR8cGFyZW50KXx1cGRhdGV8cm9vdHwoPzp1bik/bW91bnR8bWl4aW58aXMoPzpNb3VudGVkfExvb3ApfHRhZ3N8cmVmc3xwYXJlbnR8b3B0c3x0cmlnZ2VyfG8oPzpufGZmfG5lKSkkLztcbnZhciBSRV9TVkdfVEFHUyA9IC9eKGFsdEdseXBofGFuaW1hdGUoPzpDb2xvcik/fGNpcmNsZXxjbGlwUGF0aHxkZWZzfGVsbGlwc2V8ZmUoPzpCbGVuZHxDb2xvck1hdHJpeHxDb21wb25lbnRUcmFuc2ZlcnxDb21wb3NpdGV8Q29udm9sdmVNYXRyaXh8RGlmZnVzZUxpZ2h0aW5nfERpc3BsYWNlbWVudE1hcHxGbG9vZHxHYXVzc2lhbkJsdXJ8SW1hZ2V8TWVyZ2V8TW9ycGhvbG9neXxPZmZzZXR8U3BlY3VsYXJMaWdodGluZ3xUaWxlfFR1cmJ1bGVuY2UpfGZpbHRlcnxmb250fGZvcmVpZ25PYmplY3R8Zyg/Omx5cGgpPyg/OlJlZik/fGltYWdlfGxpbmUoPzphckdyYWRpZW50KT98bWEoPzpya2VyfHNrKXxtaXNzaW5nLWdseXBofHBhdGh8cGF0dGVybnxwb2x5KD86Z29ufGxpbmUpfHJhZGlhbEdyYWRpZW50fHJlY3R8c3RvcHxzdmd8c3dpdGNofHN5bWJvbHx0ZXh0KD86UGF0aCk/fHRyZWZ8dHNwYW58dXNlKSQvO1xudmFyIFJFX0hUTUxfQVRUUlMgPSAvKFstXFx3XSspID89ID8oPzpcIihbXlwiXSopfCcoW14nXSopfCh7W159XSp9KSkvZztcbnZhciBDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTID0geyAndmlld2JveCc6ICd2aWV3Qm94JyB9O1xudmFyIFJFX0JPT0xfQVRUUlMgPSAvXig/OmRpc2FibGVkfGNoZWNrZWR8cmVhZG9ubHl8cmVxdWlyZWR8YWxsb3dmdWxsc2NyZWVufGF1dG8oPzpmb2N1c3xwbGF5KXxjb21wYWN0fGNvbnRyb2xzfGRlZmF1bHR8Zm9ybW5vdmFsaWRhdGV8aGlkZGVufGlzbWFwfGl0ZW1zY29wZXxsb29wfG11bHRpcGxlfG11dGVkfG5vKD86cmVzaXplfHNoYWRlfHZhbGlkYXRlfHdyYXApP3xvcGVufHJldmVyc2VkfHNlYW1sZXNzfHNlbGVjdGVkfHNvcnRhYmxlfHRydWVzcGVlZHx0eXBlbXVzdG1hdGNoKSQvO1xudmFyIElFX1ZFUlNJT04gPSAoV0lOICYmIFdJTi5kb2N1bWVudCB8fCB7fSkuZG9jdW1lbnRNb2RlIHwgMDtcblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgRE9NIG5vZGUgbXVzdCBiZSBjb25zaWRlcmVkIGEgcGFydCBvZiBhbiBzdmcgZG9jdW1lbnRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU1ZHVGFnKG5hbWUpIHtcbiAgcmV0dXJuIFJFX1NWR19UQUdTLnRlc3QobmFtZSlcbn1cblxuLyoqXG4gKiBDaGVjayBDaGVjayBpZiB0aGUgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQm9vbEF0dHIodmFsdWUpIHtcbiAgcmV0dXJuIFJFX0JPT0xfQVRUUlMudGVzdCh2YWx1ZSlcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBmdW5jdGlvblxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfRlVOQ1RJT05cbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYW4gb2JqZWN0LCBleGNsdWRlIG51bGxcbiAqIE5PVEU6IHVzZSBpc09iamVjdCh4KSAmJiAhaXNBcnJheSh4KSB0byBleGNsdWRlcyBhcnJheXMuXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09IFRfT0JKRUNUIC8vIHR5cGVvZiBudWxsIGlzICdvYmplY3QnXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIHVuZGVmaW5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSBUX1VOREVGXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgc3RyaW5nXG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT09IFRfU1RSSU5HXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGVtcHR5LiBEaWZmZXJlbnQgZnJvbSBmYWxzeSwgYmVjYXVzZSB3ZSBkb250IGNvbnNpZGVyIDAgb3IgZmFsc2UgdG8gYmUgYmxhbmtcbiAqIEBwYXJhbSB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQmxhbmsodmFsdWUpIHtcbiAgcmV0dXJuIGlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gJydcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBwYXNzZWQgYXJndW1lbnQgaXMgYSBraW5kIG9mIGFycmF5XG4gKiBAcGFyYW0gICB7ICogfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlIGluc3RhbmNlb2YgQXJyYXlcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIG9iamVjdCdzIHByb3BlcnR5IGNvdWxkIGJlIG92ZXJyaWRkZW5cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gIG9iaiAtIHNvdXJjZSBvYmplY3RcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIGtleSAtIG9iamVjdCBwcm9wZXJ0eVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc1dyaXRhYmxlKG9iaiwga2V5KSB7XG4gIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmosIGtleSk7XG4gIHJldHVybiBpc1VuZGVmaW5lZChvYmpba2V5XSkgfHwgZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgcGFzc2VkIGFyZ3VtZW50IGlzIGEgcmVzZXJ2ZWQgbmFtZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSB2YWx1ZSAtXG4gKiBAcmV0dXJucyB7IEJvb2xlYW4gfSAtXG4gKi9cbmZ1bmN0aW9uIGlzUmVzZXJ2ZWROYW1lKHZhbHVlKSB7XG4gIHJldHVybiBSRV9SRVNFUlZFRF9OQU1FUy50ZXN0KHZhbHVlKVxufVxuXG52YXIgY2hlY2sgPSBPYmplY3QuZnJlZXplKHtcblx0aXNTVkdUYWc6IGlzU1ZHVGFnLFxuXHRpc0Jvb2xBdHRyOiBpc0Jvb2xBdHRyLFxuXHRpc0Z1bmN0aW9uOiBpc0Z1bmN0aW9uLFxuXHRpc09iamVjdDogaXNPYmplY3QsXG5cdGlzVW5kZWZpbmVkOiBpc1VuZGVmaW5lZCxcblx0aXNTdHJpbmc6IGlzU3RyaW5nLFxuXHRpc0JsYW5rOiBpc0JsYW5rLFxuXHRpc0FycmF5OiBpc0FycmF5LFxuXHRpc1dyaXRhYmxlOiBpc1dyaXRhYmxlLFxuXHRpc1Jlc2VydmVkTmFtZTogaXNSZXNlcnZlZE5hbWVcbn0pO1xuXG4vKipcbiAqIFNob3J0ZXIgYW5kIGZhc3Qgd2F5IHRvIHNlbGVjdCBtdWx0aXBsZSBub2RlcyBpbiB0aGUgRE9NXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHNlbGVjdG9yIC0gRE9NIHNlbGVjdG9yXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIERPTSBub2RlIHdoZXJlIHRoZSB0YXJnZXRzIG9mIG91ciBzZWFyY2ggd2lsbCBpcyBsb2NhdGVkXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvbSBub2RlcyBmb3VuZFxuICovXG5mdW5jdGlvbiAkJChzZWxlY3RvciwgY3R4KSB7XG4gIHJldHVybiAoY3R4IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKVxufVxuXG4vKipcbiAqIFNob3J0ZXIgYW5kIGZhc3Qgd2F5IHRvIHNlbGVjdCBhIHNpbmdsZSBub2RlIGluIHRoZSBET01cbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc2VsZWN0b3IgLSB1bmlxdWUgZG9tIHNlbGVjdG9yXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIERPTSBub2RlIHdoZXJlIHRoZSB0YXJnZXQgb2Ygb3VyIHNlYXJjaCB3aWxsIGlzIGxvY2F0ZWRcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZG9tIG5vZGUgZm91bmRcbiAqL1xuZnVuY3Rpb24gJChzZWxlY3RvciwgY3R4KSB7XG4gIHJldHVybiAoY3R4IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGRvY3VtZW50IGZyYWdtZW50XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGRvY3VtZW50IGZyYWdtZW50XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUZyYWcoKSB7XG4gIHJldHVybiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBkb2N1bWVudCB0ZXh0IG5vZGVcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gY3JlYXRlIGEgdGV4dCBub2RlIHRvIHVzZSBhcyBwbGFjZWhvbGRlclxuICovXG5mdW5jdGlvbiBjcmVhdGVET01QbGFjZWhvbGRlcigpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCcnKVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGdlbmVyaWMgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIERPTSBub2RlIHdlIHdhbnQgdG8gY3JlYXRlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1N2ZyAtIHNob3VsZCB3ZSB1c2UgYSBTVkcgYXMgcGFyZW50IG5vZGU/XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IERPTSBub2RlIGp1c3QgY3JlYXRlZFxuICovXG5mdW5jdGlvbiBta0VsKG5hbWUsIGlzU3ZnKSB7XG4gIHJldHVybiBpc1N2ZyA/XG4gICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKSA6XG4gICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxufVxuXG4vKipcbiAqIEdldCB0aGUgb3V0ZXIgaHRtbCBvZiBhbnkgRE9NIG5vZGUgU1ZHcyBpbmNsdWRlZFxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlbCAtIERPTSBub2RlIHRvIHBhcnNlXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IGVsLm91dGVySFRNTFxuICovXG5mdW5jdGlvbiBnZXRPdXRlckhUTUwoZWwpIHtcbiAgaWYgKGVsLm91dGVySFRNTClcbiAgICB7IHJldHVybiBlbC5vdXRlckhUTUwgfVxuICAvLyBzb21lIGJyb3dzZXJzIGRvIG5vdCBzdXBwb3J0IG91dGVySFRNTCBvbiB0aGUgU1ZHcyB0YWdzXG4gIGVsc2Uge1xuICAgIHZhciBjb250YWluZXIgPSBta0VsKCdkaXYnKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICByZXR1cm4gY29udGFpbmVyLmlubmVySFRNTFxuICB9XG59XG5cbi8qKlxuICogU2V0IHRoZSBpbm5lciBodG1sIG9mIGFueSBET00gbm9kZSBTVkdzIGluY2x1ZGVkXG4gKiBAcGFyYW0geyBPYmplY3QgfSBjb250YWluZXIgLSBET00gbm9kZSB3aGVyZSB3ZSdsbCBpbmplY3QgbmV3IGh0bWxcbiAqIEBwYXJhbSB7IFN0cmluZyB9IGh0bWwgLSBodG1sIHRvIGluamVjdFxuICovXG5mdW5jdGlvbiBzZXRJbm5lckhUTUwoY29udGFpbmVyLCBodG1sKSB7XG4gIGlmICghaXNVbmRlZmluZWQoY29udGFpbmVyLmlubmVySFRNTCkpXG4gICAgeyBjb250YWluZXIuaW5uZXJIVE1MID0gaHRtbDsgfVxuICAgIC8vIHNvbWUgYnJvd3NlcnMgZG8gbm90IHN1cHBvcnQgaW5uZXJIVE1MIG9uIHRoZSBTVkdzIHRhZ3NcbiAgZWxzZSB7XG4gICAgdmFyIGRvYyA9IG5ldyBET01QYXJzZXIoKS5wYXJzZUZyb21TdHJpbmcoaHRtbCwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuICAgIHZhciBub2RlID0gY29udGFpbmVyLm93bmVyRG9jdW1lbnQuaW1wb3J0Tm9kZShkb2MuZG9jdW1lbnRFbGVtZW50LCB0cnVlKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQobm9kZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgYW55IERPTSBhdHRyaWJ1dGUgZnJvbSBhIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byB1cGRhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gcmVtb3ZlXG4gKi9cbmZ1bmN0aW9uIHJlbUF0dHIoZG9tLCBuYW1lKSB7XG4gIGRvbS5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSB2YWx1ZSBvZiBhbnkgRE9NIGF0dHJpYnV0ZSBvbiBhIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBuYW1lIC0gbmFtZSBvZiB0aGUgYXR0cmlidXRlIHdlIHdhbnQgdG8gZ2V0XG4gKiBAcmV0dXJucyB7IFN0cmluZyB8IHVuZGVmaW5lZCB9IG5hbWUgb2YgdGhlIG5vZGUgYXR0cmlidXRlIHdoZXRoZXIgaXQgZXhpc3RzXG4gKi9cbmZ1bmN0aW9uIGdldEF0dHIoZG9tLCBuYW1lKSB7XG4gIHJldHVybiBkb20uZ2V0QXR0cmlidXRlKG5hbWUpXG59XG5cbi8qKlxuICogU2V0IGFueSBET00gYXR0cmlidXRlXG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHVwZGF0ZVxuICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIG5hbWUgb2YgdGhlIHByb3BlcnR5IHdlIHdhbnQgdG8gc2V0XG4gKiBAcGFyYW0geyBTdHJpbmcgfSB2YWwgLSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgd2Ugd2FudCB0byBzZXRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cihkb20sIG5hbWUsIHZhbCkge1xuICB2YXIgeGxpbmsgPSBYTElOS19SRUdFWC5leGVjKG5hbWUpO1xuICBpZiAoeGxpbmsgJiYgeGxpbmtbMV0pXG4gICAgeyBkb20uc2V0QXR0cmlidXRlTlMoWExJTktfTlMsIHhsaW5rWzFdLCB2YWwpOyB9XG4gIGVsc2VcbiAgICB7IGRvbS5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsKTsgfVxufVxuXG4vKipcbiAqIEluc2VydCBzYWZlbHkgYSB0YWcgdG8gZml4ICMxOTYyICMxNjQ5XG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGNoaWxkcmVuIGNvbnRhaW5lclxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGN1cnIgLSBub2RlIHRvIGluc2VydFxuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IG5leHQgLSBub2RlIHRoYXQgc2hvdWxkIHByZWNlZWQgdGhlIGN1cnJlbnQgbm9kZSBpbnNlcnRlZFxuICovXG5mdW5jdGlvbiBzYWZlSW5zZXJ0KHJvb3QsIGN1cnIsIG5leHQpIHtcbiAgcm9vdC5pbnNlcnRCZWZvcmUoY3VyciwgbmV4dC5wYXJlbnROb2RlICYmIG5leHQpO1xufVxuXG4vKipcbiAqIE1pbmltaXplIHJpc2s6IG9ubHkgemVybyBvciBvbmUgX3NwYWNlXyBiZXR3ZWVuIGF0dHIgJiB2YWx1ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGh0bWwgLSBodG1sIHN0cmluZyB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvbiB0byBhcHBseSBvbiBhbnkgYXR0cmlidXRlIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIHdhbGtBdHRycyhodG1sLCBmbikge1xuICBpZiAoIWh0bWwpXG4gICAgeyByZXR1cm4gfVxuICB2YXIgbTtcbiAgd2hpbGUgKG0gPSBSRV9IVE1MX0FUVFJTLmV4ZWMoaHRtbCkpXG4gICAgeyBmbihtWzFdLnRvTG93ZXJDYXNlKCksIG1bMl0gfHwgbVszXSB8fCBtWzRdKTsgfVxufVxuXG4vKipcbiAqIFdhbGsgZG93biByZWN1cnNpdmVseSBhbGwgdGhlIGNoaWxkcmVuIHRhZ3Mgc3RhcnRpbmcgZG9tIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gICBkb20gLSBzdGFydGluZyBub2RlIHdoZXJlIHdlIHdpbGwgc3RhcnQgdGhlIHJlY3Vyc2lvblxuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgdG8gdHJhbnNmb3JtIHRoZSBjaGlsZCBub2RlIGp1c3QgZm91bmRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gICBjb250ZXh0IC0gZm4gY2FuIG9wdGlvbmFsbHkgcmV0dXJuIGFuIG9iamVjdCwgd2hpY2ggaXMgcGFzc2VkIHRvIGNoaWxkcmVuXG4gKi9cbmZ1bmN0aW9uIHdhbGtOb2Rlcyhkb20sIGZuLCBjb250ZXh0KSB7XG4gIGlmIChkb20pIHtcbiAgICB2YXIgcmVzID0gZm4oZG9tLCBjb250ZXh0KTtcbiAgICB2YXIgbmV4dDtcbiAgICAvLyBzdG9wIHRoZSByZWN1cnNpb25cbiAgICBpZiAocmVzID09PSBmYWxzZSkgeyByZXR1cm4gfVxuXG4gICAgZG9tID0gZG9tLmZpcnN0Q2hpbGQ7XG5cbiAgICB3aGlsZSAoZG9tKSB7XG4gICAgICBuZXh0ID0gZG9tLm5leHRTaWJsaW5nO1xuICAgICAgd2Fsa05vZGVzKGRvbSwgZm4sIHJlcyk7XG4gICAgICBkb20gPSBuZXh0O1xuICAgIH1cbiAgfVxufVxuXG52YXIgZG9tID0gT2JqZWN0LmZyZWV6ZSh7XG5cdCQkOiAkJCxcblx0JDogJCxcblx0Y3JlYXRlRnJhZzogY3JlYXRlRnJhZyxcblx0Y3JlYXRlRE9NUGxhY2Vob2xkZXI6IGNyZWF0ZURPTVBsYWNlaG9sZGVyLFxuXHRta0VsOiBta0VsLFxuXHRnZXRPdXRlckhUTUw6IGdldE91dGVySFRNTCxcblx0c2V0SW5uZXJIVE1MOiBzZXRJbm5lckhUTUwsXG5cdHJlbUF0dHI6IHJlbUF0dHIsXG5cdGdldEF0dHI6IGdldEF0dHIsXG5cdHNldEF0dHI6IHNldEF0dHIsXG5cdHNhZmVJbnNlcnQ6IHNhZmVJbnNlcnQsXG5cdHdhbGtBdHRyczogd2Fsa0F0dHJzLFxuXHR3YWxrTm9kZXM6IHdhbGtOb2Rlc1xufSk7XG5cbnZhciBzdHlsZU5vZGU7XG52YXIgY3NzVGV4dFByb3A7XG52YXIgYnlOYW1lID0ge307XG52YXIgcmVtYWluZGVyID0gW107XG52YXIgbmVlZHNJbmplY3QgPSBmYWxzZTtcblxuLy8gc2tpcCB0aGUgZm9sbG93aW5nIGNvZGUgb24gdGhlIHNlcnZlclxuaWYgKFdJTikge1xuICBzdHlsZU5vZGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8vIGNyZWF0ZSBhIG5ldyBzdHlsZSBlbGVtZW50IHdpdGggdGhlIGNvcnJlY3QgdHlwZVxuICAgIHZhciBuZXdOb2RlID0gbWtFbCgnc3R5bGUnKTtcbiAgICBzZXRBdHRyKG5ld05vZGUsICd0eXBlJywgJ3RleHQvY3NzJyk7XG5cbiAgICAvLyByZXBsYWNlIGFueSB1c2VyIG5vZGUgb3IgaW5zZXJ0IHRoZSBuZXcgb25lIGludG8gdGhlIGhlYWRcbiAgICB2YXIgdXNlck5vZGUgPSAkKCdzdHlsZVt0eXBlPXJpb3RdJyk7XG4gICAgaWYgKHVzZXJOb2RlKSB7XG4gICAgICBpZiAodXNlck5vZGUuaWQpIHsgbmV3Tm9kZS5pZCA9IHVzZXJOb2RlLmlkOyB9XG4gICAgICB1c2VyTm9kZS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdOb2RlLCB1c2VyTm9kZSk7XG4gICAgfVxuICAgIGVsc2UgeyBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKG5ld05vZGUpOyB9XG5cbiAgICByZXR1cm4gbmV3Tm9kZVxuICB9KSgpO1xuICBjc3NUZXh0UHJvcCA9IHN0eWxlTm9kZS5zdHlsZVNoZWV0O1xufVxuXG4vKipcbiAqIE9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB0byBpbmplY3QgYW5kIG1hbmFnZSB0aGUgY3NzIG9mIGV2ZXJ5IHRhZyBpbnN0YW5jZVxuICovXG52YXIgc3R5bGVNYW5hZ2VyID0ge1xuICBzdHlsZU5vZGU6IHN0eWxlTm9kZSxcbiAgLyoqXG4gICAqIFNhdmUgYSB0YWcgc3R5bGUgdG8gYmUgbGF0ZXIgaW5qZWN0ZWQgaW50byBET01cbiAgICogQHBhcmFtIHsgU3RyaW5nIH0gY3NzIC0gY3NzIHN0cmluZ1xuICAgKiBAcGFyYW0geyBTdHJpbmcgfSBuYW1lIC0gaWYgaXQncyBwYXNzZWQgd2Ugd2lsbCBtYXAgdGhlIGNzcyB0byBhIHRhZ25hbWVcbiAgICovXG4gIGFkZDogZnVuY3Rpb24gYWRkKGNzcywgbmFtZSkge1xuICAgIGlmIChuYW1lKSB7IGJ5TmFtZVtuYW1lXSA9IGNzczsgfVxuICAgIGVsc2UgeyByZW1haW5kZXIucHVzaChjc3MpOyB9XG4gICAgbmVlZHNJbmplY3QgPSB0cnVlO1xuICB9LFxuICAvKipcbiAgICogSW5qZWN0IGFsbCBwcmV2aW91c2x5IHNhdmVkIHRhZyBzdHlsZXMgaW50byBET01cbiAgICogaW5uZXJIVE1MIHNlZW1zIHNsb3c6IGh0dHA6Ly9qc3BlcmYuY29tL3Jpb3QtaW5zZXJ0LXN0eWxlXG4gICAqL1xuICBpbmplY3Q6IGZ1bmN0aW9uIGluamVjdCgpIHtcbiAgICBpZiAoIVdJTiB8fCAhbmVlZHNJbmplY3QpIHsgcmV0dXJuIH1cbiAgICBuZWVkc0luamVjdCA9IGZhbHNlO1xuICAgIHZhciBzdHlsZSA9IE9iamVjdC5rZXlzKGJ5TmFtZSlcbiAgICAgIC5tYXAoZnVuY3Rpb24oaykgeyByZXR1cm4gYnlOYW1lW2tdIH0pXG4gICAgICAuY29uY2F0KHJlbWFpbmRlcikuam9pbignXFxuJyk7XG4gICAgaWYgKGNzc1RleHRQcm9wKSB7IGNzc1RleHRQcm9wLmNzc1RleHQgPSBzdHlsZTsgfVxuICAgIGVsc2UgeyBzdHlsZU5vZGUuaW5uZXJIVE1MID0gc3R5bGU7IH1cbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgcmlvdCB0ZW1wbGF0ZSBlbmdpbmVcbiAqIEB2ZXJzaW9uIHYzLjAuMVxuICovXG4vKipcbiAqIHJpb3QudXRpbC5icmFja2V0c1xuICpcbiAqIC0gYGJyYWNrZXRzICAgIGAgLSBSZXR1cm5zIGEgc3RyaW5nIG9yIHJlZ2V4IGJhc2VkIG9uIGl0cyBwYXJhbWV0ZXJcbiAqIC0gYGJyYWNrZXRzLnNldGAgLSBDaGFuZ2UgdGhlIGN1cnJlbnQgcmlvdCBicmFja2V0c1xuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKiBnbG9iYWwgcmlvdCAqL1xuXG52YXIgYnJhY2tldHMgPSAoZnVuY3Rpb24gKFVOREVGKSB7XG5cbiAgdmFyXG4gICAgUkVHTE9CID0gJ2cnLFxuXG4gICAgUl9NTENPTU1TID0gL1xcL1xcKlteKl0qXFwqKyg/OlteKlxcL11bXipdKlxcKispKlxcLy9nLFxuXG4gICAgUl9TVFJJTkdTID0gL1wiW15cIlxcXFxdKig/OlxcXFxbXFxTXFxzXVteXCJcXFxcXSopKlwifCdbXidcXFxcXSooPzpcXFxcW1xcU1xcc11bXidcXFxcXSopKicvZyxcblxuICAgIFNfUUJMT0NLUyA9IFJfU1RSSU5HUy5zb3VyY2UgKyAnfCcgK1xuICAgICAgLyg/OlxcYnJldHVyblxccyt8KD86WyRcXHdcXClcXF1dfFxcK1xcK3wtLSlcXHMqKFxcLykoPyFbKlxcL10pKS8uc291cmNlICsgJ3wnICtcbiAgICAgIC9cXC8oPz1bXipcXC9dKVteW1xcL1xcXFxdKig/Oig/OlxcWyg/OlxcXFwufFteXFxdXFxcXF0qKSpcXF18XFxcXC4pW15bXFwvXFxcXF0qKSo/KFxcLylbZ2ltXSovLnNvdXJjZSxcblxuICAgIFVOU1VQUE9SVEVEID0gUmVnRXhwKCdbXFxcXCcgKyAneDAwLVxcXFx4MUY8PmEtekEtWjAtOVxcJ1wiLDtcXFxcXFxcXF0nKSxcblxuICAgIE5FRURfRVNDQVBFID0gLyg/PVtbXFxdKCkqKz8uXiR8XSkvZyxcblxuICAgIEZJTkRCUkFDRVMgPSB7XG4gICAgICAnKCc6IFJlZ0V4cCgnKFsoKV0pfCcgICArIFNfUUJMT0NLUywgUkVHTE9CKSxcbiAgICAgICdbJzogUmVnRXhwKCcoW1tcXFxcXV0pfCcgKyBTX1FCTE9DS1MsIFJFR0xPQiksXG4gICAgICAneyc6IFJlZ0V4cCgnKFt7fV0pfCcgICArIFNfUUJMT0NLUywgUkVHTE9CKVxuICAgIH0sXG5cbiAgICBERUZBVUxUID0gJ3sgfSc7XG5cbiAgdmFyIF9wYWlycyA9IFtcbiAgICAneycsICd9JyxcbiAgICAneycsICd9JyxcbiAgICAve1tefV0qfS8sXG4gICAgL1xcXFwoW3t9XSkvZyxcbiAgICAvXFxcXCh7KXx7L2csXG4gICAgUmVnRXhwKCdcXFxcXFxcXCh9KXwoW1soe10pfCh9KXwnICsgU19RQkxPQ0tTLCBSRUdMT0IpLFxuICAgIERFRkFVTFQsXG4gICAgL15cXHMqe1xcXj9cXHMqKFskXFx3XSspKD86XFxzKixcXHMqKFxcUyspKT9cXHMraW5cXHMrKFxcUy4qKVxccyp9LyxcbiAgICAvKF58W15cXFxcXSl7PVtcXFNcXHNdKj99L1xuICBdO1xuXG4gIHZhclxuICAgIGNhY2hlZEJyYWNrZXRzID0gVU5ERUYsXG4gICAgX3JlZ2V4LFxuICAgIF9jYWNoZSA9IFtdLFxuICAgIF9zZXR0aW5ncztcblxuICBmdW5jdGlvbiBfbG9vcGJhY2sgKHJlKSB7IHJldHVybiByZSB9XG5cbiAgZnVuY3Rpb24gX3Jld3JpdGUgKHJlLCBicCkge1xuICAgIGlmICghYnApIHsgYnAgPSBfY2FjaGU7IH1cbiAgICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICAgIHJlLnNvdXJjZS5yZXBsYWNlKC97L2csIGJwWzJdKS5yZXBsYWNlKC99L2csIGJwWzNdKSwgcmUuZ2xvYmFsID8gUkVHTE9CIDogJydcbiAgICApXG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlIChwYWlyKSB7XG4gICAgaWYgKHBhaXIgPT09IERFRkFVTFQpIHsgcmV0dXJuIF9wYWlycyB9XG5cbiAgICB2YXIgYXJyID0gcGFpci5zcGxpdCgnICcpO1xuXG4gICAgaWYgKGFyci5sZW5ndGggIT09IDIgfHwgVU5TVVBQT1JURUQudGVzdChwYWlyKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBicmFja2V0cyBcIicgKyBwYWlyICsgJ1wiJylcbiAgICB9XG4gICAgYXJyID0gYXJyLmNvbmNhdChwYWlyLnJlcGxhY2UoTkVFRF9FU0NBUEUsICdcXFxcJykuc3BsaXQoJyAnKSk7XG5cbiAgICBhcnJbNF0gPSBfcmV3cml0ZShhcnJbMV0ubGVuZ3RoID4gMSA/IC97W1xcU1xcc10qP30vIDogX3BhaXJzWzRdLCBhcnIpO1xuICAgIGFycls1XSA9IF9yZXdyaXRlKHBhaXIubGVuZ3RoID4gMyA/IC9cXFxcKHt8fSkvZyA6IF9wYWlyc1s1XSwgYXJyKTtcbiAgICBhcnJbNl0gPSBfcmV3cml0ZShfcGFpcnNbNl0sIGFycik7XG4gICAgYXJyWzddID0gUmVnRXhwKCdcXFxcXFxcXCgnICsgYXJyWzNdICsgJyl8KFtbKHtdKXwoJyArIGFyclszXSArICcpfCcgKyBTX1FCTE9DS1MsIFJFR0xPQik7XG4gICAgYXJyWzhdID0gcGFpcjtcbiAgICByZXR1cm4gYXJyXG4gIH1cblxuICBmdW5jdGlvbiBfYnJhY2tldHMgKHJlT3JJZHgpIHtcbiAgICByZXR1cm4gcmVPcklkeCBpbnN0YW5jZW9mIFJlZ0V4cCA/IF9yZWdleChyZU9ySWR4KSA6IF9jYWNoZVtyZU9ySWR4XVxuICB9XG5cbiAgX2JyYWNrZXRzLnNwbGl0ID0gZnVuY3Rpb24gc3BsaXQgKHN0ciwgdG1wbCwgX2JwKSB7XG4gICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHQ6IF9icCBpcyBmb3IgdGhlIGNvbXBpbGVyXG4gICAgaWYgKCFfYnApIHsgX2JwID0gX2NhY2hlOyB9XG5cbiAgICB2YXJcbiAgICAgIHBhcnRzID0gW10sXG4gICAgICBtYXRjaCxcbiAgICAgIGlzZXhwcixcbiAgICAgIHN0YXJ0LFxuICAgICAgcG9zLFxuICAgICAgcmUgPSBfYnBbNl07XG5cbiAgICBpc2V4cHIgPSBzdGFydCA9IHJlLmxhc3RJbmRleCA9IDA7XG5cbiAgICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhzdHIpKSkge1xuXG4gICAgICBwb3MgPSBtYXRjaC5pbmRleDtcblxuICAgICAgaWYgKGlzZXhwcikge1xuXG4gICAgICAgIGlmIChtYXRjaFsyXSkge1xuICAgICAgICAgIHJlLmxhc3RJbmRleCA9IHNraXBCcmFjZXMoc3RyLCBtYXRjaFsyXSwgcmUubGFzdEluZGV4KTtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2hbM10pIHtcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghbWF0Y2hbMV0pIHtcbiAgICAgICAgdW5lc2NhcGVTdHIoc3RyLnNsaWNlKHN0YXJ0LCBwb3MpKTtcbiAgICAgICAgc3RhcnQgPSByZS5sYXN0SW5kZXg7XG4gICAgICAgIHJlID0gX2JwWzYgKyAoaXNleHByIF49IDEpXTtcbiAgICAgICAgcmUubGFzdEluZGV4ID0gc3RhcnQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN0ciAmJiBzdGFydCA8IHN0ci5sZW5ndGgpIHtcbiAgICAgIHVuZXNjYXBlU3RyKHN0ci5zbGljZShzdGFydCkpO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJ0c1xuXG4gICAgZnVuY3Rpb24gdW5lc2NhcGVTdHIgKHMpIHtcbiAgICAgIGlmICh0bXBsIHx8IGlzZXhwcikge1xuICAgICAgICBwYXJ0cy5wdXNoKHMgJiYgcy5yZXBsYWNlKF9icFs1XSwgJyQxJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFydHMucHVzaChzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBza2lwQnJhY2VzIChzLCBjaCwgaXgpIHtcbiAgICAgIHZhclxuICAgICAgICBtYXRjaCxcbiAgICAgICAgcmVjY2ggPSBGSU5EQlJBQ0VTW2NoXTtcblxuICAgICAgcmVjY2gubGFzdEluZGV4ID0gaXg7XG4gICAgICBpeCA9IDE7XG4gICAgICB3aGlsZSAoKG1hdGNoID0gcmVjY2guZXhlYyhzKSkpIHtcbiAgICAgICAgaWYgKG1hdGNoWzFdICYmXG4gICAgICAgICAgIShtYXRjaFsxXSA9PT0gY2ggPyArK2l4IDogLS1peCkpIHsgYnJlYWsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGl4ID8gcy5sZW5ndGggOiByZWNjaC5sYXN0SW5kZXhcbiAgICB9XG4gIH07XG5cbiAgX2JyYWNrZXRzLmhhc0V4cHIgPSBmdW5jdGlvbiBoYXNFeHByIChzdHIpIHtcbiAgICByZXR1cm4gX2NhY2hlWzRdLnRlc3Qoc3RyKVxuICB9O1xuXG4gIF9icmFja2V0cy5sb29wS2V5cyA9IGZ1bmN0aW9uIGxvb3BLZXlzIChleHByKSB7XG4gICAgdmFyIG0gPSBleHByLm1hdGNoKF9jYWNoZVs5XSk7XG5cbiAgICByZXR1cm4gbVxuICAgICAgPyB7IGtleTogbVsxXSwgcG9zOiBtWzJdLCB2YWw6IF9jYWNoZVswXSArIG1bM10udHJpbSgpICsgX2NhY2hlWzFdIH1cbiAgICAgIDogeyB2YWw6IGV4cHIudHJpbSgpIH1cbiAgfTtcblxuICBfYnJhY2tldHMuYXJyYXkgPSBmdW5jdGlvbiBhcnJheSAocGFpcikge1xuICAgIHJldHVybiBwYWlyID8gX2NyZWF0ZShwYWlyKSA6IF9jYWNoZVxuICB9O1xuXG4gIGZ1bmN0aW9uIF9yZXNldCAocGFpcikge1xuICAgIGlmICgocGFpciB8fCAocGFpciA9IERFRkFVTFQpKSAhPT0gX2NhY2hlWzhdKSB7XG4gICAgICBfY2FjaGUgPSBfY3JlYXRlKHBhaXIpO1xuICAgICAgX3JlZ2V4ID0gcGFpciA9PT0gREVGQVVMVCA/IF9sb29wYmFjayA6IF9yZXdyaXRlO1xuICAgICAgX2NhY2hlWzldID0gX3JlZ2V4KF9wYWlyc1s5XSk7XG4gICAgfVxuICAgIGNhY2hlZEJyYWNrZXRzID0gcGFpcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIF9zZXRTZXR0aW5ncyAobykge1xuICAgIHZhciBiO1xuXG4gICAgbyA9IG8gfHwge307XG4gICAgYiA9IG8uYnJhY2tldHM7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sICdicmFja2V0cycsIHtcbiAgICAgIHNldDogX3Jlc2V0LFxuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBjYWNoZWRCcmFja2V0cyB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIF9zZXR0aW5ncyA9IG87XG4gICAgX3Jlc2V0KGIpO1xuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9icmFja2V0cywgJ3NldHRpbmdzJywge1xuICAgIHNldDogX3NldFNldHRpbmdzLFxuICAgIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gX3NldHRpbmdzIH1cbiAgfSk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQ6IGluIHRoZSBicm93c2VyIHJpb3QgaXMgYWx3YXlzIGluIHRoZSBzY29wZSAqL1xuICBfYnJhY2tldHMuc2V0dGluZ3MgPSB0eXBlb2YgcmlvdCAhPT0gJ3VuZGVmaW5lZCcgJiYgcmlvdC5zZXR0aW5ncyB8fCB7fTtcbiAgX2JyYWNrZXRzLnNldCA9IF9yZXNldDtcblxuICBfYnJhY2tldHMuUl9TVFJJTkdTID0gUl9TVFJJTkdTO1xuICBfYnJhY2tldHMuUl9NTENPTU1TID0gUl9NTENPTU1TO1xuICBfYnJhY2tldHMuU19RQkxPQ0tTID0gU19RQkxPQ0tTO1xuXG4gIHJldHVybiBfYnJhY2tldHNcblxufSkoKTtcblxuLyoqXG4gKiBAbW9kdWxlIHRtcGxcbiAqXG4gKiB0bXBsICAgICAgICAgIC0gUm9vdCBmdW5jdGlvbiwgcmV0dXJucyB0aGUgdGVtcGxhdGUgdmFsdWUsIHJlbmRlciB3aXRoIGRhdGFcbiAqIHRtcGwuaGFzRXhwciAgLSBUZXN0IHRoZSBleGlzdGVuY2Ugb2YgYSBleHByZXNzaW9uIGluc2lkZSBhIHN0cmluZ1xuICogdG1wbC5sb29wS2V5cyAtIEdldCB0aGUga2V5cyBmb3IgYW4gJ2VhY2gnIGxvb3AgKHVzZWQgYnkgYF9lYWNoYClcbiAqL1xuXG52YXIgdG1wbCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIF9jYWNoZSA9IHt9O1xuXG4gIGZ1bmN0aW9uIF90bXBsIChzdHIsIGRhdGEpIHtcbiAgICBpZiAoIXN0cikgeyByZXR1cm4gc3RyIH1cblxuICAgIHJldHVybiAoX2NhY2hlW3N0cl0gfHwgKF9jYWNoZVtzdHJdID0gX2NyZWF0ZShzdHIpKSkuY2FsbChkYXRhLCBfbG9nRXJyKVxuICB9XG5cbiAgX3RtcGwuaGFzRXhwciA9IGJyYWNrZXRzLmhhc0V4cHI7XG5cbiAgX3RtcGwubG9vcEtleXMgPSBicmFja2V0cy5sb29wS2V5cztcblxuICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICBfdG1wbC5jbGVhckNhY2hlID0gZnVuY3Rpb24gKCkgeyBfY2FjaGUgPSB7fTsgfTtcblxuICBfdG1wbC5lcnJvckhhbmRsZXIgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIF9sb2dFcnIgKGVyciwgY3R4KSB7XG5cbiAgICBlcnIucmlvdERhdGEgPSB7XG4gICAgICB0YWdOYW1lOiBjdHggJiYgY3R4LnJvb3QgJiYgY3R4LnJvb3QudGFnTmFtZSxcbiAgICAgIF9yaW90X2lkOiBjdHggJiYgY3R4Ll9yaW90X2lkICAvL2VzbGludC1kaXNhYmxlLWxpbmUgY2FtZWxjYXNlXG4gICAgfTtcblxuICAgIGlmIChfdG1wbC5lcnJvckhhbmRsZXIpIHsgX3RtcGwuZXJyb3JIYW5kbGVyKGVycik7IH1cbiAgICBlbHNlIGlmIChcbiAgICAgIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbidcbiAgICApIHtcbiAgICAgIGlmIChlcnIucmlvdERhdGEudGFnTmFtZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdSaW90IHRlbXBsYXRlIGVycm9yIHRocm93biBpbiB0aGUgPCVzPiB0YWcnLCBlcnIucmlvdERhdGEudGFnTmFtZS50b0xvd2VyQ2FzZSgpKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBfY3JlYXRlIChzdHIpIHtcbiAgICB2YXIgZXhwciA9IF9nZXRUbXBsKHN0cik7XG5cbiAgICBpZiAoZXhwci5zbGljZSgwLCAxMSkgIT09ICd0cnl7cmV0dXJuICcpIHsgZXhwciA9ICdyZXR1cm4gJyArIGV4cHI7IH1cblxuICAgIHJldHVybiBuZXcgRnVuY3Rpb24oJ0UnLCBleHByICsgJzsnKSAgICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy1mdW5jXG4gIH1cblxuICB2YXJcbiAgICBDSF9JREVYUFIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4MjA1NyksXG4gICAgUkVfQ1NOQU1FID0gL14oPzooLT9bX0EtWmEtelxceEEwLVxceEZGXVstXFx3XFx4QTAtXFx4RkZdKil8XFx1MjA1NyhcXGQrKX4pOi8sXG4gICAgUkVfUUJMT0NLID0gUmVnRXhwKGJyYWNrZXRzLlNfUUJMT0NLUywgJ2cnKSxcbiAgICBSRV9EUVVPVEUgPSAvXFx1MjA1Ny9nLFxuICAgIFJFX1FCTUFSSyA9IC9cXHUyMDU3KFxcZCspfi9nO1xuXG4gIGZ1bmN0aW9uIF9nZXRUbXBsIChzdHIpIHtcbiAgICB2YXJcbiAgICAgIHFzdHIgPSBbXSxcbiAgICAgIGV4cHIsXG4gICAgICBwYXJ0cyA9IGJyYWNrZXRzLnNwbGl0KHN0ci5yZXBsYWNlKFJFX0RRVU9URSwgJ1wiJyksIDEpO1xuXG4gICAgaWYgKHBhcnRzLmxlbmd0aCA+IDIgfHwgcGFydHNbMF0pIHtcbiAgICAgIHZhciBpLCBqLCBsaXN0ID0gW107XG5cbiAgICAgIGZvciAoaSA9IGogPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcblxuICAgICAgICBleHByID0gcGFydHNbaV07XG5cbiAgICAgICAgaWYgKGV4cHIgJiYgKGV4cHIgPSBpICYgMVxuXG4gICAgICAgICAgICA/IF9wYXJzZUV4cHIoZXhwciwgMSwgcXN0cilcblxuICAgICAgICAgICAgOiAnXCInICsgZXhwclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcclxcbj98XFxuL2csICdcXFxcbicpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKSArXG4gICAgICAgICAgICAgICdcIidcblxuICAgICAgICAgICkpIHsgbGlzdFtqKytdID0gZXhwcjsgfVxuXG4gICAgICB9XG5cbiAgICAgIGV4cHIgPSBqIDwgMiA/IGxpc3RbMF1cbiAgICAgICAgICAgOiAnWycgKyBsaXN0LmpvaW4oJywnKSArICddLmpvaW4oXCJcIiknO1xuXG4gICAgfSBlbHNlIHtcblxuICAgICAgZXhwciA9IF9wYXJzZUV4cHIocGFydHNbMV0sIDAsIHFzdHIpO1xuICAgIH1cblxuICAgIGlmIChxc3RyWzBdKSB7XG4gICAgICBleHByID0gZXhwci5yZXBsYWNlKFJFX1FCTUFSSywgZnVuY3Rpb24gKF8sIHBvcykge1xuICAgICAgICByZXR1cm4gcXN0cltwb3NdXG4gICAgICAgICAgLnJlcGxhY2UoL1xcci9nLCAnXFxcXHInKVxuICAgICAgICAgIC5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJylcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZXhwclxuICB9XG5cbiAgdmFyXG4gICAgUkVfQlJFTkQgPSB7XG4gICAgICAnKCc6IC9bKCldL2csXG4gICAgICAnWyc6IC9bW1xcXV0vZyxcbiAgICAgICd7JzogL1t7fV0vZ1xuICAgIH07XG5cbiAgZnVuY3Rpb24gX3BhcnNlRXhwciAoZXhwciwgYXNUZXh0LCBxc3RyKSB7XG5cbiAgICBleHByID0gZXhwclxuICAgICAgICAgIC5yZXBsYWNlKFJFX1FCTE9DSywgZnVuY3Rpb24gKHMsIGRpdikge1xuICAgICAgICAgICAgcmV0dXJuIHMubGVuZ3RoID4gMiAmJiAhZGl2ID8gQ0hfSURFWFBSICsgKHFzdHIucHVzaChzKSAtIDEpICsgJ34nIDogc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKClcbiAgICAgICAgICAucmVwbGFjZSgvXFwgPyhbW1xcKHt9LD9cXC46XSlcXCA/L2csICckMScpO1xuXG4gICAgaWYgKGV4cHIpIHtcbiAgICAgIHZhclxuICAgICAgICBsaXN0ID0gW10sXG4gICAgICAgIGNudCA9IDAsXG4gICAgICAgIG1hdGNoO1xuXG4gICAgICB3aGlsZSAoZXhwciAmJlxuICAgICAgICAgICAgKG1hdGNoID0gZXhwci5tYXRjaChSRV9DU05BTUUpKSAmJlxuICAgICAgICAgICAgIW1hdGNoLmluZGV4XG4gICAgICAgICkge1xuICAgICAgICB2YXJcbiAgICAgICAgICBrZXksXG4gICAgICAgICAganNiLFxuICAgICAgICAgIHJlID0gLyx8KFtbeyhdKXwkL2c7XG5cbiAgICAgICAgZXhwciA9IFJlZ0V4cC5yaWdodENvbnRleHQ7XG4gICAgICAgIGtleSAgPSBtYXRjaFsyXSA/IHFzdHJbbWF0Y2hbMl1dLnNsaWNlKDEsIC0xKS50cmltKCkucmVwbGFjZSgvXFxzKy9nLCAnICcpIDogbWF0Y2hbMV07XG5cbiAgICAgICAgd2hpbGUgKGpzYiA9IChtYXRjaCA9IHJlLmV4ZWMoZXhwcikpWzFdKSB7IHNraXBCcmFjZXMoanNiLCByZSk7IH1cblxuICAgICAgICBqc2IgID0gZXhwci5zbGljZSgwLCBtYXRjaC5pbmRleCk7XG4gICAgICAgIGV4cHIgPSBSZWdFeHAucmlnaHRDb250ZXh0O1xuXG4gICAgICAgIGxpc3RbY250KytdID0gX3dyYXBFeHByKGpzYiwgMSwga2V5KTtcbiAgICAgIH1cblxuICAgICAgZXhwciA9ICFjbnQgPyBfd3JhcEV4cHIoZXhwciwgYXNUZXh0KVxuICAgICAgICAgICA6IGNudCA+IDEgPyAnWycgKyBsaXN0LmpvaW4oJywnKSArICddLmpvaW4oXCIgXCIpLnRyaW0oKScgOiBsaXN0WzBdO1xuICAgIH1cbiAgICByZXR1cm4gZXhwclxuXG4gICAgZnVuY3Rpb24gc2tpcEJyYWNlcyAoY2gsIHJlKSB7XG4gICAgICB2YXJcbiAgICAgICAgbW0sXG4gICAgICAgIGx2ID0gMSxcbiAgICAgICAgaXIgPSBSRV9CUkVORFtjaF07XG5cbiAgICAgIGlyLmxhc3RJbmRleCA9IHJlLmxhc3RJbmRleDtcbiAgICAgIHdoaWxlIChtbSA9IGlyLmV4ZWMoZXhwcikpIHtcbiAgICAgICAgaWYgKG1tWzBdID09PSBjaCkgeyArK2x2OyB9XG4gICAgICAgIGVsc2UgaWYgKCEtLWx2KSB7IGJyZWFrIH1cbiAgICAgIH1cbiAgICAgIHJlLmxhc3RJbmRleCA9IGx2ID8gZXhwci5sZW5ndGggOiBpci5sYXN0SW5kZXg7XG4gICAgfVxuICB9XG5cbiAgLy8gaXN0YW5idWwgaWdub3JlIG5leHQ6IG5vdCBib3RoXG4gIHZhciAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIEpTX0NPTlRFWFQgPSAnXCJpbiB0aGlzP3RoaXM6JyArICh0eXBlb2Ygd2luZG93ICE9PSAnb2JqZWN0JyA/ICdnbG9iYWwnIDogJ3dpbmRvdycpICsgJykuJyxcbiAgICBKU19WQVJOQU1FID0gL1sse11bXFwkXFx3XSsoPz06KXwoXiAqfFteJFxcd1xcLntdKSg/ISg/OnR5cGVvZnx0cnVlfGZhbHNlfG51bGx8dW5kZWZpbmVkfGlufGluc3RhbmNlb2Z8aXMoPzpGaW5pdGV8TmFOKXx2b2lkfE5hTnxuZXd8RGF0ZXxSZWdFeHB8TWF0aCkoPyFbJFxcd10pKShbJF9BLVphLXpdWyRcXHddKikvZyxcbiAgICBKU19OT1BST1BTID0gL14oPz0oXFwuWyRcXHddKykpXFwxKD86W14uWyhdfCQpLztcblxuICBmdW5jdGlvbiBfd3JhcEV4cHIgKGV4cHIsIGFzVGV4dCwga2V5KSB7XG4gICAgdmFyIHRiO1xuXG4gICAgZXhwciA9IGV4cHIucmVwbGFjZShKU19WQVJOQU1FLCBmdW5jdGlvbiAobWF0Y2gsIHAsIG12YXIsIHBvcywgcykge1xuICAgICAgaWYgKG12YXIpIHtcbiAgICAgICAgcG9zID0gdGIgPyAwIDogcG9zICsgbWF0Y2gubGVuZ3RoO1xuXG4gICAgICAgIGlmIChtdmFyICE9PSAndGhpcycgJiYgbXZhciAhPT0gJ2dsb2JhbCcgJiYgbXZhciAhPT0gJ3dpbmRvdycpIHtcbiAgICAgICAgICBtYXRjaCA9IHAgKyAnKFwiJyArIG12YXIgKyBKU19DT05URVhUICsgbXZhcjtcbiAgICAgICAgICBpZiAocG9zKSB7IHRiID0gKHMgPSBzW3Bvc10pID09PSAnLicgfHwgcyA9PT0gJygnIHx8IHMgPT09ICdbJzsgfVxuICAgICAgICB9IGVsc2UgaWYgKHBvcykge1xuICAgICAgICAgIHRiID0gIUpTX05PUFJPUFMudGVzdChzLnNsaWNlKHBvcykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbWF0Y2hcbiAgICB9KTtcblxuICAgIGlmICh0Yikge1xuICAgICAgZXhwciA9ICd0cnl7cmV0dXJuICcgKyBleHByICsgJ31jYXRjaChlKXtFKGUsdGhpcyl9JztcbiAgICB9XG5cbiAgICBpZiAoa2V5KSB7XG5cbiAgICAgIGV4cHIgPSAodGJcbiAgICAgICAgICA/ICdmdW5jdGlvbigpeycgKyBleHByICsgJ30uY2FsbCh0aGlzKScgOiAnKCcgKyBleHByICsgJyknXG4gICAgICAgICkgKyAnP1wiJyArIGtleSArICdcIjpcIlwiJztcblxuICAgIH0gZWxzZSBpZiAoYXNUZXh0KSB7XG5cbiAgICAgIGV4cHIgPSAnZnVuY3Rpb24odil7JyArICh0YlxuICAgICAgICAgID8gZXhwci5yZXBsYWNlKCdyZXR1cm4gJywgJ3Y9JykgOiAndj0oJyArIGV4cHIgKyAnKSdcbiAgICAgICAgKSArICc7cmV0dXJuIHZ8fHY9PT0wP3Y6XCJcIn0uY2FsbCh0aGlzKSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGV4cHJcbiAgfVxuXG4gIF90bXBsLnZlcnNpb24gPSBicmFja2V0cy52ZXJzaW9uID0gJ3YzLjAuMSc7XG5cbiAgcmV0dXJuIF90bXBsXG5cbn0pKCk7XG5cbnZhciBvYnNlcnZhYmxlJDEgPSBmdW5jdGlvbihlbCkge1xuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIG9yaWdpbmFsIG9iamVjdCBvciBjcmVhdGUgYSBuZXcgZW1wdHkgb25lXG4gICAqIEB0eXBlIHsgT2JqZWN0IH1cbiAgICovXG5cbiAgZWwgPSBlbCB8fCB7fTtcblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICovXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICAvKipcbiAgICogUHVibGljIEFwaVxuICAgKi9cblxuICAvLyBleHRlbmQgdGhlIGVsIG9iamVjdCBhZGRpbmcgdGhlIG9ic2VydmFibGUgbWV0aG9kc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhlbCwge1xuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byB0aGUgZ2l2ZW4gYGV2ZW50YCBhbmRzXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBlYWNoIHRpbWUgYW4gZXZlbnQgaXMgdHJpZ2dlcmVkLlxuICAgICAqIEBwYXJhbSAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAodHlwZW9mIGZuID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgeyAoY2FsbGJhY2tzW2V2ZW50XSA9IGNhbGxiYWNrc1tldmVudF0gfHwgW10pLnB1c2goZm4pOyB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBgZXZlbnRgIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9mZjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAoZXZlbnQgPT0gJyonICYmICFmbikgeyBjYWxsYmFja3MgPSB7fTsgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBjYWxsYmFja3NbZXZlbnRdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyBjYiA9IGFyciAmJiBhcnJbaV07ICsraSkge1xuICAgICAgICAgICAgICBpZiAoY2IgPT0gZm4pIHsgYXJyLnNwbGljZShpLS0sIDEpOyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHsgZGVsZXRlIGNhbGxiYWNrc1tldmVudF07IH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZFxuICAgICAqIGV4ZWN1dGUgdGhlIGBjYWxsYmFja2AgYXQgbW9zdCBvbmNlXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAgICAgKiBAcmV0dXJucyB7IE9iamVjdCB9IGVsXG4gICAgICovXG4gICAgb25lOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uKCkge1xuICAgICAgICAgIGVsLm9mZihldmVudCwgb24pO1xuICAgICAgICAgIGZuLmFwcGx5KGVsLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbC5vbihldmVudCwgb24pXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYWxsIGNhbGxiYWNrIGZ1bmN0aW9ucyB0aGF0IGxpc3RlbiB0b1xuICAgICAqIHRoZSBnaXZlbiBgZXZlbnRgXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIHRyaWdnZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgYXJndW1lbnRzJDEgPSBhcmd1bWVudHM7XG5cblxuICAgICAgICAvLyBnZXR0aW5nIHRoZSBhcmd1bWVudHNcbiAgICAgICAgdmFyIGFyZ2xlbiA9IGFyZ3VtZW50cy5sZW5ndGggLSAxLFxuICAgICAgICAgIGFyZ3MgPSBuZXcgQXJyYXkoYXJnbGVuKSxcbiAgICAgICAgICBmbnMsXG4gICAgICAgICAgZm4sXG4gICAgICAgICAgaTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJnbGVuOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzJDFbaSArIDFdOyAvLyBza2lwIGZpcnN0IGFyZ3VtZW50XG4gICAgICAgIH1cblxuICAgICAgICBmbnMgPSBzbGljZS5jYWxsKGNhbGxiYWNrc1tldmVudF0gfHwgW10sIDApO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGZuID0gZm5zW2ldOyArK2kpIHtcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJncyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY2FsbGJhY2tzWycqJ10gJiYgZXZlbnQgIT0gJyonKVxuICAgICAgICAgIHsgZWwudHJpZ2dlci5hcHBseShlbCwgWycqJywgZXZlbnRdLmNvbmNhdChhcmdzKSk7IH1cblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBlbFxuXG59O1xuXG4vKipcbiAqIFNwZWNpYWxpemVkIGZ1bmN0aW9uIGZvciBsb29waW5nIGFuIGFycmF5LWxpa2UgY29sbGVjdGlvbiB3aXRoIGBlYWNoPXt9YFxuICogQHBhcmFtICAgeyBBcnJheSB9IGxpc3QgLSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0gICB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb25cbiAqIEByZXR1cm5zIHsgQXJyYXkgfSB0aGUgYXJyYXkgbG9vcGVkXG4gKi9cbmZ1bmN0aW9uIGVhY2gobGlzdCwgZm4pIHtcbiAgdmFyIGxlbiA9IGxpc3QgPyBsaXN0Lmxlbmd0aCA6IDA7XG5cbiAgZm9yICh2YXIgaSA9IDAsIGVsOyBpIDwgbGVuOyArK2kpIHtcbiAgICBlbCA9IGxpc3RbaV07XG4gICAgLy8gcmV0dXJuIGZhbHNlIC0+IGN1cnJlbnQgaXRlbSB3YXMgcmVtb3ZlZCBieSBmbiBkdXJpbmcgdGhlIGxvb3BcbiAgICBpZiAoZm4oZWwsIGkpID09PSBmYWxzZSlcbiAgICAgIHsgaS0tOyB9XG4gIH1cbiAgcmV0dXJuIGxpc3Rcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGFuIGFycmF5IGNvbnRhaW5zIGFuIGl0ZW1cbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBhcnJheSAtIHRhcmdldCBhcnJheVxuICogQHBhcmFtICAgeyAqIH0gaXRlbSAtIGl0ZW0gdG8gdGVzdFxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBjb250YWlucyhhcnJheSwgaXRlbSkge1xuICByZXR1cm4gfmFycmF5LmluZGV4T2YoaXRlbSlcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIGNvbnRhaW5pbmcgZGFzaGVzIHRvIGNhbWVsIGNhc2VcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gc3RyIC0gaW5wdXQgc3RyaW5nXG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IG15LXN0cmluZyAtPiBteVN0cmluZ1xuICovXG5mdW5jdGlvbiB0b0NhbWVsKHN0cikge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoLy0oXFx3KS9nLCBmdW5jdGlvbiAoXywgYykgeyByZXR1cm4gYy50b1VwcGVyQ2FzZSgpOyB9KVxufVxuXG4vKipcbiAqIEZhc3RlciBTdHJpbmcgc3RhcnRzV2l0aCBhbHRlcm5hdGl2ZVxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBzdHIgLSBzb3VyY2Ugc3RyaW5nXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IHZhbHVlIC0gdGVzdCBzdHJpbmdcbiAqIEByZXR1cm5zIHsgQm9vbGVhbiB9IC1cbiAqL1xuZnVuY3Rpb24gc3RhcnRzV2l0aChzdHIsIHZhbHVlKSB7XG4gIHJldHVybiBzdHIuc2xpY2UoMCwgdmFsdWUubGVuZ3RoKSA9PT0gdmFsdWVcbn1cblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gc2V0IGFuIGltbXV0YWJsZSBwcm9wZXJ0eVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBlbCAtIG9iamVjdCB3aGVyZSB0aGUgbmV3IHByb3BlcnR5IHdpbGwgYmUgc2V0XG4gKiBAcGFyYW0gICB7IFN0cmluZyB9IGtleSAtIG9iamVjdCBrZXkgd2hlcmUgdGhlIG5ldyBwcm9wZXJ0eSB3aWxsIGJlIHN0b3JlZFxuICogQHBhcmFtICAgeyAqIH0gdmFsdWUgLSB2YWx1ZSBvZiB0aGUgbmV3IHByb3BlcnR5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdGlvbnMgLSBzZXQgdGhlIHByb3Blcnkgb3ZlcnJpZGluZyB0aGUgZGVmYXVsdCBvcHRpb25zXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IC0gdGhlIGluaXRpYWwgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGVsLCBrZXksIHZhbHVlLCBvcHRpb25zKSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbCwga2V5LCBleHRlbmQoe1xuICAgIHZhbHVlOiB2YWx1ZSxcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0sIG9wdGlvbnMpKTtcbiAgcmV0dXJuIGVsXG59XG5cbi8qKlxuICogRXh0ZW5kIGFueSBvYmplY3Qgd2l0aCBvdGhlciBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHNyYyAtIHNvdXJjZSBvYmplY3RcbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gdGhlIHJlc3VsdGluZyBleHRlbmRlZCBvYmplY3RcbiAqXG4gKiB2YXIgb2JqID0geyBmb286ICdiYXonIH1cbiAqIGV4dGVuZChvYmosIHtiYXI6ICdiYXInLCBmb286ICdiYXInfSlcbiAqIGNvbnNvbGUubG9nKG9iaikgPT4ge2JhcjogJ2JhcicsIGZvbzogJ2Jhcid9XG4gKlxuICovXG5mdW5jdGlvbiBleHRlbmQoc3JjKSB7XG4gIHZhciBvYmosIGFyZ3MgPSBhcmd1bWVudHM7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChvYmogPSBhcmdzW2ldKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoaXMgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3QgY291bGQgYmUgb3ZlcnJpZGRlblxuICAgICAgICBpZiAoaXNXcml0YWJsZShzcmMsIGtleSkpXG4gICAgICAgICAgeyBzcmNba2V5XSA9IG9ialtrZXldOyB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBzcmNcbn1cblxudmFyIG1pc2MgPSBPYmplY3QuZnJlZXplKHtcblx0ZWFjaDogZWFjaCxcblx0Y29udGFpbnM6IGNvbnRhaW5zLFxuXHR0b0NhbWVsOiB0b0NhbWVsLFxuXHRzdGFydHNXaXRoOiBzdGFydHNXaXRoLFxuXHRkZWZpbmVQcm9wZXJ0eTogZGVmaW5lUHJvcGVydHksXG5cdGV4dGVuZDogZXh0ZW5kXG59KTtcblxudmFyIEVWRU5UU19QUkVGSVhfUkVHRVggPSAvXm9uLztcblxuLyoqXG4gKiBUcmlnZ2VyIERPTSBldmVudHNcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSBkb20gLSBkb20gZWxlbWVudCB0YXJnZXQgb2YgdGhlIGV2ZW50XG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gaGFuZGxlciAtIHVzZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZSAtIGV2ZW50IG9iamVjdFxuICovXG5mdW5jdGlvbiBoYW5kbGVFdmVudChkb20sIGhhbmRsZXIsIGUpIHtcbiAgdmFyIHB0YWcgPSB0aGlzLl9wYXJlbnQsXG4gICAgaXRlbSA9IHRoaXMuX2l0ZW07XG5cbiAgaWYgKCFpdGVtKVxuICAgIHsgd2hpbGUgKHB0YWcgJiYgIWl0ZW0pIHtcbiAgICAgIGl0ZW0gPSBwdGFnLl9pdGVtO1xuICAgICAgcHRhZyA9IHB0YWcuX3BhcmVudDtcbiAgICB9IH1cblxuICAvLyBvdmVycmlkZSB0aGUgZXZlbnQgcHJvcGVydGllc1xuICBpZiAoaXNXcml0YWJsZShlLCAnY3VycmVudFRhcmdldCcpKSB7IGUuY3VycmVudFRhcmdldCA9IGRvbTsgfVxuICBpZiAoaXNXcml0YWJsZShlLCAndGFyZ2V0JykpIHsgZS50YXJnZXQgPSBlLnNyY0VsZW1lbnQ7IH1cbiAgaWYgKGlzV3JpdGFibGUoZSwgJ3doaWNoJykpIHsgZS53aGljaCA9IGUuY2hhckNvZGUgfHwgZS5rZXlDb2RlOyB9XG5cbiAgZS5pdGVtID0gaXRlbTtcblxuICBoYW5kbGVyLmNhbGwodGhpcywgZSk7XG5cbiAgaWYgKCFlLnByZXZlbnRVcGRhdGUpIHtcbiAgICB2YXIgcCA9IGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0aGlzKTtcbiAgICAvLyBmaXhlcyAjMjA4M1xuICAgIGlmIChwLmlzTW91bnRlZCkgeyBwLnVwZGF0ZSgpOyB9XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRhY2ggYW4gZXZlbnQgdG8gYSBET00gbm9kZVxuICogQHBhcmFtIHsgU3RyaW5nIH0gbmFtZSAtIGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7IEZ1bmN0aW9uIH0gaGFuZGxlciAtIGV2ZW50IGNhbGxiYWNrXG4gKiBAcGFyYW0geyBPYmplY3QgfSBkb20gLSBkb20gbm9kZVxuICogQHBhcmFtIHsgVGFnIH0gdGFnIC0gdGFnIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIHNldEV2ZW50SGFuZGxlcihuYW1lLCBoYW5kbGVyLCBkb20sIHRhZykge1xuICB2YXIgZXZlbnROYW1lLFxuICAgIGNiID0gaGFuZGxlRXZlbnQuYmluZCh0YWcsIGRvbSwgaGFuZGxlcik7XG5cbiAgaWYgKCFkb20uYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIGRvbVtuYW1lXSA9IGNiO1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gYXZvaWQgdG8gYmluZCB0d2ljZSB0aGUgc2FtZSBldmVudFxuICBkb21bbmFtZV0gPSBudWxsO1xuXG4gIC8vIG5vcm1hbGl6ZSBldmVudCBuYW1lXG4gIGV2ZW50TmFtZSA9IG5hbWUucmVwbGFjZShFVkVOVFNfUFJFRklYX1JFR0VYLCAnJyk7XG5cbiAgLy8gY2FjaGUgdGhlIGNhbGxiYWNrIGRpcmVjdGx5IG9uIHRoZSBET00gbm9kZVxuICBpZiAoIWRvbS5fcmlvdEV2ZW50cykgeyBkb20uX3Jpb3RFdmVudHMgPSB7fTsgfVxuXG4gIGlmIChkb20uX3Jpb3RFdmVudHNbbmFtZV0pXG4gICAgeyBkb20ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGRvbS5fcmlvdEV2ZW50c1tuYW1lXSk7IH1cblxuICBkb20uX3Jpb3RFdmVudHNbbmFtZV0gPSBjYjtcbiAgZG9tLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYiwgZmFsc2UpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBkeW5hbWljYWxseSBjcmVhdGVkIGRhdGEtaXMgdGFncyB3aXRoIGNoYW5naW5nIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0geyBPYmplY3QgfSBleHByIC0gZXhwcmVzc2lvbiB0YWcgYW5kIGV4cHJlc3Npb24gaW5mb1xuICogQHBhcmFtIHsgVGFnIH0gcGFyZW50IC0gcGFyZW50IGZvciB0YWcgY3JlYXRpb25cbiAqL1xuZnVuY3Rpb24gdXBkYXRlRGF0YUlzKGV4cHIsIHBhcmVudCkge1xuICB2YXIgdGFnTmFtZSA9IHRtcGwoZXhwci52YWx1ZSwgcGFyZW50KSxcbiAgICBjb25mO1xuXG4gIGlmIChleHByLnRhZyAmJiBleHByLnRhZ05hbWUgPT09IHRhZ05hbWUpIHtcbiAgICBleHByLnRhZy51cGRhdGUoKTtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIHN5bmMgX3BhcmVudCB0byBhY2NvbW1vZGF0ZSBjaGFuZ2luZyB0YWduYW1lc1xuICBpZiAoZXhwci50YWcpIHtcbiAgICBlYWNoKGV4cHIuYXR0cnMsIGZ1bmN0aW9uIChhKSB7IHJldHVybiBzZXRBdHRyKGV4cHIudGFnLnJvb3QsIGEubmFtZSwgYS52YWx1ZSk7IH0pO1xuICAgIGV4cHIudGFnLnVubW91bnQodHJ1ZSk7XG4gIH1cblxuICBleHByLmltcGwgPSBfX1RBR19JTVBMW3RhZ05hbWVdO1xuICBjb25mID0ge3Jvb3Q6IGV4cHIuZG9tLCBwYXJlbnQ6IHBhcmVudCwgaGFzSW1wbDogdHJ1ZSwgdGFnTmFtZTogdGFnTmFtZX07XG4gIGV4cHIudGFnID0gaW5pdENoaWxkVGFnKGV4cHIuaW1wbCwgY29uZiwgZXhwci5kb20uaW5uZXJIVE1MLCBwYXJlbnQpO1xuICBleHByLnRhZ05hbWUgPSB0YWdOYW1lO1xuICBleHByLnRhZy5tb3VudCgpO1xuXG4gIC8vIHBhcmVudCBpcyB0aGUgcGxhY2Vob2xkZXIgdGFnLCBub3QgdGhlIGR5bmFtaWMgdGFnIHNvIGNsZWFuIHVwXG4gIHBhcmVudC5vbigndW5tb3VudCcsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZGVsTmFtZSA9IGV4cHIudGFnLm9wdHMuZGF0YUlzLFxuICAgICAgdGFncyA9IGV4cHIudGFnLnBhcmVudC50YWdzLFxuICAgICAgX3RhZ3MgPSBleHByLnRhZy5fcGFyZW50LnRhZ3M7XG4gICAgYXJyYXlpc2hSZW1vdmUodGFncywgZGVsTmFtZSwgZXhwci50YWcpO1xuICAgIGFycmF5aXNoUmVtb3ZlKF90YWdzLCBkZWxOYW1lLCBleHByLnRhZyk7XG4gICAgZXhwci50YWcudW5tb3VudCgpO1xuICB9KTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgb24gc2luZ2xlIHRhZyBleHByZXNzaW9uXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE9iamVjdCB9IGV4cHIgLSBleHByZXNzaW9uIGxvZ2ljXG4gKiBAcmV0dXJucyB7IHVuZGVmaW5lZCB9XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUV4cHJlc3Npb24oZXhwcikge1xuICB2YXIgZG9tID0gZXhwci5kb20sXG4gICAgYXR0ck5hbWUgPSBleHByLmF0dHIsXG4gICAgaXNUb2dnbGUgPSBjb250YWlucyhbU0hPV19ESVJFQ1RJVkUsIEhJREVfRElSRUNUSVZFXSwgYXR0ck5hbWUpLFxuICAgIHZhbHVlID0gdG1wbChleHByLmV4cHIsIHRoaXMpLFxuICAgIGlzVmFsdWVBdHRyID0gYXR0ck5hbWUgPT09ICdyaW90LXZhbHVlJyxcbiAgICBpc1ZpcnR1YWwgPSBleHByLnJvb3QgJiYgZXhwci5yb290LnRhZ05hbWUgPT09ICdWSVJUVUFMJyxcbiAgICBwYXJlbnQgPSBkb20gJiYgKGV4cHIucGFyZW50IHx8IGRvbS5wYXJlbnROb2RlKSxcbiAgICBvbGQ7XG5cbiAgaWYgKGV4cHIuYm9vbClcbiAgICB7IHZhbHVlID0gdmFsdWUgPyBhdHRyTmFtZSA6IGZhbHNlOyB9XG4gIGVsc2UgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbClcbiAgICB7IHZhbHVlID0gJyc7IH1cblxuICBpZiAoZXhwci5fcmlvdF9pZCkgeyAvLyBpZiBpdCdzIGEgdGFnXG4gICAgaWYgKGV4cHIuaXNNb3VudGVkKSB7XG4gICAgICBleHByLnVwZGF0ZSgpO1xuXG4gICAgLy8gaWYgaXQgaGFzbid0IGJlZW4gbW91bnRlZCB5ZXQsIGRvIHRoYXQgbm93LlxuICAgIH0gZWxzZSB7XG4gICAgICBleHByLm1vdW50KCk7XG5cbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIG1ha2VWaXJ0dWFsLmNhbGwoZXhwciwgZnJhZyk7XG4gICAgICAgIGV4cHIucm9vdC5wYXJlbnRFbGVtZW50LnJlcGxhY2VDaGlsZChmcmFnLCBleHByLnJvb3QpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm5cbiAgfVxuXG4gIG9sZCA9IGV4cHIudmFsdWU7XG4gIGV4cHIudmFsdWUgPSB2YWx1ZTtcblxuICBpZiAoZXhwci51cGRhdGUpIHtcbiAgICBleHByLnVwZGF0ZSgpO1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGV4cHIuaXNSdGFnICYmIHZhbHVlKSB7IHJldHVybiB1cGRhdGVEYXRhSXMoZXhwciwgdGhpcykgfVxuICBpZiAob2xkID09PSB2YWx1ZSkgeyByZXR1cm4gfVxuICAvLyBubyBjaGFuZ2UsIHNvIG5vdGhpbmcgbW9yZSB0byBkb1xuICBpZiAoaXNWYWx1ZUF0dHIgJiYgZG9tLnZhbHVlID09PSB2YWx1ZSkgeyByZXR1cm4gfVxuXG4gIC8vIHRleHRhcmVhIGFuZCB0ZXh0IG5vZGVzIGhhdmUgbm8gYXR0cmlidXRlIG5hbWVcbiAgaWYgKCFhdHRyTmFtZSkge1xuICAgIC8vIGFib3V0ICM4MTUgdy9vIHJlcGxhY2U6IHRoZSBicm93c2VyIGNvbnZlcnRzIHRoZSB2YWx1ZSB0byBhIHN0cmluZyxcbiAgICAvLyB0aGUgY29tcGFyaXNvbiBieSBcIj09XCIgZG9lcyB0b28sIGJ1dCBub3QgaW4gdGhlIHNlcnZlclxuICAgIHZhbHVlICs9ICcnO1xuICAgIC8vIHRlc3QgZm9yIHBhcmVudCBhdm9pZHMgZXJyb3Igd2l0aCBpbnZhbGlkIGFzc2lnbm1lbnQgdG8gbm9kZVZhbHVlXG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgLy8gY2FjaGUgdGhlIHBhcmVudCBub2RlIGJlY2F1c2Ugc29tZWhvdyBpdCB3aWxsIGJlY29tZSBudWxsIG9uIElFXG4gICAgICAvLyBvbiB0aGUgbmV4dCBpdGVyYXRpb25cbiAgICAgIGV4cHIucGFyZW50ID0gcGFyZW50O1xuICAgICAgaWYgKHBhcmVudC50YWdOYW1lID09PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgIHBhcmVudC52YWx1ZSA9IHZhbHVlOyAgICAgICAgICAgICAgICAgICAgLy8gIzExMTNcbiAgICAgICAgaWYgKCFJRV9WRVJTSU9OKSB7IGRvbS5ub2RlVmFsdWUgPSB2YWx1ZTsgfSAgLy8gIzE2MjUgSUUgdGhyb3dzIGhlcmUsIG5vZGVWYWx1ZVxuICAgICAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2lsbCBiZSBhdmFpbGFibGUgb24gJ3VwZGF0ZWQnXG4gICAgICBlbHNlIHsgZG9tLm5vZGVWYWx1ZSA9IHZhbHVlOyB9XG4gICAgfVxuICAgIHJldHVyblxuICB9XG5cbiAgLy8gcmVtb3ZlIG9yaWdpbmFsIGF0dHJpYnV0ZVxuICBpZiAoIWV4cHIuaXNBdHRyUmVtb3ZlZCB8fCAhdmFsdWUpIHtcbiAgICByZW1BdHRyKGRvbSwgYXR0ck5hbWUpO1xuICAgIGV4cHIuaXNBdHRyUmVtb3ZlZCA9IHRydWU7XG4gIH1cblxuICAvLyBldmVudCBoYW5kbGVyXG4gIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgIHNldEV2ZW50SGFuZGxlcihhdHRyTmFtZSwgdmFsdWUsIGRvbSwgdGhpcyk7XG4gIC8vIHNob3cgLyBoaWRlXG4gIH0gZWxzZSBpZiAoaXNUb2dnbGUpIHtcbiAgICBpZiAoYXR0ck5hbWUgPT09IEhJREVfRElSRUNUSVZFKSB7IHZhbHVlID0gIXZhbHVlOyB9XG4gICAgZG9tLnN0eWxlLmRpc3BsYXkgPSB2YWx1ZSA/ICcnIDogJ25vbmUnO1xuICAvLyBmaWVsZCB2YWx1ZVxuICB9IGVsc2UgaWYgKGlzVmFsdWVBdHRyKSB7XG4gICAgZG9tLnZhbHVlID0gdmFsdWU7XG4gIC8vIDxpbWcgc3JjPVwieyBleHByIH1cIj5cbiAgfSBlbHNlIGlmIChzdGFydHNXaXRoKGF0dHJOYW1lLCBBVFRSU19QUkVGSVgpICYmIGF0dHJOYW1lICE9PSBJU19ESVJFQ1RJVkUpIHtcbiAgICBhdHRyTmFtZSA9IGF0dHJOYW1lLnNsaWNlKEFUVFJTX1BSRUZJWC5sZW5ndGgpO1xuICAgIGlmIChDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTW2F0dHJOYW1lXSlcbiAgICAgIHsgYXR0ck5hbWUgPSBDQVNFX1NFTlNJVElWRV9BVFRSSUJVVEVTW2F0dHJOYW1lXTsgfVxuICAgIGlmICh2YWx1ZSAhPSBudWxsKVxuICAgICAgeyBzZXRBdHRyKGRvbSwgYXR0ck5hbWUsIHZhbHVlKTsgfVxuICB9IGVsc2Uge1xuICAgIC8vIDxzZWxlY3Q+IDxvcHRpb24gc2VsZWN0ZWQ9e3RydWV9PiA8L3NlbGVjdD5cbiAgICBpZiAoYXR0ck5hbWUgPT09ICdzZWxlY3RlZCcgJiYgcGFyZW50ICYmIC9eKFNFTEVDVHxPUFRHUk9VUCkkLy50ZXN0KHBhcmVudC50YWdOYW1lKSAmJiB2YWx1ZSkge1xuICAgICAgcGFyZW50LnZhbHVlID0gZG9tLnZhbHVlO1xuICAgIH0gaWYgKGV4cHIuYm9vbCkge1xuICAgICAgZG9tW2F0dHJOYW1lXSA9IHZhbHVlO1xuICAgICAgaWYgKCF2YWx1ZSkgeyByZXR1cm4gfVxuICAgIH0gaWYgKHZhbHVlID09PSAwIHx8IHZhbHVlICYmIHR5cGVvZiB2YWx1ZSAhPT0gVF9PQkpFQ1QpIHtcbiAgICAgIHNldEF0dHIoZG9tLCBhdHRyTmFtZSwgdmFsdWUpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIFVwZGF0ZSBhbGwgdGhlIGV4cHJlc3Npb25zIGluIGEgVGFnIGluc3RhbmNlXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBleHByZXNzaW9uIHRoYXQgbXVzdCBiZSByZSBldmFsdWF0ZWRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQWxsRXhwcmVzc2lvbnMoZXhwcmVzc2lvbnMpIHtcbiAgZWFjaChleHByZXNzaW9ucywgdXBkYXRlRXhwcmVzc2lvbi5iaW5kKHRoaXMpKTtcbn1cblxudmFyIElmRXhwciA9IHtcbiAgaW5pdDogZnVuY3Rpb24gaW5pdChkb20sIHRhZywgZXhwcikge1xuICAgIHJlbUF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpO1xuICAgIHRoaXMudGFnID0gdGFnO1xuICAgIHRoaXMuZXhwciA9IGV4cHI7XG4gICAgdGhpcy5zdHViID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpO1xuICAgIHRoaXMucHJpc3RpbmUgPSBkb207XG5cbiAgICB2YXIgcCA9IGRvbS5wYXJlbnROb2RlO1xuICAgIHAuaW5zZXJ0QmVmb3JlKHRoaXMuc3R1YiwgZG9tKTtcbiAgICBwLnJlbW92ZUNoaWxkKGRvbSk7XG5cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgbmV3VmFsdWUgPSB0bXBsKHRoaXMuZXhwciwgdGhpcy50YWcpO1xuXG4gICAgaWYgKG5ld1ZhbHVlICYmICF0aGlzLmN1cnJlbnQpIHsgLy8gaW5zZXJ0XG4gICAgICB0aGlzLmN1cnJlbnQgPSB0aGlzLnByaXN0aW5lLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgIHRoaXMuc3R1Yi5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLmN1cnJlbnQsIHRoaXMuc3R1Yik7XG5cbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBbXTtcbiAgICAgIHBhcnNlRXhwcmVzc2lvbnMuYXBwbHkodGhpcy50YWcsIFt0aGlzLmN1cnJlbnQsIHRoaXMuZXhwcmVzc2lvbnMsIHRydWVdKTtcbiAgICB9IGVsc2UgaWYgKCFuZXdWYWx1ZSAmJiB0aGlzLmN1cnJlbnQpIHsgLy8gcmVtb3ZlXG4gICAgICB1bm1vdW50QWxsKHRoaXMuZXhwcmVzc2lvbnMpO1xuICAgICAgaWYgKHRoaXMuY3VycmVudC5fdGFnKSB7XG4gICAgICAgIHRoaXMuY3VycmVudC5fdGFnLnVubW91bnQoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50LnBhcmVudE5vZGUpXG4gICAgICAgIHsgdGhpcy5jdXJyZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5jdXJyZW50KTsgfVxuICAgICAgdGhpcy5jdXJyZW50ID0gbnVsbDtcbiAgICAgIHRoaXMuZXhwcmVzc2lvbnMgPSBbXTtcbiAgICB9XG5cbiAgICBpZiAobmV3VmFsdWUpIHsgdXBkYXRlQWxsRXhwcmVzc2lvbnMuY2FsbCh0aGlzLnRhZywgdGhpcy5leHByZXNzaW9ucyk7IH1cbiAgfSxcbiAgdW5tb3VudDogZnVuY3Rpb24gdW5tb3VudCgpIHtcbiAgICB1bm1vdW50QWxsKHRoaXMuZXhwcmVzc2lvbnMgfHwgW10pO1xuICAgIGRlbGV0ZSB0aGlzLnByaXN0aW5lO1xuICAgIGRlbGV0ZSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZGVsZXRlIHRoaXMuc3R1YjtcbiAgfVxufTtcblxudmFyIFJlZkV4cHIgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoZG9tLCBwYXJlbnQsIGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICB0aGlzLmF0dHIgPSBhdHRyTmFtZTtcbiAgICB0aGlzLnJhd1ZhbHVlID0gYXR0clZhbHVlO1xuICAgIHRoaXMucGFyZW50ID0gcGFyZW50O1xuICAgIHRoaXMuaGFzRXhwID0gdG1wbC5oYXNFeHByKGF0dHJWYWx1ZSk7XG4gICAgdGhpcy5maXJzdFJ1biA9IHRydWU7XG5cbiAgICByZXR1cm4gdGhpc1xuICB9LFxuICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgdmFsdWUgPSB0aGlzLnJhd1ZhbHVlO1xuICAgIGlmICh0aGlzLmhhc0V4cClcbiAgICAgIHsgdmFsdWUgPSB0bXBsKHRoaXMucmF3VmFsdWUsIHRoaXMucGFyZW50KTsgfVxuXG4gICAgLy8gaWYgbm90aGluZyBjaGFuZ2VkLCB3ZSdyZSBkb25lXG4gICAgaWYgKCF0aGlzLmZpcnN0UnVuICYmIHZhbHVlID09PSB0aGlzLnZhbHVlKSB7IHJldHVybiB9XG5cbiAgICB2YXIgY3VzdG9tUGFyZW50ID0gdGhpcy5wYXJlbnQgJiYgZ2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnKHRoaXMucGFyZW50KTtcblxuICAgIC8vIGlmIHRoZSByZWZlcmVuY2VkIGVsZW1lbnQgaXMgYSBjdXN0b20gdGFnLCB0aGVuIHdlIHNldCB0aGUgdGFnIGl0c2VsZiwgcmF0aGVyIHRoYW4gRE9NXG4gICAgdmFyIHRhZ09yRG9tID0gdGhpcy50YWcgfHwgdGhpcy5kb207XG5cbiAgICAvLyB0aGUgbmFtZSBjaGFuZ2VkLCBzbyB3ZSBuZWVkIHRvIHJlbW92ZSBpdCBmcm9tIHRoZSBvbGQga2V5IChpZiBwcmVzZW50KVxuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSAmJiBjdXN0b21QYXJlbnQpXG4gICAgICB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCB0aGlzLnZhbHVlLCB0YWdPckRvbSk7IH1cblxuICAgIGlmIChpc0JsYW5rKHZhbHVlKSkge1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIGJsYW5rLCB3ZSByZW1vdmUgaXRcbiAgICAgIHJlbUF0dHIodGhpcy5kb20sIHRoaXMuYXR0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFkZCBpdCB0byB0aGUgcmVmcyBvZiBwYXJlbnQgdGFnICh0aGlzIGJlaGF2aW9yIHdhcyBjaGFuZ2VkID49My4wKVxuICAgICAgaWYgKGN1c3RvbVBhcmVudCkgeyBhcnJheWlzaEFkZChjdXN0b21QYXJlbnQucmVmcywgdmFsdWUsIHRhZ09yRG9tKTsgfVxuICAgICAgLy8gc2V0IHRoZSBhY3R1YWwgRE9NIGF0dHJcbiAgICAgIHNldEF0dHIodGhpcy5kb20sIHRoaXMuYXR0ciwgdmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5maXJzdFJ1biA9IGZhbHNlO1xuICB9LFxuICB1bm1vdW50OiBmdW5jdGlvbiB1bm1vdW50KCkge1xuICAgIHZhciB0YWdPckRvbSA9IHRoaXMudGFnIHx8IHRoaXMuZG9tO1xuICAgIHZhciBjdXN0b21QYXJlbnQgPSB0aGlzLnBhcmVudCAmJiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcodGhpcy5wYXJlbnQpO1xuICAgIGlmICghaXNCbGFuayh0aGlzLnZhbHVlKSAmJiBjdXN0b21QYXJlbnQpXG4gICAgICB7IGFycmF5aXNoUmVtb3ZlKGN1c3RvbVBhcmVudC5yZWZzLCB0aGlzLnZhbHVlLCB0YWdPckRvbSk7IH1cbiAgICBkZWxldGUgdGhpcy5kb207XG4gICAgZGVsZXRlIHRoaXMucGFyZW50O1xuICB9XG59O1xuXG4vKipcbiAqIENvbnZlcnQgdGhlIGl0ZW0gbG9vcGVkIGludG8gYW4gb2JqZWN0IHVzZWQgdG8gZXh0ZW5kIHRoZSBjaGlsZCB0YWcgcHJvcGVydGllc1xuICogQHBhcmFtICAgeyBPYmplY3QgfSBleHByIC0gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleXMgdXNlZCB0byBleHRlbmQgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqIEBwYXJhbSAgIHsgKiB9IGtleSAtIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgbmV3IG9iamVjdCByZXR1cm5lZFxuICogQHBhcmFtICAgeyAqIH0gdmFsIC0gdmFsdWUgY29udGFpbmluZyB0aGUgcG9zaXRpb24gb2YgdGhlIGl0ZW0gaW4gdGhlIGFycmF5XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGJhc2UgLSBwcm90b3R5cGUgb2JqZWN0IGZvciB0aGUgbmV3IGl0ZW1cbiAqIEByZXR1cm5zIHsgT2JqZWN0IH0gLSBuZXcgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIHZhbHVlcyBvZiB0aGUgb3JpZ2luYWwgaXRlbVxuICpcbiAqIFRoZSB2YXJpYWJsZXMgJ2tleScgYW5kICd2YWwnIGFyZSBhcmJpdHJhcnkuXG4gKiBUaGV5IGRlcGVuZCBvbiB0aGUgY29sbGVjdGlvbiB0eXBlIGxvb3BlZCAoQXJyYXksIE9iamVjdClcbiAqIGFuZCBvbiB0aGUgZXhwcmVzc2lvbiB1c2VkIG9uIHRoZSBlYWNoIHRhZ1xuICpcbiAqL1xuZnVuY3Rpb24gbWtpdGVtKGV4cHIsIGtleSwgdmFsLCBiYXNlKSB7XG4gIHZhciBpdGVtID0gYmFzZSA/IE9iamVjdC5jcmVhdGUoYmFzZSkgOiB7fTtcbiAgaXRlbVtleHByLmtleV0gPSBrZXk7XG4gIGlmIChleHByLnBvcykgeyBpdGVtW2V4cHIucG9zXSA9IHZhbDsgfVxuICByZXR1cm4gaXRlbVxufVxuXG4vKipcbiAqIFVubW91bnQgdGhlIHJlZHVuZGFudCB0YWdzXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gaXRlbXMgLSBhcnJheSBjb250YWluaW5nIHRoZSBjdXJyZW50IGl0ZW1zIHRvIGxvb3BcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSB0YWdzIC0gYXJyYXkgY29udGFpbmluZyBhbGwgdGhlIGNoaWxkcmVuIHRhZ3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB1c2VkIHRvIGlkZW50aWZ5IHRoZSB0eXBlIG9mIHRhZ1xuICovXG5mdW5jdGlvbiB1bm1vdW50UmVkdW5kYW50KGl0ZW1zLCB0YWdzLCB0YWdOYW1lKSB7XG4gIHZhciBpID0gdGFncy5sZW5ndGgsXG4gICAgaiA9IGl0ZW1zLmxlbmd0aCxcbiAgICB0O1xuXG4gIHdoaWxlIChpID4gaikge1xuICAgIHQgPSB0YWdzWy0taV07XG4gICAgdGFncy5zcGxpY2UoaSwgMSk7XG4gICAgdC51bm1vdW50KCk7XG4gICAgYXJyYXlpc2hSZW1vdmUodC5wYXJlbnQsIHRhZ05hbWUsIHQsIHRydWUpO1xuICB9XG59XG5cbi8qKlxuICogTW92ZSB0aGUgbmVzdGVkIGN1c3RvbSB0YWdzIGluIG5vbiBjdXN0b20gbG9vcCB0YWdzXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gaSAtIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIGxvb3AgdGFnXG4gKi9cbmZ1bmN0aW9uIG1vdmVOZXN0ZWRUYWdzKGkpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZWFjaChPYmplY3Qua2V5cyh0aGlzLnRhZ3MpLCBmdW5jdGlvbiAodGFnTmFtZSkge1xuICAgIHZhciB0YWcgPSB0aGlzJDEudGFnc1t0YWdOYW1lXTtcbiAgICBpZiAoaXNBcnJheSh0YWcpKVxuICAgICAgeyBlYWNoKHRhZywgZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgbW92ZUNoaWxkVGFnLmFwcGx5KHQsIFt0YWdOYW1lLCBpXSk7XG4gICAgICB9KTsgfVxuICAgIGVsc2VcbiAgICAgIHsgbW92ZUNoaWxkVGFnLmFwcGx5KHRhZywgW3RhZ05hbWUsIGldKTsgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBNb3ZlIGEgY2hpbGQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgSFRNTEVsZW1lbnQgfSByb290IC0gZG9tIG5vZGUgY29udGFpbmluZyBhbGwgdGhlIGxvb3AgY2hpbGRyZW5cbiAqIEBwYXJhbSAgIHsgVGFnIH0gbmV4dFRhZyAtIGluc3RhbmNlIG9mIHRoZSBuZXh0IHRhZyBwcmVjZWRpbmcgdGhlIG9uZSB3ZSB3YW50IHRvIG1vdmVcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzVmlydHVhbCAtIGlzIGl0IGEgdmlydHVhbCB0YWc/XG4gKi9cbmZ1bmN0aW9uIG1vdmUocm9vdCwgbmV4dFRhZywgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtb3ZlVmlydHVhbC5hcHBseSh0aGlzLCBbcm9vdCwgbmV4dFRhZ10pOyB9XG4gIGVsc2VcbiAgICB7IHNhZmVJbnNlcnQocm9vdCwgdGhpcy5yb290LCBuZXh0VGFnLnJvb3QpOyB9XG59XG5cbi8qKlxuICogSW5zZXJ0IGFuZCBtb3VudCBhIGNoaWxkIHRhZ1xuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IFRhZyB9IG5leHRUYWcgLSBpbnN0YW5jZSBvZiB0aGUgbmV4dCB0YWcgcHJlY2VkaW5nIHRoZSBvbmUgd2Ugd2FudCB0byBpbnNlcnRcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGlzVmlydHVhbCAtIGlzIGl0IGEgdmlydHVhbCB0YWc/XG4gKi9cbmZ1bmN0aW9uIGluc2VydChyb290LCBuZXh0VGFnLCBpc1ZpcnR1YWwpIHtcbiAgaWYgKGlzVmlydHVhbClcbiAgICB7IG1ha2VWaXJ0dWFsLmFwcGx5KHRoaXMsIFtyb290LCBuZXh0VGFnXSk7IH1cbiAgZWxzZVxuICAgIHsgc2FmZUluc2VydChyb290LCB0aGlzLnJvb3QsIG5leHRUYWcucm9vdCk7IH1cbn1cblxuLyoqXG4gKiBBcHBlbmQgYSBuZXcgdGFnIGludG8gdGhlIERPTVxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gcm9vdCAtIGRvbSBub2RlIGNvbnRhaW5pbmcgYWxsIHRoZSBsb29wIGNoaWxkcmVuXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBpc1ZpcnR1YWwgLSBpcyBpdCBhIHZpcnR1YWwgdGFnP1xuICovXG5mdW5jdGlvbiBhcHBlbmQocm9vdCwgaXNWaXJ0dWFsKSB7XG4gIGlmIChpc1ZpcnR1YWwpXG4gICAgeyBtYWtlVmlydHVhbC5jYWxsKHRoaXMsIHJvb3QpOyB9XG4gIGVsc2VcbiAgICB7IHJvb3QuYXBwZW5kQ2hpbGQodGhpcy5yb290KTsgfVxufVxuXG4vKipcbiAqIE1hbmFnZSB0YWdzIGhhdmluZyB0aGUgJ2VhY2gnXG4gKiBAcGFyYW0gICB7IEhUTUxFbGVtZW50IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBsb29wXG4gKiBAcGFyYW0gICB7IFRhZyB9IHBhcmVudCAtIHBhcmVudCB0YWcgaW5zdGFuY2Ugd2hlcmUgdGhlIGRvbSBub2RlIGlzIGNvbnRhaW5lZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBleHByIC0gc3RyaW5nIGNvbnRhaW5lZCBpbiB0aGUgJ2VhY2gnIGF0dHJpYnV0ZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBleHByZXNzaW9uIG9iamVjdCBmb3IgdGhpcyBlYWNoIGxvb3BcbiAqL1xuZnVuY3Rpb24gX2VhY2goZG9tLCBwYXJlbnQsIGV4cHIpIHtcblxuICAvLyByZW1vdmUgdGhlIGVhY2ggcHJvcGVydHkgZnJvbSB0aGUgb3JpZ2luYWwgdGFnXG4gIHJlbUF0dHIoZG9tLCBMT09QX0RJUkVDVElWRSk7XG5cbiAgdmFyIG11c3RSZW9yZGVyID0gdHlwZW9mIGdldEF0dHIoZG9tLCBMT09QX05PX1JFT1JERVJfRElSRUNUSVZFKSAhPT0gVF9TVFJJTkcgfHwgcmVtQXR0cihkb20sIExPT1BfTk9fUkVPUkRFUl9ESVJFQ1RJVkUpLFxuICAgIHRhZ05hbWUgPSBnZXRUYWdOYW1lKGRvbSksXG4gICAgaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV0gfHwgeyB0bXBsOiBnZXRPdXRlckhUTUwoZG9tKSB9LFxuICAgIHVzZVJvb3QgPSBSRV9TUEVDSUFMX1RBR1MudGVzdCh0YWdOYW1lKSxcbiAgICBwYXJlbnROb2RlID0gZG9tLnBhcmVudE5vZGUsXG4gICAgcmVmID0gY3JlYXRlRE9NUGxhY2Vob2xkZXIoKSxcbiAgICBjaGlsZCA9IGdldFRhZyhkb20pLFxuICAgIGlmRXhwciA9IGdldEF0dHIoZG9tLCBDT05ESVRJT05BTF9ESVJFQ1RJVkUpLFxuICAgIHRhZ3MgPSBbXSxcbiAgICBvbGRJdGVtcyA9IFtdLFxuICAgIGhhc0tleXMsXG4gICAgaXNMb29wID0gdHJ1ZSxcbiAgICBpc0Fub255bW91cyA9ICFfX1RBR19JTVBMW3RhZ05hbWVdLFxuICAgIGlzVmlydHVhbCA9IGRvbS50YWdOYW1lID09PSAnVklSVFVBTCc7XG5cbiAgLy8gcGFyc2UgdGhlIGVhY2ggZXhwcmVzc2lvblxuICBleHByID0gdG1wbC5sb29wS2V5cyhleHByKTtcbiAgZXhwci5pc0xvb3AgPSB0cnVlO1xuXG4gIGlmIChpZkV4cHIpIHsgcmVtQXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSk7IH1cblxuICAvLyBpbnNlcnQgYSBtYXJrZWQgd2hlcmUgdGhlIGxvb3AgdGFncyB3aWxsIGJlIGluamVjdGVkXG4gIHBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHJlZiwgZG9tKTtcbiAgcGFyZW50Tm9kZS5yZW1vdmVDaGlsZChkb20pO1xuXG4gIGV4cHIudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlRWFjaCgpIHtcblxuICAgIC8vIGdldCB0aGUgbmV3IGl0ZW1zIGNvbGxlY3Rpb25cbiAgICB2YXIgaXRlbXMgPSB0bXBsKGV4cHIudmFsLCBwYXJlbnQpLFxuICAgICAgZnJhZyA9IGNyZWF0ZUZyYWcoKSxcbiAgICAgIGlzT2JqZWN0JCQxID0gIWlzQXJyYXkoaXRlbXMpLFxuICAgICAgcm9vdCA9IHJlZi5wYXJlbnROb2RlO1xuXG4gICAgLy8gb2JqZWN0IGxvb3AuIGFueSBjaGFuZ2VzIGNhdXNlIGZ1bGwgcmVkcmF3XG4gICAgaWYgKGlzT2JqZWN0JCQxKSB7XG4gICAgICBoYXNLZXlzID0gaXRlbXMgfHwgZmFsc2U7XG4gICAgICBpdGVtcyA9IGhhc0tleXMgP1xuICAgICAgICBPYmplY3Qua2V5cyhpdGVtcykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICByZXR1cm4gbWtpdGVtKGV4cHIsIGl0ZW1zW2tleV0sIGtleSlcbiAgICAgICAgfSkgOiBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGFzS2V5cyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmIChpZkV4cHIpIHtcbiAgICAgIGl0ZW1zID0gaXRlbXMuZmlsdGVyKGZ1bmN0aW9uKGl0ZW0sIGkpIHtcbiAgICAgICAgaWYgKGV4cHIua2V5ICYmICFpc09iamVjdCQkMSlcbiAgICAgICAgICB7IHJldHVybiAhIXRtcGwoaWZFeHByLCBta2l0ZW0oZXhwciwgaXRlbSwgaSwgcGFyZW50KSkgfVxuXG4gICAgICAgIHJldHVybiAhIXRtcGwoaWZFeHByLCBleHRlbmQoT2JqZWN0LmNyZWF0ZShwYXJlbnQpLCBpdGVtKSlcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxvb3AgYWxsIHRoZSBuZXcgaXRlbXNcbiAgICBlYWNoKGl0ZW1zLCBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICAvLyByZW9yZGVyIG9ubHkgaWYgdGhlIGl0ZW1zIGFyZSBvYmplY3RzXG4gICAgICB2YXJcbiAgICAgICAgZG9SZW9yZGVyID0gbXVzdFJlb3JkZXIgJiYgdHlwZW9mIGl0ZW0gPT09IFRfT0JKRUNUICYmICFoYXNLZXlzLFxuICAgICAgICBvbGRQb3MgPSBvbGRJdGVtcy5pbmRleE9mKGl0ZW0pLFxuICAgICAgICBpc05ldyA9ICF+b2xkUG9zLFxuICAgICAgICBtdXN0QXBwZW5kID0gaSA8PSB0YWdzLmxlbmd0aCxcbiAgICAgICAgcG9zID0gIWlzTmV3ICYmIGRvUmVvcmRlciA/IG9sZFBvcyA6IGksXG4gICAgICAgIC8vIGRvZXMgYSB0YWcgZXhpc3QgaW4gdGhpcyBwb3NpdGlvbj9cbiAgICAgICAgdGFnID0gdGFnc1twb3NdO1xuXG4gICAgICBpdGVtID0gIWhhc0tleXMgJiYgZXhwci5rZXkgPyBta2l0ZW0oZXhwciwgaXRlbSwgaSkgOiBpdGVtO1xuXG4gICAgICAvLyBuZXcgdGFnXG4gICAgICBpZiAoXG4gICAgICAgIGRvUmVvcmRlciAmJiBpc05ldyAvLyBieSBkZWZhdWx0IHdlIGFsd2F5cyB0cnkgdG8gcmVvcmRlciB0aGUgRE9NIGVsZW1lbnRzXG4gICAgICAgIHx8XG4gICAgICAgICFkb1Jlb3JkZXIgJiYgIXRhZyAvLyB3aXRoIG5vLXJlb3JkZXIgd2UganVzdCB1cGRhdGUgdGhlIG9sZCB0YWdzXG4gICAgICApIHtcbiAgICAgICAgdGFnID0gbmV3IFRhZyQxKGltcGwsIHtcbiAgICAgICAgICBwYXJlbnQ6IHBhcmVudCxcbiAgICAgICAgICBpc0xvb3A6IGlzTG9vcCxcbiAgICAgICAgICBpc0Fub255bW91czogaXNBbm9ueW1vdXMsXG4gICAgICAgICAgcm9vdDogdXNlUm9vdCA/IHJvb3QgOiBkb20uY2xvbmVOb2RlKCksXG4gICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9LCBkb20uaW5uZXJIVE1MKTtcblxuICAgICAgICAvLyBtb3VudCB0aGUgdGFnXG4gICAgICAgIHRhZy5tb3VudCgpO1xuXG4gICAgICAgIGlmIChtdXN0QXBwZW5kKVxuICAgICAgICAgIHsgYXBwZW5kLmFwcGx5KHRhZywgW2ZyYWcgfHwgcm9vdCwgaXNWaXJ0dWFsXSk7IH1cbiAgICAgICAgZWxzZVxuICAgICAgICAgIHsgaW5zZXJ0LmFwcGx5KHRhZywgW3Jvb3QsIHRhZ3NbaV0sIGlzVmlydHVhbF0pOyB9XG5cbiAgICAgICAgaWYgKCFtdXN0QXBwZW5kKSB7IG9sZEl0ZW1zLnNwbGljZShpLCAwLCBpdGVtKTsgfVxuICAgICAgICB0YWdzLnNwbGljZShpLCAwLCB0YWcpO1xuICAgICAgICBpZiAoY2hpbGQpIHsgYXJyYXlpc2hBZGQocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRhZywgdHJ1ZSk7IH1cbiAgICAgICAgcG9zID0gaTsgLy8gaGFuZGxlZCBoZXJlIHNvIG5vIG1vdmVcbiAgICAgIH0gZWxzZSB7IHRhZy51cGRhdGUoaXRlbSk7IH1cblxuICAgICAgLy8gcmVvcmRlciB0aGUgdGFnIGlmIGl0J3Mgbm90IGxvY2F0ZWQgaW4gaXRzIHByZXZpb3VzIHBvc2l0aW9uXG4gICAgICBpZiAocG9zICE9PSBpICYmIGRvUmVvcmRlcikge1xuICAgICAgICAvLyAjY2xvc2VzIDIwNDBcbiAgICAgICAgaWYgKGNvbnRhaW5zKGl0ZW1zLCBvbGRJdGVtc1tpXSkpIHtcbiAgICAgICAgICBtb3ZlLmFwcGx5KHRhZywgW3Jvb3QsIHRhZ3NbaV0sIGlzVmlydHVhbF0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSB0aGUgcG9zaXRpb24gYXR0cmlidXRlIGlmIGl0IGV4aXN0c1xuICAgICAgICBpZiAoZXhwci5wb3MpIHsgdGFnW2V4cHIucG9zXSA9IGk7IH1cbiAgICAgICAgLy8gbW92ZSB0aGUgb2xkIHRhZyBpbnN0YW5jZVxuICAgICAgICB0YWdzLnNwbGljZShpLCAwLCB0YWdzLnNwbGljZShwb3MsIDEpWzBdKTtcbiAgICAgICAgLy8gbW92ZSB0aGUgb2xkIGl0ZW1cbiAgICAgICAgb2xkSXRlbXMuc3BsaWNlKGksIDAsIG9sZEl0ZW1zLnNwbGljZShwb3MsIDEpWzBdKTtcbiAgICAgICAgLy8gaWYgdGhlIGxvb3AgdGFncyBhcmUgbm90IGN1c3RvbVxuICAgICAgICAvLyB3ZSBuZWVkIHRvIG1vdmUgYWxsIHRoZWlyIGN1c3RvbSB0YWdzIGludG8gdGhlIHJpZ2h0IHBvc2l0aW9uXG4gICAgICAgIGlmICghY2hpbGQgJiYgdGFnLnRhZ3MpIHsgbW92ZU5lc3RlZFRhZ3MuY2FsbCh0YWcsIGkpOyB9XG4gICAgICB9XG5cbiAgICAgIC8vIGNhY2hlIHRoZSBvcmlnaW5hbCBpdGVtIHRvIHVzZSBpdCBpbiB0aGUgZXZlbnRzIGJvdW5kIHRvIHRoaXMgbm9kZVxuICAgICAgLy8gYW5kIGl0cyBjaGlsZHJlblxuICAgICAgdGFnLl9pdGVtID0gaXRlbTtcbiAgICAgIC8vIGNhY2hlIHRoZSByZWFsIHBhcmVudCB0YWcgaW50ZXJuYWxseVxuICAgICAgZGVmaW5lUHJvcGVydHkodGFnLCAnX3BhcmVudCcsIHBhcmVudCk7XG4gICAgfSk7XG5cbiAgICAvLyByZW1vdmUgdGhlIHJlZHVuZGFudCB0YWdzXG4gICAgdW5tb3VudFJlZHVuZGFudChpdGVtcywgdGFncywgdGFnTmFtZSk7XG5cbiAgICAvLyBjbG9uZSB0aGUgaXRlbXMgYXJyYXlcbiAgICBvbGRJdGVtcyA9IGl0ZW1zLnNsaWNlKCk7XG5cbiAgICByb290Lmluc2VydEJlZm9yZShmcmFnLCByZWYpO1xuICB9O1xuXG4gIGV4cHIudW5tb3VudCA9IGZ1bmN0aW9uKCkge1xuICAgIGVhY2godGFncywgZnVuY3Rpb24odCkgeyB0LnVubW91bnQoKTsgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGV4cHJcbn1cblxuLyoqXG4gKiBXYWxrIHRoZSB0YWcgRE9NIHRvIGRldGVjdCB0aGUgZXhwcmVzc2lvbnMgdG8gZXZhbHVhdGVcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IHJvb3QgLSByb290IHRhZyB3aGVyZSB3ZSB3aWxsIHN0YXJ0IGRpZ2dpbmcgdGhlIGV4cHJlc3Npb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gZXhwcmVzc2lvbnMgLSBlbXB0eSBhcnJheSB3aGVyZSB0aGUgZXhwcmVzc2lvbnMgd2lsbCBiZSBhZGRlZFxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gbXVzdEluY2x1ZGVSb290IC0gZmxhZyB0byBkZWNpZGUgd2hldGhlciB0aGUgcm9vdCBtdXN0IGJlIHBhcnNlZCBhcyB3ZWxsXG4gKiBAcmV0dXJucyB7IE9iamVjdCB9IGFuIG9iamVjdCBjb250YWluaW5nIHRoZSByb290IG5vb2RlIGFuZCB0aGUgZG9tIHRyZWVcbiAqL1xuZnVuY3Rpb24gcGFyc2VFeHByZXNzaW9ucyhyb290LCBleHByZXNzaW9ucywgbXVzdEluY2x1ZGVSb290KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIHZhciB0cmVlID0ge3BhcmVudDoge2NoaWxkcmVuOiBleHByZXNzaW9uc319O1xuXG4gIHdhbGtOb2Rlcyhyb290LCBmdW5jdGlvbiAoZG9tLCBjdHgpIHtcbiAgICB2YXIgdHlwZSA9IGRvbS5ub2RlVHlwZSwgcGFyZW50ID0gY3R4LnBhcmVudCwgYXR0ciwgZXhwciwgdGFnSW1wbDtcbiAgICBpZiAoIW11c3RJbmNsdWRlUm9vdCAmJiBkb20gPT09IHJvb3QpIHsgcmV0dXJuIHtwYXJlbnQ6IHBhcmVudH0gfVxuXG4gICAgLy8gdGV4dCBub2RlXG4gICAgaWYgKHR5cGUgPT09IDMgJiYgZG9tLnBhcmVudE5vZGUudGFnTmFtZSAhPT0gJ1NUWUxFJyAmJiB0bXBsLmhhc0V4cHIoZG9tLm5vZGVWYWx1ZSkpXG4gICAgICB7IHBhcmVudC5jaGlsZHJlbi5wdXNoKHtkb206IGRvbSwgZXhwcjogZG9tLm5vZGVWYWx1ZX0pOyB9XG5cbiAgICBpZiAodHlwZSAhPT0gMSkgeyByZXR1cm4gY3R4IH0gLy8gbm90IGFuIGVsZW1lbnRcblxuICAgIC8vIGxvb3AuIGVhY2ggZG9lcyBpdCdzIG93biB0aGluZyAoZm9yIG5vdylcbiAgICBpZiAoYXR0ciA9IGdldEF0dHIoZG9tLCBMT09QX0RJUkVDVElWRSkpIHtcbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKF9lYWNoKGRvbSwgdGhpcyQxLCBhdHRyKSk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICAvLyBpZi1hdHRycyBiZWNvbWUgdGhlIG5ldyBwYXJlbnQuIEFueSBmb2xsb3dpbmcgZXhwcmVzc2lvbnMgKGVpdGhlciBvbiB0aGUgY3VycmVudFxuICAgIC8vIGVsZW1lbnQsIG9yIGJlbG93IGl0KSBiZWNvbWUgY2hpbGRyZW4gb2YgdGhpcyBleHByZXNzaW9uLlxuICAgIGlmIChhdHRyID0gZ2V0QXR0cihkb20sIENPTkRJVElPTkFMX0RJUkVDVElWRSkpIHtcbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKE9iamVjdC5jcmVhdGUoSWZFeHByKS5pbml0KGRvbSwgdGhpcyQxLCBhdHRyKSk7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoZXhwciA9IGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpKSB7XG4gICAgICBpZiAodG1wbC5oYXNFeHByKGV4cHIpKSB7XG4gICAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKHtpc1J0YWc6IHRydWUsIGV4cHI6IGV4cHIsIGRvbTogZG9tLCBhdHRyczogW10uc2xpY2UuY2FsbChkb20uYXR0cmlidXRlcyl9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gaWYgdGhpcyBpcyBhIHRhZywgc3RvcCB0cmF2ZXJzaW5nIGhlcmUuXG4gICAgLy8gd2UgaWdub3JlIHRoZSByb290LCBzaW5jZSBwYXJzZUV4cHJlc3Npb25zIGlzIGNhbGxlZCB3aGlsZSB3ZSdyZSBtb3VudGluZyB0aGF0IHJvb3RcbiAgICB0YWdJbXBsID0gZ2V0VGFnKGRvbSk7XG4gICAgaWYgKHRhZ0ltcGwgJiYgKGRvbSAhPT0gcm9vdCB8fCBtdXN0SW5jbHVkZVJvb3QpKSB7XG4gICAgICB2YXIgY29uZiA9IHtyb290OiBkb20sIHBhcmVudDogdGhpcyQxLCBoYXNJbXBsOiB0cnVlfTtcbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGluaXRDaGlsZFRhZyh0YWdJbXBsLCBjb25mLCBkb20uaW5uZXJIVE1MLCB0aGlzJDEpKTtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIC8vIGF0dHJpYnV0ZSBleHByZXNzaW9uc1xuICAgIHBhcnNlQXR0cmlidXRlcy5hcHBseSh0aGlzJDEsIFtkb20sIGRvbS5hdHRyaWJ1dGVzLCBmdW5jdGlvbihhdHRyLCBleHByKSB7XG4gICAgICBpZiAoIWV4cHIpIHsgcmV0dXJuIH1cbiAgICAgIHBhcmVudC5jaGlsZHJlbi5wdXNoKGV4cHIpO1xuICAgIH1dKTtcblxuICAgIC8vIHdoYXRldmVyIHRoZSBwYXJlbnQgaXMsIGFsbCBjaGlsZCBlbGVtZW50cyBnZXQgdGhlIHNhbWUgcGFyZW50LlxuICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYWQgYW4gaWYtYXR0ciwgdGhhdCdzIHRoZSBwYXJlbnQgZm9yIGFsbCBjaGlsZCBlbGVtZW50c1xuICAgIHJldHVybiB7cGFyZW50OiBwYXJlbnR9XG4gIH0sIHRyZWUpO1xuXG4gIHJldHVybiB7IHRyZWU6IHRyZWUsIHJvb3Q6IHJvb3QgfVxufVxuXG4vKipcbiAqIENhbGxzIGBmbmAgZm9yIGV2ZXJ5IGF0dHJpYnV0ZSBvbiBhbiBlbGVtZW50LiBJZiB0aGF0IGF0dHIgaGFzIGFuIGV4cHJlc3Npb24sXG4gKiBpdCBpcyBhbHNvIHBhc3NlZCB0byBmbi5cbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBIVE1MRWxlbWVudCB9IGRvbSAtIGRvbSBub2RlIHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gYXR0cnMgLSBhcnJheSBvZiBhdHRyaWJ1dGVzXG4gKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayB0byBleGVjIG9uIGFueSBpdGVyYXRpb25cbiAqL1xuZnVuY3Rpb24gcGFyc2VBdHRyaWJ1dGVzKGRvbSwgYXR0cnMsIGZuKSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goYXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgdmFyIG5hbWUgPSBhdHRyLm5hbWUsIGJvb2wgPSBpc0Jvb2xBdHRyKG5hbWUpLCBleHByO1xuXG4gICAgaWYgKGNvbnRhaW5zKFJFRl9ESVJFQ1RJVkVTLCBuYW1lKSkge1xuICAgICAgZXhwciA9ICBPYmplY3QuY3JlYXRlKFJlZkV4cHIpLmluaXQoZG9tLCB0aGlzJDEsIG5hbWUsIGF0dHIudmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodG1wbC5oYXNFeHByKGF0dHIudmFsdWUpKSB7XG4gICAgICBleHByID0ge2RvbTogZG9tLCBleHByOiBhdHRyLnZhbHVlLCBhdHRyOiBhdHRyLm5hbWUsIGJvb2w6IGJvb2x9O1xuICAgIH1cblxuICAgIGZuKGF0dHIsIGV4cHIpO1xuICB9KTtcbn1cblxuLypcbiAgSW5jbHVkZXMgaGFja3MgbmVlZGVkIGZvciB0aGUgSW50ZXJuZXQgRXhwbG9yZXIgdmVyc2lvbiA5IGFuZCBiZWxvd1xuICBTZWU6IGh0dHA6Ly9rYW5nYXguZ2l0aHViLmlvL2NvbXBhdC10YWJsZS9lczUvI2llOFxuICAgICAgIGh0dHA6Ly9jb2RlcGxhbmV0LmlvL2Ryb3BwaW5nLWllOC9cbiovXG5cbnZhciByZUhhc1lpZWxkICA9IC88eWllbGRcXGIvaTtcbnZhciByZVlpZWxkQWxsICA9IC88eWllbGRcXHMqKD86XFwvPnw+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj58PikvaWc7XG52YXIgcmVZaWVsZFNyYyAgPSAvPHlpZWxkXFxzK3RvPVsnXCJdKFteJ1wiPl0qKVsnXCJdXFxzKj4oW1xcU1xcc10qPyk8XFwveWllbGRcXHMqPi9pZztcbnZhciByZVlpZWxkRGVzdCA9IC88eWllbGRcXHMrZnJvbT1bJ1wiXT8oWy1cXHddKylbJ1wiXT9cXHMqKD86XFwvPnw+KFtcXFNcXHNdKj8pPFxcL3lpZWxkXFxzKj4pL2lnO1xudmFyIHJvb3RFbHMgPSB7IHRyOiAndGJvZHknLCB0aDogJ3RyJywgdGQ6ICd0cicsIGNvbDogJ2NvbGdyb3VwJyB9O1xudmFyIHRibFRhZ3MgPSBJRV9WRVJTSU9OICYmIElFX1ZFUlNJT04gPCAxMCA/IFJFX1NQRUNJQUxfVEFHUyA6IFJFX1NQRUNJQUxfVEFHU19OT19PUFRJT047XG52YXIgR0VORVJJQyA9ICdkaXYnO1xuXG5cbi8qXG4gIENyZWF0ZXMgdGhlIHJvb3QgZWxlbWVudCBmb3IgdGFibGUgb3Igc2VsZWN0IGNoaWxkIGVsZW1lbnRzOlxuICB0ci90aC90ZC90aGVhZC90Zm9vdC90Ym9keS9jYXB0aW9uL2NvbC9jb2xncm91cC9vcHRpb24vb3B0Z3JvdXBcbiovXG5mdW5jdGlvbiBzcGVjaWFsVGFncyhlbCwgdG1wbCwgdGFnTmFtZSkge1xuXG4gIHZhclxuICAgIHNlbGVjdCA9IHRhZ05hbWVbMF0gPT09ICdvJyxcbiAgICBwYXJlbnQgPSBzZWxlY3QgPyAnc2VsZWN0PicgOiAndGFibGU+JztcblxuICAvLyB0cmltKCkgaXMgaW1wb3J0YW50IGhlcmUsIHRoaXMgZW5zdXJlcyB3ZSBkb24ndCBoYXZlIGFydGlmYWN0cyxcbiAgLy8gc28gd2UgY2FuIGNoZWNrIGlmIHdlIGhhdmUgb25seSBvbmUgZWxlbWVudCBpbnNpZGUgdGhlIHBhcmVudFxuICBlbC5pbm5lckhUTUwgPSAnPCcgKyBwYXJlbnQgKyB0bXBsLnRyaW0oKSArICc8LycgKyBwYXJlbnQ7XG4gIHBhcmVudCA9IGVsLmZpcnN0Q2hpbGQ7XG5cbiAgLy8gcmV0dXJucyB0aGUgaW1tZWRpYXRlIHBhcmVudCBpZiB0ci90aC90ZC9jb2wgaXMgdGhlIG9ubHkgZWxlbWVudCwgaWYgbm90XG4gIC8vIHJldHVybnMgdGhlIHdob2xlIHRyZWUsIGFzIHRoaXMgY2FuIGluY2x1ZGUgYWRkaXRpb25hbCBlbGVtZW50c1xuICBpZiAoc2VsZWN0KSB7XG4gICAgcGFyZW50LnNlbGVjdGVkSW5kZXggPSAtMTsgIC8vIGZvciBJRTksIGNvbXBhdGlibGUgdy9jdXJyZW50IHJpb3QgYmVoYXZpb3JcbiAgfSBlbHNlIHtcbiAgICAvLyBhdm9pZHMgaW5zZXJ0aW9uIG9mIGNvaW50YWluZXIgaW5zaWRlIGNvbnRhaW5lciAoZXg6IHRib2R5IGluc2lkZSB0Ym9keSlcbiAgICB2YXIgdG5hbWUgPSByb290RWxzW3RhZ05hbWVdO1xuICAgIGlmICh0bmFtZSAmJiBwYXJlbnQuY2hpbGRFbGVtZW50Q291bnQgPT09IDEpIHsgcGFyZW50ID0gJCh0bmFtZSwgcGFyZW50KTsgfVxuICB9XG4gIHJldHVybiBwYXJlbnRcbn1cblxuLypcbiAgUmVwbGFjZSB0aGUgeWllbGQgdGFnIGZyb20gYW55IHRhZyB0ZW1wbGF0ZSB3aXRoIHRoZSBpbm5lckhUTUwgb2YgdGhlXG4gIG9yaWdpbmFsIHRhZyBpbiB0aGUgcGFnZVxuKi9cbmZ1bmN0aW9uIHJlcGxhY2VZaWVsZCh0bXBsLCBodG1sKSB7XG4gIC8vIGRvIG5vdGhpbmcgaWYgbm8geWllbGRcbiAgaWYgKCFyZUhhc1lpZWxkLnRlc3QodG1wbCkpIHsgcmV0dXJuIHRtcGwgfVxuXG4gIC8vIGJlIGNhcmVmdWwgd2l0aCAjMTM0MyAtIHN0cmluZyBvbiB0aGUgc291cmNlIGhhdmluZyBgJDFgXG4gIHZhciBzcmMgPSB7fTtcblxuICBodG1sID0gaHRtbCAmJiBodG1sLnJlcGxhY2UocmVZaWVsZFNyYywgZnVuY3Rpb24gKF8sIHJlZiwgdGV4dCkge1xuICAgIHNyY1tyZWZdID0gc3JjW3JlZl0gfHwgdGV4dDsgICAvLyBwcmVzZXJ2ZSBmaXJzdCBkZWZpbml0aW9uXG4gICAgcmV0dXJuICcnXG4gIH0pLnRyaW0oKTtcblxuICByZXR1cm4gdG1wbFxuICAgIC5yZXBsYWNlKHJlWWllbGREZXN0LCBmdW5jdGlvbiAoXywgcmVmLCBkZWYpIHsgIC8vIHlpZWxkIHdpdGggZnJvbSAtIHRvIGF0dHJzXG4gICAgICByZXR1cm4gc3JjW3JlZl0gfHwgZGVmIHx8ICcnXG4gICAgfSlcbiAgICAucmVwbGFjZShyZVlpZWxkQWxsLCBmdW5jdGlvbiAoXywgZGVmKSB7ICAgICAgICAvLyB5aWVsZCB3aXRob3V0IGFueSBcImZyb21cIlxuICAgICAgcmV0dXJuIGh0bWwgfHwgZGVmIHx8ICcnXG4gICAgfSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgRE9NIGVsZW1lbnQgdG8gd3JhcCB0aGUgZ2l2ZW4gY29udGVudC4gTm9ybWFsbHkgYW4gYERJVmAsIGJ1dCBjYW4gYmVcbiAqIGFsc28gYSBgVEFCTEVgLCBgU0VMRUNUYCwgYFRCT0RZYCwgYFRSYCwgb3IgYENPTEdST1VQYCBlbGVtZW50LlxuICpcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdG1wbCAgLSBUaGUgdGVtcGxhdGUgY29taW5nIGZyb20gdGhlIGN1c3RvbSB0YWcgZGVmaW5pdGlvblxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBodG1sIC0gSFRNTCBjb250ZW50IHRoYXQgY29tZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnQgd2hlcmUgeW91XG4gKiAgICAgICAgICAgd2lsbCBtb3VudCB0aGUgdGFnLCBtb3N0bHkgdGhlIG9yaWdpbmFsIHRhZyBpbiB0aGUgcGFnZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gY2hlY2tTdmcgLSBmbGFnIG5lZWRlZCB0byBrbm93IGlmIHdlIG5lZWQgdG8gZm9yY2UgdGhlIHN2ZyByZW5kZXJpbmcgaW4gY2FzZSBvZiBsb29wIG5vZGVzXG4gKiBAcmV0dXJucyB7IEhUTUxFbGVtZW50IH0gRE9NIGVsZW1lbnQgd2l0aCBfdG1wbF8gbWVyZ2VkIHRocm91Z2ggYFlJRUxEYCB3aXRoIHRoZSBfaHRtbF8uXG4gKi9cbmZ1bmN0aW9uIG1rZG9tKHRtcGwsIGh0bWwsIGNoZWNrU3ZnKSB7XG4gIHZhciBtYXRjaCAgID0gdG1wbCAmJiB0bXBsLm1hdGNoKC9eXFxzKjwoWy1cXHddKykvKSxcbiAgICB0YWdOYW1lID0gbWF0Y2ggJiYgbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSxcbiAgICBlbCA9IG1rRWwoR0VORVJJQywgY2hlY2tTdmcgJiYgaXNTVkdUYWcodGFnTmFtZSkpO1xuXG4gIC8vIHJlcGxhY2UgYWxsIHRoZSB5aWVsZCB0YWdzIHdpdGggdGhlIHRhZyBpbm5lciBodG1sXG4gIHRtcGwgPSByZXBsYWNlWWllbGQodG1wbCwgaHRtbCk7XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgaWYgKHRibFRhZ3MudGVzdCh0YWdOYW1lKSlcbiAgICB7IGVsID0gc3BlY2lhbFRhZ3MoZWwsIHRtcGwsIHRhZ05hbWUpOyB9XG4gIGVsc2VcbiAgICB7IHNldElubmVySFRNTChlbCwgdG1wbCk7IH1cblxuICBlbC5zdHViID0gdHJ1ZTtcblxuICByZXR1cm4gZWxcbn1cblxuLyoqXG4gKiBBbm90aGVyIHdheSB0byBjcmVhdGUgYSByaW90IHRhZyBhIGJpdCBtb3JlIGVzNiBmcmllbmRseVxuICogQHBhcmFtIHsgSFRNTEVsZW1lbnQgfSBlbCAtIHRhZyBET00gc2VsZWN0b3Igb3IgRE9NIG5vZGUvc1xuICogQHBhcmFtIHsgT2JqZWN0IH0gb3B0cyAtIHRhZyBsb2dpY1xuICogQHJldHVybnMgeyBUYWcgfSBuZXcgcmlvdCB0YWcgaW5zdGFuY2VcbiAqL1xuZnVuY3Rpb24gVGFnJDIoZWwsIG9wdHMpIHtcbiAgLy8gZ2V0IHRoZSB0YWcgcHJvcGVydGllcyBmcm9tIHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICB2YXIgcmVmID0gdGhpcztcbiAgdmFyIG5hbWUgPSByZWYubmFtZTtcbiAgdmFyIHRtcGwgPSByZWYudG1wbDtcbiAgdmFyIGNzcyA9IHJlZi5jc3M7XG4gIHZhciBhdHRycyA9IHJlZi5hdHRycztcbiAgdmFyIG9uQ3JlYXRlID0gcmVmLm9uQ3JlYXRlO1xuICAvLyByZWdpc3RlciBhIG5ldyB0YWcgYW5kIGNhY2hlIHRoZSBjbGFzcyBwcm90b3R5cGVcbiAgaWYgKCFfX1RBR19JTVBMW25hbWVdKSB7XG4gICAgdGFnJDEobmFtZSwgdG1wbCwgY3NzLCBhdHRycywgb25DcmVhdGUpO1xuICAgIC8vIGNhY2hlIHRoZSBjbGFzcyBjb25zdHJ1Y3RvclxuICAgIF9fVEFHX0lNUExbbmFtZV0uY2xhc3MgPSB0aGlzLmNvbnN0cnVjdG9yO1xuICB9XG5cbiAgLy8gbW91bnQgdGhlIHRhZyB1c2luZyB0aGUgY2xhc3MgaW5zdGFuY2VcbiAgbW91bnRUbyhlbCwgbmFtZSwgb3B0cywgdGhpcyk7XG4gIC8vIGluamVjdCB0aGUgY29tcG9uZW50IGNzc1xuICBpZiAoY3NzKSB7IHN0eWxlTWFuYWdlci5pbmplY3QoKTsgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IHJpb3QgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgbmFtZSAtIG5hbWUvaWQgb2YgdGhlIG5ldyByaW90IHRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIHRtcGwgLSB0YWcgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBjc3MgLSBjdXN0b20gdGFnIGNzc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGF0dHJzIC0gcm9vdCB0YWcgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gdXNlciBmdW5jdGlvblxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lL2lkIG9mIHRoZSB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIHRhZyQxKG5hbWUsIHRtcGwsIGNzcywgYXR0cnMsIGZuKSB7XG4gIGlmIChpc0Z1bmN0aW9uKGF0dHJzKSkge1xuICAgIGZuID0gYXR0cnM7XG5cbiAgICBpZiAoL15bXFx3XFwtXStcXHM/PS8udGVzdChjc3MpKSB7XG4gICAgICBhdHRycyA9IGNzcztcbiAgICAgIGNzcyA9ICcnO1xuICAgIH0gZWxzZVxuICAgICAgeyBhdHRycyA9ICcnOyB9XG4gIH1cblxuICBpZiAoY3NzKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24oY3NzKSlcbiAgICAgIHsgZm4gPSBjc3M7IH1cbiAgICBlbHNlXG4gICAgICB7IHN0eWxlTWFuYWdlci5hZGQoY3NzKTsgfVxuICB9XG5cbiAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgX19UQUdfSU1QTFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogdG1wbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfTtcblxuICByZXR1cm4gbmFtZVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyByaW90IHRhZyBpbXBsZW1lbnRhdGlvbiAoZm9yIHVzZSBieSB0aGUgY29tcGlsZXIpXG4gKiBAcGFyYW0gICB7IFN0cmluZyB9ICAgbmFtZSAtIG5hbWUvaWQgb2YgdGhlIG5ldyByaW90IHRhZ1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIHRtcGwgLSB0YWcgdGVtcGxhdGVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gICBjc3MgLSBjdXN0b20gdGFnIGNzc1xuICogQHBhcmFtICAgeyBTdHJpbmcgfSAgIGF0dHJzIC0gcm9vdCB0YWcgYXR0cmlidXRlc1xuICogQHBhcmFtICAgeyBGdW5jdGlvbiB9IGZuIC0gdXNlciBmdW5jdGlvblxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lL2lkIG9mIHRoZSB0YWcganVzdCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIHRhZzIkMShuYW1lLCB0bXBsLCBjc3MsIGF0dHJzLCBmbikge1xuICBpZiAoY3NzKVxuICAgIHsgc3R5bGVNYW5hZ2VyLmFkZChjc3MsIG5hbWUpOyB9XG5cbiAgdmFyIGV4aXN0cyA9ICEhX19UQUdfSU1QTFtuYW1lXTtcbiAgX19UQUdfSU1QTFtuYW1lXSA9IHsgbmFtZTogbmFtZSwgdG1wbDogdG1wbCwgYXR0cnM6IGF0dHJzLCBmbjogZm4gfTtcblxuICBpZiAoZXhpc3RzICYmIHV0aWwuaG90UmVsb2FkZXIpXG4gICAgeyB1dGlsLmhvdFJlbG9hZGVyKG5hbWUpOyB9XG5cbiAgcmV0dXJuIG5hbWVcbn1cblxuLyoqXG4gKiBNb3VudCBhIHRhZyB1c2luZyBhIHNwZWNpZmljIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHBhcmFtICAgeyAqIH0gc2VsZWN0b3IgLSB0YWcgRE9NIHNlbGVjdG9yIG9yIERPTSBub2RlL3NcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIHRhZyBpbXBsZW1lbnRhdGlvbiBuYW1lXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSB0YWcgbG9naWNcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBuZXcgdGFncyBpbnN0YW5jZXNcbiAqL1xuZnVuY3Rpb24gbW91bnQkMShzZWxlY3RvciwgdGFnTmFtZSwgb3B0cykge1xuICB2YXIgdGFncyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHB1c2hUYWdzVG8ocm9vdCkge1xuICAgIGlmIChyb290LnRhZ05hbWUpIHtcbiAgICAgIHZhciByaW90VGFnID0gZ2V0QXR0cihyb290LCBJU19ESVJFQ1RJVkUpO1xuXG4gICAgICAvLyBoYXZlIHRhZ05hbWU/IGZvcmNlIHJpb3QtdGFnIHRvIGJlIHRoZSBzYW1lXG4gICAgICBpZiAodGFnTmFtZSAmJiByaW90VGFnICE9PSB0YWdOYW1lKSB7XG4gICAgICAgIHJpb3RUYWcgPSB0YWdOYW1lO1xuICAgICAgICBzZXRBdHRyKHJvb3QsIElTX0RJUkVDVElWRSwgdGFnTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciB0YWckJDEgPSBtb3VudFRvKHJvb3QsIHJpb3RUYWcgfHwgcm9vdC50YWdOYW1lLnRvTG93ZXJDYXNlKCksIG9wdHMpO1xuXG4gICAgICBpZiAodGFnJCQxKVxuICAgICAgICB7IHRhZ3MucHVzaCh0YWckJDEpOyB9XG4gICAgfSBlbHNlIGlmIChyb290Lmxlbmd0aClcbiAgICAgIHsgZWFjaChyb290LCBwdXNoVGFnc1RvKTsgfSAvLyBhc3N1bWUgbm9kZUxpc3RcbiAgfVxuXG4gIC8vIGluamVjdCBzdHlsZXMgaW50byBET01cbiAgc3R5bGVNYW5hZ2VyLmluamVjdCgpO1xuXG4gIGlmIChpc09iamVjdCh0YWdOYW1lKSkge1xuICAgIG9wdHMgPSB0YWdOYW1lO1xuICAgIHRhZ05hbWUgPSAwO1xuICB9XG5cbiAgdmFyIGVsZW07XG4gIHZhciBhbGxUYWdzO1xuXG4gIC8vIGNyYXdsIHRoZSBET00gdG8gZmluZCB0aGUgdGFnXG4gIGlmIChpc1N0cmluZyhzZWxlY3RvcikpIHtcbiAgICBzZWxlY3RvciA9IHNlbGVjdG9yID09PSAnKicgP1xuICAgICAgLy8gc2VsZWN0IGFsbCByZWdpc3RlcmVkIHRhZ3NcbiAgICAgIC8vICYgdGFncyBmb3VuZCB3aXRoIHRoZSByaW90LXRhZyBhdHRyaWJ1dGUgc2V0XG4gICAgICBhbGxUYWdzID0gc2VsZWN0VGFncygpIDpcbiAgICAgIC8vIG9yIGp1c3QgdGhlIG9uZXMgbmFtZWQgbGlrZSB0aGUgc2VsZWN0b3JcbiAgICAgIHNlbGVjdG9yICsgc2VsZWN0VGFncyhzZWxlY3Rvci5zcGxpdCgvLCAqLykpO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRvIHBhc3MgYWx3YXlzIGEgc2VsZWN0b3JcbiAgICAvLyB0byB0aGUgcXVlcnlTZWxlY3RvckFsbCBmdW5jdGlvblxuICAgIGVsZW0gPSBzZWxlY3RvciA/ICQkKHNlbGVjdG9yKSA6IFtdO1xuICB9XG4gIGVsc2VcbiAgICAvLyBwcm9iYWJseSB5b3UgaGF2ZSBwYXNzZWQgYWxyZWFkeSBhIHRhZyBvciBhIE5vZGVMaXN0XG4gICAgeyBlbGVtID0gc2VsZWN0b3I7IH1cblxuICAvLyBzZWxlY3QgYWxsIHRoZSByZWdpc3RlcmVkIGFuZCBtb3VudCB0aGVtIGluc2lkZSB0aGVpciByb290IGVsZW1lbnRzXG4gIGlmICh0YWdOYW1lID09PSAnKicpIHtcbiAgICAvLyBnZXQgYWxsIGN1c3RvbSB0YWdzXG4gICAgdGFnTmFtZSA9IGFsbFRhZ3MgfHwgc2VsZWN0VGFncygpO1xuICAgIC8vIGlmIHRoZSByb290IGVscyBpdCdzIGp1c3QgYSBzaW5nbGUgdGFnXG4gICAgaWYgKGVsZW0udGFnTmFtZSlcbiAgICAgIHsgZWxlbSA9ICQkKHRhZ05hbWUsIGVsZW0pOyB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBzZWxlY3QgYWxsIHRoZSBjaGlsZHJlbiBmb3IgYWxsIHRoZSBkaWZmZXJlbnQgcm9vdCBlbGVtZW50c1xuICAgICAgdmFyIG5vZGVMaXN0ID0gW107XG5cbiAgICAgIGVhY2goZWxlbSwgZnVuY3Rpb24gKF9lbCkgeyByZXR1cm4gbm9kZUxpc3QucHVzaCgkJCh0YWdOYW1lLCBfZWwpKTsgfSk7XG5cbiAgICAgIGVsZW0gPSBub2RlTGlzdDtcbiAgICB9XG4gICAgLy8gZ2V0IHJpZCBvZiB0aGUgdGFnTmFtZVxuICAgIHRhZ05hbWUgPSAwO1xuICB9XG5cbiAgcHVzaFRhZ3NUbyhlbGVtKTtcblxuICByZXR1cm4gdGFnc1xufVxuXG4vLyBDcmVhdGUgYSBtaXhpbiB0aGF0IGNvdWxkIGJlIGdsb2JhbGx5IHNoYXJlZCBhY3Jvc3MgYWxsIHRoZSB0YWdzXG52YXIgbWl4aW5zID0ge307XG52YXIgZ2xvYmFscyA9IG1peGluc1tHTE9CQUxfTUlYSU5dID0ge307XG52YXIgX2lkID0gMDtcblxuLyoqXG4gKiBDcmVhdGUvUmV0dXJuIGEgbWl4aW4gYnkgaXRzIG5hbWVcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gIG5hbWUgLSBtaXhpbiBuYW1lIChnbG9iYWwgbWl4aW4gaWYgb2JqZWN0KVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgbWl4IC0gbWl4aW4gbG9naWNcbiAqIEBwYXJhbSAgIHsgQm9vbGVhbiB9IGcgLSBpcyBnbG9iYWw/XG4gKiBAcmV0dXJucyB7IE9iamVjdCB9ICB0aGUgbWl4aW4gbG9naWNcbiAqL1xuZnVuY3Rpb24gbWl4aW4kMShuYW1lLCBtaXgsIGcpIHtcbiAgLy8gVW5uYW1lZCBnbG9iYWxcbiAgaWYgKGlzT2JqZWN0KG5hbWUpKSB7XG4gICAgbWl4aW4kMSgoXCJfX3VubmFtZWRfXCIgKyAoX2lkKyspKSwgbmFtZSwgdHJ1ZSk7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3RvcmUgPSBnID8gZ2xvYmFscyA6IG1peGlucztcblxuICAvLyBHZXR0ZXJcbiAgaWYgKCFtaXgpIHtcbiAgICBpZiAoaXNVbmRlZmluZWQoc3RvcmVbbmFtZV0pKVxuICAgICAgeyB0aHJvdyBuZXcgRXJyb3IoJ1VucmVnaXN0ZXJlZCBtaXhpbjogJyArIG5hbWUpIH1cblxuICAgIHJldHVybiBzdG9yZVtuYW1lXVxuICB9XG5cbiAgLy8gU2V0dGVyXG4gIHN0b3JlW25hbWVdID0gaXNGdW5jdGlvbihtaXgpID9cbiAgICBleHRlbmQobWl4LnByb3RvdHlwZSwgc3RvcmVbbmFtZV0gfHwge30pICYmIG1peCA6XG4gICAgZXh0ZW5kKHN0b3JlW25hbWVdIHx8IHt9LCBtaXgpO1xufVxuXG4vKipcbiAqIFVwZGF0ZSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzIGNyZWF0ZWRcbiAqIEByZXR1cm5zIHsgQXJyYXkgfSBhbGwgdGhlIHRhZ3MgaW5zdGFuY2VzXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSQxKCkge1xuICByZXR1cm4gZWFjaChfX1RBR1NfQ0FDSEUsIGZ1bmN0aW9uICh0YWckJDEpIHsgcmV0dXJuIHRhZyQkMS51cGRhdGUoKTsgfSlcbn1cblxuZnVuY3Rpb24gdW5yZWdpc3RlciQxKG5hbWUpIHtcbiAgZGVsZXRlIF9fVEFHX0lNUExbbmFtZV07XG59XG5cbi8vIGNvdW50ZXIgdG8gZ2l2ZSBhIHVuaXF1ZSBpZCB0byBhbGwgdGhlIFRhZyBpbnN0YW5jZXNcbnZhciBfX3VpZCA9IDA7XG5cbi8qKlxuICogV2UgbmVlZCB0byB1cGRhdGUgb3B0cyBmb3IgdGhpcyB0YWcuIFRoYXQgcmVxdWlyZXMgdXBkYXRpbmcgdGhlIGV4cHJlc3Npb25zXG4gKiBpbiBhbnkgYXR0cmlidXRlcyBvbiB0aGUgdGFnLCBhbmQgdGhlbiBjb3B5aW5nIHRoZSByZXN1bHQgb250byBvcHRzLlxuICogQHRoaXMgVGFnXG4gKiBAcGFyYW0gICB7Qm9vbGVhbn0gaXNMb29wIC0gaXMgaXQgYSBsb29wIHRhZz9cbiAqIEBwYXJhbSAgIHsgVGFnIH0gIHBhcmVudCAtIHBhcmVudCB0YWcgbm9kZVxuICogQHBhcmFtICAgeyBCb29sZWFuIH0gIGlzQW5vbnltb3VzIC0gaXMgaXQgYSB0YWcgd2l0aG91dCBhbnkgaW1wbD8gKGEgdGFnIG5vdCByZWdpc3RlcmVkKVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgb3B0cyAtIHRhZyBvcHRpb25zXG4gKiBAcGFyYW0gICB7IEFycmF5IH0gIGluc3RBdHRycyAtIHRhZyBhdHRyaWJ1dGVzIGFycmF5XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZU9wdHMoaXNMb29wLCBwYXJlbnQsIGlzQW5vbnltb3VzLCBvcHRzLCBpbnN0QXR0cnMpIHtcbiAgLy8gaXNBbm9ueW1vdXMgYGVhY2hgIHRhZ3MgdHJlYXQgYGRvbWAgYW5kIGByb290YCBkaWZmZXJlbnRseS4gSW4gdGhpcyBjYXNlXG4gIC8vIChhbmQgb25seSB0aGlzIGNhc2UpIHdlIGRvbid0IG5lZWQgdG8gZG8gdXBkYXRlT3B0cywgYmVjYXVzZSB0aGUgcmVndWxhciBwYXJzZVxuICAvLyB3aWxsIHVwZGF0ZSB0aG9zZSBhdHRycy4gUGx1cywgaXNBbm9ueW1vdXMgdGFncyBkb24ndCBuZWVkIG9wdHMgYW55d2F5XG4gIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgcmV0dXJuIH1cblxuICB2YXIgY3R4ID0gIWlzQW5vbnltb3VzICYmIGlzTG9vcCA/IHRoaXMgOiBwYXJlbnQgfHwgdGhpcztcbiAgZWFjaChpbnN0QXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgaWYgKGF0dHIuZXhwcikgeyB1cGRhdGVBbGxFeHByZXNzaW9ucy5jYWxsKGN0eCwgW2F0dHIuZXhwcl0pOyB9XG4gICAgb3B0c1t0b0NhbWVsKGF0dHIubmFtZSldID0gYXR0ci5leHByID8gYXR0ci5leHByLnZhbHVlIDogYXR0ci52YWx1ZTtcbiAgfSk7XG59XG5cblxuLyoqXG4gKiBUYWcgY2xhc3NcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHsgT2JqZWN0IH0gaW1wbCAtIGl0IGNvbnRhaW5zIHRoZSB0YWcgdGVtcGxhdGUsIGFuZCBsb2dpY1xuICogQHBhcmFtIHsgT2JqZWN0IH0gY29uZiAtIHRhZyBvcHRpb25zXG4gKiBAcGFyYW0geyBTdHJpbmcgfSBpbm5lckhUTUwgLSBodG1sIHRoYXQgZXZlbnR1YWxseSB3ZSBuZWVkIHRvIGluamVjdCBpbiB0aGUgdGFnXG4gKi9cbmZ1bmN0aW9uIFRhZyQxKGltcGwsIGNvbmYsIGlubmVySFRNTCkge1xuXG4gIHZhciBvcHRzID0gZXh0ZW5kKHt9LCBjb25mLm9wdHMpLFxuICAgIHBhcmVudCA9IGNvbmYucGFyZW50LFxuICAgIGlzTG9vcCA9IGNvbmYuaXNMb29wLFxuICAgIGlzQW5vbnltb3VzID0gY29uZi5pc0Fub255bW91cyxcbiAgICBpdGVtID0gY2xlYW5VcERhdGEoY29uZi5pdGVtKSxcbiAgICBpbnN0QXR0cnMgPSBbXSwgLy8gQWxsIGF0dHJpYnV0ZXMgb24gdGhlIFRhZyB3aGVuIGl0J3MgZmlyc3QgcGFyc2VkXG4gICAgaW1wbEF0dHJzID0gW10sIC8vIGV4cHJlc3Npb25zIG9uIHRoaXMgdHlwZSBvZiBUYWdcbiAgICBleHByZXNzaW9ucyA9IFtdLFxuICAgIHJvb3QgPSBjb25mLnJvb3QsXG4gICAgdGFnTmFtZSA9IGNvbmYudGFnTmFtZSB8fCBnZXRUYWdOYW1lKHJvb3QpLFxuICAgIGlzVmlydHVhbCA9IHRhZ05hbWUgPT09ICd2aXJ0dWFsJyxcbiAgICBwcm9wc0luU3luY1dpdGhQYXJlbnQgPSBbXSxcbiAgICBkb207XG5cbiAgLy8gbWFrZSB0aGlzIHRhZyBvYnNlcnZhYmxlXG4gIG9ic2VydmFibGUkMSh0aGlzKTtcbiAgLy8gb25seSBjYWxsIHVubW91bnQgaWYgd2UgaGF2ZSBhIHZhbGlkIF9fVEFHX0lNUEwgKGhhcyBuYW1lIHByb3BlcnR5KVxuICBpZiAoaW1wbC5uYW1lICYmIHJvb3QuX3RhZykgeyByb290Ll90YWcudW5tb3VudCh0cnVlKTsgfVxuXG4gIC8vIG5vdCB5ZXQgbW91bnRlZFxuICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuICByb290LmlzTG9vcCA9IGlzTG9vcDtcblxuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnX2ludGVybmFsJywge1xuICAgIGlzQW5vbnltb3VzOiBpc0Fub255bW91cyxcbiAgICBpbnN0QXR0cnM6IGluc3RBdHRycyxcbiAgICBpbm5lckhUTUw6IGlubmVySFRNTCxcbiAgICAvLyB0aGVzZSB2YXJzIHdpbGwgYmUgbmVlZGVkIG9ubHkgZm9yIHRoZSB2aXJ0dWFsIHRhZ3NcbiAgICB2aXJ0czogW10sXG4gICAgdGFpbDogbnVsbCxcbiAgICBoZWFkOiBudWxsXG4gIH0pO1xuXG4gIC8vIGNyZWF0ZSBhIHVuaXF1ZSBpZCB0byB0aGlzIHRhZ1xuICAvLyBpdCBjb3VsZCBiZSBoYW5keSB0byB1c2UgaXQgYWxzbyB0byBpbXByb3ZlIHRoZSB2aXJ0dWFsIGRvbSByZW5kZXJpbmcgc3BlZWRcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ19yaW90X2lkJywgKytfX3VpZCk7IC8vIGJhc2UgMSBhbGxvd3MgdGVzdCAhdC5fcmlvdF9pZFxuXG4gIGV4dGVuZCh0aGlzLCB7IHJvb3Q6IHJvb3QsIG9wdHM6IG9wdHMgfSwgaXRlbSk7XG4gIC8vIHByb3RlY3QgdGhlIFwidGFnc1wiIGFuZCBcInJlZnNcIiBwcm9wZXJ0eSBmcm9tIGJlaW5nIG92ZXJyaWRkZW5cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3BhcmVudCcsIHBhcmVudCB8fCBudWxsKTtcbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3RhZ3MnLCB7fSk7XG4gIGRlZmluZVByb3BlcnR5KHRoaXMsICdyZWZzJywge30pO1xuXG4gIGRvbSA9IG1rZG9tKGltcGwudG1wbCwgaW5uZXJIVE1MLCBpc0xvb3ApO1xuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHRhZyBleHByZXNzaW9ucyBhbmQgb3B0aW9uc1xuICAgKiBAcGFyYW0gICB7ICogfSAgZGF0YSAtIGRhdGEgd2Ugd2FudCB0byB1c2UgdG8gZXh0ZW5kIHRoZSB0YWcgcHJvcGVydGllc1xuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3VwZGF0ZScsIGZ1bmN0aW9uIHRhZ1VwZGF0ZShkYXRhKSB7XG4gICAgaWYgKGlzRnVuY3Rpb24odGhpcy5zaG91bGRVcGRhdGUpICYmICF0aGlzLnNob3VsZFVwZGF0ZShkYXRhKSkgeyByZXR1cm4gdGhpcyB9XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhlIGRhdGEgcGFzc2VkIHdpbGwgbm90IG92ZXJyaWRlXG4gICAgLy8gdGhlIGNvbXBvbmVudCBjb3JlIG1ldGhvZHNcbiAgICBkYXRhID0gY2xlYW5VcERhdGEoZGF0YSk7XG5cbiAgICAvLyBpbmhlcml0IHByb3BlcnRpZXMgZnJvbSB0aGUgcGFyZW50LCBidXQgb25seSBmb3IgaXNBbm9ueW1vdXMgdGFnc1xuICAgIGlmIChpc0xvb3AgJiYgaXNBbm9ueW1vdXMpIHsgaW5oZXJpdEZyb20uYXBwbHkodGhpcywgW3RoaXMucGFyZW50LCBwcm9wc0luU3luY1dpdGhQYXJlbnRdKTsgfVxuICAgIGV4dGVuZCh0aGlzLCBkYXRhKTtcbiAgICB1cGRhdGVPcHRzLmFwcGx5KHRoaXMsIFtpc0xvb3AsIHBhcmVudCwgaXNBbm9ueW1vdXMsIG9wdHMsIGluc3RBdHRyc10pO1xuICAgIGlmICh0aGlzLmlzTW91bnRlZCkgeyB0aGlzLnRyaWdnZXIoJ3VwZGF0ZScsIGRhdGEpOyB9XG4gICAgdXBkYXRlQWxsRXhwcmVzc2lvbnMuY2FsbCh0aGlzLCBleHByZXNzaW9ucyk7XG4gICAgaWYgKHRoaXMuaXNNb3VudGVkKSB7IHRoaXMudHJpZ2dlcigndXBkYXRlZCcpOyB9XG5cbiAgICByZXR1cm4gdGhpc1xuXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIEFkZCBhIG1peGluIHRvIHRoaXMgdGFnXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAnbWl4aW4nLCBmdW5jdGlvbiB0YWdNaXhpbigpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICAgIGVhY2goYXJndW1lbnRzLCBmdW5jdGlvbiAobWl4KSB7XG4gICAgICB2YXIgaW5zdGFuY2UsXG4gICAgICAgIHByb3BzID0gW10sXG4gICAgICAgIG9iajtcblxuICAgICAgbWl4ID0gaXNTdHJpbmcobWl4KSA/IG1peGluJDEobWl4KSA6IG1peDtcblxuICAgICAgLy8gY2hlY2sgaWYgdGhlIG1peGluIGlzIGEgZnVuY3Rpb25cbiAgICAgIGlmIChpc0Z1bmN0aW9uKG1peCkpIHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBuZXcgbWl4aW4gaW5zdGFuY2VcbiAgICAgICAgaW5zdGFuY2UgPSBuZXcgbWl4KCk7XG4gICAgICB9IGVsc2UgeyBpbnN0YW5jZSA9IG1peDsgfVxuXG4gICAgICB2YXIgcHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoaW5zdGFuY2UpO1xuXG4gICAgICAvLyBidWlsZCBtdWx0aWxldmVsIHByb3RvdHlwZSBpbmhlcml0YW5jZSBjaGFpbiBwcm9wZXJ0eSBsaXN0XG4gICAgICBkbyB7IHByb3BzID0gcHJvcHMuY29uY2F0KE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaiB8fCBpbnN0YW5jZSkpOyB9XG4gICAgICB3aGlsZSAob2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iaiB8fCBpbnN0YW5jZSkpXG5cbiAgICAgIC8vIGxvb3AgdGhlIGtleXMgaW4gdGhlIGZ1bmN0aW9uIHByb3RvdHlwZSBvciB0aGUgYWxsIG9iamVjdCBrZXlzXG4gICAgICBlYWNoKHByb3BzLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIC8vIGJpbmQgbWV0aG9kcyB0byB0aGlzXG4gICAgICAgIC8vIGFsbG93IG1peGlucyB0byBvdmVycmlkZSBvdGhlciBwcm9wZXJ0aWVzL3BhcmVudCBtaXhpbnNcbiAgICAgICAgaWYgKGtleSAhPT0gJ2luaXQnKSB7XG4gICAgICAgICAgLy8gY2hlY2sgZm9yIGdldHRlcnMvc2V0dGVyc1xuICAgICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihpbnN0YW5jZSwga2V5KSB8fCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3RvLCBrZXkpO1xuICAgICAgICAgIHZhciBoYXNHZXR0ZXJTZXR0ZXIgPSBkZXNjcmlwdG9yICYmIChkZXNjcmlwdG9yLmdldCB8fCBkZXNjcmlwdG9yLnNldCk7XG5cbiAgICAgICAgICAvLyBhcHBseSBtZXRob2Qgb25seSBpZiBpdCBkb2VzIG5vdCBhbHJlYWR5IGV4aXN0IG9uIHRoZSBpbnN0YW5jZVxuICAgICAgICAgIGlmICghdGhpcyQxLmhhc093blByb3BlcnR5KGtleSkgJiYgaGFzR2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcyQxLCBrZXksIGRlc2NyaXB0b3IpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzJDFba2V5XSA9IGlzRnVuY3Rpb24oaW5zdGFuY2Vba2V5XSkgP1xuICAgICAgICAgICAgICBpbnN0YW5jZVtrZXldLmJpbmQodGhpcyQxKSA6XG4gICAgICAgICAgICAgIGluc3RhbmNlW2tleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gaW5pdCBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgYXV0b21hdGljYWxseVxuICAgICAgaWYgKGluc3RhbmNlLmluaXQpXG4gICAgICAgIHsgaW5zdGFuY2UuaW5pdC5iaW5kKHRoaXMkMSkoKTsgfVxuICAgIH0pO1xuICAgIHJldHVybiB0aGlzXG4gIH0uYmluZCh0aGlzKSk7XG5cbiAgLyoqXG4gICAqIE1vdW50IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKiBAcmV0dXJucyB7IFRhZyB9IHRoZSBjdXJyZW50IHRhZyBpbnN0YW5jZVxuICAgKi9cbiAgZGVmaW5lUHJvcGVydHkodGhpcywgJ21vdW50JywgZnVuY3Rpb24gdGFnTW91bnQoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICByb290Ll90YWcgPSB0aGlzOyAvLyBrZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSB0YWcganVzdCBjcmVhdGVkXG5cbiAgICAvLyBSZWFkIGFsbCB0aGUgYXR0cnMgb24gdGhpcyBpbnN0YW5jZS4gVGhpcyBnaXZlIHVzIHRoZSBpbmZvIHdlIG5lZWQgZm9yIHVwZGF0ZU9wdHNcbiAgICBwYXJzZUF0dHJpYnV0ZXMuYXBwbHkocGFyZW50LCBbcm9vdCwgcm9vdC5hdHRyaWJ1dGVzLCBmdW5jdGlvbiAoYXR0ciwgZXhwcikge1xuICAgICAgaWYgKCFpc0Fub255bW91cyAmJiBSZWZFeHByLmlzUHJvdG90eXBlT2YoZXhwcikpIHsgZXhwci50YWcgPSB0aGlzJDE7IH1cbiAgICAgIGF0dHIuZXhwciA9IGV4cHI7XG4gICAgICBpbnN0QXR0cnMucHVzaChhdHRyKTtcbiAgICB9XSk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHJvb3QgYWRkaW5nIGN1c3RvbSBhdHRyaWJ1dGVzIGNvbWluZyBmcm9tIHRoZSBjb21waWxlclxuICAgIGltcGxBdHRycyA9IFtdO1xuICAgIHdhbGtBdHRycyhpbXBsLmF0dHJzLCBmdW5jdGlvbiAoaywgdikgeyBpbXBsQXR0cnMucHVzaCh7bmFtZTogaywgdmFsdWU6IHZ9KTsgfSk7XG4gICAgcGFyc2VBdHRyaWJ1dGVzLmFwcGx5KHRoaXMsIFtyb290LCBpbXBsQXR0cnMsIGZ1bmN0aW9uIChhdHRyLCBleHByKSB7XG4gICAgICBpZiAoZXhwcikgeyBleHByZXNzaW9ucy5wdXNoKGV4cHIpOyB9XG4gICAgICBlbHNlIHsgc2V0QXR0cihyb290LCBhdHRyLm5hbWUsIGF0dHIudmFsdWUpOyB9XG4gICAgfV0pO1xuXG4gICAgLy8gY2hpbGRyZW4gaW4gbG9vcCBzaG91bGQgaW5oZXJpdCBmcm9tIHRydWUgcGFyZW50XG4gICAgaWYgKHRoaXMuX3BhcmVudCAmJiBpc0Fub255bW91cykgeyBpbmhlcml0RnJvbS5hcHBseSh0aGlzLCBbdGhpcy5fcGFyZW50LCBwcm9wc0luU3luY1dpdGhQYXJlbnRdKTsgfVxuXG4gICAgLy8gaW5pdGlhbGlhdGlvblxuICAgIHVwZGF0ZU9wdHMuYXBwbHkodGhpcywgW2lzTG9vcCwgcGFyZW50LCBpc0Fub255bW91cywgb3B0cywgaW5zdEF0dHJzXSk7XG5cbiAgICAvLyBhZGQgZ2xvYmFsIG1peGluc1xuICAgIHZhciBnbG9iYWxNaXhpbiA9IG1peGluJDEoR0xPQkFMX01JWElOKTtcblxuICAgIGlmIChnbG9iYWxNaXhpbikge1xuICAgICAgZm9yICh2YXIgaSBpbiBnbG9iYWxNaXhpbikge1xuICAgICAgICBpZiAoZ2xvYmFsTWl4aW4uaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICB0aGlzJDEubWl4aW4oZ2xvYmFsTWl4aW5baV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGltcGwuZm4pIHsgaW1wbC5mbi5jYWxsKHRoaXMsIG9wdHMpOyB9XG5cbiAgICB0aGlzLnRyaWdnZXIoJ2JlZm9yZS1tb3VudCcpO1xuXG4gICAgLy8gcGFyc2UgbGF5b3V0IGFmdGVyIGluaXQuIGZuIG1heSBjYWxjdWxhdGUgYXJncyBmb3IgbmVzdGVkIGN1c3RvbSB0YWdzXG4gICAgcGFyc2VFeHByZXNzaW9ucy5hcHBseSh0aGlzLCBbZG9tLCBleHByZXNzaW9ucywgZmFsc2VdKTtcblxuICAgIHRoaXMudXBkYXRlKGl0ZW0pO1xuXG4gICAgaWYgKGlzTG9vcCAmJiBpc0Fub255bW91cykge1xuICAgICAgLy8gdXBkYXRlIHRoZSByb290IGF0dHJpYnV0ZSBmb3IgdGhlIGxvb3BlZCBlbGVtZW50c1xuICAgICAgdGhpcy5yb290ID0gcm9vdCA9IGRvbS5maXJzdENoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aGlsZSAoZG9tLmZpcnN0Q2hpbGQpIHsgcm9vdC5hcHBlbmRDaGlsZChkb20uZmlyc3RDaGlsZCk7IH1cbiAgICAgIGlmIChyb290LnN0dWIpIHsgcm9vdCA9IHBhcmVudC5yb290OyB9XG4gICAgfVxuXG4gICAgZGVmaW5lUHJvcGVydHkodGhpcywgJ3Jvb3QnLCByb290KTtcbiAgICB0aGlzLmlzTW91bnRlZCA9IHRydWU7XG5cbiAgICAvLyBpZiBpdCdzIG5vdCBhIGNoaWxkIHRhZyB3ZSBjYW4gdHJpZ2dlciBpdHMgbW91bnQgZXZlbnRcbiAgICBpZiAoIXRoaXMucGFyZW50IHx8IHRoaXMucGFyZW50LmlzTW91bnRlZCkge1xuICAgICAgdGhpcy50cmlnZ2VyKCdtb3VudCcpO1xuICAgIH1cbiAgICAvLyBvdGhlcndpc2Ugd2UgbmVlZCB0byB3YWl0IHRoYXQgdGhlIHBhcmVudCBldmVudCBnZXRzIHRyaWdnZXJlZFxuICAgIGVsc2UgeyB0aGlzLnBhcmVudC5vbmUoJ21vdW50JywgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcyQxLnRyaWdnZXIoJ21vdW50Jyk7XG4gICAgfSk7IH1cblxuICAgIHJldHVybiB0aGlzXG5cbiAgfS5iaW5kKHRoaXMpKTtcblxuICAvKipcbiAgICogVW5tb3VudCB0aGUgdGFnIGluc3RhbmNlXG4gICAqIEBwYXJhbSB7IEJvb2xlYW4gfSBtdXN0S2VlcFJvb3QgLSBpZiBpdCdzIHRydWUgdGhlIHJvb3Qgbm9kZSB3aWxsIG5vdCBiZSByZW1vdmVkXG4gICAqIEByZXR1cm5zIHsgVGFnIH0gdGhlIGN1cnJlbnQgdGFnIGluc3RhbmNlXG4gICAqL1xuICBkZWZpbmVQcm9wZXJ0eSh0aGlzLCAndW5tb3VudCcsIGZ1bmN0aW9uIHRhZ1VubW91bnQobXVzdEtlZXBSb290KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgICB2YXIgZWwgPSB0aGlzLnJvb3QsXG4gICAgICBwID0gZWwucGFyZW50Tm9kZSxcbiAgICAgIHB0YWcsXG4gICAgICB0YWdJbmRleCA9IF9fVEFHU19DQUNIRS5pbmRleE9mKHRoaXMpO1xuXG4gICAgdGhpcy50cmlnZ2VyKCdiZWZvcmUtdW5tb3VudCcpO1xuXG4gICAgLy8gY2xlYXIgYWxsIGF0dHJpYnV0ZXMgY29taW5nIGZyb20gdGhlIG1vdW50ZWQgdGFnXG4gICAgd2Fsa0F0dHJzKGltcGwuYXR0cnMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBpZiAoc3RhcnRzV2l0aChuYW1lLCBBVFRSU19QUkVGSVgpKVxuICAgICAgICB7IG5hbWUgPSBuYW1lLnNsaWNlKEFUVFJTX1BSRUZJWC5sZW5ndGgpOyB9XG4gICAgICByZW1BdHRyKHJvb3QsIG5hbWUpO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIHRoaXMgdGFnIGluc3RhbmNlIGZyb20gdGhlIGdsb2JhbCB2aXJ0dWFsRG9tIHZhcmlhYmxlXG4gICAgaWYgKH50YWdJbmRleClcbiAgICAgIHsgX19UQUdTX0NBQ0hFLnNwbGljZSh0YWdJbmRleCwgMSk7IH1cblxuICAgIGlmIChwKSB7XG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcblxuICAgICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgICAgT2JqZWN0LmtleXModGhpcy50YWdzKS5mb3JFYWNoKGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgICAgICAgICBhcnJheWlzaFJlbW92ZShwdGFnLnRhZ3MsIHRhZ05hbWUsIHRoaXMkMS50YWdzW3RhZ05hbWVdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhcnJheWlzaFJlbW92ZShwdGFnLnRhZ3MsIHRhZ05hbWUsIHRoaXMpO1xuICAgICAgICAgIGlmKHBhcmVudCAhPT0gcHRhZykgLy8gcmVtb3ZlIGZyb20gX3BhcmVudCB0b29cbiAgICAgICAgICAgIHsgYXJyYXlpc2hSZW1vdmUocGFyZW50LnRhZ3MsIHRhZ05hbWUsIHRoaXMpOyB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSB7IGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpOyB9XG4gICAgICB9XG5cbiAgICAgIGlmICghbXVzdEtlZXBSb290KSB7XG4gICAgICAgIHAucmVtb3ZlQ2hpbGQoZWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gdGhlIHJpb3QtdGFnIGFuZCB0aGUgZGF0YS1pcyBhdHRyaWJ1dGVzIGFyZW4ndCBuZWVkZWQgYW55bW9yZSwgcmVtb3ZlIHRoZW1cbiAgICAgICAgcmVtQXR0cihwLCBJU19ESVJFQ1RJVkUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnRlcm5hbC52aXJ0cykge1xuICAgICAgZWFjaCh0aGlzLl9pbnRlcm5hbC52aXJ0cywgZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgaWYgKHYucGFyZW50Tm9kZSkgeyB2LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodik7IH1cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGFsbG93IGV4cHJlc3Npb25zIHRvIHVubW91bnQgdGhlbXNlbHZlc1xuICAgIHVubW91bnRBbGwoZXhwcmVzc2lvbnMpO1xuICAgIGVhY2goaW5zdEF0dHJzLCBmdW5jdGlvbiAoYSkgeyByZXR1cm4gYS5leHByICYmIGEuZXhwci51bm1vdW50ICYmIGEuZXhwci51bm1vdW50KCk7IH0pO1xuXG4gICAgdGhpcy50cmlnZ2VyKCd1bm1vdW50Jyk7XG4gICAgdGhpcy5vZmYoJyonKTtcbiAgICB0aGlzLmlzTW91bnRlZCA9IGZhbHNlO1xuXG4gICAgZGVsZXRlIHRoaXMucm9vdC5fdGFnO1xuXG4gICAgcmV0dXJuIHRoaXNcblxuICB9LmJpbmQodGhpcykpO1xufVxuXG4vKipcbiAqIERldGVjdCB0aGUgdGFnIGltcGxlbWVudGF0aW9uIGJ5IGEgRE9NIG5vZGVcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gZG9tIC0gRE9NIG5vZGUgd2UgbmVlZCB0byBwYXJzZSB0byBnZXQgaXRzIHRhZyBpbXBsZW1lbnRhdGlvblxuICogQHJldHVybnMgeyBPYmplY3QgfSBpdCByZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBpbXBsZW1lbnRhdGlvbiBvZiBhIGN1c3RvbSB0YWcgKHRlbXBsYXRlIGFuZCBib290IGZ1bmN0aW9uKVxuICovXG5mdW5jdGlvbiBnZXRUYWcoZG9tKSB7XG4gIHJldHVybiBkb20udGFnTmFtZSAmJiBfX1RBR19JTVBMW2dldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpIHx8XG4gICAgZ2V0QXR0cihkb20sIElTX0RJUkVDVElWRSkgfHwgZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKV1cbn1cblxuLyoqXG4gKiBJbmhlcml0IHByb3BlcnRpZXMgZnJvbSBhIHRhcmdldCB0YWcgaW5zdGFuY2VcbiAqIEB0aGlzIFRhZ1xuICogQHBhcmFtICAgeyBUYWcgfSB0YXJnZXQgLSB0YWcgd2hlcmUgd2Ugd2lsbCBpbmhlcml0IHByb3BlcnRpZXNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBwcm9wc0luU3luY1dpdGhQYXJlbnQgLSBhcnJheSBvZiBwcm9wZXJ0aWVzIHRvIHN5bmMgd2l0aCB0aGUgdGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGluaGVyaXRGcm9tKHRhcmdldCwgcHJvcHNJblN5bmNXaXRoUGFyZW50KSB7XG4gIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGVhY2goT2JqZWN0LmtleXModGFyZ2V0KSwgZnVuY3Rpb24gKGspIHtcbiAgICAvLyBzb21lIHByb3BlcnRpZXMgbXVzdCBiZSBhbHdheXMgaW4gc3luYyB3aXRoIHRoZSBwYXJlbnQgdGFnXG4gICAgdmFyIG11c3RTeW5jID0gIWlzUmVzZXJ2ZWROYW1lKGspICYmIGNvbnRhaW5zKHByb3BzSW5TeW5jV2l0aFBhcmVudCwgayk7XG5cbiAgICBpZiAoaXNVbmRlZmluZWQodGhpcyQxW2tdKSB8fCBtdXN0U3luYykge1xuICAgICAgLy8gdHJhY2sgdGhlIHByb3BlcnR5IHRvIGtlZXAgaW4gc3luY1xuICAgICAgLy8gc28gd2UgY2FuIGtlZXAgaXQgdXBkYXRlZFxuICAgICAgaWYgKCFtdXN0U3luYykgeyBwcm9wc0luU3luY1dpdGhQYXJlbnQucHVzaChrKTsgfVxuICAgICAgdGhpcyQxW2tdID0gdGFyZ2V0W2tdO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTW92ZSB0aGUgcG9zaXRpb24gb2YgYSBjdXN0b20gdGFnIGluIGl0cyBwYXJlbnQgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIGtleSB3aGVyZSB0aGUgdGFnIHdhcyBzdG9yZWRcbiAqIEBwYXJhbSAgIHsgTnVtYmVyIH0gbmV3UG9zIC0gaW5kZXggd2hlcmUgdGhlIG5ldyB0YWcgd2lsbCBiZSBzdG9yZWRcbiAqL1xuZnVuY3Rpb24gbW92ZUNoaWxkVGFnKHRhZ05hbWUsIG5ld1Bvcykge1xuICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQsXG4gICAgdGFncztcbiAgLy8gbm8gcGFyZW50IG5vIG1vdmVcbiAgaWYgKCFwYXJlbnQpIHsgcmV0dXJuIH1cblxuICB0YWdzID0gcGFyZW50LnRhZ3NbdGFnTmFtZV07XG5cbiAgaWYgKGlzQXJyYXkodGFncykpXG4gICAgeyB0YWdzLnNwbGljZShuZXdQb3MsIDAsIHRhZ3Muc3BsaWNlKHRhZ3MuaW5kZXhPZih0aGlzKSwgMSlbMF0pOyB9XG4gIGVsc2UgeyBhcnJheWlzaEFkZChwYXJlbnQudGFncywgdGFnTmFtZSwgdGhpcyk7IH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcgY2hpbGQgdGFnIGluY2x1ZGluZyBpdCBjb3JyZWN0bHkgaW50byBpdHMgcGFyZW50XG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGNoaWxkIC0gY2hpbGQgdGFnIGltcGxlbWVudGF0aW9uXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IG9wdHMgLSB0YWcgb3B0aW9ucyBjb250YWluaW5nIHRoZSBET00gbm9kZSB3aGVyZSB0aGUgdGFnIHdpbGwgYmUgbW91bnRlZFxuICogQHBhcmFtICAgeyBTdHJpbmcgfSBpbm5lckhUTUwgLSBpbm5lciBodG1sIG9mIHRoZSBjaGlsZCBub2RlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IHBhcmVudCAtIGluc3RhbmNlIG9mIHRoZSBwYXJlbnQgdGFnIGluY2x1ZGluZyB0aGUgY2hpbGQgY3VzdG9tIHRhZ1xuICogQHJldHVybnMgeyBPYmplY3QgfSBpbnN0YW5jZSBvZiB0aGUgbmV3IGNoaWxkIHRhZyBqdXN0IGNyZWF0ZWRcbiAqL1xuZnVuY3Rpb24gaW5pdENoaWxkVGFnKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwsIHBhcmVudCkge1xuICB2YXIgdGFnID0gbmV3IFRhZyQxKGNoaWxkLCBvcHRzLCBpbm5lckhUTUwpLFxuICAgIHRhZ05hbWUgPSBvcHRzLnRhZ05hbWUgfHwgZ2V0VGFnTmFtZShvcHRzLnJvb3QsIHRydWUpLFxuICAgIHB0YWcgPSBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcocGFyZW50KTtcbiAgLy8gZml4IGZvciB0aGUgcGFyZW50IGF0dHJpYnV0ZSBpbiB0aGUgbG9vcGVkIGVsZW1lbnRzXG4gIGRlZmluZVByb3BlcnR5KHRhZywgJ3BhcmVudCcsIHB0YWcpO1xuICAvLyBzdG9yZSB0aGUgcmVhbCBwYXJlbnQgdGFnXG4gIC8vIGluIHNvbWUgY2FzZXMgdGhpcyBjb3VsZCBiZSBkaWZmZXJlbnQgZnJvbSB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgLy8gZm9yIGV4YW1wbGUgaW4gbmVzdGVkIGxvb3BzXG4gIHRhZy5fcGFyZW50ID0gcGFyZW50O1xuXG4gIC8vIGFkZCB0aGlzIHRhZyB0byB0aGUgY3VzdG9tIHBhcmVudCB0YWdcbiAgYXJyYXlpc2hBZGQocHRhZy50YWdzLCB0YWdOYW1lLCB0YWcpO1xuXG4gIC8vIGFuZCBhbHNvIHRvIHRoZSByZWFsIHBhcmVudCB0YWdcbiAgaWYgKHB0YWcgIT09IHBhcmVudClcbiAgICB7IGFycmF5aXNoQWRkKHBhcmVudC50YWdzLCB0YWdOYW1lLCB0YWcpOyB9XG5cbiAgLy8gZW1wdHkgdGhlIGNoaWxkIG5vZGUgb25jZSB3ZSBnb3QgaXRzIHRlbXBsYXRlXG4gIC8vIHRvIGF2b2lkIHRoYXQgaXRzIGNoaWxkcmVuIGdldCBjb21waWxlZCBtdWx0aXBsZSB0aW1lc1xuICBvcHRzLnJvb3QuaW5uZXJIVE1MID0gJyc7XG5cbiAgcmV0dXJuIHRhZ1xufVxuXG4vKipcbiAqIExvb3AgYmFja3dhcmQgYWxsIHRoZSBwYXJlbnRzIHRyZWUgdG8gZGV0ZWN0IHRoZSBmaXJzdCBjdXN0b20gcGFyZW50IHRhZ1xuICogQHBhcmFtICAgeyBPYmplY3QgfSB0YWcgLSBhIFRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSB0aGUgaW5zdGFuY2Ugb2YgdGhlIGZpcnN0IGN1c3RvbSBwYXJlbnQgdGFnIGZvdW5kXG4gKi9cbmZ1bmN0aW9uIGdldEltbWVkaWF0ZUN1c3RvbVBhcmVudFRhZyh0YWcpIHtcbiAgdmFyIHB0YWcgPSB0YWc7XG4gIHdoaWxlIChwdGFnLl9pbnRlcm5hbC5pc0Fub255bW91cykge1xuICAgIGlmICghcHRhZy5wYXJlbnQpIHsgYnJlYWsgfVxuICAgIHB0YWcgPSBwdGFnLnBhcmVudDtcbiAgfVxuICByZXR1cm4gcHRhZ1xufVxuXG4vKipcbiAqIFRyaWdnZXIgdGhlIHVubW91bnQgbWV0aG9kIG9uIGFsbCB0aGUgZXhwcmVzc2lvbnNcbiAqIEBwYXJhbSAgIHsgQXJyYXkgfSBleHByZXNzaW9ucyAtIERPTSBleHByZXNzaW9uc1xuICovXG5mdW5jdGlvbiB1bm1vdW50QWxsKGV4cHJlc3Npb25zKSB7XG4gIGVhY2goZXhwcmVzc2lvbnMsIGZ1bmN0aW9uKGV4cHIpIHtcbiAgICBpZiAoZXhwciBpbnN0YW5jZW9mIFRhZyQxKSB7IGV4cHIudW5tb3VudCh0cnVlKTsgfVxuICAgIGVsc2UgaWYgKGV4cHIudW5tb3VudCkgeyBleHByLnVubW91bnQoKTsgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhZyBuYW1lIG9mIGFueSBET00gbm9kZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkb20gLSBET00gbm9kZSB3ZSB3YW50IHRvIHBhcnNlXG4gKiBAcGFyYW0gICB7IEJvb2xlYW4gfSBza2lwRGF0YUlzIC0gaGFjayB0byBpZ25vcmUgdGhlIGRhdGEtaXMgYXR0cmlidXRlIHdoZW4gYXR0YWNoaW5nIHRvIHBhcmVudFxuICogQHJldHVybnMgeyBTdHJpbmcgfSBuYW1lIHRvIGlkZW50aWZ5IHRoaXMgZG9tIG5vZGUgaW4gcmlvdFxuICovXG5mdW5jdGlvbiBnZXRUYWdOYW1lKGRvbSwgc2tpcERhdGFJcykge1xuICB2YXIgY2hpbGQgPSBnZXRUYWcoZG9tKSxcbiAgICBuYW1lZFRhZyA9ICFza2lwRGF0YUlzICYmIGdldEF0dHIoZG9tLCBJU19ESVJFQ1RJVkUpO1xuICByZXR1cm4gbmFtZWRUYWcgJiYgIXRtcGwuaGFzRXhwcihuYW1lZFRhZykgP1xuICAgICAgICAgICAgICAgIG5hbWVkVGFnIDpcbiAgICAgICAgICAgICAgY2hpbGQgPyBjaGlsZC5uYW1lIDogZG9tLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxufVxuXG4vKipcbiAqIFdpdGggdGhpcyBmdW5jdGlvbiB3ZSBhdm9pZCB0aGF0IHRoZSBpbnRlcm5hbCBUYWcgbWV0aG9kcyBnZXQgb3ZlcnJpZGRlblxuICogQHBhcmFtICAgeyBPYmplY3QgfSBkYXRhIC0gb3B0aW9ucyB3ZSB3YW50IHRvIHVzZSB0byBleHRlbmQgdGhlIHRhZyBpbnN0YW5jZVxuICogQHJldHVybnMgeyBPYmplY3QgfSBjbGVhbiBvYmplY3Qgd2l0aG91dCBjb250YWluaW5nIHRoZSByaW90IGludGVybmFsIHJlc2VydmVkIHdvcmRzXG4gKi9cbmZ1bmN0aW9uIGNsZWFuVXBEYXRhKGRhdGEpIHtcbiAgaWYgKCEoZGF0YSBpbnN0YW5jZW9mIFRhZyQxKSAmJiAhKGRhdGEgJiYgaXNGdW5jdGlvbihkYXRhLnRyaWdnZXIpKSlcbiAgICB7IHJldHVybiBkYXRhIH1cblxuICB2YXIgbyA9IHt9O1xuICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xuICAgIGlmICghUkVfUkVTRVJWRURfTkFNRVMudGVzdChrZXkpKSB7IG9ba2V5XSA9IGRhdGFba2V5XTsgfVxuICB9XG4gIHJldHVybiBvXG59XG5cbi8qKlxuICogU2V0IHRoZSBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgZm9yIGEgZ2l2ZW4ga2V5LiBJZiBzb21ldGhpbmcgYWxyZWFkeVxuICogZXhpc3RzIHRoZXJlLCB0aGVuIGl0IGJlY29tZXMgYW4gYXJyYXkgY29udGFpbmluZyBib3RoIHRoZSBvbGQgYW5kIG5ldyB2YWx1ZS5cbiAqIEBwYXJhbSB7IE9iamVjdCB9IG9iaiAtIG9iamVjdCBvbiB3aGljaCB0byBzZXQgdGhlIHByb3BlcnR5XG4gKiBAcGFyYW0geyBTdHJpbmcgfSBrZXkgLSBwcm9wZXJ0eSBuYW1lXG4gKiBAcGFyYW0geyBPYmplY3QgfSB2YWx1ZSAtIHRoZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgdG8gYmUgc2V0XG4gKiBAcGFyYW0geyBCb29sZWFuIH0gZW5zdXJlQXJyYXkgLSBlbnN1cmUgdGhhdCB0aGUgcHJvcGVydHkgcmVtYWlucyBhbiBhcnJheVxuICovXG5mdW5jdGlvbiBhcnJheWlzaEFkZChvYmosIGtleSwgdmFsdWUsIGVuc3VyZUFycmF5KSB7XG4gIHZhciBkZXN0ID0gb2JqW2tleV07XG4gIHZhciBpc0FyciA9IGlzQXJyYXkoZGVzdCk7XG5cbiAgaWYgKGRlc3QgJiYgZGVzdCA9PT0gdmFsdWUpIHsgcmV0dXJuIH1cblxuICAvLyBpZiB0aGUga2V5IHdhcyBuZXZlciBzZXQsIHNldCBpdCBvbmNlXG4gIGlmICghZGVzdCAmJiBlbnN1cmVBcnJheSkgeyBvYmpba2V5XSA9IFt2YWx1ZV07IH1cbiAgZWxzZSBpZiAoIWRlc3QpIHsgb2JqW2tleV0gPSB2YWx1ZTsgfVxuICAvLyBpZiBpdCB3YXMgYW4gYXJyYXkgYW5kIG5vdCB5ZXQgc2V0XG4gIGVsc2UgaWYgKCFpc0FyciB8fCBpc0FyciAmJiAhY29udGFpbnMoZGVzdCwgdmFsdWUpKSB7XG4gICAgaWYgKGlzQXJyKSB7IGRlc3QucHVzaCh2YWx1ZSk7IH1cbiAgICBlbHNlIHsgb2JqW2tleV0gPSBbZGVzdCwgdmFsdWVdOyB9XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFuIGl0ZW0gZnJvbSBhbiBvYmplY3QgYXQgYSBnaXZlbiBrZXkuIElmIHRoZSBrZXkgcG9pbnRzIHRvIGFuIGFycmF5LFxuICogdGhlbiB0aGUgaXRlbSBpcyBqdXN0IHJlbW92ZWQgZnJvbSB0aGUgYXJyYXkuXG4gKiBAcGFyYW0geyBPYmplY3QgfSBvYmogLSBvYmplY3Qgb24gd2hpY2ggdG8gcmVtb3ZlIHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIHsgU3RyaW5nIH0ga2V5IC0gcHJvcGVydHkgbmFtZVxuICogQHBhcmFtIHsgT2JqZWN0IH0gdmFsdWUgLSB0aGUgdmFsdWUgb2YgdGhlIHByb3BlcnR5IHRvIGJlIHJlbW92ZWRcbiAqIEBwYXJhbSB7IEJvb2xlYW4gfSBlbnN1cmVBcnJheSAtIGVuc3VyZSB0aGF0IHRoZSBwcm9wZXJ0eSByZW1haW5zIGFuIGFycmF5XG4qL1xuZnVuY3Rpb24gYXJyYXlpc2hSZW1vdmUob2JqLCBrZXksIHZhbHVlLCBlbnN1cmVBcnJheSkge1xuICBpZiAoaXNBcnJheShvYmpba2V5XSkpIHtcbiAgICBlYWNoKG9ialtrZXldLCBmdW5jdGlvbihpdGVtLCBpKSB7XG4gICAgICBpZiAoaXRlbSA9PT0gdmFsdWUpIHsgb2JqW2tleV0uc3BsaWNlKGksIDEpOyB9XG4gICAgfSk7XG4gICAgaWYgKCFvYmpba2V5XS5sZW5ndGgpIHsgZGVsZXRlIG9ialtrZXldOyB9XG4gICAgZWxzZSBpZiAob2JqW2tleV0ubGVuZ3RoID09PSAxICYmICFlbnN1cmVBcnJheSkgeyBvYmpba2V5XSA9IG9ialtrZXldWzBdOyB9XG4gIH0gZWxzZVxuICAgIHsgZGVsZXRlIG9ialtrZXldOyB9IC8vIG90aGVyd2lzZSBqdXN0IGRlbGV0ZSB0aGUga2V5XG59XG5cbi8qKlxuICogQ2hlY2sgd2hldGhlciBhIERPTSBub2RlIGlzIGluIHN0dWIgbW9kZSwgdXNlZnVsIGZvciB0aGUgcmlvdCAnaWYnIGRpcmVjdGl2ZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSAgZG9tIC0gRE9NIG5vZGUgd2Ugd2FudCB0byBwYXJzZVxuICogQHJldHVybnMgeyBCb29sZWFuIH0gLVxuICovXG5mdW5jdGlvbiBpc0luU3R1Yihkb20pIHtcbiAgd2hpbGUgKGRvbSkge1xuICAgIGlmIChkb20uaW5TdHViKVxuICAgICAgeyByZXR1cm4gdHJ1ZSB9XG4gICAgZG9tID0gZG9tLnBhcmVudE5vZGU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogTW91bnQgYSB0YWcgY3JlYXRpbmcgbmV3IFRhZyBpbnN0YW5jZVxuICogQHBhcmFtICAgeyBPYmplY3QgfSByb290IC0gZG9tIG5vZGUgd2hlcmUgdGhlIHRhZyB3aWxsIGJlIG1vdW50ZWRcbiAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gdGFnTmFtZSAtIG5hbWUgb2YgdGhlIHJpb3QgdGFnIHdlIHdhbnQgdG8gbW91bnRcbiAqIEBwYXJhbSAgIHsgT2JqZWN0IH0gb3B0cyAtIG9wdGlvbnMgdG8gcGFzcyB0byB0aGUgVGFnIGluc3RhbmNlXG4gKiBAcGFyYW0gICB7IE9iamVjdCB9IGN0eCAtIG9wdGlvbmFsIGNvbnRleHQgdGhhdCB3aWxsIGJlIHVzZWQgdG8gZXh0ZW5kIGFuIGV4aXN0aW5nIGNsYXNzICggdXNlZCBpbiByaW90LlRhZyApXG4gKiBAcmV0dXJucyB7IFRhZyB9IGEgbmV3IFRhZyBpbnN0YW5jZVxuICovXG5mdW5jdGlvbiBtb3VudFRvKHJvb3QsIHRhZ05hbWUsIG9wdHMsIGN0eCkge1xuICB2YXIgaW1wbCA9IF9fVEFHX0lNUExbdGFnTmFtZV0sXG4gICAgaW1wbENsYXNzID0gX19UQUdfSU1QTFt0YWdOYW1lXS5jbGFzcyxcbiAgICB0YWcgPSBjdHggfHwgKGltcGxDbGFzcyA/IE9iamVjdC5jcmVhdGUoaW1wbENsYXNzLnByb3RvdHlwZSkgOiB7fSksXG4gICAgLy8gY2FjaGUgdGhlIGlubmVyIEhUTUwgdG8gZml4ICM4NTVcbiAgICBpbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgPSByb290Ll9pbm5lckhUTUwgfHwgcm9vdC5pbm5lckhUTUw7XG5cbiAgLy8gY2xlYXIgdGhlIGlubmVyIGh0bWxcbiAgcm9vdC5pbm5lckhUTUwgPSAnJztcblxuICB2YXIgY29uZiA9IHsgcm9vdDogcm9vdCwgb3B0czogb3B0cyB9O1xuICBpZiAob3B0cyAmJiBvcHRzLnBhcmVudCkgeyBjb25mLnBhcmVudCA9IG9wdHMucGFyZW50OyB9XG5cbiAgaWYgKGltcGwgJiYgcm9vdCkgeyBUYWckMS5hcHBseSh0YWcsIFtpbXBsLCBjb25mLCBpbm5lckhUTUxdKTsgfVxuXG4gIGlmICh0YWcgJiYgdGFnLm1vdW50KSB7XG4gICAgdGFnLm1vdW50KHRydWUpO1xuICAgIC8vIGFkZCB0aGlzIHRhZyB0byB0aGUgdmlydHVhbERvbSB2YXJpYWJsZVxuICAgIGlmICghY29udGFpbnMoX19UQUdTX0NBQ0hFLCB0YWcpKSB7IF9fVEFHU19DQUNIRS5wdXNoKHRhZyk7IH1cbiAgfVxuXG4gIHJldHVybiB0YWdcbn1cblxuXG4vKipcbiAqIEFkZHMgdGhlIGVsZW1lbnRzIGZvciBhIHZpcnR1YWwgdGFnXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgLSB0aGUgbm9kZSB0aGF0IHdpbGwgZG8gdGhlIGluc2VydGluZyBvciBhcHBlbmRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIG9ubHkgaWYgaW5zZXJ0aW5nLCBpbnNlcnQgYmVmb3JlIHRoaXMgdGFnJ3MgZmlyc3QgY2hpbGRcbiAqL1xuZnVuY3Rpb24gbWFrZVZpcnR1YWwoc3JjLCB0YXJnZXQpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIGhlYWQgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIHRhaWwgPSBjcmVhdGVET01QbGFjZWhvbGRlcigpLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liLCBlbDtcblxuICB0aGlzLl9pbnRlcm5hbC5oZWFkID0gdGhpcy5yb290Lmluc2VydEJlZm9yZShoZWFkLCB0aGlzLnJvb3QuZmlyc3RDaGlsZCk7XG4gIHRoaXMuX2ludGVybmFsLnRhaWwgPSB0aGlzLnJvb3QuYXBwZW5kQ2hpbGQodGFpbCk7XG5cbiAgZWwgPSB0aGlzLl9pbnRlcm5hbC5oZWFkO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIHRoaXMkMS5faW50ZXJuYWwudmlydHMucHVzaChlbCk7IC8vIGhvbGQgZm9yIHVubW91bnRpbmdcbiAgICBlbCA9IHNpYjtcbiAgfVxuXG4gIGlmICh0YXJnZXQpXG4gICAgeyBzcmMuaW5zZXJ0QmVmb3JlKGZyYWcsIHRhcmdldC5faW50ZXJuYWwuaGVhZCk7IH1cbiAgZWxzZVxuICAgIHsgc3JjLmFwcGVuZENoaWxkKGZyYWcpOyB9XG59XG5cbi8qKlxuICogTW92ZSB2aXJ0dWFsIHRhZyBhbmQgYWxsIGNoaWxkIG5vZGVzXG4gKiBAdGhpcyBUYWdcbiAqIEBwYXJhbSB7IE5vZGUgfSBzcmMgIC0gdGhlIG5vZGUgdGhhdCB3aWxsIGRvIHRoZSBpbnNlcnRpbmdcbiAqIEBwYXJhbSB7IFRhZyB9IHRhcmdldCAtIGluc2VydCBiZWZvcmUgdGhpcyB0YWcncyBmaXJzdCBjaGlsZFxuICovXG5mdW5jdGlvbiBtb3ZlVmlydHVhbChzcmMsIHRhcmdldCkge1xuICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgZWwgPSB0aGlzLl9pbnRlcm5hbC5oZWFkLFxuICAgIGZyYWcgPSBjcmVhdGVGcmFnKCksXG4gICAgc2liO1xuXG4gIHdoaWxlIChlbCkge1xuICAgIHNpYiA9IGVsLm5leHRTaWJsaW5nO1xuICAgIGZyYWcuYXBwZW5kQ2hpbGQoZWwpO1xuICAgIGVsID0gc2liO1xuICAgIGlmIChlbCA9PT0gdGhpcyQxLl9pbnRlcm5hbC50YWlsKSB7XG4gICAgICBmcmFnLmFwcGVuZENoaWxkKGVsKTtcbiAgICAgIHNyYy5pbnNlcnRCZWZvcmUoZnJhZywgdGFyZ2V0Ll9pbnRlcm5hbC5oZWFkKTtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2V0IHNlbGVjdG9ycyBmb3IgdGFnc1xuICogQHBhcmFtICAgeyBBcnJheSB9IHRhZ3MgLSB0YWcgbmFtZXMgdG8gc2VsZWN0XG4gKiBAcmV0dXJucyB7IFN0cmluZyB9IHNlbGVjdG9yXG4gKi9cbmZ1bmN0aW9uIHNlbGVjdFRhZ3ModGFncykge1xuICAvLyBzZWxlY3QgYWxsIHRhZ3NcbiAgaWYgKCF0YWdzKSB7XG4gICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhfX1RBR19JTVBMKTtcbiAgICByZXR1cm4ga2V5cyArIHNlbGVjdFRhZ3Moa2V5cylcbiAgfVxuXG4gIHJldHVybiB0YWdzXG4gICAgLmZpbHRlcihmdW5jdGlvbiAodCkgeyByZXR1cm4gIS9bXi1cXHddLy50ZXN0KHQpOyB9KVxuICAgIC5yZWR1Y2UoZnVuY3Rpb24gKGxpc3QsIHQpIHtcbiAgICAgIHZhciBuYW1lID0gdC50cmltKCkudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiBsaXN0ICsgXCIsW1wiICsgSVNfRElSRUNUSVZFICsgXCI9XFxcIlwiICsgbmFtZSArIFwiXFxcIl1cIlxuICAgIH0sICcnKVxufVxuXG5cbnZhciB0YWdzID0gT2JqZWN0LmZyZWV6ZSh7XG5cdGdldFRhZzogZ2V0VGFnLFxuXHRpbmhlcml0RnJvbTogaW5oZXJpdEZyb20sXG5cdG1vdmVDaGlsZFRhZzogbW92ZUNoaWxkVGFnLFxuXHRpbml0Q2hpbGRUYWc6IGluaXRDaGlsZFRhZyxcblx0Z2V0SW1tZWRpYXRlQ3VzdG9tUGFyZW50VGFnOiBnZXRJbW1lZGlhdGVDdXN0b21QYXJlbnRUYWcsXG5cdHVubW91bnRBbGw6IHVubW91bnRBbGwsXG5cdGdldFRhZ05hbWU6IGdldFRhZ05hbWUsXG5cdGNsZWFuVXBEYXRhOiBjbGVhblVwRGF0YSxcblx0YXJyYXlpc2hBZGQ6IGFycmF5aXNoQWRkLFxuXHRhcnJheWlzaFJlbW92ZTogYXJyYXlpc2hSZW1vdmUsXG5cdGlzSW5TdHViOiBpc0luU3R1Yixcblx0bW91bnRUbzogbW91bnRUbyxcblx0bWFrZVZpcnR1YWw6IG1ha2VWaXJ0dWFsLFxuXHRtb3ZlVmlydHVhbDogbW92ZVZpcnR1YWwsXG5cdHNlbGVjdFRhZ3M6IHNlbGVjdFRhZ3Ncbn0pO1xuXG4vKipcbiAqIFJpb3QgcHVibGljIGFwaVxuICovXG52YXIgc2V0dGluZ3MgPSBPYmplY3QuY3JlYXRlKGJyYWNrZXRzLnNldHRpbmdzKTtcblxudmFyIHV0aWwgPSB7XG4gIHRtcGw6IHRtcGwsXG4gIGJyYWNrZXRzOiBicmFja2V0cyxcbiAgc3R5bGVNYW5hZ2VyOiBzdHlsZU1hbmFnZXIsXG4gIHZkb206IF9fVEFHU19DQUNIRSxcbiAgc3R5bGVOb2RlOiBzdHlsZU1hbmFnZXIuc3R5bGVOb2RlLFxuICAvLyBleHBvcnQgdGhlIHJpb3QgaW50ZXJuYWwgdXRpbHMgYXMgd2VsbFxuICBkb206IGRvbSxcbiAgY2hlY2s6IGNoZWNrLFxuICBtaXNjOiBtaXNjLFxuICB0YWdzOiB0YWdzXG59O1xuXG4vLyBleHBvcnQgdGhlIGNvcmUgcHJvcHMvbWV0aG9kc1xudmFyIFRhZyQkMSA9IFRhZyQyO1xudmFyIHRhZyQkMSA9IHRhZyQxO1xudmFyIHRhZzIkJDEgPSB0YWcyJDE7XG52YXIgbW91bnQkJDEgPSBtb3VudCQxO1xudmFyIG1peGluJCQxID0gbWl4aW4kMTtcbnZhciB1cGRhdGUkJDEgPSB1cGRhdGUkMTtcbnZhciB1bnJlZ2lzdGVyJCQxID0gdW5yZWdpc3RlciQxO1xudmFyIG9ic2VydmFibGUgPSBvYnNlcnZhYmxlJDE7XG5cbnZhciByaW90JDEgPSB7XG4gIHNldHRpbmdzOiBzZXR0aW5ncyxcbiAgdXRpbDogdXRpbCxcbiAgLy8gY29yZVxuICBUYWc6IFRhZyQkMSxcbiAgdGFnOiB0YWckJDEsXG4gIHRhZzI6IHRhZzIkJDEsXG4gIG1vdW50OiBtb3VudCQkMSxcbiAgbWl4aW46IG1peGluJCQxLFxuICB1cGRhdGU6IHVwZGF0ZSQkMSxcbiAgdW5yZWdpc3RlcjogdW5yZWdpc3RlciQkMSxcbiAgb2JzZXJ2YWJsZTogb2JzZXJ2YWJsZVxufTtcblxuZXhwb3J0cy5zZXR0aW5ncyA9IHNldHRpbmdzO1xuZXhwb3J0cy51dGlsID0gdXRpbDtcbmV4cG9ydHMuVGFnID0gVGFnJCQxO1xuZXhwb3J0cy50YWcgPSB0YWckJDE7XG5leHBvcnRzLnRhZzIgPSB0YWcyJCQxO1xuZXhwb3J0cy5tb3VudCA9IG1vdW50JCQxO1xuZXhwb3J0cy5taXhpbiA9IG1peGluJCQxO1xuZXhwb3J0cy51cGRhdGUgPSB1cGRhdGUkJDE7XG5leHBvcnRzLnVucmVnaXN0ZXIgPSB1bnJlZ2lzdGVyJCQxO1xuZXhwb3J0cy5vYnNlcnZhYmxlID0gb2JzZXJ2YWJsZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHJpb3QkMTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcblxufSkpKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yaW90L3Jpb3QuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wRGVmYXVsdCAoZXgpIHsgcmV0dXJuIChleCAmJiAodHlwZW9mIGV4ID09PSAnb2JqZWN0JykgJiYgJ2RlZmF1bHQnIGluIGV4KSA/IGV4WydkZWZhdWx0J10gOiBleDsgfVxuXG52YXIgb2JzZXJ2YWJsZSA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCdyaW90LW9ic2VydmFibGUnKSk7XG5cbi8qKlxuICogU2ltcGxlIGNsaWVudC1zaWRlIHJvdXRlclxuICogQG1vZHVsZSByaW90LXJvdXRlXG4gKi9cblxudmFyIFJFX09SSUdJTiA9IC9eLis/XFwvXFwvK1teXFwvXSsvO1xudmFyIEVWRU5UX0xJU1RFTkVSID0gJ0V2ZW50TGlzdGVuZXInO1xudmFyIFJFTU9WRV9FVkVOVF9MSVNURU5FUiA9ICdyZW1vdmUnICsgRVZFTlRfTElTVEVORVI7XG52YXIgQUREX0VWRU5UX0xJU1RFTkVSID0gJ2FkZCcgKyBFVkVOVF9MSVNURU5FUjtcbnZhciBIQVNfQVRUUklCVVRFID0gJ2hhc0F0dHJpYnV0ZSc7XG52YXIgUE9QU1RBVEUgPSAncG9wc3RhdGUnO1xudmFyIEhBU0hDSEFOR0UgPSAnaGFzaGNoYW5nZSc7XG52YXIgVFJJR0dFUiA9ICd0cmlnZ2VyJztcbnZhciBNQVhfRU1JVF9TVEFDS19MRVZFTCA9IDM7XG52YXIgd2luID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3c7XG52YXIgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9ICd1bmRlZmluZWQnICYmIGRvY3VtZW50O1xudmFyIGhpc3QgPSB3aW4gJiYgaGlzdG9yeTtcbnZhciBsb2MgPSB3aW4gJiYgKGhpc3QubG9jYXRpb24gfHwgd2luLmxvY2F0aW9uKTtcbnZhciBwcm90ID0gUm91dGVyLnByb3RvdHlwZTtcbnZhciBjbGlja0V2ZW50ID0gZG9jICYmIGRvYy5vbnRvdWNoc3RhcnQgPyAndG91Y2hzdGFydCcgOiAnY2xpY2snO1xudmFyIGNlbnRyYWwgPSBvYnNlcnZhYmxlKCk7XG5cbnZhciBzdGFydGVkID0gZmFsc2U7XG52YXIgcm91dGVGb3VuZCA9IGZhbHNlO1xudmFyIGRlYm91bmNlZEVtaXQ7XG52YXIgYmFzZTtcbnZhciBjdXJyZW50O1xudmFyIHBhcnNlcjtcbnZhciBzZWNvbmRQYXJzZXI7XG52YXIgZW1pdFN0YWNrID0gW107XG52YXIgZW1pdFN0YWNrTGV2ZWwgPSAwO1xuXG4vKipcbiAqIERlZmF1bHQgcGFyc2VyLiBZb3UgY2FuIHJlcGxhY2UgaXQgdmlhIHJvdXRlci5wYXJzZXIgbWV0aG9kLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggLSBjdXJyZW50IHBhdGggKG5vcm1hbGl6ZWQpXG4gKiBAcmV0dXJucyB7YXJyYXl9IGFycmF5XG4gKi9cbmZ1bmN0aW9uIERFRkFVTFRfUEFSU0VSKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGguc3BsaXQoL1svPyNdLylcbn1cblxuLyoqXG4gKiBEZWZhdWx0IHBhcnNlciAoc2Vjb25kKS4gWW91IGNhbiByZXBsYWNlIGl0IHZpYSByb3V0ZXIucGFyc2VyIG1ldGhvZC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gY3VycmVudCBwYXRoIChub3JtYWxpemVkKVxuICogQHBhcmFtIHtzdHJpbmd9IGZpbHRlciAtIGZpbHRlciBzdHJpbmcgKG5vcm1hbGl6ZWQpXG4gKiBAcmV0dXJucyB7YXJyYXl9IGFycmF5XG4gKi9cbmZ1bmN0aW9uIERFRkFVTFRfU0VDT05EX1BBUlNFUihwYXRoLCBmaWx0ZXIpIHtcbiAgdmFyIGYgPSBmaWx0ZXJcbiAgICAucmVwbGFjZSgvXFw/L2csICdcXFxcPycpXG4gICAgLnJlcGxhY2UoL1xcKi9nLCAnKFteLz8jXSs/KScpXG4gICAgLnJlcGxhY2UoL1xcLlxcLi8sICcuKicpO1xuICB2YXIgcmUgPSBuZXcgUmVnRXhwKChcIl5cIiArIGYgKyBcIiRcIikpO1xuICB2YXIgYXJncyA9IHBhdGgubWF0Y2gocmUpO1xuXG4gIGlmIChhcmdzKSB7IHJldHVybiBhcmdzLnNsaWNlKDEpIH1cbn1cblxuLyoqXG4gKiBTaW1wbGUvY2hlYXAgZGVib3VuY2UgaW1wbGVtZW50YXRpb25cbiAqIEBwYXJhbSAgIHtmdW5jdGlvbn0gZm4gLSBjYWxsYmFja1xuICogQHBhcmFtICAge251bWJlcn0gZGVsYXkgLSBkZWxheSBpbiBzZWNvbmRzXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IGRlYm91bmNlZCBmdW5jdGlvblxuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmbiwgZGVsYXkpIHtcbiAgdmFyIHQ7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgY2xlYXJUaW1lb3V0KHQpO1xuICAgIHQgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSk7XG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdGhlIHdpbmRvdyBsaXN0ZW5lcnMgdG8gdHJpZ2dlciB0aGUgcm91dGVzXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9FeGVjIC0gc2VlIHJvdXRlLnN0YXJ0XG4gKi9cbmZ1bmN0aW9uIHN0YXJ0KGF1dG9FeGVjKSB7XG4gIGRlYm91bmNlZEVtaXQgPSBkZWJvdW5jZShlbWl0LCAxKTtcbiAgd2luW0FERF9FVkVOVF9MSVNURU5FUl0oUE9QU1RBVEUsIGRlYm91bmNlZEVtaXQpO1xuICB3aW5bQUREX0VWRU5UX0xJU1RFTkVSXShIQVNIQ0hBTkdFLCBkZWJvdW5jZWRFbWl0KTtcbiAgZG9jW0FERF9FVkVOVF9MSVNURU5FUl0oY2xpY2tFdmVudCwgY2xpY2spO1xuICBpZiAoYXV0b0V4ZWMpIHsgZW1pdCh0cnVlKTsgfVxufVxuXG4vKipcbiAqIFJvdXRlciBjbGFzc1xuICovXG5mdW5jdGlvbiBSb3V0ZXIoKSB7XG4gIHRoaXMuJCA9IFtdO1xuICBvYnNlcnZhYmxlKHRoaXMpOyAvLyBtYWtlIGl0IG9ic2VydmFibGVcbiAgY2VudHJhbC5vbignc3RvcCcsIHRoaXMucy5iaW5kKHRoaXMpKTtcbiAgY2VudHJhbC5vbignZW1pdCcsIHRoaXMuZS5iaW5kKHRoaXMpKTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKHBhdGgpIHtcbiAgcmV0dXJuIHBhdGgucmVwbGFjZSgvXlxcL3xcXC8kLywgJycpXG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKHN0cikge1xuICByZXR1cm4gdHlwZW9mIHN0ciA9PSAnc3RyaW5nJ1xufVxuXG4vKipcbiAqIEdldCB0aGUgcGFydCBhZnRlciBkb21haW4gbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IGhyZWYgLSBmdWxscGF0aFxuICogQHJldHVybnMge3N0cmluZ30gcGF0aCBmcm9tIHJvb3RcbiAqL1xuZnVuY3Rpb24gZ2V0UGF0aEZyb21Sb290KGhyZWYpIHtcbiAgcmV0dXJuIChocmVmIHx8IGxvYy5ocmVmKS5yZXBsYWNlKFJFX09SSUdJTiwgJycpXG59XG5cbi8qKlxuICogR2V0IHRoZSBwYXJ0IGFmdGVyIGJhc2VcbiAqIEBwYXJhbSB7c3RyaW5nfSBocmVmIC0gZnVsbHBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IHBhdGggZnJvbSBiYXNlXG4gKi9cbmZ1bmN0aW9uIGdldFBhdGhGcm9tQmFzZShocmVmKSB7XG4gIHJldHVybiBiYXNlWzBdID09PSAnIydcbiAgICA/IChocmVmIHx8IGxvYy5ocmVmIHx8ICcnKS5zcGxpdChiYXNlKVsxXSB8fCAnJ1xuICAgIDogKGxvYyA/IGdldFBhdGhGcm9tUm9vdChocmVmKSA6IGhyZWYgfHwgJycpLnJlcGxhY2UoYmFzZSwgJycpXG59XG5cbmZ1bmN0aW9uIGVtaXQoZm9yY2UpIHtcbiAgLy8gdGhlIHN0YWNrIGlzIG5lZWRlZCBmb3IgcmVkaXJlY3Rpb25zXG4gIHZhciBpc1Jvb3QgPSBlbWl0U3RhY2tMZXZlbCA9PT0gMDtcbiAgaWYgKE1BWF9FTUlUX1NUQUNLX0xFVkVMIDw9IGVtaXRTdGFja0xldmVsKSB7IHJldHVybiB9XG5cbiAgZW1pdFN0YWNrTGV2ZWwrKztcbiAgZW1pdFN0YWNrLnB1c2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhdGggPSBnZXRQYXRoRnJvbUJhc2UoKTtcbiAgICBpZiAoZm9yY2UgfHwgcGF0aCAhPT0gY3VycmVudCkge1xuICAgICAgY2VudHJhbFtUUklHR0VSXSgnZW1pdCcsIHBhdGgpO1xuICAgICAgY3VycmVudCA9IHBhdGg7XG4gICAgfVxuICB9KTtcbiAgaWYgKGlzUm9vdCkge1xuICAgIHZhciBmaXJzdDtcbiAgICB3aGlsZSAoZmlyc3QgPSBlbWl0U3RhY2suc2hpZnQoKSkgeyBmaXJzdCgpOyB9IC8vIHN0YWNrIGluY3Jlc2VzIHdpdGhpbiB0aGlzIGNhbGxcbiAgICBlbWl0U3RhY2tMZXZlbCA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xpY2soZSkge1xuICBpZiAoXG4gICAgZS53aGljaCAhPT0gMSAvLyBub3QgbGVmdCBjbGlja1xuICAgIHx8IGUubWV0YUtleSB8fCBlLmN0cmxLZXkgfHwgZS5zaGlmdEtleSAvLyBvciBtZXRhIGtleXNcbiAgICB8fCBlLmRlZmF1bHRQcmV2ZW50ZWQgLy8gb3IgZGVmYXVsdCBwcmV2ZW50ZWRcbiAgKSB7IHJldHVybiB9XG5cbiAgdmFyIGVsID0gZS50YXJnZXQ7XG4gIHdoaWxlIChlbCAmJiBlbC5ub2RlTmFtZSAhPT0gJ0EnKSB7IGVsID0gZWwucGFyZW50Tm9kZTsgfVxuXG4gIGlmIChcbiAgICAhZWwgfHwgZWwubm9kZU5hbWUgIT09ICdBJyAvLyBub3QgQSB0YWdcbiAgICB8fCBlbFtIQVNfQVRUUklCVVRFXSgnZG93bmxvYWQnKSAvLyBoYXMgZG93bmxvYWQgYXR0clxuICAgIHx8ICFlbFtIQVNfQVRUUklCVVRFXSgnaHJlZicpIC8vIGhhcyBubyBocmVmIGF0dHJcbiAgICB8fCBlbC50YXJnZXQgJiYgZWwudGFyZ2V0ICE9PSAnX3NlbGYnIC8vIGFub3RoZXIgd2luZG93IG9yIGZyYW1lXG4gICAgfHwgZWwuaHJlZi5pbmRleE9mKGxvYy5ocmVmLm1hdGNoKFJFX09SSUdJTilbMF0pID09PSAtMSAvLyBjcm9zcyBvcmlnaW5cbiAgKSB7IHJldHVybiB9XG5cbiAgaWYgKGVsLmhyZWYgIT09IGxvYy5ocmVmXG4gICAgJiYgKFxuICAgICAgZWwuaHJlZi5zcGxpdCgnIycpWzBdID09PSBsb2MuaHJlZi5zcGxpdCgnIycpWzBdIC8vIGludGVybmFsIGp1bXBcbiAgICAgIHx8IGJhc2VbMF0gIT09ICcjJyAmJiBnZXRQYXRoRnJvbVJvb3QoZWwuaHJlZikuaW5kZXhPZihiYXNlKSAhPT0gMCAvLyBvdXRzaWRlIG9mIGJhc2VcbiAgICAgIHx8IGJhc2VbMF0gPT09ICcjJyAmJiBlbC5ocmVmLnNwbGl0KGJhc2UpWzBdICE9PSBsb2MuaHJlZi5zcGxpdChiYXNlKVswXSAvLyBvdXRzaWRlIG9mICNiYXNlXG4gICAgICB8fCAhZ28oZ2V0UGF0aEZyb21CYXNlKGVsLmhyZWYpLCBlbC50aXRsZSB8fCBkb2MudGl0bGUpIC8vIHJvdXRlIG5vdCBmb3VuZFxuICAgICkpIHsgcmV0dXJuIH1cblxuICBlLnByZXZlbnREZWZhdWx0KCk7XG59XG5cbi8qKlxuICogR28gdG8gdGhlIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gZGVzdGluYXRpb24gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHRpdGxlIC0gcGFnZSB0aXRsZVxuICogQHBhcmFtIHtib29sZWFufSBzaG91bGRSZXBsYWNlIC0gdXNlIHJlcGxhY2VTdGF0ZSBvciBwdXNoU3RhdGVcbiAqIEByZXR1cm5zIHtib29sZWFufSAtIHJvdXRlIG5vdCBmb3VuZCBmbGFnXG4gKi9cbmZ1bmN0aW9uIGdvKHBhdGgsIHRpdGxlLCBzaG91bGRSZXBsYWNlKSB7XG4gIC8vIFNlcnZlci1zaWRlIHVzYWdlOiBkaXJlY3RseSBleGVjdXRlIGhhbmRsZXJzIGZvciB0aGUgcGF0aFxuICBpZiAoIWhpc3QpIHsgcmV0dXJuIGNlbnRyYWxbVFJJR0dFUl0oJ2VtaXQnLCBnZXRQYXRoRnJvbUJhc2UocGF0aCkpIH1cblxuICBwYXRoID0gYmFzZSArIG5vcm1hbGl6ZShwYXRoKTtcbiAgdGl0bGUgPSB0aXRsZSB8fCBkb2MudGl0bGU7XG4gIC8vIGJyb3dzZXJzIGlnbm9yZXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIgYHRpdGxlYFxuICBzaG91bGRSZXBsYWNlXG4gICAgPyBoaXN0LnJlcGxhY2VTdGF0ZShudWxsLCB0aXRsZSwgcGF0aClcbiAgICA6IGhpc3QucHVzaFN0YXRlKG51bGwsIHRpdGxlLCBwYXRoKTtcbiAgLy8gc28gd2UgbmVlZCB0byBzZXQgaXQgbWFudWFsbHlcbiAgZG9jLnRpdGxlID0gdGl0bGU7XG4gIHJvdXRlRm91bmQgPSBmYWxzZTtcbiAgZW1pdCgpO1xuICByZXR1cm4gcm91dGVGb3VuZFxufVxuXG4vKipcbiAqIEdvIHRvIHBhdGggb3Igc2V0IGFjdGlvblxuICogYSBzaW5nbGUgc3RyaW5nOiAgICAgICAgICAgICAgICBnbyB0aGVyZVxuICogdHdvIHN0cmluZ3M6ICAgICAgICAgICAgICAgICAgICBnbyB0aGVyZSB3aXRoIHNldHRpbmcgYSB0aXRsZVxuICogdHdvIHN0cmluZ3MgYW5kIGJvb2xlYW46ICAgICAgICByZXBsYWNlIGhpc3Rvcnkgd2l0aCBzZXR0aW5nIGEgdGl0bGVcbiAqIGEgc2luZ2xlIGZ1bmN0aW9uOiAgICAgICAgICAgICAgc2V0IGFuIGFjdGlvbiBvbiB0aGUgZGVmYXVsdCByb3V0ZVxuICogYSBzdHJpbmcvUmVnRXhwIGFuZCBhIGZ1bmN0aW9uOiBzZXQgYW4gYWN0aW9uIG9uIHRoZSByb3V0ZVxuICogQHBhcmFtIHsoc3RyaW5nfGZ1bmN0aW9uKX0gZmlyc3QgLSBwYXRoIC8gYWN0aW9uIC8gZmlsdGVyXG4gKiBAcGFyYW0geyhzdHJpbmd8UmVnRXhwfGZ1bmN0aW9uKX0gc2Vjb25kIC0gdGl0bGUgLyBhY3Rpb25cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gdGhpcmQgLSByZXBsYWNlIGZsYWdcbiAqL1xucHJvdC5tID0gZnVuY3Rpb24oZmlyc3QsIHNlY29uZCwgdGhpcmQpIHtcbiAgaWYgKGlzU3RyaW5nKGZpcnN0KSAmJiAoIXNlY29uZCB8fCBpc1N0cmluZyhzZWNvbmQpKSkgeyBnbyhmaXJzdCwgc2Vjb25kLCB0aGlyZCB8fCBmYWxzZSk7IH1cbiAgZWxzZSBpZiAoc2Vjb25kKSB7IHRoaXMucihmaXJzdCwgc2Vjb25kKTsgfVxuICBlbHNlIHsgdGhpcy5yKCdAJywgZmlyc3QpOyB9XG59O1xuXG4vKipcbiAqIFN0b3Agcm91dGluZ1xuICovXG5wcm90LnMgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5vZmYoJyonKTtcbiAgdGhpcy4kID0gW107XG59O1xuXG4vKipcbiAqIEVtaXRcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIC0gcGF0aFxuICovXG5wcm90LmUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHRoaXMuJC5jb25jYXQoJ0AnKS5zb21lKGZ1bmN0aW9uKGZpbHRlcikge1xuICAgIHZhciBhcmdzID0gKGZpbHRlciA9PT0gJ0AnID8gcGFyc2VyIDogc2Vjb25kUGFyc2VyKShub3JtYWxpemUocGF0aCksIG5vcm1hbGl6ZShmaWx0ZXIpKTtcbiAgICBpZiAodHlwZW9mIGFyZ3MgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXNbVFJJR0dFUl0uYXBwbHkobnVsbCwgW2ZpbHRlcl0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIHJldHVybiByb3V0ZUZvdW5kID0gdHJ1ZSAvLyBleGl0IGZyb20gbG9vcFxuICAgIH1cbiAgfSwgdGhpcyk7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVyIHJvdXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gZmlsdGVyIC0gZmlsdGVyIGZvciBtYXRjaGluZyB0byB1cmxcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGFjdGlvbiAtIGFjdGlvbiB0byByZWdpc3RlclxuICovXG5wcm90LnIgPSBmdW5jdGlvbihmaWx0ZXIsIGFjdGlvbikge1xuICBpZiAoZmlsdGVyICE9PSAnQCcpIHtcbiAgICBmaWx0ZXIgPSAnLycgKyBub3JtYWxpemUoZmlsdGVyKTtcbiAgICB0aGlzLiQucHVzaChmaWx0ZXIpO1xuICB9XG4gIHRoaXMub24oZmlsdGVyLCBhY3Rpb24pO1xufTtcblxudmFyIG1haW5Sb3V0ZXIgPSBuZXcgUm91dGVyKCk7XG52YXIgcm91dGUgPSBtYWluUm91dGVyLm0uYmluZChtYWluUm91dGVyKTtcblxuLyoqXG4gKiBDcmVhdGUgYSBzdWIgcm91dGVyXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IHRoZSBtZXRob2Qgb2YgYSBuZXcgUm91dGVyIG9iamVjdFxuICovXG5yb3V0ZS5jcmVhdGUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIG5ld1N1YlJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcbiAgLy8gYXNzaWduIHN1Yi1yb3V0ZXIncyBtYWluIG1ldGhvZFxuICB2YXIgcm91dGVyID0gbmV3U3ViUm91dGVyLm0uYmluZChuZXdTdWJSb3V0ZXIpO1xuICAvLyBzdG9wIG9ubHkgdGhpcyBzdWItcm91dGVyXG4gIHJvdXRlci5zdG9wID0gbmV3U3ViUm91dGVyLnMuYmluZChuZXdTdWJSb3V0ZXIpO1xuICByZXR1cm4gcm91dGVyXG59O1xuXG4vKipcbiAqIFNldCB0aGUgYmFzZSBvZiB1cmxcbiAqIEBwYXJhbSB7KHN0cnxSZWdFeHApfSBhcmcgLSBhIG5ldyBiYXNlIG9yICcjJyBvciAnIyEnXG4gKi9cbnJvdXRlLmJhc2UgPSBmdW5jdGlvbihhcmcpIHtcbiAgYmFzZSA9IGFyZyB8fCAnIyc7XG4gIGN1cnJlbnQgPSBnZXRQYXRoRnJvbUJhc2UoKTsgLy8gcmVjYWxjdWxhdGUgY3VycmVudCBwYXRoXG59O1xuXG4vKiogRXhlYyByb3V0aW5nIHJpZ2h0IG5vdyAqKi9cbnJvdXRlLmV4ZWMgPSBmdW5jdGlvbigpIHtcbiAgZW1pdCh0cnVlKTtcbn07XG5cbi8qKlxuICogUmVwbGFjZSB0aGUgZGVmYXVsdCByb3V0ZXIgdG8geW91cnNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuIC0geW91ciBwYXJzZXIgZnVuY3Rpb25cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZuMiAtIHlvdXIgc2Vjb25kUGFyc2VyIGZ1bmN0aW9uXG4gKi9cbnJvdXRlLnBhcnNlciA9IGZ1bmN0aW9uKGZuLCBmbjIpIHtcbiAgaWYgKCFmbiAmJiAhZm4yKSB7XG4gICAgLy8gcmVzZXQgcGFyc2VyIGZvciB0ZXN0aW5nLi4uXG4gICAgcGFyc2VyID0gREVGQVVMVF9QQVJTRVI7XG4gICAgc2Vjb25kUGFyc2VyID0gREVGQVVMVF9TRUNPTkRfUEFSU0VSO1xuICB9XG4gIGlmIChmbikgeyBwYXJzZXIgPSBmbjsgfVxuICBpZiAoZm4yKSB7IHNlY29uZFBhcnNlciA9IGZuMjsgfVxufTtcblxuLyoqXG4gKiBIZWxwZXIgZnVuY3Rpb24gdG8gZ2V0IHVybCBxdWVyeSBhcyBhbiBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IHBhcnNlZCBxdWVyeVxuICovXG5yb3V0ZS5xdWVyeSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgcSA9IHt9O1xuICB2YXIgaHJlZiA9IGxvYy5ocmVmIHx8IGN1cnJlbnQ7XG4gIGhyZWYucmVwbGFjZSgvWz8mXSguKz8pPShbXiZdKikvZywgZnVuY3Rpb24oXywgaywgdikgeyBxW2tdID0gdjsgfSk7XG4gIHJldHVybiBxXG59O1xuXG4vKiogU3RvcCByb3V0aW5nICoqL1xucm91dGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHN0YXJ0ZWQpIHtcbiAgICBpZiAod2luKSB7XG4gICAgICB3aW5bUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXShQT1BTVEFURSwgZGVib3VuY2VkRW1pdCk7XG4gICAgICB3aW5bUkVNT1ZFX0VWRU5UX0xJU1RFTkVSXShIQVNIQ0hBTkdFLCBkZWJvdW5jZWRFbWl0KTtcbiAgICAgIGRvY1tSRU1PVkVfRVZFTlRfTElTVEVORVJdKGNsaWNrRXZlbnQsIGNsaWNrKTtcbiAgICB9XG4gICAgY2VudHJhbFtUUklHR0VSXSgnc3RvcCcpO1xuICAgIHN0YXJ0ZWQgPSBmYWxzZTtcbiAgfVxufTtcblxuLyoqXG4gKiBTdGFydCByb3V0aW5nXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGF1dG9FeGVjIC0gYXV0b21hdGljYWxseSBleGVjIGFmdGVyIHN0YXJ0aW5nIGlmIHRydWVcbiAqL1xucm91dGUuc3RhcnQgPSBmdW5jdGlvbiAoYXV0b0V4ZWMpIHtcbiAgaWYgKCFzdGFydGVkKSB7XG4gICAgaWYgKHdpbikge1xuICAgICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHsgc3RhcnQoYXV0b0V4ZWMpOyB9XG4gICAgICAvLyB0aGUgdGltZW91dCBpcyBuZWVkZWQgdG8gc29sdmVcbiAgICAgIC8vIGEgd2VpcmQgc2FmYXJpIGJ1ZyBodHRwczovL2dpdGh1Yi5jb20vcmlvdC9yb3V0ZS9pc3N1ZXMvMzNcbiAgICAgIGVsc2UgeyB3aW5bQUREX0VWRU5UX0xJU1RFTkVSXSgnbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBzdGFydChhdXRvRXhlYyk7IH0sIDEpO1xuICAgICAgfSk7IH1cbiAgICB9XG4gICAgc3RhcnRlZCA9IHRydWU7XG4gIH1cbn07XG5cbi8qKiBQcmVwYXJlIHRoZSByb3V0ZXIgKiovXG5yb3V0ZS5iYXNlKCk7XG5yb3V0ZS5wYXJzZXIoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb3V0ZTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yaW90LXJvdXRlL2Rpc3QvY2pzLnJvdXRlLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiOyhmdW5jdGlvbih3aW5kb3csIHVuZGVmaW5lZCkge3ZhciBvYnNlcnZhYmxlID0gZnVuY3Rpb24oZWwpIHtcblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBvcmlnaW5hbCBvYmplY3Qgb3IgY3JlYXRlIGEgbmV3IGVtcHR5IG9uZVxuICAgKiBAdHlwZSB7IE9iamVjdCB9XG4gICAqL1xuXG4gIGVsID0gZWwgfHwge31cblxuICAvKipcbiAgICogUHJpdmF0ZSB2YXJpYWJsZXNcbiAgICovXG4gIHZhciBjYWxsYmFja3MgPSB7fSxcbiAgICBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZVxuXG4gIC8qKlxuICAgKiBQdWJsaWMgQXBpXG4gICAqL1xuXG4gIC8vIGV4dGVuZCB0aGUgZWwgb2JqZWN0IGFkZGluZyB0aGUgb2JzZXJ2YWJsZSBtZXRob2RzXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGVsLCB7XG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIHRoZSBnaXZlbiBgZXZlbnRgIGFuZHNcbiAgICAgKiBleGVjdXRlIHRoZSBgY2FsbGJhY2tgIGVhY2ggdGltZSBhbiBldmVudCBpcyB0cmlnZ2VyZWQuXG4gICAgICogQHBhcmFtICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9uOiB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24oZXZlbnQsIGZuKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAoY2FsbGJhY2tzW2V2ZW50XSA9IGNhbGxiYWNrc1tldmVudF0gfHwgW10pLnB1c2goZm4pXG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBnaXZlbiBgZXZlbnRgIGxpc3RlbmVyc1xuICAgICAqIEBwYXJhbSAgIHsgU3RyaW5nIH0gZXZlbnQgLSBldmVudCBpZFxuICAgICAqIEBwYXJhbSAgIHsgRnVuY3Rpb24gfSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIG9mZjoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKGV2ZW50LCBmbikge1xuICAgICAgICBpZiAoZXZlbnQgPT0gJyonICYmICFmbikgY2FsbGJhY2tzID0ge31cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGZuKSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gY2FsbGJhY2tzW2V2ZW50XVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGNiOyBjYiA9IGFyciAmJiBhcnJbaV07ICsraSkge1xuICAgICAgICAgICAgICBpZiAoY2IgPT0gZm4pIGFyci5zcGxpY2UoaS0tLCAxKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBkZWxldGUgY2FsbGJhY2tzW2V2ZW50XVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbFxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gdG8gdGhlIGdpdmVuIGBldmVudGAgYW5kXG4gICAgICogZXhlY3V0ZSB0aGUgYGNhbGxiYWNrYCBhdCBtb3N0IG9uY2VcbiAgICAgKiBAcGFyYW0gICB7IFN0cmluZyB9IGV2ZW50IC0gZXZlbnQgaWRcbiAgICAgKiBAcGFyYW0gICB7IEZ1bmN0aW9uIH0gZm4gLSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAqIEByZXR1cm5zIHsgT2JqZWN0IH0gZWxcbiAgICAgKi9cbiAgICBvbmU6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCwgZm4pIHtcbiAgICAgICAgZnVuY3Rpb24gb24oKSB7XG4gICAgICAgICAgZWwub2ZmKGV2ZW50LCBvbilcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbC5vbihldmVudCwgb24pXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEV4ZWN1dGUgYWxsIGNhbGxiYWNrIGZ1bmN0aW9ucyB0aGF0IGxpc3RlbiB0b1xuICAgICAqIHRoZSBnaXZlbiBgZXZlbnRgXG4gICAgICogQHBhcmFtICAgeyBTdHJpbmcgfSBldmVudCAtIGV2ZW50IGlkXG4gICAgICogQHJldHVybnMgeyBPYmplY3QgfSBlbFxuICAgICAqL1xuICAgIHRyaWdnZXI6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIGdldHRpbmcgdGhlIGFyZ3VtZW50c1xuICAgICAgICB2YXIgYXJnbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDEsXG4gICAgICAgICAgYXJncyA9IG5ldyBBcnJheShhcmdsZW4pLFxuICAgICAgICAgIGZucyxcbiAgICAgICAgICBmbixcbiAgICAgICAgICBpXG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ2xlbjsgaSsrKSB7XG4gICAgICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpICsgMV0gLy8gc2tpcCBmaXJzdCBhcmd1bWVudFxuICAgICAgICB9XG5cbiAgICAgICAgZm5zID0gc2xpY2UuY2FsbChjYWxsYmFja3NbZXZlbnRdIHx8IFtdLCAwKVxuXG4gICAgICAgIGZvciAoaSA9IDA7IGZuID0gZm5zW2ldOyArK2kpIHtcbiAgICAgICAgICBmbi5hcHBseShlbCwgYXJncylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYWxsYmFja3NbJyonXSAmJiBldmVudCAhPSAnKicpXG4gICAgICAgICAgZWwudHJpZ2dlci5hcHBseShlbCwgWycqJywgZXZlbnRdLmNvbmNhdChhcmdzKSlcblxuICAgICAgICByZXR1cm4gZWxcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGVsXG5cbn1cbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgLy8gc3VwcG9ydCBDb21tb25KUywgQU1EICYgYnJvd3NlclxuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuICAgIG1vZHVsZS5leHBvcnRzID0gb2JzZXJ2YWJsZVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gb2JzZXJ2YWJsZSB9KVxuICBlbHNlXG4gICAgd2luZG93Lm9ic2VydmFibGUgPSBvYnNlcnZhYmxlXG5cbn0pKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB1bmRlZmluZWQpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vfi9yaW90LW9ic2VydmFibGUvZGlzdC9vYnNlcnZhYmxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXG5yaW90LnRhZzIoJ25hdmJhcicsICc8bmF2IGNsYXNzPVwibmF2YmFyXCI+IDx1bCBjbGFzcz1cIm5hdmJhci1uYXYge29wZW46IGlzT3Blbn1cIj4gPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1hbmNob3JcIiBocmVmPVwiIy9zZWFyY2hcIj4gPGRpdiBjbGFzcz1cImljb24gaW9uLWFuZHJvaWQtc2VhcmNoXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPuaknOe0ojwvZGl2PjwvYT48L2xpPiA8bGkgY2xhc3M9XCJuYXYtaXRlbVwiPjxhIGNsYXNzPVwibmF2LWFuY2hvclwiIGhyZWY9XCIjL3NjaGVkdWxlXCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1pb3MtY2FsZW5kYXItb3V0bGluZVwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7mmYLplpPlibI8L2Rpdj48L2E+PC9saT4gPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1hbmNob3JcIiBocmVmPVwiIy9pbmZvXCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1pb3MtaW5mb3JtYXRpb24tb3V0bGluZVwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7jgYrjgZfjgonjgZs8L2Rpdj48L2E+PC9saT4gPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48c3BhbiBjbGFzcz1cIm5hdi1hbmNob3JcIj4gPGRpdiBjbGFzcz1cImljb24gaW9uLWlvcy1ncmlkLXZpZXctb3V0bGluZVwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7mupblgpnkuK08L2Rpdj48L3NwYW4+PC9saT4gPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48c3BhbiBjbGFzcz1cIm5hdi1hbmNob3JcIj4gPGRpdiBjbGFzcz1cImljb24gaW9uLWlvcy1ncmlkLXZpZXctb3V0bGluZVwiPjwvZGl2PiA8ZGl2IGNsYXNzPVwibGFiZWxcIj7mupblgpnkuK08L2Rpdj48L3NwYW4+PC9saT4gPGxpIGNsYXNzPVwibmF2LWl0ZW1cIj48YSBjbGFzcz1cIm5hdi1hbmNob3JcIiBocmVmPVwiLy90d2l0dGVyLmNvbS91c3dhbjJfXCIgdGFyZ2V0PVwiX2JsYW5rXCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1zb2NpYWwtdHdpdHRlci1vdXRsaW5lXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPlR3aXR0ZXI8L2Rpdj48L2E+PC9saT4gPC91bD4gPGRpdiBjbGFzcz1cIm5hdi1sYXJnZVwiPjxhIGNsYXNzPVwibmF2LWxhcmdlLXdyYXBwZXJcIiBocmVmPVwiIy9tZW51XCI+IDxkaXYgY2xhc3M9XCJpY29uIGlvbi1jb2ZmZWVcIj48L2Rpdj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+54yu56uL6KGoPC9kaXY+PC9hPjwvZGl2PiA8ZGl2IGNsYXNzPVwibmF2LW1vcmVcIj48YSBjbGFzcz1cIm5hdi1hbmNob3Ige29wZW46IGlzT3Blbn1cIiBocmVmPVwiI1wiIG9uY2xpY2s9XCJ7dG9nZ2xlTW9yZU1lbnV9XCI+IDxkaXYgY2xhc3M9XCJuYXZpY29uIGlvbi1uYXZpY29uXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJjbG9zZXIgaW9uLWFuZHJvaWQtY2xvc2VcIj48L2Rpdj48L2E+PC9kaXY+IDwvbmF2PiA8c2lkZS1tZW51Pjwvc2lkZS1tZW51PicsICduYXZiYXIgLm5hdmJhcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyeyBwb3NpdGlvbjogZml4ZWQ7IGJvdHRvbTogMDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMDsgcGFkZGluZzogMCA2MHB4IDAgMTEwcHg7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IHotaW5kZXg6IDEwMDsgfSBuYXZiYXIgLm5hdmJhciAubmF2YmFyLW5hdixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXZiYXItbmF2eyBoZWlnaHQ6IDExMHB4OyBtYXJnaW46IDAgLTYwcHggMCAtNTVweDsgcGFkZGluZzogMCA2MHB4IDAgNTVweDsgYmFja2dyb3VuZDogI2ZmZjsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01NXB4KTsgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZTsgfSBuYXZiYXIgLm5hdmJhciAubmF2YmFyLW5hdi5vcGVuLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYub3BlbnsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMTBweCk7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVteyBmbG9hdDogbGVmdDsgd2lkdGg6IDMzLjMzMyU7IGhlaWdodDogNTVweDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IG5hdmJhciAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvcnsgZGlzcGxheTogYmxvY2s7IHBhZGRpbmc6IDVweCAwOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGNvbG9yOiAjMjIyOyB9IG5hdmJhciAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvciAuaWNvbixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXZiYXItbmF2IC5uYXYtaXRlbSAubmF2LWFuY2hvciAuaWNvbnsgbGluZS1oZWlnaHQ6IDMwcHg7IGZvbnQtc2l6ZTogMjVweDsgfSBuYXZiYXIgLm5hdmJhciAubmF2YmFyLW5hdiAubmF2LWl0ZW0gLm5hdi1hbmNob3IgLmxhYmVsLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdmJhci1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yIC5sYWJlbHsgbGluZS1oZWlnaHQ6IDE1cHg7IGZvbnQtc2l6ZTogMTBweDsgfSBuYXZiYXIgLm5hdmJhciAubmF2LWxhcmdlLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1sYXJnZXsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDA7IGxlZnQ6IDA7IHdpZHRoOiAxMTBweDsgaGVpZ2h0OiAxMTBweDsgYmFja2dyb3VuZDogI2ZmZjsgYm9yZGVyLXJhZGl1czogMTAwJTsgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMDsgfSBuYXZiYXIgLm5hdmJhciAubmF2LWxhcmdlIC5uYXYtbGFyZ2Utd3JhcHBlcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyeyBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogOTZweDsgaGVpZ2h0OiA5NnB4OyBtYXJnaW46IDRweDsgYm9yZGVyLXJhZGl1czogMTAwJTsgYm9yZGVyOiAzcHggc29saWQgIzIyMjsgY29sb3I6ICMyMjI7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1sYXJnZSAubmF2LWxhcmdlLXdyYXBwZXIgLmljb24sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LWxhcmdlIC5uYXYtbGFyZ2Utd3JhcHBlciAuaWNvbnsgZm9udC1zaXplOiA0MHB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiA4MHB4OyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyIC5sYWJlbCxbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbGFyZ2UgLm5hdi1sYXJnZS13cmFwcGVyIC5sYWJlbHsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDVweDsgbGVmdDogMDsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzVweDsgdGV4dC1hbGlnbjogY2VudGVyOyBmb250LXNpemU6IDEycHg7IGxpbmUtaGVpZ2h0OiAzNXB4OyB9IG5hdmJhciAubmF2YmFyIC5uYXYtbW9yZSxbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbW9yZXsgcG9zaXRpb246IGFic29sdXRlOyBib3R0b206IDA7IHJpZ2h0OiAwOyBvdmVyZmxvdzogaGlkZGVuOyB3aWR0aDogNjBweDsgaGVpZ2h0OiA1NXB4OyBmb250LXNpemU6IDM2cHg7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yeyBwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGJsb2NrOyBjb2xvcjogIzIyMjsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgPiBkaXYsW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgPiBkaXZ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDYwcHg7IGhlaWdodDogNTVweDsgdGV4dC1hbGlnbjogY2VudGVyOyBsaW5lLWhlaWdodDogNTVweDsgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgLm5hdmljb24sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgLm5hdmljb257IG9wYWNpdHk6IDE7IHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3IgLmNsb3NlcixbZGF0YS1pcz1cIm5hdmJhclwiXSAubmF2YmFyIC5uYXYtbW9yZSAubmF2LWFuY2hvciAuY2xvc2VyeyBvcGFjaXR5OiAwOyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMTJweCk7IH0gbmF2YmFyIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yLm9wZW4gLm5hdmljb24sW2RhdGEtaXM9XCJuYXZiYXJcIl0gLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3Iub3BlbiAubmF2aWNvbnsgb3BhY2l0eTogMDsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMnB4KTsgfSBuYXZiYXIgLm5hdmJhciAubmF2LW1vcmUgLm5hdi1hbmNob3Iub3BlbiAuY2xvc2VyLFtkYXRhLWlzPVwibmF2YmFyXCJdIC5uYXZiYXIgLm5hdi1tb3JlIC5uYXYtYW5jaG9yLm9wZW4gLmNsb3Nlcnsgb3BhY2l0eTogMTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApOyB9JywgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbnZhciBfdGhpcyA9IHRoaXM7XG5cbmNvbnN0IHUgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscycpO1xuY29uc3Qgb2JzID0gdS5vYnNlcnZhYmxlKCk7XG5cbnRoaXMuaXNPcGVuID0gZmFsc2U7XG50aGlzLnRvZ2dsZU1vcmVNZW51ID0gZSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIF90aGlzLmlzT3BlbiA9ICFfdGhpcy5pc09wZW47XG4gICAgb2JzLnRyaWdnZXIoJ3NpZGUtbWVudTp0b2dnbGUnKTtcbn07XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9jb21tb24vbmF2YmFyLnRhZyIsImltcG9ydCBvYnNlcnZhYmxlIGZyb20gJ3Jpb3Qtb2JzZXJ2YWJsZSc7XHJcblxyXG5jb25zdCBvYnMgPSBvYnNlcnZhYmxlKCk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgIG9ic2VydmFibGU6ICgpID0+IHtcclxuICAgICAgICByZXR1cm4gb2JzO1xyXG4gICAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdXRpbHMuanMiLCJpbXBvcnQgcm91dGUgZnJvbSAncmlvdC1yb3V0ZSc7XHJcblxyXG5yb3V0ZSgnLycsICgpID0+IHtcclxuICAgIGxvY2F0aW9uLmhhc2ggPSAnIy9tZW51JztcclxufSk7XHJcblxyXG5yb3V0ZSgnL21lbnUnLCAoKSA9PiB7XHJcbiAgICByZXF1aXJlKCcuLi90YWdzL3B1YmxpYy9tZW51Jyk7XHJcbiAgICByZXF1aXJlKCcuLi90YWdzL3B1YmxpYy9kYWlseS1tZW51Jyk7XHJcbiAgICByaW90Lm1vdW50KCdyb3V0ZXInLCAnbWVudScpO1xyXG59KTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgc3RhcnQ6ICgpID0+IHtcclxuICAgICAgICByb3V0ZS5zdGFydCh0cnVlKTtcclxuICAgIH1cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9zY3JpcHRzL3B1YmxpYy9yb3V0ZXIuanMiLCJcbnJpb3QudGFnMignbWVudScsICc8ZGFpbHktbWVudT48L2RhaWx5LW1lbnU+JywgJycsICcnLCBmdW5jdGlvbihvcHRzKSB7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9tZW51LnRhZyIsIlxucmlvdC50YWcyKCdzaWRlLW1lbnUnLCAnPGRpdiBjbGFzcz1cInNpZGUtbWVudSB7b3BlbjogaXNPcGVufVwiPiA8aGVhZGVyPiA8ZGl2IGNsYXNzPVwiYnJhbmRcIj7jg4fjgrjjgr/jg6vniYgg55m96bOl5a+u54yu56uL6KGoPC9kaXY+IDwvaGVhZGVyPiA8bWFpbj4gPGRpdiBjbGFzcz1cInByZWZlcmVuY2VzXCI+IDxoMz7jg5XjgqPjg7zjg4njg5Djg4Pjgq88L2gzPiA8cD7jgZTmjIfmkZjjg7vjgZTmhI/opovjgarjganjgYrmsJfou73jgavjgYrpgIHjgorjgY/jgaDjgZXjgYTvvIE8L3A+IDxmb3JtIGNsYXNzPVwiZmVlZGJhY2stZm9ybVwiIG9uc3VibWl0PVwicmV0dXJuIGZhbHNlXCI+IDx0ZXh0YXJlYSBwbGFjZWhvbGRlcj1cIuWGheWuueOBr+WFrOmWi+OBleOCjOOBvuOBmeOAguWAi+S6uuaDheWgseOBruiomOi8ieOBr+OBlOmBoOaFruS4i+OBleOBhOOAglwiPjwvdGV4dGFyZWE+IDwvZm9ybT4gPGgzPuioreWumjwvaDM+IDxkbD4gPGR0PuacgOWIneOBq+ihqOekuuOBmeOCi+ODmuODvOOCuDwvZHQ+IDxkZD4gPGRpdiBjbGFzcz1cInNlbGVjdC1mdWxsXCI+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPntmaXJzdFZhbHVlIHx8IFxcJ+S7iuaciOOBrueMrueri1xcJ308L2Rpdj4gPHNlbGVjdCBjbGFzcz1cImlucHV0XCIgb25jaGFuZ2U9XCJ7dXBkYXRlRmlyc3RWaWV3fVwiPiA8b3B0aW9uIHZhbHVlPVwiIy9tZW51XCI+5LuK5pel44GL44KJ44Gu54yu56uLPC9vcHRpb24+IDxvcHRpb24gdmFsdWU9XCJcIj7mmYLplpPlibI8L29wdGlvbj4gPG9wdGlvbiB2YWx1ZT1cIlwiPuOBiuOBl+OCieOBmzwvb3B0aW9uPiA8L3NlbGVjdD4gPC9kaXY+IDwvZGQ+IDxkdD7jg4fjg5Xjgqnjg6vjg4jjga7jgq/jg6njgrkgPGRpdiBjbGFzcz1cInNlbGVjdFwiPiA8ZGl2IGNsYXNzPVwibGFiZWxcIj48L2Rpdj4gPC9kaXY+IDwvZHQ+IDwvZGw+IDwvZGl2PiA8L21haW4+IDwvZGl2PicsICdzaWRlLW1lbnUgLnNpZGUtbWVudSxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51eyBwb3NpdGlvbjogZml4ZWQ7IHRvcDogMDsgcmlnaHQ6IC0yNDBweDsgYm90dG9tOiA1NXB4OyBvdmVyZmxvdy15OiBhdXRvOyB3aWR0aDogMjQwcHg7IHBhZGRpbmctYm90dG9tOiA1NXB4OyBiYWNrZ3JvdW5kOiAjZmZmOyBib3gtc2l6aW5nOiBib3JkZXItYm94OyB0cmFuc2l0aW9uOiByaWdodCAwLjNzIGVhc2U7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUub3BlbixbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51Lm9wZW57IHJpZ2h0OiAwOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IGhlYWRlcixbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IGhlYWRlcnsgcG9zaXRpb246IHJlbGF0aXZlOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMjBweDsgYmFja2dyb3VuZDogI2FkMTUxNDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBoZWFkZXIgLmJyYW5kLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgaGVhZGVyIC5icmFuZHsgaGVpZ2h0OiAxMjBweDsgY29sb3I6ICNmZmY7IHRleHQtYWxpZ246IGNlbnRlcjsgbGluZS1oZWlnaHQ6IDEyMHB4OyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IGhlYWRlciAudmVyc2lvbixbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IGhlYWRlciAudmVyc2lvbnsgcG9zaXRpb246IGFic29sdXRlOyB0b3A6IDA7IHJpZ2h0OiAwOyBtYXJnaW46IDVweCA4cHg7IGNvbG9yOiByZ2JhKDI1NSwyNTUsMjU1LDAuNCk7IGZvbnQtc2l6ZTogMTBweDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbnsgYmFja2dyb3VuZDogI2ZmZjsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5tZW51LW5hdixbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLm1lbnUtbmF2eyBwYWRkaW5nOiAyNXB4IDA7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAubWVudS1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAubWVudS1uYXYgLm5hdi1pdGVtIC5uYXYtYW5jaG9yeyBkaXNwbGF5OiBibG9jazsgaGVpZ2h0OiA1MHB4OyBwYWRkaW5nOiAwIDIwcHg7IGZvbnQtc2l6ZTogMTVweDsgbGluZS1oZWlnaHQ6IDUwcHg7IGNvbG9yOiAjNDQ0YTVhOyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlc3sgbWFyZ2luOiAwIDE1cHggMDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBoMyxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGgzeyBjb2xvcjogIzQ0NDsgZm9udC1zaXplOiAxNnB4OyBmb250LXdlaWdodDogYm9sZDsgfSBzaWRlLW1lbnUgLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkdCxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGR0eyBmb250LXNpemU6IDE0cHg7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZGQgLnNlbGVjdC1mdWxsLFtkYXRhLWlzPVwic2lkZS1tZW51XCJdIC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZGQgLnNlbGVjdC1mdWxseyBwb3NpdGlvbjogcmVsYXRpdmU7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDM1cHg7IH0gc2lkZS1tZW51IC5zaWRlLW1lbnUgbWFpbiAucHJlZmVyZW5jZXMgZGwgZGQgLnNlbGVjdC1mdWxsIC5sYWJlbCxbZGF0YS1pcz1cInNpZGUtbWVudVwiXSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGRkIC5zZWxlY3QtZnVsbCAubGFiZWx7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgd2lkdGg6IDEwMCU7IGhlaWdodDogMzVweDsgYmFja2dyb3VuZDogI2ZmZjsgYm94LXNpemluZzogYm9yZGVyLWJveDsgYm9yZGVyOiAxcHggc29saWQgI2NjYzsgYm9yZGVyLXJhZGl1czogNXB4OyBsaW5lLWhlaWdodDogMzVweDsgZm9udC1zaXplOiAxMnB4OyB0ZXh0LWFsaWduOiBjZW50ZXI7IHotaW5kZXg6IDE7IHBvaW50ZXItZXZlbnRzOiBub25lOyB9IHNpZGUtbWVudSAuc2lkZS1tZW51IG1haW4gLnByZWZlcmVuY2VzIGRsIGRkIC5zZWxlY3QtZnVsbCAuaW5wdXQsW2RhdGEtaXM9XCJzaWRlLW1lbnVcIl0gLnNpZGUtbWVudSBtYWluIC5wcmVmZXJlbmNlcyBkbCBkZCAuc2VsZWN0LWZ1bGwgLmlucHV0eyBwb3NpdGlvbjogYWJzb2x1dGU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAzNXB4OyB9JywgJycsIGZ1bmN0aW9uKG9wdHMpIHtcbnZhciBfdGhpcyA9IHRoaXM7XG5cbmNvbnN0IHUgPSByZXF1aXJlKCcuLi8uLi8uLi91dGlscycpO1xuXG5jb25zdCBvYnMgPSB1Lm9ic2VydmFibGUoKTtcblxudGhpcy51cGRhdGVGaXJzdFZpZXcgPSBlID0+IHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgX3RoaXMuZmlyc3RWYWx1ZSA9IGUudGFyZ2V0LnNlbGVjdGVkT3B0aW9uc1swXS50ZXh0O1xufTtcblxudGhpcy5pc09wZW4gPSBmYWxzZTtcblxub2JzLm9uKCdzaWRlLW1lbnU6dG9nZ2xlJywgKCkgPT4ge1xuICAgIF90aGlzLmlzT3BlbiA9ICFfdGhpcy5pc09wZW47XG4gICAgX3RoaXMudXBkYXRlKCk7XG59KTtcblxub2JzLm9uKCdzaWRlLW1lbnU6b3BlbicsICgpID0+IHtcbiAgICBfdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIF90aGlzLnVwZGF0ZSgpO1xufSk7XG5cbm9icy5vbignc2lkZS1tZW51OmNsb3NlJywgKCkgPT4ge1xuICAgIF90aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgIF90aGlzLnVwZGF0ZSgpO1xufSk7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvc2NyaXB0cy90YWdzL3B1YmxpYy9jb21tb24vc2lkZS1tZW51LnRhZyIsIlxucmlvdC50YWcyKCdkYWlseS1tZW51JywgJzxkaXYgY2xhc3M9XCJkYWlseS1tZW51XCI+IDxkaXYgY2xhc3M9XCJoZWFkZXJcIj7ku4rml6Xjga7njK7nq4s8L2Rpdj4gPGRpdiBjbGFzcz1cIm1haW5cIj4gPGRpdiBjbGFzcz1cIm1lbnUtaXRlbSB7b3BlbjogaXNPcGVuID09IFxcJ2JyZWFrZmFzdFxcJ31cIiBpZD1cImRhaWx5TWVudS1icmVha2Zhc3RcIiBvbmNsaWNrPVwie29wZW4oXFwnYnJlYWtmYXN0XFwnKX1cIj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+5pydPC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LWJvZHlcIj4gPGRpdiBjbGFzcz1cIm1lbnUtbWFpblwiPnt0b2RheS5icmVha2Zhc3QubWFpbn08L2Rpdj4gPGRpdiBjbGFzcz1cIm1lbnUtc2lkZVwiPiA8dWw+IDxsaSBlYWNoPVwie2l0ZW0gaW4gdG9kYXkuYnJlYWtmYXN0LnNpZGV9XCI+e2l0ZW19PC9saT4gPC91bD4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cIm1lbnUtaXRlbSB7b3BlbjogaXNPcGVuID09IFxcJ2x1bmNoXFwnfVwiIGlkPVwiZGFpbHlNZW51LWx1bmNoXCIgb25jbGljaz1cIntvcGVuKFxcJ2x1bmNoXFwnKX1cIj4gPGRpdiBjbGFzcz1cImxhYmVsXCI+5pi8PC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LWJvZHlcIj4gPGRpdiBjbGFzcz1cIm1lbnUtbWFpblwiPnt0b2RheS5sdW5jaC5tYWlufTwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudS1zaWRlXCI+IDx1bD4gPGxpIGVhY2g9XCJ7aXRlbSBpbiB0b2RheS5sdW5jaC5zaWRlfVwiPntpdGVtfTwvbGk+IDwvdWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LWl0ZW0ge29wZW46IGlzT3BlbiA9PSBcXCdkaW5uZXJcXCd9XCIgaWQ9XCJkYWlseU1lbnUtZGlubmVyXCIgb25jbGljaz1cIntvcGVuKFxcJ2Rpbm5lclxcJyl9XCI+IDxkaXYgY2xhc3M9XCJsYWJlbFwiPuWknDwvZGl2PiA8ZGl2IGNsYXNzPVwibWVudS1ib2R5XCI+IDxkaXYgY2xhc3M9XCJtZW51LW1haW5cIj57dG9kYXkuZGlubmVyLm1haW59PC9kaXY+IDxkaXYgY2xhc3M9XCJtZW51LXNpZGVcIj4gPHVsPiA8bGkgZWFjaD1cIntpdGVtIGluIHRvZGF5LmRpbm5lci5zaWRlfVwiPntpdGVtfTwvbGk+IDwvdWw+IDwvZGl2PiA8L2Rpdj4gPC9kaXY+IDwvZGl2PiA8L2Rpdj4nLCAnZGFpbHktbWVudSAuZGFpbHktbWVudSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnV7IG1hcmdpbjogMTBweCA1JTsgYmFja2dyb3VuZDogcmdiYSgyNTUsMjU1LDI1NSwwLjM1KTsgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLDAsMCwwLjE0KSwgMCAzcHggMXB4IC0ycHggcmdiYSgwLDAsMCwwLjIpLCAwIDFweCA1cHggMCByZ2JhKDAsMCwwLDAuMTIpOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLmhlYWRlcixbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLmhlYWRlcnsgd2lkdGg6IDEwMCU7IGhlaWdodDogNDBweDsgY29sb3I6IHJnYmEoNTEsNTEsNTEsMC44KTsgZm9udC1zaXplOiAxNHB4OyBsaW5lLWhlaWdodDogNDBweDsgdGV4dC1hbGlnbjogY2VudGVyOyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbXsgZGlzcGxheTogZmxleDsgYWxpZ24tY29udGVudDogY2VudGVyOyBwYWRkaW5nOiA4cHggMjBweDsgdHJhbnNpdGlvbjogYWxsIDAuNnMgZWFzZTsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0gLmxhYmVsLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5sYWJlbHsgd2lkdGg6IDIwcHg7IGhlaWdodDogMjBweDsgZm9udC1zaXplOiAxMXB4OyBib3JkZXI6IDFweCBzb2xpZCAjMzMzOyBib3JkZXItcmFkaXVzOiAxMDAlOyB0ZXh0LWFsaWduOiBjZW50ZXI7IGxpbmUtaGVpZ2h0OiAyMHB4OyB9IGRhaWx5LW1lbnUgLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5LFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHl7IGZsZXg6IDE7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtIC5tZW51LWJvZHkgLm1lbnUtc2lkZSxbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbSAubWVudS1ib2R5IC5tZW51LXNpZGV7IG92ZXJmbG93OiBoaWRkZW47IGhlaWdodDogMDsgdHJhbnNpdGlvbjogaGVpZ2h0IDAuM3MgZWFzZTsgfSBkYWlseS1tZW51IC5kYWlseS1tZW51IC5tYWluIC5tZW51LWl0ZW0ub3BlbixbZGF0YS1pcz1cImRhaWx5LW1lbnVcIl0gLmRhaWx5LW1lbnUgLm1haW4gLm1lbnUtaXRlbS5vcGVueyBiYWNrZ3JvdW5kOiByZ2JhKDI1NSwyNTUsMjU1LDAuOCk7IH0gZGFpbHktbWVudSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtLm9wZW4gLm1lbnUtYm9keSAubWVudS1zaWRlLFtkYXRhLWlzPVwiZGFpbHktbWVudVwiXSAuZGFpbHktbWVudSAubWFpbiAubWVudS1pdGVtLm9wZW4gLm1lbnUtYm9keSAubWVudS1zaWRleyB0cmFuc2l0aW9uOiBoZWlnaHQgMC40cyAwLjNzIGVhc2U7IH0nLCAnJywgZnVuY3Rpb24ob3B0cykge1xudmFyIF90aGlzID0gdGhpcztcblxudGhpcy50b2RheSA9IHtcbiAgICBicmVha2Zhc3Q6IHtcbiAgICAgICAgbWFpbjogJ+OBlOOBr+OCkycsXG4gICAgICAgIHNpZGU6IFsn57SN6LGGJywgJ+WRs+WZjOaxgScsICfniZvkubMnXVxuICAgIH0sXG4gICAgbHVuY2g6IHtcbiAgICAgICAgbWFpbjogJ+OCq+ODrOODvOOBhuOBqeOCkycsXG4gICAgICAgIHNpZGU6IFsn44K144Op44OAJ11cbiAgICB9LFxuICAgIGRpbm5lcjoge1xuICAgICAgICBtYWluOiAn54S844GN6a2a44Gu44OV44Kj44Os44OD44OIJyxcbiAgICAgICAgc2lkZTogWyfjgarjgpPjgYsnLCAn44GE44KN44GE44KN44GC44KLJywgJ+OBiuOBsuOBn+OBlycsICfjgrXjg6njg4AnLCAn5ZGz5ZmM5rGBJ11cbiAgICB9XG59O1xuXG50aGlzLmluaXQgPSAnYnJlYWtmYXN0JztcbnRoaXMuaXNPcGVuID0gdGhpcy5pbml0O1xuXG5jb25zdCBsaW5lSGVpZ2h0ID0gMzA7XG5cbnRoaXMub3BlbiA9IHRpbWUgPT4ge1xuICAgIHJldHVybiBlID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoX3RoaXMuaXNPcGVuICE9PSB0aW1lKSB7XG4gICAgICAgICAgICAvLyDjgrXjgqTjg4njg6Hjg4vjg6Xjg7xIaWRlXG4gICAgICAgICAgICBjb25zdCAkb2xkX3AgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgZGFpbHlNZW51LSR7X3RoaXMuaXNPcGVufWApO1xuICAgICAgICAgICAgY29uc3QgJG9sZF9lID0gJG9sZF9wLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtc2lkZScpO1xuICAgICAgICAgICAgJG9sZF9lWzBdLnN0eWxlLmhlaWdodCA9IGAwcHhgO1xuICAgICAgICAgICAgLy8g6auY44GV44KS5LuY5LiOXG4gICAgICAgICAgICBjb25zdCAkcGFyZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYGRhaWx5TWVudS0ke3RpbWV9YCk7XG4gICAgICAgICAgICBjb25zdCAkZWxlbSA9ICRwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1zaWRlJyk7XG4gICAgICAgICAgICBjb25zdCBsZW4gPSBfdGhpcy50b2RheVt0aW1lXS5zaWRlLmxlbmd0aDtcbiAgICAgICAgICAgICRlbGVtWzBdLnN0eWxlLmhlaWdodCA9IGAke2xlbiAqIGxpbmVIZWlnaHR9cHhgO1xuICAgICAgICAgICAgX3RoaXMuaXNPcGVuID0gdGltZTtcbiAgICAgICAgfVxuICAgIH07XG59O1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3NjcmlwdHMvdGFncy9wdWJsaWMvZGFpbHktbWVudS50YWciXSwic291cmNlUm9vdCI6IiJ9