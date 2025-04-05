# Moringa Platform Deployment Guide

This guide provides step-by-step instructions for deploying the Moringa platform, including both the Next.js web application and the Tauri desktop client.

## Prerequisites

Before deploying, ensure you have the following:

- Access to a PostgreSQL database
- Supabase account for authentication
- Stripe account for payment processing
- Anthropic API key for AI features
- Cloudflare account for web application hosting
- GitHub account for version control

## Web Application Deployment

### 1. Environment Setup

Create a `.env` file in the web application root directory with the following variables:

```
# Database
DATABASE_URL=postgresql://username:password@hostname:port/database

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your-supabase-service-role-key

# Stripe
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
STRIPE_PRICE_BASIC=price_your_basic_plan_id
STRIPE_PRICE_PRO=price_your_pro_plan_id
STRIPE_PRICE_ENTERPRISE=price_your_enterprise_plan_id

# Anthropic
ANTHROPIC_API_KEY=your_anthropic_api_key

# Next.js
NEXT_PUBLIC_APP_URL=https://moringa.app
```

### 2. Database Migration

Run the database migrations to set up the schema:

```bash
cd web-app/moringa-web
npx prisma migrate deploy
```

### 3. Build the Application

Build the Next.js application:

```bash
cd web-app/moringa-web
npm run build
```

### 4. Deploy to Cloudflare Pages

Deploy the built application to Cloudflare Pages:

```bash
npx wrangler pages deploy .next
```

Follow the prompts to complete the deployment.

### 5. Configure Cloudflare Pages

In the Cloudflare dashboard:

1. Go to Pages > your-project > Settings > Environment variables
2. Add all the environment variables from your `.env` file
3. Go to Custom domains and set up your domain (e.g., moringa.app)

### 6. Set Up Stripe Webhook

In your Stripe dashboard:

1. Go to Developers > Webhooks
2. Add a new endpoint with the URL: `https://moringa.app/api/stripe/webhook`
3. Select the following events:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
4. Copy the webhook signing secret and update your `STRIPE_WEBHOOK_SECRET` environment variable

## Desktop Client Deployment

### 1. Configure API Endpoint

Update the API endpoint in the desktop client configuration:

```bash
cd desktop-client/moringa-desktop
```

Edit `src/lib/api.js` to point to your deployed web application:

```javascript
const API_BASE_URL = 'https://moringa.app/api';
```

### 2. Build for Windows

```bash
npm run tauri build -- --target windows
```

The Windows installer will be available at `target/release/bundle/msi/moringa-desktop_x.x.x_x64_en-US.msi`.

### 3. Build for macOS

```bash
npm run tauri build -- --target macos
```

The macOS application will be available at `target/release/bundle/macos/moringa-desktop.app`.

To create a DMG installer:

```bash
npm run tauri build -- --target macos --bundle dmg
```

The DMG file will be available at `target/release/bundle/dmg/moringa-desktop_x.x.x_x64.dmg`.

### 4. Build for Linux

```bash
npm run tauri build -- --target linux
```

This will create:
- Debian package: `target/release/bundle/deb/moringa-desktop_x.x.x_amd64.deb`
- AppImage: `target/release/bundle/appimage/moringa-desktop_x.x.x_amd64.AppImage`

### 5. Code Signing (Production)

For production releases, you should sign your applications:

#### Windows
1. Obtain a code signing certificate from a trusted CA
2. Configure the certificate in your Tauri configuration
3. Build with signing enabled

#### macOS
1. Obtain an Apple Developer ID
2. Configure the signing identity in your Tauri configuration
3. Build with signing enabled

#### Linux
1. For Debian packages, use `dpkg-sig` to sign your packages
2. For AppImage, use `appimagetool` with signing enabled

## Distribution

### 1. Set Up Download Page

Create a download page on your web application:

1. Add a new page at `src/app/download/page.tsx`
2. Include download links for all platforms
3. Detect the user's OS to suggest the appropriate download

### 2. Automatic Updates

Configure automatic updates for the desktop client:

1. Set up a GitHub release for each version
2. Configure the update URL in `tauri.conf.json`:

```json
{
  "updater": {
    "active": true,
    "endpoints": [
      "https://moringa.app/api/updates"
    ],
    "dialog": true,
    "pubkey": "your-public-key"
  }
}
```

3. Implement the update API endpoint in your web application

### 3. Analytics and Monitoring

Set up analytics and monitoring:

1. Configure error tracking (e.g., Sentry)
2. Set up usage analytics
3. Implement server monitoring for the web application

## Post-Deployment Verification

After deploying, verify the following:

1. User registration and login work correctly
2. Subscription management and payments process successfully
3. Email provider connections can be established
4. AI features function as expected
5. Desktop client can connect to the web application
6. Automatic updates are detected and applied

## Rollback Procedure

If issues are encountered after deployment:

### Web Application
1. Identify the last stable deployment in Cloudflare Pages
2. Roll back to that deployment in the Cloudflare dashboard
3. If database schema changes were made, restore from backup

### Desktop Client
1. Remove the problematic version from the download page
2. Direct users to download the previous stable version
3. If automatic updates were pushed, release a new update that reverts to the stable version

## Maintenance

Regular maintenance tasks:

1. Monitor error logs and address issues promptly
2. Keep dependencies updated
3. Perform regular database backups
4. Review and optimize API performance
5. Update AI prompts based on user feedback

## Support

Set up support channels:

1. Create a support email address (e.g., support@moringa.app)
2. Implement an in-app chat support system
3. Set up a knowledge base for common issues
4. Create a community forum for user discussions

## Security Considerations

1. Regularly rotate API keys
2. Implement rate limiting on API endpoints
3. Set up monitoring for unusual activity
4. Perform regular security audits
5. Keep all dependencies updated to patch security vulnerabilities

---

This deployment guide should be updated as the platform evolves. Always test deployments in a staging environment before deploying to production.
