pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        git branch: 'develop', url: 'https://github.com/huzaifa-006/HateShield-AI.git'
      }
    }

    stage('Build Images') {
      steps {
        sh 'docker build -t hateshield-backend ./backend'
        sh 'docker build -t hateshield-frontend ./frontend'
        sh 'docker build -t hateshield-ml ./ml-service'
      }
    }

    stage('Test Backend') {
      steps {
        sh 'cd backend && python manage.py test'
      }
    }
  }
}
