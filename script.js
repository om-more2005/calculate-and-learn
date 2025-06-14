// Global variables
let isDarkMode = false;
let courses = [];

// Initialize the application
function initializeApp() {
    console.log('Initializing app...');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        enableDarkMode();
    }
    
    // Show home page by default
    showPage('home');
    
    // Initialize GPA calculator
    addCourse();
    
    console.log('App initialized successfully');
}

// Navigation
function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        console.error('Page not found:', pageId);
    }
    
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Close dropdown if open
    const dropdown = document.getElementById('calculatorDropdown');
    if (dropdown) {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
    }
}

// Dropdown functionality
function toggleDropdown() {
    console.log('Toggling dropdown...');
    const dropdown = document.getElementById('calculatorDropdown');
    if (!dropdown) {
        console.error('Dropdown element not found');
        return;
    }
    
    const isVisible = dropdown.style.visibility === 'visible';
    
    if (isVisible) {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
    } else {
        dropdown.style.opacity = '1';
        dropdown.style.visibility = 'visible';
    }
}

// Dark mode
function toggleDarkMode() {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark');
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = '☀️';
    }
    localStorage.setItem('theme', 'dark');
    isDarkMode = true;
}

function disableDarkMode() {
    document.body.classList.remove('dark');
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.textContent = '🌙';
    }
    localStorage.setItem('theme', 'light');
    isDarkMode = false;
}

// Mortgage Calculator
function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value) * 12;
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    
    const principal = loanAmount - downPayment;
    
    if (principal <= 0 || interestRate < 0 || loanTerm <= 0) {
        alert('Please enter valid values');
        return;
    }
    
    // Calculate monthly payment using the formula
    const monthlyPayment = principal * (interestRate * Math.pow(1 + interestRate, loanTerm)) / 
                          (Math.pow(1 + interestRate, loanTerm) - 1);
    
    const totalPayment = monthlyPayment * loanTerm;
    const totalInterest = totalPayment - principal;
    
    // Display results
    const resultsDiv = document.getElementById('mortgageResults');
    resultsDiv.innerHTML = `
        <h3>Monthly Payment Breakdown</h3>
        <div class="result-item">
            <span class="result-label">Monthly Payment</span>
            <span class="result-value large">$${monthlyPayment.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Principal Amount</span>
            <span class="result-value">$${principal.toLocaleString()}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Interest</span>
            <span class="result-value">$${totalInterest.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Payment</span>
            <span class="result-value">$${totalPayment.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Down Payment</span>
            <span class="result-value">$${downPayment.toLocaleString()}</span>
        </div>
    `;
    resultsDiv.classList.remove('hidden');
}

// GPA Calculator
function addCourse() {
    const courseList = document.getElementById('courseList');
    const courseIndex = courses.length;
    
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-input';
    courseDiv.innerHTML = `
        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr auto; gap: 12px; margin-bottom: 16px; align-items: end;">
            <div class="form-group" style="margin-bottom: 0;">
                <label>Course Name</label>
                <input type="text" id="courseName${courseIndex}" placeholder="e.g., Mathematics">
            </div>
            <div class="form-group" style="margin-bottom: 0;">
                <label>Grade</label>
                <select id="courseGrade${courseIndex}">
                    <option value="4.0">A</option>
                    <option value="3.7">A-</option>
                    <option value="3.3">B+</option>
                    <option value="3.0">B</option>
                    <option value="2.7">B-</option>
                    <option value="2.3">C+</option>
                    <option value="2.0">C</option>
                    <option value="1.7">C-</option>
                    <option value="1.3">D+</option>
                    <option value="1.0">D</option>
                    <option value="0.0">F</option>
                </select>
            </div>
            <div class="form-group" style="margin-bottom: 0;">
                <label>Credits</label>
                <input type="number" id="courseCredits${courseIndex}" value="3" min="1" max="10">
            </div>
            <button type="button" class="btn" style="background-color: #ef4444; color: white; padding: 8px 12px;" onclick="removeCourse(${courseIndex})">×</button>
        </div>
    `;
    
    courseList.appendChild(courseDiv);
    courses.push({ index: courseIndex });
}

function removeCourse(index) {
    const courseInputs = document.querySelectorAll('.course-input');
    if (courseInputs.length > 1) {
        courseInputs[index].remove();
        courses.splice(index, 1);
    }
}

function calculateGPA() {
    let totalPoints = 0;
    let totalCredits = 0;
    let validCourses = 0;
    
    const courseInputs = document.querySelectorAll('.course-input');
    
    courseInputs.forEach((courseDiv, index) => {
        const gradeSelect = courseDiv.querySelector(`select[id*="courseGrade"]`);
        const creditsInput = courseDiv.querySelector(`input[id*="courseCredits"]`);
        
        if (gradeSelect && creditsInput) {
            const grade = parseFloat(gradeSelect.value);
            const credits = parseFloat(creditsInput.value);
            
            if (!isNaN(grade) && !isNaN(credits) && credits > 0) {
                totalPoints += grade * credits;
                totalCredits += credits;
                validCourses++;
            }
        }
    });
    
    if (validCourses === 0) {
        alert('Please add at least one valid course');
        return;
    }
    
    const gpa = totalPoints / totalCredits;
    
    // Display results
    const resultsDiv = document.getElementById('gpaResults');
    resultsDiv.innerHTML = `
        <h3>GPA Calculation Results</h3>
        <div class="result-item">
            <span class="result-label">Overall GPA</span>
            <span class="result-value large">${gpa.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Credit Hours</span>
            <span class="result-value">${totalCredits}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Grade Points</span>
            <span class="result-value">${totalPoints.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Number of Courses</span>
            <span class="result-value">${validCourses}</span>
        </div>
    `;
    resultsDiv.classList.remove('hidden');
}

// BMI Calculator
function toggleBMIUnits() {
    const units = document.getElementById('bmiUnits').value;
    const metricInputs = document.getElementById('metricInputs');
    const imperialInputs = document.getElementById('imperialInputs');
    
    if (units === 'metric') {
        metricInputs.classList.remove('hidden');
        imperialInputs.classList.add('hidden');
    } else {
        metricInputs.classList.add('hidden');
        imperialInputs.classList.remove('hidden');
    }
}

function calculateBMI() {
    const units = document.getElementById('bmiUnits').value;
    let weight, height, bmi;
    
    if (units === 'metric') {
        weight = parseFloat(document.getElementById('weightKg').value);
        height = parseFloat(document.getElementById('heightCm').value) / 100; // convert to meters
        bmi = weight / (height * height);
    } else {
        weight = parseFloat(document.getElementById('weightLbs').value);
        const feet = parseFloat(document.getElementById('heightFt').value);
        const inches = parseFloat(document.getElementById('heightIn').value);
        const totalInches = (feet * 12) + inches;
        bmi = (weight / (totalInches * totalInches)) * 703;
    }
    
    if (isNaN(bmi) || bmi <= 0) {
        alert('Please enter valid measurements');
        return;
    }
    
    let category, description, color;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'You may need to gain weight. Consult with a healthcare provider.';
        color = '#3b82f6';
    } else if (bmi < 25) {
        category = 'Normal weight';
        description = 'You have a healthy weight. Keep up the good work!';
        color = '#059669';
    } else if (bmi < 30) {
        category = 'Overweight';
        description = 'You may benefit from weight loss. Consider diet and exercise changes.';
        color = '#d97706';
    } else {
        category = 'Obese';
        description = 'Consider consulting with a healthcare provider for a weight management plan.';
        color = '#dc2626';
    }
    
    // Display results
    const resultsDiv = document.getElementById('bmiResults');
    resultsDiv.innerHTML = `
        <h3>BMI Calculation Results</h3>
        <div class="result-item">
            <span class="result-label">Your BMI</span>
            <span class="result-value large">${bmi.toFixed(1)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Category</span>
            <span class="result-value" style="color: ${color}">${category}</span>
        </div>
        <div style="margin-top: 16px; padding: 16px; background-color: #f3f4f6; border-radius: 8px;">
            <p style="margin: 0; color: #374151;">${description}</p>
        </div>
        <div style="margin-top: 16px;">
            <h4 style="margin-bottom: 8px;">BMI Categories:</h4>
            <div style="font-size: 14px; color: #666;">
                <div>Underweight: Below 18.5</div>
                <div>Normal weight: 18.5-24.9</div>
                <div>Overweight: 25-29.9</div>
                <div>Obese: 30 and above</div>
            </div>
        </div>
    `;
    resultsDiv.classList.remove('hidden');
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('calculatorDropdown');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    
    if (dropdown && dropdownToggle && !dropdown.contains(event.target) && !dropdownToggle.contains(event.target)) {
        dropdown.style.opacity = '0';
        dropdown.style.visibility = 'hidden';
    }
});

// Handle form submissions to prevent page reload
document.addEventListener('submit', function(event) {
    event.preventDefault();
});

// Make functions globally available
window.showPage = showPage;
window.toggleDropdown = toggleDropdown;
window.toggleDarkMode = toggleDarkMode;
window.calculateMortgage = calculateMortgage;
window.addCourse = addCourse;
window.removeCourse = removeCourse;
window.calculateGPA = calculateGPA;
window.toggleBMIUnits = toggleBMIUnits;
window.calculateBMI = calculateBMI;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

// Also initialize if DOM is already ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    console.log('DOM already ready, initializing app...');
    initializeApp();
}
