import { v4 as uuidv4 } from 'uuid';

const createUser = (userName) => {
    const id = uuidv4()
    const user = {
        userName,
        id,
    }
    return user;
}

export default createUser