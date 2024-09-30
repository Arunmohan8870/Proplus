import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { all } from "../common";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${all.baseurl}`,
  }),
  tagTypes: ["subDepartment", "createProduct", "addPosition", "addProduct", "addcategory", "addDepartment"],
  endpoints: (builder) => ({}),
})
