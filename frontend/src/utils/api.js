import axios from 'axios';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use(config => {
  const token = localStorage.getItem('anzil_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const fetchServices = () => api.get('/services');
export const fetchPortfolio = (category) => api.get(`/portfolio${category && category !== 'All' ? `?category=${category}` : ''}`);
export const fetchBlogs = (params) => api.get('/blogs', { params });
export const fetchBlog = (id) => api.get(`/blogs/${id}`);
export const fetchCaseStudies = () => api.get('/casestudies');
export const fetchTestimonials = () => api.get('/testimonials');
export const submitContact = (data) => api.post('/contact', data);

// Admin
export const adminFetchBlogs = () => api.get('/blogs/all');
export const createBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

export const createPortfolio = (data) => api.post('/portfolio', data);
export const updatePortfolio = (id, data) => api.put(`/portfolio/${id}`, data);
export const deletePortfolio = (id) => api.delete(`/portfolio/${id}`);

export const fetchMessages = () => api.get('/contact');
export const markRead = (id) => api.put(`/contact/${id}/read`);
export const deleteMessage = (id) => api.delete(`/contact/${id}`);

export const createService = (data) => api.post('/services', data);
export const updateService = (id, data) => api.put(`/services/${id}`, data);
export const deleteService = (id) => api.delete(`/services/${id}`);

export const createCaseStudy = (data) => api.post('/casestudies', data);
export const updateCaseStudy = (id, data) => api.put(`/casestudies/${id}`, data);
export const deleteCaseStudy = (id) => api.delete(`/casestudies/${id}`);

export default api;