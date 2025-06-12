
// Global variables
let currentPage = 'home';
let mortgageChart = null;
let loanChart = null;

// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "Understanding Amortized Loans: A Complete Guide",
        excerpt: "Learn everything about amortized loans, how they work, and why they're the most common type of loan for mortgages and car financing.",
        content: `
            <h2>What is an Amortized Loan?</h2>
            <p>An amortized loan is a type of loan where the borrower makes regular payments that are applied to both the principal balance and interest. Over time, the portion of each payment that goes toward principal increases, while the portion that goes toward interest decreases.</p>
            
            <h3>How Amortized Loans Work</h3>
            <p>With each payment, you're paying down both the interest and principal. Early in the loan term, most of your payment goes toward interest. As time progresses, more of your payment goes toward reducing the principal balance.</p>
            
            <h3>Benefits of Amortized Loans</h3>
            <ul>
                <li><strong>Predictable Payments:</strong> Fixed monthly payments make budgeting easier</li>
                <li><strong>Equity Building:</strong> You gradually build ownership in the asset</li>
                <li><strong>Interest Savings:</strong> Making extra payments can significantly reduce total interest</li>
                <li><strong>Clear Timeline:</strong> You know exactly when the loan will be paid off</li>
            </ul>
            
            <h3>Disadvantages of Amortized Loans</h3>
            <ul>
                <li><strong>Slow Equity Building:</strong> Early payments mostly go toward interest</li>
                <li><strong>Higher Total Cost:</strong> You pay more in total compared to shorter-term loans</li>
                <li><strong>Prepayment Penalties:</strong> Some loans charge fees for early payment</li>
            </ul>
            
            <h3>Understanding Compounding</h3>
            <p>Compound interest is interest calculated on both the initial principal and previously earned interest. In loans, this works against you - unpaid interest can be added to the principal, increasing your total debt.</p>
        `,
        date: "2024-01-15",
        category: "Finance",
        readTime: "5 min",
        slug: "understanding-amortized-loans"
    },
    {
        id: 2,
        title: "Deferred Payment Loans: When to Use Them",
        excerpt: "Explore deferred payment loans, their benefits for students and new graduates, and important considerations before choosing this option.",
        content: `
            <h2>What are Deferred Payment Loans?</h2>
            <p>Deferred payment loans allow borrowers to postpone payments for a specified period. During this time, interest may or may not accrue depending on the loan terms.</p>
            
            <h3>Types of Deferment</h3>
            <p><strong>Interest-Free Deferment:</strong> No interest accrues during the deferment period (rare, often for subsidized student loans).</p>
            <p><strong>Interest-Accruing Deferment:</strong> Interest continues to accrue and may be added to the principal balance.</p>
            
            <h3>Benefits of Deferred Payment Loans</h3>
            <ul>
                <li><strong>Financial Flexibility:</strong> Provides breathing room during financial hardship</li>
                <li><strong>Education Support:</strong> Allows students to focus on studies without payment pressure</li>
                <li><strong>Career Development:</strong> Time to establish income before payments begin</li>
                <li><strong>Emergency Relief:</strong> Helpful during unemployment or medical emergencies</li>
            </ul>
            
            <h3>Disadvantages of Deferred Payment Loans</h3>
            <ul>
                <li><strong>Increased Total Cost:</strong> Accruing interest increases the total amount owed</li>
                <li><strong>Larger Future Payments:</strong> Monthly payments may be higher when deferment ends</li>
                <li><strong>Credit Impact:</strong> Extended loan terms may affect credit utilization</li>
                <li><strong>Capitalized Interest:</strong> Unpaid interest may be added to principal</li>
            </ul>
            
            <h3>Simple vs. Compound Interest in Deferment</h3>
            <p><strong>Simple Interest:</strong> Interest is calculated only on the original principal amount.</p>
            <p><strong>Compound Interest:</strong> Interest is calculated on both principal and previously accrued interest, leading to faster growth of debt during deferment.</p>
        `,
        date: "2024-01-12",
        category: "Finance",
        readTime: "6 min",
        slug: "deferred-payment-loans-guide"
    },
    {
        id: 3,
        title: "Bond Valuation: Investment Fundamentals",
        excerpt: "Master bond valuation concepts, understand yield calculations, and learn how interest rates affect bond prices in the market.",
        content: `
            <h2>Understanding Bond Valuation</h2>
            <p>Bond valuation is the process of determining the fair value of a bond. It involves calculating the present value of the bond's future cash flows, including periodic coupon payments and the principal repayment at maturity.</p>
            
            <h3>Key Bond Components</h3>
            <ul>
                <li><strong>Face Value (Par Value):</strong> The amount paid to the bondholder at maturity</li>
                <li><strong>Coupon Rate:</strong> The annual interest rate paid by the bond</li>
                <li><strong>Market Rate (Yield):</strong> The current market interest rate for similar bonds</li>
                <li><strong>Maturity:</strong> The length of time until the bond expires</li>
            </ul>
            
            <h3>Benefits of Bond Investing</h3>
            <ul>
                <li><strong>Predictable Income:</strong> Regular coupon payments provide steady cash flow</li>
                <li><strong>Capital Preservation:</strong> Principal is returned at maturity (if held to maturity)</li>
                <li><strong>Diversification:</strong> Bonds often move inversely to stocks</li>
                <li><strong>Variety of Options:</strong> Government, corporate, and municipal bonds available</li>
            </ul>
            
            <h3>Disadvantages of Bond Investing</h3>
            <ul>
                <li><strong>Interest Rate Risk:</strong> Bond values decrease when interest rates rise</li>
                <li><strong>Inflation Risk:</strong> Fixed payments lose purchasing power over time</li>
                <li><strong>Credit Risk:</strong> Issuer may default on payments</li>
                <li><strong>Liquidity Risk:</strong> Some bonds may be difficult to sell before maturity</li>
            </ul>
            
            <h3>Relationship Between Interest Rates and Bond Prices</h3>
            <p>Bond prices and interest rates have an inverse relationship. When market interest rates rise, existing bond prices fall because new bonds offer higher yields. Conversely, when rates fall, existing bond prices rise.</p>
            
            <h3>Compounding in Bonds</h3>
            <p>While bonds typically pay simple interest as coupons, the reinvestment of these coupons can create a compounding effect, increasing the total return over the bond's life.</p>
        `,
        date: "2024-01-10",
        category: "Investment",
        readTime: "7 min",
        slug: "bond-valuation-fundamentals"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    loadBlogPosts();
    setupEventListeners();
    showPage('home');
    setCurrentDate();
}

function setupEventListeners() {
    // Search and filter functionality
    const searchInput = document.getElementById('blogSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterBlogPosts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterBlogPosts);
    }
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Setup navigation links
    const navLinks = document.querySelectorAll('.nav-link[data-page]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);
        });
    });
}

// Dropdown menu functionality
function toggleDropdown() {
    const dropdown = document.getElementById('calculatorDropdown');
    dropdown.classList.toggle('show');
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-toggle') && !dropdown.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    });
}

// Page navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    updateNavigation(pageId);
    currentPage = pageId;
    
    // Update URL without page reload
    const newUrl = pageId === 'home' ? '/' : `#${pageId}`;
    window.history.pushState({page: pageId}, '', newUrl);
}

function updateNavigation(pageId) {
    // Update nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Theme functionality
function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    
    if (body.getAttribute('data-theme') === 'dark') {
        body.setAttribute('data-theme', 'light');
        themeToggle.textContent = '🌙';
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }
}

// Blog functionality
function loadBlogPosts() {
    const blogGrid = document.getElementById('blogResults');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = '';
    
    blogPosts.forEach(post => {
        const blogCard = createBlogCard(post);
        blogGrid.appendChild(blogCard);
    });
}

function createBlogCard(post) {
    const card = document.createElement('div');
    card.className = 'blog-card';
    card.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <div class="blog-meta">
            <span>${post.date}</span>
            <span>${post.category}</span>
            <span>${post.readTime}</span>
        </div>
    `;
    
    card.addEventListener('click', () => showBlogPost(post));
    return card;
}

function showBlogPost(post) {
    const blogPostContent = document.getElementById('blogPostContent');
    if (!blogPostContent) return;
    
    blogPostContent.innerHTML = `
        <div class="back-to-blog">
            <button class="btn btn-secondary" onclick="showPage('blog')">← Back to Blog</button>
        </div>
        <article class="blog-post-content">
            <header class="blog-post-header">
                <h1 class="blog-post-title">${post.title}</h1>
                <div class="blog-post-meta">
                    <span>${post.date}</span>
                    <span>${post.category}</span>
                    <span>${post.readTime}</span>
                </div>
            </header>
            <div class="blog-post-content">
                ${post.content}
            </div>
        </article>
    `;
    
    showPage('blogPost');
}

function filterBlogPosts() {
    const searchTerm = document.getElementById('blogSearch')?.value.toLowerCase() || '';
    const selectedCategory = document.getElementById('categoryFilter')?.value || 'All';
    
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) || 
                             post.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });
    
    displayFilteredPosts(filteredPosts);
}

function displayFilteredPosts(posts) {
    const blogGrid = document.getElementById('blogResults');
    if (!blogGrid) return;
    
    blogGrid.innerHTML = '';
    
    if (posts.length === 0) {
        blogGrid.innerHTML = '<p class="text-center">No articles found matching your criteria.</p>';
        return;
    }
    
    posts.forEach(post => {
        const blogCard = createBlogCard(post);
        blogGrid.appendChild(blogCard);
    });
}

// Set current date for timezone calculator
function setCurrentDate() {
    const today = new Date();
    const dateString = today.toISOString().split('T')[0];
    const timeString = today.toTimeString().split(' ')[0].slice(0, 5);
    
    const sourceDate = document.getElementById('sourceDate');
    const sourceTime = document.getElementById('sourceTime');
    
    if (sourceDate) sourceDate.value = dateString;
    if (sourceTime) sourceTime.value = timeString;
}

// Calculator Functions

// Mortgage Calculator
function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value);
    const loanTermYears = parseInt(document.getElementById('loanTerm').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    
    const principal = loanAmount - downPayment;
    const monthlyRate = annualRate / 100 / 12;
    const numPayments = loanTermYears * 12;
    
    const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;
    
    displayMortgageResults(monthlyPayment, totalPaid, totalInterest, principal);
}

function displayMortgageResults(monthlyPayment, totalPaid, totalInterest, principal) {
    const resultsDiv = document.getElementById('mortgageResults');
    resultsDiv.classList.remove('hidden');
    
    resultsDiv.innerHTML = `
        <h3>Mortgage Results</h3>
        <div class="result-item">
            <span class="result-label">Monthly Payment:</span>
            <span class="result-value">$${monthlyPayment.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Amount Paid:</span>
            <span class="result-value">$${totalPaid.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Interest:</span>
            <span class="result-value">$${totalInterest.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Principal Amount:</span>
            <span class="result-value">$${principal.toFixed(2)}</span>
        </div>
        <div class="chart-container">
            <div class="chart-title">Principal vs Interest Breakdown</div>
            <div class="chart-wrapper">
                <canvas id="mortgageChart"></canvas>
            </div>
        </div>
    `;
    
    createMortgagePieChart(principal, totalInterest);
}

function createMortgagePieChart(principal, interest) {
    const ctx = document.getElementById('mortgageChart').getContext('2d');
    
    if (mortgageChart) {
        mortgageChart.destroy();
    }
    
    mortgageChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#3b82f6', '#ef4444'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// Loan Calculator
function toggleLoanInputs() {
    const loanType = document.getElementById('loanType').value;
    
    document.getElementById('amortizedInputs').classList.add('hidden');
    document.getElementById('deferredInputs').classList.add('hidden');
    document.getElementById('bondInputs').classList.add('hidden');
    
    document.getElementById(loanType + 'Inputs').classList.remove('hidden');
}

function calculateLoan() {
    const loanType = document.getElementById('loanType').value;
    
    switch(loanType) {
        case 'amortized':
            calculateAmortizedLoan();
            break;
        case 'deferred':
            calculateDeferredLoan();
            break;
        case 'bond':
            calculateBond();
            break;
    }
}

function calculateAmortizedLoan() {
    const principal = parseFloat(document.getElementById('amortizedPrincipal').value);
    const annualRate = parseFloat(document.getElementById('amortizedRate').value) / 100;
    const termYears = parseInt(document.getElementById('amortizedTerm').value);
    const frequency = document.getElementById('paymentFrequency').value;
    
    let periodsPerYear;
    switch(frequency) {
        case 'monthly': periodsPerYear = 12; break;
        case 'biweekly': periodsPerYear = 26; break;
        case 'quarterly': periodsPerYear = 4; break;
        case 'annually': periodsPerYear = 1; break;
    }
    
    const periodRate = annualRate / periodsPerYear;
    const numPayments = termYears * periodsPerYear;
    
    const payment = (principal * periodRate * Math.pow(1 + periodRate, numPayments)) / 
                   (Math.pow(1 + periodRate, numPayments) - 1);
    
    const totalPaid = payment * numPayments;
    const totalInterest = totalPaid - principal;
    
    displayLoanResults('Amortized Loan', {
        payment: payment,
        frequency: frequency,
        totalPaid: totalPaid,
        totalInterest: totalInterest,
        principal: principal
    });
}

function calculateDeferredLoan() {
    const principal = parseFloat(document.getElementById('deferredPrincipal').value);
    const annualRate = parseFloat(document.getElementById('deferredRate').value) / 100;
    const defermentYears = parseInt(document.getElementById('deferredPeriod').value);
    const repaymentYears = parseInt(document.getElementById('repaymentTerm').value);
    const compounding = document.getElementById('deferredCompounding').value;
    
    let balanceAfterDeferment;
    if (compounding === 'simple') {
        balanceAfterDeferment = principal * (1 + annualRate * defermentYears);
    } else {
        balanceAfterDeferment = principal * Math.pow(1 + annualRate, defermentYears);
    }
    
    const monthlyRate = annualRate / 12;
    const numPayments = repaymentYears * 12;
    
    const monthlyPayment = (balanceAfterDeferment * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                          (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalRepaymentAmount = monthlyPayment * numPayments;
    const totalInterest = totalRepaymentAmount - principal;
    
    displayLoanResults('Deferred Payment Loan', {
        payment: monthlyPayment,
        frequency: 'monthly',
        totalPaid: totalRepaymentAmount,
        totalInterest: totalInterest,
        principal: principal,
        balanceAfterDeferment: balanceAfterDeferment,
        defermentInterest: balanceAfterDeferment - principal
    });
}

function calculateBond() {
    const faceValue = parseFloat(document.getElementById('faceValue').value);
    const couponRate = parseFloat(document.getElementById('couponRate').value) / 100;
    const marketRate = parseFloat(document.getElementById('marketRate').value) / 100;
    const years = parseInt(document.getElementById('yearsToMaturity').value);
    const frequency = document.getElementById('bondFrequency').value;
    
    let periodsPerYear;
    switch(frequency) {
        case 'annual': periodsPerYear = 1; break;
        case 'semiannual': periodsPerYear = 2; break;
        case 'quarterly': periodsPerYear = 4; break;
    }
    
    const periodCouponRate = couponRate / periodsPerYear;
    const periodMarketRate = marketRate / periodsPerYear;
    const numPeriods = years * periodsPerYear;
    
    const couponPayment = faceValue * periodCouponRate;
    
    // Calculate present value of coupon payments
    let pvCoupons = 0;
    for (let i = 1; i <= numPeriods; i++) {
        pvCoupons += couponPayment / Math.pow(1 + periodMarketRate, i);
    }
    
    // Calculate present value of face value
    const pvFaceValue = faceValue / Math.pow(1 + periodMarketRate, numPeriods);
    
    const bondValue = pvCoupons + pvFaceValue;
    const totalCoupons = couponPayment * numPeriods;
    
    displayLoanResults('Bond Valuation', {
        bondValue: bondValue,
        faceValue: faceValue,
        totalCoupons: totalCoupons,
        couponPayment: couponPayment,
        frequency: frequency,
        premium: bondValue > faceValue,
        discount: bondValue < faceValue
    });
}

function displayLoanResults(type, results) {
    const resultsDiv = document.getElementById('loanResults');
    resultsDiv.classList.remove('hidden');
    
    let resultsHTML = `<h3>${type} Results</h3>`;
    
    if (type === 'Bond Valuation') {
        resultsHTML += `
            <div class="result-item">
                <span class="result-label">Bond Value:</span>
                <span class="result-value">$${results.bondValue.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Face Value:</span>
                <span class="result-value">$${results.faceValue.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Coupon Payments:</span>
                <span class="result-value">$${results.totalCoupons.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">${results.frequency === 'annual' ? 'Annual' : results.frequency === 'semiannual' ? 'Semi-annual' : 'Quarterly'} Coupon:</span>
                <span class="result-value">$${results.couponPayment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Bond Status:</span>
                <span class="result-value">${results.premium ? 'Premium' : results.discount ? 'Discount' : 'Par Value'}</span>
            </div>
            <div class="chart-container">
                <div class="chart-title">Face Value vs Total Coupons</div>
                <div class="chart-wrapper">
                    <canvas id="loanChart"></canvas>
                </div>
            </div>
        `;
        createLoanPieChart(results.faceValue, results.totalCoupons);
    } else {
        resultsHTML += `
            <div class="result-item">
                <span class="result-label">${results.frequency === 'monthly' ? 'Monthly' : results.frequency === 'biweekly' ? 'Bi-weekly' : results.frequency === 'quarterly' ? 'Quarterly' : 'Annual'} Payment:</span>
                <span class="result-value">$${results.payment.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Amount Paid:</span>
                <span class="result-value">$${results.totalPaid.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Total Interest:</span>
                <span class="result-value">$${results.totalInterest.toFixed(2)}</span>
            </div>
            <div class="result-item">
                <span class="result-label">Principal Amount:</span>
                <span class="result-value">$${results.principal.toFixed(2)}</span>
            </div>
        `;
        
        if (results.balanceAfterDeferment) {
            resultsHTML += `
                <div class="result-item">
                    <span class="result-label">Balance After Deferment:</span>
                    <span class="result-value">$${results.balanceAfterDeferment.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Interest During Deferment:</span>
                    <span class="result-value">$${results.defermentInterest.toFixed(2)}</span>
                </div>
            `;
        }
        
        resultsHTML += `
            <div class="chart-container">
                <div class="chart-title">Principal vs Interest Breakdown</div>
                <div class="chart-wrapper">
                    <canvas id="loanChart"></canvas>
                </div>
            </div>
        `;
        createLoanPieChart(results.principal, results.totalInterest);
    }
    
    resultsDiv.innerHTML = resultsHTML;
}

function createLoanPieChart(value1, value2) {
    const ctx = document.getElementById('loanChart').getContext('2d');
    
    if (loanChart) {
        loanChart.destroy();
    }
    
    loanChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal/Face Value', 'Interest/Coupons'],
            datasets: [{
                data: [value1, value2],
                backgroundColor: ['#10b981', '#f59e0b'],
                borderColor: '#ffffff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// GPA Calculator
let courses = [];
let gradeScale = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
};

document.addEventListener('DOMContentLoaded', function() {
    const gpaPage = document.getElementById('gpa');
    if (gpaPage) {
        setupGPACalculator();
    }
});

function setupGPACalculator() {
    updateGradeScaleDisplay();
    addCourse();
    
    const gpaScaleSelect = document.getElementById('gpaScale');
    const weightedCheckbox = document.getElementById('weightedGPA');
    const customScaleInputs = document.getElementById('customScaleInputs');
    
    if (gpaScaleSelect) {
        gpaScaleSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customScaleInputs.classList.remove('hidden');
            } else {
                customScaleInputs.classList.add('hidden');
                updateGradeScale(this.value);
            }
        });
    }
    
    if (weightedCheckbox) {
        weightedCheckbox.addEventListener('change', updateCourseInputs);
    }
    
    const addCourseBtn = document.getElementById('addCourse');
    if (addCourseBtn) {
        addCourseBtn.addEventListener('click', addCourse);
    }
    
    const calculateBtn = document.getElementById('calculateGPA');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateGPA);
    }
}

function updateGradeScale(scale) {
    if (scale === '5.0') {
        gradeScale = {
            'A+': 5.0, 'A': 5.0, 'A-': 4.7,
            'B+': 4.3, 'B': 4.0, 'B-': 3.7,
            'C+': 3.3, 'C': 3.0, 'C-': 2.7,
            'D+': 2.3, 'D': 2.0, 'D-': 1.7,
            'F': 0.0
        };
    } else {
        gradeScale = {
            'A+': 4.0, 'A': 4.0, 'A-': 3.7,
            'B+': 3.3, 'B': 3.0, 'B-': 2.7,
            'C+': 2.3, 'C': 2.0, 'C-': 1.7,
            'D+': 1.3, 'D': 1.0, 'D-': 0.7,
            'F': 0.0
        };
    }
    updateGradeScaleDisplay();
}

function updateGradeScaleDisplay() {
    const display = document.getElementById('gradeScaleReference');
    if (!display) return;
    
    let html = '<div class="grade-scale-grid">';
    for (const [grade, points] of Object.entries(gradeScale)) {
        html += `<div class="grade-item"><span>${grade}</span><span>${points}</span></div>`;
    }
    html += '</div>';
    display.innerHTML = html;
}

function addCourse() {
    const courseList = document.getElementById('courseList');
    const courseId = courses.length;
    const isWeighted = document.getElementById('weightedGPA').checked;
    
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-input';
    courseDiv.innerHTML = `
        <div class="course-header">
            <h4>Course ${courseId + 1}</h4>
            <button type="button" class="remove-course" onclick="removeCourse(${courseId})">×</button>
        </div>
        <div class="form-group">
            <label>Course Name</label>
            <input type="text" id="courseName${courseId}" placeholder="e.g., Math 101">
        </div>
        <div class="form-group">
            <label>Grade</label>
            <select id="courseGrade${courseId}">
                ${Object.keys(gradeScale).map(grade => `<option value="${grade}">${grade}</option>`).join('')}
            </select>
        </div>
        <div class="form-group">
            <label>Credit Hours</label>
            <input type="number" id="courseCredits${courseId}" min="0.5" max="6" step="0.5" value="3">
        </div>
        ${isWeighted ? `
        <div class="form-group">
            <label>Course Weight</label>
            <select id="courseWeight${courseId}">
                <option value="1.0">Regular</option>
                <option value="1.1">Honors (+0.1)</option>
                <option value="1.2">AP/IB (+0.2)</option>
            </select>
        </div>` : ''}
    `;
    
    courseList.appendChild(courseDiv);
    courses.push({ id: courseId });
}

function removeCourse(courseId) {
    const courseDiv = document.querySelector(`#courseList .course-input:nth-child(${courseId + 1})`);
    if (courseDiv) {
        courseDiv.remove();
    }
    courses = courses.filter(course => course.id !== courseId);
}

function updateCourseInputs() {
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';
    courses = [];
    addCourse();
}

function calculateGPA() {
    const courseInputs = document.querySelectorAll('.course-input');
    let totalPoints = 0;
    let totalCredits = 0;
    const isWeighted = document.getElementById('weightedGPA').checked;
    
    const courseResults = [];
    
    courseInputs.forEach((courseDiv, index) => {
        const courseName = courseDiv.querySelector(`#courseName${index}`)?.value || `Course ${index + 1}`;
        const grade = courseDiv.querySelector(`#courseGrade${index}`)?.value;
        const credits = parseFloat(courseDiv.querySelector(`#courseCredits${index}`)?.value || 0);
        const weight = isWeighted ? parseFloat(courseDiv.querySelector(`#courseWeight${index}`)?.value || 1) : 1;
        
        const gradePoints = gradeScale[grade] * weight;
        const coursePoints = gradePoints * credits;
        
        totalPoints += coursePoints;
        totalCredits += credits;
        
        courseResults.push({
            name: courseName,
            grade: grade,
            credits: credits,
            gradePoints: gradePoints,
            coursePoints: coursePoints
        });
    });
    
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    displayGPAResults(gpa, totalCredits, courseResults, isWeighted);
}

function displayGPAResults(gpa, totalCredits, courseResults, isWeighted) {
    const resultsDiv = document.getElementById('gpaResults');
    resultsDiv.classList.remove('hidden');
    
    let resultsHTML = `
        <h3>GPA Results</h3>
        <div class="result-item">
            <span class="result-label">${isWeighted ? 'Weighted' : 'Unweighted'} GPA:</span>
            <span class="result-value">${gpa.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Credits:</span>
            <span class="result-value">${totalCredits}</span>
        </div>
        <div class="course-breakdown">
            <h4>Course Breakdown</h4>
    `;
    
    courseResults.forEach(course => {
        resultsHTML += `
            <div class="course-result">
                <span class="course-name">${course.name}</span>
                <span class="course-details">${course.grade} (${course.credits} credits) = ${course.gradePoints.toFixed(2)} points</span>
            </div>
        `;
    });
    
    resultsHTML += '</div>';
    resultsDiv.innerHTML = resultsHTML;
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
    let weight, height;
    
    if (units === 'metric') {
        weight = parseFloat(document.getElementById('weightKg').value);
        height = parseFloat(document.getElementById('heightCm').value) / 100; // Convert cm to m
    } else {
        weight = parseFloat(document.getElementById('weightLbs').value) * 0.453592; // Convert lbs to kg
        const feet = parseFloat(document.getElementById('heightFt').value);
        const inches = parseFloat(document.getElementById('heightIn').value);
        height = ((feet * 12) + inches) * 0.0254; // Convert to meters
    }
    
    const bmi = weight / (height * height);
    
    let category, recommendation;
    if (bmi < 18.5) {
        category = 'Underweight';
        recommendation = 'Consider consulting with a healthcare provider about healthy weight gain strategies.';
    } else if (bmi < 25) {
        category = 'Normal weight';
        recommendation = 'Maintain your current weight through a balanced diet and regular exercise.';
    } else if (bmi < 30) {
        category = 'Overweight';
        recommendation = 'Consider a moderate calorie reduction and increased physical activity.';
    } else {
        category = 'Obese';
        recommendation = 'Consult with a healthcare provider for a comprehensive weight management plan.';
    }
    
    displayBMIResults(bmi, category, recommendation);
}

function displayBMIResults(bmi, category, recommendation) {
    const resultsDiv = document.getElementById('bmiResults');
    resultsDiv.classList.remove('hidden');
    
    resultsDiv.innerHTML = `
        <h3>BMI Results</h3>
        <div class="result-item">
            <span class="result-label">Your BMI:</span>
            <span class="result-value">${bmi.toFixed(1)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Category:</span>
            <span class="result-value">${category}</span>
        </div>
        <div class="result-item">
            <span class="result-label">BMI Ranges:</span>
            <div class="bmi-ranges">
                <div>Underweight: Below 18.5</div>
                <div>Normal weight: 18.5-24.9</div>
                <div>Overweight: 25.0-29.9</div>
                <div>Obese: 30.0 and above</div>
            </div>
        </div>
        <div class="result-item">
            <span class="result-label">Recommendation:</span>
            <div class="recommendation">${recommendation}</div>
        </div>
    `;
}

// Calorie Calculator
function toggleCalorieUnits() {
    const units = document.getElementById('calorieUnits').value;
    const metricInputs = document.getElementById('calorieMetricInputs');
    const imperialInputs = document.getElementById('calorieImperialInputs');
    
    if (units === 'metric') {
        metricInputs.classList.remove('hidden');
        imperialInputs.classList.add('hidden');
    } else {
        metricInputs.classList.add('hidden');
        imperialInputs.classList.remove('hidden');
    }
}

function calculateCalories() {
    const units = document.getElementById('calorieUnits').value;
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);
    const weightGoal = parseFloat(document.getElementById('weightGoal').value);
    
    let weight, height;
    
    if (units === 'metric') {
        weight = parseFloat(document.getElementById('calorieWeightKg').value);
        height = parseFloat(document.getElementById('calorieHeightCm').value);
    } else {
        weight = parseFloat(document.getElementById('calorieWeightLbs').value) * 0.453592;
        const feet = parseFloat(document.getElementById('calorieHeightFt').value);
        const inches = parseFloat(document.getElementById('calorieHeightIn').value);
        height = ((feet * 12) + inches) * 2.54; // Convert to cm
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevel;
    
    // Adjust for weight goal (3500 calories = 1 lb)
    const targetCalories = tdee + (weightGoal * 3500 / 7); // Weekly goal divided by 7 days
    
    displayCalorieResults(bmr, tdee, targetCalories, weightGoal);
}

function displayCalorieResults(bmr, tdee, targetCalories, weightGoal) {
    const resultsDiv = document.getElementById('calorieResults');
    resultsDiv.classList.remove('hidden');
    
    let goalText;
    if (weightGoal > 0) {
        goalText = `Gain ${weightGoal} lb per week`;
    } else if (weightGoal < 0) {
        goalText = `Lose ${Math.abs(weightGoal)} lb per week`;
    } else {
        goalText = 'Maintain current weight';
    }
    
    resultsDiv.innerHTML = `
        <h3>Calorie Results</h3>
        <div class="result-item">
            <span class="result-label">Basal Metabolic Rate (BMR):</span>
            <span class="result-value">${Math.round(bmr)} calories/day</span>
        </div>
        <div class="result-item">
            <span class="result-label">Maintenance Calories (TDEE):</span>
            <span class="result-value">${Math.round(tdee)} calories/day</span>
        </div>
        <div class="result-item">
            <span class="result-label">Target Calories:</span>
            <span class="result-value">${Math.round(targetCalories)} calories/day</span>
        </div>
        <div class="result-item">
            <span class="result-label">Goal:</span>
            <span class="result-value">${goalText}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Macronutrient Breakdown (example):</span>
            <div class="macro-breakdown">
                <div>Protein (25%): ${Math.round(targetCalories * 0.25 / 4)}g</div>
                <div>Carbohydrates (45%): ${Math.round(targetCalories * 0.45 / 4)}g</div>
                <div>Fat (30%): ${Math.round(targetCalories * 0.30 / 9)}g</div>
            </div>
        </div>
    `;
}

// Scientific Calculator
let displayValue = '0';
let waitingForOperand = false;
let pendingOperation = null;
let pendingValue = null;

function appendToDisplay(value) {
    const display = document.getElementById('scientificDisplay');
    
    if (waitingForOperand) {
        display.value = value;
        waitingForOperand = false;
    } else {
        display.value = display.value === '0' ? value : display.value + value;
    }
}

function clearDisplay() {
    const display = document.getElementById('scientificDisplay');
    display.value = '0';
    displayValue = '0';
    waitingForOperand = false;
    pendingOperation = null;
    pendingValue = null;
}

function clearEntry() {
    const display = document.getElementById('scientificDisplay');
    display.value = '0';
}

function backspace() {
    const display = document.getElementById('scientificDisplay');
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculateScientific() {
    const display = document.getElementById('scientificDisplay');
    let expression = display.value;
    
    try {
        // Replace mathematical functions with JavaScript equivalents
        expression = expression
            .replace(/sin\(/g, 'Math.sin(')
            .replace(/cos\(/g, 'Math.cos(')
            .replace(/tan\(/g, 'Math.tan(')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(')
            .replace(/sqrt\(/g, 'Math.sqrt(')
            .replace(/\^/g, '**')
            .replace(/π/g, 'Math.PI');
        
        const result = eval(expression);
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }
}

// Timezone Calculator
function addTimezone() {
    const container = document.getElementById('targetTimezones');
    const timezoneCount = container.children.length;
    
    const timezoneDiv = document.createElement('div');
    timezoneDiv.className = 'timezone-conversion';
    timezoneDiv.innerHTML = `
        <div class="form-group">
            <label>Convert to</label>
            <select class="target-timezone">
                <option value="America/New_York">Eastern Time (ET)</option>
                <option value="America/Chicago">Central Time (CT)</option>
                <option value="America/Denver">Mountain Time (MT)</option>
                <option value="America/Los_Angeles">Pacific Time (PT)</option>
                <option value="Europe/London">London (GMT)</option>
                <option value="Europe/Paris">Paris (CET)</option>
                <option value="Europe/Berlin">Berlin (CET)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
                <option value="Asia/Shanghai">Beijing (CST)</option>
                <option value="Asia/Dubai">Dubai (GST)</option>
                <option value="Australia/Sydney">Sydney (AEDT)</option>
                <option value="UTC">UTC</option>
            </select>
        </div>
        <button type="button" class="remove-timezone" onclick="removeTimezone(this)">×</button>
    `;
    
    container.appendChild(timezoneDiv);
}

function removeTimezone(button) {
    const container = document.getElementById('targetTimezones');
    if (container.children.length > 1) {
        button.parentElement.remove();
    }
}

function convertTimezones() {
    const sourceDate = document.getElementById('sourceDate').value;
    const sourceTime = document.getElementById('sourceTime').value;
    const sourceTimezone = document.getElementById('sourceTimezone').value;
    
    if (!sourceDate || !sourceTime) {
        alert('Please enter both date and time');
        return;
    }
    
    const sourceDateTime = new Date(`${sourceDate}T${sourceTime}`);
    const targetTimezones = document.querySelectorAll('.target-timezone');
    
    let resultsHTML = '<h3>Timezone Conversion Results</h3>';
    resultsHTML += `
        <div class="result-item">
            <span class="result-label">Source Time:</span>
            <span class="result-value">${sourceDateTime.toLocaleString()} (${sourceTimezone})</span>
        </div>
    `;
    
    targetTimezones.forEach((select, index) => {
        const targetTimezone = select.value;
        const convertedTime = new Date(sourceDateTime.toLocaleString("en-US", {timeZone: sourceTimezone}));
        const targetTime = new Date(convertedTime.toLocaleString("en-US", {timeZone: targetTimezone}));
        
        resultsHTML += `
            <div class="result-item">
                <span class="result-label">${targetTimezone.replace('_', ' ')}:</span>
                <span class="result-value">${targetTime.toLocaleString()}</span>
            </div>
        `;
    });
    
    const resultsDiv = document.getElementById('timezoneResults');
    resultsDiv.classList.remove('hidden');
    resultsDiv.innerHTML = resultsHTML;
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        showPage(event.state.page);
    } else {
        showPage('home');
    }
});
