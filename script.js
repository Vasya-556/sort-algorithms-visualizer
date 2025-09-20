const canvas = document.getElementById("canvas")

const width = window.innerWidth
const height = window.innerHeight

canvas.style.width = width + "px"
canvas.style.height = height + "px"

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d")

// ctx.beginPath();
// ctx.rect(10,20,10,10)

// ctx.fillStyle = "green"
// ctx.fill()

const drawRandomData = (size) => {
    for (let index = 0; index < size; index++) {
        random = Math.ceil(Math.random()*10)
        ctx.beginPath();
        ctx.rect(30 + (index * 15),120,10, - (random * 10))
        ctx.fillStyle = "green"
        ctx.fill()
    }
}

const size = 10

let r1 = {
    x: 30,
    y: 120,
    width: 10,
    height: -30,
    color: "green"
}

const generateArrayData = (size, width, startX, startY, stepX, stepY, Ycoordinate, color) => {
    let arrayData = [];
    for (let i = 0; i < size; i++){
        const currentXcoordinate = startX + ((width + stepX )* i);
        const currentHeight = startY + (stepY * i);
        const data = {
            id: i,
            x: currentXcoordinate,
            y: Ycoordinate,
            width: width,
            height: -currentHeight,
            color: color
        };
        arrayData.push(data);
    }
    return arrayData;
}

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const drawRectangle = (data) => {
    ctx.beginPath()
    ctx.rect(data.x, data.y, data.width, data.height)
    ctx.fillStyle = data.color
    ctx.fill()
}

const drawRectangles = (rectangles) => {
    rectangles.forEach(r => {
        ctx.beginPath();
        ctx.rect(r.x, r.y, r.width, r.height);
        ctx.fillStyle = r.color;
        ctx.fill()
    });
}

const shuffleArray = (arr) => {
    const len = arr.length;
    let res = structuredClone(arr);
    for (let i = len -1; i >= 0; i--){
        const j = Math.floor(Math.random() * (i + 1))
        // [res[i], res[j]] = [res[j], res[i]];
        let tmp = res[i];
        res[i] = res[j]
        res[j] = tmp
    }
    return res
}

const recalculateNewXCoordinate = (rectangles) => {
    let Xarray = []
    let res = structuredClone(rectangles);

    for (let i = 0; i < res.length; i++){
        Xarray.push(res[i].x)
    }
    Xarray.sort((a,b) => a-b);
    for (let i = 0; i < res.length; i++){
        res[i].x = Xarray[i];
    }
    return res
    
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const display = async (data) => {
    clearCanvas()
    const newData = recalculateNewXCoordinate(data)
    drawRectangles(newData)
    await sleep(1);
}

const bubbleSort = async (data) => {
    let res = structuredClone(data);
    let tmp;
    for (var i = 0; i < res.length; i++){
        for (var j = 0; j < (res.length - i - 1); j++){
            if (res[j].id > res[j+1].id){
                tmp = res[j]
                res[j] = res[j+1]
                res[j+1] = tmp
            }
            await display(res);
        }
    }
}

const wrapper = async (func) => {
    const t1 = Date.now();
    await func()
    const t2 = Date.now();
    return t2 - t1
}

const data1 = generateArrayData(1, 5, 30, 10, 5, 5, 550, "green")
// console.log(data1);

// drawRectangles(data1);
const data2 = shuffleArray(data1);
// console.log(data2)
// drawRectangles(data2)
const data3 = recalculateNewXCoordinate(data2);
drawRectangles(data3)

// bubbleSort(data3)
async function wrapperExecutioner() {
    const t = await wrapper(() => bubbleSort(data3));
    const result = document.getElementById("result");
    result.innerHTML = `${(t / 1000).toFixed(2)}s`
}

wrapperExecutioner();

const getDataFromHTML = () => {
    const isRandom = document.getElementById("random-checkbox").checked
    const size = document.getElementById("size-range").value
    const speed = document.getElementById("speed-range").value
    const algorithmType = document.getElementById("algorithms-selector").value
    console.log(isRandom)
    console.log(size)
    console.log(speed)
    console.log(algorithmType)
}

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", getDataFromHTML)

const stop = () => {
    console.log("stop")
}

const stopButton = document.getElementById("stop-button");
stopButton.addEventListener("click", stop)

const reset = () => {
    const isRandom = document.getElementById("random-checkbox")
    const size = document.getElementById("size-range")
    const speed = document.getElementById("speed-range")
    const algorithmType = document.getElementById("algorithms-selector")
    isRandom.checked = false
    size.value = 10
    speed.value = 1
    algorithmType.selectedIndex = 0
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", reset)