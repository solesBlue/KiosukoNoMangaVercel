import { useState, useEffect } from "react";
import notFoundImage from '../assets/img/Error404.png';

import { useNavigate } from "react-router-dom";

// function Error404() {
//   const navigate = useNavigate();

//   // Detecta si estamos corriendo como PWA o app instalada
//   const isApp = window.matchMedia('(display-mode: standalone)').matches;

//   return (
//     <div
//       className="Error404"
//       style={{
//         textAlign: 'center',
//         padding: '3em',
//         backgroundColor: '#fbf0da',
//         minHeight: '80vh',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       {!isApp && (
//         <img
//           src={notFoundImage}
//           alt="Página no encontrada"
//           style={{ width: '40%', maxWidth: '400px', height: 'auto', marginBottom: '2rem' }}
//         />
//       )}
//       <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Error 404</h2>
//       <p style={{ fontSize: '1.2rem', marginBottom: '2rem', color: '#666' }}>
//         Lo sentimos, la página que buscas no existe.
//       </p>
//       <button
//         onClick={() => navigate('/')}
//         style={{
//           padding: '0.8rem 1.5rem',
//           fontSize: '1rem',
//           backgroundColor: '#F5C518',
//           border: 'none',
//           borderRadius: '8px',
//           cursor: 'pointer',
//           color: '#333',
//         }}
//       >
//         Volver al inicio
//       </button>
//     </div>
//   );
// }

// export default Error404;



// function Error404() {
//   // Detecta si estamos corriendo como PWA (app instalada)
//   const isApp = window.matchMedia('(display-mode: standalone)').matches;

//   return (
//     <div className="Error404" style={{ textAlign: 'center', padding: '2em', backgroundColor: '#fbf0da' }}>
//       {!isApp && (
//         <img src={notFoundImage} alt="Página no encontrada" style={{ width: '50%', height: 'auto' }} />
//       )}
//       <h2>Error 404</h2>
//       <p>Página no encontrada</p>
//     </div>
//   );
// }

// export default Error404;

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
