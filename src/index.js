import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'; //http library

function Reddit() {
  //initial state is an empty array (posts) - setPosts
  const [posts, setPosts] = React.useState([]);
  //useEffect takes a fn and queues up the fn to run after rendering is complete.
  React.useEffect(() => { //use effect is a react-hook
    axios.get(`https://www.reddit.com/r/reactjs.json`)
      .then(response => {
        const newPosts = response.data.data.children
          .map(obj => obj.data);
        setPosts(newPosts);
      });
  }, []);
  return (
    <div>
      <h1>/r/reactjs</h1>
      <ul>
        {posts.map(
          post => {
            return (
              <li key={post.id}>
                <a href={post.url}>{post.title}</a> | {post.author_fullname} | {post.ups} votes
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}

ReactDOM.render(<Reddit />, document.getElementById('root'));
