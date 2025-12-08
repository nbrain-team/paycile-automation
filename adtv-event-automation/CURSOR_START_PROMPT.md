# 🚀 Cursor AI Project Initialization Prompt

## Copy and paste this entire prompt into Cursor AI to get started with your new project

---

**CURSOR AI PROMPT:**

```
I'm starting a new project based on the ADTV Event Automation Platform. This is a full-stack TypeScript application for multi-channel event marketing automation with the following tech stack:

**Backend:**
- Node.js + Express + TypeScript
- PostgreSQL + Prisma ORM
- SMS (Twilio/Bonzo), Email (SMTP/Gmail), Voicemail (ElevenLabs + Slybroadcast)
- AI response generation (Google Gemini)
- JWT authentication with bcrypt

**Frontend:**
- React 18 + TypeScript + Vite
- Tailwind CSS + custom design system
- React Router + Zustand state management
- ReactFlow for visual workflow builder
- Chart.js for analytics

**Current Status:**
I have all the base files copied to my project directory in the `apps/` folder structure.

**What I need help with:**

1. Review the current setup in `apps/server` and `apps/web`
2. Help me configure my `.env` file with proper environment variables
3. Ensure the database schema is ready (Prisma)
4. Help me start the development environment successfully
5. Guide me through testing that everything works

**Project Goals:**
[DESCRIBE YOUR SPECIFIC USE CASE - For example:]
- I want to use this for [your event type/industry]
- I need to customize [specific features]
- I plan to deploy on [Render/other platform]

**Current Issues (if any):**
[DESCRIBE ANY ERRORS OR PROBLEMS YOU'RE FACING]

**Next Steps I'm Ready For:**
1. Environment setup and validation
2. Database initialization
3. First successful local run
4. Basic customization guidance

Please guide me through the setup process step-by-step, explaining what each configuration does and why it's needed. I want to understand the architecture as I set it up.
```

---

## Alternative Focused Prompts

### For Quick Setup (Experienced Developers)

```
I have the ADTV platform codebase in `apps/`. Tech stack: Node/Express/Prisma backend, React/Vite frontend.

Quick setup needed:
1. Validate my .env configuration
2. Initialize PostgreSQL database
3. Start dev servers
4. Confirm everything works

Here's my current .env:
[PASTE YOUR .ENV CONTENTS]

What am I missing and what should I check?
```

### For Deployment Focus

```
I have the ADTV Event Automation Platform ready to deploy to Render.

Current setup:
- Backend: apps/server (Node + Express + Prisma)
- Frontend: apps/web (React + Vite)
- Database: PostgreSQL needed

Help me:
1. Configure Render services correctly
2. Set up environment variables for production
3. Handle database migrations
4. Configure build commands
5. Troubleshoot deployment issues

I'm ready to create the Render services now. Walk me through the process.
```

### For Customization Focus

```
I have the ADTV platform running locally and want to customize it for [YOUR USE CASE].

Current working features:
- Campaign management ✓
- Multi-channel messaging ✓
- Visual workflow builder ✓

What I want to customize:
1. [Your customization #1]
2. [Your customization #2]
3. [Your customization #3]

Help me:
- Understand the architecture to make these changes safely
- Identify which files to modify
- Add new database models if needed
- Create new API endpoints
- Build new UI components

Let's start with customization #1. What do I need to modify?
```

### For Learning/Understanding

```
I'm exploring the ADTV Event Automation Platform codebase to learn modern full-stack development.

Tech stack I'm learning:
- TypeScript (both frontend and backend)
- Prisma ORM
- React with hooks
- RESTful API design
- Multi-service integrations (Twilio, Gmail, AI)

I want to understand:
1. Overall architecture and data flow
2. How campaigns and workflows are executed
3. How multi-channel messaging works
4. Integration patterns with third-party APIs
5. Frontend state management approach

Can you give me a guided tour of the codebase, explaining:
- Key files and their purposes
- Design patterns used
- Best practices demonstrated
- How the pieces fit together

Let's start with [specific area you're interested in: backend routing / database schema / frontend components / etc.]
```

---

## 💡 Tips for Working with Cursor AI on This Project

### 1. **Be Specific About Your Environment**

Good:
> "I'm on macOS, using pnpm 10.12.4, Node 20.x, and PostgreSQL 14. When I run `pnpm dev` in apps/server, I get error: [paste error]"

Bad:
> "It's not working"

### 2. **Share Relevant Code/Errors**

Always include:
- Full error messages
- Relevant code snippets
- File paths
- What you've already tried

### 3. **Ask for Explanations**

> "Before we make this change, can you explain why we're doing it this way and what the alternatives are?"

### 4. **Request Step-by-Step Guidance**

> "Can you break this down into individual steps I can execute one at a time?"

### 5. **Validate Understanding**

> "Let me summarize what I understand: [your summary]. Is that correct?"

---

## 📋 Common Cursor AI Questions for This Project

### Environment Setup
- "Help me set up my .env file with explanations for each variable"
- "Which environment variables are required vs optional?"
- "How do I get API keys for [Twilio/Google/ElevenLabs]?"

### Database
- "Walk me through initializing the Prisma database"
- "How do I add a new table to the schema?"
- "My database connection is failing, how do I debug it?"

### Development
- "The backend won't start, here's the error: [paste error]"
- "How do I add a new API endpoint?"
- "I want to add a new page to the frontend, what files do I modify?"

### Customization
- "How do I change the color scheme?"
- "I want to add a new node type to the workflow builder"
- "How do I modify the campaign creation form?"

### Deployment
- "Help me configure my Render services"
- "My build is failing on Render with this error: [paste error]"
- "How do I run database migrations in production?"

### Debugging
- "I'm getting a CORS error, how do I fix it?"
- "The frontend can't connect to the backend in production"
- "Email sending isn't working, how do I troubleshoot?"

---

## 🎯 Goal-Oriented Prompts

### Goal: Get Running Locally ASAP

```
Quick start goal: Get the ADTV platform running locally in the next 30 minutes.

What I have:
- Files copied to project directory
- pnpm installed
- PostgreSQL installed and running

What I need:
- Fastest path to seeing the UI
- Minimal viable .env configuration
- Skip optional integrations for now

Walk me through the absolute minimum steps to see this running.
```

### Goal: Deploy to Production

```
Deployment goal: Get this running on Render by end of today.

I have:
- GitHub repo set up
- Render account ready
- Domain name (optional): [your domain]

Need help with:
- Creating the three Render services (DB, backend, frontend)
- Environment variable configuration
- Build command optimization
- Post-deployment verification

Let's start with the database setup.
```

### Goal: Understand Before Customizing

```
Learning goal: Understand the architecture deeply before I start customizing.

I learn best by:
- Tracing user actions through the code
- Understanding data flow
- Seeing examples of each pattern

Walk me through:
1. What happens when a user creates a campaign?
2. How does a multi-channel message get sent?
3. How are AI responses generated?

Use actual file paths and code examples from the project.
```

---

## 🔄 Iterative Development Prompts

### Iteration 1: Basic Setup
> "Let's get the basic platform running with minimal features. No integrations yet."

### Iteration 2: Add Integrations
> "Now that basics work, let's add Twilio SMS integration step by step."

### Iteration 3: Customize
> "With SMS working, let's customize the campaign form for my use case."

### Iteration 4: Polish
> "Everything works. Now let's improve the UI and add error handling."

### Iteration 5: Deploy
> "Ready for production. Let's deploy to Render with proper monitoring."

---

## ✅ Success Validation Prompts

After each major step:

```
I just completed [setup step]. Can you help me verify it worked correctly?

What should I check to confirm:
- [Feature/setup] is working
- No errors are present
- Configuration is correct

Give me specific commands to run or URLs to test.
```

---

**Remember**: Cursor AI works best when you:
1. Provide context about what you're trying to achieve
2. Share relevant code and errors
3. Ask for explanations, not just solutions
4. Validate each step before moving forward
5. Build incrementally rather than trying to do everything at once

**Good luck with your project! 🚀**

