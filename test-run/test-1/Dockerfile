FROM node:20-bullseye
COPY . /app

WORKDIR /app
EXPOSE 3000

RUN npm ci && \
  npm run build
