/**
 * Custom Help Menu Override
 * This script modifies the help dropdown menu to show only Keyboard Shortcuts and System Health
 */

$(document).ready(function() {
    // Wait for the app to fully load
    setTimeout(function() {
        customizeHelpMenu();
    }, 2000);

    // Also listen for page changes in single page application
    $(document).on('page-change', function() {
        setTimeout(customizeHelpMenu, 500);
    });
});

function customizeHelpMenu() {
	// console.log('Attempting to customize help menu...');
    try {
        // console.log('Customizing help menu...');

        // Find the help dropdown button
        const helpButton = $('#toolbar-help');

		// keep only Keyboard Shortcuts and System Health and remove others
		helpButton.html(`
			<button class="btn-reset dropdown-item" onclick="return frappe.ui.toolbar.show_shortcuts(event)">Keyboard Shortcuts</button>
			<a class="dropdown-item" href="/app/system-health-report">System Health</a>
		`);
		// remove all a tags from helpButton
		// helpButton.find('a').remove();

    } catch (error) {
        console.error('Error customizing help menu:', error);
    }
}

// Override frappe's help menu creation if possible
frappe.ready(function() {
    console.log('Frappe ready, setting up help menu override...');

    // Try to override help menu items in bootinfo
    if (frappe.boot && frappe.boot.standard_help_items) {
        frappe.boot.standard_help_items = [
            {
                "item_label": "Keyboard Shortcuts",
                "item_type": "Action",
                "action": "frappe.ui.toolbar.show_shortcuts(event)",
                "is_standard": 1,
            },
            {
                "item_label": "System Health",
                "item_type": "Route",
                "route": "/app/system-health-report",
                "is_standard": 1,
            }
        ];
        console.log('Boot help items overridden');
    }

    // Set up periodic check to ensure menu stays customized
    setInterval(function() {
        $('.dropdown-menu li a').each(function() {
            const $this = $(this);
            const text = $this.text().trim();
            const onclick = $this.attr('onclick') || '';
            const href = $this.attr('href') || '';

            if ((text === 'About' ||
                onclick.includes('show_about') ||
                text.includes('Frappe Support') ||
                href.includes('frappe.io/support')) &&
                $this.parent('li').is(':visible')) {
                $this.parent('li').hide();
            }
        });
    }, 5000); // Check every 5 seconds
});
