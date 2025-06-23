const checkSession = async () => {
        try {
            const response = await fetch('/api/session/check'); // Call the endpoint
            return response.data.isLoggedIn; // Return the login status
        } catch (error) {
            console.error("Error checking session:", error);
            return false; // Assume not logged in if there's an error
        }
    };
    // Example usage
    
        const profileButton = document.querySelector('.person-icon');
        profileButton.addEventListener('click', async () => {
            const isLoggedIn = await checkSession();
            if (isLoggedIn) {
                window.location.href = '/profile';
            } else {
                window.location.href = '/auth/login';
            }
        });
   