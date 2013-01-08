define(
	'spec/main',
	[
		// ここにテストモジュールを書く
	],
	function() {
		$(function() {
			if (window.mochaPhantomJS) {
				// on console
				mochaPhantomJS.run();
			} else {
				// on browser
				mocha.run();
			}
		});
	}
);
