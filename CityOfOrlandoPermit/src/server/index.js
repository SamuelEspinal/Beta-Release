import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "DM1gnse!#34", //Put your password here or leave it blank if you don't have one
    database: "cityoforlandopermit",
})

//If you encounter an auth problem, execute this query in your db...
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_password';
app.use(express.json());
app.use(cors());

// QUERY THE DATABASE
app.get("/permits", (req, res) => {
    db.query("SELECT * FROM permits", (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            res.json(result);
        }
    });
});

// ADD INTO THE DATABASE
app.post("/permits", (req, res) => {
    const query = "INSERT INTO permits (permitName, submitterName, submittedDate, endDate, status) VALUES (?)";
    const values = [
        req.body.permitName,
        req.body.submitterName,
        req.body.submittedDate,
        req.body.endDate,
        req.body.status,
    ]
    db.query(query, [values], (err, result) => { 
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            //res.json(result);
        }
    });
});

app.delete("/permits/:permitId", (req, res) => {
    const permitId = req.params.permitId;
    const query = "DELETE FROM permits WHERE permitId = (?)";
    db.query(query, [permitId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            res.json(result);
        }
    });
});

app.put("/permits/:permitId", (req, res) => {
    const permitId = req.params.permitId;
    const query = "UPDATE permits SET permitName = ?, submitterName = ?, submittedDate = ?, endDate = ?, status = ? WHERE permitId = ?";
    const values = [
        req.body.permitName,
        req.body.submitterName,
        req.body.submittedDate,
        req.body.endDate,
        req.body.status,
    ]
    db.query(query, [...values,permitId], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error reaching DB", message: err.message });
        } else {
            res.json(result);
        }
    });
});

//THIS IS YOUR PORT
const port = 8800;
app.listen(port, () => {
    console.log("Server started on port " + port + ". Backend Reached :)."); // in your browser use localhost:8800 to view this page... tag on the /permits to see the get.. use postman to see the post.
})