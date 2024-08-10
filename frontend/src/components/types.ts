// types.ts (or wherever you keep your type definitions)
export interface IUser {
    id: string; // Unique identifier for the user
    username: string; // User's display name
    email: string; // User's email address
    profilePicture: string; // URL to the user's profile picture
    isAdmin: boolean; // Flag to indicate if the user is an admin
    createdAt: string; // Timestamp when the user was created
    updatedAt: string; // Timestamp when the user was last updated
  }
  