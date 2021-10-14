# Address Book 
This is a web application to manage contacts. Users are allowed to add/edit/delete contacts. Users are also can upload avatar for contacts.

### About me

Hi, I am Jessie. I have been working for software development for many years. I have been in different role in software development such as QA engineer, R&D engineer and sustain engineer.

## Implementation

The implementation including two parts: REST API as backend and React as frontend. It used MongoDb to store contacts as document. 

## Installation

## How to run 

### Start web application

Configure a Spring Boot in IDE, then start the AddressbookApplication under port8080. 
if you want to assign different port, you will need change the proxy setting in src/ui/package.json

### Start UI

you can trigger npm in IDE or start npm server manually under src/ui folder, by default npm server runs on port 3000

```bash
    npm start
```

### Batabase
You will need to create a datatbase name called 'contactsdb' under MongoDB. It required a collection named 'contact'. Otherwise you can use run following command to create a docker container.

```
docker-compose -f docker-compose.yml up
```

## Contribution
Jessie






