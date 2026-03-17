// Array to store users
let users = [];

// Function to validate user input
function validateUser(name, email, dob) {
    if (!name || name.trim().length < 3) {
        throw new Error("Name must be at least 3 characters long");
    }

    if (!email.includes("@") || !email.includes(".")) {
        throw new Error("Invalid email format");
    }

    let birthDate = new Date(dob);
    if (isNaN(birthDate.getTime())) {
        throw new Error("Invalid date of birth");
    }

    return true;
}

// Function to add user
function addUser(name, email, dob) {
    try {
        // Validation
        validateUser(name, email, dob);

        // String manipulation
        let formattedName = name.trim().toUpperCase();

        // Date handling
        let birthDate = new Date(dob);
        let today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();

        // User object
        let user = {
            name: formattedName,
            email: email.toLowerCase(),
            dob: birthDate.toDateString(),
            age: age
        };

        // Array usage
        users.push(user);

        console.log("User added successfully!");
    } catch (error) {
        // Error Handling
        console.log("Error:", error.message);
    }
}

// Function to display users
function displayUsers() {
    console.log("\nRegistered Users:");
    users.forEach((user, index) => {
        console.log(
            `${index + 1}. ${user.name} | ${user.email} | ${user.dob} | Age: ${user.age}`
        );
    });
}

// Test Data
addUser("Rahul Sharma", "rahul@gmail.com", "2000-05-15");
addUser("An", "invalidemail", "abc"); // Invalid input
addUser("Priya Patel", "priya@gmail.com", "1998-10-20");

// Display all users
displayUsers();