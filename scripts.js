// DOM Elements
const profilePicture = document.getElementById('profile-picture');
const profileImg = document.getElementById('profile-img');
const profilePictureUpload = document.getElementById('profile-picture-upload');
const editProfileBtn = document.getElementById('edit-profile-btn');
const editProfileModal = document.getElementById('edit-profile-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const editProfileForm = document.getElementById('edit-profile-form');
const notification = document.getElementById('notification');

// Profile Details
const profileName = document.getElementById('profile-name');
const profileEmail = document.getElementById('profile-email');
const profilePhone = document.getElementById('profile-phone');
const profileDob = document.getElementById('profile-dob');
const profileGender = document.getElementById('profile-gender');
const profileAddress = document.getElementById('profile-address');

// Handle Profile Picture Upload
profilePictureUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            profileImg.src = event.target.result;
            showNotification("Profile picture updated successfully!");
        };
        reader.readAsDataURL(file);
    }
});

// Open Modal
editProfileBtn.addEventListener('click', () => {
    editProfileModal.style.display = 'flex';
});

// Close Modal
closeModalBtn.addEventListener('click', () => {
    editProfileModal.style.display = 'none';
});

// Handle Form Submission
editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Form Data
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const address = document.getElementById('address').value;

    // Update Profile Details
    profileName.innerText = `${firstName} ${lastName}`;
    profileEmail.innerText = email;
    profilePhone.innerText = phone;
    profileDob.innerText = dob;
    profileGender.innerText = gender;
    profileAddress.innerText = address;

    // Close Modal
    editProfileModal.style.display = 'none';

    // Show Notification
    showNotification("Profile updated successfully!");
});

// Show Notification
function showNotification(message) {
    notification.innerText = message;
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 3000);
}