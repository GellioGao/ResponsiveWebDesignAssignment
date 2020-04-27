FROM httpd:2.4-alpine
COPY ./CSSs/ /usr/local/apache2/htdocs/CSSs/
COPY ./Data/ /usr/local/apache2/htdocs/Data/
COPY ./HTMLs/ /usr/local/apache2/htdocs/HTMLs/
COPY ./Images/ /usr/local/apache2/htdocs/Images/
COPY ./JavaScripts/ /usr/local/apache2/htdocs/JavaScripts/
COPY index.html /usr/local/apache2/htdocs/

EXPOSE 80