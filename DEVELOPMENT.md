# HRMS Local Development Setup

## Quick Start

### 1. Start Development Environment

```bash
cd /Users/sanjay/projects/test/hrms/docker
docker compose up -d
```

### 2. Access the Application

- **URL**: http://localhost:8000
- **Login**: Administrator
- **Password**: admin

### 3. Check Status

```bash
# View logs
docker logs docker-frappe-1 --tail=50

# Check container status
docker compose ps
```

## Development Workflow

### Making Code Changes

1. **Edit your local HRMS files** in `/Users/sanjay/projects/test/hrms/hrms/`
2. **Clear cache** after Python changes:
   ```bash
   docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && bench --site hrms.localhost clear-cache"
   ```
3. **Rebuild frontend** after JS/CSS changes:
   ```bash
   docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && bench build --app hrms"
   ```

### Common Development Commands

```bash
# Enter the container
docker compose exec frappe bash

# Inside container - navigate to bench
cd /home/frappe/frappe-bench

# Clear cache (after Python changes)
bench --site hrms.localhost clear-cache

# Migrate (after doctype changes)
bench --site hrms.localhost migrate

# Rebuild assets
bench build --app hrms

# Watch for changes (in separate terminal)
bench watch

# Restart (after major changes)
bench restart

# Check site health
bench --site hrms.localhost doctor
```

### Debugging

1. **View Logs**:
   ```bash
   # Container logs
   docker logs docker-frappe-1 -f

   # Inside container - app logs
   docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && tail -f logs/web.log"
   ```

2. **Check App Installation**:
   ```bash
   docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && bench --site hrms.localhost list-apps"
   ```

3. **Console Access**:
   ```bash
   docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && bench --site hrms.localhost console"
   ```

## Troubleshooting

### If HR Module Not Visible

1. Check if HRMS app is installed:
   ```bash
   docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && bench --site hrms.localhost list-apps"
   ```

2. Install/reinstall HRMS:
   ```bash
   docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && bench --site hrms.localhost install-app hrms --force"
   ```

### Complete Reset

If you need to start fresh:

```bash
# Stop and remove all containers and volumes
docker compose down -v

# Start fresh
docker compose up -d
```

### File Permissions Issues

If you encounter permission issues:

```bash
# Fix ownership (run from project root)
sudo chown -R $USER:$USER /Users/sanjay/projects/test/hrms/
```

## Development Features Enabled

- ✅ Developer mode enabled
- ✅ Website cache disabled
- ✅ Local HRMS code mounted and linked
- ✅ Auto-reload on Python changes
- ✅ Frontend watch mode available
- ✅ Debugging enabled

## File Structure

```
/Users/sanjay/projects/test/hrms/
├── docker/
│   ├── docker-compose.yml    # Container configuration
│   ├── init.sh              # Initialization script
│   └── dev-commands.sh      # Development helpers
├── hrms/                    # Your HRMS app code (mounted in container)
├── frontend/               # Frontend code
└── ...
```

## Next Steps

1. Wait for initialization to complete (~5-10 minutes)
2. Access http://localhost:8000
3. Login with Administrator/admin
4. Navigate to HR module
5. Start developing!

Your local HRMS code changes will be immediately reflected in the running application.
