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

    //Instantaneous Phone Textbox Formatting Code While User Types
        //Line 106: declares const array phoneInputs of all phonenumber variables
        //Line 107: does a callback function on each input in phoneInputs array ([array].forEach() loops through every item in array)
        //Line 108: skips to next item if item is empty
        //Line 109: adds input event listener with anonymous function to each existing element
            //Line 110: whenever user types into field, input is used as argument for formatPhoneInput function
        //Line 112: sets maxlength attribute of 14 so input cannot exceed formatted phone number length
    const phoneInputs = [primaryphone1, secondaryphone1, primaryphone2, secondaryphone2, emergencyphonenumber];
    phoneInputs.forEach(function(input) {
        if (!input) return;
        input.addEventListener('input', function() {
            formatPhoneInput(this);
        });
        input.setAttribute('maxlength', '14');
    });

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//REFERRAL & OTHER: VISIBILITY, EVENT LISTENER

    //Referral and Other Checkbox Visibility Logic
        //Line 126: function runs when called
        /**Line 127: changes referralExtra HTML element's CSS style ([HTML element].style.display)
                     checks whether referral variable checkbox is checked (true or false)
                     makes element visible if true or keeps element hidden if false (? : is a ternary operator that is shorthand for if...else)**/
        /**Line 128: changes otherExtra HTML element's CSS style ([HTML element].style.display)
                     checks whether other variable checkbox is checked (true or false)
                     makes element visible if true or keeps element hidden if false (? : is a ternary operator that is shorthand for if...else)**/
    function updateSourceExtras() {
        referralExtra.style.display = referral.checked ? 'block' : 'none';
        otherExtra.style.display = other.checked ? 'block' : 'none';
    }

    //Event Listener For Referral And Other Checkbox Changes
        //Line 135: runs function updateSourceExtras when referral element state is changed (checked -> unchecked or unchecked -> checked)
        //Line 136: runs function updateSourceExtras when other element state is changed (checked -> unchecked or unchecked -> checked)
        //Line 137: runs function updateSourceExtras immediately to set correct visisbility of referral and other checkboxes
    referral.addEventListener('change', updateSourceExtras);
    other.addEventListener('change', updateSourceExtras);
    updateSourceExtras();

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//VALIDATION CHECKS: EMAIL, PARENT, STUDENT 

    /**Simple Email Validation Code
        Line 154: function takes in email and when called
        Line 155: (email || '') keeps email if it is truthy, otherwise uses empty string (to prevent missing value error)
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
        //Line 177: function takes in email and when called
        /**Line 178: (email || '') keeps email if it is truthy, otherwise uses empty string (to prevent missing value error)
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

    //Parent/Guardian 1 Field Validation Code
        //Line 194: function runs when called
        //Line 195: declare array variable requiredFields containg all required Parent/Guardian 1 input elements
        //Line 196: for-loop goes through each item in array requireFields and stores in variable field
            //Line 197: checks if field doesn't exist or field's value is empty
            //Line 198: if so, it sends alert that fields are required
            //Line 199: places keyboard cursor (focus) into that input field
            //Line 200: immediately exits function
        //Line 203: checks if parentemail1's input value is a valid email address using function isValidEmail()
            //Line 204: if not, it sends alert to input valid email
            //Line 205: places keyboard cursor (focus) into parentemail1 field
            //Line 206: immediately exits function
        //Line 208: if all required parent fields passed, returns true for validation  
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
        return true;
    }

    //Student 1 Field Validation Code
        //Line 220: function runs when called
        //Line 221: declare array variable requiredFields containg all required Student 1 input elements
        //Line 222: for-loop goes through each item in array requireFields and stores in variable field
            //Line 223: checks if field doesn't exist or field's value is empty
            //Line 224: if so, it sends alert that fields are required
            //Line 225: places keyboard cursor (focus) into that input field
            //Line 226: immediately exits function
        //Line 229: if all required parent fields passed, returns true for validation  
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
        //Line 241: runs anonymous event when resetButton is clicked
        //Line 242: prevents browser's normal behavior (immediately clears form without alerting)
        //Line 243: asks user for confirmation to reset form (OK or Cancel)
        //Line 244: resets all input values in all fields within form
        //Line 245: runs function updateSourceExtras immediately to set correct visisbility of referral and other checkboxes
    resetButton.addEventListener("click", function(event) {
        event.preventDefault();
        if (confirm("Are you sure you want to reset the form? All data will be lost.")) {
            form.reset();
            updateSourceExtras();
        }
    });

    //Event Listener For Submit Button Clicks
        //Line 270: runs anonymous event when resetButton is clicked
        //Line 271: prevents browser's normal behavior (immediately submits form without alerting)
        //Line 272: runs Parent Validation Code and if not valid exits function before submission
        //Line 273: runs Student Validation Code and if not valid exits function before submission
        //Line 274: asks user for confirmation to submit form (OK or Cancel), if Cancel it exits function before submission
        //Line 276: sends fetch() request to server (scriptURL is destination URL where form data is sent to)
            //Line 277: POST method sends new data
            //Line 278: creates new package FormData containing all form fields
        //Line 280: when server responds to fetch() request, following function runs (response is stored in variable response)
            //Line 281: checks if request succeeded
            //Line 282: if failed, creates error and jumps to .catch()
            //Line 284: converts response into readable text and server returns message
        //Line 286: after server successfully process response (submits form)
            //Line 287: sends alert that form is submitted
            //Line 288: resets all input values in all fields within form
            //Line 289: runs function updateSourceExtras immediately to set correct visisbility of referral and other checkboxes
            //Line 290: places keyboard cursor (focus) into first input, select, or textarea field of form (? is a chaining operator preventing error if no such fields exist) 
        //Line 292: if something fails: internet problem, server error, invalid URL, network failure
            //Line 293: prints error details to browser console
            //Line 294: sends alert of failed submission and to try later
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
