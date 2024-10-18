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
        initialize({
            font: FONT_MATRIX['Pinyon Script'].name,
            fontSize: "8px",
        });
        write("Hello Universe, My Name Is Optimus Prime!");
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
// Initialize the global configuration.
initialize({
    font: FONT_MATRIX["Parisienne"].name, // Any of the supported fonts.
    fontSize: "10px", // Any font size suitable for your SVG element bounds.
});
// Write the letters into the SVG element.
write("Hello Universe, My Name Is Optimus Prime!");
```

### 3. Customize Your Animation

Khoshnus offers full control over your animation. Want the text to feel like it’s written slowly or quickly? You decide!
Here’s a glimpse of how you can tweak it:

```javascript
initialize({
    font: FONT_MATRIX["Pinyon Script"].name, // Only fonts from FONT_MATRIX are available.
    fontSize: "16px",
    startStrokeDashoffset: FONT_MATRIX["Pinyon Script"].strokeDashoffset, // Or any strokeDashoffset you want the letters to start with.
    startStrokeWidth: 0.001,
    startFill: "transparent",
    endFill: "black",
    startStroke: "black",
    endStrokeDashoffset: 0,
    endStrokeWidth: 0.3,
    endStroke: "transparent",
    baseAnimationDelay: 2.5,
    textFillExtraAnimationDelay: 3,
});
```

### ✍️ Make Every Letter Special

The magic of Khoshnus lies in its ability to animate text letter-by-letter. Here’s an example:

```javascript
write("Your Text Here", {
    letterConfiguration: {
        delay: 0.25, // Delays each letter's animation
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

