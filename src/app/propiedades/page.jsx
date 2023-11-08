"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
async function loadPropiedades() {
  try {
    const response = await axios.get("/api/propiedades");
    return response.data;
  } catch (error) {
    console.error("Error carga propiedades:", error);
    return [];
  }
}

function PropiedadesList() {
  const [propiedades, setPropiedad] = useState([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      const data = await loadPropiedades();
      setPropiedad(data);
    };
    fetchPropiedades();
  }, []);
  const deletePropiedades = async (id) => {
    try {
      if (confirm("Estas seguro de eliminar esta propiedad?")) {
        const res = await axios.delete(`/api/propiedades/${id}`);
        if (res.status === 204) {
          // Update the Propiedadess state after successful deletion
          setPropiedad((prevPropiedadess) =>
            prevPropiedadess.filter(
              (Propiedades) => Propiedades.id !== id
            )
          );
        }
      }
    } catch (error) {
      console.error("Error deleting Propiedades:", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-extrabold  m-8">
        Gestion de Propiedades{" "}
        <Link
          href="/propiedades/create"
          className="bg-blue-500
         hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 
         rounded mt-5"
        >
          Registrar
        </Link>
      </h2>
      <div className="shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
        <table className="min-w-full text-left text-sm font-light">
          <thead>
            <tr className="border-b font-medium bg-gray-300">
              <th>Opciones</th>
              <th>Id</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Caracteristicas</th>
              <th>Estado</th>
              <th>Precio Alquiler</th>
            </tr>
          </thead>
          <tbody>
            {propiedades.map((pro, index) => {
              return (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-4">
                    <button
                      className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
                      onClick={() => deletePropiedades(pro.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pro.id}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pro.nombre}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pro.direccion}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pro.caracteristicas}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    {pro.estado}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    s/. {pro.precioalquiler}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PropiedadesList;
