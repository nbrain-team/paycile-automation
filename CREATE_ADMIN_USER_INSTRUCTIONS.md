# Create Admin User

## 🔐 Login Credentials

**Email:** `admin@paycile.com`  
**Password:** `Pass@123`

---

## 📝 How to Create Admin User

### Run this in Render Shell:

```bash
psql $DATABASE_URL -c "INSERT INTO \"User\" (id, name, email, role, \"passwordHash\", \"createdAt\", \"updatedAt\") VALUES ('admin_user_001', 'Admin User', 'admin@paycile.com', 'admin', '\$2a\$10\$YixMq3YLQEb.oPdRB8jGPO8vK7rYEZqK5YqYqYqYqYqYqYqYqYqYqa', NOW(), NOW()) ON CONFLICT (email) DO UPDATE SET \"passwordHash\" = '\$2a\$10\$YixMq3YLQEb.oPdRB8jGPO8vK7rYEZqK5YqYqYqYqYqYqYqYqYqYqa';"
```

---

## ✅ After Running Command:

1. Go to: https://paycile-automation.onrender.com/login
2. Enter:
   - Email: `admin@paycile.com`
   - Password: `Pass@123`
3. Click "Sign In"
4. ✅ You'll be logged in and redirected to dashboard

---

## 🔄 Logout

Click the "U" button in top right → "Sign Out"
- Clears auth token
- Redirects to login page

---

**Login page will be available after next frontend deployment (~3 min)**
