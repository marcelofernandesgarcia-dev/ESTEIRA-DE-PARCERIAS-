import os
import cv2

def extract_all_frames():
    folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    art_folder = r"C:\Users\marce\.gemini\antigravity\brain\0fd2353f-fbf9-4074-b450-f9a06c2d95dc"
    
    files = {
        "INTRO": "INTRODUÇÃO.mp4",
        "PARCIAL": "RESULTADO PARCIAL.mp4",
        "FINAL": "RESULTADO.mp4"
    }
    
    os_files = os.listdir(folder)
    for key, val in files.items():
        prefix = val.split(".")[0]
        for f in os_files:
            if f.lower().startswith(prefix[:8].lower()) and f.lower().endswith(".mp4"):
                files[key] = os.path.join(folder, f)
                break
                
    for name, filepath in files.items():
        cap = cv2.VideoCapture(filepath)
        fps = int(cap.get(cv2.CAP_PROP_FPS))
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        print(f"Vídeo {name}: {total_frames} frames ({fps} FPS)")
        
        # Salva um quadro por segundo
        for sec in range(11):
            frame_idx = sec * fps
            if frame_idx >= total_frames:
                break
            cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
            ret, frame = cap.read()
            if ret:
                out_name = f"frame_{name.lower()}_{sec}s.jpg"
                out_path = os.path.join(art_folder, out_name)
                cv2.imwrite(out_path, frame)
                
        cap.release()
    print("Extração de quadros concluída.")

if __name__ == "__main__":
    extract_all_frames()
