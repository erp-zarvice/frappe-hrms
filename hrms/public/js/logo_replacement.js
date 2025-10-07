/**
 * Logo replacement script
 * This replaces any remaining Frappe framework logos with Edarmor logos
 */

$(document).ready(function() {
    replaceFrappeLogos();

    // Also check periodically for any dynamically loaded logos
    setInterval(replaceFrappeLogos, 3000);
});

function replaceFrappeLogos() {
    try {
        // Replace any img tags with frappe logo
        $('img[src*="frappe-framework-logo"]').attr('src', '/assets/hrms/images/edarmor-hr-logo.svg');
        $('img[src*="/assets/frappe/images/frappe-framework-logo.svg"]').attr('src', '/assets/hrms/images/edarmor-hr-logo.svg');
		$('img[src*="/assets/erpnext/images/erpnext-logo.svg"]').attr('src', '/assets/hrms/images/edarmor-hr-logo.svg');
		$('img[src*="erpnext-logo"]').attr('src', '/assets/hrms/images/edarmor-hr-logo.svg');

        // Replace any background images
        $('[style*="frappe-framework-logo"]').each(function() {
            let style = $(this).attr('style');
            if (style) {
                style = style.replace(/frappe-framework-logo\.svg/g, 'edarmor-hr-logo.svg');
                style = style.replace(/\/assets\/frappe\/images\//g, '/assets/hrms/images/');
                $(this).attr('style', style);
            }
        });

        // Replace CSS background-image properties
        $('*').each(function() {
            const computedStyle = window.getComputedStyle(this);
            const bgImage = computedStyle.backgroundImage;
            if (bgImage && bgImage.includes('frappe-framework-logo')) {
                $(this).css('background-image', bgImage.replace(/frappe-framework-logo\.svg/g, 'edarmor-hr-logo.svg'));
            }
        });

        // Replace any SVG elements that might contain frappe logos
        $('svg').each(function() {
            const svgContent = $(this).html();
            if (svgContent && svgContent.includes('frappe')) {
                // You can add specific SVG replacement logic here if needed
                console.log('Found SVG with frappe reference, manual review may be needed');
            }
        });

    } catch (error) {
        console.error('Error replacing Frappe logos:', error);
    }
}

// Also run when frappe is ready
if (typeof frappe !== 'undefined') {
    frappe.ready(function() {
        replaceFrappeLogos();
    });
}
