+function($) {
    $(function() {

        const simply = {
            init () {
                this.domCache();
                this.eventBinding();
            },
            domCache () {
                this.$overlay = $('.overlay');
                this.$nav_register_btn = $('#nav-register'); // Check if all btns still work after render
                this.$nav_signin_btn = $('#nav-signin');
                this.$nav_viewData_btn = $('#nav-viewData');
                this.$nav_createEvent_btn = $('#nav-createEvent');
                this.$nav_joinEvent_btn = $('#nav-joinEvent');
            },
            eventBinding () {
                this.$nav_register_btn.on('click', this.overlayOpen.bind(this));
                this.$nav_signin_btn.on('click', this.overlayOpen.bind(this));
                this.$nav_createEvent_btn.on('click', this.overlayOpen.bind(this));
                this.$nav_joinEvent_btn.on('click', this.overlayOpen.bind(this));
                this.$overlay.on('click', this.closeOverlay);
            },
            overlayOpen (e) {   // Function to open the overlay and display signup, login, createevent, joinevent sections             
                // Remove previous section if there's one
                this.closeOverlay();
                // Get the name of the section we want to display
                const $section = $(e.target).attr('data-section');
                console.log($section);
                // Add .open to the elements that we want to display
                this.$overlay.addClass('open');
                $(`.${$section}`).addClass('open');

            },
            closeOverlay () {   // Close any existing overlay
                // Remove previous section if there's one
                $('.open').removeClass('open');
            }
            
        }

        simply.init();
    });
}(jQuery)