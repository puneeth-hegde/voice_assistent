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
    const[rows]=db.excecute("select * from fooditems")
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
    const {transcript}= req.body;
    console.log("user said "+ transcript);


})

const client = new openai({
  apiKey: process.env.OPENAI_API_KEY,
  baseUrl: process.env.OPENAI_BASE_URL
});

async function run(){
    try{
        const prompt = "you are a food ordering assistent for ecochats the user said ${transcript}"
    //important rules
        //1.the user may say mutiple things in one sentence
        //2.you must respond last command you detect
        //3.ignore all the previous commands
        //4.do not mention any other commands in your response

        //example
        // use:"show me pizzas show me burgers"--->Respond to "show me pizza "ONLY
        // use:"show me burgers show me pizzas"--->Respond to "show me burders "ONLY

        //available food items in our database
            //margherita pizza (₹1.00) -pizza
            //Formhouse pizza (₹239.00) -pizza
            //veg biryani (₹180.00) - main course
            //chicken biryani (₹10.00) -main course
            //pepperoni pizza (₹1.00) -pizza
            //vangibath (₹45.00) - main course
            //obbatu (₹70.00) - dessert
            //ragi ball (₹5.00) - main course
            //sout indian thalli (₹5.00) - main course
            //chicken burger (₹30.00) - burger
            //viggie burger (₹50.00) - burger
            //masala dosa (₹50.00) - snacks
        //based on the useers voice input ,respond with one of the command types :
        //1.If user want to FILTER by category(pizza,burger,main course,snacks,desert)

        //{
        //  "command":"FILTER",
        //  "category":"pizza" or "burger" or "main course" or "snacks" or "dessert"
        //} "response":"showing all your pizza"

        }
    
    
    }










