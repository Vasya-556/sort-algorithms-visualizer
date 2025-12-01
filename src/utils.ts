export const swap = (arr: number[], i: number, j: number) => {
    let tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

export const step = async (count:number=0, sleep: Function, speed:number = 1, display_data: Function) => {
    count++;
    await sleep(speed);
    display_data()
}

export const is_sorted = (data:number[]):boolean => {
    for (let i = 0; i < data.length - 1; i++) {
        if (data[i] > data[i + 1]){
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

export const partition = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, low: number, high: number):Promise<number> => {
    let pivot: number = data[high]
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (data[j] <= pivot){
            i+=1
            swap(data, i, j);
            await step(count, sleep, speed, display_data);
        }
    }
    swap(data, i+1, high)
    await step(count, sleep, speed, display_data);
    return i+1
}

export const inplace_merge = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, start: number, mid: number, end: number) => {
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
                await step(count, sleep, speed, display_data)
            }
            data[i] = value
            i += 1
            mid += 1
            j += 1
            await step(count, sleep, speed, display_data)
        }
    }
}

export const build_max_heap = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, n:number) => {
    for (let i = Math.floor(n/2)-1; i >= 0; i--) {
        await heapify(data, is_ascending, count, sleep, speed, display_data, i, n);
    }
}

export const heapify = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, i: number, heapsize: number) => {
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
        await step(count, sleep, speed, display_data);
        await heapify(data, is_ascending, count, sleep, speed, display_data, largest, heapsize)
    }
}

export class Stack {
    private items:number[]=[];
    push(x:number){this.items.push(x);}
    pop(){return this.items.pop();}
    top(){return this.items[this.items.length-1];}
    is_empty(){return this.items.length===0;}
}

export const replace_min_with_infinity = async (node: TreeNode): Promise<void> => {
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

export const insertion_sort_range = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, start: number, end: number) => {
    for (let i = start + 1; i <= end; i++) {
        let key = data[i];
        let j = i - 1;
        while (j >= start && data[j] > key) {
            data[j + 1] = data[j];
            j--;
            await step(count, sleep, speed, display_data);
        }
        data[j + 1] = key;
        await step(count, sleep, speed, display_data);
    }
}

export const merge_range = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, left: number, mid: number, right: number) => {
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
        await step(count, sleep, speed, display_data);
    }

    while (i < L.length) {
        data[k++] = L[i++];
        await step(count, sleep, speed, display_data);
    }

    while (j < R.length) {
        data[k++] = R[j++];
        await step(count, sleep, speed, display_data);
    }
}


export class CubeNode {
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

export const insertion_sort_bucket = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, bucket: number[]) => {
    for (let i = 1; i < bucket.length; i++) {
        let key = bucket[i];
        let j = i - 1;
        while (j >= 0 && bucket[j] > key) {
            bucket[j + 1] = bucket[j];
            j--;
            await step(count, sleep, speed, display_data);
        }
        bucket[j + 1] = key;
        await step(count, sleep, speed, display_data);
    }
};

export const introsort_sort = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, low:number, high:number, depth:number) => {
    if (high - low <= 16) {
        await insertion_sort_range(data, is_ascending, count, sleep, speed, display_data, low, high)
    }
    else if (depth === 0) {
        await heap_sort_range(data, is_ascending, count, sleep, speed, display_data, low, high)
    }
    else {
        let pivot:number = await partition(data, is_ascending, count, sleep, speed, display_data, low, high)
        await introsort_sort(data, is_ascending, count, sleep, speed, display_data, low, pivot-1, depth-1)
        await introsort_sort(data, is_ascending, count, sleep, speed, display_data, pivot+1, high, depth-1)
    }
}

export const heap_sort_range = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, low:number, high: number) => {
    let n = high - low + 1
    for (let i = Math.floor(n/2)-1; i >= 0; i--) {
        await heapify_introsort(data, is_ascending, count, sleep, speed, display_data, i, n, low)        
    }

    for (let i = n-1; i > 0; i--) {
        swap(data, low, low+i)
        await step(count, sleep, speed, display_data)
        await heapify_introsort(data, is_ascending, count, sleep, speed, display_data, 0, i, low)
    }
}

export const heapify_introsort = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, i: number, n: number, offset:number) => {
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
        await step(count, sleep, speed, display_data)
        await heapify_introsort(data, is_ascending, count, sleep, speed, display_data, largest, n, offset)
    }   
}

export const merge_lists = async (data:number[], is_ascending:boolean=true, count:number=0, sleep: Function, speed:number = 1, display_data: Function, L1: number[], L2: number[]): Promise<number[]> => {
    let merged: number[] = [];
    let i = 0;
    let j = 0;

    while (i < L1.length && j < L2.length) {
        if (L1[i] <= L2[j]) merged.push(L1[i++]);
        else merged.push(L2[j++]);
        await step(count, sleep, speed, display_data);
    }

    while (i < L1.length) {
        merged.push(L1[i++]);
        await step(count, sleep, speed, display_data);
    }

    while (j < L2.length) {
        merged.push(L2[j++]);
        await step(count, sleep, speed, display_data);
    }

    return merged;
};