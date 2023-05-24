import type {PublicDestinations} from "./PublicDestinations";
import type {User} from "./User";



export interface PrivateBucketList{
    id: number;
    public_item: PublicDestinations;
    user_item: User;

}