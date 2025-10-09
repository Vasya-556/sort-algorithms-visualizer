const size_input = document.getElementById("size-range") as HTMLInputElement;
const size_label = document.getElementById("size-range-label") as HTMLLabelElement;

const speed_input = document.getElementById("speed-range") as HTMLInputElement;
const speed_label = document.getElementById("speed-range-label") as HTMLLabelElement;

const asc_dsc_input = document.getElementById("asc-dsc-input") as HTMLInputElement;
const asc_dsc_label = document.getElementById("asc-dsc-label") as HTMLLabelElement;

const sort_algorithm_select = document.getElementById("algorithm-select") as HTMLSelectElement;

const result_label = document.getElementById("result-time") as HTMLLabelElement;

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

const algorithms: Record<string, () => Promise<void>> = {
    "Block sort": () => block_sort(),
    "Bubble sort": () => bubble_sort(),
    "Cocktail shaker sort": () => cocktail_sort(),
    "Comb sort": () => comb_sort(),
    "Crumsort": () => crumsort_sort(),
    "Cubesort": () => cubesort_sort(),
    "Cycle sort": () => cycle_sort(),
    "Exchange sort": () => exchange_sort(),
    "Fluxsort": () => fluxsort_sort(),
    "Gnome sort": () => gnome_sort(),
    "Heap sort": () => heap_sort(),
    "In-place merge sort": () => inplace_merge_sort(),
    "Insertion sort": () => insertion_sort(),
    "Introsort": () => introsort_sort(),
    "Library sort": () => library_sort(),
    "Merge sort": () => merge_sort(),
    "Odd–even sort": () => odd_even_sort(),
    "Patience sort": () => patience_sort(),
    "Quicksort": () => quicksort_sort(),
    "Selection sort": () => selection_sort(),
    "Shellsort": () => shellsort_sort(),
    "Smoothsort": () => smoothsort_sort(),
    "Strand sort": () => strand_sort(),
    "Timsort": () => timsort_sort(),
    "Tournament sort": () => tournament_sort(),
    "Tree sort": () => tree_sort(),
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

    const algorithm2 = algorithms[sort_algorithm_name] || bubble_sort;
    const sorted = await sort_result(algorithm2);
    result_label.textContent = `${sorted} ms`
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

const display_data = () => {
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

const sleep = (ms: number) => new Promise<void>((resolve, reject) => {
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

const step = async () => {
    await sleep(speed);
    display_data()
}

const bubble_sort = async () => {
    let tmp: number;

    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
            const condition = is_ascending
            ? data[j] > data[j + 1]
            : data[j] < data[j + 1];
            if (condition){
                tmp = data[j];
                data[j] = data[j+1];
                data[j+1] = tmp
                await step()
            }
        }
    }
}

const exchange_sort = async () => {
    let tmp: number;

    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i+1; j < data.length; j++) {
            if (data[i] > data[j]){
                tmp = data[i];
                data[i] = data[j];
                data[j] = tmp
                await step();
            }
        }
        
    }
}

const cycle_sort = async () => {

}

const gnome_sort = async () => {

}

const selection_sort = async () => {

}

const insertion_sort = async () => {

}

const odd_even_sort = async () => {

}

const cocktail_sort = async () => {

}

const comb_sort = async () => {
    
}

const shellsort_sort = async () => {
    
}

const tree_sort = async () => {
    
}

const quicksort_sort = async () => {

}

const merge_sort = async () => {
    
}

const inplace_merge_sort = async () => {
    
}

const heap_sort = async () => {
    
}

const patience_sort = async () => {
    
}

const strand_sort = async () => {
    
}

const tournament_sort = async () => {
    
}

const library_sort = async () => {
    
}

const timsort_sort = async () => {
    
}

const smoothsort_sort = async () => {
    
}

const cubesort_sort = async () => {
    
}

const crumsort_sort = async () => {
    
}

const fluxsort_sort = async () => {
    
}

const introsort_sort = async () => {
    
}

const block_sort = async () => {
    
}