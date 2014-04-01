
/**
 * Dependencies
 */

var Grid = require('mocha-cloud-grid-view');
var size = process.stdout.getWindowSize();
var Canvas = require('term-canvas');

/**
 * Initialize grid reporter.
 *
 * @return {Function}
 * @api public
 */

module.exports = function(){
  return function(gravy){
    var canvas = new Canvas(size[0], size[1]);
    var ctx = canvas.getContext('2d');

    gravy.once('started', function(){
      grid = new Grid(gravy.cloud, ctx);
      grid.size(canvas.width, canvas.height);
      ctx.hideCursor();
    });

    process.once('SIGINT', function(){
      process.nextTick(process.exit.bind(process));
      ctx.reset();
    });

    gravy.once('error', function(err){
      ctx.reset();
      throw err;
    });

    gravy.once('ended', function(res){
      grid.showFailures();
      setTimeout(function(){
        ctx.showCursor();
        process.exit(grid.totalFailures());
      }, 100);
    });
  };
}

/**
 * Prevent "Invalid array length" error...
 */

Grid.prototype.maxWidth = function(){
  return max(this.browsers, function(b){
    var len = (b.browserName + b.version).length;
    return Math.max(len + 1, b.platform.length);
  });
};

/**
 * Max `arr`, `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @api private
 */

function max(arr, fn){
  var max = -Infinity;
  var ret;

  for (var i = 0; i < arr.length; ++i) {
    ret = fn(arr[i], i);
    max = ret > max ? ret : max;
  }

  return max;
}