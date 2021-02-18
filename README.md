## 🔮 sileco.db
- A advanced database for storing data! Supports 2 types of databases: Json & Mongo!
[![NPM](https://nodei.co/npm/sileco.db.png)](https://nodei.co/npm/sileco.db/)
## 🔮 Amazaing Features
- Backup system (for json)
- Handling multiple json files
- Two types of databases: Mongo and Json
- Importation of json data to mongo & mongo to json
- Simple to use
- Good docs/examples
## 🔮 Getting Started
- You can isntall the package like that:
```bash
npm i sileco.db
```
- You can define it like this simply:
- JSON Database:
```javascript
//Javascript
const { Database } = require('sileco.db')
const db = new Database()
```
```typescript
//Typescript
import { Database } from 'sileco.db'
const db = new Database()
```
- Mongo Database:
```javascript
//Javascript
const { Mongo } = require('sileco.db')
const db = new Mongo('your Mongo url here')
```
```typescript
//Typescript
import { Mongo } from 'sileco.db'
const db = new Mongo('your Mongo url here')
```
## 🔮 Optional Parameters
- **JSON database**:
- For the Database class, you can pass in a parameter to set a file rather than using the default file! 
- **TIP**: If the file dosen't exist, it will create it
- **TIP**: If you don't pass in the file Path, it will automatically set the path to **./**
- Here is a quick example on optional parameters for the Database class
```javascript
const { Database } = require('sileco.db')
const db = new Database('./database.json') // -> sets database.json as the database file
```
- **MONGO database**:
- For the Mongo class, you can pass in a parameter to specify the connection options.
**TIP**: If you don't specify options, it has some default options for optimization that will always be applied.
Here is an quick example for specifing options for the Mongo class:
```javascript
const { Mongo } = require('sileco.db')
const db = new Mongo('your Mongo uri', {
  connectTimeoutMS: 5000 //-> Connects after 5 seconds of waiting
  ...more connection options
})
```
## 🔮 Example // Docs - Mongo Database
- Here is an example on how to use the mongo database!
```javascript
const { Mongo } = require('sileco.db');
const db = new Mongo('mongo uri here');

db.set('Object', { //-> Object
  key: 'value',
  key2: 'value'
});

db.set('Array', [ //-> Array
  'element', 
  'element2'
  ]);
  
db.push('Array', 'value to push'); //-> Pushing a value to an array

db.pop('Array', 'value to remove from the array'); //-> Removing something from an array (using value)
db.pop('Array', 'index of the value to remove from the array'); //-> Removing something from an array (using index)

db.fetch('data').then(result => { //-> Fetches the value of the data: "data"
  //Do something with the fetched data:
  console.log(result)
})

db.add('data', 1); //-> Adds one to the data: "data"

db.subtract('data', 1); //-> Subtracts one from the data: "data"

db.remove('data'); //-> Removes the data: "data" from the database

db.has('data').then(result => { //-> Returns true or false depending on if the db has the provided data or not.
  //Do something with the returned result:
  console.log(result)
})

db.clear(); //-> Clears everything from the database

db.fetchAllData().then(result => { //-> Fetches everything from db in an array with object elements for each document.
  //Do something with with the fetched data:
  console.log(result)
})

db.deleteKey('object', 'key'); //-> Deletes the provided key from the given object

db.deleteEach('data'); //-> Deletes each data that starts with the given parameter

//Example For understanding the (deleteEach) function better:

db.set('username-John', 'isiiw92sj');
db.set('username-Luke', 'is8w8iwjs');
db.set('username-James', 'ow9w9wosk');

db.deleteEach('username'); //-> Deletes all the saved usernames
```
## 🔮 Example // Docs - Json Database
- Here is a exmaple on how to use the json database!
```javascript
const { Database } = require('sileco.db');
const db = new Database();

db.set('Object', { //-> Object
  key: 'value',
  key2: 'value'
});

db.set('Array', [ //-> Array
  'element', 
  'element2'
  ]);
  
db.push('Array', 'value to push'); //-> Pushing a value to an array

db.pop('Array', 'value to remove from the array'); //-> Removing something from an array (using value)
db.pop('Array', 'index of the value to remove from the array'); //-> Removing something from an array (using index)

db.fetch('data'); //-> Fetches the value of the data: "data"

db.add('data', 1); //-> Adds one to the data: "data"

db.subtract('data', 1); //-> Subtracts one from the data: "data"

db.remove('data'); //-> Removes the data: "data" from the database

db.has('data'); //-> Returns "true" or "false" depending on if the database has the provided data or not.

db.clear(); //-> Clears everything from the database

db.fetchAllData(); //-> Fetches everything in the database

db.deleteKey('object', 'key'); //-> Deletes the provided key from the given object

db.deleteEach('data'); //-> Deletes each data that starts with the given parameter

//Example For understanding the (deleteEach) function better:

db.set('password-John', '882jwid2o');
db.set('password-Tim', 'i82je992');
db.set('password-James', '829ej29');

db.deleteEach('password'); //-> Deletes all the saved passwords
```
## 🔮 Impoting json data to mongo // importing mongo data to json
- If you wanted to convert to mongo and stop using json and don't want to lose all your data, then:
- **TIP**: Only supports json for now....(will soon support sqlite so you can import/export your quick.db data aswell)
```javascript
const { Mongo } = require('sileco.db');
const db = new Mongo('your Mongo uri here');

db.import('kek.json'); //Imports all the json data from "kek.json" to MongoDb.
```
- If you wanted to convert to json and stop using mongo and don't want to lose all your data, then:
```javascript
const { Mongo } = require('sileco.db');
const db = new Mongo('your Mongo uri here');

db.export('kek.json'); //Exports all the mongo data to "kek.json"
```
## 🔮 Data Backup - Json Database
- You can also save your data as a backup, in another file, so if your main database file gets deleted..you cwn backup your data easily!
- Here's an example on how to backup your data:
```javascript
const { Database } = require('sileco.db');
const db = new Database();

db.setBackup('backup.json') //-> Sets "backup.json" as the backup file (As the file path wasn't mentioned, it will be "./backup.json")
```
- And..Here's the example example on how to load your backup:
```javascript
const { Database } = require('sileco.db');
const db = new Database();

db.loadBackup(); //-> Loads the backup from the setted file from the (setBackup) function 
```
## 🔮 Handling Multiple Files - Json Database
- Let's say you want to store the passwords and emails for some users..and you want different files to save them.
- Here's an example on how to do that:
```javascript
const { Database } = require('sileco.db');

const passwords = new Database('passwords.json'); //-> Sets (passwords.json) as the file for saving passwords
const emails = new Database('emails.json'); //-> Sets (emails.json) as the file for saving emails

emails.set('email-Liam', 'example@gmail.com'); //-> Saves the email to the (emails.json) file
passwords.set('password-Liam', '929ek929so29wk'); //-> Saves the password to the (password.json)
```
## 🔮 Community
- [Discord Support Server](https://m.youtube.com/watch?v=dQw4w9WgXcQ)
