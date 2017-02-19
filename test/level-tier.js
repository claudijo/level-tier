var expect = require('expect.js');
var leveltier = require('..');

describe('level-tier', function() {
  it('should throw if not providing tiers as array', function() {
    var fn = function() {
      leveltier('first');
    }.bind(this);

    expect(fn).to.throwException(/Invalid tiers: first/);
  });

  it('should create key from single tier', function() {
    var tiers = ['first'];

    expect(leveltier(tiers)).to.be('first');
  });

  it('should create key from multiple tiers', function() {
    var tiers = ['first', 'second'];
    var key = leveltier(tiers);

    expect(key).to.be('first\x00second');
  });

  it('should strip upper bound character from tier', function() {
    var tiers = ['fir\x00st'];
    var key = leveltier(tiers);
    expect(key).to.be('first');
  });

  it('should strip lower bound character from tier', function() {
    var tiers = ['fir\uffffst'];
    var key = leveltier(tiers);
    expect(key).to.be('first');
  });

  describe('with mocked console.warn()', function() {
    beforeEach(function() {
      this.warn = console.warn;
    });

    afterEach(function() {
      console.warn = this.warn;
    });

    it('should warn if using number as tier', function() {
      console.warn = function(msg) {
        expect(msg).to.be('Avoid using numbers as namespaced keys for ' +
          'consistent sorting order');
      };

      var tiers = ['first', 2];
      leveltier(tiers);
    })
  });

  describe('gte', function() {
    it('should create key from single tier', function() {
      var tiers = ['first'];

      expect(leveltier.gte(tiers)).to.be('first\x00');
    });

    it('should create key from multiple tiers', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.gte(tiers);

      expect(key).to.be('first\x00second\x00');
    });
  });

  describe('lte', function() {
    it('should create key from single tier', function() {
      var tiers = ['first'];

      expect(leveltier.lte(tiers)).to.be('first\x00\uffff');
    });

    it('should create key from multiple tiers', function() {
      var tiers = ['first', 'second'];
      var key = leveltier.lte(tiers);

      expect(key).to.be('first\x00second\x00\uffff');
    });
  });

  describe('parse', function() {
    it('should parse key into tiers array', function() {
      var key = 'first\x00second';
      var tiers = ['first', 'second'];

      expect(leveltier.parse(key)).to.eql(tiers);
    });
  });
});
