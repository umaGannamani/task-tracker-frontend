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