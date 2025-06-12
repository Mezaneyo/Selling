// script.js

const mobileMoneyOptions = document.querySelectorAll('.mobile-money-option');
const mobileNumber = document.getElementById('mobile-number');
const mobilePin = document.getElementById('mobile-pin');
const payMobileBtn = document.getElementById('pay-mobile');
let selectedProvider = 'airtel';

// Function to validate mobile number
function validateMobileNumber() {
    const value = mobileNumber.value.trim();
    const isValid = /^(088|099)\d{7}$/.test(value);
    if (!isValid) {
        mobileNumber.nextElementSibling.style.display = 'block';
    } else {
        mobileNumber.nextElementSibling.style.display = 'none';
    }
    return isValid;
}

// Function to validate mobile PIN
function validateMobilePin() {
    const value = mobilePin.value.trim();
    const isValid = /^\d{4}$/.test(value);
    if (!isValid) {
        mobilePin.nextElementSibling.style.display = 'block';
    } else {
        mobilePin.nextElementSibling.style.display = 'none';
    }
    return isValid;
}

// Function to show toast message
function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;
    if (isError) {
        toast.style.background = 'var(--error)';
    } else {
        toast.style.background = 'var(--success)';
    }
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

mobileMoneyOptions.forEach(option => {
    option.addEventListener('click', () => {
        mobileMoneyOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        selectedProvider = option.dataset.provider;
    });
});

payMobileBtn.addEventListener('click', async () => {
    // Validate mobile number and PIN
    const isMobileValid = validateMobileNumber() && validateMobilePin();
    if (!isMobileValid) {
        showToast('Please fix the errors in the form', true);
        return;
    }

    payMobileBtn.disabled = true;
    payMobileBtn.innerHTML = '<div class="spinner"></div> Processing...';

    try {
        // Simulate API call to mobile money payment gateway
        await new Promise(resolve => setTimeout(resolve, 1500));
        showToast(`Check your phone to complete ${selectedProvider === 'airtel' ? 'Airtel Money' : 'Mpamba'} payment`);
        setTimeout(() => {
            showToast('Payment successful!');
            payMobileBtn.disabled = false;
            payMobileBtn.textContent = 'Pay with Mobile Money';
        }, 3000);
    } catch (error) {
        showToast('Payment failed. Please try again.', true);
        payMobileBtn.disabled = false;
        payMobileBtn.textContent = 'Pay with Mobile Money';
    }
});