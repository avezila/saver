#!/bin/bash
set -e
set -v
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/..
cd "$ROOT"

mkdir -p data/{saver,saver-mongo}
docker-compose -p saver -f deploy/docker-compose.yml "$@"
