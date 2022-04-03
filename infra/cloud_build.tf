resource "google_cloudbuild_trigger" "advantage_cloud_run" {
  description = "Build and deploy to Cloud Run service advantage on push to \"^main$\""

  github {
    name  = "Advantage"
    owner = "mokuo"

    push {
      branch       = "^main$"
      invert_regex = false
    }
  }
  
  filename = "cloudbuild.yaml"
}
