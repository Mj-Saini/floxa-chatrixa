# Backend API Documentation

## Project Structure

```
backend/
├── schemas/           # Database schemas
│   ├── UserSchema.js
│   ├── ChatSchema.js
│   ├── MessageSchema.js
│   ├── GroupSchema.js
│   └── NotificationSchema.js
├── models/            # Mongoose models
│   ├── User.js
│   ├── Chat.js
│   ├── Message.js
│   ├── Group.js
│   ├── Notification.js
│   └── index.js      # Model exports
├── routes/            # API routes
│   ├── auth.js
│   ├── users.js
│   ├── chat.js
│   ├── messages.js
│   ├── groups.js
│   ├── notifications.js
│   ├── files.js
│   ├── search.js
│   └── settings.js
├── middleware/        # Middleware functions
│   └── auth.js
├── uploads/           # File uploads directory
├── index.js          # Main server file
└── package.json
```

## Database Schemas

### User Schema
- **username**: String (3-30 chars, required)
- **email**: String (unique, required)
- **password**: String (min 6 chars, required)
- **firstName**: String (max 50 chars)
- **lastName**: String (max 50 chars)
- **bio**: String (max 500 chars)
- **country**: String
- **gender**: Enum ['male', 'female', 'other']
- **isOnline**: Boolean (default: false)
- **lastSeen**: Date
- **avatar**: String
- **status**: Enum ['online', 'offline', 'away', 'busy']
- **Privacy Settings**: showOnlineStatus, showLastSeen, allowMessagesFrom, profileVisibility
- **Notification Settings**: emailNotifications, pushNotifications, messageNotifications, groupNotifications, soundEnabled, vibrationEnabled
- **Chat Settings**: messagePreview, readReceipts, typingIndicator, autoDownload, theme, fontSize
- **Security Settings**: twoFactorEnabled, loginNotifications, sessionTimeout

### Chat Schema
- **participants**: Array of User ObjectIds
- **type**: Enum ['private', 'group']
- **name**: String (max 100 chars)
- **description**: String (max 500 chars)
- **admin**: User ObjectId
- **isActive**: Boolean (default: true)
- **lastMessage**: Object with content, sender, timestamp

### Message Schema
- **chat**: Chat ObjectId (required)
- **sender**: User ObjectId (required)
- **content**: String (max 2000 chars, required)
- **type**: Enum ['text', 'image', 'file', 'audio', 'video']
- **fileUrl**: String
- **fileName**: String
- **fileSize**: Number
- **isRead**: Boolean (default: false)
- **readBy**: Array of read receipts
- **replyTo**: Message ObjectId
- **edited**: Boolean
- **editedAt**: Date

### Group Schema
- **name**: String (required, max 100 chars)
- **description**: String (max 500 chars)
- **creator**: User ObjectId (required)
- **admins**: Array of User ObjectIds
- **members**: Array of member objects with role
- **avatar**: String
- **isPrivate**: Boolean (default: false)
- **isActive**: Boolean (default: true)
- **settings**: Object with group permissions

### Notification Schema
- **user**: User ObjectId (required)
- **sender**: User ObjectId
- **type**: Enum ['message', 'group_invite', 'friend_request', 'mention', 'reaction', 'system']
- **title**: String (max 100 chars, required)
- **message**: String (max 500 chars, required)
- **data**: Object with additional data
- **isRead**: Boolean (default: false)
- **readAt**: Date
- **priority**: Enum ['low', 'medium', 'high']

### StrangerChat Schema
- **participants**: Array of participants with user, joinedAt, leftAt
- **status**: Enum ['waiting', 'active', 'ended']
- **startedAt**: Date
- **endedAt**: Date
- **duration**: Number (in seconds)
- **messages**: Array of messages with sender, content, timestamp
- **preferences**: Object with language, ageRange, gender, interests
- **rating**: Number (1-5)
- **reportReason**: String

### StrangerQueue Schema
- **user**: User ObjectId (required, unique)
- **status**: Enum ['waiting', 'matched', 'cancelled']
- **preferences**: Object with language, ageRange, gender, interests
- **joinedAt**: Date
- **matchedAt**: Date
- **cancelledAt**: Date
- **lastActivity**: Date
- **isOnline**: Boolean

## Complete API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user profile
- `PUT /profile` - Update user profile
- `POST /logout` - Logout user

### Users (`/api/users`)
- `GET /` - Get all users (search/friend suggestions)
- `GET /:userId` - Get user by ID
- `PUT /profile` - Update user profile
- `PUT /password` - Change password
- `PUT /status` - Update online status
- `DELETE /account` - Delete account

### Chat (`/api/chat`)
- `GET /` - Get user's chats
- `POST /` - Create new chat
- `GET /:chatId/messages` - Get chat messages
- `POST /:chatId/messages` - Send message

### Messages (`/api/messages`)
- `GET /chat/:chatId` - Get messages for a chat
- `POST /` - Send a message
- `PUT /:messageId` - Edit a message
- `DELETE /:messageId` - Delete a message
- `PUT /:messageId/read` - Mark message as read
- `GET /search` - Search messages
- `GET /unread/count` - Get unread message count

### Groups (`/api/groups`)
- `GET /` - Get user's groups
- `POST /` - Create new group
- `POST /:groupId/members` - Add member to group
- `DELETE /:groupId/members/:userId` - Remove member from group

### Notifications (`/api/notifications`)
- `GET /` - Get user notifications
- `PUT /:notificationId/read` - Mark notification as read
- `PUT /read-all` - Mark all notifications as read
- `DELETE /:notificationId` - Delete notification
- `GET /unread/count` - Get unread notification count
- `PUT /settings` - Update notification settings

### Files (`/api/files`)
- `POST /upload` - Upload single file
- `POST /upload-multiple` - Upload multiple files
- `GET /:filename` - Get file info
- `DELETE /:filename` - Delete file
- `GET /uploads/:filename` - Serve uploaded files

### Search (`/api/search`)
- `GET /global` - Global search across all content
- `GET /users` - Search users only
- `GET /messages` - Search messages only
- `GET /groups` - Search groups only
- `GET /advanced` - Advanced search with filters

### Settings (`/api/settings`)
- `GET /` - Get user settings
- `PUT /profile` - Update profile settings
- `PUT /privacy` - Update privacy settings
- `PUT /notifications` - Update notification settings
- `PUT /chat` - Update chat settings
- `PUT /security` - Update security settings
- `POST /reset` - Reset settings to default

### Stranger Chat (`/api/stranger`)
- `POST /join` - Join stranger chat queue
- `POST /leave` - Leave stranger chat queue
- `GET /current` - Get current stranger chat
- `POST /message` - Send message in stranger chat
- `POST /end` - End stranger chat
- `GET /queue-status` - Get queue status
- `GET /history` - Get stranger chat history

## Features

### Code Organization Benefits
1. **Separation of Concerns**: Schemas and models are in separate files
2. **Maintainability**: Easy to modify individual schemas without affecting others
3. **Scalability**: New schemas can be added without changing existing code
4. **Reusability**: Models can be imported from a central index file
5. **Type Safety**: Clear structure for database operations

### Database Features
- **Password Hashing**: Automatic bcrypt hashing on save
- **Indexes**: Optimized queries with proper indexing
- **Validation**: Comprehensive field validation
- **Relationships**: Proper references between collections
- **Timestamps**: Automatic created/updated timestamps

### API Features
- **Authentication**: JWT-based authentication with middleware
- **File Uploads**: Multer-based file upload with size and type validation
- **Search**: Global and targeted search functionality
- **Notifications**: Real-time notification system
- **Settings**: Comprehensive user settings management
- **Privacy**: Granular privacy controls
- **Security**: Password change, account deletion, session management

### File Upload Features
- **Multiple Formats**: Images, videos, documents
- **Size Limits**: 10MB per file
- **Type Validation**: Secure file type checking
- **Unique Names**: Prevents filename conflicts
- **Organized Storage**: Dedicated uploads directory

### Search Features
- **Global Search**: Search across users, messages, groups, chats
- **Targeted Search**: Search specific content types
- **Advanced Filters**: Date ranges, senders, chat-specific
- **Pagination**: Efficient result handling
- **Case Insensitive**: Flexible search matching

### Stranger Chat Features
- **Real-time Matching**: WebSocket-based instant matching
- **Global Connections**: Connect with users worldwide
- **Preference Matching**: Match based on age, gender, interests
- **Queue Management**: Efficient queue system with position tracking
- **Chat History**: Complete stranger chat history
- **Rating System**: Rate chat experiences
- **Reporting**: Report inappropriate behavior
- **Activity Tracking**: Monitor user activity and online status

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env` file:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/chatrixa
   JWT_SECRET=your-secret-key
   ```

3. Create uploads directory:
   ```bash
   mkdir uploads
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

The server will run on `http://localhost:5000`

## API Usage Examples

### Authentication
```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"john","email":"john@example.com","password":"123456","firstName":"John","lastName":"Doe"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"123456"}'
```

### Chat Operations
```bash
# Get chats
curl -X GET http://localhost:5000/api/chat \
  -H "Authorization: Bearer YOUR_TOKEN"

# Send message
curl -X POST http://localhost:5000/api/messages \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"chatId":"CHAT_ID","content":"Hello world!"}'
```

### File Upload
```bash
# Upload file
curl -X POST http://localhost:5000/api/files/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@/path/to/file.jpg"
```

### Search
```bash
# Global search
curl -X GET "http://localhost:5000/api/search/global?query=hello" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Stranger Chat
```bash
# Join stranger chat queue
curl -X POST http://localhost:5000/api/stranger/join \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"language":"en","ageRange":{"min":18,"max":30},"gender":"any","interests":["music","travel"]}'

# Get current stranger chat
curl -X GET http://localhost:5000/api/stranger/current \
  -H "Authorization: Bearer YOUR_TOKEN"

# Send message in stranger chat
curl -X POST http://localhost:5000/api/stranger/message \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello stranger!","chatId":"CHAT_ID"}'

# End stranger chat
curl -X POST http://localhost:5000/api/stranger/end \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"reportReason":""}'
``` 