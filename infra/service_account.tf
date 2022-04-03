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
