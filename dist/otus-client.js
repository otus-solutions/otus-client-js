(function() {
    'use strict';

    angular.module('otus.client', ['ngResource']);

})();

(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('UrlParser', UrlParser);

    function UrlParser() {
        var self = this;
        self.parser = parser;

        function parser(url) {
            var parserElement = document.createElement('a');
            parserElement.href = url;

            return parserElement;
        }

    }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ActivityResourceFactory', ActivityResourceFactory);

  ActivityResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ActivityResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/participants/:rn/activities';
    var UPDATE_CHECKER ='/update-checker-activity';

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
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'activity': '@activity'
          },
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        listAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        getById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        addActivityRevision: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/revision',
          headers: headers.json,
          data: {
            'activityRevision': '@activityRevision'
          }
        },
        getActivityRevisions: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/revision/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },
        deleteById: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'activity': '@activity'
          },
          params: {
            'id': '@id',
            'rn': '@rn'
          }
        },
        updateCheckerActivity: {
          method: 'PUT',
          url: restPrefix + SUFFIX + UPDATE_CHECKER,
          headers: headers.json,
          data: {
            'checkerUpdated': '@checkerUpdated'
          }
        }
      });
    }

    return self;
  }

}());


(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.OfflineActivityCollectionResourceFactory', OfflineActivityCollectionResourceFactory);

  OfflineActivityCollectionResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function OfflineActivityCollectionResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/offline/activities';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        saveOffline: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/collection',
          headers: headers.json,
          data: {
            'offlineActivityCollections': '@offlineActivityCollections'
          }
        },
        fetchOfflineCollections: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/collection',
          headers: headers.json,
        },
        synchronizeOfflineActivities: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/synchronize/:recruitmentNumber/:offlineCollectionId',
          headers: headers.json,
          params: {
            'recruitmentNumber': '@recruitmentNumber',
            'offlineCollectionId': '@offlineCollectionId'
          }
        }
      });
    }
    return self;
  }
}());


(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.HeaderBuilderFactory', factory);

    function factory() {
        var self = this;
        self.create = create;

        function create(token) {
            return new Headers(token);
        }

        return self;

    }

    function Headers(token) {
        var self = this;
        self.setContentType = setContentType;

        self.json = {
            'Authorization': 'Bearer ' + token
        };

        function setContentType(contentType) {
          self.json['Content-type'] = contentType;
        }
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .service('OtusRestResourceContext', OtusRestResourceContext);

    OtusRestResourceContext.$inject = ['$window', 'UrlParser'];

    function OtusRestResourceContext($window, UrlParser) {
        var self = this;

        var TOKEN_USER_NAME = 'outk';
        var TOKEN_PROJECT_NAME = 'optk';
        var HOSTNAME;
        var CONTEXT;
        var VERSION;

        self.setUrl = setUrl;
        self.setHostname = setHostname;
        self.setContext = setContext;
        self.setVersion = setVersion;
        self.setSecurityToken = setSecurityToken;
        self.getRestPrefix = getRestPrefix;
        self.getHostName = getHostName;
        self.getContext = getContext;
        self.getVersion = getVersion;
        self.getSecurityToken = getSecurityToken;
        self.removeSecurityToken = removeSecurityToken;
        self.init = init;
        self.reset = reset;
        self.hasToken = hasToken;

        self.init();

        function init() {
            HOSTNAME = 'http://' + $window.location.hostname + ':8080';
            CONTEXT = '/otus-rest';
            VERSION = '/v01';
        }

        function hasToken() {
            if ($window.sessionStorage[TOKEN_USER_NAME]) {
                return true;
            } else {
                return false;
            }
        }

        function reset() {
            HOSTNAME = '';
        }

        function removeSecurityToken() {
            delete $window.sessionStorage[TOKEN_USER_NAME];
        }

        function setUrl(url) {
            var parser = UrlParser.parser(url);
            HOSTNAME = parser.origin;
        }

        function setHostname(hostname) {
            HOSTNAME = hostname;
        }

        function setContext(context) {
            CONTEXT = '/' + context;
        }

        function setVersion(version) {
            VERSION = '/' + version;
        }

        function getRestPrefix() {
            return HOSTNAME + CONTEXT + VERSION;
        }

        function getHostName() {
            return HOSTNAME;
        }

        function getContext() {
            return CONTEXT;
        }

        function getVersion() {
            return VERSION;
        }

        function setSecurityToken(securityToken) {
            $window.sessionStorage[TOKEN_USER_NAME] = securityToken;
        }

        function getSecurityToken() {
            return $window.sessionStorage[TOKEN_USER_NAME];
        }
    }

}());

(function () {
  'use strict';

  angular
    .module('otus.client')
    .service('OtusRestResourceService', OtusRestResourceService);

  OtusRestResourceService.$inject = [
    'OtusInstallerResourceFactory',
    'OtusAuthenticatorResourceFactory',
    'OtusFieldCenterResourceFactory',
    'OtusRestResourceContext',
    'otus.client.UserResourceFactory',
    'otusjs.otus.client.OtusProjectConfigurationResourceFactory',
    'otusjs.otus.client.OtusConfigurationResourceFactory',
    'otus.client.SurveyResourceFactory',
    'otus.client.SurveyGroupResourceFactory',
    'otus.client.ActivityResourceFactory',
    'otus.client.ActivityConfigurationResourceFactory',
    'otus.client.DataExtractionResourceFactory',
    'otus.client.ParticipantResourceFactory',
    'otus.client.LaboratoryParticipantResourceFactory',
    'otus.client.LaboratoryConfigurationResourceFactory',
    'otus.client.UnattachedLaboratoryResourceFactory',
    'otus.client.DatasourceResourceFactory',
    'otus.client.UploadResourceFactory',
    'otus.client.SampleTransport',
    'otus.client.ExamLot',
    'otus.client.ExamUpload',
    'otus.client.ReportResourceFactory',
    'otus.client.MonitoringResourceFactory',
    'otus.client.LaboratoryMonitoringResourceFactory',
    'otus.client.PasswordResetResourceFactory',
    'otus.client.PermissionConfigurationResourceFactory',
    'otus.client.UserPermissionResourceFactory',
    'otus.client.ActivityImportationResourceFactory',
    'otus.client.StaticVariableResourceFactory',
    'otus.client.FollowUpResourceFactory',
    'otus.client.EventResourceFactory',
    'otus.client.LocationPointResourceFactory',
    'otus.client.UserActivityPendencyResourceFactory',
    'otus.client.OfflineActivityCollectionResourceFactory',
    'otus.client.ParticipantContactResourceFactory',
    'otus.client.ParticipantPasswordResetResourceFactory'
  ];

  function OtusRestResourceService(
    OtusInstallerResourceFactory,
    OtusAuthenticatorResourceFactory,
    OtusFieldCenterResourceFactory,
    OtusRestResourceContext,
    UserResourceFactory,
    OtusProjectConfigurationResourceFactory,
    OtusConfigurationResourceFactory,
    SurveyResourceFactory,
    SurveyGroupResourceFactory,
    ActivityResourceFactory,
    ActivityConfigurationResourceFactory,
    DataExtractionResourceFactory,
    ParticipantResourceFactory,
    LaboratoryParticipantResourceFactory,
    LaboratoryConfigurationResourceFactory,
    UnattachedLaboratoryResourceFactory,
    DatasourceResourceFactory,
    UploadResourceFactory,
    SampleTransport,
    ExamLot,
    ExamUpload,
    ReportResourceFactory,
    OtusMonitoringResourceFactory,
    OtusLaboratoryMonitoringResourceFactory,
    PasswordResetResourceFactory,
    PermissionConfigurationResourceFactory,
    UserPermissionResourceFactory,
    ActivityImportationResourceFactory,
    StaticVariableResourceFactory,
    FollowUpResourceFactory,
    EventResourceFactory,
    LocationPointResourceFactory,
    UserActivityPendencyResourceFactory,
    OfflineActivityCollectionResourceFactory,
    ParticipantContactResourceFactory,
    ParticipantPasswordResetResourceFactory

) {
    var self = this;

    self.resetConnectionData = resetConnectionData;
    self.initDefaultConnectionData = initDefaultConnectionData;
    self.removeSecurityToken = removeSecurityToken;
    self.setUrl = setUrl;
    self.setSecurityToken = setSecurityToken;
    self.getOtusInstallerResource = getOtusInstallerResource;
    self.getOtusAuthenticatorResource = getOtusAuthenticatorResource;
    self.getOtusFieldCenterResource = getOtusFieldCenterResource;
    self.getUserResource = getUserResource;
    self.getProjectConfigurationResource = getProjectConfigurationResource;
    self.getConfigurationResource = getConfigurationResource;
    self.getSurveyResource = getSurveyResource;
    self.getSurveyGroupResource = getSurveyGroupResource;
    self.getActivityResource = getActivityResource;
    self.getActivityConfigurationResource = getActivityConfigurationResource;
    self.getExtractionResource = getExtractionResource;
    self.getParticipantResource = getParticipantResource;
    self.getLaboratoryParticipantResource = getLaboratoryParticipantResource;
    self.getLaboratoryConfigurationResource = getLaboratoryConfigurationResource;
    self.getUnattachedLaboratoryResource = getUnattachedLaboratoryResource;
    self.getDatasourceResourceFactory = getDatasourceResourceFactory;
    self.getFileUploadResourceFactory = getFileUploadResourceFactory;
    self.getSampleTransport = getSampleTransport;
    self.getExamLotResource = getExamLotResource;
    self.getExamUploadResource = getExamUploadResource;
    self.isLogged = isLogged;
    self.getReportResourceFactory = getReportResourceFactory;
    self.getOtusMonitoringResource = getOtusMonitoringResource;
    self.getOtusLaboratoryMonitoringResource = getOtusLaboratoryMonitoringResource;
    self.getPasswordResetResource = getPasswordResetResource;
    self.getPermissionConfigurationResource = getPermissionConfigurationResource;
    self.getUserPermissionResource = getUserPermissionResource;
    self.getStaticVariableResource = getStaticVariableResource;
    self.getStaticVariableResource = getStaticVariableResource;
    self.getFollowUpResourceFactory = getFollowUpResourceFactory;
    self.getEventResourceFactory = getEventResourceFactory;
    self.getActivityImportationResource = getActivityImportationResource;
    self.getUserActivityPendencyResource = getUserActivityPendencyResource;
    self.getLocationPointResource = getLocationPointResource;
    self.getOfflineActivityCollectionResourceFactory = getOfflineActivityCollectionResourceFactory;
    self.getParticipantContactResource = getParticipantContactResource;
    self.getParticipantPasswordResetResource = getParticipantPasswordResetResource;



    function isLogged() {
      return OtusRestResourceContext.hasToken();
    }

    function resetConnectionData() {
      OtusRestResourceContext.reset();
    }

    function initDefaultConnectionData() {
      OtusRestResourceContext.init();
    }

    function removeSecurityToken() {
      OtusRestResourceContext.removeSecurityToken();
    }

    function setUrl(url) {
      OtusRestResourceContext.setUrl(url);
    }

    function setSecurityToken(token) {
      OtusRestResourceContext.setSecurityToken(token);
    }

    function getOtusInstallerResource() {
      return OtusInstallerResourceFactory.create();
    }

    function getOtusAuthenticatorResource() {
      return OtusAuthenticatorResourceFactory.create();
    }

    function getOtusFieldCenterResource() {
      return OtusFieldCenterResourceFactory.create();
    }

    function getUserResource() {
      return UserResourceFactory.create();
    }

    function getProjectConfigurationResource() {
      return OtusProjectConfigurationResourceFactory.create();
    }

    function getConfigurationResource() {
      return OtusConfigurationResourceFactory.create();
    }

    function getSurveyResource() {
      return SurveyResourceFactory.create();
    }

    function getSurveyGroupResource() {
      return SurveyGroupResourceFactory.create();
    }

    function getActivityResource() {
      return ActivityResourceFactory.create();
    }

    function getActivityImportationResource() {
      return ActivityImportationResourceFactory.create();
    }

    function getActivityConfigurationResource() {
      return ActivityConfigurationResourceFactory.create();
    }

    function getExtractionResource() {
      return DataExtractionResourceFactory.create();
    }

    function getParticipantResource() {
      return ParticipantResourceFactory.create();
    }

    function getLaboratoryParticipantResource() {
      return LaboratoryParticipantResourceFactory.create();
    }

    function getLaboratoryConfigurationResource() {
      return LaboratoryConfigurationResourceFactory.create();
    }

    function getUnattachedLaboratoryResource() {
      return UnattachedLaboratoryResourceFactory.create();
    }

    function getDatasourceResourceFactory() {
      return DatasourceResourceFactory.create();
    }

    function getFileUploadResourceFactory() {
      return UploadResourceFactory.create();
    }

    function getSampleTransport() {
      return SampleTransport.create();
    }

    function getExamLotResource() {
      return ExamLot.create();
    }

    function getExamUploadResource() {
      return ExamUpload.create();
    }

    function getReportResourceFactory() {
      return ReportResourceFactory.create();
    }

    function getOtusMonitoringResource() {
      return OtusMonitoringResourceFactory.create();
    }

    function getOtusLaboratoryMonitoringResource() {
      return OtusLaboratoryMonitoringResourceFactory.create();
    }

    function getPasswordResetResource() {
      return PasswordResetResourceFactory.create();
    }

    function getPermissionConfigurationResource() {
      return PermissionConfigurationResourceFactory.create();
    }

    function getUserPermissionResource() {
      return UserPermissionResourceFactory.create();
    }

    function getStaticVariableResource() {
      return StaticVariableResourceFactory.create();
    }

    function getFollowUpResourceFactory() {
      return FollowUpResourceFactory.create();
    }

    function getEventResourceFactory() {
      return EventResourceFactory.create();
    }

    function getUserActivityPendencyResource() {
      return UserActivityPendencyResourceFactory.create();
    }

    function getLocationPointResource() {
      return LocationPointResourceFactory.create();
    }

    function getOfflineActivityCollectionResourceFactory() {
      return OfflineActivityCollectionResourceFactory.create();
    }

    function getParticipantContactResource() {
      return ParticipantContactResourceFactory.create();
    }

    function getParticipantPasswordResetResource() {
      return ParticipantPasswordResetResourceFactory.create();
    }
  }
}());

(function() {
   'use strict';

   angular
      .module('otus.client')
      .factory('otusjs.otus.client.OtusConfigurationResourceFactory', Factory);

   Factory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

   function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
      var SUFFIX = '/configuration';

      var self = this;
      self.create = create;

      function create() {
         var restPrefix = OtusRestResourceContext.getRestPrefix();
         var token = OtusRestResourceContext.getSecurityToken();
         var headers = HeaderBuilderFactory.create(token);
         var headersPublishTemplate = HeaderBuilderFactory.create(token);
         headersPublishTemplate.setContentType('application/json; charset=utf-8');

         var config = {
            getSurveys: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys',
               headers: headers.json
            },
            getAllSurveys: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys/all',
               headers: headers.json
            },
            getByAcronym: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys/:acronym',
               headers: headers.json,
               params: {
                'acronym': '@acronym'
               }
            },
            getSurveyVersions: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/surveys/:acronym/versions',
               headers: headers.json,
               params: {
                'acronym': '@acronym'
               }
            },
            updateSurveyTemplateType: {
               method: 'PUT',
               url: restPrefix + SUFFIX + '/surveys/:acronym/type',
               data: {
                  'newSurveyFormType': '@newSurveyFormType'
               },
               headers: headers.json,
               params: {
                  'acronym': '@acronym'
               }
            },
            publishTemplate: {
               method: 'POST',
               url: restPrefix + SUFFIX + '/publish/template',
               headers: headersPublishTemplate.json
            },
            deleteSurveyTemplate: {
               method: 'DELETE',
               url: restPrefix + SUFFIX + '/surveys/:acronym',
               headers: headers.json
            },

           updateSurveyRequiredExternalID: {
             method: 'PUT',
             url: restPrefix + SUFFIX + '/surveys/update-required-external-id/:id',
             headers: headers.json,
             params:{
               'id':'@id'
             },
             data: {
               'requiredExternalID': '@requiredExternalID'
             }
           }
         };
         return $resource({}, {}, config);
      }
      return self;

   }
}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.DataExtractionResourceFactory', DataExtractionResourceFactory);

    DataExtractionResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function DataExtractionResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/data-extraction';
        var self = this;


        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                extractionToken: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/extraction-token',
                    headers: headers.json
                },
                listExtractionIps: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list-ips',
                    headers: headers.json
                },
                updateExtractionIps: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable-ips',
                    headers: headers.json
                },
                enableExtraction: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable',
                    headers: headers.json
                },
                disableExtraction: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/disable',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusAuthenticatorResourceFactory', OtusAuthenticatorResourceFactory);

    OtusAuthenticatorResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusAuthenticatorResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/authentication';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                authenticate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                invalidate: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/invalidate',
                    headers: headers.json
                },
                authenticateProject: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/project',
                    headers: headers.json
                }
            });

        }

        return self;

    }

}());

(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantPasswordResetResourceFactory', ParticipantPasswordResetResourceFactory);

    ParticipantPasswordResetResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantPasswordResetResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participants/password-reset';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                requestRecovery: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data: {
                        'email': '@email'
                    }
                }
            });
        }
        return self;
    }
}());

(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.PasswordResetResourceFactory', PasswordResetResourceFactory);

    PasswordResetResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function PasswordResetResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/user/password-reset';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                requestRecovery: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data: {
                        'email': '@email',
                        'url': '@url'
                    }
                },

                validationToken: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/validate/:token',
                    headers: headers.json,
                    params: {
                        'token': '@token'
                    }
                },

                updatePassword: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data: {
                        'token': '@token',
                        'password': '@password'
                    }
                }
            });
        }
        return self;
    }
}());

(function () {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.DatasourceResourceFactory', DatasourceResourceFactory);

    DatasourceResourceFactory.$inject = [
        '$http',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function DatasourceResourceFactory($http, OtusRestResourceContext, HeaderBuilderFactory) {
        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            return new HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory);
        }
        return self;
    }

    function HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/configuration/datasources';
        var self = this;
        var _restPrefix, _token, _headers;

        self.create = create;
        self.update = update;
        self.list = list;
        self.getByID = getByID;

        _init();

        function _init() {
            _restPrefix = OtusRestResourceContext.getRestPrefix();
            _token = OtusRestResourceContext.getSecurityToken();
            _headers = HeaderBuilderFactory.create(_token);
        }

        function create(formData) {
            _headers.setContentType(undefined);
            return $http({
                method: 'POST',
                url: _restPrefix + SUFFIX,
                data: formData,
                headers: _headers.json,
                transformRequest: angular.identity
            });
        };

        function update(formData) {
            _headers.setContentType(undefined);
            return $http({
                method: 'PUT',
                url: _restPrefix + SUFFIX,
                data: formData,
                headers: _headers.json,
                transformRequest: angular.identity
            });
        };

        function list() {
            return $http({
                method: 'GET',
                url: _restPrefix + SUFFIX,
                headers: _headers.json
            });
        };

        function getByID(id) {
            return $http({
                method: 'GET',
                url: _restPrefix + SUFFIX + '/' + id,
                headers: _headers.json
            });
        };
        return self;
    }
}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.EventResourceFactory', Factory);

  Factory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/event';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        create: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/create/:id',
          headers: headers.json,
          data: {
              'data': '@data'
          },
          params:{
            'id':'@id'
          },
        },
        deactivate: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/remove/:id',
          headers: headers.json,
          params:{
            'id':'@id'
          }
        }
      });
    }
    return self;
  }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusFieldCenterResourceFactory', OtusFieldCenterResourceFactory);

    OtusFieldCenterResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusFieldCenterResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/center';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                getAll: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                update: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/update',
                    headers: headers.json
                }

            });
        }

        return self;

    }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.FollowUpResourceFactory', FollowUpResourceFactory);

  FollowUpResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function FollowUpResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/followUp';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        add: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/add',
          headers: headers.json,
          data: {
              'data': '@data'
          }
        },
        update: {
          method: 'POST',
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
        },
        deactivateFollowUpEvent: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/participantEvent/cancel/:followUpId',
          headers: headers.json,
          params:{
            'followUpId':'@followUpId'
          }
        },
        createFollowUpActivity: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/createFollowUpActivity/:rn',
          headers: headers.json,
          params:{
            'rn':'@rn'
          },
          data: {
            'activity': '@activity'
          }
        }

      });
    }
    return self;
  }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('OtusInstallerResourceFactory', OtusInstallerResourceFactory);

    OtusInstallerResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function OtusInstallerResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/installer';

        var self = this;
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                ready: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/ready',
                    headers: headers.json
                },
                config: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json

                },
                validationEmail: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/validation/email',
                    headers: headers.json
                }

            });
        }

        return self;
    }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LocationPointResourceFactory', LocationPointResourceFactory);

  LocationPointResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LocationPointResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-project/transport-location-point';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getConfiguration: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/configuration',
          headers: headers.json
        },
        createLocationPoint: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:locationName',
          headers: headers.json,
          params: {
            'locationName': '@locationName'
          }
        },
        updateLocationPoint: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        deleteLocationPoint: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:locationPointId',
          headers: headers.json,
          params:{
            'locationPointId':'@locationPointId'
          }
        },
        saveUserLocation: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/add-user/:locationPointId',
          headers: headers.json,
          params:{
            'locationPointId':'@locationPointId'
          },
          data: {
            'user': '@user'
          }
        },
        removeUserLocation: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/remove-user/:locationPointId',
          headers: headers.json,
          params:{
            'locationPointId':'@locationPointId'
          },
          data: {
            'user': '@user'
          }
        },
        getUserLocationPoint: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/user-location-points',
          headers: headers.json
        },
        getLocationPoints: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/location-points',
          headers: headers.json
        },
      });
    }
    return self;
  }

}());

(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.MonitoringResourceFactory', MonitoringResourceFactory);

  MonitoringResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function MonitoringResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/monitoring';

    var self = this;
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        list: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json
        },
        listAcronyms: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/activities",
          headers: headers.json
        },
        find: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/activities/:acronym",
          headers: headers.json,
          params: {
            'acronym': '@acronym'
          }
        },
        listCenters: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/centers",
          headers: headers.json
        },
        getActivitiesProgressReport: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/activities/progress/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },

        /* Exam flag report */
        getExamsFlagReport: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/laboratory/progress/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getExamsFlagReportLabels: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/laboratory/progress/:center/labels",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },

        /* participant activities monitoring */
        getStatusOfActivities: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/activities/progress/participant/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        defineActivityWithDoesNotApplies: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/activities/progress/not-apply',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        deleteNotAppliesOfActivity: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/activities/progress/not-apply/:rn/:acronym',
          headers: headers.json,
          params: {
            'rn': '@rn',
            'acronym': '@acronym'
          }
        },
        getStatusOfExams: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/exams/progress/participant/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },
        defineExamWithDoesNotApplies: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/exams/progress/not-apply',
          headers: headers.json,
          data: {
            'data': '@data'
          }
        },
        deleteNotAppliesOfExam: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/exams/progress/not-apply/delete',
          headers: headers.json,
           data: {
            'data': '@data'
          }
        }
      });
    }

    return self;
  }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantContactResourceFactory', ParticipantContactResourceFactory);

    ParticipantContactResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantContactResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participant/participant-contact';

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
                    data:{
                      'participantJson': '@participantJson'
                    }
                },
                addNonMainEmail: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/add-non-main/email",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                addNonMainAddress: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/add-non-main/address",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                addNonMainPhoneNumber: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/add-non-main/phone-number",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },

                updateEmail: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update/email",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                updateAddress: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update/address",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                updatePhoneNumber: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update/phone-number",
                  headers: headers.json,
                  data:{
                    'participantContactDtoJson': '@participantContactDtoJson'
                  }
                },
                swapMainContact: {
                    method: 'PUT',
                    url: restPrefix + SUFFIX + "/swap",
                    headers: headers.json,
                    data:{
                      'participantContactDtoJson': '@participantContactDtoJson'
                    }
                },
                delete: {
                    method: 'DELETE',
                    url: restPrefix + SUFFIX + "/:id",
                    headers: headers.json,
                    params:{
                        'id': '@id'
                    }
                },
                deleteNonMainContact: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + "/delete-non-main",
                    headers: headers.json,
                    data:{
                      'participantContactDtoJson': '@participantContactDtoJson'
                    }
                },
                get: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + "/:id",
                    headers: headers.json,
                    params:{
                        'id': '@id'
                    }
                },
                getByRecruitmentNumber: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/rn/:rn',
                    headers: headers.json,
                    params:{
                      'rn': '@rn'
                    }
                }
            });
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ParticipantResourceFactory', ParticipantResourceFactory);

    ParticipantResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/participants';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                create: {
                    method: 'POST',
                    url: restPrefix + SUFFIX,
                    headers: headers.json,
                    data:{
                      'participantJson': '@participantJson'
                    }
                },
                update: {
                  method: 'PUT',
                  url: restPrefix + SUFFIX + "/update",
                  headers: headers.json,
                  data:{
                    'participantJson': '@participantJson'
                  }
                },
                getByRecruitmentNumber: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/:rn',
                    headers: headers.json,
                    params:{
                      'rn': '@rn'
                    }
                }
            });
        }

        return self;
    }

}());

(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.UserActivityPendencyResourceFactory', UserActivityPendencyResourceFactory);

  UserActivityPendencyResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function UserActivityPendencyResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/pendency/user-activity-pendency';

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
            'userActivityPendency': '@userActivityPendency'
          }
        },
        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          data: {
            'userActivityPendency': '@userActivityPendency'
          },
          params: {
            'id': '@id'
          }
        },
        getByActivityId: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:activityId',
          headers: headers.json,
          params: {
            'activityId': '@activityId'
          }
        },
        delete: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },

        getAllPendencies: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/list',
          headers: headers.json,
          data: {
            'searchSettings': '@searchSettings'
          }
        },

        getAllPendenciesToReceiver: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/receiver',
          headers: headers.json
        },
        getOpenedPendenciesToReceiver: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/receiver/opened',
          headers: headers.json
        },
        getDonePendenciesToReceiver: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/receiver/done',
          headers: headers.json
        },

        getAllPendenciesFromRequester: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/requester',
          headers: headers.json
        },
        getOpenedPendenciesFromRequester: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/requester/opened',
          headers: headers.json
        },
        getDonePendenciesFromRequester: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/requester/done',
          headers: headers.json
        }
      });
    }

    return self;
  }

}());
(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.PermissionConfigurationResourceFactory', PermissionConfigurationResourceFactory);

  PermissionConfigurationResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function PermissionConfigurationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/permission';

    var self = this;
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
            'permissionData': '@permissionData'
          }
        },

        getAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json,
        },

        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX ,
          headers: headers.json,
          data: {
            'permissionData': '@permissionData'
          }
        }
      });
    }

    return self;
  }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ReportResourceFactory', ReportResourceFactory);

  ReportResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ReportResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/report';

    var self = this;
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
              'reportTemplate': '@reportTemplate'
          }
        },

        listAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json,
        },

        getById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },

        createActivityReport: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/activity-report',
          headers: headers.json,
          data: {
              'reportTemplate': '@reportTemplate'
          }
        },

        getActivityReport: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/activity-report/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },

        getActivityReportList: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/activity-report/list/:acronym',
          headers: headers.json,
          params: {
            'acronym': '@acronym'
          }
        },

        updateActivityReport: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/activity-report/update/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          },
          data: {
            'reportTemplate': '@reportTemplate'
          }
        },

        update: {
          method: 'PUT',
          url: restPrefix + SUFFIX ,
          headers: headers.json,
          data: {
            'reportTemplate': '@reportTemplate'
          }
        },

        remove: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id' : '@id'
          }
        },

        list: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/participant/list/:rn',
          headers: headers.json,
          params: {
            'rn': '@rn'
          }
        },

        getByRecruitmentNumber: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/participant/:rn/:id',
          headers: headers.json,
          params: {
            'rn': '@rn',
            'id': '@id'
          }
        }
      });
    }
    return self;
  }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.StaticVariableResourceFactory', StaticVariableResourceFactory);

  StaticVariableResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function StaticVariableResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/static-variable';
    var self = this;

    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getStaticVariableList: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
              'data': '@data'
          }
        }
      });
    }
    return self;
  }

}());

(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.SurveyGroupResourceFactory', SurveyGroupResourceFactory);

  SurveyGroupResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function SurveyGroupResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/survey';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        addNewSurveyGroup: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/new-group',
          headers: headers.json,
          data: {
            'surveyGroupJson': '@surveyGroupJson'
          }
        },

        getListOfSurveyGroups: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/groups',
          headers: headers.json
        },
        updateSurveyGroupName: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/update-group-name',
          headers: headers.json,
          data: {
            'updateSurveyGroupNameDto': '@updateSurveyGroupNameDto'
          }
        },

        updateSurveyGroupAcronyms: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/update-group',
          headers: headers.json,
          data: {
            'surveyGroupJson': '@surveyGroupJson'
          }
        },

        deleteSurveyGroup: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/delete-group',
          headers: headers.json,
          data: {
            'updateSurveyGroupNameDto': '@updateSurveyGroupNameDto'
          }
        },

        getSurveyGroupsByUser: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/groups-by-user',
          headers: headers.json
        }
      });
    }

    return self;
  }

}());

(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.SurveyResourceFactory', SurveyResourceFactory);

  SurveyResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function SurveyResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/survey';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        list: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list',
          headers: headers.json
        },

        listAll: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/list/all',
          headers: headers.json
        },

        // updateSurveyRequiredExternalID: {
        //   method: 'PUT',
        //   url: restPrefix + SUFFIX + '/update-required-external-id/:id',
        //   headers: headers.json,
        //   params:{
        //     'id':'@id'
        //   },
        //   data: {
        //     'requiredExternalId': '@requiredExternalId'
        //   }
        // }
      });
    }
    return self;
  }

}());

(function() {
   'use strict';

   angular
      .module('otus.client')
      .factory('otus.client.UploadResourceFactory', UploadResourceFactory);

   UploadResourceFactory.$inject = [
        '$http',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

   function UploadResourceFactory($http, OtusRestResourceContext, HeaderBuilderFactory) {
      var SUFFIX = '/upload';

      var self = this;

      /* Public methods */
      self.create = create;

      function create() {
         return new HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory);
      }
      return self;
   }

   function HttpFileUpload($http, OtusRestResourceContext, HeaderBuilderFactory) {
      var self = this;
      var _restPrefix, _token, _headers;
      var SUFFIX = '/upload';

      self.post = post;
      self.getByOID = getByOID;
      self.deleteByOID = deleteByOID;

      _init();

      function _init() {
         _restPrefix = OtusRestResourceContext.getRestPrefix();
         _token = OtusRestResourceContext.getSecurityToken();
         _headers = HeaderBuilderFactory.create(_token);
      }

      function post(formData, canceler) {
         _headers.setContentType(undefined);
         return $http({
            method: 'POST',
            url: _restPrefix + SUFFIX,
            data: formData,
            headers: _headers.json,
            timeout: canceler.promise,
            transformRequest: angular.identity
         });
      }

      function getByOID(oid) {
         return $http({
            method: 'POST',
            url: _restPrefix + SUFFIX,
            data: oid,
            responseType: "arraybuffer",
            headers: _headers.json
         });
      }

      function deleteByOID(oid) {
         return $http({
            method: 'DELETE',
            url: _restPrefix + SUFFIX + '/' + oid,
            headers: _headers.json,
         });

      }

      return self;
   }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.UserResourceFactory', UserResourceFactory);

    UserResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function UserResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/user';

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
                    url: restPrefix + SUFFIX + '/signup',
                    headers: headers.json
                },
                logged: {
                    method: 'GET',
                    url: restPrefix + SUFFIX,
                    headers: headers.json
                },
                list: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list',
                    headers: headers.json
                },
                enable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/enable',
                    headers: headers.json
                },
                disable: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/disable',
                    headers: headers.json
                },
                updateFieldCenter: {
                    method: 'POST',
                    url: restPrefix + SUFFIX + '/field-center',
                    headers: headers.json
                }
            });
        }

        return self;
    }

}());

(function() {
    'use strict';

    angular
        .module('otus.client')
        .factory('otus.client.ActivityConfigurationResourceFactory', ActivityConfigurationResourceFactory);

    ActivityConfigurationResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ActivityConfigurationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/activities/configuration';

        var self = this;

        /* Public methods */
        self.create = create;

        function create() {
            var restPrefix = OtusRestResourceContext.getRestPrefix();
            var token = OtusRestResourceContext.getSecurityToken();
            var headers = HeaderBuilderFactory.create(token);

            return $resource({}, {}, {
              listAll: {
                method: 'GET',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json
              },
              getById: {
                method: 'GET',
                url: restPrefix + SUFFIX + '/categories/:id',
                headers: headers.json,
                params: {
                  'id': '@id'
                }
              },
              create: {
                method: 'POST',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json,
                data: {
                  'activityCategory': '@activityCategory'
                }
              },
              delete: {
                method: 'DELETE',
                url: restPrefix + SUFFIX + '/categories/:id',
                headers: headers.json,
                params: {
                  'id': '@id'
                }
              },
              update: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/categories',
                headers: headers.json,
                data: {
                  'activityCategory': '@activityCategory'
                }
              },
              setDefault: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/categories/default/:id',
                headers: headers.json,
                params: {
                  'id': '@id'
                }
              }
            });
        }

        return self;
    }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ActivityImportationResourceFactory', ActivityImportationResourceFactory);

  ActivityImportationResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ActivityImportationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/activities/import';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {

        importActivities: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/:acronym/:version',
          headers: headers.json,
          data: {
            'surveyActivities': '@surveyActivities'
          },
          params: {
            'acronym': '@acronym',
            'version': '@version'
          }
        }
      });
    }
    return self;
  }

}());

(function() {
   'use strict';

   angular
      .module('otus.client')
      .factory('otusjs.otus.client.OtusProjectConfigurationResourceFactory', Factory);

   Factory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

   function Factory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
      var SUFFIX = '/configuration/project';

      var self = this;
      self.create = create;

      function create() {
         var restPrefix = OtusRestResourceContext.getRestPrefix();
         var token = OtusRestResourceContext.getSecurityToken();
         var headers = HeaderBuilderFactory.create(token);
         var headersPublishTemplate = HeaderBuilderFactory.create(token);
         headersPublishTemplate.setContentType('application/json; charset=utf-8');

         var config = {
            allowNewParticipants: {
               method: 'PUT',
               url: restPrefix + SUFFIX + '/participant/registration/:permission',
               headers: headers.json,
               params: {
                  'permission': '@permission'
               }
            },
            autoGenerateRecruitmentNumber: {
                method: 'PUT',
                url: restPrefix + SUFFIX + '/participant/autoGenerateRecruitmentNumber/:permission',
                headers: headers.json,
                params: {
                  'permission': '@permission'
                }
            },
            getProjectConfiguration: {
               method: 'GET',
               url: restPrefix + SUFFIX,
               headers: headers.json
            },
            getVisualIdentity: {
               method: 'GET',
               url: restPrefix + SUFFIX + '/visual-identity',
               headers: headers.json
            },
            updateVisualIdentity: {
               method: 'POST',
               url: restPrefix + SUFFIX + '/visual-identity',
               headers: headers.json
            }
         };
         return $resource({}, {}, config);
      }
      return self;

   }
}());

(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LaboratoryConfigurationResourceFactory', LaboratoryConfigurationResourceFactory);

  LaboratoryConfigurationResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LaboratoryConfigurationResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-configuration';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getCheckingExist: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/exists',
          headers: headers.json
        },
        getDescriptors: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/descriptor',
          headers: headers.json,
        },
        getAliquotConfiguration: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquot-configuration',
          headers: headers.json,
        },
        getAliquotDescriptors: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquot-descriptors',
          headers: headers.json,
        }
      });
    }
    return self;
  }

}());

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
            'rn': '@rn'
          }
        },
        updateTubeCollectionData: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/tube-collection-data/:rn',
          headers: headers.json,
          data: {
              'tubes': '@tubes'
          },
          params: {
              'rn': '@rn'
          }
        },
        deleteAliquot: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/aliquot/:code',
          headers: headers.json,
          params: {
            'code' : '@code'
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
            'rn': '@rn'
          }
        },
        convertStorageAliquot: {
          method: 'PUT',
          url: restPrefix + SUFFIX + '/convert-aliquot-role',
          headers: headers.json,
          data: {
            'convertedAliquot': '@convertedAliquot'
          }
        }
      });
    }
    return self;
  }

}());

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
        getByIdentification: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/identification/:laboratoryIdentification',
          headers: headers.json,
          params: {
            'laboratoryIdentification': '@laboratoryIdentification'
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

(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.LaboratoryMonitoringResourceFactory', LaboratoryMonitoringResourceFactory);

  LaboratoryMonitoringResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function LaboratoryMonitoringResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/monitoring/laboratory';

    var self = this;
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getDataOfPendingResultsByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/pending/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataQuantitativeByTypeOfAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/quantitative/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataOrphanByExams: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/orphan",
          headers: headers.json
        },
        getDataOfStorageByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/storage/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/exam/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataToCSVOfPendingResultsByAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/pending/csv/:center",
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getDataToCSVOfOrphansByExam: {
          method: 'GET',
          url: restPrefix + SUFFIX + "/orphan/csv",
          headers: headers.json
        }
      });
    }

    return self;
  }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.UserPermissionResourceFactory', UserPermissionResourceFactory);

  UserPermissionResourceFactory.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function UserPermissionResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/permission/user';

    var self = this;
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        savePermission: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/save',
          headers: headers.json,
          data: {
            'permissionJson': '@permissionJson'
          }
        },
        getAll: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/:email',
          headers: headers.json,
          params: {
            'email' : '@email'
          }
        }
      });
    }

    return self;
  }

}());

(function () {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ExamLot', ExamLot);

  ExamLot.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ExamLot($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/laboratory-project/exam-lot';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        getLotAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquots/:lotId',
          headers: headers.json,
          params: {
            'lotId': '@lotId'
          }
        },
        getAliquotsByCenter: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquots/:center',
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getAliquot: {
          method: 'POST',
          url: restPrefix + SUFFIX + '/aliquot',
          headers: headers.json,
          data: {
            'examLotAliquotFilter': '@examLotAliquotFilter'
          }
        },
        getAvailableExams: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/available-exams/:center',
          headers: headers.json,
          params: {
            'center': '@center'
          }
        },
        getLots: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/center-lots/:acronym',
          headers: headers.json,
          params: {
            'acronym': '@acronym'
          }
        },
        createLot: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'sampleLot': '@sampleLot'
          }
        },
        updateLot: {
          method: 'PUT',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'sampleLot': '@sampleLot'
          }
        },
        deleteLot: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        }
      });
    }

    return self;
  }

}());

(function() {
  'use strict';

  angular
    .module('otus.client')
    .factory('otus.client.ExamUpload', ExamUpload);

  ExamUpload.$inject = [
    '$resource',
    'OtusRestResourceContext',
    'otus.client.HeaderBuilderFactory'
  ];

  function ExamUpload($resource, OtusRestResourceContext, HeaderBuilderFactory) {
    var SUFFIX = '/exam-upload';

    var self = this;

    /* Public methods */
    self.create = create;

    function create() {
      var restPrefix = OtusRestResourceContext.getRestPrefix();
      var token = OtusRestResourceContext.getSecurityToken();
      var headers = HeaderBuilderFactory.create(token);

      return $resource({}, {}, {
        listAll: {
          method: 'GET',
          url: restPrefix + SUFFIX,
          headers: headers.json
        },
        create: {
          method: 'POST',
          url: restPrefix + SUFFIX,
          headers: headers.json,
          data: {
            'examUploadJson': '@examUploadJson'
          }
        },
        delete: {
          method: 'DELETE',
          url: restPrefix + SUFFIX + '/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        },
        getById: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/results/:id',
          headers: headers.json,
          params: {
            'id': '@id'
          }
        }
      });
    }
    return self;
  }

}());

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
        getLots: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/lots/:locationPointId',
          headers: headers.json,
          params: {
            'locationPointId' : '@locationPointId'
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
        }
      });
    }
    return self;
  }

}());
