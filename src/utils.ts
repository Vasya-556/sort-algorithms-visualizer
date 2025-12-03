export const compare = (a: number, b: number, asc: boolean) => asc ? a > b : a < b;

export const swap = (arr: number[], i: number, j: number) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

export const step = async (state: { count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    state.count++;
    await sleep(speed);
    display_data()
}

export const is_sorted = (data:number[], is_ascending:boolean=true):boolean => {
    for (let i = 0; i < data.length - 1; i++) {
        if (compare(data[i], data[i+1], is_ascending)){
            return false
        }
    }
    return true;
}

export class TreeNode {
    private value: number
    private left: TreeNode | null
    private right: TreeNode | null

    constructor(value: number) {
        this.value = value
        this.left = null
        this.right = null
    }

    public insert(x: number, asc: boolean): void {
        if (compare(this.value, x, asc)) {
            if (this.left === null) this.left = new TreeNode(x)
            else this.left.insert(x, asc)
        } else {
            if (this.right === null) this.right = new TreeNode(x)
            else this.right.insert(x, asc)
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

export const partition = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, low: number, high: number):Promise<number> => {
    let pivot: number = data[high]
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (!compare(data[j], pivot, is_ascending)){
            i+=1
            swap(data, i, j);
            await step(state, sleep, speed, display_data);
        }
    }
    swap(data, i+1, high)
    await step(state, sleep, speed, display_data);
    return i+1
}

export const inplace_merge = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, start: number, mid: number, end: number) => {
    let i: number = start;
    let j: number = mid + 1;
    let value:number;
    let index:number;
    
    while (i <= mid && j <= end) {
        if (!compare(data[i], data[j], is_ascending)){
            i+=1
        }
        else {
            value = data[j]
            index = j
            while (index != i) {
                data[index] = data[index -1]
                index -= 1
                await step(state, sleep, speed, display_data)
            }
            data[i] = value
            i += 1
            mid += 1
            j += 1
            await step(state, sleep, speed, display_data)
        }
    }
}

export const build_max_heap = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, n:number) => {
    for (let i = Math.floor(n/2)-1; i >= 0; i--) {
        await heapify(data, is_ascending, state, sleep, speed, display_data, i, n);
    }
}

export const heapify = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, i: number, heapsize: number) => {
    let best:number = i;
    let left: number = 2 * i + 1;
    let right: number = 2 * i + 2;

    if (left < heapsize && compare(data[left], data[best], is_ascending)){
        best = left
    }

    if (right < heapsize && compare(data[right], data[best], is_ascending)){
        best = right
    }

    if (best != i){
        swap(data, i, best);
        await step(state, sleep, speed, display_data);
        await heapify(data, is_ascending, state, sleep, speed, display_data, best, heapsize)
    }
}

export class Stack {
    private items:number[]=[];
    
    push(x:number){
        this.items.push(x);
    }
    pop(){
        return this.items.pop();
    }
    top(){
        return this.items[this.items.length-1];
    }
    is_empty(){
        return this.items.length===0;
    }
}

export const replace_min_with_infinity = async (node: TreeNode, is_ascending:boolean=true): Promise<void> => {
    let L = node.get_left()
    let R = node.get_right()

    if (!L && !R) {
        node.set_value(is_ascending ? Infinity : -Infinity)
        return
    }

    if (L && (!R || compare(R.get_value(), L.get_value(), is_ascending))) {
        await replace_min_with_infinity(L, is_ascending)
    } else if (R) {
        await replace_min_with_infinity(R, is_ascending)
    }

    let lv = L ? L.get_value() : (is_ascending ? Infinity : -Infinity)
    let rv = R ? R.get_value() : (is_ascending ? Infinity : -Infinity)
    node.set_value(is_ascending ? Math.min(lv, rv) : Math.max(lv, rv))
}

export const insertion_sort_range = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, start: number, end: number) => {
    for (let i = start + 1; i <= end; i++) {
        let key = data[i];
        let j = i - 1;
        while (j >= start && compare(data[j], key, is_ascending)) {
            data[j + 1] = data[j];
            j--;
            await step(state, sleep, speed, display_data);
        }
        data[j + 1] = key;
        await step(state, sleep, speed, display_data);
    }
}

export const merge_range = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, left: number, mid: number, right: number) => {
    let L = data.slice(left, mid + 1);
    let R = data.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < L.length && j < R.length) {
        if (compare(R[j], L[i], is_ascending)) {
            data[k] = L[i++];
        } else {
            data[k] = R[j++];
        }
        k++;
        await step(state, sleep, speed, display_data);
    }

    while (i < L.length) {
        data[k++] = L[i++];
        await step(state, sleep, speed, display_data);
    }

    while (j < R.length) {
        data[k++] = R[j++];
        await step(state, sleep, speed, display_data);
    }
}

export class CubeNode {
    value:number;
    is_ascending:boolean=true;
    children: CubeNode[];

    constructor(v:number, is_ascending:boolean=true) {
        this.value = v;
        this.is_ascending = is_ascending
        this.children = [];
    }

    insert(x:number) {
        if (compare(this.value, x, this.is_ascending)) {
            if (!this.children[0]) {
                this.children[0] = new CubeNode(x, this.is_ascending)
            }
            else {
                this.children[0].insert(x)
            }
            return;
        }

        if (!this.children[1]) {
            this.children[1] = new CubeNode(x, this.is_ascending)
        }
        else {
            this.children[1].insert(x)
        }
    }

    traverse():number[] {
        let out:number[] = [];

        if (this.children[0]) {
            out.push(...this.children[0].traverse())
        }
        out.push(this.value);
        if (this.children[1]) {
            out.push(...this.children[1].traverse())
        }

        return out;
    }
}

export const insertion_sort_bucket = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, bucket: number[]) => {
    for (let i = 1; i < bucket.length; i++) {
        let key = bucket[i];
        let j = i - 1;
        while (j >= 0 && compare(key, bucket[j], is_ascending)) {
            bucket[j + 1] = bucket[j];
            j--;
            await step(state, sleep, speed, display_data);
        }
        bucket[j + 1] = key;
        await step(state, sleep, speed, display_data);
    }
};

export const introsort_sort = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, low:number, high:number, depth:number) => {
    if (high - low <= 16) {
        await insertion_sort_range(data, is_ascending, state, sleep, speed, display_data, low, high)
    }
    else if (depth === 0) {
        await heap_sort_range(data, is_ascending, state, sleep, speed, display_data, low, high)
    }
    else {
        let pivot:number = await partition(data, is_ascending, state, sleep, speed, display_data, low, high)
        await introsort_sort(data, is_ascending, state, sleep, speed, display_data, low, pivot-1, depth-1)
        await introsort_sort(data, is_ascending, state, sleep, speed, display_data, pivot+1, high, depth-1)
    }
}

export const heap_sort_range = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, low:number, high: number) => {
    let n = high - low + 1
    for (let i = Math.floor(n/2)-1; i >= 0; i--) {
        await heapify_introsort(data, is_ascending, state, sleep, speed, display_data, i, n, low)        
    }

    for (let i = n-1; i > 0; i--) {
        swap(data, low, low+i)
        await step(state, sleep, speed, display_data)
        await heapify_introsort(data, is_ascending, state, sleep, speed, display_data, 0, i, low)
    }
}

export const heapify_introsort = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, i: number, n: number, offset:number) => {
    let largest = i;
    let left = 2*i+1;
    let right = 2*i+2;
    if (left < n && compare(data[offset+largest], data[offset+left], is_ascending)) {
        largest = left
    }
    if (right < n && compare(data[offset+largest], data[offset+right], is_ascending)) {

        largest = right
    }
    if (largest !== i) {
        swap(data, offset + i, offset + largest)
        await step(state, sleep, speed, display_data)
        await heapify_introsort(data, is_ascending, state, sleep, speed, display_data, largest, n, offset)
    }   
}

export const merge_lists = async (data:number[], is_ascending:boolean=true, state: { count: number}, sleep: Function, speed:number = 1, display_data: Function, L1: number[], L2: number[]): Promise<number[]> => {
    let merged: number[] = [];
    let i = 0;
    let j = 0;

    while (i < L1.length && j < L2.length) {
        if (!compare(L1[i], L2[j], is_ascending)) {
            merged.push(L1[i++])
        }
        else {
            merged.push(L2[j++])
        }
        await step(state, sleep, speed, display_data);
    }

    while (i < L1.length) {
        merged.push(L1[i++]);
        await step(state, sleep, speed, display_data);
    }

    while (j < L2.length) {
        merged.push(L2[j++]);
        await step(state, sleep, speed, display_data);
    }

    return merged;
};

export const insertion_sort_block = async (data: number[], start: number, end: number, is_ascending: boolean, state: { count: number }, sleep: Function, speed: number, display_data: Function) => {
    for (let i = start + 1; i < end; i++) {
        let key = data[i];
        let j = i - 1;
        while (j >= start && (is_ascending ? key < data[j] : key > data[j])) {
            data[j + 1] = data[j];
            j--;
            await step(state, sleep, speed, display_data);
        }
        data[j + 1] = key;
        await step(state, sleep, speed, display_data);
    }
};

export const merge_blocks = async (data: number[], start: number, mid: number, end: number, is_ascending: boolean, state: { count: number }, sleep: Function, speed: number, display_data: Function) => {
    let left = start, right = mid;
    let temp: number[] = [];
    while (left < mid && right < end) {
        if (is_ascending ? data[left] <= data[right] : data[left] >= data[right]) {
            temp.push(data[left++]);
        } else {
            temp.push(data[right++]);
        }
        await step(state, sleep, speed, display_data);
    }
    while (left < mid) { temp.push(data[left++]); await step(state, sleep, speed, display_data); }
    while (right < end) { temp.push(data[right++]); await step(state, sleep, speed, display_data); }
    for (let i = 0; i < temp.length; i++) {
        data[start + i] = temp[i];
        await step(state, sleep, speed, display_data);
    }
};