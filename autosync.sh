#!/bin/bash
cd /home/sendan/Documents/investo-main

while true
do
  # Check for local changes
  if [[ `git status --porcelain` ]]; then
    git add .
    git commit -m "auto-sync $(date)"
    git push origin main
  fi

  # Always pull latest updates from GitHub
  git pull origin main --rebase

  sleep 30  # wait 30 seconds before checking again
done
