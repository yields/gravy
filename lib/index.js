
/**
 * Dependencies
 */

var reporters = require('./reporters');
var debug = require('debug')('gravy');
var Emitter = require('events').EventEmitter;
var localtunnel = require('localtunnel');
var Canvas = require('term-canvas');
var proxy = require('proxy-events');
var Cloud = require('mocha-cloud');
var browser = require('wd-browser');
var parse = require('url').parse;

/**
 * Export `Gravy`
 */

module.exports = Gravy;

/**
 * Export reporters
 */

Gravy.reporters = reporters;

/**
 * Initialize `Gravy`.
 *
 * @param {String} project
 * @param {String} user
 * @param {String} key
 * @api public
 */

function Gravy(project, user, key){
  if (!(this instanceof Gravy)) return new Gravy(project, user, key);
  Emitter.call(this);
  this.cloud = new Cloud(project, user, key);
  proxy(this.cloud, this);
}

/**
 * Inherit `Emitter`
 */

Gravy.prototype.__proto__ = Emitter.prototype;

/**
 * Use `reporter`.
 *
 * @param {Reporter} reporter
 * @return {Gravy}
 * @api public
 */

Gravy.prototype.reporter = function(reporter){
  this._reporter = reporter;
  reporter(this);
  return this;
};

/**
 * Add browser.
 *
 * @param {String} name
 * @param {String} version
 * @param {String} os
 * @return {Gravy}
 * @api public
 */

Gravy.prototype.add =
Gravy.prototype.browser = function(name, version, os){
  var all = 1 < arguments.length
    ? [[].slice.call(arguments)]
    : browser(name);

  for (var i = 0; i < all.length; ++i) {
    this.cloud.browser.apply(this.cloud, all[i]);
  }

  return this;
};

/**
 * test `url`
 *
 * @param {String} url
 * @return {Gravy}
 * @api public
 */

Gravy.prototype.test = function(url){
  var self = this;
  var parsed = parse(url);

  var tunnel = localtunnel.connect({
    host: 'http://localtunnel.me',
    port: parsed.port
  });

  tunnel.on('url', function(url){
    self.emit('started');
    url = url + parsed.path;
    debug('localtunnel %s', url);
    self.cloud.url(url);
    self.cloud.start(self.end.bind(self));
  });

  return this;
};

/**
 * Ended.
 *
 * @api private
 */

Gravy.prototype.end = function(err, res){
  debug('ended %j', arguments);
  if (res) return this.emit('ended', res);
  if (err && err[0]) this.emit('error', err[0]);
};
