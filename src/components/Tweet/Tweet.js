import Avatar from "../../styles/Avatar";
import DeleteTweet from "./DeleteTweet";
import LikeTweet from "./LikeTweet";
import Linkify from "linkifyjs/react";
import React from "react";
import Retweet from "./Retweet";
import TweetFile from "../../styles/TweetFile";
import hashtag from "linkifyjs/plugins/hashtag";
import moment from "moment";
import styled from "styled-components";
import { CommentIcon } from "../Icons";
import { Link } from "react-router-dom";
import { setDate } from "../../utils";

const Wrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.tertiaryColor};
  padding: 1.5rem 1rem 1rem 1rem;

  .tweet-info-user {
    display: flex;
  }

  .tweet-info-user span.username {
    font-weight: 500;
  }

  .tweet-info-user span.secondary {
    padding-left: 0.5rem;
    color: ${(props) => props.theme.secondaryColor};
  }

  .tags {
    display: flex;
  }

  a.body {
    color: ${(props) => props.theme.accentColor};
  }

  div.tweet-stats {
    display: flex;
    margin-top: 0.5rem;
    align-items: center;

    div {
      margin-right: 4rem;
      color: ${(props) => props.theme.secondaryColor};
    }

    svg {
      margin-right: 0.5rem;
    }

    span {
      display: flex;
      align-items: center;
    }

    span.comment {
      svg {
        position: relative;
        top: 4px;
      }
    }
  }

  @media screen and (max-width: 470px) {
    div.tweet-stats {
      div {
        margin-right: 2.5rem;
      }
    }
  }

  @media screen and (max-width: 430px) {
    flex-direction: column;

    .username {
      display: none;
    }

    .avatar {
      display: none;
    }

    .tweet-info-user span.secondary {
      padding-left: 0;
      padding-right: 0.7rem;
    }
  }
`;

const Tweet = ({ tweet }) => {
  const {
    id,
    text,
    tags,
    user,
    files,
    isTweetMine,
    isLiked,
    likesCount,
    isRetweet,
    retweetsCount,
    commentsCount,
    createdAt,
  } = tweet;

  const handle = user && user.handle;
  const linkifyOptions = {
    attributes: {
      key: 'tag'
    },
    formatHref: function (value, type) {
      if (type === 'hashtag') {
        return 'explore?=' + value.substring(1);
      }
      return value;
    },
    className: 'body'
  };

  return (
    <Wrapper>
      <Link to={`/${handle}`}>
        <Avatar className="avatar" src={user && user.avatar} alt="avatar" />
      </Link>

      <div className="tweet-info">
        <div className="tweet-info-user">
          <Link to={`/${handle}`}>
            <span className="username">{user && user.fullname}</span>
            <span className="secondary">{`@${handle}`}</span>
          </Link>
          &nbsp;&nbsp;
          <Link to={`/${handle}/status/${id}`} className="secondary">
            {moment(setDate(createdAt)).fromNow()}
          </Link>
        </div>

        <Linkify options={linkifyOptions}><p>{text}</p></Linkify>

        <Link to={`/${handle}/status/${id}`}>
          {files && files.length && files[0] ? (
            <TweetFile src={files[0].url} alt="tweet-file" />
          ) : null}
        </Link>

        <div className="tweet-stats">
          <div>
            <span className="comment">
              <Link to={`/${handle}/status/${id}`}>
                <CommentIcon />
                {commentsCount ? commentsCount : null}
              </Link>
            </span>
          </div>

          <div>
            <Retweet
              id={id}
              isRetweet={isRetweet}
              retweetsCount={retweetsCount}
            />
          </div>

          <div>
            <LikeTweet id={id} isLiked={isLiked} likesCount={likesCount} />
          </div>

          <div>
            <span>{isTweetMine ? <DeleteTweet id={id} /> : null}</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Tweet;
