'use client'

import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

// Set Mapbox access token (make sure to add this to your .env.local file)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

interface MapProps {
  lat: number
  lng: number
}

export default function Map({ lat, lng }: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)

  useEffect(() => {
    if (!mapContainer.current) return

    // Initialize map only once
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 12
      })

      // Add marker
      new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .addTo(map.current)
    }

    return () => {
      map.current?.remove()
    }
  }, [lat, lng])

  return (
    <div 
      ref={mapContainer} 
      className="w-full h-full rounded-lg"
      style={{ minHeight: '256px' }}
    />
  )
}