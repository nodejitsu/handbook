#!/bin/bash

if [ "nodejitsu" != $(jitsu whoami) ]; then
  jitsu login --username nodejitsu
fi
jitsu deploy
