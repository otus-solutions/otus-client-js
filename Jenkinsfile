pipeline {
  agent any
  tools {
  	maven 'maven 3.5.0'
  	jdk 'Java8'
  	nodejs 'node 8.4.0'
  }

  stages{
    stage('Build') {
      steps{
        sh 'df -h ~/.npm'
        sh "rm -rf node_modules/"
        sh "npm install"
        sh "npm test"

      }
    }

    stage('Unit Test') {
      steps{
        sh 'df -h ~/.npm'
        sh "npm test"

      }
    }

    stage('Storing Artifacts') {
      steps {
        sh "npm publish --registry ${repository_npm}"
      }
    }

    stage('Code Analysis') {
      steps {
        sh "npm run gulp sonar --sonarUrl='${URL_SONAR}' --sonarDatabaseUsername='${USER_SONAR}' --sonarDatabasePassword='${PWD_SONAR}'"
      }
    }
  }
}
