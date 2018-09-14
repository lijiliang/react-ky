#!/usr/bin/env bash
#覆盖Nginx
cp -rf /data/www/stars/stars_power_shop_mobile_clinet/static/bin/nginx.conf /usr/local/nginx/conf/
/usr/local/nginx/sbin/nginx &
/bin/bash
