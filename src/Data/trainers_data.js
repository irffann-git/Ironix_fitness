// src/data/trainersData.js

export const trainersData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Lead HIIT Trainer",
    category: "cardio",
    experience: "8+ years",
    specialties: ["HIIT", "Interval Training", "Speed & Agility"],
    bio: "Sarah is a certified fitness trainer specializing in high-intensity workouts. She has helped over 500 clients achieve their fitness goals with her energetic and motivating approach.",
    image: "/sarah.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["NASM Certified", "CPR/AED", "HIIT Specialist"],
    rating: 4.9,
    students: 520
  },
  {
    id: 2,
    name: "Mike Thompson",
    role: "Head CrossFit Coach",
    category: "strength",
    experience: "10+ years",
    specialties: ["CrossFit", "Weightlifting", "Powerlifting"],
    bio: "Mike is a certified CrossFit Level 3 trainer with competitive experience. He specializes in form correction and programming to help you reach your full potential.",
    image: "/mike.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["CrossFit Level 3", "USAW Level 1", "Nutrition Coach"],
    rating: 4.8,
    students: 380
  },
  {
    id: 3,
    name: "David Chen",
    role: "Muay Thai Specialist",
    category: "cardio",
    experience: "12+ years",
    specialties: ["Kickboxing", "Muay Thai", "Self Defense"],
    bio: "David is a former competitive kickboxer with multiple championship titles. He brings energy and expertise to every class, focusing on technique and cardiovascular fitness.",
    image: "/david.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["Muay Thai Certified", "Kickboxing Instructor", "Personal Training"],
    rating: 4.9,
    students: 450
  },
  {
    id: 4,
    name: "Olivia Parker",
    role: "RYT 500 Yoga Instructor",
    category: "flexibility",
    experience: "7+ years",
    specialties: ["Vinyasa Yoga", "Hatha Yoga", "Meditation"],
    bio: "Olivia is a registered yoga teacher with expertise in Vinyasa and Hatha yoga. She creates a welcoming environment for all levels, focusing on alignment and breath work.",
    image: "/olivia.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["RYT 500", "Pranayama", "Yoga Therapy"],
    rating: 4.9,
    students: 600
  },
  {
    id: 5,
    name: "Jackson Mitchell",
    role: "Strength & Conditioning Coach",
    category: "strength",
    experience: "9+ years",
    specialties: ["Strength Training", "Bodybuilding", "Athletic Performance"],
    bio: "Jackson is a certified strength coach who has trained professional athletes and fitness enthusiasts alike. He believes in building sustainable strength through proper form.",
    image: "/jackson.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["CSCS", "NSCA Certified", "Sports Nutrition"],
    rating: 4.7,
    students: 310
  },
  {
    id: 6,
    name: "Jessica Martin",
    role: "Certified Pilates Instructor",
    category: "flexibility",
    experience: "5+ years",
    specialties: ["Pilates", "Core Strengthening", "Rehabilitation"],
    bio: "Jessica specializes in rehabilitative Pilates and has helped many clients recover from injuries and improve core strength. Her classes focus on controlled movements.",
    image: "/jessica.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["Pilates Certified", "Core Alignment", "Pre/Post Natal"],
    rating: 4.8,
    students: 280
  },
  {
    id: 7,
    name: "Maria Garcia",
    role: "Zumba Certified Instructor",
    category: "cardio",
    experience: "7+ years",
    specialties: ["Zumba", "Dance Fitness", "Latin Dance"],
    bio: "Maria brings infectious energy to every class. Her passion for Latin dance and fitness creates an unforgettable experience that makes you forget you're working out.",
    image: "/maria.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["Zumba Basic", "Zumba Gold", "Strong Nation"],
    rating: 4.9,
    students: 550
  },
  {
    id: 8,
    name: "Ethan Reynolds",
    role: "Gym Trainer",
    category: "strength",
    experience: "6+ years",
    specialties: ["Functional Training", "Weight Loss", "Muscle Building"],
    bio: "Ethan is passionate about helping people transform their bodies and lives. He creates personalized workout plans that fit your lifestyle and goals.",
    image: "/ethan.jpg",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["ACE Certified", "Nutrition Specialist", "Functional Training"],
    rating: 4.6,
    students: 220
  },
  {
    id: 9,
    name: "Dr. Emily White",
    role: "Mindfulness & Meditation Coach",
    category: "flexibility",
    experience: "10+ years",
    specialties: ["Meditation", "Stress Management", "Mindfulness"],
    bio: "Dr. Emily combines her psychology background with mindfulness practices to help clients find inner peace and mental clarity. Perfect for stress relief.",
    image: "/emily.png",  // ← your image name
    social: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      linkedin: "https://linkedin.com"
    },
    certifications: ["PhD Psychology", "Mindfulness Certified", "Stress Management"],
    rating: 4.9,
    students: 420
  }
];

export const categoriesData = [
  { id: "all", name: "All Trainers", icon: "fas fa-users" },
  { id: "strength", name: "Strength", icon: "fas fa-dumbbell" },
  { id: "cardio", name: "Cardio", icon: "fas fa-heartbeat" },
  { id: "flexibility", name: "Flexibility", icon: "fas fa-hand-peace" }
];