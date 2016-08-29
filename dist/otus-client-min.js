!function(){"use strict";angular.module("otus.client",["ngResource"])}(),function(){"use strict";function UrlParser(){function parser(url){var parserElement=document.createElement("a");return parserElement.href=url,parserElement}var self=this;self.parser=parser}angular.module("otus.client").service("UrlParser",UrlParser)}(),function(){"use strict";function OtusAuthenticatorResourceFactory($resource,OtusRestResourceContext,HeaderBuilderFactory){function create(){var restPrefix=OtusRestResourceContext.getRestPrefix(),token=OtusRestResourceContext.getSecurityToken(),headers=HeaderBuilderFactory.create(token);return $resource({},{},{authenticate:{method:"POST",url:restPrefix+SUFFIX,headers:headers.json},invalidate:{method:"POST",url:restPrefix+SUFFIX+"/invalidate",headers:headers.json},authenticateProject:{method:"POST",url:restPrefix+SUFFIX+"/project",headers:headers.json}})}var SUFFIX="/authentication",self=this;return self.create=create,self}angular.module("otus.client").factory("OtusAuthenticatorResourceFactory",OtusAuthenticatorResourceFactory),OtusAuthenticatorResourceFactory.$inject=["$resource","OtusRestResourceContext","otus.client.HeaderBuilderFactory"]}(),function(){"use strict";function factory(){function create(token){return new Headers(token)}var self=this;return self.create=create,self}function Headers(token){var self=this;self.json={Authorization:"Bearer "+token}}angular.module("otus.client").factory("otus.client.HeaderBuilderFactory",factory)}(),function(){"use strict";function OtusRestResourceContext($window,UrlParser){function init(){HOSTNAME="http://"+$window.location.hostname,CONTEXT="/otus-rest",VERSION="/v01"}function hasToken(){return!!$window.sessionStorage[TOKEN_USER_NAME]}function reset(){HOSTNAME=""}function removeSecurityToken(){delete $window.sessionStorage[TOKEN_USER_NAME]}function setUrl(url){var parser=UrlParser.parser(url);HOSTNAME=parser.origin}function setHostname(hostname){HOSTNAME=hostname}function setContext(context){CONTEXT="/"+context}function setVersion(version){VERSION="/"+version}function getRestPrefix(){return HOSTNAME+CONTEXT+VERSION}function setSecurityToken(securityToken){$window.sessionStorage[TOKEN_USER_NAME]=securityToken}function getSecurityToken(){return $window.sessionStorage[TOKEN_USER_NAME]}var HOSTNAME,CONTEXT,VERSION,self=this,TOKEN_USER_NAME="outk";self.setUrl=setUrl,self.setHostname=setHostname,self.setContext=setContext,self.setVersion=setVersion,self.setSecurityToken=setSecurityToken,self.getRestPrefix=getRestPrefix,self.getSecurityToken=getSecurityToken,self.removeSecurityToken=removeSecurityToken,self.init=init,self.reset=reset,self.hasToken=hasToken,self.init()}angular.module("otus.client").service("OtusRestResourceContext",OtusRestResourceContext),OtusRestResourceContext.$inject=["$window","UrlParser"]}(),function(){"use strict";function OtusRestResourceService(OtusInstallerResourceFactory,OtusAuthenticatorResourceFactory,OtusFieldCenterResourceFactory,OtusRestResourceContext,UserResourceFactory){function isLogged(){return OtusRestResourceContext.hasToken()}function resetConnectionData(){OtusRestResourceContext.reset()}function initDefaultConnectionData(){OtusRestResourceContext.init()}function removeSecurityToken(){OtusRestResourceContext.removeSecurityToken()}function setUrl(url){OtusRestResourceContext.setUrl(url)}function setSecurityToken(token){OtusRestResourceContext.setSecurityToken(token)}function getOtusInstallerResource(){return OtusInstallerResourceFactory.create()}function getOtusAuthenticatorResource(){return OtusAuthenticatorResourceFactory.create()}function getOtusFieldCenterResource(){return OtusFieldCenterResourceFactory.create()}function getUserResource(){return UserResourceFactory.create()}var self=this;self.resetConnectionData=resetConnectionData,self.initDefaultConnectionData=initDefaultConnectionData,self.removeSecurityToken=removeSecurityToken,self.setUrl=setUrl,self.setSecurityToken=setSecurityToken,self.getOtusInstallerResource=getOtusInstallerResource,self.getOtusAuthenticatorResource=getOtusAuthenticatorResource,self.getOtusFieldCenterResource=getOtusFieldCenterResource,self.getUserResource=getUserResource,self.isLogged=isLogged}angular.module("otus.client").service("OtusRestResourceService",OtusRestResourceService),OtusRestResourceService.$inject=["OtusInstallerResourceFactory","OtusAuthenticatorResourceFactory","OtusFieldCenterResourceFactory","OtusRestResourceContext","otus.client.UserResourceFactory"]}(),function(){"use strict";function UserResourceFactory($resource,OtusRestResourceContext,HeaderBuilderFactory){function create(){var restPrefix=OtusRestResourceContext.getRestPrefix(),token=OtusRestResourceContext.getSecurityToken(),headers=HeaderBuilderFactory.create(token);return $resource({},{},{create:{method:"POST",url:restPrefix+SUFFIX+"/signup",headers:headers.json},logged:{method:"GET",url:restPrefix+SUFFIX,headers:headers.json},list:{method:"GET",url:restPrefix+SUFFIX+"/list",headers:headers.json},enable:{method:"POST",url:restPrefix+SUFFIX+"/enable",headers:headers.json},disable:{method:"POST",url:restPrefix+SUFFIX+"/disable",headers:headers.json}})}var SUFFIX="/user",self=this;return self.create=create,self}angular.module("otus.client").factory("otus.client.UserResourceFactory",UserResourceFactory),UserResourceFactory.$inject=["$resource","OtusRestResourceContext","otus.client.HeaderBuilderFactory"]}(),function(){"use strict";function OtusFieldCenterResourceFactory($resource,OtusRestResourceContext,HeaderBuilderFactory){function create(){var restPrefix=OtusRestResourceContext.getRestPrefix(),token=OtusRestResourceContext.getSecurityToken(),headers=HeaderBuilderFactory.create(token);return $resource({},{},{getAll:{method:"GET",url:restPrefix+SUFFIX+"/list",headers:headers.json},create:{method:"POST",url:restPrefix+SUFFIX,headers:headers.json},update:{method:"POST",url:restPrefix+SUFFIX+"/update",headers:headers.json}})}var SUFFIX="/center",self=this;return self.create=create,self}angular.module("otus.client").factory("OtusFieldCenterResourceFactory",OtusFieldCenterResourceFactory),OtusFieldCenterResourceFactory.$inject=["$resource","OtusRestResourceContext","otus.client.HeaderBuilderFactory"]}(),function(){"use strict";function OtusInstallerResourceFactory($resource,OtusRestResourceContext,HeaderBuilderFactory){function create(){var restPrefix=OtusRestResourceContext.getRestPrefix(),token=OtusRestResourceContext.getSecurityToken(),headers=HeaderBuilderFactory.create(token);return $resource({},{},{ready:{method:"GET",url:restPrefix+SUFFIX+"/ready",headers:headers.json},config:{method:"POST",url:restPrefix+SUFFIX,headers:headers.json},validationEmail:{method:"POST",url:restPrefix+SUFFIX+"/validation/email",headers:headers.json}})}var SUFFIX="/installer",self=this;return self.create=create,self}angular.module("otus.client").factory("OtusInstallerResourceFactory",OtusInstallerResourceFactory),OtusInstallerResourceFactory.$inject=["$resource","OtusRestResourceContext","otus.client.HeaderBuilderFactory"]}();