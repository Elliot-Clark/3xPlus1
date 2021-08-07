import React, { useRef, useEffect } from 'react'

const Canvas = (props) => {

    const canvasRef = useRef(null)

    const width = window.innerWidth
    const height = window.innerHeight;

    console.log(props.numberCollection);
    
    const draw = ctx => {
        ctx.fillStyle = '#000000'
        ctx.lineWidth = 5;
        ctx.moveTo(width * .1, height * .5);
        ctx.lineTo(width * .8, height * .5);
        ctx.stroke();
        ctx.lineWidth = 1;
        ctx.moveTo(width * .1, height * .5);
        ctx.lineTo(width * .1, height * .1);
        ctx.stroke();
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


