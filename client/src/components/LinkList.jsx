import React from "react";
import { Link } from "react-router-dom";

const LinkList = ({ links }) => {
  if (!links.length) {
    return <p>Ссылок пока нет!</p>;
  }
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Оригинальная ссылка</th>
            <th>Сокращенная ссылка</th>
            <th>Открыть</th>
          </tr>
        </thead>

        <tbody>
          {links.map(link => {
            return (
              <tr key={link._id}>
                <td>{link.from}</td>
                <td>{link.to}</td>
                <td>
                  <Link to={`/detail/${link._id}`}>Детали</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default LinkList;
