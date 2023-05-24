import type {PublicBucketList} from "./PublicBucketList";
import type {User} from "./User";



export interface PrivateBucketList{
    id: number;
    public_item: PublicBucketList;
    user_item: User;

}