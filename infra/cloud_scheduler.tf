resource "google_cloud_scheduler_job" "job" {
  name             = "update-tennis-courts-job"
  description      = "Send post request to update tennis courts."
  schedule         = "*/5 8-22 * * *"
  time_zone        = "Asia/Tokyo"
  attempt_deadline = "320s"

  retry_config {
    retry_count = 1
  }

  http_target {
    http_method = "POST"
    uri         = "${google_cloud_run_service.advantage.status[0].url}/tennis-court-frames"

    oidc_token {
      service_account_email = google_service_account.advantage_cloud_scheduler.email
    }
  }
}
