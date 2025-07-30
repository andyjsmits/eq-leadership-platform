// Main JavaScript entry point for EQ Leadership Platform
import { auth, observeAuthState } from './firebase-config.js';

// Global authentication state management
let currentUser = null;

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
  console.log('EQ Leadership Platform initializing...');
  
  // Set up authentication state observer
  observeAuthState((user) => {
    currentUser = user;
    updateNavigationForAuthState(user);
    
    if (user) {
      console.log('User signed in:', user.email);
    } else {
      console.log('User signed out');
    }
  });
  
  // Initialize page-specific functionality
  initializeCurrentPage();
});

// Update navigation based on authentication state
function updateNavigationForAuthState(user) {
  const signInLink = document.querySelector('.sign-in-link');
  const userMenu = document.querySelector('.user-menu');
  const protectedLinks = document.querySelectorAll('[data-auth-required]');
  
  if (user) {
    // User is signed in
    if (signInLink) {
      signInLink.style.display = 'none';
    }
    if (userMenu) {
      userMenu.style.display = 'block';
    }
    protectedLinks.forEach(link => {
      link.style.display = 'block';
    });
  } else {
    // User is not signed in
    if (signInLink) {
      signInLink.style.display = 'block';
    }
    if (userMenu) {
      userMenu.style.display = 'none';
    }
    protectedLinks.forEach(link => {
      link.style.display = 'none';
    });
  }
}

// Initialize functionality based on current page
function initializeCurrentPage() {
  const path = window.location.pathname;
  const page = path.split('/').pop() || 'index.html';
  
  switch (page) {
    case 'index.html':
    case '':
      initializeLandingPage();
      break;
    case 'auth.html':
      initializeAuthPage();
      break;
    case 'dashboard.html':
      initializeDashboard();
      break;
    case 'eq-toolkit.html':
      initializeToolkit();
      break;
    default:
      initializeExercisePage();
      break;
  }
}

// Landing page initialization
function initializeLandingPage() {
  console.log('Initializing landing page...');
  
  // Update CTA buttons based on auth state
  const ctaButtons = document.querySelectorAll('.cta-button-primary');
  ctaButtons.forEach(button => {
    if (button.textContent.includes('Assessment')) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentUser) {
          window.location.href = 'dashboard.html';
        } else {
          window.location.href = 'auth.html';
        }
      });
    }
  });
}

// Auth page initialization
function initializeAuthPage() {
  console.log('Initializing auth page...');
  
  // Redirect if already authenticated
  if (currentUser) {
    window.location.href = 'dashboard.html';
  }
}

// Dashboard initialization
function initializeDashboard() {
  console.log('Initializing dashboard...');
  
  // Redirect if not authenticated
  if (!currentUser && !auth.currentUser) {
    window.location.href = 'auth.html';
  }
}

// Toolkit initialization
function initializeToolkit() {
  console.log('Initializing toolkit...');
  
  // Add progress indicators if user is authenticated
  if (currentUser) {
    loadUserProgress();
  }
}

// Exercise page initialization
function initializeExercisePage() {
  console.log('Initializing exercise page...');
  
  // Add progress tracking if user is authenticated
  if (currentUser) {
    initializeProgressTracking();
  }
}

// Load user progress for toolkit pages
async function loadUserProgress() {
  // This would load user's exercise completion status
  // and update the UI accordingly
  console.log('Loading user progress...');
}

// Initialize progress tracking for exercise pages
function initializeProgressTracking() {
  // This would set up progress saving functionality
  console.log('Initializing exercise progress tracking...');
}

// Utility functions
export function showNotification(message, type = 'info') {
  // Create and show notification
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
}

export function calculateCompletionPercentage(completed, total) {
  return Math.round((completed / total) * 100);
}

// Export current user for other modules
export function getCurrentUser() {
  return currentUser;
}