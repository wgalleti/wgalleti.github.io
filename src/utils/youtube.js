/**
 * Fetches videos from YouTube channel with caching
 * @param {string} channelHandle - YouTube channel handle (e.g., 'wGalleti')
 * @param {number} maxResults - Maximum number of videos to fetch
 * @param {boolean} forceRefresh - Whether to bypass cache and force a refresh
 * @returns {Promise<Array>} - Array of video objects
 */
export async function fetchYouTubeVideos(channelHandle = 'wGalleti', maxResults = 6, forceRefresh = false) {
  try {
    // Check if we have cached data and not forcing refresh
    if (!forceRefresh) {
      const cachedData = getCachedVideos(channelHandle);
      if (cachedData) {
        console.log('Using cached YouTube data');
        return cachedData;
      }
    } else {
      console.log('Force refreshing YouTube data');
      // Clear existing cache if forcing refresh
      clearCache(channelHandle);
    }
    
    console.log('Fetching fresh YouTube data');
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
    
    if (!apiKey) {
      console.error('YouTube API key not found in environment variables');
      return getMockData();
    }
    
    // First get the channel ID from the channel handle
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelHandle}&type=channel&key=${apiKey}`
    );
    
    if (!channelResponse.ok) {
      throw new Error(`Failed to get channel ID: ${channelResponse.status}`);
    }
    
    const channelData = await channelResponse.json();
    
    if (!channelData.items || channelData.items.length === 0) {
      throw new Error('Channel not found');
    }
    
    const channelId = channelData.items[0].id.channelId;
    
    // Then get the videos for that channel
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
    );
    
    if (!videosResponse.ok) {
      throw new Error(`Failed to fetch videos: ${videosResponse.status}`);
    }
    
    const videosData = await videosResponse.json();
    
    const videos = videosData.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt
    }));
    
    // Cache the results
    cacheVideos(channelHandle, videos);
    
    return videos;
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    // Return mock data as fallback
    return getMockData();
  }
}

/**
 * Cache expiration time in milliseconds (24 hours)
 */
const CACHE_EXPIRATION = 24 * 60 * 60 * 1000;

/**
 * Cache videos in localStorage with expiration timestamp
 * @param {string} channelHandle - Channel handle used as cache key
 * @param {Array} videos - Videos data to cache
 */
function cacheVideos(channelHandle, videos) {
  try {
    const cacheData = {
      videos,
      timestamp: Date.now(),
      expiration: Date.now() + CACHE_EXPIRATION
    };
    
    localStorage.setItem(`youtube_${channelHandle}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching YouTube videos:', error);
  }
}

/**
 * Get cached videos if available and not expired
 * @param {string} channelHandle - Channel handle used as cache key
 * @returns {Array|null} - Cached videos or null if not available
 */
function getCachedVideos(channelHandle) {
  try {
    const cachedData = localStorage.getItem(`youtube_${channelHandle}`);
    
    if (!cachedData) {
      return null;
    }
    
    const { videos, expiration } = JSON.parse(cachedData);
    
    // Check if cache is expired
    if (Date.now() > expiration) {
      console.log('YouTube cache expired, removing');
      localStorage.removeItem(`youtube_${channelHandle}`);
      return null;
    }
    
    return videos;
  } catch (error) {
    console.error('Error retrieving cached YouTube videos:', error);
    return null;
  }
}

/**
 * Provides mock YouTube video data as fallback
 * @returns {Array} Array of video objects
 */
function getMockData() {
  return [
    {
      id: 'LHvxXKirOZg',
      title: 'Como configurar Django com Docker e Poetry',
      description: 'Aprenda a configurar um ambiente de desenvolvimento Django completo com Docker e Poetry',
      thumbnail: 'https://i.ytimg.com/vi/LHvxXKirOZg/mqdefault.jpg',
      publishedAt: '2023-10-15'
    },
    {
      id: 'V8vQAUW54gU',
      title: 'Django REST Framework: API Completa em 30 minutos',
      description: 'Criando uma API RESTful com Django REST Framework de forma rápida e eficiente',
      thumbnail: 'https://i.ytimg.com/vi/V8vQAUW54gU/mqdefault.jpg',
      publishedAt: '2023-09-18'
    },
    {
      id: 'nHCXZC2InAA',
      title: 'Vue.js 3 + Tailwind CSS: Dashboard Responsivo',
      description: 'Desenvolvendo um dashboard moderno e responsivo com Vue.js 3 e Tailwind CSS',
      thumbnail: 'https://i.ytimg.com/vi/nHCXZC2InAA/mqdefault.jpg',
      publishedAt: '2023-08-22'
    },
    {
      id: 'jqp6CaJTRtk',
      title: 'Automação Python com Selenium',
      description: 'Como automatizar tarefas repetitivas no navegador usando Python e Selenium',
      thumbnail: 'https://i.ytimg.com/vi/jqp6CaJTRtk/mqdefault.jpg',
      publishedAt: '2023-07-10'
    },
    {
      id: 'D-sAwn4bCO8',
      title: 'Nuxt.js 3: SSR vs. SSG vs. CSR',
      description: 'Entendendo as diferenças entre Server-Side Rendering, Static Site Generation e Client-Side Rendering',
      thumbnail: 'https://i.ytimg.com/vi/D-sAwn4bCO8/mqdefault.jpg',
      publishedAt: '2023-06-15'
    },
    {
      id: 'OCg8cg8MHaQ',
      title: 'API Django + Celery: Processamento Assíncrono',
      description: 'Implementando filas e tarefas assíncronas em projetos Django com Celery',
      thumbnail: 'https://i.ytimg.com/vi/OCg8cg8MHaQ/mqdefault.jpg',
      publishedAt: '2023-05-20'
    }
  ];
}

/**
 * Clears the cache for a specific channel or all channels
 * @param {string|null} channelHandle - Channel handle to clear, or null for all
 */
export function clearCache(channelHandle = null) {
  try {
    if (channelHandle) {
      localStorage.removeItem(`youtube_${channelHandle}`);
      console.log(`Cleared cache for channel: ${channelHandle}`);
    } else {
      // Find all youtube cache keys and remove them
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('youtube_')) {
          localStorage.removeItem(key);
        }
      });
      console.log('Cleared all YouTube cache');
    }
  } catch (error) {
    console.error('Error clearing cache:', error);
  }
} 