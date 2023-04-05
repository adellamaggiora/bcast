import * as R from 'ramda';
import { utilsFns } from "src/functions/utils-fns";
import { IBcast } from "src/interfaces/bcast";
import { IMessage } from "src/interfaces/message";
import { UserAuth } from "src/interfaces/user-auth";
import { IUserInfo } from "src/interfaces/user-info";
import inputDto from "../dto/input-dto";
import { toast } from "./toast";


const errorHandler = (customErrorMessage = 'Handler error') => ({ error, errors, ...props }) => {
    if (error || errors?.length) {
        const e = error?.message || customErrorMessage;
        toast.danger(e);
        throw e;
    }
    return { ...props };
}

const messagesHandler: (obj: Object) => { count: number, messages: IMessage[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.map(inputDto.buildMessage)),
    ({ data, count }) => ({ messages: data, count })
)

const messageInsertedHandler: (obj: Object) => IMessage = R.pipe(
    errorHandler('Error postgres change payload'),
    R.prop('payload'),
    inputDto.buildMessage
)

const bcastsHandler: (obj: Object) => { count: number, bcast: IBcast[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.map(inputDto.buildBcast)),
    ({ data, count }) => ({ bcast: data, count })
)

const userInfoHandler: (obj: Object) => IUserInfo = R.pipe(
    errorHandler(),
    R.prop('data'),
    R.head,
    inputDto.buildUserInfo
)

const authHandler: (obj: Object) => UserAuth = R.pipe(
    errorHandler(),
    R.prop('data'),
    inputDto.buildUserAuth
)

const bcastInteractedHandler: (obj: Object) => { count: number, bcast: IBcast[] } = R.pipe(
    errorHandler(),
    R.over(R.lensPath(['data']), R.pipe(
        R.map(
            R.pipe(
                R.prop('bcast'),
                inputDto.buildBcast
            )
        )
    )),
    ({ data, count }) => ({ bcast: data, count })
)

const dataHasLengthHandler: (obj: Object) => boolean = R.pipe(
    errorHandler(),
    R.prop('data'),
    R.length,
    R.gt(R.__, 0),
    utilsFns.logger('res')
)

export default {
    messagesHandler,
    messageInsertedHandler,
    bcastsHandler,
    bcastInteractedHandler,
    userInfoHandler,
    authHandler,    
    dataHasLengthHandler
}


