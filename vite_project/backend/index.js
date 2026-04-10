const express = require("express"); //used to import express.js and it will create backend server and api 
const mysql = require("mysql2/promises");//imports mysql library in promise version 
let cors = require("cors");//is it used allow the frontend to recieve the data from backend 
let openai = require("openai");//It is used to install openai packages used for ai(chatgpt , ) 
const { Transcriptions } = require("groq-sdk/resources/audio/transcriptions.js");//It is used to import the transcriptions from groq sdk
require("dotenv").config();//It is used to import the environment variables from .env file
const app = express();//It is used to create app server 

app.use(express.json());//It is used to convert incoming json data into js object and it is used to parse the incoming request body as json data
app.use(cors());//It is used to allow the frontend to recieve the data from backend

async function database() {//It is used to connect the database and fetch the data from database and return it to the frontend
  const db = await mysql.createConnection({//used to connect with my sql
    user: process.env.DB_USER,//It is used to get the database username from environment variables
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
  const [rows] = await db.execute("SELECT * FROM fooditems")
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
        const prompt = `your food orderding assistant for echoChats.the user said ${transcript}"

        important rules
        1.the user may say mutiple things in one sentence
        2.you must respond last command you detect
        3.ignore all the previous commands
        4.do not mention any other commands in your response

        example
        use:"show me pizzas show me burgers"--->Respond to "show me pizza "ONLY
        use:"show me burgers show me pizzas"--->Respond to "show me burders "ONLY

        available food items in our database

        margherita pizza (₹1.00) -pizza
        Formhouse pizza (₹239.00) -pizza
        veg biryani pizza (₹180.00) -main course
        chicken biryani (₹10.00) -main course
        pepperoni pizza (₹1.00) -pizza
        vangi bath (₹45.00) -main course
         obbatu (₹70.00) -dessert
         ragi ball (₹5.00)-main course
         chicken burger (₹30.00)-burger
         veggie burger (₹50.00)-burger
         masala dosa (₹50.00)-snacks
         ice-cream (₹50.00)-snacks

         based on the users voice input,resopnd with ONE of these command types:
         1.if user want to filter by category(pizza,burger,main course,snacks,dessert)
         {
         "command":"FILTER"
         "category":"pizza" or "burger","main couse","snacks","dessert",
         "respond":"showing all your pizza"
         }

         2.if user want to NAVIGATE to page
         {
         "command":"NAVIGATE"
         "category":"home" or "about" or "cart" or "menu" or "login",
         or "orders" or "items"
         "path":"/" "/home" or "/about" or "/cart" or /"menu" or /"login",
         or "/orders" or "/items"
         "respond":"showing all your pizza"
         }

         3.if user wants to LOGIN:
         "command":"NAVIGATE"
         "category":"login"
         "path":"/login"
         "response":"taking you to login page"

         4.if wants to LOGOUT
         {
         "command":"LOGOUT"
         "response":"logging you out"
         }

         5.if user wants to ORDER an items:
         {
           "command":"ORDER"
           items:[
                    {
                    "name":"exact food name",
                    "quantity":"number",
                    "price":"number"

                   }

                ]
              "response":"added to cart"
        }
        6. if users wants to REMOVE items from cart
        {
           "command":"ORDER"
           items:[
                    {
                    "name":"exact food name",
                    "quantity":"number",
                    

                   }

                ]
              "response":"Removed to cart"
        }
        7. if the command is unclear 
        {
        command:"UNKNOWN",
        response:"Sorry, I didn't understand that. Could you please rephrase?"
        }
        return only the JSON object , bno additional text.





        
    }
 
}`








