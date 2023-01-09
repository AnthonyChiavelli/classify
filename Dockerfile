FROM node:16-alpine
WORKDIR /app
COPY . .
WORKDIR /app/frontend
RUN yarn build &
EXPOSE 2000
WORKDIR /app/server
CMD yarn run serve