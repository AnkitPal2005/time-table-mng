# 📅 ScheduleSync - Modern Timetable Management System

A beautiful, modern web application for managing school/college timetables with an intuitive admin panel and teacher dashboard.

## ✨ Features

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern gradient backgrounds, smooth animations, and professional styling
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic dark mode based on system preferences
- **Accessibility**: High contrast mode support and keyboard navigation
- **Modern Typography**: Clean, readable fonts with proper spacing

### 👨‍💼 Admin Features
- **Timetable Management**: Create, edit, and manage class schedules
- **Teacher Management**: Add and manage teacher accounts
- **Leave Approval**: Review and approve/reject teacher leave requests
- **Visual Dashboard**: Beautiful cards showing system statistics
- **Responsive Tables**: Modern, interactive timetable display

### 👨‍🏫 Teacher Features
- **Personal Dashboard**: View personal schedule and statistics
- **Leave Requests**: Submit leave applications with reasons
- **Schedule Overview**: See upcoming classes and adjustments
- **Real-time Updates**: Get notified of schedule changes

### 🔐 Authentication System
- **Secure Login**: Role-based authentication (Admin/Teacher)
- **Password Recovery**: Email-based password reset with OTP
- **Session Management**: Secure session handling
- **Form Validation**: Client-side and server-side validation

## 🚀 Technology Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Authentication**: Express Sessions
- **Email**: Nodemailer for password reset
- **File Upload**: Multer for handling uploads

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd timetablesync
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URL=mongodb://localhost:27017
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Access the application**
   - Open your browser and go to `http://localhost:3000`
   - Default admin credentials: `admin` / `admin123`

## 🎯 Key Improvements Made

### 🎨 Visual Enhancements
- **Modern Color Scheme**: Professional gradient-based design
- **Enhanced Typography**: Better font choices and spacing
- **Smooth Animations**: Subtle hover effects and transitions
- **Card-based Layout**: Clean, organized information display
- **Modern Icons**: Emoji-based icons for better visual appeal

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Flexible Layouts**: CSS Grid and Flexbox for better responsiveness
- **Touch-Friendly**: Larger buttons and touch targets for mobile

### 🔧 User Experience
- **Loading States**: Visual feedback during operations
- **Toast Notifications**: Modern notification system
- **Form Validation**: Real-time validation with helpful messages
- **Keyboard Support**: Full keyboard navigation support

### ⚡ Performance
- **Optimized CSS**: Efficient selectors and minimal redundancy
- **Modern JavaScript**: ES6+ features for better performance
- **Lazy Loading**: Optimized resource loading

## 📁 Project Structure

```
timetablesync/
├── controllers/          # Business logic
├── models/              # Database models
├── routes/              # API routes
├── middleware/          # Custom middleware
├── public/              # Static files
│   ├── css/            # Stylesheets
│   ├── js/             # Client-side JavaScript
│   └── *.html          # Public pages
├── views/               # Protected pages
│   ├── css/            # View-specific styles
│   ├── js/             # View-specific scripts
│   └── *.html          # Dashboard pages
├── utils/               # Utility functions
├── uploads/             # File uploads
└── storedData/          # Data storage
```

## 🎨 Design System

### Colors
- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Success**: `#10b981` (Emerald)
- **Warning**: `#f59e0b` (Amber)
- **Danger**: `#ef4444` (Red)

### Typography
- **Font Family**: Inter, Segoe UI, system fonts
- **Headings**: 700 weight, proper spacing
- **Body**: 400 weight, 1.6 line height

### Spacing
- **Base Unit**: 0.25rem (4px)
- **Scale**: 4px, 8px, 16px, 24px, 32px, 48px, 64px

## 🔒 Security Features

- **Input Validation**: Comprehensive form validation
- **Session Security**: Secure session configuration
- **CORS Protection**: Proper CORS setup
- **Password Hashing**: Secure password storage
- **SQL Injection Prevention**: Mongoose ODM protection

## 🌟 Future Enhancements

- [ ] Real-time notifications with WebSocket
- [ ] Calendar integration
- [ ] Mobile app development
- [ ] Advanced reporting and analytics
- [ ] Multi-language support
- [ ] Theme customization
- [ ] Bulk operations for admin
- [ ] Advanced search and filtering

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Developer

Built with ❤️ for modern educational institutions.

---

**Note**: This application has been completely redesigned with modern UI/UX principles, responsive design, and enhanced user experience. The codebase is clean, well-organized, and follows current web development best practices.