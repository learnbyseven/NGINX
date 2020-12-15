# NGINX
 

![Image of Nginx](https://github.com/learnbyseven/NGINX/blob/master/Untitled%20Diagram.png)

## Load balancing 
### Upstream servers 
- Weight=5
- backup
- down
- slow_start=30s

### Algorithms 
- Round robin (default) 
- least_conn
- ip_hash
- hash $request_uri consistent
- least_time 
  - header
  - last_byte
  - last_byte inflight
- random two least_time=last_byte

## Session persistence 
- Sticky cookie
- Sticky route
- Sticky learn
