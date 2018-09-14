#!/usr/bin/env bash
sudo docker stop stars_power_shop_mobile_clinet
sudo docker rm stars_power_shop_mobile_clinet
sudo docker run --privileged=true  -t -i -d -v /data:/data -p 80:80  --name=stars_power_shop_mobile_clinet  557111830783.dkr.ecr.cn-north-1.amazonaws.com.cn/os_nginx /bin/bash -c "/data/www/stars/stars_power_shop_mobile_clinet/static/bin/run-pro.sh"
