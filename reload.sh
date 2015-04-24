#!/bin/bash
git fetch --all
git reset --hard origin/master
echo "Precompiling..."
RAILS_ENV=production rake assets:precompile
chmod +x reload.sh
chmod +x photohome_start.sh
chmod +x auto_restart.sh