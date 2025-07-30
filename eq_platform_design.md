# EQ Leadership Platform Design Specification

## Design Philosophy
Simple, warm, and purpose-driven - reflects the nonprofit/church values while being professional enough for executive use.

## Visual Design Direction

**Color palette:** Deep blue primary (#2563eb), warm accent (#f59e0b), soft grays  
**Typography:** Clean sans-serif (Inter) with good readability  
**Imagery:** Real people in nonprofit/church settings, authentic moments  
**Tone:** Approachable professionalism, not corporate sterile

## Component Architecture

### Core Layout Components

#### 1. Navigation Shell
```
┌─────────────────────────────────────┐
│ [Logo] Dashboard  Learning  Coach   │ ← Top nav, always visible
├─────────────────────────────────────┤
│                                     │
│           Main Content              │ ← Dynamic content area
│                                     │
└─────────────────────────────────────┘
```

#### 2. Dashboard Cards

- **EQ Assessment Score:** Personal EQ score with growth areas
- **This Week's Learning:** Module thumbnail + progress
- **Team Health:** Quick pulse check status
- **Quick Actions:** "Take 360 feedback", "Book coaching", "Check team pulse"

#### 3. Progress Indicators

- EQ score improvement tracking
- Learning streaks with fire emoji gamification
- Team health thermometer (red/yellow/green)

## Key User Flows

### Flow 1: Quick Start with EQ Quiz (Critical Path - NEW)
Landing → Sign Up → 5-Min EQ Quiz → Instant Results → Learning Recommendations → Dashboard

#### EQ Assessment Quiz (immediate value):

- 15 scenario-based questions (5 minutes total)
- Nonprofit/church specific situations: "A volunteer disagrees with your decision publicly during a meeting..."
- Multiple choice responses with EQ reasoning
- Instant scoring: Communication (4/5), Empathy (3/5), Conflict Resolution (2/5), etc.
- Immediate insights: "You're strong at inspiring others but may struggle with difficult conversations"

#### Quiz Result Flow:
```
┌─────────────────────────────────────┐
│ Your EQ Leadership Profile          │
│                                     │
│ Overall Score: 3.4/5                │
│ [Visual radar chart]                │
│                                     │
│ 🟢 Strengths: Vision, Empathy       │
│ 🟡 Growth Areas: Conflict, Feedback │
│                                     │
│ [Start Learning Path] [Take 360]    │
└─────────────────────────────────────┘
```

### Flow 2: Graduated Engagement Path
EQ Quiz → Personalized Learning (Week 1-2) → Team Pulse Check (Week 3) → 360 Feedback (Week 4+)

#### Learning Path Unlocks:

- **Week 1-2:** Core modules based on quiz results
- **Week 3:** "Ready to get team input?" → Pulse check feature unlocks
- **Week 4+:** "Time for deeper insights" → 360 feedback feature unlocks

### Flow 3: 360 Setup (Now Secondary)
Dashboard → "Ready for 360?" → Setup Wizard → Invite Team → Results Integration

#### 360 Becomes Enhancement:

- Positioned as "Get external perspective on your EQ growth"
- Pre-populated with quiz insights: "See if your team agrees you're strong at..."
- Results compare self-assessment vs. team perception

## Revised Information Architecture

```
Dashboard
├── Personal EQ Profile
│   ├── Latest quiz score
│   ├── Growth tracking
│   └── Retake assessment
├── Learning Path
│   ├── Recommended modules (based on quiz)
│   ├── This week's focus
│   └── Progress tracking
├── Team Insights
│   ├── Quick pulse checks
│   ├── 360 feedback (unlocked later)
│   └── Team health trends
├── Coaching
│   ├── Book session with quiz context
│   ├── Available coaches
│   └── Session history
└── Peer Connections
    ├── Match by EQ growth areas
    ├── Coffee chat calendar
    └── Discussion threads
```

## Onboarding Sequence (Revised)

### Step 1: Welcome + Context (30 seconds)
- "Welcome! Let's understand your leadership style in 5 minutes"
- Organization type selection (sets quiz context)

### Step 2: EQ Assessment (5 minutes)
- 15 scenario questions
- Progress bar keeps momentum
- "No wrong answers, just honest responses"

### Step 3: Instant Results + Next Steps (2 minutes)
- Personalized EQ profile
- "Your learning path is ready!"
- Clear CTA: "Start your first module"

### Step 4: Dashboard Orientation (1 minute)
- Quick tour of main features
- "Take your time exploring. We'll send weekly reminders."

## Mobile-First Responsive Design

### Quiz Experience on Mobile:
- **Card-based questions:** Swipe to next
- **Large answer buttons:** Easy thumb tapping
- **Progress indicator:** "Question 7 of 15"
- **Save progress:** Return later if interrupted

### Dashboard Mobile Layout:
```
┌─────────────────────────────────────┐
│ Your EQ Score: 3.4/5 📈             │
├─────────────────────────────────────┤
│ This Week: "Active Listening"       │
│ [Continue Module] 60% complete      │
├─────────────────────────────────────┤
│ Team Check-In                       │
│ [Send Pulse Survey] Last: 4.2/5     │
├─────────────────────────────────────┤
│ [📊] [📚] [🏠] [👥] [⚙️]          │
└─────────────────────────────────────┘
```

## Engagement Strategy

### Immediate Gratification:
- Quiz results available instantly
- First learning module unlocks immediately
- Clear "next step" always visible

### Progressive Disclosure:
- **Week 1-2:** Focus on self-development
- **Week 3:** Team pulse checks unlock
- **Week 4+:** 360 feedback becomes available
- **Month 2:** Coaching recommendations appear

### Motivation Maintenance:
- Weekly EQ score tracking
- Learning streaks and badges
- Peer comparison (anonymous): "73% of church leaders struggle with this too"

## Success Metrics Tracked in UI

- **Time to value:** Quiz completion rate (target >85%)
- **Engagement depth:** % who complete first learning module after quiz
- **Feature progression:** % who advance to team pulse, then 360
- **Retention:** Weekly return rate after initial quiz

## Updated Component Priorities

### High Priority (MVP):
- EQ Assessment Quiz engine
- Instant results dashboard
- Personalized learning recommendations
- Basic progress tracking

### Medium Priority (Month 2):
- Team pulse surveys
- Peer matching based on EQ profiles
- Coach recommendations

### Lower Priority (Month 3+):
- 360 feedback system
- Advanced analytics
- Team management features