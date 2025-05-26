from flask import Flask, request, jsonify
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import io
import base64
from flask_cors import CORS
import numpy as np

import matplotlib
matplotlib.use('Agg')

app = Flask(__name__)
CORS(app)

def convert_date_format(df):
    """Convertit la colonne 'Date' au format datetime si elle existe."""
    if 'Date' in df.columns:
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')
    return df

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if not file:
        return jsonify({"error": "No file provided"}), 400

    # Charger le fichier CSV dans un DataFrame
    df = pd.read_csv(file)
    df = convert_date_format(df)

    # Retourner un message de succès
    return jsonify({"message": "File uploaded successfully"})

@app.route('/generate_plots', methods=['POST'])
def generate_plots():
    data = request.json
    df = pd.DataFrame(data['data'])
    df = convert_date_format(df)

    # Générez les visualisations ici
    histograms = generate_histograms(df, data.get('histogram_params', []))
    evolution_chart = generate_evolution_chart(df, data.get('evolution_params', []))
    heatmap = generate_heatmap(df)
    box_plots = generate_box_plots(df, data.get('boxplot_params', []))
    scatter_plots = generate_scatter_plots(df, data.get('scatter_params', []))
    pair_plots = generate_pair_plots(df)
    radar_chart = generate_radar_chart(df)
    violin_plots = generate_violin_plots(df, data.get('violin_params', []))

    # Retourner les graphiques sous forme d'URL d'image en base64
    return jsonify({
        "histograms": histograms,
        "evolution_chart": evolution_chart,
        "heatmap": heatmap,
        "box_plots": box_plots,
        "scatter_plots": scatter_plots,
        "pair_plots": pair_plots,
        "radar_chart": radar_chart,
        "violin_plots": violin_plots
    })

def save_plot_as_base64():
    """Sauvegarde la figure actuelle en mémoire et la convertit en base64."""
    img = io.BytesIO()
    plt.savefig(img, format='png', bbox_inches="tight")
    img.seek(0)
    return base64.b64encode(img.getvalue()).decode('utf-8')

def generate_histograms(df, params):
    colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#1abc9c']

    plt.figure(figsize=(12, 8))

    for i, col in enumerate(params):
        plt.hist(df[col].dropna(), bins=30, alpha=0.7, color=colors[i % len(colors)], label=col)

    plt.title('Distribution des valeurs des nutriments', fontsize=14)
    plt.xlabel('Valeur', fontsize=12)
    plt.ylabel('Fréquence', fontsize=12)
    plt.legend()
    plt.grid(True, linestyle='--', alpha=0.7)

    # Sauvegarder l'image en mémoire et la convertir en base64
    img_base64 = save_plot_as_base64()
    plt.close()
    return img_base64

def generate_evolution_chart(df, params):
    """Génère un graphique d'évolution des nutriments avec des couleurs distinctes."""
    plt.figure(figsize=(10, 6))
    colors = ['blue', 'red', 'green', 'purple', 'orange', 'brown']

    if 'Date' in df.columns:
        for i, nutrient in enumerate(params):
            if nutrient in df.columns:
                plt.plot(df['Date'], df[nutrient], label=nutrient, color=colors[i % len(colors)], marker='o')
        plt.xlabel('Date')
    else:
        plt.text(0.5, 0.5, "⚠️ La colonne 'Date' est absente ou incorrecte", fontsize=12, ha='center', va='center')

    plt.ylabel('Valeur')
    plt.title("Évolution des nutriments dans le temps", fontsize=14, fontweight='bold')
    plt.legend()

    img_base64 = save_plot_as_base64()
    plt.close()
    return img_base64

def generate_heatmap(df):
    correlation = df[['pH', 'Azote', 'Phosphore', 'Potassium', 'Humidite', 'Temperature']].corr()
    plt.figure(figsize=(8, 6))
    sns.heatmap(correlation, annot=True, cmap="coolwarm")
    plt.title('Carte thermique des corrélations')

    # Sauvegarder l'image en mémoire et la convertir en base64
    img_base64 = save_plot_as_base64()
    plt.close()
    return img_base64

def generate_box_plots(df, params):
    plt.figure(figsize=(10, 6))
    sns.boxplot(data=df[params])
    plt.title('Box Plots des nutriments')
    plt.xticks(rotation=45)

    # Sauvegarder l'image en mémoire et la convertir en base64
    img_base64 = save_plot_as_base64()
    plt.close()
    return img_base64

def generate_scatter_plots(df, params):
    plt.figure(figsize=(10, 6))
    sns.scatterplot(x=params[0], y=params[1], data=df)
    plt.title(f'Scatter Plot: {params[0]} vs {params[1]}')

    # Sauvegarder l'image en mémoire et la convertir en base64
    img_base64 = save_plot_as_base64()
    plt.close()
    return img_base64

def generate_pair_plots(df):
    pair_plot = sns.pairplot(df[['pH', 'Azote', 'Phosphore', 'Potassium', 'Humidite', 'Temperature']])
    pair_plot.fig.suptitle('Pair Plots des nutriments', y=1.02)

    # Sauvegarder l'image en mémoire et la convertir en base64
    img = io.BytesIO()
    pair_plot.savefig(img, format='png')
    img.seek(0)
    img_base64 = base64.b64encode(img.getvalue()).decode('utf-8')
    plt.close()
    return img_base64

def generate_radar_chart(df):
    # Exemple de radar chart pour comparer deux parcelles
    categories = ['pH', 'Azote', 'Phosphore', 'Potassium', 'Humidite', 'Temperature']

    # Sélectionner les données pour Parcelle B et C
    parcelle_b = df[df['Parcelle'] == 'Parcelle B'][categories].mean().tolist()
    parcelle_c = df[df['Parcelle'] == 'Parcelle C'][categories].mean().tolist()

    # Calculer les angles pour chaque catégorie
    angles = np.linspace(0, 2 * np.pi, len(categories), endpoint=False).tolist()

    # Fermer le graphique radar en ajoutant le premier point à la fin
    parcelle_b += parcelle_b[:1]
    parcelle_c += parcelle_c[:1]
    angles += angles[:1]

    plt.figure(figsize=(8, 8))
    ax = plt.subplot(111, polar=True)
    ax.fill(angles, parcelle_b, color='r', alpha=0.25, label='Parcelle B')
    ax.fill(angles, parcelle_c, color='b', alpha=0.25, label='Parcelle C')
    ax.set_xticks(angles[:-1])
    ax.set_xticklabels(categories)
    plt.legend(loc='upper right', bbox_to_anchor=(1.1, 1.1))
    plt.title('Radar Chart: Comparaison entre Parcelle B et C')

    img_base64 = save_plot_as_base64()
    plt.close()
    return img_base64
def generate_violin_plots(df, params):
    plt.figure(figsize=(10, 6))
    sns.violinplot(data=df[params])
    plt.title('Violin Plots des nutriments')
    plt.xticks(rotation=45)

    # Sauvegarder l'image en mémoire et la convertir en base64
    img_base64 = save_plot_as_base64()
    plt.close()
    return img_base64

if __name__ == '__main__':
    app.run(debug=True)
