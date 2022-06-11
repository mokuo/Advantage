
variable "CHANNEL_ACCESS_TOKEN" {
  description = "LINE Channel access token"
  type = string
  default = "TO_BE_DEFINED_IN_TFVARS"
}

variable "CHANNEL_SECRET" {
  description = "LINE Channel secret"
  type = string
  default = "TO_BE_DEFINED_IN_TFVARS"
}

variable "MESSAGE_TO" {
  description = "LINE userId or groupId or roomId"
  type = string
  default = "TO_BE_DEFINED_IN_TFVARS"
}

variable "HOLIDAYS" {
  description = "Holidays to be notified"
  type = string
  default = "TO_BE_DEFINED_IN_TFVARS"
}
