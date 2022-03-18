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
npm t
# or
npm t --watch

# lint
npm run lint
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
