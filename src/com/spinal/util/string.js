/**
*	@module com.spinal.util
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['core/spinal',
		'util/exception/exception'], function(Spinal, SpinalException) {

	/**
	*	StringUtil class provides a bunch of string utilities.
	*	@namespace com.spinal.util
	*	@class com.spinal.util.StringUtil
	*	@extends com.spinal.core.SpinalClass
	*
	*	@requires com.spinal.core.Spinal
	*	@requires com.spinal.util.exception.Exception
	**/
	var StringUtil = Spinal.namespace('com.spinal.util.StringUtil', Spinal.SpinalClass.inherit({

		/**
		*	Initialize
		*	@public
		*	@method initialize
		*	@return {com.spinal.util.StringUtil}
		**/
		initialize: function() {
			throw new SpinalException('StaticClass');
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'StringUtil',

		/**
		*	Returns a UUID (Universally Unique Identifier)
		*	@static
		*	@method uuid
		*	@return String
		**/
		uuid: function() {
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0,
					v = (c === 'x') ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
		},

		/**
		*	Convert a JSON object into a query string format
		*	@static
		*	@method create
		*	@param o {Object} object to be converted
		*	@param [ignoreQMark] {Boolean} optional to skip question mark as part of the query string
		*	@param [separator] {String} separator used to split key-value pairs ('&' by default)
		**/
		createQueryString: function(o, noQMark, separator) {
			var pairs = [], i, len;
			_.each(o, function(k, v) {
				if(_.isArray(v)) {
					for (i = 0, len = v.length; i < len; i++) pairs.push(k + '=' + encodeURIComponent(decodeURIComponent(v[i])));
				} else {
					pairs.push(k + '=' + encodeURIComponent(decodeURIComponent(v)));
				}
			}, this);
			return ((noQMark || _.isEmpty(o)) ? '' : '?') + pairs.join((separator) ? separator : '&');
		},

		/**
		*	Convert a String in dot notation format into a JSON object
		*	@static
		*	@method strToJSON
		*	@param expr {String} dot notation
		*	@retur Object
		**/
		strToJSON: function(expr) {
			if(!expr || !_.isString(expr) || expr === '') return {};
			var p = {}, o = p, ps = expr.split('.');
			for(var i = 0; i < ps.length; i++) {
				p[ps[i]] = {}; p = p[ps[i]];
				if(i === (ps.length-1)) delete p;
			}
			return o;
		},

		/**
		*	Prefixes props keys in props input object with a '_' to match the private members convention
		*	and returns the object
		*	@static
		*	@method toPrivate
		*	@param props {Object} Object to convert keys from
		*	@return Object
		**/
		toPrivate: function(props) {
			_.each(props, function(v, k, o) { o['_' + k] = v; delete o[k]; });
			return props;
		},

		/**
		*	Perform a query using a string (dot notation) on the obj passed as parameter.
		*	If the input doesn't match, it returns null.
		*	@static
		*	@method search
		*	@param query {String} query in dot notation format
		*	@param obj {Object} JSON object ref
		*	@return Object
		**/
		search: function(query, obj) {
			if(!query || !obj || query === '') return null;
			if(_.isEmpty(obj)) return obj;
			var q = query.split("."), o = obj;
		    for (var i = 0; i < q.length; i++) {
				if(!o[q[i]]) break;
				o = o[q[i]];
			}
		    return o;
		}

	}));

	return StringUtil;

});
