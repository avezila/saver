FROM       scratch

ADD        build/saver-go saver-go
ENV        PORT 5353
EXPOSE     5353
ENTRYPOINT ["/saver-go"]
