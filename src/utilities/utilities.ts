import { IMyOffer } from 'store/apis/offers/offers.types';
import { IContract } from 'store/apis/contracts/contracts.types';

export const Slicer = (description: string | undefined): string | undefined => {
    let sliced = description?.slice(0, 300);
    if (Number(sliced?.length) < Number(description?.length)) {
        sliced += '...';
    }
    return sliced;
};

export const sortContractsByAB = (
    arr: IContract[],
    a: string,
    b: string
): IContract[] => {
    const arrA = arr.filter((item) => item.status === a);
    const arrB = arr.filter((item) => item.status === b);
    return [...arrA, ...arrB];
};

export const sortOffersByABC = (
    arr: IMyOffer[],
    a: string,
    b: string,
    c: string
): IMyOffer[] => {
    const arrA = arr.filter((item) => item.status === a);
    const arrB = arr.filter((item) => item.status === b);
    const arrC = arr.filter((item) => item.status === c);
    return [...arrA, ...arrB, ...arrC];
};
