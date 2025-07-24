const mongoose = require('mongoose');
const Course = require('../models/CourseModel');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eduplatform';

const courseData = [
  {
    title: "Data Science",
    youtubeUrl: "https://www.youtube.com/watch?v=ua-CiDNNj30",
    description: "Learn the fundamentals of data science and analytics.",
  },
  {
    title: "Web Development",
    youtubeUrl: "https://www.youtube.com/watch?v=Q33KBiDriJY",
    description: "Master front-end and back-end web development.",
  },
  {
    title: "Machine Learning",
    youtubeUrl: "https://www.youtube.com/watch?v=Gv9_4yMHFhI",
    description: "An introduction to algorithms and model training.",
  },
  {
    title: "Cloud Computing",
    youtubeUrl: "https://www.youtube.com/watch?v=2LaAJq1lB1Q",
    description: "Understand cloud infrastructure and deployment.",
  },
  {
    title: "Cyber Security",
    youtubeUrl: "https://www.youtube.com/watch?v=1g9A4b3t6Vw",
    description: "Learn how to protect systems from threats.",
  },
  {
    title: "Artificial Intelligence",
    youtubeUrl: "https://www.youtube.com/watch?v=JMUxmLyrhSk",
    description: "Explore intelligent systems and applications.",
  },
  {
    title: "Blockchain",
    youtubeUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
    description: "Understand decentralized technology and ledgers.",
  },
  {
    title: "DevOps",
    youtubeUrl: "https://www.youtube.com/watch?v=0yWAtQ6pG3g",
    description: "CI/CD, automation, and monitoring for developers.",
  },
  {
    title: "Digital Marketing",
    youtubeUrl: "https://www.youtube.com/watch?v=nJkVu1rGg6w",
    description: "Promote brands using digital strategies.",
  },
  {
    title: "UI/UX Design",
    youtubeUrl: "https://www.youtube.com/watch?v=3t6LFLpUmfs",
    description: "Design appealing and functional interfaces.",
  },
  {
    title: "Python Programming",
    youtubeUrl: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    description: "Code with one of the most versatile languages.",
  },
  {
    title: "Java Programming",
    youtubeUrl: "https://www.youtube.com/watch?v=GoXwIVyNvX0",
    description: "Object-oriented programming in Java.",
  },
  {
    title: "Internet of Things",
    youtubeUrl: "https://www.youtube.com/watch?v=QSIPNhOiMoE",
    description: "Connect devices and data using IoT.",
  },
  {
    title: "Robotics",
    youtubeUrl: "https://www.youtube.com/watch?v=6kJ0u9yG85Y",
    description: "Build and program robotic systems.",
  },
  {
    title: "Game Development",
    youtubeUrl: "https://www.youtube.com/watch?v=1bHtz5cXg5Y",
    description: "Create engaging games and graphics.",
  },
  {
    title: "AR/VR",
    youtubeUrl: "https://www.youtube.com/watch?v=Qe9XfQbKQw8",
    description: "Immersive experiences with AR and VR tech.",
  },
  {
    title: "Quantum Computing",
    youtubeUrl: "https://www.youtube.com/watch?v=JhHMJCUmq28",
    description: "Explore quantum bits and entanglement.",
  },
  {
    title: "C++ Programming",
    youtubeUrl: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    description: "Performance-critical systems with C++.",
  },
  {
    title: "Mobile App Development",
    youtubeUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
    description: "Build mobile apps for iOS and Android.",
  },
  {
    title: "Big Data",
    youtubeUrl: "https://www.youtube.com/watch?v=1vC6hHhYc7Y",
    description: "Process and analyze huge datasets.",
  },
  {
    title: "Networking",
    youtubeUrl: "https://www.youtube.com/watch?v=3QhU9jd03a0",
    description: "Understand how computers communicate.",
  },
  {
    title: "Ethical Hacking",
    youtubeUrl: "https://www.youtube.com/watch?v=3Kq1MIfTWCE",
    description: "Penetration testing and cybersecurity tools.",
  },
  {
    title: "SQL & Databases",
    youtubeUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
    description: "Query data using structured query language.",
  },
  {
    title: "Agile Methodology",
    youtubeUrl: "https://www.youtube.com/watch?v=Z9QbYZh1YXY",
    description: "Project management with agile practices.",
  },
  {
    title: "Project Management",
    youtubeUrl: "https://www.youtube.com/watch?v=V5Vb6B6pTJM",
    description: "Initiate, plan, and execute projects successfully.",
  },
];

// Domain-specific question generators for all courses
const generateQuiz = (title) => {
  const domainQuestions = {
    "Data Science": [
      "Which technique is most effective for handling missing data in large datasets?",
      "What is the primary purpose of regularization in linear regression?",
      "Which evaluation metric is most appropriate for imbalanced classification problems?",
      "What is the key difference between bagging and boosting?",
      "Which algorithm would you choose for high-dimensional text classification?",
      "What is the main challenge of using K-means clustering for categorical data?",
      "How does PCA help in dimensionality reduction?"
    ],
    "Web Development": [
      "What is the primary advantage of server-side rendering over client-side rendering?",
      "How does the React Virtual DOM improve performance?",
      "What is the purpose of CSRF tokens in web security?",
      "Explain the difference between REST and GraphQL API design",
      "What problem does Webpack solve in modern JavaScript development?",
      "How does the Same-Origin Policy protect web applications?",
      "What are the key benefits of using JWT for authentication?"
    ],
    "Machine Learning": [
      "What's the fundamental difference between supervised and unsupervised learning?",
      "Why is feature engineering critical for model performance?",
      "How does gradient descent optimization work?",
      "What causes overfitting and how can it be prevented?",
      "When would you choose precision over accuracy as a metric?",
      "What are the limitations of neural networks?",
      "Explain the bias-variance tradeoff"
    ],
    "Cloud Computing": [
      "What are the key differences between IaaS, PaaS, and SaaS?",
      "How does auto-scaling improve cloud resource management?",
      "What security considerations are unique to cloud environments?",
      "Explain the CAP theorem and its implications for distributed systems",
      "What are the advantages of containerization over traditional virtualization?",
      "How does serverless computing change application architecture?",
      "What strategies ensure high availability in cloud deployments?"
    ],
    "Cyber Security": [
      "What is the fundamental difference between symmetric and asymmetric encryption?",
      "How does a zero-day vulnerability differ from other security threats?",
      "What are the key components of an effective incident response plan?",
      "Explain the principle of least privilege in access control",
      "How does defense-in-depth enhance security posture?",
      "What are the limitations of signature-based antivirus systems?",
      "How does a man-in-the-middle attack compromise communication security?"
    ],
    "Artificial Intelligence": [
      "What distinguishes narrow AI from general AI?",
      "How do neural networks mimic human cognition?",
      "What are the ethical implications of autonomous decision-making systems?",
      "Explain the Turing Test and its significance",
      "How does reinforcement learning differ from supervised learning?",
      "What are the limitations of current natural language processing systems?",
      "How do genetic algorithms solve optimization problems?"
    ],
    "Blockchain": [
      "What cryptographic principle ensures blockchain immutability?",
      "How does consensus mechanism prevent double-spending?",
      "What are the key differences between public and private blockchains?",
      "Explain how smart contracts automate transactions",
      "What scalability challenges face blockchain networks?",
      "How does proof-of-work differ from proof-of-stake?",
      "What are the security implications of 51% attacks?"
    ],
    "DevOps": [
      "What are the core principles of the DevOps methodology?",
      "How does infrastructure as code improve deployment reliability?",
      "What benefits do container orchestration systems provide?",
      "Explain the role of CI/CD pipelines in modern development",
      "What monitoring strategies ensure system reliability?",
      "How does blue-green deployment minimize downtime?",
      "What security practices are essential in DevOps workflows?"
    ],
    "Digital Marketing": [
      "What are the key differences between SEO and SEM?",
      "How does A/B testing optimize conversion rates?",
      "What metrics best measure content marketing effectiveness?",
      "Explain the customer journey funnel stages",
      "How does programmatic advertising differ from traditional methods?",
      "What strategies improve email campaign open rates?",
      "How do attribution models affect marketing ROI calculations?"
    ],
    "UI/UX Design": [
      "What is the difference between usability and user experience?",
      "How does Hick's Law influence interface design?",
      "What are the key principles of responsive design?",
      "Explain the importance of information architecture",
      "How do you conduct effective usability testing?",
      "What role does accessibility play in modern design?",
      "How does color psychology impact user engagement?"
    ],
    "Python Programming": [
      "What are the differences between shallow and deep copying?",
      "How does the Global Interpreter Lock affect multithreading?",
      "Explain Python's name binding and reference counting",
      "What are the advantages of generators over lists?",
      "How does duck typing differ from static typing?",
      "What are metaclasses and when would you use them?",
      "How does Python manage memory for large data structures?"
    ],
    "Java Programming": [
      "What are the differences between abstract classes and interfaces?",
      "How does the JVM optimize bytecode execution?",
      "Explain the Java memory model and garbage collection",
      "What are the advantages of immutable objects?",
      "How does the try-with-resources statement improve resource management?",
      "What are the limitations of Java generics?",
      "How does the volatile keyword ensure visibility in multithreading?"
    ],
    "Internet of Things": [
      "What are the key challenges in IoT device security?",
      "How do constrained devices implement communication protocols?",
      "What role do edge computing systems play in IoT architecture?",
      "Explain the MQTT protocol's publish-subscribe model",
      "What are the trade-offs between Bluetooth and WiFi for IoT connectivity?",
      "How do IoT systems handle device authentication at scale?",
      "What challenges exist in managing over-the-air updates?"
    ],
    "Robotics": [
      "What are the differences between proprioceptive and exteroceptive sensors?",
      "How do PID controllers maintain system stability?",
      "Explain forward vs. inverse kinematics",
      "What are the challenges in robotic path planning?",
      "How does SLAM enable autonomous navigation?",
      "What are the trade-offs between centralized and distributed control architectures?",
      "How do robotic systems implement obstacle avoidance?"
    ],
    "Game Development": [
      "What are the key differences between game engines and frameworks?",
      "How do quaternions solve gimbal lock in 3D rotations?",
      "Explain the entity-component-system architecture",
      "What techniques optimize real-time rendering performance?",
      "How does procedural generation create dynamic content?",
      "What are the challenges in networked multiplayer synchronization?",
      "How do game physics engines handle collision detection?"
    ],
    "AR/VR": [
      "What are the key differences between marker-based and markerless AR?",
      "How do inside-out tracking systems differ from outside-in?",
      "Explain the challenges in achieving low-latency head tracking",
      "What techniques minimize motion sickness in VR experiences?",
      "How does foveated rendering optimize performance?",
      "What are the differences between optical and video see-through AR?",
      "How do spatial mapping systems create environmental understanding?"
    ],
    "Quantum Computing": [
      "What fundamental principle enables quantum superposition?",
      "How does quantum entanglement enable communication?",
      "Explain the significance of qubit decoherence",
      "What are the differences between quantum and classical gates?",
      "How does Shor's algorithm threaten current encryption?",
      "What are the challenges in quantum error correction?",
      "How do quantum annealing systems solve optimization problems?"
    ],
    "C++ Programming": [
      "What are the differences between stack and heap allocation?",
      "How do move semantics optimize resource management?",
      "Explain RAII and its importance in C++",
      "What are the advantages of smart pointers over raw pointers?",
      "How does template metaprogramming enable compile-time computation?",
      "What are the rules of three, five, and zero?",
      "How does undefined behavior manifest in C++ programs?"
    ],
    "Mobile App Development": [
      "What are the key differences between native and cross-platform development?",
      "How do mobile applications manage background processing constraints?",
      "Explain adaptive vs. responsive design for mobile interfaces",
      "What security considerations are unique to mobile platforms?",
      "How do mobile apps optimize for varying network conditions?",
      "What are the challenges in maintaining consistent UX across devices?",
      "How do mobile platforms handle permission management?"
    ],
    "Big Data": [
      "What are the key differences between batch and stream processing?",
      "How does the MapReduce paradigm enable distributed computation?",
      "Explain CAP theorem implications for distributed databases",
      "What strategies handle data skew in distributed systems?",
      "How do NoSQL databases differ from relational systems?",
      "What are the challenges in maintaining data quality at scale?",
      "How does lambda architecture combine batch and stream processing?"
    ],
    "Networking": [
      "What are the key differences between TCP and UDP protocols?",
      "How does BGP enable internet-scale routing?",
      "Explain the OSI model layers and their functions",
      "What are the security implications of ARP spoofing?",
      "How do CDNs improve content delivery performance?",
      "What are the challenges in IPv6 migration?",
      "How does TLS ensure secure communication?"
    ],
    "Ethical Hacking": [
      "What are the key differences between white-box and black-box testing?",
      "How does SQL injection exploit application vulnerabilities?",
      "Explain the steps in a penetration testing methodology",
      "What techniques detect and prevent lateral movement in networks?",
      "How do ethical hackers bypass authentication mechanisms?",
      "What are the limitations of vulnerability scanners?",
      "How does social engineering compromise security?"
    ],
    "SQL & Databases": [
      "What are the differences between OLTP and OLAP systems?",
      "How do database indexes improve query performance?",
      "Explain ACID properties and their importance",
      "What are the trade-offs between normalization and denormalization?",
      "How do NoSQL databases handle schema flexibility?",
      "What are the challenges in database sharding?",
      "How does query optimization work in relational databases?"
    ],
    "Agile Methodology": [
      "What are the key differences between Scrum and Kanban?",
      "How does agile estimation differ from traditional methods?",
      "Explain the role of continuous improvement in agile frameworks",
      "What challenges exist in scaling agile to large organizations?",
      "How do agile teams maintain technical quality?",
      "What are the anti-patterns in agile implementation?",
      "How does DevOps complement agile methodologies?"
    ],
    "Project Management": [
      "What are the key differences between predictive and adaptive life cycles?",
      "How does critical path method optimize project scheduling?",
      "Explain earned value management for project performance measurement",
      "What strategies manage stakeholder expectations effectively?",
      "How do risk management processes identify and mitigate threats?",
      "What are the challenges in virtual team management?",
      "How does change control maintain project scope integrity?"
    ]
  };

  // Fallback to generic questions if course not found
  const questions = domainQuestions[title] || [
    `What is the most significant challenge in ${title}?`,
    `Which advanced technique requires careful trade-off consideration in ${title}?`,
    `How do fundamental principles impact ${title} system design?`,
    `What is the primary criticism of traditional approaches in ${title}?`,
    `What emerging technology is disrupting ${title} practices?`,
    `Explain how recent advancements address limitations in ${title}`,
    `What are the security implications of applying ${title}?`
  ];

  return questions.map((question, index) => {
    const options = [
      `Correct approach for ${title}`,
      `Common misconception in ${title}`,
      `Outdated practice in ${title}`,
      `Unrelated concept to ${title}`
    ];
    
    return {
      question: `Q${index+1}: ${question}`,
      options: options,
      answer: options[0]
    };
  });
};

const seedCourses = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    await Course.deleteMany();

    const enrichedCourses = courseData.map((course) => ({
      ...course,
      quiz: generateQuiz(course.title),
    }));

    await Course.insertMany(enrichedCourses);

    console.log('✅ 25 courses with 7 quizzes each seeded successfully!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedCourses();