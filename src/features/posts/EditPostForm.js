import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { postUpdated, selectPostById } from "./postsSlice";

export const EditPostForm = ({ match }) => {
  const { postId } = match.params;

  const post = useSelector((state) => selectPostById(state, postId));

  // const post = useSelector((state) =>
  //   state.posts.find((post) => post.id === postId)
  // );

  const [title, setTitle] = useState(post.title);
  const [content, setTContent] = useState(post.content);

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setTContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postUpdated({ id: postId, title, content }));
      history.push(`/post/${postId}`);
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postContent">Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          placeholder="What's on your mind?"
          value={content}
          onChange={onContentChanged}
        />
      </form>
      <button type="button" onClick={onSavePostClicked}>
        Save Post
      </button>
    </section>
  );
};
