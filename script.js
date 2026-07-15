//DECLARE VARIABLES OF HTML ELEMENTS
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
    var referralExtra = document.getElementById('referralExtra');
    var internetExtra = document.getElementById('internetExtra');               
    var otherExtra = document.getElementById('otherExtra');                     

    //Button Variables
    const resetButton = document.getElementById('ResetButton');
    const submitButton = document.getElementById('SubmitButton');

    //Form Variable
    const form = document.querySelector('form');

    //Google Apps Script URL (it should look like: 'https://script.google.com/macros/s/ . . . /exec')
    const scriptURL = 'https://script.google.com/macros/s/AKfycbycjB1zykcoR3isxcFzT6ni4ANBjhn1nX7ZuYweYQz3KBAfAcUgRrv-k2z_J68iY4xBnA/exec';        // [ REPLACE YOUR GOOGLE APPS SCRIPT DEPLOYMENT WEB APP URL HERE!!! ]

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//PHONE NUMBER: FORMATTING, VISIBILITY, EVENT LISTENER

    //U.S. Phone Formatting Masking Logic
        //Line 82: function takes in input's value when called
        /**Line 83: declares const variable digits which contains String value
                    keeps value if it is truthy, otherwise uses empty string (to prevent missing value error)
                    removes every non-digit character (\D means any character not 0-9) (g means replace all instances of non-digit characters)
                    keeps only the first 10 digits of value**/
        //Line 84: function returns empty if value has no digits (to prevent empty phone number)
        //Line 85: function returns opening parenthesis and digits if value has 1–3 digits
        //Line 86: function returns first 3 digits in parenthesis (area code) if value has 6 or less digits
        //Line 87: function returns formatted phone number with area code in parenthesis and hyphen 
    function formatPhoneValue(value) {
        const digits = String(value || '').replace(/\D/g, '').slice(0, 10);
        if (digits.length === 0) return '';
        if (digits.length <= 3) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    //Phone Number Textbox Visual Reformatting Changes Code
        //Line 94: function takes in input when called
        //Line 95: function ends if no input element 
        //Line 96: takes input's value as argument for formatPhoneValue function and changes input to new value (puts new formatted phone-number in textbox)
    function formatPhoneInput(input) {
        if (!input) return;
        input.value = formatPhoneValue(input.value);
    }

    //Phone Number Validation Code (requires 10 digits)
        //Line 106: function takes in phone number and runs when called
        /**Line 107: declares const variable digits which contains String value
                    keeps value if it is truthy, otherwise uses empty string (to prevent missing value error)
                    removes every non-digit character (\D means any character not 0-9) (g means replace all instances of non-digit characters)
                    keeps only the first 10 digits of value**/
        //Line 108: returns whether phone number is 10 digits long exactly
    function isValidPhone(phone) {
        const digits = String(phone || '').replace(/\D/g, '');
        return digits.length === 10;
    }

    //Instantaneous Phone Textbox Formatting Code While User Types
        //Line 128: declares const array phoneInputs of all phonenumber variables
        //Line 129: does a callback function on each input in phoneInputs array ([array].forEach() loops through every item in array)
        //Line 130: skips to next item if item is empty
        //Line 131: adds input event listener with anonymous function to each existing element
            //Line 132: whenever user types into field, input is used as argument for formatPhoneInput function
            //Line 133: clears any custom validation error message previously set on form element
        //Line 135: when user leaves input field, anonymous function follows
            //Line 136: declares const variable digits which contains value of input field without non-digit characters
            //Line 137: if input field value has no digits (empty)
                //Line 138: clears any custom validation error messages previously/currently shown
                //Line 139: exits function
            //Line 141: if input field does not have 10 digits
                //Line 142: writes custom validation error message to enter valid phone number
                //Line 143: displays validation message immediately
            //Line 146: clears any custom validation error messages previously/currently shown
        //Line 149: sets maxlength attribute of 14 so input cannot exceed formatted phone number length
    const phoneInputs = [primaryphone1, secondaryphone1, primaryphone2, secondaryphone2, emergencyphonenumber];
    phoneInputs.forEach(function(input) {
        if (!input) return;
        input.addEventListener('input', function() {
            formatPhoneInput(this);
            this.setCustomValidity('');
        });
        input.addEventListener('blur', function() {
            const digits = this.value.replace(/\D/g, '');
            if (digits.length === 0) {
                this.setCustomValidity('');
                return;
            }
            if (digits.length !== 10) {
                this.setCustomValidity('Please enter a complete 10-digit phone number.');
                this.reportValidity();
            }
            else {
                this.setCustomValidity('');
            }
        });
        input.setAttribute('maxlength', '14');
    });

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//REFERRAL & OTHER: VISIBILITY, EVENT LISTENER

    //Referral and Other Checkbox Visibility Logic
        //Line 166: function runs when called
        /**Line 167: changes referralExtra HTML element's CSS style ([HTML element].style.display)
                     checks whether referral variable checkbox is checked (true or false)
                     makes element visible if true or keeps element hidden if false (? : is a ternary operator that is shorthand for if...else)**/
        /**Line 168: changes otherExtra HTML element's CSS style ([HTML element].style.display)
                     checks whether other variable checkbox is checked (true or false)
                     makes element visible if true or keeps element hidden if false (? : is a ternary operator that is shorthand for if...else)**/
        /**Line 169: changes internetExtra HTML element's CSS style ([HTML element].style.display)
                     checks whether other variable checkbox is checked (true or false)
                     makes element visible if true or keeps element hidden if false (? : is a ternary operator that is shorthand for if...else)**/
    function updateSourceExtras() {
        referralExtra.style.display = referral.checked ? 'block' : 'none';
        otherExtra.style.display = other.checked ? 'block' : 'none';
        internetExtra.style.display = internet.checked ? 'block' : 'none';
    }

    //Event Listener For Referral And Other Checkbox Changes
        //Line 177: runs function updateSourceExtras when referral element state is changed (checked -> unchecked or unchecked -> checked)
        //Line 178: runs function updateSourceExtras when other element state is changed (checked -> unchecked or unchecked -> checked)
        //Line 179: runs function updateSourceExtras when other element state is changed (checked -> unchecked or unchecked -> checked)
        //Line 180: runs function updateSourceExtras immediately to set correct visisbility of referral and other checkboxes
    referral.addEventListener('change', updateSourceExtras);
    other.addEventListener('change', updateSourceExtras);
    internet.addEventListener('change', updateSourceExtras);
    updateSourceExtras();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//VALIDATION CHECKS: EMAIL, PARENT, STUDENT 

    /**Simple Email Validation Code
        Line 196: function takes in email and when called
        Line 197: (email || '') keeps email if it is truthy, otherwise uses empty string (to prevent missing value error)
                     String(...) converts value into a String
                     .trim() removes spaces from beginning and end (but not middle)
                     /.+@.+\..+/ is email pattern: some characters before @, @, some characters after @, period, some character after period
                         . means any character
                         + means one or more of previous thing
                         @ means @ symbol
                         \. means escaped dot or actual period symbol 
                     .test() checks if String matches regex (inside /.../)
    function isValidEmail(email) {
        return /.+@.+\..+/.test(String(email || '').trim());
    }**/

    //Stricter Email Validation Code
        //Line 219: function takes in email and when called
        /**Line 220: (email || '') keeps email if it is truthy, otherwise uses empty string (to prevent missing value error)
                     String(...) converts value into a String
                     .trim() removes spaces from beginning and end (but not middle)
                     /^[^\s@]+@[^\s@]+\.[^\s@]+$/ is email pattern: some characters before @, @, some characters after @, period, some character after period
                         1. ^ means start of the string
                         2. [^\s@]+ means one or more characters that are NOT whitespace (\s) or @
                             a. [] means character class
                             b. ^ inside [] means NOT
                             c. \s means whitespace: space, tab, newline
                             d. @ means @ symbol
                             e. + means one or more of previous thing
                         3. @ means @ symbol
                         4. [^\s@]+ means one or more characters that are NOT whitespace (\s) or @
                         5. \. means escaped dot or actual period symbol
                         6. [^\s@]+ means one or more characters that are NOT whitespace (\s) or @
                         7. $ means end of the string
                     .test() checks if String matches regex (inside /.../)**/
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
    }

    //Email Textbox Validation Message When User Exits Input Field
        //Line 238: declares const array emailInputs of all email variables
        //Line 239: does a callback function on each input in emailInputs array ([array].forEach() loops through every item in array)
        //Line 240: skips to next item if item is empty
        //Line 241: adds input event listener with anonymous function to each existing element
            //Line 242: clears any custom validation error message previously set on form element
        //Line 244: when user leaves input field, anonymous function follows
            //Line 245: declares const variable email which contains value of input field without leading or trailing spaces
            //Line 247: if input field value has no characters (empty)
                //Line 248: clears any custom validation error messages previously/currently shown
                //Line 249: exits function
            //Line 251: uses function isValidEmail() to check if input field has a valid email format
                //Line 252: writes custom validation error message to enter valid email address
                //Line 253: displays validation message immediately
            //Line 256: clears any custom validation error messages previously/currently shown for email fields
    const emailInputs = [parentemail1, parentemail2];
    emailInputs.forEach(function(input) {
        if (!input) return;
        input.addEventListener('input', function() {
            this.setCustomValidity('');
        });
        input.addEventListener('blur', function() {
            const email = this.value.trim();
            //Allow blank optional email fields
            if (email.length === 0) {
                this.setCustomValidity('');
                return;
            }
            if (!isValidEmail(email)) {
                this.setCustomValidity('Please enter a complete valid email address.');
                this.reportValidity();
            } 
            else {
                this.setCustomValidity('');
            }
        });
    });

    //Parent/Guardian 1 Field Validation Code
        //Line 294: function runs when called
        //Line 295: declare array variable requiredFields containg all required Parent/Guardian 1 input elements
        //Line 296: for-loop goes through each item in array requireFields and stores in variable field
            //Lin3 297: checks if field doesn't exist or field's value is empty
            //Line 298: if so, it sends alert that fields are required
            //Line 299: places keyboard cursor (focus) into that input field
            //Line 300: immediately exits function
        //Line 303: checks if parentemail1's input value is a valid email address using function isValidEmail()
            //Line 304: if not, it sends alert to input valid email
            //Line 305: places keyboard cursor (focus) into parentemail1 field
            //Line 306: immediately exits function
         //Line 308: checks if primaryphone1's input value is a valid phone number using function isValidPhone()
            //Line 309: if not, it sends alert to input valid phone number
            //Line 310: places keyboard cursor (focus) into primaryphone1 field
            //Line 311: immediately exits function
         //Line 314: checks if secondaryphone1's input value is empty and a valid phone number using function isValidPhone()
            //Line 315: if not, it sends alert to enter complete phone number in field
            //Line 316: places keyboard cursor (focus) into that field
            //Line 317: immediately exits function
        //Line 319: checks if primaryphone2's input value is empty and a valid phone number using function isValidPhone()
            //Line 320: if not, it sends alert to enter complete phone number in field
            //Line 321: places keyboard cursor (focus) into that field
            //Line 322: immediately exits function
        //Line 324: checks if secondaryphone2's input value is empty and a valid phone number using function isValidPhone()
            //Line 325: if not, it sends alert to enter complete phone number in field
            //Line 326: places keyboard cursor (focus) into that field
            //Line 327: immediately exits function
        //Line 329: checks if emergencyphonenumber's input value is empty and a valid phone number using function isValidPhone()
            //Line 330: if not, it sends alert to enter complete phone number in field
            //Line 331: places keyboard cursor (focus) into that field
            //Line 332: immediately exits function
        //Line 334: if all required parent fields passed, returns true for validation  
    function validateParent1Fields() {
        const requiredFields = [parentguardian1, primaryphone1, parentemail1];
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
        if (!isValidPhone(primaryphone1.value)) {
            alert('Please enter a complete 10-digit primary phone number.');
            primaryphone1.focus();
            return false;
        }
        //Optional Phone Fields Validation Code - runs if fields are not empty
        if (secondaryphone1.value.trim() && !isValidPhone(secondaryphone1.value)) {
            alert('Please enter a complete secondary phone number for Parent/Guardian 1.');
            secondaryphone1.focus();
            return false;
        }
        if (primaryphone2.value.trim() && !isValidPhone(primaryphone2.value)) {
            alert('Please enter a complete primary phone number for Parent/Guardian 2.');
            primaryphone2.focus();
            return false;
        }
        if (secondaryphone2.value.trim() && !isValidPhone(secondaryphone2.value)) {
            alert('Please enter a complete secondary phone number for Parent/Guardian 2.');
            secondaryphone2.focus();
            return false;
        }
        if (emergencyphonenumber.value.trim() && !isValidPhone(emergencyphonenumber.value)) {
            alert('Please enter a complete phone number for Emergency Contact.');
            emergencyphonenumber.focus();
            return false;
        }
        return true;
    }

    //Student 1 Field Validation Code
        //Line 3346: function runs when called
        //Line 347: declare array variable requiredFields containg all required Student 1 input elements
        //Line 348: for-loop goes through each item in array requireFields and stores in variable field
            //Line 349: checks if field doesn't exist or field's value is empty
            //Line 350: if so, it sends alert that fields are required
            //Line 351: places keyboard cursor (focus) into that input field
            //Line 352: immediately exits function
        //Line 355: if all required parent fields passed, returns true for validation  
    function validateStudent1Fields() {
        const requiredFields = [studentname1, studentgrade1];
        for (const field of requiredFields) {
            if (!field || !String(field.value || '').trim()) {
                alert('Please complete Student Information Field before submitting.');
                field && field.focus();
                return false;
            }
        }
        return true;
    }

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//BUTTON EVENT LISTENER: RESET, SUBMIT

    //Event Listener For Reset Button Clicks
        //Line 367: runs anonymous event when resetButton is clicked
        //Line 368: prevents browser's normal behavior (immediately clears form without alerting)
        //Line 369: asks user for confirmation to reset form (OK or Cancel)
        //Line 370: resets all input values in all fields within form
        //Line 371: runs function updateSourceExtras immediately to set correct visisbility of referral and other checkboxes
    resetButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
            form.reset();
            updateSourceExtras();
        }
    });

    //Event Listener For Submit Button Clicks
        //Line 396: runs anonymous event when resetButton is clicked
        //Line 397: prevents browser's normal behavior (immediately submits form without alerting)
        //Line 398: runs Parent Validation Code and if not valid exits function before submission
        //Line 399: runs Student Validation Code and if not valid exits function before submission
        //Line 400: asks user for confirmation to submit form (OK or Cancel), if Cancel it exits function before submission
        //Line 402: sends fetch() request to server (scriptURL is destination URL where form data is sent to)
            //Line 403: POST method sends new data
            //Line 404: creates new package FormData containing all form fields
        //Line 406: when server responds to fetch() request, following function runs (response is stored in variable response)
            //Line 407: checks if request succeeded
            //Line 408: if failed, creates error and jumps to .catch()
            //Line 410: converts response into readable text and server returns message
        //Line 412: after server successfully process response (submits form)
            //Line 413: sends alert that form is submitted
            //Line 414: converts response into readable text and server returns message
            //Line 415: runs function updateSourceExtras immediately to set correct visisbility of referral and other checkboxes
            //Line 416: places keyboard cursor (focus) into first input, select, or textarea field of form (? is a chaining operator preventing error if no such fields exist) 
        //Line 418: if something fails: internet problem, server error, invalid URL, network failure
            //Link 419: prints error details to browser console
            //Link 420: sends alert of failed submission and to try later
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (!validateParent1Fields()) { return; }
        if (!validateStudent1Fields()) { return; }
        if (!confirm("Are you sure you want to submit the form?")) { return; }

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

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

//Sends Message In Console Log When Page Loads
console.log('Page loaded - JavaScript is working!');

// Note: EVENT LISTENERS - [ex. element.addEventListener(event, function)]
