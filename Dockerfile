# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app

COPY client/package.json client/yarn.lock client/
RUN yarn install --frozen-lockfile
COPY client/ .
RUN yarn build

# Вторая стадия - только копирование статики
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /static
COPY --from=builder /app/build ./