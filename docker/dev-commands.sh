#!/bin/bash

# HRMS Development Commands
# Run these commands from the docker directory

echo "HRMS Development Commands"
echo "========================="

# Enter the container
echo "1. Enter Frappe container:"
echo "docker compose exec frappe bash"
echo ""

# Navigate to bench directory
echo "2. Inside container, navigate to bench:"
echo "cd /home/frappe/frappe-bench"
echo ""

# Common development commands
echo "3. Common development commands:"
echo ""

echo "# Clear cache after making changes"
echo "bench --site hrms.localhost clear-cache"
echo ""

echo "# Rebuild frontend assets"
echo "bench build --app hrms"
echo ""

echo "# Watch for frontend changes (in separate terminal)"
echo "bench watch"
echo ""

echo "# Restart server after Python changes"
echo "bench restart"
echo ""

echo "# Run migrations after doctype changes"
echo "bench --site hrms.localhost migrate"
echo ""

echo "# Update translations"
echo "bench --site hrms.localhost build-message-files"
echo ""

echo "# Install/reinstall app after major changes"
echo "bench --site hrms.localhost install-app hrms --force"
echo ""

echo "# Check site status"
echo "bench --site hrms.localhost doctor"
echo ""

echo "# View logs"
echo "tail -f logs/web.log"
echo ""

echo "4. Quick restart workflow:"
echo "docker compose restart frappe"
echo ""

echo "5. Complete reset (if needed):"
echo "docker compose down -v && docker compose up"

docker compose exec frappe bash -c "cd /home/frappe/frappe-bench && bench --site hrms.local build"
