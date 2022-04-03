# https://cloud.google.com/firestore/docs/solutions/automate-database-create#create_a_database_with_terraform
resource "google_app_engine_application" "app" {
  project     = "mokuo-advantage"
  location_id = "asia-northeast1"
  database_type = "CLOUD_FIRESTORE"
}
