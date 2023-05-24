
import { PrivateBucketList } from "./PrivateBucketList"
export interface User {
    id: number;
    username: string;
    password: string;
    role: string;
    destination:PrivateBucketList;
}