# Stage 1: Build the Angular app
FROM node:22 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npx ng build --configuration=production

# Stage 2: Serve the app with Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/dist/decision-tracker/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]