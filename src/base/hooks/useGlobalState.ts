import { useQuery, useQueryClient } from "@tanstack/react-query";

type GlobalOption<T> = {
    initialData: T;
    select?: (data: T) => any;
};

export const useGlobalState = <T>(key: any[], options: GlobalOption<T>) => {
    const queryClient = useQueryClient();
    const {
        data = options.initialData,
        isLoading,
        isFetching,
        isError
    } = useQuery<T, unknown, T>({
        queryKey: key,
        queryFn: async () => options.initialData,
        gcTime: Infinity,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: false,
        retry: false,
        ...options
    });
    // updater:  newData | (oldValue)=> newData | async (oldValue)=> newData
    const mutateData = (updater: unknown) => {
        const data = queryClient.setQueryData(key, updater);
        return data as T;
    };

    const resetData = () => {
        queryClient.setQueryData(key, options.initialData);
    };

    return { data, isLoading, isFetching, isError, resetData, mutateData };
};

// Ví dụ về cách sử dụng

// type AuthType = {
//     email: string;
//     role: string;
// };

// const KEY = "AUTH";
// const useAuthState = () => {
//     const { data, mutateData } = useGlobalState<AuthType>([KEY], {
//         initialData: {
//             email: "hung24855@gmail.com",
//             role: "admin"
//         }
//     });

//     const updatEmail = (email: string) => {
//         mutateData((prev: AuthType) => ({ ...prev, email }));
//     };

//     const updatRole = (role: string) => {
//         mutateData({
//             ...data,
//             role
//         });
//     };

//     return { data, updatEmail, updatRole };
// };

// export default function TestGlobalState() {
//     const { data, updatEmail, updatRole } = useAuthState();
//     return (
//         <div>
//             <Button onClick={() => updatEmail("update@gmail.com")}>Update email</Button>
//             <Button onClick={() => updatRole("user")}>Update role</Button>
//             <div>{data.email}</div>
//             <div>{data.role}</div>
//         </div>
//     );
// }
