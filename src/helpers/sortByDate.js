export const sortByDate = (items, isDescending) => {

    return [...items].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        
        return isDescending ? dateB - dateA : dateA - dateB;
    });
};
