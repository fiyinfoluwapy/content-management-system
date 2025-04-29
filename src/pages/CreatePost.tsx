import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowLeftIcon } from 'lucide-react';
import Button from '../components/Button';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
const CreatePost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      toast.success('Post created successfully!');
      setIsSubmitting(false);
      navigate('/admin');
    }, 1000);
  };
  return <div>
      <button onClick={() => navigate('/admin')} className="flex items-center gap-2 text-[#843722] hover:text-[#6D2E1C] mb-6">
        <ArrowLeftIcon size={18} />
        <span>Back to Dashboard</span>
      </button>
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#260701]">
          Create New Post
        </h1>
        <p className="text-[#3D0C02] mt-1">
          Fill in the details to create a new blog post.
        </p>
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
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>;
};
export default CreatePost;