const form = document.getElementById('bookingForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const nights = document.getElementById('nights');
const guests = document.getElementById('guests');
const roomType = document.getElementById('roomType');
const breakfast = document.getElementById('breakfast');
const transfer = document.getElementById('transfer');
const conference = document.getElementById('conference');
const roomCapacityMsg = document.getElementById('roomCapacityMsg');
const guestWarning = document.getElementById('guestWarning');
const transferMsg = document.getElementById('transferMsg');
const totalCostDisplay = document.getElementById('totalCost');
const errorContainer = document.getElementById('errorContainer');

const roomCapacities = {
    'Single': 1,
    'Double': 2,
    'Family': 4
};

const roomRates = {
    'Single': 3500,
    'Double': 5000,
    'Family': 7500
};

function checkRoomCapacity() {
    guestWarning.innerHTML = "";
    roomCapacityMsg.innerHTML = "";
    
    let selectedRoom = roomType.value;
    let guestCount = parseInt(guests.value);

    if (selectedRoom) {
        let maxGuests = roomCapacities[selectedRoom];
        roomCapacityMsg.innerHTML = "Maximum guests for this room: " + maxGuests;
        
        if (guestCount > maxGuests) {
            guestWarning.innerHTML = "Warning: Guests exceed room capacity!";
        }
    }
}

function calculateBill() {
    let selectedRoom = roomType.value;
    let nightCount = parseInt(nights.value) || 0;
    let guestCount = parseInt(guests.value) || 0;
    
    let total = 0;

    if (selectedRoom && nightCount > 0) {
        total += roomRates[selectedRoom] * nightCount;
    }

    if (breakfast.checked && nightCount > 0 && guestCount > 0) {
        total += 700 * guestCount * nightCount;
    }

    if (transfer.checked) {
        total += 2000;
        transferMsg.innerHTML = "A driver will wait at arrivals.";
    } else {
        transferMsg.innerHTML = "";
    }

    if (conference.checked) {
        total += 5000;
    }

    totalCostDisplay.innerHTML = total.toLocaleString();
}

function validateBooking(event) {
    let errors = [];

    if (fullName.value.trim() === "") {
        errors.push("Customer name cannot be empty.");
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        errors.push("Please enter a valid email address.");
    }

    let phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone.value)) {
        errors.push("Phone number must contain exactly 10 digits.");
    }

    let nightCount = parseInt(nights.value);
    if (isNaN(nightCount) || nightCount < 1 || nightCount > 14) {
        errors.push("Number of nights must be between 1 and 14.");
    }

    let guestCount = parseInt(guests.value);
    if (isNaN(guestCount) || guestCount < 1) {
        errors.push("Number of guests must be greater than zero.");
    }

    if (roomType.value === "") {
        errors.push("Please select a room type.");
    }

    if (errors.length > 0) {
        event.preventDefault();
        errorContainer.innerHTML = errors.join("<br>");
    } else {
        errorContainer.innerHTML = "";
    }
}

roomType.addEventListener('change', () => {
    checkRoomCapacity();
    calculateBill();
});

guests.addEventListener('input', () => {
    checkRoomCapacity();
    calculateBill();
});

nights.addEventListener('input', calculateBill);
breakfast.addEventListener('change', calculateBill);
transfer.addEventListener('change', calculateBill);
conference.addEventListener('change', calculateBill);

form.addEventListener('submit', validateBooking);