describe('the exam factory', function() {
  var Mock = {};
  var injections;
  var $injector = angular.injector();
  beforeEach(function() {

    angular.mock.module("otus.client");
  });

  beforeEach(function() {

    inject(function(_$injector_) {
      injections = {
        $resource: _$injector_.get('$resource'),
        OtusRestResourceContext: _$injector_.get('OtusRestResourceContext'),
        HeaderBuilderFactory: _$injector_.get('otus.client.HeaderBuilderFactory')
      }
      mockFactory(_$injector_, injections)
    });
  });


  describe("Testing called factory", function() {
    beforeEach(function() {
      spyOn(Mock.ReportResourceFactory, "create");
      Mock.ReportResourceFactory.create();
    });
    it("should build a factory", function() {
      expect(Mock.ReportResourceFactory.create).toHaveBeenCalled();

    });
  });

  function mockFactory($injector, injections) {
    Mock.ReportResourceFactory = $injector.get('otus.client.ReportResourceFactory', injections);

  }

});
