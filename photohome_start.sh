#!/bin/bash

#redis
/home/deployer/redis-2.8.14/src/redis-server /home/deployer/redis-2.8.14/redis.conf

#sidekiq
cd /var/www/photohome
/home/deployer/.rbenv/shims/bundle install
/home/deployer/.rbenv/shims/bundle exec sidekiq -d -L /var/www/photohome/log/sidekiq.log -e production


#main
/home/deployer/.rbenv/shims/puma -d -e production


