let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json'
let req = new XMLHttpRequest()

// namaing the varaibles we need them later
let data 
let values

//  creating some scales
let heightScale
let xScale
let xAxisScale
let yAxisScale

// dimention of our Canvas
let width = 800 
let height = 600
let padding = 40

//  creating some selections
let svg = d3.select('svg')  // return first SVG element

// creating some function

let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

let generateScales = () => {

}

// Bar and Tooltips will be drawn

let drawBars = () => {

}

// x and y axis

let generateAxes = () => {

}

// importing JSON data 

req.open('GET', url, true)
req.onload = () => {
    data = JSON.parse(req.responseText)
    values = data.data
    console.log(values)
    }
req.send()