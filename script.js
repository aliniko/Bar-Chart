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
// drawCanvas() draws the svg canvas with width and height attributes
let drawCanvas = () => {
    svg.attr('width', width)
    svg.attr('height', height)
}

// generateScales generates the scales and assigns them to the variables
let generateScales = () => {
    // Creating a Scale for Bar Height
    heightScale = d3.scaleLinear()
    // Domain will go from 0 (min gdp) to the max gdp value stored at index 1
                    .domain([0,d3.max(values, (item) => {
                        return item[1]
                    })])
    // range goes from 0 to height minus 2 times padding to allow for top and bottom padding
                    .range([0, height - (2*padding)])
          
    // Creating a Scale for Horizontally Placing Bars 
    xScale = d3.scaleLinear()
    // domain goes from 0 to the largest indext (length - 1)
                    .domain([0, values.length -1])
                    // range goes from padding (min x) to width - padding (max x)
                    .range([padding, width - padding])
// Creating a Scale for the x-axis of Dates
// convert string to Dates
// Create dateArray, map by generating a new date
let datesArray = values.map((item) => {
        return new Date(item[0])
    })
// We want the domain to be the smallest data value to the largest date value from datearray
// Range is same as XScale
    xAxisScale = d3.scaleTime()
                    .domain([d3.min(datesArray), d3.max(datesArray)])
                    .range([padding, width-padding])

    yAxisScale = d3.scaleLinear()
                    .domain([0, d3.max(values, (item) => {
                        return item[1]
                    })])
                    .range([height - padding, padding ])
}

// generateScales generates the scales and assigns them to the variables
let drawBars =() => {

    let tooltip = d3.select('body')
                    .append('div')
                    .attr('id', 'tooltip')
                    .style('visibility', 'hidden')
                    .style('width', 'auto')
                    .style('height', 'auto')

// select all rects from svg
    svg.selectAll('rect')
    // And bind it to the values array
        .data(values)
        // - Then call enter to specify what to do for each item that doesn't have a rectangle
        .enter()
        // - Create a new rectangle with append
        .append('rect')
        .attr('class', 'bar')
        // - Set the width to width (minus padding) divided by number of elements
        .attr('width', (width - (2 * padding)) / values.length)
        .attr('data-date', (item) => {
            return item[0]
        })
        .attr('data-gdp', (item) => {
            return item[1]
        })
        .attr('height', (item) => {
            return heightScale(item[1])
        })
        .attr('x', (item, index) => {
            return xScale(index)
        })
        .attr('y', (item) => {
            return (height - padding) - heightScale(item[1])
        })
        .on('mouseover', (item) => {
            tooltip.transition()
                .style('visibility', 'visible')

            tooltip.text(item[0])

            document.querySelector('#tooltip').setAttribute('data-date', item[0])
        })
        .on('mouseout', (item) => {
            tooltip.transition()
                .style('visibility', 'hidden')
        })        
}

// generateScales generates the scales and assigns them to the variables
let generateAxes = () => {

    let xAxis = d3.axisBottom(xAxisScale)
    let yAxis = d3.axisLeft(yAxisScale)

    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height-padding) + ')')

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
        
}

//  Position title tag
req.open('GET', url, true)

// Set onload, parse the responsetext and store as data
req.onload = () => {
    data = JSON.parse(req.responseText)
    // Set values to .data field which contains the array
    values = data.data
    // - Log this, Send the request and see if we have the array
    console.log(values)
    //  draw the canvas first
    drawCanvas()
    // - then generate the scales
    generateScales()
    // - then draw the bars
    drawBars()
    // - then generate the axes
    generateAxes()
}
req.send()