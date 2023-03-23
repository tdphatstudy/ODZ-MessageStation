const express = require("express");
const router = express.Router();
const UserController = require("../controllers/User.js");


router.get("/", UserController.get);
router.get("/account_status/:status", UserController.getByStatusAccount);
router.get("/online_status/:status", UserController.getByOnlineStatus);
router.post("/create", UserController.create);
router.put("/role", UserController.changeRole);
router.put("/account_status", UserController.changeAccountStatus);
router.put("/status", UserController.changeOnlineStatus);

module.exports = router;