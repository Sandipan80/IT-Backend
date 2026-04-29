const Waiter = require("express").Router()

const addasset = require("../../controllers/create/AddAsset")
const { GetAllAssets, GetAssetById } = require("../../controllers/fetch/GetAsset")
const { UpdateAsset, DeleteAsset } = require("../../controllers/create/NewAsset");
const AssignAsset = require("../../controllers/update/AssignAsset")
const createAssetRequest = require("../../controllers/create/AssetRequest")
const updateAssetRequest = require("../../controllers/update/UpdateAssetRequest")
const getAllAssetRequests = require("../../controllers/fetch/GetAssetRequest")
const GetUnassignedAssets = require("../../controllers/fetch/GetUnassignedAssets")

const {verifyToken,isAdmin}= require("../../middleware/auth")

 

Waiter.post("/addasset",addasset)
Waiter.get("/GetAllAssets",GetAllAssets)
Waiter.get("/GetAssetById/:id",GetAssetById)
Waiter.put("/UpdateAsset/:id",UpdateAsset)
Waiter.delete("/DeleteAsset/:id",DeleteAsset);
Waiter.put("/AssignAsset",AssignAsset)
Waiter.post("/createAssetRequest",verifyToken,createAssetRequest)
Waiter.get("/getAllAssetRequests",verifyToken,isAdmin,getAllAssetRequests)
Waiter.patch("/updateAssetRequest/:requestID",verifyToken,isAdmin,updateAssetRequest)
Waiter.get("/GetUnassignedAssets",GetUnassignedAssets)




module.exports =Waiter;