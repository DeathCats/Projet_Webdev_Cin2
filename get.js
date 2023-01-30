let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("liste1");

    dbo.collection("liste1").find({}).toArray((err, data) => {
        console.log(data);
        db.close();
    })
});
