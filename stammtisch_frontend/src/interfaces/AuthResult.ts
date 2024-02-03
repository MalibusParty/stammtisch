import type { Role } from "@/enums/Role";

export default interface AuthResult {
    username: string,
    token: string,
    firstname: string,
    lastname: string,
    role: Role
}