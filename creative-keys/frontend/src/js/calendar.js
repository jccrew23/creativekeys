import {gapi} from 'gapi-script';

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const discoveryDoc = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const scopes = 'https://www.googleapis.com/auth/calendar.readonly';

const signInButton = document.querySelector('#signin-button');
const eventList = document.querySelector('#event-list');

//load and initialize API client
function initializeGapiClient() {
    gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: [discoveryDoc],
        scope: scopes,
    }).then(() => {
        const authInstance = gapi.auth2.getAuthInstance();

        if (!authInstance.isSignedIn.get()) {
            signInButton.addEventListener('click', () => {
                authInstance.signIn().then(() => {
                    fetchEvents(); // Load events after sign-in
                });
            });
        } else {
            fetchEvents(); // Load events if already signed in
        }
    }).catch((error) => {
        console.error('Error initializing GAPI client:', error);
    })
}

function fetchEvents() {
    gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: 'startTime',
    }).then((response) => {
        const events = response.result.items;
        displayEvents(events);
    });
}

function displayEvents(events) {
    eventList.innerHTML = ''; // Clear previous events

    if (!events.length) {
        eventList.innerHTML = '<li>No upcoming events found.</li>';
    }

    events.forEach((event) => {
        const li = document.createElement('li');
        const start = event.start.dateTime || event.start.date;
        li.textContent = `${event.summary} (${start})`;
        eventList.appendChild(li);
    });
}

gapi.load('client:auth2', initializeGapiClient); // Load GAPI client and initialize