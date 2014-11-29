#!/bin/bash

#redis
/home/deployer/redis-2.8.14/src/redis-server /home/deployer/redis-2.8.14/redis.conf

#sidekiq
cd /var/www/photohome
/home/deployer/.rbenv/shims/bundle install
#/home/deployer/.rbenv/shims/bundle exec sidekiq -c 3 -d -L /var/www/photohome/log/sidekiq.log -e production
/home/deployer/.rbenv/shims/bundle exec sidekiq -c 3 -d -L /var/www/domfoto72/data/www/domfoto72.ru/log/sidekiq.log -C /var/www/domfoto72/data/www/domfoto72.ru/config/sidekiq.yml -e production

#main
/home/deployer/.rbenv/shims/puma -d -e production


