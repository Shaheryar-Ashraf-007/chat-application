import { useQuery } from '@tanstack/react-query';
import { getUserFriends } from '../lib/api';
import FriendCard from '../components/FriendCard';

const FriendsPage = () => {
  const { data: friends = [], isLoading, error } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching friends: {error.message}</div>;
  }

  return (
    <div className='mt-10 ml-10 mr-10'>
    <div className='w-[320px]'>
        {friends.map(friend => (
        <FriendCard key={friend._id} className="w-1/3 px-2 mb-4" friend={friend} />

        ))}
    </div>
    </div>
  );
};

export default FriendsPage;