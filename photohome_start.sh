#!/bin/bash

/home/deployer/.rbenv/versions/2.1.0/bin/puma -d -e production
/var/www/photohome/bin/delayed_job restart