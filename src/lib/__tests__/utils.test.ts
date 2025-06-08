import { cn } from '../lib/utils';

describe('Utility functions', () => {
  describe('cn', () => {
    it('should merge class names correctly', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500');
    });

    it('should handle conditional classes', () => {
      expect(cn('text-red-500', false && 'bg-blue-500', true && 'p-4')).toBe('text-red-500 p-4');
    });

    it('should resolve conflicting classes', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500');
    });
  });
});
