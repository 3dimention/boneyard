/**
*	@module com.spinal.ioc.engine.helpers
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['util/exception/ioc/dependency'], function(DependencyException) {

	/**
	*	Class Dependency
	*	@namespace com.spinal.ioc.engine.helpers
	*	@class com.spinal.ioc.engine.helpers.Dependency
	*	@extends com.spinal.core.SpinalClass
	*
	*	@requires com.spinal.util.exception.ioc.DependencyException
	**/
	var Dependency = Spinal.namespace('com.spinal.ioc.engine.helpers.Dependency', Spinal.SpinalClass.inherit({

		/**
		*	Ioc engine
		*	@public
		*	@property Engine
		*	@type com.spinal.ioc.engine.Engine
		**/
		engine: null,

		/**
		*	Initialize
		*	@public
		*	@chainable
		*	@method initialize
		*	@param attrs {Object} attributes
		*	@return com.spinal.ioc.engine.helpers.Dependency
		**/
		initialize: function(attrs) {
			attrs || (attrs = {});
			this.valid(attrs)
			this.engine = require('ioc/engine/engine');
			Dependency.__super__.initialize.apply(this, arguments);
			return _.extend(this, attrs);
		},

		/**
		*	Validate constructor parameters
		*	@public
		*	@throws Error
		*	@method valid
		*	@param attrs {Object} attributes
		**/
		valid: function(attrs) {
			if(!_.defined(attrs.target) || !_.isObject(attrs.target)) throw new DependencyException('TargetRequired');
			if(!_.defined(attrs.property)) throw new DependencyException('PropertyRequired');
			if(!attrs.target[attrs.property]) throw new DependencyException('UndefinedTargetProperty');
		},

		/**
		*	Retrieves engine
		*	@public
		*	@method getEngine
		*	@return com.spinal.ioc.engine.Engine
		**/
		getEngine: function() {
			return this.engine;
		},

		/**
		*	Default Resolve strategy
		*	@public
		*	@method resolve
		*	@param injector {com.spinal.ioc.engine.helpers.Injector} injector reference
		*	@return com.spinal.ioc.engine.helpers.Dependency
		**/
		resolve: function(injector) {
			return this.canResolve() ? injector.inject(this) : injector.hold(this);
		},

		/**
		*	Returns true if this dependency can be resolved
		*	@public
		*	@method canResolve
		*	@param injector {com.spinal.ioc.engine.helpers.Injector} injector reference
		*	@return Boolean
		**/
		canResolve: function(injector) {
			var bone = this.getEngine().bone(this.getId());
			return (bone && (!bone.isModule() || bone.isCreated()));
		},

		/**
		*	Retrieves dependency
		*	@public
		*	@method get
		*	@return Object
		**/
		get: function() {
			if(!(m = this.getCompound())) return null;
			return _.isObject(m) ? this.getEngine().bone(m.id)[m.method] : this.getEngine().bone(m);
		},

		/**
		*	Extracts dependency id from dependency expression
		*	@public
		*	@method getId
		*	@return String
		**/
		getId: function() {
			var expr = this.getExpression(), annot = this.injector.get(), pos = expr.indexOf(annot.getBoneExpression());
			return (pos !== -1) ? expr.substring((pos + 1), expr.length) : null;
		},

		/**
		*	Extracts Compound Dependency from dependency expression if exist
		*	@public
		*	@method getCompound
		*	@return Object
		**/
		getCompound: function() {
			if(!(id = this.getId())) return null;
			var compound = id.split('.');
			return (compound.length > 1) ? { id: compound[0], method: [0] } : id;
		},

		/**
		*	Retrieves dependency expression
		*	@public
		*	@method getExpression
		*	@return String
		**/
		getExpression: function() {
			return this.expression;
		},

		/**
		*	Retrieves dependency target
		*	@public
		*	@method getTarget
		*	@return Object
		**/
		getTarget: function() {
			return this.target;
		},

		/**
		*	Retrieves dependency target property
		*	@public
		*	@method getProperty
		*	@return String
		**/
		getProperty: function() {
			return this.property;
		}

	}, {

		/**
		*	@static
		*	@property NAME
		*	@type String
		**/
		NAME: 'Dependency'

	}));

	return Dependency;

});
