![khoshnus-demo-gif](https://imgur.com/0MkNbTJ.gif)

# ✨ Khoshnus - Craft Beautiful Handwritten SVG Text Animations

Khoshnus is just a library, but it's also your tool for bringing life to static text in an artistic way. With its
elegant SVG animations, your text can now be revealed as if written by hand!

## 🖋️ What Does Khoshnus Do?

Khoshnus lets you:

- Animate SVG text with a beautiful, handwritten effect.
- Choose from unique fonts with customizable animations.
- Control each letter's timing, stroke, and fill for a more personalized touch.
- Transform plain text into an elegant visual experience.

## 🎨 Features

- **Multiple Font Styles**: Choose from an array of fonts.
- **Smooth SVG Animation**: Stroke and fill effects are animated for a lifelike handwriting experience.
- **Fine-Grained Control**: Adjust timing and style for each letter—make them reveal at your own pace.
- **Fully Configurable**: Every visual aspect of the text can be customized.

## 🚀 Quick Start

### 📦 Installation

To get started with Khoshnus, add the npm package to your project by running either of the following commands:

```bash
npm install khoshnus
--------------------
yarn add khoshnus
```

### TL;DR

Do this if you are using React.
```javascript
import { FONT_MATRIX, initialize, write } from "khoshnus"
import 'khoshnus/style.css'

const App = () => {
    useEffect(() => {
        const manuscript = new Manuscript();
        manuscript.setup({
            font: FONT_MATRIX["Pinyon Script"].name,
            fontSize: "10px",
        });
        const textId = manuscript.write("Hello Universe, My Name Is Optimus Prime!")
        manuscript.erase(textId, { delayOperation: 15000 })
    }, []);

    return (
        <div>
            <svg id="khoshnus" width="100%" height="500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
        </div>
    )
}
```

---

---

### 1. Include the SVG in Your HTML

Add an empty SVG element with the id of `khoshnus` that Khoshnus will use to animate your text. Feel free to adjust the size of the SVG
based on your needs.

```html

<svg id="khoshnus" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
```

### 2. Initialize and Write Your Text

Once you have your bare HTML file, import the basic stuff needed from the library:

```javascript
import { initialize, write, FONT_MATRIX } from "khoshnus";

import "khoshnus/style.css";
```

Then start using the library:

```javascript
// Create the Manuscript instance and setup global configuration.
const manuscript = new Manuscript();
manuscript.setup({
    font: FONT_MATRIX["Pinyon Script"].name,
    fontSize: "10px",
});
// Write the letters into the SVG element.
const textId = manuscript.write("Hello Universe, My Name Is Optimus Prime!")

// Erase the text after the desired waiting period - optional, you can leave it forever ;)
manuscript.erase(textId, { delayOperation: 15000 })
```

### 3. Customize Your Animation

Khoshnus offers full control over your animation. Want the text to feel like it’s written slowly or quickly? You decide!
Here’s a glimpse of how you can tweak it:

```javascript
initialize({
    font: FONT_MATRIX["Pinyon Script"].name, // Only fonts from FONT_MATRIX are available.
    fontSize: "16px",
    start: {
        startStrokeDashoffset: FONT_MATRIX["Pinyon Script"].strokeDashoffset,
        startStroke: "black",
        startStrokeWidth: 0.0000000001,
        startFill: "transparent",
    },
    end: {
        endStrokeDashoffset: 0,
        endStroke: "transparent",
        endStrokeWidth: 0.3,
        endFill: "black",
    },
    durations: {
        strokeDashoffsetDuration: 3500,
        strokeWidthDuration: 2500,
        strokeDuration: 2500,
        fillDuration: 4000,
    },
});
```

### ✍️ Positioning & Delays

The magic of Khoshnus lies in its ability to provide positioning and delay control. Here’s an example:

```javascript
write("Your Text Here", {
    writeConfiguration: {
        eachLetterDelay: 250, // Delay of each letter after the previous one.
        delayOperation: 0 // Delay of the write operation - useful when you want wait time between written snippets.
    },
    textConfiguration: {
        x: "50%", // X position of the text.
        y: "50%", // Y position of the text.
        textAnchor: "middle", // Anchor of the text.
        dominantBaseline: "middle", // Baseline of the text - where it should align.
        fontSize: "12px" // Font size - appearance could possibly depend on the parent element.
    }
});
```

## 💡 Advanced Example

Check out the following snippet:
```javascript
const manuscript = new Manuscript();
manuscript.setup({
    font: FONT_MATRIX["Pinyon Script"].name,
    fontSize: "10px",
});
const textId0 = manuscript.write("Do not lament my absence,", {
    textElementAttributes: { y: "10%", },
    writeConfiguration: { eachLetterDelay: 100 }
})
const textId1 = manuscript.write("for in my spark,", {
    textElementAttributes: { y: "25%" },
    writeConfiguration: {
        delayOperation: 3000,
        eachLetterDelay: 100
    }
})
const textId2 = manuscript.write("I know that this is not the end,", {
    textElementAttributes: { y: "37.5%" },
    writeConfiguration: {
        delayOperation: 5500,
        eachLetterDelay: 100,
    }
})
const textId3 = manuscript.write("but merely,", {
    textElementAttributes: { y: "55%" },
    writeConfiguration: {
        delayOperation: 9500,
        eachLetterDelay: 100,
    }
})
const textId4 = manuscript.write("a new beginning.", {
    textElementAttributes: { y: "67.5%", },
    writeConfiguration: {
        delayOperation: 11500,
        eachLetterDelay: 100,
    }
})
const textId5 = manuscript.write("- Optimus Prime", {
    textElementAttributes: {
        x: "80%",
        y: "90%",
    }, writeConfiguration: {
        delayOperation: 14000,
        eachLetterDelay: 100,
    }
})
manuscript.erase(textId0, { delayOperation: 20000 });
manuscript.erase(textId1, { delayOperation: 20000 });
manuscript.erase(textId2, { delayOperation: 20000 });
manuscript.erase(textId3, { delayOperation: 20000 });
manuscript.erase(textId4, { delayOperation: 20000 });
manuscript.erase(textId5, { delayOperation: 20000 });
```

It generates the following piece of art:

https://github.com/user-attachments/assets/ac1641df-facf-40db-91ea-e7565340cba7

## Multiple SVGs

It is possible to define multiple SVGs in your component/view as long as they have different ids and you define which Manuscript object references which SVG element. The following React.js snippet shows two SVG elements being referenced, each by its corresponding Manuscript object:

```javascript
const App = () => {
  useEffect(() => {
    const manuscript1 = new Manuscript({
      svgId: "khoshnus-1",
      font: FONT_MATRIX["Pinyon Script"].name,
      fontSize: "10px",
    });
    const text1 = manuscript1.write("Do not lament my absence,", {
      textElementAttributes: {
        y: "10%",
      }, writeConfiguration: { eachLetterDelay: 100 }
    })
    manuscript1.erase(text1)
    
    const manuscript2 = new Manuscript({
      svgId: "khoshnus-2",
      font: FONT_MATRIX["Pinyon Script"].name,
      fontSize: "10px",
    });
    const text2 = manuscript2.write("For in my spark,", {
      textElementAttributes: {
        y: "10%",
      }, writeConfiguration: { eachLetterDelay: 100 }
    })
    manuscript2.erase(text2)
  }, []);

  return (
    <div>
      <svg id="khoshnus-1" width="100%" height="300" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
      <svg id="khoshnus-2" width="100%" height="300" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
      </div>
  )
}
```

### 🖼️ Font Options

Here are some of the unique fonts you can play with:

- **BlackCherry**: Bold strokes with an offset of 80
- **Celtic**: Celtic-inspired, with a stroke offset of 50
- **Eutemia**: Classic, elegant font with a 60 offset
- **Kingthings**: Royal and medieval vibes, stroke offset of 40
- **Ruritania**: Majestic, with an exaggerated offset of 280
- **VTKS**: Artistic flair, with an offset of 150
- **Parisienne**: Soft and feminine, offset of 100
- **Sevillana**: Spanish-inspired curves, with an offset of 120
- **Pinyon Script**: Formal and sophisticated, offset of 100

### 🌟 Creative Use Cases

Here are just a few ways you can use Khoshnus:

- Display personalized signature animations for your website.
- Add a dynamic handwritten greeting to your home page.
- Animate text for art projects, digital invitations, or logos.
- Create a storybook-like experience with flowing, hand-drawn text.

### ⚖️ License

This project is licensed under the MIT License, meaning you're free to use, modify, and distribute it in both personal
and commercial projects.

