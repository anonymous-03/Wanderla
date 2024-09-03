const express=require("express");
const app=express();
const path=require("path");
const mongoose=require("mongoose");
const methodOverride=require("method-override");
const Listing=require("./models/listing.js");
const ejsMate=require("ejs-mate");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);

main().then(res=>{
    console.log("Connection successful");
}).catch(err=>{
    console.log(err);
})
async function main() {
    await mongoose.connect("mongodb://localhost:27017/wanderla");
}

// home route
app.get("/",(req,res)=>{
    res.send("Home")
})
// index route
app.get("/listings",async (req,res)=>{
    const listings=await Listing.find({});
    res.render("./listings/main.ejs",{listings});
})

// New Listings

app.get("/listings/new",(req,res)=>{
    res.render("./listings/new.ejs");
})

app.post("/listings",async (req,res)=>{
    let {title,description,image,price,location,country,url}=req.body;
    await Listing.create({
        title:title,
        description:description,
        price:price,
        location:location,
        country:country,
        image:{
            url:url
        }
    })
    res.redirect("/listings");
})

// show route

app.get("/listings/:id",async (req,res)=>{
    let id=req.params.id;
    let listing=await Listing.findById(id);
    res.render("./listings/show.ejs",{listing});
})



// edit and update route

app.get("/listings/:id/edit",async (req,res)=>{
        let id=req.params.id;
        let listing=await Listing.findById(id);
        res.render("./listings/edit.ejs",{listing});
})

app.patch("/listings/:id",async (req,res)=>{
        let listing=req.body.listing;
        let id=req.params.id;
        await Listing.updateOne({_id:id},{
            title:listing.title,
            description:listing.description,
            price:listing.price,
            location:listing.location,
            country:listing.country,
            image:{
                url:listing.url
            }
        });
        res.redirect(`/listings/${id}`);
})
   
// Destroy Route

app.delete("/listings/:id",async(req,res)=>{
    let id=req.params.id;
    console.log(id);
    Listing.findByIdAndDelete(id).then(res=>{
        console.log(res);
    }).catch(err=>{
        console.log("error found");
    });
    res.redirect("/listings");
})

app.listen("8080",()=>{
    console.log("app is listening on port 8080");
})