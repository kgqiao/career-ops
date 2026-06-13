import fs from 'fs';
import yaml from 'js-yaml';

const profile = yaml.load(fs.readFileSync('config/profile.yml', 'utf8'));
const template = fs.readFileSync('templates/cv-template.html', 'utf8');

const name = profile.candidate.full_name;
const email = profile.candidate.email;
const phone = profile.candidate.phone;
const linkedin = profile.candidate.linkedin;
const portfolio = profile.candidate.portfolio_url;
const location = profile.candidate.location;

let html = template
  .replace(/{{NAME}}/g, name)
  .replace(/{{EMAIL}}/g, email)
  .replace(/{{PHONE}}/g, phone)
  .replace(/{{LINKEDIN_URL}}/g, 'https://' + linkedin)
  .replace(/{{LINKEDIN_DISPLAY}}/g, linkedin)
  .replace(/{{PORTFOLIO_URL}}/g, portfolio)
  .replace(/{{PORTFOLIO_DISPLAY}}/g, portfolio.replace('https://', '').split('/')[0])
  .replace(/{{LOCATION}}/g, location)
  .replace(/{{LANG}}/g, 'en')
  .replace(/{{PAGE_WIDTH}}/g, '8.5in')
  .replace(/{{SECTION_SUMMARY}}/g, 'Professional Summary')
  .replace(/{{SECTION_COMPETENCIES}}/g, 'Core Competencies')
  .replace(/{{SECTION_EXPERIENCE}}/g, 'Work Experience')
  .replace(/{{SECTION_PROJECTS}}/g, 'Selected Projects')
  .replace(/{{SECTION_EDUCATION}}/g, 'Education')
  .replace(/{{SECTION_CERTIFICATIONS}}/g, 'Certifications')
  .replace(/{{SECTION_SKILLS}}/g, 'Technical Skills');

const summary = 'Systems Software Engineer & USC MSCS Candidate specializing in 3D Perception and ML Infrastructure. 7 years of experience bridging hardware-software efficiency at HP and Oracle. Proven expertise in SLAM, SfM, and 3D reconstruction algorithms for large-scale data systems.';
html = html.replace(/{{SUMMARY_TEXT}}/g, summary);

const compList = ['SLAM & SfM', '3D Reconstruction', 'Computer Vision', 'ML Infrastructure', 'HW/SW Integration', 'Systems Architecture', 'C++', 'Python'];
const competencies = compList.map(c => `<span class="competency-tag">${c}</span>`).join('\n      ');
html = html.replace(/{{COMPETENCIES}}/g, competencies);

const exp = `
<div class="job">
  <div class="job-header">
    <span class="job-company">HP INC</span>
    <span class="job-period">Jan 2022 – Present</span>
  </div>
  <div class="job-role">Data Strategy & Infrastructure Manager (Acting Systems Software Engineer)</div>
  <div class="job-location">Los Angeles, CA</div>
  <ul>
    <li><strong>Engineered multi-level Python/Qt application</strong> for 3D engineering workflows, integrating with HP JetFusion API to automate 3D printing machine tool configurations.</li>
    <li><strong>Architected technical feasibility matrices</strong> for AR smart glass prototypes, analyzing hardware/software trade-offs to accelerate development cycles.</li>
    <li><strong>Led financial data reconciliation pipeline</strong> for $5M enterprise budget, optimizing data accuracy and eliminating validation errors.</li>
  </ul>
</div>
<div class="job">
  <div class="job-header">
    <span class="job-company">ORACLE</span>
    <span class="job-period">Oct 2020 – May 2021</span>
  </div>
  <div class="job-role">Staff ERP Systems Engineer (NetSuite Consultant)</div>
  <div class="job-location">Santa Monica, CA</div>
  <ul>
    <li><strong>Designed distributed architecture</strong> for Fortune 500 ERP implementations, ensuring high-throughput data flow for 10k+ daily transaction records.</li>
    <li><strong>Optimized database queries</strong> and reporting workflows, improving latency and transaction throughput.</li>
  </ul>
</div>
`;
html = html.replace(/{{EXPERIENCE}}/g, exp);

const proj = `
<div class="project">
  <div class="project-title">Computer Vision Image Segmentation Tool<span class="project-badge">NumPy / OpenCV</span></div>
  <div class="project-desc">Developed a custom K-Means clustering algorithm from scratch, optimizing centroid initialization to accelerate convergence rates and real-time processing efficiency.</div>
</div>
`;
html = html.replace(/{{PROJECTS}}/g, proj);

const edu = `
<div class="edu-item">
  <div class="edu-header">
    <span class="edu-title">MS in Computer Science (3D Perception focus)</span>
    <span class="edu-year">2025 – Present</span>
  </div>
  <div class="edu-org">University of Southern California</div>
</div>
<div class="edu-item">
  <div class="edu-header">
    <span class="edu-title">Bachelor of Business Administration (Tech & Ops)</span>
    <span class="edu-year">2015 – 2019</span>
  </div>
  <div class="edu-org">University of Michigan</div>
</div>
`;
html = html.replace(/{{EDUCATION}}/g, edu);

html = html.replace(/{{CERTIFICATIONS}}/g, `
<div class="cert-item">
  <span class="cert-title">NetSuite Certified ERP Consultant</span>
  <span class="cert-org">Oracle</span>
  <span class="cert-year">2020</span>
</div>
`);

html = html.replace(/{{SKILLS}}/g, `
<div class="skills-grid">
  <div class="skill-item"><span class="skill-category">Languages:</span> C++, Python, SQL, JavaScript, R</div>
  <div class="skill-item"><span class="skill-category">Vision & Graphics:</span> OpenCV, NumPy, SLAM, SfM, 3D Reconstruction</div>
  <div class="skill-item"><span class="skill-category">Systems:</span> Relational Databases, SDLC, Agile Scrum</div>
</div>
`);

fs.writeFileSync('output/cv-katherine-qiao-apple-tailored.html', html);
console.log('✅ HTML CV generated: output/cv-katherine-qiao-apple-tailored.html');
