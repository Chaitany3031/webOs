

let time = document.querySelector('.time');

function updateTime() {
  const now = new Date();
  
  // Get month abbreviation
  const month = now.toLocaleString('default', { month: 'short' });
  
  // Get day, hours and minutes
  const day = now.getDate();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  
  // Format: Jun25 20:23
  time.textContent = `${month}${day} ${hours}:${minutes}`;
}

// Update immediately and then every 60 seconds
updateTime();
setInterval(updateTime, 60000);


const clock = document.getElementById('clock-trigger');
const calendarCard = document.getElementById('calendar-card');

// Show/hide on click
clock.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent bubbling to window
  calendarCard.classList.toggle('hidden');
});

// Close if clicked anywhere else
window.addEventListener('click', () => {
  calendarCard.classList.add('hidden');
});

// Prevent closing when clicking inside the calendar card
calendarCard.addEventListener('click', (e) => {
  e.stopPropagation();
});


const settingsBtn = document.getElementById('settings-trigger');
const settingsCard = document.getElementById('settings-card');

settingsBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  settingsCard.classList.toggle('hidden');
});

settingsCard.addEventListener('click', (e) => e.stopPropagation());

window.addEventListener('click', () => {
  settingsCard.classList.add('hidden');
});


// Calendar UI template string
const calendarTemplate = `
  <div class="calendar-header">
    <h3>Wednesday</h3>
    <p>June 25, 2025</p>
  </div>
  <div class="calendar-grid">
    <div class="weekdays">
      <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
    </div>
    <div class="days">
      ${Array.from({length: 30}, (_, i) => `
        <span class="${i + 1 === 25 ? 'active-day' : ''}">${i + 1}</span>
      `).join('')}
    </div>
  </div>
  
`;

// Inject content
calendarCard.innerHTML = calendarTemplate;