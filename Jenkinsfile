// pipeline {
//   agent any

//   stages {
//     stage('Checkout') {
//       steps {
//         git branch: 'develop', url: 'https://github.com/huzaifa-006/HateShield-AI.git'
//       }
//     }

//     stage('Build Images') {
//       steps {
//         sh 'docker build -t hateshield-backend ./backend'
//         sh 'docker build -t hateshield-frontend ./frontend'
//         sh 'docker build -t hateshield-ml ./ml-service'
//       }
//     }

//     stage('Test Backend') {
//       steps {
//         sh 'cd backend && python manage.py test'
//       }
//     }
//   }
// }
pipeline {
  agent any
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install Dependencies') {
      steps {
        sh 'python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt'
        sh 'npm ci --prefix frontend'  // if using separate frontend folder
      }
    }
    stage('Test') {
      steps {
        // Run backend unit tests
        sh 'source venv/bin/activate && pytest tests/'
        // (Optional) run any frontend tests or linting
        sh 'npm test --prefix frontend'
      }
    }
    stage('Build') {
      steps {
        // Build React frontend
        sh 'npm run build --prefix frontend'
      }
    }
    stage('Docker Build & Push') {
      steps {
        // Build and push Docker images for backend and frontend
        sh 'docker build -t myregistry/hateshield-frontend:latest frontend'
        sh 'docker push myregistry/hateshield-frontend:latest'
        sh 'docker build -t myregistry/hateshield-backend:latest backend'
        sh 'docker push myregistry/hateshield-backend:latest'
        sh 'docker build -t myregistry/hateshield-ml:latest ml_service'
        sh 'docker push myregistry/hateshield-ml:latest'
      }
    }
    stage('Deploy to K8s') {
      steps {
        // Deploy with kubectl (assuming kubeconfig is set up)
        sh 'kubectl apply -f k8s/manifests/'
      }
    }
  }
  post {
    always { cleanWs() }
  }
}
