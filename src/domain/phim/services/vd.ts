// export class MoviesService {
//     static useCommentAction = () => {
//         const queryClient = useQueryClient();

//         const commentMutation = useMutation({
//             mutationFn: async ({
//                 resourceType,
//                 resourceId,
//                 createCommentDTO
//             }: {
//                 resourceType: ResourceType;
//                 resourceId: number;
//                 createCommentDTO: CreateCommentDTO;
//                 user?: CommentDTO["user"];
//             }) => CommentApi.comment(resourceType, resourceId, createCommentDTO),
//             onMutate: async ({ resourceId, createCommentDTO, user }) => {
//                 if (!user) return;
//                 const queryKey = [
//                     this.COMMENT_KEY,
//                     resourceId,
//                     {
//                         pageSize: CommentService.COMMENT_PAGE_SIZE,
//                         page: 1
//                     }
//                 ];
//                 await queryClient.cancelQueries({ queryKey });

//                 const previousData = queryClient.getQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>(queryKey);

//                 if (previousData) {
//                     queryClient.setQueryData<{
//                         pagination: Pagination;
//                         comments: IComment[];
//                     }>(queryKey, {
//                         pagination: previousData.pagination,
//                         comments: [
//                             {
//                                 body: createCommentDTO.body,
//                                 user,
//                                 createdAt: new Date().toISOString(),
//                                 isUploading: true,
//                                 pinOrder: null
//                             },
//                             ...previousData.comments
//                         ]
//                     });
//                 }

//                 return { previousData };
//             },
//             onError: (_, { resourceId, user }, context) => {
//                 if (!user) return;
//                 queryClient.setQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>(
//                     [
//                         this.COMMENT_KEY,
//                         resourceId,
//                         {
//                             pageSize: CommentService.COMMENT_PAGE_SIZE,
//                             page: 1
//                         }
//                     ],
//                     context?.previousData
//                 );
//             },
//             onSettled: (_, __, { resourceId }) => {
//                 queryClient.invalidateQueries({
//                     queryKey: [
//                         this.COMMENT_KEY,
//                         resourceId,
//                         {
//                             pageSize: CommentService.COMMENT_PAGE_SIZE,
//                             page: 1
//                         }
//                     ]
//                 });
//             }
//         });

//         const updateCommentMutation = useMutation({
//             mutationFn: async ({
//                 commentId,
//                 updateCommentDTO
//             }: {
//                 resourceId: number;
//                 commentId: number;
//                 updateCommentDTO: UpdateCommentDTO;
//                 commentPagination?: PaginationFilter;
//             }) => CommentApi.updateComment(commentId, updateCommentDTO),
//             onMutate: async ({ resourceId, commentId, updateCommentDTO, commentPagination }) => {
//                 if (!commentPagination) return;
//                 const queryKey = [this.COMMENT_KEY, resourceId, commentPagination];
//                 await queryClient.cancelQueries({ queryKey });

//                 const previousData = queryClient.getQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>(queryKey);

//                 if (previousData) {
//                     const newCommentData = [...previousData.comments];
//                     const i = newCommentData.findIndex(({ id }) => id === commentId);
//                     newCommentData[i] = {
//                         ...newCommentData[i],
//                         body: updateCommentDTO.body,
//                         isUpdating: true
//                     };
//                     queryClient.setQueryData<{
//                         pagination: Pagination;
//                         comments: IComment[];
//                     }>(queryKey, { pagination: previousData.pagination, comments: newCommentData });
//                 }

//                 return { previousData };
//             },
//             onError: (_, { resourceId, commentPagination }, context) => {
//                 if (!commentPagination) return;
//                 queryClient.setQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>([this.COMMENT_KEY, resourceId, commentPagination], context?.previousData);
//             },
//             onSettled: (_, __, { resourceId, commentPagination }) => {
//                 queryClient.invalidateQueries({ queryKey: [this.COMMENT_KEY, resourceId, commentPagination] });
//             }
//         });

//         const updateStyleCommentMutation = useMutation({
//             mutationFn: async ({
//                 resourceType,
//                 resourceId,
//                 commentId,
//                 updateStyleCommentDTO
//             }: {
//                 resourceType: ResourceType;
//                 resourceId: number;
//                 commentId: number;
//                 updateStyleCommentDTO: UpdateCommentDTO;
//                 commentPagination?: PaginationFilter;
//             }) => CommentApi.updateStyleComment(resourceType, resourceId, commentId, updateStyleCommentDTO),
//             onMutate: async ({ resourceId, commentId, updateStyleCommentDTO, commentPagination }) => {
//                 if (!commentPagination) return;
//                 const queryKey = [this.COMMENT_KEY, resourceId, commentPagination];
//                 await queryClient.cancelQueries({ queryKey });

//                 const previousData = queryClient.getQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>(queryKey);

//                 if (previousData) {
//                     const newCommentData = [...previousData.comments];
//                     const i = newCommentData.findIndex(({ id }) => id === commentId);
//                     newCommentData[i] = {
//                         ...newCommentData[i],
//                         theme: updateStyleCommentDTO.theme,
//                         isUpdating: true
//                     };
//                     queryClient.setQueryData<{
//                         pagination: Pagination;
//                         comments: IComment[];
//                     }>(queryKey, { pagination: previousData.pagination, comments: newCommentData });
//                 }

//                 return { previousData };
//             },
//             onError: (_, { resourceId, commentPagination }, context) => {
//                 if (!commentPagination) return;
//                 queryClient.setQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>([this.COMMENT_KEY, resourceId, commentPagination], context?.previousData);
//             },
//             onSettled: (_, __, { resourceId, commentPagination }) => {
//                 queryClient.invalidateQueries({ queryKey: [this.COMMENT_KEY, resourceId, commentPagination] });
//             }
//         });

//         const deleteCommentMutation = useMutation({
//             mutationFn: ({
//                 commentId
//             }: {
//                 resourceId: number;
//                 commentId: number;
//                 commentPagination?: PaginationFilter;
//             }) => CommentApi.deleteComment(commentId),
//             onMutate: async ({ resourceId, commentId, commentPagination }) => {
//                 if (!commentPagination) return;
//                 const queryKey = [this.COMMENT_KEY, resourceId, commentPagination];
//                 await queryClient.cancelQueries({ queryKey });

//                 const previousData = queryClient.getQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>(queryKey);

//                 if (previousData) {
//                     const newCommentData = [...previousData.comments];
//                     const i = newCommentData.findIndex(({ id }) => id === commentId);
//                     newCommentData[i] = {
//                         ...newCommentData[i],
//                         isDeleting: true
//                     };
//                     queryClient.setQueryData<{
//                         pagination: Pagination;
//                         comments: IComment[];
//                     }>(queryKey, { pagination: previousData.pagination, comments: newCommentData });
//                 }

//                 return { previousData };
//             },
//             onError: (_, { resourceId, commentPagination }, context) => {
//                 if (!commentPagination) return;
//                 queryClient.setQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>([this.COMMENT_KEY, resourceId, commentPagination], context?.previousData);
//             },
//             onSettled: (_, __, { resourceId, commentPagination }) => {
//                 queryClient.invalidateQueries({ queryKey: [this.COMMENT_KEY, resourceId, commentPagination] });
//             }
//         });

//         const pinCommentMutation = useMutation({
//             mutationFn: async ({
//                 resourceType,
//                 resourceId,
//                 commentId
//             }: {
//                 resourceType: string;
//                 resourceId: number;
//                 commentId: number;
//                 commentPagination: PaginationFilter;
//             }) => CommentApi.pinComment(resourceType, resourceId, commentId),
//             onMutate: async ({ resourceId, commentId, commentPagination }) => {
//                 const queryKey = [this.COMMENT_KEY, resourceId, commentPagination];
//                 await queryClient.cancelQueries({ queryKey });

//                 const previousData = queryClient.getQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>(queryKey);

//                 if (previousData) {
//                     const newCommentData = [...previousData.comments].filter((comment) => comment.id !== commentId);

//                     if (commentPagination.page === 1) {
//                         const commentPin = previousData.comments.find((comment) => comment.id === commentId);
//                         if (commentPin) newCommentData.unshift({ ...commentPin, pinOrder: 10000 });
//                     }
//                     queryClient.setQueryData<{
//                         pagination: Pagination;
//                         comments: IComment[];
//                     }>(queryKey, { pagination: previousData.pagination, comments: newCommentData });
//                 }

//                 return { previousData };
//             },
//             onError: (_, { resourceId, commentPagination }, context) => {
//                 if (!commentPagination) return;
//                 queryClient.setQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>([this.COMMENT_KEY, resourceId, commentPagination], context?.previousData);
//             },
//             onSettled: (_, __, { resourceId, commentPagination }) => {
//                 queryClient.invalidateQueries({ queryKey: [this.COMMENT_KEY, resourceId, commentPagination] });
//             }
//         });

//         const unpinCommentMutation = useMutation({
//             mutationFn: async ({
//                 resourceType,
//                 resourceId,
//                 commentId
//             }: {
//                 resourceType: string;
//                 resourceId: number;
//                 commentId: number;
//                 commentPagination: PaginationFilter;
//             }) => CommentApi.unpinComment(resourceType, resourceId, commentId),
//             onMutate: async ({ resourceId, commentId, commentPagination }) => {
//                 const queryKey = [this.COMMENT_KEY, resourceId, commentPagination];
//                 await queryClient.cancelQueries({ queryKey });

//                 const previousData = queryClient.getQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>(queryKey);

//                 if (previousData) {
//                     const newCommentData = [...previousData.comments].filter((comment) => comment.id !== commentId);
//                     queryClient.setQueryData<{
//                         pagination: Pagination;
//                         comments: IComment[];
//                     }>(queryKey, { pagination: previousData.pagination, comments: newCommentData });
//                 }

//                 return { previousData };
//             },
//             onError: (_, { resourceId, commentPagination }, context) => {
//                 queryClient.setQueryData<{
//                     pagination: Pagination;
//                     comments: IComment[];
//                 }>([this.COMMENT_KEY, resourceId, commentPagination], context?.previousData);
//             },
//             onSettled: (_, __, { resourceId, commentPagination }) => {
//                 queryClient.invalidateQueries({ queryKey: [this.COMMENT_KEY, resourceId, commentPagination] });
//             }
//         });

//         return {
//             commentMutation,
//             updateCommentMutation,
//             updateStyleCommentMutation,
//             deleteCommentMutation,
//             pinCommentMutation,
//             unpinCommentMutation
//         };
//     };
// }
