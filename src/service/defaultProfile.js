import md5 from "md5";

const generateProfilePicture = ( firstName,lastName) =>{
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    const fullName = `${firstName}${lastName}`;
    const hash = md5(fullName);
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=200&hash=${hash}`;

}

export default generateProfilePicture;