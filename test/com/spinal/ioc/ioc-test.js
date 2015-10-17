/**
*	Master Pass Test on IoC full implementation
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['ioc/context',
	'ui/view',
	'ui/container',
	'specs/ioc.spec'], function(Context, View, Container, IocSpec, AdvancedSpec) {

	describe('IoC Master Pass', function() {

		before(function() {
			this.context = null;
		});

		after(function() {
			delete this.context;
		});

		describe('IoC Spec', function() {

			it('Should Wire IoC Spec', function(done) {
				this.context = new Context();
				this.context.on(Context.EVENTS.complete, _.bind(function(type, spec) {
					// Non-module test case
					var nested = this.context.bone('nested').bone();
					var s = this.context.bone('s').bone();
					expect(nested[0].deep.prop).to.be(s);

					// Module test cases
					var globalView = this.context.bone('global').bone();
					var content = this.context.bone('content').bone();
					var holder = this.context.bone('holder').bone();
					var simple = this.context.bone('simple').bone();
					var model = this.context.bone('model').bone();

					expect(content.get(0)).to.be.a(View);
					expect(content.get(0).id).to.be(simple.id);
					expect(holder.subcontent).to.be.a(View);
					expect(holder.subcontent.id).to.be(content.get(1).id);

					simple.on(View.EVENTS.update, _.bind(function(view) {
						expect(view.model.get('prop')).to.be('Hello IoC!');
						done();
					}, this));

					model.set('prop', 'Hello IoC!');
				}, this));
				this.context.wire(IocSpec);
			});

		});

		describe('Plugin Spec', function() {

			it('Should wire and setup plugins from Spec');

		});

	});

});
