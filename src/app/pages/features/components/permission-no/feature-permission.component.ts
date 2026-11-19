import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-feature-permission',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main class="permission-page">
      <section class="permission-card" aria-labelledby="permission-title">
        <div class="permission-code" aria-hidden="true">403</div>
        <h1 id="permission-title">Accesso negato</h1>
        <p>
          Non hai i permessi necessari per visualizzare questa pagina.
          Se pensi che si tratti di un errore, contatta un amministratore.
        </p>
        <a class="home-link" routerLink="/home">Torna alla home</a>
      </section>
    </main>
  `,
  styles: `
    :host {
      display: block;
    }

    .permission-page {
      min-height: 60vh;
      display: grid;
      place-items: center;
      padding: 2rem;
    }

    .permission-card {
      width: min(100%, 34rem);
      padding: 2.5rem;
      text-align: center;
      color: var(--text);
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 1.25rem;
      box-shadow: 0 0.75rem 2rem rgba(0, 0, 0, 0.2);
    }

    .permission-code {
      color: var(--text-secondary);
      font-size: 0.9rem;
      font-weight: 700;
      letter-spacing: 0.15em;
    }

    h1 {
      margin: 0.75rem 0;
      font-size: clamp(1.75rem, 5vw, 2.5rem);
    }

    p {
      margin: 0;
      color: var(--text-secondary);
      line-height: 1.7;
    }

    .home-link {
      display: inline-block;
      margin-top: 1.75rem;
      padding: 0.75rem 1.25rem;
      color: var(--text);
      text-decoration: none;
      background: var(--primary);
      border-radius: 0.6rem;
    }

    .home-link:focus-visible {
      outline: 2px solid currentColor;
      outline-offset: 3px;
    }
  `,
})
export class FeaturePermissionComponent {}