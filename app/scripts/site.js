'use strict';

// This JS is only needed for the demo to show features

var progressTrackerDemo = (function() {

	function initAnimPathDemo() {

		var animPathLinks = document.querySelectorAll('#anim-path li');
		var animPathLinksLength = animPathLinks.length;

		for (var i = 0; i < animPathLinksLength; i++) {
			_handleClick(animPathLinks[i]);
		}

	}

	function _handleClick(link) {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			_toggleClass(this, 'is-complete');

			if(this.nextElementSibling !== null) {
				_toggleClass(this.nextElementSibling, 'is-active');
			}

		});
	};

	function _toggleClass(el, className) {

		if (el.classList) {
			el.classList.toggle(className);
		} else {
			var classes = el.className.split(' ');
			var existingIndex = classes.indexOf(className);

			if (existingIndex >= 0)
			classes.splice(existingIndex, 1);
			else
			classes.push(className);

			el.className = classes.join(' ');
		}

	}

	return {
		initAnimPathDemo: initAnimPathDemo
	};

})();

progressTrackerDemo.initAnimPathDemo();
