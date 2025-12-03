import { 
    compare,
    swap, 
    step, 
    is_sorted, 
    TreeNode, 
    partition, 
    inplace_merge, 
    build_max_heap, 
    heapify, 
    Stack, 
    replace_min_with_infinity, 
    insertion_sort_range, 
    merge_range, 
    CubeNode, 
    insertion_sort_bucket, 
    introsort_sort, 
    merge_lists, 
    insertion_sort_block, 
    merge_blocks
} from "./utils.js";

export const bubble_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = 0; j < data.length - 1 - i; j++) {
            if (compare(data[j], data[j+1], is_ascending)){
                swap(data, j, j+1)
                await step(state, sleep, speed, display_data)
            }
        }
    }
}

export const exchange_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    for (let i = 0; i < data.length - 1; i++) {
        for (let j = i+1; j < data.length; j++) {
            if (compare(data[i], data[j], is_ascending)){
                swap(data, i, j)
                await step(state, sleep, speed, display_data);
            }
        }
        
    }
}

export const cycle_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    const n = data.length;

    for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
        let item = data[cycleStart];
        let pos = cycleStart;

        for (let i = cycleStart + 1; i < n; i++) {
            if (compare(item, data[i], is_ascending)) pos++;
        }
        if (pos === cycleStart) continue;

        while (item === data[pos]) pos++;

        [item, data[pos]] = [data[pos], item];
        await step(state, sleep, speed, display_data);
        while (pos !== cycleStart) {
            pos = cycleStart;
            for (let i = cycleStart + 1; i < n; i++) {
                if (compare(item, data[i], is_ascending)) pos++;
            }
            while (item === data[pos]) pos++;

            [item, data[pos]] = [data[pos], item];
            await step(state, sleep, speed, display_data);
        }
    }
}

export const bogo_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function, shuffle_data: Function) => {
    while (!is_sorted(data, is_ascending)) {
        shuffle_data()
        await step(state, sleep, speed, display_data);
    }
}

export const gnome_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let i: number = 0;

    while (i < (data.length)){
        if (i === 0 || !compare(data[i-1], data[i], is_ascending)) {
            i += 1
        }
        else {
            swap(data, i, i-1)
            i -= 1
            await step(state, sleep, speed, display_data);
        }
    }
}

export const selection_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let min_index:number;

    for (let i = 0; i < data.length - 1; i++) {
        min_index = i;
        for (let j = i+1; j < data.length; j++) {
            if (compare(data[min_index], data[j], is_ascending)){
                min_index = j
            }
        }
        swap(data, i, min_index)
        await step(state, sleep, speed, display_data);
    }
}

export const insertion_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let key: number;
    let j: number;

    for (let i = 1; i < data.length; i++) {
        key = data[i];
        j = i-1;
        while (j >= 0 && compare(data[j], key, is_ascending)) {
            data[j+1] = data[j]
            j -= 1;
            await step(state, sleep, speed, display_data);
        }
        data[j+1] = key
        await step(state, sleep, speed, display_data);
    }
}

export const odd_even_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let sorted: boolean = false;

    while (!sorted) {
        sorted = true;
        for (let i = 1; i < data.length -1; i+=1) {
            if (compare(data[i], data[i+1], is_ascending)) {
                swap(data, i, i+1)
                sorted = false
                await step(state, sleep, speed, display_data);
            }
        }
        for (let i = 0; i < data.length; i+=2) {
            if (compare(data[i], data[i+1], is_ascending)) {
                swap(data, i, i+1)
                sorted = false
                await step(state, sleep, speed, display_data);
            }
        }
    }
}

export const cocktail_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let start:number = 0;
    let end:number = data.length - 1;
    let swapped:boolean = true;

    while (swapped) {
        swapped = false;
        for (let i = start; i < end; i++) {
            if (compare(data[i], data[i+1], is_ascending)) {
                swap(data, i, i + 1);
                swapped = true;
                await step(state, sleep, speed, display_data);
            }
        }

        if (!swapped) break;
        swapped = false;
        end--;

        for (let i = end; i > start; i--) {
            if (compare(data[i-1], data[i], is_ascending)) {
                swap(data, i, i - 1);
                swapped = true;
                await step(state, sleep, speed, display_data);
            }
        }
        start++;
    }
}

export const comb_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
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
            if (compare(data[i], data[i+gap], is_ascending)) {
                swap(data, i, i + gap);
                sorted = false;
                await step(state, sleep, speed, display_data);
            }
        }
    }
}

export const shellsort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let n: number = data.length
    let gap:number = Math.floor(n / 2);
    let tmp: number;
    let j: number;
    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            tmp = data[i]
            j = i;
            while (j >= gap && compare(data[j-gap], tmp, is_ascending)) {
                data[j] = data[j-gap]
                j = j - gap;
                await step(state, sleep, speed, display_data);
            }
            data[j] = tmp
            await step(state, sleep, speed, display_data);
        }
        gap = Math.floor(gap / 2);
    }
}

export const tree_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    if (data.length === 0) return
    let root = new TreeNode(data[0])
    for (let i = 1; i < data.length; i++) root.insert(data[i], is_ascending)

    const sorted = root.in_order_traverse()
    for (let i = 0; i < sorted.length; i++) {
        data[i] = sorted[i]
        await step(state, sleep, speed, display_data)
    }
}

export const quicksort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function, low: number = 0, high: number = data.length - 1) => {
    if (low < high){
        let pi:number = await partition(data, is_ascending, state, sleep, speed, display_data, low, high)
        quicksort(data, is_ascending, state, sleep, speed, display_data, low, pi-1)
        quicksort(data, is_ascending, state, sleep, speed, display_data, pi+1, high)
    }
}

export const merge_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function, start = 0, end = data.length - 1): Promise<void> => {
    if (start >= end) return

    const mid = Math.floor((start + end) / 2)
    await merge_sort(data, is_ascending, state, sleep, speed, display_data, start, mid)
    await merge_sort(data, is_ascending, state, sleep, speed, display_data, mid + 1, end)

    const temp: number[] = []
    let i = start, j = mid + 1

    while (i <= mid && j <= end) {
        if (!compare(data[i], data[j], is_ascending)) {
            temp.push(data[i++])
        } else {
            temp.push(data[j++])
        }
    }

    while (i <= mid) temp.push(data[i++])
    while (j <= end) temp.push(data[j++])

    for (let k = 0; k < temp.length; k++) {
        data[start + k] = temp[k]
        await step(state, sleep, speed, display_data)
    }
}

export const in_place_merge_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function, start:number = 0, end:number = data.length - 1) => {
    if (start >= end) {
        return
    }
    let mid = Math.floor((start+end)/2)
    await in_place_merge_sort(data, is_ascending, state, sleep, speed, display_data, start,mid);
    await in_place_merge_sort(data, is_ascending, state, sleep, speed, display_data, mid+1,end);
    await inplace_merge(data, is_ascending, state, sleep, speed, display_data, start,mid,end);
}

export const heap_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let n:number = data.length;
    await build_max_heap(data, is_ascending, state, sleep, speed, display_data, n); 

    for (let i = n-1; i >= 1; i--) {
        swap(data, 0, i)
        await step(state, sleep, speed, display_data);
        await heapify(data, is_ascending, state, sleep, speed, display_data, 0, i)
    }
}

export const patience_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let piles: Stack[] = [];

    for (let x of data) {
        let placed = false;
        for (let pile of piles) {
            if (!pile.is_empty() && !compare(x, pile.top(), is_ascending)) {
                pile.push(x);
                placed = true;
                await step(state, sleep, speed, display_data);
                break;
            }
        }
        if (!placed) {
            let new_pile = new Stack();
            new_pile.push(x);
            piles.push(new_pile);
            await step(state, sleep, speed, display_data);
        }
    }

    let result: number[] = [];
    while (piles.length > 0) {
        let selected_idx = 0;
        let selected_val = piles[0].top();
        for (let i = 0; i < piles.length; i++) {
            let t = piles[i].top();
            if (compare(selected_val, t, is_ascending)) {
                selected_val = t;
                selected_idx = i;
            }
            await step(state, sleep, speed, display_data);
        }
        result.push(piles[selected_idx].pop()!);
        await step(state, sleep, speed, display_data);
        if (piles[selected_idx].is_empty()) {
            piles.splice(selected_idx, 1);
            await step(state, sleep, speed, display_data);
        }
    }

    for (let i = 0; i < result.length; i++) {
        data[i] = result[i];
        await step(state, sleep, speed, display_data);
    }
};

export const strand_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let result:number[] = [];

    while (data.length > 0) {
        let sublist:number[] = [data.shift()!];
        await step(state, sleep, speed, display_data);

        let i = 0;
        while (i < data.length) {
            if (compare(data[i], sublist[sublist.length-1], is_ascending)) {
                sublist.push(data.splice(i,1)[0]);
                await step(state, sleep, speed, display_data);
            } 
            else {
                i++;
            }
        }

        result = await merge_lists(data, is_ascending, state, sleep, speed, display_data, result, sublist);
    }

    for (let i = 0; i < result.length; i++) {
        data[i] = result[i];
        await step(state, sleep, speed, display_data);
    }
}

export const tournament_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let nodes: TreeNode[] = data.map(x => new TreeNode(x))

    while (nodes.length > 1) {
        let new_nodes: TreeNode[] = []
        for (let i = 0; i < nodes.length; ) {
            if (i + 1 < nodes.length) {
                let a = nodes[i]
                let b = nodes[i + 1]
                let p = new TreeNode(is_ascending ? Math.min(a.get_value(), b.get_value()) : Math.max(a.get_value(), b.get_value()))
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

    while (root.get_value() !== (is_ascending ? Infinity : -Infinity)) {
        result.push(root.get_value())
        await replace_min_with_infinity(root, is_ascending)
        await step(state, sleep, speed, display_data)
    }

    for (let i = 0; i < result.length; i++) {
        data[i] = result[i]
        await step(state, sleep, speed, display_data)
    }
}

export const library_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let n = data.length * 2;
    let B:(number|null)[] = new Array(n).fill(null);

    for(let x of data){
        let low=0, high=n-1;
        while(low<=high){
            let mid=(low+high)>>1;
            if(B[mid]===null || compare(B[mid], x, is_ascending)) {
                high=mid-1;
            }else {
                low=mid+1;
            }
        }
        let p=low;
        while(p<n && B[p]!==null){
            p++
        };
        let i=p;
        while(i>low){
            B[i]=B[i-1];i--;
        }
        B[low]=x;
        await step(state, sleep, speed, display_data);
    }

    let k=0;
    for(let i=0;i<n;i++){
        if(B[i]!==null){
            data[k++]=B[i]!;
            await step(state, sleep, speed, display_data);
        }
    }
};

export const timsort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let min_run = 32;
    for (let start = 0; start < data.length; start += min_run) {
        let end = Math.min(start + min_run - 1, data.length - 1);
        await insertion_sort_range(data, is_ascending, state, sleep, speed, display_data, start, end);
    }

    let size = min_run;
    while (size < data.length) {
        let left = 0;
        while (left < data.length) {
            let mid = Math.min(left + size - 1, data.length - 1);
            let right = Math.min(left + 2 * size - 1, data.length - 1);
            await merge_range(data, is_ascending, state, sleep, speed, display_data, left, mid, right);
            left += 2 * size;
        }
        size *= 2;
    }
}

export const smoothsort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
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
            if (!compare(m[lf], val, is_ascending) && !compare(m[rt], val, is_ascending)) {
                break;
            }
            if (compare(m[lf], m[rt], is_ascending)) {
                m[head] = m[lf];
                head = lf;
                pshift--;
            } else {
                m[head] = m[rt];
                head = rt;
                pshift -= 2;
            }
            await step(state, sleep, speed, display_data);
        }
        m[head] = val;
        await step(state, sleep, speed, display_data);
    };

    const trinkle = async (m: number[], p: number, pshift: number, head: number, trusty: boolean) => {
        let val = m[head];
        while (p !== 1) {
            const stepson = head - LP[pshift];
            if (!compare(m[stepson], val, is_ascending)) {
                break;
            }
            if (!trusty && pshift > 1) {
                const rt = head - 1;
                const lf = head - 1 - LP[pshift - 2];
                if (compare(m[rt], m[stepson], is_ascending) || compare(m[lf], m[stepson], is_ascending)) {
                    break;
                }
            }
            m[head] = m[stepson];
            head = stepson;
            const trail = trailingzeroes(p & ~1);
            p >>>= trail;
            pshift += trail;
            trusty = false;
            await step(state, sleep, speed, display_data);
        }
        if (!trusty) {
            m[head] = val;
            await step(state, sleep, speed, display_data);
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
                if (LP[pshift - 1] > m.length - head) {
                    await trinkle(m, p, pshift, head, false);
                } else {
                    await sift(m, pshift, head);
                }

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

        let sorted = false;
        while (!sorted) {
            sorted = true;
            for (let i = 0; i < m.length - 1; i++) {
                if (compare(m[i], m[i + 1], is_ascending)) {
                    const t = m[i];
                    m[i] = m[i + 1];
                    m[i + 1] = t;
                    sorted = false;
                    await step(state, sleep, speed, display_data);
                }
            }
        }
    };

    await sort(data);
};

export const cubesort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    if (data.length < 2) return;

    let root = new CubeNode(data[0], is_ascending);
    for (let i=1;i<data.length;i++) root.insert(data[i]);

    let result = root.traverse();

    for (let i=0;i<data.length;i++){
        data[i] = result[i];
        await step(state, sleep, speed, display_data);
    }
}

export const crumsort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let runs = []
    let current_run = [data[0]]

    for (let i = 1; i < data.length; i++) {
        if (compare(data[i], current_run[current_run.length - 1], is_ascending)) {
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
                new_runs.push(await merge_lists(data, is_ascending, state, sleep, speed, display_data, runs[i], runs[i+1]))
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
        await step(state, sleep, speed, display_data)
    }
}

export const fluxsort_sort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let n = data.length;
    if (n === 0) 
        return;
    let min_val = Math.min(...data);
    let max_val = Math.max(...data);
    let buckets: number[][] = Array.from({ length: n }, () => []);

    for (let i = 0; i < n; i++) {
        let ratio = (data[i] - min_val) / (max_val - min_val + 1);
        let index = Math.floor(ratio * n);
        if (index >= n){
            index = n - 1;
        }
        if (index >= n) {
            index = n - 1
        };
        buckets[index].push(data[i]);
        await step(state, sleep, speed, display_data);
    }

    for (let bucket of buckets) {
        await insertion_sort_bucket(data, is_ascending, state, sleep, speed, display_data, bucket);
    }

    let k = 0;
    let bucket_order = is_ascending ? buckets : [...buckets].reverse();

    for (let bucket of bucket_order) {
        for (let x of bucket) {
            data[k++] = x;
            await step(state, sleep, speed, display_data);
        }
    }
};

export const introsort = async (data:number[], is_ascending:boolean=true, state:{ count: number}, sleep: Function, speed:number = 1, display_data: Function) => {
    let max_depth = 2 * Math.floor(Math.log2(data.length))
    await introsort_sort(data, is_ascending, state, sleep, speed, display_data, 0, data.length - 1, max_depth)
}

export const block_sort = async (data: number[], is_ascending: boolean = true, state: { count: number }, sleep: Function, speed: number = 1, display_data: Function) => {
    let n = data.length;
    if (n === 0) { 
        return; 
    }
    let block_size = Math.floor(Math.sqrt(n));

    let starts: number[] = [];
    for (let start = 0; start < n; start += block_size) {
        let end = Math.min(start + block_size, n);
        await insertion_sort_block(data, start, end, is_ascending, state, sleep, speed, display_data);
        starts.push(start);
    }
    starts.push(n);

    while (starts.length > 2) {
        let new_starts: number[] = [starts[0]];
        for (let i = 0; i < starts.length - 1; i += 2) {
            if (i + 2 < starts.length) {
                await merge_blocks(data, starts[i], starts[i + 1], starts[i + 2], is_ascending, state, sleep, speed, display_data);
                new_starts.push(starts[i + 2]);
            } else {
                new_starts.push(starts[i + 2] || starts[i + 1]);
            }
        }
        starts = new_starts;
    }
};