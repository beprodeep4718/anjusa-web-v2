# Admin Dashboard

A comprehensive admin dashboard for managing notices, users, and application settings.

## Features

### 🏠 Overview Dashboard
- **Statistics Cards**: View total notices, active notices, draft notices, and total views
- **Recent Activity**: Quick overview of recently created notices
- **Real-time Data**: Dashboard updates automatically when data changes

### 📝 Notice Management
- **Create Notices**: Add new notices with title, content, type, priority, and status
- **Edit Notices**: Modify existing notices with full form validation
- **Delete Notices**: Remove notices with confirmation prompts
- **Search & Filter**: Find notices quickly using the search functionality
- **Status Management**: Control notice status (Active, Draft, Inactive)
- **Priority Levels**: Set notice priority (Low, Medium, High)
- **Notice Types**: Categorize notices (General, Important, Urgent, Event)

### 👥 User Management
- **Coming Soon**: User account management and permissions
- **Role-based Access**: Different access levels for different user types

### ⚙️ Settings
- **Profile Management**: View and manage admin profile information
- **Application Settings**: Configure dashboard preferences
- **Toggle Options**: Email notifications, auto-save, and theme preferences

## Getting Started

### Prerequisites
- Node.js and npm installed
- MongoDB database running
- Admin account created in the system

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd anjusa-web-v2
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the server directory with:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CORS_ORIGIN=http://localhost:5173
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

4. **Seed the database**
   ```bash
   cd server
   npm run seed:all
   ```

5. **Start the development servers**
   ```bash
   # Start the backend server
   cd server
   npm run dev
   
   # In a new terminal, start the frontend
   cd client
   npm run dev
   ```

### Access the Admin Dashboard

1. **Login with admin credentials**:
   - Email: `admin@exe.com`
   - Password: `admin123`

2. **Navigate to the admin dashboard**:
   Visit `/admin` route after logging in

## API Endpoints

### Notice Management
- `GET /api/notice` - Fetch all notices
- `POST /api/notice` - Create a new notice
- `PUT /api/notice/:id` - Update a notice
- `DELETE /api/notice/:id` - Delete a notice

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/verify` - Verify authentication
- `POST /api/auth/logout` - User logout

## Notice Schema

```javascript
{
  title: String (required),
  content: String (required),
  type: String (enum: ['general', 'important', 'urgent', 'event']),
  priority: String (enum: ['low', 'medium', 'high']),
  status: String (enum: ['active', 'inactive', 'draft']),
  views: Number (default: 0),
  image: {
    public_id: String,
    secure_url: String
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **Role-based Access Control**: Only admin users can access the dashboard
- **Protected Routes**: Automatic redirection for unauthorized access
- **JWT Authentication**: Secure token-based authentication
- **Input Validation**: Server-side validation for all form inputs

## UI/UX Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern Interface**: Built with Tailwind CSS and DaisyUI components
- **Dark/Light Theme**: Toggle between themes in settings
- **Intuitive Navigation**: Easy-to-use sidebar navigation
- **Loading States**: Smooth loading indicators for better user experience
- **Error Handling**: Comprehensive error messages and validation

## Technology Stack

### Frontend
- **React**: Modern JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework
- **DaisyUI**: Component library for Tailwind CSS
- **Lucide React**: Beautiful & consistent icon pack
- **Zustand**: Lightweight state management
- **React Router**: Declarative routing for React
- **Axios**: HTTP client for API requests

### Backend
- **Node.js**: JavaScript runtime environment
- **Express.js**: Fast, unopinionated web framework
- **MongoDB**: NoSQL database for flexible data storage
- **Mongoose**: Elegant MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Bcrypt**: Password hashing library
- **Cloudinary**: Cloud-based image management

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support and questions, please contact the development team or create an issue in the repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
