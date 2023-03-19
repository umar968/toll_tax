const mongoose = require('mongoose')

module.exports = async () => {
    try{
        const data = await mongoose.connect(process.env.url)
        console.log("Succesfull Connected to Database")
    }catch(err){
        console.log("Connot connect to database: ", err)
    }
};