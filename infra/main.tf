terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "4.10.0" # https://registry.terraform.io/providers/hashicorp/google/latest
    }
  }

  backend "gcs" {
    bucket  = "mokuo-advantage-tf-state"
  }
}

provider "google" {
  project = "mokuo-advantage"
  region  = "asia-northeast1"
  # zone    = "asia-northeast1-c"
}
