<div align="center">

# 📝 Mini Blog Platform

### A Modern Full-Stack Blogging Solution

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</p>

<p align="center">
  <strong>Create, share, and manage blog posts with a sleek, modern interface powered by the MERN stack</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation--setup">Installation</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-security">Security</a>
</p>

---

</div>

## ✨ Features

<table>
<tr>
<td width="50%">

### 🔐 Authentication
- ✅ User Registration & Login
- ✅ JWT-based authorization
- ✅ Secure password hashing (bcrypt)
- ✅ Protected routes & middleware
- ✅ Session management
- ✅ Logout functionality

</td>
<td width="50%">

### 📰 Blog Management
- ✅ Full CRUD operations
- ✅ Create & publish posts
- ✅ Edit your own content
- ✅ Delete posts
- ✅ Public post viewing
- ✅ Author-based search

</td>
</tr>
<tr>
<td width="50%">

### 🖼️ Media Support
- ✅ Image upload with Multer
- ✅ Thumbnail previews
- ✅ File type validation
- ✅ Optimized storage
- ✅ Multiple format support

</td>
<td width="50%">

### 🎨 Rich Content
- ✅ QuillJS rich text editor
- ✅ Formatted content support
- ✅ Modern, responsive UI
- ✅ shadcn/ui components
- ✅ Tailwind CSS styling
- ✅ Page-based pagination

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<div align="center">

### Frontend Technologies

| Technology | Description |
|:----------:|:-----------:|
| ⚛️ **React** | UI library with Vite for blazing-fast development |
| 🎨 **Tailwind CSS** | Utility-first CSS framework |
| 🎭 **shadcn/ui** | Beautiful, accessible component library |
| 🛣️ **React Router** | Client-side routing |
| 📡 **Axios** | HTTP client for API requests |
| 📝 **QuillJS** | Powerful rich text editor |

### Backend Technologies

| Technology | Description |
|:----------:|:-----------:|
| 🟢 **Node.js** | JavaScript runtime environment |
| 🚂 **Express.js** | Fast, minimalist web framework |
| 🍃 **MongoDB** | NoSQL database for data storage |
| 🔗 **Mongoose** | MongoDB object modeling |
| 🔐 **JWT** | Secure authentication tokens |
| 📤 **Multer** | File upload middleware |
| ✅ **Zod** | TypeScript-first schema validation |
| 🔒 **bcrypt** | Password hashing library |

</div>

---

## ⚙️ Installation & Setup

### 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

<!-- Installation Section -->
<div style="
  margin-top:40px;
  padding:25px;
  border:1px solid #e5e7eb;
  border-radius:10px;
  background:#ffffff;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
  font-family:Arial, sans-serif;
">



<p  style="color:#555; max-width:650px; margin:auto;">
Follow the steps below to set up the project locally for development and testing.
</p>

<hr style="margin:20px 0; border:none; border-top:1px solid #e5e7eb;" />

<!-- Step 1 -->
<h3>📥 Step 1: Clone the Repository</h3>

<pre style="
  background:#0f172a;
  color:#e5e7eb;
  padding:12px;
  border-radius:6px;
  overflow-x:auto;
">
git clone https://github.com/deep6001/Blog-app-.git
cd Blog-app-
</pre>

<!-- Step 2 -->
<h3 style="margin-top:25px;">🖥️ Step 2: Backend Setup</h3>

<details open style="margin-top:10px;">
<summary style="
  cursor:pointer;
  font-weight:600;
  padding:8px;
  background:#f3f4f6;
  border-radius:5px;
">
Click to expand backend instructions
</summary>

<div style="padding:15px;">

<p><b>Navigate to server directory</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:10px; border-radius:6px;">
cd backend
</pre>

<p><b>Install dependencies</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:10px; border-radius:6px;">
npm install
</pre>

<p><b>Create <code>.env</code> file</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:12px; border-radius:6px;">
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
</pre>

<p><b>Start backend server</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:10px; border-radius:6px;">
npm run dev
</pre>

<p style="margin-top:10px;">
🚀 Server runs on:
<b>http://localhost:5000</b>
</p>

</div>
</details>

<!-- Step 3 -->
<h3 style="margin-top:30px;">🎨 Step 3: Frontend Setup</h3>

<details open style="margin-top:10px;">
<summary style="
  cursor:pointer;
  font-weight:600;
  padding:8px;
  background:#f3f4f6;
  border-radius:5px;
">
Click to expand frontend instructions
</summary>

<div style="padding:15px;">

<p><b>Navigate to frontend directory</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:10px; border-radius:6px;">
cd ../frontend
</pre>

<p><b>Install dependencies</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:10px; border-radius:6px;">
npm install
</pre>

<p><b>Create <code>.env</code> file</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:12px; border-radius:6px;">
VITE_BASE_URL=http://localhost:3000
</pre>

<p><b>Start frontend server</b></p>

<pre style="background:#020617; color:#e5e7eb; padding:10px; border-radius:6px;">
npm run dev
</pre>

<p style="margin-top:10px;">
🎨 App runs on:
<b>http://localhost:5173</b>
</p>

</div>
</details>

</div>


</details>

---

## 🔗 API Endpoints

### Authentication Routes

<!-- Auth Routes -->
<h3 style="margin-top:20px;">🔐 Authentication Routes</h3>

<table 
  width="100%" 
  cellpadding="10" 
  cellspacing="0"
  style="
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
  "
>

<thead>
<tr style="background-color:#f3f4f6; text-align:left;">

<th width="15%" style="border:1px solid #e5e7eb; padding:10px;">
Method
</th>

<th width="35%" style="border:1px solid #e5e7eb; padding:10px;">
Endpoint
</th>

<th width="50%" style="border:1px solid #e5e7eb; padding:10px;">
Description
</th>

</tr>
</thead>

<tbody>

<tr style="background-color:#ffffff;">
<td style="border:1px solid #e5e7eb;"><code>POST</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/auth/register</code></td>
<td style="border:1px solid #e5e7eb;">Register a new user account</td>
</tr>

<tr style="background-color:#fafafa;">
<td style="border:1px solid #e5e7eb;"><code>POST</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/auth/login</code></td>
<td style="border:1px solid #e5e7eb;">Login existing user</td>
</tr>

<tr style="background-color:#ffffff;">
<td style="border:1px solid #e5e7eb;"><code>GET</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/auth/me</code></td>
<td style="border:1px solid #e5e7eb;">Get current user profile (protected)</td>
</tr>

<tr style="background-color:#fafafa;">
<td style="border:1px solid #e5e7eb;"><code>POST</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/auth/logout</code></td>
<td style="border:1px solid #e5e7eb;">Logout current user</td>
</tr>

</tbody>
</table>


<!-- Blog Routes -->
<h3 style="margin-top:40px;">📰 Blog Post Routes</h3>

<table 
  width="100%" 
  cellpadding="10" 
  cellspacing="0"
  style="
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    overflow: hidden;
  "
>

<thead>
<tr style="background-color:#f3f4f6; text-align:left;">

<th width="15%" style="border:1px solid #e5e7eb; padding:10px;">
Method
</th>

<th width="35%" style="border:1px solid #e5e7eb; padding:10px;">
Endpoint
</th>

<th width="50%" style="border:1px solid #e5e7eb; padding:10px;">
Description
</th>

</tr>
</thead>

<tbody>

<tr style="background-color:#ffffff;">
<td style="border:1px solid #e5e7eb;"><code>GET</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/posts</code></td>
<td style="border:1px solid #e5e7eb;">Get all blog posts (paginated)</td>
</tr>

<tr style="background-color:#fafafa;">
<td style="border:1px solid #e5e7eb;"><code>GET</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/posts/:id</code></td>
<td style="border:1px solid #e5e7eb;">Get a single post by ID</td>
</tr>

<tr style="background-color:#ffffff;">
<td style="border:1px solid #e5e7eb;"><code>POST</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/posts</code></td>
<td style="border:1px solid #e5e7eb;">Create a new post (protected)</td>
</tr>

<tr style="background-color:#fafafa;">
<td style="border:1px solid #e5e7eb;"><code>PUT</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/posts/:id</code></td>
<td style="border:1px solid #e5e7eb;">Update own post (protected)</td>
</tr>

<tr style="background-color:#ffffff;">
<td style="border:1px solid #e5e7eb;"><code>DELETE</code></td>
<td style="border:1px solid #e5e7eb;"><code>/api/posts/:id</code></td>
<td style="border:1px solid #e5e7eb;">Delete own post (protected)</td>
</tr>


</tbody>
</table>


### Request Examples

<details>
<summary><b>POST /api/auth/register</b></summary>

</details>

---

## 🔒 Security Features

<!-- Security Features Section -->
<div align="center" style="margin-top:10px;">

<p style="max-width:600px; color:#555; margin-bottom:20px;">
This application follows industry best practices to ensure data safety,
secure authentication, and protection against common vulnerabilities.
</p>

<div style="
  max-width:700px;
  background:#ffffff;
  border:1px solid #e5e7eb;
  border-radius:8px;
  padding:20px;
  box-shadow:0 2px 6px rgba(0,0,0,0.05);
">

<table
  width="100%"
  cellpadding="10"
  cellspacing="0"
  style="
    border-collapse:collapse;
    font-family:Arial, sans-serif;
  "
>

<thead>
<tr style="background:#f3f4f6; text-align:left;">

<th style="padding:12px; border-bottom:2px solid #e5e7eb;">
Feature
</th>

<th style="padding:12px; border-bottom:2px solid #e5e7eb;">
Implementation
</th>

</tr>
</thead>

<tbody>

<tr>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
🔐 <b>Authentication</b>
</td>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
JWT-based token authentication
</td>
</tr>

<tr style="background:#fafafa;">
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
🔑 <b>Password Security</b>
</td>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
bcrypt hashing with salt rounds
</td>
</tr>

<tr>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
🛡️ <b>Protected Routes</b>
</td>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
Middleware-based authorization
</td>
</tr>

<tr style="background:#fafafa;">
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
✅ <b>Input Validation</b>
</td>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
Zod schema validation
</td>
</tr>

<tr>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
📁 <b>File Upload Security</b>
</td>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
File type & size validation
</td>
</tr>

<tr style="background:#fafafa;">
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
🌐 <b>CORS Protection</b>
</td>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
Configured CORS policies
</td>
</tr>

<tr>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
🚫 <b>Injection Prevention</b>
</td>
<td style="padding:10px; border-bottom:1px solid #e5e7eb;">
MongoDB built-in protections
</td>
</tr>

<tr style="background:#fafafa;">
<td style="padding:10px;">
🔒 <b>XSS Protection</b>
</td>
<td style="padding:10px;">
Content sanitization
</td>
</tr>

</tbody>
</table>

</div>

</div>


---

## 📸 Screenshots

<div>

### 🏠 Home Page
> Clean, modern interface showcasing all blog posts

### ✍️ Rich Text Editor
> QuillJS editor with formatting toolbar

### 👤 User Dashboard
> Manage your posts with ease

### 🔐 Authentication
> Secure login and registration

</div>

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Deep Patel**

- GitHub: [@deep6001](https://github.com/deep6001)
- Repository: [Blog-app-](https://github.com/deep6001/Blog-app-)
- Live URL :-https://blog-app-x5td.vercel.app/

---

<div align="center">

### ⭐ Star this repository if you find it helpful!

**Made with ❤️ using the MERN Stack**

</div>
