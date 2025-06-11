// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to 'light'
const savedTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
});

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Update URL hash
    window.location.hash = pageId;
}

// Handle navigation clicks
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });
    
    // Handle initial page load based on URL hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
    
    // Initialize blog
    initializeBlog();
    
    // Initialize GPA calculator
    initializeGPACalculator();
    
    // Initialize mortgage calculator
    initializeMortgageCalculator();
});

// Blog functionality
const blogPosts = [
    {
        title: "Understanding Amortized Loans: The Complete Guide",
        excerpt: "Learn how amortized loans work, their benefits and drawbacks, and when they're the right choice for your financial needs.",
        date: "Dec 10, 2024",
        category: "Finance",
        readTime: "7 min",
        slug: "amortized-loans-guide"
    },
    {
        title: "Deferred Payment Loans: When and Why to Use Them",
        excerpt: "Explore deferred payment loans, their unique structure, and how they can provide financial flexibility in specific situations.",
        date: "Dec 9, 2024",
        category: "Finance",
        readTime: "6 min",
        slug: "deferred-payment-loans-explained"
    },
    {
        title: "Bond Investing Basics: Valuation and Risk Assessment",
        excerpt: "Understand bond fundamentals, how to calculate bond values, and the key factors that affect bond investments.",
        date: "Dec 8, 2024",
        category: "Investment",
        readTime: "8 min",
        slug: "bonds-investment-basics"
    },
    {
        title: "Why Your GPA Matters: From High School to College Success",
        excerpt: "Understanding the critical role of GPA in your academic journey and proven strategies to improve your grades for better opportunities.",
        date: "Dec 8, 2024",
        category: "Education",
        readTime: "8 min",
        slug: "gpa-importance"
    },
    {
        title: "10 Essential Tips for First-Time Home Buyers",
        excerpt: "Navigate the complex world of home buying with confidence. Learn about down payments, mortgage types, and hidden costs that could impact your budget.",
        date: "Dec 6, 2024",
        category: "Real Estate",
        readTime: "5 min",
        slug: "first-time-home-buyer-tips"
    },
    {
        title: "Understanding Compound Interest",
        excerpt: "Discover how compound interest can work for or against you.",
        date: "Dec 5, 2024",
        category: "Investment",
        readTime: "7 min",
        slug: "understanding-compound-interest"
    }
];

function initializeBlog() {
    displayBlogPosts(blogPosts);
    
    const searchInput = document.getElementById('blogSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (searchInput) {
        searchInput.addEventListener('input', filterBlogPosts);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterBlogPosts);
    }
}

function displayBlogPosts(posts) {
    const blogResults = document.getElementById('blogResults');
    if (!blogResults) return;
    
    blogResults.innerHTML = posts.map(post => `
        <div class="blog-card" onclick="showBlogPost('${post.slug}')">
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="blog-meta">
                <span class="date">${post.date}</span>
                <span class="category">${post.category}</span>
                <span class="read-time">${post.readTime}</span>
            </div>
        </div>
    `).join('');
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
    
    displayBlogPosts(filteredPosts);
}

function showBlogPost(slug) {
    const blogPostContent = document.getElementById('blogPostContent');
    if (!blogPostContent) return;
    
    let content = '';
    
    switch(slug) {
        case 'amortized-loans-guide':
            content = `
                <button class="btn btn-secondary back-to-blog" onclick="showPage('blog')">← Back to Blog</button>
                <article class="blog-post">
                    <header class="blog-post-header">
                        <h1 class="blog-post-title">Understanding Amortized Loans: The Complete Guide</h1>
                        <div class="blog-post-meta">
                            <span>Dec 10, 2024</span>
                            <span>Finance</span>
                            <span>7 min read</span>
                        </div>
                    </header>
                    <div class="blog-post-content">
                        <h2>What is an Amortized Loan?</h2>
                        <p>An amortized loan is a type of loan where the borrower makes regular payments that cover both the principal amount and the interest. Each payment reduces the outstanding balance, and the loan is fully paid off by the end of the term.</p>
                        
                        <h2>How Amortization Works</h2>
                        <p>With amortization, each payment is split between:</p>
                        <ul>
                            <li><strong>Principal:</strong> The portion that reduces your loan balance</li>
                            <li><strong>Interest:</strong> The cost of borrowing money</li>
                        </ul>
                        <p>Early in the loan term, most of your payment goes toward interest. As time progresses, more of your payment goes toward the principal.</p>
                        
                        <h2>Benefits of Amortized Loans</h2>
                        <ul>
                            <li><strong>Predictable Payments:</strong> Fixed monthly payments make budgeting easier</li>
                            <li><strong>Equity Building:</strong> Each payment increases your ownership stake</li>
                            <li><strong>Clear End Date:</strong> You know exactly when the loan will be paid off</li>
                            <li><strong>Interest Deductions:</strong> May be tax-deductible in some cases</li>
                        </ul>
                        
                        <h2>Disadvantages of Amortized Loans</h2>
                        <ul>
                            <li><strong>Higher Total Interest:</strong> Longer terms mean more interest paid overall</li>
                            <li><strong>Slow Equity Building:</strong> Early payments mostly go to interest</li>
                            <li><strong>Prepayment Penalties:</strong> Some loans charge fees for early payoff</li>
                            <li><strong>Less Flexibility:</strong> Fixed payments regardless of financial changes</li>
                        </ul>
                        
                        <h2>Understanding Compound Interest</h2>
                        <p>Compound interest is "interest on interest" – it's calculated on both the initial principal and the accumulated interest from previous periods. In amortized loans, this means:</p>
                        <ul>
                            <li>Interest compounds according to the loan terms (usually monthly)</li>
                            <li>The effective annual rate may be higher than the stated rate</li>
                            <li>Making extra principal payments can significantly reduce total interest</li>
                        </ul>
                        
                        <h2>Common Types of Amortized Loans</h2>
                        <ul>
                            <li><strong>Mortgages:</strong> Home loans typically amortized over 15-30 years</li>
                            <li><strong>Auto Loans:</strong> Vehicle financing usually 3-7 years</li>
                            <li><strong>Personal Loans:</strong> Unsecured loans typically 2-7 years</li>
                            <li><strong>Student Loans:</strong> Education financing often 10-25 years</li>
                        </ul>
                        
                        <h2>When to Choose an Amortized Loan</h2>
                        <p>Amortized loans are ideal when you:</p>
                        <ul>
                            <li>Want predictable monthly payments</li>
                            <li>Plan to keep the asset for the full term</li>
                            <li>Prefer building equity over time</li>
                            <li>Can afford the fixed payment amount</li>
                        </ul>
                        
                        <p>Use our loan calculator to explore different amortization scenarios and find the best option for your financial situation.</p>
                    </div>
                </article>
            `;
            break;
            
        case 'deferred-payment-loans-explained':
            content = `
                <button class="btn btn-secondary back-to-blog" onclick="showPage('blog')">← Back to Blog</button>
                <article class="blog-post">
                    <header class="blog-post-header">
                        <h1 class="blog-post-title">Deferred Payment Loans: When and Why to Use Them</h1>
                        <div class="blog-post-meta">
                            <span>Dec 9, 2024</span>
                            <span>Finance</span>
                            <span>6 min read</span>
                        </div>
                    </header>
                    <div class="blog-post-content">
                        <h2>What are Deferred Payment Loans?</h2>
                        <p>Deferred payment loans allow borrowers to postpone making payments for a specified period. During this deferment period, interest may or may not accrue, depending on the loan terms. After the deferment ends, regular payments begin.</p>
                        
                        <h2>How Deferred Payment Loans Work</h2>
                        <p>These loans typically have two phases:</p>
                        <ul>
                            <li><strong>Deferment Period:</strong> No payments required, but interest may accrue</li>
                            <li><strong>Repayment Period:</strong> Regular payments begin, often higher than standard loans</li>
                        </ul>
                        
                        <h2>Types of Interest During Deferment</h2>
                        <h3>Simple Interest</h3>
                        <p>Interest is calculated only on the original principal amount. The formula is:</p>
                        <p><strong>Interest = Principal × Rate × Time</strong></p>
                        
                        <h3>Compound Interest</h3>
                        <p>Interest is calculated on the principal plus any previously accrued interest. This can significantly increase the total loan cost.</p>
                        
                        <h2>Benefits of Deferred Payment Loans</h2>
                        <ul>
                            <li><strong>Cash Flow Relief:</strong> Provides breathing room during financial hardship</li>
                            <li><strong>Investment Opportunity:</strong> Use funds for potentially higher-return investments</li>
                            <li><strong>Education Support:</strong> Common in student loans during school enrollment</li>
                            <li><strong>Business Development:</strong> Allows businesses to establish revenue before payments begin</li>
                        </ul>
                        
                        <h2>Disadvantages of Deferred Payment Loans</h2>
                        <ul>
                            <li><strong>Higher Total Cost:</strong> Accrued interest increases the loan balance</li>
                            <li><strong>Payment Shock:</strong> Higher payments when deferment ends</li>
                            <li><strong>Compounding Risk:</strong> Interest on interest can be expensive</li>
                            <li><strong>Limited Options:</strong> Not available for all loan types</li>
                        </ul>
                        
                        <h2>Common Examples</h2>
                        <ul>
                            <li><strong>Student Loans:</strong> In-school deferment while studying</li>
                            <li><strong>Construction Loans:</strong> Interest-only during building phase</li>
                            <li><strong>Business Loans:</strong> Grace period for startup ventures</li>
                            <li><strong>Medical/Hardship:</strong> Temporary relief during emergencies</li>
                        </ul>
                        
                        <h2>When to Consider Deferred Payment Loans</h2>
                        <p>These loans make sense when you:</p>
                        <ul>
                            <li>Expect income to increase significantly in the future</li>
                            <li>Need temporary financial relief</li>
                            <li>Can invest the saved payments at higher returns</li>
                            <li>Are in school or starting a business</li>
                        </ul>
                        
                        <h2>Alternatives to Consider</h2>
                        <ul>
                            <li><strong>Loan Modification:</strong> Restructuring existing loans</li>
                            <li><strong>Income-Based Repayment:</strong> Payments based on current income</li>
                            <li><strong>Forbearance:</strong> Temporary payment suspension</li>
                            <li><strong>Refinancing:</strong> Getting a new loan with better terms</li>
                        </ul>
                        
                        <p>Use our loan calculator to model different deferment scenarios and understand the true cost of deferred payment options.</p>
                    </div>
                </article>
            `;
            break;
            
        case 'bonds-investment-basics':
            content = `
                <button class="btn btn-secondary back-to-blog" onclick="showPage('blog')">← Back to Blog</button>
                <article class="blog-post">
                    <header class="blog-post-header">
                        <h1 class="blog-post-title">Bond Investing Basics: Valuation and Risk Assessment</h1>
                        <div class="blog-post-meta">
                            <span>Dec 8, 2024</span>
                            <span>Investment</span>
                            <span>8 min read</span>
                        </div>
                    </header>
                    <div class="blog-post-content">
                        <h2>What are Bonds?</h2>
                        <p>Bonds are debt securities issued by corporations, municipalities, or governments to raise capital. When you buy a bond, you're essentially lending money to the issuer in exchange for periodic interest payments and the return of principal at maturity.</p>
                        
                        <h2>Key Bond Terms</h2>
                        <ul>
                            <li><strong>Face Value (Par Value):</strong> The amount paid back at maturity</li>
                            <li><strong>Coupon Rate:</strong> The annual interest rate paid on the face value</li>
                            <li><strong>Yield to Maturity (YTM):</strong> The total return if held to maturity</li>
                            <li><strong>Duration:</strong> Sensitivity to interest rate changes</li>
                            <li><strong>Credit Rating:</strong> Assessment of the issuer's creditworthiness</li>
                        </ul>
                        
                        <h2>How Bond Valuation Works</h2>
                        <p>Bond value is calculated as the present value of all future cash flows:</p>
                        <ul>
                            <li>Periodic coupon payments</li>
                            <li>Principal repayment at maturity</li>
                        </ul>
                        <p>The discount rate used is typically the current market interest rate for similar bonds.</p>
                        
                        <h2>Bond Pricing Principles</h2>
                        <h3>Interest Rate Risk</h3>
                        <p>Bond prices move inversely to interest rates:</p>
                        <ul>
                            <li>When rates rise, bond prices fall</li>
                            <li>When rates fall, bond prices rise</li>
                            <li>Longer-term bonds are more sensitive to rate changes</li>
                        </ul>
                        
                        <h3>Premium, Par, and Discount</h3>
                        <ul>
                            <li><strong>Premium:</strong> Bond price > Face value (coupon rate > market rate)</li>
                            <li><strong>Par:</strong> Bond price = Face value (coupon rate = market rate)</li>
                            <li><strong>Discount:</strong> Bond price < Face value (coupon rate < market rate)</li>
                        </ul>
                        
                        <h2>Benefits of Bond Investing</h2>
                        <ul>
                            <li><strong>Income Generation:</strong> Regular interest payments</li>
                            <li><strong>Capital Preservation:</strong> Principal returned at maturity</li>
                            <li><strong>Diversification:</strong> Low correlation with stocks</li>
                            <li><strong>Predictable Returns:</strong> Known cash flows if held to maturity</li>
                            <li><strong>Liquidity:</strong> Can be sold before maturity</li>
                        </ul>
                        
                        <h2>Risks of Bond Investing</h2>
                        <ul>
                            <li><strong>Interest Rate Risk:</strong> Price volatility due to rate changes</li>
                            <li><strong>Credit Risk:</strong> Issuer may default on payments</li>
                            <li><strong>Inflation Risk:</strong> Fixed payments lose purchasing power</li>
                            <li><strong>Liquidity Risk:</strong> Difficulty selling before maturity</li>
                            <li><strong>Call Risk:</strong> Issuer may redeem early</li>
                        </ul>
                        
                        <h2>Types of Bonds</h2>
                        <h3>Government Bonds</h3>
                        <ul>
                            <li><strong>Treasury Bonds:</strong> Backed by U.S. government</li>
                            <li><strong>Municipal Bonds:</strong> Issued by state/local governments</li>
                            <li><strong>International Bonds:</strong> Foreign government debt</li>
                        </ul>
                        
                        <h3>Corporate Bonds</h3>
                        <ul>
                            <li><strong>Investment Grade:</strong> Higher credit quality, lower yield</li>
                            <li><strong>High Yield (Junk):</strong> Lower credit quality, higher yield</li>
                            <li><strong>Convertible:</strong> Can be converted to stock</li>
                        </ul>
                        
                        <h2>Compound Interest in Bonds</h2>
                        <p>While bonds typically pay simple interest through coupons, compound interest affects bond investing through:</p>
                        <ul>
                            <li><strong>Reinvestment:</strong> Coupon payments can be reinvested</li>
                            <li><strong>Zero-Coupon Bonds:</strong> Sold at discount, mature at face value</li>
                            <li><strong>Yield Calculations:</strong> YTM assumes coupon reinvestment</li>
                        </ul>
                        
                        <h2>Bond Investment Strategies</h2>
                        <ul>
                            <li><strong>Buy and Hold:</strong> Hold to maturity for predictable returns</li>
                            <li><strong>Laddering:</strong> Stagger maturities to manage rate risk</li>
                            <li><strong>Barbell:</strong> Combine short and long-term bonds</li>
                            <li><strong>Active Trading:</strong> Buy and sell based on rate expectations</li>
                        </ul>
                        
                        <h2>When to Invest in Bonds</h2>
                        <p>Bonds are suitable when you:</p>
                        <ul>
                            <li>Need steady income</li>
                            <li>Want to preserve capital</li>
                            <li>Seek portfolio diversification</li>
                            <li>Have a specific time horizon</li>
                            <li>Want to reduce overall portfolio risk</li>
                        </ul>
                        
                        <p>Use our bond calculator to evaluate different bonds and understand how changes in interest rates affect their value.</p>
                    </div>
                </article>
            `;
            break;
            
        case 'gpa-importance':
            content = `
                <button class="btn btn-secondary back-to-blog" onclick="showPage('blog')">← Back to Blog</button>
                <article class="blog-post">
                    <header class="blog-post-header">
                        <h1 class="blog-post-title">Why Your GPA Matters: From High School to College Success</h1>
                        <div class="blog-post-meta">
                            <span>Dec 8, 2024</span>
                            <span>Education</span>
                            <span>8 min read</span>
                        </div>
                    </header>
                    <div class="blog-post-content">
                        <h2>Understanding GPA</h2>
                        <p>Grade Point Average (GPA) is a standardized way to measure academic achievement. It's calculated by averaging the grade points earned across all courses, weighted by credit hours.</p>
                        
                        <h2>Why GPA Matters</h2>
                        <ul>
                            <li><strong>College Admissions:</strong> Primary factor in acceptance decisions</li>
                            <li><strong>Scholarship Opportunities:</strong> Many require minimum GPA thresholds</li>
                            <li><strong>Graduate School:</strong> Essential for advanced degree programs</li>
                            <li><strong>Job Opportunities:</strong> Some employers consider GPA for entry-level positions</li>
                        </ul>
                        
                        <h2>Strategies to Improve Your GPA</h2>
                        <ul>
                            <li>Focus on time management and study habits</li>
                            <li>Seek help when struggling with coursework</li>
                            <li>Take advantage of extra credit opportunities</li>
                            <li>Consider retaking courses where policies allow</li>
                        </ul>
                        
                        <p>Use our GPA calculator to track your progress and explore different scenarios to reach your academic goals.</p>
                    </div>
                </article>
            `;
            break;
            
        default:
            content = `
                <button class="btn btn-secondary back-to-blog" onclick="showPage('blog')">← Back to Blog</button>
                <div class="text-center">
                    <h1>Blog Post Not Found</h1>
                    <p>The requested blog post could not be found.</p>
                </div>
            `;
    }
    
    blogPostContent.innerHTML = content;
    showPage('blogPost');
}

// Loan Calculator Functions
function toggleLoanInputs() {
    const loanType = document.getElementById('loanType').value;
    const amortizedInputs = document.getElementById('amortizedInputs');
    const deferredInputs = document.getElementById('deferredInputs');
    const bondInputs = document.getElementById('bondInputs');
    
    // Hide all input sections
    [amortizedInputs, deferredInputs, bondInputs].forEach(section => {
        if (section) section.classList.add('hidden');
    });
    
    // Show relevant section
    switch(loanType) {
        case 'amortized':
            if (amortizedInputs) amortizedInputs.classList.remove('hidden');
            break;
        case 'deferred':
            if (deferredInputs) deferredInputs.classList.remove('hidden');
            break;
        case 'bond':
            if (bondInputs) bondInputs.classList.remove('hidden');
            break;
    }
}

let currentChart = null;

function calculateLoan() {
    const loanType = document.getElementById('loanType').value;
    let results = '';
    let chartData = null;
    
    switch(loanType) {
        case 'amortized':
            const amortizedData = calculateAmortizedLoan();
            results = amortizedData.html;
            chartData = amortizedData.chartData;
            break;
        case 'deferred':
            const deferredData = calculateDeferredLoan();
            results = deferredData.html;
            chartData = deferredData.chartData;
            break;
        case 'bond':
            const bondData = calculateBondValue();
            results = bondData.html;
            chartData = bondData.chartData;
            break;
    }
    
    const resultsDiv = document.getElementById('loanResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = results;
        resultsDiv.classList.remove('hidden');
        
        // Create chart if data is available
        if (chartData) {
            createPieChart(chartData);
        }
    }
}

function createPieChart(data) {
    // Destroy existing chart if it exists
    if (currentChart) {
        currentChart.destroy();
    }
    
    const canvas = document.getElementById('loanChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    currentChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: [
                    '#3B82F6', // Blue for principal
                    '#EF4444', // Red for interest
                    '#10B981', // Green for additional categories
                    '#F59E0B'  // Orange for additional categories
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

function calculateAmortizedLoan() {
    const principal = parseFloat(document.getElementById('amortizedPrincipal').value);
    const annualRate = parseFloat(document.getElementById('amortizedRate').value) / 100;
    const years = parseFloat(document.getElementById('amortizedTerm').value);
    const frequency = document.getElementById('paymentFrequency').value;
    
    let paymentsPerYear;
    switch(frequency) {
        case 'monthly': paymentsPerYear = 12; break;
        case 'biweekly': paymentsPerYear = 26; break;
        case 'quarterly': paymentsPerYear = 4; break;
        case 'annually': paymentsPerYear = 1; break;
        default: paymentsPerYear = 12;
    }
    
    const periodicRate = annualRate / paymentsPerYear;
    const totalPayments = years * paymentsPerYear;
    
    // Monthly payment calculation
    const payment = principal * (periodicRate * Math.pow(1 + periodicRate, totalPayments)) / 
                   (Math.pow(1 + periodicRate, totalPayments) - 1);
    
    const totalPaid = payment * totalPayments;
    const totalInterest = totalPaid - principal;
    
    const html = `
        <div class="results-with-chart">
            <div>
                <h3>Amortized Loan Results</h3>
                <div class="result-item">
                    <span class="result-label">${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Payment:</span>
                    <span class="result-value">$${payment.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Payments:</span>
                    <span class="result-value">$${totalPaid.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Interest:</span>
                    <span class="result-value">$${totalInterest.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Interest Percentage:</span>
                    <span class="result-value">${((totalInterest/principal)*100).toFixed(1)}%</span>
                </div>
            </div>
            <div class="chart-container">
                <h4 class="chart-title">Principal vs Interest Breakdown</h4>
                <div class="chart-wrapper">
                    <canvas id="loanChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    const chartData = {
        labels: ['Principal', 'Total Interest'],
        values: [principal, totalInterest]
    };
    
    return { html, chartData };
}

function calculateDeferredLoan() {
    const principal = parseFloat(document.getElementById('deferredPrincipal').value);
    const annualRate = parseFloat(document.getElementById('deferredRate').value) / 100;
    const defermentYears = parseFloat(document.getElementById('deferredPeriod').value);
    const repaymentYears = parseFloat(document.getElementById('repaymentTerm').value);
    const compounding = document.getElementById('deferredCompounding').value;
    
    let newPrincipal;
    
    if (compounding === 'simple') {
        // Simple interest during deferment
        const interest = principal * annualRate * defermentYears;
        newPrincipal = principal + interest;
    } else {
        // Compound interest during deferment (monthly compounding)
        const monthlyRate = annualRate / 12;
        const months = defermentYears * 12;
        newPrincipal = principal * Math.pow(1 + monthlyRate, months);
    }
    
    // Calculate monthly payment for repayment period
    const monthlyRate = annualRate / 12;
    const totalPayments = repaymentYears * 12;
    
    const monthlyPayment = newPrincipal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - principal;
    const defermentInterest = newPrincipal - principal;
    const repaymentInterest = totalInterest - defermentInterest;
    
    const html = `
        <div class="results-with-chart">
            <div>
                <h3>Deferred Payment Loan Results</h3>
                <div class="result-item">
                    <span class="result-label">Interest During Deferment:</span>
                    <span class="result-value">$${defermentInterest.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">New Principal Amount:</span>
                    <span class="result-value">$${newPrincipal.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Monthly Payment:</span>
                    <span class="result-value">$${monthlyPayment.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Payments:</span>
                    <span class="result-value">$${totalPaid.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Interest:</span>
                    <span class="result-value">$${totalInterest.toFixed(2)}</span>
                </div>
            </div>
            <div class="chart-container">
                <h4 class="chart-title">Cost Breakdown</h4>
                <div class="chart-wrapper">
                    <canvas id="loanChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    const chartData = {
        labels: ['Original Principal', 'Deferment Interest', 'Repayment Interest'],
        values: [principal, defermentInterest, repaymentInterest]
    };
    
    return { html, chartData };
}

function calculateBondValue() {
    const faceValue = parseFloat(document.getElementById('faceValue').value);
    const couponRate = parseFloat(document.getElementById('couponRate').value) / 100;
    const marketRate = parseFloat(document.getElementById('marketRate').value) / 100;
    const years = parseFloat(document.getElementById('yearsToMaturity').value);
    const frequency = document.getElementById('bondFrequency').value;
    
    let paymentsPerYear;
    switch(frequency) {
        case 'annual': paymentsPerYear = 1; break;
        case 'semiannual': paymentsPerYear = 2; break;
        case 'quarterly': paymentsPerYear = 4; break;
        default: paymentsPerYear = 2;
    }
    
    const periodicCouponRate = couponRate / paymentsPerYear;
    const periodicMarketRate = marketRate / paymentsPerYear;
    const totalPeriods = years * paymentsPerYear;
    const couponPayment = faceValue * periodicCouponRate;
    
    // Present value of coupon payments
    let pvCoupons = 0;
    for (let i = 1; i <= totalPeriods; i++) {
        pvCoupons += couponPayment / Math.pow(1 + periodicMarketRate, i);
    }
    
    // Present value of face value
    const pvFaceValue = faceValue / Math.pow(1 + periodicMarketRate, totalPeriods);
    
    const bondValue = pvCoupons + pvFaceValue;
    const totalCoupons = couponPayment * totalPeriods;
    const currentYield = (couponPayment * paymentsPerYear) / bondValue;
    
    // Determine if trading at premium, par, or discount
    let status;
    if (bondValue > faceValue) {
        status = 'Premium';
    } else if (bondValue < faceValue) {
        status = 'Discount';
    } else {
        status = 'Par';
    }
    
    const html = `
        <div class="results-with-chart">
            <div>
                <h3>Bond Valuation Results</h3>
                <div class="result-item">
                    <span class="result-label">Bond Value:</span>
                    <span class="result-value">$${bondValue.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Trading Status:</span>
                    <span class="result-value">${status}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">${frequency.charAt(0).toUpperCase() + frequency.slice(1)} Coupon:</span>
                    <span class="result-value">$${couponPayment.toFixed(2)}</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Current Yield:</span>
                    <span class="result-value">${(currentYield * 100).toFixed(2)}%</span>
                </div>
                <div class="result-item">
                    <span class="result-label">Total Coupon Payments:</span>
                    <span class="result-value">$${totalCoupons.toFixed(2)}</span>
                </div>
            </div>
            <div class="chart-container">
                <h4 class="chart-title">Bond Value Breakdown</h4>
                <div class="chart-wrapper">
                    <canvas id="loanChart"></canvas>
                </div>
            </div>
        </div>
    `;
    
    const chartData = {
        labels: ['Present Value of Coupons', 'Present Value of Face Value'],
        values: [pvCoupons, pvFaceValue]
    };
    
    return { html, chartData };
}

// GPA Calculator Functions
let courseCount = 0;
const gradeScales = {
    '4.0': { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 },
    '5.0': { A: 5.0, B: 4.0, C: 3.0, D: 2.0, F: 0.0 },
    'custom': { A: 4.0, B: 3.0, C: 2.0, D: 1.0, F: 0.0 }
};

function initializeGPACalculator() {
    updateGradeScaleReference();
    addCourse();
    
    const gpaScaleSelect = document.getElementById('gpaScale');
    if (gpaScaleSelect) {
        gpaScaleSelect.addEventListener('change', handleScaleChange);
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

function handleScaleChange() {
    const scale = document.getElementById('gpaScale').value;
    const customInputs = document.getElementById('customScaleInputs');
    
    if (scale === 'custom' && customInputs) {
        customInputs.classList.remove('hidden');
    } else if (customInputs) {
        customInputs.classList.add('hidden');
    }
    
    updateGradeScaleReference();
}

function updateGradeScaleReference() {
    const scale = document.getElementById('gpaScale')?.value || '4.0';
    const reference = document.getElementById('gradeScaleReference');
    
    if (!reference) return;
    
    const currentScale = gradeScales[scale];
    reference.innerHTML = Object.entries(currentScale)
        .map(([grade, points]) => `
            <div class="grade-item">
                <span>${grade}</span>
                <span>${points.toFixed(1)}</span>
            </div>
        `).join('');
}

function addCourse() {
    courseCount++;
    const courseList = document.getElementById('courseList');
    if (!courseList) return;
    
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-input';
    courseDiv.innerHTML = `
        <div class="form-group">
            <label>Course Name</label>
            <input type="text" placeholder="Course ${courseCount}" class="course-name">
        </div>
        <div class="form-group">
            <label>Grade</label>
            <select class="course-grade">
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
                <option value="D">D</option>
                <option value="F">F</option>
            </select>
        </div>
        <div class="form-group">
            <label>Credit Hours</label>
            <input type="number" value="3" min="0" max="10" step="0.5" class="course-credits">
        </div>
        <div class="form-group weighted-input" style="${document.getElementById('weightedGPA')?.checked ? '' : 'display: none;'}">
            <label>Weight</label>
            <select class="course-weight">
                <option value="1.0">Regular</option>
                <option value="1.1">Honors (+0.1)</option>
                <option value="1.2">AP/IB (+0.2)</option>
            </select>
        </div>
        <button type="button" class="remove-course" onclick="removeCourse(this)">Remove</button>
    `;
    
    courseList.appendChild(courseDiv);
    
    // Toggle weighted inputs based on checkbox
    const weightedCheckbox = document.getElementById('weightedGPA');
    if (weightedCheckbox) {
        weightedCheckbox.addEventListener('change', toggleWeightedInputs);
    }
}

function removeCourse(button) {
    button.parentElement.remove();
}

function toggleWeightedInputs() {
    const isWeighted = document.getElementById('weightedGPA')?.checked;
    const weightedInputs = document.querySelectorAll('.weighted-input');
    
    weightedInputs.forEach(input => {
        input.style.display = isWeighted ? 'block' : 'none';
    });
}

function calculateGPA() {
    const scale = document.getElementById('gpaScale').value;
    const isWeighted = document.getElementById('weightedGPA')?.checked;
    const courses = document.querySelectorAll('.course-input');
    
    let totalPoints = 0;
    let totalCredits = 0;
    let courseResults = [];
    
    const currentScale = gradeScales[scale];
    
    courses.forEach(course => {
        const name = course.querySelector('.course-name').value || 'Unnamed Course';
        const grade = course.querySelector('.course-grade').value;
        const credits = parseFloat(course.querySelector('.course-credits').value) || 0;
        const weight = isWeighted ? parseFloat(course.querySelector('.course-weight').value) : 1.0;
        
        const basePoints = currentScale[grade];
        const weightedPoints = basePoints * weight;
        const coursePoints = weightedPoints * credits;
        
        totalPoints += coursePoints;
        totalCredits += credits;
        
        courseResults.push({
            name,
            grade,
            credits,
            points: weightedPoints.toFixed(2)
        });
    });
    
    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    
    displayGPAResults(gpa, courseResults, totalCredits);
}

function displayGPAResults(gpa, courses, totalCredits) {
    const resultsDiv = document.getElementById('gpaResults');
    if (!resultsDiv) return;
    
    const courseList = courses.map(course => `
        <div class="result-item">
            <span class="result-label">${course.name} (${course.grade})</span>
            <span class="result-value">${course.points} pts</span>
        </div>
    `).join('');
    
    resultsDiv.innerHTML = `
        <h3>GPA Calculation Results</h3>
        <div class="result-item">
            <span class="result-label">Your GPA:</span>
            <span class="result-value gpa-result">${gpa.toFixed(3)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Credits:</span>
            <span class="result-value">${totalCredits}</span>
        </div>
        <h4 style="margin-top: 2rem; margin-bottom: 1rem;">Course Breakdown:</h4>
        ${courseList}
    `;
    
    resultsDiv.classList.remove('hidden');
}

// Mortgage Calculator Functions
function initializeMortgageCalculator() {
    const calculateBtn = document.getElementById('calculateMortgage');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateMortgage);
    }
}

function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const annualRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const years = parseFloat(document.getElementById('loanTerm').value);
    
    const principal = loanAmount - downPayment;
    const monthlyRate = annualRate / 12;
    const totalPayments = years * 12;
    
    // Monthly payment calculation
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
                          (Math.pow(1 + monthlyRate, totalPayments) - 1);
    
    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - principal;
    
    const resultsDiv = document.getElementById('mortgageResults');
    if (resultsDiv) {
        resultsDiv.innerHTML = `
            <div class="results-with-chart">
                <div>
                    <h3>Mortgage Calculation Results</h3>
                    <div class="result-item">
                        <span class="result-label">Monthly Payment:</span>
                        <span class="result-value">$${monthlyPayment.toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Total Payments:</span>
                        <span class="result-value">$${totalPaid.toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Total Interest:</span>
                        <span class="result-value">$${totalInterest.toFixed(2)}</span>
                    </div>
                    <div class="result-item">
                        <span class="result-label">Loan Amount:</span>
                        <span class="result-value">$${principal.toFixed(2)}</span>
                    </div>
                </div>
                <div class="chart-container">
                    <h4 class="chart-title">Principal vs Interest</h4>
                    <div class="chart-wrapper">
                        <canvas id="mortgageChart"></canvas>
                    </div>
                </div>
            </div>
        `;
        resultsDiv.classList.remove('hidden');
        
        // Create mortgage chart
        createMortgageChart(principal, totalInterest);
    }
}

function createMortgageChart(principal, interest) {
    const canvas = document.getElementById('mortgageChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Principal', 'Total Interest'],
            datasets: [{
                data: [principal, interest],
                backgroundColor: ['#3B82F6', '#EF4444'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${context.label}: $${value.toLocaleString()} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}
