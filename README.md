This jQuery plugin attempts to provide an easy way to create a [parallax effect](http://en.wikipedia.org/wiki/Parallax).

It's far from complete and far from robust (just like its README file).

## Usage

```javascript
$('#selector').parallax([command][, options]);
```

If the <code>command</code> parameter is omitted, the <code>'init'</code> command
is assumed (see below).

The following commands are supported:

```javascript
'init'		// Initialise the parallax effect.
'pause'		// Pause the parallax effect.
'resume'	// Resume a paused parallax.
```

The following options may or may not be available:

```javascript
// The default options. These are exposed so they're globally editdable.
$.fn.parallax.defaults = $.fn.parallax.defaults || {
	inverse: false,
	throttle: 5,
	reference: 'mouse'
}
```

Everything here is subject to change. 

## Feedback, Bug Reports & Contributions 
Support requests and bug reports can be posted to the 
[GitHub issue tracker](https://github.com/drzax/jquery-parallax/issues). If you'd 
like to help improve jQuery.parallax feel free to submit a pull request via GitHub.

<a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br />This work is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-ShareAlike 3.0 Unported License</a>.


