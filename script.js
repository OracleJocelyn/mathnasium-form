//Declare Variables
    // Parent/Guardian 1 Variables
    var parentguardian1 = document.getElementById('parentguardian1');
    var studentrelation1 = document.getElementById('studentrelation1');
    var streetaddress1 = document.getElementById('streetaddress1');
    var primaryphone1 = document.getElementById('primaryphone1');
    var primaryphonetype1 = document.getElementById('primaryphonetype1');
    var secondaryphone1 = document.getElementById('secondaryphone1');
    var secondaryphonetype1 = document.getElementById('secondaryphonetype1');
    var parentemail1 = document.getElementById('parentemail1');
    var emailaddress1 = document.getElementById('emailaddress1');

    // Parent/Guardian 2 Variables
    var parentguardian2 = document.getElementById('parentguardian2');
    var studentrelation2 = document.getElementById('studentrelation2');
    var streetaddress2 = document.getElementById('streetaddress2');
    var primaryphone2 = document.getElementById('primaryphone2');
    var primaryphonetype2 = document.getElementById('primaryphonetype2');
    var secondaryphone2 = document.getElementById('secondaryphone2');
    var secondaryphonetype2 = document.getElementById('secondaryphonetype2');
    var emailaddress2 = document.getElementById('emailaddress2');

    //Emergency Contact Variables
    var emergencycontact = document.getElementById('emergencycontact');
    var emergencyrelation = document.getElementById('emergencyrelation');
    var emergencyphonenumber = document.getElementById('emergencyphonenumber');

    //Student 1 Variables
    var studentname1 = document.getElementById('studentname1');
    var studentbirthdate1 = document.getElementById('studentbirthdate1');
    var studentschool1 = document.getElementById('studentschool1');
    var studentgrade1 = document.getElementById('studentgrade1');

    //Student 2 Variables
    var studentname2 = document.getElementById('studentname2');
    var studentbirthdate2 = document.getElementById('studentbirthdate2');
    var studentschool2 = document.getElementById('studentschool2');
    var studentgrade2 = document.getElementById('studentgrade2');

    //Student 3 Variables
    var studentname3 = document.getElementById('studentname3');
    var studentbirthdate3 = document.getElementById('studentbirthdate3');
    var studentschool3 = document.getElementById('studentschool3');
    var studentgrade3 = document.getElementById('studentgrade3');

    //Survey Variables
    var locationorsign = document.getElementById('locationorsign');
    var mailing = document.getElementById('mailing');
    var school = document.getElementById('school');
    var printad = document.getElementById('printad');
    var event = document.getElementById('event');
    var referral = document.getElementById('referral');
    var internet = document.getElementById('internet');
    var other = document.getElementById('other');
    var referralExtra = document.getElementById('referralExtra');               //EVENTUALLY FIX WHETHER referralExtra is label id and referralSource is input id
    var otherExtra = document.getElementById('otherExtra');                     //EVENTUALLY FIX WHETHER otherExtra is label id and otherSource is input id

    //Button Variables
    const resetButton = document.getElementById('ResetButton');
    const submitButton = document.getElementById('SubmitButton');

    //Form Variable
    const form = document.querySelector('form');

    //Google Apps Script URL
    // it should look like: 'https://script.google.com/macros/s/ . . . /exec'
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyv3pkIKHFKXWSMmQDB8wfLzAYVQE4F-lr_hA0C3xEPHJLR0wTPl2D6oufGkkjs9LjZ0w/exec';        // [ ENTER IN YOUR GOOGLE APPS SCRIPT URL HERE!!! ]

    //U.S. Phone Formatting Masking Logic
        //Line 79: function takes in input's value when called
        /**Line 80: declares const variable digits which contains String value
                    keeps value if it is truthy, otherwise uses empty string (to prevent missing value error)
                    removes every non-digit character (\D means any character not 0-9) (g means replace all instances of non-digit characters)
                    keeps only the first 10 digits of value**/
        //Line 81: function returns empty if value has no digits (to prevent empty phone number)
        //Line 82: function returns opening parenthesis and digits if value has 1–3 digits
        //Line 83: function returns first 3 digits in parenthesis (area code) if value has 6 or less digits
        //Line 84: function returns formatted phone number with area code in parenthesis and hyphen 
    function formatPhoneValue(value) {
        const digits = String(value || '').replace(/\D/g, '').slice(0, 10);
        if (digits.length === 0) return '';
        if (digits.length <= 3) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    //Phone Number Textbox Visual Reformatting Changes Code
        //Line 91: function takes in input when called
        //Line 92: function ends if no input element 
        //Line 93: takes input's value as argument for formatPhoneValue function and changes input to new value (puts new formatted phone-number in textbox)
    function formatPhoneInput(input) {
        if (!input) return;
        input.value = formatPhoneValue(input.value);
    }

    //Referral and Other Checkbox Logic
        //Line 104: function runs when called
        /**Line 105: changes referralExtra HTML element's CSS style ([HTML element].style.display)
                     checks whether referral variable checkbox is checked (true or false)
                     makes element visible if true or keeps element hidden if false (? : is a ternary operator that is shorthand for if...else)**/
        /**Line 106: changes otherExtra HTML element's CSS style ([HTML element].style.display)
                     checks whether other variable checkbox is checked (true or false)
                     makes element visible if true or keeps element hidden if false (? : is a ternary operator that is shorthand for if...else)**/
    function updateSourceExtras() {
        referralExtra.style.display = referral.checked ? 'block' : 'none';
        otherExtra.style.display = other.checked ? 'block' : 'none';
    }

    //Instantaneous Phone Textbox Formatting Code While User Types
        //Line 116: declares const array phoneInputs of all phonenumber variables
        //Line 117: does a callback function on each input in phoneInputs array ([array].forEach() loops through every item in array)
        //Line 118: skips to next item if item is empty
        //Line 119: adds input event listener to each existing element
        //Line 120: whenever user types into field, input is used as argument for formatPhoneInput function
        //Line 122: sets maxlength attribute of 14 so input cannot exceed formatted phone number length
    const phoneInputs = [primaryphone1, secondaryphone1, primaryphone2, secondaryphone2, emergencyphonenumber];
    phoneInputs.forEach(function(input) {
        if (!input) return;
        input.addEventListener('input', function() {
            formatPhoneInput(this);
        });
        input.setAttribute('maxlength', '14');
    });

    //Email Validation Code
        //Line 128: function takes in email and when called
        /**Line 129: (email || '') keeps email if it is truthy, otherwise uses empty string (to prevent missing value error)
                     String(...) converts value into a String
                     .trim() removes spaces from beginning and end (but not middle)
                     /.+@.+\..+/ is email pattern: some characters before @, @, some characters after @, period, some character after period
                         . means any character
                         + means one or more of previous thing
                         @ means @ symbol
                         \. means escaped dot or actual period symbol 
                     .test() checks if String matches regex**/
    function isValidEmail(email) {
        return /.+@.+\..+/.test(String(email || '').trim());
    }
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
    }

    //
    function validateParent1Fields() {
        const requiredFields = [
            parentguardian1,
            primaryphone1,
            parentemail1
        ];

        for (const field of requiredFields) {
            if (!field || !String(field.value || '').trim()) {
                alert('Please complete all Parent/Guardian 1 fields before submitting.');
                field && field.focus();
                return false;
            }
        }

        if (!isValidEmail(parentemail1.value)) {
            alert('Please enter a valid email address.');
            parentemail1.focus();
            return false;
        }

        return true;
    }

    function validateStudent1Fields() {
        const requiredFields = [
            studentname1,
            studentgrade1
        ];

        for (const field of requiredFields) {
            if (!field || !String(field.value || '').trim()) {
                alert('Please complete Student Information Field before submitting.');
                field && field.focus();
                return false;
            }
        }

        return true;
    }

    referral.addEventListener('change', updateSourceExtras);
    other.addEventListener('change', updateSourceExtras);
    updateSourceExtras();

    // Reset Button - Event Listener
    resetButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
            form.reset();
            updateSourceExtras();
        }
    });

    // Submit Button - Event Listener
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();

        if (!validateParent1Fields()) {
            return;
        }
        if (!validateStudent1Fields()) {
            return;
        }

        if (!confirm("Are you sure you want to submit the form?")) {
            return;
        }

        fetch(scriptURL, {
            method: 'POST',
            body: new FormData(form)
        })
        .then(function(response) {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.text();
        })
        .then(function() {
            alert('Thank you for your submission!');
            form.reset();
            updateSourceExtras();
            form.querySelector('input, select, textarea')?.focus();
        })
        .catch(function(error) {
            console.error('Form submission error:', error);
            alert('Submission failed. Please try again later.');
        });
    });

// Log when page loads
console.log('Page loaded - JavaScript is working!');
