# Moringa Platform Developer Documentation

## Architecture Overview

The Moringa platform consists of two main components:

1. **Web Application**: A Next.js application that handles user authentication, subscription management, and provides API endpoints for the AI features.
2. **Desktop Client**: A Tauri+Vue application that provides a native email client with AI-assisted features.

### System Architecture Diagram

```
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│  Desktop Client     │     │  Web Application    │
│  (Tauri + Vue)      │◄────┤  (Next.js)          │
│                     │     │                     │
└─────────┬───────────┘     └─────────┬───────────┘
          │                           │
          │                           │
          ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐
│                     │     │                     │
│  Email Providers    │     │  Database           │
│  (Gmail, Outlook)   │     │  (PostgreSQL)       │
│                     │     │                     │
└─────────────────────┘     └─────────┬───────────┘
                                      │
                                      │
                                      ▼
                            ┌─────────────────────┐
                            │                     │
                            │  External Services  │
                            │  - Supabase Auth    │
                            │  - Stripe Payments  │
                            │  - Anthropic API    │
                            │                     │
                            └─────────────────────┘
```

## Technology Stack

### Web Application
- **Framework**: Next.js 14
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL with Prisma ORM
- **Payment Processing**: Stripe
- **AI Integration**: Anthropic Claude API
- **Deployment**: Cloudflare Pages

### Desktop Client
- **Framework**: Tauri 2.0 with Vue 3
- **State Management**: Pinia
- **Styling**: Tailwind CSS
- **Email Integration**: Custom email provider integrations

## Web Application Structure

### Directory Structure

```
web-app/moringa-web/
├── migrations/           # Database migration files
├── prisma/               # Prisma schema and configuration
├── public/               # Static assets
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # Dashboard pages
│   │   └── ...
│   ├── components/       # Reusable React components
│   ├── hooks/            # Custom React hooks
│   └── lib/              # Utility functions and services
│       ├── anthropic.ts  # Anthropic API integration
│       ├── auth.ts       # Authentication utilities
│       ├── prisma.ts     # Database client
│       ├── stripe.ts     # Stripe integration
│       └── ...
├── tests/                # Test files
├── .env                  # Environment variables
└── ...
```

### API Endpoints

#### Authentication
- `POST /api/auth/validate`: Validates user authentication and returns user data
- `POST /api/auth/login`: Authenticates a user and returns a token
- `POST /api/auth/register`: Creates a new user account

#### Email Features
- `POST /api/email/draft`: Generates an email draft based on user intent
- `POST /api/email/improve`: Improves an existing email draft
- `POST /api/email/summarize`: Summarizes an email thread
- `POST /api/email/translate`: Translates an email to a different language

#### Subscription Management
- `POST /api/stripe/checkout`: Creates a Stripe checkout session
- `POST /api/stripe/webhook`: Handles Stripe webhook events
- `GET /api/stripe/portal`: Redirects to Stripe customer portal
- `POST /api/stripe/cancel`: Cancels a subscription

#### Mailbox Management
- `GET /api/mailboxes`: Lists connected mailboxes
- `POST /api/mailboxes/connect`: Connects a new mailbox
- `DELETE /api/mailboxes/:id`: Disconnects a mailbox

### Database Schema

The database schema is defined in `prisma/schema.prisma` and includes the following models:

- `User`: User account information
- `Subscription`: Subscription plan and status
- `ConnectedMailbox`: Email provider connections
- `UsageMetric`: Token usage and request counts
- `BillingHistory`: Payment records

## Desktop Client Structure

### Directory Structure

```
desktop-client/moringa-desktop/
├── src/
│   ├── assets/           # Static assets and styles
│   ├── components/       # Reusable Vue components
│   ├── lib/              # Utility functions and services
│   │   ├── api.js        # API client for web application
│   │   ├── email.js      # Email provider integrations
│   │   └── ...
│   ├── views/            # Vue views/pages
│   │   ├── Login.vue     # Login view
│   │   ├── Mailbox.vue   # Main mailbox view
│   │   ├── Compose.vue   # Email composition view
│   │   ├── Settings.vue  # Settings view
│   │   └── ...
│   ├── App.vue           # Root Vue component
│   └── main.js           # Application entry point
├── tests/                # Test files
└── ...
```

### Key Components

#### Authentication
The desktop client authenticates with the web application using JWT tokens. The authentication flow is handled in the `Login.vue` component and the tokens are stored in localStorage.

#### Email Provider Integration
Email provider integration is handled through the `lib/email.js` module, which provides a unified interface for different email providers (Gmail, Outlook, etc.).

#### AI Features
AI features are accessed through the web application's API endpoints. The desktop client sends requests to these endpoints and displays the results to the user.

## AI Integration

### Anthropic Claude API

The Moringa platform uses the Anthropic Claude API for AI-assisted email features. The integration is implemented in `src/lib/anthropic-enhanced.ts`.

### Prompt Templates

The AI integration uses carefully crafted prompt templates for different features:

- **Email Draft**: Generates an email response based on the email thread and user intent
- **Email Improvement**: Improves an existing email draft while maintaining the user's voice
- **Email Summarization**: Summarizes an email thread to extract key points
- **Email Translation**: Translates an email to a different language

### Token Usage Tracking

Token usage is tracked for each API request and stored in the `UsageMetric` model. This data is used for billing and to enforce subscription limits.

## Testing

### Unit Tests

Unit tests are implemented using Vitest for both the web application and desktop client. Test files are located in the `tests/` directory of each project.

### Integration Tests

Integration tests verify the interaction between different components of the system, such as the API endpoints and database.

### System Tests

System tests verify the entire system works correctly as an integrated whole. These tests are implemented in the `system-tests/` directory.

## Deployment

### Web Application Deployment

The web application is deployed to Cloudflare Pages with the following steps:

1. Build the Next.js application:
   ```bash
   cd web-app/moringa-web
   npm run build
   ```

2. Deploy to Cloudflare Pages:
   ```bash
   npx wrangler pages deploy .next
   ```

3. Set up environment variables in the Cloudflare dashboard:
   - `DATABASE_URL`: PostgreSQL connection string
   - `SUPABASE_URL`: Supabase project URL
   - `SUPABASE_KEY`: Supabase service role key
   - `STRIPE_SECRET_KEY`: Stripe secret key
   - `STRIPE_WEBHOOK_SECRET`: Stripe webhook secret
   - `ANTHROPIC_API_KEY`: Anthropic API key

### Desktop Client Deployment

The desktop client is built for different platforms using Tauri's build system:

1. Build for all platforms:
   ```bash
   cd desktop-client/moringa-desktop
   npm run tauri build
   ```

2. Platform-specific builds:
   - Windows: `npm run tauri build -- --target windows`
   - macOS: `npm run tauri build -- --target macos`
   - Linux: `npm run tauri build -- --target linux`

3. The built installers will be available in the `target/release/bundle/` directory.

## Security Considerations

### Authentication

- User authentication is handled by Supabase Auth, which provides secure authentication flows
- JWT tokens are used for API authentication
- Passwords are never stored in plain text

### Data Protection

- Sensitive data is encrypted in the database
- API endpoints validate user authentication and subscription status
- Rate limiting is implemented to prevent abuse

### API Keys

- API keys for external services are stored as environment variables
- The desktop client never has direct access to API keys

## Contributing

### Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/moringa/moringa-platform.git
   cd moringa-platform
   ```

2. Set up the web application:
   ```bash
   cd web-app/moringa-web
   npm install
   cp .env.example .env  # Update with your own values
   npx prisma migrate dev
   npm run dev
   ```

3. Set up the desktop client:
   ```bash
   cd desktop-client/moringa-desktop
   npm install
   npm run tauri dev
   ```

### Coding Standards

- Use TypeScript for type safety
- Follow the ESLint configuration
- Write tests for new features
- Document code with JSDoc comments

### Pull Request Process

1. Create a new branch for your feature or bug fix
2. Make your changes and commit them
3. Push your branch and create a pull request
4. Ensure all tests pass
5. Request a review from a team member

## Troubleshooting

### Common Development Issues

- **Database connection issues**: Verify your PostgreSQL connection string in `.env`
- **Supabase authentication issues**: Check your Supabase URL and key
- **Stripe integration issues**: Ensure your Stripe keys are correct and webhook is configured
- **Anthropic API issues**: Verify your API key and check the API status

### Debugging

- Use the browser developer tools for the web application
- Use `console.log` statements in the desktop client
- Check the logs in the Cloudflare dashboard for production issues

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tauri Documentation](https://tauri.app/v2/guide/)
- [Vue Documentation](https://vuejs.org/guide/introduction.html)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.io/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [Anthropic API Documentation](https://docs.anthropic.com/claude/reference/getting-started-with-the-api)
