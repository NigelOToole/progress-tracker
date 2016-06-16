'use strict';

// This JS is only needed for the demo to show features

var progressTrackerDemo = (function() {

	var animPathLinks = document.querySelectorAll('#anim-path li');
	var animPathLinksLength = animPathLinks.length;

	function initAnimPathDemo() {

		for (var i = 0; i < animPathLinksLength; i++) {
			_handleClick(animPathLinks[i], i);
		}

	}

	function _handleClick(link, index) {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			_deactivateOtherLinks(index);
			_toggleClass(this, 'is-complete');

			if(this.nextElementSibling !== null) {
				_toggleClass(this.nextElementSibling, 'is-active');
			}

		});
	};

	function _deactivateOtherLinks(activeIndex) {

		for (var i = 0; i < animPathLinksLength; i++) {
			if (i >= activeIndex) {
				_removeClass(animPathLinks[i], 'is-complete');
				_removeClass(animPathLinks[i], 'is-active');
			}
		}
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

	function _removeClass(el, className) {

		if (el.classList)
		  el.classList.remove(className);
		else
		  el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

	}

	return {
		initAnimPathDemo: initAnimPathDemo
	};

})();

progressTrackerDemo.initAnimPathDemo();
