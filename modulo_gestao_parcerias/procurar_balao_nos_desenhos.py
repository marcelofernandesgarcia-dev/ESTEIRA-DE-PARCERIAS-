import os
import cv2

def orb_match(img1_path, img2_path):
    img1 = cv2.imread(img1_path, cv2.IMREAD_GRAYSCALE)
    img2 = cv2.imread(img2_path, cv2.IMREAD_GRAYSCALE)
    if img1 is None or img2 is None:
        return 0
        
    orb = cv2.ORB_create()
    kp1, des1 = orb.detectAndCompute(img1, None)
    kp2, des2 = orb.detectAndCompute(img2, None)
    
    if des1 is None or des2 is None:
        return 0
        
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(des1, des2)
    
    # Filtra bons matches por distância
    good_matches = [m for m in matches if m.distance < 50]
    return len(good_matches)

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    balloon_path = os.path.join(art_folder, ".user_uploaded", "media__1784814101034.png")
    
    print("Buscando correspondência de pontos-chave ORB com o balão:")
    
    # Testa nas cenas geradas
    print("\n--- Cenas Geradas ---")
    for f in os.listdir(art_folder):
        if f.startswith("cena_") and f.endswith((".jpg", ".png")):
            path = os.path.join(art_folder, f)
            matches = orb_match(balloon_path, path)
            print(f"- {f}: {matches} pontos de correspondência ORB")
            
    # Testa nos uploads de referência do usuário
    print("\n--- Imagens de Referência do Usuário ---")
    uploaded_dir = os.path.join(art_folder, ".user_uploaded")
    for f in os.listdir(uploaded_dir):
        if f != "media__1784814101034.png" and f.endswith((".jpg", ".png")):
            path = os.path.join(uploaded_dir, f)
            matches = orb_match(balloon_path, path)
            print(f"- {f}: {matches} pontos de correspondência ORB")

if __name__ == "__main__":
    main()
