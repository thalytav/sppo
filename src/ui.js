export const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
})[char]);

export const shortName = (name = '') => name.replace('Smart Locker ', '');

export const formatDate = (date) => new Date(date).toLocaleString('id-ID', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit'
});

export const button = (action, label, classes = '', extra = '') =>
  `<button type="button" data-action="${action}" class="${classes}" ${extra}>${label}</button>`;

export const card = (content, classes = '') =>
  `<section class="rounded-3xl bg-slate-900/80 border border-slate-800 p-5 sm:p-6 shadow-xl ${classes}">${content}</section>`;
