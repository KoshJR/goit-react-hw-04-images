import axios from 'axios';

const API_KEY = '21553386-e1fcc9148c3de34a06388a4a6';
const BASE_URL = 'https://pixabay.com/api';

export const fetchGalleryItems = async (textInput, pages, per_page) => {
  return await axios.get(
    `${BASE_URL}/?q=${textInput}&key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${pages}`
  );
};
