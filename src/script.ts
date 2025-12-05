import {
    bubble_sort, block_sort, bogo_sort, cocktail_sort, comb_sort,
    crumsort, cubesort, cycle_sort, exchange_sort, fluxsort_sort,
    gnome_sort, heap_sort, in_place_merge_sort, insertion_sort,
    introsort, library_sort, merge_sort, odd_even_sort, patience_sort,
    quicksort, selection_sort, shellsort, smoothsort, strand_sort,
    timsort, tournament_sort, tree_sort
} from "./sorts.js";

const size_input = document.getElementById("size-range") as HTMLInputElement;
const size_label = document.getElementById("size-range-label") as HTMLLabelElement;

const speed_input = document.getElementById("speed-range") as HTMLInputElement;
const speed_label = document.getElementById("speed-range-label") as HTMLLabelElement;

const asc_dsc_input = document.getElementById("asc-dsc-input") as HTMLInputElement;
const asc_dsc_label = document.getElementById("asc-dsc-label") as HTMLLabelElement;

const sort_algorithm_select = document.getElementById("algorithm-select") as HTMLSelectElement;

const result_time_label = document.getElementById("result-time") as HTMLLabelElement;
const result_step_label = document.getElementById("result-steps") as HTMLLabelElement;

const start_button = document.getElementById("start-button") as HTMLButtonElement;
const stop_button = document.getElementById("stop-button") as HTMLButtonElement;
const reset_button = document.getElementById("reset-button") as HTMLButtonElement;
const shuffle_button = document.getElementById("shuffle-button") as HTMLButtonElement;
const generate_random_data_button = document.getElementById("generate-random-data-button") as HTMLButtonElement;
const generate_pseudorandom_data_button = document.getElementById("generate-pseudorandom-data-button") as HTMLButtonElement;

let size: number = Number(size_input.value); 
let data: number[] = [];
let data_copy: number[] = JSON.parse(JSON.stringify(data))
let speed: number = Number(speed_input.value);
let is_ascending:boolean = asc_dsc_input.checked;
let sort_algorithm_name:string = "Block sort"
let is_running: boolean = true;
let state = { count: 0 };

const algorithms: Record<string, () => Promise<void>> = {
    "Block sort": () => block_sort(data, is_ascending, state, sleep, speed, display_data),
    "Bogo sort": () => bogo_sort(data, is_ascending, state, sleep, speed, display_data, shuffle_data),
    "Bubble sort": () => bubble_sort(data, is_ascending, state, sleep, speed, display_data),
    "Cocktail shaker sort": () => cocktail_sort(data, is_ascending, state, sleep, speed, display_data),
    "Comb sort": () => comb_sort(data, is_ascending, state, sleep, speed, display_data),
    "Crumsort": () => crumsort(data, is_ascending, state, sleep, speed, display_data),
    "Cubesort": () => cubesort(data, is_ascending, state, sleep, speed, display_data),
    "Cycle sort": () => cycle_sort(data, is_ascending, state, sleep, speed, display_data),
    "Exchange sort": () => exchange_sort(data, is_ascending, state, sleep, speed, display_data),
    "Fluxsort": () => fluxsort_sort(data, is_ascending, state, sleep, speed, display_data),
    "Gnome sort": () => gnome_sort(data, is_ascending, state, sleep, speed, display_data),
    "Heap sort": () => heap_sort(data, is_ascending, state, sleep, speed, display_data),
    "In-place merge sort": () => in_place_merge_sort(data, is_ascending, state, sleep, speed, display_data),
    "Insertion sort": () => insertion_sort(data, is_ascending, state, sleep, speed, display_data),
    "Introsort": () => introsort(data, is_ascending, state, sleep, speed, display_data),
    "Library sort": () => library_sort(data, is_ascending, state, sleep, speed, display_data),
    "Merge sort": () => merge_sort(data, is_ascending, state, sleep, speed, display_data),
    "Odd–even sort": () => odd_even_sort(data, is_ascending, state, sleep, speed, display_data),
    "Patience sort": () => patience_sort(data, is_ascending, state, sleep, speed, display_data),
    "Quicksort": () => quicksort(data, is_ascending, state, sleep, speed, display_data),
    "Selection sort": () => selection_sort(data, is_ascending, state, sleep, speed, display_data),
    "Shellsort": () => shellsort(data, is_ascending, state, sleep, speed, display_data),
    "Smoothsort": () => smoothsort(data, is_ascending, state, sleep, speed, display_data),
    "Strand sort": () => strand_sort(data, is_ascending, state, sleep, speed, display_data),
    "Timsort": () => timsort(data, is_ascending, state, sleep, speed, display_data),
    "Tournament sort": () => tournament_sort(data, is_ascending, state, sleep, speed, display_data),
    "Tree sort": () => tree_sort(data, is_ascending, state, sleep, speed, display_data),
};

size_input.addEventListener("input", () => {
    size_label.textContent = `size: ${size_input.value} elements`;
    size = Number(size_input.value);
});

speed_input.addEventListener("input", () => {
    speed_label.textContent = `speed: ${speed_input.value} ms`;
    speed = Number(speed_input.value)
});

asc_dsc_input.addEventListener("change", () => {
    asc_dsc_input.checked? asc_dsc_label.textContent = "Ascending" : asc_dsc_label.textContent = "Descending"; 
    is_ascending = asc_dsc_input.checked;
});

sort_algorithm_select.addEventListener("change", () => {
    sort_algorithm_name = sort_algorithm_select.value;
});

start_button.addEventListener("click", async () => {
    is_running = true;
    state.count=0;

    const algorithm2 = algorithms[sort_algorithm_name] || bubble_sort;
    const sorted = await sort_result(algorithm2);
    result_time_label.textContent = `${sorted} ms`
    result_step_label.textContent = `${state.count} steps`
});

stop_button.addEventListener("click", () => {
    is_running = false;
});

reset_button.addEventListener("click", () => {
    data = JSON.parse(JSON.stringify(data_copy))
    display_data()
});

shuffle_button.addEventListener("click", () => {
    shuffle_data();
    display_data()
});

generate_random_data_button.addEventListener("click", () => {
    generate_random_data();
    display_data()
});

generate_pseudorandom_data_button.addEventListener("click", () => {
    generate_pseudorandom_data();
    display_data()
});

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.style.background = "#ff0000";
const header = document.getElementById("header")!;
const header_height = header.offsetHeight;
let window_height = window.innerHeight;
let window_width = window.innerWidth;

canvas.width = window_width;
canvas.height = window_height;

const ctx = canvas.getContext("2d")

if (!ctx) {
    throw new Error("Could not get 2D context");
}

const generate_random_data = () => {
    data = Array.from({ length: size }, () => Math.floor(Math.random() * size) + 1);
    data_copy = JSON.parse(JSON.stringify(data))
}

generate_random_data()

const clear_canvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const generate_pseudorandom_data = () => {
    data = Array.from({ length: size}, (_, i) => i + 1)   
    shuffle_data()
    data_copy = JSON.parse(JSON.stringify(data))
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

export const display_data = () => {
    clear_canvas()
    const inner_width = canvas.width * 0.8;
    const data_width = inner_width / size;
    
    const inner_height = canvas.height * 0.8;
    const data_height = inner_height / size;

    for (let i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.rect(canvas.width * 0.1 + i * data_width, canvas.height * 0.9 - data_height * data[i], data_width, data_height * data[i])

        ctx.fillStyle = "green";
        ctx.fill()
    }
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - header_height;
    display_data();
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

export const sleep = (ms: number) => new Promise<void>((resolve, reject) => {
    if (!is_running) return reject(new Error("stopped"));

    if (ms <= 0) {
        resolve();
    } else {
        setTimeout(resolve, ms);
    }
});

const sort_result = async (fn: () => Promise<void>): Promise<number> => {
    const startTime = performance.now();
    await fn();
    const endTime = performance.now();
    return endTime - startTime;
};