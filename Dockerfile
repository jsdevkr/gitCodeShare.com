FROM node:8-slim

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app

RUN npm i --production

COPY ./ /app

EXPOSE 3000 3030
EXPOSE 9229 9230

CMD ["npm", "start"]
