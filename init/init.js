
const mongoose=require("mongoose");


main().then(res=>{
    console.log("Connection successful");
}).catch(err=>{
    console.log(err);
})
async function main() {
    await mongoose.connect("mongodb://localhost:27017/wanderla");
}

const data=require("./data.js");

const Listing=require("../models/listing.js");

Listing.deleteMany({}).then(res=>{
    Listing.insertMany(data.data);
});

