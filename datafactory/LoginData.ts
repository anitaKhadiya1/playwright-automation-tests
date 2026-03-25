import { Login } from '../dataobject/LoginDataObject';
import { PlayWrightHelper } from '../utilities/PlaywrightHelper'; 
const playWrightHelper = new PlayWrightHelper(); // Instantiate the helper

export function generateLoginData() {
  return {
    email: playWrightHelper.generateRandomEmail(), 
    password: playWrightHelper.generateRandomPassword(), 
  };
}

export class LoginData {
  static getLoginValidDetails(): Login {
    return new Login({
      email: "superadmin",
      password: "passsupersoulfighterpass",
    });
  }
}

