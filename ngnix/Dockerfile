FROM mytasklist_web:latest as web
FROM nginx

COPY --from=web /opt/app/build /var/www/static/

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;"]