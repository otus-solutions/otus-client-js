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
    'otus.client.ActivityImportationResourceFactory'
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
    ActivityImportationResourceFactory
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
    self.getActivityImportationResource = getActivityImportationResource;

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
  }
}());
