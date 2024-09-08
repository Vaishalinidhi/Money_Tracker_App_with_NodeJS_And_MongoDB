var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app= express()


    app.use(bodyParser.json())
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({
        extended:true
    }))

    mongoose.connect('mongodb+srv://vaishalinidhi20:xWFAoxSGms9UUTSZ@cluster0.lmlsn.mongodb.net/')
    var db = mongoose.connection
    db.on('error',()=>console.log("Error in connecting to the database"))
    db.once('open',()=>console.log("Connected to database"))
    app.post("/add",(req,res)=>{
        var category_select=req.body.category_select
        var amount_input=req.body.amount_input
        var info=req.body.info
        var date_input=req.body.date_input

        var data={
            "category":category_select,
            "Amount":amount_input,
            "Info":info,
            "Date":date_input
        }
        db.collection('users').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
            console.log("Record inserted successfully")
        })
    })
    app.get("/",(req,res)=>{
        res.set({
            "ALLOW-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')

 }).listen(5000)

console.log("Listening on port 5000")