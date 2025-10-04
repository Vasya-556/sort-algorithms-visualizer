const size_input = document.getElementById("size-range") as HTMLInputElement;
const size_label = document.getElementById("size-range-label") as HTMLLabelElement;

const speed_input = document.getElementById("speed-range") as HTMLInputElement;
const speed_label = document.getElementById("speed-range-label") as HTMLLabelElement;

const sort_algorithm_select = document.getElementById("algorithm-select") as HTMLSelectElement;
let sort_algorithm_name = "Block sort"

const start_button = document.getElementById("start-button") as HTMLButtonElement;
const stop_button = document.getElementById("stop-button") as HTMLButtonElement;
const reset_button = document.getElementById("reset-button") as HTMLButtonElement;
const shuffle_button = document.getElementById("shuffle-button") as HTMLButtonElement;
const generate_random_data_button = document.getElementById("generate-random-data-button") as HTMLButtonElement;
const generate_pseudorandom_data_button = document.getElementById("generate-pseudorandom-data-button") as HTMLButtonElement;

let size: number = Number(size_input.value); 
let data: number[] = [];

size_input.addEventListener("input", () => {
    size_label.textContent = `size: ${size_input.value} elements`;
    size = Number(size_input.value);
});

speed_input.addEventListener("input", () => {
    speed_label.textContent = `speed: ${speed_input.value} ms`;
});

sort_algorithm_select.addEventListener("change", () => {
    sort_algorithm_name = sort_algorithm_select.value;
});

start_button.addEventListener("click", () => {
    console.log(start_button.textContent);
    console.log(data);
});

stop_button.addEventListener("click", () => {
    console.log(stop_button.textContent);
});

reset_button.addEventListener("click", () => {
    console.log(reset_button.textContent);
});

shuffle_button.addEventListener("click", () => {
    console.log(shuffle_button.textContent);
});

generate_random_data_button.addEventListener("click", () => {
    // console.log(generate_random_data_button.textContent);
    generate_random_data();
});

generate_pseudorandom_data_button.addEventListener("click", () => {
    // console.log(generate_pseudorandom_data_button.textContent);
    generate_pseudorandom_data();
});

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.style.background = "#ff0000";
const header = document.getElementById("header")!;
const headerHeight = header.offsetHeight;
let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

const ctx = canvas.getContext("2d")

if (!ctx) {
    throw new Error("Could not get 2D context");
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - headerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const generate_random_data = () => {
    data = Array.from({ length: size }, () => Math.floor(Math.random() * size) + 1);
}

generate_random_data()
const generate_pseudorandom_data = () => {
    data = Array.from({ length: size}, (_, i) => i + 1)   
    shuffle_data()
}

const shuffle_data = () => {
    let m = size, t, i;

    while (m) {
        i = Math.floor(Math.random() * m--);

        t = data[m];
        data[m] = data[i];
        data[i] = t;
    }
}