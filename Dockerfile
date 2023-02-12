FROM node:16.13.1-alpine

COPY . /home/node/app

RUN tar -xvf /home/node/app/node_modules.tar && \
  rm /home/node/app/node_modules.tar && \
  apk add --no-cache curl

WORKDIR /home/node/app

USER node
EXPOSE 3000

CMD ["npm", "start"]
