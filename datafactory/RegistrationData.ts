import { PlayWrightHelper } from '../utilities/PlaywrightHelper'; 
const playWrightHelper = new PlayWrightHelper();
// Use the static method here as per the previous data class
export function generateRegistrationData() {
  const { firstName, lastName } = playWrightHelper.generateRandomName();
  const email = playWrightHelper.generateRandomEmail();
  const telephone = playWrightHelper.generateRandomTelephone();
  const password = playWrightHelper.generateRandomPassword();

  return {
    firstName,
    lastName,
    email,
    telephone,
    password,
  };
}
