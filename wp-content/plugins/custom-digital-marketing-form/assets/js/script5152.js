jQuery(document).ready(function($) {
    // Initialize platform arrays
    let selectedSocialPlatforms = [];
    let selectedPaidPlatforms = [];
    
    // Set initial values for hidden inputs
    $('#social-platforms').val('');
    $('#paid-platforms').val('');
    
    // Toggle selection function
    function toggleSelection(button, type = 'social') {
        $(button).toggleClass('selected');
        const value = $(button).data('value');
        
        if (type === 'social') {
            if ($(button).hasClass('selected')) {
                if (!selectedSocialPlatforms.includes(value)) {
                    selectedSocialPlatforms.push(value);
                }
            } else {
                selectedSocialPlatforms = selectedSocialPlatforms.filter(item => item !== value);
            }
            $('#social-platforms').val(selectedSocialPlatforms.join(', '));
        } else {
            if ($(button).hasClass('selected')) {
                if (!selectedPaidPlatforms.includes(value)) {
                    selectedPaidPlatforms.push(value);
                }
            } else {
                selectedPaidPlatforms = selectedPaidPlatforms.filter(item => item !== value);
            }
            $('#paid-platforms').val(selectedPaidPlatforms.join(', '));
        }
    }
    
    // Attach click handlers
    $('.social-button[data-value]').on('click', function() {
        const type = $(this).parent().is(':first-of-type') ? 'social' : 'paid';
        toggleSelection(this, type);
    });
    
    // Update hidden inputs before form submission
    $('#customRequestForm1').on('submit', function() {
        $('#social-platforms').val(selectedSocialPlatforms.join(', '));
        $('#paid-platforms').val(selectedPaidPlatforms.join(', '));
    });
});