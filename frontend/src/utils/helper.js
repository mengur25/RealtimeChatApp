
export const getInitials = (name) =>{
    if(!name) return "";

    const words = name.split(" ");
    let initials ="";

    for(let i = 0; i < Math.min(words.length, 2); i++){
        initials += words[i][0];
    }

    return initials.toUpperCase();
};

export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("vi-VN", {
        hour:"2-digit",
        minute:"2-digit",
        hour12: false,
    });
};