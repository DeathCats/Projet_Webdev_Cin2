const express = require('express');
const app = express();
const port = 3000;
const MongoClient = require('mongodb').MongoClient;
const mongoDB = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';

app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.get('/', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.error(err);
        } else {
            const dbo = db.db("taches");
            switch (req.query.action) {
                case 'Tous':
                default:
                    dbo.collection("tasks").find({}).toArray((err, result) => {
                        res.render('./index', {
                            taches: result
                        })
                    });
                    break;
                case 'Actif':
                    dbo.collection("tasks").find({ termine: false }).toArray((err, result) => {
                        res.render('./index', {
                            taches: result
                        })
                    });
                    break;
                case 'Termine':
                    dbo.collection("tasks").find({ termine: true }).toArray((err, result) => {
                        res.render('./index', {
                            taches: result
                        })
                    });
                    break;
            }
        }
    });
});

app.post('/ajouter1', (req, res, next) => {

    const tache = { "titre": req.body.tache, "statue": "indifine" };

    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.error(err);
        } else {
            const dbo = db.db("taches");
            dbo.collection("taches").insertOne(tache, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Tache ajoutée");
                }
            })
        }
    });
});
app.post('/ajouter2', (req, res, next) => {

    const tache = { "titre": req.body.tache, "statue": "cours" };

    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.error(err);
        } else {
            const dbo = db.db("taches");
            dbo.collection("taches").insertOne(tache, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Tache ajoutée");
                }
            })
        }
    });
});
app.post('/ajouter3', (req, res, next) => {

    const tache = { "titre": req.body.tache, "statue": "terminer" };

    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.error(err);
        } else {
            const dbo = db.db("taches");
            dbo.collection("taches").insertOne(tache, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Tache ajoutée");
                }
            })
        }
    });
});
app.post('/supprimer', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.error(err);
        } else {
            let dbo = db.db("taches");
            dbo.collection("taches").deleteOne({ _id: mongoDB.ObjectId(req.body.id) }, (err, result) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Tache supprimée");
                    db.close();
                    res.redirect('/');
                }
            });
        }
    });
});
app.post('/terminer', (req, res, next) => {
    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.error(err);
        } else {
            let dbo = db.db("TP2Exo3");
            dbo.collection("tasks").updateOne({ _id: mongoDB.ObjectId(req.body.id) }, { $set: { termine: true } }, (err, resDB) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log("Tache terminée");
                    db.close();
                    res.redirect('/');
                }
            })
        }
    });
});

// Lancement du serveur
app.listen(port, () => {
    console.log(`L'application écoute le port ${port}`)
})
