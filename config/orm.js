const connection = require("./connection.js")

function objToSql(ob) {
    var arr = [];
  

    for (var key in ob) {
      var value = ob[key];

      if (Object.hasOwnProperty.call(ob, key)) {

        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
 
        arr.push(key + "=" + value);
      }
    }
  
    return arr.toString();
  }

const orm = {

    selectAll: function (tableInput, cb) {
        let queryString = "SELECT * FROM " + tableInput + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },

    insertOne: function (table, cols, vals, cb) {
        var queryString = `INSERT INTO ` + table + ` (` + cols.toString() + `) VALUES ( ? )`;

        console.log(queryString);

        connection.query(queryString, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });

    },

    updateOne: function(table, objColVals, condition, cb) {
    var queryString = `UPDATE ` + table + ` SET ` + objToSql(objColVals) + ` WHERE ` + condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });},
}

module.exports = orm;