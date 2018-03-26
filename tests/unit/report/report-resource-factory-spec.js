describe('the exam factory', function() {
  var Mock = {};
  var injections, httpBackend;
  var factory;
  beforeEach(function() {
    angular.mock.module("otus.client");
  });

  beforeEach(function() {
    inject(function(_$injector_) {
      injections = {
        $resource: _$injector_.get('$resource'),
        OtusRestResourceContext: _$injector_.get('OtusRestResourceContext'),
        HeaderBuilderFactory: _$injector_.get('otus.client.HeaderBuilderFactory')
      };
      httpBackend = _$injector_.get('$httpBackend');
      mockFactory(_$injector_, injections)
    });
  });


  describe("Factory tests", function() {
    it("should be a resource", function() {
      expect(typeof Mock.ReportResourceFactory.create).toBe('function');
    });
  });


  describe("Test method post", function() {
    beforeEach(function() {
      spyOn(Mock.ReportResourceFactory, "create");
      spyOn(factory, "create");
    });
    it("should insert report", function() {
      Mock.ReportResourceFactory.create();
      httpBackend.when('POST', '/report').respond({
        "data": "5ab9039813cdd20490873aff"
      });
      var report = factory.create();
      
      expect(Mock.ReportResourceFactory.create).toHaveBeenCalled();
      expect(Mock.ReportResourceFactory.create).toBeDefined();
      expect(Mock.ReportResourceFactory.create).toEqual(jasmine.any(Function));
      expect(factory.create).toHaveBeenCalled();
      expect(factory.create).toBeDefined();
      expect(factory.create).toEqual(jasmine.any(Function));

    });
  });

  function mockFactory($injector, injections) {
    Mock.ReportResourceFactory = $injector.get('otus.client.ReportResourceFactory', injections);
    factory = Mock.ReportResourceFactory.create();
  }

});
