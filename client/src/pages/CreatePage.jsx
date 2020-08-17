import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";

export const CreatePage = () => {
  const [link, setLink] = useState("");
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const history = useHistory();

  useEffect(() => {
    window.M.updateTextFields();
  });

  const pressKeyHandler = async event => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );

        history.push(`/detail/${data.link._id}`);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="row">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input
            id="link"
            type="text"
            value={link}
            onChange={event => setLink(event.target.value)}
            onKeyPress={pressKeyHandler}
          />
          <label htmlFor="link">Ссылка</label>
        </div>
      </div>
    </div>
  );
};
