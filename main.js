import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import path from "path"

let server = express()

server.use(express.json())
server.use(bodyParser.urlencoded({ extended: false }))
server.set("view engine", "hbs")
server.set("views", path.join(process.cwd(), "html"))
server.use(express.static(path.join(process.cwd(), "public")))

let data =  JSON.parse(fs.readFileSync("user.json", "utf-8")) 


server.get("/", (req, res) => {
    res.render("home", { data })
})

server.get("/register", (req, res) => {
    res.render("register")
})

server.post("/add", (req, res) => {
    let {username, password } = req.body
    data.push({username, password }) 
    fs.writeFileSync("user.json", JSON.stringify(data, null, 4), "utf-8")
    res.redirect("/")
})

server.get("/login", (req, res) => {
    res.render("login")

})

server.post("/user_register", (req, res) => {
    let { username, password } = req.body
    let user = data.find(user => user.username === username && user.password === password)
    if (user) {
        res.send("Login muvaffaqiyatli.😀😀😀")
    } else {
        res.send("Email yoki parol noto‘g‘ri.😪😪😪")
    }
})

server.listen(3000, () => {
    console.log("Server is running...")
})
