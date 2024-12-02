import { Api } from "../axios-config";

interface IAuth {
  accessToken: string;
}

const urlAuth = "/auth";

const auth = async (
  email: string,
  password: string
): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get(`${urlAuth}`, { data: { email, password } });

    if (data) {
      return data.id;
    }

    return new Error("Erro no login.");
  } catch (error) {
    console.error(error);
    return new Error(
      (error as { message: string }).message || "Erro no login."
    );
  }
};

export const AuthService = {
  auth,
};
