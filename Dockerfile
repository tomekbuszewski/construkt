FROM node:14.15.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN CYPRESS_INSTALL_BINARY=0 npm i

COPY . ./

RUN npm run backend:build

EXPOSE 8080

CMD ["node", "dist/packages/backend/main.js"]
