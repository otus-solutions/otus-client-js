(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.UnattachedLaboratoryResourceFactory', UnattachedLaboratoryResourceFactory);

  UnattachedLaboratoryResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function UnattachedLaboratoryResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/unattached-laboratory';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        initialize: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/create/:acronym/:descriptorName',
          headers: headers.json,
          params: {
            'acronym': '@acronym',
            'descriptorName': '@descriptorName',
          }
        },
        listLaboratories: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:acronym/:descriptorName/:page/:quantity',
          headers: headers.json,
          params: {
            'acronym': '@acronym',
            'descriptorName': '@descriptorName',
            'page': '@page',
            'quantity': '@quantity'
          }
        },
        getById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:laboratoryOid',
          headers: headers.json,
          params: {
            'laboratoryOid': '@laboratoryOid'
          }
        },
        attache: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/attache/:laboratoryIdentification/:recruitmentNumber',
          headers: headers.json,
          params: {
            'laboratoryIdentification': '@laboratoryIdentification',
            'recruitmentNumber': '@recruitmentNumber'
          }
        },
        discard: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:laboratoryOid',
          headers: headers.json,
          params: {
              'laboratoryOid': '@laboratoryOid'
          }
        }
      });
    }
    return self;
  }

}());
