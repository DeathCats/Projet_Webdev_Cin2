let MongoClient = require('mongodb').MongoClient;
let url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("taches");
    let taches = [{ "titre": "Découvrir à quoi servent les 1562 coquillages", "termine": false },
    { "titre": "Réparer la faille dans le système de refroidissement", "termine": false },
    { "titre": "Finir le TP18", "termine": false }];
    dbo.collection("taches").insertMany(taches, function (err, res) {
        if (err) throw err;
        console.log("Taches insérées");
        db.close();
    });
});
