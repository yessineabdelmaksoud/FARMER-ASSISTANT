import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, BarChart, Bar, CartesianGrid } from "recharts";

const Visualisation = ({ data }) => {
  return (
    <div className="container">
      <h3 className="text-center my-4">Visualisation des données</h3>

      {/* Histogrammes */}
      <h4>Distribution des valeurs</h4>
      <BarChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Date" hide />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pH" fill="#8884d8" />
        <Bar dataKey="Azote" fill="#82ca9d" />
        <Bar dataKey="Phosphore" fill="#ffc658" />
        <Bar dataKey="Potassium" fill="#ff7300" />
      </BarChart>

      {/* Courbe d’évolution */}
      <h4>Évolution des nutriments du sol</h4>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="Date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Azote" stroke="#8884d8" />
        <Line type="monotone" dataKey="Phosphore" stroke="#82ca9d" />
        <Line type="monotone" dataKey="Potassium" stroke="#ffc658" />
      </LineChart>

      {/* TODO: Ajouter Heatmap plus tard */}
    </div>
  );
};

export default Visualisation;
