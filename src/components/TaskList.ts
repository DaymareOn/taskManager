import type { Task } from '../types/Task';
import { DOM } from '../utils/dom';
import { TaskCard } from './TaskCard';
import { useTaskStore, type TaskStore } from '../store/taskStore';
import { t, onLocaleChange } from '../utils/i18n';

export const TaskList = (container: HTMLElement): void => {
  let emptyTextEl: HTMLElement | null = null;

  const render = (tasks: Task[]): void => {
    DOM.clear(container);

    if (tasks.length === 0) {
      const empty = DOM.create('div', 'empty-state');
      const emptyIcon = DOM.create('div', 'empty-icon', '📋');
      emptyTextEl = DOM.create('p', 'empty-text', t('timeline.empty'));
      DOM.append(empty, emptyIcon, emptyTextEl);
      DOM.append(container, empty);
      return;
    }

    emptyTextEl = null;
    tasks.forEach((task) => {
      const card = TaskCard(task);
      DOM.append(container, card);
    });
  };

  onLocaleChange(() => {
    if (emptyTextEl) emptyTextEl.textContent = t('timeline.empty');
  });

  // Subscribe to store changes
  useTaskStore.subscribe((state: TaskStore) => {
    render(state.getFilteredTasks());
  });

  // Initial render
  render(useTaskStore.getState().getFilteredTasks());
};