import os
import cv2
import numpy as np

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    balloon_path = os.path.join(art_folder, ".user_uploaded", "media__1784814101034.png")
    
    balloon = cv2.imread(balloon_path)
    if balloon is None:
        print("Erro: Não foi possível carregar o balão.")
        return
        
    balloon_gray = cv2.cvtColor(balloon, cv2.COLOR_BGR2GRAY)
    
    # Lista todas as imagens
    images = []
    # Imagens de cena
    for f in os.listdir(art_folder):
        if f.startswith("cena_") and f.endswith((".jpg", ".png")):
            images.append((f, os.path.join(art_folder, f)))
    # Imagens do usuário
    uploaded_dir = os.path.join(art_folder, ".user_uploaded")
    for f in os.listdir(uploaded_dir):
        if f != "media__1784814101034.png" and f.endswith((".jpg", ".png")):
            images.append((f, os.path.join(uploaded_dir, f)))
            
    print(f"Buscando em {len(images)} imagens...")
    
    best_overall_score = -1
    best_overall_file = None
    best_overall_rect = None
    best_overall_scale = None
    
    for name, path in images:
        img = cv2.imread(path)
        if img is None:
            continue
        img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
        # Faz busca multiescala mais densa
        for scale in np.linspace(0.1, 1.5, 75):
            w = int(balloon_gray.shape[1] * scale)
            h = int(balloon_gray.shape[0] * scale)
            if w >= img_gray.shape[1] or h >= img_gray.shape[0] or w < 20 or h < 20:
                continue
                
            resized = cv2.resize(balloon_gray, (w, h))
            res = cv2.matchTemplate(img_gray, resized, cv2.TM_CCOEFF_NORMED)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
            
            if max_val > best_overall_score:
                best_overall_score = max_val
                best_overall_file = name
                best_overall_scale = scale
                best_overall_rect = (max_loc[0], max_loc[1], w, h)
                
        print(f"- {name}: melhor pontuação provisória = {best_overall_score:.2%}")
        
    print(f"\nResultado Final:")
    print(f"Arquivo correspondente: {best_overall_file}")
    print(f"Pontuação de confiança: {best_overall_score:.2%}")
    print(f"Escala: {best_overall_scale:.2f}")
    print(f"Retângulo (x, y, w, h): {best_overall_rect}")

if __name__ == "__main__":
    main()
