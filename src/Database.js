const fs = require('fs');
let backup;
const loadFile = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));
const extension = (filePath) => {
  let parts = filePath.split('.') 
  return parts[parts.length - 1];
}
const addToBackup = (data) => {
  if(backup !== undefined) {
    fs.writeFileSync(backup, JSON.stringify(data, null, 2));
  }
}

class Database {
  constructor(file) {
    this.file = file || 'sileco-db.json'
    
    if(this.file === 'sileco-db.json') {
      try {
        loadFile(this.file);
      } catch {
        writeData(this.file, {});
      }
    } else {
      if (!this.file.includes('./')) this.file = './' + this.file
      
      if(extension(this.file) !== 'json') throw Error('sileco.db: The file you are trying to set in the (database) class is not a json file, and sileco.db can only store data in json files')
      
      try {
        loadFile(this.file)
      } catch {
        writeData(this.file, {})
      }
      
    }
  }
  
  setBackup(filePath) {
    if (!filePath) throw Error("sileco.db: Please mention the file path for your backup file for the (setBackup) function");
  
    if (extension(filePath) !== "json") throw Error('sileco.db: The file you are trying to set in the (setBackup) function is not a json file, and sileco.db can only store data in json files');
  
    if (!filePath.includes('./')) filePath = './' + filePath
  
    backup = filePath;
  
    try {
      loadFile(backup)
    } catch {
      writeData(backup, {})
    }
    return;
  }
  
  loadBackup() {
    if (backup === undefined) throw Error('There is no backup setted to load for the (loadBackup) function! To set a backup, please use the (setBackup) function');
  
    writeData(this.file, loadFile(backup));
    return;
  }
  
  set(data, value) {
    if (!data) throw Error('Sileco.db: Please mention the data for the (set) function');
	  if (!value) throw Error('Sileco.db: Please mention the value for the (set) function');
	  
	  let fileData = loadFile(this.file)
	  
	  fileData[data] = value;
	  writeData(this.file, fileData);
    addToBackup(fileData);
    return;
  }
  
  fetch(data) {
    if (!data) throw Error("sileco.db: Please mention the data you want to fetch for the (fetch) function")
    
    let fileData = loadFile(this.file)
    
    if(!fileData[data]) fileData[data] = null
  
    return fileData[data]
  }
  
  remove(data) {
    if(!data) throw Error("sileco.db: Please mention the data you wnst to delete for the (remove) function")
    
    let fileData = loadFile(this.file)

    if(!fileData[data]) throw Error("sileco.db: The data you mentioned for the (remove) function dosen't exists")
  
    fileData[data] = undefined;
    writeData(this.file, fileData);
    addToBackup(fileData);
    return;
  }
  
  add(data, value) {
    if (!data) throw Error('sileco.db: Please mention the data for the (add) function');
	  if (!value) throw Error('sileco.db: Please mention the value to add for the (add) function');
	  if(typeof value !== "number") throw Error(`sileco.db: The value to add for the (add) function must be a number, received type: ${typeof value}`);
	  
	  let fileData = loadFile(this.file)

	  if (fileData[data] === undefined) return this.set(data, value);
	  if(isNaN(fileData[data])) return this.set(data, value);

	  fileData[data] = fileData[data] + value;
	  writeData(this.file, fileData);
    addToBackup(fileData);
    return;
  }
  
  subtract(data, value) {
    if (!data) throw Error('sileco.db: Please mention the data for the (substract) function');
    if (!value) throw Error('sileco.db: Please mention thevalue to substract for the (substract) function');
    if (typeof value !== "number") throw Error(`sileco.db: The value to add for the (substract) function must be a number, received type: ${typeof value}`);
    
    let fileData = loadFile(this.file)
  
    if (file[data] === undefined) return this.set(data, value);
    if(isNaN(file[data])) return this.set(data, value);
  
    fileData[data] = fileData[data] - value;
    writeData(this.file, fileData);
    addToBackup(fileData);
    return;
  }
  
  has(data) {
    if (!data) throw Error('sileco.db: Please mention the data you wnat to check for the (has) function');
  
    let fileData = loadFile(this.file)
  
    if (!fileData[data]) return false;
    if (fileData[data]) return true;
  }
  
  clear() {
    writeData(this.file, {});
    return;
  }
  
  fetchAllData() {
    return loadFile(this.file);
  }
  
  deleteEach(data) {
    if (!data) throw Error('sileco.db: Plesse mention the data for the (deleteEach) function')
    
    let fileData = loadFile(this.file)
  
    let item = Object.keys(fileData)
    if (item === '') throw Error('sileco.db: There is nothing identical to delete for the (deleteEach) function')
  
    item = item.filter((Data) => Data.includes(data));
  
    item.forEach((Data) => {
      this.remove(Data)
    });
    return;
  }
  
  push(array, value) {
    if (!array) throw Error('sileco.db: Please mention the array in the db you need to push something to for the (push) function')
    if (!value) throw Error('sileco.db: Please mention the value you want to push to the array for the (push) function')
    
    let fileData = loadFile(this.file)
  
    if (fileData[array] && Array.isArray(fileData[array])) {
      fileData[array].push(value)
      writeData(this.file, fileData)
    } else if (!fileData[array]) {
      this.set(array, [value])
    }
    return
  }
  
  pop(array, index) {
    if (!array) throw Error('sileco.db: Please mention the array you want to pop something from for the (pop) function')
    if (index === undefined) throw Error('sileco.db: Please mention the index/name of the element you want to pop from the array for the (pop) function')
    
    let fileData = loadFile(this.file)
    
    if (!fileData[array] || !Array.isArray(fileData[array])) throw Error("sileco.db: The array you mentioned dosen't exist or it is not a array")
    
    if (typeof index === "number") {
      fileData[array].splice(index, 1)
      writeData(this.file, fileData)
      } else if(isNaN(index)) {
        if(fileData[array].includes(index)) {
          fileData[array].splice(fileData[array].indexOf(index), 1)
          writeData(this.file, fileData)
       } else {
          throw Error('sileco.db: Unable to find a element with the provided index/name for the (pop) function')
        }
      }
      return;
  }
  
  deleteKey(object, key) {
    if (!object) throw Error('sileco.db: Please provide the object that you want to delete a key from for the (deleteKey) function');
    if (!key) throw Error('sileco.db: Please provide the key of the object for the (deleteKey) function');
    
    let fileData = loadFile(this.file);
    
    if (!fileData[object]) throw Error("sileco.db: The object you provided dosen't exist in the database for the (deleteKey) function");
    
    if (typeof fileData[object] !== 'object') throw Error('sileco.db: The provided object for the (deleteKey) function is not an object in the database');
    
   if (!fileData[object][key]) return; 
    
    delete fileData[object][key];
    writeData(this.file, fileData);
    
    return;
  }
}

module.exports = { Database };
 