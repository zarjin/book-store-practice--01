# Social Login Setup Guide

This guide will help you set up Facebook and Instagram authentication for the Book Store application.

## Prerequisites

1. Facebook Developer Account
2. Instagram Developer Account (part of Facebook for Developers)
3. Your application running on a domain (localhost for development)

## Facebook Authentication Setup

### 1. Create a Facebook App

1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Click "My Apps" → "Create App"
3. Choose "Consumer" as the app type
4. Fill in your app details:
   - App Name: "Book Store App" (or your preferred name)
   - App Contact Email: Your email
   - App Purpose: Choose appropriate purpose

### 2. Configure Facebook Login

1. In your app dashboard, go to "Add a Product"
2. Find "Facebook Login" and click "Set Up"
3. Choose "Web" as the platform
4. Enter your Site URL: `http://localhost:3000` (for development)

### 3. Configure OAuth Settings

1. Go to Facebook Login → Settings
2. Add these Valid OAuth Redirect URIs:
   - `http://localhost:5000/api/auth/facebook/callback` (development)
   - `https://yourdomain.com/api/auth/facebook/callback` (production)

### 4. Get Your App Credentials

1. Go to Settings → Basic
2. Copy your App ID and App Secret
3. Add them to your `.env` file:
   ```
   FACEBOOK_APP_ID=your-app-id-here
   FACEBOOK_APP_SECRET=your-app-secret-here
   ```

## Instagram Authentication Setup

### 1. Create an Instagram App

1. Go to [Facebook for Developers](https://developers.facebook.com/)
2. Use the same app you created for Facebook or create a new one
3. Go to "Add a Product" and find "Instagram Basic Display"
4. Click "Set Up"

### 2. Configure Instagram Basic Display

1. Click "Create New App" in the Instagram Basic Display section
2. Fill in the required information:
   - Display Name: "Book Store App"
   - Valid OAuth Redirect URIs: `http://localhost:5000/api/auth/instagram/callback`
   - Deauthorize Callback URL: `http://localhost:5000/api/auth/instagram/deauthorize`
   - Data Deletion Request URL: `http://localhost:5000/api/auth/instagram/data-deletion`

### 3. Get Your Instagram Credentials

1. In the Instagram Basic Display section, you'll see your Instagram App ID and Instagram App Secret
2. Add them to your `.env` file:
   ```
   INSTAGRAM_CLIENT_ID=your-instagram-app-id
   INSTAGRAM_CLIENT_SECRET=your-instagram-app-secret
   ```

## Environment Variables

Create a `.env` file in your backend directory with the following variables:

```env
# Database Configuration
MONGO_URL=mongodb://localhost:27017/bookstore

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# Session Configuration
SESSION_SECRET=your-session-secret-key

# Cloudinary Configuration
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Facebook OAuth Configuration
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret

# Instagram OAuth Configuration
INSTAGRAM_CLIENT_ID=your-instagram-client-id
INSTAGRAM_CLIENT_SECRET=your-instagram-client-secret
```

## Testing the Integration

### Development Testing

1. Start your backend server: `npm start` (in backend directory)
2. Start your frontend server: `npm run dev` (in frontend directory)
3. Navigate to the login page
4. Click on "Facebook" or "Instagram" buttons
5. Complete the OAuth flow
6. You should be redirected back to your app and logged in

### Production Deployment

1. Update your OAuth redirect URIs in Facebook/Instagram app settings
2. Update your environment variables with production values
3. Ensure your domain is properly configured
4. Test the OAuth flow in production

## Troubleshooting

### Common Issues

1. **Invalid OAuth Redirect URI**: Make sure your redirect URIs match exactly in your app settings
2. **App Not Live**: For production, you may need to make your Facebook app live
3. **Permissions**: Ensure your app has the necessary permissions (email for Facebook)
4. **HTTPS Required**: Production apps typically require HTTPS

### Debug Tips

1. Check browser console for errors
2. Verify environment variables are loaded correctly
3. Check server logs for authentication errors
4. Ensure your app domains are correctly configured

## Security Considerations

1. Never commit your `.env` file to version control
2. Use strong, unique secrets for JWT and session
3. Regularly rotate your app secrets
4. Implement proper error handling
5. Validate user data from social providers
6. Consider implementing rate limiting

## Additional Features

You can extend this implementation by:

1. Adding more social providers (Google, Twitter, etc.)
2. Implementing account linking/unlinking
3. Adding profile picture sync
4. Implementing social sharing features
5. Adding social login analytics
