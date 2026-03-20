const express = require("express")
const upload = require("../middleware/upload.middleware")
const songController = require("../controllers/song.controllers")

const router =  express.Router();


/**
 * POST /api/songs/
 * 
 */
router.post("/", upload.single("song"), songController.uploadSong)


router.get("/" ,songController.getSong )

module.exports = router;