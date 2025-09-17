"use client"

import {useEffect, useState} from 'react'

export default function Countdown({target}){
  const [timeLeft, setTimeLeft] = useState(getTimeLeft())

  function getTimeLeft(){
    const now = new Date()
    const diff = new Date(target) - now
    if(diff <= 0) return null
    const days = Math.floor(diff / (1000*60*60*24))
    const hours = Math.floor((diff / (1000*60*60)) % 24)
    const minutes = Math.floor((diff / (1000*60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)
    return {days, hours, minutes, seconds}
  }

  useEffect(()=>{
    const id = setInterval(()=>{
      setTimeLeft(getTimeLeft())
    },1000)
    return ()=> clearInterval(id)
  },[])

  if(!timeLeft) return <div className="text-center text-xl font-semibold">Launched!</div>

  return (
    <div className="flex gap-3 justify-center items-center text-center text-white flex-wrap">
      {[['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Minutes', timeLeft.minutes], ['Seconds', timeLeft.seconds]].map(([label, value])=> (
        <div key={label} className="bg-blue-700/90 px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg min-w-[64px]">
          <div className="text-lg sm:text-2xl font-bold">{value}</div>
          <div className="text-xs sm:text-sm opacity-80">{label}</div>
        </div>
      ))}
    </div>
  )
}
