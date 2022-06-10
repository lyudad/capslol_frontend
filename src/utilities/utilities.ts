export const Slicer = (description: string | undefined): string | undefined => {
    let sliced = description?.slice(0, 300);
    if (Number(sliced?.length) < Number(description?.length)) {
        sliced += '...';
    }
    return sliced;
};
