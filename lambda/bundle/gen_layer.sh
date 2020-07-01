#!/bin/bash

NAME=dependencies

while read -r line
do
    name="$(echo $line | cut -d'=' -f 1) "
    if [ $name != "pycurl" ]; then
      PACKAGES+=$name
    fi
done <<< $(cat requirements.txt)

echo "📦 Packages are listed in requirements.txt: ${PACKAGES}"
echo "📦 Pycurl install with following command : export PYCURL_SSL_LIBRARY=openssl && pip install pycurl --no-cache-dir -t /opt/python "

docker run --rm -v "$PWD"/"$NAME":/opt lambci/lambda:build-python3.8 \
  bash -c "yum install -y libX11-devel libpng-devel libXcursor-devel openssl-devel libcurl-devel && pip install ${PACKAGES} -t /opt/python && export PYCURL_SSL_LIBRARY=openssl && pip install pycurl --no-cache-dir -t /opt/python"

docker run --rm -v "$PWD"/"$NAME":/lambda/opt lambci/yumda:2 yum install -y libX11 libpng libXcursor libcurl gnutls


sudo cp $NAME/python/Pillow.libs/libpng16-bedcb7ea.so.16.37.0 $NAME/lib/libpng16.so.16

cd $NAME
zip -yr ../$NAME.zip .
cd ..