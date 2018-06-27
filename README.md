# MyNote
## CAS-FEE Project 1

A notebook-app which saves the notes on NeDB-database and apply CRUD operations on them.

### Used Tecnhnologies
Client-Side:
Html, Css (no framework such as Bootstrap, Material etc.)  
JavaScript, Jquery, Handelbars.js, moment.js

Rest-API (Backend):
Express.js, NeDB

### Features
Create & Edit Note  
Sord by due date, created date and finished date  
Show / Hide finished notes  
Toggle button for style switch (dark <-> light)

## Setup
MyNote works with two seperate part: RestAPI and Client-Side

```bash
# install concurrently to global (to run multiple commands concurrently.)
npm install --save-dev concurrency

# install client-side node packages
npm install

# install server-side node packages 
cd rest-api
\rest-api> npm install
```

## Start

```bash
# in the root folder run:
npm start

# It will start both;
     Client-Side (frontend) port: http://localhost:3000  
     REST-API port: http://localhost:8000
```  
  
  tested with:   
  Chrome Version 67.0.3396.99  
  Mac OS, Version 67.0.3396.99 (64-Bit)
  
Mustafa Ertekin - 2018