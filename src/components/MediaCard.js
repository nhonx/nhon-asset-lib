import React, { Component } from 'react';
const MediaPlayer = ({ src, thumb, mediaType }) => {
    switch (mediaType) {
      case "IMAGE":
        return <img src={src}></img>;
      case "VIDEO":
        return (
          <video preload="none" poster={thumb} controls>
            <source src={src} type="video/mp4" />
          </video>
        );
    }
    return null;
  };
export const MediaCard = ({ media }) => {
  const mediaCaption = media.desc;
  return (
    <div className="media-card">
      <div className="media-desc">
        <div className="desc">
          <div className="author">
            <div className="author-avatar">
              <img src={media.authorAvatar}></img>
            </div>
            <span>
              <b>
                <a href={media.authorProfile} target="_blank">
                  {media.authorName}
                </a>
              </b>
            </span>
          </div>
          <div className="caption">
            <p>{mediaCaption}</p>
          </div>
        </div>
      </div>
      <div className="thumb">
        <MediaPlayer
          src={media.assetUrl}
          thumb={media.thumbUrl}
          alt={media.desc}
          mediaType={media.assetType}
        ></MediaPlayer>
      </div>
      <div className="metadata">
        <span>{media.createdAt}</span>
      </div>
    </div>
  );
};

