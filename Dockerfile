# Stage 1: Build the Next.js application
FROM node:14 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Set up the Nginx server
FROM nginx:stable-alpine
COPY --from=builder /app/.next /usr/share/nginx/html
COPY --from=builder /app/public /usr/share/nginx/html/_next/static
COPY nginx.conf /etc/nginx/conf.d/default.conf