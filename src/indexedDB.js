//prefixes of implementation that we want to test
if (!window.indexedDB){
  window.indexedDB = window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
}

//prefixes of window.IDB objects
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange

if (!window.indexedDB) {
  console.log("Your browser doesn't support a stable version of IndexedDB.")
}
const DB_VERSION = 1;
const DB_NAME = 'SignOn';


export default {
  DB : null,
  async getDb() {
    return new Promise((resolve, reject) => {

      if(this.DB) { return resolve(this.DB); }
      console.log('OPENING DB', this.DB);
      let request = window.indexedDB.open(DB_NAME, DB_VERSION);
      
      request.onerror = e => {
        console.log('Error opening db', e);
        reject('Error');
      };
  
      request.onsuccess = e => {
        this.DB = e.target.result;
        resolve(this.DB);
      };
      
      request.onupgradeneeded = e => {
        console.log('onupgradeneeded');
        let db = e.target.result;
        db.createObjectStore('infos', { autoIncrement: true, keyPath:'id' });
        db.createObjectStore('events', { autoIncrement: true, keyPath:'id' });
        db.createObjectStore('competitors', { autoIncrement: true, keyPath:'id' });
      };
    });
  },
  async deleteInfo(info) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['infos'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('infos');
      store.delete(info.id);
    });  
  },
  async getInfos() {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['infos'],'readonly');
      let infos = [];
      trans.oncomplete = () => {
        resolve(infos);
      };
      
      let store = trans.objectStore('infos');
      
      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          infos.push(cursor.value)
          cursor.continue();
        }
      };

    });
  },

  async saveInfo(info) {
    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['infos'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('infos');
      store.put(info);
    });
  },

  async updateInfo(info) {
    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['infos'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('infos');
      store.put(info);
      
    });
  },
  
  async deleteEvent(event) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['events'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('events');
      store.delete(event.id);
    });  
  },
  async getEvents() {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['events'],'readonly');
      let events = [];
      trans.oncomplete = () => {
        resolve(events);
      };
      
      let store = trans.objectStore('events');
      
      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          events.push(cursor.value)
          cursor.continue();
        }
      };

    });
  },

  async saveEvent(event) {
    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['events'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('events');
      store.put(event);
    });
  },

  async updateEvent(event) {
    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['events'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('events');
      store.put(event);
      
    });
  },

  
  async deleteCompetitor(competitor) {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['competitors'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('competitors');
      store.delete(competitor.id);
    });  
  },
  async getCompetitors() {

    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['competitors'],'readonly');
      let competitors = [];
      trans.oncomplete = () => {
        resolve(competitors);
      };
      
      let store = trans.objectStore('competitors');
      
      store.openCursor().onsuccess = e => {
        let cursor = e.target.result;
        if (cursor) {
          competitors.push(cursor.value)
          cursor.continue();
        }
      };

    });
  },

  async saveCompetitor(competitor) {
    let db = await this.getDb();
    console.log(competitor);
    return new Promise(resolve => {

      let trans = db.transaction(['competitors'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('competitors');
      console.log(competitor);
      store.put(competitor);
    });
  },

  async updateCompetitor(competitor) {
    let db = await this.getDb();

    return new Promise(resolve => {

      let trans = db.transaction(['competitors'],'readwrite');
      trans.oncomplete = () => {
        resolve();
      };

      let store = trans.objectStore('competitors');
      store.put(competitor);
      
    });
  },
}