# Translation Examples

This file contains concrete before/after examples from actual translations to serve as reference for future work.

## Pronoun Usage Examples

### Adding "Eu" at Sentence Start

**Example 1: Simple present tense**
```
English: "I hear a distant bell ringing somewhere up the slope"
❌ Bad: "Ouço um sino distante tocando em algum lugar morro acima"
✅ Good: "Eu ouço um sino distante tocando em algum lugar morro acima"
```

**Example 2: Compound action**
```
English: "I set a boot on a stone step braided with roots, take a long breath, and let it out"
❌ Bad: "Coloco a bota em um degrau de pedra entrelaçado com raízes"
✅ Good: "Eu coloco a bota em um degrau de pedra entrelaçado com raízes"
```

**Example 3: Past tense**
```
English: "I brought a laptop to unload my camera photos and write"
❌ Bad: "Trouxe um laptop para descarregar minhas fotos da câmera e escrever"
✅ Good: "Eu trouxe um laptop para descarregar minhas fotos da câmera e escrever"
```

**Example 4: Continuous action**
```
English: "I continue wondering, 'Are we behind?'"
❌ Bad: "Continuo me perguntando, 'Estamos atrasados?'"
✅ Good: "Eu continuo me perguntando, 'Estamos atrasados?'"
```

**Example 5: Multiple verbs in sequence**
```
English: "I examine the endless grass... Then, as I approach..."
❌ Bad: "Examino a grama interminável... Então, enquanto me aproximo..."
✅ Good: "Eu examino a grama interminável... Então, enquanto me aproximo..."
```

### When NOT to Add "Eu"

**Mid-sentence (after conjunction):**
```
English: "During the day while my mind wanders aimlessly, and then I write about the journey"
✅ Correct: "durante o dia enquanto minha mente vagueia sem rumo, e então escrevo sobre a jornada"
(No "eu" after "então" because it's mid-sentence)
```

**Non-first person:**
```
English: "We pondered the alternative of taking a bus"
✅ Correct: "Ponderamos sobre a alternativa de pegar um ônibus"
(No pronoun needed for "we" - it's already clear from verb conjugation)
```

**Dialogue/quoted speech:**
```
English: "'Let me go take a look', I say"
✅ Correct: "'Deixa eu dar uma olhada', digo"
(After dialogue, no "eu" needed in reporting verb)
```

## Vocabulary Replacements

### Overly Formal Words

**Example 1: "dossel" (canopy)**
```
English: "Light rain needles through the canopy"
❌ Bad: "Uma chuva leve atravessa o dossel"
✅ Good: "Uma chuva leve cai através das copas das árvores"
```
*Why: "dossel" is too technical/academic. "Copas das árvores" is more natural.*

**Example 2: "fofo" (cute/fluffy)**
```
English: "a cute cat [link]"
❌ Bad: "um gato fofo"
✅ Good: "um gato"
```
*Why: "fofo" sounds childish. The link itself shows it's cute, no need to state it.*

### Keeping Appropriate Vocabulary

**Example: "pitoresco" (picturesque)**
```
English: "gazing at the quaint hamlets"
✅ Acceptable: "olhando as vilas pitorescas"
```
*Why: While "pitoresco" is literary, it's appropriate for the contemplative tone of this essay.*

**Example: "encantados" (enchanted/delighted)**
```
English: "my wife and I are enchanted by the beauty"
✅ Good: "minha esposa e eu estamos encantados com a beleza"
```
*Why: "Encantados" fits the literary, reflective tone without being overly cute.*

## Cultural Adaptations

### Universal References (Keep As-Is)

**Tom & Jerry:**
```
English: "Tom ascending to heaven in an infinite staircase"
✅ Good: "Tom subindo ao céu numa escadaria infinita"
Add context: "depois de perseguir o Jerry" (after chasing Jerry)
```
*Why: Tom & Jerry is extremely popular in Brazil. Added context helps readers who might not remember the specific scene.*

**Tetris:**
```
English: "Think of tetris, but with your feet"
✅ Good: "Pense em tetris, mas com seus pés"
```
*Why: Tetris is universally known.*

### Brazilian-Native References (Perfect!)

**Capybara:**
```
English: "like a relaxing capybara"
✅ Perfect: "como uma capivara relaxante"
```
*Why: Capivaras are native to Brazil AND there's a huge "relaxing capybara" meme culture in Brazilian internet. This resonates MORE with Brazilians than Americans!*

### Keep International Geography

```
English: "Switzerland's turquoise lakes or the dramatic Alps of France"
✅ Good: "lagos turquesa da Suíça ou dos dramáticos Alpes da França"
```
*Why: These are aspirational references that work globally. No need to adapt.*

## Frontmatter Examples

### Complete Frontmatter Setup

**Original English Article:**
```yaml
---
share: false
layout: post
title: Five Days on the Kumano Kodo
filename: essay/_posts/2025-10-03-five-days-on-the-kumano-kodo
rss: true
date: 2025-10-03 16:00:00 +0900
excerpt: "I walked the mountains in Japan for five days..."
draft: false
cover_image: "/images/posts/2025-10-03-five-days-on-the-kumano-kodo/L1010455-cover.jpg"
cover_image_mobile: "/images/posts/2025-10-03-five-days-on-the-kumano-kodo/L1010455-cover-mobile.jpg"
lang: en                              # ADD THIS
translations:                         # ADD THIS
  pt-br: cinco-dias-no-kumano-kodo
---
```

**Translated Portuguese Article:**
```yaml
---
share: false
layout: post
title: Cinco Dias no Kumano Kodo
filename: essay/_posts/2025-10-03-cinco-dias-no-kumano-kodo
rss: false                            # Exclude from RSS
date: 2025-10-03 16:00:00 +0900      # Same date as original
excerpt: "Caminhei pelas montanhas no Japão por cinco dias..."
draft: false
lang: pt-br                           # Language code
translation_of: five-days-on-the-kumano-kodo  # Link to original
unlisted: true                        # Hide from homepage
cover_image: "/images/posts/2025-10-03-five-days-on-the-kumano-kodo/L1010455-cover.jpg"
cover_image_mobile: "/images/posts/2025-10-03-five-days-on-the-kumano-kodo/L1010455-cover-mobile.jpg"
---
```

## Common Patterns

### Sentence Starters with First-Person Verbs

When translating these common sentence patterns, always add "Eu":

```
"I wonder..." → "Eu me pergunto..."
"I brought..." → "Eu trouxe..."
"I feel..." → "Eu sinto..."
"I continue..." → "Eu continuo..."
"I examine..." → "Eu examino..."
"I look..." → "Eu olho..."
"I sigh..." → "Eu suspiro..."
"I announce..." → "Eu anuncio..."
```

### Metaphors and Expressions

**Hyperbole/exaggeration:**
```
English: "like two potatoes in a pan"
✅ Good: "como duas batatas na panela"
```
*Direct translation works because the humor translates well.*

**Visual descriptions:**
```
English: "mountains stretching further away, alternating like a folder cabinet"
✅ Good: "montanhas se estendendo mais longe, alternando como um arquivo de pastas"
```
*The visual metaphor works in both languages.*

## Tone and Style

The overall Brazilian Portuguese should feel:
- **Conversational** but not sloppy
- **Literary** but not pretentious
- **Personal** and engaging
- **Natural** as if a Brazilian wrote it originally

### Good tone example:
```
English: "I can't believe we're standing for a whole hour with these heavy bags!"
✅ Good: "Não acredito que vamos ficar de pé por uma hora inteira com essas bolsas pesadas!"
```
*Natural exclamation, maintains the frustration and humor.*

### Maintaining the author's voice:
```
English: "where would the fun be in that? I traveled around the planet for this"
✅ Good: "onde estaria a graça nisso? Viajei ao redor do planeta para isso"
```
*Keeps the rhetorical question + determination combo that defines the author's adventurous personality.*
