import os
import cv2
import numpy as np

def analyze_frame_type(img_path):
    img = cv2.imread(img_path)
    if img is None:
        return "N/A"
        
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # 1. Variância local de textura (massa cinzenta)
    # Cartoons têm muitas regiões planas (variância baixa em blocos)
    h, w = gray.shape
    block_size = 10
    block_vars = []
    for y in range(0, h - block_size, block_size):
        for x in range(0, w - block_size, block_size):
            block = gray[y:y+block_size, x:x+block_size]
            block_vars.append(np.var(block))
            
    mean_var = np.mean(block_vars)
    
    # 2. Densidade de bordas Canny
    edges = cv2.Canny(gray, 50, 150)
    edge_density = np.sum(edges > 0) / (h * w)
    
    # Classificação empírica:
    # Vídeos reais têm variação local maior de textura (mean_var alto) 
    # e bordas menos concentradas comparado com desenho de traço forte.
    # Vamos imprimir as estatísticas para podermos ver o padrão.
    return mean_var, edge_density

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    
    print("Análise de Textura e Bordas dos Quadros extraídos:")
    for name in ["intro", "parcial", "final"]:
        print(f"\n--- Clipe {name.upper()} ---")
        for sec in range(11):
            file_name = f"frame_{name}_{sec}s.jpg"
            file_path = os.path.join(art_folder, file_name)
            if os.path.exists(file_path):
                var, edge = analyze_frame_type(file_path)
                classification = "DESENHO 2D" if var < 180 else "VÍDEO REAL"
                print(f"Tempo {sec:02d}s: Variancia={var:8.2f} | Densidade Bordas={edge:6.2%} | Classificação={classification}")

if __name__ == "__main__":
    main()
