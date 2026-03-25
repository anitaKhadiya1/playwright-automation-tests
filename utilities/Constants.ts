export class Constants {
  // Registration-related constants
  static readonly OPENCART_TITLE = 'OpenCart';
  static readonly REGISTER_ACCOUNT_TITLE = 'Register Account';
  static readonly PRIVACY_POLICY_WARNING = 'Warning: You must agree to the Privacy Policy!';
  
  // Registration form error messages
  static readonly FIRST_NAME_ERROR = 'First Name must be between 1 and 32 characters!';
  static readonly LAST_NAME_ERROR = 'Last Name must be between 1 and 32 characters!';
  static readonly EMAIL_ERROR = 'E-Mail Address does not appear to be valid!';
  static readonly TELEPHONE_ERROR = 'Telephone must be between 3 and 32 characters!';
  static readonly PASSWORD_ERROR = 'Password must be between 4 and 20 characters!';
  static readonly CAPTCHA_ERROR = 'Verification code does not match the image!';

  //Related constants
  static readonly NOMATCH_WARNING_MESSAGE = 'Warning: No match for E-Mail Address and/or Password.';
  static readonly EMAIL_NOTFOUND_MESSAGE = 'Warning: The E-Mail Address was not found in our records, please try again!';
}