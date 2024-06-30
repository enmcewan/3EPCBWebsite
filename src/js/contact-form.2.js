document.addEventListener("DOMContentLoaded", function(event) {

    const emailRadioB = document.querySelector('#emailRadio');
    const emailAddrss = document.querySelector('#emailAddr');
    const phoneRadioB = document.querySelector('#phoneRadio');
    const phoneNumber = document.querySelector('#phoneNumber');
    const methodBlock = document.querySelector('#method-block');
    const methodLabel = document.querySelector('#method-label');
    const methodEmail = document.querySelector('#method-email-radio');
    const methodPhone = document.querySelector('#method-phone-radio');

    emailRadioB.addEventListener('click', e => {

        if (e.target.checked) {

            emailAddrss.setAttribute('required', true);
            phoneNumber.setAttribute('required', false);

        }

    });

    phoneRadioB.addEventListener('click', e => {

        if (e.target.checked) {

            emailAddrss.setAttribute('required', false);
            phoneNumber.setAttribute('required', true);
            phoneNumber.setAttribute('pattern', '^\\(?[\\d]{3}\\)?[\\s-]?[\\d]{3}[\\s-]?[\\d]{4}$');

        }

    });

    // fix layout for Contact Method block on smaller screens
    const mediaQueryList = window.matchMedia('(max-width: 877px)');

    if (mediaQueryList.matches) {

        console.log(mediaQueryList.matches);

        methodBlock.classList.remove('contact-method-mt');
        methodBlock.classList.add('mt-1');

        methodLabel.classList.remove('me-5');

        methodEmail.classList.remove('form-check-inline');
        methodEmail.classList.add('ms-2');

        methodPhone.classList.remove('form-check-inline');
        methodPhone.classList.add('ms-2', 'mb-3');

    }
});