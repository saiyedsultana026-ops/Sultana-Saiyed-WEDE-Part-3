class TennisAcademyPortal {
    constructor() {
        // Declaring Parallel arrays
        this.venueTokens = ['frameby', 'wembley', 'sunridge', 'harvest'];
        this.mapLinksURLs = [
            "https://maps.google.com/?q=Hoerskool+Framesby+Port+Elizabeth", 
            "https://maps.google.com/?q=Wembley+Tennis+Club+Port+Elizabeth", 
            "https://maps.google.com/?q=Sunridge+Primary+School+Port+Elizabeth", 
            "https://maps.google.com/?q=Harvest+Christian+School+Port+Elizabeth"  
        ];
    }
    init() {
        this.bindFormEvents();
        this.bindMapViewerEvents();
        this.initImageLightboxModule();
        this.initSearchEngineModule();
    }

    /*Module: Form Submission*/
    bindFormEvents() {
        const enquiryForm = document.getElementById("tennisEnquiryForm");
        const contactForm = document.getElementById("academyContactForm");

        // SAFETY CHECK: Only listen for form events if they exist on the current page view
        if (enquiryForm) {
            enquiryForm.addEventListener("submit", (e) => this.processFormPipeline(e, "enquiryFormViewport"));
        }
        if (contactForm) {
            contactForm.addEventListener("submit", (e) => this.processFormPipeline(e, "contactFormViewport"));
        }
    }

    async processFormPipeline(event, viewportId) {
        event.preventDefault(); 
        
        const form = event.target;
        const viewport = document.getElementById(viewportId);
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                this.renderCourtSuccessCanvas(viewport);
            } else {
                alert("Submission processing error. Transaction delayed.");
            }
        } catch (error) {
            alert("Network infrastructure routing timeout.");
        }
    }

    /*Module:table tennis animation on contact us page:*/
    renderCourtSuccessCanvas(targetViewport) {
        const tableTennisBallMatrix = `
  🎾🎾🎾  🎾  🎾  🎾🎾🎾  🎾🎾🎾  🎾🎾🎾  🎾🎾🎾  🎾🎾🎾
  🎾      🎾  🎾  🎾      🎾      🎾      🎾      🎾    
  🎾🎾🎾  🎾  🎾  🎾      🎾      🎾🎾    🎾🎾    🎾🎾🎾
      🎾  🎾  🎾  🎾      🎾      🎾      🎾          🎾
  🎾🎾🎾  🎾🎾  🎾🎾🎾  🎾🎾🎾  🎾🎾🎾  🎾🎾🎾  🎾🎾🎾
        `;

        targetViewport.innerHTML = `
            <div class="table-tennis-court animate-popup">
                <div class="pingpong-center-line"></div>
                <div class="pingpong-horizontal-net"></div>
                
                <div class="court-score-board-overlay">
                    <div class="ball-font-container">
                        <div class="tennis-font-row-wrapper">
                            <pre class="font-pixel-line" style="margin:0; font-family:monospace; font-size:8px; line-height:1.2; color:#ccff00; font-weight:bold;">${tableTennisBallMatrix.trim()}</pre>
                        </div>
                    </div>
                    <h3 class="court-alert-title">SUCCESSFULLY SUBMITTED</h3>
                    <p class="court-alert-text">Your message packets crossed the table partition net safely and hit our administration desk instantly.</p>
                    <span class="court-badge-status">Match State: Served 🏓</span>
                </div>
            </div>
        `;
    }

    bindMapViewerEvents() {
        const cards = document.querySelectorAll(".location-link-card");
        if (cards.length === 0) return;

        cards.forEach(card => {
            card.addEventListener("click", () => {
                const venueKey = card.getAttribute("data-venue-key");
                let matchIndex = -1;
                for (let i = 0; i < this.venueTokens.length; i++) {
                    if (this.venueTokens[i] === venueKey) {
                        matchIndex = i;
                        break;
                    }
                }

                if (matchIndex !== -1) {
                    window.open(this.mapLinksURLs[matchIndex], '_blank');
                }
            });
        });
    }

    /*image zoom*/
    initImageLightboxModule() {
        const overlay = document.createElement('div');
        overlay.className = 'image-lightbox-overlay';
        overlay.innerHTML = `
            <span class="lightbox-close-btn">×</span>
            <img src="" alt="Zoom Frame" class="lightbox-enlarged-img" id="lightboxTargetImg">
        `;
        document.body.appendChild(overlay);
        
        const lightboxImg = document.getElementById('lightboxTargetImg');
        const allImages = document.querySelectorAll('img');

        allImages.forEach(img => {
            if (img.classList.contains('site-logo')) return;
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                overlay.classList.add('active');
            });
        });

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay || e.target.classList.contains('lightbox-close-btn')) {
                overlay.classList.remove('active');
            }
        });
    }

    /*Module:Search enginee:*/
    initSearchEngineModule() {
        const searchForm = document.getElementById('siteSearchEngine');
        const searchInput = document.getElementById('searchInputField');
        
        if (!searchForm || !searchInput) return;
        
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;
            const oldHighlights = document.querySelectorAll('.search-highlight');
            oldHighlights.forEach(el => el.replaceWith(document.createTextNode(el.textContent)));
            
            const mainContent = document.querySelector('.page-wrapper');
            if (!mainContent) return;
            
            const walker = document.createTreeWalker(mainContent, NodeFilter.SHOW_TEXT, null, false);
            let node;
            
            while (node = walker.nextNode()) {
                const text = node.nodeValue.toLowerCase();
                if (text.includes(query)) {
                    const parent = node.parentNode;
                    const origText = node.nodeValue;
                    const regex = new RegExp(`(${query})`, 'gi');
                    
                    const spanWrapper = document.createElement('span');
                    spanWrapper.innerHTML = origText.replace(regex, '<span class="search-highlight">$1</span>');
                    
                    parent.replaceChild(spanWrapper, node);
                    spanWrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    return; 
                }
            }
            alert(`No content instances matching "${searchInput.value}" found on this page.`);
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const app = new TennisAcademyPortal();
    app.init();
});