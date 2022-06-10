export const Slicer = (description: string): string => {
    let sliced = description.slice(0, 300);
    if (sliced.length < description.length) {
        sliced += '...';
    }
    return sliced;
};
