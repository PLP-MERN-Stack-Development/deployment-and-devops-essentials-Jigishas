
import { useState, useEffect, useRef } from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp, UserButton, useUser } from '@clerk/clerk-react';
import { io } from 'socket.io-client';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const API_BASE_URL = 'https://deployment-and-devops-essentials-jigishas.onrender.com';

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function ChatApp() {
  const { user } = useUser();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  const currentUser = user ? {
    _id: user.id,
    username: user.username || user.firstName || 'User',
    email: user.primaryEmailAddress?.emailAddress,
    avatar: user.imageUrl
  } : null;

  // Fetch messages for active chat
  const fetchMessages = async (chatId) => {
    try {
      const token = await user.getIdToken();
      const response = await fetch(`${API_BASE_URL}/api/chats/${chatId}/messages`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const messages = await response.json();
      setMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Initialize Socket.IO connection and fetch chats when user is available
  useEffect(() => {
    if (!user) return;

    // Fetch chats from backend
    const fetchChats = async () => {
      try {
        const token = await user.getIdToken();
        const response = await fetch('http://localhost:3001/api/chats', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const chats = await response.json();
        setContacts(chats.map(chat => ({
          _id: chat._id,
          username: chat.participants.find(p => p._id !== user.id)?.username || 'Unknown',
          lastMessage: chat.lastMessage?.content || 'Start a conversation',
          participants: chat.participants
        })));
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();

    const newSocket = io('http://localhost:3001');
    socketRef.current = newSocket;

    newSocket.on('receive-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => newSocket.close();
  }, [user]);

  const handleContactSelect = (contact) => {
    setActiveContact(contact);
    fetchMessages(contact._id);
    if (socketRef.current) {
      socketRef.current.emit('join-chat', contact._id);
    }
  };

  const handleSendMessage = (content) => {
    if (!activeContact || !socketRef.current || !user) return;

    const messageData = {
      chatId: activeContact._id,
      senderId: user.id,
      content
    };

    socketRef.current.emit('send-message', messageData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-3xl shadow-2xl flex overflow-hidden">
        <Sidebar
          contacts={contacts}
          activeContact={activeContact}
          onContactSelect={handleContactSelect}
          currentUser={currentUser}
        />
        <ChatArea
          activeContact={activeContact}
          messages={messages}
          onSendMessage={handleSendMessage}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <SignedOut>
        <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <SignIn />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gray-100">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <h1 className="text-2xl font-bold text-gray-900">ChatApp</h1>
                <UserButton />
              </div>
            </div>
          </header>
          <ChatApp />
        </div>
      </SignedIn>
    </ClerkProvider>
  );
}

export default App;
