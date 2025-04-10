FROM node:lts-alpine3.20

WORKDIR /app

COPY . .

ADD ./.env.example ./.env

ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN npm install

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]