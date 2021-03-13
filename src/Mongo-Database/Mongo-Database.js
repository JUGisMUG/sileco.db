const mongoose = require('mongoose');
const fs = require('fs');
const Document = require('./Schema.js');

class Mongo {
    constructor(url, options) {
        this.url = url;

        if (!url) {
            throw Error('sileco.db: MongoDB key is not provided for the (MongoDatabase) class');
        }

        if (!url.match(/^mongodb([a-z+]{0,15})?.+/g)) {
            throw Error('sileco.db: provided MongoDB key is invalid for the (MongoDatabase) class');
        }

        if (options && typeof options !== 'object') {
            throw Error(`sileco.db: options for connecting must be an object for the (MongoDatabase) class`);
        }

        mongoose.connect(url, {
            ...options,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });

        mongoose.connection.on('error', err => {
            throw Error(err);
        });

        mongoose.connection.on('connected', () => {
            console.log('Connection status: Connected');
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Connection status: Disconnected');
        });
    }

    state() {
        switch (mongoose.connection.readyState) {
            case 0:
                return 'State: Disconnected';
                break;
            case 1:
                return 'State: Connected';
                break;
            case 2:
                return 'State: Connecting';
                break;
            case 3:
                return 'State: Disconnected';
                break;
            default:
                return;
        }
    }

    disconnect() {
        mongoose.connection.close();
        this.url = 'Not connected';
        return;
    }

    async set(key, value) {
        if (!key) throw Error('sileco.db: A key for the (set) function is needed');
        if (!value) throw Error('sileco.db: A value for the key in the (set) function is not provided');

        let data = await Document.findOne({
            key: key
        });

        if (!data) {
            let model = new Document({
                key: key,
                data: value
            });
            model.save();
        } else if (data) {
            let filter = {
                key: key
            };
            let update = {
                data: value
            };

            await Document.findOneAndUpdate(filter, update);
            return;
        }
    }

    async fetch(key) {
        if (!key) throw Error('sileco.db: The key for the (fetch) function is needed');

        let data = await Document.findOne({
            key: key
        });
        
        return data ? data['data'] : null;
    }

    async remove(key) {
        if (!key) throw Error('sileco.db: The key for the (remove) function in needed');

        let data = await Document.findOne({
            key: key
        });

        if (!data) return;
        if (data) {
            await Document.findOneAndDelete({
                key: key
            });
        }

        return;
    }

    async add(key, value) {
        if (!key) throw Error('sileco.db: The key for the (add) function is reauired');
        if (!value) throw Error('sileco.db: The value to add for the (add) function is needed');

        let data = await Document.findOne({
            key: key
        });

        if (!data) {
            this.set(key, value);
        } else if (data && typeof data['data'] !== 'number') {
            this.set(key, value);
        } else if (data) {
            let filter = {
                key: key
            };
            let update = {
                data: data['data'] + value
            };
            await Document.findOneAndUpdate(filter, update);
        }

        return;
    }

    async subtract(key, value) {
        if (!key) throw Error('sileco.db: The key for the (subtract) function is reauired');
        if (!value) throw Error('sileco.db: The value to add for the (subtract) function is needed');

        let data = await Document.findOne({
            key: key
        });

        if (!data) {
            this.set(key, value);
        } else if (data && typeof data['data'] !== 'number') {
            this.set(key, value);
        } else if (data) {
            let filter = {
                key: key
            };
            let update = {
                data: data['data'] - value
            };
            await Document.findOneAndUpdate(filter, update);
        }

        return;
    }

    async has(key) {
        if (!key) throw Error('sileco.db: The key for the (has) function is required');

        let data = await Document.findOne({
            key: key
        });

        return data ? true : false;
    }

    async clear() {
        await Document.deleteMany({});
        return;
    }

    async fetchAllData() {
        let data = await Document.find();

        return data;
    }

    async deleteEach(key) {
        if (!key) throw Error('sileco.db: The key for the (deleteEach) function is needed');

        let data = await Document.find({});
        data = data.filter(doc => doc.key.includes(key));

        for (let i = 0; i < data.length; i++) {
            this.remove(data[i].key);
        }

        return;
    }

    async push(array, value) {
        if (!array) throw Error('sileco.db: A array for the (push) function was not provided');
        if (!value) throw Error('sileco.db: A value to push to the array for the (push) function is required');

        let data = await Document.findOne({
            key: array
        });

        if (!data) {
            this.set(array, [value]);
        } else if (data && Array.isArray(data['data'])) {
            let filter = {
                key: array
            };
            let update = {
                $push: {
                    data: value
                }
            };
            await Document.findOneAndUpdate(filter, update);
        }

        return;
    }

    async pop(array, index) {
        if (!array) throw Error('sileco.db: No array was provided for the (pop) function (pop) function');
        if (index === undefined) throw Error('sileco.db: Please mention the index/name of the element you want to pop from the array for the (pop) function');

        let data = await Document.findOne({
            key: array
        });

        if (!data || !Array.isArray(data['data'])) throw Error("sileco.db: The array you mentioned dosen't exist or it is not a array");

        if (typeof index === 'number') {
            data['data'].splice(index, 1);
            let filter = {
                key: array
            };
            let update = {
                data: data['data']
            };
            await Document.findOneAndUpdate(filter, update);
        } else if (isNaN(index)) {
            if (data['data'].includes(index)) {
                data['data'].splice(data['data'].indexOf(index), 1);
                let filter = {
                    key: array
                };
                let update = {
                    data: data['data']
                };
                await Document.findOneAndUpdate(filter, update);
            } else {
                throw Error('sileco.db: Unable to find a element with the provided index/name for the (pop) function');
            }
        }

        return;
    }

    async deleteKey(object, key) {
        if (!object) throw Error('sileco.db: Please provide the object that you want to delete a key from  for the (deleteKey) function');
        if (!key) throw Error('sileco.db: Please provide the key to delete of the object for the (deleteKey) function');

        let data = await Document.findOne({
            key: object
        });

        if (!data)
            throw Error('sileco.db: The object provided for the (deleteKey) function is not valid');

        if (typeof data !== 'object') throw Error('sileco.db: The object provided for the (deleteKey) function is not an object');

        if (!data['data'][key]) return;

        delete data['data'][key];

        let filter = {
            key: object
        };
        let update = {
            data: data['data']
        };
        await Document.findOneAndUpdate(filter, update);
    }

    async import(file) {
        if (!file) throw Error('sileco.db: Please provide the file where you want to import your data from');

        let fileExtension = file.toLowerCase().split('.').pop();

        if (fileExtension !== 'json') throw Error('sileco.db: Invalid file type - Only JSON is supported for now');

        try {
            fs.readFileSync(file)
        } catch {
            throw Error("sileco.db: FILE DOSEN'T EXIST -> Invalid file provided for the (import) function");
        }

        const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

        Object.entries(data).forEach(entry => {
            const [key, value] = entry;
            this.set(key, value);
        });

        return;
    }
    
    async export(file) {
      if (!file) throw Error('sileco.db: Please provide the file where you want to export your data to');
      
      let fileExtension = file.toLowerCase().split('.').pop();
      
      if (fileExtension !== 'json') throw Error('sileco.db: Invalid file type - Only JSON is supported for now');
      
      let data = await Document.find({});
      
      try {
        fs.readFileSync(file);
      } catch {
        fs.writeFileSync(file, JSON.stringify({}, null, 2));
      }
      
      let fileData = JSON.parse(fs.readFileSync(file, 'utf-8'));
      
      for (let i = 0; i < data.length; i++) {
        fileData[data[i].key] = data[i].data
        fs.writeFileSync(file, JSON.stringify(fileData, null, 2));
      }
      
      return;
    }
}

module.exports = { Mongo };
