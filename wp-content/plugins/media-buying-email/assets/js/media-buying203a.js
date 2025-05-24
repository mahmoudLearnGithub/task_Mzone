jQuery(document).ready(function($) {
    // Initialize platform arrays
    let selectedSocialPlatforms = [];
    let selectedPaidPlatforms = [];
    let selectedCustomerTypes = [];
    
    // Set initial values for hidden inputs
    $('#social-platforms').val('');
    $('#paid-platforms').val('');
    $('#ideal-customer-form2').val('');
    
    // Budget slider functionality
    $('#budget-unique').on('input', function() {
        const budgetValue = parseInt($(this).val());
        const formattedValue = '$' + budgetValue.toLocaleString();
        $('#budgetValue-unique').text(formattedValue);
    });
    
    // Toggle selection function for social platforms
    $('.platform-button').on('click', function() {
        $(this).toggleClass('selected');
        const value = $(this).data('value');
        
        if ($(this).hasClass('selected')) {
            if (!selectedSocialPlatforms.includes(value)) {
                selectedSocialPlatforms.push(value);
            }
        } else {
            selectedSocialPlatforms = selectedSocialPlatforms.filter(item => item !== value);
        }
        $('#social-platforms').val(selectedSocialPlatforms.join(', '));
    });
    
    // Toggle selection function for paid platforms
    $('.social-button-paid').on('click', function() {
        $(this).toggleClass('selected');
        const value = $(this).data('value');
        
        if ($(this).hasClass('selected')) {
            if (!selectedPaidPlatforms.includes(value)) {
                selectedPaidPlatforms.push(value);
            }
        } else {
            selectedPaidPlatforms = selectedPaidPlatforms.filter(item => item !== value);
        }
        $('#paid-platforms').val(selectedPaidPlatforms.join(', '));
    });
    
    // Toggle selection function for customer types
    $('.customer2-button').on('click', function() {
        $(this).toggleClass('selected');
        const value = $(this).data('value');
        
        if ($(this).hasClass('selected')) {
            if (!selectedCustomerTypes.includes(value)) {
                selectedCustomerTypes.push(value);
            }
        } else {
            selectedCustomerTypes = selectedCustomerTypes.filter(item => item !== value);
        }
        $('#ideal-customer-form2').val(selectedCustomerTypes.join(', '));
    });
    
    // File upload display
    $('#branding-guidelines').on('change', function() {
        const fileName = $(this).val().split('\\').pop();
        $('.file-selected').remove();
        if (fileName) {
            $(this).prev('label').append('<span class="file-selected">: ' + fileName + '</span>');
        }
    });
    
    // Form submission handler
    $('#customRequestForm4').on('submit', function(e) {
        e.preventDefault();
        
        // Update hidden inputs before submission
        $('#social-platforms').val(selectedSocialPlatforms.join(', '));
        $('#paid-platforms').val(selectedPaidPlatforms.join(', '));
        $('#ideal-customer-form2').val(selectedCustomerTypes.join(', '));
        
        // Collect form data
        const formData = new FormData(this);
        
        // Add AJAX action
        formData.append('action', 'mbr_form_submission');
        
        // Show loading state
        $('.request-btn4').prop('disabled', true).text('Sending...');
        
        // AJAX submission
        $.ajax({
            url: mbr_ajax.ajaxurl,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                if (response.success) {
                    // Show success message
                    $('#customRequestForm4').before('<div class="mbr-notice mbr-success">Your request has been submitted successfully!</div>');
                    
                    // Reset form
                    $('#customRequestForm4')[0].reset();
                    $('.platform-button, .social-button-paid, .customer2-button').removeClass('selected');
                    selectedSocialPlatforms = [];
                    selectedPaidPlatforms = [];
                    selectedCustomerTypes = [];
                    $('#social-platforms').val('');
                    $('#paid-platforms').val('');
                    $('#ideal-customer-form2').val('');
                    $('#budgetValue-unique').text('$5,000');
                    $('.file-selected').remove();
                } else {
                    // Show error message
                    $('#customRequestForm4').before('<div class="mbr-notice mbr-error">Error: ' + response.data + '</div>');
                }
            },
            error: function(xhr, status, error) {
                // Show error message
                $('#customRequestForm4').before('<div class="mbr-notice mbr-error">There was an error submitting your form. Please try again.</div>');
            },
            complete: function() {
                // Reset button state
                $('.request-btn4').prop('disabled', false).text('Request');
                
                // Scroll to top to show message
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                
                // Remove notices after 5 seconds
                setTimeout(function() {
                    $('.mbr-notice').fadeOut(500, function() {
                        $(this).remove();
                    });
                }, 5000);
            }
        });
    });
});