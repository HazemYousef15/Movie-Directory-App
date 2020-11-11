import * as SQLite from 'expo-sqlite'


const db = SQLite.openDatabase('search_history.db')

export const init = () => {
    // const promisetemp = new Promise((resolve, reject) => {
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'DROP TABLE search_history ;',
    //             [],
    //             () => {
    //                 resolve();
    //             },
    //             (_, err) => {
    //                 reject(err);
    //             }
    //         );
    //     });
    // });
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS search_history (searchText TEXT PRIMARY KEY NOT NULL);',
                [],
                () => {
                    resolve();
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const insertSearchText = (searchText) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `INSERT OR REPLACE INTO search_history (searchText) VALUES (?);`,
                [searchText],
                (_, result) => {
                    resolve(result);
                    console.log("Added sucessfully")
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const deleteSearchText = (searchText) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                `DELETE FROM search_history WHERE searchText = ?;`,
                [searchText],
                (_, result) => {
                    resolve(result);
                    console.log("Deleted sucessfully")
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};

export const fetchSearchTexts = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM search_history',
                [],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });
    return promise;
};