import { IMessage } from "src/interfaces/message";
import { IUserInfo } from "src/interfaces/user-info";
import inputDto from '../dto/input-dto';
import { AuthResponse, PostgrestSingleResponse, RealtimePostgresInsertPayload, SupabaseClient } from "@supabase/supabase-js";
import { IBcast } from "src/interfaces/bcast";
import { IListedBcast } from "src/interfaces/listed-bcast";
import { UserAuth } from "src/interfaces/user-auth";
import { IRawMessage } from "src/interfaces/raw/raw-message";
import { IRawListedBcast } from "src/interfaces/raw/raw-listed-bcast";
import { IRawUserInfo } from "src/interfaces/raw/raw-user-info";
import { IRawBcast } from "src/interfaces/raw/raw-bcast";
import { BCAST_MAIN_IMAGE_NAME, apiUtils } from "./api-utils";


const _errorHandler = ({ error }, errors?: string[]) => {
    if (error || errors) {
        throw error.message || `Generic API error`;
    }
}

const messageListHandler = (response: PostgrestSingleResponse<IRawMessage[]>): IMessage[] => {
    _errorHandler(response);
    const messageList: IMessage[] = response?.data?.map(inputDto.buildMessage);
    return messageList;
}

const messageInsertedHandler = (response: RealtimePostgresInsertPayload<{ [key: string]: any }>): IMessage => {
    _errorHandler(null, response?.errors);
    const rawMessage = response?.new as IRawMessage;
    const message: IMessage = inputDto.buildMessage(rawMessage);
    return message;
}

const bcastListHandler =
    (supabase: SupabaseClient<any, "public", any>) =>
        async (response: PostgrestSingleResponse<IRawListedBcast[]>): Promise<IListedBcast[]> => {
            _errorHandler(response);
            const rawListedBcast: IRawListedBcast[] = response.data;
            const imagePromises = rawListedBcast?.map(async rawBcast => {
                const listResponse = await supabase
                    .storage
                    .from('bcast')
                    .list(rawBcast.id)

                _errorHandler(listResponse);

                let image: File;

                if (listResponse?.data?.length) {
                    const mainImage = listResponse?.data?.find(_ => _.name?.includes(BCAST_MAIN_IMAGE_NAME));
                    if (mainImage) {
                        const blobResponse = await apiUtils.getBcastImageBlob(supabase, rawBcast.id, mainImage.name);
                        _errorHandler(blobResponse);
                        image = new File([blobResponse.data], mainImage.name);
                    }
                }

                const listedBcast: IListedBcast = inputDto.buildListedBcast(rawBcast, image);
                return listedBcast;
            });

            return Promise.all(imagePromises);
        }

const bcastHandler =
    (supabase: SupabaseClient<any, "public", any>) =>
        async (response: PostgrestSingleResponse<IRawBcast[]>): Promise<IBcast> => {
            _errorHandler(response);
            const rawBcast: IRawBcast = response.data.at(0);
            const listResponse = await supabase
                .storage
                .from('bcast')
                .list(rawBcast.id)

            _errorHandler(listResponse);

            let image: File;

            if (listResponse?.data?.length) {
                const mainImage = listResponse?.data?.find(_ => _.name?.includes('main'));
                if (mainImage) {
                    const blobResponse = await apiUtils.getBcastImageBlob(supabase, rawBcast.id, mainImage.name);
                    _errorHandler(blobResponse);
                    image = new File([blobResponse.data], mainImage.name);
                }
            }
            
            const bcast: IBcast = inputDto.buildBcast(response?.data?.at(0), image);
            return bcast;
        }

const userInfoHandler = (response: PostgrestSingleResponse<IRawUserInfo[]>): IUserInfo => {
    _errorHandler(response);
    const data = response?.data?.at(0) as IRawUserInfo;
    const userInfo: IUserInfo = inputDto.buildUserInfo(data);
    return userInfo;
}

const authHandler = (response: AuthResponse): UserAuth => {
    _errorHandler(response);
    const userAuth: UserAuth = inputDto.buildUserAuth(response?.data);
    return userAuth;
}

const dataHasLengthHandler = (response: PostgrestSingleResponse<any>) => {
    _errorHandler(response);
    const dataHasLength: boolean = response?.data?.length > 0;
    return dataHasLength;
}


export default {
    messageListHandler,
    messageInsertedHandler,
    bcastListHandler,
    bcastHandler,
    userInfoHandler,
    authHandler,
    dataHasLengthHandler
}


