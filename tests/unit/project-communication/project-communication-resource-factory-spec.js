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

    var ISSUE_ID_PARAMETER = { 'id': "pCD0k3IB_dljxFtpAXfN" };
    var ID_PARAMETER = "pCD0k3IB_dljxFtpAXfN";
    var SENDER_ID_PARAMETER = {'id': "3PGBtn_"};
    var PARTICIPANT_RN_PARAMETER = { 'rn': "1234567" };
    var SKIP_PARAMETER = "0";
    var LIMIT_PARAMETER =  "3";

    var SUFFIX_POST_CREATE_ISSUE = SUFFIX + '/issues';
    var SUFFIX_POST_CREATE_MESSAGE = SUFFIX + '/issues/pCD0k3IB_dljxFtpAXfN/messages';
    var SUFFIX_POST_FILTER = SUFFIX + '/issues/filter';
    var SUFFIX_PUT_UPDATE_REOPEN = SUFFIX + '/issues/pCD0k3IB_dljxFtpAXfN/reopen';
    var SUFFIX_PUT_UPDATE_CLOSE = SUFFIX + '/issues/pCD0k3IB_dljxFtpAXfN/close';
    var SUFFIX_PUT_UPDATE_FINALIZE = SUFFIX + '/issues/pCD0k3IB_dljxFtpAXfN/finalize';
    var SUFFIX_GET_SENDER_BY_ID = SUFFIX + '/senders/3PGBtn_';
    var SUFFIX_GET_ISSUES_BY_RN = SUFFIX + '/issues/participant/1234567';
    var SUFFIX_GET_MESSAGE_BY_ID = SUFFIX + '/issues/pCD0k3IB_dljxFtpAXfN/messages';
    var SUFFIX_GET_MESSAGE_BY_ID_LIMIT = SUFFIX + '/issues/pCD0k3IB_dljxFtpAXfN/messages/0/3';
    var SUFFIX_GET_ISSUES_BY_ID = SUFFIX + '/issues/pCD0k3IB_dljxFtpAXfN';

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
        httpBackend.when(METHOD_POST_VALUE, REST_PREFIX + SUFFIX_POST_FILTER).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_PUT_UPDATE_REOPEN).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_PUT_UPDATE_CLOSE).respond(200, DATA);
        httpBackend.when(METHOD_PUT_VALUE, REST_PREFIX + SUFFIX_PUT_UPDATE_FINALIZE).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_SENDER_BY_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_ISSUES_BY_RN).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_MESSAGE_BY_ID).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_MESSAGE_BY_ID_LIMIT).respond(200, DATA);
        httpBackend.when(METHOD_GET_VALUE, REST_PREFIX + SUFFIX_GET_ISSUES_BY_ID).respond(200, DATA);
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
        expect(factoryResult.filter).toBeDefined();
        expect(factoryResult.updateReopen).toBeDefined();
        expect(factoryResult.updateClose).toBeDefined();
        expect(factoryResult.updateFinalize).toBeDefined();
        expect(factoryResult.getSenderById).toBeDefined();
        expect(factoryResult.getIssuesByRn).toBeDefined();
        expect(factoryResult.getMessageById).toBeDefined();
        expect(factoryResult.getMessageByIdLimit).toBeDefined();
        expect(factoryResult.getIssuesById).toBeDefined();
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
          var post = factoryResult.createMessage(ISSUE_ID_PARAMETER);
          post.$promise.then(function (resultCreateMessage) {
            expect(resultCreateMessage.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('filter method check', function () {
          var post = factoryResult.filter();
          post.$promise.then(function (resultFilter) {
            expect(resultFilter.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateReopen method check', function () {
          var put = factoryResult.updateReopen(ISSUE_ID_PARAMETER);
          put.$promise.then(function (resultUpdateReopen) {
            expect(resultUpdateReopen.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateClose method check', function () {
          var put = factoryResult.updateClose(ISSUE_ID_PARAMETER);
          put.$promise.then(function (resultUpdateClose) {
            expect(resultUpdateClose.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('updateFinalize method check', function () {
          var put = factoryResult.updateFinalize(ISSUE_ID_PARAMETER);
          put.$promise.then(function (resultUpdateFinalize) {
            expect(resultUpdateFinalize.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getSenderById method check', function () {
          var put = factoryResult.getSenderById(SENDER_ID_PARAMETER);
          put.$promise.then(function (resultGetSenderById) {
            expect(resultGetSenderById.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getIssuesByRn method check', function () {
          var put = factoryResult.getIssuesByRn(PARTICIPANT_RN_PARAMETER);
          put.$promise.then(function (resultGetIssuesByRn) {
            expect(resultGetIssuesByRn.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getMessageById method check', function () {
          var get = factoryResult.getMessageById(ISSUE_ID_PARAMETER);
          get.$promise.then(function (resultGetMessageById) {
            expect(resultGetMessageById.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getMessageByIdLimit method check', function () {
          var get = factoryResult.getMessageByIdLimit({ issueId: ID_PARAMETER, skip: SKIP_PARAMETER, limit: LIMIT_PARAMETER });
          get.$promise.then(function (resultGetMessageByIdLimit) {
            expect(resultGetMessageByIdLimit.data).toEqual(DATA_CONFIRMATION);
          });
        });

        it('getIssuesById method check', function () {
          var get = factoryResult.getIssuesById(ISSUE_ID_PARAMETER);
          get.$promise.then(function (resultGetIssuesById) {
            expect(resultGetIssuesById.data).toEqual(DATA_CONFIRMATION);
          });
        });
      });
    });
  });

}());
