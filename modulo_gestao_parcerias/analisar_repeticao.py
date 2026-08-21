import os
import cv2
import numpy as np

def extract_keyframes(video_path, num_frames=10):
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    step = max(1, total_frames // num_frames)
    
    keyframes = []
    for i in range(num_frames):
        cap.set(cv2.CAP_PROP_POS_FRAMES, i * step)
        ret, frame = cap.read()
        if ret:
            # Redimensiona para acelerar comparação
            frame_gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            frame_small = cv2.resize(frame_gray, (100, 100))
            keyframes.append((i * step, frame_small))
    cap.release()
    return keyframes

def compare_videos(v1_path, v2_path):
    keys1 = extract_keyframes(v1_path)
    keys2 = extract_keyframes(v2_path)
    
    similarities = []
    for idx1, (f1, img1) in enumerate(keys1):
        best_sim = 0
        for idx2, (f2, img2) in enumerate(keys2):
            # Compara usando correlação cruzada normalizada
            res = cv2.matchTemplate(img1, img2, cv2.TM_CCOEFF_NORMED)
            sim = res[0][0]
            if sim > best_sim:
                best_sim = sim
        similarities.append(best_sim)
        
    return np.mean(similarities)

def main():
    folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    videos = {
        "INTRO": "INTRODUÇÃO.mp4",
        "PARCIAL": "RESULTADO PARCIAL.mp4",
        "FINAL": "RESULTADO.mp4"
    }
    
    # Tratando encoding
    files = os.listdir(folder)
    for key, val in videos.items():
        prefix = val.split(".")[0]
        # busca dinâmica
        for f in files:
            if f.lower().startswith(prefix[:8].lower()) and f.lower().endswith(".mp4"):
                videos[key] = os.path.join(folder, f)
                break
                
    print("Analisando similaridade visual entre os vídeos de referência...")
    
    # Compara pares
    pairs = [
        ("INTRO", "PARCIAL"),
        ("INTRO", "FINAL"),
        ("PARCIAL", "FINAL")
    ]
    
    for v1, v2 in pairs:
        sim = compare_videos(videos[v1], videos[v2])
        print(f"Similaridade média entre {v1} e {v2}: {sim:.2%}")
        if sim > 0.85:
            print(f"-> AVISO: Grande probabilidade de REPETIÇÃO ou reaproveitamento de cenas entre {v1} e {v2}!")
        else:
            print(f"-> {v1} e {v2} parecem ter conteúdos visuais bem distintos.")

if __name__ == "__main__":
    main()
