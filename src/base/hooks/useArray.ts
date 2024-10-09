import { useState } from "react";

type UseArrayHook<T> = {
    value: T[];
    push: (item: T) => void;
    update: (index: number, item: T) => void;
    remove: (index: number) => void;
    findIndex: (predicate: (item: T) => boolean) => number;
    clear: () => void;
};

const useArray = <T>(): UseArrayHook<T> => {
    const [array, setArray] = useState<T[]>([]);

    const push = (item: T) => {
        setArray((prevArray) => [...prevArray, item]);
    };

    const update = (index: number, item: T) => {
        setArray((prevArray) => {
            const newArray = [...prevArray];
            newArray[index] = item;
            return newArray;
        });
    };

    const findIndex = (predicate: (item: T) => boolean) => {
        return array.findIndex(predicate);
    };

    const remove = (index: number) => {
        setArray((prevArray) => prevArray.filter((_, i) => i !== index));
    };

    const clear = () => {
        setArray([]);
    };

    return { value: array, push, update, remove, findIndex, clear };
};

export default useArray;

// import React from 'react';
// import useArray from './useArray';

// const MyComponent = () => {
//   const { value, push, update, remove } = useArray<number>();

//   return (
//     <div>
//       <h1>Array: {value.join(', ')}</h1>
//       <button onClick={() => push(1)}>Add 1</button>
//       <button onClick={() => update(0, 2)}>Update first item to 2</button>
//       <button onClick={() => remove(0)}>Remove first item</button>
//     </div>
//   );
// };
