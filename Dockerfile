FROM node:alpine AS stage
WORKDIR /usr/src
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR /usr/app
COPY package.json ./
RUN npm install
COPY --from=stage /usr/src/dist ./dist
expose 3000
CMD npm start