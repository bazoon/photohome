/*!
 * jQuery JavaScript Library v1.11.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-05-01T17:42Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper window is present,
		// execute the factory and get jQuery
		// For environments that do not inherently posses a window with a document
		// (such as Node.js), expose a jQuery-making factory as module.exports
		// This accentuates the need for the creation of a real window
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//

var deletedIds = [];

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.11.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		return !jQuery.isArray( obj ) && obj - parseFloat( obj ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( support.ownLast ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v1.10.19
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-04-18
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== strundefined && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare,
		doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", function() {
				setDocument();
			}, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", function() {
				setDocument();
			});
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName ) && assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select msallowclip=''><option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowclip^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !(--remaining) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed, false );
		window.removeEventListener( "load", completed, false );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};


var strundefined = typeof undefined;



// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownLast = i !== "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery(function() {
	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {
		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== strundefined ) {
		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {
			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
});




(function() {
	var div = document.createElement( "div" );

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( elem ) {
	var noData = jQuery.noData[ (elem.nodeName + " ").toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute("classid") === noData;
};


var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,
		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[0],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};



// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[0], key ) : emptyGet;
};
var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	// Minified: var a,b,c
	var input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		fragment = document.createDocumentFragment();

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );
	div.innerHTML = "<input type='radio' checked='checked' name='t'/>";

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	support.noCloneEvent = true;
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Execute the test only if not already executed in another module.
	if (support.deleteExpando == null) {
		// Support: IE<9
		support.deleteExpando = true;
		try {
			delete div.test;
		} catch( e ) {
			support.deleteExpando = false;
		}
	}
})();


(function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox 23+ (lack focusin event)
	for ( i in { submit: true, change: true, focusin: true }) {
		eventName = "on" + i;

		if ( !(support[ i + "Bubbles" ] = eventName in window) ) {
			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i + "Bubbles" ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
})();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!support.noCloneEvent || !support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = (rtagName.exec( elem ) || [ "", "" ])[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ (rtagName.exec( value ) || [ "", "" ])[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optmization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}


(function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== strundefined ) {
			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

})();
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );



var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			var condition = conditionFn();

			if ( condition == null ) {
				// The test was not ready at this point; screw the hook this time
				// but check again when needed next time.
				return;
			}

			if ( condition ) {
				// Hook not needed (or it's not possible to use it due to missing dependency),
				// remove it.
				// Since there are no other hooks for marginRight, remove the whole object.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.

			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	// Minified: var b,c,d,e,f,g, h,i
	var div, style, a, pixelPositionVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal;

	// Setup
	div = document.createElement( "div" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];
	style = a && a.style;

	// Finish early in limited (non-browser) environments
	if ( !style ) {
		return;
	}

	style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = style.boxSizing === "" || style.MozBoxSizing === "" ||
		style.WebkitBoxSizing === "";

	jQuery.extend(support, {
		reliableHiddenOffsets: function() {
			if ( reliableHiddenOffsetsVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {
			if ( boxSizingReliableVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		// Support: Android 2.3
		reliableMarginRight: function() {
			if ( reliableMarginRightVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		}
	});

	function computeStyleTests() {
		// Minified: var b,c,d,j
		var div, body, container, contents;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {
			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = false;
		reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			pixelPositionVal = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			boxSizingReliableVal =
				( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Support: Android 2.3
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =
				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents, null ) || {} ).marginRight );
		}

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		contents = div.getElementsByTagName( "td" );
		contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
		reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		if ( reliableHiddenOffsetsVal ) {
			contents[ 0 ].style.display = "";
			contents[ 1 ].style.display = "none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
		}

		body.removeChild( container );
	}

})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,

	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			// Work around by temporarily setting element display to inline-block
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {
	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	// Minified: var a,b,c,d,e
	var input, div, select, a, opt;

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName("a")[ 0 ];

	// First batch of tests.
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
})();


var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hook for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};

// Retrieve booleans specially
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {

	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		} :
		function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return (ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {
	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {
		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	}) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	// Document location
	ajaxLocParts,
	ajaxLocation,

	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
		(!support.reliableHiddenOffsets() &&
			((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?
	// Support: IE6+
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		return !this.isLocal &&

			// Support: IE7-8
			// oldIE XHR does not support non-RFC2616 methods (#13240)
			// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
			// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
			// Although this check for six methods instead of eight
			// since IE also does not support "trace" and "connect"
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&

			createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
if ( window.ActiveXObject ) {
	jQuery( window ).on( "unload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	});
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( options ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open( options.type, options.url, options.async, options.username, options.password );

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {
						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {
							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch( e ) {
									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;
								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					if ( !options.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch( e ) {}
}




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};





var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray("auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));
// Generated by CoffeeScript 1.7.1

/*
jQuery.Turbolinks ~ https://github.com/kossnocorp/jquery.turbolinks
jQuery plugin for drop-in fix binded events problem caused by Turbolinks

The MIT License
Copyright (c) 2012-2013 Sasha Koss & Rico Sta. Cruz
 */


(function() {
  var $, $document;

  $ = window.jQuery || (typeof require === "function" ? require('jquery') : void 0);

  $document = $(document);

  $.turbo = {
    version: '2.1.0',
    isReady: false,
    use: function(load, fetch) {
      return $document.off('.turbo').on("" + load + ".turbo", this.onLoad).on("" + fetch + ".turbo", this.onFetch);
    },
    addCallback: function(callback) {
      if ($.turbo.isReady) {
        callback($);
      }
      return $document.on('turbo:ready', function() {
        return callback($);
      });
    },
    onLoad: function() {
      $.turbo.isReady = true;
      return $document.trigger('turbo:ready');
    },
    onFetch: function() {
      return $.turbo.isReady = false;
    },
    register: function() {
      $(this.onLoad);
      return $.fn.ready = this.addCallback;
    }
  };

  $.turbo.register();

  $.turbo.use('page:load', 'page:fetch');

}).call(this);
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote], a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not(form button), button[data-confirm]:not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]),textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = $('meta[name="csrf-token"]').attr('content');
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // making sure that all forms have actual up-to-date token(cached forms contain old one)
    refreshCSRFTokens: function(){
      var csrfToken = $('meta[name=csrf-token]').attr('content');
      var csrfParam = $('meta[name=csrf-param]').attr('content');
      $('form input[name="' + csrfParam + '"]').val(csrfToken);
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element.attr('href');
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, elCrossDomain, crossDomain, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        elCrossDomain = element.data('cross-domain');
        crossDomain = elCrossDomain === undefined ? null : elCrossDomain;
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.attr('method');
          url = element.attr('action');
          data = element.serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + "&" + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: crossDomain
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = $('meta[name=csrf-token]').attr('content'),
        csrfParam = $('meta[name=csrf-param]').attr('content'),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      element.data('ujs:enable-with', element[method]());
      if (replacement !== undefined) {
        element[method](replacement);
      }

      element.prop('disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with')) element[method](element.data('ujs:enable-with'));
      element.prop('disabled', false);
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        answer = rails.confirm(message);
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var inputs = $(), input, valueToCheck,
          selector = specifiedSelector || 'input,textarea',
          allInputs = form.find(selector);

      allInputs.each(function() {
        input = $(this);
        valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : input.val();
        // If nonBlank and valueToCheck are both truthy, or nonBlank and valueToCheck are both falsey
        if (!valueToCheck === !nonBlank) {

          // Don't count unchecked required radio if other radio with same name is checked
          if (input.is('input[type=radio]') && allInputs.filter('input[type=radio]:checked[name="' + input.attr('name') + '"]').length) {
            return true; // Skip to next input
          }

          inputs = inputs.add(input);
        }
      });
      return inputs.length ? inputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      element.data('ujs:enable-with', element.html()); // store enabled state
      if (replacement !== undefined) {
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
    },

    // restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (link.data('remote') !== undefined) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.error( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (link.data('method')) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.error( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = form.data('remote') !== undefined,
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') == undefined) {
        blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector);
        if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
          return rails.stopEverything(e);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      button.closest('form').data('ujs:submit-button', data);
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this == event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this == event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*
 * jQuery Plugin: Tokenizing Autocomplete Text Entry
 * Version 1.6.0
 *
 * Copyright (c) 2009 James Smith (http://loopj.com)
 * Licensed jointly under the GPL and MIT licenses,
 * choose which one suits your project best!
 *
 */


(function ($) {
// Default settings
var DEFAULT_SETTINGS = {
	// Search settings
    method: "GET",
    contentType: "json",
    queryParam: "q",
    searchDelay: 300,
    minChars: 1,
    propertyToSearch: "name",
    jsonContainer: null,

	// Display settings
    hintText: "Напишите что-нибудь для поиска",
    noResultsText: "No results",
    searchingText: "Searching...",
    deleteText: "&times;",
    animateDropdown: true,

	// Tokenization settings
    tokenLimit: null,
    tokenDelimiter: ",",
    preventDuplicates: false,

	// Output settings
    tokenValue: "id",

	// Prepopulation settings
    prePopulate: null,
    processPrePopulate: false,

	// Manipulation settings
    idPrefix: "token-input-",

	// Formatters
    resultsFormatter: function(item){ return "<li>" + item[this.propertyToSearch]+ "</li>" },
    tokenFormatter: function(item) { return "<li><p>" + item[this.propertyToSearch] + "</p></li>" },

	// Callbacks
    onResult: null,
    onAdd: null,
    onDelete: null,
    onReady: null
};

// Default classes to use when theming
var DEFAULT_CLASSES = {
    tokenList: "token-input-list",
    token: "token-input-token",
    tokenDelete: "token-input-delete-token",
    selectedToken: "token-input-selected-token",
    highlightedToken: "token-input-highlighted-token",
    dropdown: "token-input-dropdown",
    dropdownItem: "token-input-dropdown-item",
    dropdownItem2: "token-input-dropdown-item2",
    selectedDropdownItem: "token-input-selected-dropdown-item",
    inputToken: "token-input-input-token"
};

// Input box position "enum"
var POSITION = {
    BEFORE: 0,
    AFTER: 1,
    END: 2
};

// Keys "enum"
var KEY = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESCAPE: 27,
    SPACE: 32,
    PAGE_UP: 33,
    PAGE_DOWN: 34,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    NUMPAD_ENTER: 108,
    COMMA: 188
};

// Additional public (exposed) methods
var methods = {
    init: function(url_or_data_or_function, options) {
        var settings = $.extend({}, DEFAULT_SETTINGS, options || {});

        return this.each(function () {
            $(this).data("tokenInputObject", new $.TokenList(this, url_or_data_or_function, settings));
        });
    },
    clear: function() {
        this.data("tokenInputObject").clear();
        return this;
    },
    add: function(item) {
        this.data("tokenInputObject").add(item);
        return this;
    },
    remove: function(item) {
        this.data("tokenInputObject").remove(item);
        return this;
    },
    get: function() {
    	return this.data("tokenInputObject").getTokens();
   	}
}

// Expose the .tokenInput function to jQuery as a plugin
$.fn.tokenInput = function (method) {
    // Method calling and initialization logic
    if(methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else {
        return methods.init.apply(this, arguments);
    }
};

// TokenList class for each input
$.TokenList = function (input, url_or_data, settings) {
    //
    // Initialization
    //

    // Configure the data source
    if($.type(url_or_data) === "string" || $.type(url_or_data) === "function") {
        // Set the url to query against
        settings.url = url_or_data;

        // If the URL is a function, evaluate it here to do our initalization work
        var url = computeURL();

        // Make a smart guess about cross-domain if it wasn't explicitly specified
        if(settings.crossDomain === undefined) {
            if(url.indexOf("://") === -1) {
                settings.crossDomain = false;
            } else {
                settings.crossDomain = (location.href.split(/\/+/g)[1] !== url.split(/\/+/g)[1]);
            }
        }
    } else if(typeof(url_or_data) === "object") {
        // Set the local data to search through
        settings.local_data = url_or_data;
    }

    // Build class names
    if(settings.classes) {
        // Use custom class names
        settings.classes = $.extend({}, DEFAULT_CLASSES, settings.classes);
    } else if(settings.theme) {
        // Use theme-suffixed default class names
        settings.classes = {};
        $.each(DEFAULT_CLASSES, function(key, value) {
            settings.classes[key] = value + "-" + settings.theme;
        });
    } else {
        settings.classes = DEFAULT_CLASSES;
    }


    // Save the tokens
    var saved_tokens = [];

    // Keep track of the number of tokens in the list
    var token_count = 0;

    // Basic cache to save on db hits
    var cache = new $.TokenList.Cache();

    // Keep track of the timeout, old vals
    var timeout;
    var input_val;

    // Create a new text input an attach keyup events
    var input_box = $("<input type=\"text\"  autocomplete=\"off\">")
        .css({
            outline: "none"
        })
        .attr("id", settings.idPrefix + input.id)
        .focus(function () {
            if (settings.tokenLimit === null || settings.tokenLimit !== token_count) {
                show_dropdown_hint();
            }
        })
        .blur(function () {
            hide_dropdown();
            $(this).val("");
        })
        .bind("keyup keydown blur update", resize_input)
        .keydown(function (event) {
            var previous_token;
            var next_token;

            switch(event.keyCode) {
                case KEY.LEFT:
                case KEY.RIGHT:
                case KEY.UP:
                case KEY.DOWN:
                    if(!$(this).val()) {
                        previous_token = input_token.prev();
                        next_token = input_token.next();

                        if((previous_token.length && previous_token.get(0) === selected_token) || (next_token.length && next_token.get(0) === selected_token)) {
                            // Check if there is a previous/next token and it is selected
                            if(event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) {
                                deselect_token($(selected_token), POSITION.BEFORE);
                            } else {
                                deselect_token($(selected_token), POSITION.AFTER);
                            }
                        } else if((event.keyCode === KEY.LEFT || event.keyCode === KEY.UP) && previous_token.length) {
                            // We are moving left, select the previous token if it exists
                            select_token($(previous_token.get(0)));
                        } else if((event.keyCode === KEY.RIGHT || event.keyCode === KEY.DOWN) && next_token.length) {
                            // We are moving right, select the next token if it exists
                            select_token($(next_token.get(0)));
                        }
                    } else {
                        var dropdown_item = null;

                        if(event.keyCode === KEY.DOWN || event.keyCode === KEY.RIGHT) {
                            dropdown_item = $(selected_dropdown_item).next();
                        } else {
                            dropdown_item = $(selected_dropdown_item).prev();
                        }

                        if(dropdown_item.length) {
                            select_dropdown_item(dropdown_item);
                        }
                        return false;
                    }
                    break;

                case KEY.BACKSPACE:
                    previous_token = input_token.prev();

                    if(!$(this).val().length) {
                        if(selected_token) {
                            delete_token($(selected_token));
                            hidden_input.change();
                        } else if(previous_token.length) {
                            select_token($(previous_token.get(0)));
                        }

                        return false;
                    } else if($(this).val().length === 1) {
                        hide_dropdown();
                    } else {
                        // set a timeout just long enough to let this function finish.
                        setTimeout(function(){do_search();}, 5);
                    }
                    break;

                case KEY.TAB:
                case KEY.ENTER:
                case KEY.NUMPAD_ENTER:
                case KEY.COMMA:
                  if(selected_dropdown_item) {
                    add_token($(selected_dropdown_item).data("tokeninput"));
                    hidden_input.change();
                    return false;
                  }
                  break;

                case KEY.ESCAPE:
                  hide_dropdown();
                  return true;

                default:
                    if(String.fromCharCode(event.which)) {
                        // set a timeout just long enough to let this function finish.
                        setTimeout(function(){do_search();}, 5);
                    }
                    break;
            }
        });

    // Keep a reference to the original input box
    var hidden_input = $(input)
                           .hide()
                           .val("")
                           .focus(function () {
                               input_box.focus();
                           })
                           .blur(function () {
                               input_box.blur();
                           });

    // Keep a reference to the selected token and dropdown item
    var selected_token = null;
    var selected_token_index = 0;
    var selected_dropdown_item = null;

    // The list to store the token items in
    var token_list = $("<ul />")
        .addClass(settings.classes.tokenList)
        .click(function (event) {
            var li = $(event.target).closest("li");
            if(li && li.get(0) && $.data(li.get(0), "tokeninput")) {
                toggle_select_token(li);
            } else {
                // Deselect selected token
                if(selected_token) {
                    deselect_token($(selected_token), POSITION.END);
                }

                // Focus input box
                input_box.focus();
            }
        })
        .mouseover(function (event) {
            var li = $(event.target).closest("li");
            if(li && selected_token !== this) {
                li.addClass(settings.classes.highlightedToken);
            }
        })
        .mouseout(function (event) {
            var li = $(event.target).closest("li");
            if(li && selected_token !== this) {
                li.removeClass(settings.classes.highlightedToken);
            }
        })
        .insertBefore(hidden_input);

    // The token holding the input box
    var input_token = $("<li />")
        .addClass(settings.classes.inputToken)
        .appendTo(token_list)
        .append(input_box);

    // The list to store the dropdown items in
    var dropdown = $("<div>")
        .addClass(settings.classes.dropdown)
        .appendTo("body")
        .hide();

    // Magic element to help us resize the text input
    var input_resizer = $("<tester/>")
        .insertAfter(input_box)
        .css({
            position: "absolute",
            top: -9999,
            left: -9999,
            width: "auto",
            fontSize: input_box.css("fontSize"),
            fontFamily: input_box.css("fontFamily"),
            fontWeight: input_box.css("fontWeight"),
            letterSpacing: input_box.css("letterSpacing"),
            whiteSpace: "nowrap"
        });

    // Pre-populate list if items exist
    hidden_input.val("");
    var li_data = settings.prePopulate || hidden_input.data("pre");
    if(settings.processPrePopulate && $.isFunction(settings.onResult)) {
        li_data = settings.onResult.call(hidden_input, li_data);
    }
    if(li_data && li_data.length) {
        $.each(li_data, function (index, value) {
            insert_token(value);
            checkTokenLimit();
        });
    }

    // Initialization is done
    if($.isFunction(settings.onReady)) {
        settings.onReady.call();
    }

    //
    // Public functions
    //

    this.clear = function() {
        token_list.children("li").each(function() {
            if ($(this).children("input").length === 0) {
                delete_token($(this));
            }
        });
    }

    this.add = function(item) {
        add_token(item);
    }

    this.remove = function(item) {
        token_list.children("li").each(function() {
            if ($(this).children("input").length === 0) {
                var currToken = $(this).data("tokeninput");
                var match = true;
                for (var prop in item) {
                    if (item[prop] !== currToken[prop]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    delete_token($(this));
                }
            }
        });
    }
    
    this.getTokens = function() {
   		return saved_tokens;
   	}

    //
    // Private functions
    //

    function checkTokenLimit() {
        if(settings.tokenLimit !== null && token_count >= settings.tokenLimit) {
            input_box.hide();
            hide_dropdown();
            return;
        }
    }

    function resize_input() {
        if(input_val === (input_val = input_box.val())) {return;}

        // Enter new content into resizer and resize input accordingly
        var escaped = input_val.replace(/&/g, '&amp;').replace(/\s/g,' ').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        input_resizer.html(escaped);
        input_box.width(input_resizer.width() + 30);
    }

    function is_printable_character(keycode) {
        return ((keycode >= 48 && keycode <= 90) ||     // 0-1a-z
                (keycode >= 96 && keycode <= 111) ||    // numpad 0-9 + - / * .
                (keycode >= 186 && keycode <= 192) ||   // ; = , - . / ^
                (keycode >= 219 && keycode <= 222));    // ( \ ) '
    }

    // Inner function to a token to the list
    function insert_token(item) {
        var this_token = settings.tokenFormatter(item);
        this_token = $(this_token)
          .addClass(settings.classes.token)
          .insertBefore(input_token);

        // The 'delete token' button
        $("<span>" + settings.deleteText + "</span>")
            .addClass(settings.classes.tokenDelete)
            .appendTo(this_token)
            .click(function () {
                delete_token($(this).parent());
                hidden_input.change();
                return false;
            });

        // Store data on the token
        var token_data = {"id": item.id};
        token_data[settings.propertyToSearch] = item[settings.propertyToSearch];
        $.data(this_token.get(0), "tokeninput", item);

        // Save this token for duplicate checking
        saved_tokens = saved_tokens.slice(0,selected_token_index).concat([token_data]).concat(saved_tokens.slice(selected_token_index));
        selected_token_index++;

        // Update the hidden input
        update_hidden_input(saved_tokens, hidden_input);

        token_count += 1;

        // Check the token limit
        if(settings.tokenLimit !== null && token_count >= settings.tokenLimit) {
            input_box.hide();
            hide_dropdown();
        }

        return this_token;
    }

    // Add a token to the token list based on user input
    function add_token (item) {
        var callback = settings.onAdd;

        // See if the token already exists and select it if we don't want duplicates
        if(token_count > 0 && settings.preventDuplicates) {
            var found_existing_token = null;
            token_list.children().each(function () {
                var existing_token = $(this);
                var existing_data = $.data(existing_token.get(0), "tokeninput");
                if(existing_data && existing_data.id === item.id) {
                    found_existing_token = existing_token;
                    return false;
                }
            });

            if(found_existing_token) {
                select_token(found_existing_token);
                input_token.insertAfter(found_existing_token);
                input_box.focus();
                return;
            }
        }

        // Insert the new tokens
        if(settings.tokenLimit == null || token_count < settings.tokenLimit) {
            insert_token(item);
            checkTokenLimit();
        }

        // Clear input box
        input_box.val("");

        // Don't show the help dropdown, they've got the idea
        hide_dropdown();

        // Execute the onAdd callback if defined
        if($.isFunction(callback)) {
            callback.call(hidden_input,item);
        }
    }

    // Select a token in the token list
    function select_token (token) {
        token.addClass(settings.classes.selectedToken);
        selected_token = token.get(0);

        // Hide input box
        input_box.val("");

        // Hide dropdown if it is visible (eg if we clicked to select token)
        hide_dropdown();
    }

    // Deselect a token in the token list
    function deselect_token (token, position) {
        token.removeClass(settings.classes.selectedToken);
        selected_token = null;

        if(position === POSITION.BEFORE) {
            input_token.insertBefore(token);
            selected_token_index--;
        } else if(position === POSITION.AFTER) {
            input_token.insertAfter(token);
            selected_token_index++;
        } else {
            input_token.appendTo(token_list);
            selected_token_index = token_count;
        }

        // Show the input box and give it focus again
        input_box.focus();
    }

    // Toggle selection of a token in the token list
    function toggle_select_token(token) {
        var previous_selected_token = selected_token;

        if(selected_token) {
            deselect_token($(selected_token), POSITION.END);
        }

        if(previous_selected_token === token.get(0)) {
            deselect_token(token, POSITION.END);
        } else {
            select_token(token);
        }
    }

    // Delete a token from the token list
    function delete_token (token) {
        // Remove the id from the saved list
        var token_data = $.data(token.get(0), "tokeninput");
        var callback = settings.onDelete;

        var index = token.prevAll().length;
        if(index > selected_token_index) index--;

        // Delete the token
        token.remove();
        selected_token = null;

        // Show the input box and give it focus again
        input_box.focus();

        // Remove this token from the saved list
        saved_tokens = saved_tokens.slice(0,index).concat(saved_tokens.slice(index+1));
        if(index < selected_token_index) selected_token_index--;

        // Update the hidden input
        update_hidden_input(saved_tokens, hidden_input);

        token_count -= 1;

        if(settings.tokenLimit !== null) {
            input_box
                .show()
                .val("")
                .focus();
        }

        // Execute the onDelete callback if defined
        if($.isFunction(callback)) {
            callback.call(hidden_input,token_data);
        }
    }

    // Update the hidden input box value
    function update_hidden_input(saved_tokens, hidden_input) {
        var token_values = $.map(saved_tokens, function (el) {
            return el[settings.tokenValue];
        });
        hidden_input.val(token_values.join(settings.tokenDelimiter));

    }

    // Hide and clear the results dropdown
    function hide_dropdown () {
        dropdown.hide().empty();
        selected_dropdown_item = null;
    }

    function show_dropdown() {
        dropdown
            .css({
                position: "absolute",
                top: $(token_list).offset().top + $(token_list).outerHeight(),
                left: $(token_list).offset().left,
                zindex: 999
            })
            .show();
    }

    function show_dropdown_searching () {
        if(settings.searchingText) {
            dropdown.html("<p>"+settings.searchingText+"</p>");
            show_dropdown();
        }
    }

    function show_dropdown_hint () {
        if(settings.hintText) {
            dropdown.html("<p>"+settings.hintText+"</p>");
            show_dropdown();
        }
    }

    // Highlight the query part of the search term
    function highlight_term(value, term) {
        return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term + ")(?![^<>]*>)(?![^&;]+;)", "gi"), "<b>$1</b>");
    }
    
    function find_value_and_highlight_term(template, value, term) {
        return template.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + value + ")(?![^<>]*>)(?![^&;]+;)", "g"), highlight_term(value, term));
    }

    // Populate the results dropdown with some results
    function populate_dropdown (query, results) {
        if(results && results.length) {
            dropdown.empty();
            var dropdown_ul = $("<ul>")
                .appendTo(dropdown)
                .mouseover(function (event) {
                    select_dropdown_item($(event.target).closest("li"));
                })
                .mousedown(function (event) {
                    add_token($(event.target).closest("li").data("tokeninput"));
                    hidden_input.change();
                    return false;
                })
                .hide();

            $.each(results, function(index, value) {
                var this_li = settings.resultsFormatter(value);
                
                this_li = find_value_and_highlight_term(this_li ,value[settings.propertyToSearch], query);            
                
                this_li = $(this_li).appendTo(dropdown_ul);
                
                if(index % 2) {
                    this_li.addClass(settings.classes.dropdownItem);
                } else {
                    this_li.addClass(settings.classes.dropdownItem2);
                }

                if(index === 0) {
                    select_dropdown_item(this_li);
                }

                $.data(this_li.get(0), "tokeninput", value);
            });

            show_dropdown();

            if(settings.animateDropdown) {
                dropdown_ul.slideDown("fast");
            } else {
                dropdown_ul.show();
            }
        } else {
            if(settings.noResultsText) {
                dropdown.html("<p>"+settings.noResultsText+"</p>");
                show_dropdown();
            }
        }
    }

    // Highlight an item in the results dropdown
    function select_dropdown_item (item) {
        if(item) {
            if(selected_dropdown_item) {
                deselect_dropdown_item($(selected_dropdown_item));
            }

            item.addClass(settings.classes.selectedDropdownItem);
            selected_dropdown_item = item.get(0);
        }
    }

    // Remove highlighting from an item in the results dropdown
    function deselect_dropdown_item (item) {
        item.removeClass(settings.classes.selectedDropdownItem);
        selected_dropdown_item = null;
    }

    // Do a search and show the "searching" dropdown if the input is longer
    // than settings.minChars
    function do_search() {
        var query = input_box.val().toLowerCase();

        if(query && query.length) {
            if(selected_token) {
                deselect_token($(selected_token), POSITION.AFTER);
            }

            if(query.length >= settings.minChars) {
                show_dropdown_searching();
                clearTimeout(timeout);

                timeout = setTimeout(function(){
                    run_search(query);
                }, settings.searchDelay);
            } else {
                hide_dropdown();
            }
        }
    }

    // Do the actual search
    function run_search(query) {
        var cache_key = query + computeURL();
        var cached_results = cache.get(cache_key);
        if(cached_results) {
            populate_dropdown(query, cached_results);
        } else {
            // Are we doing an ajax search or local data search?
            if(settings.url) {
                var url = computeURL();
                // Extract exisiting get params
                var ajax_params = {};
                ajax_params.data = {};
                if(url.indexOf("?") > -1) {
                    var parts = url.split("?");
                    ajax_params.url = parts[0];

                    var param_array = parts[1].split("&");
                    $.each(param_array, function (index, value) {
                        var kv = value.split("=");
                        ajax_params.data[kv[0]] = kv[1];
                    });
                } else {
                    ajax_params.url = url;
                }

                // Prepare the request
                ajax_params.data[settings.queryParam] = query;
                ajax_params.type = settings.method;
                ajax_params.dataType = settings.contentType;
                if(settings.crossDomain) {
                    ajax_params.dataType = "jsonp";
                }

                // Attach the success callback
                ajax_params.success = function(results) {
                  if($.isFunction(settings.onResult)) {
                      results = settings.onResult.call(hidden_input, results);
                  }
                  cache.add(cache_key, settings.jsonContainer ? results[settings.jsonContainer] : results);

                  // only populate the dropdown if the results are associated with the active search query
                  if(input_box.val().toLowerCase() === query) {
                      populate_dropdown(query, settings.jsonContainer ? results[settings.jsonContainer] : results);
                  }
                };

                // Make the request
                $.ajax(ajax_params);
            } else if(settings.local_data) {
                // Do the search through local data
                var results = $.grep(settings.local_data, function (row) {
                    return row[settings.propertyToSearch].toLowerCase().indexOf(query.toLowerCase()) > -1;
                });

                if($.isFunction(settings.onResult)) {
                    results = settings.onResult.call(hidden_input, results);
                }
                cache.add(cache_key, results);
                populate_dropdown(query, results);
            }
        }
    }

    // compute the dynamic URL
    function computeURL() {
        var url = settings.url;
        if(typeof settings.url == 'function') {
            url = settings.url.call();
        }
        return url;
    }
};

// Really basic cache for the results
$.TokenList.Cache = function (options) {
    var settings = $.extend({
        max_size: 500
    }, options);

    var data = {};
    var size = 0;

    var flush = function () {
        data = {};
        size = 0;
    };

    this.add = function (query, results) {
        if(size > settings.max_size) {
            flush();
        }

        if(!data[query]) {
            size += 1;
        }

        data[query] = results;
    };

    this.get = function (query) {
        return data[query];
    };
};
}(jQuery));
/*!
 * jQuery UI Core 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/category/ui-core/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

// $.ui might exist from components with no dependencies, e.g., $.ui.position
$.ui = $.ui || {};

$.extend( $.ui, {
	version: "1.11.1",

	keyCode: {
		BACKSPACE: 8,
		COMMA: 188,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		HOME: 36,
		LEFT: 37,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		PERIOD: 190,
		RIGHT: 39,
		SPACE: 32,
		TAB: 9,
		UP: 38
	}
});

// plugins
$.fn.extend({
	scrollParent: function( includeHidden ) {
		var position = this.css( "position" ),
			excludeStaticParent = position === "absolute",
			overflowRegex = includeHidden ? /(auto|scroll|hidden)/ : /(auto|scroll)/,
			scrollParent = this.parents().filter( function() {
				var parent = $( this );
				if ( excludeStaticParent && parent.css( "position" ) === "static" ) {
					return false;
				}
				return overflowRegex.test( parent.css( "overflow" ) + parent.css( "overflow-y" ) + parent.css( "overflow-x" ) );
			}).eq( 0 );

		return position === "fixed" || !scrollParent.length ? $( this[ 0 ].ownerDocument || document ) : scrollParent;
	},

	uniqueId: (function() {
		var uuid = 0;

		return function() {
			return this.each(function() {
				if ( !this.id ) {
					this.id = "ui-id-" + ( ++uuid );
				}
			});
		};
	})(),

	removeUniqueId: function() {
		return this.each(function() {
			if ( /^ui-id-\d+$/.test( this.id ) ) {
				$( this ).removeAttr( "id" );
			}
		});
	}
});

// selectors
function focusable( element, isTabIndexNotNaN ) {
	var map, mapName, img,
		nodeName = element.nodeName.toLowerCase();
	if ( "area" === nodeName ) {
		map = element.parentNode;
		mapName = map.name;
		if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) {
			return false;
		}
		img = $( "img[usemap='#" + mapName + "']" )[ 0 ];
		return !!img && visible( img );
	}
	return ( /input|select|textarea|button|object/.test( nodeName ) ?
		!element.disabled :
		"a" === nodeName ?
			element.href || isTabIndexNotNaN :
			isTabIndexNotNaN) &&
		// the element and all of its ancestors must be visible
		visible( element );
}

function visible( element ) {
	return $.expr.filters.visible( element ) &&
		!$( element ).parents().addBack().filter(function() {
			return $.css( this, "visibility" ) === "hidden";
		}).length;
}

$.extend( $.expr[ ":" ], {
	data: $.expr.createPseudo ?
		$.expr.createPseudo(function( dataName ) {
			return function( elem ) {
				return !!$.data( elem, dataName );
			};
		}) :
		// support: jQuery <1.8
		function( elem, i, match ) {
			return !!$.data( elem, match[ 3 ] );
		},

	focusable: function( element ) {
		return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) );
	},

	tabbable: function( element ) {
		var tabIndex = $.attr( element, "tabindex" ),
			isTabIndexNaN = isNaN( tabIndex );
		return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN );
	}
});

// support: jQuery <1.8
if ( !$( "<a>" ).outerWidth( 1 ).jquery ) {
	$.each( [ "Width", "Height" ], function( i, name ) {
		var side = name === "Width" ? [ "Left", "Right" ] : [ "Top", "Bottom" ],
			type = name.toLowerCase(),
			orig = {
				innerWidth: $.fn.innerWidth,
				innerHeight: $.fn.innerHeight,
				outerWidth: $.fn.outerWidth,
				outerHeight: $.fn.outerHeight
			};

		function reduce( elem, size, border, margin ) {
			$.each( side, function() {
				size -= parseFloat( $.css( elem, "padding" + this ) ) || 0;
				if ( border ) {
					size -= parseFloat( $.css( elem, "border" + this + "Width" ) ) || 0;
				}
				if ( margin ) {
					size -= parseFloat( $.css( elem, "margin" + this ) ) || 0;
				}
			});
			return size;
		}

		$.fn[ "inner" + name ] = function( size ) {
			if ( size === undefined ) {
				return orig[ "inner" + name ].call( this );
			}

			return this.each(function() {
				$( this ).css( type, reduce( this, size ) + "px" );
			});
		};

		$.fn[ "outer" + name] = function( size, margin ) {
			if ( typeof size !== "number" ) {
				return orig[ "outer" + name ].call( this, size );
			}

			return this.each(function() {
				$( this).css( type, reduce( this, size, true, margin ) + "px" );
			});
		};
	});
}

// support: jQuery <1.8
if ( !$.fn.addBack ) {
	$.fn.addBack = function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	};
}

// support: jQuery 1.6.1, 1.6.2 (http://bugs.jquery.com/ticket/9413)
if ( $( "<a>" ).data( "a-b", "a" ).removeData( "a-b" ).data( "a-b" ) ) {
	$.fn.removeData = (function( removeData ) {
		return function( key ) {
			if ( arguments.length ) {
				return removeData.call( this, $.camelCase( key ) );
			} else {
				return removeData.call( this );
			}
		};
	})( $.fn.removeData );
}

// deprecated
$.ui.ie = !!/msie [\w.]+/.exec( navigator.userAgent.toLowerCase() );

$.fn.extend({
	focus: (function( orig ) {
		return function( delay, fn ) {
			return typeof delay === "number" ?
				this.each(function() {
					var elem = this;
					setTimeout(function() {
						$( elem ).focus();
						if ( fn ) {
							fn.call( elem );
						}
					}, delay );
				}) :
				orig.apply( this, arguments );
		};
	})( $.fn.focus ),

	disableSelection: (function() {
		var eventType = "onselectstart" in document.createElement( "div" ) ?
			"selectstart" :
			"mousedown";

		return function() {
			return this.bind( eventType + ".ui-disableSelection", function( event ) {
				event.preventDefault();
			});
		};
	})(),

	enableSelection: function() {
		return this.unbind( ".ui-disableSelection" );
	},

	zIndex: function( zIndex ) {
		if ( zIndex !== undefined ) {
			return this.css( "zIndex", zIndex );
		}

		if ( this.length ) {
			var elem = $( this[ 0 ] ), position, value;
			while ( elem.length && elem[ 0 ] !== document ) {
				// Ignore z-index if position is set to a value where z-index is ignored by the browser
				// This makes behavior of this function consistent across browsers
				// WebKit always returns auto if the element is positioned
				position = elem.css( "position" );
				if ( position === "absolute" || position === "relative" || position === "fixed" ) {
					// IE returns 0 when zIndex is not specified
					// other browsers return a string
					// we ignore the case of nested elements with an explicit value of 0
					// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
					value = parseInt( elem.css( "zIndex" ), 10 );
					if ( !isNaN( value ) && value !== 0 ) {
						return value;
					}
				}
				elem = elem.parent();
			}
		}

		return 0;
	}
});

// $.ui.plugin is deprecated. Use $.widget() extensions instead.
$.ui.plugin = {
	add: function( module, option, set ) {
		var i,
			proto = $.ui[ module ].prototype;
		for ( i in set ) {
			proto.plugins[ i ] = proto.plugins[ i ] || [];
			proto.plugins[ i ].push( [ option, set[ i ] ] );
		}
	},
	call: function( instance, name, args, allowDisconnected ) {
		var i,
			set = instance.plugins[ name ];

		if ( !set ) {
			return;
		}

		if ( !allowDisconnected && ( !instance.element[ 0 ].parentNode || instance.element[ 0 ].parentNode.nodeType === 11 ) ) {
			return;
		}

		for ( i = 0; i < set.length; i++ ) {
			if ( instance.options[ set[ i ][ 0 ] ] ) {
				set[ i ][ 1 ].apply( instance.element, args );
			}
		}
	}
};

}));
/*!
 * jQuery UI Widget 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/jQuery.widget/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

var widget_uuid = 0,
	widget_slice = Array.prototype.slice;

$.cleanData = (function( orig ) {
	return function( elems ) {
		var events, elem, i;
		for ( i = 0; (elem = elems[i]) != null; i++ ) {
			try {

				// Only trigger remove when necessary to save time
				events = $._data( elem, "events" );
				if ( events && events.remove ) {
					$( elem ).triggerHandler( "remove" );
				}

			// http://bugs.jquery.com/ticket/8235
			} catch( e ) {}
		}
		orig( elems );
	};
})( $.cleanData );

$.widget = function( name, base, prototype ) {
	var fullName, existingConstructor, constructor, basePrototype,
		// proxiedPrototype allows the provided prototype to remain unmodified
		// so that it can be used as a mixin for multiple widgets (#8876)
		proxiedPrototype = {},
		namespace = name.split( "." )[ 0 ];

	name = name.split( "." )[ 1 ];
	fullName = namespace + "-" + name;

	if ( !prototype ) {
		prototype = base;
		base = $.Widget;
	}

	// create selector for plugin
	$.expr[ ":" ][ fullName.toLowerCase() ] = function( elem ) {
		return !!$.data( elem, fullName );
	};

	$[ namespace ] = $[ namespace ] || {};
	existingConstructor = $[ namespace ][ name ];
	constructor = $[ namespace ][ name ] = function( options, element ) {
		// allow instantiation without "new" keyword
		if ( !this._createWidget ) {
			return new constructor( options, element );
		}

		// allow instantiation without initializing for simple inheritance
		// must use "new" keyword (the code above always passes args)
		if ( arguments.length ) {
			this._createWidget( options, element );
		}
	};
	// extend with the existing constructor to carry over any static properties
	$.extend( constructor, existingConstructor, {
		version: prototype.version,
		// copy the object used to create the prototype in case we need to
		// redefine the widget later
		_proto: $.extend( {}, prototype ),
		// track widgets that inherit from this widget in case this widget is
		// redefined after a widget inherits from it
		_childConstructors: []
	});

	basePrototype = new base();
	// we need to make the options hash a property directly on the new instance
	// otherwise we'll modify the options hash on the prototype that we're
	// inheriting from
	basePrototype.options = $.widget.extend( {}, basePrototype.options );
	$.each( prototype, function( prop, value ) {
		if ( !$.isFunction( value ) ) {
			proxiedPrototype[ prop ] = value;
			return;
		}
		proxiedPrototype[ prop ] = (function() {
			var _super = function() {
					return base.prototype[ prop ].apply( this, arguments );
				},
				_superApply = function( args ) {
					return base.prototype[ prop ].apply( this, args );
				};
			return function() {
				var __super = this._super,
					__superApply = this._superApply,
					returnValue;

				this._super = _super;
				this._superApply = _superApply;

				returnValue = value.apply( this, arguments );

				this._super = __super;
				this._superApply = __superApply;

				return returnValue;
			};
		})();
	});
	constructor.prototype = $.widget.extend( basePrototype, {
		// TODO: remove support for widgetEventPrefix
		// always use the name + a colon as the prefix, e.g., draggable:start
		// don't prefix for widgets that aren't DOM-based
		widgetEventPrefix: existingConstructor ? (basePrototype.widgetEventPrefix || name) : name
	}, proxiedPrototype, {
		constructor: constructor,
		namespace: namespace,
		widgetName: name,
		widgetFullName: fullName
	});

	// If this widget is being redefined then we need to find all widgets that
	// are inheriting from it and redefine all of them so that they inherit from
	// the new version of this widget. We're essentially trying to replace one
	// level in the prototype chain.
	if ( existingConstructor ) {
		$.each( existingConstructor._childConstructors, function( i, child ) {
			var childPrototype = child.prototype;

			// redefine the child widget using the same prototype that was
			// originally used, but inherit from the new version of the base
			$.widget( childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto );
		});
		// remove the list of existing child constructors from the old constructor
		// so the old child constructors can be garbage collected
		delete existingConstructor._childConstructors;
	} else {
		base._childConstructors.push( constructor );
	}

	$.widget.bridge( name, constructor );

	return constructor;
};

$.widget.extend = function( target ) {
	var input = widget_slice.call( arguments, 1 ),
		inputIndex = 0,
		inputLength = input.length,
		key,
		value;
	for ( ; inputIndex < inputLength; inputIndex++ ) {
		for ( key in input[ inputIndex ] ) {
			value = input[ inputIndex ][ key ];
			if ( input[ inputIndex ].hasOwnProperty( key ) && value !== undefined ) {
				// Clone objects
				if ( $.isPlainObject( value ) ) {
					target[ key ] = $.isPlainObject( target[ key ] ) ?
						$.widget.extend( {}, target[ key ], value ) :
						// Don't extend strings, arrays, etc. with objects
						$.widget.extend( {}, value );
				// Copy everything else by reference
				} else {
					target[ key ] = value;
				}
			}
		}
	}
	return target;
};

$.widget.bridge = function( name, object ) {
	var fullName = object.prototype.widgetFullName || name;
	$.fn[ name ] = function( options ) {
		var isMethodCall = typeof options === "string",
			args = widget_slice.call( arguments, 1 ),
			returnValue = this;

		// allow multiple hashes to be passed on init
		options = !isMethodCall && args.length ?
			$.widget.extend.apply( null, [ options ].concat(args) ) :
			options;

		if ( isMethodCall ) {
			this.each(function() {
				var methodValue,
					instance = $.data( this, fullName );
				if ( options === "instance" ) {
					returnValue = instance;
					return false;
				}
				if ( !instance ) {
					return $.error( "cannot call methods on " + name + " prior to initialization; " +
						"attempted to call method '" + options + "'" );
				}
				if ( !$.isFunction( instance[options] ) || options.charAt( 0 ) === "_" ) {
					return $.error( "no such method '" + options + "' for " + name + " widget instance" );
				}
				methodValue = instance[ options ].apply( instance, args );
				if ( methodValue !== instance && methodValue !== undefined ) {
					returnValue = methodValue && methodValue.jquery ?
						returnValue.pushStack( methodValue.get() ) :
						methodValue;
					return false;
				}
			});
		} else {
			this.each(function() {
				var instance = $.data( this, fullName );
				if ( instance ) {
					instance.option( options || {} );
					if ( instance._init ) {
						instance._init();
					}
				} else {
					$.data( this, fullName, new object( options, this ) );
				}
			});
		}

		return returnValue;
	};
};

$.Widget = function( /* options, element */ ) {};
$.Widget._childConstructors = [];

$.Widget.prototype = {
	widgetName: "widget",
	widgetEventPrefix: "",
	defaultElement: "<div>",
	options: {
		disabled: false,

		// callbacks
		create: null
	},
	_createWidget: function( options, element ) {
		element = $( element || this.defaultElement || this )[ 0 ];
		this.element = $( element );
		this.uuid = widget_uuid++;
		this.eventNamespace = "." + this.widgetName + this.uuid;
		this.options = $.widget.extend( {},
			this.options,
			this._getCreateOptions(),
			options );

		this.bindings = $();
		this.hoverable = $();
		this.focusable = $();

		if ( element !== this ) {
			$.data( element, this.widgetFullName, this );
			this._on( true, this.element, {
				remove: function( event ) {
					if ( event.target === element ) {
						this.destroy();
					}
				}
			});
			this.document = $( element.style ?
				// element within the document
				element.ownerDocument :
				// element is window or document
				element.document || element );
			this.window = $( this.document[0].defaultView || this.document[0].parentWindow );
		}

		this._create();
		this._trigger( "create", null, this._getCreateEventData() );
		this._init();
	},
	_getCreateOptions: $.noop,
	_getCreateEventData: $.noop,
	_create: $.noop,
	_init: $.noop,

	destroy: function() {
		this._destroy();
		// we can probably remove the unbind calls in 2.0
		// all event bindings should go through this._on()
		this.element
			.unbind( this.eventNamespace )
			.removeData( this.widgetFullName )
			// support: jquery <1.6.3
			// http://bugs.jquery.com/ticket/9413
			.removeData( $.camelCase( this.widgetFullName ) );
		this.widget()
			.unbind( this.eventNamespace )
			.removeAttr( "aria-disabled" )
			.removeClass(
				this.widgetFullName + "-disabled " +
				"ui-state-disabled" );

		// clean up events and states
		this.bindings.unbind( this.eventNamespace );
		this.hoverable.removeClass( "ui-state-hover" );
		this.focusable.removeClass( "ui-state-focus" );
	},
	_destroy: $.noop,

	widget: function() {
		return this.element;
	},

	option: function( key, value ) {
		var options = key,
			parts,
			curOption,
			i;

		if ( arguments.length === 0 ) {
			// don't return a reference to the internal hash
			return $.widget.extend( {}, this.options );
		}

		if ( typeof key === "string" ) {
			// handle nested keys, e.g., "foo.bar" => { foo: { bar: ___ } }
			options = {};
			parts = key.split( "." );
			key = parts.shift();
			if ( parts.length ) {
				curOption = options[ key ] = $.widget.extend( {}, this.options[ key ] );
				for ( i = 0; i < parts.length - 1; i++ ) {
					curOption[ parts[ i ] ] = curOption[ parts[ i ] ] || {};
					curOption = curOption[ parts[ i ] ];
				}
				key = parts.pop();
				if ( arguments.length === 1 ) {
					return curOption[ key ] === undefined ? null : curOption[ key ];
				}
				curOption[ key ] = value;
			} else {
				if ( arguments.length === 1 ) {
					return this.options[ key ] === undefined ? null : this.options[ key ];
				}
				options[ key ] = value;
			}
		}

		this._setOptions( options );

		return this;
	},
	_setOptions: function( options ) {
		var key;

		for ( key in options ) {
			this._setOption( key, options[ key ] );
		}

		return this;
	},
	_setOption: function( key, value ) {
		this.options[ key ] = value;

		if ( key === "disabled" ) {
			this.widget()
				.toggleClass( this.widgetFullName + "-disabled", !!value );

			// If the widget is becoming disabled, then nothing is interactive
			if ( value ) {
				this.hoverable.removeClass( "ui-state-hover" );
				this.focusable.removeClass( "ui-state-focus" );
			}
		}

		return this;
	},

	enable: function() {
		return this._setOptions({ disabled: false });
	},
	disable: function() {
		return this._setOptions({ disabled: true });
	},

	_on: function( suppressDisabledCheck, element, handlers ) {
		var delegateElement,
			instance = this;

		// no suppressDisabledCheck flag, shuffle arguments
		if ( typeof suppressDisabledCheck !== "boolean" ) {
			handlers = element;
			element = suppressDisabledCheck;
			suppressDisabledCheck = false;
		}

		// no element argument, shuffle and use this.element
		if ( !handlers ) {
			handlers = element;
			element = this.element;
			delegateElement = this.widget();
		} else {
			element = delegateElement = $( element );
			this.bindings = this.bindings.add( element );
		}

		$.each( handlers, function( event, handler ) {
			function handlerProxy() {
				// allow widgets to customize the disabled handling
				// - disabled as an array instead of boolean
				// - disabled class as method for disabling individual parts
				if ( !suppressDisabledCheck &&
						( instance.options.disabled === true ||
							$( this ).hasClass( "ui-state-disabled" ) ) ) {
					return;
				}
				return ( typeof handler === "string" ? instance[ handler ] : handler )
					.apply( instance, arguments );
			}

			// copy the guid so direct unbinding works
			if ( typeof handler !== "string" ) {
				handlerProxy.guid = handler.guid =
					handler.guid || handlerProxy.guid || $.guid++;
			}

			var match = event.match( /^([\w:-]*)\s*(.*)$/ ),
				eventName = match[1] + instance.eventNamespace,
				selector = match[2];
			if ( selector ) {
				delegateElement.delegate( selector, eventName, handlerProxy );
			} else {
				element.bind( eventName, handlerProxy );
			}
		});
	},

	_off: function( element, eventName ) {
		eventName = (eventName || "").split( " " ).join( this.eventNamespace + " " ) + this.eventNamespace;
		element.unbind( eventName ).undelegate( eventName );
	},

	_delay: function( handler, delay ) {
		function handlerProxy() {
			return ( typeof handler === "string" ? instance[ handler ] : handler )
				.apply( instance, arguments );
		}
		var instance = this;
		return setTimeout( handlerProxy, delay || 0 );
	},

	_hoverable: function( element ) {
		this.hoverable = this.hoverable.add( element );
		this._on( element, {
			mouseenter: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-hover" );
			},
			mouseleave: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-hover" );
			}
		});
	},

	_focusable: function( element ) {
		this.focusable = this.focusable.add( element );
		this._on( element, {
			focusin: function( event ) {
				$( event.currentTarget ).addClass( "ui-state-focus" );
			},
			focusout: function( event ) {
				$( event.currentTarget ).removeClass( "ui-state-focus" );
			}
		});
	},

	_trigger: function( type, event, data ) {
		var prop, orig,
			callback = this.options[ type ];

		data = data || {};
		event = $.Event( event );
		event.type = ( type === this.widgetEventPrefix ?
			type :
			this.widgetEventPrefix + type ).toLowerCase();
		// the original event may come from any element
		// so we need to reset the target on the new event
		event.target = this.element[ 0 ];

		// copy original event properties over to the new event
		orig = event.originalEvent;
		if ( orig ) {
			for ( prop in orig ) {
				if ( !( prop in event ) ) {
					event[ prop ] = orig[ prop ];
				}
			}
		}

		this.element.trigger( event, data );
		return !( $.isFunction( callback ) &&
			callback.apply( this.element[0], [ event ].concat( data ) ) === false ||
			event.isDefaultPrevented() );
	}
};

$.each( { show: "fadeIn", hide: "fadeOut" }, function( method, defaultEffect ) {
	$.Widget.prototype[ "_" + method ] = function( element, options, callback ) {
		if ( typeof options === "string" ) {
			options = { effect: options };
		}
		var hasOptions,
			effectName = !options ?
				method :
				options === true || typeof options === "number" ?
					defaultEffect :
					options.effect || defaultEffect;
		options = options || {};
		if ( typeof options === "number" ) {
			options = { duration: options };
		}
		hasOptions = !$.isEmptyObject( options );
		options.complete = callback;
		if ( options.delay ) {
			element.delay( options.delay );
		}
		if ( hasOptions && $.effects && $.effects.effect[ effectName ] ) {
			element[ method ]( options );
		} else if ( effectName !== method && element[ effectName ] ) {
			element[ effectName ]( options.duration, options.easing, callback );
		} else {
			element.queue(function( next ) {
				$( this )[ method ]();
				if ( callback ) {
					callback.call( element[ 0 ] );
				}
				next();
			});
		}
	};
});

return $.widget;

}));



/*!
 * jQuery UI Button 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/button/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./core",
			"./widget"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

var lastActive,
	baseClasses = "ui-button ui-widget ui-state-default ui-corner-all",
	typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
	formResetHandler = function() {
		var form = $( this );
		setTimeout(function() {
			form.find( ":ui-button" ).button( "refresh" );
		}, 1 );
	},
	radioGroup = function( radio ) {
		var name = radio.name,
			form = radio.form,
			radios = $( [] );
		if ( name ) {
			name = name.replace( /'/g, "\\'" );
			if ( form ) {
				radios = $( form ).find( "[name='" + name + "'][type=radio]" );
			} else {
				radios = $( "[name='" + name + "'][type=radio]", radio.ownerDocument )
					.filter(function() {
						return !this.form;
					});
			}
		}
		return radios;
	};

$.widget( "ui.button", {
	version: "1.11.1",
	defaultElement: "<button>",
	options: {
		disabled: null,
		text: true,
		label: null,
		icons: {
			primary: null,
			secondary: null
		}
	},
	_create: function() {
		this.element.closest( "form" )
			.unbind( "reset" + this.eventNamespace )
			.bind( "reset" + this.eventNamespace, formResetHandler );

		if ( typeof this.options.disabled !== "boolean" ) {
			this.options.disabled = !!this.element.prop( "disabled" );
		} else {
			this.element.prop( "disabled", this.options.disabled );
		}

		this._determineButtonType();
		this.hasTitle = !!this.buttonElement.attr( "title" );

		var that = this,
			options = this.options,
			toggleButton = this.type === "checkbox" || this.type === "radio",
			activeClass = !toggleButton ? "ui-state-active" : "";

		if ( options.label === null ) {
			options.label = (this.type === "input" ? this.buttonElement.val() : this.buttonElement.html());
		}

		this._hoverable( this.buttonElement );

		this.buttonElement
			.addClass( baseClasses )
			.attr( "role", "button" )
			.bind( "mouseenter" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return;
				}
				if ( this === lastActive ) {
					$( this ).addClass( "ui-state-active" );
				}
			})
			.bind( "mouseleave" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return;
				}
				$( this ).removeClass( activeClass );
			})
			.bind( "click" + this.eventNamespace, function( event ) {
				if ( options.disabled ) {
					event.preventDefault();
					event.stopImmediatePropagation();
				}
			});

		// Can't use _focusable() because the element that receives focus
		// and the element that gets the ui-state-focus class are different
		this._on({
			focus: function() {
				this.buttonElement.addClass( "ui-state-focus" );
			},
			blur: function() {
				this.buttonElement.removeClass( "ui-state-focus" );
			}
		});

		if ( toggleButton ) {
			this.element.bind( "change" + this.eventNamespace, function() {
				that.refresh();
			});
		}

		if ( this.type === "checkbox" ) {
			this.buttonElement.bind( "click" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return false;
				}
			});
		} else if ( this.type === "radio" ) {
			this.buttonElement.bind( "click" + this.eventNamespace, function() {
				if ( options.disabled ) {
					return false;
				}
				$( this ).addClass( "ui-state-active" );
				that.buttonElement.attr( "aria-pressed", "true" );

				var radio = that.element[ 0 ];
				radioGroup( radio )
					.not( radio )
					.map(function() {
						return $( this ).button( "widget" )[ 0 ];
					})
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			});
		} else {
			this.buttonElement
				.bind( "mousedown" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).addClass( "ui-state-active" );
					lastActive = this;
					that.document.one( "mouseup", function() {
						lastActive = null;
					});
				})
				.bind( "mouseup" + this.eventNamespace, function() {
					if ( options.disabled ) {
						return false;
					}
					$( this ).removeClass( "ui-state-active" );
				})
				.bind( "keydown" + this.eventNamespace, function(event) {
					if ( options.disabled ) {
						return false;
					}
					if ( event.keyCode === $.ui.keyCode.SPACE || event.keyCode === $.ui.keyCode.ENTER ) {
						$( this ).addClass( "ui-state-active" );
					}
				})
				// see #8559, we bind to blur here in case the button element loses
				// focus between keydown and keyup, it would be left in an "active" state
				.bind( "keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
					$( this ).removeClass( "ui-state-active" );
				});

			if ( this.buttonElement.is("a") ) {
				this.buttonElement.keyup(function(event) {
					if ( event.keyCode === $.ui.keyCode.SPACE ) {
						// TODO pass through original event correctly (just as 2nd argument doesn't work)
						$( this ).click();
					}
				});
			}
		}

		this._setOption( "disabled", options.disabled );
		this._resetButton();
	},

	_determineButtonType: function() {
		var ancestor, labelSelector, checked;

		if ( this.element.is("[type=checkbox]") ) {
			this.type = "checkbox";
		} else if ( this.element.is("[type=radio]") ) {
			this.type = "radio";
		} else if ( this.element.is("input") ) {
			this.type = "input";
		} else {
			this.type = "button";
		}

		if ( this.type === "checkbox" || this.type === "radio" ) {
			// we don't search against the document in case the element
			// is disconnected from the DOM
			ancestor = this.element.parents().last();
			labelSelector = "label[for='" + this.element.attr("id") + "']";
			this.buttonElement = ancestor.find( labelSelector );
			if ( !this.buttonElement.length ) {
				ancestor = ancestor.length ? ancestor.siblings() : this.element.siblings();
				this.buttonElement = ancestor.filter( labelSelector );
				if ( !this.buttonElement.length ) {
					this.buttonElement = ancestor.find( labelSelector );
				}
			}
			this.element.addClass( "ui-helper-hidden-accessible" );

			checked = this.element.is( ":checked" );
			if ( checked ) {
				this.buttonElement.addClass( "ui-state-active" );
			}
			this.buttonElement.prop( "aria-pressed", checked );
		} else {
			this.buttonElement = this.element;
		}
	},

	widget: function() {
		return this.buttonElement;
	},

	_destroy: function() {
		this.element
			.removeClass( "ui-helper-hidden-accessible" );
		this.buttonElement
			.removeClass( baseClasses + " ui-state-active " + typeClasses )
			.removeAttr( "role" )
			.removeAttr( "aria-pressed" )
			.html( this.buttonElement.find(".ui-button-text").html() );

		if ( !this.hasTitle ) {
			this.buttonElement.removeAttr( "title" );
		}
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "disabled" ) {
			this.widget().toggleClass( "ui-state-disabled", !!value );
			this.element.prop( "disabled", !!value );
			if ( value ) {
				if ( this.type === "checkbox" || this.type === "radio" ) {
					this.buttonElement.removeClass( "ui-state-focus" );
				} else {
					this.buttonElement.removeClass( "ui-state-focus ui-state-active" );
				}
			}
			return;
		}
		this._resetButton();
	},

	refresh: function() {
		//See #8237 & #8828
		var isDisabled = this.element.is( "input, button" ) ? this.element.is( ":disabled" ) : this.element.hasClass( "ui-button-disabled" );

		if ( isDisabled !== this.options.disabled ) {
			this._setOption( "disabled", isDisabled );
		}
		if ( this.type === "radio" ) {
			radioGroup( this.element[0] ).each(function() {
				if ( $( this ).is( ":checked" ) ) {
					$( this ).button( "widget" )
						.addClass( "ui-state-active" )
						.attr( "aria-pressed", "true" );
				} else {
					$( this ).button( "widget" )
						.removeClass( "ui-state-active" )
						.attr( "aria-pressed", "false" );
				}
			});
		} else if ( this.type === "checkbox" ) {
			if ( this.element.is( ":checked" ) ) {
				this.buttonElement
					.addClass( "ui-state-active" )
					.attr( "aria-pressed", "true" );
			} else {
				this.buttonElement
					.removeClass( "ui-state-active" )
					.attr( "aria-pressed", "false" );
			}
		}
	},

	_resetButton: function() {
		if ( this.type === "input" ) {
			if ( this.options.label ) {
				this.element.val( this.options.label );
			}
			return;
		}
		var buttonElement = this.buttonElement.removeClass( typeClasses ),
			buttonText = $( "<span></span>", this.document[0] )
				.addClass( "ui-button-text" )
				.html( this.options.label )
				.appendTo( buttonElement.empty() )
				.text(),
			icons = this.options.icons,
			multipleIcons = icons.primary && icons.secondary,
			buttonClasses = [];

		if ( icons.primary || icons.secondary ) {
			if ( this.options.text ) {
				buttonClasses.push( "ui-button-text-icon" + ( multipleIcons ? "s" : ( icons.primary ? "-primary" : "-secondary" ) ) );
			}

			if ( icons.primary ) {
				buttonElement.prepend( "<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>" );
			}

			if ( icons.secondary ) {
				buttonElement.append( "<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>" );
			}

			if ( !this.options.text ) {
				buttonClasses.push( multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only" );

				if ( !this.hasTitle ) {
					buttonElement.attr( "title", $.trim( buttonText ) );
				}
			}
		} else {
			buttonClasses.push( "ui-button-text-only" );
		}
		buttonElement.addClass( buttonClasses.join( " " ) );
	}
});

$.widget( "ui.buttonset", {
	version: "1.11.1",
	options: {
		items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
	},

	_create: function() {
		this.element.addClass( "ui-buttonset" );
	},

	_init: function() {
		this.refresh();
	},

	_setOption: function( key, value ) {
		if ( key === "disabled" ) {
			this.buttons.button( "option", key, value );
		}

		this._super( key, value );
	},

	refresh: function() {
		var rtl = this.element.css( "direction" ) === "rtl",
			allButtons = this.element.find( this.options.items ),
			existingButtons = allButtons.filter( ":ui-button" );

		// Initialize new buttons
		allButtons.not( ":ui-button" ).button();

		// Refresh existing buttons
		existingButtons.button( "refresh" );

		this.buttons = allButtons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-all ui-corner-left ui-corner-right" )
				.filter( ":first" )
					.addClass( rtl ? "ui-corner-right" : "ui-corner-left" )
				.end()
				.filter( ":last" )
					.addClass( rtl ? "ui-corner-left" : "ui-corner-right" )
				.end()
			.end();
	},

	_destroy: function() {
		this.element.removeClass( "ui-buttonset" );
		this.buttons
			.map(function() {
				return $( this ).button( "widget" )[ 0 ];
			})
				.removeClass( "ui-corner-left ui-corner-right" )
			.end()
			.button( "destroy" );
	}
});

return $.ui.button;

}));



/*!
 * jQuery UI Mouse 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/mouse/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./widget"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

var mouseHandled = false;
$( document ).mouseup( function() {
	mouseHandled = false;
});

return $.widget("ui.mouse", {
	version: "1.11.1",
	options: {
		cancel: "input,textarea,button,select,option",
		distance: 1,
		delay: 0
	},
	_mouseInit: function() {
		var that = this;

		this.element
			.bind("mousedown." + this.widgetName, function(event) {
				return that._mouseDown(event);
			})
			.bind("click." + this.widgetName, function(event) {
				if (true === $.data(event.target, that.widgetName + ".preventClickEvent")) {
					$.removeData(event.target, that.widgetName + ".preventClickEvent");
					event.stopImmediatePropagation();
					return false;
				}
			});

		this.started = false;
	},

	// TODO: make sure destroying one instance of mouse doesn't mess with
	// other instances of mouse
	_mouseDestroy: function() {
		this.element.unbind("." + this.widgetName);
		if ( this._mouseMoveDelegate ) {
			this.document
				.unbind("mousemove." + this.widgetName, this._mouseMoveDelegate)
				.unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
		}
	},

	_mouseDown: function(event) {
		// don't let more than one widget handle mouseStart
		if ( mouseHandled ) {
			return;
		}

		// we may have missed mouseup (out of window)
		(this._mouseStarted && this._mouseUp(event));

		this._mouseDownEvent = event;

		var that = this,
			btnIsLeft = (event.which === 1),
			// event.target.nodeName works around a bug in IE 8 with
			// disabled inputs (#7620)
			elIsCancel = (typeof this.options.cancel === "string" && event.target.nodeName ? $(event.target).closest(this.options.cancel).length : false);
		if (!btnIsLeft || elIsCancel || !this._mouseCapture(event)) {
			return true;
		}

		this.mouseDelayMet = !this.options.delay;
		if (!this.mouseDelayMet) {
			this._mouseDelayTimer = setTimeout(function() {
				that.mouseDelayMet = true;
			}, this.options.delay);
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted = (this._mouseStart(event) !== false);
			if (!this._mouseStarted) {
				event.preventDefault();
				return true;
			}
		}

		// Click event may never have fired (Gecko & Opera)
		if (true === $.data(event.target, this.widgetName + ".preventClickEvent")) {
			$.removeData(event.target, this.widgetName + ".preventClickEvent");
		}

		// these delegates are required to keep context
		this._mouseMoveDelegate = function(event) {
			return that._mouseMove(event);
		};
		this._mouseUpDelegate = function(event) {
			return that._mouseUp(event);
		};

		this.document
			.bind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.bind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		event.preventDefault();

		mouseHandled = true;
		return true;
	},

	_mouseMove: function(event) {
		// IE mouseup check - mouseup happened when mouse was out of window
		if ($.ui.ie && ( !document.documentMode || document.documentMode < 9 ) && !event.button) {
			return this._mouseUp(event);

		// Iframe mouseup check - mouseup occurred in another document
		} else if ( !event.which ) {
			return this._mouseUp( event );
		}

		if (this._mouseStarted) {
			this._mouseDrag(event);
			return event.preventDefault();
		}

		if (this._mouseDistanceMet(event) && this._mouseDelayMet(event)) {
			this._mouseStarted =
				(this._mouseStart(this._mouseDownEvent, event) !== false);
			(this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event));
		}

		return !this._mouseStarted;
	},

	_mouseUp: function(event) {
		this.document
			.unbind( "mousemove." + this.widgetName, this._mouseMoveDelegate )
			.unbind( "mouseup." + this.widgetName, this._mouseUpDelegate );

		if (this._mouseStarted) {
			this._mouseStarted = false;

			if (event.target === this._mouseDownEvent.target) {
				$.data(event.target, this.widgetName + ".preventClickEvent", true);
			}

			this._mouseStop(event);
		}

		mouseHandled = false;
		return false;
	},

	_mouseDistanceMet: function(event) {
		return (Math.max(
				Math.abs(this._mouseDownEvent.pageX - event.pageX),
				Math.abs(this._mouseDownEvent.pageY - event.pageY)
			) >= this.options.distance
		);
	},

	_mouseDelayMet: function(/* event */) {
		return this.mouseDelayMet;
	},

	// These are placeholder methods, to be overriden by extending plugin
	_mouseStart: function(/* event */) {},
	_mouseDrag: function(/* event */) {},
	_mouseStop: function(/* event */) {},
	_mouseCapture: function(/* event */) { return true; }
});

}));




/*!
 * jQuery UI Draggable 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/draggable/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./core",
			"./mouse",
			"./widget"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

$.widget("ui.draggable", $.ui.mouse, {
	version: "1.11.1",
	widgetEventPrefix: "drag",
	options: {
		addClasses: true,
		appendTo: "parent",
		axis: false,
		connectToSortable: false,
		containment: false,
		cursor: "auto",
		cursorAt: false,
		grid: false,
		handle: false,
		helper: "original",
		iframeFix: false,
		opacity: false,
		refreshPositions: false,
		revert: false,
		revertDuration: 500,
		scope: "default",
		scroll: true,
		scrollSensitivity: 20,
		scrollSpeed: 20,
		snap: false,
		snapMode: "both",
		snapTolerance: 20,
		stack: false,
		zIndex: false,

		// callbacks
		drag: null,
		start: null,
		stop: null
	},
	_create: function() {

		if (this.options.helper === "original" && !(/^(?:r|a|f)/).test(this.element.css("position"))) {
			this.element[0].style.position = "relative";
		}
		if (this.options.addClasses){
			this.element.addClass("ui-draggable");
		}
		if (this.options.disabled){
			this.element.addClass("ui-draggable-disabled");
		}
		this._setHandleClassName();

		this._mouseInit();
	},

	_setOption: function( key, value ) {
		this._super( key, value );
		if ( key === "handle" ) {
			this._removeHandleClassName();
			this._setHandleClassName();
		}
	},

	_destroy: function() {
		if ( ( this.helper || this.element ).is( ".ui-draggable-dragging" ) ) {
			this.destroyOnClear = true;
			return;
		}
		this.element.removeClass( "ui-draggable ui-draggable-dragging ui-draggable-disabled" );
		this._removeHandleClassName();
		this._mouseDestroy();
	},

	_mouseCapture: function(event) {

		var document = this.document[ 0 ],
			o = this.options;

		// support: IE9
		// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
		try {
			// Support: IE9+
			// If the <body> is blurred, IE will switch windows, see #9520
			if ( document.activeElement && document.activeElement.nodeName.toLowerCase() !== "body" ) {
				// Blur any element that currently has focus, see #4261
				$( document.activeElement ).blur();
			}
		} catch ( error ) {}

		// among others, prevent a drag on a resizable-handle
		if (this.helper || o.disabled || $(event.target).closest(".ui-resizable-handle").length > 0) {
			return false;
		}

		//Quit if we're not on a valid handle
		this.handle = this._getHandle(event);
		if (!this.handle) {
			return false;
		}

		$(o.iframeFix === true ? "iframe" : o.iframeFix).each(function() {
			$("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>")
			.css({
				width: this.offsetWidth + "px", height: this.offsetHeight + "px",
				position: "absolute", opacity: "0.001", zIndex: 1000
			})
			.css($(this).offset())
			.appendTo("body");
		});

		return true;

	},

	_mouseStart: function(event) {

		var o = this.options;

		//Create and append the visible helper
		this.helper = this._createHelper(event);

		this.helper.addClass("ui-draggable-dragging");

		//Cache the helper size
		this._cacheHelperProportions();

		//If ddmanager is used for droppables, set the global draggable
		if ($.ui.ddmanager) {
			$.ui.ddmanager.current = this;
		}

		/*
		 * - Position generation -
		 * This block generates everything position related - it's the core of draggables.
		 */

		//Cache the margins of the original element
		this._cacheMargins();

		//Store the helper's css position
		this.cssPosition = this.helper.css( "position" );
		this.scrollParent = this.helper.scrollParent( true );
		this.offsetParent = this.helper.offsetParent();
		this.offsetParentCssPosition = this.offsetParent.css( "position" );

		//The element's absolute position on the page minus margins
		this.offset = this.positionAbs = this.element.offset();
		this.offset = {
			top: this.offset.top - this.margins.top,
			left: this.offset.left - this.margins.left
		};

		//Reset scroll cache
		this.offset.scroll = false;

		$.extend(this.offset, {
			click: { //Where the click happened, relative to the element
				left: event.pageX - this.offset.left,
				top: event.pageY - this.offset.top
			},
			parent: this._getParentOffset(),
			relative: this._getRelativeOffset() //This is a relative to absolute position minus the actual position calculation - only used for relative positioned helper
		});

		//Generate the original position
		this.originalPosition = this.position = this._generatePosition( event, false );
		this.originalPageX = event.pageX;
		this.originalPageY = event.pageY;

		//Adjust the mouse offset relative to the helper if "cursorAt" is supplied
		(o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt));

		//Set a containment if given in the options
		this._setContainment();

		//Trigger event + callbacks
		if (this._trigger("start", event) === false) {
			this._clear();
			return false;
		}

		//Recache the helper size
		this._cacheHelperProportions();

		//Prepare the droppable offsets
		if ($.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(this, event);
		}

		this._mouseDrag(event, true); //Execute the drag once - this causes the helper not to be visible before getting its correct position

		//If the ddmanager is used for droppables, inform the manager that dragging has started (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStart(this, event);
		}

		return true;
	},

	_mouseDrag: function(event, noPropagation) {
		// reset any necessary cached properties (see #5009)
		if ( this.offsetParentCssPosition === "fixed" ) {
			this.offset.parent = this._getParentOffset();
		}

		//Compute the helpers position
		this.position = this._generatePosition( event, true );
		this.positionAbs = this._convertPositionTo("absolute");

		//Call plugins and callbacks and use the resulting position if something is returned
		if (!noPropagation) {
			var ui = this._uiHash();
			if (this._trigger("drag", event, ui) === false) {
				this._mouseUp({});
				return false;
			}
			this.position = ui.position;
		}

		this.helper[ 0 ].style.left = this.position.left + "px";
		this.helper[ 0 ].style.top = this.position.top + "px";

		if ($.ui.ddmanager) {
			$.ui.ddmanager.drag(this, event);
		}

		return false;
	},

	_mouseStop: function(event) {

		//If we are using droppables, inform the manager about the drop
		var that = this,
			dropped = false;
		if ($.ui.ddmanager && !this.options.dropBehaviour) {
			dropped = $.ui.ddmanager.drop(this, event);
		}

		//if a drop comes from outside (a sortable)
		if (this.dropped) {
			dropped = this.dropped;
			this.dropped = false;
		}

		if ((this.options.revert === "invalid" && !dropped) || (this.options.revert === "valid" && dropped) || this.options.revert === true || ($.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped))) {
			$(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
				if (that._trigger("stop", event) !== false) {
					that._clear();
				}
			});
		} else {
			if (this._trigger("stop", event) !== false) {
				this._clear();
			}
		}

		return false;
	},

	_mouseUp: function(event) {
		//Remove frame helpers
		$("div.ui-draggable-iframeFix").each(function() {
			this.parentNode.removeChild(this);
		});

		//If the ddmanager is used for droppables, inform the manager that dragging has stopped (see #5003)
		if ( $.ui.ddmanager ) {
			$.ui.ddmanager.dragStop(this, event);
		}

		// The interaction is over; whether or not the click resulted in a drag, focus the element
		this.element.focus();

		return $.ui.mouse.prototype._mouseUp.call(this, event);
	},

	cancel: function() {

		if (this.helper.is(".ui-draggable-dragging")) {
			this._mouseUp({});
		} else {
			this._clear();
		}

		return this;

	},

	_getHandle: function(event) {
		return this.options.handle ?
			!!$( event.target ).closest( this.element.find( this.options.handle ) ).length :
			true;
	},

	_setHandleClassName: function() {
		this.handleElement = this.options.handle ?
			this.element.find( this.options.handle ) : this.element;
		this.handleElement.addClass( "ui-draggable-handle" );
	},

	_removeHandleClassName: function() {
		this.handleElement.removeClass( "ui-draggable-handle" );
	},

	_createHelper: function(event) {

		var o = this.options,
			helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[ 0 ], [ event ])) : (o.helper === "clone" ? this.element.clone().removeAttr("id") : this.element);

		if (!helper.parents("body").length) {
			helper.appendTo((o.appendTo === "parent" ? this.element[0].parentNode : o.appendTo));
		}

		if (helper[0] !== this.element[0] && !(/(fixed|absolute)/).test(helper.css("position"))) {
			helper.css("position", "absolute");
		}

		return helper;

	},

	_adjustOffsetFromHelper: function(obj) {
		if (typeof obj === "string") {
			obj = obj.split(" ");
		}
		if ($.isArray(obj)) {
			obj = { left: +obj[0], top: +obj[1] || 0 };
		}
		if ("left" in obj) {
			this.offset.click.left = obj.left + this.margins.left;
		}
		if ("right" in obj) {
			this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left;
		}
		if ("top" in obj) {
			this.offset.click.top = obj.top + this.margins.top;
		}
		if ("bottom" in obj) {
			this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top;
		}
	},

	_isRootNode: function( element ) {
		return ( /(html|body)/i ).test( element.tagName ) || element === this.document[ 0 ];
	},

	_getParentOffset: function() {

		//Get the offsetParent and cache its position
		var po = this.offsetParent.offset(),
			document = this.document[ 0 ];

		// This is a special case where we need to modify a offset calculated on start, since the following happened:
		// 1. The position of the helper is absolute, so it's position is calculated based on the next positioned parent
		// 2. The actual offset parent is a child of the scroll parent, and the scroll parent isn't the document, which means that
		//    the scroll is included in the initial calculation of the offset of the parent, and never recalculated upon drag
		if (this.cssPosition === "absolute" && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0])) {
			po.left += this.scrollParent.scrollLeft();
			po.top += this.scrollParent.scrollTop();
		}

		if ( this._isRootNode( this.offsetParent[ 0 ] ) ) {
			po = { top: 0, left: 0 };
		}

		return {
			top: po.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
			left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
		};

	},

	_getRelativeOffset: function() {
		if ( this.cssPosition !== "relative" ) {
			return { top: 0, left: 0 };
		}

		var p = this.element.position(),
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: p.top - ( parseInt(this.helper.css( "top" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollTop() : 0 ),
			left: p.left - ( parseInt(this.helper.css( "left" ), 10) || 0 ) + ( !scrollIsRootNode ? this.scrollParent.scrollLeft() : 0 )
		};

	},

	_cacheMargins: function() {
		this.margins = {
			left: (parseInt(this.element.css("marginLeft"), 10) || 0),
			top: (parseInt(this.element.css("marginTop"), 10) || 0),
			right: (parseInt(this.element.css("marginRight"), 10) || 0),
			bottom: (parseInt(this.element.css("marginBottom"), 10) || 0)
		};
	},

	_cacheHelperProportions: function() {
		this.helperProportions = {
			width: this.helper.outerWidth(),
			height: this.helper.outerHeight()
		};
	},

	_setContainment: function() {

		var over, c, ce,
			o = this.options,
			document = this.document[ 0 ];

		this.relativeContainer = null;

		if ( !o.containment ) {
			this.containment = null;
			return;
		}

		if ( o.containment === "window" ) {
			this.containment = [
				$( window ).scrollLeft() - this.offset.relative.left - this.offset.parent.left,
				$( window ).scrollTop() - this.offset.relative.top - this.offset.parent.top,
				$( window ).scrollLeft() + $( window ).width() - this.helperProportions.width - this.margins.left,
				$( window ).scrollTop() + ( $( window ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment === "document") {
			this.containment = [
				0,
				0,
				$( document ).width() - this.helperProportions.width - this.margins.left,
				( $( document ).height() || document.body.parentNode.scrollHeight ) - this.helperProportions.height - this.margins.top
			];
			return;
		}

		if ( o.containment.constructor === Array ) {
			this.containment = o.containment;
			return;
		}

		if ( o.containment === "parent" ) {
			o.containment = this.helper[ 0 ].parentNode;
		}

		c = $( o.containment );
		ce = c[ 0 ];

		if ( !ce ) {
			return;
		}

		over = c.css( "overflow" ) !== "hidden";

		this.containment = [
			( parseInt( c.css( "borderLeftWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingLeft" ), 10 ) || 0 ),
			( parseInt( c.css( "borderTopWidth" ), 10 ) || 0 ) + ( parseInt( c.css( "paddingTop" ), 10 ) || 0 ),
			( over ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) - ( parseInt( c.css( "borderRightWidth" ), 10 ) || 0 ) - ( parseInt( c.css( "paddingRight" ), 10 ) || 0 ) - this.helperProportions.width - this.margins.left - this.margins.right,
			( over ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) - ( parseInt( c.css( "borderBottomWidth" ), 10 ) || 0 ) - ( parseInt( c.css( "paddingBottom" ), 10 ) || 0 ) - this.helperProportions.height - this.margins.top  - this.margins.bottom
		];
		this.relativeContainer = c;
	},

	_convertPositionTo: function(d, pos) {

		if (!pos) {
			pos = this.position;
		}

		var mod = d === "absolute" ? 1 : -1,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] );

		return {
			top: (
				pos.top	+																// The absolute mouse position
				this.offset.relative.top * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top * mod -										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) ) * mod)
			),
			left: (
				pos.left +																// The absolute mouse position
				this.offset.relative.left * mod +										// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left * mod	-										// The offsetParent's offset without borders (offset + border)
				( ( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) ) * mod)
			)
		};

	},

	_generatePosition: function( event, constrainPosition ) {

		var containment, co, top, left,
			o = this.options,
			scrollIsRootNode = this._isRootNode( this.scrollParent[ 0 ] ),
			pageX = event.pageX,
			pageY = event.pageY;

		// Cache the scroll
		if ( !scrollIsRootNode || !this.offset.scroll ) {
			this.offset.scroll = {
				top: this.scrollParent.scrollTop(),
				left: this.scrollParent.scrollLeft()
			};
		}

		/*
		 * - Position constraining -
		 * Constrain the position to a mix of grid, containment.
		 */

		// If we are not dragging yet, we won't check for options
		if ( constrainPosition ) {
			if ( this.containment ) {
				if ( this.relativeContainer ){
					co = this.relativeContainer.offset();
					containment = [
						this.containment[ 0 ] + co.left,
						this.containment[ 1 ] + co.top,
						this.containment[ 2 ] + co.left,
						this.containment[ 3 ] + co.top
					];
				} else {
					containment = this.containment;
				}

				if (event.pageX - this.offset.click.left < containment[0]) {
					pageX = containment[0] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top < containment[1]) {
					pageY = containment[1] + this.offset.click.top;
				}
				if (event.pageX - this.offset.click.left > containment[2]) {
					pageX = containment[2] + this.offset.click.left;
				}
				if (event.pageY - this.offset.click.top > containment[3]) {
					pageY = containment[3] + this.offset.click.top;
				}
			}

			if (o.grid) {
				//Check for grid elements set to 0 to prevent divide by 0 error causing invalid argument errors in IE (see ticket #6950)
				top = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY;
				pageY = containment ? ((top - this.offset.click.top >= containment[1] || top - this.offset.click.top > containment[3]) ? top : ((top - this.offset.click.top >= containment[1]) ? top - o.grid[1] : top + o.grid[1])) : top;

				left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX;
				pageX = containment ? ((left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2]) ? left : ((left - this.offset.click.left >= containment[0]) ? left - o.grid[0] : left + o.grid[0])) : left;
			}

			if ( o.axis === "y" ) {
				pageX = this.originalPageX;
			}

			if ( o.axis === "x" ) {
				pageY = this.originalPageY;
			}
		}

		return {
			top: (
				pageY -																	// The absolute mouse position
				this.offset.click.top	-												// Click offset (relative to the element)
				this.offset.relative.top -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.top +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.top : ( scrollIsRootNode ? 0 : this.offset.scroll.top ) )
			),
			left: (
				pageX -																	// The absolute mouse position
				this.offset.click.left -												// Click offset (relative to the element)
				this.offset.relative.left -												// Only for relative positioned nodes: Relative offset from element to offset parent
				this.offset.parent.left +												// The offsetParent's offset without borders (offset + border)
				( this.cssPosition === "fixed" ? -this.offset.scroll.left : ( scrollIsRootNode ? 0 : this.offset.scroll.left ) )
			)
		};

	},

	_clear: function() {
		this.helper.removeClass("ui-draggable-dragging");
		if (this.helper[0] !== this.element[0] && !this.cancelHelperRemoval) {
			this.helper.remove();
		}
		this.helper = null;
		this.cancelHelperRemoval = false;
		if ( this.destroyOnClear ) {
			this.destroy();
		}
	},

	// From now on bulk stuff - mainly helpers

	_trigger: function(type, event, ui) {
		ui = ui || this._uiHash();
		$.ui.plugin.call( this, type, [ event, ui, this ], true );
		//The absolute position has to be recalculated after plugins
		if (type === "drag") {
			this.positionAbs = this._convertPositionTo("absolute");
		}
		return $.Widget.prototype._trigger.call(this, type, event, ui);
	},

	plugins: {},

	_uiHash: function() {
		return {
			helper: this.helper,
			position: this.position,
			originalPosition: this.originalPosition,
			offset: this.positionAbs
		};
	}

});

$.ui.plugin.add("draggable", "connectToSortable", {
	start: function( event, ui, inst ) {

		var o = inst.options,
			uiSortable = $.extend({}, ui, { item: inst.element });
		inst.sortables = [];
		$(o.connectToSortable).each(function() {
			var sortable = $( this ).sortable( "instance" );
			if (sortable && !sortable.options.disabled) {
				inst.sortables.push({
					instance: sortable,
					shouldRevert: sortable.options.revert
				});
				sortable.refreshPositions();	// Call the sortable's refreshPositions at drag start to refresh the containerCache since the sortable container cache is used in drag and needs to be up to date (this will ensure it's initialised as well as being kept in step with any changes that might have happened on the page).
				sortable._trigger("activate", event, uiSortable);
			}
		});

	},
	stop: function( event, ui, inst ) {

		//If we are still over the sortable, we fake the stop event of the sortable, but also remove helper
		var uiSortable = $.extend( {}, ui, {
			item: inst.element
		});

		$.each(inst.sortables, function() {
			if (this.instance.isOver) {

				this.instance.isOver = 0;

				inst.cancelHelperRemoval = true; //Don't remove the helper in the draggable instance
				this.instance.cancelHelperRemoval = false; //Remove it in the sortable instance (so sortable plugins like revert still work)

				//The sortable revert is supported, and we have to set a temporary dropped variable on the draggable to support revert: "valid/invalid"
				if (this.shouldRevert) {
					this.instance.options.revert = this.shouldRevert;
				}

				//Trigger the stop of the sortable
				this.instance._mouseStop(event);

				this.instance.options.helper = this.instance.options._helper;

				//If the helper has been the original item, restore properties in the sortable
				if (inst.options.helper === "original") {
					this.instance.currentItem.css({ top: "auto", left: "auto" });
				}

			} else {
				this.instance.cancelHelperRemoval = false; //Remove the helper in the sortable instance
				this.instance._trigger("deactivate", event, uiSortable);
			}

		});

	},
	drag: function( event, ui, inst ) {

		var that = this;

		$.each(inst.sortables, function() {

			var innermostIntersecting = false,
				thisSortable = this;

			//Copy over some variables to allow calling the sortable's native _intersectsWith
			this.instance.positionAbs = inst.positionAbs;
			this.instance.helperProportions = inst.helperProportions;
			this.instance.offset.click = inst.offset.click;

			if (this.instance._intersectsWith(this.instance.containerCache)) {
				innermostIntersecting = true;
				$.each(inst.sortables, function() {
					this.instance.positionAbs = inst.positionAbs;
					this.instance.helperProportions = inst.helperProportions;
					this.instance.offset.click = inst.offset.click;
					if (this !== thisSortable &&
						this.instance._intersectsWith(this.instance.containerCache) &&
						$.contains(thisSortable.instance.element[0], this.instance.element[0])
					) {
						innermostIntersecting = false;
					}
					return innermostIntersecting;
				});
			}

			if (innermostIntersecting) {
				//If it intersects, we use a little isOver variable and set it once, so our move-in stuff gets fired only once
				if (!this.instance.isOver) {

					this.instance.isOver = 1;
					//Now we fake the start of dragging for the sortable instance,
					//by cloning the list group item, appending it to the sortable and using it as inst.currentItem
					//We can then fire the start event of the sortable with our passed browser event, and our own helper (so it doesn't create a new one)
					this.instance.currentItem = $(that).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", true);
					this.instance.options._helper = this.instance.options.helper; //Store helper option to later restore it
					this.instance.options.helper = function() { return ui.helper[0]; };

					event.target = this.instance.currentItem[0];
					this.instance._mouseCapture(event, true);
					this.instance._mouseStart(event, true, true);

					//Because the browser event is way off the new appended portlet, we modify a couple of variables to reflect the changes
					this.instance.offset.click.top = inst.offset.click.top;
					this.instance.offset.click.left = inst.offset.click.left;
					this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left;
					this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top;

					inst._trigger("toSortable", event);
					inst.dropped = this.instance.element; //draggable revert needs that
					//hack so receive/update callbacks work (mostly)
					inst.currentItem = inst.element;
					this.instance.fromOutside = inst;

				}

				//Provided we did all the previous steps, we can fire the drag event of the sortable on every draggable drag, when it intersects with the sortable
				if (this.instance.currentItem) {
					this.instance._mouseDrag(event);
				}

			} else {

				//If it doesn't intersect with the sortable, and it intersected before,
				//we fake the drag stop of the sortable, but make sure it doesn't remove the helper by using cancelHelperRemoval
				if (this.instance.isOver) {

					this.instance.isOver = 0;
					this.instance.cancelHelperRemoval = true;

					//Prevent reverting on this forced stop
					this.instance.options.revert = false;

					// The out event needs to be triggered independently
					this.instance._trigger("out", event, this.instance._uiHash(this.instance));

					this.instance._mouseStop(event, true);
					this.instance.options.helper = this.instance.options._helper;

					//Now we remove our currentItem, the list group clone again, and the placeholder, and animate the helper back to it's original size
					this.instance.currentItem.remove();
					if (this.instance.placeholder) {
						this.instance.placeholder.remove();
					}

					inst._trigger("fromSortable", event);
					inst.dropped = false; //draggable revert needs that
				}

			}

		});

	}
});

$.ui.plugin.add("draggable", "cursor", {
	start: function( event, ui, instance ) {
		var t = $( "body" ),
			o = instance.options;

		if (t.css("cursor")) {
			o._cursor = t.css("cursor");
		}
		t.css("cursor", o.cursor);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._cursor) {
			$("body").css("cursor", o._cursor);
		}
	}
});

$.ui.plugin.add("draggable", "opacity", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;
		if (t.css("opacity")) {
			o._opacity = t.css("opacity");
		}
		t.css("opacity", o.opacity);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;
		if (o._opacity) {
			$(ui.helper).css("opacity", o._opacity);
		}
	}
});

$.ui.plugin.add("draggable", "scroll", {
	start: function( event, ui, i ) {
		if ( !i.scrollParentNotHidden ) {
			i.scrollParentNotHidden = i.helper.scrollParent( false );
		}

		if ( i.scrollParentNotHidden[ 0 ] !== i.document[ 0 ] && i.scrollParentNotHidden[ 0 ].tagName !== "HTML" ) {
			i.overflowOffset = i.scrollParentNotHidden.offset();
		}
	},
	drag: function( event, ui, i  ) {

		var o = i.options,
			scrolled = false,
			scrollParent = i.scrollParentNotHidden[ 0 ],
			document = i.document[ 0 ];

		if ( scrollParent !== document && scrollParent.tagName !== "HTML" ) {
			if ( !o.axis || o.axis !== "x" ) {
				if ( ( i.overflowOffset.top + scrollParent.offsetHeight ) - event.pageY < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop + o.scrollSpeed;
				} else if ( event.pageY - i.overflowOffset.top < o.scrollSensitivity ) {
					scrollParent.scrollTop = scrolled = scrollParent.scrollTop - o.scrollSpeed;
				}
			}

			if ( !o.axis || o.axis !== "y" ) {
				if ( ( i.overflowOffset.left + scrollParent.offsetWidth ) - event.pageX < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft + o.scrollSpeed;
				} else if ( event.pageX - i.overflowOffset.left < o.scrollSensitivity ) {
					scrollParent.scrollLeft = scrolled = scrollParent.scrollLeft - o.scrollSpeed;
				}
			}

		} else {

			if (!o.axis || o.axis !== "x") {
				if (event.pageY - $(document).scrollTop() < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
				} else if ($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity) {
					scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);
				}
			}

			if (!o.axis || o.axis !== "y") {
				if (event.pageX - $(document).scrollLeft() < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
				} else if ($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity) {
					scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);
				}
			}

		}

		if (scrolled !== false && $.ui.ddmanager && !o.dropBehaviour) {
			$.ui.ddmanager.prepareOffsets(i, event);
		}

	}
});

$.ui.plugin.add("draggable", "snap", {
	start: function( event, ui, i ) {

		var o = i.options;

		i.snapElements = [];

		$(o.snap.constructor !== String ? ( o.snap.items || ":data(ui-draggable)" ) : o.snap).each(function() {
			var $t = $(this),
				$o = $t.offset();
			if (this !== i.element[0]) {
				i.snapElements.push({
					item: this,
					width: $t.outerWidth(), height: $t.outerHeight(),
					top: $o.top, left: $o.left
				});
			}
		});

	},
	drag: function( event, ui, inst ) {

		var ts, bs, ls, rs, l, r, t, b, i, first,
			o = inst.options,
			d = o.snapTolerance,
			x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width,
			y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height;

		for (i = inst.snapElements.length - 1; i >= 0; i--){

			l = inst.snapElements[i].left;
			r = l + inst.snapElements[i].width;
			t = inst.snapElements[i].top;
			b = t + inst.snapElements[i].height;

			if ( x2 < l - d || x1 > r + d || y2 < t - d || y1 > b + d || !$.contains( inst.snapElements[ i ].item.ownerDocument, inst.snapElements[ i ].item ) ) {
				if (inst.snapElements[i].snapping) {
					(inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
				}
				inst.snapElements[i].snapping = false;
				continue;
			}

			if (o.snapMode !== "inner") {
				ts = Math.abs(t - y2) <= d;
				bs = Math.abs(b - y1) <= d;
				ls = Math.abs(l - x2) <= d;
				rs = Math.abs(r - x1) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b, left: 0 }).top - inst.margins.top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l - inst.helperProportions.width }).left - inst.margins.left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r }).left - inst.margins.left;
				}
			}

			first = (ts || bs || ls || rs);

			if (o.snapMode !== "outer") {
				ts = Math.abs(t - y1) <= d;
				bs = Math.abs(b - y2) <= d;
				ls = Math.abs(l - x1) <= d;
				rs = Math.abs(r - x2) <= d;
				if (ts) {
					ui.position.top = inst._convertPositionTo("relative", { top: t, left: 0 }).top - inst.margins.top;
				}
				if (bs) {
					ui.position.top = inst._convertPositionTo("relative", { top: b - inst.helperProportions.height, left: 0 }).top - inst.margins.top;
				}
				if (ls) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: l }).left - inst.margins.left;
				}
				if (rs) {
					ui.position.left = inst._convertPositionTo("relative", { top: 0, left: r - inst.helperProportions.width }).left - inst.margins.left;
				}
			}

			if (!inst.snapElements[i].snapping && (ts || bs || ls || rs || first)) {
				(inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), { snapItem: inst.snapElements[i].item })));
			}
			inst.snapElements[i].snapping = (ts || bs || ls || rs || first);

		}

	}
});

$.ui.plugin.add("draggable", "stack", {
	start: function( event, ui, instance ) {
		var min,
			o = instance.options,
			group = $.makeArray($(o.stack)).sort(function(a, b) {
				return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0);
			});

		if (!group.length) { return; }

		min = parseInt($(group[0]).css("zIndex"), 10) || 0;
		$(group).each(function(i) {
			$(this).css("zIndex", min + i);
		});
		this.css("zIndex", (min + group.length));
	}
});

$.ui.plugin.add("draggable", "zIndex", {
	start: function( event, ui, instance ) {
		var t = $( ui.helper ),
			o = instance.options;

		if (t.css("zIndex")) {
			o._zIndex = t.css("zIndex");
		}
		t.css("zIndex", o.zIndex);
	},
	stop: function( event, ui, instance ) {
		var o = instance.options;

		if (o._zIndex) {
			$(ui.helper).css("zIndex", o._zIndex);
		}
	}
});

return $.ui.draggable;

}));
/*!
 * jQuery UI Position 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/position/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {
(function() {

$.ui = $.ui || {};

var cachedScrollbarWidth, supportsOffsetFractions,
	max = Math.max,
	abs = Math.abs,
	round = Math.round,
	rhorizontal = /left|center|right/,
	rvertical = /top|center|bottom/,
	roffset = /[\+\-]\d+(\.[\d]+)?%?/,
	rposition = /^\w+/,
	rpercent = /%$/,
	_position = $.fn.position;

function getOffsets( offsets, width, height ) {
	return [
		parseFloat( offsets[ 0 ] ) * ( rpercent.test( offsets[ 0 ] ) ? width / 100 : 1 ),
		parseFloat( offsets[ 1 ] ) * ( rpercent.test( offsets[ 1 ] ) ? height / 100 : 1 )
	];
}

function parseCss( element, property ) {
	return parseInt( $.css( element, property ), 10 ) || 0;
}

function getDimensions( elem ) {
	var raw = elem[0];
	if ( raw.nodeType === 9 ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: 0, left: 0 }
		};
	}
	if ( $.isWindow( raw ) ) {
		return {
			width: elem.width(),
			height: elem.height(),
			offset: { top: elem.scrollTop(), left: elem.scrollLeft() }
		};
	}
	if ( raw.preventDefault ) {
		return {
			width: 0,
			height: 0,
			offset: { top: raw.pageY, left: raw.pageX }
		};
	}
	return {
		width: elem.outerWidth(),
		height: elem.outerHeight(),
		offset: elem.offset()
	};
}

$.position = {
	scrollbarWidth: function() {
		if ( cachedScrollbarWidth !== undefined ) {
			return cachedScrollbarWidth;
		}
		var w1, w2,
			div = $( "<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>" ),
			innerDiv = div.children()[0];

		$( "body" ).append( div );
		w1 = innerDiv.offsetWidth;
		div.css( "overflow", "scroll" );

		w2 = innerDiv.offsetWidth;

		if ( w1 === w2 ) {
			w2 = div[0].clientWidth;
		}

		div.remove();

		return (cachedScrollbarWidth = w1 - w2);
	},
	getScrollInfo: function( within ) {
		var overflowX = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-x" ),
			overflowY = within.isWindow || within.isDocument ? "" :
				within.element.css( "overflow-y" ),
			hasOverflowX = overflowX === "scroll" ||
				( overflowX === "auto" && within.width < within.element[0].scrollWidth ),
			hasOverflowY = overflowY === "scroll" ||
				( overflowY === "auto" && within.height < within.element[0].scrollHeight );
		return {
			width: hasOverflowY ? $.position.scrollbarWidth() : 0,
			height: hasOverflowX ? $.position.scrollbarWidth() : 0
		};
	},
	getWithinInfo: function( element ) {
		var withinElement = $( element || window ),
			isWindow = $.isWindow( withinElement[0] ),
			isDocument = !!withinElement[ 0 ] && withinElement[ 0 ].nodeType === 9;
		return {
			element: withinElement,
			isWindow: isWindow,
			isDocument: isDocument,
			offset: withinElement.offset() || { left: 0, top: 0 },
			scrollLeft: withinElement.scrollLeft(),
			scrollTop: withinElement.scrollTop(),

			// support: jQuery 1.6.x
			// jQuery 1.6 doesn't support .outerWidth/Height() on documents or windows
			width: isWindow || isDocument ? withinElement.width() : withinElement.outerWidth(),
			height: isWindow || isDocument ? withinElement.height() : withinElement.outerHeight()
		};
	}
};

$.fn.position = function( options ) {
	if ( !options || !options.of ) {
		return _position.apply( this, arguments );
	}

	// make a copy, we don't want to modify arguments
	options = $.extend( {}, options );

	var atOffset, targetWidth, targetHeight, targetOffset, basePosition, dimensions,
		target = $( options.of ),
		within = $.position.getWithinInfo( options.within ),
		scrollInfo = $.position.getScrollInfo( within ),
		collision = ( options.collision || "flip" ).split( " " ),
		offsets = {};

	dimensions = getDimensions( target );
	if ( target[0].preventDefault ) {
		// force left top to allow flipping
		options.at = "left top";
	}
	targetWidth = dimensions.width;
	targetHeight = dimensions.height;
	targetOffset = dimensions.offset;
	// clone to reuse original targetOffset later
	basePosition = $.extend( {}, targetOffset );

	// force my and at to have valid horizontal and vertical positions
	// if a value is missing or invalid, it will be converted to center
	$.each( [ "my", "at" ], function() {
		var pos = ( options[ this ] || "" ).split( " " ),
			horizontalOffset,
			verticalOffset;

		if ( pos.length === 1) {
			pos = rhorizontal.test( pos[ 0 ] ) ?
				pos.concat( [ "center" ] ) :
				rvertical.test( pos[ 0 ] ) ?
					[ "center" ].concat( pos ) :
					[ "center", "center" ];
		}
		pos[ 0 ] = rhorizontal.test( pos[ 0 ] ) ? pos[ 0 ] : "center";
		pos[ 1 ] = rvertical.test( pos[ 1 ] ) ? pos[ 1 ] : "center";

		// calculate offsets
		horizontalOffset = roffset.exec( pos[ 0 ] );
		verticalOffset = roffset.exec( pos[ 1 ] );
		offsets[ this ] = [
			horizontalOffset ? horizontalOffset[ 0 ] : 0,
			verticalOffset ? verticalOffset[ 0 ] : 0
		];

		// reduce to just the positions without the offsets
		options[ this ] = [
			rposition.exec( pos[ 0 ] )[ 0 ],
			rposition.exec( pos[ 1 ] )[ 0 ]
		];
	});

	// normalize collision option
	if ( collision.length === 1 ) {
		collision[ 1 ] = collision[ 0 ];
	}

	if ( options.at[ 0 ] === "right" ) {
		basePosition.left += targetWidth;
	} else if ( options.at[ 0 ] === "center" ) {
		basePosition.left += targetWidth / 2;
	}

	if ( options.at[ 1 ] === "bottom" ) {
		basePosition.top += targetHeight;
	} else if ( options.at[ 1 ] === "center" ) {
		basePosition.top += targetHeight / 2;
	}

	atOffset = getOffsets( offsets.at, targetWidth, targetHeight );
	basePosition.left += atOffset[ 0 ];
	basePosition.top += atOffset[ 1 ];

	return this.each(function() {
		var collisionPosition, using,
			elem = $( this ),
			elemWidth = elem.outerWidth(),
			elemHeight = elem.outerHeight(),
			marginLeft = parseCss( this, "marginLeft" ),
			marginTop = parseCss( this, "marginTop" ),
			collisionWidth = elemWidth + marginLeft + parseCss( this, "marginRight" ) + scrollInfo.width,
			collisionHeight = elemHeight + marginTop + parseCss( this, "marginBottom" ) + scrollInfo.height,
			position = $.extend( {}, basePosition ),
			myOffset = getOffsets( offsets.my, elem.outerWidth(), elem.outerHeight() );

		if ( options.my[ 0 ] === "right" ) {
			position.left -= elemWidth;
		} else if ( options.my[ 0 ] === "center" ) {
			position.left -= elemWidth / 2;
		}

		if ( options.my[ 1 ] === "bottom" ) {
			position.top -= elemHeight;
		} else if ( options.my[ 1 ] === "center" ) {
			position.top -= elemHeight / 2;
		}

		position.left += myOffset[ 0 ];
		position.top += myOffset[ 1 ];

		// if the browser doesn't support fractions, then round for consistent results
		if ( !supportsOffsetFractions ) {
			position.left = round( position.left );
			position.top = round( position.top );
		}

		collisionPosition = {
			marginLeft: marginLeft,
			marginTop: marginTop
		};

		$.each( [ "left", "top" ], function( i, dir ) {
			if ( $.ui.position[ collision[ i ] ] ) {
				$.ui.position[ collision[ i ] ][ dir ]( position, {
					targetWidth: targetWidth,
					targetHeight: targetHeight,
					elemWidth: elemWidth,
					elemHeight: elemHeight,
					collisionPosition: collisionPosition,
					collisionWidth: collisionWidth,
					collisionHeight: collisionHeight,
					offset: [ atOffset[ 0 ] + myOffset[ 0 ], atOffset [ 1 ] + myOffset[ 1 ] ],
					my: options.my,
					at: options.at,
					within: within,
					elem: elem
				});
			}
		});

		if ( options.using ) {
			// adds feedback as second argument to using callback, if present
			using = function( props ) {
				var left = targetOffset.left - position.left,
					right = left + targetWidth - elemWidth,
					top = targetOffset.top - position.top,
					bottom = top + targetHeight - elemHeight,
					feedback = {
						target: {
							element: target,
							left: targetOffset.left,
							top: targetOffset.top,
							width: targetWidth,
							height: targetHeight
						},
						element: {
							element: elem,
							left: position.left,
							top: position.top,
							width: elemWidth,
							height: elemHeight
						},
						horizontal: right < 0 ? "left" : left > 0 ? "right" : "center",
						vertical: bottom < 0 ? "top" : top > 0 ? "bottom" : "middle"
					};
				if ( targetWidth < elemWidth && abs( left + right ) < targetWidth ) {
					feedback.horizontal = "center";
				}
				if ( targetHeight < elemHeight && abs( top + bottom ) < targetHeight ) {
					feedback.vertical = "middle";
				}
				if ( max( abs( left ), abs( right ) ) > max( abs( top ), abs( bottom ) ) ) {
					feedback.important = "horizontal";
				} else {
					feedback.important = "vertical";
				}
				options.using.call( this, props, feedback );
			};
		}

		elem.offset( $.extend( position, { using: using } ) );
	});
};

$.ui.position = {
	fit: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollLeft : within.offset.left,
				outerWidth = within.width,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = withinOffset - collisionPosLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset,
				newOverRight;

			// element is wider than within
			if ( data.collisionWidth > outerWidth ) {
				// element is initially over the left side of within
				if ( overLeft > 0 && overRight <= 0 ) {
					newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset;
					position.left += overLeft - newOverRight;
				// element is initially over right side of within
				} else if ( overRight > 0 && overLeft <= 0 ) {
					position.left = withinOffset;
				// element is initially over both left and right sides of within
				} else {
					if ( overLeft > overRight ) {
						position.left = withinOffset + outerWidth - data.collisionWidth;
					} else {
						position.left = withinOffset;
					}
				}
			// too far left -> align with left edge
			} else if ( overLeft > 0 ) {
				position.left += overLeft;
			// too far right -> align with right edge
			} else if ( overRight > 0 ) {
				position.left -= overRight;
			// adjust based on position and margin
			} else {
				position.left = max( position.left - collisionPosLeft, position.left );
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.isWindow ? within.scrollTop : within.offset.top,
				outerHeight = data.within.height,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = withinOffset - collisionPosTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset,
				newOverBottom;

			// element is taller than within
			if ( data.collisionHeight > outerHeight ) {
				// element is initially over the top of within
				if ( overTop > 0 && overBottom <= 0 ) {
					newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset;
					position.top += overTop - newOverBottom;
				// element is initially over bottom of within
				} else if ( overBottom > 0 && overTop <= 0 ) {
					position.top = withinOffset;
				// element is initially over both top and bottom of within
				} else {
					if ( overTop > overBottom ) {
						position.top = withinOffset + outerHeight - data.collisionHeight;
					} else {
						position.top = withinOffset;
					}
				}
			// too far up -> align with top
			} else if ( overTop > 0 ) {
				position.top += overTop;
			// too far down -> align with bottom edge
			} else if ( overBottom > 0 ) {
				position.top -= overBottom;
			// adjust based on position and margin
			} else {
				position.top = max( position.top - collisionPosTop, position.top );
			}
		}
	},
	flip: {
		left: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.left + within.scrollLeft,
				outerWidth = within.width,
				offsetLeft = within.isWindow ? within.scrollLeft : within.offset.left,
				collisionPosLeft = position.left - data.collisionPosition.marginLeft,
				overLeft = collisionPosLeft - offsetLeft,
				overRight = collisionPosLeft + data.collisionWidth - outerWidth - offsetLeft,
				myOffset = data.my[ 0 ] === "left" ?
					-data.elemWidth :
					data.my[ 0 ] === "right" ?
						data.elemWidth :
						0,
				atOffset = data.at[ 0 ] === "left" ?
					data.targetWidth :
					data.at[ 0 ] === "right" ?
						-data.targetWidth :
						0,
				offset = -2 * data.offset[ 0 ],
				newOverRight,
				newOverLeft;

			if ( overLeft < 0 ) {
				newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - withinOffset;
				if ( newOverRight < 0 || newOverRight < abs( overLeft ) ) {
					position.left += myOffset + atOffset + offset;
				}
			} else if ( overRight > 0 ) {
				newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - offsetLeft;
				if ( newOverLeft > 0 || abs( newOverLeft ) < overRight ) {
					position.left += myOffset + atOffset + offset;
				}
			}
		},
		top: function( position, data ) {
			var within = data.within,
				withinOffset = within.offset.top + within.scrollTop,
				outerHeight = within.height,
				offsetTop = within.isWindow ? within.scrollTop : within.offset.top,
				collisionPosTop = position.top - data.collisionPosition.marginTop,
				overTop = collisionPosTop - offsetTop,
				overBottom = collisionPosTop + data.collisionHeight - outerHeight - offsetTop,
				top = data.my[ 1 ] === "top",
				myOffset = top ?
					-data.elemHeight :
					data.my[ 1 ] === "bottom" ?
						data.elemHeight :
						0,
				atOffset = data.at[ 1 ] === "top" ?
					data.targetHeight :
					data.at[ 1 ] === "bottom" ?
						-data.targetHeight :
						0,
				offset = -2 * data.offset[ 1 ],
				newOverTop,
				newOverBottom;
			if ( overTop < 0 ) {
				newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - withinOffset;
				if ( ( position.top + myOffset + atOffset + offset) > overTop && ( newOverBottom < 0 || newOverBottom < abs( overTop ) ) ) {
					position.top += myOffset + atOffset + offset;
				}
			} else if ( overBottom > 0 ) {
				newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - offsetTop;
				if ( ( position.top + myOffset + atOffset + offset) > overBottom && ( newOverTop > 0 || abs( newOverTop ) < overBottom ) ) {
					position.top += myOffset + atOffset + offset;
				}
			}
		}
	},
	flipfit: {
		left: function() {
			$.ui.position.flip.left.apply( this, arguments );
			$.ui.position.fit.left.apply( this, arguments );
		},
		top: function() {
			$.ui.position.flip.top.apply( this, arguments );
			$.ui.position.fit.top.apply( this, arguments );
		}
	}
};

// fraction support test
(function() {
	var testElement, testElementParent, testElementStyle, offsetLeft, i,
		body = document.getElementsByTagName( "body" )[ 0 ],
		div = document.createElement( "div" );

	//Create a "fake body" for testing based on method used in jQuery.support
	testElement = document.createElement( body ? "div" : "body" );
	testElementStyle = {
		visibility: "hidden",
		width: 0,
		height: 0,
		border: 0,
		margin: 0,
		background: "none"
	};
	if ( body ) {
		$.extend( testElementStyle, {
			position: "absolute",
			left: "-1000px",
			top: "-1000px"
		});
	}
	for ( i in testElementStyle ) {
		testElement.style[ i ] = testElementStyle[ i ];
	}
	testElement.appendChild( div );
	testElementParent = body || document.documentElement;
	testElementParent.insertBefore( testElement, testElementParent.firstChild );

	div.style.cssText = "position: absolute; left: 10.7432222px;";

	offsetLeft = $( div ).offset().left;
	supportsOffsetFractions = offsetLeft > 10 && offsetLeft < 11;

	testElement.innerHTML = "";
	testElementParent.removeChild( testElement );
})();

})();

return $.ui.position;

}));




/*!
 * jQuery UI Resizable 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/resizable/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./core",
			"./mouse",
			"./widget"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

$.widget("ui.resizable", $.ui.mouse, {
	version: "1.11.1",
	widgetEventPrefix: "resize",
	options: {
		alsoResize: false,
		animate: false,
		animateDuration: "slow",
		animateEasing: "swing",
		aspectRatio: false,
		autoHide: false,
		containment: false,
		ghost: false,
		grid: false,
		handles: "e,s,se",
		helper: false,
		maxHeight: null,
		maxWidth: null,
		minHeight: 10,
		minWidth: 10,
		// See #7960
		zIndex: 90,

		// callbacks
		resize: null,
		start: null,
		stop: null
	},

	_num: function( value ) {
		return parseInt( value, 10 ) || 0;
	},

	_isNumber: function( value ) {
		return !isNaN( parseInt( value, 10 ) );
	},

	_hasScroll: function( el, a ) {

		if ( $( el ).css( "overflow" ) === "hidden") {
			return false;
		}

		var scroll = ( a && a === "left" ) ? "scrollLeft" : "scrollTop",
			has = false;

		if ( el[ scroll ] > 0 ) {
			return true;
		}

		// TODO: determine which cases actually cause this to happen
		// if the element doesn't have the scroll set, see if it's possible to
		// set the scroll
		el[ scroll ] = 1;
		has = ( el[ scroll ] > 0 );
		el[ scroll ] = 0;
		return has;
	},

	_create: function() {

		var n, i, handle, axis, hname,
			that = this,
			o = this.options;
		this.element.addClass("ui-resizable");

		$.extend(this, {
			_aspectRatio: !!(o.aspectRatio),
			aspectRatio: o.aspectRatio,
			originalElement: this.element,
			_proportionallyResizeElements: [],
			_helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
		});

		// Wrap the element if it cannot hold child nodes
		if (this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)) {

			this.element.wrap(
				$("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
					position: this.element.css("position"),
					width: this.element.outerWidth(),
					height: this.element.outerHeight(),
					top: this.element.css("top"),
					left: this.element.css("left")
				})
			);

			this.element = this.element.parent().data(
				"ui-resizable", this.element.resizable( "instance" )
			);

			this.elementIsWrapper = true;

			this.element.css({
				marginLeft: this.originalElement.css("marginLeft"),
				marginTop: this.originalElement.css("marginTop"),
				marginRight: this.originalElement.css("marginRight"),
				marginBottom: this.originalElement.css("marginBottom")
			});
			this.originalElement.css({
				marginLeft: 0,
				marginTop: 0,
				marginRight: 0,
				marginBottom: 0
			});
			// support: Safari
			// Prevent Safari textarea resize
			this.originalResizeStyle = this.originalElement.css("resize");
			this.originalElement.css("resize", "none");

			this._proportionallyResizeElements.push( this.originalElement.css({
				position: "static",
				zoom: 1,
				display: "block"
			}) );

			// support: IE9
			// avoid IE jump (hard set the margin)
			this.originalElement.css({ margin: this.originalElement.css("margin") });

			this._proportionallyResize();
		}

		this.handles = o.handles ||
			( !$(".ui-resizable-handle", this.element).length ?
				"e,s,se" : {
					n: ".ui-resizable-n",
					e: ".ui-resizable-e",
					s: ".ui-resizable-s",
					w: ".ui-resizable-w",
					se: ".ui-resizable-se",
					sw: ".ui-resizable-sw",
					ne: ".ui-resizable-ne",
					nw: ".ui-resizable-nw"
				} );

		if (this.handles.constructor === String) {

			if ( this.handles === "all") {
				this.handles = "n,e,s,w,se,sw,ne,nw";
			}

			n = this.handles.split(",");
			this.handles = {};

			for (i = 0; i < n.length; i++) {

				handle = $.trim(n[i]);
				hname = "ui-resizable-" + handle;
				axis = $("<div class='ui-resizable-handle " + hname + "'></div>");

				axis.css({ zIndex: o.zIndex });

				// TODO : What's going on here?
				if ("se" === handle) {
					axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se");
				}

				this.handles[handle] = ".ui-resizable-" + handle;
				this.element.append(axis);
			}

		}

		this._renderAxis = function(target) {

			var i, axis, padPos, padWrapper;

			target = target || this.element;

			for (i in this.handles) {

				if (this.handles[i].constructor === String) {
					this.handles[i] = this.element.children( this.handles[ i ] ).first().show();
				}

				if (this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i)) {

					axis = $(this.handles[i], this.element);

					padWrapper = /sw|ne|nw|se|n|s/.test(i) ? axis.outerHeight() : axis.outerWidth();

					padPos = [ "padding",
						/ne|nw|n/.test(i) ? "Top" :
						/se|sw|s/.test(i) ? "Bottom" :
						/^e$/.test(i) ? "Right" : "Left" ].join("");

					target.css(padPos, padWrapper);

					this._proportionallyResize();

				}

				// TODO: What's that good for? There's not anything to be executed left
				if (!$(this.handles[i]).length) {
					continue;
				}
			}
		};

		// TODO: make renderAxis a prototype function
		this._renderAxis(this.element);

		this._handles = $(".ui-resizable-handle", this.element)
			.disableSelection();

		this._handles.mouseover(function() {
			if (!that.resizing) {
				if (this.className) {
					axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);
				}
				that.axis = axis && axis[1] ? axis[1] : "se";
			}
		});

		if (o.autoHide) {
			this._handles.hide();
			$(this.element)
				.addClass("ui-resizable-autohide")
				.mouseenter(function() {
					if (o.disabled) {
						return;
					}
					$(this).removeClass("ui-resizable-autohide");
					that._handles.show();
				})
				.mouseleave(function() {
					if (o.disabled) {
						return;
					}
					if (!that.resizing) {
						$(this).addClass("ui-resizable-autohide");
						that._handles.hide();
					}
				});
		}

		this._mouseInit();

	},

	_destroy: function() {

		this._mouseDestroy();

		var wrapper,
			_destroy = function(exp) {
				$(exp)
					.removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing")
					.removeData("resizable")
					.removeData("ui-resizable")
					.unbind(".resizable")
					.find(".ui-resizable-handle")
						.remove();
			};

		// TODO: Unwrap at same DOM position
		if (this.elementIsWrapper) {
			_destroy(this.element);
			wrapper = this.element;
			this.originalElement.css({
				position: wrapper.css("position"),
				width: wrapper.outerWidth(),
				height: wrapper.outerHeight(),
				top: wrapper.css("top"),
				left: wrapper.css("left")
			}).insertAfter( wrapper );
			wrapper.remove();
		}

		this.originalElement.css("resize", this.originalResizeStyle);
		_destroy(this.originalElement);

		return this;
	},

	_mouseCapture: function(event) {
		var i, handle,
			capture = false;

		for (i in this.handles) {
			handle = $(this.handles[i])[0];
			if (handle === event.target || $.contains(handle, event.target)) {
				capture = true;
			}
		}

		return !this.options.disabled && capture;
	},

	_mouseStart: function(event) {

		var curleft, curtop, cursor,
			o = this.options,
			el = this.element;

		this.resizing = true;

		this._renderProxy();

		curleft = this._num(this.helper.css("left"));
		curtop = this._num(this.helper.css("top"));

		if (o.containment) {
			curleft += $(o.containment).scrollLeft() || 0;
			curtop += $(o.containment).scrollTop() || 0;
		}

		this.offset = this.helper.offset();
		this.position = { left: curleft, top: curtop };

		this.size = this._helper ? {
				width: this.helper.width(),
				height: this.helper.height()
			} : {
				width: el.width(),
				height: el.height()
			};

		this.originalSize = this._helper ? {
				width: el.outerWidth(),
				height: el.outerHeight()
			} : {
				width: el.width(),
				height: el.height()
			};

		this.sizeDiff = {
			width: el.outerWidth() - el.width(),
			height: el.outerHeight() - el.height()
		};

		this.originalPosition = { left: curleft, top: curtop };
		this.originalMousePosition = { left: event.pageX, top: event.pageY };

		this.aspectRatio = (typeof o.aspectRatio === "number") ?
			o.aspectRatio :
			((this.originalSize.width / this.originalSize.height) || 1);

		cursor = $(".ui-resizable-" + this.axis).css("cursor");
		$("body").css("cursor", cursor === "auto" ? this.axis + "-resize" : cursor);

		el.addClass("ui-resizable-resizing");
		this._propagate("start", event);
		return true;
	},

	_mouseDrag: function(event) {

		var data, props,
			smp = this.originalMousePosition,
			a = this.axis,
			dx = (event.pageX - smp.left) || 0,
			dy = (event.pageY - smp.top) || 0,
			trigger = this._change[a];

		this._updatePrevProperties();

		if (!trigger) {
			return false;
		}

		data = trigger.apply(this, [ event, dx, dy ]);

		this._updateVirtualBoundaries(event.shiftKey);
		if (this._aspectRatio || event.shiftKey) {
			data = this._updateRatio(data, event);
		}

		data = this._respectSize(data, event);

		this._updateCache(data);

		this._propagate("resize", event);

		props = this._applyChanges();

		if ( !this._helper && this._proportionallyResizeElements.length ) {
			this._proportionallyResize();
		}

		if ( !$.isEmptyObject( props ) ) {
			this._updatePrevProperties();
			this._trigger( "resize", event, this.ui() );
			this._applyChanges();
		}

		return false;
	},

	_mouseStop: function(event) {

		this.resizing = false;
		var pr, ista, soffseth, soffsetw, s, left, top,
			o = this.options, that = this;

		if (this._helper) {

			pr = this._proportionallyResizeElements;
			ista = pr.length && (/textarea/i).test(pr[0].nodeName);
			soffseth = ista && this._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height;
			soffsetw = ista ? 0 : that.sizeDiff.width;

			s = {
				width: (that.helper.width()  - soffsetw),
				height: (that.helper.height() - soffseth)
			};
			left = (parseInt(that.element.css("left"), 10) +
				(that.position.left - that.originalPosition.left)) || null;
			top = (parseInt(that.element.css("top"), 10) +
				(that.position.top - that.originalPosition.top)) || null;

			if (!o.animate) {
				this.element.css($.extend(s, { top: top, left: left }));
			}

			that.helper.height(that.size.height);
			that.helper.width(that.size.width);

			if (this._helper && !o.animate) {
				this._proportionallyResize();
			}
		}

		$("body").css("cursor", "auto");

		this.element.removeClass("ui-resizable-resizing");

		this._propagate("stop", event);

		if (this._helper) {
			this.helper.remove();
		}

		return false;

	},

	_updatePrevProperties: function() {
		this.prevPosition = {
			top: this.position.top,
			left: this.position.left
		};
		this.prevSize = {
			width: this.size.width,
			height: this.size.height
		};
	},

	_applyChanges: function() {
		var props = {};

		if ( this.position.top !== this.prevPosition.top ) {
			props.top = this.position.top + "px";
		}
		if ( this.position.left !== this.prevPosition.left ) {
			props.left = this.position.left + "px";
		}
		if ( this.size.width !== this.prevSize.width ) {
			props.width = this.size.width + "px";
		}
		if ( this.size.height !== this.prevSize.height ) {
			props.height = this.size.height + "px";
		}

		this.helper.css( props );

		return props;
	},

	_updateVirtualBoundaries: function(forceAspectRatio) {
		var pMinWidth, pMaxWidth, pMinHeight, pMaxHeight, b,
			o = this.options;

		b = {
			minWidth: this._isNumber(o.minWidth) ? o.minWidth : 0,
			maxWidth: this._isNumber(o.maxWidth) ? o.maxWidth : Infinity,
			minHeight: this._isNumber(o.minHeight) ? o.minHeight : 0,
			maxHeight: this._isNumber(o.maxHeight) ? o.maxHeight : Infinity
		};

		if (this._aspectRatio || forceAspectRatio) {
			pMinWidth = b.minHeight * this.aspectRatio;
			pMinHeight = b.minWidth / this.aspectRatio;
			pMaxWidth = b.maxHeight * this.aspectRatio;
			pMaxHeight = b.maxWidth / this.aspectRatio;

			if (pMinWidth > b.minWidth) {
				b.minWidth = pMinWidth;
			}
			if (pMinHeight > b.minHeight) {
				b.minHeight = pMinHeight;
			}
			if (pMaxWidth < b.maxWidth) {
				b.maxWidth = pMaxWidth;
			}
			if (pMaxHeight < b.maxHeight) {
				b.maxHeight = pMaxHeight;
			}
		}
		this._vBoundaries = b;
	},

	_updateCache: function(data) {
		this.offset = this.helper.offset();
		if (this._isNumber(data.left)) {
			this.position.left = data.left;
		}
		if (this._isNumber(data.top)) {
			this.position.top = data.top;
		}
		if (this._isNumber(data.height)) {
			this.size.height = data.height;
		}
		if (this._isNumber(data.width)) {
			this.size.width = data.width;
		}
	},

	_updateRatio: function( data ) {

		var cpos = this.position,
			csize = this.size,
			a = this.axis;

		if (this._isNumber(data.height)) {
			data.width = (data.height * this.aspectRatio);
		} else if (this._isNumber(data.width)) {
			data.height = (data.width / this.aspectRatio);
		}

		if (a === "sw") {
			data.left = cpos.left + (csize.width - data.width);
			data.top = null;
		}
		if (a === "nw") {
			data.top = cpos.top + (csize.height - data.height);
			data.left = cpos.left + (csize.width - data.width);
		}

		return data;
	},

	_respectSize: function( data ) {

		var o = this._vBoundaries,
			a = this.axis,
			ismaxw = this._isNumber(data.width) && o.maxWidth && (o.maxWidth < data.width),
			ismaxh = this._isNumber(data.height) && o.maxHeight && (o.maxHeight < data.height),
			isminw = this._isNumber(data.width) && o.minWidth && (o.minWidth > data.width),
			isminh = this._isNumber(data.height) && o.minHeight && (o.minHeight > data.height),
			dw = this.originalPosition.left + this.originalSize.width,
			dh = this.position.top + this.size.height,
			cw = /sw|nw|w/.test(a), ch = /nw|ne|n/.test(a);
		if (isminw) {
			data.width = o.minWidth;
		}
		if (isminh) {
			data.height = o.minHeight;
		}
		if (ismaxw) {
			data.width = o.maxWidth;
		}
		if (ismaxh) {
			data.height = o.maxHeight;
		}

		if (isminw && cw) {
			data.left = dw - o.minWidth;
		}
		if (ismaxw && cw) {
			data.left = dw - o.maxWidth;
		}
		if (isminh && ch) {
			data.top = dh - o.minHeight;
		}
		if (ismaxh && ch) {
			data.top = dh - o.maxHeight;
		}

		// Fixing jump error on top/left - bug #2330
		if (!data.width && !data.height && !data.left && data.top) {
			data.top = null;
		} else if (!data.width && !data.height && !data.top && data.left) {
			data.left = null;
		}

		return data;
	},

	_getPaddingPlusBorderDimensions: function( element ) {
		var i = 0,
			widths = [],
			borders = [
				element.css( "borderTopWidth" ),
				element.css( "borderRightWidth" ),
				element.css( "borderBottomWidth" ),
				element.css( "borderLeftWidth" )
			],
			paddings = [
				element.css( "paddingTop" ),
				element.css( "paddingRight" ),
				element.css( "paddingBottom" ),
				element.css( "paddingLeft" )
			];

		for ( ; i < 4; i++ ) {
			widths[ i ] = ( parseInt( borders[ i ], 10 ) || 0 );
			widths[ i ] += ( parseInt( paddings[ i ], 10 ) || 0 );
		}

		return {
			height: widths[ 0 ] + widths[ 2 ],
			width: widths[ 1 ] + widths[ 3 ]
		};
	},

	_proportionallyResize: function() {

		if (!this._proportionallyResizeElements.length) {
			return;
		}

		var prel,
			i = 0,
			element = this.helper || this.element;

		for ( ; i < this._proportionallyResizeElements.length; i++) {

			prel = this._proportionallyResizeElements[i];

			// TODO: Seems like a bug to cache this.outerDimensions
			// considering that we are in a loop.
			if (!this.outerDimensions) {
				this.outerDimensions = this._getPaddingPlusBorderDimensions( prel );
			}

			prel.css({
				height: (element.height() - this.outerDimensions.height) || 0,
				width: (element.width() - this.outerDimensions.width) || 0
			});

		}

	},

	_renderProxy: function() {

		var el = this.element, o = this.options;
		this.elementOffset = el.offset();

		if (this._helper) {

			this.helper = this.helper || $("<div style='overflow:hidden;'></div>");

			this.helper.addClass(this._helper).css({
				width: this.element.outerWidth() - 1,
				height: this.element.outerHeight() - 1,
				position: "absolute",
				left: this.elementOffset.left + "px",
				top: this.elementOffset.top + "px",
				zIndex: ++o.zIndex //TODO: Don't modify option
			});

			this.helper
				.appendTo("body")
				.disableSelection();

		} else {
			this.helper = this.element;
		}

	},

	_change: {
		e: function(event, dx) {
			return { width: this.originalSize.width + dx };
		},
		w: function(event, dx) {
			var cs = this.originalSize, sp = this.originalPosition;
			return { left: sp.left + dx, width: cs.width - dx };
		},
		n: function(event, dx, dy) {
			var cs = this.originalSize, sp = this.originalPosition;
			return { top: sp.top + dy, height: cs.height - dy };
		},
		s: function(event, dx, dy) {
			return { height: this.originalSize.height + dy };
		},
		se: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments),
				this._change.e.apply(this, [ event, dx, dy ]));
		},
		sw: function(event, dx, dy) {
			return $.extend(this._change.s.apply(this, arguments),
				this._change.w.apply(this, [ event, dx, dy ]));
		},
		ne: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments),
				this._change.e.apply(this, [ event, dx, dy ]));
		},
		nw: function(event, dx, dy) {
			return $.extend(this._change.n.apply(this, arguments),
				this._change.w.apply(this, [ event, dx, dy ]));
		}
	},

	_propagate: function(n, event) {
		$.ui.plugin.call(this, n, [ event, this.ui() ]);
		(n !== "resize" && this._trigger(n, event, this.ui()));
	},

	plugins: {},

	ui: function() {
		return {
			originalElement: this.originalElement,
			element: this.element,
			helper: this.helper,
			position: this.position,
			size: this.size,
			originalSize: this.originalSize,
			originalPosition: this.originalPosition
		};
	}

});

/*
 * Resizable Extensions
 */

$.ui.plugin.add("resizable", "animate", {

	stop: function( event ) {
		var that = $(this).resizable( "instance" ),
			o = that.options,
			pr = that._proportionallyResizeElements,
			ista = pr.length && (/textarea/i).test(pr[0].nodeName),
			soffseth = ista && that._hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height,
			soffsetw = ista ? 0 : that.sizeDiff.width,
			style = { width: (that.size.width - soffsetw), height: (that.size.height - soffseth) },
			left = (parseInt(that.element.css("left"), 10) +
				(that.position.left - that.originalPosition.left)) || null,
			top = (parseInt(that.element.css("top"), 10) +
				(that.position.top - that.originalPosition.top)) || null;

		that.element.animate(
			$.extend(style, top && left ? { top: top, left: left } : {}), {
				duration: o.animateDuration,
				easing: o.animateEasing,
				step: function() {

					var data = {
						width: parseInt(that.element.css("width"), 10),
						height: parseInt(that.element.css("height"), 10),
						top: parseInt(that.element.css("top"), 10),
						left: parseInt(that.element.css("left"), 10)
					};

					if (pr && pr.length) {
						$(pr[0]).css({ width: data.width, height: data.height });
					}

					// propagating resize, and updating values for each animation step
					that._updateCache(data);
					that._propagate("resize", event);

				}
			}
		);
	}

});

$.ui.plugin.add( "resizable", "containment", {

	start: function() {
		var element, p, co, ch, cw, width, height,
			that = $( this ).resizable( "instance" ),
			o = that.options,
			el = that.element,
			oc = o.containment,
			ce = ( oc instanceof $ ) ? oc.get( 0 ) : ( /parent/.test( oc ) ) ? el.parent().get( 0 ) : oc;

		if ( !ce ) {
			return;
		}

		that.containerElement = $( ce );

		if ( /document/.test( oc ) || oc === document ) {
			that.containerOffset = {
				left: 0,
				top: 0
			};
			that.containerPosition = {
				left: 0,
				top: 0
			};

			that.parentData = {
				element: $( document ),
				left: 0,
				top: 0,
				width: $( document ).width(),
				height: $( document ).height() || document.body.parentNode.scrollHeight
			};
		} else {
			element = $( ce );
			p = [];
			$([ "Top", "Right", "Left", "Bottom" ]).each(function( i, name ) {
				p[ i ] = that._num( element.css( "padding" + name ) );
			});

			that.containerOffset = element.offset();
			that.containerPosition = element.position();
			that.containerSize = {
				height: ( element.innerHeight() - p[ 3 ] ),
				width: ( element.innerWidth() - p[ 1 ] )
			};

			co = that.containerOffset;
			ch = that.containerSize.height;
			cw = that.containerSize.width;
			width = ( that._hasScroll ( ce, "left" ) ? ce.scrollWidth : cw );
			height = ( that._hasScroll ( ce ) ? ce.scrollHeight : ch ) ;

			that.parentData = {
				element: ce,
				left: co.left,
				top: co.top,
				width: width,
				height: height
			};
		}
	},

	resize: function( event ) {
		var woset, hoset, isParent, isOffsetRelative,
			that = $( this ).resizable( "instance" ),
			o = that.options,
			co = that.containerOffset,
			cp = that.position,
			pRatio = that._aspectRatio || event.shiftKey,
			cop = {
				top: 0,
				left: 0
			},
			ce = that.containerElement,
			continueResize = true;

		if ( ce[ 0 ] !== document && ( /static/ ).test( ce.css( "position" ) ) ) {
			cop = co;
		}

		if ( cp.left < ( that._helper ? co.left : 0 ) ) {
			that.size.width = that.size.width +
				( that._helper ?
					( that.position.left - co.left ) :
					( that.position.left - cop.left ) );

			if ( pRatio ) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
			that.position.left = o.helper ? co.left : 0;
		}

		if ( cp.top < ( that._helper ? co.top : 0 ) ) {
			that.size.height = that.size.height +
				( that._helper ?
					( that.position.top - co.top ) :
					that.position.top );

			if ( pRatio ) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
			that.position.top = that._helper ? co.top : 0;
		}

		isParent = that.containerElement.get( 0 ) === that.element.parent().get( 0 );
		isOffsetRelative = /relative|absolute/.test( that.containerElement.css( "position" ) );

		if ( isParent && isOffsetRelative ) {
			that.offset.left = that.parentData.left + that.position.left;
			that.offset.top = that.parentData.top + that.position.top;
		} else {
			that.offset.left = that.element.offset().left;
			that.offset.top = that.element.offset().top;
		}

		woset = Math.abs( that.sizeDiff.width +
			(that._helper ?
				that.offset.left - cop.left :
				(that.offset.left - co.left)) );

		hoset = Math.abs( that.sizeDiff.height +
			(that._helper ?
				that.offset.top - cop.top :
				(that.offset.top - co.top)) );

		if ( woset + that.size.width >= that.parentData.width ) {
			that.size.width = that.parentData.width - woset;
			if ( pRatio ) {
				that.size.height = that.size.width / that.aspectRatio;
				continueResize = false;
			}
		}

		if ( hoset + that.size.height >= that.parentData.height ) {
			that.size.height = that.parentData.height - hoset;
			if ( pRatio ) {
				that.size.width = that.size.height * that.aspectRatio;
				continueResize = false;
			}
		}

		if ( !continueResize ){
			that.position.left = that.prevPosition.left;
			that.position.top = that.prevPosition.top;
			that.size.width = that.prevSize.width;
			that.size.height = that.prevSize.height;
		}
	},

	stop: function() {
		var that = $( this ).resizable( "instance" ),
			o = that.options,
			co = that.containerOffset,
			cop = that.containerPosition,
			ce = that.containerElement,
			helper = $( that.helper ),
			ho = helper.offset(),
			w = helper.outerWidth() - that.sizeDiff.width,
			h = helper.outerHeight() - that.sizeDiff.height;

		if ( that._helper && !o.animate && ( /relative/ ).test( ce.css( "position" ) ) ) {
			$( this ).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}

		if ( that._helper && !o.animate && ( /static/ ).test( ce.css( "position" ) ) ) {
			$( this ).css({
				left: ho.left - cop.left - co.left,
				width: w,
				height: h
			});
		}
	}
});

$.ui.plugin.add("resizable", "alsoResize", {

	start: function() {
		var that = $(this).resizable( "instance" ),
			o = that.options,
			_store = function(exp) {
				$(exp).each(function() {
					var el = $(this);
					el.data("ui-resizable-alsoresize", {
						width: parseInt(el.width(), 10), height: parseInt(el.height(), 10),
						left: parseInt(el.css("left"), 10), top: parseInt(el.css("top"), 10)
					});
				});
			};

		if (typeof(o.alsoResize) === "object" && !o.alsoResize.parentNode) {
			if (o.alsoResize.length) {
				o.alsoResize = o.alsoResize[0];
				_store(o.alsoResize);
			} else {
				$.each(o.alsoResize, function(exp) {
					_store(exp);
				});
			}
		} else {
			_store(o.alsoResize);
		}
	},

	resize: function(event, ui) {
		var that = $(this).resizable( "instance" ),
			o = that.options,
			os = that.originalSize,
			op = that.originalPosition,
			delta = {
				height: (that.size.height - os.height) || 0,
				width: (that.size.width - os.width) || 0,
				top: (that.position.top - op.top) || 0,
				left: (that.position.left - op.left) || 0
			},

			_alsoResize = function(exp, c) {
				$(exp).each(function() {
					var el = $(this), start = $(this).data("ui-resizable-alsoresize"), style = {},
						css = c && c.length ?
							c :
							el.parents(ui.originalElement[0]).length ?
								[ "width", "height" ] :
								[ "width", "height", "top", "left" ];

					$.each(css, function(i, prop) {
						var sum = (start[prop] || 0) + (delta[prop] || 0);
						if (sum && sum >= 0) {
							style[prop] = sum || null;
						}
					});

					el.css(style);
				});
			};

		if (typeof(o.alsoResize) === "object" && !o.alsoResize.nodeType) {
			$.each(o.alsoResize, function(exp, c) {
				_alsoResize(exp, c);
			});
		} else {
			_alsoResize(o.alsoResize);
		}
	},

	stop: function() {
		$(this).removeData("resizable-alsoresize");
	}
});

$.ui.plugin.add("resizable", "ghost", {

	start: function() {

		var that = $(this).resizable( "instance" ), o = that.options, cs = that.size;

		that.ghost = that.originalElement.clone();
		that.ghost
			.css({
				opacity: 0.25,
				display: "block",
				position: "relative",
				height: cs.height,
				width: cs.width,
				margin: 0,
				left: 0,
				top: 0
			})
			.addClass("ui-resizable-ghost")
			.addClass(typeof o.ghost === "string" ? o.ghost : "");

		that.ghost.appendTo(that.helper);

	},

	resize: function() {
		var that = $(this).resizable( "instance" );
		if (that.ghost) {
			that.ghost.css({
				position: "relative",
				height: that.size.height,
				width: that.size.width
			});
		}
	},

	stop: function() {
		var that = $(this).resizable( "instance" );
		if (that.ghost && that.helper) {
			that.helper.get(0).removeChild(that.ghost.get(0));
		}
	}

});

$.ui.plugin.add("resizable", "grid", {

	resize: function() {
		var outerDimensions,
			that = $(this).resizable( "instance" ),
			o = that.options,
			cs = that.size,
			os = that.originalSize,
			op = that.originalPosition,
			a = that.axis,
			grid = typeof o.grid === "number" ? [ o.grid, o.grid ] : o.grid,
			gridX = (grid[0] || 1),
			gridY = (grid[1] || 1),
			ox = Math.round((cs.width - os.width) / gridX) * gridX,
			oy = Math.round((cs.height - os.height) / gridY) * gridY,
			newWidth = os.width + ox,
			newHeight = os.height + oy,
			isMaxWidth = o.maxWidth && (o.maxWidth < newWidth),
			isMaxHeight = o.maxHeight && (o.maxHeight < newHeight),
			isMinWidth = o.minWidth && (o.minWidth > newWidth),
			isMinHeight = o.minHeight && (o.minHeight > newHeight);

		o.grid = grid;

		if (isMinWidth) {
			newWidth += gridX;
		}
		if (isMinHeight) {
			newHeight += gridY;
		}
		if (isMaxWidth) {
			newWidth -= gridX;
		}
		if (isMaxHeight) {
			newHeight -= gridY;
		}

		if (/^(se|s|e)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
		} else if (/^(ne)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.top = op.top - oy;
		} else if (/^(sw)$/.test(a)) {
			that.size.width = newWidth;
			that.size.height = newHeight;
			that.position.left = op.left - ox;
		} else {
			if ( newHeight - gridY <= 0 || newWidth - gridX <= 0) {
				outerDimensions = that._getPaddingPlusBorderDimensions( this );
			}

			if ( newHeight - gridY > 0 ) {
				that.size.height = newHeight;
				that.position.top = op.top - oy;
			} else {
				newHeight = gridY - outerDimensions.height;
				that.size.height = newHeight;
				that.position.top = op.top + os.height - newHeight;
			}
			if ( newWidth - gridX > 0 ) {
				that.size.width = newWidth;
				that.position.left = op.left - ox;
			} else {
				newWidth = gridY - outerDimensions.height;
				that.size.width = newWidth;
				that.position.left = op.left + os.width - newWidth;
			}
		}
	}

});

return $.ui.resizable;

}));







/*!
 * jQuery UI Dialog 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/dialog/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./core",
			"./widget",
			"./button",
			"./draggable",
			"./mouse",
			"./position",
			"./resizable"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

return $.widget( "ui.dialog", {
	version: "1.11.1",
	options: {
		appendTo: "body",
		autoOpen: true,
		buttons: [],
		closeOnEscape: true,
		closeText: "Close",
		dialogClass: "",
		draggable: true,
		hide: null,
		height: "auto",
		maxHeight: null,
		maxWidth: null,
		minHeight: 150,
		minWidth: 150,
		modal: false,
		position: {
			my: "center",
			at: "center",
			of: window,
			collision: "fit",
			// Ensure the titlebar is always visible
			using: function( pos ) {
				var topOffset = $( this ).css( pos ).offset().top;
				if ( topOffset < 0 ) {
					$( this ).css( "top", pos.top - topOffset );
				}
			}
		},
		resizable: true,
		show: null,
		title: null,
		width: 300,

		// callbacks
		beforeClose: null,
		close: null,
		drag: null,
		dragStart: null,
		dragStop: null,
		focus: null,
		open: null,
		resize: null,
		resizeStart: null,
		resizeStop: null
	},

	sizeRelatedOptions: {
		buttons: true,
		height: true,
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true,
		width: true
	},

	resizableRelatedOptions: {
		maxHeight: true,
		maxWidth: true,
		minHeight: true,
		minWidth: true
	},

	_create: function() {
		this.originalCss = {
			display: this.element[ 0 ].style.display,
			width: this.element[ 0 ].style.width,
			minHeight: this.element[ 0 ].style.minHeight,
			maxHeight: this.element[ 0 ].style.maxHeight,
			height: this.element[ 0 ].style.height
		};
		this.originalPosition = {
			parent: this.element.parent(),
			index: this.element.parent().children().index( this.element )
		};
		this.originalTitle = this.element.attr( "title" );
		this.options.title = this.options.title || this.originalTitle;

		this._createWrapper();

		this.element
			.show()
			.removeAttr( "title" )
			.addClass( "ui-dialog-content ui-widget-content" )
			.appendTo( this.uiDialog );

		this._createTitlebar();
		this._createButtonPane();

		if ( this.options.draggable && $.fn.draggable ) {
			this._makeDraggable();
		}
		if ( this.options.resizable && $.fn.resizable ) {
			this._makeResizable();
		}

		this._isOpen = false;

		this._trackFocus();
	},

	_init: function() {
		if ( this.options.autoOpen ) {
			this.open();
		}
	},

	_appendTo: function() {
		var element = this.options.appendTo;
		if ( element && (element.jquery || element.nodeType) ) {
			return $( element );
		}
		return this.document.find( element || "body" ).eq( 0 );
	},

	_destroy: function() {
		var next,
			originalPosition = this.originalPosition;

		this._destroyOverlay();

		this.element
			.removeUniqueId()
			.removeClass( "ui-dialog-content ui-widget-content" )
			.css( this.originalCss )
			// Without detaching first, the following becomes really slow
			.detach();

		this.uiDialog.stop( true, true ).remove();

		if ( this.originalTitle ) {
			this.element.attr( "title", this.originalTitle );
		}

		next = originalPosition.parent.children().eq( originalPosition.index );
		// Don't try to place the dialog next to itself (#8613)
		if ( next.length && next[ 0 ] !== this.element[ 0 ] ) {
			next.before( this.element );
		} else {
			originalPosition.parent.append( this.element );
		}
	},

	widget: function() {
		return this.uiDialog;
	},

	disable: $.noop,
	enable: $.noop,

	close: function( event ) {
		var activeElement,
			that = this;

		if ( !this._isOpen || this._trigger( "beforeClose", event ) === false ) {
			return;
		}

		this._isOpen = false;
		this._focusedElement = null;
		this._destroyOverlay();
		this._untrackInstance();

		if ( !this.opener.filter( ":focusable" ).focus().length ) {

			// support: IE9
			// IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
			try {
				activeElement = this.document[ 0 ].activeElement;

				// Support: IE9, IE10
				// If the <body> is blurred, IE will switch windows, see #4520
				if ( activeElement && activeElement.nodeName.toLowerCase() !== "body" ) {

					// Hiding a focused element doesn't trigger blur in WebKit
					// so in case we have nothing to focus on, explicitly blur the active element
					// https://bugs.webkit.org/show_bug.cgi?id=47182
					$( activeElement ).blur();
				}
			} catch ( error ) {}
		}

		this._hide( this.uiDialog, this.options.hide, function() {
			that._trigger( "close", event );
		});
	},

	isOpen: function() {
		return this._isOpen;
	},

	moveToTop: function() {
		this._moveToTop();
	},

	_moveToTop: function( event, silent ) {
		var moved = false,
			zIndicies = this.uiDialog.siblings( ".ui-front:visible" ).map(function() {
				return +$( this ).css( "z-index" );
			}).get(),
			zIndexMax = Math.max.apply( null, zIndicies );

		if ( zIndexMax >= +this.uiDialog.css( "z-index" ) ) {
			this.uiDialog.css( "z-index", zIndexMax + 1 );
			moved = true;
		}

		if ( moved && !silent ) {
			this._trigger( "focus", event );
		}
		return moved;
	},

	open: function() {
		var that = this;
		if ( this._isOpen ) {
			if ( this._moveToTop() ) {
				this._focusTabbable();
			}
			return;
		}

		this._isOpen = true;
		this.opener = $( this.document[ 0 ].activeElement );

		this._size();
		this._position();
		this._createOverlay();
		this._moveToTop( null, true );

		// Ensure the overlay is moved to the top with the dialog, but only when
		// opening. The overlay shouldn't move after the dialog is open so that
		// modeless dialogs opened after the modal dialog stack properly.
		if ( this.overlay ) {
			this.overlay.css( "z-index", this.uiDialog.css( "z-index" ) - 1 );
		}

		this._show( this.uiDialog, this.options.show, function() {
			that._focusTabbable();
			that._trigger( "focus" );
		});

		// Track the dialog immediately upon openening in case a focus event
		// somehow occurs outside of the dialog before an element inside the
		// dialog is focused (#10152)
		this._makeFocusTarget();

		this._trigger( "open" );
	},

	_focusTabbable: function() {
		// Set focus to the first match:
		// 1. An element that was focused previously
		// 2. First element inside the dialog matching [autofocus]
		// 3. Tabbable element inside the content element
		// 4. Tabbable element inside the buttonpane
		// 5. The close button
		// 6. The dialog itself
		var hasFocus = this._focusedElement;
		if ( !hasFocus ) {
			hasFocus = this.element.find( "[autofocus]" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.element.find( ":tabbable" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialogButtonPane.find( ":tabbable" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialogTitlebarClose.filter( ":tabbable" );
		}
		if ( !hasFocus.length ) {
			hasFocus = this.uiDialog;
		}
		hasFocus.eq( 0 ).focus();
	},

	_keepFocus: function( event ) {
		function checkFocus() {
			var activeElement = this.document[0].activeElement,
				isActive = this.uiDialog[0] === activeElement ||
					$.contains( this.uiDialog[0], activeElement );
			if ( !isActive ) {
				this._focusTabbable();
			}
		}
		event.preventDefault();
		checkFocus.call( this );
		// support: IE
		// IE <= 8 doesn't prevent moving focus even with event.preventDefault()
		// so we check again later
		this._delay( checkFocus );
	},

	_createWrapper: function() {
		this.uiDialog = $("<div>")
			.addClass( "ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " +
				this.options.dialogClass )
			.hide()
			.attr({
				// Setting tabIndex makes the div focusable
				tabIndex: -1,
				role: "dialog"
			})
			.appendTo( this._appendTo() );

		this._on( this.uiDialog, {
			keydown: function( event ) {
				if ( this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode &&
						event.keyCode === $.ui.keyCode.ESCAPE ) {
					event.preventDefault();
					this.close( event );
					return;
				}

				// prevent tabbing out of dialogs
				if ( event.keyCode !== $.ui.keyCode.TAB || event.isDefaultPrevented() ) {
					return;
				}
				var tabbables = this.uiDialog.find( ":tabbable" ),
					first = tabbables.filter( ":first" ),
					last = tabbables.filter( ":last" );

				if ( ( event.target === last[0] || event.target === this.uiDialog[0] ) && !event.shiftKey ) {
					this._delay(function() {
						first.focus();
					});
					event.preventDefault();
				} else if ( ( event.target === first[0] || event.target === this.uiDialog[0] ) && event.shiftKey ) {
					this._delay(function() {
						last.focus();
					});
					event.preventDefault();
				}
			},
			mousedown: function( event ) {
				if ( this._moveToTop( event ) ) {
					this._focusTabbable();
				}
			}
		});

		// We assume that any existing aria-describedby attribute means
		// that the dialog content is marked up properly
		// otherwise we brute force the content as the description
		if ( !this.element.find( "[aria-describedby]" ).length ) {
			this.uiDialog.attr({
				"aria-describedby": this.element.uniqueId().attr( "id" )
			});
		}
	},

	_createTitlebar: function() {
		var uiDialogTitle;

		this.uiDialogTitlebar = $( "<div>" )
			.addClass( "ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" )
			.prependTo( this.uiDialog );
		this._on( this.uiDialogTitlebar, {
			mousedown: function( event ) {
				// Don't prevent click on close button (#8838)
				// Focusing a dialog that is partially scrolled out of view
				// causes the browser to scroll it into view, preventing the click event
				if ( !$( event.target ).closest( ".ui-dialog-titlebar-close" ) ) {
					// Dialog isn't getting focus when dragging (#8063)
					this.uiDialog.focus();
				}
			}
		});

		// support: IE
		// Use type="button" to prevent enter keypresses in textboxes from closing the
		// dialog in IE (#9312)
		this.uiDialogTitlebarClose = $( "<button type='button'></button>" )
			.button({
				label: this.options.closeText,
				icons: {
					primary: "ui-icon-closethick"
				},
				text: false
			})
			.addClass( "ui-dialog-titlebar-close" )
			.appendTo( this.uiDialogTitlebar );
		this._on( this.uiDialogTitlebarClose, {
			click: function( event ) {
				event.preventDefault();
				this.close( event );
			}
		});

		uiDialogTitle = $( "<span>" )
			.uniqueId()
			.addClass( "ui-dialog-title" )
			.prependTo( this.uiDialogTitlebar );
		this._title( uiDialogTitle );

		this.uiDialog.attr({
			"aria-labelledby": uiDialogTitle.attr( "id" )
		});
	},

	_title: function( title ) {
		if ( !this.options.title ) {
			title.html( "&#160;" );
		}
		title.text( this.options.title );
	},

	_createButtonPane: function() {
		this.uiDialogButtonPane = $( "<div>" )
			.addClass( "ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" );

		this.uiButtonSet = $( "<div>" )
			.addClass( "ui-dialog-buttonset" )
			.appendTo( this.uiDialogButtonPane );

		this._createButtons();
	},

	_createButtons: function() {
		var that = this,
			buttons = this.options.buttons;

		// if we already have a button pane, remove it
		this.uiDialogButtonPane.remove();
		this.uiButtonSet.empty();

		if ( $.isEmptyObject( buttons ) || ($.isArray( buttons ) && !buttons.length) ) {
			this.uiDialog.removeClass( "ui-dialog-buttons" );
			return;
		}

		$.each( buttons, function( name, props ) {
			var click, buttonOptions;
			props = $.isFunction( props ) ?
				{ click: props, text: name } :
				props;
			// Default to a non-submitting button
			props = $.extend( { type: "button" }, props );
			// Change the context for the click callback to be the main element
			click = props.click;
			props.click = function() {
				click.apply( that.element[ 0 ], arguments );
			};
			buttonOptions = {
				icons: props.icons,
				text: props.showText
			};
			delete props.icons;
			delete props.showText;
			$( "<button></button>", props )
				.button( buttonOptions )
				.appendTo( that.uiButtonSet );
		});
		this.uiDialog.addClass( "ui-dialog-buttons" );
		this.uiDialogButtonPane.appendTo( this.uiDialog );
	},

	_makeDraggable: function() {
		var that = this,
			options = this.options;

		function filteredUi( ui ) {
			return {
				position: ui.position,
				offset: ui.offset
			};
		}

		this.uiDialog.draggable({
			cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
			handle: ".ui-dialog-titlebar",
			containment: "document",
			start: function( event, ui ) {
				$( this ).addClass( "ui-dialog-dragging" );
				that._blockFrames();
				that._trigger( "dragStart", event, filteredUi( ui ) );
			},
			drag: function( event, ui ) {
				that._trigger( "drag", event, filteredUi( ui ) );
			},
			stop: function( event, ui ) {
				var left = ui.offset.left - that.document.scrollLeft(),
					top = ui.offset.top - that.document.scrollTop();

				options.position = {
					my: "left top",
					at: "left" + (left >= 0 ? "+" : "") + left + " " +
						"top" + (top >= 0 ? "+" : "") + top,
					of: that.window
				};
				$( this ).removeClass( "ui-dialog-dragging" );
				that._unblockFrames();
				that._trigger( "dragStop", event, filteredUi( ui ) );
			}
		});
	},

	_makeResizable: function() {
		var that = this,
			options = this.options,
			handles = options.resizable,
			// .ui-resizable has position: relative defined in the stylesheet
			// but dialogs have to use absolute or fixed positioning
			position = this.uiDialog.css("position"),
			resizeHandles = typeof handles === "string" ?
				handles	:
				"n,e,s,w,se,sw,ne,nw";

		function filteredUi( ui ) {
			return {
				originalPosition: ui.originalPosition,
				originalSize: ui.originalSize,
				position: ui.position,
				size: ui.size
			};
		}

		this.uiDialog.resizable({
			cancel: ".ui-dialog-content",
			containment: "document",
			alsoResize: this.element,
			maxWidth: options.maxWidth,
			maxHeight: options.maxHeight,
			minWidth: options.minWidth,
			minHeight: this._minHeight(),
			handles: resizeHandles,
			start: function( event, ui ) {
				$( this ).addClass( "ui-dialog-resizing" );
				that._blockFrames();
				that._trigger( "resizeStart", event, filteredUi( ui ) );
			},
			resize: function( event, ui ) {
				that._trigger( "resize", event, filteredUi( ui ) );
			},
			stop: function( event, ui ) {
				var offset = that.uiDialog.offset(),
					left = offset.left - that.document.scrollLeft(),
					top = offset.top - that.document.scrollTop();

				options.height = that.uiDialog.height();
				options.width = that.uiDialog.width();
				options.position = {
					my: "left top",
					at: "left" + (left >= 0 ? "+" : "") + left + " " +
						"top" + (top >= 0 ? "+" : "") + top,
					of: that.window
				};
				$( this ).removeClass( "ui-dialog-resizing" );
				that._unblockFrames();
				that._trigger( "resizeStop", event, filteredUi( ui ) );
			}
		})
		.css( "position", position );
	},

	_trackFocus: function() {
		this._on( this.widget(), {
			focusin: function( event ) {
				this._makeFocusTarget();
				this._focusedElement = $( event.target );
			}
		});
	},

	_makeFocusTarget: function() {
		this._untrackInstance();
		this._trackingInstances().unshift( this );
	},

	_untrackInstance: function() {
		var instances = this._trackingInstances(),
			exists = $.inArray( this, instances );
		if ( exists !== -1 ) {
			instances.splice( exists, 1 );
		}
	},

	_trackingInstances: function() {
		var instances = this.document.data( "ui-dialog-instances" );
		if ( !instances ) {
			instances = [];
			this.document.data( "ui-dialog-instances", instances );
		}
		return instances;
	},

	_minHeight: function() {
		var options = this.options;

		return options.height === "auto" ?
			options.minHeight :
			Math.min( options.minHeight, options.height );
	},

	_position: function() {
		// Need to show the dialog to get the actual offset in the position plugin
		var isVisible = this.uiDialog.is( ":visible" );
		if ( !isVisible ) {
			this.uiDialog.show();
		}
		this.uiDialog.position( this.options.position );
		if ( !isVisible ) {
			this.uiDialog.hide();
		}
	},

	_setOptions: function( options ) {
		var that = this,
			resize = false,
			resizableOptions = {};

		$.each( options, function( key, value ) {
			that._setOption( key, value );

			if ( key in that.sizeRelatedOptions ) {
				resize = true;
			}
			if ( key in that.resizableRelatedOptions ) {
				resizableOptions[ key ] = value;
			}
		});

		if ( resize ) {
			this._size();
			this._position();
		}
		if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
			this.uiDialog.resizable( "option", resizableOptions );
		}
	},

	_setOption: function( key, value ) {
		var isDraggable, isResizable,
			uiDialog = this.uiDialog;

		if ( key === "dialogClass" ) {
			uiDialog
				.removeClass( this.options.dialogClass )
				.addClass( value );
		}

		if ( key === "disabled" ) {
			return;
		}

		this._super( key, value );

		if ( key === "appendTo" ) {
			this.uiDialog.appendTo( this._appendTo() );
		}

		if ( key === "buttons" ) {
			this._createButtons();
		}

		if ( key === "closeText" ) {
			this.uiDialogTitlebarClose.button({
				// Ensure that we always pass a string
				label: "" + value
			});
		}

		if ( key === "draggable" ) {
			isDraggable = uiDialog.is( ":data(ui-draggable)" );
			if ( isDraggable && !value ) {
				uiDialog.draggable( "destroy" );
			}

			if ( !isDraggable && value ) {
				this._makeDraggable();
			}
		}

		if ( key === "position" ) {
			this._position();
		}

		if ( key === "resizable" ) {
			// currently resizable, becoming non-resizable
			isResizable = uiDialog.is( ":data(ui-resizable)" );
			if ( isResizable && !value ) {
				uiDialog.resizable( "destroy" );
			}

			// currently resizable, changing handles
			if ( isResizable && typeof value === "string" ) {
				uiDialog.resizable( "option", "handles", value );
			}

			// currently non-resizable, becoming resizable
			if ( !isResizable && value !== false ) {
				this._makeResizable();
			}
		}

		if ( key === "title" ) {
			this._title( this.uiDialogTitlebar.find( ".ui-dialog-title" ) );
		}
	},

	_size: function() {
		// If the user has resized the dialog, the .ui-dialog and .ui-dialog-content
		// divs will both have width and height set, so we need to reset them
		var nonContentHeight, minContentHeight, maxContentHeight,
			options = this.options;

		// Reset content sizing
		this.element.show().css({
			width: "auto",
			minHeight: 0,
			maxHeight: "none",
			height: 0
		});

		if ( options.minWidth > options.width ) {
			options.width = options.minWidth;
		}

		// reset wrapper sizing
		// determine the height of all the non-content elements
		nonContentHeight = this.uiDialog.css({
				height: "auto",
				width: options.width
			})
			.outerHeight();
		minContentHeight = Math.max( 0, options.minHeight - nonContentHeight );
		maxContentHeight = typeof options.maxHeight === "number" ?
			Math.max( 0, options.maxHeight - nonContentHeight ) :
			"none";

		if ( options.height === "auto" ) {
			this.element.css({
				minHeight: minContentHeight,
				maxHeight: maxContentHeight,
				height: "auto"
			});
		} else {
			this.element.height( Math.max( 0, options.height - nonContentHeight ) );
		}

		if ( this.uiDialog.is( ":data(ui-resizable)" ) ) {
			this.uiDialog.resizable( "option", "minHeight", this._minHeight() );
		}
	},

	_blockFrames: function() {
		this.iframeBlocks = this.document.find( "iframe" ).map(function() {
			var iframe = $( this );

			return $( "<div>" )
				.css({
					position: "absolute",
					width: iframe.outerWidth(),
					height: iframe.outerHeight()
				})
				.appendTo( iframe.parent() )
				.offset( iframe.offset() )[0];
		});
	},

	_unblockFrames: function() {
		if ( this.iframeBlocks ) {
			this.iframeBlocks.remove();
			delete this.iframeBlocks;
		}
	},

	_allowInteraction: function( event ) {
		if ( $( event.target ).closest( ".ui-dialog" ).length ) {
			return true;
		}

		// TODO: Remove hack when datepicker implements
		// the .ui-front logic (#8989)
		return !!$( event.target ).closest( ".ui-datepicker" ).length;
	},

	_createOverlay: function() {
		if ( !this.options.modal ) {
			return;
		}

		// We use a delay in case the overlay is created from an
		// event that we're going to be cancelling (#2804)
		var isOpening = true;
		this._delay(function() {
			isOpening = false;
		});

		if ( !this.document.data( "ui-dialog-overlays" ) ) {

			// Prevent use of anchors and inputs
			// Using _on() for an event handler shared across many instances is
			// safe because the dialogs stack and must be closed in reverse order
			this._on( this.document, {
				focusin: function( event ) {
					if ( isOpening ) {
						return;
					}

					if ( !this._allowInteraction( event ) ) {
						event.preventDefault();
						this._trackingInstances()[ 0 ]._focusTabbable();
					}
				}
			});
		}

		this.overlay = $( "<div>" )
			.addClass( "ui-widget-overlay ui-front" )
			.appendTo( this._appendTo() );
		this._on( this.overlay, {
			mousedown: "_keepFocus"
		});
		this.document.data( "ui-dialog-overlays",
			(this.document.data( "ui-dialog-overlays" ) || 0) + 1 );
	},

	_destroyOverlay: function() {
		if ( !this.options.modal ) {
			return;
		}

		if ( this.overlay ) {
			var overlays = this.document.data( "ui-dialog-overlays" ) - 1;

			if ( !overlays ) {
				this.document
					.unbind( "focusin" )
					.removeData( "ui-dialog-overlays" );
			} else {
				this.document.data( "ui-dialog-overlays", overlays );
			}

			this.overlay.remove();
			this.overlay = null;
		}
	}
});

}));


/*!
 * jQuery UI Datepicker 1.11.1
 * http://jqueryui.com
 *
 * Copyright 2014 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * http://api.jqueryui.com/datepicker/
 */

(function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"./core"
		], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

$.extend($.ui, { datepicker: { version: "1.11.1" } });

var datepicker_instActive;

function datepicker_getZindex( elem ) {
	var position, value;
	while ( elem.length && elem[ 0 ] !== document ) {
		// Ignore z-index if position is set to a value where z-index is ignored by the browser
		// This makes behavior of this function consistent across browsers
		// WebKit always returns auto if the element is positioned
		position = elem.css( "position" );
		if ( position === "absolute" || position === "relative" || position === "fixed" ) {
			// IE returns 0 when zIndex is not specified
			// other browsers return a string
			// we ignore the case of nested elements with an explicit value of 0
			// <div style="z-index: -10;"><div style="z-index: 0;"></div></div>
			value = parseInt( elem.css( "zIndex" ), 10 );
			if ( !isNaN( value ) && value !== 0 ) {
				return value;
			}
		}
		elem = elem.parent();
	}

	return 0;
}
/* Date picker manager.
   Use the singleton instance of this class, $.datepicker, to interact with the date picker.
   Settings for (groups of) date pickers are maintained in an instance object,
   allowing multiple different settings on the same page. */

function Datepicker() {
	this._curInst = null; // The current instance in use
	this._keyEvent = false; // If the last event was a key event
	this._disabledInputs = []; // List of date picker inputs that have been disabled
	this._datepickerShowing = false; // True if the popup picker is showing , false if not
	this._inDialog = false; // True if showing within a "dialog", false if not
	this._mainDivId = "ui-datepicker-div"; // The ID of the main datepicker division
	this._inlineClass = "ui-datepicker-inline"; // The name of the inline marker class
	this._appendClass = "ui-datepicker-append"; // The name of the append marker class
	this._triggerClass = "ui-datepicker-trigger"; // The name of the trigger marker class
	this._dialogClass = "ui-datepicker-dialog"; // The name of the dialog marker class
	this._disableClass = "ui-datepicker-disabled"; // The name of the disabled covering marker class
	this._unselectableClass = "ui-datepicker-unselectable"; // The name of the unselectable cell marker class
	this._currentClass = "ui-datepicker-current-day"; // The name of the current day marker class
	this._dayOverClass = "ui-datepicker-days-cell-over"; // The name of the day hover marker class
	this.regional = []; // Available regional settings, indexed by language code
	this.regional[""] = { // Default regional settings
		closeText: "Done", // Display text for close link
		prevText: "Prev", // Display text for previous month link
		nextText: "Next", // Display text for next month link
		currentText: "Today", // Display text for current month link
		monthNames: ["January","February","March","April","May","June",
			"July","August","September","October","November","December"], // Names of months for drop-down and formatting
		monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], // For formatting
		dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], // For formatting
		dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], // For formatting
		dayNamesMin: ["Su","Mo","Tu","We","Th","Fr","Sa"], // Column headings for days starting at Sunday
		weekHeader: "Wk", // Column header for week of the year
		dateFormat: "mm/dd/yy", // See format options on parseDate
		firstDay: 0, // The first day of the week, Sun = 0, Mon = 1, ...
		isRTL: false, // True if right-to-left language, false if left-to-right
		showMonthAfterYear: false, // True if the year select precedes month, false for month then year
		yearSuffix: "" // Additional text to append to the year in the month headers
	};
	this._defaults = { // Global defaults for all the date picker instances
		showOn: "focus", // "focus" for popup on focus,
			// "button" for trigger button, or "both" for either
		showAnim: "fadeIn", // Name of jQuery animation for popup
		showOptions: {}, // Options for enhanced animations
		defaultDate: null, // Used when field is blank: actual date,
			// +/-number for offset from today, null for today
		appendText: "", // Display text following the input box, e.g. showing the format
		buttonText: "...", // Text for trigger button
		buttonImage: "", // URL for trigger button image
		buttonImageOnly: false, // True if the image appears alone, false if it appears on a button
		hideIfNoPrevNext: false, // True to hide next/previous month links
			// if not applicable, false to just disable them
		navigationAsDateFormat: false, // True if date formatting applied to prev/today/next links
		gotoCurrent: false, // True if today link goes back to current selection instead
		changeMonth: false, // True if month can be selected directly, false if only prev/next
		changeYear: false, // True if year can be selected directly, false if only prev/next
		yearRange: "c-10:c+10", // Range of years to display in drop-down,
			// either relative to today's year (-nn:+nn), relative to currently displayed year
			// (c-nn:c+nn), absolute (nnnn:nnnn), or a combination of the above (nnnn:-n)
		showOtherMonths: false, // True to show dates in other months, false to leave blank
		selectOtherMonths: false, // True to allow selection of dates in other months, false for unselectable
		showWeek: false, // True to show week of the year, false to not show it
		calculateWeek: this.iso8601Week, // How to calculate the week of the year,
			// takes a Date and returns the number of the week for it
		shortYearCutoff: "+10", // Short year values < this are in the current century,
			// > this are in the previous century,
			// string value starting with "+" for current year + value
		minDate: null, // The earliest selectable date, or null for no limit
		maxDate: null, // The latest selectable date, or null for no limit
		duration: "fast", // Duration of display/closure
		beforeShowDay: null, // Function that takes a date and returns an array with
			// [0] = true if selectable, false if not, [1] = custom CSS class name(s) or "",
			// [2] = cell title (optional), e.g. $.datepicker.noWeekends
		beforeShow: null, // Function that takes an input field and
			// returns a set of custom settings for the date picker
		onSelect: null, // Define a callback function when a date is selected
		onChangeMonthYear: null, // Define a callback function when the month or year is changed
		onClose: null, // Define a callback function when the datepicker is closed
		numberOfMonths: 1, // Number of months to show at a time
		showCurrentAtPos: 0, // The position in multipe months at which to show the current month (starting at 0)
		stepMonths: 1, // Number of months to step back/forward
		stepBigMonths: 12, // Number of months to step back/forward for the big links
		altField: "", // Selector for an alternate field to store selected dates into
		altFormat: "", // The date format to use for the alternate field
		constrainInput: true, // The input is constrained by the current date format
		showButtonPanel: false, // True to show button panel, false to not show it
		autoSize: false, // True to size the input for the date format, false to leave as is
		disabled: false // The initial disabled state
	};
	$.extend(this._defaults, this.regional[""]);
	this.regional.en = $.extend( true, {}, this.regional[ "" ]);
	this.regional[ "en-US" ] = $.extend( true, {}, this.regional.en );
	this.dpDiv = datepicker_bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"));
}

$.extend(Datepicker.prototype, {
	/* Class name added to elements to indicate already configured with a date picker. */
	markerClassName: "hasDatepicker",

	//Keep track of the maximum number of rows displayed (see #7043)
	maxRows: 4,

	// TODO rename to "widget" when switching to widget factory
	_widgetDatepicker: function() {
		return this.dpDiv;
	},

	/* Override the default settings for all instances of the date picker.
	 * @param  settings  object - the new settings to use as defaults (anonymous object)
	 * @return the manager object
	 */
	setDefaults: function(settings) {
		datepicker_extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Attach the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 * @param  settings  object - the new settings to use for this date picker instance (anonymous)
	 */
	_attachDatepicker: function(target, settings) {
		var nodeName, inline, inst;
		nodeName = target.nodeName.toLowerCase();
		inline = (nodeName === "div" || nodeName === "span");
		if (!target.id) {
			this.uuid += 1;
			target.id = "dp" + this.uuid;
		}
		inst = this._newInst($(target), inline);
		inst.settings = $.extend({}, settings || {});
		if (nodeName === "input") {
			this._connectDatepicker(target, inst);
		} else if (inline) {
			this._inlineDatepicker(target, inst);
		}
	},

	/* Create a new instance object. */
	_newInst: function(target, inline) {
		var id = target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"); // escape jQuery meta chars
		return {id: id, input: target, // associated target
			selectedDay: 0, selectedMonth: 0, selectedYear: 0, // current selection
			drawMonth: 0, drawYear: 0, // month being drawn
			inline: inline, // is datepicker inline or not
			dpDiv: (!inline ? this.dpDiv : // presentation div
			datepicker_bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")))};
	},

	/* Attach the date picker to an input field. */
	_connectDatepicker: function(target, inst) {
		var input = $(target);
		inst.append = $([]);
		inst.trigger = $([]);
		if (input.hasClass(this.markerClassName)) {
			return;
		}
		this._attachments(input, inst);
		input.addClass(this.markerClassName).keydown(this._doKeyDown).
			keypress(this._doKeyPress).keyup(this._doKeyUp);
		this._autoSize(inst);
		$.data(target, "datepicker", inst);
		//If disabled option is true, disable the datepicker once it has been attached to the input (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
	},

	/* Make attachments based on settings. */
	_attachments: function(input, inst) {
		var showOn, buttonText, buttonImage,
			appendText = this._get(inst, "appendText"),
			isRTL = this._get(inst, "isRTL");

		if (inst.append) {
			inst.append.remove();
		}
		if (appendText) {
			inst.append = $("<span class='" + this._appendClass + "'>" + appendText + "</span>");
			input[isRTL ? "before" : "after"](inst.append);
		}

		input.unbind("focus", this._showDatepicker);

		if (inst.trigger) {
			inst.trigger.remove();
		}

		showOn = this._get(inst, "showOn");
		if (showOn === "focus" || showOn === "both") { // pop-up date picker when in the marked field
			input.focus(this._showDatepicker);
		}
		if (showOn === "button" || showOn === "both") { // pop-up date picker when button clicked
			buttonText = this._get(inst, "buttonText");
			buttonImage = this._get(inst, "buttonImage");
			inst.trigger = $(this._get(inst, "buttonImageOnly") ?
				$("<img/>").addClass(this._triggerClass).
					attr({ src: buttonImage, alt: buttonText, title: buttonText }) :
				$("<button type='button'></button>").addClass(this._triggerClass).
					html(!buttonImage ? buttonText : $("<img/>").attr(
					{ src:buttonImage, alt:buttonText, title:buttonText })));
			input[isRTL ? "before" : "after"](inst.trigger);
			inst.trigger.click(function() {
				if ($.datepicker._datepickerShowing && $.datepicker._lastInput === input[0]) {
					$.datepicker._hideDatepicker();
				} else if ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0]) {
					$.datepicker._hideDatepicker();
					$.datepicker._showDatepicker(input[0]);
				} else {
					$.datepicker._showDatepicker(input[0]);
				}
				return false;
			});
		}
	},

	/* Apply the maximum length for the date format. */
	_autoSize: function(inst) {
		if (this._get(inst, "autoSize") && !inst.inline) {
			var findMax, max, maxI, i,
				date = new Date(2009, 12 - 1, 20), // Ensure double digits
				dateFormat = this._get(inst, "dateFormat");

			if (dateFormat.match(/[DM]/)) {
				findMax = function(names) {
					max = 0;
					maxI = 0;
					for (i = 0; i < names.length; i++) {
						if (names[i].length > max) {
							max = names[i].length;
							maxI = i;
						}
					}
					return maxI;
				};
				date.setMonth(findMax(this._get(inst, (dateFormat.match(/MM/) ?
					"monthNames" : "monthNamesShort"))));
				date.setDate(findMax(this._get(inst, (dateFormat.match(/DD/) ?
					"dayNames" : "dayNamesShort"))) + 20 - date.getDay());
			}
			inst.input.attr("size", this._formatDate(inst, date).length);
		}
	},

	/* Attach an inline date picker to a div. */
	_inlineDatepicker: function(target, inst) {
		var divSpan = $(target);
		if (divSpan.hasClass(this.markerClassName)) {
			return;
		}
		divSpan.addClass(this.markerClassName).append(inst.dpDiv);
		$.data(target, "datepicker", inst);
		this._setDate(inst, this._getDefaultDate(inst), true);
		this._updateDatepicker(inst);
		this._updateAlternate(inst);
		//If disabled option is true, disable the datepicker before showing it (see ticket #5665)
		if( inst.settings.disabled ) {
			this._disableDatepicker( target );
		}
		// Set display:block in place of inst.dpDiv.show() which won't work on disconnected elements
		// http://bugs.jqueryui.com/ticket/7552 - A Datepicker created on a detached div has zero height
		inst.dpDiv.css( "display", "block" );
	},

	/* Pop-up the date picker in a "dialog" box.
	 * @param  input element - ignored
	 * @param  date	string or Date - the initial date to display
	 * @param  onSelect  function - the function to call when a date is selected
	 * @param  settings  object - update the dialog date picker instance's settings (anonymous object)
	 * @param  pos int[2] - coordinates for the dialog's position within the screen or
	 *					event - with x/y coordinates or
	 *					leave empty for default (screen centre)
	 * @return the manager object
	 */
	_dialogDatepicker: function(input, date, onSelect, settings, pos) {
		var id, browserWidth, browserHeight, scrollX, scrollY,
			inst = this._dialogInst; // internal instance

		if (!inst) {
			this.uuid += 1;
			id = "dp" + this.uuid;
			this._dialogInput = $("<input type='text' id='" + id +
				"' style='position: absolute; top: -100px; width: 0px;'/>");
			this._dialogInput.keydown(this._doKeyDown);
			$("body").append(this._dialogInput);
			inst = this._dialogInst = this._newInst(this._dialogInput, false);
			inst.settings = {};
			$.data(this._dialogInput[0], "datepicker", inst);
		}
		datepicker_extendRemove(inst.settings, settings || {});
		date = (date && date.constructor === Date ? this._formatDate(inst, date) : date);
		this._dialogInput.val(date);

		this._pos = (pos ? (pos.length ? pos : [pos.pageX, pos.pageY]) : null);
		if (!this._pos) {
			browserWidth = document.documentElement.clientWidth;
			browserHeight = document.documentElement.clientHeight;
			scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			this._pos = // should use actual width/height below
				[(browserWidth / 2) - 100 + scrollX, (browserHeight / 2) - 150 + scrollY];
		}

		// move input on screen for focus, but hidden behind dialog
		this._dialogInput.css("left", (this._pos[0] + 20) + "px").css("top", this._pos[1] + "px");
		inst.settings.onSelect = onSelect;
		this._inDialog = true;
		this.dpDiv.addClass(this._dialogClass);
		this._showDatepicker(this._dialogInput[0]);
		if ($.blockUI) {
			$.blockUI(this.dpDiv);
		}
		$.data(this._dialogInput[0], "datepicker", inst);
		return this;
	},

	/* Detach a datepicker from its control.
	 * @param  target	element - the target input field or division or span
	 */
	_destroyDatepicker: function(target) {
		var nodeName,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		$.removeData(target, "datepicker");
		if (nodeName === "input") {
			inst.append.remove();
			inst.trigger.remove();
			$target.removeClass(this.markerClassName).
				unbind("focus", this._showDatepicker).
				unbind("keydown", this._doKeyDown).
				unbind("keypress", this._doKeyPress).
				unbind("keyup", this._doKeyUp);
		} else if (nodeName === "div" || nodeName === "span") {
			$target.removeClass(this.markerClassName).empty();
		}
	},

	/* Enable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_enableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = false;
			inst.trigger.filter("button").
				each(function() { this.disabled = false; }).end().
				filter("img").css({opacity: "1.0", cursor: ""});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().removeClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", false);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
	},

	/* Disable the date picker to a jQuery selection.
	 * @param  target	element - the target input field or division or span
	 */
	_disableDatepicker: function(target) {
		var nodeName, inline,
			$target = $(target),
			inst = $.data(target, "datepicker");

		if (!$target.hasClass(this.markerClassName)) {
			return;
		}

		nodeName = target.nodeName.toLowerCase();
		if (nodeName === "input") {
			target.disabled = true;
			inst.trigger.filter("button").
				each(function() { this.disabled = true; }).end().
				filter("img").css({opacity: "0.5", cursor: "default"});
		} else if (nodeName === "div" || nodeName === "span") {
			inline = $target.children("." + this._inlineClass);
			inline.children().addClass("ui-state-disabled");
			inline.find("select.ui-datepicker-month, select.ui-datepicker-year").
				prop("disabled", true);
		}
		this._disabledInputs = $.map(this._disabledInputs,
			function(value) { return (value === target ? null : value); }); // delete entry
		this._disabledInputs[this._disabledInputs.length] = target;
	},

	/* Is the first field in a jQuery collection disabled as a datepicker?
	 * @param  target	element - the target input field or division or span
	 * @return boolean - true if disabled, false if enabled
	 */
	_isDisabledDatepicker: function(target) {
		if (!target) {
			return false;
		}
		for (var i = 0; i < this._disabledInputs.length; i++) {
			if (this._disabledInputs[i] === target) {
				return true;
			}
		}
		return false;
	},

	/* Retrieve the instance data for the target control.
	 * @param  target  element - the target input field or division or span
	 * @return  object - the associated instance data
	 * @throws  error if a jQuery problem getting data
	 */
	_getInst: function(target) {
		try {
			return $.data(target, "datepicker");
		}
		catch (err) {
			throw "Missing instance data for this datepicker";
		}
	},

	/* Update or retrieve the settings for a date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 * @param  name	object - the new settings to update or
	 *				string - the name of the setting to change or retrieve,
	 *				when retrieving also "all" for all instance settings or
	 *				"defaults" for all global defaults
	 * @param  value   any - the new value for the setting
	 *				(omit if above is an object or to retrieve a value)
	 */
	_optionDatepicker: function(target, name, value) {
		var settings, date, minDate, maxDate,
			inst = this._getInst(target);

		if (arguments.length === 2 && typeof name === "string") {
			return (name === "defaults" ? $.extend({}, $.datepicker._defaults) :
				(inst ? (name === "all" ? $.extend({}, inst.settings) :
				this._get(inst, name)) : null));
		}

		settings = name || {};
		if (typeof name === "string") {
			settings = {};
			settings[name] = value;
		}

		if (inst) {
			if (this._curInst === inst) {
				this._hideDatepicker();
			}

			date = this._getDateDatepicker(target, true);
			minDate = this._getMinMaxDate(inst, "min");
			maxDate = this._getMinMaxDate(inst, "max");
			datepicker_extendRemove(inst.settings, settings);
			// reformat the old minDate/maxDate values if dateFormat changes and a new minDate/maxDate isn't provided
			if (minDate !== null && settings.dateFormat !== undefined && settings.minDate === undefined) {
				inst.settings.minDate = this._formatDate(inst, minDate);
			}
			if (maxDate !== null && settings.dateFormat !== undefined && settings.maxDate === undefined) {
				inst.settings.maxDate = this._formatDate(inst, maxDate);
			}
			if ( "disabled" in settings ) {
				if ( settings.disabled ) {
					this._disableDatepicker(target);
				} else {
					this._enableDatepicker(target);
				}
			}
			this._attachments($(target), inst);
			this._autoSize(inst);
			this._setDate(inst, date);
			this._updateAlternate(inst);
			this._updateDatepicker(inst);
		}
	},

	// change method deprecated
	_changeDatepicker: function(target, name, value) {
		this._optionDatepicker(target, name, value);
	},

	/* Redraw the date picker attached to an input field or division.
	 * @param  target  element - the target input field or division or span
	 */
	_refreshDatepicker: function(target) {
		var inst = this._getInst(target);
		if (inst) {
			this._updateDatepicker(inst);
		}
	},

	/* Set the dates for a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  date	Date - the new date
	 */
	_setDateDatepicker: function(target, date) {
		var inst = this._getInst(target);
		if (inst) {
			this._setDate(inst, date);
			this._updateDatepicker(inst);
			this._updateAlternate(inst);
		}
	},

	/* Get the date(s) for the first entry in a jQuery selection.
	 * @param  target element - the target input field or division or span
	 * @param  noDefault boolean - true if no default date is to be used
	 * @return Date - the current date
	 */
	_getDateDatepicker: function(target, noDefault) {
		var inst = this._getInst(target);
		if (inst && !inst.inline) {
			this._setDateFromField(inst, noDefault);
		}
		return (inst ? this._getDate(inst) : null);
	},

	/* Handle keystrokes. */
	_doKeyDown: function(event) {
		var onSelect, dateStr, sel,
			inst = $.datepicker._getInst(event.target),
			handled = true,
			isRTL = inst.dpDiv.is(".ui-datepicker-rtl");

		inst._keyEvent = true;
		if ($.datepicker._datepickerShowing) {
			switch (event.keyCode) {
				case 9: $.datepicker._hideDatepicker();
						handled = false;
						break; // hide on tab out
				case 13: sel = $("td." + $.datepicker._dayOverClass + ":not(." +
									$.datepicker._currentClass + ")", inst.dpDiv);
						if (sel[0]) {
							$.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, sel[0]);
						}

						onSelect = $.datepicker._get(inst, "onSelect");
						if (onSelect) {
							dateStr = $.datepicker._formatDate(inst);

							// trigger custom callback
							onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);
						} else {
							$.datepicker._hideDatepicker();
						}

						return false; // don't submit the form
				case 27: $.datepicker._hideDatepicker();
						break; // hide on escape
				case 33: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							-$.datepicker._get(inst, "stepBigMonths") :
							-$.datepicker._get(inst, "stepMonths")), "M");
						break; // previous month/year on page up/+ ctrl
				case 34: $.datepicker._adjustDate(event.target, (event.ctrlKey ?
							+$.datepicker._get(inst, "stepBigMonths") :
							+$.datepicker._get(inst, "stepMonths")), "M");
						break; // next month/year on page down/+ ctrl
				case 35: if (event.ctrlKey || event.metaKey) {
							$.datepicker._clearDate(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // clear on ctrl or command +end
				case 36: if (event.ctrlKey || event.metaKey) {
							$.datepicker._gotoToday(event.target);
						}
						handled = event.ctrlKey || event.metaKey;
						break; // current on ctrl or command +home
				case 37: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? +1 : -1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// -1 day on ctrl or command +left
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								-$.datepicker._get(inst, "stepBigMonths") :
								-$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +left on Mac
						break;
				case 38: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, -7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // -1 week on ctrl or command +up
				case 39: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, (isRTL ? -1 : +1), "D");
						}
						handled = event.ctrlKey || event.metaKey;
						// +1 day on ctrl or command +right
						if (event.originalEvent.altKey) {
							$.datepicker._adjustDate(event.target, (event.ctrlKey ?
								+$.datepicker._get(inst, "stepBigMonths") :
								+$.datepicker._get(inst, "stepMonths")), "M");
						}
						// next month/year on alt +right
						break;
				case 40: if (event.ctrlKey || event.metaKey) {
							$.datepicker._adjustDate(event.target, +7, "D");
						}
						handled = event.ctrlKey || event.metaKey;
						break; // +1 week on ctrl or command +down
				default: handled = false;
			}
		} else if (event.keyCode === 36 && event.ctrlKey) { // display the date picker on ctrl+home
			$.datepicker._showDatepicker(this);
		} else {
			handled = false;
		}

		if (handled) {
			event.preventDefault();
			event.stopPropagation();
		}
	},

	/* Filter entered characters - based on date format. */
	_doKeyPress: function(event) {
		var chars, chr,
			inst = $.datepicker._getInst(event.target);

		if ($.datepicker._get(inst, "constrainInput")) {
			chars = $.datepicker._possibleChars($.datepicker._get(inst, "dateFormat"));
			chr = String.fromCharCode(event.charCode == null ? event.keyCode : event.charCode);
			return event.ctrlKey || event.metaKey || (chr < " " || !chars || chars.indexOf(chr) > -1);
		}
	},

	/* Synchronise manual entry and field/alternate field. */
	_doKeyUp: function(event) {
		var date,
			inst = $.datepicker._getInst(event.target);

		if (inst.input.val() !== inst.lastVal) {
			try {
				date = $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
					(inst.input ? inst.input.val() : null),
					$.datepicker._getFormatConfig(inst));

				if (date) { // only if valid
					$.datepicker._setDateFromField(inst);
					$.datepicker._updateAlternate(inst);
					$.datepicker._updateDatepicker(inst);
				}
			}
			catch (err) {
			}
		}
		return true;
	},

	/* Pop-up the date picker for a given input field.
	 * If false returned from beforeShow event handler do not show.
	 * @param  input  element - the input field attached to the date picker or
	 *					event - if triggered by focus
	 */
	_showDatepicker: function(input) {
		input = input.target || input;
		if (input.nodeName.toLowerCase() !== "input") { // find from button/image trigger
			input = $("input", input.parentNode)[0];
		}

		if ($.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input) { // already here
			return;
		}

		var inst, beforeShow, beforeShowSettings, isFixed,
			offset, showAnim, duration;

		inst = $.datepicker._getInst(input);
		if ($.datepicker._curInst && $.datepicker._curInst !== inst) {
			$.datepicker._curInst.dpDiv.stop(true, true);
			if ( inst && $.datepicker._datepickerShowing ) {
				$.datepicker._hideDatepicker( $.datepicker._curInst.input[0] );
			}
		}

		beforeShow = $.datepicker._get(inst, "beforeShow");
		beforeShowSettings = beforeShow ? beforeShow.apply(input, [input, inst]) : {};
		if(beforeShowSettings === false){
			return;
		}
		datepicker_extendRemove(inst.settings, beforeShowSettings);

		inst.lastVal = null;
		$.datepicker._lastInput = input;
		$.datepicker._setDateFromField(inst);

		if ($.datepicker._inDialog) { // hide cursor
			input.value = "";
		}
		if (!$.datepicker._pos) { // position below input
			$.datepicker._pos = $.datepicker._findPos(input);
			$.datepicker._pos[1] += input.offsetHeight; // add the height
		}

		isFixed = false;
		$(input).parents().each(function() {
			isFixed |= $(this).css("position") === "fixed";
			return !isFixed;
		});

		offset = {left: $.datepicker._pos[0], top: $.datepicker._pos[1]};
		$.datepicker._pos = null;
		//to avoid flashes on Firefox
		inst.dpDiv.empty();
		// determine sizing offscreen
		inst.dpDiv.css({position: "absolute", display: "block", top: "-1000px"});
		$.datepicker._updateDatepicker(inst);
		// fix width for dynamic number of date pickers
		// and adjust position before showing
		offset = $.datepicker._checkOffset(inst, offset, isFixed);
		inst.dpDiv.css({position: ($.datepicker._inDialog && $.blockUI ?
			"static" : (isFixed ? "fixed" : "absolute")), display: "none",
			left: offset.left + "px", top: offset.top + "px"});

		if (!inst.inline) {
			showAnim = $.datepicker._get(inst, "showAnim");
			duration = $.datepicker._get(inst, "duration");
			inst.dpDiv.css( "z-index", datepicker_getZindex( $( input ) ) + 1 );
			$.datepicker._datepickerShowing = true;

			if ( $.effects && $.effects.effect[ showAnim ] ) {
				inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration);
			} else {
				inst.dpDiv[showAnim || "show"](showAnim ? duration : null);
			}

			if ( $.datepicker._shouldFocusInput( inst ) ) {
				inst.input.focus();
			}

			$.datepicker._curInst = inst;
		}
	},

	/* Generate the date picker content. */
	_updateDatepicker: function(inst) {
		this.maxRows = 4; //Reset the max number of rows being displayed (see #7043)
		datepicker_instActive = inst; // for delegate hover events
		inst.dpDiv.empty().append(this._generateHTML(inst));
		this._attachHandlers(inst);

		var origyearshtml,
			numMonths = this._getNumberOfMonths(inst),
			cols = numMonths[1],
			width = 17,
			activeCell = inst.dpDiv.find( "." + this._dayOverClass + " a" );

		if ( activeCell.length > 0 ) {
			datepicker_handleMouseover.apply( activeCell.get( 0 ) );
		}

		inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
		if (cols > 1) {
			inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", (width * cols) + "em");
		}
		inst.dpDiv[(numMonths[0] !== 1 || numMonths[1] !== 1 ? "add" : "remove") +
			"Class"]("ui-datepicker-multi");
		inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") +
			"Class"]("ui-datepicker-rtl");

		if (inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput( inst ) ) {
			inst.input.focus();
		}

		// deffered render of the years select (to avoid flashes on Firefox)
		if( inst.yearshtml ){
			origyearshtml = inst.yearshtml;
			setTimeout(function(){
				//assure that inst.yearshtml didn't change.
				if( origyearshtml === inst.yearshtml && inst.yearshtml ){
					inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml);
				}
				origyearshtml = inst.yearshtml = null;
			}, 0);
		}
	},

	// #6694 - don't focus the input if it's already focused
	// this breaks the change event in IE
	// Support: IE and jQuery <1.9
	_shouldFocusInput: function( inst ) {
		return inst.input && inst.input.is( ":visible" ) && !inst.input.is( ":disabled" ) && !inst.input.is( ":focus" );
	},

	/* Check positioning to remain on screen. */
	_checkOffset: function(inst, offset, isFixed) {
		var dpWidth = inst.dpDiv.outerWidth(),
			dpHeight = inst.dpDiv.outerHeight(),
			inputWidth = inst.input ? inst.input.outerWidth() : 0,
			inputHeight = inst.input ? inst.input.outerHeight() : 0,
			viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft()),
			viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());

		offset.left -= (this._get(inst, "isRTL") ? (dpWidth - inputWidth) : 0);
		offset.left -= (isFixed && offset.left === inst.input.offset().left) ? $(document).scrollLeft() : 0;
		offset.top -= (isFixed && offset.top === (inst.input.offset().top + inputHeight)) ? $(document).scrollTop() : 0;

		// now check if datepicker is showing outside window viewport - move to a better place if so.
		offset.left -= Math.min(offset.left, (offset.left + dpWidth > viewWidth && viewWidth > dpWidth) ?
			Math.abs(offset.left + dpWidth - viewWidth) : 0);
		offset.top -= Math.min(offset.top, (offset.top + dpHeight > viewHeight && viewHeight > dpHeight) ?
			Math.abs(dpHeight + inputHeight) : 0);

		return offset;
	},

	/* Find an object's position on the screen. */
	_findPos: function(obj) {
		var position,
			inst = this._getInst(obj),
			isRTL = this._get(inst, "isRTL");

		while (obj && (obj.type === "hidden" || obj.nodeType !== 1 || $.expr.filters.hidden(obj))) {
			obj = obj[isRTL ? "previousSibling" : "nextSibling"];
		}

		position = $(obj).offset();
		return [position.left, position.top];
	},

	/* Hide the date picker from view.
	 * @param  input  element - the input field attached to the date picker
	 */
	_hideDatepicker: function(input) {
		var showAnim, duration, postProcess, onClose,
			inst = this._curInst;

		if (!inst || (input && inst !== $.data(input, "datepicker"))) {
			return;
		}

		if (this._datepickerShowing) {
			showAnim = this._get(inst, "showAnim");
			duration = this._get(inst, "duration");
			postProcess = function() {
				$.datepicker._tidyDialog(inst);
			};

			// DEPRECATED: after BC for 1.8.x $.effects[ showAnim ] is not needed
			if ( $.effects && ( $.effects.effect[ showAnim ] || $.effects[ showAnim ] ) ) {
				inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, postProcess);
			} else {
				inst.dpDiv[(showAnim === "slideDown" ? "slideUp" :
					(showAnim === "fadeIn" ? "fadeOut" : "hide"))]((showAnim ? duration : null), postProcess);
			}

			if (!showAnim) {
				postProcess();
			}
			this._datepickerShowing = false;

			onClose = this._get(inst, "onClose");
			if (onClose) {
				onClose.apply((inst.input ? inst.input[0] : null), [(inst.input ? inst.input.val() : ""), inst]);
			}

			this._lastInput = null;
			if (this._inDialog) {
				this._dialogInput.css({ position: "absolute", left: "0", top: "-100px" });
				if ($.blockUI) {
					$.unblockUI();
					$("body").append(this.dpDiv);
				}
			}
			this._inDialog = false;
		}
	},

	/* Tidy up after a dialog display. */
	_tidyDialog: function(inst) {
		inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar");
	},

	/* Close date picker if clicked elsewhere. */
	_checkExternalClick: function(event) {
		if (!$.datepicker._curInst) {
			return;
		}

		var $target = $(event.target),
			inst = $.datepicker._getInst($target[0]);

		if ( ( ( $target[0].id !== $.datepicker._mainDivId &&
				$target.parents("#" + $.datepicker._mainDivId).length === 0 &&
				!$target.hasClass($.datepicker.markerClassName) &&
				!$target.closest("." + $.datepicker._triggerClass).length &&
				$.datepicker._datepickerShowing && !($.datepicker._inDialog && $.blockUI) ) ) ||
			( $target.hasClass($.datepicker.markerClassName) && $.datepicker._curInst !== inst ) ) {
				$.datepicker._hideDatepicker();
		}
	},

	/* Adjust one of the date sub-fields. */
	_adjustDate: function(id, offset, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		if (this._isDisabledDatepicker(target[0])) {
			return;
		}
		this._adjustInstDate(inst, offset +
			(period === "M" ? this._get(inst, "showCurrentAtPos") : 0), // undo positioning
			period);
		this._updateDatepicker(inst);
	},

	/* Action for current link. */
	_gotoToday: function(id) {
		var date,
			target = $(id),
			inst = this._getInst(target[0]);

		if (this._get(inst, "gotoCurrent") && inst.currentDay) {
			inst.selectedDay = inst.currentDay;
			inst.drawMonth = inst.selectedMonth = inst.currentMonth;
			inst.drawYear = inst.selectedYear = inst.currentYear;
		} else {
			date = new Date();
			inst.selectedDay = date.getDate();
			inst.drawMonth = inst.selectedMonth = date.getMonth();
			inst.drawYear = inst.selectedYear = date.getFullYear();
		}
		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a new month/year. */
	_selectMonthYear: function(id, select, period) {
		var target = $(id),
			inst = this._getInst(target[0]);

		inst["selected" + (period === "M" ? "Month" : "Year")] =
		inst["draw" + (period === "M" ? "Month" : "Year")] =
			parseInt(select.options[select.selectedIndex].value,10);

		this._notifyChange(inst);
		this._adjustDate(target);
	},

	/* Action for selecting a day. */
	_selectDay: function(id, month, year, td) {
		var inst,
			target = $(id);

		if ($(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(target[0])) {
			return;
		}

		inst = this._getInst(target[0]);
		inst.selectedDay = inst.currentDay = $("a", td).html();
		inst.selectedMonth = inst.currentMonth = month;
		inst.selectedYear = inst.currentYear = year;
		this._selectDate(id, this._formatDate(inst,
			inst.currentDay, inst.currentMonth, inst.currentYear));
	},

	/* Erase the input field and hide the date picker. */
	_clearDate: function(id) {
		var target = $(id);
		this._selectDate(target, "");
	},

	/* Update the input field with the selected date. */
	_selectDate: function(id, dateStr) {
		var onSelect,
			target = $(id),
			inst = this._getInst(target[0]);

		dateStr = (dateStr != null ? dateStr : this._formatDate(inst));
		if (inst.input) {
			inst.input.val(dateStr);
		}
		this._updateAlternate(inst);

		onSelect = this._get(inst, "onSelect");
		if (onSelect) {
			onSelect.apply((inst.input ? inst.input[0] : null), [dateStr, inst]);  // trigger custom callback
		} else if (inst.input) {
			inst.input.trigger("change"); // fire the change event
		}

		if (inst.inline){
			this._updateDatepicker(inst);
		} else {
			this._hideDatepicker();
			this._lastInput = inst.input[0];
			if (typeof(inst.input[0]) !== "object") {
				inst.input.focus(); // restore focus
			}
			this._lastInput = null;
		}
	},

	/* Update any alternate field to synchronise with the main field. */
	_updateAlternate: function(inst) {
		var altFormat, date, dateStr,
			altField = this._get(inst, "altField");

		if (altField) { // update alternate field too
			altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat");
			date = this._getDate(inst);
			dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst));
			$(altField).each(function() { $(this).val(dateStr); });
		}
	},

	/* Set as beforeShowDay function to prevent selection of weekends.
	 * @param  date  Date - the date to customise
	 * @return [boolean, string] - is this date selectable?, what is its CSS class?
	 */
	noWeekends: function(date) {
		var day = date.getDay();
		return [(day > 0 && day < 6), ""];
	},

	/* Set as calculateWeek to determine the week of the year based on the ISO 8601 definition.
	 * @param  date  Date - the date to get the week for
	 * @return  number - the number of the week within the year that contains this date
	 */
	iso8601Week: function(date) {
		var time,
			checkDate = new Date(date.getTime());

		// Find Thursday of this week starting on Monday
		checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));

		time = checkDate.getTime();
		checkDate.setMonth(0); // Compare with Jan 1
		checkDate.setDate(1);
		return Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
	},

	/* Parse a string value into a date object.
	 * See formatDate below for the possible formats.
	 *
	 * @param  format string - the expected format of the date
	 * @param  value string - the date in the above format
	 * @param  settings Object - attributes include:
	 *					shortYearCutoff  number - the cutoff year for determining the century (optional)
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  Date - the extracted date value or null if value is blank
	 */
	parseDate: function (format, value, settings) {
		if (format == null || value == null) {
			throw "Invalid arguments";
		}

		value = (typeof value === "object" ? value.toString() : value + "");
		if (value === "") {
			return null;
		}

		var iFormat, dim, extra,
			iValue = 0,
			shortYearCutoffTemp = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff,
			shortYearCutoff = (typeof shortYearCutoffTemp !== "string" ? shortYearCutoffTemp :
				new Date().getFullYear() % 100 + parseInt(shortYearCutoffTemp, 10)),
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			year = -1,
			month = -1,
			day = -1,
			doy = -1,
			literal = false,
			date,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Extract a number from the string value
			getNumber = function(match) {
				var isDoubled = lookAhead(match),
					size = (match === "@" ? 14 : (match === "!" ? 20 :
					(match === "y" && isDoubled ? 4 : (match === "o" ? 3 : 2)))),
					minSize = (match === "y" ? size : 1),
					digits = new RegExp("^\\d{" + minSize + "," + size + "}"),
					num = value.substring(iValue).match(digits);
				if (!num) {
					throw "Missing number at position " + iValue;
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			},
			// Extract a name from the string value and convert to an index
			getName = function(match, shortNames, longNames) {
				var index = -1,
					names = $.map(lookAhead(match) ? longNames : shortNames, function (v, k) {
						return [ [k, v] ];
					}).sort(function (a, b) {
						return -(a[1].length - b[1].length);
					});

				$.each(names, function (i, pair) {
					var name = pair[1];
					if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase()) {
						index = pair[0];
						iValue += name.length;
						return false;
					}
				});
				if (index !== -1) {
					return index + 1;
				} else {
					throw "Unknown name at position " + iValue;
				}
			},
			// Confirm that a literal character matches the string value
			checkLiteral = function() {
				if (value.charAt(iValue) !== format.charAt(iFormat)) {
					throw "Unexpected literal at position " + iValue;
				}
				iValue++;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					checkLiteral();
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d":
						day = getNumber("d");
						break;
					case "D":
						getName("D", dayNamesShort, dayNames);
						break;
					case "o":
						doy = getNumber("o");
						break;
					case "m":
						month = getNumber("m");
						break;
					case "M":
						month = getName("M", monthNamesShort, monthNames);
						break;
					case "y":
						year = getNumber("y");
						break;
					case "@":
						date = new Date(getNumber("@"));
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "!":
						date = new Date((getNumber("!") - this._ticksTo1970) / 10000);
						year = date.getFullYear();
						month = date.getMonth() + 1;
						day = date.getDate();
						break;
					case "'":
						if (lookAhead("'")){
							checkLiteral();
						} else {
							literal = true;
						}
						break;
					default:
						checkLiteral();
				}
			}
		}

		if (iValue < value.length){
			extra = value.substr(iValue);
			if (!/^\s+/.test(extra)) {
				throw "Extra/unparsed characters found in date: " + extra;
			}
		}

		if (year === -1) {
			year = new Date().getFullYear();
		} else if (year < 100) {
			year += new Date().getFullYear() - new Date().getFullYear() % 100 +
				(year <= shortYearCutoff ? 0 : -100);
		}

		if (doy > -1) {
			month = 1;
			day = doy;
			do {
				dim = this._getDaysInMonth(year, month - 1);
				if (day <= dim) {
					break;
				}
				month++;
				day -= dim;
			} while (true);
		}

		date = this._daylightSavingAdjust(new Date(year, month - 1, day));
		if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
			throw "Invalid date"; // E.g. 31/02/00
		}
		return date;
	},

	/* Standard date formats. */
	ATOM: "yy-mm-dd", // RFC 3339 (ISO 8601)
	COOKIE: "D, dd M yy",
	ISO_8601: "yy-mm-dd",
	RFC_822: "D, d M y",
	RFC_850: "DD, dd-M-y",
	RFC_1036: "D, d M y",
	RFC_1123: "D, d M yy",
	RFC_2822: "D, d M yy",
	RSS: "D, d M y", // RFC 822
	TICKS: "!",
	TIMESTAMP: "@",
	W3C: "yy-mm-dd", // ISO 8601

	_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
		Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),

	/* Format a date object into a string value.
	 * The format can be combinations of the following:
	 * d  - day of month (no leading zero)
	 * dd - day of month (two digit)
	 * o  - day of year (no leading zeros)
	 * oo - day of year (three digit)
	 * D  - day name short
	 * DD - day name long
	 * m  - month of year (no leading zero)
	 * mm - month of year (two digit)
	 * M  - month name short
	 * MM - month name long
	 * y  - year (two digit)
	 * yy - year (four digit)
	 * @ - Unix timestamp (ms since 01/01/1970)
	 * ! - Windows ticks (100ns since 01/01/0001)
	 * "..." - literal text
	 * '' - single quote
	 *
	 * @param  format string - the desired format of the date
	 * @param  date Date - the date value to format
	 * @param  settings Object - attributes include:
	 *					dayNamesShort	string[7] - abbreviated names of the days from Sunday (optional)
	 *					dayNames		string[7] - names of the days from Sunday (optional)
	 *					monthNamesShort string[12] - abbreviated names of the months (optional)
	 *					monthNames		string[12] - names of the months (optional)
	 * @return  string - the date in the above format
	 */
	formatDate: function (format, date, settings) {
		if (!date) {
			return "";
		}

		var iFormat,
			dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort,
			dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames,
			monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort,
			monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			},
			// Format a number, with leading zero if necessary
			formatNumber = function(match, value, len) {
				var num = "" + value;
				if (lookAhead(match)) {
					while (num.length < len) {
						num = "0" + num;
					}
				}
				return num;
			},
			// Format a name, short or long as requested
			formatName = function(match, value, shortNames, longNames) {
				return (lookAhead(match) ? longNames[value] : shortNames[value]);
			},
			output = "",
			literal = false;

		if (date) {
			for (iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
						literal = false;
					} else {
						output += format.charAt(iFormat);
					}
				} else {
					switch (format.charAt(iFormat)) {
						case "d":
							output += formatNumber("d", date.getDate(), 2);
							break;
						case "D":
							output += formatName("D", date.getDay(), dayNamesShort, dayNames);
							break;
						case "o":
							output += formatNumber("o",
								Math.round((new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000), 3);
							break;
						case "m":
							output += formatNumber("m", date.getMonth() + 1, 2);
							break;
						case "M":
							output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
							break;
						case "y":
							output += (lookAhead("y") ? date.getFullYear() :
								(date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100);
							break;
						case "@":
							output += date.getTime();
							break;
						case "!":
							output += date.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (lookAhead("'")) {
								output += "'";
							} else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(iFormat);
					}
				}
			}
		}
		return output;
	},

	/* Extract all possible characters from the date format. */
	_possibleChars: function (format) {
		var iFormat,
			chars = "",
			literal = false,
			// Check whether a format character is doubled
			lookAhead = function(match) {
				var matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);
				if (matches) {
					iFormat++;
				}
				return matches;
			};

		for (iFormat = 0; iFormat < format.length; iFormat++) {
			if (literal) {
				if (format.charAt(iFormat) === "'" && !lookAhead("'")) {
					literal = false;
				} else {
					chars += format.charAt(iFormat);
				}
			} else {
				switch (format.charAt(iFormat)) {
					case "d": case "m": case "y": case "@":
						chars += "0123456789";
						break;
					case "D": case "M":
						return null; // Accept anything
					case "'":
						if (lookAhead("'")) {
							chars += "'";
						} else {
							literal = true;
						}
						break;
					default:
						chars += format.charAt(iFormat);
				}
			}
		}
		return chars;
	},

	/* Get a setting value, defaulting if necessary. */
	_get: function(inst, name) {
		return inst.settings[name] !== undefined ?
			inst.settings[name] : this._defaults[name];
	},

	/* Parse existing date and initialise date picker. */
	_setDateFromField: function(inst, noDefault) {
		if (inst.input.val() === inst.lastVal) {
			return;
		}

		var dateFormat = this._get(inst, "dateFormat"),
			dates = inst.lastVal = inst.input ? inst.input.val() : null,
			defaultDate = this._getDefaultDate(inst),
			date = defaultDate,
			settings = this._getFormatConfig(inst);

		try {
			date = this.parseDate(dateFormat, dates, settings) || defaultDate;
		} catch (event) {
			dates = (noDefault ? "" : dates);
		}
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		inst.currentDay = (dates ? date.getDate() : 0);
		inst.currentMonth = (dates ? date.getMonth() : 0);
		inst.currentYear = (dates ? date.getFullYear() : 0);
		this._adjustInstDate(inst);
	},

	/* Retrieve the default date shown on opening. */
	_getDefaultDate: function(inst) {
		return this._restrictMinMax(inst,
			this._determineDate(inst, this._get(inst, "defaultDate"), new Date()));
	},

	/* A date may be specified as an exact value or a relative one. */
	_determineDate: function(inst, date, defaultDate) {
		var offsetNumeric = function(offset) {
				var date = new Date();
				date.setDate(date.getDate() + offset);
				return date;
			},
			offsetString = function(offset) {
				try {
					return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"),
						offset, $.datepicker._getFormatConfig(inst));
				}
				catch (e) {
					// Ignore
				}

				var date = (offset.toLowerCase().match(/^c/) ?
					$.datepicker._getDate(inst) : null) || new Date(),
					year = date.getFullYear(),
					month = date.getMonth(),
					day = date.getDate(),
					pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,
					matches = pattern.exec(offset);

				while (matches) {
					switch (matches[2] || "d") {
						case "d" : case "D" :
							day += parseInt(matches[1],10); break;
						case "w" : case "W" :
							day += parseInt(matches[1],10) * 7; break;
						case "m" : case "M" :
							month += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
						case "y": case "Y" :
							year += parseInt(matches[1],10);
							day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
							break;
					}
					matches = pattern.exec(offset);
				}
				return new Date(year, month, day);
			},
			newDate = (date == null || date === "" ? defaultDate : (typeof date === "string" ? offsetString(date) :
				(typeof date === "number" ? (isNaN(date) ? defaultDate : offsetNumeric(date)) : new Date(date.getTime()))));

		newDate = (newDate && newDate.toString() === "Invalid Date" ? defaultDate : newDate);
		if (newDate) {
			newDate.setHours(0);
			newDate.setMinutes(0);
			newDate.setSeconds(0);
			newDate.setMilliseconds(0);
		}
		return this._daylightSavingAdjust(newDate);
	},

	/* Handle switch to/from daylight saving.
	 * Hours may be non-zero on daylight saving cut-over:
	 * > 12 when midnight changeover, but then cannot generate
	 * midnight datetime, so jump to 1AM, otherwise reset.
	 * @param  date  (Date) the date to check
	 * @return  (Date) the corrected date
	 */
	_daylightSavingAdjust: function(date) {
		if (!date) {
			return null;
		}
		date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
		return date;
	},

	/* Set the date(s) directly. */
	_setDate: function(inst, date, noChange) {
		var clear = !date,
			origMonth = inst.selectedMonth,
			origYear = inst.selectedYear,
			newDate = this._restrictMinMax(inst, this._determineDate(inst, date, new Date()));

		inst.selectedDay = inst.currentDay = newDate.getDate();
		inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth();
		inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear();
		if ((origMonth !== inst.selectedMonth || origYear !== inst.selectedYear) && !noChange) {
			this._notifyChange(inst);
		}
		this._adjustInstDate(inst);
		if (inst.input) {
			inst.input.val(clear ? "" : this._formatDate(inst));
		}
	},

	/* Retrieve the date(s) directly. */
	_getDate: function(inst) {
		var startDate = (!inst.currentYear || (inst.input && inst.input.val() === "") ? null :
			this._daylightSavingAdjust(new Date(
			inst.currentYear, inst.currentMonth, inst.currentDay)));
			return startDate;
	},

	/* Attach the onxxx handlers.  These are declared statically so
	 * they work with static code transformers like Caja.
	 */
	_attachHandlers: function(inst) {
		var stepMonths = this._get(inst, "stepMonths"),
			id = "#" + inst.id.replace( /\\\\/g, "\\" );
		inst.dpDiv.find("[data-handler]").map(function () {
			var handler = {
				prev: function () {
					$.datepicker._adjustDate(id, -stepMonths, "M");
				},
				next: function () {
					$.datepicker._adjustDate(id, +stepMonths, "M");
				},
				hide: function () {
					$.datepicker._hideDatepicker();
				},
				today: function () {
					$.datepicker._gotoToday(id);
				},
				selectDay: function () {
					$.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this);
					return false;
				},
				selectMonth: function () {
					$.datepicker._selectMonthYear(id, this, "M");
					return false;
				},
				selectYear: function () {
					$.datepicker._selectMonthYear(id, this, "Y");
					return false;
				}
			};
			$(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")]);
		});
	},

	/* Generate the HTML for the current state of the date picker. */
	_generateHTML: function(inst) {
		var maxDraw, prevText, prev, nextText, next, currentText, gotoDate,
			controls, buttonPanel, firstDay, showWeek, dayNames, dayNamesMin,
			monthNames, monthNamesShort, beforeShowDay, showOtherMonths,
			selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate,
			cornerClass, calender, thead, day, daysInMonth, leadDays, curRows, numRows,
			printDate, dRow, tbody, daySettings, otherMonth, unselectable,
			tempDate = new Date(),
			today = this._daylightSavingAdjust(
				new Date(tempDate.getFullYear(), tempDate.getMonth(), tempDate.getDate())), // clear time
			isRTL = this._get(inst, "isRTL"),
			showButtonPanel = this._get(inst, "showButtonPanel"),
			hideIfNoPrevNext = this._get(inst, "hideIfNoPrevNext"),
			navigationAsDateFormat = this._get(inst, "navigationAsDateFormat"),
			numMonths = this._getNumberOfMonths(inst),
			showCurrentAtPos = this._get(inst, "showCurrentAtPos"),
			stepMonths = this._get(inst, "stepMonths"),
			isMultiMonth = (numMonths[0] !== 1 || numMonths[1] !== 1),
			currentDate = this._daylightSavingAdjust((!inst.currentDay ? new Date(9999, 9, 9) :
				new Date(inst.currentYear, inst.currentMonth, inst.currentDay))),
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			drawMonth = inst.drawMonth - showCurrentAtPos,
			drawYear = inst.drawYear;

		if (drawMonth < 0) {
			drawMonth += 12;
			drawYear--;
		}
		if (maxDate) {
			maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),
				maxDate.getMonth() - (numMonths[0] * numMonths[1]) + 1, maxDate.getDate()));
			maxDraw = (minDate && maxDraw < minDate ? minDate : maxDraw);
			while (this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1)) > maxDraw) {
				drawMonth--;
				if (drawMonth < 0) {
					drawMonth = 11;
					drawYear--;
				}
			}
		}
		inst.drawMonth = drawMonth;
		inst.drawYear = drawYear;

		prevText = this._get(inst, "prevText");
		prevText = (!navigationAsDateFormat ? prevText : this.formatDate(prevText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth - stepMonths, 1)),
			this._getFormatConfig(inst)));

		prev = (this._canAdjustMonth(inst, -1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click'" +
			" title='" + prevText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='"+ prevText +"'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "e" : "w") + "'>" + prevText + "</span></a>"));

		nextText = this._get(inst, "nextText");
		nextText = (!navigationAsDateFormat ? nextText : this.formatDate(nextText,
			this._daylightSavingAdjust(new Date(drawYear, drawMonth + stepMonths, 1)),
			this._getFormatConfig(inst)));

		next = (this._canAdjustMonth(inst, +1, drawYear, drawMonth) ?
			"<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click'" +
			" title='" + nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>" :
			(hideIfNoPrevNext ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='"+ nextText + "'><span class='ui-icon ui-icon-circle-triangle-" + ( isRTL ? "w" : "e") + "'>" + nextText + "</span></a>"));

		currentText = this._get(inst, "currentText");
		gotoDate = (this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today);
		currentText = (!navigationAsDateFormat ? currentText :
			this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)));

		controls = (!inst.inline ? "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" +
			this._get(inst, "closeText") + "</button>" : "");

		buttonPanel = (showButtonPanel) ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? controls : "") +
			(this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'" +
			">" + currentText + "</button>" : "") + (isRTL ? "" : controls) + "</div>" : "";

		firstDay = parseInt(this._get(inst, "firstDay"),10);
		firstDay = (isNaN(firstDay) ? 0 : firstDay);

		showWeek = this._get(inst, "showWeek");
		dayNames = this._get(inst, "dayNames");
		dayNamesMin = this._get(inst, "dayNamesMin");
		monthNames = this._get(inst, "monthNames");
		monthNamesShort = this._get(inst, "monthNamesShort");
		beforeShowDay = this._get(inst, "beforeShowDay");
		showOtherMonths = this._get(inst, "showOtherMonths");
		selectOtherMonths = this._get(inst, "selectOtherMonths");
		defaultDate = this._getDefaultDate(inst);
		html = "";
		dow;
		for (row = 0; row < numMonths[0]; row++) {
			group = "";
			this.maxRows = 4;
			for (col = 0; col < numMonths[1]; col++) {
				selectedDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, inst.selectedDay));
				cornerClass = " ui-corner-all";
				calender = "";
				if (isMultiMonth) {
					calender += "<div class='ui-datepicker-group";
					if (numMonths[1] > 1) {
						switch (col) {
							case 0: calender += " ui-datepicker-group-first";
								cornerClass = " ui-corner-" + (isRTL ? "right" : "left"); break;
							case numMonths[1]-1: calender += " ui-datepicker-group-last";
								cornerClass = " ui-corner-" + (isRTL ? "left" : "right"); break;
							default: calender += " ui-datepicker-group-middle"; cornerClass = ""; break;
						}
					}
					calender += "'>";
				}
				calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" +
					(/all|left/.test(cornerClass) && row === 0 ? (isRTL ? next : prev) : "") +
					(/all|right/.test(cornerClass) && row === 0 ? (isRTL ? prev : next) : "") +
					this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate,
					row > 0 || col > 0, monthNames, monthNamesShort) + // draw month headers
					"</div><table class='ui-datepicker-calendar'><thead>" +
					"<tr>";
				thead = (showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "");
				for (dow = 0; dow < 7; dow++) { // days of the week
					day = (dow + firstDay) % 7;
					thead += "<th scope='col'" + ((dow + firstDay + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" +
						"<span title='" + dayNames[day] + "'>" + dayNamesMin[day] + "</span></th>";
				}
				calender += thead + "</tr></thead><tbody>";
				daysInMonth = this._getDaysInMonth(drawYear, drawMonth);
				if (drawYear === inst.selectedYear && drawMonth === inst.selectedMonth) {
					inst.selectedDay = Math.min(inst.selectedDay, daysInMonth);
				}
				leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7;
				curRows = Math.ceil((leadDays + daysInMonth) / 7); // calculate the number of rows to generate
				numRows = (isMultiMonth ? this.maxRows > curRows ? this.maxRows : curRows : curRows); //If multiple months, use the higher number of rows (see #7043)
				this.maxRows = numRows;
				printDate = this._daylightSavingAdjust(new Date(drawYear, drawMonth, 1 - leadDays));
				for (dRow = 0; dRow < numRows; dRow++) { // create date picker rows
					calender += "<tr>";
					tbody = (!showWeek ? "" : "<td class='ui-datepicker-week-col'>" +
						this._get(inst, "calculateWeek")(printDate) + "</td>");
					for (dow = 0; dow < 7; dow++) { // create date picker days
						daySettings = (beforeShowDay ?
							beforeShowDay.apply((inst.input ? inst.input[0] : null), [printDate]) : [true, ""]);
						otherMonth = (printDate.getMonth() !== drawMonth);
						unselectable = (otherMonth && !selectOtherMonths) || !daySettings[0] ||
							(minDate && printDate < minDate) || (maxDate && printDate > maxDate);
						tbody += "<td class='" +
							((dow + firstDay + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + // highlight weekends
							(otherMonth ? " ui-datepicker-other-month" : "") + // highlight days from other months
							((printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent) || // user pressed key
							(defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime()) ?
							// or defaultDate is current printedDate and defaultDate is selectedDate
							" " + this._dayOverClass : "") + // highlight selected day
							(unselectable ? " " + this._unselectableClass + " ui-state-disabled": "") +  // highlight unselectable days
							(otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + // highlight custom dates
							(printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + // highlight selected day
							(printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + // highlight today (if different)
							((!otherMonth || showOtherMonths) && daySettings[2] ? " title='" + daySettings[2].replace(/'/g, "&#39;") + "'" : "") + // cell title
							(unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + // actions
							(otherMonth && !showOtherMonths ? "&#xa0;" : // display for other months
							(unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" +
							(printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") +
							(printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + // highlight selected day
							(otherMonth ? " ui-priority-secondary" : "") + // distinguish dates from other months
							"' href='#'>" + printDate.getDate() + "</a>")) + "</td>"; // display selectable date
						printDate.setDate(printDate.getDate() + 1);
						printDate = this._daylightSavingAdjust(printDate);
					}
					calender += tbody + "</tr>";
				}
				drawMonth++;
				if (drawMonth > 11) {
					drawMonth = 0;
					drawYear++;
				}
				calender += "</tbody></table>" + (isMultiMonth ? "</div>" +
							((numMonths[0] > 0 && col === numMonths[1]-1) ? "<div class='ui-datepicker-row-break'></div>" : "") : "");
				group += calender;
			}
			html += group;
		}
		html += buttonPanel;
		inst._keyEvent = false;
		return html;
	},

	/* Generate the month and year header. */
	_generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate,
			secondary, monthNames, monthNamesShort) {

		var inMinYear, inMaxYear, month, years, thisYear, determineYear, year, endYear,
			changeMonth = this._get(inst, "changeMonth"),
			changeYear = this._get(inst, "changeYear"),
			showMonthAfterYear = this._get(inst, "showMonthAfterYear"),
			html = "<div class='ui-datepicker-title'>",
			monthHtml = "";

		// month selection
		if (secondary || !changeMonth) {
			monthHtml += "<span class='ui-datepicker-month'>" + monthNames[drawMonth] + "</span>";
		} else {
			inMinYear = (minDate && minDate.getFullYear() === drawYear);
			inMaxYear = (maxDate && maxDate.getFullYear() === drawYear);
			monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>";
			for ( month = 0; month < 12; month++) {
				if ((!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth())) {
					monthHtml += "<option value='" + month + "'" +
						(month === drawMonth ? " selected='selected'" : "") +
						">" + monthNamesShort[month] + "</option>";
				}
			}
			monthHtml += "</select>";
		}

		if (!showMonthAfterYear) {
			html += monthHtml + (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "");
		}

		// year selection
		if ( !inst.yearshtml ) {
			inst.yearshtml = "";
			if (secondary || !changeYear) {
				html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
			} else {
				// determine range of years to display
				years = this._get(inst, "yearRange").split(":");
				thisYear = new Date().getFullYear();
				determineYear = function(value) {
					var year = (value.match(/c[+\-].*/) ? drawYear + parseInt(value.substring(1), 10) :
						(value.match(/[+\-].*/) ? thisYear + parseInt(value, 10) :
						parseInt(value, 10)));
					return (isNaN(year) ? thisYear : year);
				};
				year = determineYear(years[0]);
				endYear = Math.max(year, determineYear(years[1] || ""));
				year = (minDate ? Math.max(year, minDate.getFullYear()) : year);
				endYear = (maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear);
				inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>";
				for (; year <= endYear; year++) {
					inst.yearshtml += "<option value='" + year + "'" +
						(year === drawYear ? " selected='selected'" : "") +
						">" + year + "</option>";
				}
				inst.yearshtml += "</select>";

				html += inst.yearshtml;
				inst.yearshtml = null;
			}
		}

		html += this._get(inst, "yearSuffix");
		if (showMonthAfterYear) {
			html += (secondary || !(changeMonth && changeYear) ? "&#xa0;" : "") + monthHtml;
		}
		html += "</div>"; // Close datepicker_header
		return html;
	},

	/* Adjust one of the date sub-fields. */
	_adjustInstDate: function(inst, offset, period) {
		var year = inst.drawYear + (period === "Y" ? offset : 0),
			month = inst.drawMonth + (period === "M" ? offset : 0),
			day = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + (period === "D" ? offset : 0),
			date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year, month, day)));

		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();
		if (period === "M" || period === "Y") {
			this._notifyChange(inst);
		}
	},

	/* Ensure a date is within any min/max bounds. */
	_restrictMinMax: function(inst, date) {
		var minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			newDate = (minDate && date < minDate ? minDate : date);
		return (maxDate && newDate > maxDate ? maxDate : newDate);
	},

	/* Notify change of month/year. */
	_notifyChange: function(inst) {
		var onChange = this._get(inst, "onChangeMonthYear");
		if (onChange) {
			onChange.apply((inst.input ? inst.input[0] : null),
				[inst.selectedYear, inst.selectedMonth + 1, inst]);
		}
	},

	/* Determine the number of months to show. */
	_getNumberOfMonths: function(inst) {
		var numMonths = this._get(inst, "numberOfMonths");
		return (numMonths == null ? [1, 1] : (typeof numMonths === "number" ? [1, numMonths] : numMonths));
	},

	/* Determine the current maximum date - ensure no time components are set. */
	_getMinMaxDate: function(inst, minMax) {
		return this._determineDate(inst, this._get(inst, minMax + "Date"), null);
	},

	/* Find the number of days in a given month. */
	_getDaysInMonth: function(year, month) {
		return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
	},

	/* Find the day of the week of the first of a month. */
	_getFirstDayOfMonth: function(year, month) {
		return new Date(year, month, 1).getDay();
	},

	/* Determines if we should allow a "next/prev" month display change. */
	_canAdjustMonth: function(inst, offset, curYear, curMonth) {
		var numMonths = this._getNumberOfMonths(inst),
			date = this._daylightSavingAdjust(new Date(curYear,
			curMonth + (offset < 0 ? offset : numMonths[0] * numMonths[1]), 1));

		if (offset < 0) {
			date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth()));
		}
		return this._isInRange(inst, date);
	},

	/* Is the given date in the accepted range? */
	_isInRange: function(inst, date) {
		var yearSplit, currentYear,
			minDate = this._getMinMaxDate(inst, "min"),
			maxDate = this._getMinMaxDate(inst, "max"),
			minYear = null,
			maxYear = null,
			years = this._get(inst, "yearRange");
			if (years){
				yearSplit = years.split(":");
				currentYear = new Date().getFullYear();
				minYear = parseInt(yearSplit[0], 10);
				maxYear = parseInt(yearSplit[1], 10);
				if ( yearSplit[0].match(/[+\-].*/) ) {
					minYear += currentYear;
				}
				if ( yearSplit[1].match(/[+\-].*/) ) {
					maxYear += currentYear;
				}
			}

		return ((!minDate || date.getTime() >= minDate.getTime()) &&
			(!maxDate || date.getTime() <= maxDate.getTime()) &&
			(!minYear || date.getFullYear() >= minYear) &&
			(!maxYear || date.getFullYear() <= maxYear));
	},

	/* Provide the configuration settings for formatting/parsing. */
	_getFormatConfig: function(inst) {
		var shortYearCutoff = this._get(inst, "shortYearCutoff");
		shortYearCutoff = (typeof shortYearCutoff !== "string" ? shortYearCutoff :
			new Date().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
		return {shortYearCutoff: shortYearCutoff,
			dayNamesShort: this._get(inst, "dayNamesShort"), dayNames: this._get(inst, "dayNames"),
			monthNamesShort: this._get(inst, "monthNamesShort"), monthNames: this._get(inst, "monthNames")};
	},

	/* Format the given date for display. */
	_formatDate: function(inst, day, month, year) {
		if (!day) {
			inst.currentDay = inst.selectedDay;
			inst.currentMonth = inst.selectedMonth;
			inst.currentYear = inst.selectedYear;
		}
		var date = (day ? (typeof day === "object" ? day :
			this._daylightSavingAdjust(new Date(year, month, day))) :
			this._daylightSavingAdjust(new Date(inst.currentYear, inst.currentMonth, inst.currentDay)));
		return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst));
	}
});

/*
 * Bind hover events for datepicker elements.
 * Done via delegate so the binding only occurs once in the lifetime of the parent div.
 * Global datepicker_instActive, set by _updateDatepicker allows the handlers to find their way back to the active picker.
 */
function datepicker_bindHover(dpDiv) {
	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
	return dpDiv.delegate(selector, "mouseout", function() {
			$(this).removeClass("ui-state-hover");
			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
				$(this).removeClass("ui-datepicker-prev-hover");
			}
			if (this.className.indexOf("ui-datepicker-next") !== -1) {
				$(this).removeClass("ui-datepicker-next-hover");
			}
		})
		.delegate( selector, "mouseover", datepicker_handleMouseover );
}

function datepicker_handleMouseover() {
	if (!$.datepicker._isDisabledDatepicker( datepicker_instActive.inline? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
		$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
		$(this).addClass("ui-state-hover");
		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
			$(this).addClass("ui-datepicker-prev-hover");
		}
		if (this.className.indexOf("ui-datepicker-next") !== -1) {
			$(this).addClass("ui-datepicker-next-hover");
		}
	}
}

/* jQuery extend now ignores nulls! */
function datepicker_extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = props[name];
		}
	}
	return target;
}

/* Invoke the datepicker functionality.
   @param  options  string - a command, optionally followed by additional parameters or
					Object - settings for attaching new datepicker functionality
   @return  jQuery object */
$.fn.datepicker = function(options){

	/* Verify an empty collection wasn't passed - Fixes #6976 */
	if ( !this.length ) {
		return this;
	}

	/* Initialise the date picker. */
	if (!$.datepicker.initialized) {
		$(document).mousedown($.datepicker._checkExternalClick);
		$.datepicker.initialized = true;
	}

	/* Append datepicker main container to body if not exist. */
	if ($("#"+$.datepicker._mainDivId).length === 0) {
		$("body").append($.datepicker.dpDiv);
	}

	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options === "string" && (options === "isDisabled" || options === "getDate" || options === "widget")) {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	if (options === "option" && arguments.length === 2 && typeof arguments[1] === "string") {
		return $.datepicker["_" + options + "Datepicker"].
			apply($.datepicker, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		typeof options === "string" ?
			$.datepicker["_" + options + "Datepicker"].
				apply($.datepicker, [this].concat(otherArgs)) :
			$.datepicker._attachDatepicker(this, options);
	});
};

$.datepicker = new Datepicker(); // singleton instance
$.datepicker.initialized = false;
$.datepicker.uuid = new Date().getTime();
$.datepicker.version = "1.11.1";

return $.datepicker;

}));
jQuery(function($){
        $.datepicker.regional['ru'] = {
                closeText: 'Закрыть',
                prevText: '&#x3c;Пред',
                nextText: 'След&#x3e;',
                currentText: 'Сегодня',
                monthNames: ['Январь','Февраль','Март','Апрель','Май','Июнь',
                'Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
                monthNamesShort: ['Янв','Фев','Мар','Апр','Май','Июн',
                'Июл','Авг','Сен','Окт','Ноя','Дек'],
                dayNames: ['воскресенье','понедельник','вторник','среда','четверг','пятница','суббота'],
                dayNamesShort: ['вск','пнд','втр','срд','чтв','птн','сбт'],
                dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
                weekHeader: 'Не',
                dateFormat: 'dd.mm.yy',
                firstDay: 1,
                changeMonth: true,
                changeYear: true,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''};
        $.datepicker.setDefaults($.datepicker.regional['ru']);
});
/* ========================================================================
 * Bootstrap: affix.js v3.2.0
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      =
    this.unpin        =
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.2.0'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var scrollHeight = $(document).height()
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.unpin   != null && (scrollTop + this.unpin <= position.top) ? false :
                offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' :
                offsetTop    != null && (scrollTop <= offsetTop) ? 'top' : false

    if (this.affixed === affix) return
    if (this.unpin != null) this.$element.css('top', '')

    var affixType = 'affix' + (affix ? '-' + affix : '')
    var e         = $.Event(affixType + '.bs.affix')

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    this.affixed = affix
    this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

    this.$element
      .removeClass(Affix.RESET)
      .addClass(affixType)
      .trigger($.Event(affixType.replace('affix', 'affixed')))

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - this.$element.height() - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom) data.offset.bottom = data.offsetBottom
      if (data.offsetTop)    data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.2.0
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.2.0'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    $el[val](data[state] == null ? this.options[state] : data[state])

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    Plugin.call($btn, 'toggle')
    e.preventDefault()
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.2.0
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element).on('keydown.bs.carousel', $.proxy(this.keydown, this))
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.2.0'

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true
  }

  Carousel.prototype.keydown = function (e) {
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd($active.css('transition-duration').slice(0, -1) * 1000)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.2.0
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.2.0'

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      Plugin.call(actives, 'hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && option == 'show') option = !option
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var href
    var $this   = $(this)
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle="collapse"][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.2.0
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.2.0'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.trigger('focus')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.divider):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $parent = getParent($(this))
      var relatedTarget = { relatedTarget: this }
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role="menu"], [role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.2.0
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.2.0'

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var previous = $ul.find('.active:last a')[0]
    var e        = $.Event('show.bs.tab', {
      relatedTarget: previous
    })

    $this.trigger(e)

    if (e.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: previous
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && $active.hasClass('fade')

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
        .removeClass('active')

      element.addClass('active')

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu')) {
        element.closest('li.dropdown').addClass('active')
      }

      callback && callback()
    }

    transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(150) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.2.0
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.2.0
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    var process  = $.proxy(this.process, this)

    this.$body          = $('body')
    this.$scrollElement = $(element).is('body') ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', process)
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.2.0'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var offsetMethod = 'offset'
    var offsetBase   = 0

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.offsets = []
    this.targets = []
    this.scrollHeight = this.getScrollHeight()

    var self     = this

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        self.offsets.push(this[0])
        self.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop <= offsets[0]) {
      return activeTarget != (i = targets[0]) && this.activate(i)
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')

    var selector = this.selector +
        '[data-target="' + target + '"],' +
        this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.2.0
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options        = options
    this.$body          = $(document.body)
    this.$element       = $(element)
    this.$backdrop      =
    this.isShown        = null
    this.scrollbarWidth = 0

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.2.0'

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.$body.addClass('modal-open')

    this.setScrollbar()
    this.escape()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.$body.removeClass('modal-open')

    this.resetScrollbar()
    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(150) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  Modal.prototype.checkScrollbar = function () {
    if (document.body.clientWidth >= window.innerWidth) return
    this.scrollbarWidth = this.scrollbarWidth || this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    if (this.scrollbarWidth) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', '')
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.2.0
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.2.0'

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(document.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $parent      = this.$element.parent()
        var parentDim    = this.getPosition($parent)

        placement = placement == 'bottom' && pos.top   + pos.height       + actualHeight - parentDim.scroll > parentDim.height ? 'top'    :
                    placement == 'top'    && pos.top   - parentDim.scroll - actualHeight < 0                                   ? 'bottom' :
                    placement == 'right'  && pos.right + actualWidth      > parentDim.width                                    ? 'left'   :
                    placement == 'left'   && pos.left  - actualWidth      < parentDim.left                                     ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(150) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var arrowDelta          = delta.left ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowPosition       = delta.left ? 'left'        : 'top'
    var arrowOffsetPosition = delta.left ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], arrowPosition)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, position) {
    this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + '%') : '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function () {
    var that = this
    var $tip = this.tip()
    var e    = $.Event('hide.bs.' + this.type)

    this.$element.removeAttr('aria-describedby')

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element.trigger('hidden.bs.' + that.type)
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && this.$tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(150) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element
    var el     = $element[0]
    var isBody = el.tagName == 'BODY'
    return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : null, {
      scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop(),
      width:  isBody ? $(window).width()  : $element.outerWidth(),
      height: isBody ? $(window).height() : $element.outerHeight()
    }, isBody ? { top: 0, left: 0 } : $element.offset())
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2  } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width   }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.validate = function () {
    if (!this.$element[0].parentNode) {
      this.hide()
      this.$element = null
      this.options  = null
    }
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    clearTimeout(this.timeout)
    this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.2.0
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.2.0'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').empty()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }

  Popover.prototype.tip = function () {
    if (!this.$tip) this.$tip = $(this.options.template)
    return this.$tip
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && option == 'destroy') return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, browserCompatibleDocumentParser, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, currentState, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, recallScrollPosition, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr, _ref,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  currentState = null;

  loadedAssets = null;

  referer = null;

  createDocument = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  fetchReplacement = function(url, onLoadFunction) {
    if (onLoadFunction == null) {
      onLoadFunction = (function(_this) {
        return function() {};
      })(this);
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        reflectRedirectedUrl();
        onLoadFunction();
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = url.absolute;
      }
    };
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, key, pageCacheKeys, _i, _len, _results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    _results = [];
    for (_i = 0, _len = pageCacheKeys.length; _i < _len; _i++) {
      key = pageCacheKeys[_i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      _results.push(delete pageCache[key]);
    }
    return _results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, nextSibling, parentNode, script, scripts, _i, _j, _len, _len1, _ref, _ref1;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (_i = 0, _len = scripts.length; _i < _len; _i++) {
      script = scripts[_i];
      if (!((_ref = script.type) === '' || _ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      _ref1 = script.attributes;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        attr = _ref1[_j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(currentState, '', location.href + preservedHash);
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var value, _ref;
    value = ((_ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? _ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var _ref;
      return (400 <= (_ref = xhr.status) && _ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var node, _i, _len, _ref, _results;
      _ref = doc.querySelector('head').childNodes;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        node = _ref[_i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          _results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return _results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var value, _i, _len, _ref, _results;
      if (a.length > b.length) {
        _ref = [b, a], a = _ref[0], b = _ref[1];
      }
      _results = [];
      for (_i = 0, _len = a.length; _i < _len; _i++) {
        value = a[_i];
        if (__indexOf.call(b, value) >= 0) {
          _results.push(value);
        }
      }
      return _results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  browserCompatibleDocumentParser = function() {
    var buildTestsUsing, createDocumentUsingDOM, createDocumentUsingFragment, createDocumentUsingParser, createDocumentUsingWrite, docTest, docTests, e, _i, _len;
    createDocumentUsingParser = function(html) {
      return (new DOMParser).parseFromString(html, 'text/html');
    };
    createDocumentUsingDOM = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.documentElement.innerHTML = html;
      return doc;
    };
    createDocumentUsingWrite = function(html) {
      var doc;
      doc = document.implementation.createHTMLDocument('');
      doc.open('replace');
      doc.write(html);
      doc.close();
      return doc;
    };
    createDocumentUsingFragment = function(html) {
      var body, doc, head, htmlWrapper, _ref, _ref1;
      head = ((_ref = html.match(/<head[^>]*>([\s\S.]*)<\/head>/i)) != null ? _ref[0] : void 0) || '<head></head>';
      body = ((_ref1 = html.match(/<body[^>]*>([\s\S.]*)<\/body>/i)) != null ? _ref1[0] : void 0) || '<body></body>';
      htmlWrapper = document.createElement('html');
      htmlWrapper.innerHTML = head + body;
      doc = document.createDocumentFragment();
      doc.appendChild(htmlWrapper);
      return doc;
    };
    buildTestsUsing = function(createMethod) {
      var buildTest, formNestingTest, structureTest;
      buildTest = function(fallback, passes) {
        return {
          passes: passes(),
          fallback: fallback
        };
      };
      structureTest = buildTest(createDocumentUsingWrite, (function(_this) {
        return function() {
          var _ref, _ref1;
          return ((_ref = createMethod('<html><body><p>test')) != null ? (_ref1 = _ref.body) != null ? _ref1.childNodes.length : void 0 : void 0) === 1;
        };
      })(this));
      formNestingTest = buildTest(createDocumentUsingFragment, (function(_this) {
        return function() {
          var _ref, _ref1;
          return ((_ref = createMethod('<html><body><form></form><div></div></body></html>')) != null ? (_ref1 = _ref.body) != null ? _ref1.childNodes.length : void 0 : void 0) === 2;
        };
      })(this));
      return [structureTest, formNestingTest];
    };
    try {
      if (window.DOMParser) {
        docTests = buildTestsUsing(createDocumentUsingParser);
        return createDocumentUsingParser;
      }
    } catch (_error) {
      e = _error;
      docTests = buildTestsUsing(createDocumentUsingDOM);
      return createDocumentUsingDOM;
    } finally {
      for (_i = 0, _len = docTests.length; _i < _len; _i++) {
        docTest = docTests[_i];
        if (!docTest.passes) {
          return docTest.fallback;
        }
      }
    }
  };

  ComponentUrl = (function() {
    function ComponentUrl(original) {
      this.original = original != null ? original : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype._parse = function() {
      var _ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      _ref = this.link, this.href = _ref.href, this.protocol = _ref.protocol, this.host = _ref.host, this.hostname = _ref.hostname, this.port = _ref.port, this.pathname = _ref.pathname, this.search = _ref.search, this.hash = _ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(_super) {
    __extends(Link, _super);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, _i, _len;
      extensions = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      for (_i = 0, _len = extensions.length; _i < _len; _i++) {
        extension = extensions[_i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link) {
      this.link = link;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this._crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event) {
      this.event = event;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, _ref;
    if ((_ref = event.state) != null ? _ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    createDocument = browserCompatibleDocumentParser();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (_ref = popCookie('request_method')) === 'GET' || _ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/*
	Redactor v9.1.9
	Updated: Dec 12, 2013

	http://imperavi.com/redactor/

	Copyright (c) 2009-2013, Imperavi LLC.
	License: http://imperavi.com/redactor/license/

	Usage: $('#content').redactor();
*/


(function($)
{
	var uuid = 0;

	"use strict";

	var Range = function(range)
	{
		this[0] = range.startOffset;
		this[1] = range.endOffset;

		this.range = range;

		return this;
	};

	Range.prototype.equals = function()
	{
		return this[0] === this[1];
	};

	// Plugin
	$.fn.redactor = function(options)
	{
		var val = [];
		var args = Array.prototype.slice.call(arguments, 1);

		if (typeof options === 'string')
		{
			this.each(function()
			{
				var instance = $.data(this, 'redactor');
				if (typeof instance !== 'undefined' && $.isFunction(instance[options]))
				{
					var methodVal = instance[options].apply(instance, args);
					if (methodVal !== undefined && methodVal !== instance) val.push(methodVal);
				}
				else return $.error('No such method "' + options + '" for Redactor');
			});
		}
		else
		{
			this.each(function()
			{
				if (!$.data(this, 'redactor')) $.data(this, 'redactor', Redactor(this, options));
			});
		}

		if (val.length === 0) return this;
		else if (val.length === 1) return val[0];
		else return val;

	};

	// Initialization
	function Redactor(el, options)
	{
		return new Redactor.prototype.init(el, options);
	}

	$.Redactor = Redactor;
	$.Redactor.VERSION = '9.1.9';
	$.Redactor.opts = {

			// settings
			rangy: false,

			iframe: false,
			fullpage: false,
			css: false, // url

			lang: 'en',
			direction: 'ltr', // ltr or rtl

			placeholder: false,

			wym: false,
			mobile: true,
			cleanup: true,
			tidyHtml: true,
			pastePlainText: false,
			removeEmptyTags: true,
			templateVars: false,
			xhtml: false,

			visual: true,
			focus: false,
			tabindex: false,
			autoresize: true,
			minHeight: false,
			maxHeight: false,
			shortcuts: true,

			autosave: false, // false or url
			autosaveInterval: 60, // seconds
            autosaveFormdata: true,

			plugins: false, // array

			linkAnchor: true,
			linkEmail: true,
			linkProtocol: 'http://',
			linkNofollow: false,
			linkSize: 50,

			imageFloatMargin: '10px',
			imageGetJson: false, // url (ex. /folder/images.json ) or false

			imageUpload: false, // url
			imageUploadParam: 'file', // input name
			fileUpload: false, // url
			fileUploadParam: 'file', // input name
			clipboardUpload: true, // or false
			clipboardUploadUrl: false, // url
			dragUpload: true, // false

			dnbImageTypes: ['image/png', 'image/jpeg', 'image/gif'], // or false

			s3: false,
			uploadFields: false,

			observeImages: true,
			observeLinks: true,

			modalOverlay: true,

			tabSpaces: false, // true or number of spaces
			tabFocus: true,

			air: false,
			airButtons: ['formatting', '|', 'bold', 'italic', 'deleted', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent'],

			toolbar: true,
			toolbarFixed: false,
			toolbarFixedTarget: document,
			toolbarFixedTopOffset: 0, // pixels
			toolbarFixedBox: false,
			toolbarExternal: false, // ID selector
			buttonSource: true,

			buttonSeparator: '<li class="redactor_separator"></li>',

			buttonsCustom: {},
			buttonsAdd: [],
			buttons: ['html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', '|', 'unorderedlist', 'orderedlist', 'outdent', 'indent', '|', 'image', 'video', 'file', 'table', 'link', '|', 'alignment', '|', 'horizontalrule'], // 'underline', 'alignleft', 'aligncenter', 'alignright', 'justify'

			activeButtons: ['deleted', 'italic', 'bold', 'underline', 'unorderedlist', 'orderedlist', 'alignleft', 'aligncenter', 'alignright', 'justify', 'table'],
			activeButtonsStates: {
				b: 'bold',
				strong: 'bold',
				i: 'italic',
				em: 'italic',
				del: 'deleted',
				strike: 'deleted',
				ul: 'unorderedlist',
				ol: 'orderedlist',
				u: 'underline',
				tr: 'table',
				td: 'table',
				table: 'table'
			},
			activeButtonsAdd: false, // object, ex.: { tag: 'buttonName' }

			formattingTags: ['p', 'blockquote', 'pre', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],

			linebreaks: false,
			paragraphy: true,
			convertDivs: true,
			convertLinks: true,
			convertImageLinks: false,
			convertVideoLinks: false,
			formattingPre: false,
			phpTags: false,

			allowedTags: false,
			deniedTags: ['html', 'head', 'link', 'body', 'meta', 'script', 'style', 'applet'],

			boldTag: 'strong',
			italicTag: 'em',

			// private
			indentValue: 20,
			buffer: [],
			rebuffer: [],
			textareamode: false,
			emptyHtml: '<p>&#x200b;</p>',
			invisibleSpace: '&#x200b;',
			rBlockTest: /^(P|H[1-6]|LI|ADDRESS|SECTION|HEADER|FOOTER|ASIDE|ARTICLE)$/i,
			alignmentTags: ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DD', 'DL', 'DT', 'DIV', 'TD',
								'BLOCKQUOTE', 'OUTPUT', 'FIGCAPTION', 'ADDRESS', 'SECTION',
								'HEADER', 'FOOTER', 'ASIDE', 'ARTICLE'],
			ownLine: ['area', 'body', 'head', 'hr', 'i?frame', 'link', 'meta', 'noscript', 'style', 'script', 'table', 'tbody', 'thead', 'tfoot'],
			contOwnLine: ['li', 'dt', 'dt', 'h[1-6]', 'option', 'script'],
			newLevel: ['blockquote', 'div', 'dl', 'fieldset', 'form', 'frameset', 'map', 'ol', 'p', 'pre', 'select', 'td', 'th', 'tr', 'ul'],
			blockLevelElements: ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DD', 'DL', 'DT', 'DIV', 'LI',
								'BLOCKQUOTE', 'OUTPUT', 'FIGCAPTION', 'PRE', 'ADDRESS', 'SECTION',
								'HEADER', 'FOOTER', 'ASIDE', 'ARTICLE', 'TD'],
			// lang
			langs: {
				en: {
					html: 'HTML',
					video: 'Insert Video',
					image: 'Insert Image',
					table: 'Table',
					link: 'Link',
					link_insert: 'Insert link',
					link_edit: 'Edit link',
					unlink: 'Unlink',
					formatting: 'Formatting',
					paragraph: 'Normal text',
					quote: 'Quote',
					code: 'Code',
					header1: 'Header 1',
					header2: 'Header 2',
					header3: 'Header 3',
					header4: 'Header 4',
					header5: 'Header 5',
					bold: 'Bold',
					italic: 'Italic',
					fontcolor: 'Font Color',
					backcolor: 'Back Color',
					unorderedlist: 'Unordered List',
					orderedlist: 'Ordered List',
					outdent: 'Outdent',
					indent: 'Indent',
					cancel: 'Cancel',
					insert: 'Insert',
					save: 'Save',
					_delete: 'Delete',
					insert_table: 'Insert Table',
					insert_row_above: 'Add Row Above',
					insert_row_below: 'Add Row Below',
					insert_column_left: 'Add Column Left',
					insert_column_right: 'Add Column Right',
					delete_column: 'Delete Column',
					delete_row: 'Delete Row',
					delete_table: 'Delete Table',
					rows: 'Rows',
					columns: 'Columns',
					add_head: 'Add Head',
					delete_head: 'Delete Head',
					title: 'Title',
					image_position: 'Position',
					none: 'None',
					left: 'Left',
					right: 'Right',
					image_web_link: 'Image Web Link',
					text: 'Text',
					mailto: 'Email',
					web: 'URL',
					video_html_code: 'Video Embed Code',
					file: 'Insert File',
					upload: 'Upload',
					download: 'Download',
					choose: 'Choose',
					or_choose: 'Or choose',
					drop_file_here: 'Drop file here',
					align_left: 'Align text to the left',
					align_center: 'Center text',
					align_right: 'Align text to the right',
					align_justify: 'Justify text',
					horizontalrule: 'Insert Horizontal Rule',
					deleted: 'Deleted',
					anchor: 'Anchor',
					link_new_tab: 'Open link in new tab',
					underline: 'Underline',
					alignment: 'Alignment',
					filename: 'Name (optional)',
					edit: 'Edit'
				}
			}
	};

	// Functionality
	Redactor.fn = $.Redactor.prototype = {

		keyCode: {
			BACKSPACE: 8,
			DELETE: 46,
			DOWN: 40,
			ENTER: 13,
			ESC: 27,
			TAB: 9,
			CTRL: 17,
			META: 91,
			LEFT: 37,
			LEFT_WIN: 91
		},

		// Initialization
		init: function(el, options)
		{
			this.rtePaste = false;
			this.$element = this.$source = $(el);
			this.uuid = uuid++;

			// clonning options
			var opts = $.extend(true, {}, $.Redactor.opts);

			// current settings
			this.opts = $.extend(
				{},
				opts,
				this.$element.data(),
				options
			);

			this.start = true;
			this.dropdowns = [];

			// get sizes
			this.sourceHeight = this.$source.css('height');
			this.sourceWidth = this.$source.css('width');

			// dependency of the editor modes
			if (this.opts.fullpage) this.opts.iframe = true;
			if (this.opts.linebreaks) this.opts.paragraphy = false;
			if (this.opts.paragraphy) this.opts.linebreaks = false;
			if (this.opts.toolbarFixedBox) this.opts.toolbarFixed = true;

			// the alias for iframe mode
			this.document = document;
			this.window = window;

			// selection saved
			this.savedSel = false;

			// clean setup
			this.cleanlineBefore = new RegExp('^<(/?' + this.opts.ownLine.join('|/?' ) + '|' + this.opts.contOwnLine.join('|') + ')[ >]');
			this.cleanlineAfter = new RegExp('^<(br|/?' + this.opts.ownLine.join('|/?' ) + '|/' + this.opts.contOwnLine.join('|/') + ')[ >]');
			this.cleannewLevel = new RegExp('^</?(' + this.opts.newLevel.join('|' ) + ')[ >]');

			// block level
			this.rTestBlock = new RegExp('^(' + this.opts.blockLevelElements.join('|' ) + ')$', 'i');

			// setup formatting permissions
			if (this.opts.linebreaks === false)
			{
				if (this.opts.allowedTags !== false)
				{
					var arrSearch = ['strong', 'em', 'del'];
					var arrAdd = ['b', 'i', 'strike'];

					if ($.inArray('p', this.opts.allowedTags) === '-1') this.opts.allowedTags.push('p');

					for (i in arrSearch)
					{
						if ($.inArray(arrSearch[i], this.opts.allowedTags) != '-1') this.opts.allowedTags.push(arrAdd[i]);
					}
				}

				if (this.opts.deniedTags !== false)
				{
					var pos = $.inArray('p', this.opts.deniedTags);
					if (pos !== '-1') this.opts.deniedTags.splice(pos, pos);
				}
			}

			// ie & opera
			if (this.browser('msie') || this.browser('opera'))
			{
				this.opts.buttons = this.removeFromArrayByValue(this.opts.buttons, 'horizontalrule');
			}

			// load lang
			this.opts.curLang = this.opts.langs[this.opts.lang];

			// Build
			this.buildStart();

		},
		toolbarInit: function(lang)
		{
			return {
				html:
				{
					title: lang.html,
					func: 'toggle'
				},
				formatting:
				{
					title: lang.formatting,
					func: 'show',
					dropdown:
					{
						p:
						{
							title: lang.paragraph,
							func: 'formatBlocks'
						},
						blockquote:
						{
							title: lang.quote,
							func: 'formatQuote',
							className: 'redactor_format_blockquote'
						},
						pre:
						{
							title: lang.code,
							func: 'formatBlocks',
							className: 'redactor_format_pre'
						},
						h1:
						{
							title: lang.header1,
							func: 'formatBlocks',
							className: 'redactor_format_h1'
						},
						h2:
						{
							title: lang.header2,
							func: 'formatBlocks',
							className: 'redactor_format_h2'
						},
						h3:
						{
							title: lang.header3,
							func: 'formatBlocks',
							className: 'redactor_format_h3'
						},
						h4:
						{
							title: lang.header4,
							func: 'formatBlocks',
							className: 'redactor_format_h4'
						},
						h5:
						{
							title: lang.header5,
							func: 'formatBlocks',
							className: 'redactor_format_h5'
						}
					}
				},
				bold:
				{
					title: lang.bold,
					exec: 'bold'
				},
				italic:
				{
					title: lang.italic,
					exec: 'italic'
				},
				deleted:
				{
					title: lang.deleted,
					exec: 'strikethrough'
				},
				underline:
				{
					title: lang.underline,
					exec: 'underline'
				},
				unorderedlist:
				{
					title: '&bull; ' + lang.unorderedlist,
					exec: 'insertunorderedlist'
				},
				orderedlist:
				{
					title: '1. ' + lang.orderedlist,
					exec: 'insertorderedlist'
				},
				outdent:
				{
					title: '< ' + lang.outdent,
					func: 'indentingOutdent'
				},
				indent:
				{
					title: '> ' + lang.indent,
					func: 'indentingIndent'
				},
				image:
				{
					title: lang.image,
					func: 'imageShow'
				},
				video:
				{
					title: lang.video,
					func: 'videoShow'
				},
				file:
				{
					title: lang.file,
					func: 'fileShow'
				},
				table:
				{
					title: lang.table,
					func: 'show',
					dropdown:
					{
						insert_table:
						{
							title: lang.insert_table,
							func: 'tableShow'
						},
						separator_drop1:
						{
							name: 'separator'
						},
						insert_row_above:
						{
							title: lang.insert_row_above,
							func: 'tableAddRowAbove'
						},
						insert_row_below:
						{
							title: lang.insert_row_below,
							func: 'tableAddRowBelow'
						},
						insert_column_left:
						{
							title: lang.insert_column_left,
							func: 'tableAddColumnLeft'
						},
						insert_column_right:
						{
							title: lang.insert_column_right,
							func: 'tableAddColumnRight'
						},
						separator_drop2:
						{
							name: 'separator'
						},
						add_head:
						{
							title: lang.add_head,
							func: 'tableAddHead'
						},
						delete_head:
						{
							title: lang.delete_head,
							func: 'tableDeleteHead'
						},
						separator_drop3:
						{
							name: 'separator'
						},
						delete_column:
						{
							title: lang.delete_column,
							func: 'tableDeleteColumn'
						},
						delete_row:
						{
							title: lang.delete_row,
							func: 'tableDeleteRow'
						},
						delete_table:
						{
							title: lang.delete_table,
							func: 'tableDeleteTable'
						}
					}
				},
				link: {
					title: lang.link,
					func: 'show',
					dropdown:
					{
						link:
						{
							title: lang.link_insert,
							func: 'linkShow'
						},
						unlink:
						{
							title: lang.unlink,
							exec: 'unlink'
						}
					}
				},
				fontcolor:
				{
					title: lang.fontcolor,
					func: 'show'
				},
				backcolor:
				{
					title: lang.backcolor,
					func: 'show'
				},
				alignment:
				{
					title: lang.alignment,
					func: 'show',
					dropdown:
					{
						alignleft:
						{
							title: lang.align_left,
							func: 'alignmentLeft'
						},
						aligncenter:
						{
							title: lang.align_center,
							func: 'alignmentCenter'
						},
						alignright:
						{
							title: lang.align_right,
							func: 'alignmentRight'
						},
						justify:
						{
							title: lang.align_justify,
							func: 'alignmentJustify'
						}
					}
				},
				alignleft:
				{
					title: lang.align_left,
					func: 'alignmentLeft'
				},
				aligncenter:
				{
					title: lang.align_center,
					func: 'alignmentCenter'
				},
				alignright:
				{
					title: lang.align_right,
					func: 'alignmentRight'
				},
				justify:
				{
					title: lang.align_justify,
					func: 'alignmentJustify'
				},
				horizontalrule:
				{
					exec: 'inserthorizontalrule',
					title: lang.horizontalrule
				}

			}
		},

		// CALLBACKS
		callback: function(type, event, data)
		{
			var callback = this.opts[ type + 'Callback' ];
			if ($.isFunction(callback))
			{
				if (event === false) return callback.call(this, data);
				else return callback.call(this, event, data);
			}
			else return data;
		},


		// DESTROY
		destroy: function()
		{
			clearInterval(this.autosaveInterval);

			$(window).off('.redactor');
			this.$source.off('redactor-textarea');
			this.$element.off('.redactor').removeData('redactor');

			var html = this.get();

			if (this.opts.textareamode)
			{
				this.$box.after(this.$source);
				this.$box.remove();
				this.$source.val(html).show();
			}
			else
			{
				var $elem = this.$editor;
				if (this.opts.iframe) $elem = this.$element;

				this.$box.after($elem);
				this.$box.remove();

				$elem.removeClass('redactor_editor').removeClass('redactor_editor_wym').removeAttr('contenteditable').html(html).show();
			}

			if (this.opts.air)
			{
				$('#redactor_air_' + this.uuid).remove();
			}
		},

		// API GET
		getObject: function()
		{
			return $.extend({}, this);
		},
		getEditor: function()
		{
			return this.$editor;
		},
		getBox: function()
		{
			return this.$box;
		},
		getIframe: function()
		{
			return (this.opts.iframe) ? this.$frame : false;
		},
		getToolbar: function()
		{
			return (this.$toolbar) ? this.$toolbar : false;
		},

		// CODE GET & SET
		get: function()
		{
			return this.$source.val();
		},
		getCodeIframe: function()
		{
			this.$editor.removeAttr('contenteditable').removeAttr('dir');
			var html = this.outerHtml(this.$frame.contents().children());
			this.$editor.attr({ 'contenteditable': true, 'dir': this.opts.direction });

			return html;
		},
		set: function(html, strip, placeholderRemove)
		{
			html = html.toString();
			html = html.replace(/\$/g, '&#36;');

			if (this.opts.fullpage) this.setCodeIframe(html);
			else this.setEditor(html, strip);

			if (html == '') placeholderRemove = false;
			if (placeholderRemove !== false) this.placeholderRemove();
		},
		setEditor: function(html, strip)
		{

			if (strip !== false)
			{
				html = this.cleanSavePreCode(html);

				html = this.cleanStripTags(html);
				html = this.cleanConvertProtected(html);
				html = this.cleanConvertInlineTags(html, true);

				if (this.opts.linebreaks === false)	html = this.cleanConverters(html);
				else html = html.replace(/<p(.*?)>([\w\W]*?)<\/p>/gi, '$2<br>');
			}

			// $ fix
			html = html.replace(/&amp;#36;/g, '$');

			html = this.cleanEmpty(html);

			this.$editor.html(html);

			// set no editable
			this.setNonEditable();
			this.setSpansVerified();
			this.sync();
		},
		setCodeIframe: function(html)
		{
			var doc = this.iframePage();
			this.$frame[0].src = "about:blank";

			html = this.cleanConvertProtected(html);
			html = this.cleanConvertInlineTags(html);
			html = this.cleanRemoveSpaces(html);

			doc.open();
			doc.write(html);
			doc.close();

			// redefine editor for fullpage mode
			if (this.opts.fullpage)
			{
				this.$editor = this.$frame.contents().find('body').attr({ 'contenteditable': true, 'dir': this.opts.direction });
			}

			// set no editable
			this.setNonEditable();
			this.setSpansVerified();
			this.sync();

		},
		setFullpageOnInit: function(html)
		{
			html = this.cleanSavePreCode(html, true);
			html = this.cleanConverters(html);
			html = this.cleanEmpty(html);

			// set code
			this.$editor.html(html);

			// set no editable
			this.setNonEditable();
			this.setSpansVerified();
			this.sync();
		},
		setSpansVerified: function()
		{
			var spans = this.$editor.find('span');
			var replacementTag = 'inline';

			$.each(spans, function() {
				var outer = this.outerHTML;

				// Replace opening tag
				var regex = new RegExp('<' + this.tagName, 'gi');
				var newTag = outer.replace(regex, '<' + replacementTag);

				// Replace closing tag
				regex = new RegExp('</' + this.tagName, 'gi');
				newTag = newTag.replace(regex, '</' + replacementTag);

				$(this).replaceWith(newTag);
			});

		},
		setSpansVerifiedHtml: function(html)
		{
			html = html.replace(/<span(.*?)>/, '<inline$1>');
			return html.replace(/<\/span>/, '</inline>');
		},
		setNonEditable: function()
		{
			this.$editor.find('.noneditable').attr('contenteditable', false);
		},

		// SYNC
		sync: function()
		{
			var html = '';

			this.cleanUnverified();

			if (this.opts.fullpage) html = this.getCodeIframe();
			else html = this.$editor.html();

			html = this.syncClean(html);
			//html = this.cleanRemoveSpaces(html);
			html = this.cleanRemoveEmptyTags(html);

			// fix second level up ul, ol
			html = html.replace(/<\/li><(ul|ol)>([\w\W]*?)<\/(ul|ol)>/gi, '<$1>$2</$1></li>');

			if ($.trim(html) === '<br>') html = '';

			// xhtml
			if (this.opts.xhtml)
			{
				var xhtmlTags = ['br', 'hr', 'img', 'link', 'input', 'meta'];
				$.each(xhtmlTags, function(i,s)
				{
					html = html.replace(new RegExp('<' + s + '(.*?[^\/$]?)>', 'gi'), '<' + s + '$1 />');
				});

			}

			// before callback
			html = this.callback('syncBefore', false, html);

			this.$source.val(html);

			// onchange & after callback
			this.callback('syncAfter', false, html);

			if (this.start === false)
			{
				this.callback('change', false, html);
			}

		},
		syncClean: function(html)
		{
			if (!this.opts.fullpage) html = this.cleanStripTags(html);

			html = $.trim(html);

			// removeplaceholder
			html = this.placeholderRemoveFromCode(html);

			// remove space
			html = html.replace(/&#x200b;/gi, '');
			html = html.replace(/&#8203;/gi, '');
			html = html.replace(/<\/a>&nbsp;/gi, '<\/a> ');

			// link nofollow
			if (this.opts.linkNofollow)
			{
				html = html.replace(/<a(.*?)rel="nofollow"(.*?)>/gi, '<a$1$2>');
				html = html.replace(/<a(.*?)>/gi, '<a$1 rel="nofollow">');
			}

			// php code fix
			html = html.replace('<!--?php', '<?php');
			html = html.replace('?-->', '?>');

			// revert no editable
			html = html.replace(/<(.*?)class="noeditable"(.*?) contenteditable="false"(.*?)>/gi, '<$1class="noeditable"$2$3>');

			html = html.replace(/ data-tagblock=""/gi, '');
			html = html.replace(/<br\s?\/?>\n?<\/(P|H[1-6]|LI|ADDRESS|SECTION|HEADER|FOOTER|ASIDE|ARTICLE)>/gi, '</$1>');

			// remove image resize
			html = html.replace(/<span(.*?)id="redactor-image-box"(.*?)>([\w\W]*?)<img(.*?)><\/span>/i, '$3<img$4>');
			html = html.replace(/<span(.*?)id="redactor-image-resizer"(.*?)>(.*?)<\/span>/i, '');
			html = html.replace(/<span(.*?)id="redactor-image-editter"(.*?)>(.*?)<\/span>/i, '');

			// remove font
			html = html.replace(/<font(.*?)>([\w\W]*?)<\/font>/gi, '$2');

			// remove spans
			html = html.replace(/<span(.*?)>([\w\W]*?)<\/span>/gi, '$2');
			html = html.replace(/<inline>/gi, '<span>');
			html = html.replace(/<inline /gi, '<span ');
			html = html.replace(/<\/inline>/gi, '</span>');
			html = html.replace(/<span(.*?)class="redactor_placeholder"(.*?)>([\w\W]*?)<\/span>/gi, '');
			html = html.replace(/<span>([\w\W]*?)<\/span>/gi, '$1');

			// fixes
			html = html.replace(/&amp;/gi, '&');
			html = html.replace(/™/gi, '&trade;');
			html = html.replace(/©/gi, '&copy;');


			html = this.cleanReConvertProtected(html);

			return html;
		},


		// BUILD
		buildStart: function()
		{
			// content
			this.content = '';

			// container
			this.$box = $('<div class="redactor_box" />');

			// textarea test
			if (this.$source[0].tagName === 'TEXTAREA') this.opts.textareamode = true;

			// mobile
			if (this.opts.mobile === false && this.isMobile())
			{
				this.buildMobile();
			}
			else
			{
				// get the content at the start
				this.buildContent();

				if (this.opts.iframe)
				{
					// build as iframe
					this.opts.autoresize = false;
					this.iframeStart();
				}
				else if (this.opts.textareamode) this.buildFromTextarea();
				else this.buildFromElement();

				// options and final setup
				if (!this.opts.iframe)
				{
					this.buildOptions();
					this.buildAfter();
				}
			}
		},
		buildMobile: function()
		{
			if (!this.opts.textareamode)
			{
				this.$editor = this.$source;
				this.$editor.hide();
				this.$source = this.buildCodearea(this.$editor);
				this.$source.val(this.content);
			}

			this.$box.insertAfter(this.$source).append(this.$source);
		},
		buildContent: function()
		{
			if (this.opts.textareamode) this.content = $.trim(this.$source.val());
			else this.content = $.trim(this.$source.html());
		},
		buildFromTextarea: function()
		{
			this.$editor = $('<div />');
			this.$box.insertAfter(this.$source).append(this.$editor).append(this.$source);

			// enable
			this.buildAddClasses(this.$editor);
			this.buildEnable();
		},
		buildFromElement: function()
		{
			this.$editor = this.$source;
			this.$source = this.buildCodearea(this.$editor);
			this.$box.insertAfter(this.$editor).append(this.$editor).append(this.$source);

			// enable
			this.buildEnable();
		},
		buildCodearea: function($source)
		{
			return $('<textarea />').attr('name', $source.attr('id')).css('height', this.sourceHeight);
		},
		buildAddClasses: function(el)
		{
			// append textarea classes to editable layer
			$.each(this.$source.get(0).className.split(/\s+/), function(i,s)
			{
				el.addClass('redactor_' + s);
			});
		},
		buildEnable: function()
		{
			this.$editor.addClass('redactor_editor').attr({ 'contenteditable': true, 'dir': this.opts.direction });
			this.$source.attr('dir', this.opts.direction).hide();

			// set code
			this.set(this.content, true, false);
		},
		buildOptions: function()
		{
			var $source = this.$editor;
			if (this.opts.iframe) $source = this.$frame;

			// options
			if (this.opts.tabindex) $source.attr('tabindex', this.opts.tabindex);
			if (this.opts.minHeight) $source.css('min-height', this.opts.minHeight + 'px');
			if (this.opts.maxHeight)
			{
				this.opts.autoresize = false;
				this.sourceHeight = this.opts.maxHeight;
			}
			if (this.opts.wym) this.$editor.addClass('redactor_editor_wym');
			if (!this.opts.autoresize) $source.css('height', this.sourceHeight);
		},
		buildAfter: function()
		{
			this.start = false;

			// load toolbar
			if (this.opts.toolbar)
			{
				this.opts.toolbar = this.toolbarInit(this.opts.curLang);
				this.toolbarBuild();
			}

			// modal templates
			this.modalTemplatesInit();

			// plugins
			this.buildPlugins();

			// enter, tab, etc.
			this.buildBindKeyboard();

			// autosave
			if (this.opts.autosave) this.autosave();

			// observers
			setTimeout($.proxy(this.observeStart, this), 4);

			// FF fix
			if (this.browser('mozilla'))
			{
				try {
					this.document.execCommand('enableObjectResizing', false, false);
					this.document.execCommand('enableInlineTableEditing', false, false);
				} catch (e) {}
			}

			// focus
			if (this.opts.focus) setTimeout($.proxy(this.focus, this), 100);

			// code mode
			if (!this.opts.visual)
			{
				setTimeout($.proxy(function()
				{
					this.opts.visual = true;
					this.toggle(false);

				}, this), 200);
			}

			// init callback
			this.callback('init');
		},
		buildBindKeyboard: function()
		{
			this.dblEnter = 0;

			if (this.opts.dragUpload && this.opts.imageUpload !== false)
			{
				this.$editor.on('drop.redactor', $.proxy(this.buildEventDrop, this));
			}

			this.$editor.on('paste.redactor', $.proxy(this.buildEventPaste, this));
			this.$editor.on('keydown.redactor', $.proxy(this.buildEventKeydown, this));
			this.$editor.on('keyup.redactor', $.proxy(this.buildEventKeyup, this));

			// textarea callback
			if ($.isFunction(this.opts.textareaKeydownCallback))
			{
				this.$source.on('keydown.redactor-textarea', $.proxy(this.opts.textareaKeydownCallback, this));
			}

			// focus callback
			if ($.isFunction(this.opts.focusCallback))
			{
				this.$editor.on('focus.redactor', $.proxy(this.opts.focusCallback, this));
			}

			var clickedElement;
			$(document).mousedown(function(e) {
				clickedElement = $(e.target);
			});

			// blur callback
			this.$editor.on('blur.redactor', $.proxy(function(e)
			{
				if (!$(clickedElement).hasClass('redactor_toolbar') && $(clickedElement).parents('.redactor_toolbar').size() == 0)
				{
					this.selectall = false;
					if ($.isFunction(this.opts.blurCallback)) this.callback('blur', e);
				}
			}, this));

		},
		buildEventDrop: function(e)
		{
			e = e.originalEvent || e;

			if (window.FormData === undefined || !e.dataTransfer) return true;

		    var length = e.dataTransfer.files.length;
		    if (length == 0) return true;

		    e.preventDefault();

	        var file = e.dataTransfer.files[0];

	        if (this.opts.dnbImageTypes !== false && this.opts.dnbImageTypes.indexOf(file.type) == -1)
	        {
		        return true;
	        }

			this.bufferSet();

			var progress = $('<div id="redactor-progress-drag" class="redactor-progress redactor-progress-striped"><div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div></div>');
			$(document.body).append(progress);

			if (this.opts.s3 === false)
			{
				this.dragUploadAjax(this.opts.imageUpload, file, true, progress, e, this.opts.imageUploadParam);
			}
			else
			{
				this.s3uploadFile(file);
			}

		},
		buildEventPaste: function(e)
		{
			var oldsafari = false;
			if (this.browser('webkit') && navigator.userAgent.indexOf('Chrome') === -1)
			{
				var arr = this.browser('version').split('.');
				if (arr[0] < 536) oldsafari = true;
			}

			if (oldsafari) return true;

			// paste except opera (not webkit)
			if (this.browser('opera')) return true;

			// clipboard upload
			if (this.opts.clipboardUpload && this.buildEventClipboardUpload(e)) return true;

			if (this.opts.cleanup)
			{
				this.rtePaste = true;

				this.selectionSave();

				if (!this.selectall)
				{
					if (this.opts.autoresize === true && this.fullscreen !== true)
					{
						this.$editor.height(this.$editor.height());
						this.saveScroll = this.document.body.scrollTop;
					}
					else
					{
						this.saveScroll = this.$editor.scrollTop();
					}
				}

				var frag = this.extractContent();

				setTimeout($.proxy(function()
				{
					var pastedFrag = this.extractContent();
					this.$editor.append(frag);

					this.selectionRestore();

					var html = this.getFragmentHtml(pastedFrag);
					this.pasteClean(html);

					if (this.opts.autoresize === true && this.fullscreen !== true) this.$editor.css('height', 'auto');

				}, this), 1);
			}
		},
		buildEventClipboardUpload: function(e)
		{
			var event = e.originalEvent || e;
			this.clipboardFilePaste = false;

			if (typeof(event.clipboardData) === 'undefined') return false;
			if (event.clipboardData.items)
			{
				var file = event.clipboardData.items[0].getAsFile();
				if (file !== null)
				{
					this.bufferSet();
					this.clipboardFilePaste = true;

					var reader = new FileReader();
					reader.onload = $.proxy(this.pasteClipboardUpload, this);
			        reader.readAsDataURL(file);

			        return true;
				}
			}

			return false;

		},
		buildEventKeydown: function(e)
		{
			if (this.rtePaste) return false;

			var key = e.which;
			var ctrl = e.ctrlKey || e.metaKey;
			var parent = this.getParent();
			var current = this.getCurrent();
			var block = this.getBlock();
			var pre = false;

			this.callback('keydown', e);

			this.imageResizeHide(false);

			// pre & down
			if ((parent && $(parent).get(0).tagName === 'PRE') || (current && $(current).get(0).tagName === 'PRE'))
			{
				pre = true;
				if (key === this.keyCode.DOWN) this.insertAfterLastElement(block);
			}

			// down
			if (key === this.keyCode.DOWN)
			{
				if (parent && $(parent)[0].tagName === 'BLOCKQUOTE') this.insertAfterLastElement(parent);
				if (current && $(current)[0].tagName === 'BLOCKQUOTE') this.insertAfterLastElement(current);

				if (parent && $(parent)[0].tagName === 'P' && $(parent).parent()[0].tagName == 'BLOCKQUOTE')
				{
					this.insertAfterLastElement(parent, $(parent).parent()[0]);
				}
				if (current && $(current)[0].tagName === 'P' && parent && $(parent)[0].tagName == 'BLOCKQUOTE')
				{
					this.insertAfterLastElement(current, parent);
				}
			}

			// shortcuts setup
			if (ctrl && !e.shiftKey) this.shortcuts(e, key);

			// buffer setup
			if (ctrl && key === 90 && !e.shiftKey && !e.altKey) // z key
			{
				e.preventDefault();
				if (this.opts.buffer.length) this.bufferUndo();
				else this.document.execCommand('undo', false, false);
				return;
			}
			// undo
			else if (ctrl && key === 90 && e.shiftKey && !e.altKey)
			{
				e.preventDefault();
				if (this.opts.rebuffer.length != 0) this.bufferRedo();
				else this.document.execCommand('redo', false, false);
				return;
			}

			// select all
			if (ctrl && key === 65) this.selectall = true;
			else if (key != this.keyCode.LEFT_WIN && !ctrl) this.selectall = false;

			// enter
			if (key == this.keyCode.ENTER && !e.shiftKey && !e.ctrlKey && !e.metaKey )
			{
				// In ie, opera in the tables are created paragraphs, fix it.
				if (this.browser('msie') && (parent.nodeType == 1 && (parent.tagName == 'TD' || parent.tagName == 'TH')))
				{
					e.preventDefault();
					this.bufferSet();
					this.insertNode(document.createElement('br'));
					this.callback('enter', e);
					return false;
				}

				// blockquote exit
				if (block && (block.tagName == 'BLOCKQUOTE' || $(block).parent()[0].tagName == 'BLOCKQUOTE'))
				{
					if (this.isEndOfElement())
					{
						if (this.dblEnter == 1)
						{
							var element;
							var last;
							if (block.tagName == 'BLOCKQUOTE')
							{
								last = 'br';
								element = block;
							}
							else
							{
								last = 'p';
								element = $(block).parent()[0];
							}

							e.preventDefault();
							this.insertingAfterLastElement(element);
							this.dblEnter = 0;

							if (last == 'p')
							{
								$(block).parent().find('p').last().remove();
							}
							else
							{
								var tmp = $.trim($(block).html());
								$(block).html(tmp.replace(/<br\s?\/?>$/i, ''));
							}

							return;
						}
						else this.dblEnter++;
					}
					else this.dblEnter++;
				}

				// pre
				if (pre === true) return this.buildEventKeydownPre(e, current);
				else
				{
					if (!this.opts.linebreaks)
					{
						// replace div to p
						if (block && this.opts.rBlockTest.test(block.tagName))
						{
							// hit enter
							this.bufferSet();

							setTimeout($.proxy(function()
							{
								var blockElem = this.getBlock();
								if (blockElem.tagName === 'DIV' && !$(blockElem).hasClass('redactor_editor'))
								{
									var node = $('<p>' + this.opts.invisibleSpace + '</p>');
									$(blockElem).replaceWith(node);
									this.selectionStart(node);
								}

							}, this), 1);
						}
						else if (block === false)
						{
							// hit enter
							this.bufferSet();

							var node = $('<p>' + this.opts.invisibleSpace + '</p>');
							this.insertNode(node[0]);
							this.selectionStart(node);
							this.callback('enter', e);
							return false;
						}

					}

					if (this.opts.linebreaks)
					{
						// replace div to br
						if (block && this.opts.rBlockTest.test(block.tagName))
						{
							// hit enter
							this.bufferSet();

							setTimeout($.proxy(function()
							{
								var blockElem = this.getBlock();
								if ((blockElem.tagName === 'DIV' || blockElem.tagName === 'P') && !$(blockElem).hasClass('redactor_editor'))
								{
									this.replaceLineBreak(blockElem);
								}

							}, this), 1);
						}
						else
						{
							return this.buildEventKeydownInsertLineBreak(e);
						}
					}

					// blockquote, figcaption
					if (block.tagName == 'BLOCKQUOTE' || block.tagName == 'FIGCAPTION')
					{
						return this.buildEventKeydownInsertLineBreak(e);
					}

				}

				this.callback('enter', e);
			}
			else if (key === this.keyCode.ENTER && (e.ctrlKey || e.shiftKey)) // Shift+Enter or Ctrl+Enter
			{
				this.bufferSet();

				e.preventDefault();
				this.insertLineBreak();
			}

			// tab
			if (key === this.keyCode.TAB && this.opts.shortcuts) return this.buildEventKeydownTab(e, pre);

			// delete zero-width space before the removing
			if (key === this.keyCode.BACKSPACE) this.buildEventKeydownBackspace(current);

		},
		buildEventKeydownPre: function(e, current)
		{
			e.preventDefault();
			this.bufferSet();
			var html = $(current).parent().text();
			this.insertNode(document.createTextNode('\n'));
			if (html.search(/\s$/) == -1)
			{
				this.insertNode(document.createTextNode('\n'));
			}

			this.sync();
			this.callback('enter', e);
			return false;
		},
		buildEventKeydownTab: function(e, pre)
		{
			if (!this.opts.tabFocus) return true;
			if (this.isEmpty(this.get()) && this.opts.tabSpaces === false) return true;

			e.preventDefault();

			if (pre === true && !e.shiftKey)
			{
				this.bufferSet();
				this.insertNode(document.createTextNode('\t'));
				this.sync();
				return false;

			}
			else if (this.opts.tabSpaces !== false)
			{
				this.bufferSet();
				this.insertNode(document.createTextNode(Array(this.opts.tabSpaces + 1).join('\u00a0')));
				this.sync();
				return false;
			}
			else
			{
				if (!e.shiftKey) this.indentingIndent();
				else this.indentingOutdent();
			}

			return false;
		},
		buildEventKeydownBackspace: function(current)
		{
			if (typeof current.tagName !== 'undefined' && /^(H[1-6])$/i.test(current.tagName))
			{
				var node;
				if (this.opts.linebreaks === false) node = $('<p>' + this.opts.invisibleSpace + '</p>');
				else node = $('<br>' + this.opts.invisibleSpace);

				$(current).replaceWith(node);
				this.selectionStart(node);
			}

			if (typeof current.nodeValue !== 'undefined' && current.nodeValue !== null)
			{
				//var value = $.trim(current.nodeValue.replace(/[^\u0000-\u1C7F]/g, ''));
				if (current.remove && current.nodeType === 3 && current.nodeValue.match(/[^/\u200B]/g) == null)
				{
					current.remove();
				}
			}
		},
		buildEventKeydownInsertLineBreak: function(e)
		{
			this.bufferSet();
			e.preventDefault();
			this.insertLineBreak();
			this.callback('enter', e);
			return;
		},
		buildEventKeyup: function(e)
		{
			if (this.rtePaste) return false;

			var key = e.which;
			var parent = this.getParent();
			var current = this.getCurrent();

			// replace to p before / after the table or body
			if (!this.opts.linebreaks && current.nodeType == 3 && (parent == false || parent.tagName == 'BODY'))
			{
				var node = $('<p>').append($(current).clone());
				$(current).replaceWith(node);
				var next = $(node).next();
				if (typeof(next[0]) !== 'undefined' && next[0].tagName == 'BR')
				{
					next.remove();
				}
				this.selectionEnd(node);
			}

			// convert links
			if ((this.opts.convertLinks || this.opts.convertImageLinks || this.opts.convertVideoLinks) && key === this.keyCode.ENTER)
			{
				this.buildEventKeyupConverters();
			}

			// if empty
			if (key === this.keyCode.DELETE || key === this.keyCode.BACKSPACE)
			{
				return this.formatEmpty(e);
			}

			this.callback('keyup', e);
			this.sync();
		},
		buildEventKeyupConverters: function()
		{
			this.formatLinkify(this.opts.linkProtocol, this.opts.convertLinks, this.opts.convertImageLinks, this.opts.convertVideoLinks, this.opts.linkSize);

			setTimeout($.proxy(function()
			{
				if (this.opts.convertImageLinks) this.observeImages();
				if (this.opts.observeLinks) this.observeLinks();
			}, this), 5);
		},
		buildPlugins: function()
		{
			if (!this.opts.plugins ) return;

			$.each(this.opts.plugins, $.proxy(function(i, s)
			{
				if (RedactorPlugins[s])
				{
					$.extend(this, RedactorPlugins[s]);
					if ($.isFunction( RedactorPlugins[ s ].init)) this.init();
				}

			}, this ));
		},

		// IFRAME
		iframeStart: function()
		{
			this.iframeCreate();

			if (this.opts.textareamode) this.iframeAppend(this.$source);
			else
			{
				this.$sourceOld = this.$source.hide();
				this.$source = this.buildCodearea(this.$sourceOld);
				this.iframeAppend(this.$sourceOld);
			}
		},
		iframeAppend: function(el)
		{
			this.$source.attr('dir', this.opts.direction).hide();
			this.$box.insertAfter(el).append(this.$frame).append(this.$source);
		},
		iframeCreate: function()
		{
			this.$frame = $('<iframe style="width: 100%;" frameborder="0" />').one('load', $.proxy(function()
			{
				if (this.opts.fullpage)
				{
					this.iframePage();

					if (this.content === '') this.content = this.opts.invisibleSpace;

					this.$frame.contents()[0].write(this.content);
					this.$frame.contents()[0].close();

					var timer = setInterval($.proxy(function()
					{
						if (this.$frame.contents().find('body').html())
						{
							clearInterval(timer);
							this.iframeLoad();
						}

					}, this), 0);
				}
				else this.iframeLoad();

			}, this));
		},
		iframeDoc: function()
		{
			return this.$frame[0].contentWindow.document;
		},
		iframePage: function()
		{
			var doc = this.iframeDoc();
			if (doc.documentElement) doc.removeChild(doc.documentElement);

			return doc;
		},
		iframeAddCss: function(css)
		{
			css = css || this.opts.css;

			if (this.isString(css))
			{
				this.$frame.contents().find('head').append('<link rel="stylesheet" href="' + css + '" />');
			}

			if ($.isArray(css))
			{
				$.each(css, $.proxy(function(i, url)
				{
					this.iframeAddCss(url);

				}, this));
			}
		},
		iframeLoad: function()
		{
			this.$editor = this.$frame.contents().find('body').attr({ 'contenteditable': true, 'dir': this.opts.direction });

			// set document & window
			if (this.$editor[0])
			{
				this.document = this.$editor[0].ownerDocument;
				this.window = this.document.defaultView || window;
			}

			// iframe css
			this.iframeAddCss();

			if (this.opts.fullpage) this.setFullpageOnInit(this.$editor.html());
			else this.set(this.content, true, false);

			this.buildOptions();
			this.buildAfter();
		},

		// PLACEHOLDER
		placeholderStart: function(html)
		{
			if (this.isEmpty(html))
			{
				if (this.$element.attr('placeholder')) this.opts.placeholder = this.$element.attr('placeholder');
				if (this.opts.placeholder === '') this.opts.placeholder = false;

				if (this.opts.placeholder !== false)
				{
					this.opts.focus = false;
					this.$editor.one('focus.redactor_placeholder', $.proxy(this.placeholderFocus, this));

					return $('<span class="redactor_placeholder" data-redactor="verified">').attr('contenteditable', false).text(this.opts.placeholder);
				}
			}

			return false;
		},
		placeholderFocus: function()
		{
			this.$editor.find('span.redactor_placeholder').remove();

			var html = '';
			if (this.opts.linebreaks === false) html = this.opts.emptyHtml;

			this.$editor.off('focus.redactor_placeholder');
			this.$editor.html(html);

			if (this.opts.linebreaks === false)
			{
				// place the cursor inside emptyHtml
				this.selectionStart(this.$editor.children()[0]);
			}
			else
			{
				this.focus();
			}

			this.sync();
		},
		placeholderRemove: function()
		{
			this.opts.placeholder = false;
			this.$editor.find('span.redactor_placeholder').remove();
			this.$editor.off('focus.redactor_placeholder');
		},
		placeholderRemoveFromCode: function(html)
		{
			return html.replace(/<span class="redactor_placeholder"(.*?)>(.*?)<\/span>/i, '');
		},

		// SHORTCUTS
		shortcuts: function(e, key)
		{

			if (!this.opts.shortcuts) return;

			if (!e.altKey)
			{
				if (key === 77) this.shortcutsLoad(e, 'removeFormat'); // Ctrl + m
				else if (key === 66) this.shortcutsLoad(e, 'bold'); // Ctrl + b
				else if (key === 73) this.shortcutsLoad(e, 'italic'); // Ctrl + i

				else if (key === 74) this.shortcutsLoad(e, 'insertunorderedlist'); // Ctrl + j
				else if (key === 75) this.shortcutsLoad(e, 'insertorderedlist'); // Ctrl + k

				else if (key === 72) this.shortcutsLoad(e, 'superscript'); // Ctrl + h
				else if (key === 76) this.shortcutsLoad(e, 'subscript'); // Ctrl + l
			}
			else
			{
				if (key === 48) this.shortcutsLoadFormat(e, 'p'); // ctrl + alt + 0
				else if (key === 49) this.shortcutsLoadFormat(e, 'h1'); // ctrl + alt + 1
				else if (key === 50) this.shortcutsLoadFormat(e, 'h2'); // ctrl + alt + 2
				else if (key === 51) this.shortcutsLoadFormat(e, 'h3'); // ctrl + alt + 3
				else if (key === 52) this.shortcutsLoadFormat(e, 'h4'); // ctrl + alt + 4
				else if (key === 53) this.shortcutsLoadFormat(e, 'h5'); // ctrl + alt + 5
				else if (key === 54) this.shortcutsLoadFormat(e, 'h6'); // ctrl + alt + 6

			}

		},
		shortcutsLoad: function(e, cmd)
		{
			e.preventDefault();
			this.execCommand(cmd, false);
		},
		shortcutsLoadFormat: function(e, cmd)
		{
			e.preventDefault();
			this.formatBlocks(cmd);
		},

		// FOCUS
		focus: function()
		{
			if (!this.browser('opera')) this.window.setTimeout($.proxy(this.focusSet, this, true), 1);
			else this.$editor.focus();
		},
		focusEnd: function()
		{
			this.focusSet();
		},
		focusSet: function(collapse)
		{
			this.$editor.focus();

			var range = this.getRange();
			range.selectNodeContents(this.$editor[0]);

			// collapse - controls the position of focus: the beginning (true), at the end (false).
			range.collapse(collapse || false);

			var sel = this.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		},

		// TOGGLE
		toggle: function(direct)
		{
			if (this.opts.visual) this.toggleCode(direct);
			else this.toggleVisual();
		},
		toggleVisual: function()
		{
			var html = this.$source.hide().val();

			if (typeof this.modified !== 'undefined')
			{
				this.modified = this.cleanRemoveSpaces(this.modified, false) !== this.cleanRemoveSpaces(html, false);
			}

			if (this.modified)
			{
				// don't remove the iframe even if cleared all.
				if (this.opts.fullpage && html === '') this.setFullpageOnInit(html);
				else
				{
					this.set(html);
					if (this.opts.fullpage) this.buildBindKeyboard();
				}
			}

			if (this.opts.iframe) this.$frame.show();
			else this.$editor.show();

			if (this.opts.fullpage) this.$editor.attr('contenteditable', true );

			this.$source.off('keydown.redactor-textarea-indenting');

			this.$editor.focus();
			this.selectionRestore();

			this.observeStart();
			this.buttonActiveVisual();
			this.buttonInactive('html');
			this.opts.visual = true;
		},
		toggleCode: function(direct)
		{
			if (direct !== false) this.selectionSave();

			var height = null;
			if (this.opts.iframe)
			{
				height = this.$frame.height();
				if (this.opts.fullpage) this.$editor.removeAttr('contenteditable');
				this.$frame.hide();
			}
			else
			{
				height = this.$editor.innerHeight();
				this.$editor.hide();
			}

			var html = this.$source.val();

			// tidy html
			if (html !== '' && this.opts.tidyHtml)
			{
				this.$source.val(this.cleanHtml(html));
			}

			this.modified = html;

			this.$source.height(height).show().focus();

			// textarea indenting
			this.$source.on('keydown.redactor-textarea-indenting', this.textareaIndenting);

			this.buttonInactiveVisual();
			this.buttonActive('html');
			this.opts.visual = false;
		},
		textareaIndenting: function(e)
		{
			if (e.keyCode === 9)
			{
				var $el = $(this);
				var start = $el.get(0).selectionStart;
				$el.val($el.val().substring(0, start) + "\t" + $el.val().substring($el.get(0).selectionEnd));
				$el.get(0).selectionStart = $el.get(0).selectionEnd = start + 1;
				return false;
			}
		},

		// AUTOSAVE
		autosave: function()
		{
			var savedHtml = false;
            var html = this.get();
            var submitData = "";
            if(this.opts.autosaveFormdata == true)
            {
                submitData = this.$source.closest('form').serialize();
            }
            else{
                submitData = this.$source.attr('name') + '=' + escape(encodeURIComponent(html));
            }
			this.autosaveInterval = setInterval($.proxy(function()
			{
				if (savedHtml !== html)
				{
					$.ajax({
						url: this.opts.autosave,
						type: 'post',
						data: submitData,
						success: $.proxy(function(data)
						{
							this.callback('autosave', false, data);
							savedHtml = html;

						}, this)
					});
				}
			}, this), this.opts.autosaveInterval*1000);
		},

		// TOOLBAR
		toolbarBuild: function()
		{
			// extend buttons
			if (this.opts.air)
			{
				this.opts.buttons = this.opts.airButtons;
			}
			else
			{
				if (!this.opts.buttonSource)
				{
					var index = this.opts.buttons.indexOf('html'), next = this.opts.buttons[index + 1];
					this.opts.buttons.splice(index, 1);
					if (next === '|') this.opts.buttons.splice(index, 1);
				}
			}

			$.extend(this.opts.toolbar, this.opts.buttonsCustom);
			$.each(this.opts.buttonsAdd, $.proxy(function(i, s)
			{
				this.opts.buttons.push(s);

			}, this));

			// formatting tags
			if (this.opts.toolbar)
			{
				$.each(this.opts.toolbar.formatting.dropdown, $.proxy(function (i, s)
				{
					if ($.inArray(i, this.opts.formattingTags ) == '-1') delete this.opts.toolbar.formatting.dropdown[i];

				}, this));
			}

			// if no buttons don't create a toolbar
			if (this.opts.buttons.length === 0) return false;

			// air enable
			this.airEnable();

			// toolbar build
			this.$toolbar = $('<ul>').addClass('redactor_toolbar').attr('id', 'redactor_toolbar_' + this.uuid);

			if (this.opts.air)
			{
				// air box
				this.$air = $('<div class="redactor_air">').attr('id', 'redactor_air_' + this.uuid).hide();
				this.$air.append(this.$toolbar);
				$('body').append(this.$air);
			}
			else
			{
				if (this.opts.toolbarExternal) $(this.opts.toolbarExternal).html(this.$toolbar);
				else this.$box.prepend(this.$toolbar);
			}

			$.each(this.opts.buttons, $.proxy(function(i, btnName)
			{
				// separator
				if ( btnName === '|' ) this.$toolbar.append($(this.opts.buttonSeparator));
				else if(this.opts.toolbar[btnName])
				{
					var btnObject = this.opts.toolbar[btnName];
					if (this.opts.fileUpload === false && btnName === 'file') return true;
					this.$toolbar.append( $('<li>').append(this.buttonBuild(btnName, btnObject)));
				}

			}, this));

			this.$toolbar.find('a').attr('tabindex', '-1');

			// fixed
			if (this.opts.toolbarFixed)
			{
				this.toolbarObserveScroll();
				$(this.opts.toolbarFixedTarget).on('scroll.redactor', $.proxy(this.toolbarObserveScroll, this));
			}

			// buttons response
			if (this.opts.activeButtons)
			{
				var buttonActiveObserver = $.proxy(this.buttonActiveObserver, this);
				this.$editor.on('mouseup.redactor keyup.redactor', buttonActiveObserver);
			}
		},
		toolbarObserveScroll: function()
		{
			var scrollTop = $(this.opts.toolbarFixedTarget).scrollTop();
			var boxTop = this.$box.offset().top;
			var left = 0;

			var end = boxTop + this.$box.height() + 40;

			if (scrollTop > boxTop)
			{
				var width = '100%';
				if (this.opts.toolbarFixedBox)
				{
					left = this.$box.offset().left;
					width = this.$box.innerWidth();
					this.$toolbar.addClass('toolbar_fixed_box');
				}

				this.toolbarFixed = true;
				this.$toolbar.css({
					position: 'fixed',
					width: width,
					zIndex: 1005,
					top: this.opts.toolbarFixedTopOffset + 'px',
					left: left
				});

				if (scrollTop < end) this.$toolbar.css('visibility', 'visible');
				else this.$toolbar.css('visibility', 'hidden');
			}
			else
			{
				this.toolbarFixed = false;
				this.$toolbar.css({
					position: 'relative',
					width: 'auto',
					top: 0,
					left: left
				});

				if (this.opts.toolbarFixedBox) this.$toolbar.removeClass('toolbar_fixed_box');
			}
		},

		// AIR
		airEnable: function()
		{
			if (!this.opts.air) return;

			this.$editor.on('mouseup.redactor keyup.redactor', this, $.proxy(function(e)
			{
				var text = this.getSelectionText();

				if (e.type === 'mouseup' && text != '') this.airShow(e);
				if (e.type === 'keyup' && e.shiftKey && text != '')
				{
					var $focusElem = $(this.getElement(this.getSelection().focusNode)), offset = $focusElem.offset();
					offset.height = $focusElem.height();
					this.airShow(offset, true);
				}

			}, this));
		},
		airShow: function (e, keyboard)
		{
			if (!this.opts.air) return;

			var left, top;
			$('.redactor_air').hide();

			if (keyboard)
			{
				left = e.left;
				top = e.top + e.height + 14;

				if (this.opts.iframe)
				{
					top += this.$box.position().top - $(this.document).scrollTop();
					left += this.$box.position().left;
				}
			}
			else
			{
				var width = this.$air.innerWidth();

				left = e.clientX;
				if ($(this.document).width() < (left + width)) left -= width;

				top = e.clientY + 14;
				if (this.opts.iframe)
				{
					top += this.$box.position().top;
					left += this.$box.position().left;
				}
				else top += $( this.document ).scrollTop();
			}

			this.$air.css({
				left: left + 'px',
				top: top + 'px'
			}).show();

			this.airBindHide();
		},
		airBindHide: function()
		{
			if (!this.opts.air) return;

			var hideHandler = $.proxy(function(doc)
			{
				$(doc).on('mousedown.redactor', $.proxy(function(e)
				{
					if ($( e.target ).closest(this.$toolbar).length === 0)
					{
						this.$air.fadeOut(100);
						this.selectionRemove();
						$(doc).off(e);
					}

				}, this)).on('keydown.redactor', $.proxy(function(e)
				{
					if (e.which === this.keyCode.ESC)
					{
						this.getSelection().collapseToStart();
					}

					this.$air.fadeOut(100);
					$(doc).off(e);

				}, this));
			}, this);

			// Hide the toolbar at events in all documents (iframe)
			hideHandler(document);
			if (this.opts.iframe) hideHandler(this.document);
		},
		airBindMousemoveHide: function()
		{
			if (!this.opts.air) return;

			var hideHandler = $.proxy(function(doc)
			{
				$(doc).on('mousemove.redactor', $.proxy(function(e)
				{
					if ($( e.target ).closest(this.$toolbar).length === 0)
					{
						this.$air.fadeOut(100);
						$(doc).off(e);
					}

				}, this));
			}, this);

			// Hide the toolbar at events in all documents (iframe)
			hideHandler(document);
			if (this.opts.iframe) hideHandler(this.document);
		},

		// DROPDOWNS
		dropdownBuild: function($dropdown, dropdownObject)
		{
			$.each(dropdownObject, $.proxy(function(btnName, btnObject)
			{
				if (!btnObject.className) btnObject.className = '';

				var $item;
				if (btnObject.name === 'separator') $item = $('<a class="redactor_separator_drop">');
				else
				{
					$item = $('<a href="#" class="' + btnObject.className + ' redactor_dropdown_' + btnName + '">' + btnObject.title + '</a>');
					$item.on('click', $.proxy(function(e)
					{
						if (e.preventDefault) e.preventDefault();
						if (this.browser('msie')) e.returnValue = false;

						if (btnObject.callback) btnObject.callback.call(this, btnName, $item, btnObject, e);
						if (btnObject.exec) this.execCommand(btnObject.exec, btnName);
						if (btnObject.func) this[btnObject.func](btnName);

						this.buttonActiveObserver();
						if (this.opts.air) this.$air.fadeOut(100);

					}, this));
				}

				$dropdown.append($item);

			}, this));
		},
		dropdownShow: function(e, key)
		{
			if (!this.opts.visual)
			{
				e.preventDefault();
				return false;
			}

			var $dropdown = this.$toolbar.find('.redactor_dropdown_box_' + key);
			var $button = this.buttonGet(key);

			if ($button.hasClass('dropact')) this.dropdownHideAll();
			else
			{
				this.dropdownHideAll();

				this.buttonActive(key);
				$button.addClass('dropact');

				var keyPosition = $button.position();
				if (this.toolbarFixed)
				{
					keyPosition = $button.offset();
				}

				// fix right placement
				var dropdownWidth = $dropdown.width();
				if ((keyPosition.left + dropdownWidth) > $(document).width())
				{
					keyPosition.left -= dropdownWidth;
				}

				var left = keyPosition.left + 'px';
				var btnHeight = 29;

				var position = 'absolute';
				var top = btnHeight + 'px';

				if (this.opts.toolbarFixed && this.toolbarFixed) position = 'fixed';
				else if (!this.opts.air) top = keyPosition.top + btnHeight + 'px';

				$dropdown.css({ position: position, left: left, top: top }).show();
			}


			var hdlHideDropDown = $.proxy(function(e)
			{
				this.dropdownHide(e, $dropdown);

			}, this);

			$(document).one('click', hdlHideDropDown);
			this.$editor.one('click', hdlHideDropDown);

			e.stopPropagation();
			this.$editor.focus();
		},
		dropdownHideAll: function()
		{
			this.$toolbar.find('a.dropact').removeClass('redactor_act').removeClass('dropact');
			$('.redactor_dropdown').hide();
		},
		dropdownHide: function (e, $dropdown)
		{
			if (!$(e.target).hasClass('dropact'))
			{
				$dropdown.removeClass('dropact');
				this.dropdownHideAll();
			}
		},

		// BUTTONS
		buttonBuild: function(btnName, btnObject)
		{
			var $button = $('<a href="javascript:;" title="' + btnObject.title + '" tabindex="-1" class="redactor_btn redactor_btn_' + btnName + '"></a>');

			$button.on('click', $.proxy(function(e)
			{
				if (e.preventDefault) e.preventDefault();
				if (this.browser('msie')) e.returnValue = false;

				if ($button.hasClass('redactor_button_disabled')) return false;

				if (this.isFocused() === false && !btnObject.exec)
				{
					this.$editor.focus();
				}

				if (btnObject.exec)
				{
					this.$editor.focus();
					this.execCommand(btnObject.exec, btnName);
					this.airBindMousemoveHide();

				}
				else if (btnObject.func && btnObject.func !== 'show')
				{
					this[btnObject.func](btnName);
					this.airBindMousemoveHide();

				}
				else if (btnObject.callback)
				{
					btnObject.callback.call(this, btnName, $button, btnObject, e);
					this.airBindMousemoveHide();

				}
				else if (btnObject.dropdown)
				{
					this.dropdownShow(e, btnName);
				}

				this.buttonActiveObserver(false, btnName);

			}, this));

			// dropdown
			if (btnObject.dropdown)
			{
				var $dropdown = $('<div class="redactor_dropdown redactor_dropdown_box_' + btnName + '" style="display: none;">');
				$dropdown.appendTo(this.$toolbar);
				this.dropdownBuild($dropdown, btnObject.dropdown);
			}

			return $button;
		},
		buttonGet: function(key)
		{
			if (!this.opts.toolbar) return false;
			return $(this.$toolbar.find('a.redactor_btn_' + key));
		},
		buttonActiveToggle: function(key)
		{
			var btn = this.buttonGet(key);

			if (btn.hasClass('redactor_act')) btn.removeClass('redactor_act');
			else btn.addClass('redactor_act');
		},
		buttonActive: function(key)
		{
			this.buttonGet(key).addClass('redactor_act');
		},
		buttonInactive: function(key)
		{
			this.buttonGet(key).removeClass('redactor_act');
		},
		buttonInactiveAll: function(btnName)
		{
			$.each(this.opts.toolbar, $.proxy(function(k)
			{
				if (k != btnName) this.buttonInactive(k);

			}, this));
		},
		buttonActiveVisual: function()
		{
			this.$toolbar.find('a.redactor_btn').not('a.redactor_btn_html').removeClass('redactor_button_disabled');
		},
		buttonInactiveVisual: function()
		{
			this.$toolbar.find('a.redactor_btn').not('a.redactor_btn_html').addClass('redactor_button_disabled');
		},
		buttonChangeIcon: function (key, classname)
		{
			this.buttonGet(key).addClass('redactor_btn_' + classname);
		},
		buttonRemoveIcon: function(key, classname)
		{
			this.buttonGet(key).removeClass('redactor_btn_' + classname);
		},
		buttonAddSeparator: function()
		{
			this.$toolbar.append($(this.opts.buttonSeparator));
		},
		buttonAddSeparatorAfter: function(key)
		{
			this.buttonGet(key).parent().after($(this.opts.buttonSeparator));
		},
		buttonAddSeparatorBefore: function(key)
		{
			this.buttonGet(key).parent().before($(this.opts.buttonSeparator));
		},
		buttonRemoveSeparatorAfter: function(key)
		{
			this.buttonGet(key).parent().next().remove();
		},
		buttonRemoveSeparatorBefore: function(key)
		{
			this.buttonGet(key).parent().prev().remove();
		},
		buttonSetRight: function(key)
		{
			if (!this.opts.toolbar) return;
			this.buttonGet(key).parent().addClass('redactor_btn_right');
		},
		buttonSetLeft: function(key)
		{
			if (!this.opts.toolbar) return;
			this.buttonGet(key).parent().removeClass('redactor_btn_right');
		},
		buttonAdd: function(key, title, callback, dropdown)
		{
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, { title: title, callback: callback, dropdown: dropdown });
			this.$toolbar.append( $('<li>').append(btn));
		},
		buttonAddFirst: function(key, title, callback, dropdown)
		{
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, { title: title, callback: callback, dropdown: dropdown });
			this.$toolbar.prepend($('<li>').append(btn));
		},
		buttonAddAfter: function(afterkey, key, title, callback, dropdown)
		{
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, { title: title, callback: callback, dropdown: dropdown });
			var $btn = this.buttonGet(afterkey);

			if ($btn.size() !== 0) $btn.parent().after($('<li>').append(btn));
			else this.$toolbar.append($('<li>').append(btn));
		},
		buttonAddBefore: function(beforekey, key, title, callback, dropdown)
		{
			if (!this.opts.toolbar) return;
			var btn = this.buttonBuild(key, { title: title, callback: callback, dropdown: dropdown });
			var $btn = this.buttonGet(beforekey);

			if ($btn.size() !== 0) $btn.parent().before($('<li>').append(btn));
			else this.$toolbar.append($('<li>').append(btn));
		},
		buttonRemove: function (key, separator)
		{
			var $btn = this.buttonGet(key);
			if (separator) $btn.parent().next().remove();
			$btn.parent().removeClass('redactor_btn_right');
			$btn.remove();
		},
		buttonActiveObserver: function(e, btnName)
		{
			var parent = this.getParent();
			this.buttonInactiveAll(btnName);

			if (e === false && btnName !== 'html')
			{
				if ($.inArray(btnName, this.opts.activeButtons) != -1)
				{
					this.buttonActiveToggle(btnName);
				}
				return;
			}

			if (parent && parent.tagName === 'A') this.$toolbar.find('a.redactor_dropdown_link').text(this.opts.curLang.link_edit);
			else this.$toolbar.find('a.redactor_dropdown_link').text(this.opts.curLang.link_insert);

			if (this.opts.activeButtonsAdd)
			{
				$.each(this.opts.activeButtonsAdd, $.proxy(function(i,s)
				{
					this.opts.activeButtons.push(s);

				}, this));

				$.extend(this.opts.activeButtonsStates, this.opts.activeButtonsAdd);
			}

			$.each(this.opts.activeButtonsStates, $.proxy(function(key, value)
			{
				if ($(parent).closest(key, this.$editor.get()[0]).length != 0)
				{
					this.buttonActive(value);
				}

			}, this));

			var $parent = $(parent).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
			if ($parent.length)
			{
				var align = $parent.css('text-align');

				switch (align)
				{
					case 'right':
						this.buttonActive('alignright');
					break;
					case 'center':
						this.buttonActive('aligncenter');
					break;
					case 'justify':
						this.buttonActive('justify');
					break;
					default:
						this.buttonActive('alignleft');
					break;
				}
			}
		},

		// EXEC
		execPasteFrag: function(html)
		{
			var sel = this.getSelection();
			if (sel.getRangeAt && sel.rangeCount)
			{
            	range = sel.getRangeAt(0);
				range.deleteContents();

				var el = document.createElement("div");
				el.innerHTML = html;
				var frag = document.createDocumentFragment(), node, lastNode;
				while ((node = el.firstChild))
				{
	                lastNode = frag.appendChild(node);
				}

				var firstNode = frag.firstChild;
				range.insertNode(frag);

				if (lastNode)
				{
	                range = range.cloneRange();
	                range.setStartAfter(lastNode);
                    range.collapse(true);
	                sel.removeAllRanges();
	                sel.addRange(range);
				}
			}
		},
		exec: function(cmd, param, sync)
		{
			if (cmd === 'formatblock' && this.browser('msie')) param = '<' + param + '>';

			if (cmd === 'inserthtml' && this.browser('msie'))
			{
				if (!this.isIe11())
				{
					this.$editor.focus();
					this.document.selection.createRange().pasteHTML(param);
				}
				else this.execPasteFrag(param);
			}
			else
			{
				this.document.execCommand(cmd, false, param);
			}

			if (sync !== false) this.sync();
			this.callback('execCommand', cmd, param);
		},
		execCommand: function(cmd, param, sync)
		{
			if (!this.opts.visual)
			{
				this.$source.focus();
				return false;
			}

			if (cmd === 'inserthtml')
			{
				this.insertHtml(param, sync);
				this.callback('execCommand', cmd, param);
				return;
			}

			// Stop formatting pre
			if (this.currentOrParentIs('PRE') && !this.opts.formattingPre) return false;

			// Lists
			if (cmd === 'insertunorderedlist' || cmd === 'insertorderedlist') return this.execLists(cmd, param);

			// Unlink
			if (cmd === 'unlink') return this.execUnlink(cmd, param);

			// Usual exec
			this.exec(cmd, param, sync);

			// Line
			if (cmd === 'inserthorizontalrule') this.$editor.find('hr').removeAttr('id');

		},
		execUnlink: function(cmd, param)
		{
			this.bufferSet();

			var link = this.currentOrParentIs('A');
			if (link)
			{
				$(link).replaceWith($(link).text());

				this.sync();
				this.callback('execCommand', cmd, param);
				return;
			}
		},
		execLists: function(cmd, param)
		{
			this.bufferSet();

			var parent = this.getParent();
			var $list = $(parent).closest('ol, ul');
			var remove = false;

			if ($list.length)
			{
				remove = true;
				var listTag = $list[0].tagName;
			 	if ((cmd === 'insertunorderedlist' && listTag === 'OL')
			 	|| (cmd === 'insertorderedlist' && listTag === 'UL'))
			 	{
				 	remove = false;
				}
			}

			this.selectionSave();

			// remove lists
			if (remove)
			{
				var nodes = this.getNodes();
				var elems = this.getBlocks(nodes);

				if (typeof nodes[0] != 'undefined' && nodes.length > 1 && nodes[0].nodeType == 3)
				{
					// fix the adding the first li to the array
					elems.unshift(this.getBlock());
				}

				var data = '', replaced = '';
				$.each(elems, $.proxy(function(i,s)
				{
					if (s.tagName == 'LI')
					{
						var $s = $(s);
						var cloned = $s.clone();
						cloned.find('ul', 'ol').remove();

						if (this.opts.linebreaks === false) data += this.outerHtml($('<p>').append(cloned.contents()));
						else data += cloned.html() + '<br>';

						if (i == 0)
						{
							$s.addClass('redactor-replaced').empty();
							replaced = this.outerHtml($s);
						}
						else $s.remove();
					}

				}, this));

				html = this.$editor.html().replace(replaced, '</' + listTag + '>' + data + '<' + listTag + '>');

				this.$editor.html(html);
				this.$editor.find(listTag + ':empty').remove();

			}

			// insert lists
			else
			{
				var firstParent = this.getParent();

				this.document.execCommand(cmd);

				var parent = this.getParent();
				var $list = $(parent).closest('ol, ul');

				if (firstParent && firstParent.tagName == 'TD')
				{
					$list.wrapAll('<td>');
				}

				if ($list.length)
				{
					// focus fix
					var li = $list.children().first();
					if ($.trim($(li).text()) == '')
					{
						var marker = $('<span id="selection-marker-1"></span>');
						$(li).prepend(marker);
					}

					if ((this.browser('msie') || this.browser('mozilla')) && parent.tagName !== 'LI')
					{
						$(parent).replaceWith($(parent).html());
					}

					var $listParent = $list.parent();
					if (this.isParentRedactor($listParent) && this.nodeTestBlocks($listParent[0]))
					{
						$listParent.replaceWith($listParent.contents());
					}
				}

				if (this.browser('mozilla')) this.$editor.focus();
			}

			this.selectionRestore();
			$(marker).remove();

			this.sync();
			this.callback('execCommand', cmd, param);
			return;
		},

		// INDENTING
		indentingIndent: function()
		{
			this.indentingStart('indent');
		},
		indentingOutdent: function()
		{
			this.indentingStart('outdent');
		},
		indentingStart: function(cmd)
		{
			this.bufferSet();

			if (cmd === 'indent')
			{
				var block = this.getBlock();

				this.selectionSave();

				if (block && block.tagName == 'LI')
				{
					// li
					var parent = this.getParent();

					var $list = $(parent).closest('ol, ul');
					var listTag = $list[0].tagName;

					var elems = this.getBlocks();

					$.each(elems, function(i,s)
					{
						if (s.tagName == 'LI')
						{
							var $prev = $(s).prev();
							if ($prev.size() != 0 && $prev[0].tagName == 'LI')
							{
								var $childList = $prev.children('ul, ol');
								if ($childList.size() == 0)
								{
									$prev.append($('<' + listTag + '>').append(s));
								}
								else $childList.append(s);
							}
						}
					});
				}
				// linebreaks
				else if (block === false && this.opts.linebreaks === true)
				{
					this.exec('formatBlock', 'blockquote');
					var newblock = this.getBlock();
					var block = $('<div data-tagblock="">').html($(newblock).html());
					$(newblock).replaceWith(block);

					var left = this.normalize($(block).css('margin-left')) + this.opts.indentValue;
					$(block).css('margin-left', left + 'px');
				}
				else
				{
					// all block tags
					var elements = this.getBlocks();
					$.each(elements, $.proxy(function(i, elem)
					{
						var $el = false;

						if (elem.tagName === 'TD') return;

						if ($.inArray(elem.tagName, this.opts.alignmentTags) !== -1)
						{
							$el = $(elem);
						}
						else
						{
							$el = $(elem).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
						}

						var left = this.normalize($el.css('margin-left')) + this.opts.indentValue;
						$el.css('margin-left', left + 'px');

					}, this));
				}

				this.selectionRestore();

			}
			// outdent
			else
			{
				this.selectionSave();

				var block = this.getBlock();
				if (block && block.tagName == 'LI')
				{
					// li
					var elems = this.getBlocks();
					var index = 0;

					this.insideOutdent(block, index, elems);
				}
				else
				{
					// all block tags
					var elements = this.getBlocks();
					$.each(elements, $.proxy(function(i, elem)
					{
						var $el = false;

						if ($.inArray(elem.tagName, this.opts.alignmentTags) !== -1)
						{
							$el = $(elem);
						}
						else
						{
							$el = $(elem).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
						}

						var left = this.normalize($el.css('margin-left')) - this.opts.indentValue;
						if (left <= 0)
						{
							// linebreaks
							if (this.opts.linebreaks === true && typeof($el.data('tagblock')) !== 'undefined')
							{
								$el.replaceWith($el.html());
							}
							// all block tags
							else
							{
								$el.css('margin-left', '');
								this.removeEmptyAttr($el, 'style');
							}
						}
						else
						{
							$el.css('margin-left', left + 'px');
						}

					}, this));
				}


				this.selectionRestore();
			}

			this.sync();

		},
		insideOutdent: function (li, index, elems)
		{
			if (li && li.tagName == 'LI')
			{
				var $parent = $(li).parent().parent();
				if ($parent.size() != 0 && $parent[0].tagName == 'LI')
				{
					$parent.after(li);
				}
				else
				{
					if (typeof elems[index] != 'undefined')
					{
						li = elems[index];
						index++;

						this.insideOutdent(li, index, elems);
					}
					else
					{
						this.execCommand('insertunorderedlist');
					}
				}
			}
		},

		// ALIGNMENT
		alignmentLeft: function()
		{
			this.alignmentSet('', 'JustifyLeft');
		},
		alignmentRight: function()
		{
			this.alignmentSet('right', 'JustifyRight');
		},
		alignmentCenter: function()
		{
			this.alignmentSet('center', 'JustifyCenter');
		},
		alignmentJustify: function()
		{
			this.alignmentSet('justify', 'JustifyFull');
		},
		alignmentSet: function(type, cmd)
		{
			this.bufferSet();

			if (this.oldIE())
			{
				this.document.execCommand(cmd, false, false);
				return true;
			}

			this.selectionSave();

			var block = this.getBlock();
			if (!block && this.opts.linebreaks)
			{
				// one element
				this.exec('formatBlock', 'blockquote');
				var newblock = this.getBlock();
				var block = $('<div data-tagblock="">').html($(newblock).html());
				$(newblock).replaceWith(block);

				$(block).css('text-align', type);
				this.removeEmptyAttr(block, 'style');

				if (type == '' && typeof($(block).data('tagblock')) !== 'undefined')
				{
					$(block).replaceWith($(block).html());
				}
			}
			else
			{
				var elements = this.getBlocks();
				$.each(elements, $.proxy(function(i, elem)
				{
					var $el = false;

					if ($.inArray(elem.tagName, this.opts.alignmentTags) !== -1)
					{
						$el = $(elem);
					}
					else
					{
						$el = $(elem).closest(this.opts.alignmentTags.toString().toLowerCase(), this.$editor[0]);
					}

					if ($el)
					{
						$el.css('text-align', type);
						this.removeEmptyAttr($el, 'style');
					}

				}, this));
			}

			this.selectionRestore();

			this.sync();
		},

		// CLEAN
		cleanEmpty: function(html)
		{
			var ph = this.placeholderStart(html);
			if (ph !== false) return ph;

			if (this.opts.linebreaks === false)
			{
				if (html === '') html = this.opts.emptyHtml;
				else if (html.search(/^<hr\s?\/?>$/gi) !== -1) html = '<hr>' + this.opts.emptyHtml;
			}

			return html;
		},
		cleanConverters: function(html)
		{
			// convert div to p
			if (this.opts.convertDivs) html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '<p$1>$2</p>');
			if (this.opts.paragraphy) html = this.cleanParagraphy(html);

			return html;
		},
		cleanConvertProtected: function(html)
		{
			if (this.opts.templateVars)
			{
				html = html.replace(/\{\{(.*?)\}\}/gi, '<!-- template double $1 -->');
				html = html.replace(/\{(.*?)\}/gi, '<!-- template $1 -->');
			}

			html = html.replace(/<script(.*?)>([\w\W]*?)<\/script>/gi, '<title type="text/javascript" style="display: none;" class="redactor-script-tag"$1>$2</title>');
			html = html.replace(/<style(.*?)>([\w\W]*?)<\/style>/gi, '<section$1 style="display: none;" rel="redactor-style-tag">$2</section>');
			html = html.replace(/<form(.*?)>([\w\W]*?)<\/form>/gi, '<section$1 rel="redactor-form-tag">$2</section>');

			// php tags convertation
			if (this.opts.phpTags) html = html.replace(/<\?php([\w\W]*?)\?>/gi, '<section style="display: none;" rel="redactor-php-tag">$1</section>');
			else html = html.replace(/<\?php([\w\W]*?)\?>/gi, '');

			return html;
		},
		cleanReConvertProtected: function(html)
		{
			if (this.opts.templateVars)
			{
				html = html.replace(/<!-- template double (.*?) -->/gi, '{{$1}}');
				html = html.replace(/<!-- template (.*?) -->/gi, '{$1}');
			}

			html = html.replace(/<title type="text\/javascript" style="display: none;" class="redactor-script-tag"(.*?)>([\w\W]*?)<\/title>/gi, '<script$1 type="text/javascript">$2</script>');
			html = html.replace(/<section(.*?) style="display: none;" rel="redactor-style-tag">([\w\W]*?)<\/section>/gi, '<style$1>$2</style>');
			html = html.replace(/<section(.*?)rel="redactor-form-tag"(.*?)>([\w\W]*?)<\/section>/gi, '<form$1$2>$3</form>');

			// php tags convertation
			if (this.opts.phpTags) html = html.replace(/<section style="display: none;" rel="redactor-php-tag">([\w\W]*?)<\/section>/gi, '<?php\r\n$1\r\n?>');

			return html;
		},
		cleanRemoveSpaces: function(html, buffer)
		{
			if (buffer !== false)
			{
				var buffer = []
				var matches = html.match(/<(pre|style|script|title)(.*?)>([\w\W]*?)<\/(pre|style|script|title)>/gi);
				if (matches === null) matches = [];

				if (this.opts.phpTags)
				{
					var phpMatches = html.match(/<\?php([\w\W]*?)\?>/gi);
					if (phpMatches) matches = $.merge(matches, phpMatches);
				}

				if (matches)
				{
					$.each(matches, function(i, s)
					{
						html = html.replace(s, 'buffer_' + i);
						buffer.push(s);
					});
				}
			}

			html = html.replace(/\n/g, ' ');
			html = html.replace(/[\t]*/g, '');
			html = html.replace(/\n\s*\n/g, "\n");
			html = html.replace(/^[\s\n]*/g, ' ');
			html = html.replace(/[\s\n]*$/g, ' ');
			html = html.replace( />\s{2,}</g, '> <'); // between inline tags can be only one space

			html = this.cleanReplacer(html, buffer);

			html = html.replace(/\n\n/g, "\n");

			return html;
		},
		cleanReplacer: function(html, buffer)
		{
			if (buffer === false) return html;

			$.each(buffer, function(i,s)
			{
				html = html.replace('buffer_' + i, s);
			});

			return html;
		},
		cleanRemoveEmptyTags: function(html)
		{
			html = html.replace(/<span>([\w\W]*?)<\/span>/gi, '$1');

			// remove zero width-space
			html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');

			var etagsInline = ["<b>\\s*</b>", "<b>&nbsp;</b>", "<em>\\s*</em>"]
			var etags = ["<pre></pre>", "<blockquote>\\s*</blockquote>", "<dd></dd>", "<dt></dt>", "<ul></ul>", "<ol></ol>", "<li></li>", "<table></table>", "<tr></tr>", "<span>\\s*<span>", "<span>&nbsp;<span>", "<p>\\s*</p>", "<p></p>", "<p>&nbsp;</p>",  "<p>\\s*<br>\\s*</p>", "<div>\\s*</div>", "<div>\\s*<br>\\s*</div>"];

			if (this.opts.removeEmptyTags)
			{
				etags = etags.concat(etagsInline);
			}
			else etags = etagsInline;

			var len = etags.length;
			for (var i = 0; i < len; ++i)
			{
				html = html.replace(new RegExp(etags[i], 'gi'), "");
			}

			return html;
		},
		cleanParagraphy: function(html)
		{
			html = $.trim(html);

			if (this.opts.linebreaks === true) return html;
			if (html === '' || html === '<p></p>') return this.opts.emptyHtml;

			html = html + "\n";


			var safes = [];
			var matches = html.match(/<(table|div|pre|object)(.*?)>([\w\W]*?)<\/(table|div|pre|object)>/gi);
			if (!matches) matches = [];

			var commentsMatches = html.match(/<!--([\w\W]*?)-->/gi);
			if (commentsMatches) matches = $.merge(matches, commentsMatches);

			if (this.opts.phpTags)
			{
				var phpMatches = html.match(/<section(.*?)rel="redactor-php-tag">([\w\W]*?)<\/section>/gi);
				if (phpMatches) matches = $.merge(matches, phpMatches);
			}

			if (matches)
			{
				$.each(matches, function(i,s)
				{
					safes[i] = s;
					html = html.replace(s, '{replace' + i + '}\n');
				});
			}

			html = html.replace(/<br \/>\s*<br \/>/gi, "\n\n");

			function R(str, mod, r)
			{
				return html.replace(new RegExp(str, mod), r);
			}

			var blocks = '(comment|html|body|head|title|meta|style|script|link|iframe|table|thead|tfoot|caption|col|colgroup|tbody|tr|td|th|div|dl|dd|dt|ul|ol|li|pre|select|option|form|map|area|blockquote|address|math|style|p|h[1-6]|hr|fieldset|legend|section|article|aside|hgroup|header|footer|nav|figure|figcaption|details|menu|summary)';

			html = R('(<' + blocks + '[^>]*>)', 'gi', "\n$1");
			html = R('(</' + blocks + '>)', 'gi', "$1\n\n");
			html = R("\r\n", 'g', "\n");
			html = R("\r", 'g', "\n");
			html = R("/\n\n+/", 'g', "\n\n");

			var htmls = html.split(new RegExp('\n\s*\n', 'g'), -1);

			html = '';
			for (var i in htmls)
			{
				if (htmls.hasOwnProperty(i))
                {
					if (htmls[i].search('{replace') == -1)
					{
						htmls[i] = htmls[i].replace(/<p>\n\t<\/p>/gi, '');
						htmls[i] = htmls[i].replace(/<p><\/p>/gi, '');

						if (htmls[i] != '')
						{
							html += '<p>' +  htmls[i].replace(/^\n+|\n+$/g, "") + "</p>";
						}
					}
					else html += htmls[i];
				}
			}

			html = R('<p>\s*</p>', 'gi', '');
			html = R('<p>([^<]+)</(div|address|form)>', 'gi', "<p>$1</p></$2>");
			html = R('<p>\s*(</?' + blocks + '[^>]*>)\s*</p>', 'gi', "$1");
			html = R("<p>(<li.+?)</p>", 'gi', "$1");
			html = R('<p>\s*(</?' + blocks + '[^>]*>)', 'gi', "$1");

			html = R('(</?' + blocks + '[^>]*>)\s*</p>', 'gi', "$1");
			html = R('(</?' + blocks + '[^>]*>)\s*<br />', 'gi', "$1");
			html = R('<br />(\s*</?(?:p|li|div|dl|dd|dt|th|pre|td|ul|ol)[^>]*>)', 'gi', '$1');
			html = R("\n</p>", 'gi', '</p>');

			html = R('<li><p>', 'gi', '<li>');
			html = R('</p></li>', 'gi', '</li>');
			html = R('</li><p>', 'gi', '</li>');
			//html = R('</ul><p>(.*?)</li>', 'gi', '</ul></li>');
			/* html = R('</ol><p>', 'gi', '</ol>'); */
			html = R('<p>\t?\n?<p>', 'gi', '<p>');
			html = R('</dt><p>', 'gi', '</dt>');
			html = R('</dd><p>', 'gi', '</dd>');
			html = R('<br></p></blockquote>', 'gi', '</blockquote>');
			html = R('<p>\t*</p>', 'gi', '');

			// restore safes
			$.each(safes, function(i,s)
			{
				html = html.replace('{replace' + i + '}', s);
			});

			return $.trim(html);
		},
		cleanConvertInlineTags: function(html, set)
		{
			var boldTag = 'strong';
			if (this.opts.boldTag === 'b') boldTag = 'b';

			var italicTag = 'em';
			if (this.opts.italicTag === 'i') italicTag = 'i';

			html = html.replace(/<span style="font-style: italic;">([\w\W]*?)<\/span>/gi, '<' + italicTag + '>$1</' + italicTag + '>');
			html = html.replace(/<span style="font-weight: bold;">([\w\W]*?)<\/span>/gi, '<' + boldTag + '>$1</' + boldTag + '>');

			// bold, italic, del
			if (this.opts.boldTag === 'strong') html = html.replace(/<b>([\w\W]*?)<\/b>/gi, '<strong>$1</strong>');
			else html = html.replace(/<strong>([\w\W]*?)<\/strong>/gi, '<b>$1</b>');

			if (this.opts.italicTag === 'em') html = html.replace(/<i>([\w\W]*?)<\/i>/gi, '<em>$1</em>');
			else html = html.replace(/<em>([\w\W]*?)<\/em>/gi, '<i>$1</i>');

			if (set !== true)
			{
				html = html.replace(/<strike>([\w\W]*?)<\/strike>/gi, '<del>$1</del>');
			}
			else
			{
				html = html.replace(/<del>([\w\W]*?)<\/del>/gi, '<strike>$1</strike>');
			}

			return html;
		},
		cleanStripTags: function(html)
		{
			if (html == '' || typeof html == 'undefined') return html;

			var allowed = false;
			if (this.opts.allowedTags !== false) allowed = true;

			var arr = allowed === true ? this.opts.allowedTags : this.opts.deniedTags;

			var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi;
			html = html.replace(tags, function ($0, $1)
			{
				if (allowed === true) return $.inArray($1.toLowerCase(), arr) > '-1' ? $0 : '';
				else return $.inArray($1.toLowerCase(), arr) > '-1' ? '' : $0;
			});

			html = this.cleanConvertInlineTags(html);

			return html;

		},
		cleanSavePreCode: function(html, encode)
		{
			var pre = html.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/gi);
			if (pre !== null)
			{
				$.each(pre, $.proxy(function(i,s)
				{
					var arr = s.match(/<(pre|code)(.*?)>([\w\W]*?)<\/(pre|code)>/i);

					arr[3] = arr[3].replace(/&nbsp;/g, ' ');

					if (encode !== false) arr[3] = this.cleanEncodeEntities(arr[3]);

					// $ fix
					arr[3] = arr[3].replace(/\$/g, '&#36;');

					html = html.replace(s, '<' + arr[1] + arr[2] + '>' + arr[3] + '</' + arr[1] + '>');

				}, this));
			}

			return html;
		},
		cleanEncodeEntities: function(str)
		{
			str = String(str).replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
			return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
		},
		cleanUnverified: function()
		{
			// label, abbr, mark, meter, code, q, dfn, ins, time, kbd, var
			var $elem = this.$editor.find('li, img, a, b, strong, sub, sup, i, em, u, small, strike, del, span, cite');

			$elem.filter('[style*="background-color: transparent;"][style*="line-height"]')
			.css('background-color', '')
			.css('line-height', '');

			$elem.filter('[style*="background-color: transparent;"]')
			.css('background-color', '');

			$elem.css('line-height', '');

			$.each($elem, $.proxy(function(i,s)
			{
				this.removeEmptyAttr(s, 'style');
			}, this));

			// When we paste text in Safari is wrapping inserted div (remove it)
			this.$editor.find('div[style="text-align: -webkit-auto;"]').contents().unwrap();
		},
		cleanHtml: function(code)
		{
			var i = 0,
			codeLength = code.length,
			point = 0,
			start = null,
			end = null,
			tag = '',
			out = '',
			cont = '';

			this.cleanlevel = 0;

			for (; i < codeLength; i++)
			{
				point = i;

				// if no more tags, copy and exit
				if (-1 == code.substr(i).indexOf( '<' ))
				{
					out += code.substr(i);

					return this.cleanFinish(out);
				}

				// copy verbatim until a tag
				while (point < codeLength && code.charAt(point) != '<')
				{
					point++;
				}

				if (i != point)
				{
					cont = code.substr(i, point - i);
					if (!cont.match(/^\s{2,}$/g))
					{
						if ('\n' == out.charAt(out.length - 1)) out += this.cleanGetTabs();
						else if ('\n' == cont.charAt(0))
						{
							out += '\n' + this.cleanGetTabs();
							cont = cont.replace(/^\s+/, '');
						}

						out += cont;
					}

					if (cont.match(/\n/)) out += '\n' + this.cleanGetTabs();
				}

				start = point;

				// find the end of the tag
				while (point < codeLength && '>' != code.charAt(point))
				{
					point++;
				}

				tag = code.substr(start, point - start);
				i = point;

				var t;

				if ('!--' == tag.substr(1, 3))
				{
					if (!tag.match(/--$/))
					{
						while ('-->' != code.substr(point, 3))
						{
							point++;
						}
						point += 2;
						tag = code.substr(start, point - start);
						i = point;
					}

					if ('\n' != out.charAt(out.length - 1)) out += '\n';

					out += this.cleanGetTabs();
					out += tag + '>\n';
				}
				else if ('!' == tag[1])
				{
					out = this.placeTag(tag + '>', out);
				}
				else if ('?' == tag[1])
				{
					out += tag + '>\n';
				}
				else if (t = tag.match(/^<(script|style|pre)/i))
				{
					t[1] = t[1].toLowerCase();
					tag = this.cleanTag(tag);
					out = this.placeTag(tag, out);
					end = String(code.substr(i + 1)).toLowerCase().indexOf('</' + t[1]);

					if (end)
					{
						cont = code.substr(i + 1, end);
						i += end;
						out += cont;
					}
				}
				else
				{
					tag = this.cleanTag(tag);
					out = this.placeTag(tag, out);
				}
			}

			return this.cleanFinish( out );
		},
		cleanGetTabs: function()
		{
			var s = '';
			for ( var j = 0; j < this.cleanlevel; j++ )
			{
				s += '\t';
			}

			return s;
		},
		cleanFinish: function(code)
		{
			code = code.replace( /\n\s*\n/g, '\n' );
			code = code.replace( /^[\s\n]*/, '' );
			code = code.replace( /[\s\n]*$/, '' );
			code = code.replace( /<script(.*?)>\n<\/script>/gi, '<script$1></script>' );

			this.cleanlevel = 0;

			return code;
		},
		cleanTag: function (tag)
		{
			var tagout = '';
			tag = tag.replace(/\n/g, ' ');
			tag = tag.replace(/\s{2,}/g, ' ');
			tag = tag.replace(/^\s+|\s+$/g, ' ');

			var suffix = '';
			if (tag.match(/\/$/))
			{
				suffix = '/';
				tag = tag.replace(/\/+$/, '');
			}

			var m;
			while (m = /\s*([^= ]+)(?:=((['"']).*?\3|[^ ]+))?/.exec(tag))
			{
				if (m[2]) tagout += m[1].toLowerCase() + '=' + m[2];
				else if (m[1]) tagout += m[1].toLowerCase();

				tagout += ' ';
				tag = tag.substr(m[0].length);
			}

			return tagout.replace(/\s*$/, '') + suffix + '>';
		},
		placeTag: function (tag, out)
		{
			var nl = tag.match(this.cleannewLevel);
			if (tag.match(this.cleanlineBefore) || nl)
			{
				out = out.replace(/\s*$/, '');
				out += '\n';
			}

			if (nl && '/' == tag.charAt(1)) this.cleanlevel--;
			if ('\n' == out.charAt(out.length - 1)) out += this.cleanGetTabs();
			if (nl && '/' != tag.charAt(1)) this.cleanlevel++;

			out += tag;

			if (tag.match(this.cleanlineAfter) || tag.match(this.cleannewLevel))
			{
				out = out.replace(/ *$/, '');
				out += '\n';
			}

			return out;
		},

		// FORMAT
		formatEmpty: function(e)
		{
			var html = $.trim(this.$editor.html());

			if (this.opts.linebreaks)
			{
				if (html == '')
				{
					e.preventDefault();
					this.$editor.html('');
					this.focus();
				}
			}
			else
			{
				html = html.replace(/<br\s?\/?>/i, '');
				var thtml = html.replace(/<p>\s?<\/p>/gi, '');

				if (html === '' || thtml === '')
				{
					e.preventDefault();

					var node = $(this.opts.emptyHtml).get(0);
					this.$editor.html(node);
					this.focus();
				}
			}

			this.sync();
		},
		formatBlocks: function(tag)
		{
			this.bufferSet();

			var nodes = this.getBlocks();
			this.selectionSave();

			$.each(nodes, $.proxy(function(i, node)
			{
				if (node.tagName !== 'LI')
				{
					var parent = $(node).parent();

					if (tag === 'p')
					{
						if ((node.tagName === 'P'
						&& parent.size() != 0
						&& parent[0].tagName === 'BLOCKQUOTE')
						||
						node.tagName === 'BLOCKQUOTE')
						{
							this.formatQuote();
							return;
						}
						else if (this.opts.linebreaks) return;
						else
						{
							this.formatBlock(tag, node);
						}
					}
					else
					{
						this.formatBlock(tag, node);
					}
				}

			}, this));

			this.selectionRestore();
			this.sync();
		},
		formatBlock: function(tag, block)
		{
			if (block === false) block = this.getBlock();
			if (block === false)
			{
				if (this.opts.linebreaks === true) this.execCommand('formatblock', tag);
				return true;
			}

			var contents = '';
			if (tag !== 'pre')
			{
				contents = $(block).contents();
			}
			else
			{
				//contents = this.cleanEncodeEntities($(block).text());
				contents = $(block).html();
				if ($.trim(contents) === '')
				{
					contents = '<span id="selection-marker-1"></span>';
				}
			}

			if (block.tagName === 'PRE') tag = 'p';

			if (this.opts.linebreaks === true && tag === 'p')
			{
				$(block).replaceWith($('<div>').append(contents).html() + '<br>');
			}
			else
			{
				var parent = this.getParent();

				var node = $('<' + tag + '>').append(contents);
				$(block).replaceWith(node);

				if (parent && parent.tagName == 'TD')
				{
					$(node).wrapAll('<td>');
				}
			}
		},
		formatChangeTag: function(fromElement, toTagName, save)
		{
			if (save !== false) this.selectionSave();

			var newElement = $('<' + toTagName + '/>');
			$(fromElement).replaceWith(function() { return newElement.append($(this).contents()); });

			if (save !== false) this.selectionRestore();

			return newElement;
		},

		// QUOTE
		formatQuote: function()
		{
			this.bufferSet();

			// paragraphy
			if (this.opts.linebreaks === false)
			{
				this.selectionSave();

				var blocks = this.getBlocks();

				var blockquote = false;
				var blocksLen = blocks.length;
				if (blocks)
				{
					var data = '';
					var replaced = '';
					var replace = false;
					var paragraphsOnly = true;

					$.each(blocks, function(i,s)
					{
						if (s.tagName !== 'P') paragraphsOnly = false;
					});

					$.each(blocks, $.proxy(function(i,s)
					{
						if (s.tagName === 'BLOCKQUOTE')
						{
							this.formatBlock('p', s, false);
						}
						else if (s.tagName === 'P')
						{
							blockquote = $(s).parent();
							// from blockquote
							if (blockquote[0].tagName == 'BLOCKQUOTE')
							{
								var count = $(blockquote).children('p').size();

								// one
								if (count == 1)
								{
									$(blockquote).replaceWith(s);
								}
								// all
								else if (count == blocksLen)
								{
									replace = 'blockquote';
									data += this.outerHtml(s);
								}
								// some
								else
								{
									replace = 'html';
									data += this.outerHtml(s);

									if (i == 0)
									{
										$(s).addClass('redactor-replaced').empty();
										replaced = this.outerHtml(s);
									}
									else $(s).remove();
								}
							}
							// to blockquote
							else
							{
								if (paragraphsOnly === false || blocks.length == 1)
								{
									this.formatBlock('blockquote', s, false);
								}
								else
								{
									replace = 'paragraphs';
									data += this.outerHtml(s);
								}
							}

						}
						else if (s.tagName !== 'LI')
						{
							this.formatBlock('blockquote', s, false);
						}

					}, this));

					if (replace)
					{
						if (replace == 'paragraphs')
						{
							$(blocks[0]).replaceWith('<blockquote>' + data + '</blockquote>');
							$(blocks).remove();
						}
						else if (replace == 'blockquote')
						{
							$(blockquote).replaceWith(data);
						}
						else if (replace == 'html')
						{
							var html = this.$editor.html().replace(replaced, '</blockquote>' + data + '<blockquote>');

							this.$editor.html(html);
							this.$editor.find('blockquote').each(function()
							{
								if ($.trim($(this).html()) == '') $(this).remove();
							})
						}
					}
				}

				this.selectionRestore();
			}
			// linebreaks
			else
			{
				var block = this.getBlock();
				if (block.tagName === 'BLOCKQUOTE')
				{
					this.selectionSave();

					var html = $.trim($(block).html());
					var selection = $.trim(this.getSelectionHtml());

					html = html.replace(/<span(.*?)id="selection-marker(.*?)<\/span>/gi, '');

					if (html == selection)
					{
						$(block).replaceWith($(block).html() + '<br>');
					}
					else
					{
						// replace
						this.inlineFormat('tmp');
						var tmp = this.$editor.find('tmp');
						tmp.empty();

						var newhtml = this.$editor.html().replace('<tmp></tmp>', '</blockquote><span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>' + selection + '<blockquote>');

						this.$editor.html(newhtml);
						tmp.remove();
						this.$editor.find('blockquote').each(function()
						{
							if ($.trim($(this).html()) == '') $(this).remove();
						})
					}

					this.selectionRestore();
					this.$editor.find('span#selection-marker-1').attr('id', false);
				}
				else
				{
					var wrapper = this.selectionWrap('blockquote');
					var html = $(wrapper).html();

					var blocksElemsRemove = ['ul', 'ol', 'table', 'tr', 'tbody', 'thead', 'tfoot', 'dl'];
					$.each(blocksElemsRemove, function(i,s)
					{
						html = html.replace(new RegExp('<' + s + '(.*?)>', 'gi'), '');
						html = html.replace(new RegExp('</' + s + '>', 'gi'), '');
					});

					var blocksElems = this.opts.blockLevelElements;
					blocksElems.push('td');
					$.each(blocksElems, function(i,s)
					{
						html = html.replace(new RegExp('<' + s + '(.*?)>', 'gi'), '');
						html = html.replace(new RegExp('</' + s + '>', 'gi'), '<br>');
					});

					$(wrapper).html(html);
					this.selectionElement(wrapper);
					var next = $(wrapper).next();
					if (next.size() != 0 && next[0].tagName === 'BR')
					{
						next.remove();
					}
				}
			}

			this.sync();
		},

		// BLOCK
		blockRemoveAttr: function(attr, value)
		{
			var nodes = this.getBlocks();
			$(nodes).removeAttr(attr);

			this.sync();
		},
		blockSetAttr: function(attr, value)
		{
			var nodes = this.getBlocks();
			$(nodes).attr(attr, value);

			this.sync();
		},
		blockRemoveStyle: function(rule)
		{
			var nodes = this.getBlocks();
			$(nodes).css(rule, '');
			this.removeEmptyAttr(nodes, 'style');

			this.sync();
		},
		blockSetStyle: function (rule, value)
		{
			var nodes = this.getBlocks();
			$(nodes).css(rule, value);

			this.sync();
		},
		blockRemoveClass: function(className)
		{
			var nodes = this.getBlocks();
			$(nodes).removeClass(className);
			this.removeEmptyAttr(nodes, 'class');

			this.sync();
		},
		blockSetClass: function(className)
		{
			var nodes = this.getBlocks();
			$(nodes).addClass(className);

			this.sync();
		},

		// INLINE
		inlineRemoveClass: function(className)
		{
			this.selectionSave();

			this.inlineEachNodes(function(node)
			{
				$(node).removeClass(className);
				this.removeEmptyAttr(node, 'class');
			});

			this.selectionRestore();
			this.sync();
		},

		inlineSetClass: function(className)
		{
			var current = this.getCurrent();
			if (!$(current).hasClass(className)) this.inlineMethods('addClass', className);
		},
		inlineRemoveStyle: function (rule)
		{
			this.selectionSave();

			this.inlineEachNodes(function(node)
			{
				$(node).css(rule, '');
				this.removeEmptyAttr(node, 'style');
			});

			this.selectionRestore();
			this.sync();
		},
		inlineSetStyle: function(rule, value)
		{
			this.inlineMethods('css', rule, value);
		},
		inlineRemoveAttr: function (attr)
		{
			this.selectionSave();

			var range = this.getRange(), node = this.getElement(), nodes = this.getNodes();

			if (range.collapsed || range.startContainer === range.endContainer && node)
			{
				nodes = $( node );
			}

			$(nodes).removeAttr(attr);

			this.inlineUnwrapSpan();

			this.selectionRestore();
			this.sync();
		},
		inlineSetAttr: function(attr, value)
		{
			this.inlineMethods('attr', attr, value );
		},
		inlineMethods: function(type, attr, value)
		{
			this.bufferSet();
			this.selectionSave();

			var range = this.getRange()
			var el = this.getElement();

			if ((range.collapsed || range.startContainer === range.endContainer) && el && !this.nodeTestBlocks(el))
			{
				$(el)[type](attr, value);
			}
			else
			{
				this.document.execCommand('fontSize', false, 4 );

				var fonts = this.$editor.find('font');
				$.each(fonts, $.proxy(function(i, s)
				{
					this.inlineSetMethods(type, s, attr, value);

				}, this));

			}

			this.selectionRestore();
			this.sync();
		},
		inlineSetMethods: function(type, s, attr, value)
		{
			var parent = $(s).parent(), el;

			var selectionHtml = this.getSelectionText();
			var parentHtml = $(parent).text();
			var selected = selectionHtml == parentHtml;

			if (selected && parent && parent[0].tagName === 'INLINE' && parent[0].attributes.length != 0)
			{
				el = parent;
				$(s).replaceWith($(s).html());
			}
			else
			{
				el = $('<inline>').append($(s).contents());
				$(s).replaceWith(el);
			}


			$(el)[type](attr, value);

			return el;
		},
		// Sort elements and execute callback
		inlineEachNodes: function(callback)
		{
			var range = this.getRange(),
				node = this.getElement(),
				nodes = this.getNodes(),
				collapsed;

			if (range.collapsed || range.startContainer === range.endContainer && node)
			{
				nodes = $(node);
				collapsed = true;
			}

			$.each(nodes, $.proxy(function(i, node)
			{
				if (!collapsed && node.tagName !== 'INLINE')
				{
					var selectionHtml = this.getSelectionText();
					var parentHtml = $(node).parent().text();
					var selected = selectionHtml == parentHtml;

					if (selected && node.parentNode.tagName === 'INLINE' && !$(node.parentNode).hasClass('redactor_editor'))
					{
						node = node.parentNode;
					}
					else return;
				}
				callback.call(this, node);

			}, this ) );
		},
		inlineUnwrapSpan: function()
		{
			var $spans = this.$editor.find('inline');

			$.each($spans, $.proxy(function(i, span)
			{
				var $span = $(span);

				if ($span.attr('class') === undefined && $span.attr('style') === undefined)
				{
					$span.contents().unwrap();
				}

			}, this));
		},
		inlineFormat: function(tag)
		{
			this.selectionSave();

			this.document.execCommand('fontSize', false, 4 );

			var fonts = this.$editor.find('font');
			var last;
			$.each(fonts, function(i, s)
			{
				var el = $('<' + tag + '/>').append($(s).contents());
				$(s).replaceWith(el);
				last = el;
			});

			this.selectionRestore();

			this.sync();
		},
		inlineRemoveFormat: function(tag)
		{
			this.selectionSave();

			var utag = tag.toUpperCase();
			var nodes = this.getNodes();
			var parent = $(this.getParent()).parent();

			$.each(nodes, function(i, s)
			{
				if (s.tagName === utag) this.inlineRemoveFormatReplace(s);
			});

			if (parent && parent[0].tagName === utag) this.inlineRemoveFormatReplace(parent);

			this.selectionRestore();
			this.sync();
		},
		inlineRemoveFormatReplace: function(el)
		{
			$(el).replaceWith($(el).contents());
		},

		// INSERT
		insertHtml: function (html, sync)
		{
			var current = this.getCurrent();
			var parent = current.parentNode;

			this.$editor.focus();

			this.bufferSet();

			var $html = $('<div>').append(html);
			html = $html.html();

			html = this.cleanRemoveEmptyTags(html);

			// Update value
			$html = $('<div>').append(html);

			var currBlock = this.getBlock();

			if ($html.contents().length == 1)
			{
				var htmlTagName = $html.contents()[0].tagName;

				// If the inserted and received text tags match
				if (htmlTagName != 'P' && htmlTagName == currBlock.tagName || htmlTagName == 'PRE')
				{
					html = $html.text();
					$html = $('<div>').append(html);
				}
			}

			// add text in a paragraph
			if (!this.opts.linebreaks && $html.contents().length == 1 && $html.contents()[0].nodeType == 3
				&& (this.getRangeSelectedNodes().length > 2 || (!current || current.tagName == 'BODY' && !parent || parent.tagName == 'HTML')))
			{
				html = '<p>' + html + '</p>';
			}

			html = this.setSpansVerifiedHtml(html);

			if ($html.contents().length > 1 && currBlock
			|| $html.contents().is('p, :header, ul, ol, li, div, table, td, blockquote, pre, address, section, header, footer, aside, article'))
			{
				if (this.browser('msie'))
				{
					if (!this.isIe11())
					{
						this.document.selection.createRange().pasteHTML(html);
					}
					else
					{
						this.execPasteFrag(html);
					}
				}
				else this.document.execCommand('inserthtml', false, html);
			}
			else this.insertHtmlAdvanced(html, false);

			if (this.selectall)
			{
				this.window.setTimeout($.proxy(function()
				{
					if (!this.opts.linebreaks) this.selectionEnd(this.$editor.contents().last());
					else this.focusEnd();

				}, this), 1);
			}

			this.observeStart();

			// set no editable
			this.setNonEditable();

			if (sync !== false) this.sync();
		},
		insertHtmlAdvanced: function(html, sync)
		{
			html = this.setSpansVerifiedHtml(html);

			var sel = this.getSelection();

			if (sel.getRangeAt && sel.rangeCount)
			{
				var range = sel.getRangeAt(0);
				range.deleteContents();

				var el = this.document.createElement('div');
				el.innerHTML = html;
				var frag = this.document.createDocumentFragment(), node, lastNode;
				while ((node = el.firstChild))
				{
					lastNode = frag.appendChild(node);
				}

				range.insertNode(frag);

				if (lastNode)
				{
					range = range.cloneRange();
					range.setStartAfter(lastNode);
					range.collapse(true);
					sel.removeAllRanges();
					sel.addRange(range);
				}
			}

			if (sync !== false)
			{
				this.sync();
			}

		},
		insertBeforeCursor: function(html)
		{
			html = this.setSpansVerifiedHtml(html);

			var node = $(html);

			var space = document.createElement("span");
			space.innerHTML = "\u200B";

			var range = this.getRange();
			range.insertNode(space);
			range.insertNode(node[0]);
			range.collapse(false);

			var sel = this.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);

			this.sync();
		},
		insertText: function(html)
		{
			var $html = $(html);

			if ($html.length) html = $html.text();

			this.$editor.focus();

			if (this.browser('msie') && !this.isIe11()) this.document.selection.createRange().pasteHTML(html);
			else this.document.execCommand('inserthtml', false, html);

			this.sync();
		},
		insertNode: function(node)
		{
			node = node[0] || node;

			if (node.tagName == 'SPAN')
			{
				var replacementTag = 'inline';

			    var outer = node.outerHTML;

			    // Replace opening tag
			    var regex = new RegExp('<' + node.tagName, 'i');
			    var newTag = outer.replace(regex, '<' + replacementTag);

			    // Replace closing tag
			    regex = new RegExp('</' + node.tagName, 'i');
			    newTag = newTag.replace(regex, '</' + replacementTag);
			    node = $(newTag)[0];
			}

			var sel = this.getSelection();
			if (sel.getRangeAt && sel.rangeCount)
			{
				// with delete contents
				range = sel.getRangeAt(0);
				range.deleteContents();
				range.insertNode(node);
				range.setEndAfter(node);
				range.setStartAfter(node);
				sel.removeAllRanges();
				sel.addRange(range);
			}
		},
		insertNodeToCaretPositionFromPoint: function(e, node)
		{
			var range;
			var x = e.clientX, y = e.clientY;
			if (this.document.caretPositionFromPoint)
			{
			    var pos = this.document.caretPositionFromPoint(x, y);
			    range = this.getRange();
			    range.setStart(pos.offsetNode, pos.offset);
			    range.collapse(true);
			    range.insertNode(node);
			}
			else if (this.document.caretRangeFromPoint)
			{
			    range = this.document.caretRangeFromPoint(x, y);
			    range.insertNode(node);
			}
			else if (typeof document.body.createTextRange != "undefined")
			{
		        range = this.document.body.createTextRange();
		        range.moveToPoint(x, y);
		        var endRange = range.duplicate();
		        endRange.moveToPoint(x, y);
		        range.setEndPoint("EndToEnd", endRange);
		        range.select();
			}

		},
		insertAfterLastElement: function(element, parent)
		{
			if (typeof(parent) != 'undefined') element = parent;

			if (this.isEndOfElement())
			{
				if (this.opts.linebreaks)
				{
					var contents = $('<div>').append($.trim(this.$editor.html())).contents();
					if (this.outerHtml(contents.last()[0]) != this.outerHtml(element))
					{
						return false;
					}
				}
				else
				{
					if (this.$editor.contents().last()[0] !== element)
					{
						return false;
					}
				}

				this.insertingAfterLastElement(element);
			}
		},
		insertingAfterLastElement: function(element)
		{
			this.bufferSet();

			if (this.opts.linebreaks === false)
			{
				var node = $(this.opts.emptyHtml);
				$(element).after(node);
				this.selectionStart(node);
			}
			else
			{
				var node = $('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>', this.document)[0];
				$(element).after(node);
				$(node).after(this.opts.invisibleSpace);
				this.selectionRestore();
				this.$editor.find('span#selection-marker-1').removeAttr('id');
			}
		},
		insertLineBreak: function()
		{
			this.selectionSave();
			this.$editor.find('#selection-marker-1').before('<br>' + (this.browser('webkit') ? this.opts.invisibleSpace : ''));
			this.selectionRestore();
		},
		insertDoubleLineBreak: function()
		{
			this.selectionSave();
			this.$editor.find('#selection-marker-1').before('<br><br>' + (this.browser('webkit') ? this.opts.invisibleSpace : ''));
			this.selectionRestore();
		},
		replaceLineBreak: function(element)
		{
			//var node = this.document.createTextNode('\uFEFF');
			var node = $('<br>' + this.opts.invisibleSpace);
			$(element).replaceWith(node);
			this.selectionStart(node);
		},

		// PASTE
		pasteClean: function(html)
		{
			html = this.callback('pasteBefore', false, html);

			// ie10 fix paste links
			if (this.browser('msie'))
			{
				var tmp = $.trim(html);
				if (tmp.search(/^<a(.*?)>(.*?)<\/a>$/i) == 0)
				{
					html = html.replace(/^<a(.*?)>(.*?)<\/a>$/i, "$2");
				}
			}

			if (this.opts.pastePlainText)
			{
				var tmp = this.document.createElement('div');

				html = html.replace(/<br>|<\/H[1-6]>|<\/p>|<\/div>/gi, '\n');

				tmp.innerHTML = html;
				html = tmp.textContent || tmp.innerText;

				html = $.trim(html);
				html = html.replace('\n', '<br>');
				html = this.cleanParagraphy(html);

				this.pasteInsert(html);
				return false;
			}

			// clean up pre
			if (this.currentOrParentIs('PRE'))
			{
				html = this.pastePre(html);
				this.pasteInsert(html);
				return true;
			}

			// ms word list
			html = html.replace(/<p(.*?)class="MsoListParagraphCxSpFirst"([\w\W]*?)<\/p>/gi, '<ul><li$2</li>');
			html = html.replace(/<p(.*?)class="MsoListParagraphCxSpMiddle"([\w\W]*?)<\/p>/gi, '<li$2</li>');
			html = html.replace(/<p(.*?)class="MsoListParagraphCxSpLast"([\w\W]*?)<\/p>/gi, '<li$2</li></ul>');
			// one line
			html = html.replace(/<p(.*?)class="MsoListParagraph"([\w\W]*?)<\/p>/gi, '<ul><li$2</li></ul>');
			// remove ms word's bullet
			html = html.replace(/·/g, '');

			// remove comments and php tags
			html = html.replace(/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi, '');

			// remove nbsp
			html = html.replace(/(&nbsp;){2,}/gi, '&nbsp;');
			html = html.replace(/&nbsp;/gi, ' ');

			// remove google docs marker
			html = html.replace(/<b\sid="internal-source-marker(.*?)">([\w\W]*?)<\/b>/gi, "$2");
			html = html.replace(/<b(.*?)id="docs-internal-guid(.*?)">([\w\W]*?)<\/b>/gi, "$3");

			// strip tags
			html = this.cleanStripTags(html);

			// prevert
			html = html.replace(/<td><\/td>/gi, '[td]');
			html = html.replace(/<td>&nbsp;<\/td>/gi, '[td]');
			html = html.replace(/<td><br><\/td>/gi, '[td]');
			html = html.replace(/<td(.*?)colspan="(.*?)"(.*?)>([\w\W]*?)<\/td>/gi, '[td colspan="$2"]$4[/td]');
			html = html.replace(/<td(.*?)rowspan="(.*?)"(.*?)>([\w\W]*?)<\/td>/gi, '[td rowspan="$2"]$4[/td]');
			html = html.replace(/<a(.*?)href="(.*?)"(.*?)>([\w\W]*?)<\/a>/gi, '[a href="$2"]$4[/a]');
			html = html.replace(/<iframe(.*?)>([\w\W]*?)<\/iframe>/gi, '[iframe$1]$2[/iframe]');
			html = html.replace(/<video(.*?)>([\w\W]*?)<\/video>/gi, '[video$1]$2[/video]');
			html = html.replace(/<audio(.*?)>([\w\W]*?)<\/audio>/gi, '[audio$1]$2[/audio]');
			html = html.replace(/<embed(.*?)>([\w\W]*?)<\/embed>/gi, '[embed$1]$2[/embed]');
			html = html.replace(/<object(.*?)>([\w\W]*?)<\/object>/gi, '[object$1]$2[/object]');
			html = html.replace(/<param(.*?)>/gi, '[param$1]');
			html = html.replace(/<img(.*?)>/gi, '[img$1]');

			// remove classes
			html = html.replace(/ class="(.*?)"/gi, '');

			// remove all attributes
			html = html.replace(/<(\w+)([\w\W]*?)>/gi, '<$1>');

			// remove empty
			html = html.replace(/<[^\/>][^>]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, '');
			html = html.replace(/<div>\s*?\t*?\n*?(<ul>|<ol>|<p>)/gi, '$1');

			// revert
			html = html.replace(/\[td colspan="(.*?)"\]([\w\W]*?)\[\/td\]/gi, '<td colspan="$1">$2</td>');
			html = html.replace(/\[td rowspan="(.*?)"\]([\w\W]*?)\[\/td\]/gi, '<td rowspan="$1">$2</td>');
			html = html.replace(/\[td\]/gi, '<td>&nbsp;</td>');
			html = html.replace(/\[a href="(.*?)"\]([\w\W]*?)\[\/a\]/gi, '<a href="$1">$2</a>');
			html = html.replace(/\[iframe(.*?)\]([\w\W]*?)\[\/iframe\]/gi, '<iframe$1>$2</iframe>');
			html = html.replace(/\[video(.*?)\]([\w\W]*?)\[\/video\]/gi, '<video$1>$2</video>');
			html = html.replace(/\[audio(.*?)\]([\w\W]*?)\[\/audio\]/gi, '<audio$1>$2</audio>');
			html = html.replace(/\[embed(.*?)\]([\w\W]*?)\[\/embed\]/gi, '<embed$1>$2</embed>');
			html = html.replace(/\[object(.*?)\]([\w\W]*?)\[\/object\]/gi, '<object$1>$2</object>');
			html = html.replace(/\[param(.*?)\]/gi, '<param$1>');
			html = html.replace(/\[img(.*?)\]/gi, '<img$1>');

			// convert div to p
			if (this.opts.convertDivs)
			{
				html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '<p>$2</p>');
				html = html.replace(/<\/div><p>/gi, '<p>');
				html = html.replace(/<\/p><\/div>/gi, '</p>');
			}

			if (this.currentOrParentIs('LI'))
			{
				html = html.replace(/<p>([\w\W]*?)<\/p>/gi, '$1<br>');
			}
			else
			{
				html = this.cleanParagraphy(html);
			}

			// remove span
			html = html.replace(/<span(.*?)>([\w\W]*?)<\/span>/gi, '$2');

			// remove empty
			html = html.replace(/<img>/gi, '');
			html = html.replace(/<[^\/>][^>][^img|param|source]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, '');

			html = html.replace(/\n{3,}/gi, '\n');

			// remove dirty p
			html = html.replace(/<p><p>/gi, '<p>');
			html = html.replace(/<\/p><\/p>/gi, '</p>');

			html = html.replace(/<li>(\s*|\t*|\n*)<p>/gi, '<li>');
			html = html.replace(/<\/p>(\s*|\t*|\n*)<\/li>/gi, '</li>');

			if (this.opts.linebreaks === true)
			{
				html = html.replace(/<p(.*?)>([\w\W]*?)<\/p>/gi, '$2<br>');
			}

			// remove empty finally
			html = html.replace(/<[^\/>][^>][^img|param|source]*>(\s*|\t*|\n*|&nbsp;|<br>)<\/[^>]+>/gi, '');

			// remove safari local images
			html = html.replace(/<img src="webkit-fake-url\:\/\/(.*?)"(.*?)>/gi, '');

			// remove p in td
			html = html.replace(/<td(.*?)>(\s*|\t*|\n*)<p>([\w\W]*?)<\/p>(\s*|\t*|\n*)<\/td>/gi, '<td$1>$3</td>');

			// remove divs
			html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '$2');
			html = html.replace(/<div(.*?)>([\w\W]*?)<\/div>/gi, '$2');

			// FF specific
			this.pasteClipboardMozilla = false;
			if (this.browser('mozilla'))
			{
				if (this.opts.clipboardUpload)
				{
					var matches = html.match(/<img src="data:image(.*?)"(.*?)>/gi);
					if (matches !== null)
					{
						this.pasteClipboardMozilla = matches;
						for (k in matches)
						{
							var img = matches[k].replace('<img', '<img data-mozilla-paste-image="' + k + '" ');
							html = html.replace(matches[k], img);
						}
					}
				}

				// FF fix
				while (/<br>$/gi.test(html))
				{
					html = html.replace(/<br>$/gi, '');
				}
			}

			// bullets again
			html = html.replace(/<p>•([\w\W]*?)<\/p>/gi, '<li>$1</li>');

			// ie inserts a blank font tags when pasting
			while (/<font>([\w\W]*?)<\/font>/gi.test(html))
			{
				html = html.replace(/<font>([\w\W]*?)<\/font>/gi, '$1');
			}

			// ms word lists breakline
			html = html.replace(/<p>\n?<li>/gi, '<li>');
			if (this.browser('msie') && !this.isIe11())
			{
				html = html.replace(/\n/g, '');
			}

			this.pasteInsert(html);

		},
		pastePre: function(s)
		{
			s = s.replace(/<br>|<\/H[1-6]>|<\/p>|<\/div>/gi, '\n');

			var tmp = this.document.createElement('div');
			tmp.innerHTML = s;
			return this.cleanEncodeEntities(tmp.textContent || tmp.innerText);
		},
		pasteInsert: function(html)
		{
			if (this.selectall)
			{
				if (!this.opts.linebreaks) this.$editor.html(this.opts.emptyHtml);
				else this.$editor.html('');

				this.$editor.focus();
			}

			html = this.callback('pasteAfter', false, html);

			this.insertHtml(html);

			this.selectall = false;
			setTimeout($.proxy(function()
			{
				this.rtePaste = false;

				// FF specific
				if (this.browser('mozilla'))
				{
					this.$editor.find('p:empty').remove()
				}
				if (this.pasteClipboardMozilla !== false)
				{
					this.pasteClipboardUploadMozilla();
				}

			}, this), 100);

			if (this.opts.autoresize && this.fullscreen !== true) $(this.document.body).scrollTop(this.saveScroll);
			else this.$editor.scrollTop(this.saveScroll);
		},
		pasteClipboardUploadMozilla: function()
		{
			var imgs = this.$editor.find('img[data-mozilla-paste-image]');
			$.each(imgs, $.proxy(function(i,s)
			{
				var $s = $(s);
				var arr = s.src.split(",");
				var data = arr[1]; // raw base64
				var contentType = arr[0].split(";")[0].split(":")[1];

				$.post(this.opts.clipboardUploadUrl, {
				    contentType: contentType,
				    data: data
				},
				$.proxy(function(data)
				{
					var json = (typeof data === 'string' ? $.parseJSON(data) : data);
		        	$s.attr('src', json.filelink);
		        	$s.removeAttr('data-mozilla-paste-image');

		        	this.sync();

					// upload callback
					this.callback('imageUpload', $s, json);

				}, this));

			}, this));
		},
		pasteClipboardUpload: function(e)
		{
	        var result = e.target.result;
			var arr = result.split(",");
			var data = arr[1]; // raw base64
			var contentType = arr[0].split(";")[0].split(":")[1];

			if (this.opts.clipboardUpload)
			{
				$.post(this.opts.clipboardUploadUrl, {
				    contentType: contentType,
				    data: data
				},
				$.proxy(function(data)
				{
					var json = (typeof data === 'string' ? $.parseJSON(data) : data);

					var html = '<img src="' + json.filelink + '" id="clipboard-image-marker" />';
					this.execCommand('inserthtml', html, false);

					var image = $(this.$editor.find('img#clipboard-image-marker'));

					if (image.length) image.removeAttr('id');
					else image = false;

					this.sync();

					// upload callback
					if (image)
					{
						this.callback('imageUpload', image, json);
					}


				}, this));
			}
			else
			{
	        	this.insertHtml('<img src="' + result + '" />');
        	}
		},

		// BUFFER
		bufferSet: function(html)
		{
			if (html !== undefined) this.opts.buffer.push(html);
			else
			{
				this.selectionSave();
				this.opts.buffer.push(this.$editor.html());
				this.selectionRemoveMarkers('buffer');
			}
		},
		bufferUndo: function()
		{
			if (this.opts.buffer.length === 0)
			{
				this.$editor.focus();
				return;
			}

			// rebuffer
			this.selectionSave();
			this.opts.rebuffer.push(this.$editor.html());
			this.selectionRestore(false, true);

			this.$editor.html(this.opts.buffer.pop());

			this.selectionRestore();
			setTimeout($.proxy(this.observeStart, this), 100);
		},
		bufferRedo: function()
		{
			if (this.opts.rebuffer.length === 0)
			{
				this.$editor.focus();
				return false;
			}

			// buffer
			this.selectionSave();
			this.opts.buffer.push(this.$editor.html());
			this.selectionRestore(false, true);

			this.$editor.html(this.opts.rebuffer.pop());
			this.selectionRestore(true);
			setTimeout($.proxy(this.observeStart, this), 4);
		},

		// OBSERVE
		observeStart: function()
		{
			this.observeImages();

			if (this.opts.observeLinks) this.observeLinks();
		},
		observeLinks: function()
		{
			this.$editor.find('a').on('click', $.proxy(this.linkObserver, this));
			this.$editor.on('click.redactor', $.proxy(function(e)
			{
				this.linkObserverTooltipClose(e);

			}, this));
			$(document).on('click.redactor', $.proxy(function(e)
			{
				this.linkObserverTooltipClose(e);

			}, this));
		},
		observeImages: function()
		{
			if (this.opts.observeImages === false) return false;

			this.$editor.find('img').each($.proxy(function(i, elem)
			{
				if (this.browser('msie')) $(elem).attr('unselectable', 'on');
				this.imageResize(elem);

			}, this));
		},
		linkObserver: function(e)
		{
			var $link = $(e.target);
			var pos = $link.offset();
			if (this.opts.iframe)
			{
				var posFrame = this.$frame.offset();
				pos.top = posFrame.top + (pos.top - $(this.document).scrollTop());
				pos.left += posFrame.left;
			}

			var tooltip = $('<span class="redactor-link-tooltip"></span>');

			var href = $link.attr('href');
			if (href.length > 24) href = href.substring(0,24) + '...';

			var aLink = $('<a href="' + $link.attr('href') + '" target="_blank">' + href + '</a>').on('click', $.proxy(function(e)
			{
				this.linkObserverTooltipClose(false);
			}, this));

			var aEdit = $('<a href="#">' + this.opts.curLang.edit + '</a>').on('click', $.proxy(function(e)
			{
				e.preventDefault();
				this.linkShow();
				this.linkObserverTooltipClose(false);

			}, this));

			var aUnlink = $('<a href="#">' + this.opts.curLang.unlink + '</a>').on('click', $.proxy(function(e)
			{
				e.preventDefault();
				this.execCommand('unlink');
				this.linkObserverTooltipClose(false);

			}, this));


			tooltip.append(aLink);
			tooltip.append(' | ');
			tooltip.append(aEdit);
			tooltip.append(' | ');
			tooltip.append(aUnlink);
			tooltip.css({
				top: (pos.top + 20) + 'px',
				left: pos.left + 'px'
			});

			$('.redactor-link-tooltip').remove();
			$('body').append(tooltip);
		},
		linkObserverTooltipClose: function(e)
		{
			if (e !== false && e.target.tagName == 'A') return false;
			$('.redactor-link-tooltip').remove();
		},

		// SELECTION
		getSelection: function()
		{
			if (!this.opts.rangy) return this.document.getSelection();
			else // rangy
			{
				if (!this.opts.iframe) return rangy.getSelection();
				else return rangy.getSelection(this.$frame[0]);
			}
		},
		getRange: function()
		{
			if (!this.opts.rangy)
			{
				if (this.document.getSelection)
				{
					var sel = this.getSelection();
					if (sel.getRangeAt && sel.rangeCount) return sel.getRangeAt(0);
				}

				return this.document.createRange();
			}
			else // rangy
			{
				if (!this.opts.iframe) return rangy.createRange();
				else return rangy.createRange(this.iframeDoc());
			}
		},
		selectionElement: function(node)
		{
			this.setCaret(node);
		},
		selectionStart: function(node)
		{
			this.selectionSet(node[0] || node, 0, null, 0);
		},
		selectionEnd: function(node)
		{
			this.selectionSet(node[0] || node, 1, null, 1);
		},
		selectionSet: function(orgn, orgo, focn, foco)
		{
			if (focn == null) focn = orgn;
			if (foco == null) foco = orgo;

			var sel = this.getSelection();
			if (!sel) return;

			var range = this.getRange();
			range.setStart(orgn, orgo);
			range.setEnd(focn, foco );

			try {
				sel.removeAllRanges();
			} catch (e) {}

			sel.addRange(range);
		},
		selectionWrap: function(tag)
		{
			tag = tag.toLowerCase();

			var block = this.getBlock();
			if (block)
			{
				var wrapper = this.formatChangeTag(block, tag);
				this.sync();
				return wrapper;
			}

			var sel = this.getSelection();
			var range = sel.getRangeAt(0);
			var wrapper = document.createElement(tag);
			wrapper.appendChild(range.extractContents());
			range.insertNode(wrapper);

			this.selectionElement(wrapper);

			return wrapper;
		},
		selectionAll: function()
		{
			var range = this.getRange();
			range.selectNodeContents(this.$editor[0]);

			var sel = this.getSelection();
			sel.removeAllRanges();
			sel.addRange(range);
		},
		selectionRemove: function()
		{
			this.getSelection().removeAllRanges();
		},
		getCaretOffset: function (element)
		{
			var caretOffset = 0;

			var range = this.getRange();
			var preCaretRange = range.cloneRange();
			preCaretRange.selectNodeContents(element);
			preCaretRange.setEnd(range.endContainer, range.endOffset);
			caretOffset = $.trim(preCaretRange.toString()).length;

			return caretOffset;
		},
		getCaretOffsetRange: function()
		{
			return new Range(this.getSelection().getRangeAt(0));
		},
		setCaret: function (el, start, end)
		{
			if (typeof end === 'undefined') end = start;
			el = el[0] || el;

			var range = this.getRange();
			range.selectNodeContents(el);

			var textNodes = this.getTextNodesIn(el);
			var foundStart = false;
			var charCount = 0, endCharCount;

			if (textNodes.length == 1 && start)
			{
				range.setStart(textNodes[0], start);
				range.setEnd(textNodes[0], end);
			}
			else
			{
				for (var i = 0, textNode; textNode = textNodes[i++];)
				{
					endCharCount = charCount + textNode.length;
					if (!foundStart && start >= charCount && (start < endCharCount || (start == endCharCount && i < textNodes.length)))
					{
						range.setStart(textNode, start - charCount);
						foundStart = true;
					}

					if (foundStart && end <= endCharCount)
					{
						range.setEnd( textNode, end - charCount );
						break;
					}

					charCount = endCharCount;
				}
			}

			var sel = this.getSelection();
			sel.removeAllRanges();
			sel.addRange( range );
		},
		getTextNodesIn: function (node)
		{
			var textNodes = [];

			if (node.nodeType == 3) textNodes.push(node);
			else
			{
				var children = node.childNodes;
				for (var i = 0, len = children.length; i < len; ++i)
				{
					textNodes.push.apply(textNodes, this.getTextNodesIn(children[i]));
				}
			}

			return textNodes;
		},

		// GET ELEMENTS
		getCurrent: function()
		{
			var el = false;
			var sel = this.getSelection();

			if (sel && sel.rangeCount > 0) el = sel.getRangeAt(0).startContainer;

			return this.isParentRedactor(el);
		},
		getParent: function(elem)
		{
			elem = elem || this.getCurrent();
			if (elem) return this.isParentRedactor( $( elem ).parent()[0] );
			else return false;
		},
		getBlock: function(node)
		{
			if (typeof node === 'undefined') node = this.getCurrent();

			while (node)
			{
				if (this.nodeTestBlocks(node))
				{
					if ($(node).hasClass('redactor_editor')) return false;
					return node;
				}

				node = node.parentNode;
			}

			return false;
		},
		getBlocks: function(nodes)
		{
			var newnodes = [];
			if (typeof nodes == 'undefined')
			{
				var range = this.getRange();
				if (range && range.collapsed === true) return [this.getBlock()];
				var nodes = this.getNodes(range);
			}

			$.each(nodes, $.proxy(function(i,node)
			{
				if (this.opts.iframe === false && $(node).parents('div.redactor_editor').size() == 0) return false;
				if (this.nodeTestBlocks(node)) newnodes.push(node);

			}, this));

			if (newnodes.length === 0) newnodes = [this.getBlock()];

			return newnodes;
		},
		nodeTestBlocks: function(node)
		{
			return node.nodeType == 1 && this.rTestBlock.test(node.nodeName);
		},
		tagTestBlock: function(tag)
		{
			return this.rTestBlock.test(tag);
		},
		getNodes: function(range, tag)
		{
			if (typeof range == 'undefined' || range == false) var range = this.getRange();
			if (range && range.collapsed === true)
			{
				if (typeof tag === 'undefined' && this.tagTestBlock(tag))
				{
					var block = this.getBlock();
					if (block.tagName == tag) return [block];
					else return [];
				}
				else
				{
					return [this.getCurrent()];
				}
			}

			var nodes = [], finalnodes = [];

			var sel = this.document.getSelection();
			if (!sel.isCollapsed) nodes = this.getRangeSelectedNodes(sel.getRangeAt(0));

			$.each(nodes, $.proxy(function(i,node)
			{
				if (this.opts.iframe === false && $(node).parents('div.redactor_editor').size() == 0) return false;

				if (typeof tag === 'undefined')
				{
					if ($.trim(node.textContent) != '')
					{
						finalnodes.push(node);
					}
				}
				else if (node.tagName == tag)
				{
					finalnodes.push(node);
				}

			}, this));

			if (finalnodes.length == 0)
			{
				if (typeof tag === 'undefined' && this.tagTestBlock(tag))
				{
					var block = this.getBlock();
					if (block.tagName == tag) return finalnodes.push(block);
					else return [];
				}
				else
				{
					finalnodes.push(this.getCurrent());
				}
			}

			// last element filtering
			var last = finalnodes[finalnodes.length-1];
			if (this.nodeTestBlocks(last))
			{
				finalnodes = finalnodes.slice(0, -1);
			}

			return finalnodes;
		},
		getElement: function(node)
		{
			if (!node) node = this.getCurrent();
			while (node)
			{
				if (node.nodeType == 1)
				{
					if ($(node).hasClass('redactor_editor')) return false;
					return node;
				}

				node = node.parentNode;
			}

			return false;
		},
		getRangeSelectedNodes: function(range)
		{
			range = range || this.getRange();
			var node = range.startContainer;
			var endNode = range.endContainer;

			if (node == endNode) return [node];

			var rangeNodes = [];
			while (node && node != endNode)
			{
				rangeNodes.push(node = this.nextNode(node));
			}

			node = range.startContainer;
			while (node && node != range.commonAncestorContainer)
			{
				rangeNodes.unshift(node);
				node = node.parentNode;
			}

			return rangeNodes;
		},
		nextNode: function(node)
		{
			if (node.hasChildNodes()) return node.firstChild;
			else
			{
				while (node && !node.nextSibling)
				{
					node = node.parentNode;
				}

				if (!node) return null;
				return node.nextSibling;
			}
		},

		// GET SELECTION HTML OR TEXT
		getSelectionText: function()
		{
			return this.getSelection().toString();
		},
		getSelectionHtml: function()
		{
			var html = '';

			var sel = this.getSelection();
			if (sel.rangeCount)
			{
				var container = this.document.createElement( "div" );
				var len = sel.rangeCount;
				for (var i = 0; i < len; ++i)
				{
					container.appendChild(sel.getRangeAt(i).cloneContents());
				}

				html = container.innerHTML;
			}

			return this.syncClean(html);
		},

		// SAVE & RESTORE
		selectionSave: function()
		{
			if (!this.isFocused()) this.$editor.focus();

			if (!this.opts.rangy)
			{
				this.selectionCreateMarker(this.getRange());
			}
			// rangy
			else
			{
				this.savedSel = rangy.saveSelection();
			}
		},
		selectionCreateMarker: function(range, remove)
		{
			if (!range) return;

			var node1 = $('<span id="selection-marker-1" class="redactor-selection-marker">' + this.opts.invisibleSpace + '</span>', this.document)[0];
			var node2 = $('<span id="selection-marker-2" class="redactor-selection-marker">' + this.opts.invisibleSpace + '</span>', this.document)[0];

			if (range.collapsed === true)
			{
				this.selectionSetMarker(range, node1, true);
			}
			else
			{
				this.selectionSetMarker(range, node1, true);
				this.selectionSetMarker(range, node2, false);
			}

			this.savedSel = this.$editor.html();

			this.selectionRestore(false, false);
		},
		selectionSetMarker: function(range, node, type)
		{
			var boundaryRange = range.cloneRange();

			boundaryRange.collapse(type);

			boundaryRange.insertNode(node);
			boundaryRange.detach();
		},
		selectionRestore: function(replace, remove)
		{
			if (!this.opts.rangy)
			{
				if (replace === true && this.savedSel)
				{
					this.$editor.html(this.savedSel);
				}

				var node1 = this.$editor.find('span#selection-marker-1');
				var node2 = this.$editor.find('span#selection-marker-2');

				if (this.browser('mozilla'))
				{
					this.$editor.focus();
				}
				else if (!this.isFocused())
				{
					this.$editor.focus();
				}

				if (node1.length != 0 && node2.length != 0)
				{
					this.selectionSet(node1[0], 0, node2[0], 0);
				}
				else if (node1.length != 0)
				{
					this.selectionSet(node1[0], 0, null, 0);
				}

				if (remove !== false)
				{
					this.selectionRemoveMarkers();
					this.savedSel = false;
				}
			}
			// rangy
			else
			{
				rangy.restoreSelection(this.savedSel);
			}
		},
		selectionRemoveMarkers: function(type)
		{
			if (!this.opts.rangy)
			{
				$.each(this.$editor.find('span.redactor-selection-marker'), function()
				{
					var html = $.trim($(this).html().replace(/[^\u0000-\u1C7F]/g, ''));
					if (html == '')
					{
						$(this).remove();
					}
					else
					{
						$(this).removeAttr('class').removeAttr('id');
					}
				});
			}
			// rangy
			else
			{
				rangy.removeMarkers(this.savedSel);
			}
		},

		// TABLE
		tableShow: function()
		{
			this.selectionSave();

			this.modalInit(this.opts.curLang.table, this.opts.modal_table, 300, $.proxy(function()
			{
				$('#redactor_insert_table_btn').click($.proxy(this.tableInsert, this));

				setTimeout(function()
				{
					$('#redactor_table_rows').focus();

				}, 200);

			}, this));
		},
		tableInsert: function()
		{
			var rows = $('#redactor_table_rows').val(),
				columns = $('#redactor_table_columns').val(),
				$table_box = $('<div></div>'),
				tableId = Math.floor(Math.random() * 99999),
				$table = $('<table id="table' + tableId + '"><tbody></tbody></table>'),
				i, $row, z, $column;

			for (i = 0; i < rows; i++)
			{
				$row = $('<tr></tr>');

				for (z = 0; z < columns; z++)
				{
					$column = $('<td>' + this.opts.invisibleSpace + '</td>');

					// set the focus to the first td
					if (i === 0 && z === 0) $column.append('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>');

					$($row).append($column);
				}

				$table.append($row);
			}

			$table_box.append($table);
			var html = $table_box.html();

			this.modalClose();
			this.selectionRestore();

			var current = this.getBlock() || this.getCurrent();

			if (current && current.tagName != 'BODY') $(current).after(html)
			else this.insertHtmlAdvanced(html, false);

			this.selectionRestore();

			var table = this.$editor.find('#table' + tableId);
			this.buttonActiveObserver();

			table.find('span#selection-marker-1').remove();
			table.removeAttr('id');

			this.sync();
		},
		tableDeleteTable: function()
		{
			var $table = $(this.getParent()).closest('table');
			if (!this.isParentRedactor($table)) return false;
			if ($table.size() == 0) return false;

			this.bufferSet();

			$table.remove();
			this.sync();
		},
		tableDeleteRow: function()
		{
			var $table = $(this.getParent()).closest('table');
			if (!this.isParentRedactor($table)) return false;
			if ($table.size() == 0) return false;

			this.bufferSet();

			var $current_tr =  $(this.getParent()).closest('tr');
			var $focus_tr = $current_tr.prev().length ? $current_tr.prev() : $current_tr.next();
			if ($focus_tr.length)
			{
				var $focus_td = $focus_tr.children('td' ).first();
				if ($focus_td.length)
				{
					$focus_td.prepend('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>');
				}
			}

			$current_tr.remove();
			this.selectionRestore();
			this.sync();
		},
		tableDeleteColumn: function()
		{
			var $table = $(this.getParent()).closest('table');
			if (!this.isParentRedactor($table)) return false;
			if ($table.size() == 0) return false;

			this.bufferSet();

			var $current_td =  $(this.getParent()).closest('td');
			var index = $current_td.get(0).cellIndex;

			// Set the focus correctly
			$table.find('tr').each($.proxy(function(i, elem)
			{
				var focusIndex = index - 1 < 0 ? index + 1 : index - 1;
				if (i === 0)
				{
					$(elem).find('td').eq(focusIndex).prepend('<span id="selection-marker-1">' + this.opts.invisibleSpace + '</span>');
				}

				$(elem).find('td').eq(index).remove();

			}, this));

			this.selectionRestore();
			this.sync();
		},
		tableAddHead: function()
		{
			var $table = $(this.getParent()).closest('table');
			if (!this.isParentRedactor($table)) return false;
			if ($table.size() == 0) return false;

			this.bufferSet();

			if ($table.find('thead').size() !== 0) this.tableDeleteHead();
			else
			{
				var tr = $table.find('tr').first().clone();
				tr.find('td').html(this.opts.invisibleSpace);
				$thead = $('<thead></thead>');
				$thead.append(tr);
				$table.prepend($thead);

				this.sync();
			}
		},
		tableDeleteHead: function()
		{
			var $table = $(this.getParent()).closest('table');
			if (!this.isParentRedactor($table)) return false;
			var $thead = $table.find('thead');

			if ($thead.size() == 0) return false;

			this.bufferSet();

			$thead.remove();
			this.sync();
		},
		tableAddRowAbove: function()
		{
			this.tableAddRow('before');
		},
		tableAddRowBelow: function()
		{
			this.tableAddRow('after');
		},
		tableAddColumnLeft: function()
		{
			this.tableAddColumn('before');
		},
		tableAddColumnRight: function()
		{
			this.tableAddColumn('after');
		},
		tableAddRow: function(type)
		{
			var $table = $(this.getParent()).closest('table');
			if (!this.isParentRedactor($table)) return false;
			if ($table.size() == 0) return false;

			this.bufferSet();

			var $current_tr = $(this.getParent()).closest('tr');
			var new_tr = $current_tr.clone();
			new_tr.find('td').html(this.opts.invisibleSpace);

			if (type === 'after') $current_tr.after(new_tr);
			else $current_tr.before(new_tr);

			this.sync();
		},
		tableAddColumn: function (type)
		{
			var $table = $(this.getParent()).closest('table');
			if (!this.isParentRedactor($table)) return false;
			if ($table.size() == 0) return false;

			this.bufferSet();

			var index = 0;

			var $current_tr = $(this.getParent()).closest('tr');
			var $current_td =  $(this.getParent()).closest('td');

			$current_tr.find('td').each($.proxy(function(i, elem)
			{
				if ($(elem)[0] === $current_td[0]) index = i;

			}, this));

			$table.find('tr').each($.proxy(function(i, elem)
			{
				var $current = $(elem).find('td').eq(index);

				var td = $current.clone();
				td.html(this.opts.invisibleSpace);

				type === 'after' ? $current.after(td) : $current.before(td);

			}, this));

			this.sync();
		},

		// VIDEO
		videoShow: function()
		{
			this.selectionSave();

			this.modalInit(this.opts.curLang.video, this.opts.modal_video, 600, $.proxy(function()
			{
				$('#redactor_insert_video_btn').click($.proxy(this.videoInsert, this));

				setTimeout(function()
				{
					$('#redactor_insert_video_area').focus();

				}, 200);

			}, this));
		},
		videoInsert: function ()
		{
			var data = $('#redactor_insert_video_area').val();
			data = this.cleanStripTags(data);

			this.selectionRestore();

			var current = this.getBlock() || this.getCurrent();

			if (current) $(current).after(data)
			else this.insertHtmlAdvanced(data, false);

			this.sync();
			this.modalClose();
		},

		// LINK
		linkShow: function()
		{
			this.selectionSave();

			var callback = $.proxy(function()
			{
				this.insert_link_node = false;

				var sel = this.getSelection();
				var url = '', text = '', target = '';

				var elem = this.getParent();
				var par = $(elem).parent().get(0);
				if (par && par.tagName === 'A')
				{
					elem = par;
				}

				if (elem && elem.tagName === 'A')
				{
					url = elem.href;
					text = $(elem).text();
					target = elem.target;

					this.insert_link_node = elem;
				}
				else text = sel.toString();

				$('.redactor_link_text').val(text);

				var thref = self.location.href.replace(/\/$/i, '');
				var turl = url.replace(thref, '');

				// remove host from href
				if (this.opts.linkProtocol === false)
				{
					var re = new RegExp('^(http|ftp|https)://' + self.location.host, 'i');
					turl = turl.replace(re, '');
				}

				var tabs = $('#redactor_tabs').find('a');

				if (this.opts.linkEmail === false) tabs.eq(1).remove();
				if (this.opts.linkAnchor === false) tabs.eq(2).remove();
				if (this.opts.linkEmail === false && this.opts.linkAnchor === false)
				{
					$('#redactor_tabs').remove();
					$('#redactor_link_url').val(turl);
				}
				else
				{
					if (url.search('mailto:') === 0)
					{
						this.modalSetTab.call(this, 2);

						$('#redactor_tab_selected').val(2);
						$('#redactor_link_mailto').val(url.replace('mailto:', ''));
					}
					else if (turl.search(/^#/gi) === 0)
					{
						this.modalSetTab.call(this, 3);

						$('#redactor_tab_selected').val(3);
						$('#redactor_link_anchor').val(turl.replace(/^#/gi, '' ));
					}
					else
					{
						$('#redactor_link_url').val(turl);
					}
				}

				if (target === '_blank') $('#redactor_link_blank').prop('checked', true);

				$('#redactor_insert_link_btn').click($.proxy(this.linkProcess, this));

				setTimeout(function()
				{
					$('#redactor_link_url').focus();

				}, 200);

			}, this);

			this.modalInit(this.opts.curLang.link, this.opts.modal_link, 460, callback);

		},
		linkProcess: function()
		{
			var tab_selected = $('#redactor_tab_selected').val();
			var link = '', text = '', target = '', targetBlank = '';

			// url
			if (tab_selected === '1')
			{
				link = $('#redactor_link_url').val();
				text = $('#redactor_link_url_text').val();

				if ($('#redactor_link_blank').prop('checked'))
				{
					target = ' target="_blank"';
					targetBlank = '_blank';
				}

				// test url (add protocol)
				var pattern = '((xn--)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}';
				var re = new RegExp('^(http|ftp|https)://' + pattern, 'i');
				var re2 = new RegExp('^' + pattern, 'i');

				if (link.search(re) == -1 && link.search(re2) == 0 && this.opts.linkProtocol)
				{
					link = this.opts.linkProtocol + link;
				}
			}
			// mailto
			else if (tab_selected === '2')
			{
				link = 'mailto:' + $('#redactor_link_mailto').val();
				text = $('#redactor_link_mailto_text').val();
			}
			// anchor
			else if (tab_selected === '3')
			{
				link = '#' + $('#redactor_link_anchor').val();
				text = $('#redactor_link_anchor_text').val();
			}

			text = text.replace(/<|>/g, '');
			this.linkInsert('<a href="' + link + '"' + target + '>' + text + '</a>', $.trim(text), link, targetBlank);

		},
		linkInsert: function (a, text, link, target)
		{
			this.selectionRestore();

			if (text !== '')
			{
				if (this.insert_link_node)
				{
					this.bufferSet();

					$(this.insert_link_node).text(text).attr('href', link);

					if (target !== '') $(this.insert_link_node).attr('target', target);
					else $(this.insert_link_node).removeAttr('target');

					this.sync();
				}
				else
				{
					var $a = $(a).addClass('redactor-added-link');
					this.exec('inserthtml', this.outerHtml($a), false);
					this.$editor.find('a.redactor-added-link').removeAttr('style').removeClass('redactor-added-link').each(function()
					{
						if (this.className == '') $(this).removeAttr('class');
					});
					this.sync();
				}
			}

			// link tooltip
			setTimeout($.proxy(function()
			{

				if (this.opts.observeLinks) this.observeLinks();

			}, this), 5);

			this.modalClose();
		},

		// FILE
		fileShow: function ()
		{

			this.selectionSave();

			var callback = $.proxy(function()
			{
				var sel = this.getSelection();

				var text = '';
				if (this.oldIE()) text = sel.text;
				else text = sel.toString();

				$('#redactor_filename').val(text);

				// dragupload
				if (!this.isMobile())
				{
					this.draguploadInit('#redactor_file', {
						url: this.opts.fileUpload,
						uploadFields: this.opts.uploadFields,
						success: $.proxy(this.fileCallback, this),
						error: $.proxy( function(obj, json)
						{
							this.callback('fileUploadError', json);

						}, this),
						uploadParam: this.opts.fileUploadParam
					});
				}

				this.uploadInit('redactor_file', {
					auto: true,
					url: this.opts.fileUpload,
					success: $.proxy(this.fileCallback, this),
					error: $.proxy(function(obj, json)
					{
						this.callback('fileUploadError', json);

					}, this)
				});

			}, this);

			this.modalInit(this.opts.curLang.file, this.opts.modal_file, 500, callback);
		},
		fileCallback: function(json)
		{

			this.selectionRestore();

			if (json !== false)
			{

				var text = $('#redactor_filename').val();
				if (text === '') text = json.filename;

				var link = '<a href="' + json.filelink + '" id="filelink-marker">' + text + '</a>';

				// chrome fix
				if (this.browser('webkit') && !!this.window.chrome)
				{
					link = link + '&nbsp;';
				}

				this.execCommand('inserthtml', link, false);

				var linkmarker = $(this.$editor.find('a#filelink-marker'));
				if (linkmarker.size() != 0) linkmarker.removeAttr('id');
				else linkmarker = false;

				this.sync();

				// file upload callback
				this.callback('fileUpload', linkmarker, json);
			}

			this.modalClose();
		},

		// IMAGE
		imageShow: function()
		{

			this.selectionSave();

			var callback = $.proxy(function()
			{
				// json
				if (this.opts.imageGetJson)
				{
					$.getJSON(this.opts.imageGetJson, $.proxy(function(data)
					{
						var folders = {}, count = 0;

						// folders
						$.each(data, $.proxy(function(key, val)
						{
							if (typeof val.folder !== 'undefined')
							{
								count++;
								folders[val.folder] = count;
							}

						}, this));

						var folderclass = false;
						$.each(data, $.proxy(function(key, val)
						{
							// title
							var thumbtitle = '';
							if (typeof val.title !== 'undefined') thumbtitle = val.title;

							var folderkey = 0;
							if (!$.isEmptyObject(folders) && typeof val.folder !== 'undefined')
							{
								folderkey = folders[val.folder];
								if (folderclass === false) folderclass = '.redactorfolder' + folderkey;
							}

							var img = $('<img src="' + val.thumb + '" class="redactorfolder redactorfolder' + folderkey + '" rel="' + val.image + '" title="' + thumbtitle + '" />');
							$('#redactor_image_box').append(img);
							$(img).click($.proxy(this.imageThumbClick, this));

						}, this));

						// folders
						if (!$.isEmptyObject(folders))
						{
							$('.redactorfolder').hide();
							$(folderclass).show();

							var onchangeFunc = function(e)
							{
								$('.redactorfolder').hide();
								$('.redactorfolder' + $(e.target).val()).show();
							};

							var select = $('<select id="redactor_image_box_select">');
							$.each( folders, function(k, v)
							{
								select.append( $('<option value="' + v + '">' + k + '</option>'));
							});

							$('#redactor_image_box').before(select);
							select.change(onchangeFunc);
						}
					}, this));

				}
				else
				{
					$('#redactor_tabs').find('a').eq(1).remove();
				}

				if (this.opts.imageUpload || this.opts.s3)
				{
					// dragupload
					if (!this.isMobile() && this.opts.s3 === false)
					{
						if ($('#redactor_file' ).length)
						{
							this.draguploadInit('#redactor_file', {
								url: this.opts.imageUpload,
								uploadFields: this.opts.uploadFields,
								success: $.proxy(this.imageCallback, this),
								error: $.proxy(function(obj, json)
								{
									this.callback('imageUploadError', json);

								}, this),
								uploadParam: this.opts.imageUploadParam
							});
						}
					}

					if (this.opts.s3 === false)
					{
						// ajax upload
						this.uploadInit('redactor_file', {
							auto: true,
							url: this.opts.imageUpload,
							success: $.proxy(this.imageCallback, this),
							error: $.proxy(function(obj, json)
							{
								this.callback('imageUploadError', json);

							}, this)
						});
					}
					// s3 upload
					else
					{
						$('#redactor_file').on('change.redactor', $.proxy(this.s3handleFileSelect, this));
					}

				}
				else
				{
					$('.redactor_tab').hide();
					if (!this.opts.imageGetJson)
					{
						$('#redactor_tabs').remove();
						$('#redactor_tab3').show();
					}
					else
					{
						var tabs = $('#redactor_tabs').find('a');
						tabs.eq(0).remove();
						tabs.eq(1).addClass('redactor_tabs_act');
						$('#redactor_tab2').show();
					}
				}

				$('#redactor_upload_btn').click($.proxy(this.imageCallbackLink, this));

				if (!this.opts.imageUpload && !this.opts.imageGetJson)
				{
					setTimeout(function()
					{
						$('#redactor_file_link').focus();

					}, 200);
				}

			}, this);

			this.modalInit(this.opts.curLang.image, this.opts.modal_image, 610, callback);

		},
		imageEdit: function(image)
		{
			var $el = image;
			var parent = $el.parent().parent();

			var callback = $.proxy(function()
			{
				$('#redactor_file_alt').val($el.attr('alt'));
				$('#redactor_image_edit_src').attr('href', $el.attr('src'));
				$('#redactor_form_image_align').val($el.css('float'));

				if ($(parent).get(0).tagName === 'A')
				{
					$('#redactor_file_link').val($(parent).attr('href'));

					if ($(parent).attr('target') == '_blank')
					{
						$('#redactor_link_blank').prop('checked', true);
					}
				}

				$('#redactor_image_delete_btn').click($.proxy(function()
				{
					this.imageRemove($el);

				}, this));

				$('#redactorSaveBtn').click($.proxy(function()
				{
					this.imageSave($el);

				}, this));

			}, this);

			this.modalInit(this.opts.curLang.edit, this.opts.modal_image_edit, 380, callback);

		},
		imageRemove: function(el)
		{
			var parent = $(el).parent();
			$(el).remove();

			if (parent.length && parent[0].tagName === 'P')
			{
				this.$editor.focus();
				this.selectionStart(parent);
			}

			// delete callback
			this.callback('imageDelete', el);

			this.modalClose();
			this.sync();
		},
		imageSave: function(el)
		{
			var $el = $(el);
			var parent = $el.parent();

			$el.attr('alt', $('#redactor_file_alt').val());

			var floating = $('#redactor_form_image_align').val();

			if (floating === 'left')
			{
				this.imageMargin = '0 ' + this.opts.imageFloatMargin + ' ' + this.opts.imageFloatMargin + ' 0';
				$el.css({ 'float': 'left', 'margin': this.imageMargin });
			}
			else if (floating === 'right')
			{
				this.imageMargin = '0 0 ' + this.opts.imageFloatMargin + ' ' + this.opts.imageFloatMargin + '';
				$el.css({ 'float': 'right', 'margin': this.imageMargin });
			}
			else
			{
				this.imageMargin = '0px';
				var imageBox = $el.closest('#redactor-image-box');
				if (imageBox.size() != 0) imageBox.css({ 'float': '', 'margin': '' });
				$el.css({ 'float': '', 'margin': '' });
			}

			// as link
			var link = $.trim($('#redactor_file_link').val());
			if (link !== '')
			{
				var target = false;
				if ($('#redactor_link_blank').prop('checked'))
				{
					target = true;
				}

				if (parent.get(0).tagName !== 'A')
				{
					var a = $('<a href="' + link + '">' + this.outerHtml(el) + '</a>');

					if (target)
					{
						a.attr('target', '_blank');
					}

					$el.replaceWith(a);
				}
				else
				{
					parent.attr('href', link);
					if (target)
					{
						parent.attr('target', '_blank');
					}
					else
					{
						parent.removeAttr('target');
					}
				}
			}
			else
			{
				if (parent.get(0).tagName === 'A')
				{
					parent.replaceWith(this.outerHtml(el));
				}
			}

			this.modalClose();
			this.observeImages();
			this.sync();

		},
		imageResizeHide: function(e)
		{
			if (e !== false && $(e.target).parent().size() != 0 && $(e.target).parent()[0].id === 'redactor-image-box')
			{
				return false;
			}

			var imageBox = this.$editor.find('#redactor-image-box');
			if (imageBox.size() == 0)
			{
				return false;
			}

			this.$editor.find('#redactor-image-editter, #redactor-image-resizer').remove();


			if (this.imageMargin != '0px')
			{
				imageBox.find('img').css('margin', this.imageMargin);
				imageBox.css('margin', '');
				this.imageMargin = '0px';
			}

			imageBox.find('img').css('opacity', '');
			imageBox.replaceWith(function()
			{
				return $(this).contents();
			});

			$(document).off('click.redactor-image-resize-hide');
			this.$editor.off('click.redactor-image-resize-hide');
			this.$editor.off('keydown.redactor-image-delete');

			this.sync()

		},
		imageResize: function(image)
		{
			var $image = $(image);

			$image.on('mousedown', $.proxy(function()
			{
				this.imageResizeHide(false);
			}, this));

			$image.on('dragstart', $.proxy(function()
			{
				this.$editor.on('drop.redactor-image-inside-drop', $.proxy(function()
				{
					setTimeout($.proxy(function()
					{
						this.observeImages();
						this.$editor.off('drop.redactor-image-inside-drop');
						this.sync();

					}, this), 1);

				},this));
			}, this));

			$image.on('click', $.proxy(function(e)
			{
				if (this.$editor.find('#redactor-image-box').size() != 0)
				{
					return false;
				}

				var clicked = false,
				start_x,
				start_y,
				ratio = $image.width() / $image.height(),
				min_w = 20,
				min_h = 10;

				var imageResizer = this.imageResizeControls($image);

				// resize
				var isResizing = false;
				imageResizer.on('mousedown', function(e)
				{
					isResizing = true;
					e.preventDefault();

					ratio = $image.width() / $image.height();

					start_x = Math.round(e.pageX - $image.eq(0).offset().left);
					start_y = Math.round(e.pageY - $image.eq(0).offset().top);

				});

				$(this.document.body).on('mousemove', $.proxy(function(e)
				{
					if (isResizing)
					{
						var mouse_x = Math.round(e.pageX - $image.eq(0).offset().left) - start_x;
						var mouse_y = Math.round(e.pageY - $image.eq(0).offset().top) - start_y;

						var div_h = $image.height();

						var new_h = parseInt(div_h, 10) + mouse_y;
						var new_w = Math.round(new_h * ratio);

						if (new_w > min_w)
						{
							$image.width(new_w);

							if (new_w < 100)
							{
								this.imageEditter.css({
									marginTop: '-7px',
									marginLeft: '-13px',
									fontSize: '9px',
									padding: '3px 5px'
								});
							}
							else
							{
								this.imageEditter.css({
									marginTop: '-11px',
									marginLeft: '-18px',
									fontSize: '11px',
									padding: '7px 10px'
								});
							}
						}

						start_x = Math.round(e.pageX - $image.eq(0).offset().left);
						start_y = Math.round(e.pageY - $image.eq(0).offset().top);

						this.sync()
					}
				}, this)).on('mouseup', function()
				{
					isResizing = false;
				});


				this.$editor.on('keydown.redactor-image-delete', $.proxy(function(e)
				{
					var key = e.which;

					if (this.keyCode.BACKSPACE == key || this.keyCode.DELETE == key)
					{
						this.bufferSet();
						this.imageResizeHide(false);
						this.imageRemove($image);
					}

				}, this));

				$(document).on('click.redactor-image-resize-hide', $.proxy(this.imageResizeHide, this));
				this.$editor.on('click.redactor-image-resize-hide', $.proxy(this.imageResizeHide, this));


			}, this));
		},
		imageResizeControls: function($image)
		{
			var imageBox = $('<span id="redactor-image-box" data-redactor="verified">');
			imageBox.css({
				position: 'relative',
				display: 'inline-block',
				lineHeight: 0,
				outline: '1px dashed rgba(0, 0, 0, .6)',
				'float': $image.css('float')
			});
			imageBox.attr('contenteditable', false);

			this.imageMargin = $image[0].style.margin;
			if (this.imageMargin != '0px')
			{
				imageBox.css('margin', this.imageMargin);
				$image.css('margin', '');
			}

			$image.css('opacity', .5).after(imageBox);

			// editter
			this.imageEditter = $('<span id="redactor-image-editter" data-redactor="verified">' + this.opts.curLang.edit + '</span>');
			this.imageEditter.css({
				position: 'absolute',
				zIndex: 2,
				top: '50%',
				left: '50%',
				marginTop: '-11px',
				marginLeft: '-18px',
				lineHeight: 1,
				backgroundColor: '#000',
				color: '#fff',
				fontSize: '11px',
				padding: '7px 10px',
				cursor: 'pointer'
			});
			this.imageEditter.attr('contenteditable', false);
			this.imageEditter.on('click', $.proxy(function()
			{
				this.imageEdit($image);
			}, this));
			imageBox.append(this.imageEditter);

			// resizer
			var imageResizer = $('<span id="redactor-image-resizer" data-redactor="verified"></span>');
			imageResizer.css({
				position: 'absolute',
				zIndex: 2,
				lineHeight: 1,
				cursor: 'nw-resize',
				bottom: '-4px',
				right: '-5px',
				border: '1px solid #fff',
				backgroundColor: '#000',
				width: '8px',
				height: '8px'
			});
			imageResizer.attr('contenteditable', false);
			imageBox.append(imageResizer);

			imageBox.append($image);

			return imageResizer;
		},
		imageThumbClick: function(e)
		{
			var img = '<img id="image-marker" src="' + $(e.target).attr('rel') + '" alt="' + $(e.target).attr('title') + '" />';

			var parent = this.getParent();
			if (this.opts.paragraphy && $(parent).closest('li').size() == 0) img = '<p>' + img + '</p>';

			this.imageInsert(img, true);
		},
		imageCallbackLink: function()
		{
			var val = $('#redactor_file_link').val();

			if (val !== '')
			{
				var data = '<img id="image-marker" src="' + val + '" />';
				if (this.opts.linebreaks === false) data = '<p>' + data + '</p>';

				this.imageInsert(data, true);

			}
			else this.modalClose();
		},
		imageCallback: function(data)
		{
			this.imageInsert(data);
		},
		imageInsert: function(json, link)
		{
			this.selectionRestore();

			if (json !== false)
			{
				var html = '';
				if (link !== true)
				{
					html = '<img id="image-marker" src="' + json.filelink + '" />';

					var parent = this.getParent();
					if (this.opts.paragraphy && $(parent).closest('li').size() == 0)
					{
						html = '<p>' + html + '</p>';
					}
				}
				else
				{
					html = json;
				}

				this.execCommand('inserthtml', html, false);

				var image = $(this.$editor.find('img#image-marker'));

				if (image.length) image.removeAttr('id');
				else image = false;

				this.sync();

				// upload image callback
				link !== true && this.callback('imageUpload', image, json);
			}

			this.modalClose();
			this.observeImages();
		},

		// MODAL
		modalTemplatesInit: function()
		{
			$.extend( this.opts,
			{
				modal_file: String()
				+ '<section>'
					+ '<div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;">'
							+ '<div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div>'
					+ '</div>'
					+ '<form id="redactorUploadFileForm" method="post" action="" enctype="multipart/form-data">'
						+ '<label>' + this.opts.curLang.filename + '</label>'
						+ '<input type="text" id="redactor_filename" class="redactor_input" />'
						+ '<div style="margin-top: 7px;">'
							+ '<input type="file" id="redactor_file" name="' + this.opts.fileUploadParam + '" />'
						+ '</div>'
					+ '</form>'
				+ '</section>',

				modal_image_edit: String()
				+ '<section>'
					+ '<label>' + this.opts.curLang.title + '</label>'
					+ '<input id="redactor_file_alt" class="redactor_input" />'
					+ '<label>' + this.opts.curLang.link + '</label>'
					+ '<input id="redactor_file_link" class="redactor_input" />'
					+ '<label><input type="checkbox" id="redactor_link_blank"> ' + this.opts.curLang.link_new_tab + '</label>'
					+ '<label>' + this.opts.curLang.image_position + '</label>'
					+ '<select id="redactor_form_image_align">'
						+ '<option value="none">' + this.opts.curLang.none + '</option>'
						+ '<option value="left">' + this.opts.curLang.left + '</option>'
						+ '<option value="right">' + this.opts.curLang.right + '</option>'
					+ '</select>'
				+ '</section>'
				+ '<footer>'
					+ '<button id="redactor_image_delete_btn" class="redactor_modal_btn redactor_modal_delete_btn">' + this.opts.curLang._delete + '</button>&nbsp;&nbsp;&nbsp;'
					+ '<button class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</button>'
					+ '<input type="button" name="save" class="redactor_modal_btn redactor_modal_action_btn" id="redactorSaveBtn" value="' + this.opts.curLang.save + '" />'
				+ '</footer>',

				modal_image: String()
				+ '<section>'
					+ '<div id="redactor_tabs">'
						+ '<a href="#" class="redactor_tabs_act">' + this.opts.curLang.upload + '</a>'
						+ '<a href="#">' + this.opts.curLang.choose + '</a>'
						+ '<a href="#">' + this.opts.curLang.link + '</a>'
					+ '</div>'
					+ '<div id="redactor-progress" class="redactor-progress redactor-progress-striped" style="display: none;">'
							+ '<div id="redactor-progress-bar" class="redactor-progress-bar" style="width: 100%;"></div>'
					+ '</div>'
					+ '<form id="redactorInsertImageForm" method="post" action="" enctype="multipart/form-data">'
						+ '<div id="redactor_tab1" class="redactor_tab">'
							+ '<input type="file" id="redactor_file" name="' + this.opts.imageUploadParam + '" />'
						+ '</div>'
						+ '<div id="redactor_tab2" class="redactor_tab" style="display: none;">'
							+ '<div id="redactor_image_box"></div>'
						+ '</div>'
					+ '</form>'
					+ '<div id="redactor_tab3" class="redactor_tab" style="display: none;">'
						+ '<label>' + this.opts.curLang.image_web_link + '</label>'
						+ '<input type="text" name="redactor_file_link" id="redactor_file_link" class="redactor_input"  />'
					+ '</div>'
				+ '</section>'
				+ '<footer>'
					+ '<button class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</button>'
					+ '<input type="button" name="upload" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_upload_btn" value="' + this.opts.curLang.insert + '" />'
				+ '</footer>',

				modal_link: String()
				+ '<section>'
					+ '<form id="redactorInsertLinkForm" method="post" action="">'
						+ '<div id="redactor_tabs">'
							+ '<a href="#" class="redactor_tabs_act">URL</a>'
							+ '<a href="#">Email</a>'
							+ '<a href="#">' + this.opts.curLang.anchor + '</a>'
						+ '</div>'
						+ '<input type="hidden" id="redactor_tab_selected" value="1" />'
						+ '<div class="redactor_tab" id="redactor_tab1">'
							+ '<label>URL</label>'
							+ '<input type="text" id="redactor_link_url" class="redactor_input"  />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_url_text" />'
							+ '<label><input type="checkbox" id="redactor_link_blank"> ' + this.opts.curLang.link_new_tab + '</label>'
						+ '</div>'
						+ '<div class="redactor_tab" id="redactor_tab2" style="display: none;">'
							+ '<label>Email</label>'
							+ '<input type="text" id="redactor_link_mailto" class="redactor_input" />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_mailto_text" />'
						+ '</div>'
						+ '<div class="redactor_tab" id="redactor_tab3" style="display: none;">'
							+ '<label>' + this.opts.curLang.anchor + '</label>'
							+ '<input type="text" class="redactor_input" id="redactor_link_anchor"  />'
							+ '<label>' + this.opts.curLang.text + '</label>'
							+ '<input type="text" class="redactor_input redactor_link_text" id="redactor_link_anchor_text" />'
						+ '</div>'
					+ '</form>'
				+ '</section>'
				+ '<footer>'
					+ '<button class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</button>'
					+ '<input type="button" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_insert_link_btn" value="' + this.opts.curLang.insert + '" />'
				+ '</footer>',

				modal_table: String()
				+ '<section>'
					+ '<label>' + this.opts.curLang.rows + '</label>'
					+ '<input type="text" size="5" value="2" id="redactor_table_rows" />'
					+ '<label>' + this.opts.curLang.columns + '</label>'
					+ '<input type="text" size="5" value="3" id="redactor_table_columns" />'
				+ '</section>'
				+ '<footer>'
					+ '<button class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</button>'
					+ '<input type="button" name="upload" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_insert_table_btn" value="' + this.opts.curLang.insert + '" />'
				+ '</footer>',

				modal_video: String()
				+ '<section>'
					+ '<form id="redactorInsertVideoForm">'
						+ '<label>' + this.opts.curLang.video_html_code + '</label>'
						+ '<textarea id="redactor_insert_video_area" style="width: 99%; height: 160px;"></textarea>'
					+ '</form>'
				+ '</section>'
				+ '<footer>'
					+ '<button class="redactor_modal_btn redactor_btn_modal_close">' + this.opts.curLang.cancel + '</button>'
					+ '<input type="button" class="redactor_modal_btn redactor_modal_action_btn" id="redactor_insert_video_btn" value="' + this.opts.curLang.insert + '" />'
				+ '</footer>'

			});
		},
		modalInit: function(title, content, width, callback)
		{
			var $redactorModalOverlay = $('#redactor_modal_overlay');

			// modal overlay
			if (!$redactorModalOverlay.length)
			{
				this.$overlay = $redactorModalOverlay = $('<div id="redactor_modal_overlay" style="display: none;"></div>');
				$('body').prepend(this.$overlay);
			}

			if (this.opts.modalOverlay)
			{
				$redactorModalOverlay.show().on('click', $.proxy(this.modalClose, this));
			}

			var $redactorModal = $('#redactor_modal');

			if (!$redactorModal.length)
			{
				this.$modal = $redactorModal = $('<div id="redactor_modal" style="display: none;"><div id="redactor_modal_close">&times;</div><header id="redactor_modal_header"></header><div id="redactor_modal_inner"></div></div>');
				$('body').append(this.$modal);
			}

			$('#redactor_modal_close').on('click', $.proxy(this.modalClose, this));

			this.hdlModalClose = $.proxy(function(e)
			{
				if (e.keyCode === this.keyCode.ESC)
				{
					this.modalClose();
					return false;
				}

			}, this);

			$(document).keyup(this.hdlModalClose);
			this.$editor.keyup(this.hdlModalClose);

			// set content
			this.modalcontent = false;
			if (content.indexOf('#') == 0)
			{
				this.modalcontent = $(content);
				$('#redactor_modal_inner').empty().append(this.modalcontent.html());
				this.modalcontent.html('');

			}
			else
			{
				$('#redactor_modal_inner').empty().append(content);
			}

			$redactorModal.find('#redactor_modal_header').html(title);

			// draggable
			if (typeof $.fn.draggable !== 'undefined')
			{
				$redactorModal.draggable({ handle: '#redactor_modal_header' });
				$redactorModal.find('#redactor_modal_header').css('cursor', 'move');
			}

			var $redactor_tabs = $('#redactor_tabs');

			// tabs
			if ($redactor_tabs.length )
			{
				var that = this;
				$redactor_tabs.find('a').each(function(i, s)
				{
					i++;
					$(s).on('click', function(e)
					{
						e.preventDefault();

						$redactor_tabs.find('a').removeClass('redactor_tabs_act');
						$(this).addClass('redactor_tabs_act');
						$('.redactor_tab').hide();
						$('#redactor_tab' + i ).show();
						$('#redactor_tab_selected').val(i);

						if (that.isMobile() === false)
						{
							var height = $redactorModal.outerHeight();
							$redactorModal.css('margin-top', '-' + (height + 10) / 2 + 'px');
						}
					});
				});
			}

			$redactorModal.find('.redactor_btn_modal_close').on('click', $.proxy(this.modalClose, this));

			// save scroll
			if (this.opts.autoresize === true)
			{
				this.saveModalScroll = this.document.body.scrollTop;
			}
			else
			{
				this.saveModalScroll = this.$editor.scrollTop();
			}

			if (this.isMobile() === false)
			{
				$redactorModal.css({
					position: 'fixed',
					top: '-2000px',
					left: '50%',
					width: width + 'px',
					marginLeft: '-' + (width + 60) / 2 + 'px'
				}).show();

				this.modalSaveBodyOveflow = $(document.body).css('overflow');
				$(document.body).css('overflow', 'hidden');

			}
			else
			{
				$redactorModal.css({
					position: 'fixed',
					width: '100%',
					height: '100%',
					top: '0',
					left: '0',
					margin: '0',
					minHeight: '300px'
				}).show();
			}

			// callback
			if (typeof callback === 'function') callback();

			if (this.isMobile() === false)
			{
				setTimeout(function()
				{
					var height = $redactorModal.outerHeight();
					$redactorModal.css({
						top: '50%',
						height: 'auto',
						minHeight: 'auto',
						marginTop: '-' + (height + 10) / 2 + 'px'
					});
				}, 10);
			}

		},
		modalClose: function()
		{
			$('#redactor_modal_close').off('click', this.modalClose );
			$('#redactor_modal').fadeOut('fast', $.proxy(function()
			{
				var redactorModalInner = $('#redactor_modal_inner');

				if (this.modalcontent !== false)
				{
					this.modalcontent.html(redactorModalInner.html());
					this.modalcontent = false;
				}

				redactorModalInner.html('');

				if (this.opts.modalOverlay)
				{
					$('#redactor_modal_overlay').hide().off('click', this.modalClose);
				}

				$(document).unbind('keyup', this.hdlModalClose);
				this.$editor.unbind('keyup', this.hdlModalClose);

				this.selectionRestore();

				// restore scroll
				if (this.opts.autoresize && this.saveModalScroll)
				{
					$(this.document.body).scrollTop(this.saveModalScroll);
				}
				else if (this.opts.autoresize === false && this.saveModalScroll)
				{
					this.$editor.scrollTop(this.saveModalScroll);
				}

			}, this));


			if (this.isMobile() === false)
			{
				$(document.body).css('overflow', this.modalSaveBodyOveflow ? this.modalSaveBodyOveflow : 'visible');
			}

			return false;
		},
		modalSetTab: function(num)
		{
			$('.redactor_tab').hide();
			$('#redactor_tabs').find('a').removeClass('redactor_tabs_act').eq(num - 1).addClass('redactor_tabs_act');
			$('#redactor_tab' + num).show();
		},

		// S3
		s3handleFileSelect: function(e)
		{
			var files = e.target.files;

			for (var i = 0, f; f = files[i]; i++)
			{
				this.s3uploadFile(f);
			}
		},
		s3uploadFile: function(file)
		{
			this.s3executeOnSignedUrl(file, $.proxy(function(signedURL)
			{
				this.s3uploadToS3(file, signedURL);
			}, this));
		},
		s3executeOnSignedUrl: function(file, callback)
		{
			var xhr = new XMLHttpRequest();

			var mark = '?';
			if (this.opts.s3.search(/\?/) != '-1') mark = '&';

			xhr.open('GET', this.opts.s3 + mark + 'name=' + file.name + '&type=' + file.type, true);

			// Hack to pass bytes through unprocessed.
			if (xhr.overrideMimeType) xhr.overrideMimeType('text/plain; charset=x-user-defined');

			xhr.onreadystatechange = function(e)
			{
				if (this.readyState == 4 && this.status == 200)
				{
					$('#redactor-progress').fadeIn();
					callback(decodeURIComponent(this.responseText));
				}
				else if(this.readyState == 4 && this.status != 200)
				{
					//setProgress(0, 'Could not contact signing script. Status = ' + this.status);
				}
			};

			xhr.send();
		},
		s3createCORSRequest: function(method, url)
		{
			var xhr = new XMLHttpRequest();
			if ("withCredentials" in xhr)
			{
				xhr.open(method, url, true);
			}
			else if (typeof XDomainRequest != "undefined")
			{
				xhr = new XDomainRequest();
				xhr.open(method, url);
			}
			else
			{
				xhr = null;
			}

			return xhr;
		},
		s3uploadToS3: function(file, url)
		{
			var xhr = this.s3createCORSRequest('PUT', url);
			if (!xhr)
			{
				//setProgress(0, 'CORS not supported');
			}
			else
			{
				xhr.onload = $.proxy(function()
				{
					if (xhr.status == 200)
					{
						//setProgress(100, 'Upload completed.');

						$('#redactor-progress, #redactor-progress-drag').hide();

						var s3image = url.split('?');

						if (!s3image[0])
						{
							 // url parsing is fail
							 return false;
						}

						this.selectionRestore();

						var html = '';
						html = '<img id="image-marker" src="' + s3image[0] + '" />';
						if (this.opts.paragraphy) html = '<p>' + html + '</p>';

						this.execCommand('inserthtml', html, false);

						var image = $(this.$editor.find('img#image-marker'));

						if (image.length) image.removeAttr('id');
						else image = false;

						this.sync();

						// upload image callback
						this.callback('imageUpload', image, false);

						this.modalClose();
						this.observeImages();

					}
					else
					{
						//setProgress(0, 'Upload error: ' + xhr.status);
					}
				}, this);

				xhr.onerror = function()
				{
					//setProgress(0, 'XHR error.');
				};

				xhr.upload.onprogress = function(e)
				{
					/*
					if (e.lengthComputable)
					{
						var percentLoaded = Math.round((e.loaded / e.total) * 100);
						setProgress(percentLoaded, percentLoaded == 100 ? 'Finalizing.' : 'Uploading.');
					}
					*/
				};

				xhr.setRequestHeader('Content-Type', file.type);
				xhr.setRequestHeader('x-amz-acl', 'public-read');

				xhr.send(file);
			}
		},

		// UPLOAD
		uploadInit: function(el, options)
		{
			this.uploadOptions = {
				url: false,
				success: false,
				error: false,
				start: false,
				trigger: false,
				auto: false,
				input: false
			};

			$.extend(this.uploadOptions, options);

			var $el = $('#' + el);

			// Test input or form
			if ($el.length && $el[0].tagName === 'INPUT')
			{
				this.uploadOptions.input = $el;
				this.el = $($el[0].form);
			}
			else this.el = $el;

			this.element_action = this.el.attr('action');

			// Auto or trigger
			if (this.uploadOptions.auto)
			{
				$(this.uploadOptions.input).change($.proxy(function(e)
				{
					this.el.submit(function(e)
					{
						return false;
					});

					this.uploadSubmit(e);

				}, this));

			}
			else if (this.uploadOptions.trigger)
			{
				$('#' + this.uploadOptions.trigger).click($.proxy(this.uploadSubmit, this));
			}
		},
		uploadSubmit: function(e)
		{
			$('#redactor-progress').fadeIn();
			this.uploadForm(this.element, this.uploadFrame());
		},
		uploadFrame: function()
		{
			this.id = 'f' + Math.floor(Math.random() * 99999);

			var d = this.document.createElement('div');
			var iframe = '<iframe style="display:none" id="' + this.id + '" name="' + this.id + '"></iframe>';

			d.innerHTML = iframe;
			$(d).appendTo("body");

			// Start
			if (this.uploadOptions.start) this.uploadOptions.start();

			$( '#' + this.id ).load($.proxy(this.uploadLoaded, this));

			return this.id;
		},
		uploadForm: function(f, name)
		{
			if (this.uploadOptions.input)
			{
				var formId = 'redactorUploadForm' + this.id,
					fileId = 'redactorUploadFile' + this.id;

				this.form = $('<form  action="' + this.uploadOptions.url + '" method="POST" target="' + name + '" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" />');

				// append hidden fields
				if (this.opts.uploadFields !== false && typeof this.opts.uploadFields === 'object')
				{
					$.each(this.opts.uploadFields, $.proxy(function(k, v)
					{
						if (v != null && v.toString().indexOf('#') === 0) v = $(v).val();

						var hidden = $('<input/>', {
							'type': "hidden",
							'name': k,
							'value': v
						});

						$(this.form).append(hidden);

					}, this));
				}

				var oldElement = this.uploadOptions.input;
				var newElement = $(oldElement).clone();

				$(oldElement).attr('id', fileId).before(newElement).appendTo(this.form);

				$(this.form).css('position', 'absolute')
						.css('top', '-2000px')
						.css('left', '-2000px')
						.appendTo('body');

				this.form.submit();

			}
			else
			{
				f.attr('target', name)
					.attr('method', 'POST')
					.attr('enctype', 'multipart/form-data')
					.attr('action', this.uploadOptions.url);

				this.element.submit();
			}
		},
		uploadLoaded: function()
		{
			var i = $( '#' + this.id)[0], d;

			if (i.contentDocument) d = i.contentDocument;
			else if (i.contentWindow) d = i.contentWindow.document;
			else d = window.frames[this.id].document;

			// Success
			if (this.uploadOptions.success)
			{
				$('#redactor-progress').hide();

				if (typeof d !== 'undefined')
				{
					// Remove bizarre <pre> tag wrappers around our json data:
					var rawString = d.body.innerHTML;
					var jsonString = rawString.match(/\{(.|\n)*\}/)[0];

					jsonString = jsonString.replace(/^\[/, '');
					jsonString = jsonString.replace(/\]$/, '');

					var json = $.parseJSON(jsonString);

					if (typeof json.error == 'undefined') this.uploadOptions.success(json);
					else
					{
						this.uploadOptions.error(this, json);
						this.modalClose();
					}
				}
				else
				{
					this.modalClose();
					alert('Upload failed!');
				}
			}

			this.el.attr('action', this.element_action);
			this.el.attr('target', '');
		},

		// DRAGUPLOAD
		draguploadInit: function (el, options)
		{
			this.draguploadOptions = $.extend({
				url: false,
				success: false,
				error: false,
				preview: false,
				uploadFields: false,
				text: this.opts.curLang.drop_file_here,
				atext: this.opts.curLang.or_choose,
				uploadParam: false
			}, options);

			if (window.FormData === undefined) return false;

			this.droparea = $('<div class="redactor_droparea"></div>');
			this.dropareabox = $('<div class="redactor_dropareabox">' + this.draguploadOptions.text + '</div>');
			this.dropalternative = $('<div class="redactor_dropalternative">' + this.draguploadOptions.atext + '</div>');

			this.droparea.append(this.dropareabox);

			$(el).before(this.droparea);
			$(el).before(this.dropalternative);

			// drag over
			this.dropareabox.on('dragover', $.proxy(function()
			{
				return this.draguploadOndrag();

			}, this));

			// drag leave
			this.dropareabox.on('dragleave', $.proxy(function()
			{
				return this.draguploadOndragleave();

			}, this));

			// drop
			this.dropareabox.get(0).ondrop = $.proxy(function(e)
			{
				e.preventDefault();

				this.dropareabox.removeClass('hover').addClass('drop');

				this.dragUploadAjax(this.draguploadOptions.url, e.dataTransfer.files[0], false, false, false, this.draguploadOptions.uploadParam);

			}, this );
		},
		dragUploadAjax: function(url, file, directupload, progress, e, uploadParam)
		{


			if (!directupload)
			{
				var xhr = $.ajaxSettings.xhr();
				if (xhr.upload)
				{
					xhr.upload.addEventListener('progress', $.proxy(this.uploadProgress, this), false);
				}

				$.ajaxSetup({
				  xhr: function () { return xhr; }
				});
			}

			var fd = new FormData();

			// append file data
			if (uploadParam !== false)
			{
				fd.append(uploadParam, file);
			}
			else
			{
				fd.append('file', file);
			}

			// append hidden fields
			if (this.opts.uploadFields !== false && typeof this.opts.uploadFields === 'object')
			{
				$.each(this.opts.uploadFields, $.proxy(function(k, v)
				{
					if (v != null && v.toString().indexOf('#') === 0) v = $(v).val();
					fd.append(k, v);

				}, this));
			}

			$.ajax({
				url: url,
				dataType: 'html',
				data: fd,
				cache: false,
				contentType: false,
				processData: false,
				type: 'POST',
				success: $.proxy(function(data)
				{
					data = data.replace(/^\[/, '');
					data = data.replace(/\]$/, '');

					var json = (typeof data === 'string' ? $.parseJSON(data) : data);

					if (directupload)
					{
						progress.fadeOut('slow', function()
						{
							$(this).remove();
						});

					    var $img = $('<img>');
						$img.attr('src', json.filelink).attr('id', 'drag-image-marker');

						this.insertNodeToCaretPositionFromPoint(e, $img[0]);

						var image = $(this.$editor.find('img#drag-image-marker'));
						if (image.length) image.removeAttr('id');
						else image = false;

						this.sync();
						this.observeImages();

						// upload callback
						if (image) this.callback('imageUpload', image, json);

						// error callback
						if (typeof json.error !== 'undefined') this.callback('imageUploadError', json);
					}
					else
					{
						if (typeof json.error == 'undefined')
						{
							this.draguploadOptions.success(json);
						}
						else
						{
							this.draguploadOptions.error(this, json);
							this.draguploadOptions.success(false);
						}
					}

				}, this)
			});
		},
		draguploadOndrag: function()
		{
			this.dropareabox.addClass('hover');
			return false;
		},
		draguploadOndragleave: function()
		{
			this.dropareabox.removeClass('hover');
			return false;
		},
		uploadProgress: function(e, text)
		{
			var percent = e.loaded ? parseInt(e.loaded / e.total * 100, 10) : e;
			this.dropareabox.text('Loading ' + percent + '% ' + (text || ''));
		},

		// UTILS
		isMobile: function()
		{
			return /(iPhone|iPod|BlackBerry|Android)/.test(navigator.userAgent);
		},
		normalize: function(str)
		{
			if (typeof(str) === 'undefined') return 0;
			return parseInt(str.replace('px',''), 10);
		},
		outerHtml: function(el)
		{
			return $('<div>').append($(el).eq(0).clone()).html();
		},
		isString: function(obj)
		{
			return Object.prototype.toString.call(obj) == '[object String]';
		},
		isEmpty: function(html)
		{
			html = html.replace(/&#x200b;|<br>|<br\/>|&nbsp;/gi, '');
			html = html.replace(/\s/g, '');
			html = html.replace(/^<p>[^\W\w\D\d]*?<\/p>$/i, '');


			return html == '';
		},
		isIe11: function()
		{
			return !!navigator.userAgent.match(/Trident\/7\./);
		},
		browser: function(browser)
		{
			var ua = navigator.userAgent.toLowerCase();
			var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
            /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
            /(webkit)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec(ua) ||
            /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
            /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
            /(msie) ([\w.]+)/.exec( ua ) ||
            ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
            ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
            [];

			if (browser == 'version') return match[2];
			if (browser == 'webkit') return (match[1] == 'chrome' || match[1] == 'webkit');
			if (match[1] == 'rv') return browser == 'msie';
			if (match[1] == 'opr') return browser == 'webkit';

			return browser == match[1];

		},
		oldIE: function()
		{
			if (this.browser('msie') && parseInt(this.browser('version'), 10) < 9) return true;
			return false;
		},
		getFragmentHtml: function (fragment)
		{
			var cloned = fragment.cloneNode(true);
			var div = this.document.createElement('div');

			div.appendChild(cloned);
			return div.innerHTML;
		},
		extractContent: function()
		{
			var node = this.$editor[0];
			var frag = this.document.createDocumentFragment();
			var child;

			while ((child = node.firstChild))
			{
				frag.appendChild(child);
			}

			return frag;
		},
		isParentRedactor: function(el)
		{
			if (!el) return false;
			if (this.opts.iframe) return el;

			if ($(el).parents('div.redactor_editor').length == 0 || $(el).hasClass('redactor_editor')) return false;
			else return el;
		},
		currentOrParentIs: function(tagName)
		{
			var parent = this.getParent(), current = this.getCurrent();
			return parent && parent.tagName === tagName ? parent : current && current.tagName === tagName ? current : false;
		},
		isEndOfElement: function()
		{
			var current = this.getBlock();
			var offset = this.getCaretOffset(current);

			var text = $.trim($(current).text()).replace(/\n\r\n/g, '');

			var len = text.length;

			if (offset == len) return true;
			else return false;
		},
		isFocused: function()
		{
			var el, sel = this.getSelection();

			if (sel && sel.rangeCount && sel.rangeCount > 0) el = sel.getRangeAt(0).startContainer;
			if (!el) return false;
			if (this.opts.iframe)
			{
				if (this.getCaretOffsetRange().equals()) return !this.$editor.is(el);
				else return true;
			}

			return $(el).closest('div.redactor_editor').length != 0;
		},
		removeEmptyAttr: function (el, attr)
		{
			if ($(el).attr(attr) == '') $(el).removeAttr(attr);
		},
		removeFromArrayByValue: function(array, value)
		{
			var index = null;

			while ((index = array.indexOf(value)) !== -1)
			{
				array.splice(index, 1);
			}

			return array;
		}

	};

	// constructor
	Redactor.prototype.init.prototype = Redactor.prototype;

	// LINKIFY
	$.Redactor.fn.formatLinkify = function(protocol, convertLinks, convertImageLinks, convertVideoLinks, linkSize)
	{
		var url1 = /(^|&lt;|\s)(www\..+?\..+?)(\s|&gt;|$)/g,
			url2 = /(^|&lt;|\s)(((https?|ftp):\/\/|mailto:).+?)(\s|&gt;|$)/g,
			urlImage = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/gi,
			urlYoutube = /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube\.com\S*[^\w\-\s])([\w\-]{11})(?=[^\w\-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/ig,
			urlVimeo = /https?:\/\/(www\.)?vimeo.com\/(\d+)($|\/)/;

		var childNodes = (this.$editor ? this.$editor.get(0) : this).childNodes, i = childNodes.length;
		while (i--)
		{
			var n = childNodes[i];
			if (n.nodeType === 3)
			{
				var html = n.nodeValue;

				// youtube & vimeo
				if (convertVideoLinks && html)
				{
					var iframeStart = '<iframe width="500" height="281" src="',
						iframeEnd = '" frameborder="0" allowfullscreen></iframe>';

					if (html.match(urlYoutube))
					{
						html = html.replace(urlYoutube, iframeStart + '//www.youtube.com/embed/$1' + iframeEnd);
						$(n).after(html).remove();
					}
					else if (html.match(urlVimeo))
					{
						html = html.replace(urlVimeo, iframeStart + '//player.vimeo.com/video/$2' + iframeEnd);
						$(n).after(html).remove();
					}
				}

				// image
				if (convertImageLinks && html && html.match(urlImage))
				{
					html = html.replace(urlImage, '<img src="$1">');

					$(n).after(html).remove();
				}

				// link
				if (convertLinks && html && (html.match(url1) || html.match(url2)))
				{
					var href = (html.match(url1) || html.match(url2));
					href = href[0];
					if (href.length > linkSize) href = href.substring(0, linkSize) + '...';

					html = html.replace(/&/g, '&amp;')
					.replace(/</g, '&lt;')
					.replace(/>/g, '&gt;')
					.replace(url1, '$1<a href="' + protocol + '$2">' + $.trim(href) + '</a>$3')
					.replace(url2, '$1<a href="$2">' + $.trim(href) + '</a>$5');


					$(n).after(html).remove();
				}
			}
			else if (n.nodeType === 1 && !/^(a|button|textarea)$/i.test(n.tagName))
			{
				$.Redactor.fn.formatLinkify.call(n, protocol, convertLinks, convertImageLinks, convertVideoLinks, linkSize);
			}
		}
	};

})(jQuery);
window.init_redactor = function(){
  var csrf_token = $('meta[name=csrf-token]').attr('content');
  var csrf_param = $('meta[name=csrf-param]').attr('content');
  var params;
  if (csrf_param !== undefined && csrf_token !== undefined) {
    params = csrf_param + "=" + encodeURIComponent(csrf_token);
  }
  $('.redactor').redactor(
    { "imageUpload":"/redactor_rails/pictures?" + params,
      "imageGetJson":"/redactor_rails/pictures",
      "path":"/assets/redactor-rails",
      "css":"style.css"}
  );
}

$(document).ready( window.init_redactor );
$(window).bind('page:change', window.init_redactor);


/*!
 * Fotorama 4.6.2 | http://fotorama.io/license/
 */

fotoramaVersion = '4.6.2';
(function (window, document, location, $, undefined) {
  "use strict";
var _fotoramaClass = 'fotorama',
    _fullscreenClass = 'fullscreen',

    wrapClass = _fotoramaClass + '__wrap',
    wrapCss2Class = wrapClass + '--css2',
    wrapCss3Class = wrapClass + '--css3',
    wrapVideoClass = wrapClass + '--video',
    wrapFadeClass = wrapClass + '--fade',
    wrapSlideClass = wrapClass + '--slide',
    wrapNoControlsClass = wrapClass + '--no-controls',
    wrapNoShadowsClass = wrapClass + '--no-shadows',
    wrapPanYClass = wrapClass + '--pan-y',
    wrapRtlClass = wrapClass + '--rtl',
    wrapOnlyActiveClass = wrapClass + '--only-active',
    wrapNoCaptionsClass = wrapClass + '--no-captions',
    wrapToggleArrowsClass = wrapClass + '--toggle-arrows',

    stageClass = _fotoramaClass + '__stage',
    stageFrameClass = stageClass + '__frame',
    stageFrameVideoClass = stageFrameClass + '--video',
    stageShaftClass = stageClass + '__shaft',

    grabClass = _fotoramaClass + '__grab',
    pointerClass = _fotoramaClass + '__pointer',

    arrClass = _fotoramaClass + '__arr',
    arrDisabledClass = arrClass + '--disabled',
    arrPrevClass = arrClass + '--prev',
    arrNextClass = arrClass + '--next',
    arrArrClass = arrClass + '__arr',

    navClass = _fotoramaClass + '__nav',
    navWrapClass = navClass + '-wrap',
    navShaftClass = navClass + '__shaft',
    navDotsClass = navClass + '--dots',
    navThumbsClass = navClass + '--thumbs',
    navFrameClass = navClass + '__frame',
    navFrameDotClass = navFrameClass + '--dot',
    navFrameThumbClass = navFrameClass + '--thumb',

    fadeClass = _fotoramaClass + '__fade',
    fadeFrontClass = fadeClass + '-front',
    fadeRearClass = fadeClass + '-rear',

    shadowClass = _fotoramaClass + '__shadow',
    shadowsClass = shadowClass + 's',
    shadowsLeftClass = shadowsClass + '--left',
    shadowsRightClass = shadowsClass + '--right',

    activeClass = _fotoramaClass + '__active',
    selectClass = _fotoramaClass + '__select',

    hiddenClass = _fotoramaClass + '--hidden',

    fullscreenClass = _fotoramaClass + '--fullscreen',
    fullscreenIconClass = _fotoramaClass + '__fullscreen-icon',

    errorClass = _fotoramaClass + '__error',
    loadingClass = _fotoramaClass + '__loading',
    loadedClass = _fotoramaClass + '__loaded',
    loadedFullClass = loadedClass + '--full',
    loadedImgClass = loadedClass + '--img',

    grabbingClass = _fotoramaClass + '__grabbing',

    imgClass = _fotoramaClass + '__img',
    imgFullClass = imgClass + '--full',

    dotClass = _fotoramaClass + '__dot',
    thumbClass = _fotoramaClass + '__thumb',
    thumbBorderClass = thumbClass + '-border',

    htmlClass = _fotoramaClass + '__html',

    videoClass = _fotoramaClass + '__video',
    videoPlayClass = videoClass + '-play',
    videoCloseClass = videoClass + '-close',

    captionClass = _fotoramaClass + '__caption',
    captionWrapClass = _fotoramaClass + '__caption__wrap',

    spinnerClass = _fotoramaClass + '__spinner',

    buttonAttributes = '" tabindex="0" role="button';
var JQUERY_VERSION = $ && $.fn.jquery.split('.');

if (!JQUERY_VERSION
    || JQUERY_VERSION[0] < 1
    || (JQUERY_VERSION[0] == 1 && JQUERY_VERSION[1] < 8)) {
  throw 'Fotorama requires jQuery 1.8 or later and will not run without it.';
}
// My Underscore :-)
var _ = {};
/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransforms3d-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes
 */

var Modernizr = (function (window, document, undefined) {

  var version = '2.6.2',

      Modernizr = {},

      docElement = document.documentElement,

      mod = 'modernizr',
      modElem = document.createElement(mod),
      mStyle = modElem.style,

      inputElem,

      toString = {}.toString,

      prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),

      omPrefixes = 'Webkit Moz O ms',

      cssomPrefixes = omPrefixes.split(' '),

      domPrefixes = omPrefixes.toLowerCase().split(' '),

      tests = {},
      inputs = {},
      attrs = {},

      classes = [],

      slice = classes.slice,

      featureName,

      injectElementWithStyles = function (rule, callback, nodes, testnames) {

        var style, ret, node, docOverflow,
            div = document.createElement('div'),
            body = document.body,
            fakeBody = body || document.createElement('body');

        if (parseInt(nodes, 10)) {
          while (nodes--) {
            node = document.createElement('div');
            node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
            div.appendChild(node);
          }
        }

        style = ['&#173;', '<style id="s', mod, '">', rule, '</style>'].join('');
        div.id = mod;
        (body ? div : fakeBody).innerHTML += style;
        fakeBody.appendChild(div);
        if (!body) {
          fakeBody.style.background = '';
          fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
        }

        ret = callback(div, rule);
        if (!body) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
        } else {
          div.parentNode.removeChild(div);
        }

        return !!ret;

      },
      _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

  if (!is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined')) {
    hasOwnProp = function (object, property) {
      return _hasOwnProperty.call(object, property);
    };
  }
  else {
    hasOwnProp = function (object, property) {
      return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
    };
  }


  if (!Function.prototype.bind) {
    Function.prototype.bind = function bind (that) {

      var target = this;

      if (typeof target != "function") {
        throw new TypeError();
      }

      var args = slice.call(arguments, 1),
          bound = function () {

            if (this instanceof bound) {

              var F = function () {
              };
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

          };

      return bound;
    };
  }

  function setCss (str) {
    mStyle.cssText = str;
  }

  function setCssAll (str1, str2) {
    return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
  }

  function is (obj, type) {
    return typeof obj === type;
  }

  function contains (str, substr) {
    return !!~('' + str).indexOf(substr);
  }

  function testProps (props, prefixed) {
    for (var i in props) {
      var prop = props[i];
      if (!contains(prop, "-") && mStyle[prop] !== undefined) {
        return prefixed == 'pfx' ? prop : true;
      }
    }
    return false;
  }

  function testDOMProps (props, obj, elem) {
    for (var i in props) {
      var item = obj[props[i]];
      if (item !== undefined) {

        if (elem === false) return props[i];

        if (is(item, 'function')) {
          return item.bind(elem || obj);
        }

        return item;
      }
    }
    return false;
  }

  function testPropsAll (prop, prefixed, elem) {

    var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
        props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

    if (is(prefixed, "string") || is(prefixed, "undefined")) {
      return testProps(props, prefixed);

    } else {
      props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
      return testDOMProps(props, prefixed, elem);
    }
  }

  tests['csstransforms3d'] = function () {

    var ret = !!testPropsAll('perspective');

// Chrome fails that test, ignore
//		if (ret && 'webkitPerspective' in docElement.style) {
//
//			injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function (node, rule) {
//				ret = node.offsetLeft === 9 && node.offsetHeight === 3;
//			});
//		}
    return ret;
  };

  for (var feature in tests) {
    if (hasOwnProp(tests, feature)) {
      featureName = feature.toLowerCase();
      Modernizr[featureName] = tests[feature]();

      classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
    }
  }

  Modernizr.addTest = function (feature, test) {
    if (typeof feature == 'object') {
      for (var key in feature) {
        if (hasOwnProp(feature, key)) {
          Modernizr.addTest(key, feature[ key ]);
        }
      }
    } else {

      feature = feature.toLowerCase();

      if (Modernizr[feature] !== undefined) {
        return Modernizr;
      }

      test = typeof test == 'function' ? test() : test;

      if (typeof enableClasses !== "undefined" && enableClasses) {
        docElement.className += ' ' + (test ? '' : 'no-') + feature;
      }
      Modernizr[feature] = test;

    }

    return Modernizr;
  };


  setCss('');
  modElem = inputElem = null;


  Modernizr._version = version;

  Modernizr._prefixes = prefixes;
  Modernizr._domPrefixes = domPrefixes;
  Modernizr._cssomPrefixes = cssomPrefixes;

  Modernizr.testProp = function (prop) {
    return testProps([prop]);
  };

  Modernizr.testAllProps = testPropsAll;

  Modernizr.testStyles = injectElementWithStyles;
  Modernizr.prefixed = function (prop, obj, elem) {
    if (!obj) {
      return testPropsAll(prop, 'pfx');
    } else {
      return testPropsAll(prop, obj, elem);
    }
  };

  return Modernizr;
})(window, document);
var fullScreenApi = {
      ok: false,
      is: function () {
        return false;
      },
      request: function () {
      },
      cancel: function () {
      },
      event: '',
      prefix: ''
    },
    browserPrefixes = 'webkit moz o ms khtml'.split(' ');

// check for native support
if (typeof document.cancelFullScreen != 'undefined') {
  fullScreenApi.ok = true;
} else {
  // check for fullscreen support by vendor prefix
  for (var i = 0, il = browserPrefixes.length; i < il; i++) {
    fullScreenApi.prefix = browserPrefixes[i];
    if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] != 'undefined') {
      fullScreenApi.ok = true;
      break;
    }
  }
}

// update methods to do something useful
if (fullScreenApi.ok) {
  fullScreenApi.event = fullScreenApi.prefix + 'fullscreenchange';
  fullScreenApi.is = function () {
    switch (this.prefix) {
      case '':
        return document.fullScreen;
      case 'webkit':
        return document.webkitIsFullScreen;
      default:
        return document[this.prefix + 'FullScreen'];
    }
  };
  fullScreenApi.request = function (el) {
    return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
  };
  fullScreenApi.cancel = function (el) {
    return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
  };
}
//fgnass.github.com/spin.js#v1.3.2

/**
 * Copyright (c) 2011-2013 Felix Gnass
 * Licensed under the MIT license
 */

var Spinner,
    spinnerDefaults = {
      lines: 12, // The number of lines to draw
      length: 5, // The length of each line
      width: 2, // The line thickness
      radius: 7, // The radius of the inner circle
      corners: 1, // Corner roundness (0..1)
      rotate: 15, // The rotation offset
      color: 'rgba(128, 128, 128, .75)',
      hwaccel: true
    },
    spinnerOverride = {
      top: 'auto',
      left: 'auto',
      className: ''
    };

(function(root, factory) {

  /* CommonJS */
  //if (typeof exports == 'object')  module.exports = factory()

  /* AMD module */
  //else if (typeof define == 'function' && define.amd) define(factory)

  /* Browser global */
  //else root.Spinner = factory()

  Spinner = factory();
}
(this, function() {
  "use strict";

  var prefixes = ['webkit', 'Moz', 'ms', 'O'] /* Vendor prefixes */
    , animations = {} /* Animation rules keyed by their name */
    , useCssAnimations /* Whether to use CSS animations or setTimeout */

  /**
   * Utility function to create elements. If no tag name is given,
   * a DIV is created. Optionally properties can be passed.
   */
  function createEl(tag, prop) {
    var el = document.createElement(tag || 'div')
      , n

    for(n in prop) el[n] = prop[n]
    return el
  }

  /**
   * Appends children and returns the parent.
   */
  function ins(parent /* child1, child2, ...*/) {
    for (var i=1, n=arguments.length; i<n; i++)
      parent.appendChild(arguments[i])

    return parent
  }

  /**
   * Insert a new stylesheet to hold the @keyframe or VML rules.
   */
  var sheet = (function() {
    var el = createEl('style', {type : 'text/css'})
    ins(document.getElementsByTagName('head')[0], el)
    return el.sheet || el.styleSheet
  }())

  /**
   * Creates an opacity keyframe animation rule and returns its name.
   * Since most mobile Webkits have timing issues with animation-delay,
   * we create separate rules for each line/segment.
   */
  function addAnimation(alpha, trail, i, lines) {
    var name = ['opacity', trail, ~~(alpha*100), i, lines].join('-')
      , start = 0.01 + i/lines * 100
      , z = Math.max(1 - (1-alpha) / trail * (100-start), alpha)
      , prefix = useCssAnimations.substring(0, useCssAnimations.indexOf('Animation')).toLowerCase()
      , pre = prefix && '-' + prefix + '-' || ''

    if (!animations[name]) {
      sheet.insertRule(
        '@' + pre + 'keyframes ' + name + '{' +
        '0%{opacity:' + z + '}' +
        start + '%{opacity:' + alpha + '}' +
        (start+0.01) + '%{opacity:1}' +
        (start+trail) % 100 + '%{opacity:' + alpha + '}' +
        '100%{opacity:' + z + '}' +
        '}', sheet.cssRules.length)

      animations[name] = 1
    }

    return name
  }

  /**
   * Tries various vendor prefixes and returns the first supported property.
   */
  function vendor(el, prop) {
    var s = el.style
      , pp
      , i

    prop = prop.charAt(0).toUpperCase() + prop.slice(1)
    for(i=0; i<prefixes.length; i++) {
      pp = prefixes[i]+prop
      if(s[pp] !== undefined) return pp
    }
    if(s[prop] !== undefined) return prop
  }

  /**
   * Sets multiple style properties at once.
   */
  function css(el, prop) {
    for (var n in prop)
      el.style[vendor(el, n)||n] = prop[n]

    return el
  }

  /**
   * Fills in default values.
   */
  function merge(obj) {
    for (var i=1; i < arguments.length; i++) {
      var def = arguments[i]
      for (var n in def)
        if (obj[n] === undefined) obj[n] = def[n]
    }
    return obj
  }

  /**
   * Returns the absolute page-offset of the given element.
   */
  function pos(el) {
    var o = { x:el.offsetLeft, y:el.offsetTop }
    while((el = el.offsetParent))
      o.x+=el.offsetLeft, o.y+=el.offsetTop

    return o
  }

  /**
   * Returns the line color from the given string or array.
   */
  function getColor(color, idx) {
    return typeof color == 'string' ? color : color[idx % color.length]
  }

  // Built-in defaults

  var defaults = {
    lines: 12,            // The number of lines to draw
    length: 7,            // The length of each line
    width: 5,             // The line thickness
    radius: 10,           // The radius of the inner circle
    rotate: 0,            // Rotation offset
    corners: 1,           // Roundness (0..1)
    color: '#000',        // #rgb or #rrggbb
    direction: 1,         // 1: clockwise, -1: counterclockwise
    speed: 1,             // Rounds per second
    trail: 100,           // Afterglow percentage
    opacity: 1/4,         // Opacity of the lines
    fps: 20,              // Frames per second when using setTimeout()
    zIndex: 2e9,          // Use a high z-index by default
    className: 'spinner', // CSS class to assign to the element
    top: 'auto',          // center vertically
    left: 'auto',         // center horizontally
    position: 'relative'  // element position
  }

  /** The constructor */
  function Spinner(o) {
    if (typeof this == 'undefined') return new Spinner(o)
    this.opts = merge(o || {}, Spinner.defaults, defaults)
  }

  // Global defaults that override the built-ins:
  Spinner.defaults = {}

  merge(Spinner.prototype, {

    /**
     * Adds the spinner to the given target element. If this instance is already
     * spinning, it is automatically removed from its previous target b calling
     * stop() internally.
     */
    spin: function(target) {
      this.stop()

      var self = this
        , o = self.opts
        , el = self.el = css(createEl(0, {className: o.className}), {position: o.position, width: 0, zIndex: o.zIndex})
        , mid = o.radius+o.length+o.width
        , ep // element position
        , tp // target position

      if (target) {
        target.insertBefore(el, target.firstChild||null)
        tp = pos(target)
        ep = pos(el)
        css(el, {
          left: (o.left == 'auto' ? tp.x-ep.x + (target.offsetWidth >> 1) : parseInt(o.left, 10) + mid) + 'px',
          top: (o.top == 'auto' ? tp.y-ep.y + (target.offsetHeight >> 1) : parseInt(o.top, 10) + mid)  + 'px'
        })
      }

      el.setAttribute('role', 'progressbar')
      self.lines(el, self.opts)

      if (!useCssAnimations) {
        // No CSS animation support, use setTimeout() instead
        var i = 0
          , start = (o.lines - 1) * (1 - o.direction) / 2
          , alpha
          , fps = o.fps
          , f = fps/o.speed
          , ostep = (1-o.opacity) / (f*o.trail / 100)
          , astep = f/o.lines

        ;(function anim() {
          i++;
          for (var j = 0; j < o.lines; j++) {
            alpha = Math.max(1 - (i + (o.lines - j) * astep) % f * ostep, o.opacity)

            self.opacity(el, j * o.direction + start, alpha, o)
          }
          self.timeout = self.el && setTimeout(anim, ~~(1000/fps))
        })()
      }
      return self
    },

    /**
     * Stops and removes the Spinner.
     */
    stop: function() {
      var el = this.el
      if (el) {
        clearTimeout(this.timeout)
        if (el.parentNode) el.parentNode.removeChild(el)
        this.el = undefined
      }
      return this
    },

    /**
     * Internal method that draws the individual lines. Will be overwritten
     * in VML fallback mode below.
     */
    lines: function(el, o) {
      var i = 0
        , start = (o.lines - 1) * (1 - o.direction) / 2
        , seg

      function fill(color, shadow) {
        return css(createEl(), {
          position: 'absolute',
          width: (o.length+o.width) + 'px',
          height: o.width + 'px',
          background: color,
          boxShadow: shadow,
          transformOrigin: 'left',
          transform: 'rotate(' + ~~(360/o.lines*i+o.rotate) + 'deg) translate(' + o.radius+'px' +',0)',
          borderRadius: (o.corners * o.width>>1) + 'px'
        })
      }

      for (; i < o.lines; i++) {
        seg = css(createEl(), {
          position: 'absolute',
          top: 1+~(o.width/2) + 'px',
          transform: o.hwaccel ? 'translate3d(0,0,0)' : '',
          opacity: o.opacity,
          animation: useCssAnimations && addAnimation(o.opacity, o.trail, start + i * o.direction, o.lines) + ' ' + 1/o.speed + 's linear infinite'
        })

        if (o.shadow) ins(seg, css(fill('#000', '0 0 4px ' + '#000'), {top: 2+'px'}))
        ins(el, ins(seg, fill(getColor(o.color, i), '0 0 1px rgba(0,0,0,.1)')))
      }
      return el
    },

    /**
     * Internal method that adjusts the opacity of a single line.
     * Will be overwritten in VML fallback mode below.
     */
    opacity: function(el, i, val) {
      if (i < el.childNodes.length) el.childNodes[i].style.opacity = val
    }

  })


  function initVML() {

    /* Utility function to create a VML tag */
    function vml(tag, attr) {
      return createEl('<' + tag + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', attr)
    }

    // No CSS transforms but VML support, add a CSS rule for VML elements:
    sheet.addRule('.spin-vml', 'behavior:url(#default#VML)')

    Spinner.prototype.lines = function(el, o) {
      var r = o.length+o.width
        , s = 2*r

      function grp() {
        return css(
          vml('group', {
            coordsize: s + ' ' + s,
            coordorigin: -r + ' ' + -r
          }),
          { width: s, height: s }
        )
      }

      var margin = -(o.width+o.length)*2 + 'px'
        , g = css(grp(), {position: 'absolute', top: margin, left: margin})
        , i

      function seg(i, dx, filter) {
        ins(g,
          ins(css(grp(), {rotation: 360 / o.lines * i + 'deg', left: ~~dx}),
            ins(css(vml('roundrect', {arcsize: o.corners}), {
                width: r,
                height: o.width,
                left: o.radius,
                top: -o.width>>1,
                filter: filter
              }),
              vml('fill', {color: getColor(o.color, i), opacity: o.opacity}),
              vml('stroke', {opacity: 0}) // transparent stroke to fix color bleeding upon opacity change
            )
          )
        )
      }

      if (o.shadow)
        for (i = 1; i <= o.lines; i++)
          seg(i, -2, 'progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)')

      for (i = 1; i <= o.lines; i++) seg(i)
      return ins(el, g)
    }

    Spinner.prototype.opacity = function(el, i, val, o) {
      var c = el.firstChild
      o = o.shadow && o.lines || 0
      if (c && i+o < c.childNodes.length) {
        c = c.childNodes[i+o]; c = c && c.firstChild; c = c && c.firstChild
        if (c) c.opacity = val
      }
    }
  }

  var probe = css(createEl('group'), {behavior: 'url(#default#VML)'})

  if (!vendor(probe, 'transform') && probe.adj) initVML()
  else useCssAnimations = vendor(probe, 'animation')

  return Spinner

}));

/* Bez v1.0.10-g5ae0136
 * http://github.com/rdallasgray/bez
 *
 * A plugin to convert CSS3 cubic-bezier co-ordinates to jQuery-compatible easing functions
 *
 * With thanks to Nikolay Nemshilov for clarification on the cubic-bezier maths
 * See http://st-on-it.blogspot.com/2011/05/calculating-cubic-bezier-function.html
 *
 * Copyright 2011 Robert Dallas Gray. All rights reserved.
 * Provided under the FreeBSD license: https://github.com/rdallasgray/bez/blob/master/LICENSE.txt
 */
function bez (coOrdArray) {
  var encodedFuncName = "bez_" + $.makeArray(arguments).join("_").replace(".", "p");
  if (typeof $['easing'][encodedFuncName] !== "function") {
    var polyBez = function (p1, p2) {
      var A = [null, null],
          B = [null, null],
          C = [null, null],
          bezCoOrd = function (t, ax) {
            C[ax] = 3 * p1[ax];
            B[ax] = 3 * (p2[ax] - p1[ax]) - C[ax];
            A[ax] = 1 - C[ax] - B[ax];
            return t * (C[ax] + t * (B[ax] + t * A[ax]));
          },
          xDeriv = function (t) {
            return C[0] + t * (2 * B[0] + 3 * A[0] * t);
          },
          xForT = function (t) {
            var x = t, i = 0, z;
            while (++i < 14) {
              z = bezCoOrd(x, 0) - t;
              if (Math.abs(z) < 1e-3) break;
              x -= z / xDeriv(x);
            }
            return x;
          };
      return function (t) {
        return bezCoOrd(xForT(t), 1);
      }
    };
    $['easing'][encodedFuncName] = function (x, t, b, c, d) {
      return c * polyBez([coOrdArray[0], coOrdArray[1]], [coOrdArray[2], coOrdArray[3]])(t / d) + b;
    }
  }
  return encodedFuncName;
}
var $WINDOW = $(window),
    $DOCUMENT = $(document),
    $HTML,
    $BODY,

    QUIRKS_FORCE = location.hash.replace('#', '') === 'quirks',
    TRANSFORMS3D = Modernizr.csstransforms3d,
    CSS3 = TRANSFORMS3D && !QUIRKS_FORCE,
    COMPAT = TRANSFORMS3D || document.compatMode === 'CSS1Compat',
    FULLSCREEN = fullScreenApi.ok,

    MOBILE = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),
    SLOW = !CSS3 || MOBILE,

    MS_POINTER = navigator.msPointerEnabled,

    WHEEL = "onwheel" in document.createElement("div") ? "wheel" : document.onmousewheel !== undefined ? "mousewheel" : "DOMMouseScroll",

    TOUCH_TIMEOUT = 250,
    TRANSITION_DURATION = 300,

    SCROLL_LOCK_TIMEOUT = 1400,

    AUTOPLAY_INTERVAL = 5000,
    MARGIN = 2,
    THUMB_SIZE = 64,

    WIDTH = 500,
    HEIGHT = 333,

    STAGE_FRAME_KEY = '$stageFrame',
    NAV_DOT_FRAME_KEY = '$navDotFrame',
    NAV_THUMB_FRAME_KEY = '$navThumbFrame',

    AUTO = 'auto',

    BEZIER = bez([.1, 0, .25, 1]),

    MAX_WIDTH = 99999,

    FIFTYFIFTY = '50%',

    OPTIONS = {
      // dimensions
      width: null, // 500 || '100%'
      minwidth: null,
      maxwidth: '100%', // '100%'
      height: null,
      minheight: null,
      maxheight: null,

      ratio: null, // '16/9' || 500/333 || 1.5

      margin: MARGIN,
      glimpse: 0,

      fit: 'contain', // 'cover' || 'scaledown' || 'none'

      position: FIFTYFIFTY,
      thumbposition: FIFTYFIFTY,

      // navigation, thumbs
      nav: 'dots', // 'thumbs' || false
      navposition: 'bottom', // 'top'
      navwidth: null,
      thumbwidth: THUMB_SIZE,
      thumbheight: THUMB_SIZE,
      thumbmargin: MARGIN,
      thumbborderwidth: MARGIN,
      thumbfit: 'cover', // 'contain' || 'scaledown' || 'none'

      allowfullscreen: false, // true || 'native'

      transition: 'slide', // 'crossfade' || 'dissolve'
      clicktransition: null,
      transitionduration: TRANSITION_DURATION,

      captions: true,

      hash: false,
      startindex: 0,

      loop: false,

      autoplay: false,
      stopautoplayontouch: true,

      keyboard: false,

      arrows: true,
      click: true,
      swipe: true,
      trackpad: false,

      enableifsingleframe: false,

      controlsonstart: true,

      shuffle: false,

      direction: 'ltr', // 'rtl'

      shadows: true,
      spinner: null
    },

    KEYBOARD_OPTIONS = {
      left: true,
      right: true,
      down: false,
      up: false,
      space: false,
      home: false,
      end: false
    };
function noop () {}

function minMaxLimit (value, min, max) {
  return Math.max(isNaN(min) ? -Infinity : min, Math.min(isNaN(max) ? Infinity : max, value));
}

function readTransform (css) {
  return css.match(/ma/) && css.match(/-?\d+(?!d)/g)[css.match(/3d/) ? 12 : 4];
}

function readPosition ($el) {
  if (CSS3) {
    return +readTransform($el.css('transform'));
  } else {
    return +$el.css('left').replace('px', '');
  }
}

function getTranslate (pos/*, _001*/) {
  var obj = {};
  if (CSS3) {
    obj.transform = 'translate3d(' + (pos/* + (_001 ? 0.001 : 0)*/) + 'px,0,0)'; // 0.001 to remove Retina artifacts
  } else {
    obj.left = pos;
  }
  return obj;
}

function getDuration (time) {
  return {'transition-duration': time + 'ms'};
}

function unlessNaN (value, alternative) {
  return isNaN(value) ? alternative : value;
}

function numberFromMeasure (value, measure) {
  return unlessNaN(+String(value).replace(measure || 'px', ''));
}

function numberFromPercent (value) {
  return /%$/.test(value) ? numberFromMeasure(value, '%') : undefined;
}

function numberFromWhatever (value, whole) {
  return unlessNaN(numberFromPercent(value) / 100 * whole, numberFromMeasure(value));
}

function measureIsValid (value) {
  return (!isNaN(numberFromMeasure(value)) || !isNaN(numberFromMeasure(value, '%'))) && value;
}

function getPosByIndex (index, side, margin, baseIndex) {
  ////console.log('getPosByIndex', index, side, margin, baseIndex);
  ////console.log((index - (baseIndex || 0)) * (side + (margin || 0)));

  return (index - (baseIndex || 0)) * (side + (margin || 0));
}

function getIndexByPos (pos, side, margin, baseIndex) {
  return -Math.round(pos / (side + (margin || 0)) - (baseIndex || 0));
}

function bindTransitionEnd ($el) {
  var elData = $el.data();

  if (elData.tEnd) return;

  var el = $el[0],
      transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'oTransitionEnd otransitionend',
        msTransition: 'MSTransitionEnd',
        transition: 'transitionend'
      };
  addEvent(el, transitionEndEvent[Modernizr.prefixed('transition')], function (e) {
    elData.tProp && e.propertyName.match(elData.tProp) && elData.onEndFn();
  });
  elData.tEnd = true;
}

function afterTransition ($el, property, fn, time) {
  var ok,
      elData = $el.data();

  if (elData) {
    elData.onEndFn = function () {
      if (ok) return;
      ok = true;
      clearTimeout(elData.tT);
      fn();
    };
    elData.tProp = property;

    // Passive call, just in case of fail of native transition-end event
    clearTimeout(elData.tT);
    elData.tT = setTimeout(function () {
      elData.onEndFn();
    }, time * 1.5);

    bindTransitionEnd($el);
  }
}


function stop ($el, left/*, _001*/) {
  if ($el.length) {
    var elData = $el.data();
    if (CSS3) {
      $el.css(getDuration(0));
      elData.onEndFn = noop;
      clearTimeout(elData.tT);
    } else {
      $el.stop();
    }
    var lockedLeft = getNumber(left, function () {
      return readPosition($el);
    });

    $el.css(getTranslate(lockedLeft/*, _001*/));//.width(); // `.width()` for reflow
    return lockedLeft;
  }
}

function getNumber () {
  var number;
  for (var _i = 0, _l = arguments.length; _i < _l; _i++) {
    number = _i ? arguments[_i]() : arguments[_i];
    if (typeof number === 'number') {
      break;
    }
  }

  return number;
}

function edgeResistance (pos, edge) {
  return Math.round(pos + ((edge - pos) / 1.5));
}

function getProtocol () {
  getProtocol.p = getProtocol.p || (location.protocol === 'https:' ? 'https://' : 'http://');
  return getProtocol.p;
}

function parseHref (href) {
  var a = document.createElement('a');
  a.href = href;
  return a;
}

function findVideoId (href, forceVideo) {
  if (typeof href !== 'string') return href;
  href = parseHref(href);

  var id,
      type;

  if (href.host.match(/youtube\.com/) && href.search) {
    //.log();
    id = href.search.split('v=')[1];
    if (id) {
      var ampersandPosition = id.indexOf('&');
      if (ampersandPosition !== -1) {
        id = id.substring(0, ampersandPosition);
      }
      type = 'youtube';
    }
  } else if (href.host.match(/youtube\.com|youtu\.be/)) {
    id = href.pathname.replace(/^\/(embed\/|v\/)?/, '').replace(/\/.*/, '');
    type = 'youtube';
  } else if (href.host.match(/vimeo\.com/)) {
    type = 'vimeo';
    id = href.pathname.replace(/^\/(video\/)?/, '').replace(/\/.*/, '');
  }

  if ((!id || !type) && forceVideo) {
    id = href.href;
    type = 'custom';
  }

  return id ? {id: id, type: type, s: href.search.replace(/^\?/, ''), p: getProtocol()} : false;
}

function getVideoThumbs (dataFrame, data, fotorama) {
  var img, thumb, video = dataFrame.video;
  if (video.type === 'youtube') {
    thumb = getProtocol() + 'img.youtube.com/vi/' + video.id + '/default.jpg';
    img = thumb.replace(/\/default.jpg$/, '/hqdefault.jpg');
    dataFrame.thumbsReady = true;
  } else if (video.type === 'vimeo') {
    $.ajax({
      url: getProtocol() + 'vimeo.com/api/v2/video/' + video.id + '.json',
      dataType: 'jsonp',
      success: function (json) {
        dataFrame.thumbsReady = true;
        updateData(data, {img: json[0].thumbnail_large, thumb: json[0].thumbnail_small}, dataFrame.i, fotorama);
      }
    });
  } else {
    dataFrame.thumbsReady = true;
  }

  return {
    img: img,
    thumb: thumb
  }
}

function updateData (data, _dataFrame, i, fotorama) {
  for (var _i = 0, _l = data.length; _i < _l; _i++) {
    var dataFrame = data[_i];

    if (dataFrame.i === i && dataFrame.thumbsReady) {
      var clear = {videoReady: true};
      clear[STAGE_FRAME_KEY] = clear[NAV_THUMB_FRAME_KEY] = clear[NAV_DOT_FRAME_KEY] = false;

      fotorama.splice(_i, 1, $.extend(
          {},
          dataFrame,
          clear,
          _dataFrame
      ));

      break;
    }
  }
}

function getDataFromHtml ($el) {
  var data = [];

  function getDataFromImg ($img, imgData, checkVideo) {
    var $child = $img.children('img').eq(0),
        _imgHref = $img.attr('href'),
        _imgSrc = $img.attr('src'),
        _thumbSrc = $child.attr('src'),
        _video = imgData.video,
        video = checkVideo ? findVideoId(_imgHref, _video === true) : false;

    if (video) {
      _imgHref = false;
    } else {
      video = _video;
    }

    getDimensions($img, $child, $.extend(imgData, {
      video: video,
      img: imgData.img || _imgHref || _imgSrc || _thumbSrc,
      thumb: imgData.thumb || _thumbSrc || _imgSrc || _imgHref
    }));
  }

  function getDimensions ($img, $child, imgData) {
    var separateThumbFLAG = imgData.thumb && imgData.img !== imgData.thumb,
        width = numberFromMeasure(imgData.width || $img.attr('width')),
        height = numberFromMeasure(imgData.height || $img.attr('height'));

    $.extend(imgData, {
      width: width,
      height: height,
      thumbratio: getRatio(imgData.thumbratio || (numberFromMeasure(imgData.thumbwidth || ($child && $child.attr('width')) || separateThumbFLAG || width) / numberFromMeasure(imgData.thumbheight || ($child && $child.attr('height')) || separateThumbFLAG || height)))
    });
  }

  $el.children().each(function () {
    var $this = $(this),
        dataFrame = optionsToLowerCase($.extend($this.data(), {id: $this.attr('id')}));
    if ($this.is('a, img')) {
      getDataFromImg($this, dataFrame, true);
    } else if (!$this.is(':empty')) {
      getDimensions($this, null, $.extend(dataFrame, {
        html: this,
        _html: $this.html() // Because of IE
      }));
    } else return;

    data.push(dataFrame);
  });

  return data;
}

function isHidden (el) {
  return el.offsetWidth === 0 && el.offsetHeight === 0;
}

function isDetached (el) {
  return !$.contains(document.documentElement, el);
}

function waitFor (test, fn, timeout, i) {
  if (!waitFor.i) {
    waitFor.i = 1;
    waitFor.ii = [true];
  }

  i = i || waitFor.i;

  if (typeof waitFor.ii[i] === 'undefined') {
    waitFor.ii[i] = true;
  }

  if (test()) {
    fn();
  } else {
    waitFor.ii[i] && setTimeout(function () {
      waitFor.ii[i] && waitFor(test, fn, timeout, i);
    }, timeout || 100);
  }

  return waitFor.i++;
}

waitFor.stop = function (i) {
  waitFor.ii[i] = false;
};

function setHash (hash) {
  //////console.time('setHash ' + hash);
  location.replace(location.protocol
      + '//'
      + location.host
      + location.pathname.replace(/^\/?/, '/')
      + location.search
      + '#' + hash);
  //////console.timeEnd('setHash ' + hash);
}

function fit ($el, measuresToFit, method, position) {
  var elData = $el.data(),
      measures = elData.measures;

  if (measures && (!elData.l ||
      elData.l.W !== measures.width ||
      elData.l.H !== measures.height ||
      elData.l.r !== measures.ratio ||
      elData.l.w !== measuresToFit.w ||
      elData.l.h !== measuresToFit.h ||
      elData.l.m !== method ||
      elData.l.p !== position)) {

    //console.log('fit');

    var width = measures.width,
        height = measures.height,
        ratio = measuresToFit.w / measuresToFit.h,
        biggerRatioFLAG = measures.ratio >= ratio,
        fitFLAG = method === 'scaledown',
        containFLAG = method === 'contain',
        coverFLAG = method === 'cover',
        pos = parsePosition(position);

    if (biggerRatioFLAG && (fitFLAG || containFLAG) || !biggerRatioFLAG && coverFLAG) {
      width = minMaxLimit(measuresToFit.w, 0, fitFLAG ? width : Infinity);
      height = width / measures.ratio;
    } else if (biggerRatioFLAG && coverFLAG || !biggerRatioFLAG && (fitFLAG || containFLAG)) {
      height = minMaxLimit(measuresToFit.h, 0, fitFLAG ? height : Infinity);
      width = height * measures.ratio;
    }

    $el.css({
      width: Math.ceil(width),
      height: Math.ceil(height),
      left: Math.floor(numberFromWhatever(pos.x, measuresToFit.w - width)),
      top: Math.floor(numberFromWhatever(pos.y, measuresToFit.h- height))
    });

    elData.l = {
      W: measures.width,
      H: measures.height,
      r: measures.ratio,
      w: measuresToFit.w,
      h: measuresToFit.h,
      m: method,
      p: position
    };
  }

  return true;
}

function setStyle ($el, style) {
  var el = $el[0];
  if (el.styleSheet) {
    el.styleSheet.cssText = style;
  } else {
    $el.html(style);
  }
}

function findShadowEdge (pos, min, max) {
  return min === max ? false : pos <= min ? 'left' : pos >= max ? 'right' : 'left right';
}

function getIndexFromHash (hash, data, ok, startindex) {
  if (!ok) return false;
  if (!isNaN(hash)) return hash - (startindex ? 0 : 1);

  var index;

  for (var _i = 0, _l = data.length; _i < _l; _i++) {
    var dataFrame = data[_i];

    if (dataFrame.id === hash) {
      index = _i;
      break;
    }
  }

  return index;
}

function smartClick ($el, fn, _options) {
  _options = _options || {};

  $el.each(function () {
    var $this = $(this),
        thisData = $this.data(),
        startEvent;

    if (thisData.clickOn) return;

    thisData.clickOn = true;

    $.extend(touch($this, {
      onStart: function (e) {
        startEvent = e;
        (_options.onStart || noop).call(this, e);
      },
      onMove: _options.onMove || noop,
      onTouchEnd: _options.onTouchEnd || noop,
      onEnd: function (result) {
        ////console.log('smartClick → result.moved', result.moved);
        if (result.moved) return;
        fn.call(this, startEvent);
      }
    }), {noMove: true});
  });
}

function div (classes, child) {
  return '<div class="' + classes + '">' + (child || '') + '</div>';
}

// Fisher–Yates Shuffle
// http://bost.ocks.org/mike/shuffle/
function shuffle (array) {
  // While there remain elements to shuffle
  var l = array.length;
  while (l) {
    // Pick a remaining element
    var i = Math.floor(Math.random() * l--);

    // And swap it with the current element
    var t = array[l];
    array[l] = array[i];
    array[i] = t;
  }

  return array;
}

function clone (array) {
  return Object.prototype.toString.call(array) == '[object Array]'
      && $.map(array, function (frame) {
       return $.extend({}, frame);
      });
}

function lockScroll ($el, left, top) {
  $el
    .scrollLeft(left || 0)
    .scrollTop(top || 0);
}

function optionsToLowerCase (options) {
  if (options) {
    var opts = {};
    $.each(options, function (key, value) {
      opts[key.toLowerCase()] = value;
    });

    return opts;
  }
}

function getRatio (_ratio) {
  if (!_ratio) return;
  var ratio = +_ratio;
  if (!isNaN(ratio)) {
    return ratio;
  } else {
    ratio = _ratio.split('/');
    return +ratio[0] / +ratio[1] || undefined;
  }
}

function addEvent (el, e, fn, bool) {
  if (!e) return;
  el.addEventListener ? el.addEventListener(e, fn, !!bool) : el.attachEvent('on'+e, fn);
}

function elIsDisabled (el) {
  return !!el.getAttribute('disabled');
}

function disableAttr (FLAG) {
  return {tabindex: FLAG * -1 + '', disabled: FLAG};
}

function addEnterUp (el, fn) {
  addEvent(el, 'keyup', function (e) {
    elIsDisabled(el) || e.keyCode == 13 && fn.call(el, e);
  });
}

function addFocus (el, fn) {
  addEvent(el, 'focus', el.onfocusin = function (e) {
    fn.call(el, e);
  }, true);
}

function stopEvent (e, stopPropagation) {
  e.preventDefault ? e.preventDefault() : (e.returnValue = false);
  stopPropagation && e.stopPropagation && e.stopPropagation();
}

function getDirectionSign (forward) {
  return forward ? '>' : '<';
}

function parsePosition (rule) {
  rule = (rule + '').split(/\s+/);
  return {
    x: measureIsValid(rule[0]) || FIFTYFIFTY,
    y: measureIsValid(rule[1]) || FIFTYFIFTY
  }
}
function slide ($el, options) {
  var elData = $el.data(),
      elPos = Math.round(options.pos),
      onEndFn = function () {
        elData.sliding = false;
        (options.onEnd || noop)();
      };

  if (typeof options.overPos !== 'undefined' && options.overPos !== options.pos) {
    elPos = options.overPos;
    onEndFn = function () {
      slide($el, $.extend({}, options, {overPos: options.pos, time: Math.max(TRANSITION_DURATION, options.time / 2)}))
    };
  }

  ////////console.time('var translate = $.extend');
  var translate = $.extend(getTranslate(elPos/*, options._001*/), options.width && {width: options.width});
  ////////console.timeEnd('var translate = $.extend');

  elData.sliding = true;

  if (CSS3) {
    $el.css($.extend(getDuration(options.time), translate));
    if (options.time > 10) {
      ////////console.time('afterTransition');
      afterTransition($el, 'transform', onEndFn, options.time);
      ////////console.timeEnd('afterTransition');
    } else {
      onEndFn();
    }
  } else {
    $el.stop().animate(translate, options.time, BEZIER, onEndFn);
  }
}

function fade ($el1, $el2, $frames, options, fadeStack, chain) {
  var chainedFLAG = typeof chain !== 'undefined';
  if (!chainedFLAG) {
    fadeStack.push(arguments);
    Array.prototype.push.call(arguments, fadeStack.length);
    if (fadeStack.length > 1) return;
  }

  $el1 = $el1 || $($el1);
  $el2 = $el2 || $($el2);

  var _$el1 = $el1[0],
      _$el2 = $el2[0],
      crossfadeFLAG = options.method === 'crossfade',
      onEndFn = function () {
        if (!onEndFn.done) {
          onEndFn.done = true;
          var args = (chainedFLAG || fadeStack.shift()) && fadeStack.shift();
          args && fade.apply(this, args);
          (options.onEnd || noop)(!!args);
        }
      },
      time = options.time / (chain || 1);

  $frames.removeClass(fadeRearClass + ' ' + fadeFrontClass);

  $el1
      .stop()
      .addClass(fadeRearClass);
  $el2
      .stop()
      .addClass(fadeFrontClass);

  crossfadeFLAG && _$el2 && $el1.fadeTo(0, 0);

  $el1.fadeTo(crossfadeFLAG ? time : 0, 1, crossfadeFLAG && onEndFn);
  $el2.fadeTo(time, 0, onEndFn);

  (_$el1 && crossfadeFLAG) || _$el2 || onEndFn();
}
var lastEvent,
    moveEventType,
    preventEvent,
    preventEventTimeout;

function extendEvent (e) {
  var touch = (e.touches || [])[0] || e;
  e._x = touch.pageX;
  e._y = touch.clientY;
  e._now = $.now();
}

function touch ($el, options) {
  var el = $el[0],
      tail = {},
      touchEnabledFLAG,
      startEvent,
      $target,
      controlTouch,
      touchFLAG,
      targetIsSelectFLAG,
      targetIsLinkFlag,
      tolerance,
      moved;

  function onStart (e) {
    $target = $(e.target);
    tail.checked = targetIsSelectFLAG = targetIsLinkFlag = moved = false;

    if (touchEnabledFLAG
        || tail.flow
        || (e.touches && e.touches.length > 1)
        || e.which > 1
        || (lastEvent && lastEvent.type !== e.type && preventEvent)
        || (targetIsSelectFLAG = options.select && $target.is(options.select, el))) return targetIsSelectFLAG;

    touchFLAG = e.type === 'touchstart';
    targetIsLinkFlag = $target.is('a, a *', el);
    controlTouch = tail.control;

    tolerance = (tail.noMove || tail.noSwipe || controlTouch) ? 16 : !tail.snap ? 4 : 0;

    extendEvent(e);

    startEvent = lastEvent = e;
    moveEventType = e.type.replace(/down|start/, 'move').replace(/Down/, 'Move');

    (options.onStart || noop).call(el, e, {control: controlTouch, $target: $target});

    touchEnabledFLAG = tail.flow = true;

    if (!touchFLAG || tail.go) stopEvent(e);
  }

  function onMove (e) {
    if ((e.touches && e.touches.length > 1)
        || (MS_POINTER && !e.isPrimary)
        || moveEventType !== e.type
        || !touchEnabledFLAG) {
      touchEnabledFLAG && onEnd();
      (options.onTouchEnd || noop)();
      return;
    }

    extendEvent(e);

    var xDiff = Math.abs(e._x - startEvent._x), // opt _x → _pageX
        yDiff = Math.abs(e._y - startEvent._y),
        xyDiff = xDiff - yDiff,
        xWin = (tail.go || tail.x || xyDiff >= 0) && !tail.noSwipe,
        yWin = xyDiff < 0;

    if (touchFLAG && !tail.checked) {
      if (touchEnabledFLAG = xWin) {
        stopEvent(e);
      }
    } else {
      ////console.log('onMove e.preventDefault');
      stopEvent(e);
      (options.onMove || noop).call(el, e, {touch: touchFLAG});
    }

    if (!moved && Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)) > tolerance) {
      moved = true;
    }

    tail.checked = tail.checked || xWin || yWin;
  }

  function onEnd (e) {
    //////console.time('touch.js onEnd');

    (options.onTouchEnd || noop)();

    var _touchEnabledFLAG = touchEnabledFLAG;
    tail.control = touchEnabledFLAG = false;

    if (_touchEnabledFLAG) {
      tail.flow = false;
    }

    if (!_touchEnabledFLAG || (targetIsLinkFlag && !tail.checked)) return;

    e && stopEvent(e);

    preventEvent = true;
    clearTimeout(preventEventTimeout);
    preventEventTimeout = setTimeout(function () {
      preventEvent = false;
    }, 1000);

    (options.onEnd || noop).call(el, {moved: moved, $target: $target, control: controlTouch, touch: touchFLAG, startEvent: startEvent, aborted: !e || e.type === 'MSPointerCancel'});
    //////console.timeEnd('touch.js onEnd');
  }

  function onOtherStart () {
    if (tail.flow) return;
    setTimeout(function () {
      tail.flow = true;
    }, 10);
  }

  function onOtherEnd () {
    if (!tail.flow) return;
    setTimeout(function () {
      tail.flow = false;
    }, TOUCH_TIMEOUT);
  }

  if (MS_POINTER) {
    addEvent(el, 'MSPointerDown', onStart);
    addEvent(document, 'MSPointerMove', onMove);
    addEvent(document,'MSPointerCancel', onEnd);
    addEvent(document, 'MSPointerUp', onEnd);
  } else {
    addEvent(el, 'touchstart', onStart);
    addEvent(el, 'touchmove', onMove);
    addEvent(el, 'touchend', onEnd);

    addEvent(document, 'touchstart', onOtherStart);
    addEvent(document, 'touchend', onOtherEnd);
    addEvent(document, 'touchcancel', onOtherEnd);

    $WINDOW.on('scroll', onOtherEnd);

    $el.on('mousedown', onStart);
    $DOCUMENT
        .on('mousemove', onMove)
        .on('mouseup', onEnd);
  }

  $el.on('click', 'a', function (e) {
    tail.checked && stopEvent(e);
  });

  return tail;
}

function moveOnTouch ($el, options) {
  var el = $el[0],
      elData = $el.data(),
      tail = {},
      startCoo,
      coo,
      startElPos,
      moveElPos,
      edge,
      moveTrack,
      startTime,
      endTime,
      min,
      max,
      snap,
      slowFLAG,
      controlFLAG,
      moved,
      tracked;

  function startTracking (e, noStop) {
    tracked = true;
    startCoo = coo = e._x;
    startTime = e._now;

    moveTrack = [
      [startTime, startCoo]
    ];

    startElPos = moveElPos = tail.noMove || noStop ? 0 : stop($el, (options.getPos || noop)()/*, options._001*/);

    (options.onStart || noop).call(el, e);
  }

  function onStart (e, result) {
    min = tail.min;
    max = tail.max;
    snap = tail.snap;

    slowFLAG = e.altKey;
    tracked = moved = false;

    controlFLAG = result.control;

    if (!controlFLAG && !elData.sliding) {
      startTracking(e);
    }
  }

  function onMove (e, result) {
    if (!tail.noSwipe) {
      if (!tracked) {
        startTracking(e);
      }

      coo = e._x;

      moveTrack.push([e._now, coo]);

      moveElPos = startElPos - (startCoo - coo);

      edge = findShadowEdge(moveElPos, min, max);

      if (moveElPos <= min) {
        moveElPos = edgeResistance(moveElPos, min);
      } else if (moveElPos >= max) {
        moveElPos = edgeResistance(moveElPos, max);
      }

      if (!tail.noMove) {
        $el.css(getTranslate(moveElPos/*, options._001*/));
        if (!moved) {
          moved = true;
          // only for mouse
          result.touch || MS_POINTER || $el.addClass(grabbingClass);
        }

        (options.onMove || noop).call(el, e, {pos: moveElPos, edge: edge});
      }
    }
  }

  function onEnd (result) {
    //////console.time('moveontouch.js onEnd');
    if (tail.noSwipe && result.moved) return;

    if (!tracked) {
      startTracking(result.startEvent, true);
    }

    ////console.log('onEnd');

    result.touch || MS_POINTER || $el.removeClass(grabbingClass);

    endTime = $.now();

    var _backTimeIdeal = endTime - TOUCH_TIMEOUT,
        _backTime,
        _timeDiff,
        _timeDiffLast,
        backTime = null,
        backCoo,
        virtualPos,
        limitPos,
        newPos,
        overPos,
        time = TRANSITION_DURATION,
        speed,
        friction = options.friction;

    for (var _i = moveTrack.length - 1; _i >= 0; _i--) {
      _backTime = moveTrack[_i][0];
      _timeDiff = Math.abs(_backTime - _backTimeIdeal);
      if (backTime === null || _timeDiff < _timeDiffLast) {
        backTime = _backTime;
        backCoo = moveTrack[_i][1];
      } else if (backTime === _backTimeIdeal || _timeDiff > _timeDiffLast) {
        break;
      }
      _timeDiffLast = _timeDiff;
    }

    newPos = minMaxLimit(moveElPos, min, max);

    var cooDiff = backCoo - coo,
        forwardFLAG = cooDiff >= 0,
        timeDiff = endTime - backTime,
        longTouchFLAG = timeDiff > TOUCH_TIMEOUT,
        swipeFLAG = !longTouchFLAG && moveElPos !== startElPos && newPos === moveElPos;

    if (snap) {
      newPos = minMaxLimit(Math[swipeFLAG ? (forwardFLAG ? 'floor' : 'ceil') : 'round'](moveElPos / snap) * snap, min, max);
      min = max = newPos;
    }

    if (swipeFLAG && (snap || newPos === moveElPos)) {
      speed = -(cooDiff / timeDiff);
      time *= minMaxLimit(Math.abs(speed), options.timeLow, options.timeHigh);
      virtualPos = Math.round(moveElPos + speed * time / friction);

      if (!snap) {
        newPos = virtualPos;
      }

      if (!forwardFLAG && virtualPos > max || forwardFLAG && virtualPos < min) {
        limitPos = forwardFLAG ? min : max;
        overPos = virtualPos - limitPos;
        if (!snap) {
          newPos = limitPos;
        }
        overPos = minMaxLimit(newPos + overPos * .03, limitPos - 50, limitPos + 50);
        time = Math.abs((moveElPos - overPos) / (speed / friction));
      }
    }

    time *= slowFLAG ? 10 : 1;

    (options.onEnd || noop).call(el, $.extend(result, {moved: result.moved || longTouchFLAG && snap, pos: moveElPos, newPos: newPos, overPos: overPos, time: time}));
  }

  tail = $.extend(touch(options.$wrap, $.extend({}, options, {
    onStart: onStart,
    onMove: onMove,
    onEnd: onEnd
  })), tail);

  return tail;
}
function wheel ($el, options) {
  var el = $el[0],
      lockFLAG,
      lastDirection,
      lastNow,
      tail = {
        prevent: {}
      };

  addEvent(el, WHEEL, function (e) {
    var yDelta = e.wheelDeltaY || -1 * e.deltaY || 0,
        xDelta = e.wheelDeltaX || -1 * e.deltaX || 0,
        xWin = Math.abs(xDelta) && !Math.abs(yDelta),
        direction = getDirectionSign(xDelta < 0),
        sameDirection = lastDirection === direction,
        now = $.now(),
        tooFast = now - lastNow < TOUCH_TIMEOUT;

    lastDirection = direction;
    lastNow = now;

    if (!xWin || !tail.ok || tail.prevent[direction] && !lockFLAG) {
      return;
    } else {
      stopEvent(e, true);
      if (lockFLAG && sameDirection && tooFast) {
        return;
      }
    }

    if (options.shift) {
      lockFLAG = true;
      clearTimeout(tail.t);
      tail.t = setTimeout(function () {
        lockFLAG = false;
      }, SCROLL_LOCK_TIMEOUT);
    }

    (options.onEnd || noop)(e, options.shift ? direction : xDelta);

  });

  return tail;
}
jQuery.Fotorama = function ($fotorama, opts) {
  $HTML = $('html');
  $BODY = $('body');

  var that = this,
      stamp = $.now(),
      stampClass = _fotoramaClass + stamp,
      fotorama = $fotorama[0],
      data,
      dataFrameCount = 1,
      fotoramaData = $fotorama.data(),
      size,

      $style = $('<style></style>'),

      $anchor = $(div(hiddenClass)),
      $wrap = $(div(wrapClass)),
      $stage = $(div(stageClass)).appendTo($wrap),
      stage = $stage[0],

      $stageShaft = $(div(stageShaftClass)).appendTo($stage),
      $stageFrame = $(),
      $arrPrev = $(div(arrClass + ' ' + arrPrevClass + buttonAttributes)),
      $arrNext = $(div(arrClass + ' ' + arrNextClass + buttonAttributes)),
      $arrs = $arrPrev.add($arrNext).appendTo($stage),
      $navWrap = $(div(navWrapClass)),
      $nav = $(div(navClass)).appendTo($navWrap),
      $navShaft = $(div(navShaftClass)).appendTo($nav),
      $navFrame,
      $navDotFrame = $(),
      $navThumbFrame = $(),

      stageShaftData = $stageShaft.data(),
      navShaftData = $navShaft.data(),

      $thumbBorder = $(div(thumbBorderClass)).appendTo($navShaft),

      $fullscreenIcon = $(div(fullscreenIconClass + buttonAttributes)),
      fullscreenIcon = $fullscreenIcon[0],
      $videoPlay = $(div(videoPlayClass)),
      $videoClose = $(div(videoCloseClass)).appendTo($stage),
      videoClose = $videoClose[0],

      spinner,
      $spinner = $(div(spinnerClass)),

      $videoPlaying,

      activeIndex = false,
      activeFrame,
      activeIndexes,
      repositionIndex,
      dirtyIndex,
      lastActiveIndex,
      prevIndex,
      nextIndex,
      nextAutoplayIndex,
      startIndex,

      o_loop,
      o_nav,
      o_navThumbs,
      o_navTop,
      o_allowFullScreen,
      o_nativeFullScreen,
      o_fade,
      o_thumbSide,
      o_thumbSide2,
      o_transitionDuration,
      o_transition,
      o_shadows,
      o_rtl,
      o_keyboard,
      lastOptions = {},

      measures = {},
      measuresSetFLAG,

      stageShaftTouchTail = {},
      stageWheelTail = {},
      navShaftTouchTail = {},
      navWheelTail = {},

      scrollTop,
      scrollLeft,

      showedFLAG,
      pausedAutoplayFLAG,
      stoppedAutoplayFLAG,

      toDeactivate = {},
      toDetach = {},

      measuresStash,

      touchedFLAG,

      hoverFLAG,

      navFrameKey,
      stageLeft = 0,

      fadeStack = [];

  $wrap[STAGE_FRAME_KEY] = $(div(stageFrameClass));
  $wrap[NAV_THUMB_FRAME_KEY] = $(div(navFrameClass + ' ' + navFrameThumbClass + buttonAttributes, div(thumbClass)));
  $wrap[NAV_DOT_FRAME_KEY] = $(div(navFrameClass + ' ' + navFrameDotClass + buttonAttributes, div(dotClass)));

  toDeactivate[STAGE_FRAME_KEY] = [];
  toDeactivate[NAV_THUMB_FRAME_KEY] = [];
  toDeactivate[NAV_DOT_FRAME_KEY] = [];
  toDetach[STAGE_FRAME_KEY] = {};

  $wrap
      .addClass(CSS3 ? wrapCss3Class : wrapCss2Class)
      .toggleClass(wrapNoControlsClass, !opts.controlsonstart);

  fotoramaData.fotorama = this;

  function checkForVideo () {
    $.each(data, function (i, dataFrame) {
      if (!dataFrame.i) {
        dataFrame.i = dataFrameCount++;
        var video = findVideoId(dataFrame.video, true);
        if (video) {
          var thumbs = {};
          dataFrame.video = video;
          if (!dataFrame.img && !dataFrame.thumb) {
            thumbs = getVideoThumbs(dataFrame, data, that);
          } else {
            dataFrame.thumbsReady = true;
          }
          updateData(data, {img: thumbs.img, thumb: thumbs.thumb}, dataFrame.i, that);
        }
      }
    });
  }

  function allowKey (key) {
    return o_keyboard[key] || that.fullScreen;
  }

  function bindGlobalEvents (FLAG) {
    var keydownCommon = 'keydown.' + _fotoramaClass,
        localStamp = _fotoramaClass + stamp,
        keydownLocal = 'keydown.' + localStamp,
        resizeLocal = 'resize.' + localStamp + ' ' + 'orientationchange.' + localStamp;

    if (FLAG) {
      $DOCUMENT
          .on(keydownLocal, function (e) {
            var catched,
                index;

            if ($videoPlaying && e.keyCode === 27) {
              catched = true;
              unloadVideo($videoPlaying, true, true);
            } else if (that.fullScreen || (opts.keyboard && !that.index)) {
              if (e.keyCode === 27) {
                catched = true;
                that.cancelFullScreen();
              } else if ((e.shiftKey && e.keyCode === 32 && allowKey('space')) || (e.keyCode === 37 && allowKey('left')) || (e.keyCode === 38 && allowKey('up'))) {
                index = '<';
              } else if ((e.keyCode === 32 && allowKey('space')) || (e.keyCode === 39 && allowKey('right')) || (e.keyCode === 40 && allowKey('down'))) {
                index = '>';
              } else if (e.keyCode === 36 && allowKey('home')) {
                index = '<<';
              } else if (e.keyCode === 35 && allowKey('end')) {
                index = '>>';
              }
            }

            (catched || index) && stopEvent(e);
            index && that.show({index: index, slow: e.altKey, user: true});
          });

      if (!that.index) {
        $DOCUMENT
            .off(keydownCommon)
            .on(keydownCommon, 'textarea, input, select', function (e) {
              !$BODY.hasClass(_fullscreenClass) && e.stopPropagation();
            });
      }

      $WINDOW.on(resizeLocal, that.resize);
    } else {
      $DOCUMENT.off(keydownLocal);
      $WINDOW.off(resizeLocal);
    }
  }

  function appendElements (FLAG) {
    if (FLAG === appendElements.f) return;

    if (FLAG) {
      $fotorama
          .html('')
          .addClass(_fotoramaClass + ' ' + stampClass)
          .append($wrap)
          .before($style)
          .before($anchor);

      addInstance(that);
    } else {
      $wrap.detach();
      $style.detach();
      $anchor.detach();
      $fotorama
          .html(fotoramaData.urtext)
          .removeClass(stampClass);

      hideInstance(that);
    }

    bindGlobalEvents(FLAG);
    appendElements.f = FLAG;
  }

  function setData () {
    data = that.data = data || clone(opts.data) || getDataFromHtml($fotorama);
    size = that.size = data.length;

    !ready.ok && opts.shuffle && shuffle(data);

    checkForVideo();

    activeIndex = limitIndex(activeIndex);

    size && appendElements(true);
  }

  function stageNoMove () {
    var _noMove = (size < 2 && !opts.enableifsingleframe) || $videoPlaying;
    stageShaftTouchTail.noMove = _noMove || o_fade;
    stageShaftTouchTail.noSwipe = _noMove || !opts.swipe;

    !o_transition && $stageShaft.toggleClass(grabClass, !opts.click && !stageShaftTouchTail.noMove && !stageShaftTouchTail.noSwipe);
    MS_POINTER && $wrap.toggleClass(wrapPanYClass, !stageShaftTouchTail.noSwipe);
  }

  function setAutoplayInterval (interval) {
    if (interval === true) interval = '';
    opts.autoplay = Math.max(+interval || AUTOPLAY_INTERVAL, o_transitionDuration * 1.5);
  }

  /**
   * Options on the fly
   * */
  function setOptions () {
    that.options = opts = optionsToLowerCase(opts);

    o_fade = (opts.transition === 'crossfade' || opts.transition === 'dissolve');

    o_loop = opts.loop && (size > 2 || (o_fade && (!o_transition || o_transition !== 'slide')));

    o_transitionDuration = +opts.transitionduration || TRANSITION_DURATION;

    o_rtl = opts.direction === 'rtl';

    o_keyboard = $.extend({}, opts.keyboard && KEYBOARD_OPTIONS, opts.keyboard);

    var classes = {add: [], remove: []};

    function addOrRemoveClass (FLAG, value) {
      classes[FLAG ? 'add' : 'remove'].push(value);
    }

    if (size > 1 || opts.enableifsingleframe) {
      o_nav = opts.nav;
      o_navTop = opts.navposition === 'top';
      classes.remove.push(selectClass);

      $arrs.toggle(!!opts.arrows);
    } else {
      o_nav = false;
      $arrs.hide();
    }

    spinnerStop();
    spinner = new Spinner($.extend(spinnerDefaults, opts.spinner, spinnerOverride, {direction: o_rtl ? -1 : 1}));

    arrsUpdate();
    stageWheelUpdate();

    if (opts.autoplay) setAutoplayInterval(opts.autoplay);

    o_thumbSide = numberFromMeasure(opts.thumbwidth) || THUMB_SIZE;
    o_thumbSide2 = numberFromMeasure(opts.thumbheight) || THUMB_SIZE;

    stageWheelTail.ok = navWheelTail.ok = opts.trackpad && !SLOW;

    stageNoMove();

    extendMeasures(opts, [measures]);

    o_navThumbs = o_nav === 'thumbs';

    if (o_navThumbs) {
      frameDraw(size, 'navThumb');

      $navFrame = $navThumbFrame;
      navFrameKey = NAV_THUMB_FRAME_KEY;

      setStyle($style, $.Fotorama.jst.style({w: o_thumbSide, h: o_thumbSide2, b: opts.thumbborderwidth, m: opts.thumbmargin, s: stamp, q: !COMPAT}));

      $nav
          .addClass(navThumbsClass)
          .removeClass(navDotsClass);
    } else if (o_nav === 'dots') {
      frameDraw(size, 'navDot');

      $navFrame = $navDotFrame;
      navFrameKey = NAV_DOT_FRAME_KEY;

      $nav
          .addClass(navDotsClass)
          .removeClass(navThumbsClass);
    } else {
      o_nav = false;
      $nav.removeClass(navThumbsClass + ' ' + navDotsClass);
    }

    if (o_nav) {
      if (o_navTop) {
        $navWrap.insertBefore($stage);
      } else {
        $navWrap.insertAfter($stage);
      }
      frameAppend.nav = false;
      frameAppend($navFrame, $navShaft, 'nav');
    }

    o_allowFullScreen = opts.allowfullscreen;

    if (o_allowFullScreen) {
      $fullscreenIcon.prependTo($stage);
      o_nativeFullScreen = FULLSCREEN && o_allowFullScreen === 'native';
    } else {
      $fullscreenIcon.detach();
      o_nativeFullScreen = false;
    }

    addOrRemoveClass(o_fade, wrapFadeClass);
    addOrRemoveClass(!o_fade, wrapSlideClass);
    addOrRemoveClass(!opts.captions, wrapNoCaptionsClass);
    addOrRemoveClass(o_rtl, wrapRtlClass);
    addOrRemoveClass(opts.arrows !== 'always', wrapToggleArrowsClass);

    o_shadows = opts.shadows && !SLOW;
    addOrRemoveClass(!o_shadows, wrapNoShadowsClass);

    $wrap
        .addClass(classes.add.join(' '))
        .removeClass(classes.remove.join(' '));

    lastOptions = $.extend({}, opts);
  }

  function normalizeIndex (index) {
    return index < 0 ? (size + (index % size)) % size : index >= size ? index % size : index;
  }

  function limitIndex (index) {
    return minMaxLimit(index, 0, size - 1);
  }

  function edgeIndex (index) {
    return o_loop ? normalizeIndex(index) : limitIndex(index);
  }

  function getPrevIndex (index) {
    return index > 0 || o_loop ? index - 1 : false;
  }

  function getNextIndex (index) {
    return index < size - 1 || o_loop ? index + 1 : false;
  }

  function setStageShaftMinmaxAndSnap () {
    stageShaftTouchTail.min = o_loop ? -Infinity : -getPosByIndex(size - 1, measures.w, opts.margin, repositionIndex);
    stageShaftTouchTail.max = o_loop ? Infinity : -getPosByIndex(0, measures.w, opts.margin, repositionIndex);
    stageShaftTouchTail.snap = measures.w + opts.margin;
  }

  function setNavShaftMinMax () {
    ////////console.log('setNavShaftMinMax', measures.nw);
    navShaftTouchTail.min = Math.min(0, measures.nw - $navShaft.width());
    navShaftTouchTail.max = 0;
    $navShaft.toggleClass(grabClass, !(navShaftTouchTail.noMove = navShaftTouchTail.min === navShaftTouchTail.max));
  }

  function eachIndex (indexes, type, fn) {
    if (typeof indexes === 'number') {
      indexes = new Array(indexes);
      var rangeFLAG = true;
    }
    return $.each(indexes, function (i, index) {
      if (rangeFLAG) index = i;
      if (typeof index === 'number') {
        var dataFrame = data[normalizeIndex(index)];

        if (dataFrame) {
          var key = '$' + type + 'Frame',
              $frame = dataFrame[key];

          fn.call(this, i, index, dataFrame, $frame, key, $frame && $frame.data());
        }
      }
    });
  }

  function setMeasures (width, height, ratio, index) {
    if (!measuresSetFLAG || (measuresSetFLAG === '*' && index === startIndex)) {

      //////console.log('setMeasures', index, opts.width, opts.height);

      width = measureIsValid(opts.width) || measureIsValid(width) || WIDTH;
      height = measureIsValid(opts.height) || measureIsValid(height) || HEIGHT;
      that.resize({
        width: width,
        ratio: opts.ratio || ratio || width / height
      }, 0, index !== startIndex && '*');
    }
  }

  function loadImg (indexes, type, specialMeasures, method, position, again) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {

      if (!$frame) return;

      var fullFLAG = that.fullScreen && dataFrame.full && dataFrame.full !== dataFrame.img && !frameData.$full && type === 'stage';

      if (frameData.$img && !again && !fullFLAG) return;

      var img = new Image(),
          $img = $(img),
          imgData = $img.data();

      frameData[fullFLAG ? '$full' : '$img'] = $img;

      var srcKey = type === 'stage' ? (fullFLAG ? 'full' : 'img') : 'thumb',
          src = dataFrame[srcKey],
          dummy = fullFLAG ? null : dataFrame[type === 'stage' ? 'thumb' : 'img'];

      if (type === 'navThumb') $frame = frameData.$wrap;

      function triggerTriggerEvent (event) {
        var _index = normalizeIndex(index);
        triggerEvent(event, {
          index: _index,
          src: src,
          frame: data[_index]
        });
      }

      function error () {
        $img.remove();

        $.Fotorama.cache[src] = 'error';

        if ((!dataFrame.html || type !== 'stage') && dummy && dummy !== src) {
          dataFrame[srcKey] = src = dummy;
          loadImg([index], type, specialMeasures, method, position, true);
        } else {
          if (src && !dataFrame.html && !fullFLAG) {
            $frame
                .trigger('f:error')
                .removeClass(loadingClass)
                .addClass(errorClass);

            triggerTriggerEvent('error');
          } else if (type === 'stage') {
            $frame
                .trigger('f:load')
                .removeClass(loadingClass + ' ' + errorClass)
                .addClass(loadedClass);

            triggerTriggerEvent('load');
            setMeasures();
          }

          frameData.state = 'error';

          if (size > 1 && data[index] === dataFrame && !dataFrame.html && !dataFrame.deleted && !dataFrame.video && !fullFLAG) {
            dataFrame.deleted = true;
            that.splice(index, 1);
          }
        }
      }

      function loaded () {
        //////console.log('loaded: ' + src);

        ////console.log('$.Fotorama.measures[src]', $.Fotorama.measures[src]);

        $.Fotorama.measures[src] = imgData.measures = $.Fotorama.measures[src] || {
          width: img.width,
          height: img.height,
          ratio: img.width / img.height
        };

        setMeasures(imgData.measures.width, imgData.measures.height, imgData.measures.ratio, index);

        $img
            .off('load error')
            .addClass(imgClass + (fullFLAG ? ' ' + imgFullClass : ''))
            .prependTo($frame);

        fit($img, ($.isFunction(specialMeasures) ? specialMeasures() : specialMeasures) || measures, method || dataFrame.fit || opts.fit, position || dataFrame.position || opts.position);

        $.Fotorama.cache[src] = frameData.state = 'loaded';

        setTimeout(function () {
          $frame
              .trigger('f:load')
              .removeClass(loadingClass + ' ' + errorClass)
              .addClass(loadedClass + ' ' + (fullFLAG ? loadedFullClass : loadedImgClass));

          if (type === 'stage') {
            triggerTriggerEvent('load');
          } else if (dataFrame.thumbratio === AUTO || !dataFrame.thumbratio && opts.thumbratio === AUTO) {
            // danger! reflow for all thumbnails
            dataFrame.thumbratio = imgData.measures.ratio;
            reset();
          }
        }, 0);
      }

      if (!src) {
        error();
        return;
      }

      function waitAndLoad () {
        var _i = 10;
        waitFor(function () {
          return !touchedFLAG || !_i-- && !SLOW;
        }, function () {
          loaded();
        });
      }

      if (!$.Fotorama.cache[src]) {
        $.Fotorama.cache[src] = '*';

        $img
            .on('load', waitAndLoad)
            .on('error', error);
      } else {
        (function justWait () {
          if ($.Fotorama.cache[src] === 'error') {
            error();
          } else if ($.Fotorama.cache[src] === 'loaded') {
            ////console.log('take from cache: ' + src);
            setTimeout(waitAndLoad, 0);
          } else {
            setTimeout(justWait, 100);
          }
        })();
      }

      frameData.state = '';
      img.src = src;
    });
  }

  function spinnerSpin ($el) {
    $spinner.append(spinner.spin().el).appendTo($el);
  }

  function spinnerStop () {
    $spinner.detach();
    spinner && spinner.stop();
  }

  function updateFotoramaState () {
    var $frame = activeFrame[STAGE_FRAME_KEY];

    if ($frame && !$frame.data().state) {
      spinnerSpin($frame);
      $frame.on('f:load f:error', function () {
        $frame.off('f:load f:error');
        spinnerStop();
      });
    }
  }

  function addNavFrameEvents (frame) {
    addEnterUp(frame, onNavFrameClick);
    addFocus(frame, function () {

      setTimeout(function () {
        lockScroll($nav);
      }, 0);
      slideNavShaft({time: o_transitionDuration, guessIndex: $(this).data().eq, minMax: navShaftTouchTail});
    });
  }

  function frameDraw (indexes, type) {
    eachIndex(indexes, type, function (i, index, dataFrame, $frame, key, frameData) {
      if ($frame) return;

      $frame = dataFrame[key] = $wrap[key].clone();
      frameData = $frame.data();
      frameData.data = dataFrame;
      var frame = $frame[0];

      if (type === 'stage') {

        if (dataFrame.html) {
          $('<div class="' + htmlClass + '"></div>')
              .append(
                  dataFrame._html ? $(dataFrame.html)
                      .removeAttr('id')
                      .html(dataFrame._html) // Because of IE
                  : dataFrame.html
              )
              .appendTo($frame);
        }

        dataFrame.caption && $(div(captionClass, div(captionWrapClass, dataFrame.caption))).appendTo($frame);

        dataFrame.video && $frame
          .addClass(stageFrameVideoClass)
          .append($videoPlay.clone());

        // This solves tabbing problems
        addFocus(frame, function () {
          setTimeout(function () {
            lockScroll($stage);
          }, 0);
          clickToShow({index: frameData.eq, user: true});
        });

        $stageFrame = $stageFrame.add($frame);
      } else if (type === 'navDot') {
        addNavFrameEvents(frame);
        $navDotFrame = $navDotFrame.add($frame);
      } else if (type === 'navThumb') {
        addNavFrameEvents(frame);
        frameData.$wrap = $frame.children(':first');
        $navThumbFrame = $navThumbFrame.add($frame);
        if (dataFrame.video) {
          frameData.$wrap.append($videoPlay.clone());
        }
      }
    });
  }

  function callFit ($img, measuresToFit, method, position) {
    return $img && $img.length && fit($img, measuresToFit, method, position);
  }

  function stageFramePosition (indexes) {
    eachIndex(indexes, 'stage', function (i, index, dataFrame, $frame, key, frameData) {
      if (!$frame) return;

      var normalizedIndex = normalizeIndex(index),
          method = dataFrame.fit || opts.fit,
          position = dataFrame.position || opts.position;
      frameData.eq = normalizedIndex;

      toDetach[STAGE_FRAME_KEY][normalizedIndex] = $frame.css($.extend({left: o_fade ? 0 : getPosByIndex(index, measures.w, opts.margin, repositionIndex)}, o_fade && getDuration(0)));

      if (isDetached($frame[0])) {
        $frame.appendTo($stageShaft);
        unloadVideo(dataFrame.$video);
      }

      callFit(frameData.$img, measures, method, position);
      callFit(frameData.$full, measures, method, position);
    });
  }

  function thumbsDraw (pos, loadFLAG) {
    if (o_nav !== 'thumbs' || isNaN(pos)) return;

    var leftLimit = -pos,
        rightLimit = -pos + measures.nw;

    $navThumbFrame.each(function () {
      var $this = $(this),
          thisData = $this.data(),
          eq = thisData.eq,
          getSpecialMeasures = function () {
            return {
              h: o_thumbSide2,
              w: thisData.w
            }
          },
          specialMeasures = getSpecialMeasures(),
          dataFrame = data[eq] || {},
          method = dataFrame.thumbfit || opts.thumbfit,
          position = dataFrame.thumbposition || opts.thumbposition;

      specialMeasures.w = thisData.w;

      if (thisData.l + thisData.w < leftLimit
          || thisData.l > rightLimit
          || callFit(thisData.$img, specialMeasures, method, position)) return;

      loadFLAG && loadImg([eq], 'navThumb', getSpecialMeasures, method, position);
    });
  }

  function frameAppend ($frames, $shaft, type) {
    if (!frameAppend[type]) {

      var thumbsFLAG = type === 'nav' && o_navThumbs,
          left = 0;

      $shaft.append(
        $frames
            .filter(function () {
              var actual,
                  $this = $(this),
                  frameData = $this.data();
              for (var _i = 0, _l = data.length; _i < _l; _i++) {
                if (frameData.data === data[_i]) {
                  actual = true;
                  frameData.eq = _i;
                  break;
                }
              }
              return actual || $this.remove() && false;
            })
            .sort(function (a, b) {
              return $(a).data().eq - $(b).data().eq;
            })
            .each(function () {

              if (!thumbsFLAG) return;

              var $this = $(this),
                  frameData = $this.data(),
                  thumbwidth = Math.round(o_thumbSide2 * frameData.data.thumbratio) || o_thumbSide;

              frameData.l = left;
              frameData.w = thumbwidth;

              $this.css({width: thumbwidth});

              left += thumbwidth + opts.thumbmargin;
            })
      );

      frameAppend[type] = true;
    }
  }

  function getDirection (x) {
    return x - stageLeft > measures.w / 3;
  }

  function disableDirrection (i) {
    return !o_loop && (!(activeIndex + i) || !(activeIndex - size + i)) && !$videoPlaying;
  }

  function arrsUpdate () {
    var disablePrev = disableDirrection(0),
        disableNext = disableDirrection(1);
    $arrPrev
        .toggleClass(arrDisabledClass, disablePrev)
        .attr(disableAttr(disablePrev));
    $arrNext
        .toggleClass(arrDisabledClass, disableNext)
        .attr(disableAttr(disableNext));
  }

  function stageWheelUpdate () {
    if (stageWheelTail.ok) {
      stageWheelTail.prevent = {'<': disableDirrection(0), '>': disableDirrection(1)};
    }
  }

  function getNavFrameBounds ($navFrame) {
    var navFrameData = $navFrame.data(),
        left,
        width;

    if (o_navThumbs) {
      left = navFrameData.l;
      width = navFrameData.w;
    } else {
      left = $navFrame.position().left;
      width = $navFrame.width();
    }

    return {
      c: left + width / 2,
      min: -left + opts.thumbmargin * 10,
      max: -left + measures.w - width - opts.thumbmargin * 10
    };
  }

  function slideThumbBorder (time) {
    var navFrameData = activeFrame[navFrameKey].data();
    slide($thumbBorder, {
      time: time * 1.2,
      pos: navFrameData.l,
      width: navFrameData.w - opts.thumbborderwidth * 2
    });
  }

  function slideNavShaft (options) {
    ////console.log('slideNavShaft', options.guessIndex, options.keep, slideNavShaft.l);
    var $guessNavFrame = data[options.guessIndex][navFrameKey];
    if ($guessNavFrame) {
      var overflowFLAG = navShaftTouchTail.min !== navShaftTouchTail.max,
          minMax = options.minMax || overflowFLAG && getNavFrameBounds(activeFrame[navFrameKey]),
          l = overflowFLAG && (options.keep && slideNavShaft.l ? slideNavShaft.l : minMaxLimit((options.coo || measures.nw / 2) - getNavFrameBounds($guessNavFrame).c, minMax.min, minMax.max)),
          pos = overflowFLAG && minMaxLimit(l, navShaftTouchTail.min, navShaftTouchTail.max),
          time = options.time * 1.1;

      slide($navShaft, {
        time: time,
        pos: pos || 0,
        onEnd: function () {
          thumbsDraw(pos, true);
        }
      });

      //if (time) thumbsDraw(pos);

      setShadow($nav, findShadowEdge(pos, navShaftTouchTail.min, navShaftTouchTail.max));
      slideNavShaft.l = l;
    }
  }

  function navUpdate () {
    deactivateFrames(navFrameKey);
    toDeactivate[navFrameKey].push(activeFrame[navFrameKey].addClass(activeClass));
  }

  function deactivateFrames (key) {
    var _toDeactivate = toDeactivate[key];

    while (_toDeactivate.length) {
      _toDeactivate.shift().removeClass(activeClass);
    }
  }

  function detachFrames (key) {
    var _toDetach = toDetach[key];

    //////console.log('_toDetach', _toDetach);
    //////console.log('activeIndexes', activeIndexes);

    $.each(activeIndexes, function (i, index) {
      delete _toDetach[normalizeIndex(index)];
    });

    $.each(_toDetach, function (index, $frame) {
      delete _toDetach[index];
      //////console.log('Detach', index);
      $frame.detach();
    });
  }

  function stageShaftReposition (skipOnEnd) {

    repositionIndex = dirtyIndex = activeIndex;

    var $frame = activeFrame[STAGE_FRAME_KEY];

    if ($frame) {
      deactivateFrames(STAGE_FRAME_KEY);
      toDeactivate[STAGE_FRAME_KEY].push($frame.addClass(activeClass));

      skipOnEnd || that.show.onEnd(true);
      stop($stageShaft, 0, true);

      detachFrames(STAGE_FRAME_KEY);
      stageFramePosition(activeIndexes);
      setStageShaftMinmaxAndSnap();
      setNavShaftMinMax();
    }
  }

  function extendMeasures (options, measuresArray) {
    if (!options) return;

    $.each(measuresArray, function (i, measures) {
      if (!measures) return;

      $.extend(measures, {
        width: options.width || measures.width,
        height: options.height,
        minwidth: options.minwidth,
        maxwidth: options.maxwidth,
        minheight: options.minheight,
        maxheight: options.maxheight,
        ratio: getRatio(options.ratio)
      })
    });
  }

  function triggerEvent (event, extra) {
    $fotorama.trigger(_fotoramaClass + ':' + event, [that, extra]);
  }

  function onTouchStart () {
    clearTimeout(onTouchEnd.t);
    touchedFLAG = 1;

    if (opts.stopautoplayontouch) {
      that.stopAutoplay();
    } else {
      pausedAutoplayFLAG = true;
    }
  }

  function onTouchEnd () {
    if (!opts.stopautoplayontouch) {
      releaseAutoplay();
      changeAutoplay();
    }

    onTouchEnd.t = setTimeout(function () {
      touchedFLAG = 0;
    }, TRANSITION_DURATION + TOUCH_TIMEOUT);
    //////console.timeEnd('onTouchEnd');
  }

  function releaseAutoplay () {
    pausedAutoplayFLAG = !!($videoPlaying || stoppedAutoplayFLAG);
  }

  function changeAutoplay () {
    ////console.log('changeAutoplay');

    clearTimeout(changeAutoplay.t);
    waitFor.stop(changeAutoplay.w);

    if (!opts.autoplay || pausedAutoplayFLAG) {
      if (that.autoplay) {
        that.autoplay = false;
        triggerEvent('stopautoplay');
      }

      return;
    }

    ////console.log('changeAutoplay continue');

    if (!that.autoplay) {
      that.autoplay = true;
      triggerEvent('startautoplay');
    }

    var _activeIndex = activeIndex;


    var frameData = activeFrame[STAGE_FRAME_KEY].data();
    changeAutoplay.w = waitFor(function () {
      ////console.log('wait for the state of the current frame');
      return frameData.state || _activeIndex !== activeIndex;
    }, function () {
      ////console.log('the current frame is ready');
      changeAutoplay.t = setTimeout(function () {
        ////console.log('changeAutoplay.t setTimeout', pausedAutoplayFLAG, _activeIndex !== activeIndex);
        if (pausedAutoplayFLAG || _activeIndex !== activeIndex) return;

        var _nextAutoplayIndex = nextAutoplayIndex,
            nextFrameData = data[_nextAutoplayIndex][STAGE_FRAME_KEY].data();

        changeAutoplay.w = waitFor(function () {
          ////console.log('wait for the state of the next frame');
          return nextFrameData.state || _nextAutoplayIndex !== nextAutoplayIndex;
        }, function () {
          if (pausedAutoplayFLAG || _nextAutoplayIndex !== nextAutoplayIndex) return;
          that.show(o_loop ? getDirectionSign(!o_rtl) : nextAutoplayIndex);
        });
      }, opts.autoplay);
    });

  }

  that.startAutoplay = function (interval) {
    if (that.autoplay) return this;
    pausedAutoplayFLAG = stoppedAutoplayFLAG = false;
    setAutoplayInterval(interval || opts.autoplay);
    changeAutoplay();

    return this;
  };

  that.stopAutoplay = function () {
    if (that.autoplay) {
      pausedAutoplayFLAG = stoppedAutoplayFLAG = true;
      changeAutoplay();
    }
    return this;
  };

  that.show = function (options) {
    ////console.log('that.show');
    //////console.time('that.show prepare');
    var index;

    if (typeof options !== 'object') {
      index = options;
      options = {};
    } else {
      index = options.index;
    }

    index = index === '>' ? dirtyIndex + 1 : index === '<' ? dirtyIndex - 1 : index === '<<' ? 0 : index === '>>' ? size - 1 : index;
    index = isNaN(index) ? getIndexFromHash(index, data, true) : index;
    index = typeof index === 'undefined' ? activeIndex || 0 : index;

    that.activeIndex = activeIndex = edgeIndex(index);
    prevIndex = getPrevIndex(activeIndex);
    nextIndex = getNextIndex(activeIndex);
    nextAutoplayIndex = normalizeIndex(activeIndex + (o_rtl ? -1 : 1));
    activeIndexes = [activeIndex, prevIndex, nextIndex];

    dirtyIndex = o_loop ? index : activeIndex;

    var diffIndex = Math.abs(lastActiveIndex - dirtyIndex),
        time = getNumber(options.time, function () {
          return Math.min(o_transitionDuration * (1 + (diffIndex - 1) / 12), o_transitionDuration * 2);
        }),
        overPos = options.overPos;

    if (options.slow) time *= 10;

    var _activeFrame = activeFrame;
    that.activeFrame = activeFrame = data[activeIndex];
    //////console.timeEnd('that.show prepare');

    var silent = _activeFrame === activeFrame && !options.user;

    //setTimeout(function () {
    //////console.time('unloadVideo');
    unloadVideo($videoPlaying, activeFrame.i !== data[normalizeIndex(repositionIndex)].i);
    //////console.timeEnd('unloadVideo');
    //////console.time('frameDraw');
    frameDraw(activeIndexes, 'stage');
    //////console.timeEnd('frameDraw');
    //////console.time('stageFramePosition');
    stageFramePosition(SLOW ? [dirtyIndex] : [dirtyIndex, getPrevIndex(dirtyIndex), getNextIndex(dirtyIndex)]);
    //////console.timeEnd('stageFramePosition');
    //////console.time('updateTouchTails');
    updateTouchTails('go', true);
    //////console.timeEnd('updateTouchTails');
    //////console.time('triggerEvent');

    silent || triggerEvent('show', {
      user: options.user,
      time: time
    });
    //////console.timeEnd('triggerEvent');
    //}, 0);

    //////console.time('bind onEnd');

    pausedAutoplayFLAG = true;

    var onEnd = that.show.onEnd = function (skipReposition) {
      if (onEnd.ok) return;
      onEnd.ok = true;

      skipReposition || stageShaftReposition(true);

      if (!silent) {
        triggerEvent('showend', {
          user: options.user
        });
      }

      ////console.log('o_transition', o_transition);

      if (!skipReposition && o_transition && o_transition !== opts.transition) {
        ////console.log('set transition back to: ' + o_transition);
        that.setOptions({transition: o_transition});
        o_transition = false;
        return;
      }

      updateFotoramaState();
      loadImg(activeIndexes, 'stage');

      updateTouchTails('go', false);
      stageWheelUpdate();

      stageCursor();
      releaseAutoplay();
      changeAutoplay();
    };
    //////console.timeEnd('bind onEnd');

    if (!o_fade) {
      //////console.time('slide');
      slide($stageShaft, {
        pos: -getPosByIndex(dirtyIndex, measures.w, opts.margin, repositionIndex),
        overPos: overPos,
        time: time,
        onEnd: onEnd/*,
        _001: true*/
      });
      //////console.timeEnd('slide');
    } else {
      var $activeFrame = activeFrame[STAGE_FRAME_KEY],
          $prevActiveFrame = activeIndex !== lastActiveIndex ? data[lastActiveIndex][STAGE_FRAME_KEY] : null;

      fade($activeFrame, $prevActiveFrame, $stageFrame, {
        time: time,
        method: opts.transition,
        onEnd: onEnd
      }, fadeStack);
    }

    //////console.time('arrsUpdate');
    arrsUpdate();
    //////console.timeEnd('arrsUpdate');

    if (o_nav) {
      //////console.time('navUpdate');
      navUpdate();
      //////console.timeEnd('navUpdate');

      //////console.time('slideNavShaft');
      var guessIndex = limitIndex(activeIndex + minMaxLimit(dirtyIndex - lastActiveIndex, -1, 1));
      slideNavShaft({time: time, coo: guessIndex !== activeIndex && options.coo, guessIndex: typeof options.coo !== 'undefined' ? guessIndex : activeIndex, keep: silent});
      //////console.timeEnd('slideNavShaft');

      //////console.time('slideThumbBorder');
      if (o_navThumbs) slideThumbBorder(time);
      //////console.timeEnd('slideThumbBorder');
    }

    //////console.time('that.show end');
    showedFLAG = typeof lastActiveIndex !== 'undefined' && lastActiveIndex !== activeIndex;
    lastActiveIndex = activeIndex;
    opts.hash && showedFLAG && !that.eq && setHash(activeFrame.id || activeIndex + 1);
    //////console.timeEnd('that.show end');

    //////console.timeEnd('that.show');

    return this;
  };

  that.requestFullScreen = function () {
    if (o_allowFullScreen && !that.fullScreen) {
      scrollTop = $WINDOW.scrollTop();
      scrollLeft = $WINDOW.scrollLeft();

      lockScroll($WINDOW);

      updateTouchTails('x', true);

      measuresStash = $.extend({}, measures);

      $fotorama
          .addClass(fullscreenClass)
          .appendTo($BODY.addClass(_fullscreenClass));

      $HTML.addClass(_fullscreenClass);

      unloadVideo($videoPlaying, true, true);

      that.fullScreen = true;

      if (o_nativeFullScreen) {
        fullScreenApi.request(fotorama);
      }

      that.resize();
      loadImg(activeIndexes, 'stage');
      updateFotoramaState();

      triggerEvent('fullscreenenter');
    }

    return this;
  };

  function cancelFullScreen () {
    if (that.fullScreen) {
      that.fullScreen = false;

      if (FULLSCREEN) {
        fullScreenApi.cancel(fotorama);
      }

      $BODY.removeClass(_fullscreenClass);
      $HTML.removeClass(_fullscreenClass);

      $fotorama
          .removeClass(fullscreenClass)
          .insertAfter($anchor);

      measures = $.extend({}, measuresStash);

      unloadVideo($videoPlaying, true, true);

      updateTouchTails('x', false);

      that.resize();
      loadImg(activeIndexes, 'stage');

      lockScroll($WINDOW, scrollLeft, scrollTop);

      triggerEvent('fullscreenexit');
    }
  }

  that.cancelFullScreen = function () {
    if (o_nativeFullScreen && fullScreenApi.is()) {
      fullScreenApi.cancel(document);
    } else {
      cancelFullScreen();
    }

    return this;
  };

  that.toggleFullScreen = function () {
    return that[(that.fullScreen ? 'cancel' : 'request') + 'FullScreen']();
  };

  addEvent(document, fullScreenApi.event, function () {
    if (data && !fullScreenApi.is() && !$videoPlaying) {
      cancelFullScreen();
    }
  });

  that.resize = function (options) {
    if (!data) return this;

    var time = arguments[1] || 0,
        setFLAG = arguments[2];

    extendMeasures(!that.fullScreen ? optionsToLowerCase(options) : {width: '100%', maxwidth: null, minwidth: null, height: '100%', maxheight: null, minheight: null}, [measures, setFLAG || that.fullScreen || opts]);

    var width = measures.width,
        height = measures.height,
        ratio = measures.ratio,
        windowHeight = $WINDOW.height() - (o_nav ? $nav.height() : 0);

    if (measureIsValid(width)) {
      $wrap
          .addClass(wrapOnlyActiveClass)
          .css({width: width, minWidth: measures.minwidth || 0, maxWidth: measures.maxwidth || MAX_WIDTH});

      width = measures.W = measures.w = $wrap.width();
      measures.nw = o_nav && numberFromWhatever(opts.navwidth, width) || width;

      if (opts.glimpse) {
        // Glimpse
        measures.w -= Math.round((numberFromWhatever(opts.glimpse, width) || 0) * 2);
      }

      $stageShaft.css({width: measures.w, marginLeft: (measures.W - measures.w) / 2});

      //////console.log('measures.W', measures.W);
      //////console.log('measures.w', measures.w);

      height = numberFromWhatever(height, windowHeight);

      height = height || (ratio && width / ratio);

      if (height) {
        width = Math.round(width);
        height = measures.h = Math.round(minMaxLimit(height, numberFromWhatever(measures.minheight, windowHeight), numberFromWhatever(measures.maxheight, windowHeight)));

        $stage
            .stop()
            .animate({width: width, height: height}, time, function () {
              $wrap.removeClass(wrapOnlyActiveClass);
            });

        stageShaftReposition();

        if (o_nav) {
          $nav
              .stop()
              .animate({width: measures.nw}, time);

          slideNavShaft({guessIndex: activeIndex, time: time, keep: true});
          if (o_navThumbs && frameAppend.nav) slideThumbBorder(time);
        }

        measuresSetFLAG = setFLAG || true;

        ready();
      }
    }

    stageLeft = $stage.offset().left;

    return this;
  };

  that.setOptions = function (options) {
    $.extend(opts, options);
    reset();
    return this;
  };

  that.shuffle = function () {
    data && shuffle(data) && reset();
    return this;
  };

  function setShadow ($el, edge) {
    //////console.time('setShadow');
    if (o_shadows) {
      $el.removeClass(shadowsLeftClass + ' ' + shadowsRightClass);
      edge && !$videoPlaying && $el.addClass(edge.replace(/^|\s/g, ' ' + shadowsClass + '--'));
    }
    //////console.timeEnd('setShadow');
  }

  that.destroy = function () {
    that.cancelFullScreen();
    that.stopAutoplay();

    data = that.data = null;

    appendElements();

    activeIndexes = [];
    detachFrames(STAGE_FRAME_KEY);

    reset.ok = false;

    return this;
  };

  that.playVideo = function () {
    var dataFrame = activeFrame,
        video = dataFrame.video,
        _activeIndex = activeIndex;

    if (typeof video === 'object' && dataFrame.videoReady) {
      o_nativeFullScreen && that.fullScreen && that.cancelFullScreen();

      waitFor(function () {
        return !fullScreenApi.is() || _activeIndex !== activeIndex;
      }, function () {
        if (_activeIndex === activeIndex) {
          dataFrame.$video = dataFrame.$video || $($.Fotorama.jst.video(video));
          dataFrame.$video.appendTo(dataFrame[STAGE_FRAME_KEY]);

          $wrap.addClass(wrapVideoClass);
          $videoPlaying = dataFrame.$video;

          stageNoMove();

          $arrs.blur();
          $fullscreenIcon.blur();

          triggerEvent('loadvideo');
        }
      });
    }

    return this;
  };

  that.stopVideo = function () {
    unloadVideo($videoPlaying, true, true);
    return this;
  };

  function unloadVideo ($video, unloadActiveFLAG, releaseAutoplayFLAG) {
    if (unloadActiveFLAG) {
      $wrap.removeClass(wrapVideoClass);
      $videoPlaying = false;

      stageNoMove();
    }

    if ($video && $video !== $videoPlaying) {
      $video.remove();
      triggerEvent('unloadvideo');
    }

    if (releaseAutoplayFLAG) {
      releaseAutoplay();
      changeAutoplay();
    }
  }

  function toggleControlsClass (FLAG) {
    $wrap.toggleClass(wrapNoControlsClass, FLAG);
  }

  function stageCursor (e) {
    if (stageShaftTouchTail.flow) return;

    var x = e ? e.pageX : stageCursor.x,
        pointerFLAG = x && !disableDirrection(getDirection(x)) && opts.click;

    if (stageCursor.p !== pointerFLAG
        && $stage.toggleClass(pointerClass, pointerFLAG)) {
      stageCursor.p = pointerFLAG;
      stageCursor.x = x;
    }
  }

  $stage.on('mousemove', stageCursor);

  function clickToShow (showOptions) {
    clearTimeout(clickToShow.t);

    if (opts.clicktransition && opts.clicktransition !== opts.transition) {
      ////console.log('change transition to: ' + opts.clicktransition);

      // this timeout is for yield events flow
      setTimeout(function () {
        // save original transition for later
        var _o_transition = opts.transition;

        that.setOptions({transition: opts.clicktransition});

        // now safe to pass base transition to o_transition, so that.show will restor it
        o_transition = _o_transition;
        // this timeout is here to prevent jerking in some browsers
        clickToShow.t = setTimeout(function () {
          that.show(showOptions);
        }, 10);
      }, 0);
    } else {
      that.show(showOptions);
    }
  }

  function onStageTap (e, toggleControlsFLAG) {
    //////console.time('onStageTap');
    var target = e.target,
        $target = $(target);

    if ($target.hasClass(videoPlayClass)) {
      that.playVideo();
    } else if (target === fullscreenIcon) {
      that.toggleFullScreen();
    } else if ($videoPlaying) {
      target === videoClose && unloadVideo($videoPlaying, true, true);
    } else {
      if (toggleControlsFLAG) {
        toggleControlsClass();
      } else if (opts.click) {

        clickToShow({index: e.shiftKey || getDirectionSign(getDirection(e._x)), slow: e.altKey, user: true});
      }
    }
    //////console.timeEnd('onStageTap');
  }

  function updateTouchTails (key, value) {
    stageShaftTouchTail[key] = navShaftTouchTail[key] = value;
  }

  stageShaftTouchTail = moveOnTouch($stageShaft, {
    onStart: onTouchStart,
    onMove: function (e, result) {
      setShadow($stage, result.edge);
    },
    onTouchEnd: onTouchEnd,
    onEnd: function (result) {
      //////console.time('stageShaftTouchTail.onEnd');
      setShadow($stage);

      //////console.log('result', result);

      var toggleControlsFLAG = (MS_POINTER && !hoverFLAG || result.touch) && opts.arrows && opts.arrows !== 'always';

      if (result.moved || (toggleControlsFLAG && result.pos !== result.newPos && !result.control)) {
        var index = getIndexByPos(result.newPos, measures.w, opts.margin, repositionIndex);
        that.show({
          index: index,
          time: o_fade ? o_transitionDuration : result.time,
          overPos: result.overPos,
          user: true
        });
      } else if (!result.aborted && !result.control) {
        onStageTap(result.startEvent, toggleControlsFLAG);
      }
      //////console.timeEnd('stageShaftTouchTail.onEnd');
    },
//    getPos: function () {
//      return -getPosByIndex(dirtyIndex, measures.w, opts.margin, repositionIndex);
//    },
    //_001: true,
    timeLow: 1,
    timeHigh: 1,
    friction: 2,
    select: '.' + selectClass + ', .' + selectClass + ' *',
    $wrap: $stage
  });

  navShaftTouchTail = moveOnTouch($navShaft, {
    onStart: onTouchStart,
    onMove: function (e, result) {
      setShadow($nav, result.edge);
    },
    onTouchEnd: onTouchEnd,
    onEnd: function (result) {

      function onEnd () {
        slideNavShaft.l = result.newPos;
        releaseAutoplay();
        changeAutoplay();
        thumbsDraw(result.newPos, true);
      }

      if (!result.moved) {
        var target = result.$target.closest('.' + navFrameClass, $navShaft)[0];
        target && onNavFrameClick.call(target, result.startEvent);
      } else if (result.pos !== result.newPos) {
        pausedAutoplayFLAG = true;
        slide($navShaft, {
          time: result.time,
          pos: result.newPos,
          overPos: result.overPos,
          onEnd: onEnd
        });
        thumbsDraw(result.newPos);
        o_shadows && setShadow($nav, findShadowEdge(result.newPos, navShaftTouchTail.min, navShaftTouchTail.max));
      } else {
        onEnd();
      }
    },
    timeLow: .5,
    timeHigh: 2,
    friction: 5,
    $wrap: $nav
  });

  stageWheelTail = wheel($stage, {
    shift: true,
    onEnd: function (e, direction) {
      //////console.log('wheel $stage onEnd', direction);
      onTouchStart();
      onTouchEnd();
      that.show({index: direction, slow: e.altKey})
    }
  });

  navWheelTail = wheel($nav, {
    onEnd: function (e, direction) {
      //////console.log('wheel $nav onEnd', direction);
      onTouchStart();
      onTouchEnd();
      var newPos = stop($navShaft) + direction * .25;
      $navShaft.css(getTranslate(minMaxLimit(newPos, navShaftTouchTail.min, navShaftTouchTail.max)));
      o_shadows && setShadow($nav, findShadowEdge(newPos, navShaftTouchTail.min, navShaftTouchTail.max));
      navWheelTail.prevent = {'<': newPos >= navShaftTouchTail.max, '>': newPos <= navShaftTouchTail.min};
      clearTimeout(navWheelTail.t);
      navWheelTail.t = setTimeout(function () {
        slideNavShaft.l = newPos;
        thumbsDraw(newPos, true)
      }, TOUCH_TIMEOUT);
      thumbsDraw(newPos);
    }
  });

  $wrap.hover(
      function () {
        setTimeout(function () {
          if (touchedFLAG) return;
          toggleControlsClass(!(hoverFLAG = true));
        }, 0);
      }, function () {
        if (!hoverFLAG) return;
        toggleControlsClass(!(hoverFLAG = false));
      }
  );

  function onNavFrameClick (e) {
    var index = $(this).data().eq;
    clickToShow({index: index, slow: e.altKey, user: true, coo: e._x - $nav.offset().left});
  }

  function onArrClick (e) {
    clickToShow({index: $arrs.index(this) ? '>' : '<', slow: e.altKey, user: true});
  }

  smartClick($arrs, function (e) {
    stopEvent(e);
    onArrClick.call(this, e);
  }, {
    onStart: function () {
      onTouchStart();
      stageShaftTouchTail.control = true;
    },
    onTouchEnd: onTouchEnd
  });

  function addFocusOnControls (el) {
    addFocus(el, function () {
      setTimeout(function () {
        lockScroll($stage);
      }, 0);
      toggleControlsClass(false);
    });
  }

  $arrs.each(function () {
    addEnterUp(this, function (e) {
      onArrClick.call(this, e);
    });
    addFocusOnControls(this);
  });

  addEnterUp(fullscreenIcon, that.toggleFullScreen);
  addFocusOnControls(fullscreenIcon);

  function reset () {
    setData();
    setOptions();

    if (!reset.i) {
      reset.i = true;
      // Only once
      var _startindex = opts.startindex;
      if (_startindex || opts.hash && location.hash) {
        startIndex = getIndexFromHash(_startindex || location.hash.replace(/^#/, ''), data, that.index === 0 || _startindex, _startindex);
      }
      activeIndex = repositionIndex = dirtyIndex = lastActiveIndex = startIndex = edgeIndex(startIndex) || 0;/*(o_rtl ? size - 1 : 0)*///;
    }

    if (size) {
      if (changeToRtl()) return;

      if ($videoPlaying) {
        unloadVideo($videoPlaying, true);
      }

      activeIndexes = [];
      detachFrames(STAGE_FRAME_KEY);

      reset.ok = true;

      that.show({index: activeIndex, time: 0});
      that.resize();
    } else {
      that.destroy();
    }
  }

  function changeToRtl () {
    //////console.log('changeToRtl');
    if (!changeToRtl.f === o_rtl) {
      changeToRtl.f = o_rtl;
      activeIndex = size - 1 - activeIndex;
      //////console.log('changeToRtl execute, activeIndex is', activeIndex);
      that.reverse();

      return true;
    }
  }

  $.each('load push pop shift unshift reverse sort splice'.split(' '), function (i, method) {
    that[method] = function () {
      data = data || [];
      if (method !== 'load') {
        Array.prototype[method].apply(data, arguments);
      } else if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].length) {
        data = clone(arguments[0]);
      }
      reset();
      return that;
    }
  });

  function ready () {
    if (!ready.ok) {
      ready.ok = true;
      triggerEvent('ready');
    }
  }

  reset();
};


$.fn.fotorama = function (opts) {
  return this.each(function () {
    var that = this,
        $fotorama = $(this),
        fotoramaData = $fotorama.data(),
        fotorama = fotoramaData.fotorama;

    if (!fotorama) {
      waitFor(function () {
        return !isHidden(that);
      }, function () {
        fotoramaData.urtext = $fotorama.html();
        new $.Fotorama($fotorama,
            /* Priority for options:
             * 1. <div data-loop="true"></div>
             * 2. $('div').fotorama({loop: false})
             * 3. Defaults */
            $.extend(
                {},
                OPTIONS,
                window.fotoramaDefaults,
                opts,
                fotoramaData
            )
        );
      });
    } else {
      fotorama.setOptions(opts, true);
    }
  });
};
$.Fotorama.instances = [];

function calculateIndexes () {
  $.each($.Fotorama.instances, function (index, instance) {
    instance.index = index;
  });
}

function addInstance (instance) {
  $.Fotorama.instances.push(instance);
  calculateIndexes();
}

function hideInstance (instance) {
  $.Fotorama.instances.splice(instance.index, 1);
  calculateIndexes();
}
$.Fotorama.cache = {};
$.Fotorama.measures = {};
$ = $ || {};
$.Fotorama = $.Fotorama || {};
$.Fotorama.jst = $.Fotorama.jst || {};

$.Fotorama.jst.style = function(v) {
var __t, __p = '', __e = _.escape;
__p += '.fotorama' +
((__t = ( v.s )) == null ? '' : __t) +
' .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:' +
((__t = ( v.m )) == null ? '' : __t) +
'px;\nheight:' +
((__t = ( v.h )) == null ? '' : __t) +
'px}\n.fotorama' +
((__t = ( v.s )) == null ? '' : __t) +
' .fotorama__thumb-border{\nheight:' +
((__t = ( v.h - v.b * (v.q ? 0 : 2) )) == null ? '' : __t) +
'px;\nborder-width:' +
((__t = ( v.b )) == null ? '' : __t) +
'px;\nmargin-top:' +
((__t = ( v.m )) == null ? '' : __t) +
'px}';
return __p
};

$.Fotorama.jst.video = function(v) {
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
__p += '<div class="fotorama__video"><iframe src="';
 print((v.type == 'youtube' ? v.p + 'youtube.com/embed/' + v.id +'?autoplay=1' : v.type == 'vimeo' ? v.p + 'player.vimeo.com/video/' + v.id + '?autoplay=1&badge=0' : v.id)  + (v.s && v.type != 'custom' ? '&' + v.s : '')) ;
__p += '" frameborder="0" allowfullscreen></iframe></div>\n';
return __p
};
$(function () {
  $('.' + _fotoramaClass + ':not([data-auto="false"])').fotorama();

  // Get usage statistics
  if (getProtocol() !== 'http://' || !location.host.match(/\./) || window.blockFotoramaData) return;
  $('body').append('<iframe src="http://data.fotorama.io/?version=' + fotoramaVersion + '" style="display: none;"></iframe>');
});
})(window, document, location, typeof jQuery !== 'undefined' && jQuery);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// if($('.jury_link').length > 0) {
 
//   $('.jury_link').tooltip('Жюри');

// }
;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  jQuery(function() {
    return $('#admin_jury_user_tokens').tokenInput('/ajax/users', {
      theme: 'facebook'
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);


// var maxHeight = 0;
// $('.thumbnail').each(function() { maxHeight = Math.max(maxHeight, $(this).height()); }).height(maxHeight);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  jQuery(function() {
    return $('#site_photo_user_id').tokenInput('/ajax/users', {
      theme: 'facebook',
      prePopulate: $('#site_photo_user_id').data('load')
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);



function add_to_string(s,num) {

  if(s.length == 0) {
    return num.toString();
  } else {

    return s+","+num;

  }

}

function remove_from_string(s,num) {


  var nums = s.split(",");
  var index = nums.indexOf(num.toString())

  if(index > -1) {
    nums.splice(index,1)
  }

  return nums.join(",")

}



function id_in_string(s,num) {

  var nums = s.split(",");
  var num_s =num.toString();
  // alert(num_s);
  var index = nums.indexOf(num_s);
  // alert(index);


  if(index > -1) return true;
  return false;

}

function photo_ids() {
  return $("#competition_photo_photo_ids").val();
}


function add_photo(id) {
  
 
  if(!id_in_string(photo_ids(),id)) {

    var elem_id = "#ph"+id;
    var elem_clon = $(elem_id).clone();

  

    elem_clon.attr("id","phc"+id);
    elem_clon.attr("num",id);
    
    // var elem_width = elem_clon.attr("width");
    // var elem_height = elem_clon.attr("height");

    // elem_clon.attr("width",elem_width*0.5);
    elem_clon.attr("height",80);


    elem_clon.appendTo("#next");



    $("#competition_photo_photo_ids").val(add_to_string(photo_ids(),id));


    $('#phc'+id).on("click", "", function() { 
      var s = $("#competition_photo_photo_ids").val();
      s = remove_from_string(photo_ids(),$(this).attr("num"));
      $("#competition_photo_photo_ids").val(s);
      $(this).remove(); 
    });

}

}
;
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
/* $Id: jquery-ui-datepicker-en.js 1606 2010-11-16 21:48:40Z cimorrison $ */
/* English (defaults to US) initialisation for the jQuery UI date picker plugin. */
/* Based on the en-GB initialisation */

jQuery(function($){
	$.datepicker.regional['en'] = {
		closeText: 'Done',
		prevText: 'Prev',
		nextText: 'Next',
		currentText: 'Today',
		monthNames: ['January','February','March','April','May','June',
		'July','August','September','October','November','December'],
		monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
		'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
		dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		dayNamesMin: ['Su','Mo','Tu','We','Th','Fr','Sa'],
		weekHeader: 'Wk',
		dateFormat: 'mm/dd/yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['en']);
});
/*!
 * jquery.tagcloud.js
 * A Simple Tag Cloud Plugin for JQuery
 *
 * https://github.com/addywaddy/jquery.tagcloud.js
 * created by Adam Groves
 */

(function($) {

  /*global jQuery*/
  "use strict";

  var compareWeights = function(a, b)
  {
    return a - b;
  };

  // Converts hex to an RGB array
  var toRGB = function(code) {
    if (code.length === 4) {
      code = code.replace(/(\w)(\w)(\w)/gi, "\$1\$1\$2\$2\$3\$3");
    }
    var hex = /(\w{2})(\w{2})(\w{2})/.exec(code);
    return [parseInt(hex[1], 16), parseInt(hex[2], 16), parseInt(hex[3], 16)];
  };

  // Converts an RGB array to hex
  var toHex = function(ary) {
    return "#" + jQuery.map(ary, function(i) {
      var hex =  i.toString(16);
      hex = (hex.length === 1) ? "0" + hex : hex;
      return hex;
    }).join("");
  };

  var colorIncrement = function(color, range) {
    return jQuery.map(toRGB(color.end), function(n, i) {
      return (n - toRGB(color.start)[i])/range;
    });
  };

  var tagColor = function(color, increment, weighting) {
    var rgb = jQuery.map(toRGB(color.start), function(n, i) {
      var ref = Math.round(n + (increment[i] * weighting));
      if (ref > 255) {
        ref = 255;
      } else {
        if (ref < 0) {
          ref = 0;
        }
      }
      return ref;
    });
    return toHex(rgb);
  };

  $.fn.tagcloud = function(options) {

    var opts = $.extend({}, $.fn.tagcloud.defaults, options);
    var tagWeights = this.map(function(){
      return $(this).attr("rel");
    });
    tagWeights = jQuery.makeArray(tagWeights).sort(compareWeights);
    var lowest = tagWeights[0];
    var highest = tagWeights.pop();
    var range = highest - lowest;
    if(range === 0) {range = 1;}
    // Sizes
    var fontIncr, colorIncr;
    if (opts.size) {
      fontIncr = (opts.size.end - opts.size.start)/range;
    }
    // Colors
    if (opts.color) {
      colorIncr = colorIncrement (opts.color, range);
    }
    return this.each(function() {
      var weighting = $(this).attr("rel") - lowest;
      if (opts.size) {
        $(this).css({"font-size": opts.size.start + (weighting * fontIncr) + opts.size.unit});
      }
      if (opts.color) {
        $(this).css({"color": tagColor(opts.color, colorIncr, weighting)});
      }
    });
  };

  $.fn.tagcloud.defaults = {
    size: {start: 14, end: 18, unit: "pt"}
  };

})(jQuery);
(function() {


}).call(this);
(function() {
  jQuery(function() {
    return $('#letter_people_tokens').tokenInput('/ajax/users', {
      theme: 'facebook',
      prePopulate: $('#letter_people_tokens').data('load')
    });
  });

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  jQuery(function() {
    return $('#photo_theme_tokens').tokenInput('/photo_ajax/theme_tokens', {
      theme: 'facebook',
      prePopulate: $('#photo_theme_tokens').data('load')
    });
  });

}).call(this);
/*!
 * @copyright &copy; Kartik Visweswaran, Krajee.com, 2014
 * @version 3.0.0
 *
 * A simple yet powerful JQuery star rating plugin that allows rendering
 * fractional star ratings and supports Right to Left (RTL) input.
 * 
 * For more JQuery plugins visit http://plugins.krajee.com
 * For more Yii related demos visit http://demos.krajee.com
 */
!function(e){var a=0,t=5,n=.5,r=function(a,t){return"undefined"==typeof a||null===a||void 0===a||a==[]||""===a||t&&""===e.trim(a)},l=function(e,a,t){var n=r(e.data(a))?e.attr(a):e.data(a);return n?n:t[a]},i=function(e){var a=(""+e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);return a?Math.max(0,(a[1]?a[1].length:0)-(a[2]?+a[2]:0)):0},s=function(e,a){return parseFloat(e.toFixed(a))},o=function(a,t){this.$element=e(a),this.init(t)};o.prototype={constructor:o,_parseAttr:function(e,i){var s=this,o=s.$element;if("range"===o.attr("type")||"number"===o.attr("type")){var c=l(o,e,i),p=n;"min"===e?p=a:"max"===e?p=t:"step"===e&&(p=n);var u=r(c)?p:c;return parseFloat(u)}return parseFloat(i[e])},listen:function(){var a=this;a.$rating.on("click",function(e){if(!a.inactive){var t=e.pageX-a.$rating.offset().left;a.setStars(t),a.$element.trigger("change"),a.$element.trigger("rating.change",[a.$element.val(),a.$caption.html()]),a.starClicked=!0}}),a.$rating.on("mousemove",function(e){if(a.hoverEnabled&&!a.inactive){a.starClicked=!1;var t=e.pageX-a.$rating.offset().left,n=a.calculate(t);a.toggleHover(n),a.$element.trigger("rating.hover",[n.val,n.caption,"stars"])}}),a.$rating.on("mouseleave",function(){if(a.hoverEnabled&&!a.inactive&&!a.starClicked){var e=a.cache;a.toggleHover(e),a.$element.trigger("rating.hoverleave",["stars"])}}),a.$clear.on("mousemove",function(){if(a.hoverEnabled&&!a.inactive&&a.hoverOnClear){a.clearClicked=!1;var e,t='<span class="'+a.clearCaptionClass+'">'+a.clearCaption+"</span>",n=a.clearValue,r=a.getWidthFromValue(n);e={caption:t,width:r,val:n},a.toggleHover(e),a.$element.trigger("rating.hover",[n,t,"clear"])}}),a.$clear.on("mouseleave",function(){if(a.hoverEnabled&&!a.inactive&&!a.clearClicked&&a.hoverOnClear){var e=a.cache;a.toggleHover(e),a.$element.trigger("rating.hoverleave",["clear"])}}),a.$clear.on("click",function(){a.inactive||(a.clear(),a.clearClicked=!0)}),e(a.$element[0].form).on("reset",function(){a.inactive||a.reset()})},initSlider:function(e){var l=this;r(l.$element.val())&&l.$element.val(0),l.initialValue=l.$element.val(),l.min="undefined"!=typeof e.min?e.min:l._parseAttr("min",e),l.max="undefined"!=typeof e.max?e.max:l._parseAttr("max",e),l.step="undefined"!=typeof e.step?e.step:l._parseAttr("step",e),(isNaN(l.min)||r(l.min))&&(l.min=a),(isNaN(l.max)||r(l.max))&&(l.max=t),(isNaN(l.step)||r(l.step)||0==l.step)&&(l.step=n),l.diff=l.max-l.min},init:function(a){var t=this;t.options=a,t.hoverEnabled=a.hoverEnabled,t.hoverChangeCaption=a.hoverChangeCaption,t.hoverChangeStars=a.hoverChangeStars,t.hoverOnClear=a.hoverOnClear,t.starClicked=!1,t.clearClicked=!1,t.initSlider(a),t.checkDisabled(),$element=t.$element,t.containerClass=a.containerClass,t.glyphicon=a.glyphicon;var n=t.glyphicon?"":"★";t.symbol=r(a.symbol)?n:a.symbol,t.rtl=a.rtl||t.$element.attr("dir"),t.rtl&&t.$element.attr("dir","rtl"),t.showClear=a.showClear,t.showCaption=a.showCaption,t.size=a.size,t.stars=a.stars,t.defaultCaption=a.defaultCaption,t.starCaptions=a.starCaptions,t.starCaptionClasses=a.starCaptionClasses,t.clearButton=a.clearButton,t.clearButtonTitle=a.clearButtonTitle,t.clearButtonBaseClass=r(a.clearButtonBaseClass)?"clear-rating":a.clearButtonBaseClass,t.clearButtonActiveClass=r(a.clearButtonActiveClass)?"clear-rating-active":a.clearButtonActiveClass,t.clearCaption=a.clearCaption,t.clearCaptionClass=a.clearCaptionClass,t.clearValue=a.clearValue,t.$element.removeClass("form-control").addClass("form-control"),t.$clearElement=r(a.clearElement)?null:e(a.clearElement),t.$captionElement=r(a.captionElement)?null:e(a.captionElement),"undefined"==typeof t.$rating&&"undefined"==typeof t.$container&&(t.$rating=e(document.createElement("div")).html('<div class="rating-stars"></div>'),t.$container=e(document.createElement("div")),t.$container.before(t.$rating),t.$container.append(t.$rating),t.$element.before(t.$container).appendTo(t.$rating)),t.$stars=t.$rating.find(".rating-stars"),t.generateRating(),t.$clear=r(t.$clearElement)?t.$container.find("."+t.clearButtonBaseClass):t.$clearElement,t.$caption=r(t.$captionElement)?t.$container.find(".caption"):t.$captionElement,t.setStars(),t.$element.hide(),t.listen(),t.showClear&&t.$clear.attr({"class":t.getClearClass()}),t.cache={caption:t.$caption.html(),width:t.$stars.width(),val:t.$element.val()},t.$element.removeClass("rating-loading")},checkDisabled:function(){var e=this;e.disabled=l(e.$element,"disabled",e.options),e.readonly=l(e.$element,"readonly",e.options),e.inactive=e.disabled||e.readonly},getClearClass:function(){return this.clearButtonBaseClass+" "+(this.inactive?"":this.clearButtonActiveClass)},generateRating:function(){var e=this,a=e.renderClear(),t=e.renderCaption(),n=e.rtl?"rating-container-rtl":"rating-container",l=e.getStars();n+=e.glyphicon?""==e.symbol?" rating-gly-star":" rating-gly":" rating-uni",e.$rating.attr("class",n),e.$rating.attr("data-content",l),e.$stars.attr("data-content",l);var n=e.rtl?"star-rating-rtl":"star-rating";e.$container.attr("class",n+" rating-"+e.size),e.inactive?e.$container.removeClass("rating-active").addClass("rating-disabled"):e.$container.removeClass("rating-disabled").addClass("rating-active"),"undefined"==typeof e.$caption&&"undefined"==typeof e.$clear&&(e.rtl?e.$container.prepend(t).append(a):e.$container.prepend(a).append(t)),r(e.containerClass)||e.$container.removeClass(e.containerClass).addClass(e.containerClass)},getStars:function(){for(var e=this,a=e.stars,t="",n=1;a>=n;n++)t+=e.symbol;return t},renderClear:function(){var e=this;if(!e.showClear)return"";var a=e.getClearClass();return r(e.$clearElement)?'<div class="'+a+'" title="'+e.clearButtonTitle+'">'+e.clearButton+"</div>":(e.$clearElement.removeClass(a).addClass(a).attr({title:e.clearButtonTitle}),e.$clearElement.html(e.clearButton),"")},renderCaption:function(){var e=this,a=e.$element.val();if(!e.showCaption)return"";var t=e.fetchCaption(a);return r(e.$captionElement)?'<div class="caption">'+t+"</div>":(e.$captionElement.removeClass("caption").addClass("caption").attr({title:e.clearCaption}),e.$captionElement.html(t),"")},fetchCaption:function(e){var a,t,n=this,l=parseFloat(e);if(a="function"==typeof n.starCaptionClasses?r(n.starCaptionClasses(l))?n.clearCaptionClass:n.starCaptionClasses(l):r(n.starCaptionClasses[l])?n.clearCaptionClass:n.starCaptionClasses[l],"function"==typeof n.starCaptions)var t=r(n.starCaptions(l))?n.defaultCaption.replace(/\{rating\}/g,l):n.starCaptions(l);else var t=r(n.starCaptions[l])?n.defaultCaption.replace(/\{rating\}/g,l):n.starCaptions[l];var i=l==n.clearValue?n.clearCaption:t;return'<span class="'+a+'">'+i+"</span>"},getWidthFromValue:function(e){{var a=this,t=a.min,n=a.max;a.step}return t>=e||t==n?0:e>=n?100:100*(e-t)/(n-t)},getValueFromPosition:function(e){var a,t,n=this,r=i(n.step),l=n.$rating.width();return a=e/l,t=n.rtl?n.min+Math.floor(n.diff*a/n.step)*n.step:n.min+Math.ceil(n.diff*a/n.step)*n.step,t<n.min?t=n.min:t>n.max&&(t=n.max),t=s(parseFloat(t),r),n.rtl&&(t=n.max-t),t},toggleHover:function(e){var a=this;if(a.hoverChangeCaption){var t=e.val<=a.clearValue?a.fetchCaption(a.clearValue):e.caption;a.$caption.html(t)}if(a.hoverChangeStars){var n=a.getWidthFromValue(a.clearValue),r=e.val<=a.clearValue?a.rtl?100-n+"%":n+"%":e.width;a.$stars.css("width",r)}},calculate:function(e){var a=this,t=r(a.$element.val())?0:a.$element.val(),n=arguments.length?a.getValueFromPosition(e):t,l=a.fetchCaption(n),i=a.getWidthFromValue(n);return a.rtl&&(i=100-i),i+="%",{caption:l,width:i,val:n}},setStars:function(e){var a=this,t=arguments.length?a.calculate(e):a.calculate();a.$element.val(t.val),a.$stars.css("width",t.width),a.$caption.html(t.caption),a.cache=t},clear:function(){var e=this,a='<span class="'+e.clearCaptionClass+'">'+e.clearCaption+"</span>";e.$stars.removeClass("rated"),e.inactive||e.$caption.html(a),e.$element.val(e.clearValue),e.setStars(),e.$element.trigger("rating.clear")},reset:function(){var e=this;e.$element.val(e.initialValue),e.setStars(),e.$element.trigger("rating.reset")},update:function(e){if(arguments.length>0){var a=this;a.$element.val(e),a.setStars()}},refresh:function(a){var t=this;if(arguments.length){t.init(e.extend(t.options,a)),t.showClear?t.$clear.show():t.$clear.hide(),t.showCaption?t.$caption.show():t.$caption.hide()}}},e.fn.rating=function(a){var t=Array.apply(null,arguments);return t.shift(),this.each(function(){var n=e(this),r=n.data("rating"),l="object"==typeof a&&a;r||n.data("rating",r=new o(this,e.extend({},e.fn.rating.defaults,l,e(this).data()))),"string"==typeof a&&r[a].apply(r,t)})},e.fn.rating.defaults={stars:5,glyphicon:!0,symbol:null,disabled:!1,readonly:!1,rtl:!1,size:"md",showClear:!0,showCaption:!0,defaultCaption:"{rating} Stars",starCaptions:{.5:"Half Star",1:"One Star",1.5:"One & Half Star",2:"Two Stars",2.5:"Two & Half Stars",3:"Three Stars",3.5:"Three & Half Stars",4:"Four Stars",4.5:"Four & Half Stars",5:"Five Stars"},starCaptionClasses:{.5:"label label-danger",1:"label label-danger",1.5:"label label-warning",2:"label label-warning",2.5:"label label-info",3:"label label-info",3.5:"label label-primary",4:"label label-primary",4.5:"label label-success",5:"label label-success"},clearButton:'<i class="glyphicon glyphicon-minus-sign"></i>',clearButtonTitle:"Clear",clearButtonBaseClass:"clear-rating",clearButtonActiveClass:"clear-rating-active",clearCaption:"Not Rated",clearCaptionClass:"label label-default",clearValue:0,captionElement:null,clearElement:null,containerClass:null,hoverEnabled:!0,hoverChangeCaption:!0,hoverChangeStars:!0,hoverOnClear:!0},e("input.rating").addClass("rating-loading"),e(document).ready(function(){var a=e("input.rating"),t=Object.keys(a).length;t>0&&a.rating()})}(jQuery);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//









// Or peek any of them yourself










$(document).ready(function() {

$('.jury_rate').on('rating.change', function(event, value, caption) {
  var data = $(this).attr("data");
  $.post( "/jury_rating", { rate: value, data: data  }, function(data) {} );
});

$('.jury_rate').on('rating.clear', function(event) {
  var data = $(this).attr("data");
  $.post( "/jury_rating", { rate: 0, data: data  }, function(data) {} ); 
});

$('.final_estimate').on('rating.clear', function(event) {
  var data = $(this).attr("data");
  $.post( "/admin/final_rating", { rate: 0, data: data  }, function(data) {} );
});


$('.final_estimate').on('rating.change', function(event, value, caption) {
  var data = $(this).attr("data");
  $.post( "/admin/final_rating", { rate: value, data: data  }, function(data) {} );
});

// $('.jury_rate').on('click',function() {
    
//     var data = $(this).attr("data");
//     var rate = this.value;
//     $.post( "/jury_rating", { rate: rate, data: data  }, function(data) {

//         // alert(data);

//     } );
// });

// $('.final_estimate').on('click',function() {
//     var data = $(this).attr("data");
//     var rate = this.value;
//     $.post( "/admin/final_rating", { rate: rate, data: data  }, function(data) {} );

// });


$('.fotorama').fotorama({
  maxwidth: '100%',
  ratio: 16/9,
  allowfullscreen: true,
  nav: 'thumbs'
  
});


// убирает флеш сообщения через некоторое время
// $("div[id^='flash_box']").fadeOut(10000);
// !!! нужно изменить способ адресации фоторамы здесь чтобы не трогало фотораму на главной
$('.fotorama').on(
  'fotorama:show',
  function (e, fotorama, extra) {
    // console.log(fotorama.activeFrame.img);
    var re = /\d+/;
    var href = fotorama.activeFrame.img
    var id = href.match(re)
    var image_path = "/gallery/show/"+id;  
//!!! Здесь нет префикса языка 

    $(".comlink").attr('href',image_path)
    
  }
);

    


});

