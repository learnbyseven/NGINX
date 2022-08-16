# NGINX 101
 

![Image of Nginx](https://github.com/learnbyseven/NGINX/blob/master/Untitled%20Diagram.png)

### PROCESS ARCH - MASTER/WORKER processes (ASYNC Architecture in non blocking mode)

      $ ps axo pid,ppid,user,cmd | egrep nginx | egrep process
        3630     1 root     nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
        3631  3630 nginx    nginx: worker process
        3632  3630 nginx    nginx: worker process

### File Structure 
      $ tree /etc/nginx/ 
      ├── conf.d
      │   └── default.conf
      ├── fastcgi_params
      ├── mime.types
      ├── modules -> /usr/lib/nginx/modules
      ├── nginx.conf
      ├── scgi_params
      └── uwsgi_params
      
      
### BASIC COMMANDS (htTVs)
      $nginx -h --> Shows all command line options
      $nginx -t --> Configuration syntax check
      $nginx -T --> Displays full, concatenated configuration
      $nginx -V --> Shows version and build details
      $nginx –s --> reload Gracefully reload NGINX processes
      

### CONTEXT 
``` diff
+ http {
     server  {
          location {
	           }
	       }
+}```

   
### Dashboard & API
    # DASHBOARD & API ENABLEMENT (NginxPlus) 
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

### LOAD-BALANCING 
#### Algorithms 

```Round robin - Default```
```ip_hash```
        
```
 - least_conn (NginxPlus) 
 - Generic hash 
 - least_time (header,last_byte,last_byte inflight)
 - random two least_time=last_byte (NginxPlus) 
 ```
    upstream backend {
               zone backend 64k;
               #ip_hash;
               server 192.168.0.51:8081 weight=5 max_fails=10 fail_timeout=90s max_conns=1;
               server 192.168.0.51:8082 weight=5 max_fails=10 fail_timeout=90s;  
               #server 192.168.0.51:8083 backup;  
               }

     server {
	listen 80; 
        server_name www.app.example.com;
        status_zone backend; 
        location / {
                   proxy_pass http://backend;
                   #health_check;
                   #health_check interval=10 fails=3 passes=2;
                   health_check port=8081 uri=/healthz;
                }	
        }	
       

##### Upstream 
        - Weight
        - backup
        - down
        - slow_start
        - max_conns
        - queue
        - timeout

##### Protocol support
     - HTTP1/2 , Server push (style sheet, CSS , IMAGES reduce RTT-round trip time eventually boost performance) 
     - TCP/UDP (TCP-> SMTP , LDAP || UDP-> DNS , SYSLOG , RADIUS) 
     - gRPC
     - FASTCGI
     - MEMCACHED
     - SCGI/UWCGI
     
     



### Active (NginxPlus)  Vs Passive Health-Checks 
       server {
	              listen 80; 
               server_name www.app.example.com;
               status_zone backend; 
               location / {
                   proxy_pass http://backend;
                   #health_check;
                   #health_check interval=10 fails=3 passes=2;
                   health_check port=8081 uri=/healthz;
              }	
            }	

### Session persistence (NginxPlus) 
        Sticky cookie
        Sticky route
        Sticky learn (most sophisticated server side cookie, not at client side)

### RATE Limiting 
    http {
         limit_req_zone $binary_remote_addr zone=mylimit:10m rate=2r/s;

       server {
             listen 8084;
              location /api {
                limit_req zone=mylimit burst=5 nodelay;
                proxy_pass http://web.example.com:8080/api;
                limit_req_status 503;
             }
        }
     }

	

### AB testing (traffic spilitting)
       # CLIENT SIDE TRAFFIC SPILITING HTTP CONTEXT DIRECTIVES
       split_clients $remote_addr $upstream {
           50% alpha;
            *   beta;
        } 
       upstream alpha {
          server 192.168.0.51:8081;
       }
       upstream beta {
          server 192.168.0.51:8082; 
       }
        server {
          listen 80;
          location / {
             proxy_pass http://$upstream;
          }
        }


### SSL termination (HTTPS)
    server {
	listen 443 ssl;
        # Set accepted protocol and cipher
	ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
	ssl_certificate /mycerts/web.example.com.crt;
	ssl_certificate_key /mycerts/web.example.com.key;
	location / {
                proxy_pass http://192.168.0.51:8084;
		
	 }
     }


### Enabling mTLS 
    server {
	listen 443 ssl;
	ssl_certificate /mycerts/web.example.com.crt;
	ssl_certificate_key /mycerts/web.example.com.key;
        ssl_verify_client on; # For mTLS
        ssl_client_certificate /mycerts/ca.crt; # for mTLS
	location / {
               return 200 '{"SERVER_RESPONSE": "mTLS established"}';
	       add_header Content-Type text/plain always;
	}	
     }
     $curl --cert client.crt --key client.key --cacert ca.crt https://web.example.com
      
### KeyVALUE Store for Denylist (NginxPlus) 
          LIST   --> curl http://192.168.0.99:8080/api/8/http/keyvals/denylist
          CREATE --> curl -iX POST -d '{"192.168.0.51":1}' http://192.168.0.99:8080/api/8/http/keyvals/denylist
          DELETE --> curl -iX DELETE -d '{"192.168.0.51":1}' http://192.168.0.99:8080/api/8/http/keyvals/denylist



### DIRECTIVE & VARIABLES
   - http://nginx.org/en/docs/dirindex.html
   - https://nginx.org/en/docs/varindex.html
   - http://nginx.org/en/docs/http/ngx_http_keyval_module.html
   - http://nginx.org/en/docs/http/ngx_http_split_clients_module.html
   - http://nginx.org/en/docs/http/load_balancing.html
   - https://www.nginx.com/blog/rate-limiting-nginx/
