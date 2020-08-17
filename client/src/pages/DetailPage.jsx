import React, { useState, useContext, useCallback, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/Loader";
import LinkDetail from "../components/LinkDetail";

export const DetailPage = () => {
  const { loading, request } = useHttp();
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const history = useHistory();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setLink(fetched);
    } catch (e) {}
  }, [token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  // const deleteLink = () => {
  //   history.push("/links");
  // };
  const deleteLink = async () => {
    try {
      await request(`/api/link/delete/${linkId}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      history.push("/links");
    } catch (e) {}
  };

  if (loading) {
    return <Loader />;
  }

  if (link) {
    return <LinkDetail link={link} deleteHandler={deleteLink} />;
  }

  return <p>Ссылка не найдена!</p>;
};
