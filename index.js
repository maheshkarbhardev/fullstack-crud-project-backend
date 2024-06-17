const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const cors=require('cors');
const mysql=require('mysql2');

const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"mahesh.27798",
    database:"practise"
})



app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get("/api/get",(req,res)=>{
    const sqlGet="SELECT * FROM contact_db";
    db.query(sqlGet,(err,result)=>{
        if(err)
            {
                console.log("Error:- ",err);
            }
        res.send(result);
    })
})

app.post("/api/post",(req,res)=>{
    const {name,email,contact}=req.body;
    const sqlInsert="INSERT INTO contact_db (name,email,contact) VALUES (?,?,?)";
    db.query(sqlInsert,[name,email,contact],(err,result)=>{
        if(err)
            {
                console.log("Error:- ",err);
            }
    })
})

app.delete("/api/remove/:id",(req,res)=>{
    const {id}=req.params;
    const sqlRemove="DELETE FROM contact_db WHERE id=?";
    db.query(sqlRemove,id,(err,result)=>{
        if(err){
            console.log("Error",err);
        }
    })
})

app.get("/api/get/:id",(req,res)=>{
    const {id}=req.params;
    const sqlGet="SELECT * FROM contact_db WHERE id=?";
    db.query(sqlGet,id,(err,result)=>{
        if(err){
            console.log("Error:- ",err);
        }
        res.send(result);
    })
})

app.put("/api/update/:id",(req,res)=>{
    const {id}=req.params;
    const {name,email,contact}=req.body;
    const sqlUpdate="UPDATE contact_db SET name=? , email=?, contact=? WHERE id=?";
    db.query(sqlUpdate,[name,email,contact,id],(err,result)=>{
        if(err){
            console.log("Error:- ",err);
        }
        res.send(result);
    })
})

app.get("/",(req,res)=>{
    // const sqlInsert="INSERT INTO contact_db (name,email,contact) VALUES ('Mahesh Karbhar','mahesh@gmail.com',9970877305)";
    // db.query(sqlInsert,(err,result)=>{
    //     console.log("Error:- ",err);
    //     console.log("Result:- ",result);
    //     res.send(result);
    // })
})

app.listen(5000,()=>{
    console.log("Server is running at Port 5000");
})
