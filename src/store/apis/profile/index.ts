import { baseApi } from "..";
import { IPassword } from "./profile.types";

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePassword: builder.mutation<IPassword, IPassword>({
      query(value) {
        const { id, password } = value;
        return {
          url: `auth/changePasswordWithId/${id}`,
          method: "PUT",
          body: { password: password },
        };
      },
    }),
  }),
});

export const { useChangePasswordMutation } = profileApi;
