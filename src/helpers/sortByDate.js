export const sortByDate = (items, isDescending=true) => {

    return [...items].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        
        return isDescending ? dateB - dateA : dateA - dateB;
    });
};
