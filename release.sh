#!/bin/bash
#
command -v jq >/dev/null 2>&1 || {
    echo "Error: jq is not installed"
    exit 1
}
git flow release start $1
jq ".version=\"$1\"" package.json > /tmp/package.json
cat /tmp/package.json > package.json
git add package.json && git commit -m "build: bump version"
git flow release finish -m "build: trigger build" -p
