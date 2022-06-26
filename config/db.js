// const knex = require("knex")({
//     client : "mysql",
//     connection : {
//         database : "login_sign_jwt",
//         host : "localhost",
//         user : "root",
//         password : "Amit@123"
//     }
// })

require("dotenv").config({ path: '../.env' })
console.log(process.env.DATABASE);
const knex = require("knex")({
     client: 'mysql',// without (.env and .gitignore 
  connection: {
    host: "localhost",
    user: "root",
    password: process.env.PASSWORD,
    database: "login_sign_jwt"
    }
})

knex.schema.hasTable("user_data").then(function (exists) {
    if (!exists) {
        knex.schema.createTable("user_data", (table) => {
            table.increments("id")
            table.string("email").unique().notNullable()
            table.string("password").notNullable();
            table.string("name").notNullable()
            table.integer("age").notNullable();
        }).then(data => {
            console.log("table created")
        }).catch(err => console.log(err))

    }

})
.catch(err => console.log(err.message))




module.exports = knex