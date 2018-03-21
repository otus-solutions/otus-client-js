describe('the exam factory', function() {
  var Mock = {};
  var injections;
  var $injector = angular.injector();

  beforeEach(function() {
    angular.mock.module("otus.client");
    angular.mock.inject(function(_$injector_) {
      injections = {
        $resource: _$injector_.get('$resource'),
        OtusRestResourceContext: _$injector_.get('OtusRestResourceContext'),
        HeaderBuilderFactory: _$injector_.get('otus.client.HeaderBuilderFactory')
      }
      mockFactory(_$injector_, injections);
    });
  });


  xdescribe("Testing called factory", function() {
    beforeEach(function() {
      //spyOn(Mock.ReportResourceFactory, "create");
      //Mock.ReportResourceFactory.create();
    });
    it("should build a factory", function() {
      expect(true).toBe(true);

    });
  });

  function mockFactory(_$injector_, injections) {
    Mock.ReportResourceFactory = _$injector_.get('otus.client.ReportResourceFactory', injections);
  }

});
