describe('UrlParser test', function() {
  var SERVICE = {};
  // var $injector = angular.injector();

  angular.mock.module('otus.client');

  // angular.mock.module('otus.client');
  beforeEach(inject(function(_$injector_) {

    // $provide.provider('urlParser', UrlParserProvider);
    // SERVICE = _$injector_.get('UrlParser');
  }));
  it('is very true', function() {
    // var $injector = angular.injector();


    // SERVICE = UrlParser;
    // var ngResource = $injector.get('ngResource');
    expect(SERVICE).toBeDefined();
    expect(true).toBe(true);
    // expect($injector.get('ngResource')).toBeDefined();

  });
});
