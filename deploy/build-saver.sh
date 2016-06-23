#!/bin/bash
set -e
set -v
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/..
cd "$ROOT"

./deploy/go/build.sh saver avezila/saver
./deploy/go/docker.sh avezila/saver
./deploy/mongo/docker.sh saver-mongo avezila/saver-mongo