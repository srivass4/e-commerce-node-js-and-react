const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
const Jwt = require("jsonwebtoken");
const jwtKey = 'e-comm';
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send(err);
        }
        res.send({ result, auth: token });
    });
});

app.post("/login", async (req, res) => {
    console.log(req.body);
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send(err);
                }
                res.send({ user, auth: token });
            });
        }
        else {
            res.send("No User found");
        }
    }
    else {
        res.send("No Result found");
    }
})

app.post("/addProduct", verifyToken, async (req, res) => {
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get("/getProducts", verifyToken, async (req, res) => {
    let products = await Product.find();
    if (products.length > 0) {
        res.send(products);
    }
    else {
        res.send({ result: "No Product found" });
    }

});

app.delete("/product/:id", verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id });
    res.send(result);
});

app.get("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "No Record found" });
    }
});

app.put("/product/:id", verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result);
});

app.get("/search/:key", verifyToken, async (req, res) => {
    // let result = await Product.find({ name: { $regex: req.params.name, $options: 'i' } });
    //we have to search more than one field so using or.
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { company: { $regex: req.params.key } },
            { category: { $regex: req.params.key } }
        ]
    });
    if (result.length > 0) {
        res.send(result);
    } else {
        res.send({ result: "No Record found" });
    }
}
);

function verifyToken(req, resp, next) {
    let token = req.headers['authorization'];
    if (token) {
        //we are splitting by space as we use 'bearer' keyword before toekn when sending req from postman
        token = token.split(' ')[1];
        console.warn("Middleware called", token[1]);
        Jwt.verify(token, jwtKey, (err, valid) => {
            if (err) {
                resp.status(401).send({ result: "Please provide valid toekn" });
            } else {
                next();
            }
        });
    } else {
        resp.status(403).send({ result: "Please add toekn with header" });
    }
}

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});    
