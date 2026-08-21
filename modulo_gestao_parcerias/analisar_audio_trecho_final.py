import os
import numpy as np
from moviepy import VideoFileClip, AudioFileClip

def main():
    video_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    final_video_path = os.path.join(video_folder, "VIDEO_CAMPANHA_INTEGRADO_80S.mp4")
    
    if not os.path.exists(final_video_path):
        print("Erro: Vídeo final não encontrado.")
        return
        
    print("Analisando volume de áudio em intervalos de 2 segundos a partir dos 35 segundos:")
    clip = VideoFileClip(final_video_path)
    fps = 22050
    duration = clip.duration
    
    for start_t in range(35, int(duration), 2):
        end_t = min(duration, start_t + 2)
        sub = clip.audio.subclipped(start_t, end_t)
        arr = sub.to_soundarray(fps=fps)
        rms = np.sqrt(np.mean(arr**2))
        peak = np.max(np.abs(arr))
        print(f"Intervalo {start_t:02d}s - {int(end_t):02d}s: RMS={rms:.4f} | Pico={peak:.4f}")
        
    clip.close()

if __name__ == "__main__":
    main()
