- [x] Delete node_modules and package-lock.json
- [x] Reinstall dependencies with npm install
- [x] Run npm run dev to test the fix

Frontend Setup:
- [x] Install frontend dependencies (socket.io-client, @clerk/clerk-react, tailwindcss, shadcn-ui, framer-motion)
- [x] Set up Tailwind CSS configuration
- [x] Install and configure Shadcn UI

Backend Setup:
- [x] Create backend structure: server.js (Express + Socket.IO), models (User, Chat, Message), routes, MongoDB connection

React Components:
- [x] Convert HTML to React components: Sidebar, ChatArea, Message, MessageInput
- [x] Integrate Clerk for authentication (login/signup, protect chat)
- [x] Connect to database (MongoDB), implement CRUD for chats/messages
- [x] Add real-time messaging with Socket.IO
- [x] Apply Tailwind/Shadcn styling, add Framer Motion animations

Testing and Deployment:
- [ ] Test full flow: Auth, load chats, send/receive messages, store in DB
- [ ] Deploy frontend/backend as per Week7 assignment
