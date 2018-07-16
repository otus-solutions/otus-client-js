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
        'otus.client.ReportResourceFactory',
        'otus.client.MonitoringResourceFactory'
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
        ReportResourceFactory,
        OtusMonitoringResourceFactory
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
        self.getOtusMonitoringResource = getOtusMonitoringResource;

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

        function getOtusMonitoringResource() {
            return OtusMonitoringResourceFactory.create();
        }

    }

}());
