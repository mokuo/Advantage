# Advantage

- [Advantage](#advantage)
  - [PlantUML](#plantuml)
    - [Requirement](#requirement)
    - [Installation](#installation)
  - [Scripts](#scripts)
  - [Terraform](#terraform)

## PlantUML

### Requirement

- Java
- Graphviz
- [PlantUML \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml)

### Installation

```zsh
# check
brew list graphviz

# install
brew install graphviz
# or upgrade
brew upgrade graphviz
```

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

```bash
cd infra

terraform init
terraform plan
terraform apply
```
