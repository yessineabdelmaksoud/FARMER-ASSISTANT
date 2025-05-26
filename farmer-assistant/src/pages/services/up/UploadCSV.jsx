import React, { useState } from "react";
import Papa from "papaparse";

const UploadCSV = ({ onDataLoaded }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;
    
    Papa.parse(file, {
      complete: (result) => {
        const data = result.data.slice(1).map((row) => ({
          Date: row[0],
          pH: parseFloat(row[1]),
          Azote: parseFloat(row[2]),
          Phosphore: parseFloat(row[3]),
          Potassium: parseFloat(row[4]),
          Humidité: parseFloat(row[5]),
          Température: parseFloat(row[6]),
        }));
        onDataLoaded(data);
      },
      header: true,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="container my-3">
      <input type="file" accept=".csv" onChange={handleFileChange} className="form-control mb-2"/>
      <button onClick={handleUpload} className="btn btn-primary">Charger le fichier</button>
    </div>
  );
};

export default UploadCSV;
