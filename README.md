## 🔮 sileco.db
- A advanced json based database for storing data! Made with no dependencies!
[![NPM](https://nodei.co/npm/sileco.db.png)](https://nodei.co/npm/sileco.db/)
## 🔮 Amazaing Features
- [Backup system]
- [Handling multiple json files]
- Made with 0 dependencies
- Simple to get started with
## 🔮 Getting Started
- You can isntall the package like that:
```bash
npm i sileco.db
```
- You can define it like this simply:
```javascript
const { Database } = require('sileco.db')
const db = new Database()
```
- Defining for typescript:
```typescript
import { Database } from 'sileco.db';
const db = new Database();
```
## 🔮 Optional Parameters 
- For the Database class, you can pass in a parameter to set a file rather than using the default file! 
- **TIP**: If the file dosen't exist, it will create it
- **TIP**: If you don't pass in the file Path, it will automatically set the path to **./**
- Here is a quick example on optional parameters for the Database class
```javascript
const { Database } = require('sileco.db')
const db = new Database('./database.json') // -> sets database.json as the database file
```
## 🔮 Example // Docs
- Here is a exmaple on how to use this module!
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

db.deleteEach('data'); //-> Deletes the data from the database that has the provided data in the name of it.

//Example For understanding the (deleteEach) function better:

db.set('password-John', '882jwid2o');
db.set('password-Tim', 'i82je992');
db.set('password-James', '829ej29');

db.deleteEach('password'); //-> Deletes all the saved passwords
```
## 🔮 Data Backup
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
## 🔮 Handling Multiple Files
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
