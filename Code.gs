function doPost(e) {
  var ss = SpreadsheetApp.openById('1fb8lBHD9YNjT-Zw_8cEu5ME0TZG0ia4ks1qjNIVNwI4');
  var sheet = ss.getSheetByName('Form1');

  function firstVal(value) {
    return Array.isArray(value) ? value[0] : (value || '');
  }

  var sourceValues = (e.parameters && e.parameters.source)
    ? e.parameters.source
    : [e.parameter.source || ''];

  var sourceText = sourceValues
    .map(function(v) { return String(v).trim(); })
    .filter(Boolean)
    .join(', ');

  var referralText = firstVal(
    e.parameters.referralName || e.parameters.referralInput ||
    e.parameter.referralName || e.parameter.referralInput
  );
  var internetOption = firstVal(
    e.parameters.internetSource || e.parameters.internetSource ||
    e.parameter.internetSource || e.parameter.internetSource
  );
  var otherText = firstVal(
    e.parameters.otherSource || e.parameters.otherInput ||
    e.parameter.otherSource || e.parameter.otherInput
  );

  function formatBirthdate(value) {
    if (!value) return '';
    var d = new Date(value);
    if (isNaN(d)) return value;
    return Utilities.formatDate(d, Session.getScriptTimeZone(), 'MM-dd-yyyy');
  }

  var data = [
    new Date(),
    e.parameter.parentguardian1 || '',
    e.parameter.studentrelation1 || '',
    e.parameter.streetaddress1 || '',
    e.parameter.primaryphone1 || '',
    e.parameter.primaryphonetype1 || '',
    e.parameter.secondaryphone1 || '',
    e.parameter.secondaryphonetype1 || '',
    e.parameter.parentemail1 || '',
    e.parameter.parentguardian2 || '',
    e.parameter.studentrelation2 || '',
    e.parameter.streetaddress2 || '',
    e.parameter.primaryphone2 || '',
    e.parameter.primaryphonetype2 || '',
    e.parameter.secondaryphone2 || '',
    e.parameter.secondaryphonetype2 || '',
    e.parameter.parentemail2 || '',
    e.parameter.emergencycontact || '',
    e.parameter.emergencyrelation || '',
    e.parameter.emergencyphonenumber || '',
    e.parameter.studentname1 || '',
    e.parameter.studentschool1 || '',
    formatBirthdate(e.parameter.studentbirthdate1 || ''),
    e.parameter.studentgrade1 || '',
    e.parameter.studentname2 || '',
    e.parameter.studentschool2 || '',
    formatBirthdate(e.parameter.studentbirthdate2 || ''),
    e.parameter.studentgrade2 || '',
    e.parameter.studentname3 || '',
    e.parameter.studentschool3 || '',
    formatBirthdate(e.parameter.studentbirthdate3 || ''),
    e.parameter.studentgrade3 || '',
    sourceText,      // all clicked checkboxes
    referralText,    // separate column
    internetOption,  // separate column
    otherText        // separate column
  ];

  sheet.appendRow(data);
  return ContentService.createTextOutput('Success');
}
