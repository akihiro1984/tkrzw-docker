FROM alpine:edge

ARG TKRZW_PACKAGE_NAME=tkrzw-1.0.27
ARG TKRZW_RPC_PACKAGE_NAME=tkrzw-rpc-0.9.10

# COPY ./${TKRZW_PACKAGE_NAME}.tar.gz /tmp
# COPY ./${TKRZW_RPC_PACKAGE_NAME}.tar.gz /tmp

RUN set -eux && \
apk add --update --no-cache grpc protobuf wget curl unzip

RUN set -eux && \
curl -L https://dbmx.net/tkrzw/pkg/${TKRZW_PACKAGE_NAME}.tar.gz -o /tmp/${TKRZW_PACKAGE_NAME}.tar.gz && \
curl -L https://dbmx.net/tkrzw-rpc/pkg/${TKRZW_RPC_PACKAGE_NAME}.tar.gz -o /tmp/${TKRZW_RPC_PACKAGE_NAME}.tar.gz

RUN set -eux && \
apk add --update --no-cache --virtual=.build-dependencies \
build-base linux-headers bsd-compat-headers autoconf automake libtool \
grpc-dev protobuf-dev

RUN set -eux && \
cd /tmp && tar xvf ${TKRZW_PACKAGE_NAME}.tar.gz && \
cd ${TKRZW_PACKAGE_NAME} && \
./configure --enable-opt-native --enable-most-features && \
make && make check-light && make install

RUN set -eux && \
cd /tmp && tar xvf ${TKRZW_RPC_PACKAGE_NAME}.tar.gz && \
cd ${TKRZW_RPC_PACKAGE_NAME} && \
./configure --enable-opt-native && \
# patch
sed -ie 's/^CMDLIBS :=.*$/CMDLIBS := -ltkrzw_rpc -labsl_cord -labsl_cordz_info -labsl_cordz_functions/' Makefile && \
make && make install

RUN set -eux && \
apk del .build-dependencies && \
rm -rf /tmp/*

## workaround ...
RUN set -eux && \
apk add --update --no-cache grpc-dev protobuf-dev

CMD [ "tkrzw_server" ]