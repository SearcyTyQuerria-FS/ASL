FROM golang:latest
WORKDIR /usr/src/myapp
COPY . .
RUN  go build -o hello hello.go
CMD [ "./hello" ]