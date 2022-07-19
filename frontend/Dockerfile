FROM node:alpine

WORKDIR /app

EXPOSE 8081

COPY package*.json ./

RUN npm install -g expo expo-cli

RUN npm install -f

COPY . .

CMD ["npm", "run", "start"]