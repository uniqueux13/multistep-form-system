document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const backendUrl = 'http://127.0.0.1:5000/submit'; // Your Flask backend URL

    // --- State ---
    let currentStep = 1;
    const formData = {}; // Object to hold data from ALL steps

    // --- DOM Elements ---
    const steps = document.querySelectorAll('.form-step');
    const responseMessageDiv = document.getElementById('response-message');

    // Buttons
    const nextBtn1 = document.getElementById('next-btn-1');
    const prevBtn2 = document.getElementById('prev-btn-2');
    const nextBtn2 = document.getElementById('next-btn-2');
    const prevBtnFinal = document.getElementById('prev-btn-final');
    const submitBtn = document.getElementById('submit-btn');

    // --- Functions ---
    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            if ((index + 1) === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        // Update state variable - ensure it matches the visible step
        currentStep = stepNumber;
    }

    function collectStepData(stepNumber) {
        // Add data collection logic for each step here
        if (stepNumber === 1) {
            formData.name = document.getElementById('name').value;
            formData.email = document.getElementById('email').value;
        } else if (stepNumber === 2) {
            formData.interest = document.getElementById('interest').value;
            formData.experience = document.getElementById('experience').value;
        } else if (stepNumber === 3) { // Assuming step 3 is the final step
            formData.comments = document.getElementById('comments').value;
        }
        console.log('Current Form Data:', formData); // For debugging
    }

    async function submitForm() {
        console.log('Submitting final data:', formData);
        responseMessageDiv.textContent = 'Submitting...'; // Provide feedback

        try {
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    // IMPORTANT: Tell the server we're sending JSON
                    'Content-Type': 'application/json',
                },
                // IMPORTANT: Convert the JavaScript object to a JSON string
                body: JSON.stringify(formData),
            });

            // Check if the request was successful (status code 2xx)
            if (!response.ok) {
                 // Try to get error details from backend response body
                 const errorData = await response.json().catch(() => ({})); // Get JSON error or empty object
                 const errorMessage = errorData.error || `HTTP error! Status: ${response.status}`;
                 throw new Error(errorMessage);
            }

            // Parse the JSON response from the backend
            const result = await response.json();
            console.log('Success:', result);
            responseMessageDiv.textContent = `Success: ${result.message}`;
            // Optionally: redirect, clear form, show a thank you message, etc.

        } catch (error) {
            console.error('Error submitting form:', error);
            responseMessageDiv.textContent = `Error: ${error.message}`;
        }
    }

    // --- Event Listeners ---

    // Next from Step 1
    nextBtn1?.addEventListener('click', () => {
        collectStepData(1);
        showStep(2);
    });

    // Previous from Step 2
    prevBtn2?.addEventListener('click', () => {
        // No need to collect data again when going back
        showStep(1);
    });

    // Next from Step 2
    nextBtn2?.addEventListener('click', () => {
        collectStepData(2);
        showStep(3); // Assuming step 3 is the final step
    });

    // Previous from Final Step
    prevBtnFinal?.addEventListener('click', () => {
         // No need to collect data again when going back
        showStep(2);
    });

    // Final Submit Button
    submitBtn?.addEventListener('click', () => {
        collectStepData(3); // Collect data from the final step
        submitForm();       // Send all collected data to the backend
    });

    // --- Initial Setup ---
    showStep(1); // Show the first step initially

}); // End DOMContentLoaded