# NGINX
 

![Image of Nginx](https://github.com/learnbyseven/NGINX/blob/master/Untitled%20Diagram.png)

## PROCESS ARCH - MASTER/WORKER processes (ASYNC Architecture in non blocking mode)

      - ps axo pid,ppid,user,cmd | egrep nginx | egrep process
        3630     1 root     nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
        3631  3630 nginx    nginx: worker process
        3632  3630 nginx    nginx: worker process

## File Structure 
      - tree /etc/nginx/ 
      ├── conf.d
      │   └── default.conf
      ├── fastcgi_params
      ├── mime.types
      ├── modules -> /usr/lib/nginx/modules
      ├── nginx.conf
      ├── scgi_params
      └── uwsgi_params

## CONTEXT 
     - http 
     - server
     - location
## BASIC COMMANDS (htTVs)
      nginx -h Shows all command line options
      nginx -t Configuration syntax check
      nginx -T Displays full, concatenated configuration
      nginx -V Shows version and build details
      nginx –s reload Gracefully reload NGINX processes

   

## LOAD-BALANCING (http://nginx.org/en/docs/http/load_balancing.html)
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

#### Upstream 
- servers Block 
  - Weight=5 
  - backup
  - down
  - slow_start=30s
  - max_conns
  - queue 100 timeout=70

#### Protocol support
     - HTTP1/2 , Server push (style sheet, CSS , IMAGES reduce RTT-round trip time eventually boost performance) 
     - TCP/UDP (TCP-> SMTP , LDAP || UDP-> DNS , SYSLOG , RADIUS) 
     - gRPC
     - FASTCGI
     - MEMCACHED
     - SCGI/UWCGI

### Dashboard & API
    # DASHBOARD & API ENABLEMENT
       server { 
               listen 192.168.0.99:8080;
               location /api {
               api write=on;
               allow 192.168.0.99;
               deny  all;
              } 
        location /dashboard.html {
           root /usr/share/nginx/html;
           }
         }

### Active Healthcheck 

### Session persistence 
    - Sticky cookie
    - Sticky route
    - Sticky learn (most sophisticated server side cookie, not at client side) 



### Traffic Management 
    - AB testing (traffic spilitting)
    - KEY VAL Usecase - Denylist
          LIST   --> curl http://192.168.0.99:8080/api/8/http/keyvals/denylist
          CREATE --> curl -iX POST -d '{"192.168.0.51":1}' http://192.168.0.99:8080/api/8/http/keyvals/denylist
          DELETE --> curl -iX DELETE -d '{"192.168.0.51":1}' http://192.168.0.99:8080/api/8/http/keyvals/denylist

## SECURITY 

### TLS termination 

##

## MISC
### DIRECTIVE & VARIABLES
   - http://nginx.org/en/docs/dirindex.html
   - https://nginx.org/en/docs/varindex.html
