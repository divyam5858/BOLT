const postgres= require('postgres')
 
const sql = postgres(process.env.DATABASE_URL)
console.log('database connected')


module.exports=sql