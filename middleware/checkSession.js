import axios from 'axios';
const checkSession = async () => {
    try {
        const response = await axios.get('/api/session/check'); // Endpoint to check session
        return response.data.isLoggedIn; // Assuming the server responds with { isLoggedIn: true/false }
    } catch (error) {
        console.error("Error checking session:", error);
        return false; // Assume not logged in if there's an error
    }
};
// Usage
checkSession().then(isLoggedIn => {
    if (isLoggedIn) {
        console.log("User  is logged in.");
    } else {
        console.log("User  is not logged in.");
    }
});

export default checkSession;