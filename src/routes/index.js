const express = require("express");
const router = express.Router();
// Assigning to the Require feild
const CreateANewRoomRoutes = require("./CreateANewRoom");
const BookRoomRoutes = require("./BookRoom");
// Router
router.use("/create", CreateANewRoomRoutes);
router.use("/", BookRoomRoutes);
// Export
module.exports = router;
