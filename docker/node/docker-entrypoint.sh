#!/bin/sh

NODE_MODULES_DIRECTORY=$(pwd)/node_modules

if [ -z "$(ls -A $NODE_MODULES_DIRECTORY)" ]; then
    pnpm install
fi

exec $@