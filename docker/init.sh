#!/bin/bash

if [ -d "/home/frappe/frappe-bench/apps/frappe" ]; then
    echo "Bench already exists, skipping init"
    cd /home/frappe/frappe-bench
    bench start
else
    echo "Creating new bench..."
fi

export PATH="${NVM_DIR}/versions/node/v${NODE_VERSION_DEVELOP}/bin/:${PATH}"

# Configure Git authentication if GITHUB_TOKEN is provided
if [ -n "$GITHUB_TOKEN" ]; then
    echo "Configuring GitHub authentication..."
    git config --global url."https://${GITHUB_TOKEN}@github.com/".insteadOf "https://github.com/"
fi

# Determine repository URLs based on USE_SSH setting
if [ "$USE_SSH" = "true" ]; then
    FRAPPE_REPO="git@github.com:erp-zarvice/frappe.git"
    ERPNEXT_REPO="git@github.com:erp-zarvice/erpnext.git"
    echo "Using SSH for Git operations"
else
    FRAPPE_REPO="https://github.com/erp-zarvice/frappe"
    ERPNEXT_REPO="https://github.com/erp-zarvice/erpnext"
    echo "Using HTTPS for Git operations"
fi

# Initialize bench with custom Frappe repository
# Use FRAPPE_BRANCH environment variable or default to 'develop'
FRAPPE_BRANCH=${FRAPPE_BRANCH:-develop}
echo "Initializing with Frappe branch: ${FRAPPE_BRANCH}"
bench init --skip-redis-config-generation --frappe-path ${FRAPPE_REPO} --frappe-branch ${FRAPPE_BRANCH} frappe-bench

cd /home/frappe/frappe-bench

# Use containers instead of localhost
bench set-mariadb-host mariadb
bench set-redis-cache-host redis://redis:6379
bench set-redis-queue-host redis://redis:6379
bench set-redis-socketio-host redis://redis:6379

# Create common site config
cat > sites/common_site_config.json << EOF
{
 "db_host": "mariadb",
 "redis_cache": "redis://redis:6379",
 "redis_queue": "redis://redis:6379",
 "redis_socketio": "redis://redis:6379",
 "socketio_port": 9000
}
EOF

# Remove redis, watch from Procfile
sed -i '/redis/d' ./Procfile
sed -i '/watch/d' ./Procfile

# Get ERPNext from custom repository (dependency for HRMS)
# Use ERPNEXT_BRANCH environment variable or default to 'develop'
ERPNEXT_BRANCH=${ERPNEXT_BRANCH:-develop}
echo "Getting ERPNext from erp-zarvice (branch: ${ERPNEXT_BRANCH})..."
bench get-app --branch ${ERPNEXT_BRANCH} ${ERPNEXT_REPO}

# Use local HRMS code (your development version)
echo "Linking local HRMS development code..."
ln -s /workspace/hrms /home/frappe/frappe-bench/apps/hrms

# Setup requirements for all apps
echo "Setting up Python requirements..."
bench setup requirements

# Create new site
echo "Creating development site..."
bench new-site hrms.localhost \
--force \
--mariadb-root-password 123 \
--admin-password admin \
--no-mariadb-socket

# Install apps
echo "Installing ERPNext..."
bench --site hrms.localhost install-app erpnext

echo "Installing HRMS (your development version)..."
bench --site hrms.localhost install-app hrms

# Configure for development
echo "Configuring development settings..."
bench --site hrms.localhost set-config developer_mode 1
bench --site hrms.localhost set-config disable_website_cache 1
bench --site hrms.localhost enable-scheduler
bench use hrms.localhost

# Clear cache
bench --site hrms.localhost clear-cache

echo "Development setup complete!"
echo "Access at: http://localhost:8000"
echo "Login: Administrator / admin"

bench start
