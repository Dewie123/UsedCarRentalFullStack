//manage users

document.addEventListener('DOMContentLoaded', function () {
    // Get the search input and table rows
    const searchInput = document.getElementById('user-search');
    const tableBody = document.querySelector('#manage-users tbody');
    const tableRows = tableBody.getElementsByTagName('tr');

    // Add event listener for input in the search bar
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase(); // Convert search term to lowercase

        // Loop through all the rows in the table
        Array.from(tableRows).forEach(row => {
            const usernameCell = row.cells[2]; // The third column (index 2) contains the username
            const username = usernameCell ? usernameCell.textContent.toLowerCase() : ''; // Get the username

            if (username.includes(searchTerm)) {
                row.style.display = ''; // Show row if the username matches
                row.classList.add('selected'); // Highlight the row
            } else {
                row.style.display = 'none'; // Hide row if the username doesn't match
                row.classList.remove('selected'); // Remove highlight
            }
        });
    });

    // Handle Edit button click
    Array.from(document.querySelectorAll('.edit-btn')).forEach(button => {
        button.addEventListener('click', function () {

            const field = cell.getAttribute('data-field');
            
            if(field !== 'status'){

            const row = button.closest('tr');
            const saveButton = row.querySelector('.save-btn');
            const editButton = row.querySelector('.edit-btn');
            
            // Toggle visibility of buttons
            editButton.style.display = 'none';
            saveButton.style.display = '';

            // Make cells editable by converting them to input fields
            row.querySelectorAll('.editable').forEach(cell => {

                
                
                
                    const cellValue = cell.textContent;
                    cell.innerHTML = `<input type="text" value="${cellValue}" class="input-field">`;

                
                
            });
            }

            
        });
    });

    // Handle Save button click
    Array.from(document.querySelectorAll('.save-btn')).forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            const userId = row.querySelector('[data-field="user_id"] input').value;
    
            // Collect the updated values from the input fields
            const updatedData = {
                user_id: userId,
                username: row.querySelector('[data-field="username"] input').value,
                password: row.querySelector('[data-field="password"] input').value,
                email: row.querySelector('[data-field="email"] input').value,
                name: row.querySelector('[data-field="name"] input').value,
                description: row.querySelector('[data-field="description"] input').value,
                phone_number: row.querySelector('[data-field="phone_number"] input').value,
                user_type: row.querySelector('[data-field="user_type"] input').value
            };
    
            console.log("Sending data to backend:", updatedData);  // Debugging line
    
            // Send updated data to the backend (via an AJAX call)
            fetch('/update_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
            .then(response => response.json())
            .then(data => {
                console.log("Backend response:", data);
                // Check for success and update the row if necessary
                if (data.success) {
                    row.querySelectorAll('.editable').forEach(cell => {
                        const field = cell.getAttribute('data-field');
                        const inputField = cell.querySelector('input');
                        if (inputField) {
                            cell.innerHTML = inputField.value;
                        }
                    });
    
                    // Toggle buttons back to "Edit"
                    button.style.display = 'none';
                    row.querySelector('.edit-btn').style.display = '';
                } else {
                   
                }
            })
            .catch(error => {
                console.error('Error in saving:', error);  // Log fetch error
                
            });
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Get the search input and table rows for car listings
    const searchInput = document.getElementById('listing-search');
    const tableBody = document.querySelector('#manage-listings tbody');  // Target the tbody specifically
    const tableRows = tableBody.getElementsByTagName('tr'); // Get all rows in the table body

    // Add event listener for input in the search bar
    searchInput.addEventListener('input', function () {
        const searchTerm = searchInput.value.toLowerCase(); // Convert search term to lowercase

        // Loop through all the rows in the table
        Array.from(tableRows).forEach(row => {
            const carNameCell = row.cells[2]; // The third column (index 2) contains the car name
            const carName = carNameCell ? carNameCell.textContent.toLowerCase() : ''; // Get the car name

            if (carName.includes(searchTerm)) {
                row.style.display = ''; // Show row if the car name matches
                row.classList.add('selected'); // Highlight the row
            } else {
                row.style.display = 'none'; // Hide row if the car name doesn't match
                row.classList.remove('selected'); // Remove highlight
            }
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const editButtons = document.querySelectorAll('.edit-btn');
    
    editButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr'); // Get the closest row (tr)
            const cells = row.querySelectorAll('.editable');
            
            // Toggle the row between editable form and regular view
            cells.forEach(cell => {
                const field = cell.dataset.field;
                const value = cell.textContent.trim();
                
                // Replace the cell content with an input field prefilled with the existing value
                const input = document.createElement('input');
                input.type = 'text';
                input.value = value;
                input.classList.add('form-control'); // Optional: add a class for styling

                // Add input field to the cell, replacing the text content
                cell.innerHTML = ''; // Clear the current cell content
                cell.appendChild(input);
            });

            // Hide the Edit button and show the Save button
            row.querySelector('.edit-btn').style.display = 'none';
            row.querySelector('.save-btn').style.display = 'inline-block';
        });
    });

    const saveButtons = document.querySelectorAll('.save-btn');
    saveButtons.forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            const cells = row.querySelectorAll('.editable');

            // Collect the updated values
            const updatedData = {};
            cells.forEach(cell => {
                const field = cell.dataset.field;
                updatedData[field] = cell.querySelector('input').value;
            });

            // Here, you can send `updatedData` to your backend to update the user data
            // Use AJAX or a form submission to update the database
            console.log(updatedData);

            // Update the row with the new values
            cells.forEach(cell => {
                const inputValue = cell.querySelector('input').value;
                cell.innerHTML = inputValue; // Set the text content back to the cell
            });

            // Hide the Save button and show the Edit button
            row.querySelector('.save-btn').style.display = 'none';
            row.querySelector('.edit-btn').style.display = 'inline-block';
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    // Handle Deactivate button click
    Array.from(document.querySelectorAll('.deactivate-btn')).forEach(button => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            const userId = row.querySelector('[data-field="user_id"]').textContent;

            // Show confirmation dialog
            const confirmDeactivation = confirm("Are you sure you want to deactivate this user?");
            
            if (confirmDeactivation) {
                // Send a request to deactivate the user
                fetch('/deactivate_user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user_id: userId })
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert(data.message); // Show success message
                        
                        // Update the row to reflect the deactivated status
                        const statusCell = row.querySelector('[data-field="status"]');
                        
                        if (statusCell) {
                            statusCell.textContent = 'Inactive'; // Update status cell
                            statusCell.classList.add('inactive'); // Optionally add a class for styling
                        } else {
                            console.error("Status cell not found in row");
                        }

                        // Optionally disable the deactivate button or change its text
                        button.disabled = true;
                        button.textContent = 'Deactivated';
                    } else {
                        alert(data.message); // Show failure message
                    }
                })
                .catch(error => {
                    console.error('Error in deactivating user:', error);
                    alert('Error deactivating user: ' + error.message);
                });
            }
        });
    });
});


// manage listing

