const Waiter = require("express").Router()

const addasset = require("../../controllers/AddAsset")
const { GetAllAssets, GetAssetById } = require("../../controllers/GetAsset")
const { UpdateAsset, DeleteAsset } = require("../../controllers/NewAsset");

 

Waiter.post("/addasset",addasset)
Waiter.get("/GetAllAssets",GetAllAssets)
Waiter.get("/GetAssetById/:id",GetAssetById)
Waiter.put("/UpdateAsset/:id",UpdateAsset)
Waiter.delete("/DeleteAsset/:id",DeleteAsset);

module.exports =Waiter;