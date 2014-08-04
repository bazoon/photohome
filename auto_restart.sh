#!/bin/bash
if  ps aux | grep "[p]uma" > /dev/null
then
    echo "Running"
else
    echo "Stopped"
    cd /var/www/photohome
    /var/www/photohome/photohome_start.sh
fi