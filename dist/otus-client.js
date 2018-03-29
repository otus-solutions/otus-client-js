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
                  'rn': '@rn',
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
                  'rn': '@rn',
                }
              },
              listAll: {
                method: 'GET',
                url: restPrefix + SUFFIX,
                headers: headers.json,
                params: {
                  'rn': '@rn',
                }
              },
              getById: {
                method: 'GET',
                url: restPrefix + SUFFIX + '/:id',
                headers: headers.json,
                params: {
                  'id': '@id',
                  'rn': '@rn',
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
                  'rn': '@rn',
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
        'otus.client.SurveyResourceFactory',
        'otus.client.ActivityResourceFactory',
        'otus.client.ActivityConfigurationResourceFactory',
        'otus.client.DataExtractionResourceFactory',
        'otus.client.ParticipantResourceFactory',
        'otus.client.LaboratoryParticipantResourceFactory',
        'otus.client.LaboratoryConfigurationResourceFactory',
        'otus.client.DatasourceResourceFactory',
        'otus.client.UploadResourceFactory',
        'otus.client.SampleTransport',
        'otus.client.ExamLot',
        'otus.client.ExamUpload',
        'otus.client.ReportResourceFactory'
    ];

    function OtusRestResourceService(
        OtusInstallerResourceFactory,
        OtusAuthenticatorResourceFactory,
        OtusFieldCenterResourceFactory,
        OtusRestResourceContext,
        UserResourceFactory,
        OtusProjectConfigurationResourceFactory,
        SurveyResourceFactory,
        ActivityResourceFactory,
        ActivityConfigurationResourceFactory,
        DataExtractionResourceFactory,
        ParticipantResourceFactory,
        LaboratoryParticipantResourceFactory,
        LaboratoryConfigurationResourceFactory,
        DatasourceResourceFactory,
        UploadResourceFactory,
        SampleTransport,
        ExamLot,
        ExamUpload,
        ReportResourceFactory
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
        self.getSurveyResource = getSurveyResource;
        self.getActivityResource = getActivityResource;
        self.getActivityConfigurationResource = getActivityConfigurationResource;
        self.getExtractionResource = getExtractionResource;
        self.getParticipantResource = getParticipantResource;
        self.getLaboratoryParticipantResource = getLaboratoryParticipantResource;
        self.getLaboratoryConfigurationResource = getLaboratoryConfigurationResource;
        self.getDatasourceResourceFactory = getDatasourceResourceFactory;
        self.getFileUploadResourceFactory = getFileUploadResourceFactory;
        self.getSampleTransport = getSampleTransport;
        self.getExamLotResource = getExamLotResource;
        self.getExamUploadResource = getExamUploadResource;
        self.isLogged = isLogged;
        self.getReportResourceFactory = getReportResourceFactory;

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

        function getSurveyResource() {
            return SurveyResourceFactory.create();
        }

        function getActivityResource() {
            return ActivityResourceFactory.create();
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
        .factory('otus.client.DatasourceResourceFactory', DatasourceResourceFactory);

    DatasourceResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function DatasourceResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '/configuration/datasources';
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
                getByID: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/:idx',
                    headers: headers.json,
                    params: {
                        'idx': '@idx'
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
        .factory('otus.client.ParticipantResourceFactory', ParticipantResourceFactory);

    ParticipantResourceFactory.$inject = [
        '$resource',
        'OtusRestResourceContext',
        'otus.client.HeaderBuilderFactory'
    ];

    function ParticipantResourceFactory($resource, OtusRestResourceContext, HeaderBuilderFactory) {
        var SUFFIX = '';

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
                    url: restPrefix + SUFFIX + '/participants',
                    isArray: true,
                    headers: headers.json
                },
                listIndexers: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/list-indexers',
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
                getAliquots: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/aliquots',
                    headers: headers.json
                },
                getAliquotsByCenter: {
                    method: 'GET',
                    url: restPrefix + SUFFIX + '/aliquots/:center',
                    headers: headers.json,
                    params: {
                        'center': '@center'
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
                    url: restPrefix + SUFFIX,
                    headers: headers.json
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
        getAliquots: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquots',
          headers: headers.json
        },
        getAliquotsByCenter: {
          method: 'GET',
          url: restPrefix + SUFFIX + '/aliquots/:center',
          headers: headers.json,
          params: {
            'center': '@center'
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
