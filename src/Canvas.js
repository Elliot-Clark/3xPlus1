import React, { useRef, useEffect } from 'react'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    let array = props.numberCollection;
    let arrLength = array.length;
    let arrLargest = Math.max.apply(Math, array);
    if (arrLargest < 5) {
        arrLargest = 20;
    }

    const width = window.innerWidth * .9;
    const height = window.innerHeight * .5;
    
    const draw = ctx => {
        ctx.clearRect(-100, 0, width + 100, -height);

        ctx.setTransform(1, 0, 0, 1, width * .1 , height);
        ctx.beginPath();
        ctx.strokeStyle = "gray"; // Horizontal Graph Line
        ctx.moveTo(0, 0);
        ctx.lineWidth = 2;
        ctx.lineTo(width, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "gray"; // Vertical Graph Line
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -height);
        ctx.stroke();

        let x = 0;
        let y = 0;
        let xArray = [];
        let yArray = [];

        for (let i = 0; i < arrLength; i++) {
            ctx.beginPath(); //Graphs the lines from one number to the next
            ctx.moveTo(x, y);
            ctx.strokeStyle = "gray";
            x = (i+1)/(arrLength) * width * .85;
            xArray.push(x);
            y = array[i]/arrLargest * -height * .85 - 10;
            yArray.push(y - 10);
            ctx.lineTo(x, y - 10)
            ctx.stroke();
        }
        // Draws the circles with the numbers in them on the graph
        // To layer circles over lines this seperate for loop is used after the first, rather than combining them. 
        for (let i = 0; i < arrLength; i++) {
            ctx.beginPath();
            ctx.strokeStyle = "black"; 
            ctx.arc(xArray[i], yArray[i], 20, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fillStyle = "grey";
            ctx.arc(xArray[i], yArray[i], 20, 0, 2 * Math.PI);
            ctx.fill();
            ctx.font = "bold 18px Arial";
            ctx.textAlign="center";
            ctx.fillStyle = 'yellow';
            ctx.fillText(array[i], xArray[i], yArray[i]+ 5);
        }
    }
    
    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        draw(context)
    });

    return (
        <canvas className="test" width={width} height={height} ref={canvasRef}/>
    )
}

export default Canvas


