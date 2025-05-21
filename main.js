import express from "express"
import bodyParser from "body-parser"
import fs from "fs"
import path from "path"
import newUser from "./models/user.model.js"
import Mongo_connect from "./config/db.js"

let server = express()

server.use(express.json())
await Mongo_connect()
server.use(bodyParser.urlencoded({ extended: false }))
server.set("view engine", "hbs")
server.set("views", path.join(process.cwd(), "html"))
server.use(express.static(path.join(process.cwd(), "public")))

server.get("/", async (req, res) => {
    let data = await newUser.find()
    res.render("home", { data })
})

server.get("/register", (req, res) => {
    res.render("register")
})

server.post("/add", async(req, res) => {
    try {
        let { username, password } = req.body
        await newUser.create({ username, password })
        res.redirect("/")
    } catch (error) {
        res.send("Registerda xato!!!")
    }
})

server.get("/login", (req, res) => {
    res.render("login")
})

server.post("/user_register", async (req, res) => {
    try {
        let { username, password } = req.body
        let user = await newUser.findOne({ username, password })
        if (user) {
            res.send("Login muvaffaqiyatli.😀😀😀")
        } else {
            res.send("Email yoki parol noto‘g‘ri.😪😪😪")
        }
    } catch (error) {
        res.send("Login Xato")
    }
})

server.listen(3000, () => {
    console.log("Server is running...")
})
