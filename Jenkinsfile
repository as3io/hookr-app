node {
  docker.withRegistry('https://registry.hub.docker.com', 'docker-registry-login') {
    stage('Checkout') {
      checkout scm
    }
    def myDocker = docker.image("limit0/node-build:latest")
    myDocker.pull()
    myDocker.inside("-v ${env.WORKSPACE}:/var/www/html -u 0:0") {
      stage('Install') {
        sh 'yarn install'
      }
      stage('Build') {
        withCredentials([
          string(credentialsId: 'hookr-app.env.REACT_APP_BACKEND_URI', variable: 'REACT_APP_BACKEND_URI'),
          string(credentialsId: 'hookr-app.env.REACT_APP_GITHUB_CLIENT_ID', variable: 'REACT_APP_GITHUB_CLIENT_ID')
        ]) {
          sh 'echo $REACT_APP_BACKEND_URI $REACT_APP_GITHUB_CLIENT_ID'
          sh 'REACT_APP_BACKEND_URI=$REACT_APP_BACKEND_URI REACT_APP_GITHUB_CLIENT_ID=$REACT_APP_GITHUB_CLIENT_ID yarn build'
        }
      }
    }
  }

  stage("Copy Artifacts") {
    if (!env.BRANCH_NAME.contains('PR-')) {
      step([$class: 'ArtifactArchiver', artifacts: 'Dockerfile'])
      step([$class: 'ArtifactArchiver', artifacts: 'nginx.conf'])
      step([$class: 'ArtifactArchiver', artifacts: 'build/**'])
    }
  }
}
