import AddFriend from './AddFriend';
import MyFriends from './MyFriends';
import FriendRequest from './FriendRequest';

function App() {
  return (
    <div>
      <div className="Friend">
        <AddFriend />
        <MyFriends />
        <FriendRequest />
        <button className="return-back">Return</button>
        <br></br>
      </div>
    </div>
  );
}

export default App;
