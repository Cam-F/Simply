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
                this.$nav_register_btn.on('click', this.overlayOpen);
                this.$nav_signin_btn.on('click', this.overlayOpen);
                this.$nav_createEvent_btn.on('click', this.overlayOpen);
                this.$nav_joinEvent_btn.on('click', this.overlayOpen);
            },
            overlayOpen () {
                console.log($(this));
                const $section = $(this).attr('data-section');
                simply.$overlay.addClass('open');
                console.log($section);
                $(`.${$section}`).addClass('open');

            }
        }

        simply.init();
    });
}(jQuery)