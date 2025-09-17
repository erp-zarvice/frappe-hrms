import frappe


def boot_session(bootinfo):
	"""
	Boot session hook to customize help menu items
	"""
	# Override standard help items to show only Keyboard Shortcuts and System Health

	bootinfo.standard_help_items = [
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
		},
	]
