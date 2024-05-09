# Etap budowy
FROM scratch AS builder
ADD alpine-minirootfs-3.19.1-x86_64.tar /

ARG VERSION

# Ustawienie katalogu roboczego
WORKDIR /usr/app

# Aktualizacja pakietów oraz zainstalowanie npm
RUN apk --no-cache update && apk add --no-cache nodejs npm

# Kopiowanie tylko package.json na razie, aby wykorzystać cache'owanie
COPY ./src/package.json ./

# Instalacja zależności
RUN npm install

# Kopiowanie reszty aplikacji
COPY ./src/server.js ./

# Etap produkcyjny
FROM alpine:latest

# Ustawnienie zmiennej VERSION
ARG VERSION
ENV APP_VERSION=$VERSION

# Aktualizacja pakietów oraz zainstalowanie node js
RUN apk --no-cache update && apk add --no-cache nodejs

# Kopiowanie zależności z etapu budowania
COPY --from=builder /usr/app /usr/app

# Ustawienie katalogu roboczego
WORKDIR /usr/app

# Wyeksponowanie portu 8000
EXPOSE 8000

# Uruchomienie Nginx oraz serwera aplikacji
CMD node server.js

HEALTHCHECK --interval=5s --timeout=3s CMD wget -O/dev/null http://localhost:8000 || exit 1
