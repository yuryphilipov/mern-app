import React from "react";

const LinkDetail = ({ link, deleteHandler }) => {
  return (
    <>
      <p>
        Оригинальная ссылка:{" "}
        <a href={link.from} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>
        Сокращенная ссылка:{" "}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        Дата создания:{" "}
        <strong>{new Date(link.date).toLocaleDateString()}</strong>
      </p>
      <p>
        Количество кликов: <strong>{link.clicks}</strong>
      </p>
      <p>
        <button className="btn" onClick={deleteHandler}>
          Удалить ссылку
        </button>
      </p>
    </>
  );
};

export default LinkDetail;
