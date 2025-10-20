# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

# Вторая стадия - только копирование статики
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /static
COPY --from=builder /app/build ./