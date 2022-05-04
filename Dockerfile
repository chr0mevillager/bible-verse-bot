FROM node:16-stretch-slim
WORKDIR /app
ENV NODE_ENV production
ENV PORT 8080
COPY . /app
RUN cd /app && yarn install --production
CMD [ "node", "/app" ]