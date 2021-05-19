(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ParticipantProfileResourceFactory', ParticipantProfileResourceFactory);

  ParticipantProfileResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ParticipantProfileResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/participant-profile';

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
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'participantProfileJson': '@participantProfileJson'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'participantProfileJson': '@participantProfileJson'
          }
        },
        get: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/:rn",
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        getEmploymentStatusReference: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json
        }

      });
    }

    return self;
  }

}());
