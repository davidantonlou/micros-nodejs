create table tradies (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name TEXT, email TEXT, mobile TEXT);
insert into tradies (name, email, mobile) values ('Peter', 'peter@example.com', '+34 646 111 111');
insert into tradies (name, email, mobile) values ('Maria', 'maria@example.com', '+34 646 222 222');
insert into tradies (name, email, mobile) values ('Mikel', 'mikel@example.com', '+34 646 333 333');

create table jobs (id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, postcode TEXT, category TEXT, description TEXT, customer TEXT, email TEXT, mobile TEXT, status TEXT);
insert into jobs (postcode, category, description, customer, email, mobile, status) values ('08002', 'category1', 'description job1', 'customer1', 'job1@example.com', '+34 646 444 444', 'new');

create table assignments (id_job INT NOT NULL, id_tradie INT NOT NULL, status TEXT);
insert into assignments (id_job, id_tradie, status) values ('1', '1', 'new');