const express=require("express");
const router=express.Router();
const homeController=require("../controllers/home_controller");
router.get("/",homeController.home);
// router.get("/",homeController.function_name);
router.use("/users",require("./users"));
// for any further routes ,access from here
// router.use("/routerName",require("./routerFile"))
router.use("/posts",require("./posts"));
router.use("/comments",require("./comments"));
console.log("controller routes");
router.use("/likes",require("./likes"));

router.use("/api",require("./api"));
console.log("loaded router");
module.exports=router;      