# Quick Setup Guide for Private Repositories

## Problem
If you see this error:
```
fatal: could not read Username for 'https://github.com': No such device or address
ERROR: git clone https://github.com/erp-zarvice/erpnext --branch develop  --origin upstream
```

This means the repositories are **private** and require authentication.

## Solution 1: Use GitHub Personal Access Token (Recommended)

### Step 1: Create a Personal Access Token

1. Go to: https://github.com/settings/tokens/new
2. Note: "Docker Dev Environment"
3. Expiration: Choose your preference (90 days recommended)
4. Select scopes:
   - ✅ `repo` (Full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)

### Step 2: Configure Your Environment

```bash
cd hrms/docker

# Create .env file
cp .env.example .env

# Edit .env and add your token
nano .env
```

Add this line to `.env`:
```
GITHUB_TOKEN=ghp_YOUR_TOKEN_HERE
```

### Step 3: Clean Up and Restart

```bash
# Remove old containers and volumes
docker compose down -v

# Start fresh
docker compose up
```

## Solution 2: Make Repositories Public

If these are meant to be open source:

1. Go to: https://github.com/erp-zarvice/frappe/settings
2. Scroll to "Danger Zone"
3. Click "Change repository visibility"
4. Select "Make public"
5. Repeat for `erp-zarvice/erpnext` and `erp-zarvice/hrms`

Then no authentication is needed:
```bash
docker compose up
```

## Solution 3: Use SSH (Advanced)

If you prefer SSH keys over tokens:

1. Generate SSH key (if you don't have one):
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Add key to GitHub:
   - Copy: `cat ~/.ssh/id_ed25519.pub`
   - Add at: https://github.com/settings/keys

3. Set in `.env`:
```
USE_SSH=true
```

4. Update `docker-compose.yml` to mount your SSH key:
```yaml
volumes:
  - ~/.ssh:/home/frappe/.ssh:ro
```

## Verification

If setup is correct, you should see:
```
frappe-1   | Configuring GitHub authentication...
frappe-1   | Using HTTPS for Git operations
frappe-1   | Initializing with Frappe branch: develop
frappe-1   | Cloning into 'frappe'...
frappe-1   | Installing frappe
```

## Security Notes

- **Never commit `.env` file** (it's in `.gitignore`)
- **Never share your Personal Access Token**
- Use tokens with minimal required permissions
- Set token expiration dates
- Revoke tokens when no longer needed

## Troubleshooting

### "Bad credentials" error
- Token might be expired or invalid
- Regenerate token at https://github.com/settings/tokens

### "Repository not found"
- Check if repository name is correct: `erp-zarvice/frappe`, `erp-zarvice/erpnext`
- Verify you have access to these repositories
- Check if repositories exist

### Token not working
- Make sure `repo` scope is selected when creating token
- Check token is correctly added to `.env` file
- No spaces or quotes around token in `.env`

## Need Help?

Check if repositories are public or private:
- Try accessing: https://github.com/erp-zarvice/frappe
- If you see "404 Not Found" → Repository is private or doesn't exist
- If you see the repository → It's public, no token needed
