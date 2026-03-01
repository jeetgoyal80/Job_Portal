const mongoose = require("mongoose");
const Job = require("./models/job");

const MONGO_URI =
  "mongodb+srv://jeetgoyal178:F45QpBFZEHMhURqN@cluster0.7kcafl6.mongodb.net/Job-portal";

const seedJobs = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB Connected");

    const jobs = [

      // 🔹 TechNova Solutions
      {
        title: "Cloud Engineer",
        description: "Design and deploy scalable cloud infrastructure solutions.",
        requirements: ["AWS", "Terraform", "Cloud Security"],
        jobtype: "Full-time",
        experienceLevel: 3,
        salary: 1500000,
        position: 2,
        company: "68055c34daffbb3829fda8b5",
        created_by: "68040612644809fafe8bdde5",
        locations: "Bangalore"
      },
      {
        title: "Cyber Security Analyst",
        description: "Monitor and secure enterprise systems against cyber threats.",
        requirements: ["Network Security", "SIEM", "Penetration Testing"],
        jobtype: "Full-time",
        experienceLevel: 2,
        salary: 1250000,
        position: 2,
        company: "68055c34daffbb3829fda8b5",
        created_by: "68040612644809fafe8bdde5",
        locations: "Bangalore"
      },

      // 🔹 Tech Solutions
      {
        title: "Software Engineer (Java)",
        description: "Develop enterprise-grade backend systems in Java.",
        requirements: ["Java", "Spring Boot", "Microservices"],
        jobtype: "Full-time",
        experienceLevel: 2,
        salary: 1000000,
        position: 3,
        company: "68055d03cf14c98234937cd1",
        created_by: "68040612644809fafe8bdde5",
        locations: "Delhi"
      },
      {
        title: "Business Analyst",
        description: "Bridge the gap between business requirements and technical teams.",
        requirements: ["Requirement Gathering", "SQL", "Documentation"],
        jobtype: "Full-time",
        experienceLevel: 3,
        salary: 1100000,
        position: 2,
        company: "68055d03cf14c98234937cd1",
        created_by: "68040612644809fafe8bdde5",
        locations: "Delhi"
      },

      // 🔹 Meta
      {
        title: "Site Reliability Engineer (SRE)",
        description: "Ensure system reliability and uptime for global platforms.",
        requirements: ["Linux", "Kubernetes", "Monitoring Tools"],
        jobtype: "Full-time",
        experienceLevel: 4,
        salary: 2200000,
        position: 2,
        company: "6832ecae9ba99f4f9f89130f",
        created_by: "683249cca90efd9a7ddbb5e8",
        locations: "Remote"
      },
      {
        title: "Data Scientist",
        description: "Extract insights from large datasets and build predictive models.",
        requirements: ["Python", "Machine Learning", "Statistics"],
        jobtype: "Full-time",
        experienceLevel: 3,
        salary: 2100000,
        position: 2,
        company: "6832ecae9ba99f4f9f89130f",
        created_by: "683249cca90efd9a7ddbb5e8",
        locations: "Remote"
      },

      // 🔹 Metan
      {
        title: "Technical Support Engineer",
        description: "Provide L2/L3 technical support for SaaS products.",
        requirements: ["Troubleshooting", "Networking Basics", "Communication"],
        jobtype: "Full-time",
        experienceLevel: 1,
        salary: 600000,
        position: 3,
        company: "6832ed129ba99f4f9f891313",
        created_by: "683249cca90efd9a7ddbb5e8",
        locations: "Delhi"
      },
      {
        title: "Digital Marketing Specialist",
        description: "Drive online growth through SEO and paid marketing campaigns.",
        requirements: ["SEO", "Google Ads", "Analytics"],
        jobtype: "Full-time",
        experienceLevel: 2,
        salary: 750000,
        position: 2,
        company: "6832ed129ba99f4f9f891313",
        created_by: "683249cca90efd9a7ddbb5e8",
        locations: "Bangalore"
      },
      {
        title: "HR Manager",
        description: "Lead recruitment and employee engagement initiatives.",
        requirements: ["Recruitment", "HR Operations", "People Management"],
        jobtype: "Full-time",
        experienceLevel: 4,
        salary: 1200000,
        position: 1,
        company: "6832ed129ba99f4f9f891313",
        created_by: "683249cca90efd9a7ddbb5e8",
        locations: "Bangalore"
      },

      // 🔹 Internship
      {
        title: "Software Developer Intern",
        description: "Assist senior developers in building scalable applications.",
        requirements: ["Basic JavaScript", "DSA Fundamentals"],
        jobtype: "Internship",
        experienceLevel: 0,
        salary: 300000,
        position: 5,
        company: "68055c34daffbb3829fda8b5",
        created_by: "68040612644809fafe8bdde5",
        locations: "Bangalore"
      }

    ];

    await Job.insertMany(jobs);

    console.log("✅ Jobs inserted successfully");

    await mongoose.disconnect();
    process.exit();

  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};

seedJobs();