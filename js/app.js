const name = document.getElementById("name");
const email = document.getElementById("mail");
const otherTitle = document.getElementById("other-title");
const title = document.getElementById("title");
const colorDiv = document.getElementById("colors-js-puns");
const design = document.getElementById("design");
const activities = document.querySelector('.activities');
const paypal = document.getElementById("paypal");
const bitcoin = document.getElementById("bitcoin");
const payment = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const form = document.querySelector('form');
const firstSection = document.getElementById("first-section");
const ccnum = document.getElementById("cc-num");
const ccnumField = document.getElementById("ccnum-field");
let creditCardSelected = true;
let ccnumber = '';
let total = 0;
//Set focus on first text field
name.focus();

/*Hide other Job role input field and display it based on the value of job role.
*/
otherTitle.style.display = "none";
title.addEventListener('change', (e)=> {
    if (e.target.value === 'other') {
    otherTitle.style.display = "";
  }
});

/* Hide the colour label and select menu until a T-Shirt design is selected from
the 'Design' menu.
*/
colorDiv.style.display = "none";
/*Event Listener for design dropdown. Displays Tshirt color based on the selected
design
*/
design.addEventListener('change', (e)=> {

  const designSelection = e.target.value;
  const color = document.getElementById("color");
  const colors = color.children;

  //Function to display the color matching to the selected design.
  function selectColor(color1, color2, color3) {
    colorDiv.style.display = "";
    let firstIndex = true;

    for (let i = 0; i<colors.length; i++) {

        colors[i].style.display = "none";
        if(colors[i].value === color1 || colors[i].value === color2 || colors[i].value === color3 ) {
            colors[i].style.display = "";
            if (firstIndex) {
                color.selectedIndex = i;
                firstIndex = false;
            }

        }

    }

  }

  if(designSelection === 'js puns') {
    selectColor("cornflowerblue", "darkslategrey", "gold");
  }
  else if (designSelection === 'heart js') {
      selectColor("tomato", "steelblue", "dimgrey");
  }
  else {
    colorDiv.style.display = "none";
  }
});

/* Event Listener for activities, when an activity is selected, disable any conflicting
activity. Dispalys a running total for activities selected.
*/
activities.addEventListener('change', (e)=>{

  const checkbox = e.target;
  const checked = checkbox.checked;
  const label = checkbox.parentNode;
  const string = label.textContent;
  const activityList = activities.querySelectorAll('label');

  const fee = parseInt(string.substr(-3));
  const checkedTime = string.substring(string.indexOf("—")+1,string.indexOf(","));

  if (checked){
    total += fee;
    for(let i=0; i<activityList.length; i++) {
      if (activityList[i] != label) {
        const tempString = activityList[i].textContent;
        const tempTime = tempString.substring(tempString.indexOf("—")+1,tempString.indexOf(","));
        if (checkedTime === tempTime) {
          activityList[i].style.color = 'grey';
          activityList[i].firstElementChild.disabled = true;

        }
      }

    }
  }
  else {

    total -= fee;
    for(let i=0; i<activityList.length; i++) {
      if (activityList[i] != label) {
        const tempString = activityList[i].textContent;
        const tempTime = tempString.substring(tempString.indexOf("—")+1,tempString.indexOf(","));
        if (checkedTime === tempTime) {
          activityList[i].style.color = 'black';
          activityList[i].firstElementChild.disabled = false;

        }
      }

    }
  }

  const para = activities.querySelector('p');
  if (para != null) {
      para.remove();
  }

  if (total > 0) {
    const p = document.createElement('p');
    p.textContent = "Total: " + total ;
    activities.appendChild(p);
  }
});

//Hide paypal and bitcoin options
paypal.style.display = 'none';
bitcoin.style.display = 'none';

/*Event listener for payment section. Displays payment sections based on the payment
options.
*/
payment.addEventListener('change', (e)=> {

  const paymentMethod = e.target.value;
  paypal.style.display = 'none';
  bitcoin.style.display = 'none';
  creditCard.style.display = 'none';
  if (paymentMethod === 'credit card' || paymentMethod === 'select_method') {
    creditCard.style.display = '';
    creditCardSelected = true;
  }
  else if (paymentMethod === 'paypal') {
    paypal.style.display = '';
    creditCardSelected = false;
  }
  else {
    bitcoin.style.display = '';
    creditCardSelected = false;
  }

});

//Function to remove the error message
function removeError(className){
  const errorPara = document.querySelector(className);
  if (errorPara !=null) {
      errorPara.remove();
  }
}

/*Real time credit card number validation
*/
ccnum.addEventListener('keyup', (e)=>{

  let errorMsg = '';
  ccnumber = ccnum.value.trim();
  if (isNaN(ccnumber) || (Math.floor(ccnumber) != ccnumber ) ) {
      errorMsg = "Card number should be numeric";
  }
  else if (ccnumber.length < 13 || ccnumber.length > 16) {
        errorMsg = "credit card number should be a 13 to 16 digit number";

    }

  removeError(".ccnum-error");
  ccnum.style.borderColor ='';

  if (errorMsg != '') {
    const errorPara = document.createElement('p');
    errorPara.textContent = errorMsg;
    errorPara.style.color = 'red';
    errorPara.className = "ccnum-error"
    creditCard.insertBefore(errorPara,ccnumField);
    ccnum.style.borderColor ='red';

  }


});
/*Form submission : Prevent the form form submission; validate name, email, activity,
card number, zip and CVV and display appropriate error messages; if no error, submit the
form.
*/
form.addEventListener('submit', (e)=> {

  e.preventDefault();

  let errorMsg = '';
  const checkBoxList = activities.querySelectorAll('input');
  const zip = document.getElementById('zip');
  const zipField = document.getElementById('zip-field');
  const cvv = document.getElementById('cvv');
  const label = activities.querySelector('label');
  let activitySelected = false;
  let zipError = '';
  let cvvError = '';
  let errorFound = false;

  //Function to display the error message
  function displayError(className,section,sibling) {
    const errorPara = document.createElement('p');
    errorPara.textContent = errorMsg;
    errorPara.style.color = 'red';
    errorPara.className = className;
    section.insertBefore(errorPara,sibling);
    errorMsg = '';
    errorFound = true;
  }


  //function to validate the email
  function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
  }

  /*Validate name : check whether the name is entered
  */
  function validateName() {

    removeError('.name-error');
    name.style.borderColor ='';

    if(name.value === '') {
      errorMsg = "Name can't be empty"
      displayError("name-error",firstSection,name);
      name.style.borderColor ='red';
    }

  }

  /*Validate email: check whether the email is entered, validate the email by calling the
  function validateEmail
  */
  function validateMail(){
    if(email.value === '') {
      errorMsg = "Email can't be empty"
    }
    else if (!validateEmail(email.value)) {
        errorMsg = 'Invalid Email Id';
    }

    removeError('.email-error');
    email.style.borderColor ='';

    if (errorMsg != '') {
      displayError("email-error",firstSection,email);
      email.style.borderColor ='red';
      }
  }

  /*validate activity: check whether atleast one activity is selected.
  */
  function validateActivity(){

    removeError('.activity-error');
    for(let i=0; i<checkBoxList.length; i++) {
        if (checkBoxList[i].checked) {
        activitySelected = true;
        break;
      }
    }
    if (!activitySelected) {
        errorMsg = "Please select an activity";
        displayError("activity-error",activities,label);
    }

  }

  /*Function to validate the ZIP and CVV input
  */
  function validateNum(number,length,field) {
    let message = '';
    number = number.trim();
    if (number === '') {
        message = field + " can't be empty ";
        zipError = true;
    }
    else if (isNaN(number) || (Math.floor(number) != number ) ) {
        message = field +" should be numeric ";
    }
    else if (number.length != length) {
          message =  field + " should be a " + length + " digit number ";

      }
      return message;

  }

  /*Validate Credit card info: check whether the card number, ZIP and CVV are entered and ZIP
  and CVV are valid or not.
  */
  function validateCard(){

     removeError('.card-error');

     zip.style.borderColor ='';
     ccnum.style.borderColor ='';
     cvv.style.borderColor ='';

    //Validate credit card number: check whether the card number is entered.

    ccnumber = ccnum.value.trim();
    if (ccnumber === '') {
        errorMsg = "Credit card number can't be empty ";
         ccnum.style.borderColor ='red';
    }

   // Validate ZIP : check whether ZIP is enterd and it is a 5 digit number

    zipError = validateNum(zip.value,5,"Zip");
    if(zipError != '') {
        errorMsg += zipError;
         zip.style.borderColor ='red';
    }

    // Validate CVV: check whether CVV is enterd and it is a 3 digit number

    cvvError = validateNum(cvv.value,3,"CVV");
    if(cvvError != '') {
        errorMsg += cvvError;
         cvv.style.borderColor ='red';
    }

    if (errorMsg != '') {
      displayError("card-error",creditCard,ccnumField);
    }

  }

  validateName();
  validateMail();
  validateActivity()
  if (creditCardSelected) {
      validateCard();
  }


  if(!errorFound) {
      form.submit();
    }

});
