import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  template: `
    <div class="loading-overlay">
      <div class="loading-content">
        <div class="spinner"></div>
        <p class="loading-text">Loading...</p>
      </div>
    </div>
  `,
  styles: [
    `
      .loading-overlay {
        position: fixed;
        inset: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(var(--background-rgb), 0.85);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        z-index: 1060;
      }

      .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.25rem;
      }

      .spinner {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        border: 4px solid var(--border);
        border-top-color: var(--primary);
        border-right-color: var(--primary-light);
        animation: spin 0.9s linear infinite;
        box-shadow: var(--primary-shadow);
      }

      .loading-text {
        margin: 0;
        font-size: 0.95rem;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        color: var(--text-secondary);
        animation: pulse 1.5s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 0.5;
        }
        50% {
          opacity: 1;
          color: var(--primary-light);
        }
      }
    `,
  ],
})
export class LoadingComponent {}
