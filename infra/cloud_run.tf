resource "google_cloud_run_service" "advantage" {
  name     = "advantage"
  location = "asia-northeast1"

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
      service_account_name = "advantage-cloud-run@mokuo-advantage.iam.gserviceaccount.com"
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale"      = "1"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}
