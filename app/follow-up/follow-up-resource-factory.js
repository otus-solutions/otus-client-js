(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.FollowUpResourceFactory', StaticVariableResourceFactory);

  StaticVariableResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function StaticVariableResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/followUp';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        add: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/add',
          headers: headers.json,
          data: {
              'data': '@data'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/update',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        list: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list',
          headers: headers.json
        },
        deactivate: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/deactivate/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        },
        listParticipantsFollowUps: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/:rn',
          headers: headers.json,
          params:{
            'rn':'@rn'
          }
        },
        activateFollowUpEvent: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/participantEvent/add/:rn',
          headers: headers.json,
          params:{
            'rn':'@rn'
          },
          data: {
            'data': '@data'
          }
        }
      });
    }
    return self;
  }

}());
