resource "google_cloud_run_service" "advantage" {
  name     = "advantage"
  location = "asia-northeast1"
  # ref: https://zenn.dev/sasamuku/scraps/e722cb05e99c60
  # `google_cloud_run_service.advantage: Still modifying..` で terraform apply が終わらない問題の対策
  autogenerate_revision_name = true

  template {
    spec {
      containers {
        image = "gcr.io/mokuo-advantage/advantage"
        env {
          name = "CHANNEL_ACCESS_TOKEN"
          value = var.CHANNEL_ACCESS_TOKEN
        }
         env {
          name = "CHANNEL_SECRET"
          value = var.CHANNEL_SECRET
        }
        env {
          name = "MESSAGE_TO"
          value = var.MESSAGE_TO
        }
      }
      service_account_name = google_service_account.advantage_cloud_run.email
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

# NOTE: Cloud Build でのデプロイ時に上書きされる項目を ignore する
# ref: https://qiita.com/moyashidaisuke/items/ab592bd94f376530f967
  lifecycle {
    ignore_changes = [
      template[0].spec[0].containers[0].image,
      template[0].metadata[0].annotations["client.knative.dev/user-image"],
      template[0].metadata[0].annotations["run.googleapis.com/client-name"],
      template[0].metadata[0].annotations["run.googleapis.com/client-version"]
    ]
  }
}
