import { useState, useEffect } from "react";
import notFoundImage from '../assets/img/Error404.png';

import { useNavigate } from "react-router-dom";

function Error404() {
  const [isWeb, setIsWeb] = useState(true);

  useEffect(() => {
    setIsWeb(window.innerWidth >= 768); // asume web si ancho >= 768px
  }, []);

  console.log(isWeb);

  return (
    <div className="Error404">
      {isWeb && <img src={notFoundImage} alt="Página no encontrada" />}
      <h2>Error 404</h2>
      <p>Página no encontrada</p>
    </div>
  );
} export default Error404;
