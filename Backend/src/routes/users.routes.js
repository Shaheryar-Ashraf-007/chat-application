import express from "express"
import { protectRoutes } from "../middlewares/auth.middleware.js"
import { getMyFriends, getReccomandedUsers, sendFriendRequest } from "../controllers/users.controller.js"

const router = express.Router()

router.use(protectRoutes)

router.get("/", getReccomandedUsers)
router.get("/friends", getMyFriends)

router.post("/friend-request/:id",sendFriendRequest )

export default router