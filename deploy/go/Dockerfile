FROM        scratch

ADD         ./app /app
WORKDIR     /data

ENV         GRPC_PORT 5353
EXPOSE      5353

ENTRYPOINT  ["/app"]
