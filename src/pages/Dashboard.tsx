import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, EditIcon, TrashIcon, SearchIcon } from 'lucide-react';
import Button from '../components/Button';
import { Post } from '../utils/types';
const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  // Mock data for posts
  const [posts] = useState<Post[]>([{
    id: '1',
    title: 'Getting Started with React',
    slug: 'getting-started-with-react',
    content: 'This is a beginner guide to React...',
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000',
    createdAt: '2023-10-15T10:30:00Z',
    updatedAt: '2023-10-15T10:30:00Z'
  }, {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    slug: 'advanced-typescript-patterns',
    content: 'Learn about advanced TypeScript patterns...',
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000',
    createdAt: '2023-10-10T14:20:00Z',
    updatedAt: '2023-10-12T09:15:00Z'
  }, {
    id: '3',
    title: 'CSS Grid Layout Techniques',
    slug: 'css-grid-layout-techniques',
    content: 'Master CSS Grid with these techniques...',
    coverImage: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=1000',
    createdAt: '2023-10-05T08:45:00Z',
    updatedAt: '2023-10-05T08:45:00Z'
  }]);
  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const handleDeletePost = (id: string) => {
    // In a real app, this would call an API to delete the post
    console.log(`Delete post with id: ${id}`);
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  return <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#260701]">
            Dashboard
          </h1>
          <p className="text-[#3D0C02] mt-1">Manage your blog posts easily.</p>
        </div>
        <Link to="/admin/create">
          <Button>
            <div className="flex items-center gap-2">
              <PlusIcon size={18} />
              <span>Create New Post</span>
            </div>
          </Button>
        </Link>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-8">
        <div className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon size={18} className="text-gray-400" />
          </div>
          <input type="text" className="w-full pl-10 pr-4 py-2 border border-[#C69076] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#843722] focus:border-transparent" placeholder="Search posts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full">
            <thead className="bg-[#F8F5F2] border-b border-[#C69076]">
              <tr>
                <th className="py-3 px-4 text-left text-[#3D0C02] font-semibold">
                  Title
                </th>
                <th className="py-3 px-4 text-left text-[#3D0C02] font-semibold hidden sm:table-cell">
                  Created
                </th>
                <th className="py-3 px-4 text-left text-[#3D0C02] font-semibold hidden md:table-cell">
                  Updated
                </th>
                <th className="py-3 px-4 text-right text-[#3D0C02] font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C69076]/30">
              {filteredPosts.length > 0 ? filteredPosts.map(post => <tr key={post.id} className="hover:bg-[#F8F5F2]">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={post.coverImage} alt={post.title} className="w-10 h-10 object-cover rounded" />
                        <span className="font-medium text-[#260701] line-clamp-2">
                          {post.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#3D0C02] hidden sm:table-cell">
                      {formatDate(post.createdAt)}
                    </td>
                    <td className="py-3 px-4 text-[#3D0C02] hidden md:table-cell">
                      {formatDate(post.updatedAt)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-end gap-2">
                        <Link to={`/admin/edit/${post.id}`}>
                          <button className="p-1.5 rounded-md bg-[#C69076]/20 hover:bg-[#C69076]/40 text-[#843722] transition-colors">
                            <EditIcon size={18} />
                          </button>
                        </Link>
                        <button onClick={() => handleDeletePost(post.id)} className="p-1.5 rounded-md bg-red-100 hover:bg-red-200 text-red-600 transition-colors">
                          <TrashIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>) : <tr>
                  <td colSpan={4} className="py-8 text-center text-[#3D0C02]">
                    No posts found
                  </td>
                </tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>;
};
export default Dashboard;