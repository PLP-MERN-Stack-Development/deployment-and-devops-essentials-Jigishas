
import { useState, useEffect } from 'react';
import { ClerkProvider, SignedIn, SignedOut, SignIn, SignUp, UserButton } from '@clerk/clerk-react';
import { io } from 'socket.io-client';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

function ChatApp() {
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('receive-message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => newSocket.close();
  }, []);

  // Load contacts and user data
  useEffect(() => {
    // Mock data for now - replace with API calls later
    const mockContacts = [
      { _id: '1', username: 'Alice Smith', lastMessage: 'Hey, are we still meeting tomorrow?' },
      { _id: '2', username: 'Mike Johnson', lastMessage: 'I sent you the documents' },
      { _id: '3', username: 'Sarah Williams', lastMessage: 'Thanks for your help!' },
      { _id: '4', username: 'Robert King', lastMessage: 'See you at the conference' },
      { _id: '5', username: 'Emma Parker', lastMessage: 'Let\'s catch up soon' }
    ];
    setContacts(mockContacts);

    // Mock current user
    setCurrentUser({ _id: 'current', username: 'John Doe' });
  }, []);

  const handleContactSelect = (contact) => {
    setActiveContact(contact);
    // Load messages for this contact - replace with API call
    const mockMessages = [
      { _id: '1', sender: { _id: '1', username: 'Alice Smith' }, content: 'Hey there! How\'s it going?', timestamp: new Date(Date.now() - 600000) },
      { _id: '2', sender: { _id: 'current', username: 'John Doe' }, content: 'Hi Alice! I\'m doing great. Just finished the project we were working on.', timestamp: new Date(Date.now() - 540000) },
      { _id: '3', sender: { _id: '1', username: 'Alice Smith' }, content: 'That\'s awesome! Can you send me the final version?', timestamp: new Date(Date.now() - 480000) },
      { _id: '4', sender: { _id: 'current', username: 'John Doe' }, content: 'Sure, I\'ll email it to you right now.', timestamp: new Date(Date.now() - 420000) },
      { _id: '5', sender: { _id: '1', username: 'Alice Smith' }, content: 'Thanks! By the way, are we still meeting tomorrow to discuss the next phase?', timestamp: new Date(Date.now() - 360000) }
    ];
    setMessages(mockMessages);
  };

  const handleSendMessage = (content) => {
    if (!activeContact || !socket) return;

    const messageData = {
      chatId: activeContact._id,
      senderId: currentUser._id,
      content
    };

    socket.emit('send-message', messageData);
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
            <SignIn routing="path" path="/sign-in" />
            <SignUp routing="path" path="/sign-up" />
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
