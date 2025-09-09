# Define variables with default values
variable "DOCKER_IMAGE_TAG" {
  default = "nestjs-oxlint"
}

# The target stage to build the Docker image, one of:
# "development", "build-dist", "export-dist", "production"
variable "DOCKER_TARGET" {
  default = "development"
}

# The Docker network to use for the build, one of:
# "default", "host", "none"
variable "DOCKER_NETWORK" {
  default = "default"
}

variable "DOCKERFILE" {
  default = "./Dockerfile"
}

# The version of the application.
variable "VERSION" {
  default = "0.0.0"
}

# The version of the application.
variable "OUTPUT_DIST" {
  default = "./dist"
}

# Common group of settings to be used across targets
group "default" {
  targets = ["development"]
}

# Base application target
target "application" {
  context = "."
  dockerfile = "${DOCKERFILE}"
  tags = ["${DOCKER_IMAGE_TAG}:${VERSION}"]
  target = "${DOCKER_TARGET}"
  network = "${DOCKER_NETWORK}"
  # secret = ["id=ENV_FILE,src=./.env"]
  args = {
    NODE_ENV = "development"
    VERSION = "${VERSION}"
  }
}

# Development target with additional settings
target "development" {
  inherits = ["application"]
  target = "development"
  tags = ["${DOCKER_IMAGE_TAG}:dev"]
  args = {
    ARCH = "amd64"
  }
  platforms = [
    "linux/amd64", // for Intel/AMD
  ]
}

# alias for development target
target "dev" {
  inherits = ["development"]
}

target "arm" {
  inherits = ["development"]
  args = {
    ARCH = "arm64"
  }
  platforms = [
    "linux/arm64", // for Apple Silaicon
  ]
}
