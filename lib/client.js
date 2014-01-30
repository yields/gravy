
/**
 * Listen on `runner`.
 *
 * @param {Runner} runner
 * @api public
 */

module.exports = function(runner){
  var failed = [];

  runner.on('fail', function(test){
    var ms = test.err.message;
    var stack = test.err.stack || ms;
    failed.push({
      title: test.title,
      fullTitle: test.fullTitle(),
      error: {
        message: ms,
        stack: stack
      }
    });
  });

  runner.on('end', function(){
    runner.stats = runner.stats || {};
    runner.stats.failed = failed;
    window.mochaResults = runner.stats;
  });
};
