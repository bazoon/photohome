#!/bin/bash

#redis
/home/deployer/redis-2.8.14/src/redis-server /home/deployer/redis-2.8.14/redis.conf

#sidekiq
cd /var/www/photohome
bundle exec sidekiq -d

#main
/home/deployer/.rbenv/versions/2.1.0/bin/puma -d -e production


