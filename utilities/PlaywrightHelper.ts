import { faker } from '@faker-js/faker'; // Import faker

export class PlayWrightHelper {

    /**
     * Generates a random email address.
     *
     * @returns - The random email address.
     */
    generateRandomEmail() {
        return faker.string.alphanumeric(8) + '@gmail.com';
    }

    /**
     * Generates a random password.
     * @returns - The random password.
     */
    generateRandomPassword() {
        return faker.internet.password({ length: 10 });
    }

    /**
     * Generates a random first name.
     *
     * @returns - The random first name and last name.
     */
    generateRandomName() {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName()
        };
    }

    /**
     * Generates a random telephone number starting with '07'.
     *
     * @returns - The random telephone number.
     */
    generateRandomTelephone() {
        // Using faker's string.numeric for the digits
        return '07' + faker.string.numeric(9);
    }
}
