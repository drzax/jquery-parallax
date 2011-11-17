/*
 * jQuery.parallax plugin
 * https://github.com/drzax/jquery-parallax
 *
 * Copyright 2011, Simon Elvery
 * http://elvery.net
 *
 * This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License.
 * http://creativecommons.org/licenses/by-sa/3.0/ 
 */
(function($) {
	
	/*
	 * Make logging easier
	 */
	var log = function(message){
		if ( window.console && window.console.log ) {
			window.console.log(message);
		}
		$.error(message);
	}
	
	// Public methods
	var methods = {
		
		/*
		 * Initialise the parallax
		 */
		init: function(_opts) {
			var $container = this.first(), // This only ever applies to the first element in the set.
				pos = $container.position(),
				left = pos.left,
				top = pos.top,
				w = $container.width(),
				h = $container.height(),
				layers = [],
				count = 0,
				throttle = 0,
				opts = $.extend({layers: [], offset:2}, $.fn.parallax.defaults, _opts);

			// Setup default offsets
			opts.offset = opts.offset/100;
			if (typeof opts.offset_y == 'undefined') opts.offset_y = h*opts.offset;
			if (typeof opts.offset_x == 'undefined') opts.offset_x = w*opts.offset;

			// Nothing to do if there aren't any layers
			if ( ! opts.layers.length ) {
				log('[parallax] terminating; no layers defined');
				return this; // Stay chainable 
			}
			
			// Add the background
			if (opts.background) {
				if (typeof opts.background == 'string') { // Image URL
					var $background = $('<img src="' + opts.background + '" style="position:absolute;top:0px;left:0px;"/>')
						.hide()
						.load(function(){
							$(this).fadeIn();
						}).appendTo($container);
				}
				// TODO: Add additional options for defining background element
			}
			

			// Build the layers
			for (var i=0, ii=opts.layers.length; i<ii; i++) {
				layers[i] = $(opts.layers[i].element || '<div>');
				layers[i].css({position: 'absolute', left: left, top: top, width: w, height: h}).insertAfter(layers[i-1]||$background);

				var sprites = opts.layers[i].sprites || [];
				for (var j=0, jj=sprites.length; j<jj; j++) {
					if (typeof sprites[j].src == 'undefined') continue;
					var $img = $('<img src="' + sprites[j].src + '" style="position:absolute;top:' + (sprites[j].top || 0) + 'px;left:' + (sprites[j].left || 0) + 'px;"/>')
						.hide()
						.load(function(){
							if ($.browser.msie && $.browser.version < 9) {
								$(this).show();
							} else {
								$(this).fadeIn();
							}
						});
					layers[i].append($('<div>').css({
//						'-ms-filter': "progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF)",
//						'filter': 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#00FFFFFF,endColorstr=#00FFFFFF;'
					}).append($img).addClass('sprite'));
				}
			}
			count = layers.length;
			

			$(document).mousemove(function(e){
				
				// Don't react to every mouse move. It gets a little intense.
				throttle++
				if (throttle%opts.throttle > 0) return;

				if ($container.data('paused')) return;
				
				// Mouse distance off centre
				var offset = $background.offset(),
					x = e.pageX - offset.left - w/2,
					y = e.pageY - offset.top - h/2,
					delta_x = (x/(w/2)) * opts.offset_x,
					delta_y = (y/(h/2)) * opts.offset_y;

					if (opts.inverse) {
						delta_x = -delta_x
						delta_y = -delta_y
					}

				for (var i = 0; i<count; i++) {
					layers[i].css({left: delta_x/(count-i), top: delta_y/(count-i)});
				}
			});
			return this; // Stay chainable 
		},
		pause : function() {
			return this.each(function(){
				$(this).data('paused', true);
			});
		},
		resume : function(){
			return this.each(function(){
				$(this).data('paused', false);
			});
		}
	}
	
	// The plugin function
	$.fn.parallax = $.fn.parallax || function( method ) {
		if ( methods[method] ) {
			// Remove the first argument (method name) and send on to the requested method.
			return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			// Initialise the parallax
			return methods.init.apply( this, arguments );
		} else {
			log( '[parallax] method "' +  method + '" does not exist' );
			return this;
		}
	}
	
	// The default options. These are exposed so they're globally editdable.
	$.fn.parallax.defaults = $.fn.parallax.defaults || {
		inverse: false,
		throttle: 5,
		reference: 'mouse'
	}
	
})(jQuery);