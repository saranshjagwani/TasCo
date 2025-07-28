
# 📝 TasCo - Task Tracker App

TasCo is a full-stack task management app that allows users to register, log in, and manage personal tasks with due dates and statuses.

---

## 🔧 Tech Stack

### Frontend
- React (with hooks)
- React Router DOM
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MySQL
- JWT for authentication
- Bcrypt for password hashing
- Dotenv for environment config

---

## 📁 Folder Structure

```

TasCo/
├── client/        # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/        # Express backend
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── index.js
│   └── package.json

```

---

## ⚙️ Environment Setup

Both client and server use environment variables stored in `.env` files.  
You will find `.env.example` files in each folder with dummy values — copy and rename them to `.env`, and fill in the actual credentials.

### 📂 Example (server/.env)
```

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your\_mysql\_password
DB_NAME=task\_db
JWT_SECRET=your\_jwt\_secret
PORT=5000

````

---

## 🧪 MySQL Setup

1. Ensure MySQL is installed and running on your machine.
2. Create a database named `task_db` (or use the name you set in `.env`).
3. Run the following SQL to create the required table:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255),
  description TEXT,
  status ENUM('pending', 'completed') DEFAULT 'pending',
  due_date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
````

---

## 🚀 How to Run Locally

### 1. Clone the Repo

```bash
git clone https://github.com/saranshjagwani/TasCo.git
cd TasCo
```

---

### 2. Setup Backend

```bash
cd server
npm install
cp .env.example .env  # edit it with real values
npm start             # or node index.js
```

---

### 3. Setup Frontend

```bash
cd client
npm install
cp .env.example .env  # (optional, only if you're using env on frontend)
npm run dev
```

---

## ✅ Features

* 🔐 User authentication (Register/Login)
* ✅ JWT token-based login
* 🧠 Password hashing with bcrypt
* 📋 CRUD operations for tasks
* 🎨 Responsive UI with Tailwind
* 🔒 Tasks are user-specific

---

## 📬 API Endpoints

| Method | Endpoint         | Description           |
| ------ | ---------------- | --------------------- |
| POST   | `/api/register`  | Register a new user   |
| POST   | `/api/login`     | Login & get JWT token |
| GET    | `/api/tasks`     | Get user's tasks      |
| POST   | `/api/tasks`     | Create a new task     |
| PUT    | `/api/tasks/:id` | Update a task         |
| DELETE | `/api/tasks/:id` | Delete a task         |

---

## ✅ Git Best Practices Followed

* Meaningful commit messages
* `.env` and `node_modules` are ignored via `.gitignore`
* Clear folder structure for both client and server
* All dependencies included in `package.json`

---

## 👨‍💻 Author

**Saransh Jagwani**
[GitHub](https://github.com/saranshjagwani)

---

> 💡 Note: This app runs fully locally and is not deployed due to MySQL being system-specific. All instructions to run locally are included above.

