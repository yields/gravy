
var Gravy = require('..');
var gravy;

describe('gravy', function(){

  beforeEach(function(){
    gravy = new Gravy('project', 'user', 'key');
  })

  it('can be initialized without new', function(){
    Gravy().should.be.instanceof(Gravy);
  })

  describe('#reporter', function(){
    it('shoud set and call reporter with self', function(){
      var called;
      gravy.reporter(function(){ called = true });
      gravy._reporter.should.be.ok;
      called.should.be.true;
    })
  })

  describe('#add', function(){
    var args;

    beforeEach(function(){
      args = [];
      gravy.cloud.browser = function(){
        args.push([].slice.call(arguments));
      };
    })

    it('should be able to receive: browser, version, os', function(){
      gravy.add('safari', '7', 'OSX 10.9');
      args[0][0].should.eql('safari');
      args[0][1].should.eql('7');
      args[0][2].should.eql('OSX 10.9');
    })

    it('should be able to receive browser ranges', function(){
      gravy.add('ie6...7');
      args.should.eql([
        ['internet explorer', 6, 'Windows XP'],
        ['internet explorer', 7, 'Windows XP']
      ]);
    })

    it('should be able to receive browser version', function(){
      gravy.add('safari6');
      args.should.eql([
        ['safari', 6, 'OSX 10.9']
      ]);
    })

    it('should set the version to latest if not given', function(){
      gravy.add('safari');
      args.should.eql([
        ['safari', '', 'OSX 10.9']
      ]);
    })
  })

  describe('#browser', function(){
    it('should alias #add', function(){
      gravy.add.should.equal(gravy.browser);
    })
  })

})
