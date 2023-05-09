import React from 'react';

function PageInfo(props) {
  return (
    <div
      style={{ height: '642px' }}
      className="d-flex flex-column align-center ml-auto mr-auto justify-center"
    >
      <img src={props.img} alt="emotion" />
      <h2 className="mb-5">{props.title}</h2>
      <p className="opacity-6 mt-5">{props.description}</p>
    </div>
  );
}

export default PageInfo;
