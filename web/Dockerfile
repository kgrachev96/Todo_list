FROM node:carbone

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app

WORKDIR /opt/app/

COPY *.json ./
COPY webpack.*.js ./
COPY src ./src
COPY build ./build
RUN npm run build

EXPOSE 80