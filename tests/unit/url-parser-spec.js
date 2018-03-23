describe('UrlParser test', function() {
  var SERVICE = {};
  var $injector;
  var $resource;
  // angular.mock.module('otus.client');
  beforeEach(function() {
    angular.mock.module('otus.client');

  });

  beforeEach(inject(function(_$injector_) {
    // $provide.provider('urlParser', UrlParserProvider);
    SERVICE = _$injector_.get('UrlParser');
  }));

  describe('method parser', function() {
    beforeEach(function() {
      spyOn(SERVICE, 'parser');
      SERVICE.parser(jasmine.any(String));
    });

    it('should called method parser', function() {
      SERVICE.parser(jasmine.any(String));
      expect(SERVICE.parser).toHaveBeenCalledWith(jasmine.any(String));
      expect(SERVICE.parser).not.toBeNull();
    })


  });
  it('is very true', function() {
    // var $injector = angular.injector();


    // SERVICE = UrlParser;
    // var ngResource = $injector.get('ngResource');
    expect(SERVICE).toBeDefined();
    expect(true).toBe(true);
    // expect($injector.get('ngResource')).toBeDefined();

  });
});
