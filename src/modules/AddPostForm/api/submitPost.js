import axios from "../../../configs/axios/axios";

export const onSubmitPost = async ({ title, text, imageUrl, tags, authorId, isEditing, setLoading, setAlertText, setAlertType, setOpen, navigate, id }) => {
    try {
        setLoading(true);

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
            : await axios.post("/posts/create", fieldsCreate);

        const _id = isEditing ? id : data._id;

        navigate(`/posts/${_id}`);
    } catch (error) {
        setAlertText(error.response?.data[0]?.msg);
        setAlertType("error");
        setOpen(true);
    }
};