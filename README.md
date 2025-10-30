# 🧠 Task Tracker Frontend

This is the **frontend** of the “Task Tracker with Smart Insights” web application.  
It is built using **React.js** and communicates with the Node.js backend through RESTful APIs.

---

## 🚀 Features

✅ Add, edit, and delete tasks  
✅ Filter by **status**, **priority**, and **search by title**  
✅ Smart “Insights” panel showing summary statistics  
✅ Fully responsive UI  
✅ Integrated with deployed backend

---

## 🌐 Backend API URL

Update this constant inside `App.js` if needed:
```js
const backendUrl = "https://backend-1p5d.onrender.com";
## Project Structure
frontend/
│
├── src/
│   ├── components/
│   │   ├── FilterBar.js
│   │   ├── TaskList.js
│   │   ├── TaskForm.js
│   │   └── InsightsPanel.js
│   │
│   ├── App.js
│   ├── App.css
│   └── index.js
│
├── public/
│   ├── index.html
│
└── package.json
⚙️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/<your-username>/task-tracker.git
cd task-tracker/frontend

2️⃣ Install Dependencies
npm install

3️⃣ Run the App
npm start


Your frontend will start at
👉 http://localhost:3000

Make sure the backend is also running or deployed.

🧠 Smart Insights

The frontend automatically computes a summary using the fetched tasks:

Total Open Tasks

Due Soon Tasks

Completed Tasks

Most Common Priority

Displayed dynamically inside the InsightsPanel.

🧰 Tech Stack
Category	Technology
Frontend Framework	React.js
Styling	CSS (custom)
Icons	react-icons
State Management	React useState & useEffect
Communication	Fetch API
🧑‍💻 Developer Notes

All API calls are centralized through backendUrl in App.js.

TaskForm handles both add and edit logic.

InsightsPanel uses simple aggregation logic to summarize task data.

The UI is kept minimal for performance and clarity.

📦 Build for Production
npm run build


The optimized static files will be created inside the build/ folder.


🧩 Troubleshooting

If tasks don’t load, check your backend URL (backendUrl in App.js).

Ensure CORS is enabled in your backend.

Re-run build if deployment paths change.

🏁 Deployment

You can deploy this React app easily using:

Vercel

Netlify

GitHub Pages

Ensure your backend API is accessible from the deployed domain.

---

## 📜 **`DECLARATION.md`**

```markdown
# 🧾 Declaration of Original Work

I confirm that all the code and logic in this submission were written entirely by me without the use of AI tools (including ChatGPT, GitHub Copilot, or similar code-generation software).

I have not copied code or logic from any other person or repository.

All design decisions, implementation steps, and code were created through my own understanding and effort.

---

🧱 notes.md
# 🧠 Design Notes — Task Tracker with Smart Insights

This document explains the reasoning behind the schema, backend logic, and frontend structure.

---

## 🧩 Database Schema

### Table: `tasks`

| Field | Type | Description |
|--------|------|-------------|
| id | INTEGER (Primary Key, Auto Increment) | Unique identifier for each task |
| title | TEXT | Task title |
| description | TEXT | Details about the task |
| priority | TEXT | One of: Low / Medium / High |
| status | TEXT | One of: Open / In Progress / Done |
| due_date | TEXT / DATE | Deadline for the task |
| created_at | DATETIME | Timestamp when task was created |

**Indexes:**
- Indexed on `priority` and `status` for faster filtering.

---

## 🧠 Insight Logic (Rule-Based Summary)

Insights are computed dynamically in the frontend:
- **Total Open Tasks** → tasks not marked as “Done”.
- **Due Soon Tasks** → tasks due within the next 3 days.
- **Completed Tasks** → tasks with status “Done”.
- **Priority Summary** → calculates which priority (Low/Medium/High) is most frequent.

Example generated summary:
> “Most tasks are High priority and due soon.”

---

## 🧰 Backend Design Highlights

- REST API endpoints:
  - `GET /tasks` → fetch all tasks
  - `POST /tasks` → create new task
  - `PUT /tasks/:id` → update a task
  - `DELETE /tasks/:id` → delete a task
- Error handling and CORS included.
- Database: SQLite (lightweight and serverless).

---

## 🖥 Frontend Architecture

- **React Components**
  - `App.js` → main controller and router.
  - `FilterBar.js` → search and filter tasks.
  - `TaskList.js` → display tasks in grid layout.
  - `TaskForm.js` → add/edit tasks.
  - `InsightsPanel.js` → shows computed insights.

**State Management:** React hooks (`useState`, `useEffect`)

**Styling:** CSS Grid + Flexbox (fully responsive)

---
