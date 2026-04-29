ProFlow is a task management tracker for software projects.

Overview
It support two types of projects

| **type**   | **visibility** | **use case**                                     |
| ---------- | -------------- | ------------------------------------------------ |
| OpenSource | Public         | Community-driven projects, external contributors |
| Private    | Invite-only    | Internal team only, proprietary work             |

Core Concepts
Project Roles

| Role   | Permission                                                                     |
| ------ | ------------------------------------------------------------------------------ |
| owner  | Full Control, can delete project, manage all members, change settings          |
| Admin  | can manage members , edit project settings, create/edit/delete any task        |
| Editor | Can create/edit tasks, assign tasks, add comments, move tasks through workflow |
| viewer | can view tasks, add comments, cannot modify tasks or project settings          |

Task LifeCycle (workflow)

```
Backlog → To Do → In Progress → In Review → Done → Archived
                              (can move backwards too)
```

### Task Structure

```
Task
├── Subtasks (checklist items)
├── Dependencies (blocks / blocked by)
├── Comments (with @mentions)
├── Time logs
└── Activity history
```

---

## Features

| Feature               | Description                                                                     |
| --------------------- | ------------------------------------------------------------------------------- |
| **Project Templates** | Pre-built setups: "Sprint Cycle", "Bug Triage", "Open Source Library", "Custom" |
| **Notifications**     | In-app, email, and webhook alerts for assignments, @mentions, status changes    |
| **Time Tracking**     | Estimated vs. actual hours per task and project                                 |
| **Activity Log**      | Full audit trail of who changed what and when                                   |
| **@Mentions**         | Tag users in comments to notify them                                            |
| **Due Dates**         | Task deadlines with overdue indicators                                          |
| **Priority Levels**   | Low, Medium, High, Critical                                                     |
| **Labels/Tags**       | Custom categorization (e.g., "bug", "feature", "good first issue")              |
| **Search & Filter**   | Find tasks by assignee, status, label, due date                                 |
| **Dashboard**         | Project health metrics, velocity charts, burn down                              |
| **Integrations**      | GitHub/GitLab sync, Slack/Discord webhooks, Calendar export                     |
|                       |                                                                                 |

---

## Data Model

### Entity Relationship

```mermaid
erDiagram
    USER ||--o{ PROJECT : "owns"
    USER ||--o{ PROJECT-MEMBER : "is a member of"
    USER ||--o{ TASK : "is assigned to"
    USER ||--o{ COMMENT : "writes"
    USER ||--o{ TIME-LOG : "logs time"
    USER ||--o{ NOTIFICATION : "receives"
    USER ||--o{ ACTIVITY-LOG : "triggers"

    PROJECT ||--o{ PROJECT-MEMBER : "has"
    PROJECT ||--o{ TASK : "contains"
    PROJECT ||--o{ ACTIVITY-LOG : "logs events"
    PROJECT ||--o{ NOTIFICATION : "relates to"
    PROJECT }|--|| TEMPLATE : "uses"

    TASK ||--o{ SUBTASK : "has"
    TASK ||--o{ COMMENT : "has"
    TASK ||--o{ TIME-LOG : "has"
    TASK ||--o{ ACTIVITY-LOG : "logs changes"
    TASK ||--o{ NOTIFICATION : "relates to"
    TASK ||--o{ TASK-DEPENDENCY : "blocks/blocked by"

    TEMPLATE ||--o{ PROJECT : "defines"

    USER {
        uuid id PK
        string username
        string email
        text avatar_url
        timestamp created_at
    }

    PROJECT {
        uuid id PK
        uuid owner_id FK
        string name
        text description
        string visibility
        string template_id
        timestamp created_at
    }

    PROJECT-MEMBER {
        uuid project_id PK, FK
        uuid user_id PK, FK
        string role
        timestamp joined_at
    }

    TASK {
        uuid id PK
        uuid project_id FK
        string title
        text description
        string status
        string priority
        uuid assignee_id FK
        date due_date
        decimal estimated_hours
        decimal logged_hours
        uuid parent_task_id FK
        timestamp created_at
        timestamp updated_at
    }

    TEMPLATE {
        uuid id PK
        string name
        string category
        text description
        jsonb config
        boolean is_system
        boolean is_active
        timestamp created_at
    }

    SUBTASK {
        uuid id PK
        uuid task_id FK
        string title
        boolean is_completed
        timestamp created_at
    }

    COMMENT {
        uuid id PK
        uuid task_id FK
        uuid author_id FK
        text body
        timestamp created_at
    }

    TIME-LOG {
        uuid id PK
        uuid task_id FK
        uuid user_id FK
        decimal hours
        date log_date
        timestamp created_at
    }

    ACTIVITY-LOG {
        uuid id PK
        uuid project_id FK
        uuid task_id FK
        uuid actor_id FK
        string action
        jsonb details
        timestamp created_at
    }

```
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ User        │ │ Project     │ │ Task        │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ id          │◄┤ owner_id    │◄┤ project_id  │
│ username    │ │ name        │ │ title       │
│ email       │ │ visibility  │ │ description │
│ avatar_url  │ │ template_id │ │ status      │
│ created_at  │ │ created_at  │ │ priority    │
└─────────────┘ └─────────────┘ │ assignee_id │
                              ▲ │ due_date    │
                              │ │ estimated_hr│
         │┌─────────────┐       │ logged_hr   │
  └───────┤ Comment     │       │ parent_id   │
         ├─────────────┤        │ blocked_by  │
         │ id          │        │ created_at  │
         │ task_id     │        │ updated_at  │
         │ author_id   │        └─────────────┘
         │ body        │              ▲
         │ mentions    │              │
         │ created_at  │ ┌────────────┴─────────┐
         └─────────────┘ │ Subtask              │
                           ├────────────────────┤
                           │ id                 │
                           │ task_id            │
                           │ title              │
                           │ is_completed       │
                           └────────────────────┘

┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ProjectMember│ │ActivityLog  │ │ TimeLog     │
├─────────────┤ ├─────────────┤ ├─────────────┤
│ project_id  │ │ id          │ │ id          │
│ user_id     │ │ project_id  │ │ task_id     │
│ role        │ │ task_id     │ │ user_id     │
│ joined_at   │ │ actor_id    │ │ hours       │
└─────────────┘ │ action      │ │ date        │
                │ details     │ └─────────────┘
                │ created_at  │
                └─────────────┘

┌─────────────┐
│ Template    │
├─────────────┤
│ id          │
│ name        │
│ category    │
│ description │
│ config      │
│ is_system   │
│ is_active   │
│ created_at  │
└─────────────┘
```