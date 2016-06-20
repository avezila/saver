FROM pioh/go

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

COPY ./go /go/src/app
WORKDIR /go/src/app

RUN go-wrapper download
RUN go-wrapper install

COPY ./grpc /grpc
WORKDIR /grpc
RUN protoc --go_out=/go/src/app/saver/ saver.proto 

WORKDIR /go/src/app
CMD ["go-wrapper", "run"]

EXPOSE 5353

