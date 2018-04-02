const faker = require('faker');
const fs = require('fs');
const mongoose = require('mongoose');
const db = require('./db/user.js');
const { exec } = require('child_process');

let makeUserData = () => {
  const t = process.hrtime()

const writeStream = fs.createWriteStream('userSanke.json');

  function Make100Users() {
    let i = 100;

    writeData();
    function writeData() {
      let storage = true;
      while(i > 0 && storage) {
        i--;

        const makeData = {
          userId: i,
          password: faker.name.firstName()+'_'+i,
          name: faker.name.firstName()
        }
        if(i % 10 === 0){
          console.log(i, process.hrtime(t))
        }
        storage = writeStream.write(`${JSON.stringify(makeData)}\n`);
      }
       if(i === 0) {
          const script = 'mongoimport --db loginapp --collection users --file userAndPasswordData.json --numInsertionWorkers 17'
          exec(script);
      }
    }
  }
    Make100Users();
}
makeUserData();