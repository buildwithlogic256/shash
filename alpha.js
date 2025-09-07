let selectedService = '';
let selectedFiles = [];
let currentCategory = '';

// Service data for display
const serviceData = {
    'packers-movers': { icon: '📦', name: 'Packers and Movers' },
    'patient-care': { icon: '🏥', name: 'Patient Care Services' },
    'cleaning': { icon: '🧹', name: 'Cleaning Services' },
    'appliance-repair': { icon: '🔧', name: 'Home Appliances Repair' },
    'electrical': { icon: '⚡', name: 'Electrical Work' },
    'plumbing': { icon: '🚿', name: 'Plumbing' },
    'carpenter': { icon: '🔨', name: 'Carpentry' },
    'painting': { icon: '🎨', name: 'Painting' },
    'school-tutor': { icon: '👨‍🎓', name: 'Home Tutors (School)' },
    'college-counselor': { icon: '🎓', name: 'College Counselors' },
    'subject-specialist': { icon: '📖', name: 'Subject Specialists' },
    'exam-prep': { icon: '📝', name: 'Exam Preparation' },
    'language-tutor': { icon: '🗣️', name: 'Language Tutors' },
    'skill-training': { icon: '💻', name: 'Skill Training' },
    'content-writing': { icon: '✏️', name: 'Content Writing' },
    'graphic-design': { icon: '🎨', name: 'Graphic Design' },
    'data-entry': { icon: '⌨️', name: 'Data Entry' },
    'research-work': { icon: '🔍', name: 'Research Work' },
    'translation': { icon: '🌐', name: 'Translation Services' },
    'custom-other': { icon: '💡', name: 'Custom Work' }
};

// Page navigation functions
function showSubcategories(category) {
    currentCategory = category;
    
    // Hide main categories
    document.getElementById('mainCategories').style.display = 'none';
    
    // Hide all subcategory containers
    document.querySelectorAll('.subcategories-container').forEach(container => {
        container.style.display = 'none';
    });
    
    // Show selected subcategory
    document.getElementById(category + 'Subcategories').style.display = 'block';
}

function showMainCategories() {
    // Show main categories
    document.getElementById('mainCategories').style.display = 'grid';
    
    // Hide all subcategory containers
    document.querySelectorAll('.subcategories-container').forEach(container => {
        container.style.display = 'none';
    });
    
    currentCategory = '';
}

function selectService(service) {
    selectedService = service;
    
    // Remove previous selections
    document.querySelectorAll('.service-mega-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    event.target.closest('.service-mega-card').classList.add('selected');
    
    // Enable next button
    const nextBtn = document.getElementById('nextBtn1');
    if (nextBtn) {
        nextBtn.disabled = false;
        nextBtn.style.opacity = '1';
        nextBtn.style.cursor = 'pointer';
    }
}

function goToPage1() {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page1').classList.add('active');
}

function goToPage2() {
    if (!selectedService) {
        alert('Please select a service first!');
        return;
    }
    
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page2').classList.add('active');
    
    // Update selected service display
    const serviceInfo = serviceData[selectedService];
    if (serviceInfo) {
        document.getElementById('selectedIcon').textContent = serviceInfo.icon;
        document.getElementById('selectedServiceName').textContent = serviceInfo.name;
    }
}

function goToPage3() {
    // Validate form
    const form = document.getElementById('problemForm');
    const formData = new FormData(form);
    
    if (!formData.get('name') || !formData.get('phone') || !formData.get('urgency') || 
        !formData.get('budget') || !formData.get('address') || !formData.get('description')) {
        alert('Please fill in all required fields!');
        return;
    }
    
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('page3').classList.add('active');
}

function restartProcess() {
    // Reset all variables
    selectedService = '';
    selectedFiles = [];
    currentCategory = '';
    
    // Reset form
    document.getElementById('problemForm').reset();
    
    // Reset file upload area
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.innerHTML = `
        <div class="upload-icon">📸</div>
        <div class="upload-text">Click to upload photos of your problem</div>
        <div class="upload-subtext">Help us understand better with images</div>
        <button type="button" class="upload-btn">Choose Photos</button>
        <input type="file" id="fileInput" multiple accept="image/*" style="display: none;">
    `;
    
    // Re-attach file upload event
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    
    // Reset service selections
    document.querySelectorAll('.service-mega-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Show main categories
    showMainCategories();
    
    // Go to page 1
    goToPage1();
    
    // Disable next button
    const nextBtn = document.getElementById('nextBtn1');
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    }
}

// File upload handling
function handleFileUpload(e) {
    const files = Array.from(e.target.files);
    selectedFiles = files;
    
    const uploadArea = document.querySelector('.upload-area');
    if (files.length > 0) {
        uploadArea.innerHTML = `
            <div class="upload-icon">✅</div>
            <div class="upload-text">${files.length} photo(s) selected</div>
            <div class="upload-subtext">Photos uploaded successfully</div>
            <button type="button" class="upload-btn" onclick="document.getElementById('fileInput').click()">Change Photos</button>
            <input type="file" id="fileInput" multiple accept="image/*" style="display: none;">
        `;
        uploadArea.style.background = 'rgba(74, 222, 128, 0.2)';
        uploadArea.style.borderColor = '#4ade80';
        
        // Re-attach event listener
        document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    }
}

// Location functions
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            alert(`Location found! We'll search for helpers near you.`);
            // In real app, you would reverse geocode this to get address
            document.getElementById('address').value = `Location: ${lat.toFixed(4)}, ${lon.toFixed(4)}`;
        }, function(error) {
            alert('Unable to get location. Please enter address manually.');
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function manualLocation() {
    const address = prompt('Please enter your full address:');
    if (address) {
        document.getElementById('address').value = address;
        alert('Address saved!');
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Disable next button initially
    const nextBtn = document.getElementById('nextBtn1');
    if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.style.opacity = '0.5';
    }
    
    // Add file upload event listener
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.addEventListener('change', handleFileUpload);
    }
    
    // Form submission handling
    const problemForm = document.getElementById('problemForm');
    if (problemForm) {
        problemForm.addEventListener('submit', function(e) {
            e.preventDefault();
            goToPage3();
        });
    }
    
    // Add smooth scrolling to top when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
});