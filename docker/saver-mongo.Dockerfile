FROM       mongo:latest

COPY ./mongo /setup

ENTRYPOINT ["/setup/entrypoint.sh"]

EXPOSE 27017
CMD ["mongod"]
