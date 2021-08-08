import React, { useRef, useEffect } from 'react'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    let array = props.numberCollection;
    let arrLength = array.length;
    let arrLargest = Math.max.apply(Math, array);
    if (arrLargest < 5) {
        arrLargest = 20;
    }

    const width = window.innerWidth * .8;
    const height = window.innerHeight * .5;

    
    const draw = ctx => {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green"; // Green path
        ctx.moveTo(width * .1, height);
        ctx.setTransform(1, 0, 0, 1, width * .1 , height);
        ctx.lineTo(width, 0);
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = "purple"; // Purple path
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -height);
        ctx.stroke();

        let x = 0;
        let y = 0;

        for (let i = 0; i < arrLength; i++) {
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.strokeStyle = "blue"; // Numbers

            x = (i+1)/(arrLength) * width * .85;
            y = array[i]/arrLargest * -height * .85;
            ctx.lineTo(x, y)
            ctx.stroke();
        }

    }
    
    useEffect(() => {
        
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        
        //Our draw come here
        draw(context)
    })
    
    return (
        <canvas className="test" width={width} height={height} ref={canvasRef}/>
    )
}

export default Canvas


