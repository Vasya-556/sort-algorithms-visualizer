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
    "Timsort": () => timsort(),
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

    public get_value ():number {
        return this.value;
    }

    public get_left (): TreeNode | null {
        return this.left;
    }

    public get_right (): TreeNode | null {
        return this.right;
    }

    public set_value (x: number):void {
        this.value = x;
    }

    public set_left (x: TreeNode | null):void {
        this.left = x;
    }

    public set_right (x: TreeNode | null):void {
        this.right = x;
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

class Stack {
    private items:number[]=[];
    push(x:number){this.items.push(x);}
    pop(){return this.items.pop();}
    top(){return this.items[this.items.length-1];}
    is_empty(){return this.items.length===0;}
}

const patience_sort = async () => {
    let piles:Stack[]=[];

    for(let x of data){
        let placed=false;
        for(let pile of piles){
            if(!pile.is_empty() && pile.top()>=x){
                pile.push(x);
                placed=true;
                await step();
                break;
            }
        }
        if(!placed){
            let p=new Stack();
            p.push(x);
            piles.push(p);
            await step();
        }
    }

    let result:number[]=[];
    while(piles.length>0){
        let min=Infinity,idx=0;
        for(let i=0;i<piles.length;i++){
            let t=piles[i].top();
            if(t<min){min=t;idx=i;}
            await step();
        }
        result.push(piles[idx].pop()!);
        await step();
        if(piles[idx].is_empty()){
            piles.splice(idx,1);
            await step();
        }
    }

    for(let i=0;i<result.length;i++){
        data[i]=result[i];
        await step();
    }
};

const strand_sort = async () => {
    let result:number[] = [];

    while (data.length > 0) {
        let sublist:number[] = [data.shift()!];
        await step();

        let i = 0;
        while (i < data.length) {
            if (data[i] > sublist[sublist.length-1]) {
                sublist.push(data.splice(i,1)[0]);
                await step();
            } 
            else {
                i++;
            }
        }

        result = await merge_lists(result, sublist);
    }

    for (let i = 0; i < result.length; i++) {
        data[i] = result[i];
        await step();
    }
}

const tournament_sort = async () => {
    let nodes: TreeNode[] = data.map(x => new TreeNode(x))

    while (nodes.length > 1) {
        let new_nodes: TreeNode[] = []
        for (let i = 0; i < nodes.length; ) {
            if (i + 1 < nodes.length) {
                let a = nodes[i]
                let b = nodes[i + 1]
                let p = new TreeNode(Math.min(a.get_value(), b.get_value()))
                p.set_left(a)
                p.set_right(b)
                new_nodes.push(p)
                i += 2
            } else {
                new_nodes.push(nodes[i])
                i++
            }
        }
        nodes = new_nodes
    }

    let root = nodes[0]
    let result: number[] = []

    while (root.get_value() !== Infinity) {
        result.push(root.get_value())
        await replace_min_with_infinity(root)
        await step()
    }

    for (let i = 0; i < result.length; i++) {
        data[i] = result[i]
        await step()
    }
}

const replace_min_with_infinity = async (node: TreeNode): Promise<void> => {
    let L = node.get_left()
    let R = node.get_right()

    if (!L && !R) {
        node.set_value(Infinity)
        return
    }

    if (L && (!R || L.get_value() <= R.get_value())) {
        await replace_min_with_infinity(L)
    } else if (R) {
        await replace_min_with_infinity(R)
    }

    let lv = L ? L.get_value() : Infinity
    let rv = R ? R.get_value() : Infinity
    node.set_value(Math.min(lv, rv))
}

const library_sort = async () => {
    let n = data.length * 2;
    let B:(number|null)[] = new Array(n).fill(null);

    for(let x of data){
        let low=0, high=n-1;
        while(low<=high){
            let mid=(low+high)>>1;
            if(B[mid]===null || B[mid]>x) high=mid-1;
            else low=mid+1;
        }
        let p=low;
        while(p<n && B[p]!==null) p++;
        let i=p;
        while(i>low){B[i]=B[i-1];i--;}
        B[low]=x;
        await step();
    }

    let k=0;
    for(let i=0;i<n;i++){
        if(B[i]!==null){
            data[k++]=B[i]!;
            await step();
        }
    }
};

const timsort = async () => {
    let min_run = 32;
    for (let start = 0; start < data.length; start += min_run) {
        let end = Math.min(start + min_run - 1, data.length - 1);
        await insertion_sort_range(start, end);
    }

    let size = min_run;
    while (size < data.length) {
        let left = 0;
        while (left < data.length) {
            let mid = Math.min(left + size - 1, data.length - 1);
            let right = Math.min(left + 2 * size - 1, data.length - 1);
            await merge_range(left, mid, right);
            left += 2 * size;
        }
        size *= 2;
    }
}

const insertion_sort_range = async (start: number, end: number) => {
    for (let i = start + 1; i <= end; i++) {
        let key = data[i];
        let j = i - 1;
        while (j >= start && data[j] > key) {
            data[j + 1] = data[j];
            j--;
            await step();
        }
        data[j + 1] = key;
        await step();
    }
}

const merge_range = async (left: number, mid: number, right: number) => {
    let L = data.slice(left, mid + 1);
    let R = data.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < L.length && j < R.length) {
        if (L[i] <= R[j]) {
            data[k] = L[i++];
        } else {
            data[k] = R[j++];
        }
        k++;
        await step();
    }

    while (i < L.length) {
        data[k++] = L[i++];
        await step();
    }

    while (j < R.length) {
        data[k++] = R[j++];
        await step();
    }
}

const smoothsort = async () => {
    const LP = [
        1, 1, 3, 5, 9, 15, 25, 41, 67, 109, 177, 287, 465, 753,
        1219, 1973, 3193, 5167, 8361, 13529, 21891, 35421, 57313, 92735,
        150049, 242785, 392835, 635621, 1028457, 1664079, 2692537,
        4356617, 7049155, 11405773, 18454929, 29860703, 48315633, 78176337,
        126491971, 204668309, 331160281, 535828591, 866988873
    ];

    const trailingzeroes = (v: number) => {
        const MultiplyDeBruijnBitPosition = [
             0,  1, 28,  2, 29, 14, 24, 3,
            30, 22, 20, 15, 25, 17,  4, 8,
            31, 27, 13, 23, 21, 19, 16, 7,
            26, 12, 18,  6, 11,  5, 10, 9
        ];
        return MultiplyDeBruijnBitPosition[(((v & -v) * 0x077CB531) >>> 27) & 0x1f];
    };

    const sift = async (m: number[], pshift: number, head: number) => {
        let val = m[head];
        while (pshift > 1) {
            const rt = head - 1;
            const lf = head - 1 - LP[pshift - 2];
            if (val >= m[lf] && val >= m[rt]) break;
            if (m[lf] >= m[rt]) {
                m[head] = m[lf];
                head = lf;
                pshift--;
            } else {
                m[head] = m[rt];
                head = rt;
                pshift -= 2;
            }
            await step();
        }
        m[head] = val;
        await step();
    };

    const trinkle = async (m: number[], p: number, pshift: number, head: number, trusty: boolean) => {
        let val = m[head];
        while (p !== 1) {
            const stepson = head - LP[pshift];
            if (m[stepson] <= val) break;
            if (!trusty && pshift > 1) {
                const rt = head - 1;
                const lf = head - 1 - LP[pshift - 2];
                if (m[rt] >= m[stepson] || m[lf] >= m[stepson]) break;
            }
            m[head] = m[stepson];
            head = stepson;
            const trail = trailingzeroes(p & ~1);
            p >>>= trail;
            pshift += trail;
            trusty = false;
            await step();
        }
        if (!trusty) {
            m[head] = val;
            await step();
            await sift(m, pshift, head);
        }
    };

    const sort = async (m: number[]) => {
        let head = 0;
        let p = 1;
        let pshift = 1;

        while (head < m.length) {
            if ((p & 3) === 3) {
                await sift(m, pshift, head);
                p >>>= 2;
                pshift += 2;
            } else {
                if (LP[pshift - 1] > m.length - head) await trinkle(m, p, pshift, head, false);
                else await sift(m, pshift, head);

                if (pshift === 1) {
                    p <<= 1;
                    pshift--;
                } else {
                    p <<= (pshift - 1);
                    pshift = 1;
                }
            }
            p |= 1;
            head++;
        }

        await trinkle(m, p, pshift, head - 1, false);

        while (pshift !== 1 || p !== 1) {
            if (pshift <= 1) {
                const trail = trailingzeroes(p & ~1);
                p >>>= trail;
                pshift += trail;
            } else {
                p <<= 2;
                p ^= 7;
                pshift -= 2;
                await trinkle(m, p >>> 1, pshift + 1, head - LP[pshift] - 1, true);
                await trinkle(m, p, pshift, head - 1, true);
            }
            head--;
        }
        
        for (let i = m.length - 2; i >= 0; i--) {
            if (m[i] > m[i + 1]) {
                [m[i], m[i + 1]] = [m[i + 1], m[i]];
                await step();
            }
        }
    };

    await sort(data);
};

class CubeNode {
    value:number;
    children: CubeNode[];

    constructor(v:number) {
        this.value = v;
        this.children = [];
    }

    insert(x:number) {
        if (x <= this.value) {
            if (!this.children[0]) this.children[0] = new CubeNode(x);
            else this.children[0].insert(x);
            return;
        }

        if (!this.children[1]) this.children[1] = new CubeNode(x);
        else this.children[1].insert(x);
    }

    traverse():number[] {
        let out:number[] = [];

        if (this.children[0]) out.push(...this.children[0].traverse());
        out.push(this.value);
        if (this.children[1]) out.push(...this.children[1].traverse());

        return out;
    }
}

const cubesort = async () => {
    if (data.length < 2) return;

    let root = new CubeNode(data[0]);
    for (let i=1;i<data.length;i++) root.insert(data[i]);

    let result = root.traverse();

    for (let i=0;i<data.length;i++){
        data[i] = result[i];
        await step();
    }
}

const crumsort = async () => {
    let runs = []
    let current_run = [data[0]]

    for (let i = 1; i < data.length; i++) {
        if (data[i] >= current_run[current_run.length - 1]) {
            current_run.push(data[i])
        }
        else {
            runs.push(current_run)
            current_run = [data[i]]
        }
    }
    runs.push(current_run)

    while (runs.length > 1) {
        let new_runs = []
        let i = 0
        while (i < runs.length) {
            if (i + 1 < runs.length) {
                new_runs.push(await merge_lists(runs[i], runs[i+1]))
                i += 2
            }
            else {
                new_runs.push(runs[i])
                i++
            }
        }
        runs = new_runs
    }

    let final = runs[0]
    for (let i = 0; i < data.length; i++) {
        data[i] = final[i]
        await step()
    }
}

const fluxsort_sort = async () => {
    let n = data.length;
    if (n === 0) return;
    let min_val = Math.min(...data);
    let max_val = Math.max(...data);
    let buckets: number[][] = Array.from({ length: n }, () => []);

    for (let i = 0; i < n; i++) {
        let index = Math.floor(((data[i] - min_val) / (max_val - min_val + 1)) * n);
        if (index >= n) index = n - 1;
        buckets[index].push(data[i]);
        await step();
    }

    for (let bucket of buckets) {
        await insertion_sort_bucket(bucket);
    }

    let k = 0;
    for (let bucket of buckets) {
        for (let x of bucket) {
            data[k++] = x;
            await step();
        }
    }
};

const insertion_sort_bucket = async (bucket: number[]) => {
    for (let i = 1; i < bucket.length; i++) {
        let key = bucket[i];
        let j = i - 1;
        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;
            await step();
        }
        bucket[j + 1] = key;
        await step();
    }
};

const introsort = async () => {
    let max_depth = 2 * Math.floor(Math.log2(data.length))
    await introsort_sort(0, data.length - 1, max_depth)
}

const introsort_sort = async (low:number, high:number, depth:number) => {
    if (high - low <= 16) {
        await insertion_sort_range(low, high)
    }
    else if (depth === 0) {
        await heap_sort_range(low, high)
    }
    else {
        let pivot:number = await partition(low, high)
        await introsort_sort(low, pivot-1, depth-1)
        await introsort_sort(pivot+1, high, depth-1)
    }
}

const heap_sort_range = async (low:number, high: number) => {
    let n = high - low + 1
    for (let i = Math.floor(n/2)-1; i >= 0; i--) {
        await heapify_introsort(i, n, low)        
    }

    for (let i = n-1; i > 0; i--) {
        swap(data, low, low+i)
        await step()
        await heapify_introsort(0, i, low)
    }
}

const heapify_introsort = async (i: number, n: number, offset:number) => {
    let largest = i;
    let left = 2*i+1;
    let right = 2*i+2;
    if (left < n && data[offset+left] > data[offset+largest]) {
        largest = left
    }
    if (right < n && data[offset+right] > data[offset+largest]) {
        largest = right
    }
    if (largest !== i) {
        swap(data, offset + i, offset + largest)
        await step()
        await heapify_introsort(largest, n, offset)
    }   
}

const block_sort = async () => {
    let n = data.length;
    let block_size = Math.floor(Math.sqrt(n));
    let blocks: number[][] = [];

    for (let i = 0; i < n; i += block_size) {
        let end = Math.min(i + block_size - 1, n - 1);
        let block = data.slice(i, end + 1);
        await insertion_sort_bucket(block);
        blocks.push(block);
    }

    while (blocks.length > 1) {
        let new_blocks: number[][] = [];
        let i = 0;
        while (i < blocks.length) {
            if (i + 1 < blocks.length) {
                new_blocks.push(await merge_lists(blocks[i], blocks[i + 1]));
                i += 2;
            } else {
                new_blocks.push(blocks[i]);
                i += 1;
            }
        }
        blocks = new_blocks;
    }

    for (let i = 0; i < data.length; i++) {
        data[i] = blocks[0][i];
        await step();
    }
};

const merge_lists = async (L1: number[], L2: number[]): Promise<number[]> => {
    let merged: number[] = [];
    let i = 0;
    let j = 0;

    while (i < L1.length && j < L2.length) {
        if (L1[i] <= L2[j]) merged.push(L1[i++]);
        else merged.push(L2[j++]);
        await step();
    }

    while (i < L1.length) {
        merged.push(L1[i++]);
        await step();
    }

    while (j < L2.length) {
        merged.push(L2[j++]);
        await step();
    }

    return merged;
};