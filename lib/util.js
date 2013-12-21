
/**
 * Dependencies
 */

var map = require('./map');

/**
 * Parse browser names.
 *
 * TODO: separate repo
 *
 * Example:
 *
 *      parse('ie6...7');
 *
 * @param {String} str
 * @return {Array}
 * @api public
 */

exports.parse = function(str){
  var m = /^([a-z]+)(\d(\.\.\.?)?\d*)?/.exec(str);
  return exports.range(m[2]).map(function(v){
    var oses = map[m[1]];
    var name = map.names[m[1]] || m[1];
    return [name, v, oses ? oses[v] : os(str)];
  });
};

/**
 * return array of `range`.
 *
 * @param {String} range
 * @return {Array}
 * @api public
 */

exports.range = function(range){
  if (!range) return [''];
  var all = range.match(/\d+/g);
  var start = Number(all.shift());
  var end = Number(all.shift());
  var ret = [];
  end = end || start;

  for (var i = start; i <= end; ++i) {
    ret.push(parseInt(i));
  }

  return ret;
};

/**
 * Get os from `name`.
 *
 * @param {String} name
 * @return {String}
 * @api private
 */

function os(name){
  var parts = name.split(/ +/);
  parts.shift();
  return parts.join(' ') || 'OSX 10.9';
}
