module.exports = {
  	dist: {
		src: [ "dist/css/style.css" ],
		dest: "dist/css/style.css",
		options: {
			deleteAfterEncoding : false,
			regexExclude: /\.(eot|woff|woff2|ttf|svg)/gi
		}
	}
};