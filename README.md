# ✨ Khoshnus - Craft Beautiful Handwritten SVG Text Animations
Khoshnus is just a library, but it's also your tool for bringing life to static text in an artistic way. With its elegant SVG animations, your text can now be revealed as if written by hand!

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

Here's how you can make your text come alive with Khoshnus:

### 1. Include the SVG in Your HTML

Add an empty SVG element with an id that Khoshnus will use to animate your text:

```html
<svg id="khoshnus" width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"></svg>
```

### 2. Initialize and Write Your Text

Once the page is ready, use Khoshnus to initialize the animation and define the text you want to animate:

```javascript
initialize({
    font: FONT_MATRIX["Parisienne"].name, // Any of the available fonts.
    fontSize: "10px", // Any font size suitable for your SVG element.
});
write("Hello Universe, My Name Is Optimus Prime!");
```

### 3. Customize Your Animation
Khoshnus offers full control over your animation. Want the text to feel like it’s written slowly or quickly? You decide! Here’s a glimpse of how you can tweak it:

```javascript
initialize({
    font: FONT_MATRIX["Pinyon Script"].name,
    fontSize: "12px",
    startStrokeDashoffset: 100,
    startStrokeWidth: 0.01,
    endFill: "black",
    startStroke: "black",
    endStrokeDashoffset: 0,
    endStrokeWidth: 0.1,
    baseAnimationDelay: 2.5,
    textFillExtraAnimationDelay: 3,
});
```

### You can define:

- Font and Size: Choose from several beautiful fonts with distinct styles.
- Stroke and Fill: Customize how each letter is drawn and filled.
- Animation Delays: Fine-tune the speed and sequence of how letters appear on the screen.
### ✍️ Make Every Letter Special
The magic of Khoshnus lies in its ability to animate text letter-by-letter. Here’s an example:

```javascript
write("Your Text Here", {
    letterConfiguration: {
        delay: 0.25, // Delays each letter's animation
    }
});
```
With `letterConfiguration`, you control how fast each letter appears, giving your text an artistic, flowing motion.

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

## 📦 Installation
To get started with Khoshnus, simply clone or download the project and link the JavaScript file to your page:

### Add the dependency to your project:
```bash
npm install khoshnus
yarn add khoshnus
```
### Import the dependency:

```javascript
const { initialize, write } = require("khoshnus");
```

### ✨ Start using it!

### 🌟 Creative Use Cases
Here are just a few ways you can use Khoshnus:

- Display personalized signature animations for your website.
- Add a dynamic handwritten greeting to your home page.
- Animate text for art projects, digital invitations, or logos.
- Create a storybook-like experience with flowing, hand-drawn text.

### ⚖️ License
This project is licensed under the MIT License, meaning you're free to use, modify, and distribute it in both personal and commercial projects.

