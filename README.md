# 🚀 Urban Booking Management System

This project is a web-based booking system designed to manage appointments with skilled carpenters. It supports user authentication, real-time slot availability, and booking management.

---

## ✅ Project Folder Structure

I have inlcuded both a custom and a plain format of my postgreSQL database. I have done this using DBeaver and took backup of the database.

```
urban-booking-management/
├── app/
├── components/
├── prisma/
├── database/
│   ├── urban_booking.backup   # PostgreSQL Dump File
│   └── urban_booking.sql      # Plain SQL File
├── .env
├── README.md
└── package.json
```

##  Database Setup Instructions

###  1. PostgreSQL Setup

###  2. Database Restoration

#### **Option 1: Restore from `.dump` File**

1. **Create an empty database:**
   ```bash
   createdb urban_booking
   ```

2. **Restore the database:**
   ```bash
   pg_restore -U postgres -d urban_booking -v database/urban_booking.backup
   ```

---

#### **Option 2: Restore from `.sql` File**

1. **Create an empty database:**
   ```bash
   createdb urban_booking
   ```

2. **Restore the SQL file:**
   ```bash
   psql -U postgres -d urban_booking -f database/urban_booking.sql
   ```

---

### ✅ 3. Update the `.env` File

After restoring the database, update the `.env` file with your PostgreSQL credentials:

```bash
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/urban_booking
```

**Example:**
```bash
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/urban_booking
```

---

### ✅ 4. Apply Prisma Migrations

```bash
npx prisma migrate deploy
```

(Optional) To open Prisma Studio and verify data:
```bash
npx prisma studio
```

---

## ⚡ Running the Application

```bash
npm install
npm run dev
```

## ✅ Features

- User Authentication (Login/Signup)
- Real-time Slot Availability
- Booking Management (Create, Confirm, Cancel)
- PostgreSQL Database Integration

---

## 📞 Support

If you encounter issues, feel free to reach out!
https://github.com/Mayank2930/urban_booking_management -> github repository link
I may deploy this project, so check out the repository for any updates!

