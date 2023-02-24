export interface EmojiMarkedExtensionOptions {
  /**
   * An object with keys as emoji name and values as emoji.
   * The values are assumed to be image urls (as returned by
   * Octokit) unless the `unicode` option is `true`.
   *
   * EXAMPLES
   *
   * emojis: {"heart":"❤️","tada":"🎉"}
   *
   * emojis: { "heart": "https://...", "tada": "https://..." }
   */
  emojis: {
    [emoji: string]: string;
  };
  /**
   * Whether the supplied emojis are unicode characters. Default `false`.
   */
  unicode: boolean;
}
