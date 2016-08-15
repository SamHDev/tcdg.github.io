var createSnackbar = (function () {
    // Any snackbar that is already shown
    var previous = null;

    return function (text, actionText, action) {
        if (previous) {
            previous.dismiss();
        }
        var snackbar = document.createElement('aside');
        snackbar.className = 'md-snackbar';
        snackbar.dismiss = function () {
            this.style.bottom = '';
            actionButton.style.opacity = '0';
            message.style.opacity = '0';
            if (document.contains(fab)) {
                fab.style.bottom = '0';
            }
        };
        var message = document.createElement('p');
        message.className = 'message'
        message.innerHTML = text;
        snackbar.appendChild(message);
        if (actionText) {
            if (!action) {
                action = snackbar.dismiss.bind(snackbar);
            }
            var actionButton = document.createElement('button');
            actionButton.className = 'action';
            actionButton.innerHTML = actionText;
            actionButton.addEventListener('click', action);
            snackbar.appendChild(actionButton);
        }
        var fab = document.getElementById('above-snkbr')
        setTimeout(function () {
            if (previous === this) {
                previous.dismiss();
            }
        }.bind(snackbar), 5000);

        snackbar.addEventListener('transitionend', function (event, elapsed) {
            if (event.propertyName === 'bottom' && this.style.bottom == '') {
                this.parentElement.removeChild(this);
                if (previous === this) {
                    previous = null;
                }
            }
        }.bind(snackbar));



        previous = snackbar;
        document.body.appendChild(snackbar);
        // In order for the animations to trigger, I have to force the original style to be computed, and then change it.
        getComputedStyle(snackbar).bottom;
        getComputedStyle(actionButton).opacity;
        getComputedStyle(message).opacity;
        snackbar.style.bottom = '0px';
        actionButton.style.opacity = '1';
        message.style.opacity = '1';
        if (document.contains(fab)) {
            fab.style.bottom = '48px';
        }
    };
})();