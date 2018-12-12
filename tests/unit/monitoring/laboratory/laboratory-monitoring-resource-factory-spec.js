(function () {
  'use strict';

  describe('LaboratoryMonitoringResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/monitoring/laboratory';
    var PENDINGS_SX = '/pending';
    var QUANTITATIVE_SX = '/quantitative';
    var ORPHANS_SX = '/orphan';
    var STORAGE_SX = '/storage';
    var EXAM_SX = '/exam';
    var PENDINGS_CSV_SX = '/pending/csv';

    var DATA = {
      'data': 'returnPromiseOK'
    };
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var DATA_LIST = { 0: 'returnPromiseOK' };

    var METHOD_GET_VALUE = "GET";


    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.LaboratoryMonitoringResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + PENDINGS_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + QUANTITATIVE_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + ORPHANS_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + STORAGE_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + EXAM_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + PENDINGS_CSV_SX).respond(200, DATA);
      });
    });

    it('factoryExistence check', function () {
      expect(factory).toBeDefined();
    });

    describe('factoryInstance', function () {

      it('createMethodExistence check', function () {
        expect(factory.create).toBeDefined();
      });

      beforeEach(function () {
        factoryResult = factory.create();
      });

      it('internalCalls check', function () {
        expect(otusRestResourceContext.getRestPrefix).toHaveBeenCalledTimes(1);
        expect(otusRestResourceContext.getSecurityToken).toHaveBeenCalledTimes(1);
        expect(headerBuilderFactory.create).toHaveBeenCalledTimes(1);
      });

      it('methodFactoryExistence check', function () {
        expect(factoryResult.getDataOfPendingResultsByAliquots).toBeDefined();
        expect(factoryResult.getDataQuantitativeByTypeOfAliquots).toBeDefined();
        expect(factoryResult.getDataOrphanByExams).toBeDefined();
        expect(factoryResult.getDataOfStorageByAliquots).toBeDefined();
        expect(factoryResult.getDataByExam).toBeDefined();
        expect(factoryResult.getDataToCSVOfPendingResultsByAliquots).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('getDataOfPendingResultsByAliquotsMethod check', function () {
          var getDataOfPendingResultsByAliquots = factoryResult.getDataOfPendingResultsByAliquots();
          getDataOfPendingResultsByAliquots.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getDataQuantitativeByTypeOfAliquotsMethod check', function () {
          var getDataQuantitativeByTypeOfAliquots = factoryResult.getDataQuantitativeByTypeOfAliquots();
          getDataQuantitativeByTypeOfAliquots.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getDataOrphanByExamsMethod check', function () {
          var getDataOrphanByExams = factoryResult.getDataOrphanByExams();
          getDataOrphanByExams.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getDataOfStorageByAliquotsMethod check', function () {
          var getDataOfStorageByAliquots = factoryResult.getDataOfStorageByAliquots();
          getDataOfStorageByAliquots.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getDataByExamMethod check', function () {
          var getDataByExam = factoryResult.getDataByExam();
          getDataByExam.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getDataToCSVOfPendingResultsByAliquotsMethod check', function () {
          var getDataToCSVOfPendingResultsByAliquots = factoryResult.getDataToCSVOfPendingResultsByAliquots();
          getDataToCSVOfPendingResultsByAliquots.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });
}());