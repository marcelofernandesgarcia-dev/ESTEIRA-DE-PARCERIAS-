import os
from moviepy import VideoFileClip

def make_silent_videos():
    ref_folder = r"C:\Users\marce\Videos\VIDEO PREFEITA"
    project_media_dir = r"C:\Users\marce\.gemini\antigravity\scratch\modulo-gestao-parcerias\media"
    os.makedirs(project_media_dir, exist_ok=True)
    
    # Encontra caminhos
    intro_path = None
    parcial_path = None
    resultado_path = None
    for f in os.listdir(ref_folder):
        f_low = f.lower()
        if f_low.startswith("introdu") and f_low.endswith(".mp4"):
            intro_path = os.path.join(ref_folder, f)
        elif f_low.startswith("resultado parcial") and f_low.endswith(".mp4"):
            parcial_path = os.path.join(ref_folder, f)
        elif f_low.startswith("resultado") and not "parcial" in f_low and f_low.endswith(".mp4"):
            resultado_path = os.path.join(ref_folder, f)
            
    # Salva versões 100% silenciosas (sem faixa de áudio no arquivo)
    for name, path in [("intro", intro_path), ("parcial", parcial_path), ("resultado", resultado_path)]:
        if path:
            out_path = os.path.join(project_media_dir, f"{name}_silent.mp4")
            print(f"Criando {name}_silent.mp4...")
            clip = VideoFileClip(path)
            # Salva sem áudio
            clip.write_videofile(out_path, audio=False, codec="libx264")
            clip.close()
            print(f"Salvo em {out_path}")

if __name__ == "__main__":
    make_silent_videos()
