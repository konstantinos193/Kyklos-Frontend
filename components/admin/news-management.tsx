"use client";

import { useState, useEffect } from 'react';
import { adminAPI } from '@/lib/api';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag,
  Search,
  Filter,
  FileText,
  X,
  Save,
  MapPin,
  Clock,
  Paperclip,
  Download
} from 'lucide-react';

interface NewsPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: 'announcement' | 'event' | 'seminar' | 'education' | 'universities';
  author: {
    name: string;
    image?: string;
  };
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  publishDate: string;
  eventDate?: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
  featured: boolean;
  image: {
    url: string;
    alt?: string;
    caption?: string;
  };
  attachments?: Array<{
    url: string;
    secureUrl: string;
    publicId: string;
    fileName: string;
    fileType: string;
    fileSize: number;
  }>;
}

const NEWS_TYPES = [
  { value: 'announcement', label: 'Ανακοινώσεις', page: '/news/announcements' },
  { value: 'event', label: 'Εκδηλώσεις - Φωτογραφίες', page: '/news/events' },
  { value: 'seminar', label: 'Σεμινάρια', page: '/news/seminars' },
  { value: 'education', label: 'Εκπαιδευτικά Νέα', page: '/current-affairs/education' },
  { value: 'universities', label: 'Πανεπιστήμια', page: '/current-affairs/universities' },
];

export function NewsManagement() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    type: 'announcement' as 'announcement' | 'event' | 'seminar' | 'education' | 'universities',
    author: {
      name: 'ΚΥΚΛΟΣ',
      image: '/logo.png'
    },
    image: {
      url: '',
      alt: '',
      caption: ''
    },
    tags: [] as string[],
    status: 'published' as 'draft' | 'published' | 'archived',
    publishDate: new Date().toISOString().split('T')[0],
    eventDate: '',
    location: '',
    featured: false
  });
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [currentPostAttachments, setCurrentPostAttachments] = useState<NewsPost['attachments']>([]);

  useEffect(() => {
    fetchPosts();
  }, [currentPage, statusFilter, typeFilter, searchTerm]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const params: any = {
        page: currentPage,
        limit: 10,
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(typeFilter !== 'all' && { type: typeFilter }),
        ...(searchTerm && { search: searchTerm })
      };

      const response = await adminAPI.getNewsPosts(params);
      if (response.success) {
        setPosts(response.data || []);
        setTotalPages(Math.ceil((response.pagination?.total || 0) / 10));
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Σφάλμα φόρτωσης δεδομένων');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!formData.title || !formData.excerpt || !formData.content || !formData.image.url) {
      setError('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      return;
    }

    try {
      setError('');
      const response = await adminAPI.createNewsPost({
        ...formData,
        author: {
          name: formData.author.name,
          ...(formData.author.image && { image: formData.author.image })
        },
        image: {
          url: formData.image.url,
          ...(formData.image.alt && { alt: formData.image.alt }),
          ...(formData.image.caption && { caption: formData.image.caption })
        },
        publishDate: formData.publishDate ? new Date(formData.publishDate) : undefined,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
      });

      if (response.success) {
        const postId = response.data?._id || response.data?.data?._id;
        
        // Upload files if any
        if (selectedFiles.length > 0 && postId) {
          try {
            setUploadingFiles(true);
            const formData = new FormData();
            selectedFiles.forEach((file) => {
              formData.append('files', file);
            });
            await adminAPI.addNewsFiles(postId, formData);
          } catch (fileError: any) {
            console.error('Error uploading files:', fileError);
            setError('Η δημοσίευση δημιουργήθηκε αλλά υπήρξε πρόβλημα με τα αρχεία');
          } finally {
            setUploadingFiles(false);
          }
        }

        setSuccess('Η δημοσίευση δημιουργήθηκε επιτυχώς');
        setShowAddModal(false);
        resetForm();
        fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα δημιουργίας δημοσίευσης');
      }
    } catch (error: any) {
      console.error('Error creating post:', error);
      setError(error.response?.data?.message || 'Σφάλμα δημιουργίας δημοσίευσης');
    }
  };

  const handleUpdatePost = async () => {
    if (!editingPost) return;

    if (!formData.title || !formData.excerpt || !formData.content || !formData.image.url) {
      setError('Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία');
      return;
    }

    try {
      setError('');
      const response = await adminAPI.updateNewsPost(editingPost._id, {
        ...formData,
        author: {
          name: formData.author.name,
          ...(formData.author.image && { image: formData.author.image })
        },
        image: {
          url: formData.image.url,
          ...(formData.image.alt && { alt: formData.image.alt }),
          ...(formData.image.caption && { caption: formData.image.caption })
        },
        publishDate: formData.publishDate ? new Date(formData.publishDate) : undefined,
        eventDate: formData.eventDate ? new Date(formData.eventDate) : undefined,
      });

      if (response.success) {
        setSuccess('Η δημοσίευση ενημερώθηκε επιτυχώς');
        setEditingPost(null);
        resetForm();
        fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα ενημέρωσης δημοσίευσης');
      }
    } catch (error: any) {
      console.error('Error updating post:', error);
      setError(error.response?.data?.message || 'Σφάλμα ενημέρωσης δημοσίευσης');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτή τη δημοσίευση;')) return;

    try {
      const response = await adminAPI.deleteNewsPost(id);
      if (response.success) {
        setSuccess('Η δημοσίευση διαγράφηκε επιτυχώς');
        fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(response.message || 'Σφάλμα διαγραφής δημοσίευσης');
      }
    } catch (error: any) {
      console.error('Error deleting post:', error);
      setError(error.response?.data?.message || 'Σφάλμα διαγραφής δημοσίευσης');
    }
  };

  const handleEditPost = (post: NewsPost) => {
    setEditingPost(post);
    setCurrentPostAttachments(post.attachments || []);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      type: post.type,
      author: {
        name: post.author.name,
        image: post.author.image || '/logo.png'
      },
      image: {
        url: post.image.url,
        alt: post.image.alt || '',
        caption: post.image.caption || ''
      },
      tags: post.tags || [],
      status: post.status,
      publishDate: post.publishDate ? new Date(post.publishDate).toISOString().split('T')[0] : '',
      eventDate: post.eventDate ? new Date(post.eventDate).toISOString().split('T')[0] : '',
      location: post.location || '',
      featured: post.featured || false
    });
    setSelectedFiles([]);
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      type: 'announcement',
      author: {
        name: 'ΚΥΚΛΟΣ',
        image: '/logo.png'
      },
      image: {
        url: '',
        alt: '',
        caption: ''
      },
      tags: [],
      status: 'published',
      publishDate: new Date().toISOString().split('T')[0],
      eventDate: '',
      location: '',
      featured: false
    });
    setTagInput('');
    setEditingPost(null);
    setSelectedFiles([]);
    setCurrentPostAttachments([]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleUploadFiles = async () => {
    if (!editingPost || selectedFiles.length === 0) return;

    try {
      setUploadingFiles(true);
      setError('');
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });
      const response = await adminAPI.addNewsFiles(editingPost._id, formData);
      if (response.success) {
        setSuccess('Τα αρχεία ανέβηκαν επιτυχώς');
        setSelectedFiles([]);
        setCurrentPostAttachments(response.data.data?.attachments || []);
        fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: any) {
      console.error('Error uploading files:', error);
      setError(error.response?.data?.message || 'Σφάλμα ανέβασματος αρχείων');
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleDeleteFile = async (filePublicId: string) => {
    if (!editingPost) return;
    if (!confirm('Είστε σίγουροι ότι θέλετε να διαγράψετε αυτό το αρχείο;')) return;

    try {
      setError('');
      const response = await adminAPI.deleteNewsFile(editingPost._id, filePublicId);
      if (response.success) {
        setSuccess('Το αρχείο διαγράφηκε επιτυχώς');
        setCurrentPostAttachments((prev) => (prev || []).filter(f => f.publicId !== filePublicId));
        fetchPosts();
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error: any) {
      console.error('Error deleting file:', error);
      setError(error.response?.data?.message || 'Σφάλμα διαγραφής αρχείου');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  const getTypeLabel = (type: string) => {
    return NEWS_TYPES.find(t => t.value === type)?.label || type;
  };

  const getTypePage = (type: string) => {
    return NEWS_TYPES.find(t => t.value === type)?.page || '/news';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'announcement': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-purple-100 text-purple-800';
      case 'seminar': return 'bg-orange-100 text-orange-800';
      case 'education': return 'bg-green-100 text-green-800';
      case 'universities': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading && posts.length === 0) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E7B109]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Διαχείριση Νέα</h2>
            <p className="text-gray-600">Διαχείριση δημοσιεύσεων νέων και εκδηλώσεων</p>
            <p className="text-sm text-gray-500 mt-1">
              Επιλέξτε κατηγορία για να εμφανίζεται στο αντίστοιχο page: Ανακοινώσεις, Εκδηλώσεις, ή Σεμινάρια
            </p>
          </div>
          <button 
            onClick={() => {
              resetForm();
              setShowAddModal(true);
            }}
            className="bg-gradient-to-r from-[#E7B109] to-[#D97706] text-white px-6 py-3 rounded-lg font-semibold hover:from-[#D97706] hover:to-[#B45309] transition-all duration-300 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Νέα Δημοσίευση
          </button>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
            {success}
          </div>
        )}

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Αναζήτηση..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="all">Όλα τα Status</option>
            <option value="published">Δημοσιευμένα</option>
            <option value="draft">Προσχέδια</option>
            <option value="archived">Αρχειοθετημένα</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => {
              setTypeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
          >
            <option value="all">Όλες οι Κατηγορίες</option>
            <option value="announcement">Ανακοινώσεις</option>
            <option value="event">Εκδηλώσεις - Φωτογραφίες</option>
            <option value="seminar">Σεμινάρια</option>
            <option value="education">Εκπαιδευτικά Νέα</option>
            <option value="universities">Πανεπιστήμια</option>
          </select>

          <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            Περισσότερα
          </button>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Δημοσίευση</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Κατηγορία / Page</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Συγγραφέας</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ημερομηνία</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ενέργειες</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-[#E7B109] to-[#D97706] flex items-center justify-center">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {post.title}
                          {post.featured && (
                            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {post.excerpt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(post.type)}`}>
                        {getTypeLabel(post.type)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {getTypePage(post.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{post.author.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                      {post.status === 'published' ? 'Δημοσιευμένο' : post.status === 'draft' ? 'Πρόχειρο' : 'Αρχειοθετημένο'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(post.publishDate || post.createdAt).toLocaleDateString('el-GR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => window.open(`/news/${post.slug || post._id}`, '_blank')}
                        className="text-blue-600 hover:text-blue-900"
                        title="Προβολή"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleEditPost(post)}
                        className="text-green-600 hover:text-green-900"
                        title="Επεξεργασία"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeletePost(post._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Διαγραφή"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Προηγούμενο
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Επόμενο
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Σελίδα <span className="font-medium">{currentPage}</span> από{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Προηγούμενο
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Επόμενο
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">
                {editingPost ? 'Επεξεργασία Δημοσίευσης' : 'Νέα Δημοσίευση'}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Type Selection - Important for page routing */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Κατηγορία / Page <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                >
                  {NEWS_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label} ({type.page})
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Η δημοσίευση θα εμφανίζεται στο: <strong>{getTypePage(formData.type)}</strong>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Τίτλος <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  placeholder="Τίτλος δημοσίευσης"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Περίληψη <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  rows={3}
                  placeholder="Σύντομη περιγραφή"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Περιεχόμενο <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  rows={10}
                  placeholder="Κύριο περιεχόμενο"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Εικόνας <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    value={formData.image.url}
                    onChange={(e) => setFormData({ ...formData, image: { ...formData.image, url: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.image.alt}
                    onChange={(e) => setFormData({ ...formData, image: { ...formData.image, alt: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                    placeholder="Περιγραφή εικόνας"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Συγγραφέας
                  </label>
                  <input
                    type="text"
                    value={formData.author.name}
                    onChange={(e) => setFormData({ ...formData, author: { ...formData.author, name: e.target.value } })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                    placeholder="Όνομα συγγραφέα"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  >
                    <option value="draft">Πρόχειρο</option>
                    <option value="published">Δημοσιευμένο</option>
                    <option value="archived">Αρχειοθετημένο</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ημερομηνία Δημοσίευσης
                  </label>
                  <input
                    type="date"
                    value={formData.publishDate}
                    onChange={(e) => setFormData({ ...formData, publishDate: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                  />
                </div>
                {(formData.type === 'event' || formData.type === 'seminar') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ημερομηνία Εκδήλωσης/Σεμιναρίου
                    </label>
                    <input
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                    />
                  </div>
                )}
              </div>

              {(formData.type === 'event' || formData.type === 'seminar') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Τοποθεσία
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                    placeholder="Τοποθεσία εκδήλωσης"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E7B109] focus:border-transparent"
                    placeholder="Προσθήκη tag (Enter)"
                  />
                  <button
                    onClick={addTag}
                    className="px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors"
                  >
                    Προσθήκη
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#E7B109] border-gray-300 rounded focus:ring-[#E7B109]"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                  Προτεινόμενη Δημοσίευση
                </label>
              </div>

              {/* File Attachments */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Συνημμένα Αρχεία
                </label>
                
                {/* File Upload */}
                <div className="mb-4">
                  <input
                    type="file"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.png,.jpg,.jpeg,.gif,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.rar"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <Paperclip className="w-4 h-4" />
                    <span className="text-sm text-gray-700">Επιλέξτε αρχεία</span>
                  </label>
                  
                  {/* Selected Files */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{file.name}</span>
                            <span className="text-xs text-gray-500">({formatFileSize(file.size)})</span>
                          </div>
                          <button
                            onClick={() => handleRemoveFile(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      {editingPost && (
                        <button
                          onClick={handleUploadFiles}
                          disabled={uploadingFiles}
                          className="w-full px-4 py-2 bg-[#E7B109] text-white rounded-lg hover:bg-[#D97706] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          {uploadingFiles ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Ανέβασμα...</span>
                            </>
                          ) : (
                            <>
                              <Paperclip className="w-4 h-4" />
                              <span>Ανέβασμα Αρχείων</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Existing Attachments (when editing) */}
                {editingPost && currentPostAttachments && currentPostAttachments.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Υπάρχοντα Συνημμένα:</p>
                    {currentPostAttachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3 flex-1">
                          <FileText className="w-5 h-5 text-blue-600" />
                          <div className="flex-1">
                            <a
                              href={file.secureUrl || file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm font-medium text-blue-700 hover:text-blue-900 flex items-center gap-1"
                            >
                              {file.fileName}
                              <Download className="w-3 h-3" />
                            </a>
                            <p className="text-xs text-gray-500">{formatFileSize(file.fileSize)} • {file.fileType}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteFile(file.publicId)}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Διαγραφή αρχείου"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  resetForm();
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Ακύρωση
              </button>
              <button
                onClick={editingPost ? handleUpdatePost : handleCreatePost}
                className="px-6 py-2 bg-gradient-to-r from-[#E7B109] to-[#D97706] text-white rounded-lg font-semibold hover:from-[#D97706] hover:to-[#B45309] transition-all duration-300 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingPost ? 'Αποθήκευση' : 'Δημιουργία'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewsManagement;

