import { describe, it, expect } from 'vitest';
import { getElectionReminderLink, getBoothFinderMapUrl } from '../utils/googleServices';

describe('googleServices', () => {
  describe('getElectionReminderLink', () => {
    it('should generate a valid Google Calendar URL', () => {
      const link = getElectionReminderLink();
      expect(link).toContain('https://calendar.google.com/calendar/render');
      expect(link).toContain('action=TEMPLATE');
      expect(link).toContain('text=Indian%20General%20Election%202029');
    });

    it('should include encoded details and dates', () => {
      const link = getElectionReminderLink();
      expect(link).toContain('dates=20290415T023000Z%2F20290415T123000Z');
      expect(link).toContain('details=');
    });
  });

  describe('getBoothFinderMapUrl', () => {
    it('should return a maps embed URL with the API key', () => {
      const url = getBoothFinderMapUrl();
      expect(url).toContain('https://www.google.com/maps/embed/v1/search');
      expect(url).toContain('key=AIzaSyBXazwiRdUyTgHUKDcu76q9NVQguqo44ec');
    });

    it('should use pincode in query if provided', () => {
      const url = getBoothFinderMapUrl('400001');
      expect(url).toContain('q=Polling%20Booth%20near%20400001');
    });

    it('should use default query if no pincode provided', () => {
      const url = getBoothFinderMapUrl();
      expect(url).toContain('q=Election%20Commission%20of%20India');
    });
  });
});
