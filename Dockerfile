# HACK: マルチステージビルド
# ref: https://nodejs.org/ja/docs/guides/nodejs-docker-webapp/
FROM mcr.microsoft.com/playwright:focal

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
# 本番用にコードを作成している場合
# RUN npm install --only=production

COPY . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
