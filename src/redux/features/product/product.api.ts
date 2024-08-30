import { baseApi } from "@/redux/api/api";
import { IProduct } from "@/types";
interface IQueryOptions {
  searchTerm?: string;
  min?: number;
  max?: number;
  sort?: string;
  page?: string | number;
  category?: string[];
}

interface IProductResponse {
  data: IProduct[];
  totalDoc: number;
}
const productAPI = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (payload) => ({
        url: "/product/create",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    getAllProduct: builder.query<IProductResponse, IQueryOptions>({
      query: (query: IQueryOptions) => {
        const {
          max = "",
          min = "",
          searchTerm = "",
          sort = "",
          page,
          category,
        } = query;

        let categories = "";
        category?.length &&
          category.forEach(
            (e, i) =>
              (categories = i !== 0 ? categories + "," + e : categories + e)
          );
        console.log({ category, categories });

        return {
          url: `/product?searchTerm=${searchTerm}&min=${min}&max=${max}&sort=${sort}&category=${categories}&page=${
            page || "1"
          }`,
          method: "GET",
        };
      },
      providesTags: ["product"],
    }),
    getProductById: builder.query<{ data: IProduct }, string>({
      query: (productId) => ({
        url: `/product/get/${productId}`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    getFeaturedProducts: builder.query<{ data: IProduct[] }, undefined>({
      query: () => ({
        url: `/product/featured`,
        method: "GET",
      }),
      providesTags: ["product"],
    }),
    updateProductById: builder.mutation({
      query: ({
        productId,
        payload,
      }: {
        productId: string;
        payload: Partial<IProduct>;
      }) => ({
        url: `/product/update/${productId}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
    deleteProductById: builder.mutation({
      query: (productId: string) => ({
        url: `/product/delete/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
    orderManyProduct: builder.mutation({
      query: (payload) => ({
        url: `/product/order-many`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useOrderManyProductMutation,
  useDeleteProductByIdMutation,
  useUpdateProductByIdMutation,
  useGetFeaturedProductsQuery,
} = productAPI;
