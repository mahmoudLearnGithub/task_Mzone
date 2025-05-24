jQuery(document).ready(function($) {
    // Handle button selections
    $('.button-group').on('click', '.option-button', function() {
        const group = $(this).parent();
        const isMultiSelect = group.hasClass('multi-select');
        const input = group.next('input[type="hidden"]');
        
        if (isMultiSelect) {
            $(this).toggleClass('active');
            const selected = group.find('.active').map(function() {
                return $(this).text();
            }).get().join(', ');
            input.val(selected);
        } else {
            group.find('.option-button').removeClass('active');
            $(this).addClass('active');
            input.val($(this).text());
        }
    });
    
    // Form submission handler
    $('#customRequestForm').on('submit', function(e) {
        e.preventDefault();
        
        const form = $(this);
        const submitBtn = form.find('.submit-btn');
        const messageDiv = form.find('.form-message');
        
        // Validate required fields
        const requiredFields = form.find('[required]');
        let isValid = true;
        
        requiredFields.each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('error-field');
                isValid = false;
            } else {
                $(this).removeClass('error-field');
            }
        });
        
        if (!isValid) {
            messageDiv.addClass('error').text('Please fill in all required fields.').fadeIn();
            return;
        }
        
        // Show loading state
        submitBtn.prop('disabled', true).text('Sending...');
        messageDiv.hide().removeClass('success error');
        
        // Collect form data
        const formData = {
            action: 'submit_website_request',
            nonce: websiteRequestAjax.nonce
        };
        
        $(this).serializeArray().forEach(function(item) {
            formData[item.name] = item.value;
        });
        
        // AJAX request
        $.ajax({
            url: websiteRequestAjax.ajax_url,
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: function(response) {
                if (response.success) {
                    messageDiv.addClass('success').text(response.data).fadeIn();
                    form[0].reset();
                    $('.option-button').removeClass('active');
                } else {
                    messageDiv.addClass('error').text(response.data).fadeIn();
                }
            },
            error: function(xhr, status, error) {
                messageDiv.addClass('error').text('Server error: ' + error).fadeIn();
            },
            complete: function() {
                submitBtn.prop('disabled', false).text('Submit Request');
                $('html, body').animate({
                    scrollTop: messageDiv.offset().top - 100
                }, 500);
            }
        });
    });
});