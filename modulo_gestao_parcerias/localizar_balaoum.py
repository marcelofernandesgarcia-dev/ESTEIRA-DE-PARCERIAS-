import os
import cv2
import numpy as np

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    balloon_path = os.path.join(art_folder, ".user_uploaded", "media__1784814101034.png")
    
    balloon = cv2.imread(balloon_path, cv2.IMREAD_GRAYSCALE)
    if balloon is None:
        print("Erro: Não foi possível carregar a imagem do balão.")
        return
        
    print(f"Balão carregado com sucesso (resolução {balloon.shape[1]}x{balloon.shape[0]})")
    
    # Compara com todas as imagens de cena
    scenes = [f for f in os.listdir(art_folder) if f.startswith("cena_") and f.endswith(".jpg")]
    
    for scene_file in scenes:
        scene_path = os.path.join(art_folder, scene_file)
        scene_img = cv2.imread(scene_path, cv2.IMREAD_GRAYSCALE)
        if scene_img is None:
            continue
            
        # Compara em múltiplas escalas para garantir precisão
        best_val = -1
        best_scale = None
        best_loc = None
        
        # O balão pode ter sido redimensionado na renderização do vídeo ou pode estar em escala diferente
        for scale in np.linspace(0.2, 2.0, 30):
            w = int(balloon.shape[1] * scale)
            h = int(balloon.shape[0] * scale)
            if w >= scene_img.shape[1] or h >= scene_img.shape[0] or w < 10 or h < 10:
                continue
                
            resized_balloon = cv2.resize(balloon, (w, h))
            res = cv2.matchTemplate(scene_img, resized_balloon, cv2.TM_CCOEFF_NORMED)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
            
            if max_val > best_val:
                best_val = max_val
                best_scale = scale
                best_loc = max_loc
                
        print(f"- {scene_file}: Melhor match = {best_val:.2%} na escala {best_scale:.2f} na posição {best_loc}")

if __name__ == "__main__":
    main()
