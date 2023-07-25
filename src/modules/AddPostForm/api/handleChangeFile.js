import axios from 'configs/axios/axios';
import { setLoader } from 'redux/slices/utils';

export const handleChangeFile = async (
  event,
  { createPostFields, setCreatePostFields, setAlertOptions, dispatch },
) => {
  try {
    dispatch(setLoader(true));

    const formData = new FormData();
    const file = event.target.files[0];
    formData.append('image', file);
    const { data } = await axios.post('/upload', formData);
    setCreatePostFields({ ...createPostFields, imageUrl: data.url });

    dispatch(setLoader(false));
  } catch (error) {
    dispatch(setLoader(false));
    setAlertOptions(true, 'error', 'Не удалось загрузить изображение');
  }
};
