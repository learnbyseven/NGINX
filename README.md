# NGINX
 

![Image of Nginx](https://github.com/learnbyseven/NGINX/blob/master/Untitled%20Diagram.png)

## PROCESS ARCH - MASTER/WORKER processes (ASYNC Architecture in non blocking mode)

## GRACEFULLY LOAD WORKER PROCESS 

## File Structure 

## CONTEXT 
   - http 
   - server
   - location
## DIRECTIVE & VARIABLES
   - http://nginx.org/en/docs/dirindex.html
   - https://nginx.org/en/docs/varindex.html



## Reverse proxy 
### Protocol support
- HTTP1/2 , Server push (style sheet, CSS , IMAGES reduce RTT-round trip time eventually boost performance) 
- TCP/UDP (TCP-> SMTP , LDAP || UDP-> DNS , SYSLOG , RADIUS) 
- gRPC
- FASTCGI
- MEMCACHED
- SCGI/UWCGI

## Load balancing 
### Upstream servers Block 
- Weight=5
- backup
- down
- slow_start=30s
- max_conns
- queue 100 timeout=70

### Algorithms 
- Round robin (default) 
- least_conn
- ip_hash
- Generic hash $request_uri consistent
- least_time 
  - header
  - last_byte
  - last_byte inflight
- random two least_time=last_byte

## Session persistence 
- Sticky cookie
- Sticky route
- Sticky learn (most sophisticated server side cookie, not at client side) 

# SECURITY 
## TLS termination 

