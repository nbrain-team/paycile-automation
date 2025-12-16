# Paycile Admin Login Credentials

## ✅ Account Created Successfully

**Created:** December 16, 2025

---

## 🔐 Login Credentials

**Email:** `admin@paycile.com`  
**Password:** `Password#123`  
**Role:** `admin`

---

## 🌐 Access URLs

### Frontend (Web App)
**URL:** https://paycile-automation.onrender.com

### Backend API
**URL:** https://opticwise-backend-uq3o.onrender.com

### Health Check
**URL:** https://opticwise-backend-uq3o.onrender.com/health

---

## 🔑 API Authentication

### Login Endpoint
```bash
POST https://opticwise-backend-uq3o.onrender.com/api/auth/login
```

### Request Body
```json
{
  "email": "admin@paycile.com",
  "password": "Password#123"
}
```

### Response (Successful)
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "cmj8ynmkg0000c20bu7hqt6c7",
    "name": "Admin",
    "email": "admin@paycile.com",
    "role": "admin"
  }
}
```

### Using the Token
Include the token in subsequent API requests:
```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📊 User Details

- **User ID:** `cmj8ynmkg0000c20bu7hqt6c7`
- **Name:** Admin
- **Email:** admin@paycile.com
- **Role:** admin (full permissions)
- **Created:** 2025-12-16T19:13:33.174Z

---

## 🧪 Test Login (curl)

```bash
curl -X POST https://opticwise-backend-uq3o.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@paycile.com",
    "password": "Password#123"
  }'
```

---

## 🔧 Admin Capabilities

As an admin user, you have access to:
- ✅ All campaigns
- ✅ All contacts
- ✅ All conversations/messages
- ✅ User management
- ✅ Campaign creation and editing
- ✅ Template management
- ✅ System settings
- ✅ Analytics and reports

---

## 🔄 Password Change

If you need to change the password later, you can:

### Option 1: Via API (if endpoint exists)
```bash
PUT /api/users/cmj8ynmkg0000c20bu7hqt6c7
```

### Option 2: Via Script
Run the `create-admin-user.js` script again with a new password:
```bash
cd apps/server
node create-admin-user.js
```

### Option 3: Direct Database Update
```sql
UPDATE "User" 
SET "passwordHash" = '[new-bcrypt-hash]'
WHERE email = 'admin@paycile.com';
```

---

## 🗄️ Database Access

If you need direct database access:

**Database:** paycile_automation_db  
**Internal URL:** 
```
postgresql://paycile_automation_db_user:1H0KFp9XLNvcanTHE1aGop7CQY8SsUSf@dpg-d4eca47gi27c73ck9pvg-a/paycile_automation_db
```

**External URL:**
```
postgresql://paycile_automation_db_user:1H0KFp9XLNvcanTHE1aGop7CQY8SsUSf@dpg-d4eca47gi27c73ck9pvg-a.oregon-postgres.render.com/paycile_automation_db
```

---

## 📝 Notes

- Password is hashed with bcrypt (10 rounds)
- JWT token expires in 7 days
- Admin role has full system access
- User was created via API endpoint: `POST /api/users`

---

## ⚠️ Security Recommendations

1. **Change the password** after first login
2. Consider using a stronger password for production
3. Enable 2FA if the system supports it
4. Rotate the JWT secret periodically
5. Monitor admin login activity

---

**Ready to use! Login at:** https://paycile-automation.onrender.com

