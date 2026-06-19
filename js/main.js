class TennisAcademyPortal {
    constructor() {
        // Declaring Parallel arrays
        this.venueTokens = ['frameby', 'wembley', 'sunridge', 'harvest'];
        this.mapLinksURLs = [
            "https://www.google.com/maps?q=Hoerskool+Framesby+Tennis+Courts", 
            "https://www.google.com/maps?q=Wembley+Tennis+Club+Port+Elizabeth", 
            "https://www.google.com/maps?q=Sunridge+Primary+School+Tennis", 
            "https://www.google.com/maps?q=Harvest+Christian+School+Tennis"  
        ];
    }

    init() {
        this.bindFormEvents();
        this.bindMapViewerEvents();
        this.initImageLightboxModule();
        this.initSearchEngineModule();
    }

    /* Module: Form Submission Handler */
    bindFormEvents() {
        const enquiryForm = document.getElementById("tennisEnquiryForm");
        const contactForm = document.getElementById("academyContactForm");

        // Listen for form submissions dynamically if they exist on the current page viewport
        if (enquiryForm) {
            enquiryForm.addEventListener("submit", (e) => this.processFormPipeline(e, "enquiryFormViewport"));
        }
        if (contactForm) {
            contactForm.addEventListener("submit", (e) => this.processFormPipeline(e, "contactFormViewport"));
        }
    }

    /* Pure JavaScript Validation & Processing Engine */
    async processFormPipeline(e, viewportId) {
        e.preventDefault(); // Stop native HTML submission tracking instantly
        
        const activeForm = e.target;
        
        // 1. PURE JAVASCRIPT VALIDATION SWEEP
        const formData = new FormData(activeForm);
        let missingFields = [];
        let validationPassed = true;
        
        // Iteration
        for (let [name, value] of formData.entries()) {
            if (!value || value.trim() === "") {
                missingFields.push(name.charAt(0).toUpperCase() + name.slice(1));
                validationPassed = false;
            }
        }
        
        // Custom JavaScript logic flag gate check
        if (!validationPassed) {
            alert(`JavaScript Validation Failed: Please fill in missing data fields -> [ ${missingFields.join(", ")} ]`);
            return; // Halt execution and submission block right here
        }
        
        // 2. CONTINUE SIMULATED ASYNCHRONOUS PIPELINE IF VALID
        const viewportContainer = document.getElementById(viewportId);
        if (!viewportContainer) return;
        
        viewportContainer.innerHTML = `
            <div class="processing-spinner-layer" style="text-align: center; padding: 40px;">
                <p style="color: #002147; font-weight: bold; font-family: sans-serif;">Asynchronously Processing Submission Engine...</p>
            </div>
        `;
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        this.renderCourtSuccessCanvas(viewportContainer);
    }

    /* Output Dynamic UI Retro Scoreboard Template Overlay Canvas */
    renderCourtSuccessCanvas(container) {
        container.innerHTML = `
            <div class="success-canvas-card animate-popup" style="background: #222222; padding: 25px; border-radius: 8px; border: 4px solid #ffffff; text-align: center; color: #ccff00; font-family: monospace; box-shadow: 0 4px 15px rgba(0,0,0,0.3); margin-top: 15px;">
                <h3 style="color: #ffffff; margin-bottom: 15px; font-size: 1.4rem;">🎾 TRANSMISSION SUCCESS 🎾</h3>
                <div style="background: #111111; padding: 15px; border-radius: 4px; margin-bottom: 15px; border: 1px dashed #ccff00;">
                    <p style="font-size: 1.1rem; letter-spacing: 1px; margin: 5px 0;">MATCH SET STATE: SERVER UP</p>
                    <p style="font-size: 1.1rem; letter-spacing: 1px; color: #ffffff; margin: 5px 0;">PIPELINE STATUS: 200 OK</p>
                </div>
                <p style="color: #ffffff; font-size: 0.95rem;">Your registration has been processed successfully by our JavaScript runtime engine. A coordinator will be in touch shortly.</p>
            </div>
        `;
    }

    /* Module: Parallel Arrays Mapping Engine for Venues */
    bindMapViewerEvents() {
        const structuralCards = document.querySelectorAll(".location-link-card");
        structuralCards.forEach(card => {
            card.addEventListener("click", () => {
                const searchKeyToken = card.getAttribute("data-venue-key");
                // Locate structural index via parallel lookup array logic
                const resolvedIndex = this.venueTokens.indexOf(searchKeyToken);
                
                if (resolvedIndex !== -1) {
                    const routingDestination = this.mapLinksURLs[resolvedIndex];
                    window.open(routingDestination, "_blank");
                } else {
                    alert("System Routing Error: Location coordinates token index mismatch.");
                }
            });
        });
    }

    /* Module: Interactive Modal Image Lightbox Zoom Gallery */
    initImageLightboxModule() {
        const teamPhotos = document.querySelectorAll(".team-photo");
        teamPhotos.forEach(photo => {
            photo.style.cursor = "pointer";
            photo.addEventListener("click", () => {
                // Programmatically compile dynamic HTML elements in memory
                const modalOverlayNode = document.createElement("div");
                modalOverlayNode.className = "lightbox-modal-container";
                
                // Overlay component styling injection rules
                Object.assign(modalOverlayNode.style, {
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0, 33, 71, 0.95)",
                    zIndex: "9999",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "zoom-out"
                });

                const modalImageElement = document.createElement("img");
                modalImageElement.src = photo.src;
                modalImageElement.alt = photo.alt;
                
                Object.assign(modalImageElement.style, {
                    maxWidth: "85%",
                    maxHeight: "85%",
                    borderRadius: "8px",
                    border: "5px solid #4cbb17",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)"
                });

                modalOverlayNode.appendChild(modalImageElement);
                document.body.appendChild(modalOverlayNode);

                // Tear down dynamic nodes safely upon user trigger exit states
                modalOverlayNode.addEventListener("click", () => {
                    modalOverlayNode.remove();
                });
            });
        });
    }

    /* Module: On-Page Layout Text Node Scraper Engine */
    initSearchEngineModule() {
        const searchInputForm = document.getElementById("siteSearchEngine");
        const searchInputField = document.getElementById("searchInputField");

        if (!searchInputForm || !searchInputField) return;

        searchInputForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const queryText = searchInputField.value.trim().toLowerCase();
            if (!queryText) return;

            // Rollback previous highlighted span iterations seamlessly back to text
            const oldHighlights = document.querySelectorAll('.search-highlight');
            oldHighlights.forEach(element => {
                element.replaceWith(document.createTextNode(element.textContent));
            });

            const contentWrapperTree = document.querySelector('.page-wrapper');
            if (!contentWrapperTree) return;

            // Crawl layout string nodes programmatically via specific safe TreeWalker API structures
            const treeCrawler = document.createTreeWalker(contentWrapperTree, NodeFilter.SHOW_TEXT, null, false);
            let activeTextNode;

            while (activeTextNode = treeCrawler.nextNode()) {
                const lowercaseTextFragment = activeTextNode.nodeValue.toLowerCase();
                
                if (lowercaseTextFragment.includes(queryText)) {
                    const structuralParentNode = activeTextNode.parentNode;
                    const originalRawContent = activeTextNode.nodeValue;
                    const regexMatchPattern = new RegExp(`(${queryText})`, 'gi');

                    const safeContainerSpan = document.createElement('span');
                    safeContainerSpan.innerHTML = originalRawContent.replace(regexMatchPattern, '<span class="search-highlight">$1</span>');

                    structuralParentNode.replaceChild(safeContainerSpan, activeTextNode);
                    safeContainerSpan.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return;
                }
            }
            alert(`No matches found for: "${searchInputField.value}" on this layout wrapper view.`);
        });
    }
}

// Global invocation baseline wrapper sequence setup tracking instantiation structures
document.addEventListener("DOMContentLoaded", () => {
    const portalCore = new TennisAcademyPortal();
    portalCore.init();
});