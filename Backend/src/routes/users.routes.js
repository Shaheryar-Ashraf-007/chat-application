import express from "express"
import { protectRoutes } from "../middlewares/auth.middleware.js"
import { acceptFriendRequest,  getFriendRequests,  getMyFriends, getOutgoingFriendReqs,  getRecommendedUsers,  sendFriendRequest } from "../controllers/users.controller.js"

const router = express.Router()

router.use(protectRoutes)

router.get("/", getRecommendedUsers)
router.get("/friends", getMyFriends)
router.post("/friend-requests/:id",sendFriendRequest )
router.put("/friend-requests/:id/accept", acceptFriendRequest)
router.get("/friend-requests/", getFriendRequests) 
router.get("/outgoing-friend-requests", getOutgoingFriendReqs)

export default router