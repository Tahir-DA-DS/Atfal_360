const mongoose = require("mongoose")
const connectDB = require("./db/connect")

require("dotenv").config()

const atfal_Data = require("./models/user_Atfal")

const dbconnect = async ()=>{
    
    await connectDB(process.env.URI)
}

dbconnect()

const seedData = [
    {
        FullName:"Tahir A",
        Age: 7,
        Region:"North",
        State:"FCT",
        Dila: "Abuja",
        Muqam:"central"
    },

    {
        FullName:"Eke Milna",
        Age: 9,
        Region:"South",
        State:"Abia",
        Dila: "Umuhahia",
        Muqam:"agwu"
    },

    {
        FullName:"Kelani A",
        Age: 5,
        Region:"West",
        State:"Oyo",
        Dila: "Monotan",
        Muqam:"Monotan"
    },

    {
        FullName:"Abu A",
        Age: 10,
        Region:"North",
        State:"Kaduna",
        Dila: "Zaria",
        Muqam:"central"
    },

    {
        FullName:"Tony Abdul",
        Age: 10,
        Region:"South",
        State:"Enugu",
        Dila: "Eni",
        Muqam:"central"
    },

    {
        FullName:"Mohammad Bida",
        Age: 7,
        Region:"West",
        State:"Ondo",
        Dila: "Owo",
        Muqam:"ondo town"
    }

]

const seedDb = async ()=>{

  
    await atfal_Data.deleteMany({})
    await atfal_Data.insertMany(seedData)
}

seedDb().then(()=>{

    console.log(`data added`);
    
    mongoose.connection.close() 
    
    })
    
    .catch((error)=>{
    
    console.log(error);
    
    })