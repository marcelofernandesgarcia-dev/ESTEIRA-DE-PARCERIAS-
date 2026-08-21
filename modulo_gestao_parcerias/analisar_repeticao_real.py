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
            res = cv2.matchTemplate(img1, img2, cv2.TM_CCOEFF_NORMED)
            sim = res[0][0]
            if sim > best_sim:
                best_sim = sim
        similarities.append(best_sim)
        
    return np.mean(similarities)

def main():
    folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    
    # Mapeando os arquivos de forma exata para evitar colisão de prefixos
    intro_path = None
    parcial_path = None
    resultado_path = None
    
    for f in os.listdir(folder):
        name = f.lower()
        if name.endswith(".mp4"):
            if "introdu" in name:
                intro_path = os.path.join(folder, f)
            elif "parcial" in name:
                parcial_path = os.path.join(folder, f)
            elif "resultado.mp4" in name or name == "resultado.mp4":
                resultado_path = os.path.join(folder, f)
                
    print(f"Intro: {intro_path}")
    print(f"Parcial: {parcial_path}")
    print(f"Resultado: {resultado_path}")
    
    if not (intro_path and parcial_path and resultado_path):
        print("Erro: Não foi possível localizar os três arquivos de referência exatos.")
        return
        
    print("\nCalculando matriz de similaridade visual...")
    print(f"INTRO vs PARCIAL:   {compare_videos(intro_path, parcial_path):.2%}")
    print(f"INTRO vs RESULTADO: {compare_videos(intro_path, resultado_path):.2%}")
    print(f"PARCIAL vs RESULTADO: {compare_videos(parcial_path, resultado_path):.2%}")

if __name__ == "__main__":
    main()
