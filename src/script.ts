const size_input = document.getElementById("size-range") as HTMLInputElement;
const size_label = document.getElementById("size-range-label") as HTMLLabelElement;

const speed_input = document.getElementById("speed-range") as HTMLInputElement;
const speed_label = document.getElementById("speed-range-label") as HTMLLabelElement;

const sort_algorithm_select = document.getElementById("algorithm-select") as HTMLSelectElement;
let sort_algorithm_name = "Block sort"

const start_button = document.getElementById("start-button") as HTMLButtonElement;
const stop_button = document.getElementById("stop-button") as HTMLButtonElement;
const reset_button = document.getElementById("reset-button") as HTMLButtonElement;
const generate_random_data_button = document.getElementById("generate-random-data-button") as HTMLButtonElement;
const generate_pseudorandom_data_button = document.getElementById("generate-pseudorandom-data-button") as HTMLButtonElement;

size_input.addEventListener("input", () => {
    size_label.textContent = `size: ${size_input.value} elements`;
});

speed_input.addEventListener("input", () => {
    speed_label.textContent = `speed: ${speed_input.value} ms`;
});

sort_algorithm_select.addEventListener("change", () => {
    sort_algorithm_name = sort_algorithm_select.value;
});

start_button.addEventListener("click", () => {
    console.log(start_button.textContent);
});

stop_button.addEventListener("click", () => {
    console.log(stop_button.textContent);
});

reset_button.addEventListener("click", () => {
    console.log(reset_button.textContent);
});

generate_random_data_button.addEventListener("click", () => {
    console.log(generate_random_data_button.textContent);
});

generate_pseudorandom_data_button.addEventListener("click", () => {
    console.log(generate_pseudorandom_data_button.textContent);
});

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.style.background = "#ff0000";
let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;