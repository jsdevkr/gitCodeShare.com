#!/usr/bin/env bash
# Don't deploy if commit contains WIP
# TODO revisit this when deploy is stable
exit 0
set -e
if [[ "$TRAVIS_PULL_REQUEST" != "false" ]]; then
  if [[ $(git log -1 --pretty=%B --no-merges) != *"WIP"* ]]; then
    NOW_URL=$(now -e NODE_ENV=production --public --no-clipboard --token="$NOW_TOKEN") || exit 0
  fi
fi
