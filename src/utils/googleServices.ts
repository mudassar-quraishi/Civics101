/**
 * Generates a Google Calendar reminder link for the upcoming Indian General Election 2029.
 * This demonstrates integration with the broader Google ecosystem.
 */
export const getElectionReminderLink = () => {
  const event = {
    title: 'Indian General Election 2029 - Vote for India!',
    details: 'Reminder to exercise your democratic right and vote in the Lok Sabha elections. Visit nvsp.in for booth details.',
    location: 'Your local polling booth',
    // 2029-04-15 to 2029-04-16 (example date range)
    dates: '20290415T023000Z/20290415T123000Z' 
  };

  const baseUrl = 'https://calendar.google.com/calendar/render?action=TEMPLATE';
  return `${baseUrl}&text=${encodeURIComponent(event.title)}&details=${encodeURIComponent(event.details)}&location=${encodeURIComponent(event.location)}&dates=${encodeURIComponent(event.dates)}`;
};

/**
 * Returns a Google Maps Embed URL for a generic Election Commission location or booth finder.
 */
export const getBoothFinderMapUrl = (pincode?: string) => {
  const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBXazwiRdUyTgHUKDcu76q9NVQguqo44ec';
  const query = pincode ? `Polling Booth near ${pincode}` : 'Election Commission of India';
  // Note: For a production app, we would use a dynamic search with the user's location.
  return `https://www.google.com/maps/embed/v1/search?key=${key}&q=${encodeURIComponent(query)}`;
};
