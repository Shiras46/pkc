# Admin Panel Issues & Todo List

## Current Implementation Status
The Admin Panel is currently functional for prototype/demo purposes but has several issues that need to be addressed for a production environment.

### 1. Persistence & Database
- **Issue:** The application uses a local JSON file (`src/lib/db.json`) for data storage.
- **Problem:** In serverless environments (like Vercel), the filesystem is ephemeral. Data saved to `db.json` will be lost when the server restarts or redeploys.
- **Solution:** Migrate to a cloud database (PostgreSQL via Supabase/Neon, or MongoDB via Atlas). Use an ORM like Prisma or Drizzle.

### 2. Authentication Security
- **Issue:** Authentication relies on a client-side cookie (`admin_session`) set via `document.cookie`.
- **Problem:** This is vulnerable to XSS and easy to bypass by manually setting the cookie in the browser console.
- **Solution:** Implement server-side session management (NextAuth.js or custom JWT in HttpOnly cookies).

### 3. Image Management
- **Issue:** Blog posts and services currently lack an image upload feature in the Admin Panel.
- **Problem:** Images must be manually placed in the public folder.
- **Status:** Added local file upload to `public/uploads` (Works locally, ephemeral on serverless).
- **Solution:** Integrated Cloudinary or AWS S3 upload widget in the Admin forms.

### 4. Admin UI/UX
- **Issue:** Lists (Blogs) can become cluttered.
- **Problem:** Lack of pagination, search, or filtering makes managing many items difficult.
- **Solution:** Implement server-side pagination and search filters.
- **Status:** Added text-overflow protection to lists. Improved Delete interaction (UI confirm).

### 5. Services Management
- **Issue:** Services content is hardcoded in `src/lib/data.ts`.
- **Problem:** Admin cannot update prices, descriptions, or add new services without a developer.
- **Solution:** Move Services data to the Database and create a CRUD interface in the Admin Panel similar to Blogs.

### 6. Enquiries Management
- **Status:** Implemented basic listing page and functional "Get a Quote" form.
- **ToDo:** Add "Mark as Read" / "Archive" functionality.
