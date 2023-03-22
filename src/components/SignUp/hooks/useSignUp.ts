import { AuthResponse } from "@supabase/gotrue-js";
import { useContext } from "react";
import { defaultSupabaseContext } from "../../../constants/supabase";
import { SupabaseContext } from "../../../context/SupabaseContext";

interface useSignUpProps {
  email: string;
  password: string;
}

const useSignUp = () => {
  const { supabaseClient } =
    useContext(SupabaseContext) ?? defaultSupabaseContext;

  const handleSignUp = async ({ email, password }: useSignUpProps) => {
    try {
      const res: AuthResponse | undefined = await supabaseClient?.auth.signUp({
        email,
        password,
      });

      if (res?.data) {
        const { user, session } = res.data;

        console.log("SUCCESS", user, session);
        return { user, session };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    handleSignUp,
  };
};

export default useSignUp;
