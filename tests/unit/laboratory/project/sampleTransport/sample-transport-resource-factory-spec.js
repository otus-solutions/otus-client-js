(function () {
  'use strict';

  describe('SampleTransportResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/laboratory-project/transportation';
    var ALIQUOTS_SX = '/aliquots';
    var ALIQUOT_SX = '/aliquot';
    var LOTS_SX = '/lots';
    var LOT_SX = '/lot';
    var CODE_SX = '/123';
    var TUBE_SX = '/tube';
    var RECEIPT_SX = '/receipt';
    var RECEIVE_MATERIAL_SX = '/receive-material';
    var MATERIAL_SX = '/material';
    var TRACKING_SX = '/tracking';
    var RECEIVE_MATERIAL_METADATA_SX = '/receive-material-metadata-options';
    var MATERIAL_TYPE_SX = '/DBS';
    var ID_SX = '/1234567';
    var DATA = {'data': 'returnPromiseOK'};
    var ID_PARAMETER = {'id': 1234567};
    var MATERIAL_TYPE_PARAMETER = {'materialType': "DBS"};
    var MATERIAL_CODE_PARAMETER = {"materialCode": 1234567};
    var CODE_PARAMETER = {'code': 123};
    var DATA_CONFIRMATION = 'returnPromiseOK';
    var METHOD_GET_VALUE = "GET";
    var METHOD_POST_VALUE = "POST";
    var METHOD_PUT_VALUE = "PUT";
    var METHOD_DELETE_VALUE = "DELETE";


    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.SampleTransport');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + ALIQUOTS_SX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + ALIQUOT_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + LOTS_SX).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + TUBE_SX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + LOT_SX).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX + LOT_SX).respond(200, DATA);
        httpBackend.when(METHOD_DELETE_VALUE, REST_PREFIX + SUFFIX + LOT_SX + ID_SX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + LOT_SX + RECEIPT_SX + CODE_SX).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX + LOT_SX + ID_SX + RECEIVE_MATERIAL_SX ).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + MATERIAL_SX + TRACKING_SX + ID_SX ).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX + LOT_SX + CODE_SX ).respond(200, DATA);
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
        expect(factoryResult.getAliquotsByPeriod).toBeDefined();
        expect(factoryResult.getAliquot).toBeDefined();
        expect(factoryResult.getLots).toBeDefined();
        expect(factoryResult.createLot).toBeDefined();
        expect(factoryResult.updateLot).toBeDefined();
        expect(factoryResult.deleteLot).toBeDefined();
        expect(factoryResult.getTube).toBeDefined();
        expect(factoryResult.updateLotReceipt).toBeDefined();
        expect(factoryResult.receiveMaterial).toBeDefined();
        expect(factoryResult.getMaterialTrackingList).toBeDefined();
        expect(factoryResult.findByCode).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('getAliquotsByPeriodMethod check', function () {
          var getAliquotsByPeriod = factoryResult.getAliquotsByPeriod();
          getAliquotsByPeriod.$promise.then(function (resultGetAliquots) {
            expect(resultGetAliquots.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getAliquotMethod check', function () {
          var getAliquot = factoryResult.getAliquot()
          getAliquot.$promise.then(function (resultGetAliquot) {
            expect(resultGetAliquot.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getTubeMethod check', function () {
          var getTube = factoryResult.getTube();
          getTube.$promise.then(function (resultGetTube) {
            expect(resultGetTube.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getLotsMethod check', function () {
          var getLots = factoryResult.getLots();
          getLots.$promise.then(function (resultGetLots) {
            expect(resultGetLots.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('createLotMethod check', function () {
          var createLot = factoryResult.createLot();
          createLot.$promise.then(function (resultCreateLot) {
            expect(resultCreateLot.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateLotMethod check', function () {
          var updateLot = factoryResult.updateLot();
          updateLot.$promise.then(function (resultUpdateLot) {
            expect(resultUpdateLot.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('deleteLotMethod check', function () {
          var deleteLot = factoryResult.deleteLot(ID_PARAMETER);
          deleteLot.$promise.then(function (resultDeleteLot) {
            expect(resultDeleteLot.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('receiveMaterialMethod check', function () {
          var receiveMaterial = factoryResult.receiveMaterial(ID_PARAMETER);
          receiveMaterial.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getMaterialTrackingMethod check', function () {
          var request = factoryResult.getMaterialTrackingList(MATERIAL_CODE_PARAMETER);
          request.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('findByCode check', function () {
          var request = factoryResult.findByCode(CODE_PARAMETER);
          request.$promise.then(function (result) {
            expect(result.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());
