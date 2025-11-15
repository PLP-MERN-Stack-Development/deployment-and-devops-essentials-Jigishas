const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const User = require('../models/User');

const router = express.Router();

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Get all chats for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.userId })
      .populate('participants', 'username avatar online')
      .populate('lastMessage')
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get messages for a chat
router.get('/:chatId/messages', verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new chat
router.post('/', verifyToken, async (req, res) => {
  try {
    const { participants, isGroup, chatName } = req.body;

    // Ensure current user is included
    if (!participants.includes(req.userId)) {
      participants.push(req.userId);
    }

    const chat = new Chat({
      participants,
      isGroup: isGroup || false,
      chatName: chatName || ''
    });

    await chat.save();
    await chat.populate('participants', 'username avatar online');

    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Send message
router.post('/:chatId/messages', verifyToken, async (req, res) => {
  try {
    const { content } = req.body;

    const message = new Message({
      chat: req.params.chatId,
      sender: req.userId,
      content
    });

    await message.save();
    await message.populate('sender', 'username avatar');

    // Update chat's last message
    await Chat.findByIdAndUpdate(req.params.chatId, {
      lastMessage: message._id,
      updatedAt: new Date()
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get users for creating new chat
router.get('/users/search', verifyToken, async (req, res) => {
  try {
    const { query } = req.query;
    const users = await User.find({
      $and: [
        { _id: { $ne: req.userId } },
        {
          $or: [
            { username: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } }
          ]
        }
      ]
    }).select('username email avatar online');

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
