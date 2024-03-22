FROM node:18-alpine
WORKDIR /
COPY . .
RUN yarn install
RUN yarn build
EXPOSE 5000
RUN ["chmod", "+x", "./entrypoint.sh"]
ENTRYPOINT [ "sh","./entrypoint.sh" ]