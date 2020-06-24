FROM lambci/lambda:build-python3.8

# Install Runtime Libraries
ADD ./pkgs /pkgs/
WORKDIR /pkgs/

RUN rpm -y -i *.rpm


