'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Suspense } from 'react'

// Dynamically import ApexCharts with SSR disabled
const Chart = dynamic(() => import('react-apexcharts'), { 
  ssr: false,
  loading: () => <div className="h-[350px] flex items-center justify-center">Loading chart...</div>
})

type Stats = {
  users: number
  posts: number
  comments: number
}

export default function Charts() {
  const [isMounted, setIsMounted] = useState(false)
  const [stats, setStats] = useState<Stats>({ users: 0, posts: 0, comments: 0 })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const { data: users } = useQuery({
    queryKey: ['users-count'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/users').then(res => res.data),
  })

  const { data: posts } = useQuery({
    queryKey: ['posts-count'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/posts').then(res => res.data),
  })

  const { data: comments } = useQuery({
    queryKey: ['comments-count'],
    queryFn: () => axios.get('https://jsonplaceholder.typicode.com/comments').then(res => res.data),
  })

  useEffect(() => {
    if (users && posts && comments) {
      setStats({
        users: users.length,
        posts: posts.length,
        comments: comments.length,
      })
    }
  }, [users, posts, comments])

  const chartOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: ['Users', 'Posts', 'Comments'],
    },
    yaxis: {
      title: {
        text: 'Count',
      },
    },
    fill: {
      opacity: 1,
    },
    colors: ['#3b82f6', '#10b981', '#f59e0b'],
  }

  const series = [
    {
      name: 'Count',
      data: [stats.users, stats.posts, stats.comments],
    },
  ]

  if (!isMounted) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Data Statistics</h2>
        <div className="h-[350px] flex items-center justify-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Data Statistics</h2>
      <Suspense fallback={<div className="h-[350px] flex items-center justify-center">Loading chart...</div>}>
        <Chart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
      </Suspense>
    </div>
  )
}