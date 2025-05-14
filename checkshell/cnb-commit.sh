#!/bin/bash

git fetch
git checkout origin/page
git config --local user.name "$CNB_COMMITTER"
git config --local user.email "$CNB_COMMITTER_EMAIL"
git add -A --force ./logs/
git commit -m '🆙 [Automated] Update service status logs'
git push -f git push origin HEAD:page
git remote set-url origin "https://x-access-token:$GITHUB_REPO_TOKEN@github.com/dongfg/status.git"
git push -f git push origin HEAD:page