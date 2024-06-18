'use client'
import useWindow from "@/hooks/useWindow"
import { useControls } from "leva"
import { useEffect, useRef } from "react"

const Scene = () => {
  const {size} = useControls({
    size:{min:1,max:70,value:40},
    // color:{value:'black',}
  })
  const canvas = useRef(null)
  const {height,width} = useWindow()
  const prevPos = useRef(null)
 
  useEffect(() => {
    if (width > 0 ) init()
  }, [width,height])
  
  const init = () => {
    const ctx = canvas.current.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,width,height)
  }
  
  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const handleMove = e => {
    let {clientX:x,clientY:y,movementX,movementY} = e
    const movement = Math.max( Math.abs(movementX) , Math.abs(movementY))
   if (prevPos.current) {
    for (let i = 0; i < movement ; i++) {
      const {x:prevX,y:prevY} = prevPos.current
      let t = (1/movement)*i
      const newX = lerp(prevX,x,t)
      const newY = lerp(prevY,y,t)
      draw(newX,newY,size)
    }
   }
   prevPos.current = {x,y}
  }
  const draw = (x,y,size) => {
    const ctx = canvas.current.getContext('2d')
    ctx.beginPath()
    ctx.globalCompositeOperation = "destination-out"
    ctx.fillStyle = 'red'
    ctx.arc(x,y,size,0,Math.PI * 2 )
    ctx.fill()
  }


  return (
    <div className='absolute h-screen w-screen  top-0 left-0'>
     {
      width == 0 && <div className="h-full w-full absolute top-0 left-0 bg-black"></div>
     }
     <canvas onMouseMove={handleMove} height={height} width={width} ref={canvas}>
     </canvas>
    </div>
  )
}

export default Scene