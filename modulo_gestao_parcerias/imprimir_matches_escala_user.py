import os
import cv2

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    balloon_path = os.path.join(art_folder, ".user_uploaded", "media__1784814101034.png")
    
    balloon = cv2.imread(balloon_path, cv2.IMREAD_GRAYSCALE)
    if balloon is None:
        print("Erro: Balão não carregado.")
        return
        
    uploaded_dir = os.path.join(art_folder, ".user_uploaded")
    print("Testando correspondência em ESCALA 1.0 nos UPLOADS do usuário:")
    for f in os.listdir(uploaded_dir):
        if f != "media__1784814101034.png" and f.endswith((".jpg", ".png")):
            img_path = os.path.join(uploaded_dir, f)
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            if img is None:
                continue
            if img.shape[1] < balloon.shape[1] or img.shape[0] < balloon.shape[0]:
                continue
            res = cv2.matchTemplate(img, balloon, cv2.TM_CCOEFF_NORMED)
            min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
            print(f"- {f}: Match = {max_val:.2%} na posição {max_loc}")

if __name__ == "__main__":
    main()
