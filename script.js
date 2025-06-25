// function openApp(appName) {
//   alert(`${appName} clicked!`);
// }

function openApp(appName) {
  const appWindow = document.createElement('div');
  appWindow.className = 'window-app';

  // Random position
  appWindow.style.top = `${50 + Math.random() * 200}px`;
  appWindow.style.left = `${50 + Math.random() * 200}px`;

  appWindow.innerHTML = `
    <div class="window-header">
      <span>${appName}</span>
      <button onclick="this.closest('.window-app').remove()" style="background:none;color:white;border:none;cursor:pointer;">✕</button>
    </div>
    <div class="window-content">
      <p>${appName} content goes here...</p>
    </div>
  `;

  document.body.appendChild(appWindow);
  makeDraggable(appWindow);
}

// Drag logic
function makeDraggable(element) {
  const header = element.querySelector('.window-header');
  let isDragging = false;
  let offsetX, offsetY;

  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    element.style.zIndex = ++zIndexCounter; // Bring to front
  });

  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

let zIndexCounter = 100;


function updateDateTime() {
  const now = new Date();
  const datetimeString = now.toLocaleString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  document.getElementById('datetime').textContent = datetimeString;
}

// Initial call and update every second
updateDateTime();
setInterval(updateDateTime, 1000);
