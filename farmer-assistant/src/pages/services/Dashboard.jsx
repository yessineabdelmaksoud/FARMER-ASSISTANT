import React, { useState } from "react";
import axios from "axios";
import { Button, CircularProgress, Typography, Card, CardContent, TextField, MenuItem } from "@mui/material";
import Papa from 'papaparse';

const UploadCSV = () => {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [params, setParams] = useState({
    histogram_params: [],
    evolution_params: [],
    boxplot_params: [],
    scatter_params: [],
    violin_params: []
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      setError("Veuillez sélectionner un fichier CSV.");
      return;
    }
    setError(null);
    setLoading(true);

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        setData(results.data);
        setLoading(false);
      },
      error: (err) => {
        setError("Erreur lors de la lecture du fichier CSV.");
        setLoading(false);
      }
    });
  };

  const handleGeneratePlots = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/generate_plots", { data, ...params })
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        setError("Erreur lors de la génération des graphiques.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleParamChange = (event, type) => {
    const value = event.target.value;
    setParams((prevParams) => ({
      ...prevParams,
      [type]: typeof value === "string" ? value.split(",") : value
    }));
  };

  return (
    <div className="container my-3">
      <Typography variant="h5" gutterBottom>
        📊 Visualisation des données du sol
      </Typography>
      <input type="file" accept=".csv" onChange={handleFileChange} className="form-control mb-2" />
      <Button variant="contained" color="primary" onClick={handleUpload} disabled={loading}>
        Charger le fichier
      </Button>

      {loading && <CircularProgress className="my-3" />}
      {error && <Typography color="error">{error}</Typography>}

      {data && (
        <div>
          <TextField
            select
            label="Paramètres pour les histogrammes"
            value={params.histogram_params}
            onChange={(e) => handleParamChange(e, "histogram_params")}
            fullWidth
            margin="normal"
            SelectProps={{
              multiple: true,
            }}
          >
            {["pH", "Azote", "Phosphore", "Potassium", "Humidite", "Temperature"].map((param) => (
              <MenuItem key={param} value={param}>
                {param}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Paramètres pour le graphique d'évolution"
            value={params.evolution_params}
            onChange={(e) => handleParamChange(e, "evolution_params")}
            fullWidth
            margin="normal"
            SelectProps={{
              multiple: true,
            }}
          >
            {["Azote", "Phosphore", "Potassium"].map((param) => (
              <MenuItem key={param} value={param}>
                {param}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Paramètres pour les box plots"
            value={params.boxplot_params}
            onChange={(e) => handleParamChange(e, "boxplot_params")}
            fullWidth
            margin="normal"
            SelectProps={{
              multiple: true,
            }}
          >
            {["pH", "Azote", "Phosphore", "Potassium", "Humidite", "Temperature"].map((param) => (
              <MenuItem key={param} value={param}>
                {param}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Paramètres pour les scatter plots"
            value={params.scatter_params}
            onChange={(e) => handleParamChange(e, "scatter_params")}
            fullWidth
            margin="normal"
            SelectProps={{
              multiple: true,
            }}
          >
            {["pH", "Azote", "Phosphore", "Potassium", "Humidite", "Temperature"].map((param) => (
              <MenuItem key={param} value={param}>
                {param}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Paramètres pour les violin plots"
            value={params.violin_params}
            onChange={(e) => handleParamChange(e, "violin_params")}
            fullWidth
            margin="normal"
            SelectProps={{
              multiple: true,
            }}
          >
            {["pH", "Azote", "Phosphore", "Potassium", "Humidite", "Temperature"].map((param) => (
              <MenuItem key={param} value={param}>
                {param}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" color="secondary" onClick={handleGeneratePlots} disabled={loading}>
            Générer les graphiques
          </Button>
        </div>
      )}

      {Object.entries(images).map(([key, value]) => (
        <Card key={key} className="my-3">
          <CardContent>
            <Typography variant="h6">{getChartTitle(key)}</Typography>
            <img src={`data:image/png;base64,${value}`} alt={key} style={{ maxWidth: "100%" }} />
            <Typography variant="body2" color="textSecondary">
              {getChartDescription(key)}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

// Fonction pour les titres des graphiques
const getChartTitle = (key) => {
  const titles = {
    histograms: "Histogrammes des nutriments",
    evolution_chart: "Évolution des nutriments dans le temps",
    heatmap: "Carte thermique des corrélations",
    box_plots: "Box Plots des nutriments",
    scatter_plots: "Scatter Plot: Relation entre pH et Azote",
    pair_plots: "Matrice de Pair Plots",
    radar_chart: "Radar Chart: Comparaison entre Parcelle B et C",
    violin_plots: "Violin Plots des nutriments"
  };
  return titles[key] || "Graphique";
};

// Fonction pour les descriptions des graphiques
const getChartDescription = (key) => {
  const descriptions = {
    histograms: "Ce graphique montre la distribution des valeurs des nutriments dans le sol.",
    evolution_chart: "Les variations des niveaux de nutriments sont suivies dans le temps.",
    heatmap: "Ce graphique représente les corrélations entre les différentes variables.",
    box_plots: "Les box plots illustrent la répartition et les valeurs aberrantes des nutriments.",
    scatter_plots: "Ce scatter plot montre la relation entre le pH et la teneur en azote.",
    pair_plots: "Un aperçu des relations entre toutes les variables.",
    radar_chart: "Comparaison multivariée entre Parcelle B et C.",
    violin_plots: "Ce graphique montre la distribution et la densité des variables."
  };
  return descriptions[key] || "";
};

export default UploadCSV;
