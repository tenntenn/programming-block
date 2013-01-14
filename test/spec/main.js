define(
	'spec/main',
	[
		// ここにテストモジュールを書く
		'spec/testSample'
	],
	function() {
		if (window.mochaPhantomJS) {
			// on console
			mochaPhantomJS.run();
		} else {
			// on browser
			mocha.run();
		}
	}
);
