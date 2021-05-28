(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ParticipantConfigurationResourceFactory', ParticipantProfileResourceFactory);

  ParticipantProfileResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ParticipantProfileResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/participant-configuration';
    var SUB_SUFFIX = '/employment-reference';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        create: {
          method: 'POST',
          url: restPrefix + SUFFIX + SUB_SUFFIX,
          headers: headers.json,
          data: {
            'participantConfigurationJson': '@participantConfigurationJson'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + SUB_SUFFIX,
          headers: headers.json,
          data: {
            'participantConfigurationJson': '@participantConfigurationJson'
          }
        },
        get: {
          method: 'GET',
          url: restPrefix + SUFFIX + SUB_SUFFIX,
          headers: headers.json
        }
      });
    }

    return self;
  }

}());
