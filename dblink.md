
Login in with username `SYSTEM`: 
```
-- Must be run by a DBA (e.g., SYS or SYSTEM)
GRANT CREATE DATABASE LINK TO albertoi;
```

Login in with username `albertoi`: 
```
SELECT * FROM todo_list ORDER BY id; 

CREATE DATABASE LINK pxe
CONNECT TO albertoi IDENTIFIED BY my_secure_password
USING '//pxeserver:1521/mypdb';


SELECT * FROM dual@pxe;

SELECT * FROM todo_list@pxe ORDER BY id;
```
