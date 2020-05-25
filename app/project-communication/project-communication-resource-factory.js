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
          url: restPrefix + SUFFIX + '/issue/create',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        createMessage: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/issue/message/:id',
          headers: headers.json,
          data: {
            'data': '@data'
          },
          params:{
            'id':'@id'
          }
        },
        updateReopen: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/issue/:id/reopen',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        updateClose: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/issue/:id/close',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        getMessageById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issue/:id/messages',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        getMessageByIdLimit: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issue/:id/messages/:limit',
          headers: headers.json,
          params:{
            'id':'@id',
            'limit':'@limit'
          },
        },
        listIssue: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/issue/list',
          headers: headers.json,
        },
      });
    }
    return self;
  }

}());
