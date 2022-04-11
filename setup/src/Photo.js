import React from 'react'

const Photo = ({
  urls: { regular },  // regular is the url for the image   
  alt_description,   // alt_description is the description of the image (alt text)
  likes,            // likes is the number of likes
  user: {
    name,           // name is the name of the user
    portfolio_url,  // portfolio_url is the url to the user's portfolio
    profile_image: { medium }, // profile_image is the url to the user's profile image
  },
}) => {
  return (
    <article className='photo'>
      <img src={regular} alt={alt_description} />
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt='' className='user-img' />
        </a>
      </div>
    </article>
  )
}

export default Photo
