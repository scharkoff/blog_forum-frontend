import axios from 'configs/axios/axios';

export const handleChangeFile = async (
  event,
  { setImageUrl, setAlertOptions },
) => {
  try {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file);
    const { data } = await axios.post('/upload', formData);
    setImageUrl(data.url);
  } catch (error) {
    setAlertOptions(true, 'error', 'Не удалось загрузить изображение!');
  }
};
