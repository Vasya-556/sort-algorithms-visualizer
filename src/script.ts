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
    "Bogo sort": () => bogo_sort(),
    "Bubble sort": () => bubble_sort(),
    "Cocktail shaker sort": () => cocktail_sort(),
    "Comb sort": () => comb_sort(),
    "Crumsort": () => crumsort(),
    "Cubesort": () => cubesort(),
    "Cycle sort": () => cycle_sort(),
    "Exchange sort": () => exchange_sort(),
    "Fluxsort": () => fluxsort_sort(),
    "Gnome sort": () => gnome_sort(),
    "Heap sort": () => heap_sort(),
    "In-place merge sort": () => in_place_merge_sort(),
    "Insertion sort": () => insertion_sort(),
    "Introsort": () => introsort(),
    "Library sort": () => library_sort(),
    "Merge sort": () => merge_sort(),
    "Odd–even sort": () => odd_even_sort(),
    "Patience sort": () => patience_sort(),
    "Quicksort": () => quicksort(),
    "Selection sort": () => selection_sort(),
    "Shellsort": () => shellsort(),
    "Smoothsort": () => smoothsort(),
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

const swap = (arr: number[], i: number, j: number) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

const bubble_sort = async () => {
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
            const condition = is_ascending
            ? data[j] > data[j + 1]
            : data[j] < data[j + 1];
            if (condition){
                swap(data, j, j+1)
                await step()
            }
        }
    }
}

const exchange_sort = async () => {
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i+1; j < data.length; j++) {
            if (data[i] > data[j]){
                swap(data, i, j)
                await step();
            }
        }
        
    }
}

const cycle_sort = async () => {
    const n = data.length;

    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        let item = data[cycleStart];
        let pos = cycleStart;

        for (let i = cycleStart + 1; i < n; i++) {
            if (data[i] < item) pos++;
        }
        if (pos === cycleStart) continue;

        while (item === data[pos]) pos++;

        [item, data[pos]] = [data[pos], item];
        await step();
        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < n; i++) {
                if (data[i] < item) pos++;
            }
            while (item === data[pos]) pos++;

            [item, data[pos]] = [data[pos], item];
            await step();
        }
    }
}

const is_sorted = ():boolean => {
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i] > data[i + 1]){
            return false
        }
    }
    return true;
}

const bogo_sort = async () => {
    while (!is_sorted()) {
        shuffle_data()
        await step();
    }
}

const gnome_sort = async () => {
    let i: number = 0;

    while (i < (data.length)){
        if (i === 0 || data[i] >= data[i-1]) {
            i += 1
        }
        else {
            swap(data, i, i-1)
            i -= 1
            await step();
        }
    }
}

const selection_sort = async () => {
    let min_index:number;

    for (let i = 0; i < data.length - 1; i++) {
        min_index = i;
        for (let j = i+1; j < data.length; j++) {
            if (data[j] < data[min_index]){
                min_index = j
            }
        }
        swap(data, i, min_index)
        await step();
    }
}

const insertion_sort = async () => {
    let key: number;
    let j: number;

    for (let i = 1; i < data.length; i++) {
        key = data[i];
        j = i-1;
        while (j >= 0 && data[j] > key) {
            data[j+1] = data[j]
            j -= 1;
            await step();
        }
        data[j+1] = key
        await step();
    }
}

const odd_even_sort = async () => {
    let sorted: boolean = false;

    while (!sorted) {
        sorted = true;
        for (let i = 1; i < data.length -1; i+=1) {
            if (data[i] > data[i+1]) {
                swap(data, i, i+1)
                sorted = false
                await step();
            }
        }
        for (let i = 0; i < data.length; i+=2) {
            if (data[i] > data[i+1]) {
                swap(data, i, i+1)
                sorted = false
                await step();
            }
        }
    }
}

const cocktail_sort = async () => {
    let start:number = 0;
    let end:number = data.length - 1;
    let swapped:boolean = true;

    while (swapped) {
        swapped = false;
        for (let i = start; i < end; i++) {
            if (data[i] > data[i + 1]) {
                swap(data, i, i + 1);
                swapped = true;
                await step();
            }
        }

        if (!swapped) break;
        swapped = false;
        end--;

        for (let i = end; i > start; i--) {
            if (data[i] < data[i - 1]) {
                swap(data, i, i - 1);
                swapped = true;
                await step();
            }
        }
        start++;
    }
}

const comb_sort = async () => {
    let gap:number = data.length;
    const shrink:number = 1.3;
    let sorted:boolean = false;

    while (!sorted) {
        gap = Math.floor(gap / shrink);

        if (gap <= 1) {
            gap = 1;
            sorted = true;
        }

        for (let i = 0; i + gap < data.length; i++) {
            if (data[i] > data[i + gap]) {
                swap(data, i, i + gap);
                sorted = false;
                await step();
            }
        }
    }
}

const shellsort = async () => {
    let n: number = data.length
    let gap:number = Math.floor(n / 2);
    let tmp: number;
    let j: number;
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            tmp = data[i]
            j = i;
            while (j >= gap && data[j-gap] > tmp) {
                data[j] = data[j-gap]
                j = j - gap;
                await step();
            }
            data[j] = tmp
            await step();
        }
        gap = Math.floor(gap / 2);
    }
}

class TreeNode {
    private value: number
    private left: TreeNode | null
    private right: TreeNode | null

    constructor(value: number) {
        this.value = value
        this.left = null
        this.right = null
    }

    public insert(x: number): void {
        if (x < this.value) {
            if (this.left === null) this.left = new TreeNode(x)
            else this.left.insert(x)
        } else {
            if (this.right === null) this.right = new TreeNode(x)
            else this.right.insert(x)
        }
    }

    public in_order_traverse(): number[] {
        let result: number[] = []
        if (this.left !== null) result.push(...this.left.in_order_traverse())
        result.push(this.value)
        if (this.right !== null) result.push(...this.right.in_order_traverse())
        return result
    }
}

const tree_sort = async () => {
    if (data.length === 0) return
    let root = new TreeNode(data[0])
    for (let i = 1; i < data.length; i++) root.insert(data[i])

    const sorted = root.in_order_traverse()
    for (let i = 0; i < sorted.length; i++) {
        data[i] = sorted[i]
        await step()
    }
}

const quicksort = async (low: number = 0, high: number = data.length - 1) => {
    if (low < high){
        let pi:number = await partition(low, high)
        quicksort(low, pi-1)
        quicksort(pi+1, high)
    }
}

const partition = async (low: number, high: number):Promise<number> => {
    let pivot: number = data[high]
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (data[j] <= pivot){
            i+=1
            swap(data, i, j);
            await step();
        }
    }
    swap(data, i+1, high)
    await step();
    return i+1
}

const merge_sort = async (start = 0, end = data.length - 1): Promise<void> => {
    if (start >= end) return

    const mid = Math.floor((start + end) / 2)
    await merge_sort(start, mid)
    await merge_sort(mid + 1, end)

    const temp: number[] = []
    let i = start, j = mid + 1

    while (i <= mid && j <= end) {
        if (is_ascending ? data[i] <= data[j] : data[i] >= data[j]) {
            temp.push(data[i++])
        } else {
            temp.push(data[j++])
        }
    }

    while (i <= mid) temp.push(data[i++])
    while (j <= end) temp.push(data[j++])

    for (let k = 0; k < temp.length; k++) {
        data[start + k] = temp[k]
        await step()
    }
}

const in_place_merge_sort = async (start:number = 0, end:number = data.length - 1) => {
    if (start >= end) {
        return
    }
    let mid = Math.floor((start+end)/2)
    await in_place_merge_sort(start,mid);
    await in_place_merge_sort(mid+1,end);
    await inplace_merge(start,mid,end);
}

const inplace_merge = async (start: number, mid: number, end: number) => {
    let i: number = start;
    let j: number = mid + 1;
    let value:number;
    let index:number;
    
    while (i <= mid && j <= end) {
        if (data[i] <= data[j]){
            i+=1
        }
        else {
            value = data[j]
            index = j
            while (index != i) {
                data[index] = data[index -1]
                index -= 1
                await step()
            }
            data[i] = value
            i += 1
            mid += 1
            j += 1
            await step()
        }
    }
}

const heap_sort = async () => {
    let n:number = data.length;
    await build_max_heap(n); 

    for (let i = n-1; i >= 1; i--) {
        swap(data, 0, i)
        await step();
        await heapify(0, i)
    }
}

const build_max_heap = async (n:number) => {
    for (let i = Math.floor(n/2)-1; i >= 0; i--) {
        await heapify(i, n);
    }
}

const heapify = async (i: number, heapsize: number) => {
    let largest:number = i;
    let left: number = 2 * i + 1;
    let right: number = 2 * i + 2;

    if (left < heapsize && data[left] > data[largest]){
        largest = left
    }

    if (right < heapsize && data[right] > data[largest]){
        largest = right
    }

    if (largest != i){
        swap(data, i, largest);
        await step();
        await heapify(largest, heapsize)
    }
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

const smoothsort = async () => {
    
}

const cubesort = async () => {
    
}

const crumsort = async () => {
    
}

const fluxsort_sort = async () => {
    
}

const introsort = async () => {
    
}

const block_sort = async () => {
    
}