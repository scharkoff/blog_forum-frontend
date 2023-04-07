import axios from 'configs/axios/axios';

export const handleChangeFile = async (
  event,
  { createPostFields, setCreatePostFields, setAlertOptions },
) => {
  try {
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file);
    const { data } = await axios.post('/upload', formData);
    setCreatePostFields({ ...createPostFields, imageUrl: data.url });
  } catch (error) {
    setAlertOptions(true, 'error', 'Не удалось загрузить изображение');
  }
};
