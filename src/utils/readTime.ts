import { isValidElement, type ReactNode } from 'react';

function countWords(text: string): number {
  const normalized = text.trim();
  if (!normalized) return 0;

  const matches = normalized.match(/\b[\p{L}\p{N}'’-]+\b/gu);
  return matches ? matches.length : 0;
}

function countWordsInNode(node: ReactNode): number {
  if (node == null || typeof node === 'boolean') return 0;

  if (typeof node === 'string' || typeof node === 'number') {
    return countWords(String(node));
  }

  if (Array.isArray(node)) {
    return node.reduce((sum, child) => sum + countWordsInNode(child), 0);
  }

  if (isValidElement(node)) {
    const element = node as { props?: { children?: ReactNode } };
    return countWordsInNode(element.props?.children);
  }

  return 0;
}

export function estimateReadTimeMinutes(node: ReactNode, wordsPerMinute = 220): number {
  const words = countWordsInNode(node);
  return Math.max(1, Math.round(words / wordsPerMinute));
}
