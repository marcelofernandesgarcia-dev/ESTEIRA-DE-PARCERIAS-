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
        
    print(f"Balão: {balloon.shape}")
    
    uploaded_dir = os.path.join(art_folder, ".user_uploaded")
    files = [f for f in os.listdir(uploaded_dir) if f != "media__1784814101034.png" and f.endswith((".jpg", ".png"))]
    
    for f in files:
        img_path = os.path.join(uploaded_dir, f)
        img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        if img is None:
            continue
            
        best_val = -1
        best_scale = None
        best_loc = None
        
        for scale in np.linspace(0.1, 2.0, 40):
            w = int(balloon.shape[1] * scale)
            h = int(balloon.shape[0] * scale)
            if w >= img.shape[1] or h >= img.shape[0] or w < 5 or h < 5:
                continue
                
            resized_balloon = cv2.resize(balloon, (w, h))
            res = cv2.matchTemplate(img, resized_balloon, cv2.TM_CCOEFF_NORMED)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
            
            if max_val > best_val:
                best_val = max_val
                best_scale = scale
                best_loc = max_loc
                
        print(f"- {f}: Melhor match = {best_val:.2%} na escala {best_scale:.2f} na posição {best_loc}")

if __name__ == "__main__":
    main()
