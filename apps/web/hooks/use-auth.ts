import api from "@/lib/api";
import { SignupInput } from "@joo-joo-messenger/schemas";
import { useMutation } from "@tanstack/react-query";

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
