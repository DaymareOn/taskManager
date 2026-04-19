export const DOM = {
  getElementById: (id: string): HTMLElement => {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Element with id "${id}" not found`);
    return element;
  },

  querySelector: (selector: string): Element => {
    const element = document.querySelector(selector);
    if (!element) throw new Error(`Element with selector "${selector}" not found`);
    return element;
  },

  create: (tag: string, className?: string, textContent?: string): HTMLElement => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  },

  append: (parent: Element, ...children: Element[]): void => {
    children.forEach((child) => parent.appendChild(child));
  },

  clear: (element: Element): void => {
    element.innerHTML = '';
  },
};
