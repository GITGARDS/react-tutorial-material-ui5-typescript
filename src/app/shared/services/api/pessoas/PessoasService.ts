import { Environment } from "../../../environment";
import { Api } from "../axios-config";

interface IListagemPessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

interface IDetalhePessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}

type IPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

const url = "/pessoas";

const getAll = async (
  page = 1,
  filter = ""
): Promise<IPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `${url}?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(
          headers["x-total-count"] || Environment.LIMITE_DE_LINHAS
        ),
      };
    }
    return new Error("Erro ao tentar listar registros!");
  } catch (error: any) {
    return new Error(
      (error as { message: string }).message || "Erro ao tentar consultar a api"
    );
  }
};

const getById = async (id: number): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.get(`${url}/${id}`);
    return data;
  } catch (error: any) {
    return new Error(
      (error as { message: string }).message || "Erro ao tentar consultar a api"
    );
  }
};

const create = async (
  body: Omit<IDetalhePessoa, "id">
): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.post<any>(url, body);
    return data;
  } catch (error: any) {
    return new Error(
      (error as { message: string }).message || "Erro ao tentar consultar a api"
    );
  }
};

const updateById = async (
  id: string,
  body: IDetalhePessoa
): Promise<IDetalhePessoa | Error> => {
  try {
    const { data } = await Api.put(`${url}/${id}`, body);
    return data;
  } catch (error: any) {
    return new Error(
      (error as { message: string }).message || "Erro ao tentar consultar a api"
    );
  }
};

const deleteById = async (id: string): Promise<undefined | Error> => {
  try {
    await Api.delete(`${url}/${id}`);
    return undefined;
  } catch (error: any) {
    return new Error(
      (error as { message: string }).message || "Erro ao tentar consultar a api"
    );
  }
};

export const TarefasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
