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
