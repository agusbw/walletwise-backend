# Dockerfile for local development because why not

FROM node:18

WORKDIR /usr/app

COPY . .

RUN npm install -g pnpm

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "run", "dev"]

