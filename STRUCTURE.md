# 📁 ScheduleSync Project Structure

## 🏗️ **Clean & Organized Structure**

```
ScheduleSync/
├── 📁 controllers/          # Business logic controllers
│   ├── authcontroller.js    # Authentication & user management
│   ├── leavecontroller.js   # Leave request management
│   ├── lecturecontroller.js # Lecture/timetable management
│   └── teachercontroller.js # Teacher-specific operations
│
├── 📁 models/               # MongoDB data models
│   ├── usermodel.js         # User schema (admin/teacher)
│   ├── lecturemodel.js      # Lecture/timetable schema
│   ├── leavemodel.js        # Leave request schema
│   └── Otp.js              # OTP verification schema
│
├── 📁 routes/               # API route definitions
│   ├── auth.js             # Main authentication routes
│   ├── OtpRoutes.js        # OTP verification routes
│   └── reset-password.js   # Password reset routes
│
├── 📁 public/               # Static frontend files
│   ├── 📁 css/
│   │   └── style.css       # Main stylesheet
│   ├── 📁 js/
│   │   ├── login.js        # Login page scripts
│   │   └── signup.js       # Signup page scripts
│   ├── login.html          # Login page
│   ├── signup.html         # Teacher registration
│   ├── forgotpassword.html # Password recovery
│   └── reset-password.html # Password reset
│
├── 📁 views/                # Protected dashboard pages
│   ├── 📁 js/
│   │   ├── admin.js        # Admin dashboard scripts
│   │   ├── dashboard.js    # Teacher dashboard scripts
│   │   └── teacher.js      # Teacher-specific scripts
│   ├── admin.html          # Admin dashboard
│   ├── dashboard.html      # Teacher dashboard
│   └── teacher.html        # Teacher schedule view
│
├── 📁 utils/                # Utility functions
│   └── sendEmail.js        # Email sending utilities
│
├── 📁 uploads/              # File upload directory
│
├── 📁 middleware/           # Custom middleware (empty - ready for future)
│
├── 📄 server.js             # Main server file
├── 📄 package.json          # Dependencies & scripts
├── 📄 .env.example          # Environment variables template
├── 📄 .gitignore           # Git ignore rules
└── 📄 README.md            # Project documentation
```

## 🔒 **Security Features**

### ✅ **Implemented Security:**
- **Session Management**: Secure session configuration with httpOnly cookies
- **CORS Protection**: Restricted origins and methods
- **Input Validation**: Server-side validation for all inputs
- **MongoDB Integration**: No SQL injection vulnerabilities
- **Environment Variables**: Sensitive data in .env files
- **Route Protection**: Session-based authentication for protected routes

### 🛡️ **Security Best Practices:**
- **No Hardcoded Secrets**: All sensitive data in environment variables
- **Clean File Structure**: No unnecessary files or exposed data
- **Proper Error Handling**: No sensitive information in error messages
- **Database Security**: MongoDB connection with proper authentication

## 🚀 **Performance Optimizations**

### ⚡ **Fast Loading:**
- **Inline CSS**: Critical styles inline for faster rendering
- **Minimal Dependencies**: Only essential packages included
- **Optimized Images**: No large image files
- **Clean Code**: Removed all unused files and imports

### 📱 **Responsive Design:**
- **Mobile-First**: Optimized for all screen sizes
- **Modern CSS**: CSS Grid and Flexbox for layouts
- **Touch-Friendly**: Large buttons and touch targets

## 🗂️ **File Organization**

### 📋 **Removed Files:**
- ❌ Old HTML files (login.html, signup.html, etc.)
- ❌ Unused text files (user.txt, lectures.txt, leave.txt)
- ❌ Redundant route files (teacherRoutes.js, pagesRoutes.js)
- ❌ Unused utilities (fileHandler.js)
- ❌ Test files (test-server.js)

### ✅ **Clean Structure:**
- ✅ Single source of truth for each feature
- ✅ Consistent naming conventions
- ✅ Logical folder organization
- ✅ No duplicate or redundant files

## 🔧 **Environment Setup**

### 📝 **Required Environment Variables:**
```env
MONGO_URL=mongodb://localhost:27017
SESSION_SECRET=your-secret-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=3000
NODE_ENV=development
```

### 🚀 **Quick Start:**
```bash
npm install
cp .env.example .env
# Edit .env with your values
npm start
```

## 📊 **Database Schema**

### 👤 **Users Collection:**
- username (email)
- password
- role (admin/teacher)
- otp & otpExpiry (for password reset)

### 📚 **Lectures Collection:**
- teacher
- subject
- room
- day
- period
- startTime
- endTime
- isDone

### 📝 **Leave Requests Collection:**
- teacher
- day
- reason
- status (pending/approved/rejected)

This structure is now clean, secure, and production-ready! 🎉