#!/bin/bash

set -e


if [ "${1:0:1}" = '-' ]; then
	set -- mongod "$@"
fi

# allow the container to be started with `--user`
if [ "$1" = 'mongod' -a "$(id -u)" = '0' ]; then
	chown -R mongodb /data/configdb /data/db
	exec gosu mongodb "$BASH_SOURCE" "$@"
fi

if [ "$1" = 'mongod' ]; then
	numa='numactl --interleave=all'
	if $numa true &> /dev/null; then
		set -- $numa "$@"
	fi
fi

mongod --quiet --fork --syslog

for i in $( ls -1 | grep mongo ); do
  if [ -f /data/db/lock.$i ]; then continue; fi
  echo run $i
  if [[ $i == *"mongo.sh" ]]; then ./$i; fi
  touch /data/db/lock.$i
done

mongod --quiet --shutdown

exec "$@"