
/**
 * Listen on `runner`.
 *
 * @param {Runner} runner
 * @api public
 */

module.exports = function(runner){
  var failed = [];

  runner.on('fail', function(test){
    failed.push({
      title: test.title,
      fullTitle: test.fullTitle(),
      error: {
        message: test.err.message,
        stack: String(test.err.stack)
      }
    });
  });

  runner.on('end', function(){
    runner.stats.failed = failed;
    window.mochaResults = runner.stats;
  });
};
