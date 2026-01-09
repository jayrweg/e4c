# Server Setup Checklist

## For You (GitHub Owner)

### ✅ Already Done:
- [x] Generated SSH key pair
- [x] Added private key to GitHub Secrets as `SSH_PRIVATE_KEY`
- [x] Sent public key to server person
- [x] Added app secrets to GitHub:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `SANITY_API_TOKEN`
  - `RESEND_API_KEY`

### 🔄 Need to Add (Ask Server Person for These):

Go to: https://github.com/jayrweg/e4c/settings/secrets/actions

Add these secrets:

1. **REMOTE_HOST**
   ```
   uk-fast-web1373.main-hosting.eu
   ```

2. **REMOTE_USER**
   ```
   Ask server person for: "What is my SSH username?"
   Example: u976524705
   ```

3. **REMOTE_TARGET**
   ```
   Ask server person for: "What is the full path where the app should be deployed?"
   Example: /home/u976524705/e4c
   ```

4. **REMOTE_PORT** (Only add if NOT 22)
   ```
   Ask server person for: "What is the SSH port?"
   Usually: 22 (if 22, you don't need to add this secret)
   ```

---

## For Server Person

### What You Need to Do:

#### 1. Add the Public Key to Server
The user sent you their **public key**. You need to:

```bash
# SSH into the server
ssh your-username@uk-fast-web1373.main-hosting.eu

# Create .ssh directory if it doesn't exist
mkdir -p ~/.ssh
chmod 700 ~/.ssh

# Add the user's public key to authorized_keys
nano ~/.ssh/authorized_keys
# Paste the public key the user sent you on a new line
# Save and exit (Ctrl+X, Y, Enter)

# Set correct permissions
chmod 600 ~/.ssh/authorized_keys
```

#### 2. Provide These Details to the User:

Send the user these details so they can add them to GitHub Secrets:

```
SSH Username: _______________ (e.g., u976524705)
SSH Port: _______________ (usually 22)
App Directory: _______________ (e.g., /home/u976524705/e4c)
```

#### 3. Prepare the Server:

```bash
# Install Node.js 20 (if not installed)
node --version  # Check if installed

# If not installed:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20

# Install PM2
npm install -g pm2

# Create app directory
mkdir -p ~/e4c  # Or your preferred path
cd ~/e4c
pwd  # Copy this path and send to user as REMOTE_TARGET
```

---

## About the Server's Public Key

**The key you gave to the user:**
```
ssh-rsa AAAAB3NzaC1yc2E...@uk-fast-web1373.main-hosting.eu
```

**What it is:**
- This is your SERVER's public key
- It's used for server identity verification
- It's NOT a GitHub deploy key

**What to do with it:**
- **Nothing!** The GitHub Actions will automatically accept it
- No need to add it to GitHub deploy keys
- It's already on your server

---

## Testing the Connection

### Server Person Can Test:
Once you've added the user's public key to `authorized_keys`, they can test from their computer:

```bash
ssh username@uk-fast-web1373.main-hosting.eu
```

If they can connect without entering a password, it's working! ✅

---

## What Happens After Setup:

1. User adds the 3-4 secrets to GitHub (REMOTE_HOST, REMOTE_USER, REMOTE_TARGET, REMOTE_PORT)
2. User pushes code to GitHub
3. GitHub Actions automatically:
   - Builds the application
   - Connects to your server via SSH
   - Uploads the files to the app directory
   - Restarts the application with PM2
4. Website is live!

---

## Summary for Server Person:

**You need to do 3 things:**

1. ✅ Add the user's public key to `~/.ssh/authorized_keys` on the server
2. ✅ Provide connection details to the user (username, port, app directory path)
3. ✅ Install Node.js 20 and PM2 on the server
4. ✅ Create the app directory

**You do NOT need to:**
- ❌ Add anything to GitHub
- ❌ Create any deploy keys
- ❌ Configure webhooks

**The server's public key you sent is just for information - no action needed!**
