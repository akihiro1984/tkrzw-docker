FROM node:latest

RUN set -eux && \
apt-get update && apt-get upgrade -y && \
apt-get install -y build-essential

RUN set -eux && \
apt-get install -y sudo && \
npm i -g npm && \
npm i -g pnpm

RUN set -eux && \
echo "node ALL=NOPASSWD: ALL" > /etc/sudoers.d/node-user-permit

COPY ./docker-entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT [ "/docker-entrypoint.sh" ]