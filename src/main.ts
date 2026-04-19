// Entry point for the Vibe Coded Task Manager
import './styles/main.css';
import { useTaskStore } from './store/taskStore';
import { ToolsColumn } from './components/ToolsColumn';
import { EditTaskColumn } from './components/EditTaskColumn';
import { Timeline } from './components/Timeline';
import { KeyboardOverlay } from './components/KeyboardOverlay';
import { ConceptsOverlay } from './components/ConceptsOverlay';
import { KeyboardConfigManager } from './utils/keyboardConfig';
import { ConceptsConfigManager } from './utils/conceptsConfig';
import { DOM } from './utils/dom';
import type { Theme } from './store/taskStore';

// Apply theme class to <html>
function applyTheme(theme: Theme): void {
  const html = document.documentElement;
  html.className = html.className
    .split(' ')
    .filter((c) => !c.startsWith('theme-'))
    .join(' ');
  html.classList.add(`theme-${theme}`);
}

const app = DOM.getElementById('app');
app.className = 'app-layout';

const toolsColumn = ToolsColumn();
const editTaskColumn = EditTaskColumn();
const timeline = Timeline(editTaskColumn.openTask);
const keyboardOverlay = KeyboardOverlay();
const conceptsOverlay = ConceptsOverlay();

DOM.append(app, toolsColumn, timeline, editTaskColumn.element);
// Overlays are mounted at body level so they sit above everything
document.body.appendChild(keyboardOverlay.element);
document.body.appendChild(conceptsOverlay.element);

// Load persisted data
useTaskStore.getState().loadTasks();

// Apply initial theme and subscribe to theme changes
applyTheme(useTaskStore.getState().theme);
useTaskStore.subscribe((state) => applyTheme(state.theme));

// ---- Global keyboard shortcuts ----
document.addEventListener('keydown', (e) => {
  // Escape closes whichever overlay is currently open
  if (e.key === 'Escape') {
    if (keyboardOverlay.isOpen()) { keyboardOverlay.close(); return; }
    if (conceptsOverlay.isOpen()) { conceptsOverlay.close(); return; }
    return;
  }

  // Don't trigger shortcuts while typing in an input / textarea
  const tag = (e.target as HTMLElement).tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

  const helpKey = KeyboardConfigManager.get().helpKey;
  const conceptsKey = ConceptsConfigManager.get().conceptsKey;

  if (e.key === helpKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
    e.preventDefault();
    if (!conceptsOverlay.isOpen()) keyboardOverlay.open();
    return;
  }

  if (e.key === conceptsKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
    e.preventDefault();
    if (!keyboardOverlay.isOpen()) conceptsOverlay.open();
    return;
  }
});

// ---- Custom events from ToolsColumn buttons ----
document.addEventListener('open-keyboard-overlay', () => { keyboardOverlay.open(); });
document.addEventListener('open-concepts-overlay', () => { conceptsOverlay.open(); });

