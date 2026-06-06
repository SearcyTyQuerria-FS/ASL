FROM gcc:latest
WORKDIR /usr/src/myapp
COPY . .
RUN g++ -o main main.cpp
CMD ["./main"]