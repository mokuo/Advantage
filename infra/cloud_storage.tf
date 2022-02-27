resource "google_storage_bucket" "terraform-state" {
  name          = "mokuo-advantage-tf-state"
  location      = "us-west1"
}
