import os
from moviepy import VideoFileClip

def main():
    media_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    ref_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    
    # 1. Checar vídeos em media
    print("Inspecionando áudio dos arquivos de vídeo no projeto:")
    for f in os.listdir(media_dir):
        if f.endswith(".mp4"):
            path = os.path.join(media_dir, f)
            clip = VideoFileClip(path)
            has_audio = clip.audio is not None
            duration = clip.duration
            clip.close()
            print(f"- {f}: Duração={duration:.2f}s | Possui Áudio={has_audio}")
            
    # 2. Checar vídeos em Videos
    print("\nInspecionando áudio dos arquivos de vídeo na pasta Vídeos:")
    for f in os.listdir(ref_folder):
        if f.endswith(".mp4"):
            path = os.path.join(ref_folder, f)
            clip = VideoFileClip(path)
            has_audio = clip.audio is not None
            duration = clip.duration
            clip.close()
            print(f"- {f}: Duração={duration:.2f}s | Possui Áudio={has_audio}")

if __name__ == "__main__":
    main()
