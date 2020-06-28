#!/bin/bash

NAME=dependencies

docker run --rm -v "$PWD"/$NAME:/opt lambci/lambda:build-python3.8 \
    bash -c "yum install -y libX11-devel libpng-devel libXcursor-devel && 
            pip install clickgen -t /opt/python"

docker run --rm -v "$PWD"/$NAME:/lambda/opt lambci/yumda:2 \        
  yum install -y libX11 libpng libXcursor

cd $NAME 
zip -yr ../$NAME.zip .
cd ..