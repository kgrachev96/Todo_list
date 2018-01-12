FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

COPY ./web/build /var/www
COPY ./node_modules /var/www/node_modules

WORKDIR /etc/nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]