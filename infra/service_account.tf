# https://kaito-two.hatenablog.com/entry/2020/08/30/120000

resource "google_service_account" "advantage_cloud_run" {
  project = "mokuo-advantage"
  account_id   = "advantage-cloud-run"
  display_name = "Advantage Cloud Run Service Account"
}

resource "google_project_iam_member" "advantage_cloud_run_firestore" {
  project = "mokuo-advantage"
  role = "roles/datastore.user"
  member = "serviceAccount:${google_service_account.advantage_cloud_run.email}"
}

# ref: https://cloud.google.com/run/docs/triggering/using-scheduler?hl=ja
resource "google_service_account" "advantage_cloud_scheduler" {
  project = "mokuo-advantage"
  account_id   = "advantage-cloud-scheduler"
  display_name = "Advantage Cloud Scheduler Service Account"
}
resource "google_project_iam_member" "advantage_cloud_scheduler_cloud_run" {
  project = "mokuo-advantage"
  role = "roles/run.invoker" # https://cloud.google.com/iam/docs/understanding-roles?hl=ja#cloud-run-roles
  member = "serviceAccount:${google_service_account.advantage_cloud_scheduler.email}"
}

