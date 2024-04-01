import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async(req,res) => {
    try{
        //get all the informations first the messages,receivers,senders and the conversation beetween them
        //get the message
     const {message} = req.body;
     //get the id 
     const {id:receiverId} = req.params;
     //get the senderid 
     const senderId = req.user._id;
      //let parcequ'on peut reaffecter
    let conversation = await Conversation.findOne({
        participants : { $all: [senderId, receiverId] },
    })

    if(!conversation) {
        conversation = await Conversation.create({
            participants : [senderId,receiverId],
        })
    }

    const newMessage = new Message({
        senderId,
        receiverId,
        message,
    })

    if(newMessage) {
        conversation.messages.push(newMessage._id);
    }

    //await conversation.save();
    //await newMessage.save();

    //this will run at the same time
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json(newMessage);
     


    }catch(error) {
       console.log("Error in send messagecontroller", error.message)
       res.status(500).json({error:"Internal server error"})
    }

};

export const getMessages = async(req,res) => {
   try {
     const {id:userToChatId} = req.params;
     const senderId = req.user._id;

     const conversation = await Conversation.findOne({
       participants : { $all: [senderId, userToChatId] },
       //populate is from mongodb function to populate messages we have on the message model on the conversation
     }).populate("messages");

     if(!conversation) return res.status(200).json([]);

     const messages = conversation.messages; 

     res.status(200).json(messages);

   }catch(error) {
    console.log("Error in getMesages controller :" , error.message);
    res.status(500).json({error: "Internal server error"});
   }
};