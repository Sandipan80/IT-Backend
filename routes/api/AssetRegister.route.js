const Waiter = require("express").Router()
const newasset = require("../../controllers/NewAsset");
const getasset = require("../../controllers/GetAsset")
const addasset = require("../../controllers/AddAsset")

Waiter.post("/newasset",newasset)
Waiter.post("/addasset",addasset)
Waiter.get("/getasset",getasset)

module.exports =Waiter;