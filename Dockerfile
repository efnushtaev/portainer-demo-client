# frontend/Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Вторая стадия - только копирование статики
FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /static
COPY --from=builder /app/build ./