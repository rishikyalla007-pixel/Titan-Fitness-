import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Dumbbell, Plus, Trash2, Check, Sparkles, Phone, Trophy, 
  Zap, RefreshCw, Clock, ArrowRight, Heart, Star, 
  Smile, Flame, Compass, Bell, Activity, Layers, Play 
} from "lucide-react";

interface WorkoutSet {
  id: string;
  weight: number;
  reps: number;
  completed: boolean;
}

interface ExerciseLog {
  id: string;
  name: string;
  sets: WorkoutSet[];
}

interface WorkoutPreset {
  name: string;
  duration: string;
  level: string;
  focus: string;
  exercises: string[];
}

interface MoodConfig {
  key: string;
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  glowColor: string;
  description: string;
  workouts: WorkoutPreset[];
}

// 6 Elite Mood profiles matching VibeMove spec
const MOOD_CONFIGS: MoodConfig[] = [
  {
    key: "low-energy",
    label: "Low Energy",
    emoji: "🥱",
    color: "#6366f1", // Indigo
    bgColor: "rgba(99, 102, 241, 0.08)",
    glowColor: "rgba(99, 102, 241, 0.3)",
    description: "You feel slow and steady. Perfect for recovery work, structural alignment, and myofascial decompression.",
    workouts: [
      {
        name: "Yin Restorative Yoga",
        duration: "35 mins",
        level: "Easy",
        focus: "Recovery",
        exercises: ["Deep Child's Pose", "Supported Fish Pose", "Sphinx Stretch", "Seated Forward Fold"]
      },
      {
        name: "Myofascial Decompression",
        duration: "20 mins",
        level: "Easy",
        focus: "Joint Release",
        exercises: ["Foam Roll Quads", "Spinal Decompression", "Hamstring Band Release"]
      }
    ]
  },
  {
    key: "tense",
    label: "Tense",
    emoji: "🥶",
    color: "#14b8a6", // Teal
    bgColor: "rgba(20, 184, 166, 0.08)",
    glowColor: "rgba(20, 184, 166, 0.3)",
    description: "Feeling locked or high stress. Best suited for deep decompression, joint mobility, and breathing rhythm.",
    workouts: [
      {
        name: "Deep Tissue Mobility",
        duration: "45 mins",
        level: "Medium",
        focus: "Joint Flow",
        exercises: ["Cat-Cow Flow", "World's Greatest Stretch", "90/90 Hip Switches", "Scapular Pulls"]
      },
      {
        name: "Cortisol Balance Stretch",
        duration: "30 mins",
        level: "Easy",
        focus: "Nervous Decon",
        exercises: ["Box Breathing Prep", "Child's Pose Reach", "Pigeon Stretch", "Happy Baby Posture"]
      }
    ]
  },
  {
    key: "calm",
    label: "Calm",
    emoji: "🌸",
    color: "#ec4899", // Pastel Pink
    bgColor: "rgba(236, 72, 153, 0.08)",
    glowColor: "rgba(236, 72, 153, 0.3)",
    description: "You feel relaxed, quiet, and grounded. Look for mindful flow sequences, balance, and deep postural breath.",
    workouts: [
      {
        name: "Soft Vinyasa Flow",
        duration: "40 mins",
        level: "Medium",
        focus: "Core Balance",
        exercises: ["Downdog to Plank Flow", "Warrior II Sequence", "Tree Pose Balance", "Cobra Flow"]
      },
      {
        name: "VibeMove Grounding Core",
        duration: "25 mins",
        level: "Easy",
        focus: "Breath Centering",
        exercises: ["Deadbug Core Holds", "Bird Dog Steady", "Glute Bridge Pulses"]
      }
    ]
  },
  {
    key: "balanced",
    label: "Balanced",
    emoji: "🍀",
    color: "#10b981", // Sage Green
    bgColor: "rgba(16, 185, 129, 0.08)",
    glowColor: "rgba(16, 185, 129, 0.3)",
    description: "You feel stable and focused. Perfect moment for controlled strength, joint integrity, and compound stabilization.",
    workouts: [
      {
        name: "Full-Body Stabilization",
        duration: "50 mins",
        level: "Medium",
        focus: "Postural Stability",
        exercises: ["Goblet Squats", "Dumbbell Renegade Rows", "Single-Leg Kettlebell Romanian Deadlifts", "Plank Rotations"]
      },
      {
        name: "Kettlebell Synergy Flow",
        duration: "40 mins",
        level: "Medium",
        focus: "Multi-joint Control",
        exercises: ["Kettlebell Halos", "Controlled Goblet Squats", "Single-Arm Suitcase Carry"]
      }
    ]
  },
  {
    key: "energized",
    label: "Energized",
    emoji: "☀️",
    color: "#f59e0b", // Amber Yellow
    bgColor: "rgba(245, 158, 11, 0.08)",
    glowColor: "rgba(245, 158, 11, 0.3)",
    description: "You feel active, athletic, and high-frequency! Prime for high-intensity lifts, compound supersets, and dynamic cardio.",
    workouts: [
      {
        name: "Strength & Sweet Yoga",
        duration: "45 mins",
        level: "Hard",
        focus: "Power & Stretch",
        exercises: ["Barbell Squats", "Overhead Dumbbell Presses", "Active Sun Salutation Flows", "Dumbbell Lunges"]
      },
      {
        name: "Titan Compound Overload",
        duration: "55 mins",
        level: "Hard",
        focus: "Muscle Density",
        exercises: ["Bench Press Complex", "Sumo Deadlifts", "EZ Bar Bicep Curls", "Weighted Skullcrushers"]
      }
    ]
  },
  {
    key: "high-energy",
    label: "High Energy",
    emoji: "🔥",
    color: "#ef4444", // Crimson Red
    bgColor: "rgba(239, 68, 68, 0.08)",
    glowColor: "rgba(239, 68, 68, 0.3)",
    description: "Raw peak power charge! Ready to crush heavy compound weights, record PR volumes, and hit extreme conditioning.",
    workouts: [
      {
        name: "High-Intensity Olympic Prep",
        duration: "60 mins",
        level: "Expert",
        focus: "Speed & Power",
        exercises: ["Barbell Clean & Jerk", "Heavy Barbell Squats", "Strict Overhead Press", "Kettlebell High Pulls"]
      },
      {
        name: "Titan PR-Crusher",
        duration: "50 mins",
        level: "Expert",
        focus: "Raw Volume Overload",
        exercises: ["Bench Press (Heavy)", "Deadlift (Heavy Raw)", "Barbell Rows", "Weighted Pull-ups"]
      }
    ]
  }
];

export default function WorkoutTracker() {
  // Session tracking state
  const [exercises, setExercises] = useState<ExerciseLog[]>(() => {
    const saved = localStorage.getItem("titan_workout_session");
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return []; }
    }
    return [];
  });

  const [workoutStartTime, setWorkoutStartTime] = useState<string | null>(() => {
    return localStorage.getItem("titan_workout_start_time") || null;
  });
  const [duration, setDuration] = useState("00:00");
  const [activeSessionName, setActiveSessionName] = useState<string>(() => {
    return localStorage.getItem("titan_active_session_name") || "Custom Workout";
  });

  // VibeMove App mockup navigation / interactive flow states
  const [mockupStep, setMockupStep] = useState<"dashboard" | "mood-selector" | "workout-suggested">("dashboard");
  const [selectedMoodIdx, setSelectedMoodIdx] = useState<number>(3); // Default 'Balanced'
  const [selectedWorkout, setSelectedWorkout] = useState<WorkoutPreset | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Gym");

  // Filter exercises logic helpers
  const [searchQuery, setSearchQuery] = useState("");
  const [customExerciseName, setCustomExerciseName] = useState("");

  const selectedMood = MOOD_CONFIGS[selectedMoodIdx];

  // Persistence handler
  useEffect(() => {
    localStorage.setItem("titan_workout_session", JSON.stringify(exercises));
  }, [exercises]);

  useEffect(() => {
    if (workoutStartTime) {
      localStorage.setItem("titan_workout_start_time", workoutStartTime);
    } else {
      localStorage.removeItem("titan_workout_start_time");
    }
  }, [workoutStartTime]);

  useEffect(() => {
    localStorage.setItem("titan_active_session_name", activeSessionName);
  }, [activeSessionName]);

  // Session Duration Timer
  useEffect(() => {
    if (!workoutStartTime) {
      setDuration("00:00");
      return;
    }

    const updateTimer = () => {
      const start = new Date(workoutStartTime).getTime();
      const now = new Date().getTime();
      const diffMs = now - start;
      if (diffMs < 0) return;

      const diffSecs = Math.floor(diffMs / 1000);
      const mins = Math.floor(diffSecs / 60);
      const secs = diffSecs % 60;
      setDuration(
        `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      );
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [workoutStartTime]);

  // Load a recommended workout sequence into the Active Workout Tracker
  const handleStartWorkout = (workout: WorkoutPreset) => {
    setWorkoutStartTime(new Date().toISOString());
    setActiveSessionName(workout.name);
    
    // Convert preset exercises names into active logger structures
    const newLogs: ExerciseLog[] = workout.exercises.map(name => ({
      id: crypto.randomUUID(),
      name,
      sets: [
        { id: crypto.randomUUID(), weight: 40, reps: 10, completed: false },
        { id: crypto.randomUUID(), weight: 45, reps: 10, completed: false },
        { id: crypto.randomUUID(), weight: 50, reps: 8, completed: false }
      ]
    }));

    setExercises(newLogs);
    
    // Scroll smoothly to the workout tracking details panel
    const trackerDetailsPanel = document.getElementById("active-tracker-details");
    if (trackerDetailsPanel) {
      trackerDetailsPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Add exercise directly to list
  const handleAddNewExercise = (name: string) => {
    if (!name.trim()) return;
    if (!workoutStartTime) {
      setWorkoutStartTime(new Date().toISOString());
    }

    const newExercise: ExerciseLog = {
      id: crypto.randomUUID(),
      name: name.trim(),
      sets: [
        { id: crypto.randomUUID(), weight: 20, reps: 10, completed: false }
      ]
    };
    setExercises([...exercises, newExercise]);
    setCustomExerciseName("");
    setSearchQuery("");
  };

  // Delete exercise
  const handleDeleteExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  // Add Set to an exercise
  const handleAddSetRow = (exerciseId: string) => {
    setExercises(
      exercises.map(ex => {
        if (ex.id === exerciseId) {
          const lastSet = ex.sets[ex.sets.length - 1];
          const newSet: WorkoutSet = {
            id: crypto.randomUUID(),
            weight: lastSet ? lastSet.weight : 40,
            reps: lastSet ? lastSet.reps : 10,
            completed: false
          };
          return {
            ...ex,
            sets: [...ex.sets, newSet]
          };
        }
        return ex;
      })
    );
  };

  // Remove Set from exercise
  const handleDeleteSetRow = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map(ex => {
        if (ex.id === exerciseId) {
          const filtered = ex.sets.filter(s => s.id !== setId);
          return {
            ...ex,
            sets: filtered.length > 0 ? filtered : ex.sets
          };
        }
        return ex;
      })
    );
  };

  // Update specific set values
  const handleUpdateSetValues = (
    exerciseId: string,
    setId: string,
    field: keyof WorkoutSet,
    value: any
  ) => {
    setExercises(
      exercises.map(ex => {
        if (ex.id === exerciseId) {
          return {
            ...ex,
            sets: ex.sets.map(s => {
              if (s.id === setId) {
                return { ...s, [field]: value };
              }
              return s;
            })
          };
        }
        return ex;
      })
    );
  };

  // Reset/Clear entire tracker state
  const handleResetWorkout = () => {
    if (window.confirm("Complete current workout session and archive diagnostic metrics?")) {
      setExercises([]);
      setWorkoutStartTime(null);
      setActiveSessionName("Custom Workout");
      localStorage.removeItem("titan_workout_session");
      localStorage.removeItem("titan_workout_start_time");
      localStorage.removeItem("titan_active_session_name");
    }
  };

  // Calculations for session HUD
  const totalCompletedVolume = exercises.reduce((acc, ex) => {
    return (
      acc +
      ex.sets.reduce((setAcc, s) => {
        return s.completed ? setAcc + s.weight * s.reps : setAcc;
      }, 0)
    );
  }, 0);

  const totalSetsCompleted = exercises.reduce((acc, ex) => {
    return acc + ex.sets.filter(s => s.completed).length;
  }, 0);

  const totalSetsTargeted = exercises.reduce((acc, ex) => {
    return acc + ex.sets.length;
  }, 0);

  // Render SVG Character depending on selection to provide a jaw-dropping dynamic interface
  const renderInteractiveMoodCharacter = () => {
    const key = selectedMood.key;
    const color = selectedMood.color;
    
    switch (key) {
      case "low-energy":
        return (
          <motion.div 
            key={key} 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-36 h-36 flex items-center justify-center"
          >
            {/* Sleeping Moon Pillow character */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <defs>
                <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#4f46e5" />
                </linearGradient>
              </defs>
              {/* Crescent Sleepy Moon */}
              <motion.path 
                d="M30,20 C50,20 65,35 65,55 C65,75 50,90 30,90 C45,90 75,78 75,55 C75,32 45,20 30,20 Z" 
                fill="url(#indigoGrad)"
                animate={{ rotate: [0, -5, 5, 0], scale: [1, 1.02, 0.98, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
              {/* Floating sleeping Zzzz */}
              <motion.text 
                x="65" y="30" fill={color} className="text-[10px] font-mono font-bold"
                animate={{ y: [30, 15], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 0 }}
              >Z</motion.text>
              <motion.text 
                x="75" y="40" fill={color} className="text-[12px] font-mono font-bold"
                animate={{ y: [40, 20], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 3, delay: 1 }}
              >z</motion.text>
              {/* Closed Sleeping Eye lines */}
              <path d="M48,50 Q52,53 56,50" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M45,55 Q49,58 53,55" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
        );
      case "tense":
        return (
          <motion.div 
            key={key} 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-36 h-36 flex items-center justify-center"
          >
            {/* Clenched tense compressed coil/spring shape */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              <defs>
                <linearGradient id="tealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#0d9488" />
                </linearGradient>
              </defs>
              <motion.rect 
                x="20" y="25" width="60" height="50" rx="15"
                fill="url(#tealGrad)"
                animate={{ y: [25, 29, 23, 25], scaleX: [1, 1.06, 0.95, 1], scaleY: [1, 0.9, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              />
              {/* Angry/tight eyes */}
              <line x1="38" y1="45" x2="48" y2="48" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
              <line x1="62" y1="45" x2="52" y2="48" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
              {/* Straight tightly closed mouth line */}
              <line x1="45" y1="60" x2="55" y2="60" stroke="#000" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </motion.div>
        );
      case "calm":
        return (
          <motion.div 
            key={key} 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-36 h-36 flex items-center justify-center"
          >
            {/* Pink Hexagon zen character from VibeMove */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(236,72,153,0.4)]">
              <defs>
                <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#db2777" />
                </linearGradient>
              </defs>
              <motion.polygon 
                points="50,15 80,32.5 80,67.5 50,85 20,67.5 20,32.5" 
                fill="url(#pinkGrad)"
                animate={{ 
                  scale: [1, 1.04, 0.98, 1],
                  rotate: [0, 1.5, -1.5, 0]
                }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              />
              {/* Meditating eyes */}
              <path d="M35,46 Q40,51 45,46" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M55,46 Q60,51 65,46" stroke="#000" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Soft smile curve */}
              <path d="M44,58 Q50,63 56,58" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Gentle floating rings */}
              <motion.circle 
                cx="50" cy="50" r="42" stroke="rgba(236, 72, 153, 0.2)" strokeWidth="1" fill="none"
                animate={{ scale: [1, 1.25], opacity: [0.6, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
              />
            </svg>
          </motion.div>
        );
      case "balanced":
        return (
          <motion.div 
            key={key} 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-36 h-36 flex items-center justify-center"
          >
            {/* Green Shamrock Centered clover */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <defs>
                <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <motion.g 
                fill="url(#emeraldGrad)"
                animate={{ rotate: [0, 3, -3, 0], scale: [1, 1.02, 0.98, 1] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              >
                {/* 4 Clover Petals */}
                <circle cx="50" cy="35" r="16" />
                <circle cx="50" cy="65" r="16" />
                <circle cx="35" cy="50" r="16" />
                <circle cx="65" cy="50" r="16" />
                {/* Stem */}
                <rect x="47.5" y="50" width="5" height="30" rx="2" />
              </motion.g>
              {/* Peaceful wide eyes */}
              <circle cx="40" cy="48" r="3" fill="#000" />
              <circle cx="60" cy="48" r="3" fill="#000" />
              {/* Neutral gentle curved smile line */}
              <path d="M46,58 Q50,61 54,58" stroke="#000" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
        );
      case "energized":
        return (
          <motion.div 
            key={key} 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-36 h-36 flex items-center justify-center"
          >
            {/* Yellow Sun character from VibeMove */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(245,158,11,0.45)]">
              <defs>
                <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>
              {/* Rotating outer sun rays */}
              <motion.g
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              >
                {[...Array(8)].map((_, i) => (
                  <polygon
                    key={i}
                    points="50,5 55,20 45,20"
                    fill="url(#yellowGrad)"
                    transform={`rotate(${i * 45} 50 50)`}
                  />
                ))}
              </motion.g>
              {/* Center sphere */}
              <motion.circle 
                cx="50" cy="50" r="28" 
                fill="url(#yellowGrad)"
                animate={{ scale: [1, 1.05, 0.95, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />
              {/* Happy eyes */}
              <path d="M40,43 L45,47 L40,51" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <path d="M60,43 L55,47 L60,51" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Big laugh mouth */}
              <path d="M42,56 Q50,68 58,56 Z" fill="#000" />
            </svg>
          </motion.div>
        );
      case "high-energy":
        return (
          <motion.div 
            key={key} 
            initial={{ scale: 0.8, opacity: 0 }} 
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-36 h-36 flex items-center justify-center"
          >
            {/* Big Crimson blazing flame */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_25px_rgba(239,68,68,0.5)]">
              <defs>
                <linearGradient id="roseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f87171" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
              <motion.path 
                d="M50,10 C65,25 75,45 75,65 C75,80 63,90 50,90 C37,90 25,80 25,65 C25,45 35,25 50,10 Z" 
                fill="url(#roseGrad)"
                animate={{ 
                  scaleY: [1, 1.08, 0.93, 1], 
                  scaleX: [1, 0.92, 1.05, 1],
                  d: [
                    "M50,10 C65,25 75,45 75,65 C75,80 63,90 50,90 C37,90 25,80 25,65 C25,45 35,25 50,10 Z",
                    "M50,7 C63,22 78,48 73,66 C68,84 61,88 50,90 C39,92 31,84 27,66 C23,48 37,22 50,7 Z",
                    "M50,12 C67,27 72,42 77,64 C82,86 65,92 50,90 C35,88 18,86 23,64 C28,42 33,27 50,12 Z",
                    "M50,10 C65,25 75,45 75,65 C75,80 63,90 50,90 C37,90 25,80 25,65 C25,45 35,25 50,10 Z"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              />
              {/* Intense focused eyes */}
              <polyline points="38,48 44,52 38,56" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              <polyline points="62,48 56,52 62,56" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              {/* Smiling flame mouth */}
              <path d="M43,62 Q50,70 57,62" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            </svg>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <section id="workout-tracker" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Outer abstract ambient backdrops */}
      <div className="absolute top-[5%] left-[2%] w-[450px] h-[450px] rounded-full bg-brand/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[10%] right-[1%] w-[480px] h-[480px] rounded-full bg-emerald-700/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section Heading with exclusive branding credit */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-950/20 border border-brand/20 mb-4 animate-pulse">
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-mono font-black tracking-widest text-[#F27D26] uppercase">
              VibeMove Matcher & Companion
            </span>
          </div>
          <h2 className="font-display font-black text-3.5xl sm:text-5xl text-white uppercase tracking-tight">
            NOT SURE WHAT YOU WANT TO <span className="text-brand text-brand-gradient">TRAIN TODAY?</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3.5 font-light leading-relaxed max-w-xl mx-auto">
            Select how you feel in the interactive portal below. Let VibeMove match you, then log exercises, sets, and volumetric ratios live into the active tracker suite.
          </p>
        </div>

        {/* Dynamic Dual-Column Interactive Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mt-8">
          
          {/* COLUMN 1: VibeMove Fully-Interactive Mockup Phone Container (cols: 5) */}
          <div className="lg:col-span-5 flex justify-center">
            
            <div className="relative w-full max-w-[385px] bg-[#0c0d0c] border-[6px] border-zinc-800 rounded-[48px] p-4 pt-10 pb-5 shadow-[0_25px_60px_rgba(0,0,0,0.95)] overflow-hidden text-left aspect-[9/19]">
              
              {/* Dynamic Island Ear-Piece Speaker mock */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-2xl z-40 flex items-center justify-center">
                <span className="w-12 h-1 bg-zinc-900 rounded-sm block" />
              </div>

              {/* Status Bar Indicator */}
              <div className="flex justify-between items-center px-4 py-1 text-[10px] font-semibold text-zinc-400 select-none">
                <span>9:41</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>5G</span>
                  <div className="w-4 h-2.5 bg-zinc-700/80 rounded-[3px] p-[1px] flex">
                    <div className="w-full h-full bg-emerald-400 rounded-[1.5px]" />
                  </div>
                </div>
              </div>

              {/* PHONE CANVAS SCREEN */}
              <div className="h-full mt-2 overflow-y-auto pr-0.5 pb-20 select-none scrollbar-none" id="phone-content-body">
                
                {/* Switchable Step views of VibeMove */}
                <AnimatePresence mode="wait">
                  {mockupStep === "dashboard" && (
                    <motion.div
                      key="step-dash"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      {/* VibeMove Header with User profile */}
                      <div className="flex justify-between items-center px-2">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 overflow-hidden relative">
                            {/* George Davidson generic avatar */}
                            <svg viewBox="0 0 100 100" className="w-full h-full text-zinc-400 bg-zinc-900">
                              <circle cx="50" cy="40" r="22" fill="#888" />
                              <path d="M15,85 C20,68 35,55 50,55 C65,55 80,68 85,85 Z" fill="#888" />
                            </svg>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#0c0d0c]" />
                          </div>
                          <div>
                            <span className="text-[9px] font-light text-zinc-500 block">Welcome back</span>
                            <span className="text-xs font-bold text-zinc-200 block">George Davidson</span>
                          </div>
                        </div>
                        <button className="relative p-2 rounded-xl bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 transition text-zinc-400 cursor-pointer">
                          <Bell className="w-4 h-4 text-zinc-400" />
                          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand rounded-full animate-ping" />
                        </button>
                      </div>

                      {/* Not sure what you want to train today Card (VibeMove hero element) */}
                      <div className="bg-[#1a2f22] border border-emerald-900/30 rounded-3xl p-5 relative overflow-hidden shadow-[0_12px_24px_-8px_rgba(26,47,34,0.7)] group">
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#3cb878]/15 blur-2xl rounded-full" />
                        
                        <h3 className="font-display font-black text-white text-lg tracking-tight leading-snug uppercase max-w-[210px] mb-2">
                          Not sure <span className="text-[#3cb878]">what you want to train</span> today?
                        </h3>
                        <p className="text-emerald-100/70 text-[10px] font-light max-w-sm leading-relaxed mb-6">
                          Tell us how you feel, we'll recommend workouts matching your energy & mood.
                        </p>

                        <button 
                          id="btn-interactive-find-match"
                          onClick={() => setMockupStep("mood-selector")}
                          className="w-full py-3.5 bg-white text-emerald-950 hover:bg-emerald-50 active:scale-97 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          Find my match
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-950" />
                        </button>
                      </div>

                      {/* Horizontal Categories slider */}
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between items-center px-2">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-display">Categories</span>
                          <span className="text-[9px] text-zinc-600 hover:text-brand cursor-pointer">See all</span>
                        </div>
                        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none px-2 mask-linear">
                          {["Gym", "Yoga", "Fitness", "Run", "Box", "Swim"].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition shrink-0 cursor-pointer border ${
                                selectedCategory === cat
                                  ? "bg-zinc-100 text-black border-zinc-100 shadow-md shadow-white/5"
                                  : "bg-zinc-900/80 border-zinc-850 hover:bg-zinc-850 text-zinc-400"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Your Progress diagnostics cards */}
                      <div className="space-y-2 mt-4">
                        <div className="flex justify-between items-center px-2">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-display">Your Progress</span>
                          <span className="text-[9px] text-zinc-600 hover:text-brand cursor-pointer">See activity</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2.5 px-2">
                          <div className="bg-zinc-900 p-3 rounded-2xl flex flex-col justify-between text-left">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-wider block">Steps</span>
                            <span className="text-xs font-bold text-white mt-1">3,548 <span className="text-[8px] text-zinc-500 font-light block mt-0.5">steps</span></span>
                          </div>
                          <div className="bg-zinc-900 p-3 rounded-2xl flex flex-col justify-between text-left border-l border-zinc-800">
                            <span className="text-[8px] font-mono text-zinc-505 uppercase tracking-wider block">Nutrition</span>
                            <span className="text-xs font-bold text-white mt-1">273 <span className="text-[8px] text-zinc-500 font-light block mt-0.5">kcal burned</span></span>
                          </div>
                          <div className="bg-[#1c1d1a]/25 p-3 rounded-2xl flex flex-col justify-between text-left border border-zinc-850">
                            <span className="text-[8px] font-mono text-brand uppercase tracking-wider block">Duration</span>
                            <span className="text-xs font-bold text-[#F27D26] mt-1">1h 5m <span className="text-[8px] text-zinc-500 font-light block mt-0.5">active</span></span>
                          </div>
                        </div>
                      </div>

                      {/* Today's sessions list card */}
                      <div className="space-y-2 mt-4 px-2">
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider font-display">Today's Sessions</span>
                          <span className="text-[9px] text-zinc-600 hover:text-brand cursor-pointer">See all</span>
                        </div>
                        
                        <div className="bg-[#111] p-3 rounded-2xl flex items-center justify-between border border-zinc-850 hover:bg-[#151515] transition">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-orange-600/10 flex items-center justify-center text-xs text-brand border border-orange-500/20">
                              🏃
                            </div>
                            <div className="text-left">
                              <span className="text-[9px] font-bold text-zinc-200 uppercase tracking-widest block font-display">Running Mobility</span>
                              <span className="text-[8px] text-zinc-500">17:00 • 17:45</span>
                            </div>
                          </div>
                          <span className="text-[8px] font-mono tracking-widest bg-zinc-900 text-zinc-400 px-2.5 py-1 rounded-md uppercase">Completed</span>
                        </div>
                      </div>

                      {/* Brand Label Accent at base of app mockup */}
                      <div className="text-center pt-2">
                        <span className="font-display font-light text-[9px] tracking-widest uppercase text-zinc-650">
                          VibeMove App System (iOS v2.4)
                        </span>
                      </div>

                    </motion.div>
                  )}

                  {mockupStep === "mood-selector" && (
                    <motion.div
                      key="step-mood"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4 text-center mt-2"
                    >
                      {/* Back button */}
                      <div className="text-left px-2">
                        <button 
                          onClick={() => setMockupStep("dashboard")}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 text-xs text-zinc-405 border border-zinc-850 tracking-wider hover:text-white transition uppercase cursor-pointer"
                        >
                          ← Back
                        </button>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-zinc-505 uppercase tracking-wider block">Today's Energy Level</span>
                        <h4 className="font-display font-bold text-white text-lg uppercase mt-1">
                          George, how do you <br/>
                          <span className="italic text-brand text-brand-gradient">feel right now?</span>
                        </h4>
                      </div>

                      {/* Render Interactive SVGs */}
                      <div className="flex justify-center items-center min-h-[160px] relative mt-2">
                        {renderInteractiveMoodCharacter()}
                      </div>

                      {/* Selected Mood Badge details */}
                      <div className="px-3">
                        <div 
                          className="py-1 px-3.5 rounded-full inline-block text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm"
                          style={{ backgroundColor: selectedMood.bgColor, color: selectedMood.color, border: `1px solid ${selectedMood.glowColor}` }}
                        >
                          {selectedMood.label}
                        </div>
                        <p className="text-[10px] text-zinc-400 leading-relaxed font-light mt-1.5 min-h-[45px] max-w-xs mx-auto">
                          {selectedMood.description}
                        </p>
                      </div>

                      {/* Vertical Mood sliders mock selector (1-tap selection circles) */}
                      <div className="flex justify-center gap-1.5 py-2">
                        {MOOD_CONFIGS.map((mood, idx) => (
                          <button
                            key={mood.key}
                            onClick={() => setSelectedMoodIdx(idx)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-transform cursor-pointer hover:scale-110 active:scale-95 ${
                              selectedMoodIdx === idx
                                ? "scale-115 shadow-xl border-2"
                                : "opacity-40"
                            }`}
                            style={{ 
                              borderColor: selectedMoodIdx === idx ? mood.color : "transparent",
                              backgroundColor: mood.bgColor
                            }}
                          >
                            {mood.emoji}
                          </button>
                        ))}
                      </div>

                      {/* Find workout Button triggers Matched page view */}
                      <div className="px-3">
                        <button
                          id="btn-mockup-find-workout"
                          onClick={() => {
                            setSelectedWorkout(selectedMood.workouts[0]);
                            setMockupStep("workout-suggested");
                          }}
                          className="w-full py-4 bg-[#ff5555] hover:bg-[#ff7777] active:scale-97 text-white font-black text-xs uppercase tracking-widest rounded-xl transition shadow-[0_8px_30px_rgba(255,85,85,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-white stroke-[2]" />
                          Let's find workout
                        </button>
                      </div>

                    </motion.div>
                  )}

                  {mockupStep === "workout-suggested" && selectedWorkout && (
                    <motion.div
                      key="step-workout"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4 mt-2"
                    >
                      {/* Back to Mood trigger */}
                      <div className="flex justify-between items-center px-2">
                        <button 
                          onClick={() => setMockupStep("mood-selector")}
                          className="px-3 py-1.5 rounded-lg bg-zinc-900 text-xs text-zinc-405 border border-zinc-850 hover:text-white transition uppercase cursor-pointer"
                        >
                          Change Mood
                        </button>
                        <span className="text-[9px] font-mono text-zinc-500 uppercase">{selectedMood.label} Vibe</span>
                      </div>

                      <div className="text-left px-2">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block">Vibe Matching Workouts</span>
                        <h4 className="font-display font-black text-white text-xl uppercase mt-1">Recommended for you:</h4>
                      </div>

                      {/* Recommended Workouts Stack inside iOS screen */}
                      <div className="space-y-3.5 px-2">
                        {selectedMood.workouts.map((workout, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setSelectedWorkout(workout)}
                            className={`p-4 rounded-3xl text-left border cursor-pointer transition ${
                              selectedWorkout.name === workout.name 
                                ? "bg-zinc-900 border-brand shadow-lg" 
                                : "bg-zinc-950 border-zinc-850/60 hover:bg-zinc-900"
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-[8px] font-mono font-bold tracking-widest bg-brand/10 border border-brand/20 text-brand px-2 py-0.5 rounded uppercase">
                                {workout.focus}
                              </span>
                              <span className="text-[9px] font-mono text-zinc-450">{workout.duration}</span>
                            </div>

                            <strong className="text-xs font-black text-white uppercase block tracking-wider mb-2 font-display">
                              {workout.name}
                            </strong>

                            <div className="flex flex-wrap gap-1 leading-none">
                              {workout.exercises.map((exName, i) => (
                                <span key={i} className="text-[8px] text-zinc-500 font-light flex items-center gap-1">
                                  • {exName}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Master Start training button - Integrates live to Active Workout Tracker! */}
                      <div className="px-3 pt-4 border-t border-zinc-900">
                        <div className="bg-[#182a1f] p-3 rounded-2xl border border-emerald-950 flex justify-between items-center mb-4">
                          <div className="text-left">
                            <span className="text-[8px] text-zinc-500 uppercase font-bold block">Loaded Routine</span>
                            <span className="text-[10px] font-black text-white uppercase block leading-tight">{selectedWorkout.name}</span>
                          </div>
                          <span className="text-[10px] text-emerald-400 font-bold uppercase shrink-0">{selectedWorkout.level}</span>
                        </div>

                        <button
                          id="btn-ios-start-training"
                          onClick={() => {
                            handleStartWorkout(selectedWorkout);
                            setMockupStep("dashboard");
                          }}
                          className="w-full py-4 rounded-xl btn-gradient text-black font-black text-xs uppercase tracking-widest hover:scale-102 active:scale-98 transition shadow-[0_8px_25px_rgba(242,125,38,0.35)] flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <Zap className="w-4 h-4 fill-black stroke-black shrink-0" />
                          Start Training
                        </button>
                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* iOS home indicator swipe bar mock */}
              <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-zinc-700/80 rounded-md z-40" />

            </div>

          </div>

          {/* COLUMN 2: Companion Active Workout Sets/Reps Logger ledger (cols: 7) */}
          <div className="lg:col-span-7 space-y-6" id="active-tracker-details">
            
            {!workoutStartTime ? (
              /* IDLE STATE CARD: Prompt users to use the left phone mock to select and start a Vibe routine */
              <div className="glass-panel border-zinc-800/80 bg-zinc-950/45 rounded-3xl p-10 flex flex-col items-center justify-center text-center min-h-[480px] relative">
                <div className="absolute inset-0 dot-grid opacity-[0.05] pointer-events-none" />
                <div className="w-16 h-16 rounded-full bg-orange-600/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  <Play className="w-8 h-8 text-brand animate-pulse fill-brand" />
                </div>
                <h3 className="font-display font-black text-2xl text-white uppercase tracking-wider mb-2">
                  No Active Session Loaded
                </h3>
                <p className="text-zinc-400 text-xs font-light max-w-sm mb-8 leading-relaxed">
                  Start your training session by choosing a physical energy state inside the <strong className="text-brand">VibeMove Matcher</strong> phone mockup or quick-load a default session below.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center relative z-10">
                  <button
                    id="btn-companion-quick-start"
                    onClick={() => handleStartWorkout(MOOD_CONFIGS[3].workouts[0])}
                    className="btn-gradient text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-xl hover:scale-103 active:scale-97 transition cursor-pointer shadow-[0_4px_20px_rgba(242,125,38,0.3)] flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4 stroke-[3]" />
                    Quick-Start Balanced Routine
                  </button>
                </div>
              </div>
            ) : (
              /* ACTIVE LOG SUITE: Live tracker loaded with exercises */
              <div className="space-y-6">
                
                {/* HUD Live Session HUD */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 p-5 bg-zinc-950 border border-zinc-850 rounded-2xl relative overflow-hidden"
                  id="active-companion-hud"
                >
                  <div className="absolute top-0 right-0 w-16 h-16 bg-brand/5 blur-xl rounded-full" />
                  
                  <div className="text-left">
                    <span className="text-[9px] font-bold text-zinc-505 uppercase tracking-widest block mb-1">Active Vibe</span>
                    <strong className="text-xs font-semibold text-white uppercase font-display block select-none">
                      {activeSessionName}
                    </strong>
                  </div>

                  <div className="text-left">
                    <span className="text-[9px] font-bold text-zinc-505 uppercase tracking-widest block mb-1">Duration</span>
                    <strong className="text-sm font-mono text-brand flex items-center gap-1.5 font-bold select-none">
                      <Clock className="w-3.5 h-3.5 text-brand animate-pulse" />
                      {duration}
                    </strong>
                  </div>

                  <div className="text-left">
                    <span className="text-[9px] font-bold text-zinc-505 uppercase tracking-widest block mb-1">Volume Load</span>
                    <strong className="text-sm font-mono text-zinc-300 flex items-center gap-1 font-bold select-none">
                      <Trophy className="w-3.5 h-3.5 text-yellow-500" />
                      {totalCompletedVolume} kg
                    </strong>
                  </div>

                  <div className="text-left">
                    <span className="text-[9px] font-bold text-zinc-505 uppercase tracking-widest block mb-1">Log Ratios</span>
                    <strong className="text-sm font-mono text-zinc-400 select-none block">
                      {totalSetsCompleted} / {totalSetsTargeted} Sets
                    </strong>
                  </div>
                </motion.div>

                {/* Exercises Core log */}
                <div className="space-y-6" id="companion-exercises-ledger">
                  <AnimatePresence initial={false}>
                    {exercises.map((ex, exIdx) => (
                      <motion.div
                        key={ex.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="glass-panel border-zinc-850 p-6 rounded-2xl bg-zinc-950/20 text-left relative group/ex"
                        id={`ex-card-${exIdx}`}
                      >
                        <div className="flex justify-between items-center mb-5 border-b border-zinc-900 pb-3">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-brand shadow-[0_0_10px_#F27D26]" />
                            <h3 className="font-display font-black text-white uppercase tracking-wider text-sm select-none">
                              {ex.name}
                            </h3>
                          </div>
                          <button
                            id={`btn-delete-ex-row-${ex.id}`}
                            onClick={() => handleDeleteExercise(ex.id)}
                            className="p-1.5 rounded-lg border border-transparent hover:border-zinc-800 hover:bg-zinc-900 text-zinc-505 hover:text-rose-500 transition cursor-pointer"
                            title="Remove Exercise"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Sets logger Table list within exercise */}
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="border-b border-zinc-900 text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                <th className="py-2.5 w-12 text-center">Set</th>
                                <th className="py-2.5 pl-4">Weight (kg)</th>
                                <th className="py-2.5 pl-4">Reps</th>
                                <th className="py-2.5 w-20 text-center">Done</th>
                                <th className="py-2.5 w-12 text-center"></th>
                              </tr>
                            </thead>
                            <tbody>
                              <AnimatePresence initial={false}>
                                {ex.sets.map((set, setIdx) => (
                                  <motion.tr
                                    key={set.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className={`border-b border-zinc-900/30 transition-colors duration-200 ${
                                      set.completed
                                        ? "bg-zinc-900/15 text-zinc-500 line-through decoration-brand/50"
                                        : ""
                                    }`}
                                  >
                                    {/* Order counter */}
                                    <td className="py-3 text-center text-xs font-mono font-bold text-zinc-400">
                                      {setIdx + 1}
                                    </td>

                                    {/* Weight dynamic numeric field */}
                                    <td className="py-3 pl-4">
                                      <div className="relative max-w-28">
                                        <input
                                          required
                                          type="number"
                                          disabled={set.completed}
                                          value={set.weight || ""}
                                          onChange={(e) =>
                                            handleUpdateSetValues(
                                              ex.id,
                                              set.id,
                                              "weight",
                                              Math.max(0, parseFloat(e.target.value) || 0)
                                            )
                                          }
                                          className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-brand/40 text-left disabled:opacity-50"
                                        />
                                      </div>
                                    </td>

                                    {/* Reps dynamic numeric field */}
                                    <td className="py-3 pl-4">
                                      <div className="relative max-w-24">
                                        <input
                                          required
                                          type="number"
                                          disabled={set.completed}
                                          value={set.reps || ""}
                                          onChange={(e) =>
                                            handleUpdateSetValues(
                                              ex.id,
                                              set.id,
                                              "reps",
                                              Math.max(0, parseInt(e.target.value) || 0)
                                            )
                                          }
                                          className="w-full bg-zinc-950 border border-zinc-900 rounded-xl px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-brand/40 text-left disabled:opacity-50"
                                        />
                                      </div>
                                    </td>

                                    {/* Completeness checkmark tick box */}
                                    <td className="py-3 text-center">
                                      <button
                                        id={`btn-tick-check-${ex.id}-${set.id}`}
                                        onClick={() =>
                                          handleUpdateSetValues(
                                            ex.id,
                                            set.id,
                                            "completed",
                                            !set.completed
                                          )
                                        }
                                        className={`w-6 h-6 rounded-lg border flex items-center justify-center mx-auto transition cursor-pointer ${
                                          set.completed
                                            ? "bg-brand border-brand text-black"
                                            : "border-zinc-800 hover:border-brand/33 text-transparent hover:text-zinc-650"
                                        }`}
                                      >
                                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                                      </button>
                                    </td>

                                    {/* Row Delete Button */}
                                    <td className="py-3 text-center">
                                      <button
                                        id={`btn-del-set-row-${ex.id}-${set.id}`}
                                        onClick={() => handleDeleteSetRow(ex.id, set.id)}
                                        className="p-1 px-2 text-zinc-70s hover:text-rose-500 transition-colors cursor-pointer"
                                        title="Delete Set"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                    </td>
                                  </motion.tr>
                                ))}
                              </AnimatePresence>
                            </tbody>
                          </table>
                        </div>

                        {/* Add subset action row */}
                        <div className="mt-4 flex justify-between items-center bg-zinc-950/20 px-2 py-1.5 rounded-xl">
                          <button
                            id={`btn-add-set-row-${ex.id}`}
                            onClick={() => handleAddSetRow(ex.id)}
                            className="text-[10px] font-bold text-zinc-400 hover:text-white tracking-widest uppercase flex items-center gap-1 cursor-pointer transition hover:scale-101 border border-zinc-900 border-dashed py-2 px-4 rounded-lg"
                          >
                            <Plus className="w-3 h-3 text-brand stroke-[2.5]" /> Add Set
                          </button>
                        </div>

                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Compound finder / add manual exercise form panel at bottom */}
                <div className="glass-panel border-zinc-800/80 p-5 rounded-2xl bg-zinc-950/20 text-left space-y-4">
                  <span className="text-[10px] font-bold text-zinc-505 uppercase tracking-widest block font-display">
                    Manually Add Target Exercise
                  </span>
                  <div className="flex gap-2.5">
                    <input
                      type="text"
                      placeholder="E.g. Decline Dumbbell Press"
                      value={customExerciseName}
                      onChange={(e) => setCustomExerciseName(e.target.value)}
                      className="flex-1 bg-zinc-950 border border-zinc-850 px-4 py-3 rounded-xl text-xs text-white placeholder-zinc-700 focus:outline-none focus:border-brand/40"
                    />
                    <button
                      id="btn-manual-add"
                      onClick={() => {
                        handleAddNewExercise(customExerciseName);
                      }}
                      className="px-5 bg-brand hover:bg-[#ff8933] rounded-xl flex items-center justify-center transition-colors text-black font-bold text-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[3]" />
                    </button>
                  </div>
                </div>

                {/* Completion Action Ledger Bar (Complete & Reset) */}
                <div className="flex justify-end pt-2">
                  <button
                    id="btn-completed-workout"
                    onClick={handleResetWorkout}
                    className="px-8 py-4 border border-[#ef4444]/30 hover:border-[#ef4444] text-[#ef4444] hover:bg-[#ef4444]/10 rounded-xl text-xs font-bold tracking-widest uppercase transition flex items-center gap-2 cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Complete and Reset Session
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
