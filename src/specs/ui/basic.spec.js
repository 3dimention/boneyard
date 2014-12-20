/**
*	SpinalJS Basic Spec
*	@author Patricio Ferreira <3dimentionar@gmail.com>
*/
define(['specs/ui/basic/paragraph.spec',
	'specs/ui/basic/link.spec',
	'specs/ui/basic/header.spec',
	'specs/ui/basic/label.spec',
	'specs/ui/basic/span.spec',
	'specs/ui/basic/image.spec'], function(ParagraphSpec, LinkSpec, HeaderSpec,
		LabelSpec, SpanSpec, ImageSpec) {

	return {

		$id: 'ui-basic',
		$specs: [ParagraphSpec, LinkSpec, HeaderSpec, LabelSpec, SpanSpec, ImageSpec],

		basic_header: {
			$module: 'ui/basic/header',
			$params: {
				content: 'Basic <small><kbd>com.spinal.ui.basic</kbd></small>',
				heading: '2'
			}
		},

		cparagraph: {
			$module: 'ui/misc/panel',
			$params: { title: 'Paragraph' }
		},

		clink: {
			$module: 'ui/misc/panel',
			$params: { title: 'Link' }
		},

		cheader: {
			$module: 'ui/misc/panel',
			$params: { title: 'Headers' }
		},

		clabel: {
			$module: 'ui/misc/panel',
			$params: { title: 'Label' }
		},

		cspan: {
			$module: 'ui/misc/panel',
			$params: { title: 'Spans' }
		},

		cimage: {
			$module: 'ui/misc/panel',
			$params: { title: 'Images' }
		},

		$ready: [{
			'$bone!global.addAll': [[
				'$bone!basic_header',
				'$bone!cparagraph',
				'$bone!clink',
				'$bone!cheader',
				'$bone!clabel',
				'$bone!cspan',
				'$bone!cimage'
			], { renderOnAdd: true }]
		}]

	};

});