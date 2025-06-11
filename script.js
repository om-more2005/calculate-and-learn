
// Application State
let currentPage = 'home';
let isDarkMode = false;
let courses = [];
let gradeScale = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'F': 0.0
};

// Blog Posts Data
const blogPosts = [
    {
        title: "Why Your GPA Matters: From High School to College Success",
        excerpt: "Understanding the critical role of GPA in your academic journey and proven strategies to improve your grades for better opportunities.",
        date: "Dec 8, 2024",
        category: "Education",
        readTime: "8 min",
        slug: "gpa-importance",
        content: generateGPABlogContent()
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
        title: "Understanding Compound Interest: The 8th Wonder of the World",
        excerpt: "Discover how compound interest can work for or against you. Learn strategies to maximize your investment returns and minimize debt costs.",
        date: "Dec 5, 2024",
        category: "Investment",
        readTime: "7 min",
        slug: "understanding-compound-interest"
    },
    {
        title: "Student Loan Repayment Strategies That Actually Work",
        excerpt: "Explore different repayment options, forgiveness programs, and strategies to pay off student loans faster while maintaining financial health.",
        date: "Dec 4, 2024",
        category: "Education",
        readTime: "6 min",
        slug: "student-loan-repayment-strategies"
    },
    {
        title: "Building an Emergency Fund: How Much is Enough?",
        excerpt: "Learn the importance of emergency funds, how to calculate the right amount for your situation, and the best places to keep your emergency money.",
        date: "Dec 3, 2024",
        category: "Personal Finance",
        readTime: "4 min",
        slug: "building-emergency-fund"
    }
];

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeNavigation();
    initializeGPACalculator();
    initializeMortgageCalculator();
    initializeBlog();
    
    // Show home page by default
    showPage('home');
});

// Theme Management
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        isDarkMode = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').textContent = '☀️';
    }
    
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    isDarkMode = !isDarkMode;
    if (isDarkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeToggle').textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        document.getElementById('themeToggle').textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Navigation
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.getAttribute('data-page');
            showPage(page);
        });
    });
}

function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageName;
        
        // Update navigation
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === pageName) {
                link.classList.add('active');
            }
        });
        
        // Update URL
        window.history.pushState({}, '', `#${pageName}`);
    }
}

// GPA Calculator
function initializeGPACalculator() {
    const gpaScaleSelect = document.getElementById('gpaScale');
    const weightedCheckbox = document.getElementById('weightedGPA');
    const customScaleInputs = document.getElementById('customScaleInputs');
    const addCourseBtn = document.getElementById('addCourse');
    const calculateBtn = document.getElementById('calculateGPA');
    const editGradeScaleBtn = document.getElementById('editGradeScale');
    
    gpaScaleSelect.addEventListener('change', handleGPAScaleChange);
    addCourseBtn.addEventListener('click', addCourse);
    calculateBtn.addEventListener('click', calculateGPA);
    editGradeScaleBtn.addEventListener('click', editGradeScale);
    
    updateGradeScaleDisplay();
    addCourse(); // Add initial course
}

function handleGPAScaleChange() {
    const scale = document.getElementById('gpaScale').value;
    const customInputs = document.getElementById('customScaleInputs');
    
    if (scale === 'custom') {
        customInputs.classList.remove('hidden');
    } else {
        customInputs.classList.add('hidden');
        if (scale === '5.0') {
            updateGradeScaleFor5Point();
        } else {
            updateGradeScaleFor4Point();
        }
        updateGradeScaleDisplay();
    }
}

function updateGradeScaleFor4Point() {
    gradeScale = {
        'A+': 4.0, 'A': 4.0, 'A-': 3.7,
        'B+': 3.3, 'B': 3.0, 'B-': 2.7,
        'C+': 2.3, 'C': 2.0, 'C-': 1.7,
        'D+': 1.3, 'D': 1.0, 'F': 0.0
    };
}

function updateGradeScaleFor5Point() {
    gradeScale = {
        'A+': 5.0, 'A': 5.0, 'A-': 4.7,
        'B+': 4.3, 'B': 4.0, 'B-': 3.7,
        'C+': 3.3, 'C': 3.0, 'C-': 2.7,
        'D+': 2.3, 'D': 2.0, 'F': 0.0
    };
}

function updateGradeScaleDisplay() {
    const container = document.getElementById('gradeScaleReference');
    container.innerHTML = '';
    
    Object.entries(gradeScale).forEach(([grade, points]) => {
        const gradeItem = document.createElement('div');
        gradeItem.className = 'grade-item';
        gradeItem.innerHTML = `
            <span>${grade}</span>
            <span>${points}</span>
        `;
        container.appendChild(gradeItem);
    });
}

function editGradeScale() {
    const newScale = prompt('Enter custom grade scale as JSON (e.g., {"A": 4.0, "B": 3.0}):');
    if (newScale) {
        try {
            gradeScale = JSON.parse(newScale);
            updateGradeScaleDisplay();
        } catch (error) {
            alert('Invalid JSON format. Please try again.');
        }
    }
}

function addCourse() {
    const courseList = document.getElementById('courseList');
    const courseDiv = document.createElement('div');
    courseDiv.className = 'course-input';
    
    const grades = Object.keys(gradeScale).join('</option><option value="');
    
    courseDiv.innerHTML = `
        <div>
            <label>Course Name</label>
            <input type="text" class="course-name" placeholder="e.g., Mathematics 101">
        </div>
        <div>
            <label>Grade</label>
            <select class="course-grade">
                <option value="">Select Grade</option>
                <option value="${grades}"></option>
            </select>
        </div>
        <div>
            <label>Credit Hours</label>
            <input type="number" class="course-credits" min="0" step="0.5" value="3">
        </div>
        <div class="weighted-input ${document.getElementById('weightedGPA').checked ? '' : 'hidden'}">
            <label>Course Type</label>
            <select class="course-type">
                <option value="regular">Regular</option>
                <option value="honors">Honors (+0.5)</option>
                <option value="ap">AP/IB (+1.0)</option>
            </select>
        </div>
        <button type="button" class="remove-course" onclick="removeCourse(this)">Remove</button>
    `;
    
    courseList.appendChild(courseDiv);
    courses.push(courseDiv);
    
    // Update weighted inputs visibility
    const weightedCheckbox = document.getElementById('weightedGPA');
    weightedCheckbox.addEventListener('change', updateWeightedInputs);
}

function removeCourse(button) {
    const courseDiv = button.parentElement;
    const index = courses.indexOf(courseDiv);
    if (index > -1) {
        courses.splice(index, 1);
    }
    courseDiv.remove();
}

function updateWeightedInputs() {
    const isWeighted = document.getElementById('weightedGPA').checked;
    const weightedInputs = document.querySelectorAll('.weighted-input');
    weightedInputs.forEach(input => {
        if (isWeighted) {
            input.classList.remove('hidden');
        } else {
            input.classList.add('hidden');
        }
    });
}

function calculateGPA() {
    const courseInputs = document.querySelectorAll('.course-input');
    let totalPoints = 0;
    let totalCredits = 0;
    let weightedTotalPoints = 0;
    let validCourses = 0;
    
    courseInputs.forEach(courseDiv => {
        const name = courseDiv.querySelector('.course-name').value;
        const grade = courseDiv.querySelector('.course-grade').value;
        const credits = parseFloat(courseDiv.querySelector('.course-credits').value) || 0;
        const courseType = courseDiv.querySelector('.course-type')?.value || 'regular';
        
        if (name && grade && credits > 0 && gradeScale[grade] !== undefined) {
            validCourses++;
            const basePoints = gradeScale[grade];
            let weightedPoints = basePoints;
            
            // Apply weighting
            if (document.getElementById('weightedGPA').checked) {
                if (courseType === 'honors') {
                    weightedPoints = Math.min(basePoints + 0.5, getMaxGPAValue());
                } else if (courseType === 'ap') {
                    weightedPoints = Math.min(basePoints + 1.0, getMaxGPAValue());
                }
            }
            
            totalPoints += basePoints * credits;
            weightedTotalPoints += weightedPoints * credits;
            totalCredits += credits;
        }
    });
    
    if (validCourses === 0 || totalCredits === 0) {
        alert('Please add at least one valid course with grade and credits.');
        return;
    }
    
    const unweightedGPA = totalPoints / totalCredits;
    const weightedGPA = weightedTotalPoints / totalCredits;
    
    displayGPAResults(unweightedGPA, weightedGPA, validCourses, totalCredits);
}

function getMaxGPAValue() {
    const scale = document.getElementById('gpaScale').value;
    if (scale === '5.0') return 5.0;
    if (scale === 'custom') return parseFloat(document.getElementById('customMax').value) || 4.0;
    return 4.0;
}

function displayGPAResults(unweighted, weighted, courseCount, totalCredits) {
    const resultsDiv = document.getElementById('gpaResults');
    const isWeightedEnabled = document.getElementById('weightedGPA').checked;
    
    resultsDiv.innerHTML = `
        <h3>GPA Results</h3>
        <div class="result-item">
            <span class="result-label">Unweighted GPA:</span>
            <span class="result-value gpa-result">${unweighted.toFixed(2)}</span>
        </div>
        ${isWeightedEnabled ? `
        <div class="result-item">
            <span class="result-label">Weighted GPA:</span>
            <span class="result-value gpa-result">${weighted.toFixed(2)}</span>
        </div>
        ` : ''}
        <div class="result-item">
            <span class="result-label">Total Courses:</span>
            <span class="result-value">${courseCount}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Credits:</span>
            <span class="result-value">${totalCredits}</span>
        </div>
    `;
    
    resultsDiv.classList.remove('hidden');
}

// Mortgage Calculator
function initializeMortgageCalculator() {
    const calculateBtn = document.getElementById('calculateMortgage');
    calculateBtn.addEventListener('click', calculateMortgage);
    
    // Auto-calculate on input change
    const inputs = ['loanAmount', 'interestRate', 'loanTerm', 'downPayment'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', calculateMortgage);
    });
}

function calculateMortgage() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const loanTerm = parseFloat(document.getElementById('loanTerm').value) || 0;
    
    if (loanAmount <= 0 || interestRate <= 0 || loanTerm <= 0) {
        return;
    }
    
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    
    displayMortgageResults(monthlyPayment, totalPayment, totalInterest, principal);
}

function displayMortgageResults(monthly, total, interest, principal) {
    const resultsDiv = document.getElementById('mortgageResults');
    
    resultsDiv.innerHTML = `
        <h3>Mortgage Results</h3>
        <div class="result-item">
            <span class="result-label">Monthly Payment:</span>
            <span class="result-value">$${monthly.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Payment:</span>
            <span class="result-value">$${total.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Total Interest:</span>
            <span class="result-value">$${interest.toFixed(2)}</span>
        </div>
        <div class="result-item">
            <span class="result-label">Principal Amount:</span>
            <span class="result-value">$${principal.toFixed(2)}</span>
        </div>
    `;
    
    resultsDiv.classList.remove('hidden');
}

// Blog Functionality
function initializeBlog() {
    const searchInput = document.getElementById('blogSearch');
    const categoryFilter = document.getElementById('categoryFilter');
    
    searchInput.addEventListener('input', filterBlogPosts);
    categoryFilter.addEventListener('change', filterBlogPosts);
    
    displayBlogPosts(blogPosts);
}

function filterBlogPosts() {
    const searchTerm = document.getElementById('blogSearch').value.toLowerCase();
    const selectedCategory = document.getElementById('categoryFilter').value;
    
    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm) ||
                             post.excerpt.toLowerCase().includes(searchTerm);
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
    
    displayBlogPosts(filteredPosts);
}

function displayBlogPosts(posts) {
    const blogGrid = document.getElementById('blogResults');
    
    if (posts.length === 0) {
        blogGrid.innerHTML = '<div class="text-center"><p>No articles found matching your criteria.</p></div>';
        return;
    }
    
    blogGrid.innerHTML = posts.map(post => `
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

function showBlogPost(slug) {
    const post = blogPosts.find(p => p.slug === slug);
    if (!post) return;
    
    const blogPostDiv = document.getElementById('blogPost');
    const contentDiv = document.getElementById('blogPostContent');
    
    contentDiv.innerHTML = `
        <button class="btn btn-secondary back-to-blog" onclick="showPage('blog')">← Back to Blog</button>
        <article class="blog-post-content">
            <div class="blog-post-header">
                <h1 class="blog-post-title">${post.title}</h1>
                <div class="blog-post-meta">
                    <span>${post.date}</span>
                    <span>${post.category}</span>
                    <span>${post.readTime}</span>
                </div>
            </div>
            ${post.content || '<p>Blog post content coming soon...</p>'}
        </article>
    `;
    
    showPage('blogPost');
}

// GPA Blog Content
function generateGPABlogContent() {
    return `
        <h2>Understanding GPA: The Foundation of Academic Success</h2>
        <p>Your Grade Point Average (GPA) is more than just a number on your transcript—it's a comprehensive measure of your academic performance that can significantly impact your educational and career opportunities. Whether you're in high school planning for college or already in college preparing for your career, understanding the importance of GPA and how to improve it is crucial for your success.</p>

        <h2>Why Your GPA Matters</h2>
        
        <h3>College Admissions</h3>
        <p>For high school students, GPA is one of the most important factors in college admissions. Admissions committees use GPA as a primary indicator of your ability to handle academic rigor and succeed in their programs. A strong GPA can:</p>
        <ul>
            <li>Open doors to prestigious universities and competitive programs</li>
            <li>Increase your chances of receiving merit-based scholarships</li>
            <li>Demonstrate consistency and dedication in your studies</li>
            <li>Provide leverage when standardized test scores are lower than desired</li>
        </ul>

        <h3>Career Opportunities</h3>
        <p>In college, your GPA continues to play a vital role in shaping your future. Many employers, especially in competitive fields, consider GPA when making hiring decisions. A high GPA can:</p>
        <ul>
            <li>Qualify you for prestigious internships and co-op programs</li>
            <li>Make you eligible for competitive graduate programs</li>
            <li>Demonstrate work ethic and attention to detail to potential employers</li>
            <li>Open doors to honor societies and academic recognition</li>
        </ul>

        <h3>Financial Benefits</h3>
        <p>A strong GPA can have direct financial benefits throughout your academic journey:</p>
        <ul>
            <li>Merit-based scholarships and grants</li>
            <li>Academic honor society memberships</li>
            <li>Research assistantships and teaching positions</li>
            <li>Higher starting salaries in certain fields</li>
        </ul>

        <h2>Proven Strategies to Improve Your GPA</h2>

        <h3>1. Develop Effective Study Habits</h3>
        <p>The foundation of academic success lies in consistent, effective study habits:</p>
        <ul>
            <li><strong>Create a dedicated study space:</strong> Find a quiet, well-lit area free from distractions</li>
            <li><strong>Use active learning techniques:</strong> Summarize information in your own words, create flashcards, and teach concepts to others</li>
            <li><strong>Practice spaced repetition:</strong> Review material regularly over time rather than cramming</li>
            <li><strong>Take regular breaks:</strong> Use techniques like the Pomodoro method to maintain focus</li>
        </ul>

        <h3>2. Master Time Management</h3>
        <p>Effective time management is crucial for academic success:</p>
        <ul>
            <li><strong>Use a planner or digital calendar:</strong> Track assignments, exams, and deadlines</li>
            <li><strong>Prioritize tasks:</strong> Focus on high-impact activities first</li>
            <li><strong>Break large projects into smaller tasks:</strong> Make overwhelming assignments more manageable</li>
            <li><strong>Avoid procrastination:</strong> Start assignments early to reduce stress and improve quality</li>
        </ul>

        <h3>3. Attend Classes Regularly</h3>
        <p>Class attendance is directly correlated with academic performance:</p>
        <ul>
            <li>Take comprehensive notes during lectures</li>
            <li>Participate actively in class discussions</li>
            <li>Ask questions when concepts are unclear</li>
            <li>Build relationships with professors and teaching assistants</li>
        </ul>

        <h3>4. Seek Help When Needed</h3>
        <p>Don't hesitate to ask for help when you're struggling:</p>
        <ul>
            <li><strong>Office hours:</strong> Visit professors and TAs during their office hours</li>
            <li><strong>Study groups:</strong> Form or join study groups with classmates</li>
            <li><strong>Tutoring services:</strong> Take advantage of free tutoring offered by your school</li>
            <li><strong>Academic advisors:</strong> Consult with advisors about course selection and academic planning</li>
        </ul>

        <h3>5. Choose Your Courses Strategically</h3>
        <p>Make informed decisions about your course load:</p>
        <ul>
            <li><strong>Balance difficulty:</strong> Mix challenging courses with those that align with your strengths</li>
            <li><strong>Consider timing:</strong> Be mindful of your most productive times of day when scheduling classes</li>
            <li><strong>Research professors:</strong> Read reviews and ask other students about teaching styles</li>
            <li><strong>Know withdrawal deadlines:</strong> Understand your school's policies for dropping courses</li>
        </ul>

        <h3>6. Focus on Understanding, Not Just Memorization</h3>
        <p>Deep learning leads to better retention and performance:</p>
        <ul>
            <li>Connect new information to what you already know</li>
            <li>Look for patterns and relationships between concepts</li>
            <li>Apply theoretical knowledge to practical examples</li>
            <li>Question and analyze information rather than passively accepting it</li>
        </ul>

        <h2>Weighted vs. Unweighted GPA</h2>
        <p>Understanding the difference between weighted and unweighted GPA is important for strategic course planning:</p>

        <h3>Unweighted GPA</h3>
        <p>An unweighted GPA is calculated on a standard 4.0 scale, where:</p>
        <ul>
            <li>A = 4.0</li>
            <li>B = 3.0</li>
            <li>C = 2.0</li>
            <li>D = 1.0</li>
            <li>F = 0.0</li>
        </ul>

        <h3>Weighted GPA</h3>
        <p>A weighted GPA gives additional points for more challenging courses:</p>
        <ul>
            <li>Honors courses: typically +0.5 points</li>
            <li>AP/IB courses: typically +1.0 point</li>
            <li>Dual enrollment: varies by institution</li>
        </ul>

        <h2>Long-term Benefits of a Strong GPA</h2>
        <p>The benefits of maintaining a high GPA extend far beyond graduation:</p>
        <ul>
            <li><strong>Graduate school opportunities:</strong> Many graduate programs have minimum GPA requirements</li>
            <li><strong>Professional licensing:</strong> Some professions require specific academic standards</li>
            <li><strong>Network building:</strong> Honor societies and academic recognition create valuable connections</li>
            <li><strong>Personal confidence:</strong> Academic success builds self-esteem and confidence</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Your GPA is a powerful tool that can open doors and create opportunities throughout your academic and professional life. By implementing effective study strategies, managing your time wisely, and seeking help when needed, you can improve your GPA and set yourself up for long-term success. Remember, improvement takes time and consistency, but the effort you invest in your education today will pay dividends for years to come.</p>
        
        <p>Start implementing these strategies today, and watch as your academic performance—and your opportunities—begin to improve. Your future self will thank you for the dedication and hard work you put in now.</p>
    `;
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    } else {
        showPage('home');
    }
});

// Initialize page based on URL hash
window.addEventListener('load', function() {
    const hash = window.location.hash.slice(1);
    if (hash && document.getElementById(hash)) {
        showPage(hash);
    }
});
