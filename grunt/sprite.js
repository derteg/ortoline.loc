module.exports = {
  // Настройки для разработки
	buildretina: {
		'src': ['src/ico/sprite2x/*@2x.png'],
		'dest': 'src/ico/sprite@2x.png',
		'destCss': 'src/sass/_sprite.scss',
		'padding': 20
	},
	build: {
		'src': ['src/ico/sprite2x/*.png', '!<%= sprite.buildretina.src %>'],
		// dest should be same as in sprite:buildretina task, but without @2x
		'dest': 'src/ico/sprite.png',
		// padding should be twice smaller, than padding in sprite:buildretina task
		'padding': 10,
		// path to template
		'cssTemplate': 'spritesmith-retina-mixins.template.mustache',

		'destCss': '<%= sprite.buildretina.destCss %>'
	}
	// build: {
	// 	name: 'retina',
	// 	algorithm: 'left-right',
	// 	src: 'src/ico/sprite2x/*.png',
	// 	dest: 'src/ico/sprite_01@2x.png',
	// 	cssTemplate: 'spritesmith-retina-mixins.template.mustache',
	// 	destCss: 'src/sass/_sprite__retina.scss',
	// 	format: 'scss',
	// 	padding: 40,
	// 	cssVarMap: function (sprite) {
	// 		sprite.name = 'sprite_' + sprite.name;
	// 	}
	// }

};