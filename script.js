let events = [];
let countdownIntervals = [];

flatpickr("#event-date", {
    dateFormat: "Y-m-d",
});
flatpickr("#event-time", {
    enableTime: true,
    noCalendar: true,
    dateFormat: "H:i",
    time_24hr: true
});

const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function () {
    console.log('Connected to WebSocket server');
});

socket.addEventListener('message', function (event) {
    const message = JSON.parse(event.data);

    if (message.type === 'time') {
        console.log('Current time from server:', message.data);
    } else if (message.type === 'message') {
        console.log('Message from server:', message.data);
    }
});

function createDeleteButton(eventId) {
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', function() {
        events.splice(eventId, 1);
        const countdownContainer = document.getElementById(`countdown-${eventId}`);
        countdownContainer.remove();
        clearInterval(countdownIntervals[eventId]);
        countdownIntervals.splice(eventId, 1);
    });
    return deleteButton;
}

function handleSearch() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const countdowns = document.querySelectorAll('.countdown');

    countdowns.forEach(countdown => {
        const eventName = countdown.querySelector('h1').textContent.toLowerCase();
        if (eventName.includes(searchInput)) {
            countdown.style.display = 'block'; 
        } else {
            countdown.style.display = 'none'; 
        }
    });
}

document.getElementById('search-input').addEventListener('input', handleSearch);

document.getElementById('add-event-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const eventName = document.getElementById('event-name').value;
    const eventDateInput = document.getElementById('event-date').value;
    const eventTimeInput = document.getElementById('event-time').value;

    const eventDate = new Date(`${eventDateInput}T${eventTimeInput}`);
    
    if (isNaN(eventDate)) {
        alert('Please enter a valid date and time.');
        return;
    }

    const eventId = events.length;
    events.push({ name: eventName, date: eventDate });

    const countdownContainer = document.createElement('div');
    countdownContainer.classList.add('countdown');
    countdownContainer.id = `countdown-${eventId}`;
    countdownContainer.innerHTML = `
        <h1>${eventName} Countdown</h1>
        <div class="timer" id="timer-${eventId}">
            <span id="days-${eventId}"></span> days
            <span id="hours-${eventId}"></span> hours
            <span id="minutes-${eventId}"></span> minutes
            <span id="seconds-${eventId}"></span> seconds
        </div>
    `;
    const timerDiv = countdownContainer.querySelector(`#timer-${eventId}`);
    timerDiv.appendChild(createDeleteButton(eventId)); 

    document.getElementById('countdowns').appendChild(countdownContainer);
    countdownContainer.style.display = 'block';

    updateCountdown(eventId);
    countdownIntervals[eventId] = setInterval(() => updateCountdown(eventId), 1000);

    document.getElementById('event-name').value = '';
    document.getElementById('event-date').value = '';
    document.getElementById('event-time').value = '';
});

document.getElementById('reset-form').addEventListener('click', function() {
    document.getElementById('add-event-form').reset();
});

function updateCountdown(eventId) {
    const now = new Date();
    const timeDifference = events[eventId].date - now;

    if (timeDifference <= 0) {
        clearInterval(countdownIntervals[eventId]);
        document.getElementById(`days-${eventId}`).textContent = 0;
        document.getElementById(`hours-${eventId}`).textContent = 0;
        document.getElementById(`minutes-${eventId}`).textContent = 0;
        document.getElementById(`seconds-${eventId}`).textContent = 0;
        alert(`The event "${events[eventId].name}" has started!`);
        return;
    }

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById(`days-${eventId}`).textContent = days;
    document.getElementById(`hours-${eventId}`).textContent = hours;
    document.getElementById(`minutes-${eventId}`).textContent = minutes;
    document.getElementById(`seconds-${eventId}`).textContent = seconds;
}


async function getWeatherData(city, country) {
    const apiKey = 'f6701232a6a37df2e4d2f578ec9910c4'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeatherInfo(city, country, temperature, description) {
    const weatherInfoContainer = document.querySelector('.weather-info');
    
    const countryContainer = document.createElement('div');
    countryContainer.classList.add('country-container');

    const weatherHtml = `
        <h3>${city}, ${country}</h3>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
    `;
    
    countryContainer.innerHTML = weatherHtml;
    weatherInfoContainer.appendChild(countryContainer);
}





const citiesAndCountries = [
    { city: 'London', country: 'GB' },
    { city: 'Paris', country: 'FR' },
    { city: 'New York', country: 'US' },
    { city: 'Philippines', country: 'PH' },
    
];


async function main() {
    for (const { city, country } of citiesAndCountries) {
        const weatherData = await getWeatherData(city, country);
        if (weatherData) {
            const temperature = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            displayWeatherInfo(city, country, temperature, description);
        }
    }
}

main();







