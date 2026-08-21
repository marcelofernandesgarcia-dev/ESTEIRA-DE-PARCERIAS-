import os
import numpy as np
from moviepy import VideoFileClip

def analyze_clip_audio(filepath):
    clip = VideoFileClip(filepath)
    if clip.audio is None:
        return {"has_audio": False}
        
    # Extrai o áudio em formato numpy array
    fps = 44100
    audio_frame_size = 44100
    # Obter o áudio total como array
    audio_array = clip.audio.to_soundarray(fps=fps)
    
    # Calcula volumes
    # RMS (Root Mean Square) - Volume médio percetível
    rms = np.sqrt(np.mean(audio_array**2))
    # Pico de volume absoluto
    peak = np.max(np.abs(audio_array))
    
    duration = clip.duration
    clip.close()
    
    return {
        "has_audio": True,
        "duration": duration,
        "rms": rms,
        "peak": peak
    }

def main():
    folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    
    # Mapeando os arquivos exatos
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
                
    print("Análise Crítica de Volumes de Áudio (Normalização):")
    for name, filepath in files.items():
        stats = analyze_clip_audio(filepath)
        if stats["has_audio"]:
            print(f"- {name}: Duração={stats['duration']:.2f}s | Volume Médio (RMS)={stats['rms']:.4f} | Volume de Pico={stats['peak']:.4f}")
        else:
            print(f"- {name}: Sem faixa de áudio")

if __name__ == "__main__":
    main()
