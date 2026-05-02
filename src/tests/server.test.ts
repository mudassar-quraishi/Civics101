import { describe, it, expect } from 'vitest';
import { isBlocked, searchKB } from '../../server/index';

describe('Server Neutrality Logic', () => {
  describe('isBlocked', () => {
    it('should block political party names', () => {
      expect(isBlocked('Tell me about BJP')).toBe(true);
      expect(isBlocked('Why is Congress good?')).toBe(true);
      expect(isBlocked('AAP vs TMC')).toBe(true);
    });

    it('should block leader names', () => {
      expect(isBlocked('Who is Modi?')).toBe(true);
      expect(isBlocked('Rahul Gandhi views')).toBe(true);
    });

    it('should block "who to vote for" queries', () => {
      expect(isBlocked('who should i vote for?')).toBe(true);
      expect(isBlocked('best candidate for my area')).toBe(true);
    });

    it('should allow neutral civic questions', () => {
      expect(isBlocked('How do I register to vote?')).toBe(false);
      expect(isBlocked('What is an EVM?')).toBe(false);
      expect(isBlocked('How are votes counted?')).toBe(false);
    });
  });

  describe('searchKB', () => {
    it('should return answer for matching keyword', () => {
      const result = searchKB('voter-registration', 'how to register to vote');
      expect(result).toContain('Visit nvsp.in');
    });

    it('should return null for no match', () => {
      const result = searchKB('voter-registration', 'what is the weather');
      expect(result).toBeNull();
    });
  });
});
