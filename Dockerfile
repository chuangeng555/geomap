FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN npm install && npm cache clean

EXPOSE 3000

COPY . /app

CMD ["npm", "run", "build"]