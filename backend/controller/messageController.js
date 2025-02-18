
const Chat = require('../models/chatModel');
const Message = require('../models/message');
const User = require('../models/userModel');

const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed");
        return res.sendStatus(400);
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: 'chat.users',
            select: "name pic email"
        })
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        })
        res.json(message);
    }
    catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
}


const allMessages = async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId }).populate("sender", "name pic email ").populate('chat')
        res.json(messages);
    }

    catch (err) {
        res.status(400);
        throw new Error(err.message);
    }
}


module.exports = {
    sendMessage, allMessages
}


