FROM node:18-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx sequelize-cli db:migrate

RUN npm prune --production

EXPOSE 3000
CMD ["npm", "start"]