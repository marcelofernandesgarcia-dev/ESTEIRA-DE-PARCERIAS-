import os
import cv2
import numpy as np

def main():
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    balloon_path = os.path.join(art_folder, ".user_uploaded", "media__1784814101034.png")
    video_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    
    balloon = cv2.imread(balloon_path)
    if balloon is None:
        print("Erro: Não foi possível carregar a imagem do balão.")
        return
    balloon_gray = cv2.cvtColor(balloon, cv2.COLOR_BGR2GRAY)
    
    # Lista os vídeos
    videos = ["INTRODUÇÃO.mp4", "RESULTADO PARCIAL.mp4", "RESULTADO.mp4"]
    actual_videos = {}
    for v in videos:
        prefix = v.split(".")[0]
        for f in os.listdir(video_folder):
            if f.lower().startswith(prefix[:8].lower()) and f.lower().endswith(".mp4"):
                actual_videos[v] = os.path.join(video_folder, f)
                break
                
    print("Buscando o balão de fala nos frames dos vídeos de referência:")
    for v_name, filepath in actual_videos.items():
        print(f"\n--- Analisando {v_name} ---")
        cap = cv2.VideoCapture(filepath)
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        best_val = -1
        best_frame_idx = -1
        best_scale = None
        best_loc = None
        
        # Amostra um frame a cada 0.5 segundos para ser bem preciso
        for frame_idx in range(0, total_frames, int(fps * 0.5)):
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
            ret, frame = cap.read()
            if not ret:
                continue
            frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # Busca multiescala rápida para o frame
            for scale in np.linspace(0.4, 1.2, 15):
                w = int(balloon_gray.shape[1] * scale)
                h = int(balloon_gray.shape[0] * scale)
                if w >= frame_gray.shape[1] or h >= frame_gray.shape[0] or w < 30 or h < 30:
                    continue
                    
                resized = cv2.resize(balloon_gray, (w, h))
                res = cv2.matchTemplate(frame_gray, resized, cv2.TM_CCOEFF_NORMED)
                min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(res)
                
                if max_val > best_val:
                    best_val = max_val
                    best_frame_idx = frame_idx
                    best_scale = scale
                    best_loc = max_loc
                    
        sec = best_frame_idx / fps
        print(f"Melhor match em {v_name}: {best_val:.2%} no segundo {sec:.2f}s (escala {best_scale:.2f} na posição {best_loc})")
        cap.release()

if __name__ == "__main__":
    main()
