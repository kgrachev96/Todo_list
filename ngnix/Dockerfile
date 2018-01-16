FROM todolist_web:latest as web
FROM nginx

COPY --from=web /opt/app/build /var/www/

RUN echo $(ls -1 /var/www/)

COPY nginx.conf /etc/nginx/nginx.conf

RUN echo $(ls -1 /etc/nginx/nginx.conf)

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]