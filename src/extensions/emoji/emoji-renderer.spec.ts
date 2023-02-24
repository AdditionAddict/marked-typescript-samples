import { describe, expect, test } from 'vitest';
import { markedRender } from './emoji-renderer';
import { Octokit } from '@octokit/rest';

describe('Emoji extension', () => {
  test('acts like the default marked without any emojis supplied', () => {
    const actual = markedRender('I :heart: marked! :tada:', {
      emojis: {},
      unicode: true,
    });
    const expected = `<p>I :heart: marked! :tada:</p>\n`;
    expect(actual).toBe(expected);
  });

  test('renders emojis supplied', () => {
    const actual = markedRender('I :heart: marked! :tada:', {
      emojis: {
        heart: '❤️',
        tada: '🎉',
      },
      unicode: true,
    });
    const expected = `<p>I ❤️ marked! 🎉</p>\n`;
    expect(actual).toBe(expected);
  });

  test('renders what emojis it can', () => {
    const actual = markedRender('I :heart: marked! :tada:', {
      emojis: {
        heart: '❤️',
      },
      unicode: true,
    });
    const expected = `<p>I ❤️ marked! :tada:</p>\n`;
    expect(actual).toBe(expected);
  });

  test('can use octokit emojis', async () => {
    // Example from https://github.com/UziTech/marked-emoji

    const octokit = new Octokit();
    // Get all the emojis available to use on GitHub.
    const res = await octokit.rest.emojis.get();

    const emojis = res.data;

    const actual = markedRender('I :heart: octokit', {
      emojis,
      unicode: false,
    });
    const expected =
      `<p>I <img alt="heart" ` +
      `src="https://github.githubassets.com/images/icons/emoji/unicode/2764.png?v8"` +
      `> octokit</p>\n`;
    expect(actual).toBe(expected);
  });
});
