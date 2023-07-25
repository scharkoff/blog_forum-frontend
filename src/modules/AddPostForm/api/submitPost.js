import axios from 'configs/axios/axios';
import { setLoader } from 'redux/slices/utils';

export const onSubmitPost = async ({
  title,
  text,
  imageUrl,
  tags,
  authorId,
  isEditing,
  setAlertOptions,
  navigate,
  id,
  dispatch,
}) => {
  try {
    dispatch(setLoader(true));
    const fieldsCreate = {
      title,
      text,
      imageUrl,
      tags: Array.isArray(tags) ? tags : tags.replaceAll(' ', '').split(','),
    };

    const fieldsUpdate = {
      title,
      text,
      imageUrl,
      tags: Array.isArray(tags) ? tags : tags.replaceAll(' ', '').split(','),
      user: authorId,
    };

    const { data } = isEditing
      ? await axios.patch(`/posts/${id}`, fieldsUpdate)
      : await axios.post('/posts', fieldsCreate);

    dispatch(setLoader(false));

    const _id = isEditing ? id : data.post?._id;

    return navigate(`/posts/${_id}`);
  } catch (error) {
    dispatch(setLoader(false));

    if (!error.response.data)
      return setAlertOptions(
        true,
        'error',
        'Серверная ошибка. Пожалуйста, попробуйте позже',
      );

    return Array.isArray(error.response.data)
      ? setAlertOptions(true, 'error', error.response.data[0].msg)
      : setAlertOptions(true, 'error', error.response.data.message);
  }
};
