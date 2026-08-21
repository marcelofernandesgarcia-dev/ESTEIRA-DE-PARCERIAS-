import os
import cv2
import numpy as np

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    balloon_path = os.path.join(art_folder, ".user_uploaded", "media__1784814101034.png")
    scene_path = os.path.join(art_folder, "cena_3_desburocratizacao_1784769158016.jpg")
    
    balloon = cv2.imread(balloon_path)
    scene = cv2.imread(scene_path)
    if balloon is None or scene is None:
        print("Erro: Não foi possível carregar os arquivos.")
        return
        
    balloon_gray = cv2.cvtColor(balloon, cv2.COLOR_BGR2GRAY)
    scene_gray = cv2.cvtColor(scene, cv2.COLOR_BGR2GRAY)
    
    best_val = -1
    best_scale = None
    best_loc = None
    
    for scale in np.linspace(0.1, 1.5, 100):
        w = int(balloon_gray.shape[1] * scale)
        h = int(balloon_gray.shape[0] * scale)
        if w >= scene_gray.shape[1] or h >= scene_gray.shape[0] or w < 20 or h < 20:
            continue
            
        resized = cv2.resize(balloon_gray, (w, h))
        res = cv2.matchTemplate(scene_gray, resized, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        
        if max_val > best_val:
            best_val = max_val
            best_scale = scale
            best_loc = max_loc
            
    print(f"Melhor match em Cena 3: {best_val:.2%} na escala {best_scale:.2f} na posição {best_loc}")
    
    # Salva um recorte da cena na região correspondente para verificação
    if best_loc:
        x, y = best_loc
        w = int(balloon.shape[1] * best_scale)
        h = int(balloon.shape[0] * best_scale)
        crop = scene[y:y+h, x:x+w]
        cv2.imwrite(os.path.join(art_folder, "cena_3_crop.jpg"), crop)
        print("Corte salvo em cena_3_crop.jpg no diretório de artefatos.")

if __name__ == "__main__":
    main()
