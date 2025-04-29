import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeftIcon } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import { Post } from '../utils/types';
const EditPost = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    coverImage: ''
  });
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    coverImage: ''
  });
  useEffect(() => {
    // Simulate API fetch for the post
    const fetchPost = () => {
      setIsLoading(true);
      // Mock data - in a real app, this would be an API call
      const mockPosts: Post[] = [{
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
      }];
      setTimeout(() => {
        const post = mockPosts.find(p => p.id === id);
        if (post) {
          setFormData({
            title: post.title,
            slug: post.slug,
            content: post.content,
            coverImage: post.coverImage
          });
        } else {
          toast.error('Post not found');
          navigate('/admin');
        }
        setIsLoading(false);
      }, 500);
    };
    fetchPost();
  }, [id, navigate]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {
      title: '',
      content: '',
      coverImage: ''
    };
    let isValid = true;
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
      isValid = false;
    }
    if (!formData.coverImage.trim()) {
      newErrors.coverImage = 'Cover image URL is required';
      isValid = false;
    } else if (!isValidUrl(formData.coverImage)) {
      newErrors.coverImage = 'Please enter a valid URL';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Post updated successfully!');
      setIsSubmitting(false);
      navigate('/admin');
    }, 1000);
  };
  if (isLoading) {
    return <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#843722]"></div>
      </div>;
  }
  return <div>
      <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-[#843722] hover:text-[#6D2E1C] mb-6">
        <ArrowLeftIcon size={18} />
        <span>Back to Dashboard</span>
      </button>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#260701]">
          Edit Post
        </h1>
        <p className="text-[#3D0C02] mt-1">Update your blog post details.</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div className="lg:col-span-2">
              <Input label="Post Title" name="title" placeholder="Enter post title" value={formData.title} onChange={handleChange} required error={errors.title} />
            </div>
            <Input label="Slug" name="slug" placeholder="post-url-slug" value={formData.slug} onChange={handleChange} />
            <Input label="Cover Image URL" name="coverImage" placeholder="https://example.com/image.jpg" value={formData.coverImage} onChange={handleChange} required error={errors.coverImage} />
            <div className="lg:col-span-2">
              <TextArea label="Content" name="content" placeholder="Write your blog post content here..." value={formData.content} onChange={handleChange} required error={errors.content} rows={10} />
            </div>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:justify-end">
            <Button variant="secondary" onClick={() => navigate('/admin')} fullWidth={window.innerWidth < 640}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} fullWidth={window.innerWidth < 640}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};
export default EditPost;