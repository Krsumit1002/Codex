const express = require("express")
const cors = require("cors");
const app = express();
const aiRoutes = require("./src/routes/ai.routes")
require('dotenv').config()

app.use(cors());
app.use(express.json());

// in terminal npm start

app.use("/api/ai", aiRoutes);

app.listen(3000,()=>{
    console.log('server is running')
})