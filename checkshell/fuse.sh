#!/bin/bash
curl -O https://raw.githubusercontent.com/dongfg/status/page/checkshell/actions-local.sh > /dev/null 2>&1
chmod +x ./actions-local.sh
sudo bash ./actions-local.sh
rm -f ./actions-local.sh