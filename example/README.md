# Simple #

## Install Evenoriment ##

Install Express in the app directory and save it in the dependencies list:

```
$ npm install -g express
```

```
$ npm install -g express-generator
```

## Quick Start ##

Create the app:

```
$ express /tmp/foo && cd /tmp/foo
```

Install dependencies:

```
$ npm install
```

Rock and Roll

```
$ npm start
```

## About MySQL ##

### Quick Start ###

Install [XAMPP](https://www.apachefriends.org/)

XAMPP UI, check `Apache` & `MySQL` Open.

```
http://localhost:80/phpmyadmin/ or http://localhost:8080/phpmyadmin/
```

If you find the XAMPP can't open port for these. Find `Actions -> Config -> Apache(httpd.conf)`

```
Listen 80 -> Listen 8080
```


### For this Demo ###

1. create a user for MySQL.
2. new a database which name is `demo_nodejs`.
3. Under `demo_nodejs`, new a scheme which name is `userinfo`.
