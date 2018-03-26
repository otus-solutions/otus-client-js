describe('UrlParser test', function() {
  var SERVICE = {};
  var $injector;
  var $resource;
  // angular.mock.module('otus.client');
  beforeEach(function() {
    angular.mock.module('otus.client');
  });

  beforeEach(function(){
    inject(function(_$injector_) {
    mockService(_$injector_);
  });
  });
  
  describe('method parser', function() {
    var parserElement = document.createElement('a');
    beforeEach(function() {
      spyOn(SERVICE, 'parser');
    });
    
    it('should called method parser', function() {
      parserElement = SERVICE.parser("www");
      SERVICE.parser("www");
      expect(SERVICE.parser).toHaveBeenCalledWith("www");
      expect(SERVICE.parser).not.toBeNull();
      expect(SERVICE.parser).toBeDefined();
      expect(SERVICE.parser(jasmine.any(String))).toBe(undefined);
      expect(SERVICE.parser).toEqual(jasmine.any(Function));
    });
    
    
  });
  
  function mockService(_$injector_) {
    SERVICE = _$injector_.get("UrlParser");
    SERVICE.parser(jasmine.any(String));
  }

});
