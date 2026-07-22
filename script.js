/**
 * Portfolio Interactive Scripts
 * Handles modal popups, dynamic telephone unmasking, and keyboard events.
 */

// Protected Phone Number Data
const maskedPhone = "+91 73••••••••";
const realPhone = "+91 7306232616";
let isNumberRevealed = false;

/**
 * Opens a specified modal by element ID and disables background scroll.
 * @param {string} modalId - The DOM ID of the modal container.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "block";
        document.body.style.overflow = "hidden"; // Prevent background scrolling
    }
}

/**
 * Closes a specified modal by element ID and restores background scroll.
 * @param {string} modalId - The DOM ID of the modal container.
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto"; // Restore scrolling
    }
}

/**
 * Toggles and reveals the phone number inside the phone modal and hero badge.
 */
function revealNumber() {
    const modalNumberText = document.getElementById("modal-number-text");
    const heroPhoneDisplay = document.getElementById("phone-display");
    const revealBtn = document.getElementById("reveal-btn");
    const callLink = document.getElementById("call-link");

    if (!isNumberRevealed) {
        // Reveal number
        if (modalNumberText) modalNumberText.textContent = realPhone;
        if (heroPhoneDisplay) heroPhoneDisplay.textContent = realPhone;
        
        if (callLink) {
            callLink.href = "tel:" + realPhone.replace(/\s+/g, '');
            callLink.style.display = "inline-flex";
        }

        if (revealBtn) {
            revealBtn.innerHTML = '<i class="fa-solid fa-eye-slash"></i> Hide Number';
            revealBtn.classList.remove("btn-primary");
            revealBtn.classList.add("btn-outline");
        }

        isNumberRevealed = true;
    } else {
        // Re-mask number
        if (modalNumberText) modalNumberText.textContent = maskedPhone;
        if (heroPhoneDisplay) heroPhoneDisplay.textContent = maskedPhone;

        if (callLink) {
            callLink.style.display = "none";
        }

        if (revealBtn) {
            revealBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Click to Reveal Number';
            revealBtn.classList.remove("btn-outline");
            revealBtn.classList.add("btn-primary");
        }

        isNumberRevealed = false;
    }
}

// Global Event Listeners for Modal Closing
window.addEventListener("click", function (event) {
    // Close modal if user clicks on the dark backdrop overlay
    if (event.target.classList.contains("modal")) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
});

window.addEventListener("keydown", function (event) {
    // Close active modal if user presses the Escape key
    if (event.key === "Escape") {
        const modals = document.querySelectorAll(".modal");
        modals.forEach(function (modal) {
            if (modal.style.display === "block") {
                modal.style.display = "none";
            }
        });
        document.body.style.overflow = "auto";
    }
});