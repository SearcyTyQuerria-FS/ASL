FROM rust:latest
WORKDIR /usr/src/myapp
COPY . .
RUN rustc index.rs
CMD ["./index"]