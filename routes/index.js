const express=require("express");
const router=express.Router();
const homeController=require("../controllers/home_controller");
// router.get("/",homeController.home);
router.get("/",homeController.function_name);
console.log("loaded router");
module.exports=router;      