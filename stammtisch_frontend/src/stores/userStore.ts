import getUsers from "@/api/getUsers";
import { ref } from "vue";

export interface UserNameMapList {
    [username: string]: string
}

const usersState = ref<UserNameMapList>({});

export function useUsers() {
    async function fetchUsers() {
        const userList = await getUsers();

        const usersMap: UserNameMapList = {};

        userList?.forEach(userDTO => {
            usersMap[userDTO.username] = userDTO.fullname;
        });

        usersState.value = usersMap;
    }

    return {
        usersState,
        fetchUsers
    }
}