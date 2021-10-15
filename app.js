if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}


require('dotenv').config();




const express = require('express');
const path = require('path');
const app = express();
const methodoverride = require('method-override');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log("todolist Connected to database");
})
.catch(err =>{
    console.log("Connection error Mongoose")
    console.log(err);
});


const Todo = mongoose.model('Todo', {
    title: { type: String ,
       // required: true,
    trim : true},
    Desc: { type: String ,
       // required: true,
    trim : true}
});
// const mongoSanitize = require('express-mongo-sanitize');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodoverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// app.use(mongoSanitize());


const tasks = [
    {
        title : 'Do homework',
        Desc :  'The Maths homework is pending..'
    },
   

]
// var newtodo = new Todo({

//     
//     title: 'hae',
//     Desc: 'awfafw',
   
  
//   });
//   newtodo.save(function(err) {
//     if(err) {
//       console.log("Can't create new todo: %s", err);

//     } else {
//     
//       console.log("we saved todo");
//     }
// });

// app.get('/',(req,res)=>{
//     res.send("hello");
// })
// app.get('/', (req, res) => {
//     res.render('todos.ejs',{Todo});
// })
app.get('/',async(req,res)=>{
    const todos = await Todo.find({});
    res.render('todos.ejs',{ todos });

});

app.get('/addtodo',(req,res)=>{
   
    //console.log("added called");
    res.render('newtodo.ejs')
})

app.post('/addtodo', async(req,res)=>{
    const newtodo = new Todo(req.body);
    await newtodo.save();
    
    res.redirect('/')
})
app.delete('/todo/:id' , async(req,res)=>{
    await Todo.findByIdAndDelete(req.params.id);
    //console.log('Deleting');
    res.redirect('/');
})

const  port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("listenig to server");
})