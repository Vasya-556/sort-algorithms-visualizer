const size_input = document.getElementById("size-range") as HTMLInputElement;
const size_label = document.getElementById("size-range-label") as HTMLLabelElement;
const speed_input = document.getElementById("speed-range") as HTMLInputElement;
const speed_label = document.getElementById("speed-range-label") as HTMLLabelElement;

size_input.addEventListener("input", () => {
    size_label.textContent = `size: ${size_input.value} elements`;
});


speed_input.addEventListener("input", () => {
    speed_label.textContent = `speed: ${speed_input.value} ms`;
});