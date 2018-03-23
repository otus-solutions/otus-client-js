xdescribe('the exam factory', function() {
  var Mock = {};
  var injections;
  var $injector = angular.injector();

  beforeEach(function() {

    angular.mock.module('otus.client', ['ngResource']);
    // angular.mock.inject(function(_$injector_) {
      injections = {
        $resource: $injector.get('$resource'),
        OtusRestResourceContext: $injector.get('OtusRestResourceContext'),
        HeaderBuilderFactory: $injector.get('otus.client.HeaderBuilderFactory')
      }
      Mock.ReportResourceFactory = $injector.get('otus.client.ReportResourceFactory', injections);
    // });
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

  function mockFactory($injector, injections) {
    Mock.ReportResourceFactory = $injector.get('otus.client.ReportResourceFactory');
  }

});
