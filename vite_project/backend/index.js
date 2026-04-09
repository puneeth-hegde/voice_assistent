const express = require("express");
const mysql = require("mysql/promises");
let cors = require("cors");
let openai = require("openai");
const { Transcriptions } = require("groq-sdk/resources/audio/transcriptions.js");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

async function database() {
  const db = await mysql.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
    const[rows]=db.excecute("select * from footitems")
    await db.end()
    return rows

    
}
app.get("/",async(req,res)=>{
    try{
        const rows =await database();
        res.json(rows);
    }
    catch(error){
        console.log("error"+error);
    }
})



app.post("/voice",(req,res)=>{
    const {trainscript}= req.body;
    console.log("user said "+ trainscript);


})

const client = new openai({
  apiKey: process.env.OPENAI_API_KEY,
  baseUrl: process.env.OPENAI_BASE_URL
});












