import { IContract } from 'store/apis/contracts/contracts.types';

export const Slicer = (description: string | undefined): string | undefined => {
    let sliced = description?.slice(0, 300);
    if (Number(sliced?.length) < Number(description?.length)) {
        sliced += '...';
    }
    return sliced;
};

export const sortArrByAB = (
    arr: IContract[],
    a: string,
    b: string
): IContract[] => {
    return [...arr].sort((item) => {
        if (item.status === a) return 1;
        if (item.status === b) return -1;
        return 0;
    });
};
