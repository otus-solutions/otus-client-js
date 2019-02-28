describe('RestResourceService', function () {

  var service, otusRestResourceContext, otusInstallerResourceFactory, otusAuthenticatorResourceFactory, otusFieldCenterResourceFactory;
  var userResourceFactory, otusProjectConfigurationResourceFactory, otusConfigurationResourceFactory, surveyResourceFactory, activityResourceFactory, activityConfigurationResourceFactory;
  var dataExtractionResourceFactory, participantResourceFactory, laboratoryParticipantResourceFactory, laboratoryConfigurationResourceFactory;
  var datasourceResourceFactory, uploadResourceFactory, sampleTransport, examLot, examUpload, reportResourceFactory, monitoringResourceFactory, passwordResetResourceFactory, permissionConfigurationResourceFactory;
  var laboratoryMonitoringResourceFactory;

  beforeEach(function () {
    angular.mock.module('otus.client');
    angular.mock.inject(function (_$injector_) {
      service = _$injector_.get('OtusRestResourceService');
      otusRestResourceContext = _$injector_.get('OtusRestResourceContext');
      otusInstallerResourceFactory = _$injector_.get('OtusInstallerResourceFactory');
      otusAuthenticatorResourceFactory = _$injector_.get('OtusAuthenticatorResourceFactory');
      otusFieldCenterResourceFactory = _$injector_.get('OtusFieldCenterResourceFactory');
      userResourceFactory = _$injector_.get('otus.client.UserResourceFactory');
      otusProjectConfigurationResourceFactory = _$injector_.get('otusjs.otus.client.OtusProjectConfigurationResourceFactory');
      otusConfigurationResourceFactory = _$injector_.get('otusjs.otus.client.OtusConfigurationResourceFactory');
      surveyResourceFactory = _$injector_.get('otus.client.SurveyResourceFactory');
      activityResourceFactory = _$injector_.get('otus.client.ActivityResourceFactory');
      activityConfigurationResourceFactory = _$injector_.get('otus.client.ActivityConfigurationResourceFactory');
      dataExtractionResourceFactory = _$injector_.get('otus.client.DataExtractionResourceFactory');
      participantResourceFactory = _$injector_.get('otus.client.ParticipantResourceFactory');
      laboratoryParticipantResourceFactory = _$injector_.get('otus.client.LaboratoryParticipantResourceFactory');
      laboratoryConfigurationResourceFactory = _$injector_.get('otus.client.LaboratoryConfigurationResourceFactory');
      datasourceResourceFactory = _$injector_.get('otus.client.DatasourceResourceFactory');
      uploadResourceFactory = _$injector_.get('otus.client.UploadResourceFactory');
      sampleTransport = _$injector_.get('otus.client.SampleTransport');
      examLot = _$injector_.get('otus.client.ExamLot');
      examUpload = _$injector_.get('otus.client.ExamUpload');
      reportResourceFactory = _$injector_.get('otus.client.ReportResourceFactory');
      monitoringResourceFactory = _$injector_.get('otus.client.MonitoringResourceFactory');
      laboratoryMonitoringResourceFactory = _$injector_.get('otus.client.LaboratoryMonitoringResourceFactory');      
      passwordResetResourceFactory = _$injector_.get('otus.client.PasswordResetResourceFactory');
      permissionConfigurationResourceFactory = _$injector_.get('otus.client.PermissionConfigurationResourceFactory')

      spyOn(otusRestResourceContext, 'hasToken').and.callThrough();
      spyOn(otusRestResourceContext, 'reset').and.callThrough();
      spyOn(otusRestResourceContext, 'init').and.callThrough();
      spyOn(otusRestResourceContext, 'removeSecurityToken').and.callThrough();
      spyOn(otusRestResourceContext, 'setUrl').and.callThrough();
      spyOn(otusRestResourceContext, 'setSecurityToken').and.callThrough();
      spyOn(otusInstallerResourceFactory, 'create').and.callThrough();
      spyOn(otusAuthenticatorResourceFactory, 'create').and.callThrough();
      spyOn(otusFieldCenterResourceFactory, 'create').and.callThrough();
      spyOn(userResourceFactory, 'create').and.callThrough();
      spyOn(otusProjectConfigurationResourceFactory, 'create').and.callThrough();
      spyOn(otusConfigurationResourceFactory, 'create').and.callThrough();
      spyOn(surveyResourceFactory, 'create').and.callThrough();
      spyOn(activityResourceFactory, 'create').and.callThrough();
      spyOn(activityConfigurationResourceFactory, 'create').and.callThrough();
      spyOn(dataExtractionResourceFactory, 'create').and.callThrough();
      spyOn(participantResourceFactory, 'create').and.callThrough();
      spyOn(laboratoryParticipantResourceFactory, 'create').and.callThrough();
      spyOn(laboratoryConfigurationResourceFactory, 'create').and.callThrough();
      spyOn(datasourceResourceFactory, 'create').and.callThrough();
      spyOn(uploadResourceFactory, 'create').and.callThrough();
      spyOn(sampleTransport, 'create').and.callThrough();
      spyOn(examLot, 'create').and.callThrough();
      spyOn(examUpload, 'create').and.callThrough();
      spyOn(reportResourceFactory, 'create').and.callThrough();
      spyOn(monitoringResourceFactory, 'create').and.callThrough();
      spyOn(laboratoryMonitoringResourceFactory, 'create').and.callThrough();      
      spyOn(passwordResetResourceFactory, 'create').and.callThrough();
      spyOn(permissionConfigurationResourceFactory, 'create').and.callThrough();
    });
  });

  it('serviceExistence check', function () {
    expect(service).toBeDefined();
  });

  describe('ServiceInstance', function () {

    it('methodServiceExistence check', function () {
      expect(service.isLogged).toBeDefined();
      expect(service.resetConnectionData).toBeDefined();
      expect(service.initDefaultConnectionData).toBeDefined();
      expect(service.removeSecurityToken).toBeDefined();
      expect(service.setUrl).toBeDefined();
      expect(service.setSecurityToken).toBeDefined();
      expect(service.getOtusInstallerResource).toBeDefined();
      expect(service.getOtusAuthenticatorResource).toBeDefined();
      expect(service.getOtusFieldCenterResource).toBeDefined();
      expect(service.getUserResource).toBeDefined();
      expect(service.getProjectConfigurationResource).toBeDefined();
      expect(service.getConfigurationResource).toBeDefined();
      expect(service.getActivityResource).toBeDefined();
      expect(service.getActivityConfigurationResource).toBeDefined();
      expect(service.getExtractionResource).toBeDefined();
      expect(service.getParticipantResource).toBeDefined();
      expect(service.getLaboratoryParticipantResource).toBeDefined();
      expect(service.getLaboratoryConfigurationResource).toBeDefined();
      expect(service.getDatasourceResourceFactory).toBeDefined();
      expect(service.getFileUploadResourceFactory).toBeDefined();
      expect(service.getSampleTransport).toBeDefined();
      expect(service.getExamLotResource).toBeDefined();
      expect(service.getExamUploadResource).toBeDefined();
      expect(service.getReportResourceFactory).toBeDefined();
      expect(service.getOtusMonitoringResource).toBeDefined();
      expect(service.getPasswordResetResource).toBeDefined();
      expect(service.getPermissionConfigurationResource).toBeDefined();
    });

    describe('serviceMethods', function () {

      it('isLoggedMethod check', function () {
        service.isLogged();
        expect(otusRestResourceContext.hasToken).toHaveBeenCalledTimes(1);
      });

      it('resetConnectionDataMethod check', function () {
        service.resetConnectionData();
        expect(otusRestResourceContext.reset).toHaveBeenCalledTimes(1);
      });

      it('initDefaultConnectionDataMethod check', function () {
        service.initDefaultConnectionData();
        expect(otusRestResourceContext.init).toHaveBeenCalledTimes(1);
      });

      it('removeSecurityTokenMethod check', function () {
        service.removeSecurityToken();
        expect(otusRestResourceContext.removeSecurityToken).toHaveBeenCalledTimes(1);
      });

      it('setUrlMethod check', function () {
        var url = 'http://localhost:8080/unitTest'
        service.setUrl(url);
        expect(otusRestResourceContext.setUrl).toHaveBeenCalledTimes(1);
      });

      it('setSecurityTokenMethod check', function () {
        var token = 1234567;
        service.setSecurityToken(token);
        expect(otusRestResourceContext.setSecurityToken).toHaveBeenCalledTimes(1);
      });

      it('getOtusInstallerResourceMethod check', function () {
        service.getOtusInstallerResource();
        expect(otusInstallerResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getOtusAuthenticatorResourceMethod check', function () {
        service.getOtusAuthenticatorResource();
        expect(otusAuthenticatorResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getOtusFieldCenterResourceMethod check', function () {
        service.getOtusFieldCenterResource();
        expect(otusFieldCenterResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getUserResourceMethod check', function () {
        service.getUserResource();
        expect(userResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getProjectConfigurationResourceMethod check', function () {
        service.getProjectConfigurationResource();
        expect(otusProjectConfigurationResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getConfigurationResourceMethod check', function () {
        service.getConfigurationResource();
        expect(otusConfigurationResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getSurveyResourceMethod check', function () {
        service.getSurveyResource();
        expect(surveyResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getActivityResourceMethod check', function () {
        service.getActivityResource();
        expect(activityResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getActivityConfigurationResourceMethod check', function () {
        service.getActivityConfigurationResource();
        expect(activityConfigurationResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getExtractionResourceMethod check', function () {
        service.getExtractionResource();
        expect(dataExtractionResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getParticipantResourceMethod check', function () {
        service.getParticipantResource();
        expect(participantResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getLaboratoryParticipantResourceMethod check', function () {
        service.getLaboratoryParticipantResource();
        expect(laboratoryParticipantResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getLaboratoryConfigurationResourceMethod check', function () {
        service.getLaboratoryConfigurationResource();
        expect(laboratoryConfigurationResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getDatasourceResourceFactoryMethod check', function () {
        service.getDatasourceResourceFactory();
        expect(datasourceResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getFileUploadResourceFactoryMethod check', function () {
        service.getFileUploadResourceFactory();
        expect(uploadResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getSampleTransportMethod check', function () {
        service.getSampleTransport();
        expect(sampleTransport.create).toHaveBeenCalledTimes(1);
      });

      it('getExamLotResourceMethod check', function () {
        service.getExamLotResource();
        expect(examLot.create).toHaveBeenCalledTimes(1);
      });

      it('getExamUploadResourceMethod check', function () {
        service.getExamUploadResource();
        expect(examUpload.create).toHaveBeenCalledTimes(1);
      });

      it('getReportResourceFactoryMethod check', function () {
        service.getReportResourceFactory();
        expect(reportResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getReportResourceFactoryMethod check', function () {
        service.getOtusMonitoringResource();
        expect(monitoringResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getOtusLaboratoryMonitoringResourceFactoryMethod check', function () {
        service.getOtusLaboratoryMonitoringResource();
        expect(laboratoryMonitoringResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getPasswordResetResourceMethod check', function () {
        service.getPasswordResetResource();
        expect(passwordResetResourceFactory.create).toHaveBeenCalledTimes(1);
      });

      it('getPermissionConfigurationResourceFactoryMethod check', function () {
        service.getPermissionConfigurationResource();
        expect(permissionConfigurationResourceFactory.create).toHaveBeenCalledTimes(1);
      });
    });
  });
});
