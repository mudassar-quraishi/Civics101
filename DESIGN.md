# Civics101 Design System

## Overview
Civics101 uses a **Modern Premium Glassmorphism** design system. It is designed to feel trustworthy (ECI alignment), accessible, and state-of-the-art.

## Design Tokens

### Colors
- **Primary**: `#0f172a` (Deep Navy) - Representing authority and stability.
- **Accent Saffron**: `#f59e0b` - Representing the vibrancy of Indian democracy.
- **Accent Green**: `#10b981` - Representing growth and progress.
- **Accent Blue**: `#3b82f6` - Standard UI accent for interactivity.

### Typography
- **Display**: `Outfit` or `Newsreader` (Serif) - Premium, authoritative headlines.
- **Body**: `Inter` - High readability for educational content.

### Surfaces
- **Glass**: `rgba(255, 255, 255, 0.7)` with `backdrop-blur-xl`.
- **Borders**: `rgba(226, 232, 240, 0.8)` (Subtle separation).

## Components

### 1. The Assistant (FloatingChat)
- Uses an adaptive chat interface.
- Powered by Gemini 1.5 Flash.
- Persona: Empathic, neutral, civic expert.

### 2. Interactive Modules
- Cards with hover-scaling effects.
- Step-by-step vertical progress guides.
- High-feedback quizzes with immediate semantic explanations.

## Accessibility (WCAG 2.1 AAA Target)
- **Skip Link**: Allows bypassing navigation.
- **Focus States**: High-contrast blue outlines (3px) for all interactive elements.
- **Screen Readers**: Semantic HTML5 with comprehensive ARIA landmarks.
- **Reduced Motion**: All Framer Motion animations respect the `prefers-reduced-motion` media query.
