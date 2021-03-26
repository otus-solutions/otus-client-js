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
        getLotsByOrigin: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lots/from/:originLocationPointId',
          headers: headers.json,
          params: {
            'originLocationPointId': '@originLocationPointId'
          }
        },
        getLotsByDestination: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lots/to/:destinationLocationPointId',
          headers: headers.json,
          params: {
            'destinationLocationPointId': '@destinationLocationPointId'
          }
        },
        getLots: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lots/:originLocationPointId/:destinationLocationPointId',
          headers: headers.json,
          params: {
            'originLocationPointId': '@originLocationPointId',
            'destinationLocationPointId': '@destinationLocationPointId'
          }
        },
        getTube: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/tube/:locationPointId/:tubeCode',
          headers: headers.json,
          params: {
            'locationPointId' : '@locationPointId',
            'tubeCode' : '@tubeCode'
          }
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
        getAliquotsByPeriod: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/aliquots/:locationPointId',
          headers: headers.json,
          data: {
            'lotAliquot' : '@lotAliquot'
          },
          params: {
            'locationPointId': '@locationPointId'
          }
        },
        getAliquot: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/aliquot/:locationPointId',
          headers: headers.json,
          data: {
            'lotAliquot' : '@lotAliquot'
          },
          params: {
            'locationPointId': '@locationPointId'
          }
        },
        getAliquotsByLocationPoint: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/aliquot/:locationPointId',
          headers: headers.json,
          params: {
            'locationPointId' : '@locationPointId'
          },
          data: {
            'lotAliquot': '@lotAliquot'
          }
        },
        deleteLot: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/lot/:id',
          headers: headers.json,
          params: {
            'id': '@id',
          }
        },
        updateLotReceipt: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/lot/receipt/:code',
          headers: headers.json,
          params: {
            'code': '@code'
          }
        },
        receiveMaterial: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/lot/:id/receive-material',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },
        getMetadataOptions: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lot/receive-material-metadata-options/:materialType',
          headers: headers.json,
          params: {
            'materialType': '@materialType'
          }
        },
        getMaterialTrackingList: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/material/tracking/:materialCode',
          headers: headers.json,
          params: {
            'materialCode': '@materialCode'
          }
        }
      });
    }
    return self;
  }

}());
