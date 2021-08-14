import React, { useRef, useEffect } from 'react'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    let array = props.numberCollection;
    let arrLength = array.length;
    let arrLargest = Math.max.apply(Math, array);
    if (arrLargest < 5) {
        arrLargest = 20;
    }

    const width = window.innerWidth;
    const height = window.innerHeight * .5;
    
    const draw = ctx => {
        ctx.clearRect(-100, 0, width + 100, -height);

        ctx.setTransform(1, 0, 0, 1, 0 , height);

        ctx.beginPath();
        ctx.strokeStyle = '#383f41'; // Vertical Graph Line
        ctx.moveTo(0, 0);
        ctx.lineWidth = 2;
        ctx.lineTo(0, -height);
        ctx.stroke();

        let x = 5;
        let y = 5;
        let xArray = [];
        let yArray = [];

        for (let i = 0; i < arrLength; i++) {
            ctx.beginPath(); //Graphs the lines from one number to the next
            ctx.moveTo(x -5, y -5);
            ctx.strokeStyle = "#383f41";
            x = (i+1)/(arrLength) * width * .95;
            xArray.push(x -5);
            y = array[i]/arrLargest * -height * .85;
            yArray.push(y -5);
            ctx.lineTo(x, y)
            ctx.stroke();
        }
        // Draws the circles with the numbers in them on the graph
        // To layer circles over lines this seperate for loop is used after the first, rather than combining them. 
        for (let i = 0; i < arrLength; i++) {
            ctx.beginPath();
            ctx.strokeStyle = "#383f41"; 

            //Sets the size of each circle based on how many digits in each number for better fitting sizes.
            let circleSize = array[i].toString().split('').length * 6 + 12;

            ctx.arc(xArray[i], yArray[i] - 8, circleSize, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = "#ccc";
            ctx.arc(xArray[i], yArray[i] - 8, circleSize, 0, 2 * Math.PI);
            ctx.fill();
            ctx.font = "bold 28px Arial";
            ctx.textAlign="center";
            ctx.fillStyle = 'red';
            ctx.fillText(array[i], xArray[i], yArray[i]);
        }
    }
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    });

    return (
        <canvas className="graph" width={width} height={height} ref={canvasRef}/>
    )
}

export default Canvas


