import os
import cv2
import numpy as np

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    balloon_path = os.path.join(art_folder, ".user_uploaded", "media__1784814101034.png")
    video_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    
    balloon = cv2.imread(balloon_path)
    if balloon is None:
        return
    balloon_gray = cv2.cvtColor(balloon, cv2.COLOR_BGR2GRAY)
    
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
    
    print("Verificando presença de balão em INTRODUÇÃO.mp4 a cada 0.25 segundos:")
    for frame_idx in range(0, total_frames, int(fps * 0.25)):
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            continue
        frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        
        # Testando correspondência na escala 0.74 (escala encontrada no match anterior)
        scale = 0.74
        w = int(balloon_gray.shape[1] * scale)
        h = int(balloon_gray.shape[0] * scale)
        resized = cv2.resize(balloon_gray, (w, h))
        res = cv2.matchTemplate(frame_gray, resized, cv2.TM_CCOEFF_NORMED)
        min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
        
        sec = frame_idx / fps
        print(f"Tempo {sec:5.2f}s: Match = {max_val:6.2%}")
    cap.release()

if __name__ == "__main__":
    main()
