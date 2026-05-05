export const classesData = {
  1: {
    name: "HIIT",
    category: "cardio",
    duration: "45 min",
    intensity: "High",
    calories: "500-700",
    image: "/hitt.jpg",
    gallery: ["/hitt.jpg", "/hitt2.jpg", "/hitt3.jpg"],
    description: "High-intensity interval training that alternates between intense bursts of activity and fixed periods of less-intense activity.",
    longDescription: "HIIT (High-Intensity Interval Training) is a training technique in which you give all-out, 100% effort through quick, intense bursts of exercise, followed by short recovery periods. This type of training gets and keeps your heart rate up and burns more fat in less time. Our HIIT classes are designed to push your limits, improve cardiovascular health, and boost metabolism for hours after your workout. Suitable for all fitness levels with modifications provided.",
    benefits: [
      "Burn maximum calories in minimum time",
      "Boost metabolism for up to 24 hours",
      "Improve cardiovascular health",
      "Build endurance and stamina",
      "No equipment needed"
    ],
    schedule: [
      { day: "Monday", time: "7:00 AM", trainer: "Sarah Johnson" },
      { day: "Wednesday", time: "6:00 PM", trainer: "Sarah Johnson" },
      { day: "Friday", time: "8:00 AM", trainer: "Mike Thompson" }
    ],
    trainer: {
      name: "Sarah Johnson",
      role: "Lead HIIT Trainer",
      experience: "8+ years",
      bio: "Sarah is a certified fitness trainer specializing in high-intensity workouts. She has helped over 500 clients achieve their fitness goals.",
      image: "/sarah.jpg"
    },
    price: "₹2,999",
    spotsLeft: 12,
    equipment: ["Mat", "Dumbbells", "Timer"],
    level: "All Levels"
  },
  2: {
    name: "CrossFit",
    category: "strength",
    duration: "60 min",
    intensity: "Very High",
    calories: "600-800",
    image: "/crossfit.jpg",
    gallery: ["/crossfit.jpg", "/crossfit2.jpg", "/crossfit3.jpg"],
    description: "Functional fitness program combining weightlifting, gymnastics, and cardiovascular training.",
    longDescription: "CrossFit is a core strength and conditioning program that uses constantly varied functional movements executed at high intensity. Our CrossFit classes incorporate elements from gymnastics, weightlifting, and cardiovascular training to build a well-rounded athletic foundation. Each day brings new workouts (WODs) that challenge different aspects of fitness.",
    benefits: [
      "Build functional strength",
      "Improve overall athleticism",
      "Develop mental toughness",
      "Community-driven environment",
      "Trackable progress"
    ],
    schedule: [
      { day: "Tuesday", time: "6:00 AM", trainer: "Mike Thompson" },
      { day: "Thursday", time: "5:00 PM", trainer: "Mike Thompson" },
      { day: "Saturday", time: "9:00 AM", trainer: "David Chen" }
    ],
    trainer: {
      name: "Mike Thompson",
      role: "Head CrossFit Coach",
      experience: "10+ years",
      bio: "Mike is a certified CrossFit Level 3 trainer with competitive experience. He specializes in form correction and programming.",
      image: "/mike.jpg"
    },
    price: "₹3,499",
    spotsLeft: 8,
    equipment: ["Barbell", "Pull-up Bar", "Kettlebell", "Jump Rope"],
    level: "Intermediate to Advanced"
  },
  3: {
    name: "Kickboxing",
    category: "cardio",
    duration: "50 min",
    intensity: "High",
    calories: "550-750",
    image: "/kickboxing.jpg",
    gallery: ["/kickboxing.jpg", "/kickboxing2.jpg", "/kickboxing3.jpg"],
    description: "Cardio-intensive workout combining martial arts techniques with fast-paced cardio.",
    longDescription: "Kickboxing is a high-energy martial arts-inspired workout that combines punching, kicking, and cardio drills. Our classes provide a full-body workout that improves coordination, builds strength, and relieves stress. You'll learn proper striking techniques while burning serious calories. No sparring or contact is involved - just intense bag work and bodyweight exercises.",
    benefits: [
      "Full-body cardio workout",
      "Stress relief and confidence building",
      "Improve coordination and reflexes",
      "Learn self-defense basics",
      "Tone arms, core, and legs"
    ],
    schedule: [
      { day: "Monday", time: "5:30 PM", trainer: "David Chen" },
      { day: "Wednesday", time: "7:00 AM", trainer: "David Chen" },
      { day: "Friday", time: "6:30 PM", trainer: "Robert Wilson" }
    ],
    trainer: {
      name: "David Chen",
      role: "Muay Thai Specialist",
      experience: "12+ years",
      bio: "David is a former competitive kickboxer with multiple championship titles. He brings energy and expertise to every class.",
      image: "/david.jpg"
    },
    price: "₹2,999",
    spotsLeft: 15,
    equipment: ["Boxing Gloves", "Hand Wraps", "Focus Pads"],
    level: "All Levels"
  },
  4: {
    name: "Yoga",
    category: "flexibility",
    duration: "60 min",
    intensity: "Low-Medium",
    calories: "200-350",
    image: "/yoga.jpg",
    gallery: ["/yoga.jpg", "/yoga2.jpg", "/yoga3.jpg"],
    description: "Mind-body practice combining physical postures, breathing exercises, and meditation.",
    longDescription: "Our Yoga classes offer a holistic approach to fitness that nurtures both body and mind. Through a combination of asanas (postures), pranayama (breathing), and meditation, you'll improve flexibility, build strength, and reduce stress. Classes are suitable for all levels, with modifications offered for beginners and advanced variations for experienced practitioners.",
    benefits: [
      "Increase flexibility and mobility",
      "Reduce stress and anxiety",
      "Build core strength",
      "Improve balance and posture",
      "Better sleep and mental clarity"
    ],
    schedule: [
      { day: "Tuesday", time: "9:00 AM", trainer: "Olivia Parker" },
      { day: "Thursday", time: "6:00 PM", trainer: "Olivia Parker" },
      { day: "Saturday", time: "8:00 AM", trainer: "Olivia Parker" },
      { day: "Sunday", time: "10:00 AM", trainer: "Jessica Martin" }
    ],
    trainer: {
      name: "Olivia Parker",
      role: "RYT 500 Yoga Instructor",
      experience: "7+ years",
      bio: "Olivia is a registered yoga teacher with expertise in Vinyasa and Hatha yoga. She creates a welcoming environment for all levels.",
      image: "/olivia.jpg"
    },
    price: "₹2,499",
    spotsLeft: 20,
    equipment: ["Yoga Mat", "Blocks", "Strap"],
    level: "All Levels"
  },
  5: {
    name: "Strength Training",
    category: "strength",
    duration: "55 min",
    intensity: "High",
    calories: "400-600",
    image: "/strenght.jpg",
    gallery: ["/strenght.jpg", "/strenght2.jpg", "/strenght3.jpg"],
    description: "Build muscle and increase strength with targeted resistance training exercises.",
    longDescription: "Strength Training classes focus on building muscle mass and increasing overall strength through progressive resistance exercises. Our certified trainers guide you through proper form and technique using free weights, machines, and bodyweight exercises. Perfect for those looking to transform their physique and increase functional strength.",
    benefits: [
      "Increase muscle mass and strength",
      "Boost metabolism",
      "Improve bone density",
      "Enhance posture",
      "Build confidence"
    ],
    schedule: [
      { day: "Monday", time: "10:00 AM", trainer: "Jackson Mitchell" },
      { day: "Wednesday", time: "4:00 PM", trainer: "Jackson Mitchell" },
      { day: "Friday", time: "12:00 PM", trainer: "Ethan Reynolds" }
    ],
    trainer: {
      name: "Jackson Mitchell",
      role: "Strength & Conditioning Coach",
      experience: "9+ years",
      bio: "Jackson is a certified strength coach who has trained professional athletes and fitness enthusiasts alike.",
      image: "/jackson.jpg"
    },
    price: "₹2,799",
    spotsLeft: 10,
    equipment: ["Dumbbells", "Barbells", "Resistance Bands"],
    level: "Beginner to Advanced"
  },
  6: {
    name: "Cardio Dance",
    category: "cardio",
    duration: "45 min",
    intensity: "Medium-High",
    calories: "450-650",
    image: "/cardio.jpg",
    gallery: ["/cardio.jpg", "/cardio2.jpg", "/cardio3.jpg"],
    description: "Fun, energetic dance workout that gets your heart pumping and body moving.",
    longDescription: "Cardio Dance is a high-energy workout that combines dance moves with aerobic exercise. No dance experience required - just bring your energy and willingness to have fun! Our classes feature upbeat music from various genres, making exercise feel like a party while you burn serious calories.",
    benefits: [
      "Burn calories while having fun",
      "Improve coordination and rhythm",
      "Boost mood and energy",
      "Low-impact option available",
      "Great for all fitness levels"
    ],
    schedule: [
      { day: "Tuesday", time: "7:00 PM", trainer: "Amanda Lee" },
      { day: "Thursday", time: "10:00 AM", trainer: "Amanda Lee" },
      { day: "Saturday", time: "11:00 AM", trainer: "Maria Garcia" }
    ],
    trainer: {
      name: "Amanda Lee",
      role: "Dance Fitness Instructor",
      experience: "6+ years",
      bio: "Amanda is a professional dancer and certified fitness instructor who makes every class a celebration of movement.",
      image: "/amanda.jpg"
    },
    price: "₹2,499",
    spotsLeft: 25,
    equipment: ["Comfortable Shoes", "Water Bottle"],
    level: "All Levels"
  },
  7: {
    name: "Pilates",
    category: "flexibility",
    duration: "50 min",
    intensity: "Medium",
    calories: "250-400",
    image: "/Pilates.jpg",
    gallery: ["/Pilates.jpg", "/Pilates2.jpg", "/Pilates3.jpg"],
    description: "Core-strengthening workout focusing on controlled movements and breathing.",
    longDescription: "Pilates is a low-impact exercise method that strengthens muscles while improving postural alignment and flexibility. Our classes focus on controlled movements, proper breathing, and core engagement. Ideal for anyone looking to improve posture, reduce back pain, or build a strong foundation for other activities.",
    benefits: [
      "Strengthen core muscles",
      "Improve posture and alignment",
      "Increase flexibility",
      "Reduce back pain",
      "Enhance body awareness"
    ],
    schedule: [
      { day: "Monday", time: "9:00 AM", trainer: "Jessica Martin" },
      { day: "Wednesday", time: "11:00 AM", trainer: "Jessica Martin" },
      { day: "Friday", time: "4:00 PM", trainer: "Olivia Parker" }
    ],
    trainer: {
      name: "Jessica Martin",
      role: "Certified Pilates Instructor",
      experience: "5+ years",
      bio: "Jessica specializes in rehabilitative Pilates and has helped many clients recover from injuries and improve core strength.",
      image: "/jessica.jpg"
    },
    price: "₹2,699",
    spotsLeft: 15,
    equipment: ["Yoga Mat", "Pilates Ring"],
    level: "All Levels"
  },
  8: {
    name: "Zumba",
    category: "cardio",
    duration: "60 min",
    intensity: "High",
    calories: "500-700",
    image: "/zumba.jpg",
    gallery: ["/zumba.jpg", "/zumba2.jpg", "/zumba3.jpg"],
    description: "Latin-inspired dance fitness party that burns calories while having fun.",
    longDescription: "Zumba is a fitness program that combines Latin and international music with dance moves. Our classes create a party-like atmosphere where you'll forget you're working out! The routines feature interval training with fast and slow rhythms to help improve cardiovascular fitness while toning your body.",
    benefits: [
      "Full-body workout",
      "Improves cardiovascular health",
      "Tones muscles",
      "Reduces stress",
      "Increases energy levels"
    ],
    schedule: [
      { day: "Tuesday", time: "8:00 AM", trainer: "Maria Garcia" },
      { day: "Thursday", time: "7:00 PM", trainer: "Maria Garcia" },
      { day: "Saturday", time: "10:00 AM", trainer: "Amanda Lee" }
    ],
    trainer: {
      name: "Maria Garcia",
      role: "Zumba Certified Instructor",
      experience: "7+ years",
      bio: "Maria brings infectious energy to every class. Her passion for Latin dance and fitness creates an unforgettable experience.",
      image: "/maria.jpg"
    },
    price: "₹2,499",
    spotsLeft: 30,
    equipment: ["Comfortable Shoes", "Water Bottle", "Towel"],
    level: "All Levels"
  }
};