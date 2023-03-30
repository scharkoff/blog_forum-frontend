import axios from "configs/axios/axios";

export const onSubmitPost = async ({ title, text, imageUrl, tags, authorId, isEditing, setAlertOptions, navigate, id }) => {
    try {
        const fieldsCreate = {
            title,
            text,
            imageUrl,
            tags: Array.isArray(tags) ? tags : tags.replaceAll(" ", "").split(","),
        };

        const fieldsUpdate = {
            title,
            text,
            imageUrl,
            tags: Array.isArray(tags) ? tags : tags.replaceAll(" ", "").split(","),
            user: authorId,
        };

        const { data } = isEditing
            ? await axios.patch(`/posts/${id}`, fieldsUpdate)
            : await axios.post("/posts", fieldsCreate);

        const _id = isEditing ? id : data.post?._id;

        navigate(`/posts/${_id}`);
    } catch (error) {
        setAlertOptions(true, "error", error.response?.data[0]?.msg);
    }
};