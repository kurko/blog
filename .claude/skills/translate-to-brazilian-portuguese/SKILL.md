---
name: translate-to-brazilian-portuguese
description: Translate English blog articles to Brazilian Portuguese (pt-BR) with natural, conversational tone. Use this when translating essays or articles from English to Portuguese, ensuring proper frontmatter setup and cultural adaptations.
---

# Translate to Brazilian Portuguese

This skill helps translate English blog articles to Brazilian Portuguese with a natural, conversational tone while maintaining the original meaning and adapting cultural references appropriately.

## Translation Philosophy

The goal is to create **natural, readable Brazilian Portuguese** that:
- Sounds less formal and more approachable
- Maintains the author's voice and style
- Adapts cultural references to Brazilian context when needed
- Preserves the literary quality of the original

## Pronoun Usage: Adding "Eu"

Brazilian Portuguese allows omitting subject pronouns, but for a **less formal, more conversational tone**, add "Eu" (I) to first-person singular verbs **when they start a sentence**.

### Rules:
- ✅ Add "Eu" when a first-person verb starts a sentence
- ❌ Don't add "Eu" in the middle of sentences or after conjunctions
- ❌ Don't add pronouns for non-first-person verbs (we, they, etc. can be omitted)

### Examples:

**Good:**
```
Original: "I hear a bell ringing"
Translation: "Eu ouço um sino tocando"

Original: "I brought a laptop to write"
Translation: "Eu trouxe um laptop para escrever"

Original: "I continue wondering"
Translation: "Eu continuo me perguntando"
```

**Already correct (no change needed):**
```
Original: "We pondered the alternative"
Translation: "Ponderamos sobre a alternativa" (no pronoun needed)

Original: "then I write about the journey"
Translation: "então escrevo sobre a jornada" (mid-sentence, no "eu" needed)
```

## Vocabulary Guidelines

Avoid words that sound overly **cute, formal, or academic** that the general Brazilian population wouldn't commonly use.

### Words to Avoid and Replacements:

| ❌ Avoid | ✅ Use Instead | Why |
|---------|----------------|-----|
| fofo | (remove or use "bonito/legal") | Too cute/childish |
| dossel | copas das árvores | Too technical/formal |
| pitoresco | (keep if essential, but consider context) | Can sound pretentious |
| singelo | simples, modesto | Overly literary |

### General Rules:
- Use **common, everyday Brazilian Portuguese**
- If you've never heard a word in casual conversation, it's probably too formal
- When in doubt, choose the simpler, more direct word
- Keep the tone **conversational but not sloppy**

## Cultural Adaptations

### References to Keep:
- **Universal pop culture**: Movies (Matrix, Alice in Wonderland, Narnia), games (Tetris), cartoons (Tom & Jerry are "Tom e Jerry" in Brazil)
- **Scientific/historical**: Einstein, Penicillin, etc.
- **International geography**: Switzerland, French Alps (these are aspirational and work globally)

### References to Adapt:
- **Brazil-native animals/culture**: "capybara" → PERFECT for Brazilian audience (native animal + popular meme culture)
- **US-specific idioms**: Find Brazilian Portuguese equivalents
- **American measurements**: Keep both imperial and metric as in original.
    Remove ft and lbs, keep meters and kg.

### When Adapting:
1. Check if the reference is actually US-specific or universal
2. Find a Brazilian equivalent that preserves the **same emotional impact**
3. Document your adaptation in translation notes

## File Naming Convention

Translated files should follow this pattern:
```
Original: 2025-10-03-five-days-on-the-kumano-kodo.md
Translated: 2025-10-03-cinco-dias-no-kumano-kodo.md
```

- Keep the **same date**
- Translate the **slug to Portuguese**
- Use **lowercase, hyphenated words**

## Frontmatter Setup

### For the Translated (Portuguese) Version

```yaml
---
share: false
layout: post
title: Título do Artigo em Português
filename: essay/_posts/2025-10-03-slug-em-portugues
rss: false                              # Exclude from RSS feed
date: 2025-10-03 16:00:00 +0900        # Keep original date/timezone
excerpt: "Descrição em português..."
draft: false
lang: pt-br                             # Language identifier
translation_of: original-english-slug   # Links to English version
unlisted: true                          # Hide from homepage/listings
cover_image: "/images/posts/..."       # Same images as original
cover_image_mobile: "/images/posts/..."
---
```

### For the Original (English) Version

**Add these fields to the existing frontmatter:**

```yaml
lang: en                                # Language identifier
translations:                           # Map of translations
  pt-br: slug-em-portugues
```

### Example:

**English version** (`2025-10-03-five-days-on-the-kumano-kodo.md`):
```yaml
---
# ... existing frontmatter ...
lang: en
translations:
  pt-br: cinco-dias-no-kumano-kodo
---
```

**Portuguese version** (`2025-10-03-cinco-dias-no-kumano-kodo.md`):
```yaml
---
share: false
layout: post
title: Cinco Dias no Kumano Kodo
filename: essay/_posts/2025-10-03-cinco-dias-no-kumano-kodo
rss: false
date: 2025-10-03 16:00:00 +0900
excerpt: "Caminhei pelas montanhas no Japão..."
draft: false
lang: pt-br
translation_of: five-days-on-the-kumano-kodo
unlisted: true
cover_image: "/images/posts/2025-10-03-five-days-on-the-kumano-kodo/L1010455-cover.jpg"
cover_image_mobile: "/images/posts/2025-10-03-five-days-on-the-kumano-kodo/L1010455-cover-mobile.jpg"
---
```

## Translation Workflow

1. **Read the original article completely** to understand tone, style, and intent
2. **Create the translated file** with proper naming convention
3. **Set up frontmatter** for both files (add `translations` to English, full frontmatter to Portuguese)
4. **Translate the content**:
   - Apply pronoun rules ("Eu" at sentence start)
   - Use natural, conversational vocabulary
   - Adapt cultural references as needed
5. **Review for tone**: Does it sound natural in Brazilian Portuguese?
6. **Document changes**: Note any significant adaptations made

## Quality Checklist

Before finalizing a translation, verify:

- [ ] Added "Eu" to first-person verbs at sentence starts
- [ ] Replaced overly formal/cute vocabulary
- [ ] Cultural references are appropriate for Brazilian audience
- [ ] Frontmatter is correctly configured on BOTH files
- [ ] File naming follows convention
- [ ] Translation links work bidirectionally
- [ ] Portuguese version is `unlisted: true` and `rss: false`
- [ ] English version has `translations` map with `pt-br` entry

## Additional Resources

See `examples.md` in this skill directory for concrete before/after examples of successful translations.