### Http Cache
---
* Client connect Server.
    * Server tells Client [**Expires** or **Pragma** or **Cache-control**] and [**Last-Modified** or **Etag**] about this resource.   
* when Client visit resource again.
    * Client check 
        * resource has **Cache-control**?
            * yes 
                * **Status Code:200 OK**
            * not 
        * resource has **Expires** or **Pragma**?
            * yes
                * **Status Code:200 OK**
            * not
        * resource has **Etag**?
            * yes, visit Server with header named **if-None-Match**.
            * not
        * resource has **Last-modified**?
            * yes, visit Server with header named **If-Modified-Since**.

    * Server get Client-request.
        * if header has if-None-Match or If-Modified-Since:
            * yes
                * **Status Code:304 OK**
    * all not
        * return new resource.
        * Client cache resource.

    Note:  
    Pragma means client not use client-cache.  
    Cache-Control is more high-level than Expires and Pragma.  
    Etag is a hash-string made of resource's information, like size, name, last-modified.
    vary is version of the cache.