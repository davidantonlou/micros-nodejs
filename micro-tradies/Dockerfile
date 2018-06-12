FROM node:4

ADD . /app

RUN cd /app; \  
    npm install --production

EXPOSE 8124

CMD ["node", "/app/index.js"]