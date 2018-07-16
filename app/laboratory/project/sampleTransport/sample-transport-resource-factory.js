(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.SampleTransport', SampleTransport);

  SampleTransport.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function SampleTransport($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-project/transportation';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getAliquotsByPeriod: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/aliquots',
          headers: headers.json,
          data: {
            'lotAliquot' : '@lotAliquot'
          }
        },
        getAliquot: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/aliquot',
          headers: headers.json,
          data: {
            'lotAliquot' : '@lotAliquot'
          }
        },
        getLots: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lots',
          headers: headers.json
        },
        createLot: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/lot',
          headers: headers.json,
          data: {
            'sampleLot': '@sampleLot'
          }
        },
        updateLot: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/lot',
          headers: headers.json,
          data: {
            'sampleLot': '@sampleLot'
          }
        },
        deleteLot: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/lot/:id',
          headers: headers.json,
          params: {
            'id': '@id',
          }
        }
      });
    }
    return self;
  }

}());
