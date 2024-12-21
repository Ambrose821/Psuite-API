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
const batch_file_type_check = (file_arr) => {
    if(file_arr.length > 1 && !file_arr.length <=0 ){
        return 'multi'
    }else if(file_arr.length <=0 ){
        return 'other'
    }
    const file = file_arr[0];
    const mime_type = file.mimetype;

    if (mime_type.startsWith('image/')) {
        return 'image';
    } else if (mime_type.startsWith('video/')) {
        return 'video';
    } else {
        return 'other';
    }
};

const batch_url_file_type_check = (urls) =>{
    if(urls.length >1 && !urls.length <=0 ){
        return 'multi';
    }
    else if(urls.length <= 0){
        return 'other';
    }
    const url = urls[0];

    if(url.includes('video')){
        return 'video';
    }
    else if(url.includes('image')){
        return 'image';
    }
    else{
        return 'other';
    }
}

module.exports = {file_type_check,batch_file_type_check,batch_url_file_type_check}