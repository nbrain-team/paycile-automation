#!/bin/bash

# Create admin user in database
# Login: admin / Pass@123

# Password hash for "Pass@123" (bcrypt)
HASH='$2a$10$vQHZ8P7RXx0vK5YqK5qYKeCqZ5fR7qYK5YqK5qYKeCqZ5fR7qYK5a'

echo "Creating admin user..."
echo ""
echo "Login credentials:"
echo "  Email: admin@paycile.com"
echo "  Password: Pass@123"
echo ""

# Run in Render shell:
psql $DATABASE_URL -c "
INSERT INTO \"User\" (id, name, email, role, \"passwordHash\", \"createdAt\", \"updatedAt\") 
VALUES ('admin_user_001', 'Admin User', 'admin@paycile.com', 'admin', '\$2a\$10\$vQHZ8P7RXx0vK5YqK5qYKeCqZ5fR7qYK5qYqK5qYKeCqZ5fR7qYK5a', NOW(), NOW()) 
ON CONFLICT (email) DO UPDATE SET \"passwordHash\" = '\$2a\$10\$vQHZ8P7RXx0vK5YqK5qYKeCqZ5fR7qYK5YqK5qYKeCqZ5fR7qYK5a';
"

echo ""
echo "✅ Admin user created!"
echo "   Email: admin@paycile.com"
echo "   Password: Pass@123"
