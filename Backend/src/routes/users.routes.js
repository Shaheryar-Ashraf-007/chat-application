import express from "express"
import { protectRoutes } from "../middlewares/auth.middleware.js"
import { acceptFriendRequest, getFriendRequest, getMyFriends, getOutgoingFriendReqs, getReccomandedUsers, sendFriendRequest } from "../controllers/users.controller.js"

const router = express.Router()

router.use(protectRoutes)

router.get("/", getReccomandedUsers)
router.get("/friends", getMyFriends)

router.post("/friend-request/:id",sendFriendRequest )
router.put("/friend-request/:id/accept", acceptFriendRequest)
router.get("/friend-request/", getFriendRequest) 
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)

export default router