import { baseApi } from "..";
import { IPassword } from "./profile.types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleUser: builder.query<any, any>({
      query: (id: number) => ({
        url: `auth/getUser/${id}`,
      }),
    }),
    changePassword: builder.mutation<IPassword, IPassword>({
      query: (value) => ({
        url: `auth/changePasswordWithId/${value.id}`,
        method: "PUT",
        body: { password: value.password },
      }),
    }),
  }),
});

export const { useGetSingleUserQuery, useChangePasswordMutation } = profileApi;
