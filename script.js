/**
 * Portfolio Interactive Scripts
 * Handles modal animations, unmasking, copy-to-clipboard, and keyboard events.
 */

// Protected Phone Number Data
const maskedPhone = "+91 73••••••••";
const realPhone = "+91 7306850933";
let isNumberRevealed = false;

/**
 * Opens a modal with a display switch and smooth opacity fade-in.
 * @param {string} modalId - The DOM ID of the target modal.
 */
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    // Set display block first
    modal.style.display = "block";
    modal.classList.add("active");
    document.body.style.overflow = "hidden"; // Block body scrolling

    // Fade in
    requestAnimationFrame(() => {
        modal.style.opacity = "1";
    });
}

/**
 * Closes a target modal with a smooth fade-out and display hide.
 * @param {HTMLElement|string} modalTarget - Modal DOM element or modal element ID.
 */
function closeModal(modalTarget) {
    const modal = typeof modalTarget === "string" ? document.getElementById(modalTarget) : modalTarget;
    if (!modal) return;

    modal.style.opacity = "0";
    setTimeout(() => {
        modal.classList.remove("active");
        modal.style.display = "none";
        
        // Restore background scroll only if no active modals remain
        if (!document.querySelector('.modal.active')) {
            document.body.style.overflow = "auto";
        }
    }, 200);
}

/**
 * Toggles phone number visibility inside the Hero section and Phone modal.
 */
function revealNumber() {
    const modalNumberText = document.getElementById("modal-number-text");
    const heroPhoneDisplay = document.getElementById("phone-display");
    const revealBtn = document.getElementById("reveal-btn");
    const callLink = document.getElementById("call-link");
    const copyBtn = document.getElementById("copy-btn");

    if (!isNumberRevealed) {
        // Format number (+91 73068 50933)
        const formattedPhone = realPhone.replace(/(\+\d{2})(\d{5})(\d{5})/, '$1 $2 $3');

        if (modalNumberText) modalNumberText.textContent = formattedPhone;
        if (heroPhoneDisplay) heroPhoneDisplay.textContent = formattedPhone;
        
        if (callLink) {
            callLink.href = "tel:" + realPhone.replace(/\s+/g, '');
            callLink.style.display = "inline-flex";
        }

        if (copyBtn) {
            copyBtn.style.display = "inline-flex";
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

        if (callLink) callLink.style.display = "none";
        if (copyBtn) copyBtn.style.display = "none";

        if (revealBtn) {
            revealBtn.innerHTML = '<i class="fa-solid fa-eye"></i> Click to Reveal Number';
            revealBtn.classList.remove("btn-outline");
            revealBtn.classList.add("btn-primary");
        }

        isNumberRevealed = false;
    }
}

/**
 * Copies text string to clipboard with interactive feedback.
 * @param {string} text - The text string to copy.
 * @param {HTMLElement} btnElement - The button element triggered by the click.
 */
async function copyToClipboard(text, btnElement) {
    try {
        await navigator.clipboard.writeText(text);
        const originalContent = btnElement.innerHTML;
        btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
        setTimeout(() => {
            btnElement.innerHTML = originalContent;
        }, 2000);
    } catch (err) {
        console.error("Clipboard copy failed: ", err);
    }
}

// Global Event Listeners
document.addEventListener("click", function (event) {
    // Close modal when clicking on the backdrop
    if (event.target.classList.contains("modal")) {
        closeModal(event.target);
    }
});

document.addEventListener("keydown", function (event) {
    // Close active modals on 'Escape' key press
    if (event.key === "Escape") {
        const activeModals = document.querySelectorAll(".modal.active");
        activeModals.forEach(function (modal) {
            closeModal(modal);
        });
    }
});