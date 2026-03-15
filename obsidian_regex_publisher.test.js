/**
 * Why does this file exist?
 *
 * tl;dr to test regexes that are used in the Obsidian plugin.
 *
 * Wait, what?
 *
 * In my journey to find a way to publish markdown notes directly from Obsidian,
 * I stumbled across an Obsidian plugin called obsidian-github-publisher. It
 * takes the markdown files and pushes them to a Github repo, converting
 * markdown links to Jekyll links in the process.
 *
 * However, it is not built to respect the structure for images that I use in my
 * blog. To fix that, I have to enter regex into the plugin that then is used to
 * normalize the final artifact and leave in a format Jekyll understands.
 *
 * I wrote about it in https://alexoliveira.cc/guide/jekyll-with-obsidian
 *
 * The challenge is that the regex got complex and I can't test it quickly
 * anymore. To avoid relying on publishing and letting it error in github-pages,
 * or wait a minute or two to see the final result in Github, this file contains
 * those regexes with inputs and expected outputs. I can later just copy paste
 * them to the plugin and see if they work.
 *
 * This site is useful for testing regexes: https://regex101.com/
 */

test("Step 1: regex for adding Jekyll's `link` function", () => {

  // Converts [a](b) into [a]({% link obsidian/b.md %})
  //
  // Ignore .md extensions, if any,
  // by simply not capturing them.
  // We will add an .md extension later. -------------------------------------------------\
  //                                                                                       |
  // Matches the final destination                                                         |
  // so we can reuse in `replace`. -------------------------------------------------\      |
  //                                                                                 |     |
  // Ignores ./ so it's removed.                                                     |     |
  // The * makes sure it's zero                                                      |     |
  // or more ./   ------------------------------------------------------------\      |     |
  //                                                                           |     |     |
  // Skips http and image paths.                                               |     |     |
  // ?! stands for negative                                                    |     |     |
  // lookahead. If `http` is                                                   |     |     |
  // found, halts process. ----------------\                                   |     |     |
  //                                        |                                  |     |     |
  // Starts link                            |                                  |     |     |
  // destination. ---------------------\    |                                  |     |     |
  //                                    |   |                                  |     |     |
  // The link's Alt  -------------\     |   |                                  |     |     |
  //                               |    |   |                                  |     |     |
  // Skip images (e.g ![]())       |    |   |                                  |     |     |
  // defined by the exclamation    |    |   |                                  |     |     |
  // mark.    ----------------\    |    |   |                                  |     |     |
  //                           |   |    |   |                                  |     |     |
  // Skip links within code    |   |    |   |                                  |     |     |
  // samples. (?<!`) makes     |   |    |   |                                  |     |     |
  // sure no ` (e.g backtick)  |   |    |   |                                  |     |     |
  // exists before             |   |    |   |                                  |     |     |
  // bracket. --------\        |   |    |   |                                  |     |     |
  //                   |       |   |    |   |                                  |     |     |
  //                   V       V   V    V   V                                  V     V     V
  const linkRegex = /(?<!\`)(?<!!)\[(.*)\]\((?!(http|\/*image|obsidian\/image))(\.\/)*(.+?)(\.md)*(#anchor)?\)/;
  const replacer = "[$1]({% link obsidian/$4.md %}$6)";

  [{
    input: "[a](b)",
    expected: "[a]({% link obsidian/b.md %})"
  }, {
    input: "[a](./b)",
    expected: "[a]({% link obsidian/b.md %})"
  }, {
    input: "[a](./b.md)",
    expected: "[a]({% link obsidian/b.md %})"
  }, {
    input: "![some,string](file.png)",
    expected: "![some,string](file.png)"
  }, {
    input: "![The Magic Acid, or the art of naming](naming.png)",
    expected: "![The Magic Acid, or the art of naming](naming.png)"
  }, {
    input: "[some,string](file.png)",
    expected: "[some,string]({% link obsidian/file.png.md %})"
  }, {
    input: "[a](./b.md#anchor)",
    expected: "[a]({% link obsidian/b.md %}#anchor)"
  }].forEach(({ input, expected }) => {
    const result = input.replace(new RegExp(linkRegex, 'g'), replacer);
    if (result !== expected) {
      const debugReplacer = "$1 - $2 - $3 - $4 - $5 - $6";
      const debugResult = input.replace(new RegExp(linkRegex, 'g'), debugReplacer);

      console.error(`Input: ${input} - Expected: ${expected} - Result: ${result}\n\nGroups: ${debugResult}`);
    }
    expect(result).toBe(expected);
  });
});

test('Step 2: Regex for fixing link paths', () => {
  // Converts:
  //
  // - [a](obsidian/images/b) into [a](/images/b)
  // - ![a](b) into [a](/images/b)
  //
  // Everything else. -------------------------------------\
  //                                                        |
  // Ignores `obsidian/` prefix if any. -\                  |
  //                                      |                 |
  // Starts link                          |                 |
  // destination. --------------------\   |                 |
  //                                  |   |                 |
  // The link's Alt  ----------\      |   |                 |
  //                            |     |   |                 |
  // Skip images within code.   |     |   |                 |
  // (?<!`) makes sure no       |     |   |                 |
  // backtick exists before     |     |   |                 |
  // bracket. --------\         |     |   |                 |
  //                   |        |     |   |                 |
  //                   V        V     V   V                 V
  const regex =      /(?<!\`)\[(.*)\]\(((obsidian\/)?image)(.+)\)/;
  const replacer = "[$1](/image$4)";

  [{
    input: "![some,string](file.png)",
    expected: "![some,string](file.png)"
  }].forEach(({ input, expected }) => {
    const result = input.replace(new RegExp(regex, 'g'), replacer);
    if (result !== expected) {
      const debugReplacer = "$1 - $2 - $3 - $4 - $5 - $6";
      const debugResult = input.replace(new RegExp(regex, 'g'), debugReplacer);

      console.error(`Input: ${input} - Expected: ${expected} - Result: ${result}\n\nGroups: ${debugResult}`);
    }
    expect(result).toBe(expected);
  });
});