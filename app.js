const express = require('express');
const app = express();


//run queries on the pool
const pool = require("./db")

app.use(express.json()) // -> req.body


// ROUTES 

//GET
app.post("/auth/webhook", async(req,res)=>{
    try {
        const {id, name, email} = req.body.params;
        const userData = await pool.query("SELECT * FROM auth_data where id=$1",[id])
        if(userData.rowCount == 1){
            res.json("ok");
        }else{
            await pool.query("INSERT INTO auth_data(id, name, email) VALUES ($1,$2,$3) RETURNING *",[id, name, email])
            res.json("ok");
        }

    } catch (error) {
        console.error(error.message)
    }
})

app.get('/auth/check', async(req,res)=>{
    try {
        const id = "";
        const userData = await pool.query("SELECT * FROM auth_data where id=$1",[id])
        res.json(userData.rowCount)
    } catch (error) {
        console.error(error.message)
    }
})

app.get('/', function(req, res) {
    res.send('Hello world!')
}); 

app.listen(8080, () => {
    console.log('Server Started');
});
