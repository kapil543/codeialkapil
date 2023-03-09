const express=require("express");
const router=express.Router();
const homeController=require("../controllers/home_controller");
router.get("/",homeController.home);
// router.get("/",homeController.function_name);
router.use("/users",require("./users"));
// for any further routes ,access from here
// router.use("/routerName",require("./routerFile"))
router.use("/post",require("./post"));
console.log("loaded router");
module.exports=router;      