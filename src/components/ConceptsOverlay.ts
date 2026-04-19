import { DOM } from '../utils/dom';
import { ConceptsConfigManager, CONCEPT_DEFS } from '../utils/conceptsConfig';

export interface ConceptsOverlayApi {
  element: HTMLElement;
  open(): void;
  close(): void;
  isOpen(): boolean;
  refresh(): void;
}

export const ConceptsOverlay = (): ConceptsOverlayApi => {
  const overlay = DOM.create('div', 'co-overlay hidden');
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-label', 'Concepts & Glossary');
  overlay.setAttribute('aria-modal', 'true');

  // Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  // ---- Panel ----
  const panel = DOM.create('div', 'co-panel');

  // Title bar
  const titleBar = DOM.create('div', 'co-title-bar');
  const title    = DOM.create('h2', 'co-title', '💡 Concepts & Glossary');
  const hint     = DOM.create('span', 'co-hint', 'Click a card to edit its description. Press Esc to close.');
  const closeBtn = DOM.create('button', 'co-close-btn', '✕');
  (closeBtn as HTMLButtonElement).type = 'button';
  closeBtn.addEventListener('click', close);
  DOM.append(titleBar, title, hint, closeBtn);

  // Cards grid
  const cardsGrid = DOM.create('div', 'co-cards');

  CONCEPT_DEFS.forEach((def) => {
    const card = DOM.create('div', 'co-card');
    card.dataset.conceptId = def.id;

    const cardHeader = DOM.create('div', 'co-card-header');
    const cardIcon   = DOM.create('span', 'co-card-icon', def.emoji);
    const cardTitle  = DOM.create('span', 'co-card-title', def.title);
    DOM.append(cardHeader, cardIcon, cardTitle);

    const cardDesc = DOM.create('p', 'co-card-desc', ConceptsConfigManager.getDescription(def.id));

    DOM.append(card, cardHeader, cardDesc);
    DOM.append(cardsGrid, card);
  });

  // ---- Inline edit ----
  let editingCard: HTMLElement | null = null;
  let editInput: HTMLTextAreaElement | null = null;

  function startEdit(card: HTMLElement): void {
    if (editingCard === card) return;
    cancelEdit();

    editingCard = card;
    card.classList.add('co-card-editing');

    const conceptId = card.dataset.conceptId ?? '';
    const descEl = card.querySelector('.co-card-desc') as HTMLElement;

    editInput = document.createElement('textarea');
    editInput.className = 'co-card-edit-input';
    editInput.value = ConceptsConfigManager.getDescription(conceptId);
    editInput.placeholder = 'Describe this concept…';
    editInput.rows = 4;

    editInput.addEventListener('keydown', (e) => {
      e.stopPropagation();
      if (e.key === 'Escape') { cancelEdit(); return; }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) confirmEdit();
    });
    editInput.addEventListener('blur', confirmEdit);

    descEl.replaceWith(editInput);
    editInput.focus();
    editInput.select();
  }

  function confirmEdit(): void {
    if (!editingCard || !editInput) return;
    const conceptId = editingCard.dataset.conceptId ?? '';
    const newVal    = editInput.value.trim();
    ConceptsConfigManager.setDescription(conceptId, newVal);

    const newDesc = DOM.create('p', 'co-card-desc', newVal || ConceptsConfigManager.getDescription(conceptId));
    editInput.replaceWith(newDesc);
    editingCard.classList.remove('co-card-editing');
    editingCard = null;
    editInput = null;
  }

  function cancelEdit(): void {
    if (!editingCard || !editInput) return;
    const conceptId = editingCard.dataset.conceptId ?? '';
    const newDesc = DOM.create('p', 'co-card-desc', ConceptsConfigManager.getDescription(conceptId));
    editInput.replaceWith(newDesc);
    editingCard.classList.remove('co-card-editing');
    editingCard = null;
    editInput = null;
  }

  // Delegate click to any .co-card
  cardsGrid.addEventListener('click', (e) => {
    const card = (e.target as HTMLElement).closest('.co-card') as HTMLElement | null;
    if (card) startEdit(card);
  });

  // ---- Assemble ----
  DOM.append(panel, titleBar, cardsGrid);
  DOM.append(overlay, panel);

  // ---- API ----
  let _open = false;

  function open(): void {
    _open = true;
    overlay.classList.remove('hidden');
  }

  function close(): void {
    cancelEdit();
    _open = false;
    overlay.classList.add('hidden');
  }

  function refresh(): void {
    panel.querySelectorAll<HTMLElement>('.co-card').forEach((card) => {
      if (card === editingCard) return;
      const conceptId = card.dataset.conceptId ?? '';
      const descEl = card.querySelector('.co-card-desc') as HTMLElement | null;
      if (descEl) descEl.textContent = ConceptsConfigManager.getDescription(conceptId);
    });
  }

  return { element: overlay, open, close, isOpen: () => _open, refresh };
};
