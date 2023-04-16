const mysql =require("mysql");
const connection = mysql.createConnection({
    host:"locahost",
    user:"root",
    password:"",
    database:"demo-backend",
    port:"3307",
});
connection.connect((err)=>{
    if(err)throw err;
    console.log("BD CONNECTED");
});
module.exports=connection;