# Dashboard Data Fetching Guide

## Overview
I've implemented a complete authentication context system that automatically manages user data after login/registration and makes it available throughout your app.

## What Changed

### 1. **AuthContext** (`app/context/AuthContext.tsx`) - NEW
Global state management for user authentication:
- Stores JWT token and user data
- Persists data to localStorage automatically
- Provides `useAuth()` hook for any component

### 2. **Updated Files**

#### `app/layout.tsx` - UPDATED
- Added `AuthProvider` wrapper to make auth available globally
- All components can now use `useAuth()` hook

#### `app/logins/user/page.tsx` - UPDATED
- Fixed endpoint from `localhost:3000/auth/login` → `localhost:3001/login_user`
- Now saves token and user data via `login()` function
- Redirects to `/dash/user` after successful login

#### `app/serial/page.tsx` - UPDATED
- Now saves token and user data after email verification
- Uses `login()` from auth context to persist data

#### `app/dash/user/page.tsx` - UPDATED
- Uses `useAuth()` to access user data
- Redirects to login if not authenticated
- Displays user's full name in navbar
- Updated logout to use context

## How to Use in Components

### Access User Data
```tsx
import { useAuth } from '@/app/context/AuthContext';

export default function MyComponent() {
  const { user, token, logout } = useAuth();
  
  return (
    <div>
      <p>Email: {user?.email}</p>
      <p>Name: {user?.fullName}</p>
      <p>ID: {user?.userId}</p>
    </div>
  );
}
```

### User Data Structure
```typescript
interface User {
  userId: number;
  email: string;
  fullName: string;
  serialCode: string;
  serialCodeExpiresAt: string;
}
```

### Available Auth Functions
```tsx
const { user, token, login, logout, setUserData, isLoading } = useAuth();

// login(token, userData) - Save token and user after login/registration
// logout() - Clear user and token
// setUserData(userData) - Update user data
// isLoading - Boolean to check if auth state is loading
```

## Data Flow

### Registration Flow
1. User fills registration → stored in memory on backend
2. User enters verification code → verified in DB, token generated
3. Backend returns `{token, user}` 
4. `serial/page.tsx` calls `login()` → saves to auth context
5. User redirected to dashboard with data already available

### Login Flow
1. User enters credentials → sent to `/login_user`
2. Backend authenticates and returns `{token, user}`
3. `logins/user/page.tsx` calls `login()` → saves to auth context
4. User redirected to `/dash/user` with data already available

## Protected Routes

To prevent unauthorized access, add this check to dashboards:
```tsx
useEffect(() => {
  if (!isLoading && !user) {
    router.push('/logins/user');
  }
}, [user, isLoading, router]);
```

## Similar Updates Needed For

You'll want to apply the same pattern to:
- `app/logins/lawyer/page.tsx` - Update endpoint and use login()
- `app/logins/admin/page.tsx` - Update endpoint and use login()
- `app/dash/lawyers/page.tsx` - Add useAuth() for data
- `app/dash/admin/page.tsx` - Add useAuth() for data

## API Endpoints Expected

**Backend should have:**
- `POST /login_user` - Returns `{token, user}`
- `POST /verify_user` - Returns `{token, user}`
- `POST /verify_lawyer` - Returns `{token, user}`
- `POST /verify_admin` - Returns `{token, user}`

Your backend already has these endpoints configured!
