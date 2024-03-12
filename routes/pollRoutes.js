const express = require("express");
const {
  getPollById,
  getAllPolls,
  postPoll,
  updatePoll,
} = require("../controllers/pollControllers");
const router = express.Router();

router.get("/:pollsId", getPollById);
router.get("/", getAllPolls);
router.post("/", postPoll);
router.post("/updatepoll", updatePoll)
module.exports = router;
