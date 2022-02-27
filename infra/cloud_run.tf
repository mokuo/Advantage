resource "google_cloud_run_service" "mokuo-advantage" {
  name     = "mokuo-advantage"
  location = "asia-northeast1"

  template {
    spec {
      containers {
        image = "us-docker.pkg.dev/cloudrun/container/hello"
      }
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
