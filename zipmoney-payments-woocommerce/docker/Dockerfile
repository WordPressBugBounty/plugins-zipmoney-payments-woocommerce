ARG WORDPRESS_TAG
FROM wordpress:${WORDPRESS_TAG}
COPY zip-php.ini $PHP_INI_DIR/conf.d/

RUN pecl install xdebug-3.2.0
