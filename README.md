# Advantage

- [Advantage](#advantage)
  - [Scripts](#scripts)
  - [Terraform](#terraform)
  - [Deploy](#deploy)

## Scripts

```zsh
# ts-node
npx ts-node

# test
npm run db
npm test (--watch)

# lint
npm run lint

# Download chromium
npx playwright install chromium

# build
npm run build

# start
npm run start
```

## Terraform

gcloud CLI での認証が必要

[アプリケーションのデフォルト認証情報の仕組み  \|  Google Cloud](https://cloud.google.com/docs/authentication/application-default-credentials#personal)

セットアップ

```
asdf install terraform latest
asdf local terraform latest

asdf install gcloud latest
asdf local gcloud latest
gcloud auth application-default login
```

Terraform

```zsh
cd infra

terraform init
terraform plan
terraform apply
```

## Deploy

```zsh
gcloud builds submit --substitutions COMMIT_SHA=`git rev-parse HEAD`
```
