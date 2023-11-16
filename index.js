const app =require('./src/server')
//setting up your port
const PORT = process.env.PORT;
//listening to server connection 
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
