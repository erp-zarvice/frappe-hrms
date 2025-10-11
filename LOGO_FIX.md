# Logo Fix - Edarmor Branding

## Issue
The Frappe logo was still showing despite previous whitelabeling efforts, and **`hooks.py` alone doesn't control the navbar logo**.

### Why hooks.py Doesn't Work for Logo
The `app_logo_url` in `hooks.py` only sets:
- The logo in the Apps screen
- Default value for new installations
- Website context logo

**It does NOT control the navbar logo!** The navbar logo comes from **database settings** (`Navbar Settings` doctype), which overrides hooks.py.

## Root Causes Identified

### 1. Database Setting - `subscription_utils.py`
**File:** `/hrms/hrms/subscription_utils.py`
- The `set_app_logo()` function was setting the navbar logo to `frappe-hr-logo.svg` instead of `edarmor-hr-logo.svg`
- This function is called during subscription/installation processes
- **Fixed:** Changed logo path to `/assets/hrms/images/edarmor-hr-logo.svg`

### 2. Boot Session Configuration
**File:** `/hrms/hrms/boot.py`
- The boot session hook is called every time a user logs in
- Previously only set help menu items, didn't enforce branding
- **Fixed:** Added navbar_settings and app_name to bootinfo to ensure branding on every session

### 3. Database Values Not Updated
- Navbar Settings, Website Settings, and System Settings in the database may still have old Frappe branding
- These settings persist across code updates
- **Fixed:** Created a database patch to update all branding settings

## Fixes Applied

### 1. **Fixed `subscription_utils.py`**
Changed the logo path from `frappe-hr-logo.svg` → `edarmor-hr-logo.svg`

### 2. **Enhanced `boot.py`**
Added branding enforcement on every login:
```python
bootinfo.navbar_settings = {
    "app_logo": "/assets/hrms/images/edarmor-hr-logo.svg"
}
bootinfo.app_name = "Edarmor HR"
```

### 3. **Added Branding to `setup.py` (MAIN FIX)**
Created `setup_edarmor_branding()` function that runs during installation:
- Updates Navbar Settings with Edarmor logo
- Updates Website Settings (app_name, brand_html, favicon)
- Updates System Settings (app_name)
- Called automatically from `after_install()` hook

**This ensures branding is set correctly on new installations.**

### 4. **Created Database Patch**
New file: `/hrms/hrms/patches/post_install/update_edarmor_branding.py`
- Updates existing installations with Edarmor branding
- Added to `patches.txt` to run automatically with `bench migrate`

### 5. **Fixed `hooks.py`**
- Removed duplicate `app_logo_url` definition
- Kept the proper one at line 9: `/assets/hrms/images/edarmor-hr-logo.svg`

### 6. **Updated `install.py`**
- Changed messages from "Frappe HR" → "Edarmor HR"
- Updated bug report URL to erp-zarvice repo

### 4. Existing Logo Replacement Script
**File:** `/hrms/hrms/public/js/logo_replacement.js`
- Already in place and working
- Handles any dynamic logo replacements on the frontend
- Runs on page load and periodically checks for new logos

## Files Modified

1. `/hrms/hrms/subscription_utils.py` - Fixed set_app_logo() function
2. `/hrms/hrms/boot.py` - Added branding enforcement on boot
3. `/hrms/hrms/setup.py` - **Added setup_edarmor_branding() function (MAIN FIX)**
4. `/hrms/hrms/install.py` - Updated messages to Edarmor HR
5. `/hrms/hrms/hooks.py` - Removed duplicate app_logo_url
6. `/hrms/hrms/patches/post_install/update_edarmor_branding.py` - NEW patch file
7. `/hrms/hrms/patches.txt` - Added new patch entry

## How to Apply

### Method 1: Run the Patch (Recommended)
```bash
cd /path/to/frappe-bench
bench --site your-site migrate
```

This will:
1. Execute the new branding patch
2. Update all database settings
3. Apply changes immediately

### Method 2: Manual Database Update
If you need to update immediately without running migrations:

```bash
bench --site your-site console
```

Then in the console:
```python
frappe.db.set_single_value("Navbar Settings", "app_logo", "/assets/hrms/images/edarmor-hr-logo.svg")

website_settings = frappe.get_single("Website Settings")
website_settings.app_name = "Edarmor HR"
website_settings.brand_html = "Edarmor HR"
website_settings.favicon = "/assets/hrms/images/favicon.ico"
website_settings.save()

system_settings = frappe.get_single("System Settings")
system_settings.app_name = "Edarmor HR"
system_settings.save()

frappe.db.commit()
```

### Method 3: Clear Cache and Restart
After applying either method:
```bash
bench --site your-site clear-cache
bench --site your-site clear-website-cache
bench restart
```

## Verification

After applying the fixes, verify the changes:

1. **Check Logo in Navbar:**
   - Log in to HRMS
   - Look at the top-left corner navbar
   - Should see Edarmor logo, not Frappe logo

2. **Check Database Settings:**
   ```bash
   bench --site your-site console
   ```
   ```python
   frappe.get_single("Navbar Settings").app_logo
   # Should return: /assets/hrms/images/edarmor-hr-logo.svg

   frappe.get_single("Website Settings").app_name
   # Should return: Edarmor HR
   ```

3. **Check Browser Console:**
   - Open browser developer tools
   - Check for any 404 errors loading logo files
   - Verify the correct logo path is being requested

4. **Test Login Page:**
   - Log out and view login page
   - Should show "Login to Edarmor" (from Frappe login.py fix)
   - Logo should be Edarmor logo

## Why Multiple Fixes Were Needed

Frappe's branding system is multi-layered:

1. **Code Level (hooks.py):** Defines default app metadata ✅ Already fixed
2. **Boot Session (boot.py):** Sets branding on every login ✅ Now fixed
3. **Database Settings:** Persisted settings that override code ✅ Now fixed via patch
4. **Installation Functions (subscription_utils.py):** Sets initial values ✅ Now fixed
5. **Frontend Scripts (logo_replacement.js):** Catches edge cases ✅ Already in place

All five layers needed to be aligned for consistent branding.

## Related Files

- `/hrms/hrms/hooks.py` - App configuration (already updated)
- `/hrms/hrms/public/js/logo_replacement.js` - Client-side logo replacement (already in place)
- `/frappe/frappe/www/login.py` - Login page APP_NAME constant (already fixed)
- `/frappe/frappe/www/app.py` - App page APP_NAME constant (already fixed)

## Future Maintenance

When deploying to new sites:
- The patch will automatically run during `bench migrate`
- New installations will use the correct logo from hooks.py
- Boot session ensures branding on every login
- No manual intervention should be needed

## Troubleshooting

**If logo still shows as Frappe:**

1. Check browser cache: Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
2. Verify patch ran: `bench --site your-site console` → `frappe.db.get_value("Navbar Settings", None, "app_logo")`
3. Check logo file exists: Ensure `/assets/hrms/images/edarmor-hr-logo.svg` is accessible
4. Clear all caches: `bench --site your-site clear-cache && bench clear-cache && bench restart`
5. Check boot.py changes are applied: Restart bench after code changes
6. Inspect element: Right-click logo → Inspect → Check which image URL is being loaded
