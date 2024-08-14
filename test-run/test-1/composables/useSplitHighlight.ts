import { computed, ComputedRef } from 'vue';

interface HighlightOptions {
  spacer?: string;
}

export function useHighlightedText(getText: () => string, options: HighlightOptions = {}): ComputedRef<string> {
  return computed(() => {
    const description = getText();
    const regex = /(<b>.*?<\/b>)|([^<]+)/g;
    const matches = description?.match(regex);

    if (!matches) return '';

    let isFirstNonEmptyMatch = true;
    const processedMatches = matches.map((match) => {
      if (match.trim() === '') return match; // Return empty matches as-is

      let processed = match;
      if (match.startsWith('<b>')) {
        processed = `<span class="highlight">${match.replace(/<\/?b>/g, '')}</span>`;
      }

      if (isFirstNonEmptyMatch && processed.trim() !== '' && options.spacer) {
        processed = `<span class="spacer">${options.spacer}</span>${processed}`;
        isFirstNonEmptyMatch = false;
      }

      return processed;
    });

    return processedMatches.join('');
  });
}
