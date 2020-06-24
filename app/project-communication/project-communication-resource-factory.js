(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ProjectCommunicationResourceFactory', ProjectCommunicationResourceFactory);

  ProjectCommunicationResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ProjectCommunicationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/project-communication';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        createIssue: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/issues',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        createMessage: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/issues/:id/messages',
          headers: headers.json,
          data: {
            'data': '@data'
          },
          params:{
            'id':'@id'
          }
        },
        filter: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/issues/filter',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        updateReopen: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/issues/:id/reopen',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        updateClose: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/issues/:id/close',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        updateFinalize: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/issues/:id/finalize',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        getSenderById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/senders/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        getIssuesByRn: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issues/participant/:rn',
          headers: headers.json,
          params:{
            'rn':'@rn'
          }
        },
        getMessageById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issues/:id/messages',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        getMessageByIdLimit: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issues/:id/messages/:limit',
          headers: headers.json,
          params:{
            'id':'@id',
            'limit':'@limit'
          },
        },
        listIssue: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issues',
          headers: headers.json,
        },
        getIssuesById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issues/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          },
        }
      });
    }
    return self;
  }

}());
