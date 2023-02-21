import AddFriend from './AddFriend';
import MyFriends from './MyFriends';
import FriendRequest from './FriendRequest';
import './Friends.css';

function Friends({ ChangePage }) {
  return (
    <div>
      <div className="Friend">
        <AddFriend />
        <MyFriends />
        <FriendRequest />
        <button className="return-back" onClick={() => ChangePage("main")}>Return</button>
        <br></br>
      </div>
    </div>
  );
}

export default Friends;
