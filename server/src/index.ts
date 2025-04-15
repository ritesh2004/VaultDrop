import express,{ Express } from "express";

const app: Express = express();

app.listen(8000,()=>{
    console.log("Server is running on PORT 8000")
})