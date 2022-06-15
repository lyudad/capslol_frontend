/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const CustomHook = (props: { setMessageText: any; emoji: any }) => {
    const { emoji, setMessageText } = props;

    useEffect(() => {
        emoji && setMessageText((prev: any) => prev + emoji);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [emoji]);

    return null;
};
