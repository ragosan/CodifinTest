create table posts(user_id int, id int PRIMARY KEY, title varchar(255), body varchar(500));
create table comments(post_id int, id int PRIMARY KEY, name varchar(255), email varchar(255), body varchar(500));
create table users(id varchar(40) PRIMARY KEY, user_name varchar(255) UNIQUE, password varchar(255));