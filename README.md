# Microservices with Node.js and MySql

Microservice arquitecture using Node.js as backend and mysql as database.

There are 3 independent services:
 * micro-jobs (port 8125)
 * micro-tradies (port 8124)
 * mysql-database (port 3306)

The API expose the following endpoints:
● POST - Creates a job
`$> curl -X POST http://localhost:8125/jobs -d 'postcode=08004&category=category2&description=description&customer=customer2&email=customer2@example.com&mobile=646555555'`

● POST - Assign a tradie to a job
`$> curl -X POST http://localhost.100:8125/jobs/assignment -d 'id_job=1&id_tradie=2'`

● POST - Mark a tradie as hired
`$> curl -X POST http://localhost:8125/jobs/hired -d 'id_job=1&id_tradie=1'`

● GET - Get jobs
`$> curl -X GET http://localhost:8125/jobs`

● GET - Get job by id
`$> curl -X GET http://localhost:8125/job -H 'id: 1' `

● GET - Get job assignments
`$> curl -X GET http://localhost:8125/jobs/assignments -H 'id_job: 1' `


# Build and Run
  
Executing `docker-compose up` will create all the infraestructure. The database with some initial data inserted.