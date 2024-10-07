FROM node:20.18.0-alpine3.20 as build-stage

WORKDIR /app

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_API_PAYMENT_BASE_URL
ENV VITE_API_PAYMENT_BASE_URL=$VITE_API_PAYMENT_BASE_URL

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25.1-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

