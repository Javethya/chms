const dbCon = require('./dbconnection');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

var app = express();

app.use(cors());
app.use(bodyParser.json());


app.get('/users', (req, resp) => {
    dbCon.query('SELECT * from tbl_user', (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            resp.send(rows);
        }
    });
});

app.get('/users/:id', (req, resp) => {
    dbCon.query('SELECT * from tbl_user WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            resp.send(rows);
        }
    });
});

app.delete('/users/:id', (req, resp) => {
    dbCon.query('DELETE from tbl_user WHERE id=?', [req.params.id], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            resp.send(rows);
        }
    });
});

app.post('/user', (req, resp) => {
    var user = req.body
    var userData = [user.oid, user.userid, user.password, user.empid, user.name, user.email, user.mobile, user.role, user.photo, user.status]
    dbCon.query('INSERT into tbl_user (oid,userid,password,empid,name,email,mobile,role,photo,status) values(?)', [userData], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            resp.send(rows);
        }
    });
});

app.patch('/user', (req, resp) => {
    var user = req.body
    dbCon.query('UPDATE tbl_user SET ? WHERE id=' + user.id, [user], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            resp.send(rows);
        }
    });
});

app.put('/user', (req, resp) => {
    var user = req.body
    dbCon.query('UPDATE tbl_user SET ? WHERE id=' + user.id, [user], (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            if (rows.affectedRows == 0) {
                var userData = [user.oid, user.userid, user.password, user.empid, user.name, user.email, user.mobile, user.role, user.photo, user.status]
                dbCon.query('INSERT into tbl_user (oid,userid,password,empid,name,email,mobile,role,photo,status) values(?)', [userData], (err, rows) => {
                    if (err) {
                        console.log(err);
                    } else {
                        resp.send(rows);
                    }
                });
            }
            else {
                resp.send(rows);
            }

        }
    });
});

app.listen(3000, () => {
    console.log('Express server is running on port 3000');
})
