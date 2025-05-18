# Dockerfile
FROM node:18-alpine

RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY package*.json ./
RUN npm install && npm run migrate && npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]