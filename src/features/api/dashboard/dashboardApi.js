import { all } from "axios";
import { api } from "../api";

export const dashboardApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSubDepartment: builder.mutation({
            query: (query) => ({
                url: "/subdepartment/add_subdeparment",
                method: "POST",
                body:query
            }),

            invalidatesTags:["subDepartment"],
        }),

        createProduct: builder.mutation({
            query: (query) => ({
                url: "/product_assign/add_product_assign",
                method: "POST",
                body: query
            }),

            invalidatesTags:["createProduct"],
        }),

        addPosition: builder.mutation({
            query: (query) => ({
                url: "/position/add_position",
                method: "POST",
                body:query
            }),

            invalidatesTags:["addPosition"],
        }),

        addProduct: builder.mutation({
            query: (query) => ({
                url: "/product/add_product",
                method: "POST",
                body: query

            }),

            invalidatesTags:["addProduct"],
        }),

        addCategory: builder.mutation({
            query: (query) => ({
                url: "/category/add_category",
                method: "POST",
                body: query
            }),

            invalidatesTags:["addcategory"],
        }),

        addDepartment: builder.mutation({
            query: (values) => ({
                url: "/department/add_deparment",
                method: "POST",
                body:values
            }),

            invalidatesTags:["addDepartment"],
        }),

        addEmployee: builder.mutation({
            query: (query) => ({
                url: "/employee/add_employee",
                method: "POST",
                body: query
            }),

            invalidatesTags:["addEmployee"],
        }),

        allDepartment: builder.query({
            query: () => ({
              url: "/department/all_deparment",
              method: "GET",
            }),
            providesTags: ["allDepartment"],
          }),

          allProduct: builder.query({
            query: (query) => ({
              url: `/product/all_product?search=${query}`,
              method: "GET",
            }),
            providesTags: ["allProduct"],
          }),

          allCategory: builder.query({
            query: () => ({
              url: "/category/all_category",
              method: "GET",
            }),
            providesTags: ["allCategory"],
          }),

          allEmployee: builder.query({
            query: (query) => ({
              url: `/employee/all_employee?search=${query}`,
              method: "GET",
            }),
            providesTags: ["allEmployee"],
          }),

          allPosition: builder.query({
            query: () => ({
              url: "/position/all_position",
              method: "GET",
            }),
            providesTags: ["allPosition"],
          }),

          allSubDepartment: builder.query({
            query: () => ({
              url: "/subdepartment/all_subdeparment",
              method: "GET",
            }),
            providesTags: ["allSubDepartment"],
          }),

          allProductAssign: builder.query({
            query: () => ({
              url: "/product_assign/all_product_assign",
              method: "GET",
            }),
            providesTags: ["allProductAssign"],
          }),

          editEmployee: builder.mutation({
            query: ({value,selectedId}) => ({
              url: `/employee/edit_employee/${selectedId}`,
              method: 'PUT',
              body: value
            }),
          }),

          editProductAssign: builder.mutation({
            query: ({value,produrtReturnId}) => ({
              url: `/product_assign/edit_product_assign/${produrtReturnId}`,
              method: 'PUT',
              body: value
            }),
          }),



    }),
});

export const { useCreateSubDepartmentMutation, useCreateProductMutation, useAddPositionMutation, useAddProductMutation, 
useAddCategoryMutation, useAddDepartmentMutation, useAddEmployeeMutation, useAllDepartmentQuery, useAllProductQuery,
useAllCategoryQuery, useAllEmployeeQuery, useAllPositionQuery, useAllSubDepartmentQuery, useAllProductAssignQuery,
useEditEmployeeMutation, useEditProductAssignMutation

} = dashboardApi;


