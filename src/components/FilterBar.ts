import type { TaskFilter, TaskStatus } from '../types/Task';
import { DOM } from '../utils/dom';
import { useTaskStore } from '../store/taskStore';

export const FilterBar = (): HTMLElement => {
  const bar = DOM.create('div', 'filter-bar');

  const searchInput = DOM.create('input', 'filter-input') as HTMLInputElement;
  searchInput.type = 'text';
  searchInput.placeholder = '🔍 Search tasks…';

  const statusSelect = DOM.create('select', 'filter-select') as HTMLSelectElement;
  statusSelect.innerHTML = `
    <option value="">All Statuses</option>
    <option value="todo">To Do</option>
    <option value="in-progress">In Progress</option>
    <option value="done">Done</option>
  `;

  const sortScoreLabel = DOM.create('label', 'filter-sort-label');
  sortScoreLabel.innerHTML = `
    <input type="checkbox" id="sort-by-score" class="filter-checkbox" />
    ⚡ Sort by score
  `;

  const clearBtn = DOM.create('button', 'btn btn-secondary', 'Clear Filters');

  const applyFilters = (): void => {
    const sortCheckbox = sortScoreLabel.querySelector('#sort-by-score') as HTMLInputElement;
    const filter: TaskFilter = {};
    if (searchInput.value) filter.search = searchInput.value;
    if (statusSelect.value) filter.status = statusSelect.value as TaskStatus;
    if (sortCheckbox?.checked) filter.sortByScore = true;
    useTaskStore.getState().setFilter(filter);
  };

  searchInput.addEventListener('input', applyFilters);
  statusSelect.addEventListener('change', applyFilters);
  sortScoreLabel.addEventListener('change', applyFilters);

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    statusSelect.value = '';
    const sortCheckbox = sortScoreLabel.querySelector('#sort-by-score') as HTMLInputElement;
    if (sortCheckbox) sortCheckbox.checked = false;
    useTaskStore.getState().setFilter({});
  });

  DOM.append(bar, searchInput, statusSelect, sortScoreLabel, clearBtn);
  return bar;
};
