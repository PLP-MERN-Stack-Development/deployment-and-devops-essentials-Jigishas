import { useState } from 'react';

const Sidebar = ({ contacts, activeContact, onContactSelect, currentUser }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-1/4 bg-gray-50 border-r border-gray-200 flex flex-col">
      {/* User Profile */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
          {currentUser?.username?.charAt(0).toUpperCase() || 'U'}
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{currentUser?.username || 'User'}</h3>
          <p className="text-sm text-green-600">Online</p>
        </div>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredContacts.map((contact) => (
          <div
            key={contact._id}
            onClick={() => onContactSelect(contact)}
            className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
              activeContact?._id === contact._id
                ? 'bg-purple-100 border-l-4 border-purple-600'
                : 'hover:bg-gray-100'
            }`}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
              {contact.username.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 truncate">{contact.username}</h4>
              <p className="text-sm text-gray-500 truncate">
                {contact.lastMessage || 'Start a conversation'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
