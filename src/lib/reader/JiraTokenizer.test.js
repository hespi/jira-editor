import JIRATokenizer from './JIRATokenizer';
import JIRAToken from './JIRAToken';
import { JIRATokenizerDefinition } from './JIRATokenizerDefinition';

describe('JIRATokenizer', () => {
  
  let tokenizer = new JIRATokenizer(JIRATokenizerDefinition);

  describe('constructor TESTS', () => {
    test('when creating without params, then throws an error', () => {
      expect(() => {
        new JIRATokenizer();
      }).toThrowError("State definition is required");
    });

    test('when creating without initial state, then throws an error', () => {
      expect(() => {
        new JIRATokenizer({});
      }).toThrowError("No initial state defined. Set 'initial' property to 'true' on the initial state");

      expect(() => {
        new JIRATokenizer({ "ini": {
          "initial": false
        }});
      }).toThrowError("No initial state defined. Set 'initial' property to 'true' on the initial state");
    });

    test('when creating with initial state, then instantiates successfully', () => {
      expect(new JIRATokenizer({ "ini": {
          "initial": true
        }})).toBeDefined();
    });
  });

  describe('load TESTS', () => {
    test('when loading empty text, then throws an error', () => {
      expect(() => {
        tokenizer.load("")
      }).toThrowError("Trying to load empty JIRA markup");

      expect(() => {
        tokenizer.load(null)
      }).toThrowError("Trying to load empty JIRA markup");

      expect(() => {
        tokenizer.load(undefined)
      }).toThrowError("Trying to load empty JIRA markup");
    });
  
    test('when loading non empty text, then tokenizer is initialized and the source parsed', () => {
      tokenizer.load("text");
      expect(tokenizer.source).toEqual("text");
      expect(tokenizer._currentIndex).toEqual("text".length);
      expect(tokenizer._currentStates).toEqual(["main"]);
      expect(tokenizer._matchBuffer.length).toEqual(1);
    });
  
  });

  describe('read TESTS', () => {
    test('when reading single line non-formatted text, then returns full source', () => {
      tokenizer.load("text without markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text without markup", 0));
    });

    test('when reading single line with bold text, then reads each text block on text', () => {
      tokenizer.load("text *with* markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*with*", "text ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " markup", "text *with*".length));
    });

    test('when reading single line with italic text, then reads each text block on text', () => {
      tokenizer.load("text _with_ markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("italic", "_with_", "text ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " markup", "text _with_".length));
    });

    test('when reading single line with striked through text, then reads each text block on text', () => {
      tokenizer.load("text -with- markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-with-", "text ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " markup", "text -with-".length));
    });

    test('when reading single line with sub text, then reads each text block on text', () => {
      tokenizer.load("text ~with~ markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("sub", "~with~", "text ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " markup", "text ~with~".length));
    });

    test('when reading single line with sup text, then reads each text block on text', () => {
      tokenizer.load("text ^with^ markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("sup", "^with^", "text ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " markup", "text ^with^".length));
    });

    test('when reading single line with underlined text, then reads each text block on text', () => {
      tokenizer.load("text +with+ markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("underline", "+with+", "text ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " markup", "text ^with^".length));
    });

    test('when reading single line with citation text, then reads each text block on text', () => {
      tokenizer.load("text ??with markup??");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("citation", "??with markup??", "text ".length));

      tokenizer.load("??is this a markup? ?? or not?");
      expect(tokenizer.read()).toEqual(new JIRAToken("citation", "??is this a markup? ??", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " or not?", "??is this a markup? ??".length));

      tokenizer.load("??incomplete markup? ?");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "??incomplete markup? ?", 0));
    });

    test('when reading single line with preformatted text, then reads each text block on text', () => {
      tokenizer.load("text {{with markup}}");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("pre", "{{with markup}}", "text ".length));

      tokenizer.load("{{is this a markup? }} or not?");
      expect(tokenizer.read()).toEqual(new JIRAToken("pre", "{{is this a markup? }}", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " or not?", "{{is this a markup? }}".length));

      tokenizer.load("{{incomplete markup} }");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "{{incomplete markup} }", 0));
    });

    test('when reading nested formatted text, then reads each text block on text in order', () => {
      tokenizer.load("text ^-*with*-^ markup");
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "text ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("sup", "^-*with*-^", "text ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-*with*-", "text ^".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*with*", "text ^-".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " markup", "text ^-*with*-^".length));
    });

    test('when reading unordered list, then returns ul token', () => {
      tokenizer.load("\n* unordered *list* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("ul", "\n* ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "unordered ", "\n* ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*list*", "\n* unordered ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\n* unordered *list*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\n* unordered *list* ".length));

      tokenizer.load("\n* unordered *list* -item-"); //Uses tab instead of space
      expect(tokenizer.read()).toEqual(new JIRAToken("ul", "\n* ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "unordered ", "\n* ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*list*", "\n* unordered ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\n* unordered *list*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\n* unordered *list* ".length));
    });

    test('when reading ordered list, then returns ol token', () => {
      tokenizer.load("\n# ordered *list* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("ol", "\n# ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "ordered ", "\n# ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*list*", "\n# ordered ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\n# ordered *list*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\n# ordered *list* ".length));

      tokenizer.load("\n# ordered ^*list* -item-^"); //Uses tab instead of space
      expect(tokenizer.read()).toEqual(new JIRAToken("ol", "\n# ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", "ordered ", "\n# ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("sup", "^*list* -item-^", "\n# ordered ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*list*", "\n# ordered ^".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\n# ordered ^*list* ".length));
    });

    test('when reading blockquote text, then returns block token', () => {
      tokenizer.load("\nbq. *blockquote* hola -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("block", "\nbq. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*blockquote*", "\nbq. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " hola ", "\nbq. *blockquote*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\nbq. *blockquote* hola ".length));
    });

    test('when reading heading1 text, then returns h1 token', () => {
      tokenizer.load("\nh1. *head 1* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("h1", "\nh1. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*head 1*", "\nh1. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\nh1. *head 1*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\nh1. *head 1* ".length));
    });

    test('when reading heading2 text, then returns h2 token', () => {
      tokenizer.load("\nh2. *head 2* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("h2", "\nh2. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*head 2*", "\nh1. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\nh2. *head 2*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\nh2. *head 2* ".length));
    });

    test('when reading heading3 text, then returns h3 token', () => {
      tokenizer.load("\nh3. *head 3* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("h3", "\nh3. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*head 3*", "\nh3. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\nh3. *head 3*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\nh3. *head 3* ".length));
    });

    test('when reading heading4 text, then returns h4 token', () => {
      tokenizer.load("\nh4. *head 4* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("h4", "\nh4. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*head 4*", "\nh4. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\nh4. *head 4*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\nh4. *head 4* ".length));
    });

    test('when reading heading5 text, then returns h5 token', () => {
      tokenizer.load("\nh5. *head 5* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("h5", "\nh5. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*head 5*", "\nh5. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\nh5. *head 5*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\nh5. *head 5* ".length));
    });

    test('when reading heading6 text, then returns h6 token', () => {
      tokenizer.load("\nh6. *head 6* -item-");
      expect(tokenizer.read()).toEqual(new JIRAToken("h6", "\nh6. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*head 6*", "\nh6. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " ", "\nh6. *head 6*".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("strike", "-item-", "\nh6. *head 6* ".length));
    });

    test('when reading paragraph quote text, then returns paragraph token', () => {
      tokenizer.load("\nh6. {quote} {*quote* {quote} hola"); //CANNOT DETECT TEXTS INSIDE
      expect(tokenizer.read()).toEqual(new JIRAToken("h6", "\nh6. ", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("paragraph", "{quote} {*quote* {quote}", "\nh6. ".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*quote*", "\nh6. {quote} {".length));
      expect(tokenizer.read()).toEqual(new JIRAToken("text", " hola", "\nh6. {quote} {*quote* {quote}".length));
    });

    test('when reading colored text, then returns color token', () => {
      tokenizer.load("{color:#FFF}coloured *bold* text{color}"); //CANNOT DETECT TEXTS INSIDE
      expect(tokenizer.read()).toEqual(new JIRAToken("color", "{color:#FFF}coloured *bold* text{color}", 0));
      expect(tokenizer.read()).toEqual(new JIRAToken("bold", "*bold*", "{color:#FFF}coloured ".length));
    });

  });
  
});

