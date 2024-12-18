const file_type_check = (file) => {
    const mime_type = file.mimetype;

    if (mime_type.startsWith('image/')) {
        return 'image';
    } else if (mime_type.startsWith('video/')) {
        return 'video';
    } else {
        return 'other';
    }
};

module.exports = {file_type_check}