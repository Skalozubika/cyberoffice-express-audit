
const key = document.querySelector('main').dataset.progressKey;
const checks = [...document.querySelectorAll('[data-done]')];
const progress = document.getElementById('progress');
const meter = document.getElementById('meter');
const storageStatus = document.getElementById('storage-status');
let done = {};
try {
  done = JSON.parse(localStorage.getItem(key)) || {};
} catch {
  storageStatus.textContent = 'Браузер может не сохранить отметки после закрытия страницы.';
}
function render() {
  let count = 0;
  for (const check of checks) {
    const id = check.dataset.done;
    const status = document.querySelector('[data-status="' + id + '"]');
    check.checked = done[id] === true;
    status.textContent = check.checked ? 'Выполнено' : 'Не отмечено';
    status.classList.toggle('ok', check.checked);
    count += Number(check.checked);
  }
  progress.textContent = 'Вы отметили ' + count + ' из ' + checks.length;
  meter.value = count;
}
function persist() {
  try {
    localStorage.setItem(key, JSON.stringify(done));
  } catch {
    storageStatus.textContent = 'Отметки доступны до закрытия или обновления страницы.';
  }
  render();
}
for (const check of checks) {
  check.addEventListener('change', () => {
    done[check.dataset.done] = check.checked;
    persist();
  });
}
document.getElementById('clear').addEventListener('click', () => {
  if (!confirm('Удалить отметки о выполнении?')) return;
  done = {};
  persist();
});
render();
