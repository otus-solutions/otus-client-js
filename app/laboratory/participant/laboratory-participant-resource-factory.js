(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LaboratoryParticipantResourceFactory', LaboratoryParticipantResourceFactory);

  LaboratoryParticipantResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LaboratoryParticipantResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-participant';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        initialize: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/initialize/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        getLaboratory: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:rn',
          headers: headers.json,
          data: {
            'laboratory': '@laboratory'
          },
          params: {
            'rn': '@rn',
          }
        },
        updateAliquots: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:rn/tubes/aliquots',
          headers: headers.json,
          data: {
            'updateAliquotsDTO': '@updateAliquotsDTO'
          },
          params: {
            'rn': '@rn',
          }
        }
      });
    }
    return self;
  }

}());
