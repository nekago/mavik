FROM node:lts-alpine as build-stage

ARG MODE=""
ENV MODE=${MODE}

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli


COPY .. .
RUN ng build --configuration=${MODE}

FROM nginx:stable-alpine as production-stage
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/mavik-fe /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
