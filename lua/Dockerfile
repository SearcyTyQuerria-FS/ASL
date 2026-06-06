FROM alpine:latest
RUN apk add --no-cache lua
WORKDIR /usr/src/myapp
COPY . .
CMD ["lua5.4", "main.lua"]
