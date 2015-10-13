/**
*	Simple Spec Test
*	@author Patricio Ferreira <3dimentionar@gmail.com>
**/
define(['specs/main.spec'], function(MainSpec) {

	return {

		$id: 'simple',
		$specs: [MainSpec],

		b: true,
		n: 10,
		a: ['$bone!n', 2, '$bone!b'],
		d: new Date(),
		r: new RegExp('/\./', 'i'),
		s: 'Hello',
		test: 'advanced',
		nested: [
			{ deep: '$bone!o' },
			{ prop: '$bone!n' }
		],
		o: { prop: '$bone!s' },
		holder: { subcontent: '$bone!subcontent' },

		model: {
			$module: 'util/schema',
			$params: {
				_b: '$bone!b',
				_s: '$bone!s',
				_n: '$bone!n',
				_o: '$bone!o',
				_a: '$bone!a',
				_d: '$bone!d',
				_r: '$bone!r',
				_test: '$bone!test',
				_nested: '$bone!nested'
			}
		},

		simple: {
			$module: 'ui/view',
			$params: { id: 'simple' }
		},

		content: {
			$module: 'ui/container',
			$params: { id: 'content', views: ['$bone!simple', '$bone!subcontent'] }
		},

		subcontent: {
			$module: 'ui/container',
			$params: { id: 'subcontent', views: ['$bone!advanced'] }
		},

		advanced: {
			$module: 'ui/view',
			$params: { id: '$bone!test' }
		},

		$ready: [
			{ '$bone!model.set': ['_test', '$bone!simple.toString'] },
			{ '$bone!simple.listenTo': ['$bone!model', 'change:_b', '$bone!simple.update'] }
		]

	};

});
