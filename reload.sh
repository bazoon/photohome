#!/bin/bash
git fetch --all
git reset --hard origin/master
RAILS_ENV=production rake assets:precompile
chmod +x