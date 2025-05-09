import axios from 'axios'
import AnalyticsChart from '../components/AnalyticsChart'

export default async function AnalyticsPage() {
  // Fetch all necessary data
  const [users, posts, comments] = await Promise.all([
    axios.get<{ id: number; name: string; }[]>('https://jsonplaceholder.typicode.com/users'),
    axios.get<{ id: number; title: string; body: string; }[]>('https://jsonplaceholder.typicode.com/posts'),
    axios.get<{ id: number; postId: number; body: string; }[]>('https://jsonplaceholder.typicode.com/comments')
  ])

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Data Analytics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-800">Users</h2>
          <p className="text-3xl font-bold text-blue-600">{users.data.length}</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold text-green-800">Posts</h2>
          <p className="text-3xl font-bold text-green-600">{posts.data.length}</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-800">Comments</h2>
          <p className="text-3xl font-bold text-yellow-600">{comments.data.length}</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Data Overview</h2>
        <AnalyticsChart 
          usersCount={users.data.length}
          postsCount={posts.data.length}
          commentsCount={comments.data.length}
        />
      </div>
    </div>
  )
}