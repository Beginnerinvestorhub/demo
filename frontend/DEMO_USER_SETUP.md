# Demo User Setup for Production

This document explains how to configure and use the pre-seeded demo user for production demonstrations.

## Configuration

### 1. Environment Variables

Add the following to your production environment variables (`.env.production` or your deployment platform's environment settings):

```bash
# Demo User Configuration
DEMO_MODE_ENABLED=true
DEMO_USER_EMAIL=demo@beginnerinvestorhub.com
DEMO_USER_PASSWORD=demo123abc
DEMO_USER_DISPLAY_NAME=Demo User
DEMO_USER_UID=demo-user-prod-001
```

### 2. Security Notes

- **Never commit actual passwords** to version control
- Use strong, unique passwords for production
- Rotate demo credentials regularly
- Consider IP restrictions for demo access
- Monitor demo account usage

## Usage

### Login Credentials

To login as the demo user:

- **Email**: `demo@beginnerinvestorhub.com`
- **Password**: `demo123abc`

### Enabling/Disabling Demo Mode

To disable demo mode (recommended for production):

```bash
DEMO_MODE_ENABLED=false
```

When disabled, the demo user credentials will not work.

## Deployment Instructions

### Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the demo user configuration variables
4. Redeploy your application

### Other Platforms

Add the environment variables to your deployment platform's configuration:

- **Netlify**: Site Settings > Environment Variables
- **AWS**: Lambda Environment Variables
- **Google Cloud**: Cloud Run Environment Variables
- **Docker**: Add to `docker-compose.yml` or Dockerfile

## Best Practices

1. **Document the demo credentials** in a secure location (not in code)
2. **Share credentials only** with authorized demo users
3. **Use a separate demo environment** when possible
4. **Log demo user activity** for security monitoring
5. **Set up alerts** for unusual demo account usage

## Testing

To test the demo user locally:

1. Copy `.env.example` to `.env.local`
2. Set `DEMO_MODE_ENABLED=true`
3. Add your demo credentials
4. Restart the development server

## Troubleshooting

### Demo user not working

- Verify `DEMO_MODE_ENABLED=true`
- Check environment variables are set correctly
- Ensure credentials match exactly

### Credentials not persisting

- Clear browser cache and cookies
- Check sessionStorage is available
- Verify no conflicting auth logic

## Support

For issues or questions, contact the development team.
