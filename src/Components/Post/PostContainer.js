import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
    id, 
    user, 
    files, 
    likeCount, 
    isLiked, 
    comments, 
    createdAt,
    caption,
    location
    }) => {
        const [isLikedS, setIsLiked] = useState(isLiked);
        const [likeCountS, setLikeCount] = useState(likeCount);
        const [currentItem, setCurrentItem] = useState(0);
        const [selfComments, setSelfComments] = useState([]);
        const comment = useInput("");

        const [toggleLikeMutation] = useMutation(TOGGLE_LIKE,
          { variables: { postId: id } });
        const [addCommentMutation] = useMutation(ADD_COMMENT,
          { variables: { postId: id, text: comment.value } });
        
        const slide = () => {
          const totalFiles = files.length;
          if(currentItem === totalFiles-1){
            setTimeout(()=> setCurrentItem(0), 2000);
          }else{
            setTimeout(()=> setCurrentItem(currentItem+1), 2000);
          }
        };

        //엔터누르면 comment 제출
        const onKeyPress = async(event) => {  //comment가 DB에 저장될때까지 기다림
          const {which} = event;
          
          if (which === 13) {//enter : 13
            event.preventDefault();
            try{
              const {
                data: {addComment}
              } = await addCommentMutation();
              setSelfComments([...selfComments, addComment]);
              comment.setValue("");
            }catch{
              toast.error("Can't send comment");
            }

          }
        };
        useEffect(() => {
          slide();
        }, [currentItem]);  
        
        const toggleLike = () => {
          toggleLikeMutation();

          if (isLikedS === true){
            setIsLiked(false);
            setLikeCount(likeCountS - 1);
          }else{
            setIsLiked(true);
            setLikeCount(likeCountS + 1);
          }
        };

        //datetime parsing
        const datetime = new Date(createdAt);
        const nowDatetime = new Date();
        let parsedDate = "";
        if(datetime.getFullYear() === nowDatetime.getFullYear()){ //올해면 월,일만 출력 
          parsedDate = `${ datetime.getMonth()+1 }.${ datetime.getDate()}`;
        } else {
          parsedDate = `${datetime.getFullYear()}.${datetime.getMonth()+1}.${datetime.getDate()}`;
        }

        return (
          <PostPresenter
            user={user}
            files={files}
            likeCount={likeCountS}
            location={location}
            caption={caption}
            isLiked={isLikedS}
            comments={comments}
            createdAt={parsedDate}
            newComment={comment}
            setIsLiked={setIsLiked}
            setLikeCount={setLikeCount}
            currentItem={currentItem}
            toggleLike={toggleLike}
            onKeyPress={onKeyPress}
            selfComments={selfComments}
          />
        );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      username: PropTypes.string.isRequired
    }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: 
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          username: PropTypes.string.isRequired
        }).isRequired
    })
  ).isRequired,
  caption:PropTypes.string.isRequired,
  location:PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;