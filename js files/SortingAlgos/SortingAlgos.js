
let arr = [];
let running = true;
let bars = document.getElementById("bars");
let delay = 50;
let arrnum = 50;
NewBars();
function getArrnumAndDelay() {
    delay = document.getElementById("delay").value;
    arrnum = document.getElementById("size").value;
}


function removeBars() {
    const elements = document.querySelectorAll('.bar');
    for (const element of elements) {
    if(element.parentNode) element.parentNode.removeChild(element);
    }
}


function NewBars() {
    getArrnumAndDelay();
    running = false;
    removeBars();
    for(let i = 0;i<arrnum;i++){
        arr[i] = Math.floor(Math.random() * 100);
    }
    for(let i = 0;i<arrnum;i++){
        let tag = document.createElement("div");
        tag.classList.add(`bar${i}`,"bar")
        let p = document.createElement('p');
        p.classList.add(`num${i}`,"num");
        p.innerHTML = arr[i];
        tag.style.height = arr[i]*5 + "px";
        if(arrnum<=25){
            tag.style.width = "45px"
        }else if(arrnum<=35){
            tag.style.width = "35px"
        }
        
        bars.appendChild(tag);
        tag.appendChild(p);
    }
}



 async function  updateBars(arr, i, j){
    // Get the elements representing the two bars to swap
    let bar1 = document.getElementsByClassName(`bar${i}`)[0];
    let bar2 = document.getElementsByClassName(`bar${j}`)[0];

    let tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;


    let num1 = document.getElementsByClassName(`num${i}`)[0];
    let num2 = document.getElementsByClassName(`num${j}`)[0];
    num1.innerHTML = arr[i];
    num2.innerHTML = arr[j];
    
}

 function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// function stop(){
//     running = false;
// }
//bubble sort
  async function bubbleSort() {
    running = true;
    for (let i = 0; i < arrnum && running; i++) {
        for (let j = 0; j < arrnum - i - 1 && running; j++) {
            // Compare elements
            if (arr[j] > arr[j + 1]) {
                // Swap elements
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                console.log(arrnum);
                // Update the visual representation of the array
                let bar1 = document.getElementsByClassName(`bar${j}`)[0];
                let bar2 = document.getElementsByClassName(`bar${j+1}`)[0];
                bar1.style.background = "blue";
                bar2.style.background = "red";
                await sleep(delay);
                updateBars(arr, j, j + 1);
                bar1.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
                bar2.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
            }
            
        }
    }
}
//selection sort
async function selectionSort() {
    running = true;
    // Loop through the entire array
    for (let i = 0; i < arrnum && running; i++) {
        // Assume the first element is the smallest
        let minIndex = i;
        // Compare the current element to all other elements
        for (let j = i + 1; j < arrnum && running; j++) {
            // If a smaller element is found, update the minIndex
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
            
        }
        // If the minIndex is not the current element, swap them
        if (minIndex !== i) {
            let temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
         // Update the visual representation of the array
         let bar1 = document.getElementsByClassName(`bar${i}`)[0];
         let bar2 = document.getElementsByClassName(`bar${minIndex}`)[0];
         bar1.style.background = "blue";
         bar2.style.background = "red";
         await sleep(delay);
         updateBars(arr, i, minIndex);
         bar1.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
         bar2.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
    }
}

//Insertion sort
async function insertionSort() {
    running=true;
    // Loop through the entire array
    for (let i = 1; i < arrnum && running; i++) {
        // Assign the current element to a variable
        let current = arr[i];
        // Assign the index of the previous element to a variable
        let j = i - 1;
        // Compare the current element to all previous elements
        while (j >= 0 && arr[j] > current && running) {
            // Swap the current element with the previous element
            let temp = arr[j];
            arr[j]=arr[j+1];
            arr[j+1]=temp;
            // Update the visual representation of the array
         let bar1 = document.getElementsByClassName(`bar${j}`)[0];
         let bar2 = document.getElementsByClassName(`bar${j+1}`)[0];
         bar1.style.background = "blue";
         bar2.style.background = "red";
         await sleep(delay);
         updateBars(arr, j, j+1);
         bar1.style.background = "#343434";
         bar2.style.background = "#343434";
            // Decrement the index
            j--;
        }
        arr[j+1]=current;
    }
    console.log(arr);
}
//Quick Sort
function quickStart(){
    running=true;
    arr =  quickSortVisual(arr,0,arrnum-1);
}

// Function to perform quick sort and update the visual representation of the array
async function quickSortVisual(arr, left, right) {
    // Base case: if the left index is greater than or equal to the right index, return
    if (left >= right) {
        return;
    }
    // Get the pivot index
    let pivotIndex = await partition(arr, left, right);
    let piotBar = document.getElementsByClassName(`bar${pivotIndex}`)[0];
    piotBar.style.background = "#FFC300";
    // Recursively sort the left and right partitions
    await quickSortVisual(arr, left, pivotIndex - 1);
    piotBar.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
    await quickSortVisual(arr, pivotIndex + 1, right);
    piotBar.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
}


async function partition(arr, left, right) {
    // Choose the rightmost element as the pivot
    let pivot = arr[right];
    // Start the partition index at the left side
    let partitionIndex = left;
    // Loop through all elements between the left and right indexes
    for (let i = left; i < right && running; i++) {
        // If the current element is less than or equal to the pivot, swap it with the partition index
        if (arr[i] <= pivot) {
            await swap(arr, i, partitionIndex);
            partitionIndex++;
        }
    }
    // Move the pivot element to the partition index
    await swap(arr, partitionIndex, right);
    // Return the partition index
    return partitionIndex;
}

async function swap(arr,i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j]=temp;
     // Update the visual representation of the array
     let bar1 = document.getElementsByClassName(`bar${i}`)[0];
     let bar2 = document.getElementsByClassName(`bar${j}`)[0];
     bar1.style.background = "blue";
     bar2.style.background = "red";
     await sleep(delay);
     updateBars(arr, i, j);
     bar1.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
     bar2.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
}

//Merge sort
function mergeStart(){
    mergeSort(arr, swap1);
}
function merge(left, right, swap) {
    let result = [];
    let i = 0;
    let j = 0;

    // Compare the elements of the two arrays and add the smaller one to the result array
    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }

    // Add any remaining elements from the left array
    while (i < left.length) {
        result.push(left[i]);
        i++;
    }

    // Add any remaining elements from the right array
    while (j < right.length) {
        result.push(right[j]);
        j++;
    }

    // swap elements
    for (let i = 0; i < result.length; i++) {
        swap(i, result[i]);
    }
    return result;
}
// The main merge sort function
function mergeSort(arr, swap) {
    if (arr.length < 2) {
        // The array is already sorted if it has less than 2 elements
        return arr;
    }

    // Split the array in half
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);

    // Recursively sort the left and right halves
    left = mergeSort(left, swap);
    right = mergeSort(right, swap);

    // Merge the sorted left and right halves
    return merge(left, right, swap);
}

async function swap1(i,j) {
    let temp = i;
    i=j;
    j=i;
     // Update the visual representation of the array
     let bar1 = document.getElementsByClassName(`bar${i}`)[0];
     let bar2 = document.getElementsByClassName(`bar${j}`)[0];
     bar1.style.background = "blue";
     bar2.style.background = "red";
     await sleep(delay);
     updateBars(arr, i, j);
     bar1.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
     bar2.style.background = "linear-gradient(to  bottom,#36454F, #6082b6cf)";
}