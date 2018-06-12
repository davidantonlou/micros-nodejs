FROM mysql:5

ENV MYSQL_ROOT_PASSWORD password
ENV MYSQL_DATABASE micro_database
ENV MYSQL_USER admin
ENV MYSQL_PASSWORD password

ADD setup.sql /docker-entrypoint-initdb.d