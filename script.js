// 12 SWOT Questions
const questions = [
  "1. How do you usually approach a challenging task?",
  "2. When working in a team, what role do you most naturally take?",
  "3. How do you respond to constructive criticism?",
  "4. What best describes your time management?",
  "5. When given a new tool/software to learn, how do you react?",
  "6. What do you feel about your communication skills?",
  "7. Which statement best reflects your approach to personal growth?",
  "8. In unfamiliar situations, how do you feel?",
  "9. How do you stay updated in your field/area of interest?",
  "10. When you fail at something important, how do you respond?",
  "11. What best describes your professional network?",
  "12. How do you feel about future opportunities?"
];

// Options for each question
const questionOptions = [
  ["A. With confidence and planning","B. With hesitation and second-guessing","C. With curiosity to learn new things","D. With concern about failure"],
  ["A. Leader or coordinator","B. Passive or withdrawn","C. Creative idea contributor","D. Avoid conflict; fear criticism"],
  ["A. Use it to improve myself","B. Take it personally and feel demotivated","C. Seek mentoring or coaching to grow","D. Feel threatened or anxious"],
  ["A. Always meet deadlines and plan ahead","B. Procrastinate or get overwhelmed","C. Attend time-management webinars or read productivity books","D. Get distracted or lose motivation frequently"],
  ["A. Confidently explore and self-learn","B. Avoid using it unless absolutely necessary","C. See it as a chance to upskill","D. Feel anxious about being left behind"],
  ["A. Clear, persuasive, and impactful","B. Hesitant and underconfident","C. Keen to participate in public speaking or writing contests","D. Worry about being misunderstood or judged"],
  ["A. I constantly work on improving myself","B. I rarely reflect on areas I need to grow","C. I actively look for learning programs or workshops","D. I feel overwhelmed by how fast things are changing"],
  ["A. Excited and ready to adapt","B. Uncertain and uncomfortable","C. Curious about what I can gain from it","D. Afraid of making mistakes"],
  ["A. Follow trends and actively network","B. Don’t make time to stay current","C. Enroll in online courses or attend industry events","D. Feel insecure about rapidly changing knowledge"],
  ["A. Reflect and bounce back stronger","B. Dwell on the failure and feel disheartened","C. Look for coaching or mentorship to improve","D. Fear trying again due to potential failure"],
  ["A. Strong connections in and out of the industry","B. Very limited or rarely interact","C. Regularly try to expand and attend events","D. Intimidated to approach new people"],
  ["A. I’m well-prepared to grab them","B. I feel underqualified or unprepared","C. I actively explore career fairs, internships, and certifications","D. I worry I’ll miss out due to competition"]
];

// Render questions dynamically
const questionsDiv = document.getElementById("questions");
questions.forEach((q, i) => {
  const div = document.createElement("div");
  div.classList.add("question");
  div.innerHTML = `<p>${q}</p>`;
  questionOptions[i].forEach((opt, idx) => {
    const value = ["A", "B", "C", "D"][idx];
    div.innerHTML += `
      <label>
        <input type="radio" name="q${i}" value="${value}" required> ${opt}
      </label><br>
    `;
  });
  questionsDiv.appendChild(div);
});

// Add error container
const form = document.getElementById("swotForm");
const errorBox = document.createElement("div");
errorBox.id = "errorBox";
errorBox.style.color = "red";
errorBox.style.margin = "10px 0";
form.prepend(errorBox);

// Handle form submission
form.addEventListener("submit", function(e) {
  e.preventDefault();
  errorBox.textContent = ""; // clear previous errors

  const name = document.getElementById("name").value.trim();
  const branch = document.getElementById("branch").value.trim();

  if (!name) { errorBox.textContent = "⚠️ Please enter your Name."; return; }
  if (!branch) { errorBox.textContent = "⚠️ Please enter your Branch."; return; }

  let strengths = 0, weaknesses = 0, opportunities = 0, threats = 0;

  for (let i = 0; i < questions.length; i++) {
    const ansInput = document.querySelector(`input[name="q${i}"]:checked`);
    if (!ansInput) {
      errorBox.textContent = `⚠️ Please answer Question ${i + 1} before submitting.`;
      return;
    }
    const ans = ansInput.value;
    if(ans === "A") strengths++;
    else if(ans === "B") weaknesses++;
    else if(ans === "C") opportunities++;
    else if(ans === "D") threats++;
  }

  // Find dominant domain
  let domain = "Strengths";
  let maxVal = strengths;
  if(weaknesses > maxVal) { domain = "Weaknesses"; maxVal = weaknesses; }
  if(opportunities > maxVal) { domain = "Opportunities"; maxVal = opportunities; }
  if(threats > maxVal) { domain = "Threats"; maxVal = threats; }

  // ✅ Redirect with ALL values
  window.location.href = `result.html?name=${encodeURIComponent(name)}&branch=${encodeURIComponent(branch)}&domain=${encodeURIComponent(domain)}&strengths=${strengths}&weaknesses=${weaknesses}&opportunities=${opportunities}&threats=${threats}`;
});
