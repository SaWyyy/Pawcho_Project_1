# Extension

The task extension involved building the image on two architectures, utilizing cache during the image build, and cloning the repository from GitHub instead of using local files. However, cloning the repository results in an increase in the size of the image itself, as it requires installing Git and SSH client.

## Creating a custom builder:
```sh
docker buildx create --name project1Builder --driver docker-container --bootstrap --use     
```
## Building an image on two architectures:
```sh
docker buildx build -t sawyyy/project1:1.0.0 --build-arg VERSION=1.0.0 --no-cache --sbom=true --provenance=mode=max --platform linux/amd64,linux/arm64 --push .
```
## Building an image on two architectures with cache utilization during the build:
```sh
docker buildx build -t sawyyy/project1:cached --build-arg VERSION=1.0.0 --no-cache --sbom=true --provenance=mode=max --platform linux/amd64,linux/arm64 --push --cache-to=type=registry,ref=docker.io/sawyyy/project1:cached --cache-from=type=registry,ref=docker.io/sawyyy/project1:cached .
```
## Building an image using repository cloning from GitHub:
```sh
docker buildx build -f Dockerfile_ssh --ssh default=$SSH_AUTH_SOCK -t sawyyy/project1:ssh --build-arg VERSION=1.0.0 --no-cache --sbom=true --provenance=mode=max --platform linux/amd64,linux/arm64 --push .
```
## Running container from DockerHub
For example:
```sh
docker run -d -p 8000:8000 --name Project1 sawyyy/project1:ssh
```
You can select different tag like "1.0.0" or "cached"
