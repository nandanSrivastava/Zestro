"use client"

import {useEffect, useState} from 'react'

function computeTimeLeft(target){
  const now = new Date()
  const diff = new Date(target) - now
  if(diff <= 0) return null
  const days = Math.floor(diff / (1000*60*60*24))
  const hours = Math.floor((diff / (1000*60*60)) % 24)
  const minutes = Math.floor((diff / (1000*60)) % 60)
  const seconds = Math.floor((diff / 1000) % 60)
  return {days, hours, minutes, seconds}
}

export default function Countdown({target}){
  // Render a deterministic placeholder on the server to avoid hydration mismatch.
  // After client mounts we compute and show the real dynamic countdown.
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(null)

  useEffect(()=>{
    setMounted(true)
    // compute initial time left immediately on mount
    setTimeLeft(computeTimeLeft(target))
    const id = setInterval(()=>{
      setTimeLeft(computeTimeLeft(target))
    },1000)
    return ()=> clearInterval(id)
  },[target])

  // While rendering on server (not mounted) return static placeholder
  if(!mounted){
    return (
      <div className="flex gap-3 justify-center items-center text-center text-white flex-wrap">
        {[['Days', '--'], ['Hours', '--'], ['Minutes', '--'], ['Seconds', '--']].map(([label, value])=> (
          <div key={label} className="bg-[color:var(--zestro-orange-700)]/90 px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg min-w-[64px]" style={{boxShadow: '0 6px 18px rgba(255,90,26,0.18)'}}>
            <div className="text-lg sm:text-2xl font-bold">{value}</div>
            <div className="text-xs sm:text-sm opacity-80">{label}</div>
          </div>
        ))}
      </div>
    )
  }

  if(!timeLeft) return <div className="text-center text-xl font-semibold">Launched!</div>

  return (
    <div className="flex gap-3 justify-center items-center text-center text-white flex-wrap">
      {[['Days', timeLeft.days], ['Hours', timeLeft.hours], ['Minutes', timeLeft.minutes], ['Seconds', timeLeft.seconds]].map(([label, value])=> (
        <div key={label} className="bg-[color:var(--zestro-orange-700)]/90 px-3 py-2 sm:px-4 sm:py-3 rounded-lg shadow-lg min-w-[64px]" style={{boxShadow: '0 6px 18px rgba(255,90,26,0.18)'}}>
          <div className="text-lg sm:text-2xl font-bold">{value}</div>
          <div className="text-xs sm:text-sm opacity-80">{label}</div>
        </div>
      ))}
    </div>
  )
}
