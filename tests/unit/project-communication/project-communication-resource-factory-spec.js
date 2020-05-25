(function () {
  'use strict';
  describe('ProjectCommunicationResourceFactory', function () {

    var REST_PREFIX = 'http://localhost:8080/otus-rest/v01';
    var SUFFIX = '/project-communication';

    var DATA = {'data': 'returnPromiseOK'};
    var DATA_CONFIRMATION = 'returnPromiseOK';

    var METHOD_GET_VALUE = "GET";
    var METHOD_POST_VALUE = "POST";
    var METHOD_PUT_VALUE = "PUT";

    var ID_PARAMETER = {'id': 1234567};
    var LIMIT_PARAMETER = {'limit': 3};

    var SUFFIX_POST_CREATE_ISSUE = SUFFIX + '/issue/create';
    var SUFFIX_POST_CREATE_MESSAGE = SUFFIX + '/issue/message/1234567';
    var SUFFIX_PUT_UPDATE_REOPEN = SUFFIX + '/issue/1234567/reopen';
    var SUFFIX_PUT_UPDATE_CLOSE = SUFFIX + '/issue/1234567/close';
    var SUFFIX_GET_MESSAGE_BY_ID = SUFFIX + '/issue/1234567/messages';
    var SUFFIX_GET_MESSAGE_BY_ID_LIMIT = SUFFIX + '/issue/1234567/messages/3';
    var SUFFIX_GET_LIST_ISSUE = SUFFIX + '/issue/list';

    var factory, factoryResult, otusRestResourceContext, headerBuilderFactory;
    var httpBackend;

    beforeEach(function () {
      angular.mock.module('otus.client');
      angular.mock.inject(function (_$injector_) {
        factory = _$injector_.get('otus.client.ProjectCommunicationResourceFactory');
        otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
        headerBuilderFactory = _$injector_.get('otus.client.HeaderBuilderFactory');
        spyOn(otusRestResourceContext, 'getRestPrefix').and.callThrough();
        spyOn(otusRestResourceContext, 'getSecurityToken');
        spyOn(headerBuilderFactory, 'create').and.callThrough();
        httpBackend = _$injector_.get('$httpBackend');
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX_POST_CREATE_ISSUE).respond(200, DATA);
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX_POST_CREATE_MESSAGE).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_PUT_UPDATE_REOPEN).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_PUT_UPDATE_CLOSE).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_MESSAGE_BY_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_MESSAGE_BY_ID_LIMIT).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_LIST_ISSUE).respond(200, DATA);
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
        expect(factoryResult.createIssue).toBeDefined();
        expect(factoryResult.createMessage).toBeDefined();
        expect(factoryResult.updateReopen).toBeDefined();
        expect(factoryResult.updateClose).toBeDefined();
        expect(factoryResult.getMessageById).toBeDefined();
        expect(factoryResult.getMessageByIdLimit).toBeDefined();
        expect(factoryResult.listIssue).toBeDefined();
      });

      describe('resourceMethods', function () {

        afterEach(function () {
          httpBackend.flush();
        });

        it('createIssue method check', function () {
          var post = factoryResult.createIssue();
          post.$promise.then(function (resultCreateIssue) {
            expect(resultCreateIssue.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('createMessage method check', function () {
          var post = factoryResult.createMessage(ID_PARAMETER);
          post.$promise.then(function (resultCreateMessage) {
            expect(resultCreateMessage.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateReopen method check', function () {
          var put = factoryResult.updateReopen(ID_PARAMETER);
          put.$promise.then(function (resultUpdateReopen) {
            expect(resultUpdateReopen.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateClose method check', function () {
          var put = factoryResult.updateClose(ID_PARAMETER);
          put.$promise.then(function (resultUpdateClose) {
            expect(resultUpdateClose.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getMessageById method check', function () {
          var get = factoryResult.getMessageById(ID_PARAMETER);
          get.$promise.then(function (resultGetMessageById) {
            expect(resultGetMessageById.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getMessageByIdLimit method check', function () {
          var get = factoryResult.getMessageByIdLimit(ID_PARAMETER,LIMIT_PARAMETER);
          get.$promise.then(function (resultGetMessageByIdLimit) {
            expect(resultGetMessageByIdLimit.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('listIssue method check', function () {
          var get = factoryResult.listIssue();
          get.$promise.then(function (resultListIssue) {
            expect(resultListIssue.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());