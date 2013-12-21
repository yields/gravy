
var util = require('../lib/util');

describe('util', function(){
  describe('range', function(){
    it('should work', function(){
      var ret = util.range('6..11');
      ret.length.should.eql(6)
      ret[0].should.eql(6);
      ret[1].should.eql(7);
      ret[2].should.eql(8);
      ret[3].should.eql(9);
      ret[4].should.eql(10);
      ret[5].should.eql(11);
    })

    it('should work', function(){
      var ret = util.range('6...7');
      ret.length.should.eql(2);
      ret[0].should.eql(6);
      ret[1].should.eql(7);
    })

    it('should work', function(){
      var ret = util.range('6');
      ret.length.should.eql(1);
      ret[0].should.eql(6);
    })
  })

  describe('only name', function(){
    it('should get the latest', function(){
      var ret = util.parse('safari OSX 10.9');
      ret.length.should.eql(1);
      ret[0].should.eql(['safari', '', 'OSX 10.9']);
    })

    it('should default to OSX 10.9', function(){
      var ret = util.parse('chrome');
      ret.length.should.eql(1);
      ret[0].should.eql(['chrome', '', 'OSX 10.9']);
    })
  })

  describe('parse', function(){
    describe('ranges', function(){
      it('(ie6...11)', function(){
        var ret = util.parse('ie6...11');
        ret.length.should.eql(6);
        ret[0].should.eql(['internet explorer', 6, 'Windows XP']);
        ret[1].should.eql(['internet explorer', 7, 'Windows XP']);
        ret[2].should.eql(['internet explorer', 8, 'Windows XP']);
        ret[3].should.eql(['internet explorer', 9, 'Windows 7']);
        ret[4].should.eql(['internet explorer', 10, 'Windows 8']);
        ret[5].should.eql(['internet explorer', 11, 'Windows 8.1']);
      })

      it('(safari1..6 osx)', function(){
        var ret = util.parse('safari1...6 osx');
        ret.length.should.eql(6);
        ret[0].should.eql(['safari', 1, 'osx']);
        ret[5].should.eql(['safari', 6, 'osx']);
      })
    })
  })

  describe('minimal', function(){
    it('ie6', function(){
      var ret = util.parse('ie6');
      ret.length.should.eql(1);
      ret[0].should.eql(['internet explorer', 6, 'Windows XP']);
    })
  })

  describe('full', function(){
    it('firefox26 windows 7', function(){
      var ret = util.parse('firefox26 Windows 7');
      ret.length.should.eql(1);
      ret[0].should.eql(['firefox', 26, 'Windows 7'])
    })
  })
})
