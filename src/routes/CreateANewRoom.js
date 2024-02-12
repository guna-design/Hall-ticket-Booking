const express = require("express");
const router = express.Router();
const CreateANewRoomController = require("../controller/CreateANewRoom");

router.post("/", CreateANewRoomController.CreateANewRoom);

module.exports = router;
