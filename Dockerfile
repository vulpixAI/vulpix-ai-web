FROM node:18-alpine as build

WORKDIR /app

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . .

RUN echo "VITE_API_URL=$VITE_API_URL" > .env

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]