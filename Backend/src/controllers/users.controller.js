import FriendRequest from "../models/FriendRequest.js";
import User from "../models/User.js";

export async function getReccomandedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { $id: { $nin: currentUser } },
        { $isOnboard: true },
      ],
    });

    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log("Error in get Recommanded Controller", error);

    res.status(500).json("Internal Server Error");
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage, learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("Error in get My Friends Controller", error);
    res.status(500).json({ mesage: "Internal Server Error" });
  }
}

export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    // prevent sending req to yourself
    if (myId === recipientId) {
      return res.status(400).json({ message: "You can't send friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return res.status(404).json({ message: "Recipient not found" });
    }

    // check if user is already friends
    if (recipient.friends.includes(myId)) {
      return res.status(400).json({ message: "You are already friends with this user" });
    }

    // check if a req already exists
    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "A friend request already exists between you and this user" });
    }

    const Request = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(Request);
  } catch (error) {
    console.error("Error in sendFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}


export async function acceptFriendRequest(req,res) {
  
  try {
    const {id:requestId} = req.params

    const acceptRequest = await FriendRequest.findById(requestId)

    if(!requestId){
      return res.status(404).json({ message: "Friend request not found" });

    }

    if(acceptRequest.recipient.toString()!==req.user.id){

      return res.status(403).json({message: "you are not authorized to accept the requset"})
    }

    acceptRequest.status = "accepted"
    await acceptRequest.save()

    await User.findByIdAndUpdate(acceptRequest.sender,{
      $addToSet: {friends: acceptRequest.recipient}
    })

    await User.findByIdAndUpdate(acceptRequest.recipient,{
      $addToSet: {friends: acceptRequest.sender}
    })

  } catch (error) {
    console.error("Error in acceptFriendRequest controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });

    
  }
}


export async function getFriendRequest(req, res) {

  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingRequests = await FriendRequest.find({
      sender: req.user.id,
      status: "pending",
    }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

    res.status(200).json(outgoingRequests);
  } catch (error) {
    console.log("Error in getOutgoingFriendReqs controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

