FROM node:16.13.1-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN apk add --no-cache --virtual .gyp python3 make g++ && npm install --production && apk del .gyp
COPY . .
EXPOSE 3000
CMD ["npm", "run", "production"]
