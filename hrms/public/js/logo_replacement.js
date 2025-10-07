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

        // Replace text: "Login to Frappe", "Login to ERPNext" with "Login to Edarmor HR"
        $('h4, h1, h2, h3, h5, h6, p, span, div').each(function() {
            const $elem = $(this);
            // Only process if element has direct text content (not just child elements)
            if ($elem.children().length === 0 || $elem.contents().filter(function() {
                return this.nodeType === 3; // Text nodes
            }).length > 0) {
                let text = $elem.html();
                if (text) {
                    text = text.replace(/Login to Frappe/gi, 'Login to Edarmor HR');
                    text = text.replace(/Login to ERPNext/gi, 'Login to Edarmor HR');
                    text = text.replace(/Create a Frappe Account/gi, 'Create an Edarmor HR Account');
                    text = text.replace(/Create an ERPNext Account/gi, 'Create an Edarmor HR Account');
                    if (text !== $elem.html()) {
                        $elem.html(text);
                    }
                }
            }
        });

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
