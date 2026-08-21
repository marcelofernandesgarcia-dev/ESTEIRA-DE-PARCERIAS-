import os
import cv2
import numpy as np

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    video_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    
    # Imagens de referência enviadas pelo usuário
    ref_images = {}
    for f in os.listdir(os.path.join(art_folder, ".user_uploaded")):
        if f.endswith((".jpg", ".png")):
            img_path = os.path.join(art_folder, ".user_uploaded", f)
            img = cv2.imread(img_path)
            if img is not None:
                img_gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                ref_images[f] = cv2.resize(img_gray, (100, 100))
                
    print(f"Carregadas {len(ref_images)} imagens de referência do usuário.")
    
    # Compara cada segundo do vídeo INTRO com as imagens de referência
    intro_path = None
    for f in os.listdir(video_folder):
        if f.lower().startswith("introdu") and f.lower().endswith(".mp4"):
            intro_path = os.path.join(video_folder, f)
            break
            
    if not intro_path:
        print("Erro: Não localizou INTRODUÇÃO.mp4")
        return
        
    cap = cv2.VideoCapture(intro_path)
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    print("\nVerificando se quadros de INTRODUÇÃO.mp4 são idênticos às referências do usuário:")
    for sec in range(11):
        frame_idx = sec * fps
        if frame_idx >= total_frames:
            break
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if ret:
            frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            frame_small = cv2.resize(frame_gray, (100, 100))
            
            # Encontra melhor correspondência
            best_match = None
            best_score = 0
            for ref_name, ref_img in ref_images.items():
                res = cv2.matchTemplate(frame_small, ref_img, cv2.TM_CCOEFF_NORMED)
                score = res[0][0]
                if score > best_score:
                    best_score = score
                    best_match = ref_name
            print(f"Tempo {sec:02d}s: Melhor match com {best_match} -> Pontuação={best_score:.2%}")
    cap.release()

if __name__ == "__main__":
    main()
