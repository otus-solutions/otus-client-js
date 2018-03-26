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
    var parserElement = document.createElement('a');
    beforeEach(function() {
      spyOn(SERVICE, 'parser');
      parserElement = SERVICE.parser("www");
    });

    it('should called method parser', function() {
      SERVICE.parser("www");
      expect(SERVICE.parser).toHaveBeenCalledWith("www");
      expect(SERVICE.parser).not.toBeNull();
      expect(SERVICE.parser).toBeDefined();
      expect(SERVICE.parser()).toBe(undefined);
    })


  });

});
