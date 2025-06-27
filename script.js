let time = document.querySelector(".time");

function updateTime() {
  const now = new Date();

  // Get month abbreviation
  const month = now.toLocaleString("default", { month: "short" });

  // Get day, hours and minutes
  const day = now.getDate();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");

  // Format: Jun25 20:23
  time.textContent = `${month}${day} ${hours}:${minutes}`;
}

// Update immediately and then every 60 seconds
updateTime();
setInterval(updateTime, 60000);

const clock = document.getElementById("clock-trigger");
const calendarCard = document.getElementById("calendar-card");

// Show/hide on click
clock.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent bubbling to window
  calendarCard.classList.toggle("hidden");
});

// Close if clicked anywhere else
window.addEventListener("click", () => {
  calendarCard.classList.add("hidden");
});

// Prevent closing when clicking inside the calendar card
calendarCard.addEventListener("click", (e) => {
  e.stopPropagation();
});

const settingsBtn = document.getElementById("settings-trigger");
const settingsCard = document.getElementById("settings-card");

settingsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  settingsCard.classList.toggle("hidden");
});

settingsCard.addEventListener("click", (e) => e.stopPropagation());

window.addEventListener("click", () => {
  settingsCard.classList.add("hidden");
});

function renderCalendar() {
  const now = new Date();

  const day = now.getDate();
  const month = now.getMonth(); // 0-indexed
  const year = now.getFullYear();
  const weekdayName = now.toLocaleDateString("default", { weekday: "long" });
  const monthName = now.toLocaleDateString("default", { month: "long" });

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay(); // Sunday = 0

  // Create days with proper offset
  let daysHTML = "";

  // Empty spans for days before the 1st of the month
  for (let i = 0; i < firstDay; i++) {
    daysHTML += `<span class="empty"></span>`;
  }

  // Calendar days
  for (let i = 1; i <= daysInMonth; i++) {
    const isToday = i === day;
    daysHTML += `<span class="${isToday ? "active-day" : ""}">${i}</span>`;
  }

  // Calendar HTML structure
  const calendarTemplate = `
    <div class="calendar-header">
      <h3>${weekdayName}</h3>
      <p>${monthName} ${day}, ${year}</p>
    </div>
    <div class="calendar-grid">
      <div class="weekdays">
        <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
      </div>
      <div class="days">
        ${daysHTML}
      </div>
    </div>
  `;

  calendarCard.innerHTML = calendarTemplate;
  setInterval(() => {
    const now = new Date();
    if (now.getHours() === 0 && now.getMinutes() === 0) {
      renderCalendar(); // re-render only if it's midnight
    }
  }, 60000); // check every minute
}

renderCalendar();

let vsCode = document.querySelector("#icon1");
let vscodeWindow = null; // track the window element
let isMinimized = false;
let prevStyles = {};

vsCode.addEventListener("click", () => {
  if (vscodeWindow && isMinimized) {
    vscodeWindow.style.display = "block";
    isMinimized = false;
    return;
  }
  if (vscodeWindow) return; // already open

  // Create window
  vscodeWindow = document.createElement("div");
  vscodeWindow.style.position = "absolute";
  vscodeWindow.style.top = "100px";
  vscodeWindow.style.left = "100px";
  vscodeWindow.style.width = "700px";
  vscodeWindow.style.height = "500px";
  vscodeWindow.style.background = "#1e1e1e";
  vscodeWindow.style.color = "white";
  vscodeWindow.style.border = "1px solid #333";
  vscodeWindow.style.zIndex = "1000";
  vscodeWindow.style.resize = "both";
  vscodeWindow.style.overflow = "hidden";
  vscodeWindow.style.display = "flex";
  vscodeWindow.style.flexDirection = "column";
  vscodeWindow.id = "vscode-window";

  // Window Header
  const header = document.createElement("div");
  header.style.background = "#333";
  header.style.padding = "5px 10px";
  header.style.cursor = "move";
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  header.style.alignItems = "center";

  const title = document.createElement("span");
  title.textContent = "VS Code";
  header.appendChild(title);

  const controls = document.createElement("div");
  controls.style.display = "flex";
  controls.style.gap = "5px";

  const minBtn = document.createElement("button");
  minBtn.textContent = "🗕";
  const maxBtn = document.createElement("button");
  maxBtn.textContent = "🗖";
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "✖";

  controls.append(minBtn, maxBtn, closeBtn);
  header.appendChild(controls);
  vscodeWindow.appendChild(header);

  // Content area
const content = document.createElement('div');
content.style.flex = '1';
content.style.display = 'flex';
content.style.flexDirection = 'column';
content.style.padding = '10px';
content.style.background = '#1e1e1e';

// Monaco container
const editorContainer = document.createElement('div');
editorContainer.id = 'monaco-editor';
editorContainer.style.height = '300px';
editorContainer.style.width = '100%';
editorContainer.style.border = '1px solid #444';
editorContainer.style.marginBottom = '10px';
content.appendChild(editorContainer);

// Run button and iframe (same as before)
const runButton = document.createElement('button');
runButton.textContent = '▶ Run';
runButton.style.margin = '10px 0';
runButton.style.alignSelf = 'flex-start';
runButton.style.padding = '5px 10px';
runButton.style.background = '#2d2';
runButton.style.border = 'none';
runButton.style.borderRadius = '4px';
runButton.style.cursor = 'pointer';
runButton.style.color = 'black';
runButton.style.fontWeight = 'bold';

const preview = document.createElement('iframe');
preview.style.flex = '1';
preview.style.width = '100%';
preview.style.height = '100%';
preview.style.border = '1px solid #444';
preview.style.marginTop = '10px';

content.appendChild(runButton);
content.appendChild(preview);
vscodeWindow.appendChild(content);
 document.body.appendChild(vscodeWindow);
// Load Monaco
require.config({ paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.44.0/min/vs' } });
require(['vs/editor/editor.main'], function () {
  const savedCode = localStorage.getItem('monacoEditorCode') || `<!DOCTYPE html>
<html>
<head><style>body { font-family: sans-serif; }</style></head>
<body><h1>Hello!</h1><p>This is a live preview.</p><script>console.log(1+1)</script></body>
</html>`;

  const editor = monaco.editor.create(editorContainer, {
    value: savedCode,
    language: 'html',
    theme: 'vs-dark',
    fontSize: 14,
    automaticLayout: true,
  });

  // Save on change
  editor.onDidChangeModelContent(() => {
    localStorage.setItem('monacoEditorCode', editor.getValue());
  });

  // Run button behavior
  runButton.addEventListener('click', () => {
    const code = editor.getValue();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    preview.src = url;
  });

  // Run once on load
  runButton.click();
});

// content.appendChild(runButton);
// content.appendChild(preview);
// vscodeWindow.appendChild(content);


 

  // Make draggable
  makeDraggable(vscodeWindow, header);

  // Close logic
  closeBtn.addEventListener("click", () => {
    vscodeWindow.remove();
    vscodeWindow = null;
  });

  // Minimize logic
  minBtn.addEventListener("click", () => {
    prevStyles = {
      width: vscodeWindow.style.width,
      height: vscodeWindow.style.height,
      top: vscodeWindow.style.top,
      left: vscodeWindow.style.left,
    };
    vscodeWindow.style.display = "none";
    isMinimized = true;
  });

  // Maximize logic
  maxBtn.addEventListener("click", () => {
    const isFull = vscodeWindow.classList.toggle("maximized");
    if (isFull) {
      vscodeWindow.style.top = "0";
      vscodeWindow.style.left = "0";
      vscodeWindow.style.width = "100vw";
      vscodeWindow.style.height = "100vh";
    } else {
      vscodeWindow.style.width = "700px";
      vscodeWindow.style.height = "500px";
      vscodeWindow.style.top = "100px";
      vscodeWindow.style.left = "100px";
    }
  });
});

function makeDraggable(el, handle) {
  let isDragging = false;
  let offsetX, offsetY;

  handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", stop);
  });

  function move(e) {
    if (!isDragging) return;
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  }

  function stop() {
    isDragging = false;
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", stop);
  }
}
