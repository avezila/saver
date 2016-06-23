#!/bin/bash
set -e
set -v
ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"/../..
cd "$ROOT"

if [[ $# < 1 ]]; then
	echo "usage:  docker.sh image-name"
	exit 1
fi

imagename=${@: -1}
appname=`echo $imagename | tr "/" __` 
appname=`echo $appname | tr ":" _`

rm -rf build/app
mkdir -p build/app
cp build/$appname build/app/app
cp deploy/go/Dockerfile build/app
cd build/app
docker build --no-cache -t $imagename .

cd "$ROOT"
rm -rf build/app