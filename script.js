
document.addEventListener("DOMContentLoaded", () => {
    initialize({
        font: FONT_MATRIX["Parisienne"].name,
        fontSize: "10px",
        startFill: "transparent",
        endFill: "black",
        startStroke: "transparent",
        endStroke: "black",
        baseAnimationDelay: 2,
        textFillExtraAnimationDelay: 2.5
    });
    write("My Name Is Optimus Prime", { letterConfiguration: { delay: 0.15 } });
})