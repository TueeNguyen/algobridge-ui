# AlgoBridge - Webhook Development Setup

This guide explains how to set up ngrok for testing Clerk webhooks locally.

## Why ngrok?

Clerk needs to send webhooks to your local development server, but `localhost` is not accessible from the internet. ngrok creates a secure tunnel that gives you a public URL forwarding to your local server.

## Prerequisites

- Node.js installed
- Clerk account and application set up
- ngrok account (free tier works)

## Setup Instructions

### 1. Install ngrok

**Option A: Using npm (Recommended)**

```bash
npm install -g ngrok
```

**Option B: Download from ngrok.com**

- Visit: https://ngrok.com/download
- Download and extract for your OS

### 2. Get ngrok Auth Token

1. Sign up at: https://dashboard.ngrok.com/signup
2. Go to: https://dashboard.ngrok.com/get-started/your-authtoken
3. Copy your auth token
4. Run once to configure:

```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN_HERE
```

### 3. Start Your Next.js Dev Server

```bash
cd algo-ui/algobridge-ui
npm run dev
```

Your app will run on `http://localhost:3000`

### 4. Start ngrok Tunnel

**In a new terminal:**

```bash
ngrok http 3000
```

You'll see output like:

```
ngrok

Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Forwarding                    https://abc123-xyz.ngrok.app -> http://localhost:3000

Web Interface                 http://127.0.0.1:4040
```

**Copy the Forwarding URL** (e.g., `https://abc123-xyz.ngrok.app`)

### 5. Configure Clerk Webhook

1. Go to: https://dashboard.clerk.com
2. Select your application
3. Navigate to: **Webhooks** (left sidebar)
4. Click: **Add Endpoint** (or edit existing)
5. Enter webhook URL:

```
https://abc123-xyz.ngrok.app/api/webhook
```

⚠️ **Important:** Make sure to include `/api/webhook` at the end!

6. Select events to subscribe to:

   - ☑ `user.created`
   - ☑ `user.updated` (optional)
   - ☑ `user.deleted` (optional)

7. Click **Create** / **Save**

8. **Copy the Signing Secret** shown on the page

### 6. Add Clerk Webhook Secret to .env

Create/update `.env.local`:

```bash
# Clerk Webhook Secret (from Clerk Dashboard > Webhooks)
WEBHOOK_SECRET=whsec_your_secret_here
```

### 7. Test the Webhook

1. In your app, **sign up a new test user**
2. Check your Next.js terminal logs - you should see:

```
Received webhook with email test@example.com and event type of user.created
Webhook payload: { ... }
```

3. Check ngrok dashboard at `http://127.0.0.1:4040` to inspect the webhook request

4. Check Clerk Dashboard > Webhooks > Attempts - should show `200 OK`

## Troubleshooting

### Webhook hitting wrong route (POST /)

**Problem:** Webhook is sent to root `/` instead of `/api/webhook`

**Solution:**

- Make sure Clerk webhook URL ends with `/api/webhook`
- Example: `https://abc123.ngrok.app/api/webhook` ✅
- Not: `https://abc123.ngrok.app/` ❌

### 400 Error: "Error verifying webhook"

**Problem:** Webhook signature verification failed

**Solution:**

- Check that `WEBHOOK_SECRET` in `.env.local` matches Clerk Dashboard
- Restart your Next.js dev server after updating `.env.local`

### ngrok URL keeps changing

**Problem:** Every time you restart ngrok, the URL changes

**Solutions:**

- **Free tier:** Manually update Clerk webhook URL each time
- **Paid tier ($8/month):** Get a static domain
  ```bash
  ngrok http 3000 --domain=your-static-domain.ngrok.app
  ```

### Can't install ngrok globally

**Alternative:** Use npx (no installation needed)

```bash
npx ngrok http 3000
```

## Development Workflow

### Daily Development:

1. Start Next.js:

   ```bash
   npm run dev
   ```

2. Start ngrok (new terminal):

   ```bash
   ngrok http 3000
   ```

3. Copy ngrok URL and update Clerk webhook (if URL changed)

4. Develop and test!

### Stopping:

1. Press `Ctrl+C` in both terminals
2. ngrok tunnel closes automatically

## ngrok Dashboard

ngrok provides a web interface at `http://127.0.0.1:4040` where you can:

- ✅ See all incoming requests
- ✅ Inspect request/response details
- ✅ Replay requests for debugging
- ✅ View headers and body

**Very useful for debugging webhooks!**

## Production Deployment

⚠️ **ngrok is for development only!**

For production:

- Deploy your Next.js app (Vercel, Railway, etc.)
- Use your production URL for Clerk webhooks
- Example: `https://your-app.vercel.app/api/webhook`

## Security Notes

- ⚠️ Never commit ngrok auth token or webhook secrets to git
- ⚠️ ngrok exposes your local server to the internet - only run during development
- ✅ Always verify webhook signatures (already implemented in `verifyWebhook`)

## Resources

- [ngrok Documentation](https://ngrok.com/docs)
- [Clerk Webhooks Guide](https://clerk.com/docs/integrations/webhooks/overview)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)

## Need Help?

If you encounter issues:

1. Check ngrok dashboard at `http://127.0.0.1:4040`
2. Check Next.js terminal logs
3. Check Clerk Dashboard > Webhooks > Attempts
4. Verify webhook URL includes `/api/webhook`

---

**Happy developing! 🚀**
