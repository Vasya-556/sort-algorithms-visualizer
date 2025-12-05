import {
    bubble_sort, block_sort, bogo_sort, cocktail_sort, comb_sort,
    crumsort, cubesort, cycle_sort, exchange_sort, fluxsort_sort,
    gnome_sort, heap_sort, in_place_merge_sort, insertion_sort,
    introsort, library_sort, merge_sort, odd_even_sort, patience_sort,
    quicksort, selection_sort, shellsort, smoothsort, strand_sort,
    timsort, tournament_sort, tree_sort
} from "../src/sorts";

const dummy_sleep = async () => {};
const dummy_display = () => {};

const arrays = {
    arr1: [ 1, 1, 3, 5, 5, 6, 8, 9, 9, 10 ],
    arr2: [ 9, 1, 10, 2, 8, 6, 5, 4, 7, 3 ],
    arr3: [ 59, 81, 61, 41, 95, 32, 17, 13, 51, 96, 78, 77, 28, 27, 67, 49, 41, 63, 100, 51, 88, 30, 77, 4, 12, 70, 89, 98, 25, 51, 88, 2, 3, 16, 22, 13, 87, 33, 13, 37, 49, 85, 23, 11, 2, 9, 6, 64, 67, 38, 5, 86, 88, 57, 87, 11, 80, 41, 6, 45, 61, 54, 82, 96, 90, 12, 9, 2, 42, 5, 47, 39, 3, 18, 40, 15, 94, 4, 100, 82, 22, 71, 86, 17, 28, 58, 87, 51, 1, 29, 47, 36, 63, 51, 96, 27, 30, 42, 79, 2 ],
    arr4: [ 31, 10, 65, 45, 77, 51, 9, 40, 38, 50, 85, 90, 41, 52, 49, 2, 11, 76, 12, 16, 34, 70, 54, 98, 67, 86, 4, 99, 6, 26, 66, 96, 73, 17, 21, 59, 91, 95, 87, 97, 8, 100, 25, 78, 20, 13, 56, 28, 69, 32, 30, 15, 22, 36, 7, 5, 55, 81, 24, 89, 3, 88, 72, 58, 33, 19, 37, 23, 68, 75, 47, 1, 42, 61, 44, 35, 94, 83, 60, 84, 82, 80, 18, 93, 71, 92, 14, 27, 39, 57, 63, 48, 79, 29, 74, 53, 43, 46, 62, 64 ],
    arr5: [ 138, 161, 291, 432, 74, 194, 122, 171, 439, 104, 425, 364, 481, 431, 267, 161, 177, 394, 140, 148, 25, 320, 275, 232, 262, 266, 29, 55, 216, 476, 263, 88, 186, 91, 35, 38, 451, 490, 126, 229, 389, 240, 233, 371, 237, 495, 207, 143, 404, 174, 129, 27, 401, 49, 229, 142, 33, 440, 276, 401, 410, 286, 87, 40, 182, 333, 335, 393, 96, 171, 150, 121, 107, 405, 163, 173, 414, 21, 392, 156, 307, 141, 197, 154, 293, 290, 156, 167, 240, 5, 387, 437, 64, 407, 465, 88, 224, 422, 367, 311, 331, 205, 422, 143, 186, 309, 217, 98, 24, 86, 249, 52, 353, 169, 133, 393, 476, 251, 49, 204, 266, 383, 125, 137, 486, 487, 280, 323, 318, 23, 10, 132, 4, 199, 112, 49, 254, 122, 12, 348, 214, 63, 267, 260, 62, 366, 398, 258, 320, 496, 419, 175, 483, 472, 486, 23, 468, 344, 57, 124, 423, 150, 137, 71, 223, 56, 233, 8, 377, 456, 481, 280, 5, 263, 223, 112, 449, 340, 84, 91, 417, 346, 117, 2, 138, 63, 271, 40, 31, 387, 204, 169, 23, 411, 216, 79, 282, 276, 62, 128, 445, 4, 460, 435, 334, 351, 364, 457, 340, 295, 288, 87, 448, 131, 310, 313, 319, 392, 398, 62, 316, 82, 258, 175, 211, 29, 42, 325, 45, 284, 374, 495, 314, 218, 148, 482, 33, 319, 464, 476, 400, 379, 399, 51, 487, 454, 7, 61, 312, 461, 325, 212, 458, 374, 272, 492, 234, 355, 366, 391, 341, 230, 255, 432, 499, 407, 58, 466, 189, 440, 174, 222, 242, 250, 112, 51, 426, 360, 393, 420, 206, 126, 359, 234, 135, 252, 446, 136, 158, 259, 91, 92, 220, 331, 21, 173, 396, 318, 327, 188, 158, 466, 244, 37, 209, 358, 453, 431, 74, 11, 301, 199, 432, 67, 423, 214, 207, 196, 117, 49, 352, 237, 114, 75, 292, 204, 421, 82, 257, 456, 77, 457, 348, 130, 231, 350, 89, 46, 403, 463, 423, 136, 141, 36, 317, 395, 463, 33, 96, 472, 389, 115, 464, 167, 472, 358, 244, 489, 136, 438, 216, 354, 50, 119, 235, 145, 288, 401, 490, 73, 113, 420, 136, 288, 39, 21, 221, 361, 377, 304, 465, 209, 311, 483, 455, 392, 126, 286, 94, 356, 199, 135, 13, 226, 27, 275, 66, 454, 47, 121, 419, 460, 377, 485, 109, 471, 190, 486, 304, 187, 319, 275, 362, 337, 1, 312, 329, 101, 335, 456, 305, 305, 385, 412, 65, 419, 124, 288, 180, 372, 481, 358, 159, 134, 492, 200, 473, 340, 5, 243, 76, 98, 276, 321, 497, 402, 470, 307, 347, 64, 369, 491, 438, 500, 305, 219, 56, 212, 14, 120, 91, 31, 38, 62, 11, 118, 475, 338, 258, 345, 114, 361, 378, 372, 151, 327, 284, 194, 55, 236, 9, 454, 403, 132, 157, 66, 72, 137, 396, 365, 96, 181, 388, 259, 493, 221, 409, 355, 124, 26 ],
    arr6: [ 297, 340, 293, 401, 186, 404, 367, 343, 292, 164, 422, 252, 432, 105, 483, 151, 286, 171, 458, 111, 466, 112, 48, 341, 298, 459, 82, 58, 180, 310, 241, 68, 40, 299, 327, 485, 329, 223, 388, 270, 86, 253, 333, 475, 308, 454, 465, 41, 242, 136, 437, 225, 259, 469, 139, 474, 407, 452, 260, 249, 420, 200, 119, 51, 302, 137, 332, 342, 250, 498, 75, 319, 406, 296, 210, 216, 421, 39, 193, 434, 479, 165, 175, 255, 390, 363, 376, 397, 150, 188, 9, 176, 25, 228, 360, 494, 278, 488, 323, 60, 277, 226, 134, 272, 94, 71, 145, 379, 190, 67, 392, 23, 264, 149, 358, 131, 245, 366, 468, 417, 56, 125, 231, 301, 447, 304, 208, 209, 413, 257, 163, 271, 290, 258, 238, 183, 500, 416, 80, 159, 497, 331, 435, 202, 399, 178, 321, 448, 212, 449, 496, 66, 368, 311, 463, 446, 346, 276, 132, 236, 477, 472, 288, 337, 161, 152, 113, 38, 26, 158, 375, 104, 143, 438, 157, 146, 443, 439, 239, 34, 204, 174, 227, 482, 418, 2, 126, 480, 3, 387, 42, 96, 124, 73, 372, 229, 84, 81, 251, 33, 29, 306, 10, 316, 185, 317, 246, 101, 147, 274, 266, 182, 334, 17, 344, 199, 155, 167, 280, 365, 197, 499, 307, 142, 371, 490, 440, 400, 467, 220, 35, 69, 169, 83, 5, 88, 43, 72, 28, 470, 114, 20, 381, 85, 89, 61, 451, 385, 318, 419, 6, 108, 430, 373, 31, 495, 336, 130, 481, 70, 284, 203, 217, 237, 309, 172, 478, 93, 102, 409, 21, 138, 464, 166, 116, 211, 391, 460, 402, 314, 455, 65, 120, 92, 445, 405, 4, 256, 364, 198, 91, 123, 357, 345, 453, 118, 282, 177, 201, 330, 408, 221, 289, 160, 315, 37, 393, 173, 395, 141, 194, 411, 36, 265, 74, 383, 361, 107, 77, 57, 222, 103, 192, 350, 54, 461, 377, 129, 263, 462, 267, 27, 13, 207, 269, 370, 133, 214, 384, 295, 153, 457, 115, 179, 425, 414, 338, 24, 219, 206, 215, 195, 87, 135, 351, 156, 389, 273, 285, 11, 324, 355, 52, 436, 456, 22, 303, 262, 335, 127, 55, 79, 493, 90, 109, 95, 268, 144, 49, 423, 442, 348, 374, 424, 426, 53, 247, 76, 326, 170, 491, 47, 484, 184, 471, 224, 205, 353, 235, 486, 305, 16, 189, 140, 248, 59, 300, 8, 487, 230, 244, 428, 99, 354, 415, 234, 398, 347, 328, 64, 396, 148, 261, 162, 325, 62, 45, 473, 312, 352, 427, 1, 191, 18, 14, 294, 444, 410, 30, 254, 441, 450, 128, 412, 380, 243, 63, 98, 362, 369, 394, 281, 233, 283, 181, 154, 349, 196, 100, 44, 403, 359, 97, 78, 15, 356, 476, 291, 122, 213, 279, 431, 433, 50, 46, 492, 322, 378, 232, 187, 429, 386, 121, 106, 19, 382, 7, 110, 32, 320, 339, 117, 218, 287, 313, 168, 275, 12, 240, 489 ],
};


const algorithms: Record<string, (data: number[], is_ascending: boolean) => Promise<void>> = {
    "Bubble sort": (data, is_ascending) => bubble_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Block sort": (data, is_ascending) => block_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    // "Bogo sort": (data, is_ascending) => bogo_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display, () => {}),
    "Cocktail shaker sort": (data, is_ascending) => cocktail_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Comb sort": (data, is_ascending) => comb_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Crumsort": (data, is_ascending) => crumsort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Cubesort": (data, is_ascending) => cubesort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Cycle sort": (data, is_ascending) => cycle_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Exchange sort": (data, is_ascending) => exchange_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),    
    "Fluxsort": (data, is_ascending) => fluxsort_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Gnome sort": (data, is_ascending) => gnome_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Heap sort": (data, is_ascending) => heap_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "In-place merge sort": (data, is_ascending) => in_place_merge_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Insertion sort": (data, is_ascending) => insertion_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Introsort": (data, is_ascending) => introsort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Library sort": (data, is_ascending) => library_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Merge sort": (data, is_ascending) => merge_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Odd–even sort": (data, is_ascending) => odd_even_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Patience sort": (data, is_ascending) => patience_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Quicksort": (data, is_ascending) => quicksort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Selection sort": (data, is_ascending) => selection_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Shellsort": (data, is_ascending) => shellsort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Smoothsort": (data, is_ascending) => smoothsort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Strand sort": (data, is_ascending) => strand_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Timsort": (data, is_ascending) => timsort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Tournament sort": (data, is_ascending) => tournament_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
    "Tree sort": (data, is_ascending) => tree_sort(data, is_ascending, {count: 0}, dummy_sleep, 0, dummy_display),
};

Object.entries(algorithms).forEach(([name, sortFn]) => {
    describe(`Test ${name}`, () => {
        Object.entries(arrays).forEach(([arrName, arrOriginal]) => {
            test(`${arrName} ascending`, async () => {
                const arr = [...arrOriginal];
                const expected = [...arrOriginal].sort((a,b) => a-b);
                await sortFn(arr, true);
                if (JSON.stringify(arr) !== JSON.stringify(expected)) {
                    throw new Error(`${name} failed on ${arrName} ascending`);
                }
            });

            test(`${arrName} descending`, async () => {
                const arr = [...arrOriginal];
                const expected = [...arrOriginal].sort((a,b) => b-a);
                await sortFn(arr, false);
                if (JSON.stringify(arr) !== JSON.stringify(expected)) {
                    throw new Error(`${name} failed on ${arrName} descending`);
                }
            });
        });
    });
});