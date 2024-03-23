// Omer Sharoni, 206914384
// Michal Hagoel, 318662830

import errors from './errors/index.js';

/**
 * Function to open or create a database
 * @param {String} dbName database name 
 * @param {Number} dbVersion database version
 * @returns {Promise<Object>} returns the db object to handle further requests
 */
const openCostsDB = (dbName = 'costs', dbVersion = 1) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      const errorMessage = "Error opening database: " + event.target.errorCode;
      reject(new errors.FailedToOpenDB(errorMessage));
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Create an object store
      if (!db.objectStoreNames.contains(dbName)) {
        db.createObjectStore(dbName, { keyPath: "id", autoIncrement: true });
      }

      console.log("Database upgrade complete.");
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log("Database opened successfully.");

      /**
       * Function to add a cost to the database
       * @param {Object} options
       * @param {String} options.name
       * @param {Number} options.sum
       * @param {String} options.category
       * @param {String} options.description
       * @returns {Promise}
       */
      const addCost = ({ name, sum, category, description }) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction([dbName], "readwrite");
          const objectStore = transaction.objectStore(dbName);
          const date = new Date();
          const itemToAdd = { name, sum, category, description, date };
          const request = objectStore.add(itemToAdd);

          request.onsuccess = () => {
            resolve(true);
          };

          request.onerror = (event) => {
            const errorMessage = "Error adding cost: " + event.target.errorCode;
            const options = {name, sum, category, description};
            reject(new errors.FailedToCreateItemInDB(errorMessage, options));
          };
        });
      };

      /**
       * Function that returns all items that were created in a specific year & month
       * @param {Object} options
       * @param {Number} options.year
       * @param {Number} options.month
       * @returns {Promise<Array>} All of the items for the given year & month 
       */
      const getReport = ({ year, month }) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction([dbName], "readonly");
          const objectStore = transaction.objectStore(dbName);

          const items = [];
          const request = objectStore.openCursor();

          request.onsuccess = (event) => {
            const cursor = event.target.result;

            if (cursor) {
              const itemDate = new Date(cursor.value.date);
              if (itemDate.getFullYear() === year && itemDate.getMonth() === month - 1) {
                items.push(cursor.value);
              }
              cursor.continue();
            } else {
              resolve(items);
            }
          };

          request.onerror = (event) => {
            const errorMessage = "Error finding items: " + event.target.errorCode;
            reject(new errors.FailedToGetReportDB(errorMessage, year, month));
          };
        });
      };

      // Function that deletes an item by id from the db
      const deleteItem = (id) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction([dbName], "readwrite");
          const objectStore = transaction.objectStore(dbName);
          const request = objectStore.delete(id);

          request.onsuccess = () => {
            resolve(true);
          };

          request.onerror = (event) => {
            const errorMessage = "Error deleting: " + event.target.errorCode;
            reject(new errors.FailedToDeleteItemInDB(errorMessage, id));
          };
        });
      };

      const editItem = (id, { newText, newSum }) => {
        return new Promise((resolve, reject) => {
          const transaction = db.transaction([dbName], "readwrite");
          const objectStore = transaction.objectStore(dbName);

          const getRequest = objectStore.get(id);

          getRequest.onsuccess = () => {
            const itemToUpdate = getRequest.result;

            if (newText) {
              Object.assign(itemToUpdate, {name: newText});
            }
  
            if (newSum) {
              Object.assign(itemToUpdate, {sum: newSum});
            }
  
            const request = objectStore.put(itemToUpdate);
  
            request.onsuccess = () => {
              resolve(true);
            };
  
            request.onerror = (event) => {
              const errorMessage = "Error deleting: " + event.target.errorCode;
              reject(new errors.FailedToEditItemInDB(errorMessage, {newText, newSum}));
            };
          };

          getRequest.onerror = () => {
            reject("Error deleting: " + event.target.errorCode);
          };
        });
      };

      // Return an object with the db functions
      const dbFunctions = { addCost, getReport, deleteItem, editItem };
      resolve(dbFunctions);
    };
  });
};

var idb = { openCostsDB };

export default idb;