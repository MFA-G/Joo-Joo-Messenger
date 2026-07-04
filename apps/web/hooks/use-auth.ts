import type { SignupInput } from "@joo-joo-messenger/schemas";
import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

export function useCheckUsernameQuery(usernameQuery: string) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["check-username", usernameQuery],
    queryFn: async () => {
      const response = await api.get("/v1/auth/check-username", {
        params: {
          username: usernameQuery,
        },
      });

      return response.data;
    },

    retry: false,
    enabled: usernameQuery.length >= 3,
  });

  return { data, isLoading, isError };
}

export function useSignupMutate() {
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["auth", "sign-up"],
    mutationFn: async (payload: SignupInput) => {
      const response = await api.post("/v1/auth/sign-up", payload);

      return response.data;
    },
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(`something went wrong`, error);
    },
  });

  return { mutate, isPending, isError };
}
