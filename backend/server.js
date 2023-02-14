import express from 'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

// app config

const app = express();
const port = process.env.PORT || 8001;
const connection_url = `mongodb+srv://<username>:tdq21ps8uTqYNeBO@cluster0.uyphxx6.mongodb.net/?retryWrites=true&w=majority`

// middlewares
app.use(express.json());
app.use(Cors()); 

//db config
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

// api endpoints
app.get('/',(req, res)=> res.status(200).send("HELLO WORLD"));

app.post('/tinder/card', (req, res) =>{
    const dbCard = req.body;

    Cards.create(dbCard,(err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    });
});

app.get('/tinder/card', (req, res) =>{
    Cards.find((err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    });
});



// listner
app.listen(port, ()=> console.log(`listening on localhost: ${port}`));